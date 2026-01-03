"use client";

import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote: "As a freelancer, TaskFlow fills the gaps between projects perfectly. The variety of tasks keeps things interesting, and the payment is always on time.",
    earnings: "$5,200",
    period: "Last 3 months",
    name: "James Mitchell",
    role: "Freelance Writer",
    location: "London, UK",
    avatar: "https://i.pravatar.cc/150?u=james"
  },
  {
    id: 2,
    quote: "I was skeptical at first, but the instant withdrawal feature is a game changer. I've made enough to cover my rent just by working evenings.",
    earnings: "$3,850",
    period: "Last 2 months",
    name: "Sarah Chen",
    role: "Graphic Designer",
    location: "Toronto, CA",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 3,
    quote: "The platform is incredibly intuitive. I love the gamified badges system—it really motivates me to keep improving my reputation score.",
    earnings: "$1,200",
    period: "Last 2 weeks",
    name: "Michael Ross",
    role: "Student",
    location: "Austin, TX",
    avatar: "https://i.pravatar.cc/150?u=michael"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="bg-[#050505] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-3 border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold tracking-[0.2em] uppercase"
          >
            Testimonials
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black font-inter tracking-tighter uppercase leading-[0.9]"
          >
            <span className="block text-white">Real People.</span>
            <span 
              className="block text-transparent"
              style={{
                WebkitTextStroke: "1px #bfff00",
                color: "transparent"
              }}
            >
              Real Earnings.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-zinc-500 text-lg font-light"
          >
            Don't just take our word for it. Here's what our community says.
          </motion.p>
        </div>

        {/* Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative bg-[#0A0A0A] border border-zinc-900 p-8 md:p-16 rounded-sm">
            
             {/* Quote Icon */}
             <div className="mb-8">
               <Quote 
                 className="w-12 h-12 text-transparent" 
                 strokeWidth={1}
                 style={{ stroke: "#bfff00" }}
               />
             </div>

            {/* Content Transition */}
            <div className="min-h-[300px] flex flex-col justify-between overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <p className="text-2xl md:text-3xl font-medium text-zinc-100 leading-relaxed font-inter">
                    "{testimonials[currentIndex].quote}"
                  </p>

                  {/* Earnings Badge */}
                  <div className="inline-flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 p-1 px-4 py-2 rounded-sm">
                    <span className="text-primary font-bold text-xl">
                      {testimonials[currentIndex].earnings}
                    </span>
                    <span className="text-zinc-500 text-sm font-medium border-l border-zinc-700 pl-3">
                      {testimonials[currentIndex].period}
                    </span>
                  </div>
                
                  {/* User Info */}
                  <div className="flex items-center gap-4 pt-8 mt-8 border-t border-zinc-900">
                    <img 
                      src={testimonials[currentIndex].avatar} 
                      alt={testimonials[currentIndex].name}
                      className="w-12 h-12 rounded-full border border-zinc-800 grayscale"
                    />
                    <div>
                      <div className="text-white font-bold text-lg">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-zinc-500 text-sm">
                        {testimonials[currentIndex].role} <span className="text-zinc-700 mx-1">•</span> {testimonials[currentIndex].location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-[#050505] border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-600 transition-all z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>

            <button 
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 bg-[#050505] border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-600 transition-all z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`h-1.5 transition-all duration-300 ${
                  index === currentIndex 
                    ? "w-8 bg-primary" 
                    : "w-1.5 bg-zinc-800 hover:bg-zinc-700"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
