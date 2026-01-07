"use client";

import { motion } from "framer-motion";
import { Users, Target, Rocket, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-inter tracking-tight mb-6">
            We Are <span className="text-primary">TaskFlow.</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Connecting ambition with opportunity. We're building the decentralized future of micro-work, 
            empowering individuals globally to earn and grow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative"
           >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 blur-3xl rounded-full" />
              <div className="relative z-10 bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
                 <Target className="w-12 h-12 text-primary mb-6" />
                 <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                 <p className="text-zinc-400 leading-relaxed">
                   To democratize access to digital work. We believe that talent is universal, but opportunity is not. 
                   TaskFlow bridges that gap by providing a secure, transparent, and efficient platform for micro-tasks.
                 </p>
              </div>
           </motion.div>
           
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="grid grid-cols-2 gap-4"
           >
              {[
                { label: "Active Users", value: "50K+" },
                { label: "Tasks Completed", value: "1.2M" },
                { label: "Payouts Processed", value: "$500K" },
                { label: "Countries", value: "120+" }
              ].map((stat, i) => (
                <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl text-center">
                   <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                   <div className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
           </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
           {[
             { title: "Transparency", icon: Rocket, desc: "Fair pay and clear terms for every task." },
             { title: "Community", icon: Users, desc: "A supportive network of earners and buyers." },
             { title: "Passion", icon: Heart, desc: "Built by developers who care about user experience." }
           ].map((val, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               viewport={{ once: true }}
               className="text-center p-6"
             >
                <div className="w-16 h-16 mx-auto bg-zinc-900 rounded-full flex items-center justify-center mb-4 text-zinc-300">
                   <val.icon size={28} />
                </div>
                <h4 className="text-xl font-bold mb-2">{val.title}</h4>
                <p className="text-zinc-500">{val.desc}</p>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
}
