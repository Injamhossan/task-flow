"use client";

import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { Search, Filter, Briefcase, Calendar, DollarSign } from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('/api/tasks');
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
            key={task._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all hover:translate-y-[-2px] group flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="px-2 py-1 bg-zinc-800 rounded text-xs font-semibold text-zinc-400 uppercase tracking-wider">Task</span>
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                  task.payable_amount > 10 ? 'bg-red-500/10 text-red-500' :
                  task.payable_amount > 5 ? 'bg-yellow-500/10 text-yellow-500' :
                  'bg-green-500/10 text-green-500'
                }`}>
                  {task.payable_amount > 10 ? 'High Reward' : 'Standard'}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">{task.task_title}</h3>
              <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{task.task_detail}</p>
              
              <div className="flex items-center gap-4 text-zinc-400 text-sm mb-6">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span>{new Date(task.completion_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase size={14} />
                  <span>{task.required_workers} slots</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-zinc-800 pt-4 mt-auto">
               <div className="flex items-center gap-1 text-white font-bold text-lg">
                 <DollarSign size={18} className="text-primary" />
                 {task.payable_amount}
               </div>
               <button className="px-4 py-2 bg-white text-black text-sm font-bold rounded-sm hover:bg-zinc-200 transition-colors">
                 View Details
               </button>
            </div>
          </motion.div>
        ))}
      </div>
      {tasks.length === 0 && !loading && (
         <div className="text-center py-20 text-zinc-500">
           No tasks available at the moment.
         </div>
      )}
    </div>
  );
}
