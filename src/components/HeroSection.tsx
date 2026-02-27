import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-navy/70" />
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        <p className="text-teal-light font-heading font-bold text-lg mb-2">
          2<sup className="text-sm">nd</sup> edition
        </p>
        <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl uppercase leading-tight max-w-4xl text-primary-foreground mb-6">
          Future Of AI In Data Analytics Summit (FAIDAS) 2026, Hyderabad
        </h1>
        <p className="font-heading font-semibold text-lg md:text-xl uppercase tracking-wide text-teal-light mb-2">
          Scaling Trusted AI from Data Confidence to Business Impact.
        </p>
        <p className="font-heading font-semibold text-base md:text-lg uppercase tracking-wide text-teal-light mb-8">
          April 16, 2026 | Hyderabad, India
        </p>
        <div className="flex flex-wrap gap-4">
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
