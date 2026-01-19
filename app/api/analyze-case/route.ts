import { NextRequest } from "next/server";
// @ts-ignore
import PDFParser from "pdf2json";
import { generateRecommendations } from "@/lib/recommendation-engine";
import { auth } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";
import { db } from "@/db";
import { cases } from "@/db/schema/cases";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";
export const maxDuration = 60; // 60 seconds for complex analysis

async function extractPDFText(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
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

export async function POST(req: NextRequest) {
    try {
        // 1. Authenticate and get org context
        const { userId, orgId } = await auth();
        if (!userId || !orgId) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        // 2. Parse form data
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const caseTitle = (formData.get("caseTitle") as string) || file.name.replace('.pdf', '');

        if (!file) {
            return new Response(JSON.stringify({ error: "No file provided" }), { status: 400 });
        }

        // 3. File size validation (max 10MB)
        const MAX_FILE_SIZE = 10 * 1024 * 1024;
        if (file.size > MAX_FILE_SIZE) {
            return new Response(
                JSON.stringify({ error: `File too large. Max size is ${MAX_FILE_SIZE / 1024 / 1024}MB` }),
                { status: 400 }
            );
        }

        // 4. Upload file to Vercel Blob
        const blob = await put(`cases/${orgId}/${Date.now()}-${file.name}`, file, {
            access: 'public',
        });

        // 5. Create case record in database
        const [caseRecord] = await db.insert(cases).values({
            orgId,
            userId,
            caseTitle,
            fileName: file.name,
            fileSize: file.size,
            fileUrl: blob.url,
            status: 'pending',
        }).returning();

        // 6. Extract text from PDF
        let text: string;
        try {
            text = await extractPDFText(file);
            if (!text || text.trim().length === 0) {
                throw new Error("Could not extract text from PDF");
            }
        } catch (error) {
            // Update case with error
            await db.update(cases)
                .set({
                    status: 'error',
                    errorMessage: 'Could not extract text from PDF'
                })
                .where(eq(cases.id, caseRecord.id));

            return new Response(JSON.stringify({ error: "Could not extract text from PDF" }), {
                status: 400,
            });
        }

        // 7. Generate recommendations (streaming)
        const stream = await generateRecommendations({
            text,
            orgId,
        });

        // 8. Collect the full response to save to database
        let fullRecommendations = "";
        const encoder = new TextEncoder();
        const readableStream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of stream) {
                        if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
                            const text = chunk.delta.text;
                            fullRecommendations += text;
                            controller.enqueue(encoder.encode(text));
                        }
                    }

                    // Save recommendations to database after streaming completes
                    try {
                        const cleanedData = fullRecommendations.trim()
                            .replace(/^```json\s*/i, '')
                            .replace(/^```\s*/i, '')
                            .replace(/\s*```$/i, '')
                            .trim();

                        const parsedRecommendations = JSON.parse(cleanedData);

                        await db.update(cases)
                            .set({
                                status: 'analyzed',
                                aiRecommendations: parsedRecommendations,
                                analyzedAt: new Date()
                            })
                            .where(eq(cases.id, caseRecord.id));
                    } catch (e) {
                        console.error("Failed to save recommendations:", e);
                    }

                    controller.close();
                } catch (error) {
                    controller.error(error);
                }
            },
        });

        return new Response(readableStream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
                "X-Case-Id": caseRecord.id, // Send case ID in header
            },
        });
    } catch (error) {
        console.error("Error analyzing case:", error);
        return new Response(
            JSON.stringify({ error: "Analysis failed", details: String(error) }),
            { status: 500 }
        );
    }
}
