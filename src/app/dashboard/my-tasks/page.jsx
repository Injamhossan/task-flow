"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Loader2, Trash2, Edit, Eye, Calendar, DollarSign, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function MyTasksPage() {
  const { user, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      const fetchTasks = async () => {
        try {
          const res = await fetch(`/api/tasks?email=${user.email}`);
          const data = await res.json();
          setTasks(data);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchTasks();
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="flex justify-center p-20">
         <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-inter tracking-tight">My Tasks</h1>
          <p className="text-zinc-400 mt-1">Manage all your posted tasks.</p>
        </div>
        <div className="text-sm bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full">
           Total Tasks: <span className="font-bold text-white">{tasks.length}</span>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/50">
             <p className="text-zinc-500 mb-4">You haven't posted any tasks yet.</p>
             <a href="/dashboard/add-task" className="text-primary hover:underline font-bold">Create a Task</a>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="bg-zinc-800/50 text-zinc-400 text-xs font-bold uppercase tracking-widest border-b border-zinc-800">
                     <th className="px-6 py-4">Task Info</th>
                     <th className="px-6 py-4">Deadline</th>
                     <th className="px-6 py-4">Cost/Worker</th>
                     <th className="px-6 py-4">Workers</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-zinc-800">
                   {tasks.map((task) => (
                     <tr key={task._id} className="hover:bg-zinc-800/30 transition-colors">
                       <td className="px-6 py-4">
                         <div className="font-bold text-white line-clamp-1 max-w-[200px]">{task.task_title}</div>
                         <div className="text-xs text-zinc-500 mt-1 line-clamp-1 max-w-[200px]">{task.task_detail}</div>
                       </td>
                       <td className="px-6 py-4">
                         <div className="flex items-center gap-2 text-sm text-zinc-300">
                           <Calendar size={14} className="text-zinc-500" />
                           {new Date(task.completion_date).toLocaleDateString()}
                         </div>
                       </td>
                       <td className="px-6 py-4">
                         <div className="flex items-center gap-1 text-sm font-bold text-primary">
                           <DollarSign size={14} />
                           {task.payable_amount}
                         </div>
                       </td>
                       <td className="px-6 py-4">
                         <div className="flex items-center gap-2 text-sm">
                           <Users size={14} className="text-zinc-500" />
                           <span>0 / {task.required_workers}</span>
                         </div>
                       </td>
                       <td className="px-6 py-4 text-right">
                         <div className="flex items-center justify-end gap-2">
                           <button className="p-2 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors" title="Update">
                             <Edit size={16} />
                           </button>
                           <button className="p-2 hover:bg-red-500/10 rounded text-zinc-400 hover:text-red-500 transition-colors" title="Delete">
                             <Trash2 size={16} />
                           </button>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
