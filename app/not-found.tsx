'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaHome, FaRedo } from 'react-icons/fa';

export default function NotFound() {
  const [countdown, setCountdown] = useState(10);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 2000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 z-0"></div>
      
      <div className="absolute inset-0 pointer-events-none scanline z-10"></div>
      
      <div className="relative z-20 max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`mb-8 ${isGlitching ? 'glitch' : ''}`}
        >
          <h1 className="text-6xl md:text-8xl font-arcade text-neon-red mb-4">
            ERROR 404
          </h1>
          <div className="border-2 border-neon-red p-4 rounded pixel-corners bg-black bg-opacity-70 mb-6">
            <p className="font-pixel text-white text-xl">
              GAME OVER - LEVEL NOT FOUND
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8 p-6 border-2 border-neon-blue rounded pixel-corners bg-black bg-opacity-70"
        >
          <div className="font-arcade text-neon-yellow mb-4">
            SYSTEM ERROR LOG:
          </div>
          <div className="font-pixel text-gray-300 text-left mb-4 overflow-hidden">
            <p className="mb-2">{'>'} Searching for requested level...</p>
            <p className="mb-2">{'>'} ERROR: Path not found in game directory</p>
            <p className="mb-2">{'>'} Attempting to recover game data...</p>
            <p className="mb-2">{'>'} Recovery failed: 0xE0000234</p>
            <p className="mb-2">{'>'} Initiating emergency return to main menu...</p>
            <p className="text-neon-green">{'>'} Auto-redirect in {countdown} seconds</p>
          </div>
          
          {countdown === 0 && (
            <script
              dangerouslySetInnerHTML={{
                __html: `window.location.href = "/";`
              }}
            />
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link href="/" passHref>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center px-6 py-3 bg-neon-blue bg-opacity-20 border-2 border-neon-blue text-neon-blue font-arcade rounded pixel-corners transition-all hover:bg-opacity-30"
            >
              <FaHome className="mr-2" />
              RETURN TO MAIN MENU
            </motion.div>
          </Link>
          
          <motion.button
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center px-6 py-3 bg-neon-green bg-opacity-20 border-2 border-neon-green text-neon-green font-arcade rounded pixel-corners transition-all hover:bg-opacity-30"
          >
            <FaRedo className="mr-2" />
            RETRY LAST LEVEL
          </motion.button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 font-pixel text-gray-400 text-sm"
        >
          INSERT COIN TO CONTINUE...
        </motion.div>
      </div>
    </div>
  );
} 