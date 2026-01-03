import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TopEarners from "@/components/TopEarners";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">
      <Navbar />
      <Hero />
      <TopEarners />
    </main>
  );
}
