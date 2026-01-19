import { auth } from "@clerk/nextjs/server";
import { OrganizationList } from "@clerk/nextjs";
import { DashboardView } from "@/components/dashboard-view";
import { db } from "@/db";
import { cases } from "@/db/schema/cases";
import { eq, desc } from "drizzle-orm";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { orgSlug, orgId } = await auth();
    const { slug } = await params;

    if (slug !== orgSlug) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
                <div className="text-center space-y-4">
                    <p className="text-lg font-medium text-foreground">
                        Sorry, Organization {slug} is not valid or you do not have access.
                    </p>
                    <div className="flex justify-center">
                        <OrganizationList
                            hideSlug={false}
                            afterCreateOrganizationUrl="/orgs/:slug"
                            afterSelectOrganizationUrl="/orgs/:slug"
                        />
                    </div>
                </div>
            </div>
        );
    }

    // Fetch recent cases for this organization
    const recentCases = orgId
        ? await db
            .select()
            .from(cases)
            .where(eq(cases.orgId, orgId))
            .orderBy(desc(cases.createdAt))
            .limit(3)
        : [];

    return <DashboardView organizationName={slug} recentCases={recentCases} />;
}

