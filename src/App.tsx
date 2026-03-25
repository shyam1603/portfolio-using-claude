import React, { useEffect, useState } from "react";
import { useThemeStore } from "@/store/theme";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function App() {
  const { isDark } = useThemeStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary-black">
        <div className="w-12 h-12 border-4 border-accent-blue border-t-accent-purple rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={`${isDark ? "dark" : "light"} bg-primary-black`}>
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
