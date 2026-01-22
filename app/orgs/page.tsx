"use client";

import { OrganizationList } from "@clerk/nextjs";

export default function OrgsPage() {
    return (
        <div className="flex min-h-[80vh] items-center justify-center p-6 bg-muted/30">
            <div className="text-center space-y-12 w-full max-w-4xl">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
                        Institutional Portal
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium">
                        Select your professional arbitration workspace or initialize a new institutional protocol.
                    </p>
                </div>

                <div className="flex justify-center">
                        <OrganizationList
                            hideSlug={false}
                            afterSelectOrganizationUrl="/orgs/:slug"
                            afterCreateOrganizationUrl="/orgs/:slug"
                            appearance={{
                                elements: {
                                    rootBox: "w-full",
                                    card: "shadow-none border-none bg-transparent p-0 w-full",
                                    organizationListHeader: "hidden",
                                    organizationSwitcherTrigger: "h-12 border-2",
                                    membersPageTitle_root: "hidden",
                                    navbar: "hidden",
                                },
                                variables: {
                                    colorPrimary: "oklch(0.40 0.15 260)", // Matching our primary blue
                                }
                            }}
                        />
                </div>

                <div className="space-y-2">
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                        Secure Access Group
                    </p>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                        Access is restricted to verified tribunal members. <br />
                        Need a higher permission level? Contact the Registrar.
                    </p>
                </div>
            </div>
        </div>
    );
}
