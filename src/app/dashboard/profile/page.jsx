"use client";

import { useAuth } from "@/components/AuthProvider";
import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "@/auth/firebase.config";
import { Loader2, User, Camera, Save, BadgeCheck, AlertTriangle, Mail, Send, Check } from "lucide-react";

export default function ProfilePage() {
  const { user, userData, loading, refetchUser } = useAuth();
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");
  
  // OTP States
  const [verificationMsg, setVerificationMsg] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpCode, setOtpCode] = useState("");

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
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name, photoURL: photoURL });
      }

      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, name, photoURL })
      });

      if (res.ok) {
        setMessage("Profile updated successfully!");
        refetchUser();
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

  const handleSendOtp = async () => {
    setIsSendingOtp(true);
    setVerificationMsg("");
    try {
        const res = await fetch('/api/auth/otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email })
        });
        if(res.ok) {
            setVerificationMsg("OTP Code sent to your email.");
            setShowOtpInput(true);
        } else {
            setVerificationMsg("Failed to send OTP.");
        }
    } catch (error) {
        setVerificationMsg("Error sending OTP.");
    } finally {
        setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsVerifyingOtp(true);
    try {
        const res = await fetch('/api/auth/otp', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, otp: otpCode })
        });
        
        const data = await res.json();

        if(res.ok) {
            setVerificationMsg("Email Verified Successfully!");
            setShowOtpInput(false);
            setOtpCode("");
            refetchUser();
        } else {
            setVerificationMsg(data.message || "Invalid OTP");
        }
    } catch (error) {
        setVerificationMsg("Verification failed.");
    } finally {
        setIsVerifyingOtp(false);
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" size={32}/></div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold font-inter">My Profile</h1>
          {userData?.verified ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-500 rounded-full border border-blue-500/20">
                  <BadgeCheck size={20} className="fill-blue-500/20" />
                  <span className="text-sm font-bold uppercase">Verified Account</span>
              </div>
          ) : (
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 text-yellow-500 rounded-full border border-yellow-500/20">
                  <AlertTriangle size={20} />
                  <span className="text-sm font-bold uppercase">Unverified</span>
              </div>
          )}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
        <form onSubmit={handleUpdateProfile} className="space-y-6">
           
           {/* Profile Picture Input */}
           <div className="flex flex-col items-center gap-4 mb-8">
              <div className="relative w-32 h-32">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-zinc-800 bg-zinc-800">
                   {photoURL ? (
                     <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
                   ) : (
                     <User className="w-full h-full p-6 text-zinc-500" />
                   )}
                </div>
                {/* Verification Badge */}
                {userData?.verified && (
                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-lg ring-4 ring-zinc-900 border-2 border-transparent">
                        <BadgeCheck size={24} className="text-blue-500 fill-blue-500" />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4 text-white">
                             <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                           </svg>
                        </div>
                    </div>
                )}
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
                 <div className="relative">
                    <input 
                        type="email"
                        value={user?.email || ""}
                        disabled
                        className="w-full bg-zinc-950/50 border border-zinc-800 rounded-t px-4 py-3 text-zinc-500 cursor-not-allowed z-10 relative"
                    />
                    
                    {/* Verification Overlay / Section */}
                    {!userData?.verified && (
                        <div className="bg-zinc-800/50 border-x border-b border-zinc-800 rounded-b p-3 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-yellow-500 font-bold flex items-center gap-1">
                                    <AlertTriangle size={12} /> Email Not Verified
                                </span>
                                {!showOtpInput && (
                                    <button 
                                        type="button"
                                        onClick={handleSendOtp}
                                        disabled={isSendingOtp}
                                        className="text-xs font-bold bg-primary text-black px-3 py-1.5 rounded hover:bg-white transition-colors disabled:opacity-50 flex items-center gap-1"
                                    >
                                        {isSendingOtp ? <Loader2 className="animate-spin w-3 h-3" /> : <Send size={12} />}
                                        Send OTP
                                    </button>
                                )}
                            </div>

                            {/* OTP Input Area */}
                            {showOtpInput && (
                                <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                                    <input 
                                        type="text"
                                        value={otpCode}
                                        onChange={(e) => setOtpCode(e.target.value)}
                                        placeholder="Enter 6-digit OTP"
                                        maxLength={6}
                                        className="flex-1 bg-zinc-950 border border-zinc-700 rounded px-3 py-1.5 text-sm text-white focus:border-primary focus:outline-none tracking-widest font-mono text-center"
                                    />
                                    <button 
                                        type="button"
                                        onClick={handleVerifyOtp}
                                        disabled={isVerifyingOtp || otpCode.length < 6}
                                        className="text-xs font-bold bg-green-500 text-black px-3 py-1.5 rounded hover:bg-green-400 transition-colors disabled:opacity-50 flex items-center gap-1"
                                    >
                                        {isVerifyingOtp ? <Loader2 className="animate-spin w-3 h-3" /> : <Check size={12} />}
                                        Verify
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={handleSendOtp}
                                        disabled={isSendingOtp}
                                        className="text-xs font-bold text-primary hover:text-white underline disabled:opacity-50"
                                    >
                                        {isSendingOtp ? "Sending..." : "Resend Code"}
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setShowOtpInput(false)}
                                        className="text-xs font-bold bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded hover:bg-zinc-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                 </div>
                 {verificationMsg && (
                    <p className={`text-xs mt-2 flex items-center gap-1 ${verificationMsg.includes("sent") || verificationMsg.includes("Success") ? "text-green-500" : "text-red-500"}`}>
                        <Mail size={12} /> {verificationMsg}
                    </p>
                 )}
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
