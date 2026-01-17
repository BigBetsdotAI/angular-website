import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { ExternalLink, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "All Projects",
  "FinTech",
  "Healthcare",
  "Retail",
  "Education",
  "Logistics",
  "Startups",
  "AI/ML",
  "Cloud",
];

const projects = [
  {
    id: 1,
    title: "FinTech Payment Platform",
    description:
      "Secure payment processing platform with real-time transactions and fraud detection.",
    category: "FinTech",
    featured: true,
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Healthcare Management System",
    description:
      "Comprehensive patient management system with appointment scheduling and medical records.",
    category: "Healthcare",
    featured: true,
    technologies: ["Vue.js", "Python", "MongoDB", "AWS"],
    image:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "E-commerce Mobile App",
    description:
      "Cross-platform mobile shopping app with AR product visualization.",
    category: "Retail",
    featured: false,
    technologies: ["React Native", "Firebase", "TensorFlow", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Learning Management System",
    description:
      "Interactive educational platform with course creation and student tracking.",
    category: "Education",
    featured: true,
    technologies: ["React", "Django", "PostgreSQL", "Redis"],
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Fleet Management System",
    description:
      "Real-time vehicle tracking and route optimization for logistics companies.",
    category: "Logistics",
    featured: false,
    technologies: ["Angular", "Node.js", "MongoDB", "Google Maps"],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Startup MVP Platform",
    description:
      "Rapid prototyping and MVP development for innovative tech startups.",
    category: "Startups",
    featured: false,
    technologies: ["React", "Supabase", "Tailwind", "Vercel"],
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
  },
  {
    id: 7,
    title: "AI Chatbot Platform",
    description:
      "Intelligent conversational AI with natural language processing capabilities.",
    category: "AI/ML",
    featured: true,
    technologies: ["Python", "TensorFlow", "FastAPI", "Docker"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
  },
  {
    id: 8,
    title: "Cloud Migration Solution",
    description:
      "Enterprise cloud infrastructure migration with zero downtime deployment.",
    category: "Cloud",
    featured: false,
    technologies: ["AWS", "Terraform", "Kubernetes", "Jenkins"],
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
  },
  {
    id: 9,
    title: "Investment Portfolio Tracker",
    description:
      "Real-time portfolio management with market insights and automated alerts.",
    category: "FinTech",
    featured: false,
    technologies: ["React", "Python", "PostgreSQL", "WebSocket"],
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
  },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const { toast } = useToast();

  const handleProjectClick = () => {
    toast({
      description: (
        <span className="flex items-center gap-2">
          🚧 This feature isn't implemented yet—but don't worry! You can request
          it in your next prompt! 🚀
        </span>
      ),
    });
  };

  const filteredProjects =
    activeCategory === "All Projects"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar alwaysOpaque={true} />

      {/* Hero Section */}
      <RevealOnScroll>
        <section className="bg-[#2563EB] dark:bg-blue-950 py-20 md:py-28 relative overflow-hidden">
          {/* Abstract shapes for visual interest */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute -top-[50%] -left-[10%] w-[100%] h-[200%] bg-white/20 rotate-12 blur-3xl rounded-[100%]"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our Portfolio
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Showcasing our successful projects and the impact we've made for
              our clients
            </p>
          </div>
        </section>
      </RevealOnScroll>

      {/* Filter Section */}
      <RevealOnScroll>
        <section className="py-12 bg-white dark:bg-card border-t-4 border-t-primary border-b border-b-gray-200 dark:border-b-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={`flex items-center gap-2 ${
                    activeCategory === category
                      ? "bg-primary text-white"
                      : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  <Filter className="w-4 h-4" />
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Projects Grid */}
      <RevealOnScroll>
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white dark:bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-transparent dark:border-border"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {project.featured && (
                      <span className="absolute top-4 left-4 bg-primary text-white text-sm font-medium px-4 py-1 rounded-md">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs text-gray-600 dark:text-gray-400 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
                        onClick={handleProjectClick}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Project
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                        onClick={handleProjectClick}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No projects found in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </RevealOnScroll>

      {/* CTA Section */}
      <RevealOnScroll>
        <section className="py-16 md:py-20 bg-white dark:bg-card">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-8">
              Let's discuss your project requirements and how we can help bring
              your vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base">
                  Get Free Consultation
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  variant="outline"
                  className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-6 text-base"
                >
                  View Our Services
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

export default Portfolio;
