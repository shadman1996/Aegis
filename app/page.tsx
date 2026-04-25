import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AgentsShowcase from "@/components/AgentsShowcase";
import HowNexaraWorks from "@/components/HowNexaraWorks";
import NexaraPricing from "@/components/NexaraPricing";
import NexaraFooter from "@/components/NexaraFooter";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AgentsShowcase />
      <HowNexaraWorks />
      <NexaraPricing />
      <NexaraFooter />
    </main>
  );
}
