import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  Users,
  Target,
  Lightbulb,
  Award,
  Globe,
  Zap,
  MapPin,
  Calendar,
  Eye,
} from "lucide-react";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import officeImage from "@/assets/office-workspace.png";
import ceoImage from "@/assets/ceo-kaptan.png";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Innovation",
      description:
        "We constantly push boundaries to deliver cutting-edge solutions that drive business growth.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We believe in working closely with our clients to understand their unique needs and challenges.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We maintain the highest standards of quality in every project we undertake.",
    },
    {
      icon: Eye,
      title: "Transparency",
      description:
        "We maintain open communication and provide clear insights throughout the development process.",
    },
  ];

  const stats = [
    { value: "200+", label: "Projects Completed" },
    { value: "15+", label: "Countries Served" },
    { value: "50+", label: "Team Members" },
    { value: "100%", label: "Client Satisfaction" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <Navbar />

      {/* Hero Section */}
      <RevealOnScroll>
        <section className="pt-20 bg-primary">
          <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 italic">
              About BigBets.AI
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              Innovating Digital Solutions for a Smarter Future
            </p>
          </div>
        </section>
      </RevealOnScroll>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <RevealOnScroll direction="left">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Story
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  BigBets.AI was founded with a simple yet powerful vision: to
                  bridge the gap between innovative technology and real-world
                  business solutions. Led by Mr. Kaptan, an experienced AI
                  Engineer and visionary CEO, we have grown from a small startup
                  to a globally recognized software development company.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                  Our journey began in Ghaziabad, India, and has since expanded
                  to serve clients across 15+ countries. With over 200
                  successful projects under our belt, we continue to push the
                  boundaries of what's possible in software development, AI, and
                  digital transformation.
                </p>

                {/* Location & Founded Info */}
                <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">
                      Crossing Republik, Ghaziabad, India
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Founded in 2023</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll direction="right">
              <div className="relative">
                <img
                  src={officeImage}
                  alt="Our Office"
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Our <span className="text-primary">Mission & Vision</span>
              </h2>
            </div>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <RevealOnScroll direction="left">
              <div className="bg-white dark:bg-card rounded-2xl p-8 border border-gray-100 dark:border-border shadow-sm h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                  To empower businesses worldwide with innovative, scalable, and
                  reliable technology solutions that drive growth, efficiency,
                  and digital transformation. We strive to be the trusted
                  partner that helps organizations navigate the complexities of
                  the digital age.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll direction="right">
              <div className="bg-white dark:bg-card rounded-2xl p-8 border border-gray-100 dark:border-border shadow-sm h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                  To be the global leader in innovative software solutions,
                  recognized for our expertise in AI, cloud technologies, and
                  digital transformation. We envision a future where technology
                  seamlessly integrates with business processes to create
                  unprecedented value and opportunities.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <RevealOnScroll>
        <section className="py-20 bg-gray-50 dark:bg-secondary/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Our Core Values
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-border p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 dark:text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Our Journey Timeline */}
      <RevealOnScroll>
        <section className="py-20 bg-white dark:bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our <span className="text-primary">Journey</span>
              </h2>
              <p className="text-gray-500 dark:text-muted-foreground text-lg max-w-2xl mx-auto">
                Key milestones in our growth and evolution
              </p>
            </div>

            {/* Timeline */}
            <div className="relative max-w-4xl mx-auto">
              {/* Vertical Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 dark:bg-gray-800 hidden md:block" />

              {/* Timeline Items */}
              <div className="space-y-12 md:space-y-24">
                {/* 2023 - Company Founded */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                    <RevealOnScroll direction="left">
                      <div className="bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-border p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <p className="text-2xl font-bold text-primary mb-2">
                          2023
                        </p>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          Company Founded
                        </h3>
                        <p className="text-gray-500 dark:text-muted-foreground text-sm">
                          BigBets.AI was established with a vision to innovate
                          digital solutions
                        </p>
                      </div>
                    </RevealOnScroll>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary hidden md:block" />
                  <div className="md:w-1/2 md:pl-12 order-1 md:order-2" />
                </div>

                {/* 2023 - First Major Project */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 order-2 md:order-1" />
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary hidden md:block" />
                  <div className="md:w-1/2 md:pl-12 order-1 md:order-2">
                    <RevealOnScroll direction="right">
                      <div className="bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-border p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <p className="text-2xl font-bold text-primary mb-2">
                          2023
                        </p>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          First Major Project
                        </h3>
                        <p className="text-gray-500 dark:text-muted-foreground text-sm">
                          Successfully delivered our first enterprise-level
                          software solution
                        </p>
                      </div>
                    </RevealOnScroll>
                  </div>
                </div>

                {/* 2024 - Global Expansion */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                    <RevealOnScroll direction="left">
                      <div className="bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-border p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <p className="text-2xl font-bold text-primary mb-2">
                          2024
                        </p>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          Global Expansion
                        </h3>
                        <p className="text-gray-500 dark:text-muted-foreground text-sm">
                          Extended our services to international markets across
                          5 countries
                        </p>
                      </div>
                    </RevealOnScroll>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary hidden md:block" />
                  <div className="md:w-1/2 md:pl-12 order-1 md:order-2" />
                </div>

                {/* 2024 - AI Integration */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 order-2 md:order-1" />
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary hidden md:block" />
                  <div className="md:w-1/2 md:pl-12 order-1 md:order-2">
                    <RevealOnScroll direction="right">
                      <div className="bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-border p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <p className="text-2xl font-bold text-primary mb-2">
                          2024
                        </p>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          AI Integration
                        </h3>
                        <p className="text-gray-500 dark:text-muted-foreground text-sm">
                          Launched AI and Machine Learning division with
                          cutting-edge solutions
                        </p>
                      </div>
                    </RevealOnScroll>
                  </div>
                </div>

                {/* 2024 - 200+ Projects */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                    <RevealOnScroll direction="left">
                      <div className="bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-border p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <p className="text-2xl font-bold text-primary mb-2">
                          2024
                        </p>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          200+ Projects
                        </h3>
                        <p className="text-gray-500 dark:text-muted-foreground text-sm">
                          Reached milestone of 200+ successful projects across
                          15+ countries
                        </p>
                      </div>
                    </RevealOnScroll>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary hidden md:block" />
                  <div className="md:w-1/2 md:pl-12 order-1 md:order-2" />
                </div>

                {/* 2025 - Innovation Hub */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 order-2 md:order-1" />
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary hidden md:block" />
                  <div className="md:w-1/2 md:pl-12 order-1 md:order-2">
                    <RevealOnScroll direction="right">
                      <div className="bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-border p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <p className="text-2xl font-bold text-primary mb-2">
                          2025
                        </p>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          Innovation Hub
                        </h3>
                        <p className="text-gray-500 dark:text-muted-foreground text-sm">
                          Established innovation center focusing on emerging
                          technologies
                        </p>
                      </div>
                    </RevealOnScroll>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Leadership Section */}
      <RevealOnScroll>
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Meet Our <span className="text-primary">Leadership</span>
              </h2>
              <p className="text-gray-500 dark:text-muted-foreground text-lg max-w-2xl mx-auto">
                Visionary leaders driving innovation and excellence
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-50 dark:bg-card border border-transparent dark:border-border rounded-2xl p-10 text-center">
                {/* Avatar Circle */}
                <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-bold text-primary">HK</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Mr. Kaptan
                </h3>
                <p className="text-primary font-medium mb-6">
                  Founder & CEO, AI Engineer
                </p>

                <p className="text-gray-500 dark:text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
                  BigBets.AI was founded in 2023 by Mr. Kaptan, a visionary
                  entrepreneur passionate about technology and innovation. Under
                  his leadership, the company focuses on cutting-edge solutions
                  in Generative AI, Machine Learning, Cybersecurity, and Data
                  Science. He is building BigBets.AI into a trusted name for
                  next-generation software development and digital
                  transformation.
                </p>

                {/* Contact Info */}
                <div className="flex flex-wrap justify-center gap-6 text-gray-500 dark:text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>contact@bigbets.ai</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>+91 836 887 1848</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Global Presence */}
      <RevealOnScroll>
        <section className="py-20 bg-white dark:bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Global <span className="text-primary">Presence</span>
              </h2>
              <p className="text-gray-500 dark:text-muted-foreground text-lg max-w-2xl mx-auto">
                Serving clients across continents with local expertise and
                global standards
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {[
                { name: "India", code: "in" },
                { name: "USA", code: "us" },
                { name: "UK", code: "gb" },
                { name: "Canada", code: "ca" },
                { name: "Australia", code: "au" },
                { name: "Germany", code: "de" },
                { name: "France", code: "fr" },
                { name: "Japan", code: "jp" },
                { name: "Singapore", code: "sg" },
                { name: "UAE", code: "ae" },
                { name: "Brazil", code: "br" },
                { name: "Netherlands", code: "nl" },
                { name: "Sweden", code: "se" },
                { name: "Switzerland", code: "ch" },
                { name: "South Africa", code: "za" },
              ].map((country, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-muted/10 hover:bg-primary/5 dark:hover:bg-primary/20 rounded-xl p-6 text-center transition-colors duration-300"
                >
                  <img
                    src={`https://flagcdn.com/48x36/${country.code}.png`}
                    alt={`${country.name} flag`}
                    className="w-12 h-9 mx-auto mb-3 rounded shadow-sm"
                  />
                  <p className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                    {country.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>
      <Footer />
    </div>
  );
};

export default About;
