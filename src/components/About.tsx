import React from "react";
import { motion } from "framer-motion";
import { FiTarget, FiAward, FiCode } from "react-icons/fi";

const About = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const stats = [
    { label: "Projects", value: "3+", icon: FiCode },
    { label: "Skills", value: "10+", icon: FiAward },
    { label: "Learning", value: "DevOps", icon: FiTarget },
  ];

  return (
    <section id="about" className="section-padding bg-secondary-black/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left Column - Content */}
          <div>
            <motion.h2
              variants={itemVariants}
              className="heading-2 mb-6 gradient-text"
            >
              About Me
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-text-secondary mb-4 leading-relaxed"
            >
              I'm a BCA final-year student with a passion for DevOps and cloud
              infrastructure. My journey has been about building reliable
              systems that scale, automate processes, and empower teams to
              deliver faster.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-text-secondary mb-6 leading-relaxed"
            >
              With hands-on experience in web development, database design, and
              version control, I'm now diving deep into CI/CD pipelines,
              containerization with Docker, and orchestration with Kubernetes.
              My goal is to secure a DevOps internship/role in 2026 and
              contribute to building next-generation infrastructure.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-text-secondary leading-relaxed"
            >
              When I'm not coding, you'll find me exploring new tools, reading
              DevOps blogs, or contributing to open-source projects. Let's build
              something amazing together!
            </motion.p>
          </div>

          {/* Right Column - Stats Cards */}
          <div className="space-y-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="glass p-6 hover-lift"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-accent-blue/10">
                      <Icon size={24} className="text-accent-blue" />
                    </div>
                    <div>
                      <p className="text-text-secondary text-sm font-medium mb-1">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-poppins font-bold text-accent-blue">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Highlighted Quote */}
            <motion.div
              variants={itemVariants}
              className="glass p-6 border-l-4 border-accent-purple bg-accent-purple/5"
            >
              <p className="text-accent-purple italic">
                "Great infrastructure is invisible. Users don't think about
                it—they just experience reliability."
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
