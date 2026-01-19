import { SignedIn, SignedOut } from "@clerk/nextjs";
import { OrganizationList } from "@clerk/nextjs";
import { LandingHero } from "@/components/landing-hero";

export default async function Home() {


  return (
    <>
      <SignedOut>
        <LandingHero />
      </SignedOut>
      <SignedIn>
        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="text-center space-y-6">
            <h1 className="text-2xl font-semibold tracking-tight">Select an Organization</h1>
            <OrganizationList
              hideSlug={false}
              afterSelectOrganizationUrl="/orgs/:slug"
              afterCreateOrganizationUrl="/orgs/:slug"
              appearance={{
                elements: {
                  card: "shadow-none border border-border bg-card",
                  rootBox: "w-full max-w-md mx-auto"
                }
              }}
            />
          </div>
        </div>
      </SignedIn>
    </>
  );
}
