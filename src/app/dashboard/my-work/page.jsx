"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, XCircle, ExternalLink } from "lucide-react";

export default function MyWorkPage() {
  const [activeTab, setActiveTab] = useState("all");

  const submissions = [
    { id: 101, task: "Watch Youtube Video", status: "Approved", date: "2023-10-25", earning: "$0.10" },
    { id: 102, task: "Like Facebook Post", status: "Pending", date: "2023-10-26", earning: "$0.05" },
    { id: 103, task: "Install Mobile App", status: "Rejected", date: "2023-10-24", earning: "$2.00" },
    { id: 104, task: "Write a Review", status: "Approved", date: "2023-10-23", earning: "$0.50" },
  ];

  const filteredSubmissions = activeTab === "all" 
    ? submissions 
    : submissions.filter(sub => sub.status.toLowerCase() === activeTab);

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
            onClick={() => setActiveTab(tab)}
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
                <th className="px-6 py-4">Potential Earning</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{sub.task}</td>
                    <td className="px-6 py-4 text-zinc-400">{sub.date}</td>
                    <td className="px-6 py-4 text-zinc-300">{sub.earning}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        sub.status === 'Approved' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                        sub.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                        'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>
                        {sub.status === 'Approved' && <CheckCircle size={12} />}
                        {sub.status === 'Pending' && <Clock size={12} />}
                        {sub.status === 'Rejected' && <XCircle size={12} />}
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-zinc-500 hover:text-white transition-colors">
                        <ExternalLink size={18} />
                      </button>
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
    </div>
  );
}
