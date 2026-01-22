"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
    return (
        <section className="py-32 bg-muted/30">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">
                    Ready to Modernize <br className="hidden md:block" /> Your Institution?
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                    Join the world’s leading arbitration centers in implementing a new standard of procedural intelligence.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button size="lg" className="h-16 px-12 text-xl font-black shadow-2xl shadow-primary/30 group">
                        Get Started
                        <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="lg" className="h-16 px-12 text-xl font-bold bg-background/50 backdrop-blur-sm">
                        Contact Sales
                    </Button>
                </div>

                <div className="mt-20 flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm font-bold opacity-40 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                        SLA Guaranteed
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                        SOC2 Type II
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                        ISO 27001
                    </div>
                </div>
            </div>
        </section>
    );
}
