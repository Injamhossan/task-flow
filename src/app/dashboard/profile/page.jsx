"use client";

import { useAuth } from "@/components/AuthProvider";
import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "@/auth/firebase.config";
import { Loader2, User, Camera, Save } from "lucide-react";

export default function ProfilePage() {
  const { user, userData, loading } = useAuth();
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (userData) {
      setName(userData.name || user?.displayName || "");
      setPhotoURL(userData.photoURL || user?.photoURL || "");
    }
  }, [userData, user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage("");

    try {
      // 1. Update Firebase Profile
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL
        });
      }

      // 2. Update MongoDB
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, name, photoURL })
      });

      if (res.ok) {
        setMessage("Profile updated successfully!");
        // Force reload page to reflect changes in AuthProvider or trigger a re-fetch if possible
        window.location.reload(); 
      } else {
        setMessage("Failed to update database.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error updating profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" size={32}/></div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold font-inter">My Profile</h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
        <form onSubmit={handleUpdateProfile} className="space-y-6">
           
           {/* Profile Picture Input */}
           <div className="flex flex-col items-center gap-4 mb-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-800 bg-zinc-800">
                   {photoURL ? (
                     <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
                   ) : (
                     <User className="w-full h-full p-6 text-zinc-500" />
                   )}
                </div>
              </div>
              <div className="w-full max-w-sm">
                 <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Photo URL</label>
                 <div className="flex gap-2">
                    <input 
                      type="url"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-4 py-2 text-sm text-white focus:border-primary focus:outline-none"
                    />
                 </div>
              </div>
           </div>

           <div className="space-y-4">
              <div>
                 <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Full Name</label>
                 <input 
                   type="text"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-white focus:border-primary focus:outline-none"
                 />
              </div>

              <div>
                 <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Email Address</label>
                 <input 
                   type="email"
                   value={user?.email || ""}
                   disabled
                   className="w-full bg-zinc-950/50 border border-zinc-800 rounded px-4 py-3 text-zinc-500 cursor-not-allowed"
                 />
              </div>

              <div>
                 <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Role</label>
                 <span className="inline-block px-3 py-1 bg-zinc-800 text-zinc-300 rounded text-sm font-bold uppercase">
                    {userData?.role || "User"}
                 </span>
              </div>
           </div>

           {message && (
             <div className={`p-4 rounded text-sm font-bold ${message.includes("success") ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
               {message}
             </div>
           )}

           <button 
             type="submit"
             disabled={isUpdating}
             className="flex items-center gap-2 bg-primary text-black px-6 py-3 rounded font-bold hover:bg-white transition-colors disabled:opacity-50"
           >
             {isUpdating ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
             Update Profile
           </button>
        </form>
      </div>
    </div>
  );
}
