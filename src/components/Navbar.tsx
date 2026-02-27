import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "ABOUT", href: "#overview" },
  { label: "WHY SPONSOR", href: "#why-sponsor" },
  { label: "AGENDA", href: "#agenda" },
  { label: "REGISTER", href: "#register" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <a href="#" className="flex flex-col leading-tight">
          <span className="font-heading font-black text-xl tracking-wider text-primary">
            FAIDAS 2026
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-teal-light">
            Future of AI in Data Analytics Summit
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-heading font-semibold tracking-wider text-secondary-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <button
          className="md:hidden text-secondary-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-navy border-t border-navy-light">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block px-6 py-3 text-sm font-heading font-semibold tracking-wider text-secondary-foreground hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
