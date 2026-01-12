import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-6xl font-black font-inter tracking-tighter text-white">
            Simple Pricing
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Zero fees for workers. Transparent fees for buyers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Workers */}
            <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-xl relative overflow-hidden group hover:border-zinc-700 transition-all">
                <h3 className="text-2xl font-bold text-white mb-2">Workers</h3>
                <div className="text-5xl font-black text-white mb-6">0% <span className="text-lg font-normal text-zinc-500">fees</span></div>
                <p className="text-zinc-400 mb-8">Keep 100% of what you earn. We believe your hard work belongs to you.</p>
                <ul className="space-y-4 mb-8">
                    {['Instant Withdrawals', 'No Monthly Fees', 'Crypto & Fiat Options', '24/7 Support'].map(item => (
                        <li key={item} className="flex items-center gap-3 text-zinc-300">
                            <Check className="text-primary w-5 h-5" /> {item}
                        </li>
                    ))}
                </ul>
                <button className="w-full py-4 bg-zinc-800 text-white font-bold rounded-sm hover:bg-zinc-700 transition-colors">Start Earning</button>
            </div>

            {/* Buyers */}
            <div className="p-8 bg-zinc-900 border border-primary/20 rounded-xl relative overflow-hidden group hover:border-primary/50 transition-all">
                <div className="absolute top-0 right-0 bg-primary/20 text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-bl-xl">Most Popular</div>
                <h3 className="text-2xl font-bold text-white mb-2">Buyers</h3>
                <div className="text-5xl font-black text-white mb-6">5% <span className="text-lg font-normal text-zinc-500">fee</span></div>
                <p className="text-zinc-400 mb-8">Small fee on approved tasks only. No hidden charges.</p>
                <ul className="space-y-4 mb-8">
                    {['Post Unlimited Jobs', 'Money-Back Guarantee', 'Advanced Targeting', 'API Access'].map(item => (
                        <li key={item} className="flex items-center gap-3 text-zinc-300">
                            <Check className="text-primary w-5 h-5" /> {item}
                        </li>
                    ))}
                </ul>
                <button className="w-full py-4 bg-primary text-black font-bold rounded-sm hover:bg-primary/90 transition-colors">Post a Job</button>
            </div>
        </div>
      </div>
    </div>
  );
}
