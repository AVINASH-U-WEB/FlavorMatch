import Head from 'next/head';
import Link from 'next/link';
import ingredients from '../data/ingredients.json';
import { calculateHarmony } from '../utils/alchemy';
import IngredientSelector from '../components/IngredientSelector';

export default function Home({ dailyDiscoveries }) {

  return (
    <>
      <Head>
        <title>Flavor Match | The Science of Taste</title>
        <meta name="description" content="Discover perfect ingredient pairings with Flavor Match." />
      </Head>

      {/* Hero / Cover Section */}
      <section className="border-b border-black">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <span className="font-mono text-xs uppercase tracking-widest border border-black rounded-full px-3 py-1 mb-6 inline-block">
                Issue No. 1: {dailyDiscoveries[0].ing1.name} & Friends
              </span>
              <h1 className="font-serif text-7xl md:text-9xl font-black leading-[0.9] tracking-tighter mb-8 text-ink">
                The Science <br />
                <span className="italic font-light text-stone-600">of</span> Harmony
              </h1>
              <p className="font-sans text-xl max-w-2xl leading-relaxed border-l-2 border-black pl-6 ml-2 text-ink">
                Discover why some flavors sing while others clash. Our molecular index decodes the hidden chemistry of your pantry.
              </p>
            </div>
            <div className="lg:col-span-4 text-right hidden lg:block">
              <div className="w-full aspect-[3/4] bg-neutral-900 text-[#F7F2E8] p-8 flex flex-col justify-between items-start text-left">
                <span className="font-mono text-xs uppercase tracking-widest">Featured</span>
                <div>
                  <span className="text-4xl font-serif block mb-2">{dailyDiscoveries[0].ing1.name}<br />& {dailyDiscoveries[0].ing2.name}</span>
                  <Link href={`/pairing/${dailyDiscoveries[0].slug}`} className="font-mono text-xs hover:underline decoration-1 underline-offset-4">
                    Read Analysis →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Laboratory (Interactive Grid) */}
      <section className="py-20 bg-stone-100 border-b border-black">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-4 text-ink">The Laboratory</h2>
            <p className="font-mono text-sm uppercase tracking-widest opacity-60">Select two ingredients to begin analysis</p>
          </div>

          <IngredientSelector ingredients={ingredients} />
        </div>
      </section>

      {/* Daily Digest */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="font-mono text-xs uppercase tracking-widest border-t border-black pt-4 mb-12 flex justify-between">
          <span>Daily Digest</span>
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8 md:gap-px md:bg-black md:border md:border-black">
          {dailyDiscoveries.map((pair, idx) => (
            <Link
              key={idx}
              href={`/pairing/${pair.slug}`}
              className="bg-[#F7F2E8] md:p-12 group hover:bg-stone-100 transition-all text-ink"
            >
              <div className="aspect-[4/3] bg-stone-200 mb-6 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-stone-300 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                <h3 className="font-serif text-3xl z-10 text-center">
                  {pair.ing1.name} <br /> <span className="italic text-gray-400">&</span> <br /> {pair.ing2.name}
                </h3>
              </div>

              <div className="flex justify-between items-baseline border-b border-black pb-2 mb-4">
                <span className="font-bold font-serif text-xl">Harmony Index</span>
                <span className="font-mono text-2xl font-bold">{pair.harmony.score}</span>
              </div>

              <p className="font-serif text-lg leading-snug mb-4 group-hover:underline decoration-1 underline-offset-4">
                {pair.harmony.label}
              </p>
              <p className="font-sans text-sm opacity-70 line-clamp-3">
                {pair.harmony.reasoning.join('. ')}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const discoveries = [];
  const shuffled = [...ingredients].sort(() => 0.5 - Math.random());

  for (let i = 0; i < 3; i++) {
    const ing1 = shuffled[i];
    const ing2 = shuffled[shuffled.length - 1 - i];
    const harmony = calculateHarmony(ing1, ing2);

    discoveries.push({
      ing1,
      ing2,
      harmony,
      slug: `${ing1.slug}-and-${ing2.slug}`
    });
  }

  return {
    props: {
      dailyDiscoveries: discoveries
    }
  };
}
