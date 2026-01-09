"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Loader2, UploadCloud, DollarSign, Users, Calendar, FileText, Type, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddTaskPage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    task_title: "",
    task_detail: "",
    required_workers: "",
    payable_amount: "",
    completion_date: "",
    submission_info: "",
    task_image_url: "",
  });

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;
  if (userData?.role !== "buyer") return <div className="text-red-500 p-10">Access Denied</div>;

  const totalCost = (Number(formData.required_workers) || 0) * (Number(formData.payable_amount) || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (totalCost > userData.coin) {
      setError("Insufficient coins. Please purchase more coins.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          buyer_email: user.email,
          buyer_name: user.displayName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      router.push("/dashboard/my-tasks");
      router.refresh(); // Refresh to update coin balance in sidebar/header if connected
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-inter tracking-tight">Create New Task</h1>
        <p className="text-zinc-400 mt-1">Post a job for workers to complete.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Title */}
        <div className="space-y-2">
           <label className="text-sm font-bold uppercase tracking-widest text-zinc-500 ml-1">Task Title</label>
           <div className="relative group">
              <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
              <input 
                type="text" 
                value={formData.task_title}
                onChange={(e) => setFormData({...formData, task_title: e.target.value})}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm py-4 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-inter"
                placeholder="e.g. Watch YouTube Video"
                required
              />
           </div>
        </div>

        {/* Details and Submission Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-zinc-500 ml-1">Task Details</label>
              <textarea 
                value={formData.task_detail}
                onChange={(e) => setFormData({...formData, task_detail: e.target.value})}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm p-4 h-32 text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-inter resize-none"
                placeholder="Describe exactly what needs to be done..."
                required
              />
           </div>
           <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-zinc-500 ml-1">Submission Info</label>
              <textarea 
                value={formData.submission_info}
                onChange={(e) => setFormData({...formData, submission_info: e.target.value})}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm p-4 h-32 text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-inter resize-none"
                placeholder="What proof should the worker submit?"
                required
              />
           </div>
        </div>

        {/* Numbers Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-zinc-500 ml-1">Required Workers</label>
              <div className="relative group">
                 <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
                 <input 
                   type="number" 
                   min="1"
                   value={formData.required_workers}
                   onChange={(e) => setFormData({...formData, required_workers: e.target.value})}
                   className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm py-4 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-inter"
                   placeholder="100"
                   required
                 />
              </div>
           </div>
           <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-zinc-500 ml-1">Payable Amount (Coins)</label>
              <div className="relative group">
                 <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
                 <input 
                   type="number" 
                   min="1"
                   value={formData.payable_amount}
                   onChange={(e) => setFormData({...formData, payable_amount: e.target.value})}
                   className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm py-4 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-inter"
                   placeholder="10"
                   required
                 />
              </div>
           </div>
        </div>

        {/* Date and Cost */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
           <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-zinc-500 ml-1">Completion Date</label>
              <div className="relative group">
                 <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
                 <input 
                   type="date" 
                   value={formData.completion_date}
                   onChange={(e) => setFormData({...formData, completion_date: e.target.value})}
                   className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm py-4 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-inter [color-scheme:dark]"
                   required
                 />
              </div>
           </div>
           
           <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-sm flex flex-col items-end justify-center h-14 relative overflow-hidden">
               <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-0.5 z-10">Total Cost</div>
               <div className="text-2xl font-black font-inter text-primary z-10 leading-none">
                  {totalCost} <span className="text-sm font-bold text-zinc-500">Coins</span>
               </div>
               <div className="absolute right-0 bottom-0 opacity-10">
                  <DollarSign size={60} />
               </div>
           </div>
        </div>

        {/* Image Upload (URL for now) */}
        <div className="space-y-2">
           <label className="text-sm font-bold uppercase tracking-widest text-zinc-500 ml-1">Task Image URL</label>
           <div className="relative group">
              <UploadCloud className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
              <input 
                type="url" 
                value={formData.task_image_url}
                onChange={(e) => setFormData({...formData, task_image_url: e.target.value})}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm py-4 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-inter"
                placeholder="https://example.com/image.jpg"
              />
           </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 text-sm rounded-sm flex items-center gap-2">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 bg-primary text-black font-bold font-inter text-lg rounded-sm hover:bg-white transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
             <Loader2 className="animate-spin" />
          ) : (
             <>Add Task</>
          )}
        </button>

      </form>
    </div>
  );
}
