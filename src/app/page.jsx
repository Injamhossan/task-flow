import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import TopEarners from "@/components/TopEarners";
import Testimonials from "@/components/Testimonials";
import ReadyToEarn from "@/components/ReadyToEarn";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Hero />
      <HowItWorks />
      <TopEarners />
      <Features />
      <Testimonials />
      <ReadyToEarn />
    </main>
  );
}
