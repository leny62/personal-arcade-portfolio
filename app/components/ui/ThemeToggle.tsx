'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  // resolvedTheme, not theme: with enableSystem, theme can be "system" while the
  // page renders dark, which flips the icon and wastes the first click.
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  if (!mounted) {
    return <div className="w-11 h-11" aria-hidden="true" />;
  }

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-11 h-11 rounded-full flex items-center justify-center border-2 border-border-strong text-accent hover:border-accent transition-colors"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={label}
      title={label}
    >
      <motion.span
        key={isDark ? 'sun' : 'moon'}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <FaSun className="text-neon-yellow text-lg" />
        ) : (
          <FaMoon className="text-neon-purple text-lg" />
        )}
      </motion.span>
    </motion.button>
  );
}
