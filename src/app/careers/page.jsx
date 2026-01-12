export default function Careers() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black font-inter tracking-tighter text-white">
            Careers
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Join the team building the future of work.
          </p>
          <div className="h-1 w-20 bg-primary mt-8"></div>
        </div>

        <div className="grid gap-6">
            <div className="p-8 border border-dashed border-zinc-800 rounded-lg bg-zinc-900/20 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">No Openings Currently</h3>
                <p className="text-zinc-400 mb-6">We're fully staffed at the moment, but we're always looking for exceptional talent.</p>
                <a href="mailto:jobs@taskflow.com" className="px-6 py-3 bg-white text-black font-bold rounded-sm hover:bg-zinc-200 transition-colors inline-block">Send Open Application</a>
            </div>
        </div>
      </div>
    </div>
  );
}
