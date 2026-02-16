import Link from 'next/link';

export default function HarmonyResults({ harmony, ing1, ing2 }) {
    if (!harmony || !ing1 || !ing2) return null;

    return (
        <div className="lg:col-span-8 space-y-12">

            {/* Result Block */}
            <div className="border border-black p-8 md:p-12 relative bg-white">
                <div className="absolute top-0 left-0 bg-black text-white px-4 py-2 font-mono text-sm font-bold uppercase">
                    Final Assessment
                </div>

                <div className="flex flex-col md:flex-row items-baseline justify-between gap-8 mt-8">
                    <div>
                        <h2 className="font-serif text-4xl mb-2">{harmony.label}</h2>
                        <p className="font-sans text-xl max-w-md leading-relaxed text-ink">
                            {harmony.reasoning[0]}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="block font-mono text-xs uppercase tracking-widest text-gray-500 mb-1">Harmony Index</span>
                        <span className="font-serif text-8xl font-black tracking-tighter">{harmony.score}</span>
                        <span className="block font-mono text-sm text-gray-400 mb-4">/100</span>

                        <button
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: `Flavor Match: ${ing1.name} + ${ing2.name}`,
                                        text: `Check out this flavor pairing analysis! Score: ${harmony.score}/100`,
                                        url: window.location.href
                                    })
                                } else {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('Link copied to clipboard!');
                                }
                            }}
                            className="inline-block bg-black text-white px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-[#C2410C] transition-colors"
                        >
                            Share Report ↗
                        </button>
                    </div>
                </div>

                {/* Simple Bar Chart Visualization */}
                <div className="mt-12 h-4 w-full bg-gray-100 rounded-full overflow-hidden border border-black">
                    <div
                        className={`h-full ${harmony.score >= 50 ? 'bg-black' : 'bg-red-600'}`} // Conditional logic moved here
                        style={{ width: `${harmony.score}%` }}
                    ></div>
                </div>
            </div>

            {/* Detailed Analysis Text */}
            <div className="prose prose-lg font-serif">
                <h3 className="font-sans font-bold uppercase tracking-widest text-sm border-b border-black pb-2 mb-6 text-ink">Molecular Breakdown</h3>
                <ul className="list-none pl-0 space-y-6">
                    {harmony.reasoning.map((reason, idx) => (
                        <li key={idx} className="flex gap-4 items-start">
                            <span className="font-mono font-bold text-xs mt-1">0{idx + 1}</span>
                            <p className="m-0 leading-relaxed text-gray-800">{reason}. This interaction creates a balanced profile on the palate.</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
