export default function FAQs() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black font-inter tracking-tighter text-white">
            FAQs
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Common questions about TaskFlow.
          </p>
          <div className="h-1 w-20 bg-primary mt-8"></div>
        </div>

        <div className="space-y-8">
            {[
                { q: "How much can I earn?", a: "Earnings depend on the time you invest. Top workers earn up to $50/day completion micro-tasks." },
                { q: "How do I get paid?", a: "We support Stripe (for bank transfers) and various Crypto withdrawals (BTC, ETH, USDT). Payouts are instant." },
                { q: "Is TaskFlow free to use?", a: "Yes! For workers, it is completely free. We charge buyers a small 5% fee on approved tasks." },
                { q: "Can I be both a buyer and a worker?", a: "Absolutely. You can switch roles instantly from your dashboard." },
                { q: "What happens if a buyer doesn't pay?", a: "Funds are held in escrow when a task is started. If you complete the work, you are guaranteed payment." }
            ].map((faq, i) => (
                <div key={i} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:bg-zinc-900 transition-colors">
                    <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                    <p className="text-zinc-400 leading-relaxed">{faq.a}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
