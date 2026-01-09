"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/auth/firebase.config";
import { MoveLeft, Zap, Mail, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email address.");
      setIsLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Check your email inbox.");
      setEmail("");
    } catch (err) {
      console.error("Reset Password Error:", err);
      if (err.code === 'auth/user-not-found') {
        setError("No account found with this email.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Invalid email address.");
      } else {
        setError("Failed to send reset link. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-zinc-900/50 to-transparent" />
        <div 
           className="absolute inset-0 opacity-[0.1]"
           style={{
             backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }}
        />
      </div>

      {/* Main Content - Centered */}
      <div className="w-full flex flex-col p-8 md:p-12 relative z-10 items-center justify-center min-h-screen">
        
        <div className="w-full max-w-md mx-auto space-y-8 bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 backdrop-blur-sm">
           
           <div className="flex justify-between items-center">
             <Link href="/login" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors w-fit">
               <MoveLeft size={20} />
               <span className="text-sm font-medium uppercase tracking-wider">Back to Login</span>
             </Link>
             <div className="w-8 h-8 bg-primary text-black flex items-center justify-center rounded-sm">
                 <Zap size={18} className="fill-current" />
             </div>
           </div>

           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
             className="text-center"
           >
             <h1 className="text-3xl font-bold font-inter tracking-tighter mb-4">
               Reset Password
             </h1>
             <p className="text-zinc-400">
               Enter your email address and we'll send you a link to reset your password.
             </p>
           </motion.div>

           <motion.form 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.1 }}
             onSubmit={handleResetPassword}
             className="space-y-6"
           >
              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
                 <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-sm py-4 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-inter"
                      placeholder="name@example.com"
                      required
                    />
                 </div>
              </div>

              {/* Status Messages */}
              {error && (
                 <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-sm">
                    {error}
                 </div>
              )}
              {message && (
                 <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-sm p-3 rounded-sm">
                    {message}
                 </div>
              )}

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-primary text-black font-bold font-inter text-lg rounded-sm hover:bg-white transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                   <Loader2 className="animate-spin" />
                ) : (
                   <>
                     Send Reset Link
                     <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                   </>
                )}
              </button>
           </motion.form>
        </div>
        
        <div className="mt-8 text-zinc-600 text-xs font-medium">
           © 2026 TaskFlow. All rights reserved.
        </div>
      </div>

    </div>
  );
}
