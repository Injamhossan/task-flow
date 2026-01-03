import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import TopEarners from "@/components/TopEarners";
import Testimonials from "@/components/Testimonials";
import ReadyToEarn from "@/components/ReadyToEarn";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">
      <Navbar />
      <Hero />
      <HowItWorks />
      <TopEarners />
      <Features />
      <Testimonials />
      <ReadyToEarn />
      <Footer />
    </main>
  );
}
