import React, { useState, useEffect } from "react";
import { FiChevronDown, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { motion } from "framer-motion";

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Shyamsundar Dandapat";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden"
    >
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Heading with Typing Effect */}
        <motion.div variants={itemVariants} className="mb-4">
          <p className="text-accent-blue mb-4 font-medium text-sm md:text-base tracking-widest uppercase">
            Welcome to my portfolio
          </p>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="heading-1 mb-6 relative inline-block"
        >
          <span className="inline-block">
            {displayedText}
            <span className="animate-blink">|</span>
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-3xl text-text-secondary mb-8 font-light"
        >
          Aspiring{" "}
          <span className="text-accent-blue font-semibold">
            DevOps Engineer
          </span>{" "}
          & BCA Student
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Building resilient, scalable infrastructure with cloud technologies.
          Passionate about CI/CD, containerization, and automation. Ready to
          bring DevOps expertise to your team.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
        >
          <button
            onClick={() => scrollToSection("#projects")}
            className="btn-primary"
          >
            Explore My Work
          </button>
          <button
            onClick={() => scrollToSection("#contact")}
            className="btn-secondary"
          >
            Get In Touch
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-6 mb-20"
        >
          <a
            href="https://github.com/shyam1603"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass hover:bg-accent-blue hover:text-primary-black transition-smooth hover-lift"
          >
            <FiGithub size={24} />
          </a>
          <a
            href="https://linkedin.com/in/shyamsundar-dandapat"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass hover:bg-accent-blue hover:text-primary-black transition-smooth hover-lift"
          >
            <FiLinkedin size={24} />
          </a>
          <a
            href="mailto:your-email@example.com"
            className="p-3 glass hover:bg-accent-blue hover:text-primary-black transition-smooth hover-lift"
          >
            <FiMail size={24} />
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center animate-bounce"
        >
          <button
            onClick={() => scrollToSection("#about")}
            className="p-3 glass hover:bg-bg-hover transition-smooth"
          >
            <FiChevronDown size={24} className="text-accent-blue" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
