export default function Blog() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black font-inter tracking-tighter text-white">
            Blog
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Insignts, updates, and stories from the TaskFlow team.
          </p>
          <div className="h-1 w-20 bg-primary mt-8"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
                <article key={i} className="group cursor-pointer">
                    <div className="aspect-video bg-zinc-900 rounded-lg mb-4 overflow-hidden border border-zinc-800 group-hover:border-primary/50 transition-colors">
                        <div className="w-full h-full bg-zinc-800/50 flex items-center justify-center text-zinc-600">
                           <span className="text-sm font-mono">Image Placeholder</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Product Update</span>
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Introducing TaskFlow 2.0: The Future of Micro-Tasking</h3>
                        <p className="text-zinc-400 text-sm line-clamp-2">We've completely overhauled our platform to make earning easier and hiring faster. Here's what's new...</p>
                        <span className="text-xs text-zinc-500 block pt-2">Jan 12, 2026 • 5 min read</span>
                    </div>
                </article>
            ))}
        </div>
      </div>
    </div>
  );
}
