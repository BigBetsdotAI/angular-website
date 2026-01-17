import {
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import bigbetsLogo from "@/assets/bigbets-logo.png";

import { Link } from "react-router-dom";
// ... imports

const Footer = () => {
  const services = [
    {
      name: "Custom Software Development",
      href: "/custom-software-development",
    },
    { name: "Mobile & Web Applications", href: "/mobile-web-applications" },
    { name: "Cloud & SaaS Solutions", href: "/cloud-saas-solutions" },
    { name: "AI & Machine Learning", href: "/ai-machine-learning" },
    { name: "UI/UX Design", href: "/ui-ux-design" },
    { name: "Digital Marketing", href: "/digital-marketing" },
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Certification", href: "/certification" },
    { name: "Contact", href: "/contact" },
  ];

  const industries = [
    { name: "FinTech", href: "/services" },
    { name: "Healthcare", href: "/services" },
    { name: "Retail", href: "/services" },
    { name: "Education", href: "/services" },
    { name: "Logistics", href: "/services" },
    { name: "Startups", href: "/services" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/people/BigBetsAIOfficial/61580238483447/",
    },
    { icon: Instagram, href: "https://www.instagram.com/officialbigbets.ai/" },
    { icon: Youtube, href: "https://www.youtube.com/@BigBets.AI_Official" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/bigbets-ai-362933382/",
    },
  ];

  return (
    <footer className="bg-[rgb(235,239,242)] dark:bg-card border-t border-transparent dark:border-border">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Company Info */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={bigbetsLogo}
                alt="BigBets.AI Logo"
                className="w-10 h-10 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  BigBets.AI
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 tracking-wider">
                  INNOVATE | CONNECT | INSPIRE
                </span>
              </div>
            </Link>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
              Services
            </h3>
            <ul className="space-y-1">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.href}
                    className="text-gray-500 dark:text-gray-400 text-sm hover:text-primary transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-1">
              {company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-500 dark:text-gray-400 text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
              Industries
            </h3>
            <ul className="space-y-1">
              {industries.map((industry, index) => (
                <li key={index}>
                  <Link
                    to={industry.href}
                    className="text-gray-500 dark:text-gray-400 text-sm hover:text-primary transition-colors duration-200"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            2026 © All rights reserved by{" "}
            <span className="font-bold">BigBets.AI</span>
          </p>
          <div className="flex gap-8 text-sm">
            <a
              href="/privacy-policy"
              className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
