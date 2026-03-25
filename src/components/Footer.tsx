import React from "react";
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: FiGithub,
      url: "https://github.com/shyam1603",
    },
    {
      name: "LinkedIn",
      icon: FiLinkedin,
      url: "https://linkedin.com/in/shyamsundar-dandapat",
    },
    {
      name: "Email",
      icon: FiMail,
      url: "mailto:your-email@example.com",
    },
  ];

  return (
    <footer className="bg-primary-black border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left: Brand */}
          <div>
            <h3 className="text-2xl font-poppins font-bold gradient-text mb-2">
              Shyamsundar
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              DevOps Engineer aspirant crafting scalable infrastructure and
              automation solutions.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div>
            <h4 className="text-text-light font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { name: "Home", href: "#hero" },
                { name: "About", href: "#about" },
                { name: "Projects", href: "#projects" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-text-secondary text-sm hover:text-accent-blue transition-smooth hover:translate-x-2 inline-block"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Social Links */}
          <div>
            <h4 className="text-text-light font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg glass hover:bg-accent-blue hover:text-primary-black transition-smooth hover-lift"
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent mb-8"></div>

        {/* Bottom: Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm text-center sm:text-left">
            © {currentYear} Shyamsundar Dandapat. All rights reserved. | Built
            with React, Supabase & <span className="text-accent-blue">💙</span>
          </p>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg glass hover:bg-accent-blue hover:text-primary-black transition-smooth hover-lift flex items-center gap-2"
            aria-label="Back to top"
          >
            <span className="text-sm font-medium hidden sm:inline">
              Back to Top
            </span>
            <FiArrowUp size={20} />
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-text-secondary text-xs">
            Open to DevOps internship opportunities | 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
