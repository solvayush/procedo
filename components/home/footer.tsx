"use client";

import { Scale } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-20 border-t bg-background">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-4 space-y-6">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-lg">
                            <Scale className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-foreground">
                            Procedo
                        </span>
                    </Link>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                        The standard for procedural intelligence in international arbitration. Ensuring award integrity across borders.
                    </p>
                </div>

                <div className="md:col-span-2 space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Product</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li><Link href="#solutions" className="hover:text-primary transition-colors">Features</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Integration</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Security</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Roadmap</Link></li>
                    </ul>
                </div>

                <div className="md:col-span-2 space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Company</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Governance</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Legal</Link></li>
                    </ul>
                </div>

                <div className="md:col-span-4 flex flex-col justify-between items-end">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-muted transition-colors cursor-pointer">
                            <svg className="w-5 h-5 fill-foreground" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </div>
                        <div className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-muted transition-colors cursor-pointer">
                            <svg className="w-5 h-5 fill-foreground" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-6">
                        © {new Date().getFullYear()} Procedo Intelligence Ltd. <br /> All rights reserved. Registered P.O. 1023.
                    </p>
                </div>
            </div>
        </footer>
    );
}
