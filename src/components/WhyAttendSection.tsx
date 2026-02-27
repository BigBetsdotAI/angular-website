import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";

const reasons = [
  {
    num: "01",
    title: "Hyderabad is where Enterprise AI is being scaled beyond pilots",
    desc: "Leaders are now building AI ecosystems with governance, validated data pipelines, and measurable business outcomes, not just experimentation.",
  },
  {
    num: "02",
    title: "Direct relevance to the GCC ecosystem",
    desc: "As Hyderabad's Global Capability Centers evolve into strategic value centers, the summit addresses AI operating models, cross-border execution, and scalable delivery frameworks.",
  },
  {
    num: "03",
    title: "Built for Hyderabad's regulated Pharma, Biotech & Life Sciences hub",
    desc: "Focuses on scaling AI with validation, trust, audit readiness, and real enterprise use cases across clinical, quality, PV, and supply chain.",
  },
  {
    num: "04",
    title: "Practical playbooks to modernise Hyderabad's data foundations",
    desc: "Tackles real enterprise challenges like fragmented legacy data, harmonisation, reliability, observability, and AI-ready pipelines.",
  },
  {
    num: "05",
    title: "AI governance & compliance is now a boardroom priority",
    desc: "The summit deep-dives into model validation, bias testing, compliance audits, and enterprise-grade governance structures.",
  },
  {
    num: "06",
    title: "Addresses growing AI security risks in enterprise environments",
    desc: "Covers AI threats, privacy risks, and zero-trust architecture required for mission-critical deployments.",
  },
  {
    num: "07",
    title: "Access to a senior, decision-making audience in Hyderabad",
    desc: "CIOs, CDOs, Chief AI Officers, risk and compliance leaders, and transformation heads shaping AI budgets and enterprise roadmaps.",
  },
];

const WhyAttendSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible, getDelay } = useStaggerAnimation(reasons.length);

  return (
    <section className="section-navy py-20">
      <div className="container mx-auto px-4">
        <div ref={titleRef}>
          <h2
            className={`font-heading font-bold text-3xl md:text-4xl text-center mb-12 text-primary-foreground opacity-0 ${
              titleVisible ? "animate-fade-in-up" : ""
            }`}
          >
            Why Attend – Hyderabad Edition
          </h2>
        </div>
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.num}
              className={`bg-navy-light/50 border border-teal/20 rounded-lg p-6 hover:border-teal/60 transition-colors opacity-0 ${
                gridVisible ? "animate-fade-in-up" : ""
              }`}
              style={gridVisible ? getDelay(i) : {}}
            >
              <span className="number-badge mb-4">{r.num}</span>
              <h3 className="font-heading font-bold text-lg text-primary-foreground mt-4 mb-2">
                {r.title}
              </h3>
              <p className="text-sm text-teal-light/80 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAttendSection;
