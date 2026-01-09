"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/components/AuthProvider";
import { Loader2, CheckCircle, XCircle, ExternalLink, Eye } from "lucide-react";
import { useState } from "react";

import { motion } from "framer-motion";

export default function BuyerSubmissionsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [actionId, setActionId] = useState(null);

  // Fetch Pending Submissions for this Buyer
  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ['buyer-submissions', user?.email],
    queryFn: async () => {
       if(!user?.email) return [];
       const res = await fetch(`/api/submissions?buyer_email=${user.email}`);
       return res.json();
    },
    enabled: !!user?.email
  });

  // Approve/Reject Mutation
  const actionMutation = useMutation({
    mutationFn: async ({ id, action }) => {
        const res = await fetch('/api/submissions', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, action })
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message);
        return result;
    },
    onSuccess: () => {
        queryClient.invalidateQueries(['buyer-submissions']);
        queryClient.invalidateQueries(['notifications']); // Update notifications if any
        setActionId(null);
    },
    onError: (error) => {
        alert(error.message); // Simple alert for now
        setActionId(null);
    }
  });

  const handleAction = (id, action) => {
      setActionId(id);
      actionMutation.mutate({ id, action });
  };

  const [selectedSubmission, setSelectedSubmission] = useState(null); // For modal view

  if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" size={32}/></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-inter tracking-tight">Review Submissions</h1>
        <p className="text-zinc-400 mt-1">Approve or reject work submitted by workers.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 text-zinc-400 uppercase tracking-wider font-semibold border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4">Worker</th>
                <th className="px-6 py-4">Task</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {submissions.length > 0 ? (
                submissions.map((sub) => (
                  <tr key={sub._id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4">
                        <div className="flex flex-col">
                            <span className="font-bold text-white">{sub.worker_name}</span>
                            <span className="text-xs text-zinc-500">{sub.worker_email}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{sub.task_title}</td>
                    <td className="px-6 py-4 text-zinc-400">{new Date(sub.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-bold text-primary">{sub.payable_amount} Coins</td>
                    <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                             {/* View Details Button */}
                             <button 
                                onClick={() => setSelectedSubmission(sub)}
                                className="p-2 bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700 transition"
                                title="View Proof"
                             >
                                <Eye size={16} />
                             </button>

                             {/* Approve Button */}
                             <button
                                onClick={() => handleAction(sub._id, 'approve')}
                                disabled={actionId === sub._id}
                                className="flex items-center gap-1 px-3 py-1.5 bg-green-500/10 text-green-500 border border-green-500/20 rounded hover:bg-green-500 hover:text-white transition disabled:opacity-50"
                             >
                                {actionId === sub._id && actionMutation.variables?.action === 'approve' ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                                <span className="hidden sm:inline">Approve</span>
                             </button>

                             {/* Reject Button */}
                             <button
                                onClick={() => handleAction(sub._id, 'reject')}
                                disabled={actionId === sub._id}
                                className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded hover:bg-red-500 hover:text-white transition disabled:opacity-50"
                             >
                                {actionId === sub._id && actionMutation.variables?.action === 'reject' ? <Loader2 size={16} className="animate-spin" /> : <XCircle size={16} />}
                                <span className="hidden sm:inline">Reject</span>
                             </button>
                        </div>
                    </td>
                  </tr>
                ))
              ) : (
                 <tr>
                   <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                     No pending submissions to review.
                   </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Proof Modal */}
      {selectedSubmission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4"
              >
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                      <h3 className="text-xl font-bold">Submission Proof</h3>
                      <button onClick={() => setSelectedSubmission(null)} className="text-zinc-500 hover:text-white">
                          <XCircle size={24} />
                      </button>
                  </div>
                  
                  <div className="space-y-4">
                      <div>
                          <label className="text-xs font-bold uppercase text-zinc-500">Task</label>
                          <p className="text-white font-medium">{selectedSubmission.task_title}</p>
                      </div>
                      <div>
                          <label className="text-xs font-bold uppercase text-zinc-500">Worker</label>
                          <p className="text-white">{selectedSubmission.worker_name} ({selectedSubmission.worker_email})</p>
                      </div>
                      <div className="bg-black/50 p-4 rounded-lg border border-zinc-800 max-h-60 overflow-y-auto">
                          <label className="text-xs font-bold uppercase text-zinc-500 block mb-2">Submitted Details</label>
                          <p className="text-zinc-300 whitespace-pre-wrap">{selectedSubmission.submission_details}</p>
                      </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                       <button
                            onClick={() => { handleAction(selectedSubmission._id, 'approve'); setSelectedSubmission(null); }}
                            className="flex-1 bg-green-600 text-white font-bold py-2 rounded hover:bg-green-500"
                       >
                           Approve
                       </button>
                       <button
                            onClick={() => { handleAction(selectedSubmission._id, 'reject'); setSelectedSubmission(null); }}
                            className="flex-1 bg-red-600 text-white font-bold py-2 rounded hover:bg-red-500"
                       >
                           Reject
                       </button>
                  </div>
              </motion.div>
          </div>
      )}
    </div>
  );
}
