import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Smartphone,
  Briefcase,
  Cloud,
  Lightbulb,
  MessageSquare,
  TrendingUp,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const Services = () => {
  const services = [
    {
      icon: Code2,
      title: "Custom Software Development",
      description:
        "Tailored software solutions built to meet your specific business requirements. We develop scalable, secure, and efficient software that grows with your business.",
      color: "bg-cyan-400",
      features: [
        "Custom Enterprise Solutions",
        "Legacy System Modernization",
        "API Development & Integration",
        "Quality Assurance & Testing",
      ],
      link: "/custom-software-development",
    },
    {
      icon: Smartphone,
      title: "Mobile & Web Applications",
      description:
        "Cross-platform mobile apps and responsive web applications that deliver exceptional user experiences across all devices.",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      features: [
        "iOS & Android Apps",
        "React & React Native",
        "Progressive Web Apps",
        "E-commerce Solutions",
      ],
      link: "/mobile-web-applications",
    },
    {
      icon: Briefcase,
      title: "Job & Internship",
      description:
        "Career opportunities and internship programs in cutting-edge technologies. Join our team and grow your skills.",
      color: "bg-gradient-to-br from-emerald-400 to-teal-500",
      features: [
        "Paid Internships",
        "Full-time Positions",
        "Remote Opportunities",
        "Skill Development",
      ],
      link: "/careers",
    },
    {
      icon: Cloud,
      title: "Cloud & SaaS Solutions",
      description:
        "Scalable cloud infrastructure and Software-as-a-Service platforms that enable digital transformation.",
      color: "bg-gradient-to-br from-orange-400 to-red-500",
      features: [
        "AWS & Azure Services",
        "Cloud Migration",
        "DevOps & CI/CD",
        "Serverless Architecture",
      ],
      link: "/cloud-saas-solutions",
    },
    {
      icon: Lightbulb,
      title: "AI & Machine Learning",
      description:
        "Intelligent solutions powered by artificial intelligence and ML algorithms to automate and optimize your operations.",
      color: "bg-gradient-to-br from-purple-500 to-violet-600",
      features: [
        "Predictive Analytics",
        "Natural Language Processing",
        "Computer Vision",
        "Chatbots & Virtual Assistants",
      ],
      link: "/ai-machine-learning",
    },
    {
      icon: MessageSquare,
      title: "UI/UX Design",
      description:
        "User-centered design that creates engaging and intuitive experiences, turning visitors into loyal customers.",
      color: "bg-gradient-to-br from-pink-500 to-rose-500",
      features: [
        "User Research",
        "Wireframing & Prototyping",
        "Visual Design",
        "Usability Testing",
      ],
      link: "/ui-ux-design",
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      description:
        "Data-driven marketing strategies to grow your digital presence and reach your target audience effectively.",
      color: "bg-gradient-to-br from-amber-400 to-orange-500",
      features: [
        "SEO & SEM",
        "Social Media Marketing",
        "Content Strategy",
        "Analytics & Reporting",
      ],
      link: "/digital-marketing",
    },
    {
      icon: Users,
      title: "IT Consulting",
      description:
        "Strategic technology consulting to optimize your business processes and drive digital innovation.",
      color: "bg-gradient-to-br from-blue-400 to-cyan-500",
      features: [
        "Technology Assessment",
        "Digital Strategy",
        "Process Optimization",
        "Vendor Selection",
      ],
      link: "/it-consulting",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <Navbar alwaysOpaque={true} />

      {/* Hero Section */}
      <RevealOnScroll>
        <section className="py-20 md:py-28 bg-[#2563EB]">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Comprehensive technology solutions to drive your business forward
            </p>
          </div>
        </section>
      </RevealOnScroll>

      {/* Services Grid */}
      <RevealOnScroll>
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-2xl bg-white dark:bg-card border border-gray-100 dark:border-border hover:shadow-xl hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div
                      className={`w-16 h-16 rounded-xl ${service.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {service.title}
                      </h3>

                      <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                          >
                            <CheckCircle className="w-4 h-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {service.link ? (
                        <Link
                          to={service.link}
                          className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      ) : (
                        <a
                          href="#"
                          className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Industries We Serve */}
      <RevealOnScroll>
        <section className="py-20 bg-gray-50 dark:bg-muted/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Industries We <span className="text-primary">Serve</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Delivering specialized solutions across diverse industry
                verticals
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  name: "FinTech",
                  description: "Financial technology solutions",
                },
                {
                  name: "Healthcare",
                  description: "Medical and health management systems",
                },
                {
                  name: "Retail",
                  description: "E-commerce and retail platforms",
                },
                {
                  name: "Education",
                  description: "EdTech and learning management systems",
                },
                {
                  name: "Logistics",
                  description: "Supply chain and logistics optimization",
                },
                {
                  name: "Startups",
                  description: "MVP development and scaling solutions",
                },
              ].map((industry, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-card rounded-xl border border-gray-100 dark:border-border p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {industry.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {industry.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* CTA Section */}
      <RevealOnScroll>
        <section className="py-20 bg-white dark:bg-background">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto">
              Let's discuss your project requirements and how we can help bring
              your vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base">
                  Get Free Consultation
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button
                  variant="outline"
                  className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-6 text-base"
                >
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      <Footer />
    </div>
  );
};

export default Services;
