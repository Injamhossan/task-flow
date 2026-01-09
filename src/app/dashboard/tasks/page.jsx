"use client";

import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Filter, Briefcase, Calendar, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

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
           <div className="relative w-full md:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
             <Input 
               type="text" 
               placeholder="Search tasks..." 
               className="pl-10"
             />
           </div>
           <Button variant="outline" size="icon">
             <Filter size={18} />
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task, i) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
           <Card className="h-full flex flex-col hover:border-zinc-700 transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="uppercase tracking-wider">Task</Badge>
                <Badge variant={task.payable_amount > 10 ? "destructive" : "default"} className={`uppercase tracking-wider ${task.payable_amount <= 10 ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" : ""}`}>
                  {task.payable_amount > 10 ? 'High Reward' : 'Standard'}
                </Badge>
              </div>
              <CardTitle className="line-clamp-1">{task.task_title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{task.task_detail}</p>
              
              <div className="flex items-center gap-4 text-zinc-400 text-sm">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span>{new Date(task.completion_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase size={14} />
                  <span>{task.required_workers} slots</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-zinc-800 pt-4 flex items-center justify-between">
               <div className="flex items-center gap-1.5 text-white font-bold text-lg">
                 {task.payable_amount}
                 <Coins size={18} className="text-yellow-500" />
               </div>
               <Link href={`/dashboard/task-details/${task._id}`}>
                 <Button variant="secondary" size="sm" className="font-bold">
                   View Details
                 </Button>
               </Link>
            </CardFooter>
           </Card>
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
