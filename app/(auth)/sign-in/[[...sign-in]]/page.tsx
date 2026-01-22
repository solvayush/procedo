import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 flex flex-col items-center">
                <SignIn
                    forceRedirectUrl="/orgs"
                    signUpForceRedirectUrl="/orgs"
                    appearance={{
                        elements: {
                            card: "shadow-none border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black rounded-xl",
                            headerTitle: "text-zinc-900 dark:text-zinc-100",
                            headerSubtitle: "text-zinc-500 dark:text-zinc-400",
                            formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
                            footerActionLink: "text-primary hover:text-primary/90"
                        }
                    }}
                />
            </div>
        </div>
    );
}
