"use client";

import { UserPlus, FileText, CheckCircle, Wallet } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "CREATE ACCOUNT",
    description: "Sign up free. Takes 2 minutes.",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "BROWSE TASKS",
    description: "Find tasks that match your skills.",
    icon: FileText,
  },
  {
    number: "03",
    title: "COMPLETE & SUBMIT",
    description: "Do the work, submit for review.",
    icon: CheckCircle,
  },
  {
    number: "04",
    title: "GET PAID",
    description: "Receive coins instantly. Withdraw anytime.",
    icon: Wallet,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export default function HowItWorks() {
  return (
    <section className="bg-black py-12 md:py-24 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-3 py-1 mb-4 md:mb-6 border border-primary text-primary text-xs font-bold tracking-widest uppercase">
              Process
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-inter tracking-tighter uppercase leading-[0.9]">
              <div>How It</div>
              <div
                className="text-transparent"
                style={{
                  WebkitTextStroke: "1px #bfff00", // bright lime/green neon
                  color: "transparent",
                }}
              >
                Works
              </div>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md text-zinc-400 text-base md:text-lg font-light leading-relaxed pb-2"
          >
            Four simple steps to start earning. No experience required.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 pl-4 md:pl-0"
        >
          
          {/* Connecting Line (Desktop) */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="hidden md:block absolute top-[60px] left-0 w-full h-[1px] bg-zinc-800 z-0 origin-left"
          />

          {/* Connecting Line (Mobile) */}
           <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="md:hidden absolute top-0 left-[39px] w-[1px] h-full bg-zinc-800 z-0 origin-top"
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div key={index} variants={item} className="relative z-10 flex md:flex-col items-center md:items-start gap-6 md:gap-0 group">
                {/* Number Box */}
                <div className="w-20 h-20 md:w-32 md:h-32 bg-[#0a0a0a] border border-zinc-800 flex items-center justify-center md:mb-8 shrink-0 relative group-hover:border-primary transition-colors duration-300">
                   {/* Line connection cover for individual box if needed, or just let line pass behind */}
                   <span className="text-2xl md:text-4xl font-bold text-zinc-700 font-inter group-hover:text-primary transition-colors duration-300">
                    {step.number}
                  </span>
                </div>

                {/* Icon Box (Small) */}
                <div className="w-10 h-10 border border-primary/30 flex items-center justify-center mb-4 text-primary bg-primary/5 rounded-sm">
                  <Icon size={20} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold font-inter uppercase tracking-wide mb-2 text-white">
                  {step.title}
                </h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
