"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGamepad, FaArrowRight } from "react-icons/fa";

export default function Home() {
  const [showPressStart, setShowPressStart] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted) return;

    const interval = setInterval(() => {
      setShowPressStart((prev) => !prev);
    }, 800);

    return () => clearInterval(interval);
  }, [gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setShowPressStart(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background grid effect */}
      <div className="fixed inset-0 bg-grid-pattern bg-grid-size opacity-20 z-0"></div>

      {/* Main content */}
      <div className="container mx-auto px-4 flex flex-col items-center justify-center flex-grow z-10 pt-10 md:pt-0">
        {!gameStarted ? (
          <div className="text-center">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <FaGamepad className="text-neon-green text-7xl md:text-9xl mx-auto" />
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-arcade text-white mb-4 neon-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              LENY PASCAL
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-4xl font-arcade text-neon-blue mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              SOFTWARE ENGINEER
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mb-16"
            >
              <button
                onClick={startGame}
                className="arcade-btn text-lg md:text-xl"
              >
                {showPressStart ? "PRESS START" : ""}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="text-sm font-pixel text-gray-400"
            >
              © {new Date().getFullYear()} | FULL-STACK DEVELOPER | CREATIVE
              TECHNOLOGIST
            </motion.div>
          </div>
        ) : (
          // Main menu after pressing start
          <div className="w-full max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl md:text-5xl font-arcade text-white neon-text mb-4">
                SELECT YOUR DESTINATION
              </h1>
              <p className="text-lg font-pixel text-gray-300">
                Navigate through my digital arcade
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "BIO",
                  path: "/bio",
                  color: "neon-blue",
                  delay: 0.1,
                  description: "Learn about my background and journey",
                },
                {
                  title: "EXPERIENCE",
                  path: "/experience",
                  color: "neon-green",
                  delay: 0.2,
                  description: "Explore my professional career path",
                },
                {
                  title: "SKILLS",
                  path: "/skills",
                  color: "neon-yellow",
                  delay: 0.3,
                  description: "Discover my technical abilities",
                },
                {
                  title: "PROJECTS",
                  path: "/projects",
                  color: "neon-pink",
                  delay: 0.4,
                  description: "View my portfolio of work",
                },
                {
                  title: "CONTACT",
                  path: "/contact",
                  color: "neon-purple",
                  delay: 0.5,
                  description: "Get in touch with me",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: item.delay }}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-black bg-opacity-70 border-2 border-${item.color} p-6 rounded pixel-corners`}
                >
                  <Link href={item.path} className="block h-full">
                    <div className="flex flex-col h-full">
                      <h2
                        className={`text-2xl font-arcade text-${item.color} mb-3`}
                      >
                        {item.title}
                      </h2>
                      <p className="text-gray-300 font-pixel mb-4 flex-grow">
                        {item.description}
                      </p>
                      <div className={`flex justify-end text-${item.color}`}>
                        <FaArrowRight />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center mt-12"
            >
              <p className="text-sm font-pixel text-gray-400">
                Use arrow keys to navigate, Enter to select
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
