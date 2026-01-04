"use client";

import { useAuth } from "@/components/AuthProvider";
import { User, Mail, Shield, Camera } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-inter tracking-tight">Profile Settings</h1>
        <p className="text-zinc-400 mt-1">Manage your personal information and account.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 space-y-8">
         {/* Avatar Section */}
         <div className="flex flex-col items-center gap-4 py-4">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-700 overflow-hidden">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={40} className="text-zinc-500" />
                  </div>
                )}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-primary text-black rounded-full hover:bg-white transition-colors shadow-lg">
                <Camera size={16} />
              </button>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-white">{user?.displayName || "User Name"}</h2>
              <p className="text-zinc-500 text-sm">Worker Account</p>
            </div>
         </div>

         <div className="space-y-6 border-t border-zinc-800 pt-8">
            <div className="grid gap-2">
              <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input 
                  type="text" 
                  defaultValue={user?.displayName}
                  className="w-full bg-black border border-zinc-800 rounded-md py-2.5 pl-10 pr-4 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input 
                  type="email" 
                  defaultValue={user?.email}
                  disabled
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-2.5 pl-10 pr-4 text-zinc-400 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-zinc-600">Email address cannot be changed for Google linked accounts.</p>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Role</label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input 
                  type="text" 
                  defaultValue="Worker"
                  disabled
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-2.5 pl-10 pr-4 text-zinc-400 cursor-not-allowed"
                />
              </div>
            </div>
         </div>

         <div className="pt-4 flex justify-end">
           <button className="px-6 py-2.5 bg-primary text-black font-bold rounded-sm hover:bg-white transition-colors shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
             Save Changes
           </button>
         </div>
      </div>
    </div>
  );
}
