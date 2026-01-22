"use client";

import { Navbar } from "@/components/home/navbar";
import { Hero } from "@/components/home/hero";
import { Institutions } from "@/components/home/institutions";
import { BentoFeatures } from "@/components/home/bento-features";
import { CTA } from "@/components/home/cta";
import { Footer } from "@/components/home/footer";

export default function RootPage() {
    return (
        <main className="min-h-screen bg-background text-foreground scroll-smooth">
            <Navbar />
            <Hero />
            <Institutions />
            <BentoFeatures />
            <CTA />
            <Footer />
        </main>
    );
}
