import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OverviewSection from "@/components/OverviewSection";
import WhyAttendSection from "@/components/WhyAttendSection";
import SpeakersSection from "@/components/SpeakersSection";
import ObjectivesSection from "@/components/ObjectivesSection";
import WhySponsorSection from "@/components/WhySponsorSection";
import AttendingSection from "@/components/AttendingSection";
import SpotlightSection from "@/components/SpotlightSection";
import AgendaSection from "@/components/AgendaSection";
import RegistrationForm from "@/components/RegistrationForm";
import FloatingContactIcons from "@/components/FloatingContactIcons";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <OverviewSection />
      <div id="why-attend">
        <WhyAttendSection />
      </div>
      <div id="speakers">
        <SpeakersSection />
      </div>
      <div id="objectives">
        <ObjectivesSection />
      </div>
      <WhySponsorSection />
      <AttendingSection />
      <SpotlightSection />
      <AgendaSection />
      <RegistrationForm />
      <footer className="bg-navy py-8 text-center">
        <p className="text-teal-light/60 text-xs font-body">
          © 2026 FAIDAS – Future of AI in Data Analytics Summit. All rights reserved.
        </p>
      </footer>
      <FloatingContactIcons />
      <ChatBot />
    </div>
  );
};

export default Index;
