"use client";

import { motion } from "framer-motion";
import { Wallet, CheckCircle, Clock, ListChecks, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function WorkerDashboard({ user, userData }) {
  
  // 1. Fetch Worker Stats (Submissions)
  const { data: submissions = [], isLoading: statsLoading } = useQuery({
    queryKey: ['worker-stats', user?.email],
    queryFn: async () => {
       if(!user?.email) return [];
       const res = await fetch(`/api/submissions?worker_email=${user.email}`);
       return res.json();
    },
    enabled: !!user?.email
  });

  // Calculate Real Stats
  const totalSubmissions = submissions.length;
  const pendingReview = submissions.filter(s => s.status === 'pending').length;
  const totalEarnings = submissions
    .filter(s => s.status === 'approved')
    .reduce((sum, s) => sum + (s.payable_amount || 0), 0);

  // 2. Fetch Available Tasks
  const { data: availableTasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ['available-tasks'],
    queryFn: async () => {
        const res = await fetch('/api/tasks'); // Assuming this endpoint returns available tasks
        if(!res.ok) return [];
        return res.json();
    }
  });

  const stats = [
    { title: "Total Submissions", value: totalSubmissions, icon: ListChecks, color: "bg-blue-500/10 text-blue-500" },
    { title: "Pending Review", value: pendingReview, icon: Clock, color: "bg-yellow-500/10 text-yellow-500" },
    { title: "Total Earnings", value: `${totalEarnings}`, icon: Wallet, color: "bg-green-500/10 text-green-500" },
  ];

  if (statsLoading || tasksLoading) {
      return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" size={32}/></div>;
  }

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
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Available Tasks For You</h2>
            <Link href="/dashboard/worker-home" className="text-sm font-bold text-primary hover:text-white transition-colors">
                View All
            </Link>
        </div>
        
        <div className="space-y-4">
          {availableTasks.slice(0, 5).map((task, i) => (
            <div key={task._id} className="flex flex-col md:flex-row items-center justify-between p-4 bg-black/40 rounded-lg border border-zinc-800 hover:border-zinc-600 transition-colors gap-4">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">{task.task_title}</h3>
                    <div className="flex gap-3 text-xs text-zinc-500 mt-1">
                      <span className="px-2 py-0.5 bg-zinc-800 rounded text-center min-w-[60px]">{task.buyer_name}</span>
                      <span className="px-2 py-0.5 bg-zinc-800 rounded text-center min-w-[60px]">Slots: {task.required_workers}</span>
                    </div>
                  </div>
               </div>
               
               <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                 <span className="font-bold text-primary text-xl whitespace-nowrap">{task.payable_amount} Coins</span>
                 <Link 
                    href={`/dashboard/task-details/${task._id}`}
                    className="px-6 py-2 bg-white text-black font-bold rounded-sm hover:bg-primary hover:text-black transition-colors"
                 >
                    View Details
                 </Link>
               </div>
            </div>
          ))}
          
          {availableTasks.length === 0 && (
              <div className="text-center py-12 text-zinc-500">
                  No tasks available at the moment.
              </div>
          )}
        </div>
      </div>
    </div>
  );
}
