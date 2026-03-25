import React from "react";
import { motion } from "framer-motion";
import { FiBriefcase, FiCalendar, FiMapPin } from "react-icons/fi";

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: "Python Intern",
      company: "GNSS Data Processing",
      location: "Remote",
      duration: "2024 - Present",
      description:
        "Working on GNSS data processing and analysis using Python. Developing scripts for data validation, processing, and generating reports. Gaining hands-on experience with geospatial data.",
      responsibilities: [
        "Python scripting for data processing",
        "Database management with MySQL",
        "Data validation and quality assurance",
      ],
      technologies: ["Python", "DBMS", "MySQL", "Data Analysis"],
    },
  ];

  const upcomingGoal = {
    title: "DevOps Engineer",
    status: "Seeking Internship/Role",
    description: "Open to DevOps internship opportunities in 2026",
    highlights: [
      "CI/CD Pipeline Setup",
      "Docker & Kubernetes",
      "Cloud Deployment",
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="experience" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-2 text-center mb-4 gradient-text">
            Experience & Journey
          </h2>
          <div className="divider max-w-xs mx-auto mb-16"></div>
        </motion.div>

        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Timeline */}
          {experiences.map((experience, index) => (
            <motion.div key={experience.id} variants={itemVariants}>
              <div className="glass p-8 relative">
                {/* Timeline marker */}
                <div className="absolute left-8 top-8 w-4 h-4 bg-accent-blue rounded-full border-2 border-primary-black"></div>
                <div className="absolute left-10 top-16 bottom-0 w-0.5 bg-gradient-to-b from-accent-blue to-accent-purple/30"></div>

                <div className="ml-8">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-accent-blue mb-1">
                        {experience.title}
                      </h3>
                      <p className="text-lg text-text-secondary font-medium">
                        {experience.company}
                      </p>
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-4 text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                      <FiCalendar size={16} className="text-accent-purple" />
                      <span>{experience.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMapPin size={16} className="text-accent-purple" />
                      <span>{experience.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary mb-4 leading-relaxed">
                    {experience.description}
                  </p>

                  {/* Responsibilities */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-accent-blue mb-2">
                      Key Responsibilities:
                    </p>
                    <ul className="space-y-1">
                      {experience.responsibilities.map(
                        (responsibility, idx) => (
                          <li
                            key={idx}
                            className="text-text-secondary text-sm flex items-start gap-2"
                          >
                            <span className="text-accent-purple mt-1">▸</span>
                            <span>{responsibility}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-accent-purple/20 text-accent-purple rounded-full border border-accent-purple/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Upcoming Goal */}
          <motion.div variants={itemVariants}>
            <div className="glass p-8 relative border-l-4 border-accent-blue bg-accent-blue/5">
              <div className="absolute left-8 top-8">
                <div className="w-4 h-4 bg-accent-blue rounded-full border-2 border-primary-black animate-pulse"></div>
              </div>

              <div className="ml-8">
                <h3 className="text-2xl font-semibold text-accent-blue mb-1">
                  {upcomingGoal.title}
                </h3>
                <p className="text-lg text-text-secondary font-medium mb-4">
                  {upcomingGoal.status}
                </p>

                <p className="text-text-secondary mb-4 leading-relaxed">
                  {upcomingGoal.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {upcomingGoal.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-3 py-1 text-xs bg-accent-blue/20 text-accent-blue rounded-full border border-accent-blue/30"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-text-secondary mb-6">
            Interested in working together? Let's connect!
          </p>
          <a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            <FiBriefcase size={20} />
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
