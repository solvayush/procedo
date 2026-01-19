import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { ArrowRight, Scale } from "lucide-react";

export function LandingHero() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <div className="relative z-10 text-center space-y-8 px-4 max-w-4xl mx-auto">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                    Now in Beta
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
                    Procedural Intelligence <br className="hidden md:block" /> for <span className="text-gradient">Arbitration</span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Ensure procedural integrity with AI-powered guidance benchmarked against institutional rules and best practices.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                    <SignInButton mode="modal">
                        <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/25">
                            Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </SignInButton>
                    <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                        View Documentation
                    </Button>
                </div>

                <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center opacity-80">
                    <div className="space-y-2">
                        <div className="bg-primary/5 w-12 h-12 rounded-lg flex items-center justify-center mx-auto text-primary">
                            <Scale className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold">Rule Compliance</h3>
                        <p className="text-sm text-muted-foreground">Automated checks against institutional frameworks.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="bg-primary/5 w-12 h-12 rounded-lg flex items-center justify-center mx-auto text-primary">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="font-semibold">Smart Guidance</h3>
                        <p className="text-sm text-muted-foreground">Non-binding suggestions for procedural efficiency.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="bg-primary/5 w-12 h-12 rounded-lg flex items-center justify-center mx-auto text-primary">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </div>
                        <h3 className="font-semibold">Secure & Private</h3>
                        <p className="text-sm text-muted-foreground">Enterprise-grade security for sensitive case data.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
