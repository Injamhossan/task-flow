"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-secondary overflow-hidden p-4 text-center">
      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 space-y-8">
        {/* Large 404 Text */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="select-none text-[150px] font-black tracking-tighter text-zinc-800/50 sm:text-[200px] lg:text-[300px] leading-none"
        >
          404
        </motion.h1>

        <div className="space-y-4 -mt-10 sm:-mt-20 lg:-mt-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-5xl font-primary uppercase"
          >
            Page Not Found
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto max-w-[500px] text-zinc-400 font-secondary md:text-lg"
          >
            The page you are looking for disappeared into the void. It might have been removed or the link is broken.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="pt-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-4 text-lg font-bold uppercase tracking-widest text-black transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
