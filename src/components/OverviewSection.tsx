import overviewImg from "@/assets/overview-img.jpg";

const OverviewSection = () => {
  return (
    <section id="overview" className="section-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12 text-secondary">
          Overview
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <img
            src={overviewImg}
            alt="FAIDAS event overview showing professionals at a tech conference"
            className="rounded-lg shadow-lg w-full object-cover aspect-video"
          />
          <div className="space-y-5 text-muted-foreground leading-relaxed text-sm md:text-base">
            <p>
              Following the tremendous success of our inaugural edition in Bengaluru, the{" "}
              <strong className="text-secondary">FUTURE OF AI IN DATA ANALYTICS SUMMIT (FAIDAS)</strong>{" "}
              has quickly emerged as one of India's most credible and high-impact platforms focused on the real-world future of enterprise AI and data analytics.
            </p>
            <p>
              A defining highlight of the first edition was the announcement of the{" "}
              <strong className="text-secondary">FAIDAS 50 Powerlist</strong> — a prestigious peer-curated recognition honouring India's Top 50 Data and AI exponents and leaders.
            </p>
            <p>
              Now, on popular demand, <strong className="text-secondary">FAIDAS</strong> comes to{" "}
              <strong className="text-secondary">Hyderabad</strong> — a city rapidly expanding its global footprint through Global Capability Centers (GCCs), a thriving pharma and biotech ecosystem, and some of India's fastest-growing enterprise innovation hubs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
