"use client";

import { useAuth } from "@/components/AuthProvider";
import { Loader2 } from "lucide-react";

export default function AdminTasksPage() {
  const { role, loading } = useAuth();

  if (loading) return <Loader2 className="animate-spin" />;

  if (role !== "admin") {
    return <div className="text-red-500">Access Denied</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage All Tasks</h1>
      <p className="text-zinc-400">Admin task controls will be implemented here.</p>
    </div>
  );
}
