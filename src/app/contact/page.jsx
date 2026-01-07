"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted", formState);
    alert("Message sent! (This is a demo)");
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-inter tracking-tight mb-6">
            Get in <span className="text-primary">Touch.</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Have questions about TaskFlow? We're here to help. Reach out to our team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
           {/* Contact Info */}
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 }}
             className="space-y-8"
           >
              <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl space-y-6">
                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                       <Mail size={24} />
                    </div>
                    <div>
                       <h3 className="text-lg font-bold mb-1">Email Us</h3>
                       <p className="text-zinc-400 text-sm mb-2">For general inquiries and support.</p>
                       <a href="mailto:support@taskflow.com" className="text-white hover:text-primary transition-colors">support@taskflow.com</a>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
                       <MapPin size={24} />
                    </div>
                    <div>
                       <h3 className="text-lg font-bold mb-1">Visit Us</h3>
                       <p className="text-zinc-400 text-sm mb-2">Come say hello at our HQ.</p>
                       <p className="text-white">123 Tech Avenue, Silicon Valley, CA</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
                       <Phone size={24} />
                    </div>
                    <div>
                       <h3 className="text-lg font-bold mb-1">Call Us</h3>
                       <p className="text-zinc-400 text-sm mb-2">Mon-Fri from 9am to 6pm.</p>
                       <p className="text-white">+1 (555) 123-4567</p>
                    </div>
                 </div>
              </div>
           </motion.div>

           {/* Contact Form */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
           >
              <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Name</label>
                    <input 
                      type="text" 
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white focus:border-primary focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Email</label>
                    <input 
                      type="email" 
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white focus:border-primary focus:outline-none transition-colors"
                      placeholder="name@example.com"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-zinc-500">Message</label>
                    <textarea 
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                 </div>
                 <button 
                   type="submit"
                   className="w-full py-4 bg-primary text-black font-bold rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2"
                 >
                   Send Message
                   <Send size={18} />
                 </button>
              </form>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
