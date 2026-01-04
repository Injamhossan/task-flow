"use client";

import { useAuth } from "@/components/AuthProvider";
import { motion } from "framer-motion";
import { Wallet, CheckCircle, Clock } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  
  // Dummy stats
  const stats = [
    { title: "Total Earnings", value: "$420.50", icon: Wallet, color: "bg-green-500/10 text-green-500" },
    { title: "Tasks Completed", value: "45", icon: CheckCircle, color: "bg-blue-500/10 text-blue-500" },
    { title: "Pending Review", value: "12", icon: Clock, color: "bg-yellow-500/10 text-yellow-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-inter tracking-tight">Dashboard</h1>
          <p className="text-zinc-400 mt-1">Welcome back, {user?.displayName || "Worker"}!</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-sm font-medium text-zinc-300">Status: Active</span>
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
                 <div className="text-3xl font-bold font-inter group-hover:scale-105 transition-transform origin-right">
                   {stat.value}
                 </div>
              </div>
              <h3 className="text-zinc-400 font-medium">{stat.title}</h3>
              
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-current opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity" />
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity or Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 min-h-[300px]">
           <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
           <div className="text-zinc-500 text-center py-10">
              No recent activity to show.
           </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 min-h-[300px]">
           <h2 className="text-xl font-bold mb-6">Available Tasks</h2>
           <div className="text-zinc-500 text-center py-10">
              Check back later for new tasks.
           </div>
        </div>
      </div>
    </div>
  );
}
