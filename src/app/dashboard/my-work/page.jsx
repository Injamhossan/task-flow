"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, XCircle, ExternalLink, Coins, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/AuthProvider";

export default function MyWorkPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ['my-submissions', user?.email],
    queryFn: async () => {
        if(!user?.email) return [];
        const res = await fetch(`/api/submissions?worker_email=${user.email}`);
        return res.json();
    },
    enabled: !!user?.email
  });

  const filteredSubmissions = activeTab === "all" 
    ? submissions 
    : submissions.filter(sub => sub.status.toLowerCase() === activeTab);

  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" size={32}/></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-inter tracking-tight">My Work</h1>
        <p className="text-zinc-400 mt-1">Track status of your submitted tasks.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-800 pb-1">
        {["all", "pending", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
            className={`px-4 py-2 text-sm font-medium capitalize relative ${
              activeTab === tab ? "text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* Table/List */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 text-zinc-400 uppercase tracking-wider font-semibold border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4">Task Name</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Payable Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {currentItems.length > 0 ? (
                currentItems.map((sub) => (
                  <tr key={sub._id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{sub.task_title}</td>
                    <td className="px-6 py-4 text-zinc-400">{new Date(sub.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-1 text-zinc-300 font-bold">
                          {sub.payable_amount}
                          <Coins size={14} className="text-yellow-500" />
                       </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        sub.status === 'approved' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                        sub.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                        'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>
                        {sub.status === 'approved' && <CheckCircle size={12} />}
                        {sub.status === 'pending' && <Clock size={12} />}
                        {sub.status === 'rejected' && <XCircle size={12} />}
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                 <tr>
                   <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                     No submissions found in this category.
                   </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center pt-4">
           <button 
             onClick={() => handlePageChange(currentPage - 1)}
             disabled={currentPage === 1}
             className="px-4 py-2 border border-zinc-800 rounded bg-zinc-900 text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
           >
             Previous
           </button>
           <span className="text-sm text-zinc-500">
             Page <span className="text-white font-bold">{currentPage}</span> of {totalPages}
           </span>
           <button 
             onClick={() => handlePageChange(currentPage + 1)}
             disabled={currentPage === totalPages}
             className="px-4 py-2 border border-zinc-800 rounded bg-zinc-900 text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
           >
             Next
           </button>
        </div>
      )}
    </div>
  );
}
