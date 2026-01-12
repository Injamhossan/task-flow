export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black font-inter tracking-tighter text-white">
            How It Works
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            TaskFlow connects people who have money with people who have time.
          </p>
          <div className="h-1 w-20 bg-primary mt-8"></div>
        </div>

        <div className="grid gap-12 text-zinc-300 font-inter">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">For Workers</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { title: "1. Sign Up", desc: "Create your free account in seconds." },
                    { title: "2. Complete Tasks", desc: "Browse thousands of micro-tasks and complete the ones you like." },
                    { title: "3. Get Paid", desc: "Receive instant payouts to your preferred method." }
                ].map((step, i) => (
                    <div key={i} className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-zinc-400">{step.desc}</p>
                    </div>
                ))}
            </div>
          </section>

          <section className="space-y-4 pt-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">For Buyers</h2>
             <div className="grid md:grid-cols-3 gap-6">
                {[
                    { title: "1. Post a Job", desc: "Describe what you need done and set your price." },
                    { title: "2. Watch it Happen", desc: "Workers verify and complete your tasks." },
                    { title: "3. Approve & Pay", desc: "Only pay for work that meets your standards." }
                ].map((step, i) => (
                    <div key={i} className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-zinc-400">{step.desc}</p>
                    </div>
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
