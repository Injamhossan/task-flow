"use client";

import { motion } from "framer-motion";
import { Plus, List, Coins, AlertCircle } from "lucide-react";

export default function BuyerDashboard({ user, userData }) {
  const stats = [
    { title: "Total Tasks Posted", value: "8", icon: List, color: "bg-purple-500/10 text-purple-500" },
    { title: "Pending Review", value: "3", icon: AlertCircle, color: "bg-yellow-500/10 text-yellow-500" },
    { title: "Total Coins", value: userData?.coin || 0, icon: Coins, color: "bg-primary/10 text-primary" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-inter tracking-tight">Buyer Dashboard</h1>
          <p className="text-zinc-400 mt-1">Manage your tasks and submissions.</p>
        </div>
        <button className="bg-primary text-black font-bold px-6 py-3 rounded-sm flex items-center gap-2 hover:bg-white transition-colors">
          <Plus size={20} />
          <span>Add New Task</span>
        </button>
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
                 <div className="text-4xl font-black font-inter tracking-tighter">
                   {stat.value}
                 </div>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">{stat.title}</h3>
            </motion.div>
          );
        })}
      </div>

      {/* Tasks Overview */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 min-h-[300px]">
         <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">My Tasks</h2>
            <button className="text-sm text-zinc-500 hover:text-white">View History</button>
         </div>
         
         <div className="text-zinc-500 text-center py-10 border border-dashed border-zinc-800 rounded-lg">
            <p className="mb-4">You haven't posted any tasks recently.</p>
            <button className="text-primary hover:underline font-medium">Create your first task</button>
         </div>
      </div>
    </div>
  );
}
