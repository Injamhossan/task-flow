"use client";

import { motion } from "framer-motion";
import { Github, Code, Users, GitPullRequest, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function JoinAsDeveloperPage() {
  const benefits = [
    {
      title: "Open Source Community",
      description: "Join a vibrant community of developers contributing to the future of work.",
      icon: Users,
    },
    {
      title: "Real World Impact",
      description: "Your code will help thousands of workers and buyers connect seamlessly.",
      icon: Code,
    },
    {
      title: "Skill Growth",
      description: "Work with modern technologies like Next.js, Firebase, and MongoDB.",
      icon: GitPullRequest,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm font-medium mb-6">
            <Code size={16} className="text-primary" />
            <span>Developers Only</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-inter tracking-tight mb-8">
            Build the Future <br />
            <span className="text-zinc-500">of TaskFlow.</span>
          </h1>
          
          <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
            We are building the most advanced micro-tasking platform. 
            Join our open source initiative and leave your mark on the codebase.
          </p>

          <Link
            href="https://github.com/Injamhossan/task-flow"
            target="_blank"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-sm font-bold text-lg hover:bg-zinc-200 transition-colors group"
          >
            <Github className="w-6 h-6" />
            Join as Developer
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-xl hover:border-zinc-700 transition-colors"
              >
                <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 text-primary">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Tech Stack Marquee (Static representation for now) */}
        <div className="border-t border-zinc-800 pt-20">
            <p className="text-center text-zinc-500 font-medium mb-8 uppercase tracking-widest text-sm">Powered by modern tech stack</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {["Next.js", "Firebase", "MongoDB", "Tailwind CSS", "Framer Motion"].map((tech) => (
                    <span key={tech} className="text-xl md:text-2xl font-bold text-white cursor-default hover:text-primary transition-colors">{tech}</span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
