"use client";

import { Scale } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-12 border-t bg-background">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-sm text-muted-foreground font-medium">
                    © {new Date().getFullYear()} Procedo.
                </p>
            </div>
        </footer>
    );
}
