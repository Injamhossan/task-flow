"use client";

import { useAuth } from "@/components/AuthProvider";
import { Loader2, DollarSign, Calendar, Coins } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PaymentHistoryPage() {
  const { user, role, loading } = useAuth();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      if (user?.email) {
         try {
             const res = await fetch(`/api/payments?email=${user.email}`);
             const data = await res.json();
             setPayments(data);
         } catch (error) {
             console.error("Error fetching payments", error);
         } finally {
             setIsLoading(false);
         }
      }
    };
    fetchPayments();
  }, [user]);

  if (loading || isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" /></div>;

  if (role !== "buyer") {
     return <div className="text-red-500 p-8">Access Denied: Only Buyers can access this page.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-inter tracking-tight">Payment History</h1>
        <p className="text-zinc-400 mt-1">Track all your coin purchases.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-zinc-950 text-zinc-400 uppercase tracking-wider font-semibold border-b border-zinc-800">
                    <tr>
                        <th className="px-6 py-4">Transaction ID</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Coins Received</th>
                        <th className="px-6 py-4">Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                    {payments.length > 0 ? (
                        payments.map((payment) => (
                            <tr key={payment._id} className="hover:bg-zinc-800/50 transition-colors">
                                <td className="px-6 py-4 font-mono text-zinc-500 text-xs">{payment.transactionId}</td>
                                <td className="px-6 py-4 font-bold text-green-500">${payment.amount}</td>
                                <td className="px-6 py-4">
                                     <div className="flex items-center gap-1 font-bold text-zinc-300">
                                        {payment.coins}
                                        <Coins size={14} className="text-yellow-500" />
                                     </div>
                                </td>
                                <td className="px-6 py-4 text-zinc-400">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} />
                                        {new Date(payment.createdAt).toLocaleDateString()}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                                No payment history found.
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
