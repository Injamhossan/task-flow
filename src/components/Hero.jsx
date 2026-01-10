"use client";

import { Play, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-between min-h-screen pt-32 overflow-hidden bg-secondary">
      {/* Magenta Orb Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "var(--secondary)",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
            radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
          `,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center my-auto">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-2 px-4 py-1.5 text-[14px] font-inter tracking-widest text-primary uppercase border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer"
        >
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          Platform Update v2.0 is Live
          <ArrowRight className="w-3 h-3" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase font-primary font-bold tracking-tighter"
        >
          <span className="text-white">Micro Tasks.</span>
          <span className="text-transparent" style={{ WebkitTextStroke: "2px #bfff00", color: "transparent" }}>
            Macro Rewards.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mt-8 text-base md:text-xl font-secondary text-zinc-400"
        >
          The new era of work is here. Complete simple tasks, earn real money, build your future—all from anywhere in the world.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col gap-4 mt-10 sm:flex-row"
        >
          <button className="flex items-center gap-2 px-8 py-4 text-[16px] md:text-[18px] font-inter font-bold tracking-widest text-black uppercase bg-primary hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] rounded-sm">
            Start Earning Now
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button className="flex items-center gap-2 px-8 py-4 text-[16px] md:text-[18px] font-inter font-[600] tracking-widest text-white uppercase border border-zinc-800 rounded hover:bg-white hover:text-black hover:border-primary transition-all group">
            <Play className="w-3 h-3 fill-white group-hover:scale-110 transition-transform" />
            Watch Demo
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-2 gap-8 md:gap-12 mt-12 md:mt-24 md:grid-cols-4 border-t border-white/5 pt-12 mb-12 w-full max-w-4xl"
        >
           {[
             { value: "50K+", label: "Active Workers" },
             { value: "$2M+", label: "Paid Out" },
             { value: "99.9%", label: "Uptime" },
             { value: "24/7", label: "Support" },
           ].map((stat, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 1 + (i * 0.1) }}
               className="flex flex-col items-center"
             >
               <span className="text-[32px] md:text-[48px] font-[600] font-inter text-primary">{stat.value}</span>
               <span className="mt-1 text-[12px] md:text-[14px] font-inter tracking-widest text-zinc-500 uppercase">{stat.label}</span>
             </motion.div>
           ))}
        </motion.div>
      </div>

      {/* Marquee */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="w-full overflow-hidden border-t border-white/5 z-20 mt-auto"
      >
        <div className="flex whitespace-nowrap py-6 animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8">
              {[
                "TESTING",
                "REVIEWS",
                "RESEARCH",
                "WRITING",
                "DESIGN",
                "DATA LABELING",
                "SURVEYS",
                "TRANSCRIPTION",
                "TRANSLATION",
                "MODERATION"
              ].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 bg-primary" />
                  <span className="text-[16px] font-bold tracking-widest text-[#52525b] uppercase font-primary">{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  );
}
