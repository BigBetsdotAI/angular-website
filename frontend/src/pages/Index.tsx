import Navbar from "@/components/Navbar";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ImpactSection from "@/components/ImpactSection";
import TrustedBySection from "@/components/TrustedBySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import InternTestimonialsSection from "@/components/InternTestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <RevealOnScroll>
        <HeroSection />
      </RevealOnScroll>
      <AboutSection />
      <RevealOnScroll>
        <ServicesSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <ImpactSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <TrustedBySection />
      </RevealOnScroll>
      <RevealOnScroll>
        <TestimonialsSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <InternTestimonialsSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <CTASection />
      </RevealOnScroll>
      <Footer />
    </div>
  );
};

export default Index;
