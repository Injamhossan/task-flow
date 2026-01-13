"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <>
      <Navbar />
      <div className={isDashboard ? "min-h-screen" : "pt-20 min-h-screen"}>
        {children}
      </div>
      {!isDashboard && <Footer />}
    </>
  );
}
