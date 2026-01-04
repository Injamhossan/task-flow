"use client";

import { Bell, Lock, Moon, Globe, LogOut } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-inter tracking-tight">Settings</h1>
        <p className="text-zinc-400 mt-1">Manage your application preferences.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden divide-y divide-zinc-800">
         
         {/* Notifications */}
         <div className="p-6 flex items-start justify-between">
            <div className="flex gap-4">
               <div className="mt-1 p-2 bg-zinc-800 rounded-lg text-zinc-400">
                  <Bell size={20} />
               </div>
               <div>
                  <h3 className="text-lg font-bold text-white">Notifications</h3>
                  <p className="text-sm text-zinc-400">Receive email updates about new tasks and payments.</p>
               </div>
            </div>
            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle" id="toggle1" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-primary"/>
                <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-6 rounded-full bg-zinc-700 cursor-pointer"></label>
            </div>
         </div>

         {/* Appearance */}
         <div className="p-6 flex items-start justify-between">
            <div className="flex gap-4">
               <div className="mt-1 p-2 bg-zinc-800 rounded-lg text-zinc-400">
                  <Moon size={20} />
               </div>
               <div>
                  <h3 className="text-lg font-bold text-white">Appearance</h3>
                  <p className="text-sm text-zinc-400">Customize the look and feel of the platform.</p>
               </div>
            </div>
            <select className="bg-zinc-950 border border-zinc-700 text-sm rounded-md px-3 py-1.5 focus:outline-none focus:border-primary text-white">
              <option>Dark Theme</option>
              <option>Light Theme</option>
              <option>System Default</option>
            </select>
         </div>

          {/* Privacy */}
         <div className="p-6 flex items-start justify-between">
            <div className="flex gap-4">
               <div className="mt-1 p-2 bg-zinc-800 rounded-lg text-zinc-400">
                  <Lock size={20} />
               </div>
               <div>
                  <h3 className="text-lg font-bold text-white">Privacy & Security</h3>
                  <p className="text-sm text-zinc-400">Manage 2FA and password settings.</p>
               </div>
            </div>
            <button className="text-sm font-bold text-primary hover:text-white transition-colors">
              Manage Access
            </button>
         </div>
      </div>

      <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
         <h3 className="text-lg font-bold text-red-500 mb-2">Danger Zone</h3>
         <p className="text-sm text-zinc-400 mb-6">
           Deleting your account is permanent. All your data, earnings, and history will be wiped out immediately.
         </p>
         <button className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/50 rounded-md text-sm font-bold hover:bg-red-500 hover:text-white transition-colors">
           Delete Account
         </button>
      </div>
    </div>
  );
}
