"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, ClipboardList, ShieldAlert, DollarSign, Trash2, Loader2, Coins, ArrowUpRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";

export default function AdminDashboard({ user }) {
  const [data, setData] = useState({
    totalUsers: 0,
    totalTasks: 0,
    totalCoins: 0,
    recentUsers: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        if (res.ok) {
           const jsonData = await res.json();
           setData(jsonData);
        }
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  async function handleDeleteUser(userId) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
      if (res.ok) {
        setData(prev => ({
          ...prev,
          recentUsers: prev.recentUsers.filter(u => u._id !== userId),
          totalUsers: prev.totalUsers - 1 
        }));
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  }

  const stats = [
    { 
      title: "Total Users", 
      value: data.totalUsers, 
      icon: Users, 
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      change: "+12% this month"
    },
    { 
      title: "Total Tasks", 
      value: data.totalTasks, 
      icon: ClipboardList, 
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      change: "+8% this month"
    },
    { 
      title: "System Coins", 
      value: data.totalCoins, 
      icon: Coins, 
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      change: "Circulating Supply"
    },
  ];

  if (loading) return (
      <div className="flex h-[50vh] w-full items-center justify-center">
          <Loader2 className="animate-spin text-primary" size={40}/>
      </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-black font-inter tracking-tight mb-2">Admin Overview</h1>
          <p className="text-zinc-400">
            Welcome back, <span className="text-white font-bold">{user?.displayName || "Admin"}</span>. Here's what's happening.
          </p>
        </div>
        <div className="flex items-center gap-3">
             <div className="text-right hidden md:block">
                 <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">System Status</p>
                 <div className="flex items-center gap-2 text-green-500">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                     <span className="text-sm font-bold">Operational</span>
                 </div>
             </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
                <Card className="border-0 bg-zinc-900 overflow-hidden relative group h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">
                            {stat.title}
                        </CardTitle>
                        <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                            <Icon size={18} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black font-inter text-white mb-1">
                            {stat.value.toLocaleString()}
                        </div>
                        <p className="text-xs text-zinc-500 font-medium flex items-center gap-1">
                            <TrendingUp size={12} className="text-green-500" />
                            {stat.change}
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - User Table */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Users className="text-primary" size={20} />
                    New Users
                </h2>
                <Button variant="outline" size="sm" asChild className="h-8 text-xs">
                    <Link href="/dashboard/users">
                        Manage All Users <ArrowUpRight className="ml-2 h-3 w-3" />
                    </Link>
                </Button>
            </div>
            
            <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-950 border-b border-zinc-800">
                            <tr className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
                                <th className="px-6 py-4">User Details</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Balance</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {data.recentUsers.length > 0 ? (
                                data.recentUsers.map((u, i) => (
                                    <tr key={u._id || i} className="group hover:bg-zinc-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <UserAvatar src={u.photoURL} name={u.name} className="w-10 h-10 border-2 border-zinc-800 group-hover:border-primary/50 transition-colors" />
                                                <div>
                                                    <div className="font-bold text-white group-hover:text-primary transition-colors">{u.name}</div>
                                                    <div className="text-xs text-zinc-500 font-mono">{u.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                                                u.role === 'admin' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                u.role === 'buyer' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                                                'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                            }`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-mono text-white font-bold">
                                                {u.coin} <span className="text-xs text-zinc-500 font-sans">coins</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button 
                                                variant="ghost" 
                                                size="icon"
                                                onClick={() => handleDeleteUser(u._id)}
                                                className="h-8 w-8 hover:bg-red-500/20 hover:text-red-500 text-zinc-600 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                                        No recent users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>

          {/* Sidebar Widgets - Quick Actions & Info */}
          <div className="space-y-6">
              <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Quick Actions</h2>
              </div>
              <div className="grid gap-4">
                  <Card className="bg-gradient-to-br from-primary/20 to-zinc-900 border-primary/20 hover:border-primary/50 transition-colors cursor-pointer group">
                      <CardContent className="p-6 flex items-center justify-between">
                          <div>
                              <h3 className="font-bold text-white mb-1 group-hover:text-primary transition-colors">Pending Withdrawals</h3>
                              <p className="text-xs text-zinc-400">Review 0 requests</p>
                          </div>
                          <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                              <DollarSign size={20} />
                          </div>
                      </CardContent>
                  </Card>
                  
                  <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
                      <CardContent className="p-6">
                          <h3 className="font-bold text-white mb-4">System Notifications</h3>
                          <div className="space-y-4">
                              <div className="flex gap-3 items-start">
                                  <div className="h-2 w-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                                  <div>
                                      <p className="text-sm text-zinc-300">New system update deployed.</p>
                                      <p className="text-xs text-zinc-500 mt-1">2 hours ago</p>
                                  </div>
                              </div>
                              <div className="flex gap-3 items-start">
                                  <div className="h-2 w-2 mt-2 rounded-full bg-yellow-500 shrink-0" />
                                  <div>
                                      <p className="text-sm text-zinc-300">High traffic detected.</p>
                                      <p className="text-xs text-zinc-500 mt-1">5 hours ago</p>
                                  </div>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
              </div>
          </div>
      </div>
    </div>
  );
}
