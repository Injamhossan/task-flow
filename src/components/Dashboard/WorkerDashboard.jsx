"use client";

import { motion } from "framer-motion";
import { Wallet, CheckCircle, Clock, ListChecks } from "lucide-react";

export default function WorkerDashboard({ user, userData }) {
  const stats = [
    { title: "Total Submissions", value: "15", icon: ListChecks, color: "bg-blue-500/10 text-blue-500" },
    { title: "Pending Review", value: "2", icon: Clock, color: "bg-yellow-500/10 text-yellow-500" },
    { title: "Total Earnings", value: `$${userData?.coin || 0}`, icon: Wallet, color: "bg-green-500/10 text-green-500" },
  ];

  const tasks = [
    { title: "Watch Youtube Video", reward: "10 Coins", difficulty: "Easy", deadline: "2 hours" },
    { title: "App Review", reward: "25 Coins", difficulty: "Medium", deadline: "5 hours" },
    { title: "Survey Completion", reward: "15 Coins", difficulty: "Easy", deadline: "1 hour" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-inter tracking-tight">Worker Dashboard</h1>
          <p className="text-zinc-400 mt-1">Start working and earning coins.</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-sm font-medium text-zinc-300">Status: Active</span>
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

      {/* Available Tasks Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6">Available Tasks For You</h2>
        <div className="space-y-4">
          {tasks.map((task, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center justify-between p-4 bg-black/40 rounded-lg border border-zinc-800 hover:border-zinc-600 transition-colors gap-4">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{task.title}</h3>
                    <div className="flex gap-3 text-xs text-zinc-500 mt-1">
                      <span className="px-2 py-0.5 bg-zinc-800 rounded text-center min-w-[60px]">{task.difficulty}</span>
                      <span className="px-2 py-0.5 bg-zinc-800 rounded text-center min-w-[60px]">{task.deadline}</span>
                    </div>
                  </div>
               </div>
               
               <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                 <span className="font-bold text-primary text-xl">{task.reward}</span>
                 <button className="px-6 py-2 bg-white text-black font-bold rounded-sm hover:bg-primary hover:text-black transition-colors">
                   View Details
                 </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
