import Link from 'next/link';
import Head from 'next/head';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col selection:bg-stone-300 selection:text-black">
            <Head>
                <meta name="theme-color" content="#F7F2E8" />
            </Head>

            {/* Editorial Header */}
            <header className="border-b-2 border-black bg-[#F7F2E8] sticky top-0 z-40">
                <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">

                    <nav className="hidden md:flex gap-6 text-sm font-mono tracking-widest uppercase">
                        <Link href="/" className="hover:underline hover:decoration-2 underline-offset-4">Index</Link>
                        <Link href="/about" className="hover:underline hover:decoration-2 underline-offset-4">Methodology</Link>
                    </nav>

                    <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 text-center group">
                        <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight">
                            Flavor<span className="italic font-light">Match</span>
                        </h1>
                        <span className="hidden md:block text-[10px] font-mono tracking-[0.3em] uppercase mt-1 opacity-60">
                            Est. 2024 • Vol. 1
                        </span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <a href="https://github.com/raftlabs" target="_blank" rel="noopener noreferrer" className="text-sm font-bold border border-black px-4 py-1 rounded-full hover:bg-black hover:text-[#F7F2E8] transition-colors uppercase tracking-widest text-[10px]">
                            Subscribe
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Editorial Footer */}
            <footer className="border-t-2 border-black bg-[#F7F2E8] py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="col-span-2">
                            <h2 className="font-serif text-4xl mb-6">Flavor is a science.<br />We are the researchers.</h2>
                            <p className="font-mono text-sm max-w-md opacity-70 leading-relaxed">
                                Flavor Match is a digital publication dedicated to exploring the molecular harmony between ingredients.
                                Powered by data, curated for the palate.
                            </p>
                        </div>

                        <div className="border-l border-black pl-8 hidden md:block">
                            <h3 className="font-bold text-xs uppercase tracking-widest mb-4">Sitemap</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/" className="hover:italic">Home</Link></li>
                                <li><Link href="/pairing/tomato-and-basil" className="hover:italic">Sample Report</Link></li>
                                <li><Link href="/about" className="hover:italic">About</Link></li>
                            </ul>
                        </div>

                        <div className="border-l border-black pl-8 hidden md:block">
                            <h3 className="font-bold text-xs uppercase tracking-widest mb-4">Legal</h3>
                            <ul className="space-y-2 text-sm opacity-60">
                                <li>Privacy Policy</li>
                                <li>Terms of Use</li>
                                <li>Cookie Settings</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-black/20 flex justify-between items-end">
                        <span className="font-mono text-xs uppercase">© {new Date().getFullYear()} Flavor Match</span>
                        <span className="font-serif italic text-2xl">Bon Appétit</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
