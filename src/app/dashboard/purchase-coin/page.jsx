"use client";

import { useAuth } from "@/components/AuthProvider";
import { Loader2 } from "lucide-react";

export default function PurchaseCoinPage() {
  const { user, role, loading } = useAuth();

  if (loading) return <Loader2 className="animate-spin text-primary" />;

  if (role !== "buyer") {
     return <div className="text-red-500">Access Denied</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 font-inter">Purchase Coin</h1>
      <p className="text-zinc-400">Coin purchase functionality will be implemented here.</p>
    </div>
  );
}
