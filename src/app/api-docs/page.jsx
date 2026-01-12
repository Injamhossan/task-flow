export default function APIDocs() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black font-inter tracking-tighter text-white">
            Developer API
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Integrate TaskFlow's workforce into your own applications.
          </p>
          <div className="h-1 w-20 bg-primary mt-8"></div>
        </div>

        <div className="p-12 border border-zinc-800 rounded-lg bg-zinc-900/50 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-zinc-400 mb-8">Our public API is currently in closed beta. Join the waitlist to get early access.</p>
            <button className="px-8 py-3 bg-zinc-800 text-white font-bold rounded-sm border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 transition-all">Join API Waitlist</button>
        </div>
      </div>
    </div>
  );
}
