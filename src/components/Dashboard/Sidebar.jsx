"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Wallet, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Briefcase,
  Home
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "@/auth/firebase.config";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  
  // Placeholder for role - in a real app, fetch this from your user context/db
  const userRole = "worker"; // "admin", "buyer", "worker"

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Tasks", href: "/dashboard/tasks", icon: Briefcase },
    { name: "My Work", href: "/dashboard/my-work", icon: FileText },
    { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
    { name: "Profile", href: "/dashboard/profile", icon: Users },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    await signOut(auth);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-zinc-900 border-r border-zinc-800 text-white w-64">
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
         <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary text-black flex items-center justify-center rounded-sm font-bold">
              TF
            </div>
            <span className="font-bold text-xl tracking-tight">TASKFLOW</span>
         </Link>
         <button className="lg:hidden" onClick={() => setIsOpen(false)}>
           <X size={20} />
         </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 group ${
                isActive 
                  ? "bg-primary text-black font-semibold shadow-[0_0_15px_rgba(191,255,0,0.3)]" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <Icon size={20} className={isActive ? "text-black" : "text-zinc-500 group-hover:text-white"} />
              <span>{link.name}</span>
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-black"
                />
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-3 mb-4 px-2">
           <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-700">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
              ) : (
                <Users size={20} className="text-zinc-500" />
              )}
           </div>
           <div className="overflow-hidden">
             <p className="text-sm font-medium truncate">{user?.displayName || "User"}</p>
             <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
           </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md transition-colors text-sm font-medium"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 bg-zinc-900 border border-zinc-800 rounded-md text-white shadow-lg"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar for Desktop */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 z-40">
        <SidebarContent />
      </div>

      {/* Sidebar for Mobile (Drawer) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="fixed left-0 top-0 bottom-0 z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
