import React from "react";
import { motion } from "framer-motion";
import {
  FiCode,
  FiGlobe,
  FiDatabase,
  FiGit,
  FiTerminal,
  FiCloud,
} from "react-icons/fi";

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: FiCode,
      skills: ["C", "Java", "Python"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Web Technologies",
      icon: FiGlobe,
      skills: ["HTML", "CSS", "JavaScript", "React"],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Database",
      icon: FiDatabase,
      skills: ["DBMS", "SQL", "MySQL"],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Tools & Version Control",
      icon: FiGit,
      skills: ["Git", "GitHub", "VS Code"],
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Operating Systems",
      icon: FiTerminal,
      skills: ["Linux", "Bash", "Ubuntu"],
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "DevOps & Cloud (Learning)",
      icon: FiCloud,
      skills: ["Docker", "Kubernetes", "CI/CD", "AWS basics"],
      color: "from-cyan-500 to-blue-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-2 text-center mb-4 gradient-text">
            Skills & Expertise
          </h2>
          <div className="divider max-w-xs mx-auto mb-16"></div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                className="glass p-6 hover-lift group relative overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}
                ></div>

                {/* Icon */}
                <div className="mb-4">
                  <div
                    className={`inline-block p-3 rounded-lg bg-gradient-to-r ${category.color} bg-opacity-10`}
                  >
                    <Icon
                      size={28}
                      className="text-accent-blue group-hover:text-accent-purple transition-colors"
                    />
                  </div>
                </div>

                {/* Category Title */}
                <h3 className="text-lg font-semibold mb-4 text-text-light">
                  {category.title}
                </h3>

                {/* Skills List */}
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill} className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full bg-accent-blue"
                        style={{ opacity: 0.5 + skillIndex * 0.15 }}
                      ></div>
                      <p className="text-text-secondary text-sm">{skill}</p>
                    </div>
                  ))}
                </div>

                {/* Proficiency Bar */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-text-secondary">
                      Proficiency
                    </span>
                    <span className="text-xs text-accent-blue font-semibold">
                      {70 + skillIndex * 5}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent-blue to-accent-purple"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${70 + index * 5}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
