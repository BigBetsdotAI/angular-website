import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const aboutSubLinks = [
  { label: "OVERVIEW", href: "#overview" },
  { label: "WHY ATTEND", href: "#why-attend" },
  { label: "SPEAKERS", href: "#speakers" },
  { label: "EVENT OBJECTIVES", href: "#objectives" },
];

const navLinks = [
  { label: "WHY SPONSOR", href: "#why-sponsor" },
  { label: "AGENDA", href: "#agenda" },
  { label: "REGISTER", href: "#register" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
          {/* About dropdown */}
          <div ref={aboutRef} className="relative">
            <button
              onClick={() => setAboutOpen(!aboutOpen)}
              className="flex items-center gap-1 text-sm font-heading font-semibold tracking-wider text-secondary-foreground hover:text-primary transition-colors"
            >
              ABOUT
              <ChevronDown size={14} className={`transition-transform ${aboutOpen ? "rotate-180" : ""}`} />
            </button>
            {aboutOpen && (
              <>
                <div className="absolute top-full left-0 w-full h-1 bg-primary" />
                <div className="absolute top-[calc(100%+4px)] left-0 bg-white shadow-lg rounded-b-md min-w-[220px] py-3 z-50">
                  {aboutSubLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setAboutOpen(false)}
                      className="block px-6 py-2.5 text-sm font-heading font-semibold tracking-wider text-secondary hover:text-primary hover:bg-muted transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
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
          <button
            onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
            className="flex items-center justify-between w-full px-6 py-3 text-sm font-heading font-semibold tracking-wider text-secondary-foreground hover:text-primary transition-colors"
          >
            ABOUT
            <ChevronDown size={14} className={`transition-transform ${mobileAboutOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileAboutOpen && (
            <div className="bg-navy-light/50">
              {aboutSubLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-10 py-2.5 text-sm font-heading font-semibold tracking-wider text-secondary-foreground hover:text-primary transition-colors"
                  onClick={() => { setOpen(false); setMobileAboutOpen(false); }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
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
