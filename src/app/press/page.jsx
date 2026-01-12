export default function Press() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black font-inter tracking-tighter text-white">
            Press Kit
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Brand assets, media contacts, and recent coverage.
          </p>
          <div className="h-1 w-20 bg-primary mt-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-lg space-y-4">
                <h3 className="text-2xl font-bold text-white">Media Contact</h3>
                <p className="text-zinc-400">For press inquiries, interviews, or additional assets, please contact our comms team.</p>
                <a href="mailto:press@taskflow.com" className="text-primary hover:underline block font-mono">press@taskflow.com</a>
            </div>

            <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-lg space-y-4">
                <h3 className="text-2xl font-bold text-white">Brand Assets</h3>
                <p className="text-zinc-400">Download our logo, brand guidelines, and product screenshots.</p>
                <button className="px-4 py-2 bg-white text-black font-bold rounded-sm text-sm hover:bg-zinc-200 transition-colors">Download Kit (ZIP)</button>
            </div>
        </div>
      </div>
    </div>
  );
}
