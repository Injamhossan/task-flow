"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Loader2, Trash2, Edit, Calendar, Coins, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function MyTasksPage() {
  const { user, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTask, setDeleteTask] = useState(null);
  const [updateTask, setUpdateTask] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.email) {
      fetchTasks();
    }
  }, [user]);

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

  const handleDelete = async () => {
    if (!deleteTask) return;
    setIsProcessing(true);
    try {
      const res = await fetch(`/api/tasks?id=${deleteTask._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTasks(tasks.filter((t) => t._id !== deleteTask._id));
        setDeleteTask(null);
        router.refresh(); // Update coin balance in navbar
      }
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateTask) return;
    setIsProcessing(true);
    try {
        const res = await fetch(`/api/tasks`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: updateTask._id,
                task_title: updateTask.task_title,
                task_detail: updateTask.task_detail,
                submission_info: updateTask.submission_info
            })
        });

        if (res.ok) {
            setTasks(tasks.map(t => t._id === updateTask._id ? updateTask : t));
            setUpdateTask(null);
        }

    } catch (error) {
        console.error("Update failed", error);
    } finally {
        setIsProcessing(false);
    }
  };

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

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
         <Table>
            <TableHeader className="bg-zinc-950">
               <TableRow className="hover:bg-transparent border-zinc-800">
                  <TableHead className="w-[300px]">Task Info</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Cost/Worker</TableHead>
                  <TableHead>Workers Needed</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {tasks.length === 0 ? (
                  <TableRow>
                     <TableCell colSpan={5} className="h-32 text-center text-zinc-500">
                        You haven't posted any tasks yet. <br/>
                        <a href="/dashboard/add-task" className="text-primary hover:underline font-bold mt-2 inline-block">Create a Task</a>
                     </TableCell>
                  </TableRow>
               ) : (
                  tasks.map((task) => (
                     <TableRow key={task._id} className="hover:bg-zinc-800/50 border-zinc-800/50">
                        <TableCell>
                           <div className="font-bold text-white line-clamp-1">{task.task_title}</div>
                           <div className="text-xs text-zinc-500 mt-1 line-clamp-1">{task.task_detail}</div>
                        </TableCell>
                        <TableCell>
                           <div className="flex items-center gap-2 text-sm text-zinc-300">
                              <Calendar size={14} className="text-zinc-500" />
                              {new Date(task.completion_date).toLocaleDateString()}
                           </div>
                        </TableCell>
                        <TableCell>
                           <div className="flex items-center gap-1 text-sm font-bold text-white">
                              {task.payable_amount}
                              <Coins size={14} className="text-yellow-500" />
                           </div>
                        </TableCell>
                        <TableCell>
                           <div className="flex items-center gap-2 text-sm">
                              <Users size={14} className="text-zinc-500" />
                              <span>{task.required_workers}</span>
                           </div>
                        </TableCell>
                        <TableCell className="text-right">
                           <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => setUpdateTask(task)}>
                                 <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="icon" className="hover:text-red-500 hover:bg-red-500/10" onClick={() => setDeleteTask(task)}>
                                 <Trash2 size={16} />
                              </Button>
                           </div>
                        </TableCell>
                     </TableRow>
                  ))
               )}
            </TableBody>
         </Table>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteTask} onOpenChange={() => !isProcessing && setDeleteTask(null)}>
         <DialogContent className="bg-zinc-900 border-zinc-800">
            <DialogHeader>
               <DialogTitle>Delete Task</DialogTitle>
               <DialogDescription>
                  Are you sure? This will delete the task and <span className="text-primary font-bold">refill {deleteTask ? deleteTask.required_workers * deleteTask.payable_amount : 0} coins</span> to your account.
               </DialogDescription>
            </DialogHeader>
            <DialogFooter>
               <Button variant="ghost" onClick={() => setDeleteTask(null)} disabled={isProcessing}>Cancel</Button>
               <Button variant="destructive" onClick={handleDelete} disabled={isProcessing}>
                  {isProcessing ? <Loader2 className="animate-spin" /> : "Delete"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>

      {/* Update Modal */}
      <Dialog open={!!updateTask} onOpenChange={() => !isProcessing && setUpdateTask(null)}>
         <DialogContent className="bg-zinc-900 border-zinc-800 sm:max-w-[500px]">
            <DialogHeader>
               <DialogTitle>Update Task</DialogTitle>
            </DialogHeader>
            {updateTask && (
                <form onSubmit={handleUpdate} className="space-y-4 py-2">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500">Task Title</label>
                        <Input 
                           value={updateTask.task_title} 
                           onChange={(e) => setUpdateTask({...updateTask, task_title: e.target.value})} 
                           required 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500">Task Details</label>
                        <textarea 
                           className="flex min-h-[80px] w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                           value={updateTask.task_detail} 
                           onChange={(e) => setUpdateTask({...updateTask, task_detail: e.target.value})} 
                           required 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500">Submission Info</label>
                        <Input 
                           value={updateTask.submission_info} 
                           onChange={(e) => setUpdateTask({...updateTask, submission_info: e.target.value})} 
                           required 
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setUpdateTask(null)} disabled={isProcessing}>Cancel</Button>
                        <Button type="submit" disabled={isProcessing}>
                             {isProcessing ? <Loader2 className="animate-spin" /> : "Update Task"}
                        </Button>
                    </DialogFooter>
                </form>
            )}
         </DialogContent>
      </Dialog>
    </div>
  );
}
