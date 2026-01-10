"use client";

import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    value: "50K+",
    label: "ACTIVE WORKERS",
  },
  {
    value: "$2M+",
    label: "PAID OUT",
  },
  {
    value: "99.9%",
    label: "UPTIME",
  },
  {
    value: "120+",
    label: "COUNTRIES",
  },
];

const leftContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const leftItem = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0 },
};

const rightContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
};

const rightItem = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};


export default function ReadyToEarn() {
  return (
    <section className="relative bg-primary text-black py-12 md:py-24 overflow-hidden border-t border-black">
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Floating Cube Decoration - Left */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 -left-10 w-20 h-20 md:w-32 md:h-32 border border-black/10 rotate-12 bg-transparent pointer-events-none" 
      />
      
      {/* Floating Cube Decoration - Right */}
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 -right-10 w-24 h-24 md:w-40 md:h-40 border border-black/10 -rotate-12 bg-transparent pointer-events-none" 
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          
          {/* Left Column - Content */}
          <motion.div 
            variants={leftContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6 md:space-y-8"
          >
            {/* Badge */}
            <motion.div variants={leftItem} className="inline-flex items-center gap-2 px-3 py-3 border border-black/20 bg-black/5 text-xs font-bold uppercase tracking-wider w-fit">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              Start Today
            </motion.div>

            {/* Headline */}
            <motion.h2 variants={leftItem} className="text-4xl sm:text-6xl md:text-8xl font-black font-inter tracking-tighter leading-[0.9] uppercase">
              Ready to
              <br />
              Start
              <br />
              Earning?
            </motion.h2>

            {/* Description */}
            <motion.p variants={leftItem} className="text-lg md:text-2xl font-medium max-w-lg leading-relaxed opacity-80">
              Join 50,000+ workers who are already earning on TaskFlow. Sign up takes less than 2 minutes.
            </motion.p>

            {/* Features List */}
            <motion.div variants={leftItem} className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-lg">
              {[
                "No experience required",
                "Work from anywhere",
                "Instant payouts",
                "24/7 support"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 font-semibold text-sm md:text-base">
                  <div className="p-0.5 rounded-full border border-black">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </div>
                  {item}
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={leftItem} className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
              <button className="group relative px-6 py-3 md:px-8 md:py-4 bg-black text-white font-bold text-base md:text-lg uppercase tracking-wider overflow-hidden hover:bg-zinc-900 transition-all flex items-center justify-center gap-2">
                <span>Create Free Account</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-6 py-3 md:px-8 md:py-4 bg-transparent border-2 border-black text-black font-bold text-base md:text-lg uppercase tracking-wider hover:bg-black hover:text-white transition-all">
                I Have An Account
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats Grid */}
          <motion.div 
            variants={rightContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                variants={rightItem}
                className="aspect-square p-8 border border-black/10 bg-black/5 hover:bg-black/10 transition-colors flex flex-col justify-center gap-2 backdrop-blur-sm"
              >
                <div className="text-4xl md:text-5xl font-black tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-60">
                  {stat.label}
                </div>
              </motion.div>
            ))}
            
            {/* Trusted Text */}
            <motion.div variants={rightItem} className="col-span-2 pt-8 text-center sm:text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">
                Trusted by workers in 120+ countries • Secure Payments • Instant Withdrawals
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
