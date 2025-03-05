"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaGamepad,
} from "react-icons/fa";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [activeButton, setActiveButton] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    setTimeout(() => {
      setFormStatus("success");
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email",
      value: "lihirwe6@gmail.com",
      action: "mailto:lihirwe6@gmail.com",
      color: "neon-blue",
    },
    {
      icon: <FaLinkedin className="text-2xl" />,
      title: "LinkedIn",
      value: "linkedin.com/in/lenyihirwe",
      action: "https://www.linkedin.com/in/leny-pascal-ihirwe/",
      color: "neon-green",
    },
    {
      icon: <FaGithub className="text-2xl" />,
      title: "GitHub",
      value: "github.com/lenyiih",
      action: "https://github.com/leny62",
      color: "neon-purple",
    },
    {
      icon: <FaTwitter className="text-2xl" />,
      title: "Twitter",
      value: "x.com/lenyihirwe",
      action: "https://x.com/lenyIhirwe",
      color: "neon-cyan",
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Location",
      value: "Heart of Africa",
      action: "https://maps.google.com/?q=Kigali, Rwanda",
      color: "neon-pink",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-arcade text-white neon-text mb-4">
            CONTACT TERMINAL
          </h1>
          <p className="text-lg font-pixel text-gray-300">
            Connect with me for collaboration or questions
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-black bg-opacity-70 p-6 rounded-lg pixel-corners border-2 border-neon-blue"
            >
              <h2 className="text-2xl font-arcade text-neon-yellow mb-6">
                <FaGamepad className="inline-block mr-2 mb-1" />
                PLAYER CONNECTIONS
              </h2>

              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 border border-${method.color} rounded pixel-corners bg-black bg-opacity-50 transition-all`}
                  >
                    <a
                      href={method.action}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <div className={`text-${method.color} mr-4`}>
                        {method.icon}
                      </div>
                      <div>
                        <h3
                          className={`text-${method.color} font-arcade text-lg`}
                        >
                          {method.title}
                        </h3>
                        <p className="font-pixel text-gray-300">
                          {method.value}
                        </p>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 border border-neon-yellow rounded pixel-corners bg-black bg-opacity-50">
                <h3 className="text-neon-yellow font-arcade text-lg mb-2">
                  Available For:
                </h3>
                <ul className="font-pixel text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2">›</span>
                    <span>Full-time opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2">›</span>
                    <span>Freelance projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2">›</span>
                    <span>Technical consultations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2">›</span>
                    <span>Open source collaborations</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-black bg-opacity-70 p-6 rounded-lg pixel-corners border-2 border-neon-green"
            >
              <h2 className="text-2xl font-arcade text-neon-green mb-6">
                <FaPaperPlane className="inline-block mr-2 mb-1" />
                SEND MESSAGE
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-arcade text-neon-blue mb-2"
                  >
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black bg-opacity-70 border-2 border-neon-blue rounded pixel-corners p-3 font-pixel text-white focus:border-neon-green focus:outline-none transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-arcade text-neon-blue mb-2"
                  >
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black bg-opacity-70 border-2 border-neon-blue rounded pixel-corners p-3 font-pixel text-white focus:border-neon-green focus:outline-none transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block font-arcade text-neon-blue mb-2"
                  >
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-black bg-opacity-70 border-2 border-neon-blue rounded pixel-corners p-3 font-pixel text-white focus:border-neon-green focus:outline-none transition-colors"
                    placeholder="Enter message subject"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-arcade text-neon-blue mb-2"
                  >
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-black bg-opacity-70 border-2 border-neon-blue rounded pixel-corners p-3 font-pixel text-white focus:border-neon-green focus:outline-none transition-colors resize-none"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>

                <div className="flex justify-center">
                  <motion.button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-3 font-arcade text-black rounded pixel-corners transition-all ${
                      formStatus === "submitting"
                        ? "bg-gray-500 cursor-not-allowed"
                        : formStatus === "success"
                        ? "bg-neon-green"
                        : formStatus === "error"
                        ? "bg-neon-red"
                        : "bg-neon-green hover:bg-opacity-90"
                    }`}
                  >
                    {formStatus === "submitting" && "SENDING..."}
                    {formStatus === "success" && "MESSAGE SENT!"}
                    {formStatus === "error" && "ERROR! TRY AGAIN"}
                    {formStatus === "idle" && "SEND MESSAGE"}
                  </motion.button>
                </div>
              </form>

              {/* Arcade Controls */}
              <div className="mt-8 border-t-2 border-gray-700 pt-6">
                <div className="text-center">
                  <p className="font-arcade text-neon-yellow text-sm mb-4">
                    ARCADE CONTROLS
                  </p>
                  <div className="flex justify-center space-x-4">
                    {["A", "B", "X", "Y"].map((button, index) => (
                      <motion.button
                        key={button}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setActiveButton(index)}
                        className={`w-12 h-12 rounded-full font-arcade text-black flex items-center justify-center ${
                          activeButton === index
                            ? "bg-neon-green"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                      >
                        {button}
                      </motion.button>
                    ))}
                  </div>
                  <p className="font-pixel text-gray-400 text-xs mt-4">
                    Press buttons to activate special moves (decorative)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Response Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="font-arcade text-neon-yellow">
              RESPONSE TIME: 24-48 HOURS
            </p>
            <p className="font-pixel text-gray-400 mt-2">
              I&apos;ll do my best to respond to your message as quickly as
              possible.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
