"use client";

import { Wallet, ArrowDownLeft, ArrowUpRight, History } from "lucide-react";

export default function WalletPage() {
  const transactions = [
    { id: 1, type: "Withdrawal", amount: "-$50.00", status: "Completed", date: "Oct 24, 2023", method: "PayPal" },
    { id: 2, type: "Task Reward", amount: "+$2.00", status: "Completed", date: "Oct 23, 2023", method: "Task #105" },
    { id: 3, type: "Task Reward", amount: "+$0.50", status: "Completed", date: "Oct 23, 2023", method: "Task #103" },
    { id: 4, type: "Bonus", amount: "+$5.00", status: "Processing", date: "Oct 22, 2023", method: "Weekly Bonus" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-inter tracking-tight">Wallet</h1>
        <p className="text-zinc-400 mt-1">Manage your earnings and withdrawals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-2xl p-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
           
           <div className="relative z-10">
             <div className="flex items-center gap-3 mb-2 text-zinc-400">
               <div className="p-2 bg-zinc-800 rounded-lg">
                 <Wallet size={20} />
               </div>
               <span className="font-medium">Total Balance</span>
             </div>
             <h2 className="text-5xl font-bold text-white mb-6">$420.50</h2>
             
             <div className="flex gap-4">
               <button className="flex-1 bg-primary text-black font-bold py-3 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                 <ArrowUpRight size={18} />
                 Withdraw
               </button>
               {/* <button className="flex-1 bg-zinc-800 text-white font-bold py-3 rounded-md hover:bg-zinc-700 transition-colors border border-zinc-700">
                 Deposit
               </button> */}
             </div>
           </div>
        </div>

        {/* Withdrawal Info / Stats */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col justify-center space-y-6">
           <div>
              <p className="text-sm text-zinc-500 uppercase font-bold tracking-wider mb-1">Total Withdrawn</p>
              <p className="text-2xl font-bold text-white">$1,250.00</p>
           </div>
           <div>
              <p className="text-sm text-zinc-500 uppercase font-bold tracking-wider mb-1">Pending Clearance</p>
              <p className="text-2xl font-bold text-yellow-500">$15.00</p>
           </div>
           <div className="pt-4 border-t border-zinc-800">
             <p className="text-xs text-zinc-500">
               Min. withdrawal amount is $10.00. Processing usually takes 24-48 hours.
             </p>
           </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <History size={20} className="text-primary" />
          Transaction History
        </h2>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-950 text-zinc-400 text-xs uppercase tracking-wider font-semibold border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Details</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                         tx.type === 'Withdrawal' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
                       }`}>
                         {tx.type === 'Withdrawal' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                       </div>
                       {tx.type}
                    </td>
                    <td className="px-6 py-4 text-zinc-400">{tx.date}</td>
                    <td className="px-6 py-4 text-zinc-400">{tx.method}</td>
                    <td className={`px-6 py-4 font-bold ${
                      tx.amount.startsWith('+') ? 'text-green-500' : 'text-zinc-300'
                    }`}>
                      {tx.amount}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${
                        tx.status === 'Completed' ? 'bg-zinc-800 text-zinc-400' : 'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
