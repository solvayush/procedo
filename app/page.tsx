"use client";

import { Navbar } from "@/components/home/navbar";
import { Footer } from "@/components/home/footer";
import { Button } from "@/components/ui/button";
import { Scale, ArrowRight, Building2, UserCircle2, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function RootPage() {
    return (
        <main className="min-h-screen bg-background text-foreground scroll-smooth flex flex-col">
            <Navbar />

            {/* Warning Banner */}
            <div className="mt-24 bg-amber-500/10 border-y border-amber-500/20 py-3 text-center animate-in fade-in slide-in-from-top duration-700">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-2 text-amber-500 text-sm font-semibold">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Currently optimized for <span className="underline decoration-2 underline-offset-4">ICSID Rules</span>. Support for PCA, ICC, and UNCITRAL rules coming soon.</span>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center py-20 px-6 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 -z-10 pointer-events-none">
                    <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent"></div>
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full opacity-50"></div>
                </div>

                {/* Content */}
                <div className="max-w-4xl w-full text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 shadow-sm">
                        HACKATHON BUILD v1.0
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
                        The Procedural Layer for <br />
                        <span className="text-primary italic">International Arbitration.</span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                        Procedo streamlines the procedural complexities of international arbitral proceedings, ensuring compliance and efficiency at every step.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 text-left">
                        {/* Institution Access */}
                        <Link href="/orgs" className="group relative p-10 rounded-3xl border bg-card hover:border-primary/50 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10">
                            {/* Hover Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-inner">
                                    <Building2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-black mb-4 tracking-tight">Institution Portal</h3>
                                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                    Full-scale administrative control. Manage panels, track jurisdictional milestones, and ensure procedural integrity.
                                </p>
                                <div className="flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all duration-300">
                                    Access Portal <ArrowRight className="w-5 h-5" />
                                </div>
                            </div>
                        </Link>

                        {/* Party/Arbitrator Access */}
                        <Link href="/orgs" className="group relative p-10 rounded-3xl border bg-card hover:border-primary/50 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10">
                            {/* Hover Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-inner">
                                    <UserCircle2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-black mb-4 tracking-tight">User & Arbitrator</h3>
                                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                    Unified case management. Securely access files, view procedural orders, and manage submissions in real-time.
                                </p>
                                <div className="flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all duration-300">
                                    Enter Dashboard <ArrowRight className="w-5 h-5" />
                                </div>
                            </div>
                        </Link>
                    </div>

                    
                </div>
            </div>

            <Footer />
        </main>
    );
}
