"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Home,
  ListChecks,
  PlusCircle,
  ClipboardList,
  Coins,
  History
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "@/auth/firebase.config";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, role, userData } = useAuth();
  
  // Define links for each role
  const workerLinks = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "TaskList", href: "/dashboard/tasks", icon: ListChecks },
    { name: "My Submissions", href: "/dashboard/my-work", icon: FileText },
    { name: "Withdrawals", href: "/dashboard/withdrawals", icon: Wallet },
    { name: "Profile", href: "/dashboard/profile", icon: Users },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const buyerLinks = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Add New Tasks", href: "/dashboard/add-task", icon: PlusCircle },
    { name: "My Tasks", href: "/dashboard/my-tasks", icon: ClipboardList },
    { name: "Submissions", href: "/dashboard/buyer-submissions", icon: FileText },
    { name: "Purchase Coin", href: "/dashboard/purchase-coin", icon: Coins },
    { name: "Payment History", href: "/dashboard/payment-history", icon: History },
    { name: "Profile", href: "/dashboard/profile", icon: Users },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const adminLinks = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Manage Users", href: "/dashboard/users", icon: Users },
    { name: "Manage Task", href: "/dashboard/admin-tasks", icon: ClipboardList },
    { name: "Manage Blogs", href: "/dashboard/manage-blogs", icon: FileText },
    { name: "Withdrawals", href: "/dashboard/admin-withdrawals", icon: Coins },
    { name: "Profile", href: "/dashboard/profile", icon: Users },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  // Select links based on role
  let links = workerLinks;
  if (role === "admin" || user?.email === "admin@taskflow.com") {
    links = adminLinks;
  } else if (role === "buyer") {
    links = buyerLinks;
  } else {
    links = workerLinks;
  }

  const router = useRouter(); 

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-zinc-900 text-white w-full border-r border-zinc-800">
      {/* Logo Section - Fixed at top */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
         <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-black text-black">
               T
            </div>
            <span className="text-xl font-bold font-primary tracking-wide text-white group-hover:text-primary transition-colors">
               TASKFLOW
            </span>
         </Link>
         {/* Close button for mobile */}
         <button onClick={() => setIsOpen(false)} className="lg:hidden text-zinc-400">
           <X size={24} />
         </button>
      </div>

      {/* Scrollable Nav Links */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
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

      {/* Footer Section - Fixed at bottom */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4 px-2">
           <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-700">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
              ) : (
                <Users size={20} className="text-zinc-500" />
              )}
           </div>
           <div className="overflow-hidden">
             <p className="text-sm font-medium truncate">
               {user?.email === "admin@taskflow.com" ? "Admin" : (userData?.name || user?.displayName || "User")}
             </p>
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
      <div className="lg:hidden fixed top-20 left-4 z-40 bg-zinc-900 rounded-md">
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 border border-zinc-800 rounded-md text-white shadow-lg"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar for Desktop */}
      <div className="hidden lg:block w-64 shrink-0 bg-zinc-900 border-r border-zinc-800">
        <div className="sticky top-0 h-screen">
           <SidebarContent />
        </div>
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
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="fixed left-0 top-0 bottom-0 z-50 lg:hidden w-64"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
