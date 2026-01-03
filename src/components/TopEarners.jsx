"use client";

import { ArrowUpRight, Star } from "lucide-react";
import { motion } from "framer-motion";

const earners = [
  {
    rank: "01",
    name: "Sarah Chen",
    role: "Data Labeling",
    badge: "ELITE",
    earned: "$12,450",
    rating: "4.98",
    tasks: "2,847",
    image: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    rank: "02",
    name: "Marcus Johnson",
    role: "Transcription",
    badge: "ELITE",
    earned: "$10,230",
    rating: "4.95",
    tasks: "2,156",
    image: "https://i.pravatar.cc/150?u=marcus",
  },
  {
    rank: "03",
    name: "Aisha Patel",
    role: "Research",
    badge: "PRO",
    earned: "$9,870",
    rating: "4.92",
    tasks: "1,923",
    image: "https://i.pravatar.cc/150?u=aisha",
  },
  {
    rank: "04",
    name: "David Kim",
    role: "Testing",
    badge: "PRO",
    earned: "$8,540",
    rating: "4.89",
    tasks: "1,654",
    image: "https://i.pravatar.cc/150?u=david",
  },
  {
    rank: "05",
    name: "Lisa Thompson",
    role: "Writing",
    badge: "PRO",
    earned: "$7,920",
    rating: "4.87",
    tasks: "1,432",
    image: "https://i.pravatar.cc/150?u=lisa",
  },
];

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
  return (
    <section className="relative py-24 text-white overflow-hidden" id="top-workers">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none select-none overflow-hidden pt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.4, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[15vw] md:text-[20vw] font-black font-inter text-zinc-900/40 tracking-tighter whitespace-nowrap"
        >
          LEADERBOARD
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="no-scrollbar overflow-x-auto">
          <div className="min-w-[1000px]">
             {/* Header */}
            <div className="mb-12 flex items-end justify-between">
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
              {earners.map((earner) => (
                <motion.div
                  key={earner.rank}
                  variants={item}
                  className="group grid grid-cols-12 items-center border-b border-white/10 py-6 hover:bg-white/5 transition-colors px-4"
                >
                  <div className="col-span-5 flex items-center gap-8">
                    <span className="font-primary text-3xl font-bold text-zinc-700 group-hover:text-zinc-500 transition-colors">
                      {earner.rank}
                    </span>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 overflow-hidden rounded-full bg-zinc-800">
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

                  <div className="col-span-2 flex flex-col items-center">
                    <div className="text-xl font-bold text-primary">{earner.earned}</div>
                    <div className="text-[12px] font-bold uppercase tracking-widest text-zinc-500">Earned</div>
                  </div>

                  <div className="col-span-2 flex flex-col items-center">
                    <div className="flex items-center gap-1 text-xl font-bold">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      {earner.rating}
                    </div>
                    <div className="text-[12px] font-inter uppercase tracking-widest text-zinc-500">Rating</div>
                  </div>

                  <div className="col-span-2 flex flex-col items-center">
                    <div className="text-xl font-bold">{earner.tasks}</div>
                    <div className="text-[12px] font-inter uppercase tracking-widest text-zinc-500">Tasks</div>
                  </div>

                  <div className="col-span-1 flex justify-end">
                     <div className="flex h-10 w-10 items-center justify-center border border-white/10 transition-colors group-hover:border-white/20 group-hover:bg-white/5">
                      <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
                     </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
