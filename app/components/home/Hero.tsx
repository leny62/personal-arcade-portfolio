'use client';

import { motion } from 'framer-motion';
import { FaGamepad, FaChevronDown } from 'react-icons/fa';

export default function Hero() {
  const toMenu = () => {
    const target = document.getElementById('destinations');
    if (!target) return;
    const reduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.dataset.motion === 'off';
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    // Scrolling alone leaves keyboard focus behind at the top of the page.
    target.focus({ preventScroll: true });
  };

  return (
    <div className="text-center">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-8"
      >
        <FaGamepad
          className="mx-auto text-6xl text-neon-green md:text-8xl"
          aria-hidden="true"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mb-4 font-pixel text-lg text-text-muted"
      >
        INSERT COIN &mdash; PLAYER ONE READY
      </motion.p>

      <motion.h1
        className="neon-text mb-4 font-arcade text-3xl text-text sm:text-4xl md:text-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        LENY PASCAL
      </motion.h1>

      <motion.p
        className="mb-8 font-arcade text-base text-accent sm:text-xl md:text-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        SOFTWARE ENGINEER
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mx-auto mb-10 max-w-xl font-pixel text-lg text-text-muted"
      >
        I build secure, scalable web applications and distributed systems.
        Full-stack, .NET, and Web3.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col items-center gap-4"
      >
        <button onClick={toMenu} className="arcade-btn pixel-corners text-sm md:text-base">
          {/* Blink via opacity: swapping the label to "" collapsed the button and
              jolted the layout every 800ms. */}
          <span className="animate-blink">PRESS START</span>
        </button>

        <FaChevronDown
          className="animate-scroll-hint text-xl text-text-muted"
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}
