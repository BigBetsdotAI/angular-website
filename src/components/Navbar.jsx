import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/Navbar.css";
import logo from "../assets/images/logo.png"; // Replace with your logo image

const navLinks = [
  { label: "About US", to: "#about" },
  { label: "Brands", to: "#brands" },
  { label: "Testimonials", to: "#testimonials" },
  { label: "Creators", to: "#creators" },
  { label: "Company", to: "#company" },
  { label: "Contact", to: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState(navLinks[0].label);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <img src={logo} alt="Logo" className="navbar-logo" />
      <ul className="navbar-links">
        {navLinks.map((link) => (
          <motion.li
            key={link.label}
            className="navbar-link"
            onClick={() => setActive(link.label)}
            whileHover={{ scale: 1.1, color: "#ff4747" }}
            animate={{
              color: active === link.label ? "#ff4747" : "#111",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
          >
            <a href={link.to} style={{ position: "relative" }}>
              {link.label}
              {active === link.label && (
                <motion.div
                  className="nav-underline"
                  layoutId="nav-underline"
                  transition={{ type: "spring", stiffness: 450, damping: 22 }}
                  style={{
                    position: "absolute",
                    bottom: -8,
                    left: "12%",
                    right: "12%",
                    height: "4px",
                    borderRadius: "3px",
                    background: "#ff4747",
                  }}
                />
              )}
            </a>
          </motion.li>
        ))}
      </ul>
      <motion.a
        href="#contact"
        className="navbar-contact"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 25,
          duration: 0.4,
          scale: { type: "spring", duration: 0.4, bounce: 0.5 },
        }}
        whileHover={{ scale: 1.07, backgroundColor: "#ff4747", color: "#fff" }}
        onClick={() => {
          document.getElementById('contact')?.scrollIntoView({ 
            behavior: 'smooth' 
          });
        }}
      >
        Get In Touch
      </motion.a>
    </nav>
  );
}
