"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Database, LayoutGrid, Lock, Search, Share2, TrendingDown } from "lucide-react";

export function BentoFeatures() {
    return (
        <section id="solutions" className="py-32 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Procedural Intelligence <br /> for Every Department.</h2>
                    <p className="text-xl text-muted-foreground">
                        From the Registrar to the Tribunal, Procedo provides the modular tools necessary for institutional excellence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
                    {/* Main Feature: Compliance Engine */}
                    <Card className="md:col-span-8 flex flex-col md:flex-row items-stretch overflow-hidden group shadow-xl hover:border-primary/50 transition-colors border-2">
                        <div className="flex-1 p-8 flex flex-col justify-center bg-primary text-primary-foreground">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-black mb-4 leading-tight">Institutional Compliance Protocol</h3>
                            <p className="opacity-90 leading-relaxed text-lg mb-6">
                                Automated auditing against the ICSID Convention and internal institutional rules. Never miss a mandatory provision again.
                            </p>
                            <div className="flex gap-2">
                                <Badge variant="secondary" className="bg-white/10 text-white border-transparent">Article 44</Badge>
                                <Badge variant="secondary" className="bg-white/10 text-white border-transparent">Rule 18</Badge>
                                <Badge variant="secondary" className="bg-white/10 text-white border-transparent">Rule 22</Badge>
                            </div>
                        </div>
                        <div className="flex-1 bg-muted relative overflow-hidden hidden md:block">
                            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent"></div>
                            {/* Fake UI visualization */}
                            <div className="absolute top-10 right-[-50px] w-full bg-card p-6 rounded-xl border-2 shadow-2xl -rotate-2 opacity-80">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div className="font-bold">Rule 6 Compliance</div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-2 w-full bg-muted rounded"></div>
                                    <div className="h-2 w-3/4 bg-muted rounded"></div>
                                    <div className="h-2 w-1/2 bg-muted rounded"></div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Feature: Precedent Search */}
                    <Card className="md:col-span-4 p-8 flex flex-col justify-end bg-card border-2 shadow-lg hover:border-primary/50 transition-colors">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                            <Database className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 tracking-tight">Deep Benchmarking</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Match procedural orders against a proprietary database of 50,000+ historical events.
                        </p>
                    </Card>

                    {/* Feature: Cost Optimization */}
                    <Card className="md:col-span-4 p-8 flex flex-col items-center justify-center text-center bg-muted/20 border-2 border-dashed shadow-sm hover:border-primary/50 transition-colors">
                        <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <TrendingDown className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 tracking-tight">Cost Management</h3>
                        <p className="text-muted-foreground">
                            Reduce administrative workload by up to 40% through automated procedural drafting support.
                        </p>
                    </Card>

                    {/* Feature: Security */}
                    <Card className="md:col-span-8 flex items-center bg-zinc-900 text-zinc-100 overflow-hidden shadow-2xl">
                        <div className="flex-1 p-8 md:p-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold mb-6 tracking-widest uppercase">
                                Institutional Security
                            </div>
                            <h3 className="text-3xl font-black mb-4 tracking-tight">Triple-Locked Enclave</h3>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Enterprise-grade encryption with Zero-Knowledge architecture. Your case documents never leave your institutional domain.
                            </p>
                        </div>
                        <div className="w-1/3 h-full bg-zinc-800 opacity-50 relative hidden md:flex items-center justify-center">
                            <Lock className="w-32 h-32 absolute -bottom-10 -right-10 text-zinc-700 opacity-20" />
                            <div className="p-10 border border-zinc-700/50 rounded-full">
                                <Lock className="w-10 h-10 text-zinc-500" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}
