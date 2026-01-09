"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WorkerHomeTasksPage() {
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['available-tasks-all'],
    queryFn: async () => {
        const res = await fetch('/api/tasks'); 
        if(!res.ok) return [];
        return res.json();
    }
  });

  if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" size={32}/></div>;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold font-inter">Available Tasks</h1>
            <p className="text-zinc-400">Explore and complete tasks to earn coins.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task, i) => (
                <motion.div 
                    key={task._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors flex flex-col"
                >
                    <div className="p-6 flex-1 space-y-4">
                        <div className="flex justify-between items-start">
                             <div className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                                {task.required_workers} Slots Left
                             </div>
                             <div className="text-yellow-500 font-bold flex items-center gap-1">
                                <Zap size={14} className="fill-yellow-500"/> {task.payable_amount} Coins
                             </div>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold font-inter text-white line-clamp-2">{task.task_title}</h3>
                            <p className="text-sm text-zinc-500 mt-1">by {task.buyer_name}</p>
                        </div>
                        
                        <div className="flex gap-2 text-xs text-zinc-400">
                             <span className="bg-zinc-950 px-2 py-1 rounded">Deadline: {new Date(task.completion_date).toLocaleDateString()}</span>
                        </div>
                    </div>
                    
                    <div className="p-4 border-t border-zinc-800 bg-zinc-950/50">
                        <Link 
                            href={`/dashboard/task-details/${task._id}`} 
                            className="block w-full bg-white text-black font-bold py-2 rounded hover:bg-primary transition-colors text-center"
                        >
                            View Details
                        </Link>
                    </div>
                </motion.div>
            ))}

            {tasks.length === 0 && (
                <div className="col-span-full text-center py-20 text-zinc-500">
                    No tasks found. Check back later!
                </div>
            )}
        </div>
    </div>
  );
}
