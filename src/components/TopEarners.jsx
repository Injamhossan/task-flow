"use client";

import { ArrowUpRight, Star, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery, gql } from "@apollo/client";

const GET_TOP_EARNERS = gql`
  query GetTopEarners {
    topEarners {
      _id
      name
      role
      coin
      totalTasks
      photoURL
    }
  }
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function TopEarners() {
  const { data, loading: isLoading } = useQuery(GET_TOP_EARNERS);

  const earners = data?.topEarners?.map((earner, index) => ({
    rank: (index + 1).toString().padStart(2, "0"),
    name: earner.name,
    role: "Top Rated Tasker",
    badge: index < 3 ? "ELITE" : "PRO",
    earned: `$${(earner.coin / 20).toFixed(2)}`,
    rating: (4.5 + Math.random() * 0.5).toFixed(2),
    tasks: earner.totalTasks || 0, // Fallback if 0 or undefined
    image: earner.photoURL || `https://i.pravatar.cc/150?u=${earner._id}`,
  })) || [];

  if (isLoading) {
      return (
        <section className="relative py-24 text-white overflow-hidden">
             <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
                 <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-0">
                    <div className="space-y-4">
                        <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
                        <div className="h-12 w-64 bg-zinc-800 rounded animate-pulse" />
                    </div>
                 </div>
                 <div className="w-full space-y-4 border-t border-white/10 pt-8">
                     {[...Array(6)].map((_, i) => (
                         <div key={i} className="w-full h-24 bg-zinc-900/30 border border-white/5 rounded-xl overflow-hidden relative">
                             <div className="flex items-center h-full px-6 gap-6">
                                 <div className="h-12 w-12 rounded-full bg-zinc-800/50" />
                                 <div className="space-y-2 flex-1">
                                    <div className="h-4 w-48 bg-zinc-800/50 rounded" />
                                    <div className="h-3 w-32 bg-zinc-800/30 rounded" />
                                 </div>
                             </div>
                             <motion.div
                                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                                 animate={{ x: ['-100%', '100%'] }}
                                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                             />
                         </div>
                     ))}
                 </div>
             </div>
        </section>
      );
  }

  return (
    <section className="relative py-24 text-white overflow-hidden" id="top-workers">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none select-none overflow-hidden pt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.4, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[10vw] md:text-[13vw] font-black font-inter text-zinc-900/40 tracking-tighter whitespace-nowrap"
        >
          LEADERBOARD
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <div className="w-full">
             {/* Header */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-4 inline-flex items-center border-2 border-yellow-500/20 px-4 py-5 text-[14px] font-bold uppercase tracking-widest text-yellow-500">
                  Leaderboard
                </div>
                <h2 className="font-primary text-5xl font-inter uppercase tracking-tighter sm:text-6xl font-bold">
                  Top Earners <br />
                  <span className="text-transparent" style={{ WebkitTextStroke: "2px #bfff00", color: "transparent" }}>This Month</span>
                </h2>
              </motion.div>
              
              <motion.button 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group flex items-center gap-2 border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-white/5"
              >
                Join The Ranks
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>
            </div>

            {/* List */}
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="border-t border-white/10"
            >
              {earners.length > 0 ? (
                earners.map((earner) => (
                  <motion.div
                    key={earner.rank}
                    variants={item}
                    className="group relative flex flex-col md:grid md:grid-cols-12 items-start md:items-center border-b border-white/10 py-6 hover:bg-white/5 transition-colors px-4 gap-4 md:gap-0"
                  >
                    <div className="md:col-span-5 flex items-center gap-4 md:gap-8 w-full">
                      <span className="font-primary text-3xl font-bold text-zinc-700 group-hover:text-zinc-500 transition-colors">
                        {earner.rank}
                      </span>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-zinc-800">
                          <img src={earner.image} alt={earner.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-primary">{earner.name}</h3>
                            <span className={`px-1.5 py-0.5 text-[14px] font-bold uppercase tracking-wider ${earner.badge === 'ELITE' ? 'bg-primary text-black' : 'bg-pink-500 text-white'}`}>
                              {earner.badge}
                            </span>
                          </div>
                          <p className="text-sm font-primary text-zinc-400">{earner.role}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full items-center justify-between md:contents">
                      <div className="md:col-span-2 flex flex-col items-center md:items-center">
                        <div className="text-xl font-bold text-primary">{earner.earned}</div>
                        <div className="text-[12px] font-bold uppercase tracking-widest text-zinc-500">Earned</div>
                      </div>

                      <div className="md:col-span-2 flex flex-col items-center md:items-center">
                        <div className="flex items-center gap-1 text-xl font-bold">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          {earner.rating}
                        </div>
                        <div className="text-[12px] font-inter uppercase tracking-widest text-zinc-500">Rating</div>
                      </div>

                      <div className="md:col-span-2 flex flex-col items-center md:items-center">
                        <div className="text-xl font-bold">{earner.tasks}</div>
                        <div className="text-[12px] font-inter uppercase tracking-widest text-zinc-500">Tasks</div>
                      </div>
                    </div>

                    <div className="absolute top-6 right-4 md:relative md:top-auto md:right-auto md:col-span-1 flex justify-end">
                       <div className="flex h-10 w-10 items-center justify-center border border-white/10 transition-colors group-hover:border-white/20 group-hover:bg-white/5">
                        <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
                       </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                 <div className="py-12 text-center text-zinc-500">
                    No top earners found yet.
                 </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
