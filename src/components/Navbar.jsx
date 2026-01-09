"use client";

import Link from "next/link";

import { Zap, Coins, User as UserIcon, LayoutDashboard, LogOut, Code2, Bell } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/auth/firebase.config";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Navbar() {
  const { user, loading, userData } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  // const [notifications, setNotifications] = useState([]); // Removed state

  const router = useRouter();
  
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  // Real-time Notification Polling with React Query
  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications', user?.email],
    queryFn: async () => {
        if (!user?.email) return [];
        const res = await fetch(`/api/notifications?email=${user.email}`);
        if (!res.ok) return [];
        return res.json();
    },
    enabled: !!user?.email,
    refetchInterval: 10000, 
  });
/*
  useEffect(() => {
    let interval;
    const fetchNotifications = async () => {
       // ... removed manual fetch
    };
    // ... removed
  }, [user]);
*/

  const queryClient = useQueryClient(); // Add this
  
  // ... (useQuery code remains same) ...

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/5 text-white">
      <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* ... (Logo and links remain same) ... */}
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
            className="group relative px-4 py-2 rounded-md bg-zinc-900 overflow-hidden transition-all hover:scale-105 border border-zinc-800 hover:border-primary/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="flex items-center gap-2 relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-300 group-hover:text-white transition-colors">Join as Dev</span>
              <Code2 size={16} className="text-primary group-hover:rotate-12 transition-transform" />
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {loading ? (
             <div className="w-20 h-10 bg-zinc-900 animate-pulse rounded-sm" />
          ) : user ? (
            <div className="flex items-center gap-4">

               {/* Notification Bell */}
               <div className="relative">
                 <button 
                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                    className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors relative"
                 >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-black" />
                    )}
                 </button>

                 {isNotifOpen && (
                   <>
                     <div 
                        className="fixed inset-0 z-40 bg-black/20"
                        onClick={() => setIsNotifOpen(false)}
                      />
                     <div className="absolute right-0 top-full mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden z-50 flex flex-col max-h-[400px]">
                        <div className="px-4 py-3 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
                           <h3 className="font-bold text-sm text-white">Notifications</h3>
                           <span className="text-xs text-zinc-500">{unreadCount} unread</span>
                        </div>
                        <div className="overflow-y-auto">
                           {notifications.length === 0 ? (
                             <div className="p-8 text-center text-zinc-500 text-sm flex flex-col items-center">
                               <Bell size={24} className="mb-2 opacity-20" />
                               <p className="mb-4">No new notifications</p>
                               <button 
                                 onClick={async (e) => {
                                    e.stopPropagation();
                                    try {
                                        await fetch('/api/notifications', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({
                                                message: "This is a test notification to verify the system.",
                                                toEmail: user.email,
                                                actionRoute: "/dashboard"
                                            })
                                        });
                                        // Trigger immediate re-fetch
                                        queryClient.invalidateQueries({ queryKey: ['notifications', user?.email] });
                                    } catch (err) {
                                        console.error("Failed to send test notif");
                                    }
                                 }}
                                 className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-2 rounded-md transition-colors"
                               >
                                 Send Test Notification
                               </button>
                             </div>
                           ) : (
                             notifications.map((notif, i) => (
                               <div 
                                 key={i} 
                                 className={`px-4 py-3 border-b border-zinc-800/50 hover:bg-zinc-800 transition-colors cursor-pointer ${!notif.read ? 'bg-zinc-800/40 border-l-2 border-l-primary' : ''}`}
                                 onClick={async () => {
                                    // Mark as read
                                    try {
                                       await fetch('/api/notifications', {
                                          method: 'PATCH',
                                          body: JSON.stringify({ id: notif._id })
                                       });
                                       // Update local state (Optimistic)
                                       queryClient.setQueryData(['notifications', user?.email], (oldData) => 
                                          oldData ? oldData.map(n => n._id === notif._id ? { ...n, read: true } : n) : []
                                       );
                                    } catch (err) {
                                       console.error("Failed to mark read");
                                    }
                                    
                                    if(notif.actionRoute) router.push(notif.actionRoute);
                                    setIsNotifOpen(false);
                                 }}
                               >
                                  <p className={`text-sm ${!notif.read ? 'text-white font-medium' : 'text-zinc-400'}`}>{notif.message}</p>
                                  <p className="text-xs text-zinc-600 mt-1">{new Date(notif.createdAt).toLocaleDateString()}</p>
                               </div>
                             ))
                           )}
                        </div>
                     </div>
                   </>
                 )}
               </div>

               {/* Coin Balance - Hidden for Admin */}
               {userData?.role !== "admin" && (
                 <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300">
                   <Coins size={16} className="text-yellow-500" />
                   <span className="font-bold font-inter">{userData?.coin || 0}</span>
                 </div>
               )}

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
                    {user?.email === "admin@taskflow.com" ? "Admin" : (userData?.name || user?.displayName || "User").split(" ")[0]}
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
                          <p className="text-sm font-bold text-white truncate">
                            {user?.email === "admin@taskflow.com" ? "Admin" : (userData?.name || user?.displayName || "User")}
                          </p>
                          <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                          {userData?.role !== "admin" && (
                             <div className="flex md:hidden items-center gap-2 mt-2 text-zinc-400">
                               <Coins size={14} className="text-yellow-500" />
                               <span className="text-xs">{userData?.coin || 0} Coins</span>
                             </div>
                          )}
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
