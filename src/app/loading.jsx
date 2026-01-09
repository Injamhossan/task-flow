"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <div className="relative">
        {/* Abstract Glow */}
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
        
        <div className="relative flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
             {/* Spinning Border */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full"
             />
             {/* Inner Static/Pulse */}
             <motion.div 
               animate={{ scale: [0.8, 1, 0.8] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute inset-2 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800"
             >
                <div className="w-3 h-3 bg-primary rounded-full" />
             </motion.div>
          </div>
          
          <motion.p 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-primary font-bold tracking-widest text-sm uppercase"
          >
            Loading TaskFlow...
          </motion.p>
        </div>
      </div>
    </div>
  );
}
