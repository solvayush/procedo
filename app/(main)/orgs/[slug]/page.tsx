import { auth } from "@clerk/nextjs/server";
import { OrganizationList } from "@clerk/nextjs";
import { DashboardView } from "@/components/dashboard-view";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { orgSlug } = await auth();
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

    return <DashboardView organizationName={slug} />;
}
