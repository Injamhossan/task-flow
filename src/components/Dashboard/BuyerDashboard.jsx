"use client";

import { motion } from "framer-motion";
import { Plus, List, Coins, AlertCircle, DollarSign, Eye, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function BuyerDashboard({ user, userData }) {
  const [stats, setStats] = useState({ totalTasks: 0, pendingTaskCount: 0, totalPayment: 0 });
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.email) {
            // 1. Fetch Stats
            const statsRes = await fetch(`/api/buyer/stats?email=${user.email}`);
            const statsData = await statsRes.json();
            setStats(statsData);

            // 2. Fetch Submissions
            const subRes = await fetch(`/api/submissions?buyer_email=${user.email}`);
            const subData = await subRes.json();
            setSubmissions(subData);
        }
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleAction = async (action) => {
    if (!selectedSubmission) return;
    setActionLoading(true);
    try {
        const res = await fetch('/api/submissions', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: selectedSubmission._id, action })
        });
        
        if (res.ok) {
            // Remove from list
            setSubmissions(prev => prev.filter(s => s._id !== selectedSubmission._id));
            setSelectedSubmission(null);
        }
    } catch (error) {
        console.error("Action failed", error);
    } finally {
        setActionLoading(false);
    }
  };


  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" /></div>;

  const statCards = [
    { title: "Total Tasks Posted", value: stats.totalTasks, icon: List, color: "bg-purple-500/10 text-purple-500" },
    { title: "Pending Task (Slots)", value: stats.pendingTaskCount, icon: AlertCircle, color: "bg-yellow-500/10 text-yellow-500" },
    { title: "Total Payment ($)", value: `$${stats.totalPayment}`, icon: DollarSign, color: "bg-green-500/10 text-green-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-inter tracking-tight">Buyer Dashboard</h1>
          <p className="text-zinc-400 mt-1">Manage your tasks and submissions.</p>
        </div>
        <Link href="/dashboard/add-task">
            <Button size="lg" className="font-bold flex items-center gap-2">
                <Plus size={20} />
                Add New Task
            </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-zinc-800 bg-zinc-900 border overflow-hidden relative group hover:border-zinc-700 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg ${stat.color}`}>
                            <Icon size={24} />
                        </div>
                        <div className="text-4xl font-black font-inter tracking-tighter">
                            {stat.value}
                        </div>
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">{stat.title}</h3>
                  </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Task To Review */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
         <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
            <h2 className="text-xl font-bold">Tasks To Review</h2>
            <Badge variant="outline">{submissions.length} Pending</Badge>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-zinc-950 text-zinc-400 uppercase tracking-wider font-semibold border-b border-zinc-800">
                    <tr>
                        <th className="px-6 py-4">Worker Name</th>
                        <th className="px-6 py-4">Task Title</th>
                        <th className="px-6 py-4">Payable Amount</th>
                        <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                    {submissions.length > 0 ? (
                        submissions.map((sub) => (
                            <tr key={sub._id} className="hover:bg-zinc-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">{sub.worker_name}</td>
                                <td className="px-6 py-4 text-zinc-300">{sub.task_title}</td>
                                <td className="px-6 py-4">
                                     <div className="flex items-center gap-1 font-bold text-zinc-300">
                                        {sub.payable_amount}
                                        <Coins size={14} className="text-yellow-500" />
                                     </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Button variant="outline" size="sm" onClick={() => setSelectedSubmission(sub)}>
                                        <Eye size={16} className="mr-2" />
                                        View Submission
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                                No submissions to review.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
         </div>
      </div>

      {/* Submission Modal */}
      {selectedSubmission && (
        <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
               <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-xl overflow-hidden shadow-2xl">
                  <div className="p-6 border-b border-zinc-800">
                     <h3 className="text-xl font-bold">Review Submission</h3>
                     <p className="text-zinc-500 text-sm mt-1">Review the details provided by the worker.</p>
                  </div>
                  <div className="p-6 space-y-4">
                     <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1 block">Task</label>
                        <p className="text-white font-medium">{selectedSubmission.task_title}</p>
                     </div>
                     <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1 block">Worker</label>
                        <p className="text-white font-medium">{selectedSubmission.worker_name} <span className="text-zinc-500 text-sm font-normal">({selectedSubmission.worker_email})</span></p>
                     </div>
                     <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1 block">Submission Details</label>
                        <div className="bg-zinc-950 p-4 rounded border border-zinc-800 text-zinc-300 text-sm whitespace-pre-wrap max-h-40 overflow-y-auto">
                            {selectedSubmission.submission_details}
                        </div>
                     </div>
                  </div>
                  <div className="p-6 border-t border-zinc-800 flex justify-end gap-3 bg-zinc-950/50">
                      <Button variant="ghost" onClick={() => setSelectedSubmission(null)} disabled={actionLoading}>Cancel</Button>
                      <Button variant="destructive" onClick={() => handleAction('reject')} disabled={actionLoading}>
                          <X size={16} className="mr-2" />
                          Reject
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleAction('approve')} disabled={actionLoading}>
                          <Check size={16} className="mr-2" />
                          Approve
                      </Button>
                  </div>
               </div>
            </div>
        </Dialog>
      )}

    </div>
  );
}
