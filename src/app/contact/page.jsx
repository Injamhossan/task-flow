"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-zinc-900/50 to-transparent pointer-events-none" />
        <div className="absolute -top-[250px] -right-[250px] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest backdrop-blur-sm mb-6">
                 Message Us
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-inter tracking-tighter mb-6">
            Get in <span className="text-transparent" style={{ WebkitTextStroke: "1px #bfff00" }}>Touch.</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Have questions about TaskFlow? We're here to help. Reach out to our team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
           {/* Contact Info */}
           <div className="space-y-6">
              {[
                  { icon: Mail, title: "Email Us", desc: "For general inquiries and support.", value: "support@taskflow.com", href: "mailto:support@taskflow.com", color: "text-primary bg-primary/10" },
                  { icon: MapPin, title: "Visit Us", desc: "Come say hello at our HQ.", value: "123 Tech Avenue, Silicon Valley, CA", href: null, color: "text-purple-500 bg-purple-500/10" },
                  { icon: Phone, title: "Call Us", desc: "Mon-Fri from 9am to 6pm.", value: "+1 (555) 123-4567", href: "tel:+15551234567", color: "text-blue-500 bg-blue-500/10" }
              ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                  >
                    <Card className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
                        <CardContent className="p-6 flex items-center gap-5">
                             <div className={`p-4 rounded-xl ${item.color}`}>
                                <item.icon size={28} />
                             </div>
                             <div>
                                <h3 className="text-xl font-bold mb-1 text-white">{item.title}</h3>
                                <p className="text-zinc-400 text-sm mb-2">{item.desc}</p>
                                {item.href ? (
                                    <a href={item.href} className="text-white hover:text-primary transition-colors font-mono">{item.value}</a>
                                ) : (
                                    <p className="text-white font-mono">{item.value}</p>
                                )}
                             </div>
                        </CardContent>
                    </Card>
                  </motion.div>
              ))}
           </div>

           {/* Contact Form */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.5 }}
           >
              <Card className="border-zinc-800 bg-zinc-900 shadow-2xl">
                 <CardHeader>
                    <CardTitle className="text-2xl text-white">Send a Message</CardTitle>
                    <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
                 </CardHeader>
                 <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Full Name</label>
                            <Input 
                                placeholder="John Doe" 
                                value={formState.name}
                                onChange={(e) => setFormState({...formState, name: e.target.value})}
                                required
                                disabled={status === "loading" || status === "success"}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Email Address</label>
                            <Input 
                                type="email" 
                                placeholder="john@example.com" 
                                value={formState.email}
                                onChange={(e) => setFormState({...formState, email: e.target.value})}
                                required
                                disabled={status === "loading" || status === "success"}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Your Message</label>
                            <Textarea 
                                placeholder="How can we help you?" 
                                rows={6}
                                value={formState.message}
                                onChange={(e) => setFormState({...formState, message: e.target.value})}
                                required
                                disabled={status === "loading" || status === "success"}
                            />
                        </div>

                        {status === "error" && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm">
                                Something went wrong. Please try again.
                            </div>
                        )}

                        {status === "success" ? (
                            <div className="p-8 bg-green-500/10 border border-green-500/20 rounded-md flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                                <div className="w-12 h-12 bg-green-500 text-black rounded-full flex items-center justify-center mb-4">
                                    <Send size={24} />
                                </div>
                                <h3 className="text-green-500 font-bold text-xl mb-2">Message Sent!</h3>
                                <p className="text-zinc-400 text-sm">Thank you for contacting us. We will respond to your email shortly.</p>
                                <Button 
                                    className="mt-6" 
                                    variant="outline"
                                    onClick={() => setStatus("idle")}
                                >
                                    Send Another Message
                                </Button>
                            </div>
                        ) : (
                            <Button 
                                type="submit" 
                                className="w-full text-lg h-14" 
                                disabled={status === "loading"}
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message <Send className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>
                        )}
                    </form>
                 </CardContent>
              </Card>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
