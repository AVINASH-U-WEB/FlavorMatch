import Head from 'next/head';
import Link from 'next/link';
import ingredients from '../../data/ingredients.json';
import { calculateHarmony } from '../../utils/alchemy';
import HarmonyResults from '../../components/HarmonyResults';

export default function PairingPage({ ing1, ing2, harmony, slug }) {
    if (!ing1 || !ing2) return null;

    const title = `${ing1.name} & ${ing2.name}: Flavor Match Report`;

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <div className="container mx-auto px-4 py-12 md:py-20">

                {/* Header / Report Title */}
                <header className="mb-16 border-b-4 border-black pb-8">
                    <div className="flex justify-between items-end mb-4">
                        <span className="font-mono text-xs uppercase tracking-widest bg-black text-[#F7F2E8] px-2 py-1">Confidential Report</span>
                        <span className="font-mono text-xs uppercase tracking-widest">{new Date().toLocaleDateString()}</span>
                    </div>
                    <h1 className="font-serif text-6xl md:text-8xl font-black mb-2 leading-none text-ink">
                        {ing1.name} <span className="font-light italic text-gray-400">&</span> {ing2.name}
                    </h1>
                </header>

                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Main Column: Harmony Score & Reasoning */}
                    <HarmonyResults harmony={harmony} ing1={ing1} ing2={ing2} />

                    {/* Sidebar Column: Data Specs */}
                    <aside className="lg:col-span-4 space-y-12">

                        {/* Ingredient Profiles */}
                        <div className="bg-stone-100 p-6 border-t-2 border-black">
                            <h3 className="font-mono text-xs uppercase tracking-widest mb-6 font-bold text-ink">Profile Comparison</h3>

                            <div className="space-y-8">
                                <div>
                                    <strong className="block font-serif text-xl mb-2 border-b border-black/20 pb-1 text-ink">{ing1.name}</strong>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(ing1.profile).map(([k, v]) => (
                                            v > 3 && (
                                                <div key={k} className="flex items-center gap-2 border border-black/50 px-2 py-1 rounded-full text-xs font-mono bg-white text-ink">
                                                    <span className="uppercase text-[10px]">{k}</span>
                                                    <span className="font-bold">{v}</span>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <strong className="block font-serif text-xl mb-2 border-b border-black/20 pb-1 text-ink">{ing2.name}</strong>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(ing2.profile).map(([k, v]) => (
                                            v > 3 && (
                                                <div key={k} className="flex items-center gap-2 border border-black/50 px-2 py-1 rounded-full text-xs font-mono bg-white text-ink">
                                                    <span className="uppercase text-[10px]">{k}</span>
                                                    <span className="font-bold">{v}</span>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Texture Check */}
                        <div className="p-6 border border-dashed border-black">
                            <h3 className="font-mono text-xs uppercase tracking-widest mb-4 font-bold text-ink">Texture Analysis</h3>
                            <div className="flex justify-between items-center text-sm font-serif text-ink">
                                <span>{ing1.texture}</span>
                                <span className="text-gray-400">vs</span>
                                <span>{ing2.texture}</span>
                            </div>
                            <div className="mt-2 h-1 w-full bg-gray-200">
                                {ing1.texture !== ing2.texture ? (
                                    <div className="w-full h-full bg-[#4D7C0F]"></div>
                                ) : (
                                    <div className="w-1/2 mx-auto h-full bg-gray-400"></div>
                                )}
                            </div>
                            <p className="mt-2 text-xs text-center font-mono uppercase text-gray-500">
                                {ing1.texture !== ing2.texture ? "High Contrast" : "Similar Structure"}
                            </p>
                        </div>

                        {/* Back to Home */}
                        <Link href="/" className="block w-full py-4 bg-black text-[#F7F2E8] text-center font-mono uppercase tracking-widest hover:bg-[#C2410C] transition-colors">
                            ← New Analysis
                        </Link>

                    </aside>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const { slug } = context.params;
    const parts = slug.split('-and-');

    if (parts.length < 2) return { notFound: true };

    const ing1Slug = parts[0];
    const ing2Slug = parts[1];

    const ing1 = ingredients.find(i => i.slug === ing1Slug);
    const ing2 = ingredients.find(i => i.slug === ing2Slug);

    if (!ing1 || !ing2) return { notFound: true };

    const harmony = calculateHarmony(ing1, ing2);

    return {
        props: {
            ing1,
            ing2,
            harmony,
            slug
        }
    };
}
