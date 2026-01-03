"use client";

import { Zap, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const FooterLink = ({ href, children }) => (
  <li>
    <a 
      href={href} 
      className="group flex items-center gap-1 text-sm text-zinc-400 hover:text-primary transition-colors duration-300 w-fit"
    >
      {children}
      <ArrowUpRight 
        size={14} 
        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
      />
    </a>
  </li>
);

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

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] text-white pt-24 pb-12 overflow-hidden border-t border-zinc-900/50">
      
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-[15vw] md:text-[20vw] font-black font-inter text-zinc-900/40 tracking-tighter whitespace-nowrap"
        >
          TASKFLOW
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-24"
        >
          
          {/* Brand Column */}
          <motion.div variants={item} className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary text-black flex items-center justify-center rounded-sm">
                <Zap size={20} className="fill-current" />
              </div>
              <span className="text-xl font-bold font-inter tracking-tight">TASKFLOW</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs font-medium">
              The future of micro-work. Complete tasks. Earn rewards. Build reputation. Join the movement.
            </p>
          </motion.div>

          {/* Links Columns */}
          <motion.div variants={item} className="lg:col-span-1">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-6">Platform</h4>
            <ul className="space-y-4">
              {['How It Works', 'Pricing', 'FAQs', 'API'].map((item) => (
                <FooterLink key={item} href="#">{item}</FooterLink>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={item} className="lg:col-span-1">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-6">Company</h4>
            <ul className="space-y-4">
              {['About', 'Careers', 'Blog', 'Press'].map((item) => (
                <FooterLink key={item} href="#">{item}</FooterLink>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={item} className="lg:col-span-1">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-6">Legal</h4>
            <ul className="space-y-4">
              {['Privacy', 'Terms', 'Cookies', 'Licenses'].map((item) => (
                <FooterLink key={item} href="#">{item}</FooterLink>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="text-zinc-600 text-xs font-medium">
            © 2026 TaskFlow. All rights reserved.
          </div>
          
          <div className="flex items-center gap-8">
            {['Twitter', 'Discord', 'Github', 'LinkedIn'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-white transition-colors"
                aria-label={social}
              >
                {social}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
