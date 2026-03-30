"use client";

import { useAuth } from "@/components/AuthProvider";
import { useState } from "react";
import { Loader2, Wallet, Coins, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export default function WithdrawalsPage() {
  const { user, role, userData, loading, refetchUser } = useAuth();
  const [coinsToWithdraw, setCoinsToWithdraw] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bkash");
  const [accountNumber, setAccountNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const paymentMethods = [
    { id: "Bkash", name: "bKash", color: "text-pink-500", bgColor: "bg-pink-500/10", borderColor: "border-pink-500/30" },
    { id: "Nagad", name: "Nagad", color: "text-orange-500", bgColor: "bg-orange-500/10", borderColor: "border-orange-500/30" },
    { id: "Rocket", name: "Rocket", color: "text-purple-500", bgColor: "bg-purple-500/10", borderColor: "border-purple-500/30" },
    { id: "Bank", name: "Bank Transfer", color: "text-blue-500", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/30" }
  ];

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" size={32}/></div>;

  if (role !== "worker") {
     return <div className="text-red-500 p-8">Access Denied: Only Workers can access this page.</div>;
  }

  const userCoins = userData?.coin || 0;
  // Conversion Rate: 20 Coins = 1 Dollar
  const dollarAmount = (coinsToWithdraw / 20).toFixed(2);
  const maxDollarAmount = (userCoins / 20).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const coins = parseInt(coinsToWithdraw);

    // Validation
    if (isNaN(coins) || coins < 200) {
        setError("Minimum withdrawal amount is 200 coins.");
        setIsSubmitting(false);
        return;
    }

    if (coins > userCoins) {
        setError("Insufficient coins.");
        setIsSubmitting(false);
        return;
    }

    try {
        const res = await fetch('/api/withdrawals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                worker_email: user.email,
                worker_name: user?.displayName || "Worker",
                withdrawal_coin: coins,
                withdrawal_amount: parseFloat(dollarAmount),
                payment_system: paymentMethod,
                account_number: accountNumber
            })
        });

        const data = await res.json();
        
        if (!res.ok) {
           throw new Error(data.message || "Failed");
        }
        
        if (!res.ok) {
           throw new Error(data.message || "Failed");
        }
        
        refetchUser(); // Refresh Global State
        
        setSuccess("Withdrawal request submitted successfully!");
        setCoinsToWithdraw("");
        setAccountNumber("");
    } catch (err) {
        setError("Failed to process withdrawal.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-inter tracking-tight">Withdrawals</h1>
          <p className="text-zinc-400">Convert your hard-earned coins into real cash.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Stats Card */}
         <div className="md:col-span-1 space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Coins size={100} />
                </div>
                <h3 className="text-zinc-400 font-medium mb-2">Current Balance</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">{userCoins}</span>
                    <span className="text-sm text-zinc-500 font-bold">Coins</span>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center text-sm">
                    <span className="text-zinc-400">In Dollars:</span>
                    <span className="text-green-500 font-mono font-bold">${maxDollarAmount}</span>
                </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
               <h4 className="font-bold text-sm text-zinc-300 mb-4 flex items-center gap-2">
                 <AlertCircle size={16} className="text-primary"/>
                 Withdrawal Rules
               </h4>
               <ul className="space-y-3 text-sm text-zinc-400">
                  <li className="flex gap-2">
                    <span className="text-zinc-600">•</span>
                    Minimum withdrawal is 200 Coins.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-zinc-600">•</span>
                    Conversion rate: 20 Coins = $1.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-zinc-600">•</span>
                    Processing time: 24-48 hours.
                  </li>
               </ul>
            </div>
         </div>

         {/* Withdrawal Form */}
         <div className="md:col-span-2">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
               <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Coins to Withdraw</label>
                         <div className="relative">
                            <input 
                              type="number" 
                              value={coinsToWithdraw}
                              onChange={(e) => setCoinsToWithdraw(e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-white focus:border-primary focus:outline-none"
                              placeholder="Min 200"
                              min="200"
                              max={userCoins}
                              required
                            />
                            <Coins className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                         </div>
                      </div>

                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Amount in Dollars</label>
                         <div className="relative">
                            <input 
                              type="text" 
                              value={`$ ${dollarAmount}`}
                              readOnly
                              className="w-full bg-zinc-950/50 border border-zinc-800/50 rounded px-4 py-3 text-green-500 font-mono font-bold cursor-not-allowed"
                            />
                         </div>
                      </div>
                  </div>

                  <div className="space-y-4">
                     <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Select Payment System</label>
                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {paymentMethods.map((method) => (
                          <div 
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id)}
                            className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                              paymentMethod === method.id 
                                ? `${method.bgColor} ${method.borderColor} ring-1 ring-${method.color.split('-')[1]}-500 pb-5 pt-3` 
                                : `bg-zinc-950/50 border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900`
                            }`}
                          >
                            <div className={`w-3 h-3 rounded-full mb-1 transition-all ${paymentMethod === method.id ? 'bg-current opacity-100 scale-125 ' + method.color : 'bg-zinc-700 opacity-50'}`} />
                            <span className={`font-bold text-sm ${paymentMethod === method.id ? "text-white" : "text-zinc-400"}`}>
                               {method.name}
                            </span>
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Account Number</label>
                     <input 
                       type="text" 
                       value={accountNumber}
                       onChange={(e) => setAccountNumber(e.target.value)}
                       className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                       placeholder={paymentMethod === "Bank" ? "e.g. Bank Account Number" : "e.g. 017xxxxxxxx"}
                       required
                     />
                  </div>

                  {/* Messages */}
                  {error && (
                     <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium flex items-center gap-2">
                        <AlertCircle size={18} />
                        {error}
                     </div>
                  )}
                  {success && (
                     <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-medium flex items-center gap-2">
                        <CheckCircle2 size={18} />
                        {success}
                     </div>
                  )}

                  <button 
                    type="submit"
                    disabled={isSubmitting || userCoins < 200}
                    className="w-full h-14 bg-primary text-black font-bold font-inter text-lg rounded-sm hover:bg-white transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <>
                           Withdraw
                           <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                  </button>

                  {userCoins < 200 && (
                      <p className="text-center text-xs text-red-500 mt-2">
                         You need at least 200 coins to make a withdrawal.
                      </p>
                  )}
               </form>
            </div>
         </div>
      </div>
    </div>
  );
}
