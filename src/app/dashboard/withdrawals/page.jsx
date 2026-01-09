"use client";

import { useAuth } from "@/components/AuthProvider";
import { Loader2 } from "lucide-react";

export default function WithdrawalsPage() {
  const { user, role, loading } = useAuth();

  if (loading) return <Loader2 className="animate-spin text-primary" />;

  if (role !== "worker") {
     return <div className="text-red-500">Access Denied</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 font-inter">Withdrawals</h1>
      <p className="text-zinc-400">Withdrawal functionality will be implemented here.</p>
    </div>
  );
}
