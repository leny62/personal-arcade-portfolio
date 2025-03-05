'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-12 h-12"></div>;
  }

  const isDarkMode = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 0 : 180 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {isDarkMode ? (
          <FaSun className="text-neon-yellow text-xl" />
        ) : (
          <FaMoon className="text-neon-purple text-xl" />
        )}
      </motion.div>
      <motion.div
        className="absolute -inset-1 rounded-full opacity-30"
        animate={{ 
          backgroundColor: isDarkMode 
            ? 'var(--neon-yellow)' 
            : 'var(--neon-purple)'
        }}
      />
      <span className="sr-only">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </motion.button>
  );
} 