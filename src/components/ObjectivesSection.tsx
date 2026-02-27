import { Shield, Users, BarChart3, Scale, Database, Lock, Award } from "lucide-react";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";

const objectives = [
  { icon: BarChart3, title: "Scale Trusted AI", desc: "Beyond pilots with actionable enterprise execution frameworks." },
  { icon: Users, title: "Unite the full ecosystem", desc: "Enterprises, GCCs, regulated industries, providers, and policymakers—on one platform." },
  { icon: BarChart3, title: "Drive cross-industry learning", desc: "Through real case studies across India and global enterprise operations." },
  { icon: Scale, title: "Advance AI governance & compliance", desc: "With practical audit-ready validation and risk controls." },
  { icon: Database, title: "Strengthen AI-ready data foundations", desc: "Modernisation, quality, observability, and harmonisation at scale." },
  { icon: Lock, title: "Enable secure enterprise AI", desc: "Via zero-trust approaches, privacy safeguards, and AI threat readiness." },
  { icon: Award, title: "Build leadership recognition & networks", desc: "Through FAIDAS and the FAIDAS 25 Recognition Gala." },
];

const ObjectivesSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible, getDelay } = useStaggerAnimation(objectives.length);

  return (
    <section className="section-navy py-20">
      <div className="container mx-auto px-4">
        <div ref={titleRef}>
          <h2
            className={`font-heading font-bold text-3xl md:text-4xl text-center mb-12 text-primary-foreground opacity-0 ${
              titleVisible ? "animate-fade-in-up" : ""
            }`}
          >
            Event Objectives
          </h2>
        </div>
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {objectives.map((o, i) => (
            <div
              key={o.title}
              className={`bg-navy-light/40 border border-teal/20 rounded-lg p-6 text-center hover:border-teal/50 transition-colors opacity-0 ${
                gridVisible ? "animate-scale-fade-in" : ""
              }`}
              style={gridVisible ? getDelay(i) : {}}
            >
              <o.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <h4 className="font-heading font-bold text-base text-primary-foreground mb-2">{o.title}</h4>
              <p className="text-sm text-teal-light/80">{o.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ObjectivesSection;
