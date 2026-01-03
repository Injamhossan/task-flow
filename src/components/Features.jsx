"use client";

import { MousePointer2, Shield, Zap, TrendingUp, Clock, Medal } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    number: "01",
    title: "ONE-CLICK START",
    description: "No complex setup. Sign up, verify, and start earning within minutes.",
    icon: MousePointer2,
  },
  {
    number: "02",
    title: "SECURE PAYMENTS",
    description: "Your earnings are protected. Instant withdrawals to your preferred method.",
    icon: Shield,
  },
  {
    number: "03",
    title: "INSTANT MATCHING",
    description: "Our AI matches you with tasks that fit your skills perfectly.",
    icon: Zap,
  },
  {
    number: "04",
    title: "SKILL GROWTH",
    description: "Level up as you complete tasks. Higher levels unlock premium payouts.",
    icon: TrendingUp,
  },
  {
    number: "05",
    title: "FLEXIBLE HOURS",
    description: "Work when you want, where you want. No minimum hours required.",
    icon: Clock,
  },
  {
    number: "06",
    title: "REPUTATION SYSTEM",
    description: "Build your profile, earn badges, attract better opportunities.",
    icon: Medal,
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

export default function Features() {
  return (
    <section className="bg-[#050505] py-24 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="inline-block px-3 py-3 mb-6 border border-pink-500 text-pink-500 text-xs font-bold tracking-widest uppercase">
            Features
          </div>
          <h2 className="text-5xl md:text-7xl font-bold font-inter tracking-tighter uppercase leading-[0.9] mb-6">
            <div>Built For The</div>
            <div
              className="text-transparent"
              style={{
                WebkitTextStroke: "1px white",
                color: "transparent",
              }}
            >
              Modern Worker
            </div>
          </h2>
          <p className="text-zinc-400 text-lg font-light max-w-xl">
            Every feature designed to maximize your earnings while minimizing effort.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-zinc-900/50"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index}
                variants={item}
                className="group relative p-10 border-b border-r border-zinc-900/50 hover:bg-zinc-900/20 transition-colors duration-300"
              >
                {/* Number Background */}
                <div className="absolute top-6 right-8 text-[4rem] font-bold font-inter text-zinc-900/40 select-none group-hover:text-zinc-800/40 transition-colors">
                  {feature.number}
                </div>

                {/* Icon */}
                <div className="relative w-12 h-12 bg-zinc-900/50 border border-zinc-800 flex items-center justify-center mb-10 rounded-sm group-hover:border-pink-500/30 group-hover:bg-pink-500/5 transition-colors">
                  <Icon size={20} className="text-zinc-300 group-hover:text-pink-500 transition-colors" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold font-inter uppercase tracking-wide mb-3 text-white group-hover:text-pink-500 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
