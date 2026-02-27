import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";

const industries = [
  { name: "IT / ITeS + GCCs", pct: 30 },
  { name: "Pharma + Biotech + Life Sciences", pct: 22 },
  { name: "BFSI", pct: 14 },
  { name: "Healthcare Providers", pct: 10 },
  { name: "Manufacturing + Industrial", pct: 9 },
  { name: "Energy + Utilities", pct: 6 },
  { name: "Telecom + Media", pct: 5 },
  { name: "Retail + E-Commerce", pct: 4 },
];

const seniorityGroups = [
  {
    title: "CXO & Executive Leadership – 32%",
    items: ["CIO / CTO", "Chief Data Officer", "Chief Analytics Officer", "Chief Digital Officer", "Chief AI Officer / Head of AI"],
  },
  {
    title: "AI, Data & Analytics Leadership – 28%",
    items: ["Head of Data Science / AI", "Head of Data Engineering", "Head of Analytics / BI", "AI Architects / Enterprise AI Leads", "Directors / VPs – Data & AI"],
  },
  {
    title: "Risk, Governance & Compliance – 20%",
    items: ["Chief Risk Officer", "Head of Compliance / Governance", "Model Risk Managers", "Audit & Validation Leaders"],
  },
  {
    title: "Operations & Transformation – 20%",
    items: ["Heads of Shared Services / GCC Operations", "Transformation Heads / Strategy Leaders", "Supply Chain & Manufacturing Analytics Leaders"],
  },
];

const AttendingSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: barsRef, isVisible: barsVisible, getDelay } = useStaggerAnimation(industries.length);
  const { ref: senRef, isVisible: senVisible, getDelay: getSenDelay } = useStaggerAnimation(seniorityGroups.length);

  return (
    <section className="section-muted py-20">
      <div className="container mx-auto px-4">
        <div ref={titleRef}>
          <h2
            className={`font-heading font-bold text-3xl md:text-4xl text-center mb-12 text-secondary opacity-0 ${
              titleVisible ? "animate-fade-in-up" : ""
            }`}
          >
            Attending Landscape
          </h2>
        </div>

        <h3 className="font-heading font-bold text-xl text-secondary mb-6">Industry Representation (%)</h3>
        <div ref={barsRef} className="grid md:grid-cols-2 gap-4 mb-16">
          {industries.map((ind, i) => (
            <div
              key={ind.name}
              className={`flex items-center gap-4 opacity-0 ${barsVisible ? "animate-fade-in-up" : ""}`}
              style={barsVisible ? getDelay(i) : {}}
            >
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-secondary">{ind.name}</span>
                  <span className="text-sm font-bold text-primary">{ind.pct}%</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-teal rounded-full transition-all duration-1000"
                    style={{ width: barsVisible ? `${(ind.pct / 30) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-heading font-bold text-xl text-secondary mb-6">Job Titles / Seniority Breakdown</h3>
        <div ref={senRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seniorityGroups.map((g, i) => (
            <div
              key={g.title}
              className={`bg-card rounded-lg p-6 shadow-sm opacity-0 ${senVisible ? "animate-scale-fade-in" : ""}`}
              style={senVisible ? getSenDelay(i) : {}}
            >
              <h4 className="font-heading font-bold text-sm text-primary mb-3">{g.title}</h4>
              <ul className="space-y-1.5">
                {g.items.map((item) => (
                  <li key={item} className="text-xs text-muted-foreground">• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AttendingSection;
