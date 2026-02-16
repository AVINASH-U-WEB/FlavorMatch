import Link from 'next/link';
import { useState } from 'react';

export default function IngredientSelector({ ingredients }) {
    const [search, setSearch] = useState('');
    const [selectedIng1, setSelectedIng1] = useState(null);
    const [selectedIng2, setSelectedIng2] = useState(null);

    const filteredIngredients = ingredients.filter(ing =>
        ing.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (ing) => {
        if (!selectedIng1) {
            setSelectedIng1(ing);
        } else if (!selectedIng2 && ing.id !== selectedIng1.id) {
            setSelectedIng2(ing);
        }
    };

    const resetSelection = () => {
        setSelectedIng1(null);
        setSelectedIng2(null);
    };

    return (
        <div className="bg-[#F7F2E8] border border-black p-2 md:p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-transform duration-300">

            {/* Dynamic Header for Selection */}
            <div className="border-b-2 border-black pb-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
                <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className={`flex-1 md:flex-none border border-black h-20 w-40 flex items-center justify-center font-serif text-lg ${selectedIng1 ? 'bg-black text-[#F7F2E8]' : 'bg-transparent text-gray-400 border-dashed'}`}>
                        {selectedIng1 ? selectedIng1.name : "Ingredient A"}
                        {selectedIng1 && <button onClick={() => setSelectedIng1(null)} className="ml-2 text-xs opacity-50 hover:opacity-100">✕</button>}
                    </div>
                    <span className="font-serif italic text-2xl">&</span>
                    <div className={`flex-1 md:flex-none border border-black h-20 w-40 flex items-center justify-center font-serif text-lg ${selectedIng2 ? 'bg-black text-[#F7F2E8]' : 'bg-transparent text-gray-400 border-dashed'}`}>
                        {selectedIng2 ? selectedIng2.name : "Ingredient B"}
                        {selectedIng2 && <button onClick={() => setSelectedIng2(null)} className="ml-2 text-xs opacity-50 hover:opacity-100">✕</button>}
                    </div>
                </div>

                {selectedIng1 && selectedIng2 ? (
                    <div className="flex gap-4">
                        <Link
                            href={`/pairing/${selectedIng1.slug}-and-${selectedIng2.slug}`}
                            className="flex-1 bg-black text-white text-center py-4 rounded-full font-serif text-xl hover:bg-[#C2410C] transition-colors"
                        >
                            Generate Report
                        </Link>

                        <button
                            onClick={() => {
                                const random1 = ingredients[Math.floor(Math.random() * ingredients.length)];
                                let random2 = ingredients[Math.floor(Math.random() * ingredients.length)];
                                while (random1.id === random2.id) {
                                    random2 = ingredients[Math.floor(Math.random() * ingredients.length)];
                                }
                                window.location.href = `/pairing/${random1.slug}-and-${random2.slug}`;
                            }}
                            className="px-6 py-4 border-2 border-black rounded-full font-mono text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                        >
                            Surprise Me 🎲
                        </button>
                    </div>
                ) : (
                    <div className="w-full md:w-auto flex-1 md:max-w-xs relative">
                        <input
                            type="text"
                            placeholder="Search pantry..."
                            className="w-full bg-transparent border-b border-black py-2 pl-0 pr-8 font-mono text-sm focus:outline-none focus:border-b-2 placeholder:uppercase placeholder:text-gray-400 text-ink"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <span className="absolute right-0 top-2 font-serif italic text-gray-400">🔍</span>
                    </div>
                )}
            </div>

            {/* Ingredient Menu Grid */}
            {!selectedIng1 || !selectedIng2 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black border border-black">
                    {filteredIngredients.map(ing => (
                        <button
                            key={ing.id}
                            onClick={() => handleSelect(ing)}
                            disabled={selectedIng1?.id === ing.id || selectedIng2?.id === ing.id}
                            className="bg-[#F7F2E8] p-6 text-left hover:bg-stone-200 transition-colors group h-full flex flex-col justify-between disabled:opacity-50 disabled:cursor-not-allowed text-ink"
                        >
                            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-2">{ing.category}</span>
                            <span className="font-serif text-xl group-hover:italic">{ing.name}</span>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center font-serif text-2xl animate-fade-in-up text-ink">
                    Ready to analyze. Click "Generate Report" to view the data.
                </div>
            )}
        </div>
    );
}
