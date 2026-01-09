"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/components/AuthProvider";
import { Loader2, Calendar, Coins, User as UserIcon, AlertTriangle, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation"; // Correct import for Next.js 13+ App Dir
import { useState } from "react";

export default function TaskDetailsPage() {
  const params = useParams(); // Unwrap params
  const { taskId } = params;
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [submissionDetails, setSubmissionDetails] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch Task Details
  const { data: task, isLoading } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
       const res = await fetch(`/api/tasks/${taskId}`);
       if (!res.ok) throw new Error("Task not found");
       return res.json();
    },
    enabled: !!taskId
  });

  // Submit Mutation
  const submitMutation = useMutation({
    mutationFn: async (data) => {
        const res = await fetch('/api/submissions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if(!res.ok) throw new Error(result.message || "Failed to submit");
        return result;
    },
    onSuccess: () => {
        setSuccess(true);
        queryClient.invalidateQueries(['worker-stats']);
        queryClient.invalidateQueries(['available-tasks']);
        setTimeout(() => router.push('/dashboard/my-work'), 2000);
    },
    onError: (err) => {
        setError(err.message);
    }
  });

  const handleSubmit = (e) => {
      e.preventDefault();
      if(!submissionDetails.trim()) {
          setError("Submission details are required.");
          return;
      }
      
      const payload = {
          task_id: task._id,
          task_title: task.task_title,
          task_img_url: task.task_image_url,
          payable_amount: task.payable_amount,
          worker_email: user.email,
          worker_name: user.displayName || "Worker",
          buyer_name: task.buyer_name,
          buyer_email: task.buyer_email,
          submission_details: submissionDetails,
          current_date: new Date().toISOString(),
          status: 'pending' // Default status
      };

      submitMutation.mutate(payload);
  };

  if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" size={32}/></div>;
  if (!task) return <div className="p-10 text-center text-red-500">Task not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Task Header */}
      <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-zinc-800">
         {task.task_image_url ? (
            <Image src={task.task_image_url} alt={task.task_title} fill className="object-cover" />
         ) : (
            <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600 font-bold">No Image</div>
         )}
         <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
         <div className="absolute bottom-6 left-6 right-6">
             <div className="flex justify-between items-end">
                 <div>
                    <span className="inline-block px-3 py-1 bg-primary text-black font-bold text-xs rounded mb-2">
                        {task.required_workers} Slots Left
                    </span>
                    <h1 className="text-4xl font-bold text-white font-inter">{task.task_title}</h1>
                    <div className="flex items-center gap-4 mt-2 text-zinc-300 text-sm">
                        <span className="flex items-center gap-1"><UserIcon size={14}/> {task.buyer_name}</span>
                        <span className="flex items-center gap-1"><Calendar size={14}/> Deadline: {new Date(task.completion_date).toLocaleDateString()}</span>
                    </div>
                 </div>
                 <div className="text-right">
                     <p className="text-zinc-400 text-sm font-medium uppercase tracking-widest">Payable Amount</p>
                     <p className="text-4xl font-bold text-primary flex items-center gap-1 justify-end">
                        {task.payable_amount} <Coins size={28}/>
                     </p>
                 </div>
             </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Details Column */}
          <div className="md:col-span-2 space-y-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4 border-b border-zinc-800 pb-2">Task Details</h2>
                  <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{task.task_detail}</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4 border-b border-zinc-800 pb-2 text-yellow-500 flex items-center gap-2">
                     <AlertTriangle size={20}/> Submission Requirements
                  </h2>
                  <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{task.submission_info}</p>
              </div>
          </div>

          {/* Submission Form Column */}
          <div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-6">
                  <h2 className="text-xl font-bold mb-6">Submit Proof</h2>
                  
                  {success ? (
                      <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-lg flex items-center gap-2">
                          <CheckCircle size={20} />
                          <span>Submitted Successfully! Redirecting...</span>
                      </div>
                  ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">
                                Submission Details
                            </label>
                            <textarea 
                                value={submissionDetails}
                                onChange={(e) => setSubmissionDetails(e.target.value)}
                                placeholder="Enter any proof, links, or notes required..."
                                rows={6}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-white focus:border-primary focus:outline-none resize-none"
                            />
                        </div>
                        
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button 
                            type="submit" 
                            disabled={submitMutation.isPending}
                            className="w-full bg-primary text-black font-bold py-3 rounded hover:bg-white transition-colors disabled:opacity-50"
                        >
                            {submitMutation.isPending ? <Loader2 className="animate-spin mx-auto"/> : "Submit Task"}
                        </button>
                      </form>
                  )}
              </div>
          </div>
      </div>
    </div>
  );
}
