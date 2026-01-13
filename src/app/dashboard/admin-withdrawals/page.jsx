"use client";

import { useAuth } from "@/components/AuthProvider";
import { useState, useEffect } from "react";
import { Loader2, ArrowUpRight, CheckCircle2, XCircle, DollarSign, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/UserAvatar";

export default function AdminWithdrawalsPage() {
  const { user, role, loading: authLoading } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/withdrawals');
      if (res.ok) {
        const data = await res.json();
        setRequests(data);
      }
    } catch (error) {
      console.error("Failed to fetch withdrawals", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && role === "admin") {
        fetchRequests();
    } else if (!authLoading && role !== "admin") {
        setLoading(false); // Stop loading if not admin (will show access denied)
    }
  }, [user, role, authLoading]);


  const handleAction = async (id, action) => {
    if (!confirm(`Are you sure you want to ${action} this request?`)) return;
    setProcessingId(id);

    try {
        const res = await fetch('/api/withdrawals', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, action })
        });

        if (res.ok) {
            // Update local state locally
            setRequests(prev => prev.map(req => {
                if (req._id === id) {
                    return { ...req, status: action === 'approve' ? 'approved' : 'rejected' };
                }
                return req;
            }));
            
            // Optionally remove from list if you only want to show pending
            // But showing history is better
        } else {
            alert("Failed to process request");
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred");
    } finally {
        setProcessingId(null);
    }
  };

  if (authLoading || loading) return <div className="flex h-[50vh] w-full items-center justify-center"><Loader2 className="animate-spin text-primary" size={40}/></div>;

  if (role !== "admin") {
      return (
          <div className="flex h-[50vh] flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 rounded-full bg-red-500/10 text-red-500 mb-2">
                  <XCircle size={40} />
              </div>
              <h1 className="text-2xl font-bold">Access Denied</h1>
              <p className="text-zinc-400">You do not have permission to view this page.</p>
          </div>
      );
  }

  const pendingRequests = requests.filter(r => r.status === 'pending');

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
            <div>
                <h1 className="text-3xl font-black font-inter tracking-tight mb-2">Withdrawal Requests</h1>
                <p className="text-zinc-400">Manage and process worker payment requests.</p>
            </div>
            <div className="flex gap-4">
               <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-center">
                   <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Pending Coins</div>
                   <div className="text-xl font-bold font-mono text-yellow-500 mt-1">
                       {pendingRequests.reduce((acc, curr) => acc + curr.withdrawal_coin, 0).toLocaleString()}
                   </div>
               </div>
               <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-center">
                   <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Pending Amount</div>
                   <div className="text-xl font-bold font-mono text-green-500 mt-1">
                       ${pendingRequests.reduce((acc, curr) => acc + curr.withdrawal_amount, 0).toLocaleString()}
                   </div>
               </div>
            </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
             <div className="overflow-x-auto">
                 <table className="w-full text-left">
                     <thead className="bg-zinc-950 border-b border-zinc-800">
                         <tr className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
                             <th className="px-6 py-4">Worker</th>
                             <th className="px-6 py-4">Amount</th>
                             <th className="px-6 py-4">Method & Account</th>
                             <th className="px-6 py-4">Date</th>
                             <th className="px-6 py-4">Status</th>
                             <th className="px-6 py-4 text-right">Action</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-zinc-800/50">
                         {requests.length > 0 ? (
                             requests.map((req) => (
                                 <tr key={req._id} className="group hover:bg-zinc-800/30 transition-colors">
                                     <td className="px-6 py-4">
                                         <div className="flex items-center gap-3">
                                             <UserAvatar name={req.worker_name} className="w-8 h-8 rounded-full border border-zinc-700" />
                                             <div>
                                                 <div className="font-bold text-white group-hover:text-primary transition-colors">{req.worker_name}</div>
                                                 <div className="text-xs text-zinc-500 font-mono">{req.worker_email}</div>
                                             </div>
                                         </div>
                                     </td>
                                     <td className="px-6 py-4">
                                         <div className="flex flex-col">
                                            <span className="font-bold text-green-500 font-mono">${req.withdrawal_amount}</span>
                                            <span className="text-xs text-zinc-500 font-mono">{req.withdrawal_coin} coins</span>
                                         </div>
                                     </td>
                                      <td className="px-6 py-4">
                                         <div className="flex items-center gap-2">
                                             <CreditCard size={14} className="text-zinc-500" />
                                             <span className="font-medium text-white">{req.payment_system}</span>
                                         </div>
                                         <div className="text-xs text-zinc-500 font-mono ml-6 mt-1 tracking-wider">{req.account_number}</div>
                                     </td>
                                     <td className="px-6 py-4">
                                         <div className="text-sm text-zinc-400">
                                            {new Date(req.createdAt).toLocaleDateString()}
                                         </div>
                                         <div className="text-xs text-zinc-600">
                                            {new Date(req.createdAt).toLocaleTimeString()}
                                         </div>
                                     </td>
                                     <td className="px-6 py-4">
                                         <Badge variant={req.status === 'pending' ? 'outline' : req.status === 'approved' ? 'default' : 'destructive'} 
                                            className={`${
                                                req.status === 'pending' ? 'border-yellow-500/50 text-yellow-500 bg-yellow-500/10' :
                                                req.status === 'approved' ? 'bg-green-500 text-black hover:bg-green-600' :
                                                'bg-red-500/10 text-red-500 border-red-500/50 hover:bg-red-500/20'
                                            } capitalize`}
                                         >
                                             {req.status}
                                         </Badge>
                                     </td>
                                     <td className="px-6 py-4 text-right">
                                         {req.status === 'pending' && (
                                             <div className="flex items-center justify-end gap-2">
                                                 <Button 
                                                    size="sm" 
                                                    variant="ghost" 
                                                    className="h-8 w-8 p-0 text-green-500 hover:text-green-400 hover:bg-green-500/10 rounded-full"
                                                    onClick={() => handleAction(req._id, 'approve')}
                                                    disabled={processingId === req._id}
                                                 >
                                                     {processingId === req._id ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={18} />}
                                                 </Button>
                                                 <Button 
                                                    size="sm" 
                                                    variant="ghost" 
                                                    className="h-8 w-8 p-0 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-full"
                                                    onClick={() => handleAction(req._id, 'reject')}
                                                    disabled={processingId === req._id}
                                                 >
                                                     {processingId === req._id ? <Loader2 className="animate-spin" size={16} /> : <XCircle size={18} />}
                                                 </Button>
                                             </div>
                                         )}
                                     </td>
                                 </tr>
                             ))
                         ) : (
                             <tr>
                                 <td colSpan={6} className="p-12">
                                     <div className="flex flex-col items-center justify-center text-center text-zinc-500">
                                         <div className="p-4 rounded-full bg-zinc-800/50 mb-3">
                                             <DollarSign size={24} className="text-zinc-600" />
                                         </div>
                                         <p>No withdrawal requests found.</p>
                                     </div>
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
