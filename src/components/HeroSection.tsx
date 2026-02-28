import heroBgVideo from "@/assets/faidas-2026-hyderabad (1).mp4";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroBgVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-navy/70" />
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        <p
          className={`text-teal-light font-heading font-bold text-lg mb-2 opacity-0 ${
            loaded ? "animate-fade-in-up" : ""
          }`}
        >
          2<sup className="text-sm">nd</sup> edition
        </p>
        <h1
          className={`font-heading font-black text-4xl md:text-5xl lg:text-6xl uppercase leading-tight max-w-4xl text-primary-foreground mb-6 opacity-0 ${
            loaded ? "animate-fade-in-up" : ""
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          Future Of AI In Data Analytics Summit (FAIDAS) 2026, Hyderabad
        </h1>
        <p
          className={`font-heading font-semibold text-lg md:text-xl uppercase tracking-wide text-teal-light mb-2 opacity-0 ${
            loaded ? "animate-fade-in-up" : ""
          }`}
          style={{ animationDelay: "0.4s" }}
        >
          Scaling Trusted AI from Data Confidence to Business Impact.
        </p>
        <p
          className={`font-heading font-semibold text-base md:text-lg uppercase tracking-wide text-teal-light mb-8 opacity-0 ${
            loaded ? "animate-fade-in-up" : ""
          }`}
          style={{ animationDelay: "0.5s" }}
        >
          April 16, 2026 | Hyderabad, India
        </p>
        <div
          className={`flex flex-wrap gap-4 opacity-0 ${loaded ? "animate-fade-in-up" : ""}`}
          style={{ animationDelay: "0.6s" }}
        >
          <a
            href="#"
            className="inline-block px-8 py-3 font-heading font-bold text-sm uppercase tracking-wider border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-navy transition-all"
          >
            Download Brochure
          </a>
          <a
            href="#register"
            className="inline-block px-8 py-3 font-heading font-bold text-sm uppercase tracking-wider bg-primary text-primary-foreground hover:bg-teal-light transition-all"
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
