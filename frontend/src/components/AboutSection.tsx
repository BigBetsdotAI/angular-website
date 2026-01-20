import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Button } from "@/components/ui/button";
import { Users, Globe, Trophy, Zap } from "lucide-react";
import ceoImage from "@/assets/ceo-kaptan.png";
import { Link } from "react-router-dom";

const AboutSection = () => {
  const features = [
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Led by Mr. Kaptan, AI Engineer & CEO, our team delivers innovative solutions",
    },
    {
      icon: Globe,
      title: "Global Presence",
      description: "Strong presence in India & US with localized expertise",
    },
    {
      icon: Trophy,
      title: "Proven Track Record",
      description:
        "200+ successful projects with 100% client satisfaction rate",
    },
    {
      icon: Zap,
      title: "Cutting-edge Tech",
      description:
        "Leveraging latest technologies in AI, Cloud, and Software Development",
    },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <RevealOnScroll direction="left">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 italic">
                About <span className="text-primary">BigBets.AI</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-10">
                BigBets.AI is a trusted IT partner offering cutting-edge
                solutions in software, web, mobile apps, cloud, and AI. With a
                strong presence in India & US and 200+ successful projects, we
                help businesses scale with technology.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/about">
                <Button variant="hero">Learn More About Us</Button>
              </Link>
            </div>
          </RevealOnScroll>

          {/* Right Content - CEO Card with Image */}
          <RevealOnScroll direction="right">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden max-w-sm mx-auto">
                {/* CEO Image */}
                <div className="aspect-[3/4] relative">
                  <img
                    src={ceoImage}
                    alt="Mr. Kaptan - Founder & CEO"
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* BIGBET.AI Logo in top right */}
                  <div className="absolute top-3 right-3 flex items-center gap-2 bg-gray-700/80 backdrop-blur-sm rounded-md px-2 py-1">
                    <div className="w-5 h-5">
                      <svg viewBox="0 0 48 48" className="w-full h-full">
                        <path
                          d="M24 2 L44 14 L44 34 L24 46 L4 34 L4 14 Z"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <circle
                          cx="24"
                          cy="20"
                          r="5"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <path
                          d="M21 25 L21 28 L27 28 L27 25"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <span className="text-white text-xs font-semibold tracking-wide">
                      BigBets.AI
                    </span>
                  </div>

                  {/* Glass Card Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-white/10 border-t border-white/20 p-6">
                    <h3 className="text-xl font-bold text-white mb-1">
                      Mr. Kaptan
                    </h3>
                    <p className="text-blue-300 text-sm mb-2">
                      Founder & CEO, AI Engineer
                    </p>
                    <p className="text-white/70 text-sm">
                      Leading innovation in digital transformation and AI
                      solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
