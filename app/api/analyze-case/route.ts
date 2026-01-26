import { NextRequest } from "next/server";
// @ts-ignore
import PDFParser from "pdf2json";
import { generateRecommendations } from "@/lib/recommendation-engine";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { cases } from "@/db/schema/cases";
import { eq } from "drizzle-orm";
import { after } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 300;

async function updateProgress(caseId: string, progress: number, step: string) {
    await db.update(cases)
        .set({ analysisProgress: progress, currentStep: step })
        .where(eq(cases.id, caseId));
}
async function extractPDFText(fileUrl: string): Promise<string> {
    const response = await fetch(fileUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch PDF from URL: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<string>((resolve, reject) => {
        const parser = new PDFParser(null, true);
        parser.on("pdfParser_dataError", (errData: any) => reject(new Error(errData.parserError)));
        parser.on("pdfParser_dataReady", () => {
            resolve(parser.getRawTextContent());
        });
        parser.parseBuffer(buffer);
    });
}

async function processAnalysis(
    caseId: string,
    text: string,
    analysisMode: "default" | "with_parameters",
    orgId: string,
    jurisdiction?: string
) {
    try {
        await updateProgress(caseId, 20, "Starting AI analysis...");

        const stream = await generateRecommendations({
            text,
            orgId,
            analysisMode,
            jurisdiction
        });
        let fullRecommendations = "";

        await updateProgress(caseId, 40, "AI is analyzing document...");

        for await (const chunk of stream) {
            if (chunk.type === "content_block_delta" && chunk.delta?.type === "text_delta") {
                fullRecommendations += chunk.delta.text;
            }
        }

        await updateProgress(caseId, 80, "Saving results...");

        // More robust JSON extraction
        let cleanedData = fullRecommendations.trim()
            .replace(/^```json\s*/i, '')
            .replace(/^```\s*/i, '')
            .replace(/\s*```$/i, '')
            .trim();

        // Extract JSON from anywhere in the response
        if (!cleanedData.startsWith('{')) {
            const jsonStart = cleanedData.indexOf('{');
            const jsonEnd = cleanedData.lastIndexOf('}');
            if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
                cleanedData = cleanedData.substring(jsonStart, jsonEnd + 1);
            }
        }

        // Validate that we have a complete JSON object
        if (!cleanedData.startsWith('{') || !cleanedData.endsWith('}')) {
            console.error("Invalid JSON structure detected. Response preview:", fullRecommendations.substring(0, 500));
        }

        let parsedRecommendations;
        try {
            parsedRecommendations = JSON.parse(cleanedData);

            // Validate that we got a proper analysis object
            if (parsedRecommendations.error === "invalid_document") {
                console.warn("AI detected invalid document for case:", caseId);
            }
        } catch (parseError) {
            console.error("JSON parse error for case:", caseId);
            console.error("Parse error details:", parseError instanceof Error ? parseError.message : parseError);
            console.error("Raw response (first 1000 chars):", fullRecommendations.substring(0, 1000));
            console.error("Cleaned data (first 1000 chars):", cleanedData.substring(0, 1000));

            parsedRecommendations = {
                raw_response: fullRecommendations.substring(0, 10000),
                error: "parse_failed",
                message: "The AI analysis completed but the response was not in the expected format. Below is the raw output.",
                parse_error: parseError instanceof Error ? parseError.message : "Unknown parse error"
            };
        }

        if (analysisMode === "with_parameters") {
            await db.update(cases)
                .set({
                    status: 'analyzed',
                    parameterizedRecommendations: parsedRecommendations,
                    parameterizedAnalyzedAt: new Date(),
                    analysisProgress: 100,
                    currentStep: "Complete"
                })
                .where(eq(cases.id, caseId));
        } else {
            await db.update(cases)
                .set({
                    status: 'analyzed',
                    defaultRecommendations: parsedRecommendations,
                    analyzedAt: new Date(),
                    analysisProgress: 100,
                    currentStep: "Complete"
                })
                .where(eq(cases.id, caseId));
        }
    } catch (error) {
        console.error("Background processing error:", error);
        await db.update(cases)
            .set({
                status: 'error',
                errorMessage: error instanceof Error ? error.message : "Analysis failed",
                analysisProgress: 0,
                currentStep: "Error occurred"
            })
            .where(eq(cases.id, caseId));
    }
}

export async function POST(req: NextRequest) {
    try {
        const { userId, orgId } = await auth();

        if (!userId || !orgId) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }


        const body = await req.json();
        const { fileUrl, fileName, fileSize } = body;

        if (!fileUrl) {
            return new Response(JSON.stringify({ error: "No file URL provided" }), { status: 400 });
        }


        const [newCase] = await db.insert(cases).values({
            orgId,
            userId,
            caseTitle: fileName?.replace('.pdf', '') || "Case Analysis",
            fileName: fileName || "document.pdf",
            fileSize: fileSize || 0,
            fileUrl: fileUrl,
            status: 'processing',
            analysisProgress: 5,
            currentStep: "Starting analysis...",
        }).returning();

        const caseId = newCase.id;

        after(async () => {
            try {
                await updateProgress(caseId, 10, "Extracting text from PDF...");
                let text: string;
                try {
                    text = await extractPDFText(fileUrl);
                } catch (error) {
                    console.error("Text extraction failed:", error);
                    await db.update(cases).set({
                        status: 'error',
                        errorMessage: "Failed to extract text from PDF.",
                        analysisProgress: 0,
                        currentStep: "Error"
                    }).where(eq(cases.id, caseId));
                    return;
                }


                const { classifyDocument } = await import("@/lib/recommendation-engine");
                const classification = await classifyDocument(text, {});
                const jurisdiction = classification.jurisdiction ||
                    (classification.is_icsid ? "ICSID" : "General Commercial");

                await updateProgress(caseId, 25, `Detected jurisdiction: ${jurisdiction}`);


                const results = await Promise.allSettled([
                    processAnalysis(caseId, text, "default", orgId, jurisdiction),
                    processAnalysis(caseId, text, "with_parameters", orgId, jurisdiction)
                ]);

                const failed = results.filter(r => r.status === 'rejected');
                if (failed.length > 0) {
                    console.error("Some analysis tasks failed:", failed);
                }

                await updateProgress(caseId, 100, "Complete");

            } catch (err) {
                console.error("Background processing error:", err);
                await db.update(cases).set({
                    status: 'error',
                    errorMessage: "Unexpected error during analysis.",
                    analysisProgress: 0,
                    currentStep: "Error"
                }).where(eq(cases.id, caseId));
            }
        });

        return new Response(
            JSON.stringify({
                caseId,
                status: 'processing',
                message: "Analysis started. Poll /api/cases/[id]/status for updates."
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );

    } catch (error) {
        console.error("API error:", error);
        return new Response(
            JSON.stringify({ error: error instanceof Error ? error.message : "Analysis failed" }),
            { status: 500 }
        );
    }
}
