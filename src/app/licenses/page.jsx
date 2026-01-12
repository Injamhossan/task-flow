export default function Licenses() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black font-inter tracking-tighter text-white">
            Licenses
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Attributions and open source licenses for the technologies powering TaskFlow.
          </p>
          <div className="h-1 w-20 bg-primary mt-8"></div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             { name: "Next.js", license: "MIT", url: "https://nextjs.org" },
             { name: "React", license: "MIT", url: "https://react.dev" },
             { name: "Tailwind CSS", license: "MIT", url: "https://tailwindcss.com" },
             { name: "Framer Motion", license: "MIT", url: "https://www.framer.com/motion/" },
             { name: "Lucide Icons", license: "ISC", url: "https://lucide.dev" },
             { name: "Firebase", license: "Apache 2.0", url: "https://firebase.google.com" },
             { name: "MongoDB", license: "SSPL", url: "https://www.mongodb.com" },
             { name: "Stripe", license: "Commercial", url: "https://stripe.com" },
           ].map((tech) => (
             <a 
               key={tech.name} 
               href={tech.url} 
               target="_blank" 
               rel="noopener noreferrer"
               className="block p-6 bg-zinc-900 border border-zinc-800 rounded-sm hover:border-primary/50 transition-colors group"
             >
               <div className="flex justify-between items-start mb-4">
                 <h3 className="text-xl font-bold font-inter text-white group-hover:text-primary transition-colors">{tech.name}</h3>
                 <span className="text-xs font-mono text-zinc-500 border border-zinc-800 px-2 py-1 rounded-full">{tech.license}</span>
               </div>
               <p className="text-zinc-500 text-sm">
                 Powered by {tech.name}. Click to view license details.
               </p>
             </a>
           ))}
        </div>

      </div>
    </div>
  );
}
