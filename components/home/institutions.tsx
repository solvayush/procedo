"use client";

const institutions = [
    "ICSID",
    "ICC",
    "LCIA",
    "PCA",
    "SIAC",
    "HKIAC"
];

export function Institutions() {
    return (
        <section id="institutions" className="py-24 border-y bg-muted/30">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-center text-sm font-bold tracking-widest text-muted-foreground uppercase mb-16">
                    Architected for Global Standards
                </p>

                <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                    {institutions.map((inst) => (
                        <div key={inst} className="flex items-center gap-2 group cursor-default">
                            <span className="text-4xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">
                                {inst}
                            </span>
                            <div className="h-1.5 w-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>

                <p className="text-center mt-16 text-muted-foreground max-w-2xl mx-auto italic text-sm">
                    Procedo provides strictly non-binding intelligence calibrated to the specific procedural requirements of the world’s leading arbitral frameworks.
                </p>
            </div>
        </section>
    );
}
