import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiMoon, FiSun, FiDownload } from "react-icons/fi";
import { useThemeStore } from "@/store/theme";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useThemeStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const handleResumeDownload = () => {
    const resumeUrl = import.meta.env.VITE_RESUME_URL || "/resume.pdf";
    window.open(resumeUrl, "_blank");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-heavy py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            onClick={() => handleNavClick("#hero")}
            className="text-2xl font-poppins font-bold gradient-text cursor-pointer"
          >
            Shyam
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-text-secondary hover:text-accent-blue transition-smooth hover:underline underline-offset-4 text-sm font-medium"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            {/* Resume Download */}
            <button
              onClick={handleResumeDownload}
              className="hidden sm:flex items-center gap-2 btn-secondary text-sm"
            >
              <FiDownload size={16} />
              <span>Resume</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg glass hover:bg-bg-hover transition-smooth"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 glass hover:bg-bg-hover transition-smooth"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 glass p-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-4 py-2 text-text-secondary hover:text-accent-blue hover:bg-bg-hover rounded-lg transition-smooth"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => {
                handleResumeDownload();
                setIsOpen(false);
              }}
              className="w-full btn-secondary mt-4 flex items-center justify-center gap-2"
            >
              <FiDownload size={16} />
              <span>Resume</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
