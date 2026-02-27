import recognitionImg from "@/assets/recognition-img.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const SpotlightSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: imgRef, isVisible: imgVisible } = useScrollAnimation();
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation();

  return (
    <section className="section-navy py-20">
      <div className="container mx-auto px-4">
        <div ref={titleRef}>
          <h2
            className={`font-heading font-bold text-3xl md:text-4xl text-center mb-4 text-primary-foreground opacity-0 ${
              titleVisible ? "animate-fade-in-up" : ""
            }`}
          >
            Spotlight: FAIDAS 25
          </h2>
          <p
            className={`text-center text-teal-light font-heading font-semibold text-lg mb-12 opacity-0 ${
              titleVisible ? "animate-fade-in-up" : ""
            }`}
            style={{ animationDelay: "0.15s" }}
          >
            Hyderabad Enterprise AI & Data Impact 25
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={imgRef}>
            <img
              src={recognitionImg}
              alt="FAIDAS 25 Recognition Gala trophy and stage"
              className={`rounded-lg shadow-lg w-full object-cover aspect-video opacity-0 ${
                imgVisible ? "animate-fade-in-left" : ""
              }`}
            />
          </div>
          <div
            ref={textRef}
            className={`space-y-5 opacity-0 ${textVisible ? "animate-fade-in-right" : ""}`}
          >
            <p className="text-sm text-teal-light/90 leading-relaxed">
              The day concludes with a powerful recognition moment — <strong className="text-primary-foreground">FAIDAS 25</strong>, a special edition honouring 25 high-impact leaders from the regional ecosystem who are driving measurable outcomes through AI and data analytics.
            </p>
            <p className="text-sm text-teal-light/90 leading-relaxed">
              This recognition celebrates excellence across Hyderabad's strongest enterprise engines, including GCC transformation & global operations, pharma/biotech & life sciences innovation, BFSI risk, compliance & fraud intelligence, healthcare analytics & applied AI, and industrial analytics for operational intelligence.
            </p>
            <p className="text-sm text-teal-light/90 leading-relaxed">
              While the Bengaluru edition featured a National Powerlist (Top 50 across India), the Hyderabad edition spotlights <strong className="text-primary-foreground">regional execution leaders</strong> shaping real enterprise transformation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightSection;
