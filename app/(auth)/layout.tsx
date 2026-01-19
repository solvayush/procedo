export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="grow flex items-center justify-center">
                {children}
            </div>
            <footer className="py-6 text-center text-xs text-muted-foreground border-t bg-zinc-50/50 dark:bg-zinc-950/50">
                <p>© 2026 Procedo. All rights reserved.</p>
                <div className="mt-2 space-x-4">
                    <a href="#" className="hover:underline hover:text-primary">Privacy Policy</a>
                    <a href="#" className="hover:underline hover:text-primary">Terms of Service</a>
                    <a href="#" className="hover:underline hover:text-primary">Help Center</a>
                </div>
            </footer>
        </div>
    );
}
