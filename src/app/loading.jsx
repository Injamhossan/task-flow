"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Loading() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const circleRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });

    // Initial state
    gsap.set(circleRef.current, { scale: 0, opacity: 0 });
    gsap.set(textRef.current, { y: 20, opacity: 0 });

    // Animation sequence
    tl.to(circleRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
    })
    .to(circleRef.current, {
      rotation: 360,
      duration: 1.5,
      ease: "power2.inOut",
    }, "<")
    .to(circleRef.current, {
      borderRadius: "20%",
      duration: 0.5,
      ease: "power1.inOut",
    }, "-=1")
    .to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
    }, "-=0.5")
    .to(circleRef.current, {
      scale: 0,
      opacity: 0,
      rotation: 720,
      borderRadius: "50%",
      duration: 0.8,
      ease: "power2.in",
    }, "+=0.5")
    .to(textRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
    }, "<");

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden"
    >
      <div 
        ref={circleRef}
        className="w-16 h-16 border-4 border-primary shadow-[0_0_30px_rgba(191,255,0,0.5)] rounded-full mb-8 relative"
      >
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
      </div>
      
      <h2 
        ref={textRef}
        className="text-2xl font-bold font-primary tracking-widest text-foreground uppercase"
      >
        Loading TaskFlow
      </h2>
    </div>
  );
}
