"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, ClipboardList, ShieldAlert, DollarSign, Trash2, Loader2, Coins } from "lucide-react";
import Link from "next/link";

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
          totalUsers: prev.totalUsers - 1 // simplistic update
        }));
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  }

  const stats = [
    { title: "Total Users", value: data.totalUsers, icon: Users, color: "bg-blue-500/10 text-blue-500" },
    { title: "Total Tasks", value: data.totalTasks, icon: ClipboardList, color: "bg-purple-500/10 text-purple-500" },
    { title: "System Balance", value: data.totalCoins, icon: Coins, color: "bg-yellow-500/10 text-yellow-500" },
  ];

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" size={32}/></div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-inter tracking-tight">Admin Console</h1>
          <p className="text-zinc-400 mt-1">
            Welcome back, <span className="text-white font-bold">{user?.email === "admin@taskflow.com" ? "Admin" : user?.displayName}</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg flex items-center gap-2">
             <ShieldAlert size={16} />
             <span className="text-sm font-bold">Admin Access</span>
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
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden group hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                 <div className={`p-3 rounded-lg ${stat.color}`}>
                   <Icon size={24} />
                 </div>
                 <div className="text-3xl font-bold font-inter">
                   {stat.value}
                 </div>
              </div>
              <h3 className="text-zinc-400 font-medium">{stat.title}</h3>
            </motion.div>
          );
        })}
      </div>

      {/* User Management Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="text-xl font-bold">Recent Registrations</h2>
          <Link href="/dashboard/users" className="text-sm text-primary hover:underline">View All Users</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-900/50 text-zinc-400 text-sm uppercase">
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Coins</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {data.recentUsers.map((u, i) => (
                <tr key={u._id || i} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar src={u.photoURL} name={u.name} className="w-10 h-10" />
                      <div>
                        <div className="font-bold text-white">{u.name}</div>
                        <div className="text-sm text-zinc-500">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      u.role === 'admin' ? 'bg-red-500/10 text-red-500' :
                      u.role === 'buyer' ? 'bg-purple-500/10 text-purple-500' :
                      'bg-blue-500/10 text-blue-500'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 font-mono text-zinc-300">
                       <Coins size={14} className="text-yellow-500" />
                       {u.coin}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                        onClick={() => handleDeleteUser(u._id)}
                        className="p-2 hover:bg-red-500/10 text-zinc-400 hover:text-red-500 rounded transition-colors" 
                        title="Delete User"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
