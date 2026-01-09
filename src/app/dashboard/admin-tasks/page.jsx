"use client";

import { useAuth } from "@/components/AuthProvider";
import { Loader2, Trash2, Eye } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function AdminTasksPage() {
  const { role, loading } = useAuth();
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["adminTasks"],
    queryFn: async () => {
      const res = await fetch("/api/admin/tasks");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      return res.json();
    },
    enabled: role === "admin",
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await fetch(`/api/admin/tasks?id=${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminTasks"]);
    },
  });

  if (loading || isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" /></div>;

  if (role !== "admin") {
    return <div className="text-red-500 p-8">Access Denied</div>;
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task? This action cannot be undone.")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-inter tracking-tight">Manage Tasks</h1>
        <span className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full text-xs font-bold uppercase">
           Total: {tasks.length}
        </span>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
              <TableHead className="text-zinc-400 font-bold uppercase tracking-wider text-xs w-[300px]">Task Title</TableHead>
              <TableHead className="text-zinc-400 font-bold uppercase tracking-wider text-xs">Buyer Name</TableHead>
              <TableHead className="text-zinc-400 font-bold uppercase tracking-wider text-xs">Buyer Email</TableHead>
              <TableHead className="text-zinc-400 font-bold uppercase tracking-wider text-xs">Availability</TableHead>
              <TableHead className="text-zinc-400 font-bold uppercase tracking-wider text-xs text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-zinc-500">
                        No tasks found.
                    </TableCell>
                </TableRow>
            ) : (
                tasks.map((task) => (
                <TableRow key={task._id} className="border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                    <TableCell className="font-medium text-white">{task.task_title}</TableCell>
                    <TableCell className="text-zinc-400">{task.buyer_name}</TableCell>
                    <TableCell className="text-zinc-400 font-mono text-xs">{task.buyer_email}</TableCell>
                    <TableCell>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            {task.required_workers} slots
                        </span>
                    </TableCell>
                    <TableCell className="text-right">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10 h-8 w-8"
                        onClick={() => handleDelete(task._id)}
                        disabled={deleteMutation.isPending}
                    >
                        {deleteMutation.isPending ? <Loader2 className="animate-spin h-4 w-4" /> : <Trash2 size={16} />}
                    </Button>
                    </TableCell>
                </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
