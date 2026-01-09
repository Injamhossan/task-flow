"use client";

import { useAuth } from "@/components/AuthProvider";
import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import WorkerDashboard from "@/components/Dashboard/WorkerDashboard";
import BuyerDashboard from "@/components/Dashboard/BuyerDashboard";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { user, userData, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  // Fallback if role is not yet loaded or unknown
  if (!role) {
     if (user?.email === "admin@taskflow.com") {
        return <AdminDashboard user={user} />;
     }
     // Default view or loading
     return (
       <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-zinc-500">Preparing your workspace...</p>
       </div>
     );
  }

  return (
    <>
      {role === "admin" && <AdminDashboard user={user} />}
      {role === "buyer" && <BuyerDashboard user={user} userData={userData} />}
      {role === "worker" && <WorkerDashboard user={user} userData={userData} />}
    </>
  );
}
