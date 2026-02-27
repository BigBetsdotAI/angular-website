const agendaItems = [
  { time: "08:30 – 09:30", title: "Registration & Networking", desc: "" },
  { time: "09:30 – 09:40", title: "Opening & Welcome Address", desc: "" },
  { time: "09:40 – 10:05", title: "Opening Keynote: From Data-Driven to AI-Native Enterprises", desc: "A high-impact keynote setting the tone for the day, focused on what it truly takes to move from AI experimentation to enterprise-scale transformation." },
  { time: "10:05 – 10:35", title: "Fireside Chat: GCC 2.0 – How Hyderabad's GCCs are becoming AI Value Factories", desc: "Explores how Hyderabad's leading GCCs are shifting from centralised analytics to distributed, scalable AI delivery models." },
  { time: "10:35 – 11:20", title: "CXO Panel: AI + Data Analytics in Regulated Environments", desc: "Leaders from pharma, BFSI, and GCC operations address the realities of scaling AI in high-stakes environments." },
  { time: "11:20 – 11:50", title: "Networking Break + Partner Connect", desc: "" },
  { time: "11:50 – 12:15", title: "Sponsor Slot", desc: "" },
  { time: "12:15 – 12:45", title: "Technical Deep-Dive: Data Foundations for AI", desc: "Covers data quality gaps, observability blind spots, lineage complexity, data drift, model drift, and accuracy debt." },
  { time: "12:45 – 13:30", title: "Solution Showcase: Enterprise AI Stack in Action", desc: "A crisp, demo-led showcase of enterprise-ready solutions powering Trusted AI at scale." },
  { time: "13:30 – 14:30", title: "Networking Lunch", desc: "" },
  { time: "14:30 – 14:55", title: "Industry Spotlight: AI in Pharma & Biotech", desc: "How AI and analytics are transforming pharma and biotech across clinical intelligence, PV automation, and quality systems." },
  { time: "14:55 – 15:40", title: "Enterprise Case Studies", desc: "Real deployments and measurable outcomes across Life Sciences/Healthcare, GCC operations, BFSI and Shared Services." },
  { time: "15:40 – 16:00", title: "Networking Break", desc: "" },
  { time: "16:00 – 16:45", title: "Leadership Panel: Building AI-Ready Teams", desc: "Explores new roles emerging across the AI lifecycle—AI auditors, validators, AI security specialists." },
  { time: "16:45 – 17:30", title: "Strategic Innovation Panel: The Next Wave of Enterprise AI", desc: "A future-focused panel exploring where enterprise innovation is headed beyond pilots and hype." },
  { time: "17:30 – 18:30", title: "Recognition Session: FAIDAS 25", desc: "Celebrating 25 leaders from the regional ecosystem driving measurable AI and data analytics outcomes." },
  { time: "18:30", title: "Networking & Closing Reception", desc: "" },
];

const AgendaSection = () => {
  return (
    <section id="agenda" className="section-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4 text-secondary">
          Full Day Agenda
        </h2>
        <p className="text-center text-muted-foreground mb-12 font-heading">
          Future of AI in Data Analytics Summit (FAIDAS) – Hyderabad Edition
        </p>
        <div className="max-w-4xl mx-auto space-y-0">
          {agendaItems.map((item, i) => (
            <div
              key={i}
              className={`flex gap-6 py-5 ${i < agendaItems.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="w-32 shrink-0">
                <span className="font-heading font-bold text-sm text-primary">{item.time}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-heading font-bold text-base text-secondary">{item.title}</h4>
                {item.desc && (
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;
