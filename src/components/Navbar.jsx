import Link from "next/link";
import { Zap, Coins } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/5 text-white">
      <div className="flex items-center justify-between w-full max-w-[1600px] mx-auto px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center w-10 h-10 rounded-sm bg-primary text-black transition-transform group-hover:scale-105">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-wide text-white font-primary">TASKFLOW</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 translate-x-12">
          {["FEATURES", "TOP WORKERS", "REVIEWS"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-[14px] font-bold  font-inter tracking-[0.2em] text-zinc-400 hover:text-primary transition-colors uppercase"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-[14px] font-[600] font-inter tracking-widest text-white hover:text-primary transition-colors uppercase"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-6 py-2.5 text-[14px] font-[600] font-inter tracking-widest text-black bg-primary hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all uppercase shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
