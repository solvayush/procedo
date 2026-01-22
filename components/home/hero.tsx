"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Gavel, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Dynamic Grid Background */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full opacity-50"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 animate-fade-in shadow-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    SECURE PROCEDURAL PROTOCOL 2.0
                </div>

                <h1 className="text-5xl md:text-8xl font-black tracking-tight text-foreground mb-8 leading-[0.95] md:leading-[1.1]">
                    The Operating System <br /> for Modern <span className="text-primary italic">Arbitration.</span>
                </h1>

                <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
                    Procedo provides arbitration institutions with the procedural intelligence needed to maintain compliance, mitigate risk, and ensure absolute award integrity.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-24">
                    <Button size="lg" className="h-14 px-10 text-lg font-bold shadow-2xl shadow-primary/30 group">
                        Start Analysis
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="lg" className="h-14 px-10 text-lg font-bold bg-background/50 backdrop-blur-sm">
                        Read Whitepaper
                    </Button>
                </div>

                {/* Floating Feature Cards - Subtle & Premium */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
                    <div className="p-8 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all hover:border-primary/30 group">
                        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-xl text-primary mb-6 group-hover:scale-110 transition-transform">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Sovereign Compliance</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Real-time benchmarking against institutional rules and investment treaty standards to ensure procedural finality.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all hover:border-primary/30 group">
                        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-xl text-primary mb-6 group-hover:scale-110 transition-transform">
                            <Gavel className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Intelligent Benchmarking</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Analyze procedural decisions against a global database of precedents to predict and avoid annulment risks.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all hover:border-primary/30 group">
                        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-xl text-primary mb-6 group-hover:scale-110 transition-transform">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Cost Mitigation</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Significantly reduce administrative burden and translation costs through automated efficiency recommendations.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
