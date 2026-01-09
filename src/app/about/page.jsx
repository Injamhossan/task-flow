"use client";

import { motion } from "framer-motion";
import { Users, Target, Rocket, Heart, Globe, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black overflow-hidden">
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
         
         <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-block py-1 px-3 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-bold uppercase tracking-widest text-primary mb-6"
            >
              The Future of Micro-Work
            </motion.span>
            <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="text-5xl md:text-7xl font-black font-inter tracking-tighter mb-6"
            >
              Building the Global <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-lime-200 to-white">Workforce.</span>
            </motion.h1>
            <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2, duration: 0.8 }}
               className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
            >
              TaskFlow is more than a platform; it's a movement. We are connecting millions of workers with opportunities, breaking down geographical barriers one task at a time.
            </motion.p>
         </div>
      </div>

      {/* Stats with Glassmorphism */}
      <div className="container mx-auto px-4 mb-32">
         <motion.div 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl"
         >
            {[
              { label: "Active Users", value: "50K+", icon: Users },
              { label: "Tasks Completed", value: "1.2M", icon: Target },
              { label: "Total Payouts", value: "$500K+", icon: Zap },
              { label: "Countries", value: "120+", icon: Globe }
            ].map((stat, i) => (
               <div key={i} className="text-center p-6 border-r border-zinc-800 last:border-0 relative group">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{stat.value}</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold flex items-center justify-center gap-2">
                     <stat.icon size={14} /> {stat.label}
                  </div>
               </div>
            ))}
         </motion.div>
      </div>

      {/* Our Mission */}
      <div className="container mx-auto px-4 mb-32">
         <div className="grid md:grid-cols-2 gap-16 items-center">
             <motion.div {...fadeInUp}>
                <h2 className="text-3xl font-bold font-inter mb-6">Empowering the <span className="text-primary">Gig Economy</span></h2>
                <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
                   <p>
                      We believe that talent acts locally but opportunity should be global. In a world where digital skills are paramount, location shouldn't limit earning potential.
                   </p>
                   <p>
                      TaskFlow provides a secure, transparent ecosystem where businesses get tasks done efficiently, and individuals get paid fairly and instantly. No barriers, no complexity.
                   </p>
                </div>
                <div className="mt-8 flex gap-4">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-primary border border-zinc-800">
                         <ShieldCheck size={24}/>
                      </div>
                      <div>
                         <h4 className="font-bold text-white">Secure</h4>
                         <p className="text-xs text-zinc-500">Escrow payments</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-primary border border-zinc-800">
                         <Rocket size={24}/>
                      </div>
                      <div>
                         <h4 className="font-bold text-white">Fast</h4>
                         <p className="text-xs text-zinc-500">Instant withdrawals</p>
                      </div>
                   </div>
                </div>
             </motion.div>
             
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative h-[400px] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 group"
             >
                 {/* Visual Placeholder for Abstract Mission Image */}
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:opacity-60 transition-opacity grayscale hover:grayscale-0 duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                 <div className="absolute bottom-8 left-8">
                     <p className="text-2xl font-bold text-white">"Work is no longer a place,<br/>it's what you do."</p>
                 </div>
             </motion.div>
         </div>
      </div>

      {/* Values Grid */}
      <div className="bg-zinc-900/30 border-y border-zinc-800 py-24 mb-32">
         <div className="container mx-auto px-4">
             <div className="text-center max-w-2xl mx-auto mb-16">
                 <h2 className="text-3xl font-bold font-inter mb-4">Our Core Values</h2>
                 <p className="text-zinc-400">The principles that guide every decision we make at TaskFlow.</p>
             </div>
             
             <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: "Transparency First", desc: "No hidden fees. What you see is what you get. We prioritize clear communication.", color: "from-blue-500/20 to-blue-500/0" },
                  { title: "User Obsessed", desc: "We build for you. Your feedback shapes our roadmap and features.", color: "from-primary/20 to-primary/0" },
                  { title: "Global Access", desc: "We are committed to making TaskFlow accessible to everyone, everywhere.", color: "from-purple-500/20 to-purple-500/0" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    {...fadeInUp}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 bg-black border border-zinc-800 rounded-xl relative overflow-hidden group hover:border-zinc-600 transition-colors"
                  >
                     <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} blur-3xl opacity-50 group-hover:opacity-80 transition-opacity`} />
                     <h3 className="text-xl font-bold mb-4 relative z-10">{item.title}</h3>
                     <p className="text-zinc-400 relative z-10">{item.desc}</p>
                  </motion.div>
                ))}
             </div>
         </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 pb-24 text-center">
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="bg-primary text-black rounded-3xl p-12 md:p-24 relative overflow-hidden"
         >
             <div className="relative z-10 max-w-2xl mx-auto">
                 <h2 className="text-4xl md:text-5xl font-black font-inter mb-6">Ready to start earning?</h2>
                 <p className="text-lg font-medium mb-8 opacity-80">Join thousands of others making money on their own terms. It takes less than 2 minutes to get started.</p>
                 <div className="flex flex-col md:flex-row gap-4 justify-center">
                     <Link href="/register" className="px-8 py-4 bg-black text-white font-bold rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
                         Create Account <ArrowRight size={20} />
                     </Link>
                     <Link href="/login" className="px-8 py-4 bg-transparent border-2 border-black text-black font-bold rounded-lg hover:bg-black/10 transition-colors">
                         Log In
                     </Link>
                 </div>
             </div>
             
             {/* Background Decoration */}
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent pointer-events-none" />
         </motion.div>
      </div>

    </div>
  );
}
