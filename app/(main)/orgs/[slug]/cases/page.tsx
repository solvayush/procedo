import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { cases } from "@/db/schema/cases";
import { eq, desc } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ChevronLeft, Calendar, User } from "lucide-react";
import Link from "next/link";

export default async function CasesPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { orgSlug, orgId } = await auth();
    const { slug } = await params;

    if (orgSlug !== slug || !orgId) {
        redirect("/");
    }

    // Fetch all cases for this organization
    const orgCases = await db
        .select()
        .from(cases)
        .where(eq(cases.orgId, orgId))
        .orderBy(desc(cases.createdAt));

    return (
        <div className="min-h-screen bg-background p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <div>
                    <Link
                        href={`/orgs/${slug}`}
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Case History</h1>
                    <p className="text-muted-foreground">
                        View all analyzed cases and their AI recommendations
                    </p>
                </div>

                {orgCases.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <FileText className="h-16 w-16 text-muted-foreground/20 mb-4" />
                            <p className="text-muted-foreground mb-4">No cases analyzed yet</p>
                            <Button asChild>
                                <Link href={`/orgs/${slug}/cases/new`}>Analyze First Case</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {orgCases.map((caseItem) => (
                            <Card key={caseItem.id} className="hover:border-primary/50 transition-colors">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="flex items-center gap-2">
                                                <FileText className="h-5 w-5 text-primary" />
                                                {caseItem.caseTitle}
                                            </CardTitle>
                                            <CardDescription className="mt-2 space-y-1">
                                                <div className="flex items-center gap-2 text-xs">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(caseItem.createdAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <FileText className="h-3 w-3" />
                                                    {caseItem.fileName} ({(caseItem.fileSize / 1024 / 1024).toFixed(2)} MB)
                                                </div>
                                            </CardDescription>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <Badge
                                                variant={
                                                    caseItem.status === "analyzed"
                                                        ? "default"
                                                        : caseItem.status === "error"
                                                            ? "destructive"
                                                            : "secondary"
                                                }
                                            >
                                                {caseItem.status}
                                            </Badge>
                                            {caseItem.status === "analyzed" && (
                                                <Button asChild size="sm">
                                                    <Link href={`/orgs/${slug}/cases/${caseItem.id}`}>
                                                        View Analysis
                                                    </Link>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
