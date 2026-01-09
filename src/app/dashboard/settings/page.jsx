"use client";

import { useAuth } from "@/components/AuthProvider";
import { useState } from "react";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "@/auth/firebase.config";
import { Loader2, Lock, Save, AlertTriangle } from "lucide-react";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage("");
    setError("");

    if (newPassword.length < 6) {
        setError("New password must be at least 6 characters.");
        setIsUpdating(false);
        return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      
      // 1. Re-authenticate
      await reauthenticateWithCredential(user, credential);
      
      // 2. Update Password
      await updatePassword(user, newPassword);

      setMessage("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
          setError("Current password is incorrect.");
      } else if (err.code === 'auth/requires-recent-login') {
          setError("Please logout and login again to change password.");
      } else {
          setError("Failed to update password. Try again.");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" size={32}/></div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold font-inter">Settings</h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Lock size={20} className="text-primary" />
            Change Password
        </h2>
        
        {/* Google Auth Warning */}
        {user?.providerData[0]?.providerId === 'google.com' && (
           <div className="mb-6 bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex items-start gap-3">
              <AlertTriangle className="text-yellow-500 shrink-0 mt-0.5" size={20} />
              <p className="text-yellow-200 text-sm">
                 You are logged in with Google. You cannot change your password here. Please manage your security settings through your Google Account.
              </p>
           </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-6">
           <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Current Password</label>
              <input 
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={user?.providerData[0]?.providerId === 'google.com'}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-white focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter current password"
                required
              />
           </div>

           <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">New Password</label>
              <input 
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={user?.providerData[0]?.providerId === 'google.com'}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-white focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter new password (min. 6 chars)"
                required
              />
           </div>

           {error && (
             <div className="p-4 rounded text-sm font-bold bg-red-500/10 text-red-500">
               {error}
             </div>
           )}
           
           {message && (
             <div className="p-4 rounded text-sm font-bold bg-green-500/10 text-green-500">
               {message}
             </div>
           )}

           <button 
             type="submit"
             disabled={isUpdating || user?.providerData[0]?.providerId === 'google.com'}
             className="flex items-center gap-2 bg-zinc-800 text-white px-6 py-3 rounded font-bold hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
           >
             {isUpdating ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
             Update Password
           </button>
        </form>
      </div>
    </div>
  );
}
