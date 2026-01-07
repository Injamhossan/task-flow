"use client";

import Link from "next/link";
import { Zap, Coins, User as UserIcon, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/auth/firebase.config";

export default function Navbar() {
  const { user, loading, userData } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/5 text-white">
      <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center w-10 h-10 rounded-sm bg-primary text-black transition-transform group-hover:scale-105">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-wide text-white font-primary">TASKFLOW</span>
        </Link>
        
        {/* Centered Navigation */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8">
           <Link href="/about" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">About</Link>
           <Link href="/contact" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">Contact</Link>
           <Link
            href="/join-as-developer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 transition-all text-xs font-bold text-white uppercase tracking-wider"
          >
            Join as Dev
          </Link>
        </div>

        <div className="flex items-center gap-6">


          {loading ? (
             <div className="w-20 h-10 bg-zinc-900 animate-pulse rounded-sm" />
          ) : user ? (
            <div className="flex items-center gap-4">

              
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300">
                <Coins size={16} className="text-yellow-500" />
                <span className="font-bold font-inter">{userData?.coin || 0}</span>
              </div>

              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 pl-2 pr-4 py-1.5 rounded-full transition-all group"
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden flex items-center justify-center border border-zinc-700">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon size={16} className="text-zinc-400" />
                    )}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-zinc-300 group-hover:text-white max-w-[100px] truncate">
                    {user.displayName?.split(" ")[0] || "User"}
                  </span>
                </button>

                {isDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden z-20 flex flex-col py-1">
                       <div className="px-4 py-3 border-b border-zinc-800">
                          <p className="text-sm font-bold text-white truncate">{user.displayName || "User"}</p>
                          <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                          <div className="flex md:hidden items-center gap-2 mt-2 text-zinc-400">
                            <Coins size={14} className="text-yellow-500" />
                            <span className="text-xs">{userData?.coin || 0} Coins</span>
                          </div>
                       </div>
                       
                       <Link 
                         href="/dashboard"
                         onClick={() => setIsDropdownOpen(false)}
                         className="flex items-center gap-2 px-4 py-3 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                       >
                         <LayoutDashboard size={16} />
                         Dashboard
                       </Link>

                       <button
                         onClick={() => {
                           handleLogout();
                           setIsDropdownOpen(false);
                         }}
                         className="flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/10 transition-colors text-left w-full"
                       >
                         <LogOut size={16} />
                         Logout
                       </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-[14px] font-[600] font-inter tracking-widest text-white hover:text-primary transition-colors uppercase"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-6 py-2.5 text-[14px] font-[600] font-inter tracking-widest text-black bg-primary hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all uppercase shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
