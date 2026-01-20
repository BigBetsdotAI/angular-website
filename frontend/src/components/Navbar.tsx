import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, User, LogOut } from "lucide-react";
import bigbetsLogo from "@/assets/bigbets-logo.png";
import { logout } from "@/services/api";

interface NavbarProps {
  alwaysOpaque?: boolean;
}

const Navbar = ({ alwaysOpaque = false }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial theme
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    }

    // Check auth state
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      setIsAuthenticated(!!user);
    };

    checkAuth();

    // Listen for auth changes
    window.addEventListener("auth-change", checkAuth);
    return () => window.removeEventListener("auth-change", checkAuth);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/", isRoute: true },
    { name: "About", href: "/about", isRoute: true },
    { name: "Services", href: "/services", isRoute: true },
    { name: "Portfolio", href: "/portfolio", isRoute: true },
    { name: "Certification", href: "/certification", isRoute: true },
    { name: "Blog", href: "/blog", isRoute: true },
    { name: "Careers", href: "/careers", isRoute: true },
    { name: "Contact", href: "/contact", isRoute: true },
  ];

  const isActive = (link: (typeof navLinks)[0]) => {
    if (link.isRoute) {
      return location.pathname === link.href;
    }
    return false;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || alwaysOpaque
          ? "bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={bigbetsLogo}
              alt="BigBets.AI Logo"
              className="w-14 h-14 object-contain"
            />
            <div className="flex flex-col">
              <span
                className={`text-xl font-bold tracking-wide transition-colors duration-300 ${
                  isScrolled || alwaysOpaque
                    ? "text-gray-900 dark:text-white"
                    : "text-white"
                }`}
              >
                BigBets.AI
              </span>
              <span
                className={`text-[10px] tracking-[0.2em] transition-colors duration-300 ${
                  isScrolled || alwaysOpaque
                    ? "text-gray-500 dark:text-gray-400"
                    : "text-white font-medium"
                }`}
              >
                INNOVATE | CONNECT | INSPIRE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative text-sm font-medium transition-colors duration-200 py-2 ${
                    isActive(link)
                      ? isScrolled || alwaysOpaque
                        ? "text-primary"
                        : "text-white"
                      : isScrolled || alwaysOpaque
                        ? "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive(link) && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                        isScrolled || alwaysOpaque ? "bg-primary" : "bg-white"
                      }`}
                    />
                  )}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-200 py-2 ${
                    isScrolled || alwaysOpaque
                      ? "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                </a>
              ),
            )}
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 transition-colors ${
                isScrolled || alwaysOpaque
                  ? "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    isScrolled || alwaysOpaque
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "bg-white/10"
                  }`}
                >
                  <User
                    className={`w-5 h-5 ${
                      isScrolled || alwaysOpaque ? "text-primary" : "text-white"
                    }`}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className={
                    isScrolled || alwaysOpaque
                      ? "text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      : "text-white hover:bg-white/10"
                  }
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/signup">
                <Button variant="hero" size="default">
                  Enrol Now
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 transition-colors ${
              isScrolled || alwaysOpaque
                ? "text-gray-900 dark:text-white"
                : "text-white"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 z-50 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-y-auto">
            <div className="flex flex-col justify-center gap-6 px-4 py-8 text-center min-h-full">
              {navLinks.map((link) =>
                link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium py-3 rounded-lg transition-colors duration-200 ${
                      isActive(link)
                        ? "text-primary bg-primary/5 dark:bg-primary/10"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                    }`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium py-3 rounded-lg transition-colors duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                  >
                    {link.name}
                  </a>
                ),
              )}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={toggleTheme}
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>

                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <Link to="/signup" className="flex-1 flex">
                    <Button variant="hero" size="default" className="w-full">
                      Enrol Now
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
