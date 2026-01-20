"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
  const containerRef = useRef(null);
  const [isFinished, setIsFinished] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsFinished(true),
    });

    // Entrance
    tl.fromTo(
      ".char",
      { 
        y: 100, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.8,
        ease: "power4.out",
        delay: 0.2,
      }
    )
    // Pulse/Highlight
    .to(".char", {
      color: "#ffffff", // temporary white flash
      duration: 0.1,
      stagger: 0.05,
      ease: "power1.inOut"
    })
    .to(".char", {
      color: "#bfff00", // back to primary
      duration: 0.5,
      ease: "power1.out"
    })
    // Exit
    .to(".char", {
      y: -100,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: "power2.in",
      delay: 0.2,
    })
    .to(containerRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 0.8,
      ease: "expo.inOut",
    }, "-=0.2");

  }, { scope: containerRef });

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-[#0a0a0a] flex items-center justify-center cursor-wait"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      <div className="flex overflow-hidden font-primary text-5xl md:text-8xl font-bold tracking-tighter text-primary">
        {"TASKFLOW".split("").map((char, index) => (
          <span key={index} className="char inline-block">
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
