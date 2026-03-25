import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { fetchProjects } from "@/utils/supabase";

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Default projects if Supabase fetch fails
  const defaultProjects = [
    {
      id: 1,
      title: "QR Cafe Menu System",
      description:
        "Dynamic menu system using QR codes for restaurant management. Allows real-time menu updates and seamless customer browsing experience.",
      technologies: ["HTML", "CSS", "JavaScript", "QR Code API"],
      github_url: "https://github.com/shyam1603/qr-cafe-menu",
      live_url: "https://qr-cafe-demo.vercel.app",
      featured: true,
    },
    {
      id: 2,
      title: "Learning Management System",
      description:
        "Full-featured LMS platform for educational institutions with user management, course creation, and student progress tracking.",
      technologies: ["Java", "DBMS", "Spring Boot", "MySQL"],
      github_url: "https://github.com/shyam1603/lms-platform",
      live_url: null,
      featured: true,
    },
    {
      id: 3,
      title: "Personal Portfolio Website",
      description:
        "Modern responsive portfolio website showcasing projects, skills, and DevOps learning journey with smooth animations and dark theme.",
      technologies: ["React", "Supabase", "Tailwind CSS", "Vercel"],
      github_url: "https://github.com/shyam1603/portfolio-using-claude",
      live_url: "https://shyamsundar.dev",
      featured: true,
    },
  ];

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      const result = await fetchProjects();
      if (result.success && result.data && result.data.length > 0) {
        setProjects(result.data);
      } else {
        setProjects(defaultProjects);
      }
      setIsLoading(false);
    };

    loadProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="projects" className="section-padding bg-secondary-black/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-2 text-center mb-4 gradient-text">
            Featured Projects
          </h2>
          <div className="divider max-w-xs mx-auto mb-16"></div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-accent-blue border-t-accent-purple rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                className="glass group overflow-hidden hover-lift"
              >
                {/* Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white/20 mb-2">
                        {project.title.charAt(0)}
                      </div>
                      <p className="text-white/10 text-sm">{project.title}</p>
                    </div>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-accent-blue/20 hover:bg-accent-blue transition-all duration-300 text-white"
                      >
                        <FiGithub size={24} />
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-accent-purple/20 hover:bg-accent-purple transition-all duration-300 text-white"
                      >
                        <FiExternalLink size={24} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-text-light mb-2">
                    {project.title}
                  </h3>

                  <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-accent-blue/20 text-accent-blue rounded-full border border-accent-blue/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 text-center text-sm rounded-lg bg-white/5 hover:bg-accent-blue/20 text-accent-blue transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <FiGithub size={16} />
                        GitHub
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 text-center text-sm rounded-lg bg-white/5 hover:bg-accent-purple/20 text-accent-purple transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <FiExternalLink size={16} />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA for More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-text-secondary mb-4">
            More projects coming soon...
          </p>
          <a
            href="https://github.com/shyam1603"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <FiGithub size={20} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
