const sponsorPoints = [
  {
    title: "Engage buyers at the \"data strategy to AI strategy\" stage",
    desc: "Enterprises are realising AI outcomes are only as good as the data foundations behind them. Sponsoring FAIDAS positions you early, when leaders are deciding data platforms, governance models, and analytics operating structures.",
  },
  {
    title: "Own the conversation on \"Data Confidence\"",
    desc: "Enterprises are moving from dashboards to decision intelligence, but only when data is reliable. This edition focuses on building quality, observability, lineage, and trust in AI-ready data pipelines.",
  },
  {
    title: "Show measurable value: analytics-driven outcomes are easier to justify",
    desc: "Data analytics delivers tangible ROI: faster decision cycles, better forecasting, cost reduction, risk reduction, and operational visibility.",
  },
  {
    title: "Position as a \"governed scale partner\" for regulated industries",
    desc: "Hyderabad's GCC + pharma/biotech ecosystem demands analytics and AI that are audit-ready, explainable, and compliant.",
  },
  {
    title: "Access the real buying committee for enterprise data & analytics",
    desc: "FAIDAS brings decision-makers who influence selection across data platforms, analytics stacks, AI security, and governance.",
  },
];

const benefits = [
  {
    title: "Pipeline (Revenue Impact)",
    items: [
      "Early access to enterprise leaders shaping AI programs (pre-RFP stage)",
      "Qualified account discovery across GCCs + regulated industries",
      "Visibility into transformation roadmaps and vendor shortlisting triggers",
    ],
  },
  {
    title: "Meetings (Sales Velocity)",
    items: [
      "Direct 1:1 connects with CXOs and budget owners",
      "Faster stakeholder mapping (IT + business + risk/compliance)",
      "Higher-intent discussions vs cold outreach",
    ],
  },
  {
    title: "Thought Leadership (Market Authority)",
    items: [
      "Stage positioning aligned to enterprise challenges: governance, security, scale",
      "Opportunity to lead non-sales conversations that earn trust",
      "Association with the industry's execution-focused AI blueprint",
    ],
  },
  {
    title: "Credibility (Brand Trust)",
    items: [
      "Strong relevance in regulated sectors where trust matters most",
      "Premium brand proximity through FAIDAS ecosystem + Recognition Gala",
      "Builds long-term perception as a strategic partner, not a tool vendor",
    ],
  },
];

const WhySponsorSection = () => {
  return (
    <section id="why-sponsor" className="section-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12 text-secondary">
          Critical Sponsor Value Points – Why Sponsor?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {sponsorPoints.map((p, i) => (
            <div key={i} className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-heading font-bold text-base text-secondary mb-3">{p.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12 text-secondary">
          Sponsor Benefits Mapped to ROI
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="bg-muted rounded-lg p-6">
              <h4 className="font-heading font-bold text-base text-secondary mb-4">{b.title}</h4>
              <ul className="space-y-2">
                {b.items.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySponsorSection;
