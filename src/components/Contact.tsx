import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiCheck,
  FiAlert,
  FiLoader,
} from "react-icons/fi";
import { submitContact } from "@/utils/supabase";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("error");
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    if (formData.message.length < 10) {
      setFormStatus("error");
      setErrorMessage("Message must be at least 10 characters long");
      return;
    }

    setFormStatus("loading");

    const result = await submitContact(
      formData.name,
      formData.email,
      formData.message,
    );

    if (result.success) {
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 5000);
    } else {
      setFormStatus("error");
      setErrorMessage(result.error || "Failed to send message");
      setTimeout(() => setFormStatus("idle"), 5000);
    }
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="contact" className="section-padding bg-secondary-black/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-2 text-center mb-4 gradient-text">
            Get In Touch
          </h2>
          <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out.
            I'm always open to new opportunities and collaborations.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-semibold text-text-light mb-8">
              Contact Information
            </h3>

            {/* Email */}
            <a
              href="mailto:your-email@example.com"
              className="glass p-6 hover-lift flex items-start gap-4 group"
            >
              <div className="p-3 rounded-lg bg-accent-blue/10 group-hover:bg-accent-blue/20 transition-all">
                <FiMail size={24} className="text-accent-blue" />
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">Email</p>
                <p className="text-text-light font-medium">
                  your-email@example.com
                </p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/shyamsundar-dandapat"
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-6 hover-lift flex items-start gap-4 group"
            >
              <div className="p-3 rounded-lg bg-accent-purple/10 group-hover:bg-accent-purple/20 transition-all">
                <FiPhone size={24} className="text-accent-purple" />
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">LinkedIn</p>
                <p className="text-text-light font-medium">
                  @shyamsundar-dandapat
                </p>
              </div>
            </a>

            {/* Location */}
            <div className="glass p-6 flex items-start gap-4">
              <div className="p-3 rounded-lg bg-accent-blue/10">
                <FiMapPin size={24} className="text-accent-blue" />
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">Location</p>
                <p className="text-text-light font-medium">India</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 space-y-3">
              <p className="text-text-secondary text-sm font-medium">
                Follow me on:
              </p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/shyam1603"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass hover:bg-accent-blue hover:text-primary-black transition-smooth hover-lift"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/shyamsundar-dandapat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass hover:bg-accent-purple hover:text-primary-black transition-smooth hover-lift"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="glass p-8 space-y-6">
              <h3 className="text-2xl font-semibold text-text-light mb-8">
                Send Me a Message
              </h3>

              {/* Name Field */}
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-text-light placeholder-text-secondary/50 focus:border-accent-blue focus:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-text-light placeholder-text-secondary/50 focus:border-accent-blue focus:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-text-light placeholder-text-secondary/50 focus:border-accent-blue focus:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-accent-blue/20 resize-none"
                ></textarea>
              </div>

              {/* Status Messages */}
              {formStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 flex items-start gap-3"
                >
                  <FiAlert
                    size={20}
                    className="text-red-500 flex-shrink-0 mt-0.5"
                  />
                  <p className="text-red-100 text-sm">{errorMessage}</p>
                </motion.div>
              )}

              {formStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 flex items-start gap-3"
                >
                  <FiCheck
                    size={20}
                    className="text-green-500 flex-shrink-0 mt-0.5"
                  />
                  <p className="text-green-100 text-sm">
                    Message sent successfully! I'll get back to you soon.
                  </p>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus === "loading" && (
                  <FiLoader size={20} className="animate-spin" />
                )}
                {formStatus === "loading" ? "Sending..." : "Send Message"}
              </button>

              <p className="text-text-secondary text-xs text-center">
                I'll respond to your message as soon as possible.
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
