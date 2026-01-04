"use client";

import { motion } from "framer-motion";
import { Search, Filter, Briefcase, Calendar, DollarSign } from "lucide-react";

export default function TasksPage() {
  const tasks = [
    { id: 1, title: "Watch Youtube Video", reward: 0.10, timeLeft: "2h", difficulty: "Easy", category: "Social" },
    { id: 2, title: "Like Facebook Post", reward: 0.05, timeLeft: "4h", difficulty: "Easy", category: "Social" },
    { id: 3, title: "Complete Survey on Tech", reward: 1.50, timeLeft: "24h", difficulty: "Medium", category: "Survey" },
    { id: 4, title: "Write a Review", reward: 0.50, timeLeft: "12h", difficulty: "Medium", category: "Content" },
    { id: 5, title: "Install Mobile App", reward: 2.00, timeLeft: "48h", difficulty: "Hard", category: "Download" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-inter tracking-tight">Available Tasks</h1>
          <p className="text-zinc-400 mt-1">Browse and complete tasks to earn rewards.</p>
        </div>
        <div className="flex gap-2">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
             <input 
               type="text" 
               placeholder="Search tasks..." 
               className="bg-zinc-900 border border-zinc-800 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary w-full md:w-64"
             />
           </div>
           <button className="p-2 bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800 transition-colors">
             <Filter size={20} className="text-zinc-400" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all hover:translate-y-[-2px] group"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="px-2 py-1 bg-zinc-800 rounded text-xs font-semibold text-zinc-400 uppercase tracking-wider">{task.category}</span>
              <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                task.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
                task.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                'bg-red-500/10 text-red-500'
              }`}>
                {task.difficulty}
              </span>
            </div>
            
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{task.title}</h3>
            
            <div className="flex items-center gap-4 text-zinc-400 text-sm mb-6">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>{task.timeLeft} left</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase size={14} />
                <span>35 slots</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
               <div className="flex items-center gap-1 text-white font-bold text-lg">
                 <DollarSign size={18} className="text-primary" />
                 {task.reward.toFixed(2)}
               </div>
               <button className="px-4 py-2 bg-white text-black text-sm font-bold rounded-sm hover:bg-zinc-200 transition-colors">
                 Start Task
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
