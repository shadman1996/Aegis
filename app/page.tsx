import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EcosystemSection from "@/components/EcosystemSection";
import AIRoster from "@/components/AIRoster";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <EcosystemSection />
      <AIRoster />
      <HowItWorks />
      <PricingSection />
      <Footer />
    </main>
  );
}
