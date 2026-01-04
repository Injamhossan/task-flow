"use client";

import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/auth/firebase.config";
import { useRouter } from "next/navigation";
import { MoveLeft, Zap, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "worker",
  });

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Save user to MongoDB with selected role
      await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: formData.role, 
        }),
      });

      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
       // 1. Create user in Firebase
       const { createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth");
       const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
       const user = userCredential.user;

       // 2. Update Profile Display Name
       await updateProfile(user, {
         displayName: formData.name
       });

       // 3. Save to MongoDB
       await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
        }),
      });

      router.push("/");
    } catch (error) {
      console.error("Registration Error:", error);
      // You might want to show a toast or error message here
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

      {/* Right Side - Visual (Now Left) */}
      <div className="hidden lg:flex w-1/2 bg-zinc-900 relative items-center justify-center overflow-hidden order-1 lg:order-1">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-black opacity-80" />
         
         <div className="relative z-10 p-12 max-w-lg">
             <div className="mb-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Start Your Journey
             </div>
             <h2 className="text-5xl font-black font-inter tracking-tighter text-white mb-6 leading-[1.1]">
                JOIN THE <br />
                <span className="text-zinc-500">REVOLUTION</span> <br />
                <span className="text-transparent" style={{ WebkitTextStroke: "1px #bfff00" }}>OF WORK.</span>
             </h2>
             <ul className="space-y-4 text-zinc-400 text-lg">
                {[
                  "Access thousands of micro-tasks instantly",
                  "Get paid in USD or Crypto",
                  "Build your professional reputation",
                  "Join a global community of earners"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
             </ul>
         </div>

         {/* Abstract Shapes */}
         <motion.div 
           animate={{ 
             rotate: [0, -360],
             scale: [1, 1.1, 1]
           }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] border-[80px] border-zinc-800/20 rounded-full blur-3xl pointer-events-none"
         />
         <motion.div 
           animate={{ 
            rotate: [360, 0],
            scale: [1, 1.2, 1]
           }}
           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
           className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] border-[40px] border-primary/5 rounded-full blur-2xl pointer-events-none"
         />
      </div>

      {/* Left Side - Form (Now Right) */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-12 relative z-10 justify-between order-2 lg:order-2">
        
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors w-fit ml-auto">
          <span className="text-sm font-medium uppercase tracking-wider">Back to Home</span>
           <ArrowRight size={20} className="rotate-180" />
        </Link>
        
        <div className="w-full max-w-md mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 bg-primary text-black flex items-center justify-center rounded-sm">
                 <Zap size={24} className="fill-current" />
               </div>
               <span className="text-2xl font-bold font-primary tracking-tight">TASKFLOW</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold font-inter tracking-tighter mb-4">
              Create Account
            </h1>
            <p className="text-zinc-400 text-lg">
              Join thousands of workers earning daily.
            </p>
          </motion.div>

          {/* Role Selection */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="grid grid-cols-2 gap-4"
          >
            <div 
              onClick={() => setFormData({...formData, role: "worker"})}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                formData.role === "worker" 
                  ? "bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(191,255,0,0.2)]" 
                  : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-white"
              }`}
            >
              <h3 className="font-bold text-lg mb-1">I am a Worker</h3>
              <p className="text-xs opacity-80">I want to complete tasks and earn money.</p>
            </div>
            
            <div 
              onClick={() => setFormData({...formData, role: "buyer"})}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                formData.role === "buyer" 
                  ? "bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(191,255,0,0.2)]" 
                  : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-white"
              }`}
            >
              <h3 className="font-bold text-lg mb-1">I am a Buyer</h3>
              <p className="text-xs opacity-80">I want to post tasks and get work done.</p>
            </div>
          </motion.div>

          {/* Social Auth */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={handleGoogleRegister}
            disabled={isLoading}
            className="w-full h-14 bg-white text-black font-bold font-inter text-lg rounded-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-3 relative overflow-hidden group"
          >
             {isLoading ? (
               <Loader2 className="animate-spin" />
             ) : (
               <>
                 <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Sign up with Google</span>
               </>
             )}
          </motion.button>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="relative flex py-2 items-center"
          >
            <div className="flex-grow border-t border-zinc-800"></div>
            <span className="flex-shrink mx-4 text-zinc-500 text-xs font-bold uppercase tracking-widest">Or sign up with email</span>
            <div className="flex-grow border-t border-zinc-800"></div>
          </motion.div>

          {/* Email Form */}
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleRegister}
            className="space-y-4"
          >
             <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Full Name</label>
                <div className="relative group">
                   <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
                   <input 
                     type="text" 
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                     className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm py-4 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-inter"
                     placeholder="John Doe"
                     required
                   />
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Email</label>
                <div className="relative group">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
                   <input 
                     type="email" 
                     value={formData.email}
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                     className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm py-4 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-inter"
                     placeholder="name@example.com"
                     required
                   />
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Password</label>
                <div className="relative group">
                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
                   <input 
                     type="password" 
                     value={formData.password}
                     onChange={(e) => setFormData({...formData, password: e.target.value})}
                     className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm py-4 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-inter"
                     placeholder="Create a strong password"
                     required
                   />
                </div>
             </div>

             <div className="pt-2">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-zinc-800 text-white font-bold font-inter text-lg rounded-sm hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                      <Loader2 className="animate-spin" />
                  ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                  )}
                </button>
             </div>
          </motion.form>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center text-zinc-500 text-sm"
          >
            Already have an account? <Link href="/login" className="text-white font-bold hover:text-primary transition-colors">Log in</Link>
          </motion.p>
        </div>
        
        <div className="text-zinc-600 text-xs font-medium text-center md:text-left">
           © 2026 TaskFlow. All rights reserved.
        </div>
      </div>

    </div>
  );
}
