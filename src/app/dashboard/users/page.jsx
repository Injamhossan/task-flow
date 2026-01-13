"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Loader2 } from "lucide-react";

import UserAvatar from "@/components/UserAvatar";

export default function ManageUsersPage() {
  const { user, role, loading } = useAuth();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch all users
    const fetchUsers = async () => {
      try {
        // Need to implement an endpoint to get all users, for now relying on a new query param or route
        // Assuming current GET /api/users returns single user if email or all if admin?
        // Let's create a dedicated fetch for all users or modify the existing one.
        // For now, let's try calling without email parameter and see if we can modify the API to handle it.
        const res = await fetch('/api/admin/users'); 
        if (res.ok) {
           const data = await res.json();
           setUsers(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (role === 'admin' || user?.email === 'admin@taskflow.com') {
        fetchUsers();
    }
  }, [role, user]);

  if (loading || isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

  if (role !== "admin" && user?.email !== "admin@taskflow.com") {
    return <div className="text-red-500">Access Denied</div>;
  }

  const handleRoleUpdate = async (userId, newRole) => {
      try {
          await fetch('/api/admin/users', {
              method: 'PATCH',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ userId, role: newRole })
          });
          // Optimistic update
          setUsers(users.map(u => u._id === userId ? {...u, role: newRole} : u));
      } catch (error) {
          console.error("Failed to update role", error);
      }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 font-inter">Manage Users</h1>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-800/50 text-zinc-400 text-xs font-bold uppercase tracking-widest border-b border-zinc-800">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Coins</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <UserAvatar 
                            src={u.photoURL} 
                            name={u.name} 
                            className="w-10 h-10" 
                        />
                        <span className="font-bold text-white">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-400 text-sm">{u.email}</td>
                  <td className="px-6 py-4">
                    <select 
                        value={u.role}
                        onChange={(e) => handleRoleUpdate(u._id, e.target.value)}
                        className="bg-black border border-zinc-700 text-xs text-white rounded px-2 py-1 uppercase font-bold focus:border-primary focus:outline-none"
                    >
                        <option value="worker">Worker</option>
                        <option value="buyer">Buyer</option>
                        <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 font-mono text-primary">{u.coin}</td>
                  <td className="px-6 py-4 text-right">
                     {u.role === 'admin' ? (
                       <span className="text-zinc-500 text-xs font-bold uppercase cursor-not-allowed">Admin</span>
                     ) : (
                       <button 
                         onClick={async () => {
                            if(confirm("Are you sure you want to delete this user?")) {
                                try {
                                    await fetch(`/api/admin/users?id=${u._id}`, { method: 'DELETE' });
                                    setUsers(users.filter(user => user._id !== u._id));
                                } catch(err) {
                                    console.error(err);
                                }
                            }
                         }}
                         className="text-red-500 hover:text-red-400 text-xs font-bold uppercase"
                       >
                         Remove
                       </button>
                     )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
