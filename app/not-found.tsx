'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaHome, FaRedo } from 'react-icons/fa';

const LOG_LINES = [
  'Searching for requested level...',
  'ERROR: Path not found in game directory',
  'Attempting to recover game data...',
  'Recovery failed: 0xE0000234',
  'Initiating emergency return to main menu...',
];

export default function NotFound() {
  const [countdown, setCountdown] = useState(10);
  const [cancelled, setCancelled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (cancelled) return;
    if (countdown <= 0) {
      // The old version injected a <script> tag, which React never executes,
      // so the countdown hit zero and nothing happened.
      router.push('/');
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, cancelled, router]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid-size opacity-60"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="animate-glitch mb-4 font-arcade text-4xl text-neon-red md:text-6xl">
            ERROR 404
          </h1>
          <div className="arcade-panel pixel-corners border-neon-red p-4">
            <p className="font-pixel text-xl text-text">GAME OVER &mdash; LEVEL NOT FOUND</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="arcade-panel pixel-corners mb-8 border-accent p-6 text-left"
        >
          <p className="mb-4 font-arcade text-xs text-neon-yellow">SYSTEM ERROR LOG:</p>
          <div className="font-pixel text-lg text-text-muted">
            {LOG_LINES.map((line) => (
              <p key={line} className="mb-2">
                <span className="text-accent" aria-hidden="true">
                  &gt;
                </span>{' '}
                {line}
              </p>
            ))}
            <p aria-live="polite" className="text-neon-green">
              <span aria-hidden="true">&gt;</span>{' '}
              {cancelled
                ? 'Auto-redirect cancelled. Take your time.'
                : `Auto-redirect in ${countdown} seconds`}
            </p>
          </div>

          {!cancelled && (
            <button
              type="button"
              onClick={() => setCancelled(true)}
              className="mt-2 inline-flex min-h-11 items-center font-pixel text-base text-text-muted underline transition-colors hover:text-accent"
            >
              Cancel auto-redirect
            </button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Link href="/" className="arcade-btn pixel-corners text-[0.6rem]">
            <FaHome aria-hidden="true" />
            RETURN TO MAIN MENU
          </Link>

          <button
            type="button"
            onClick={() => router.back()}
            className="arcade-btn arcade-btn-ghost pixel-corners text-[0.6rem]"
          >
            <FaRedo aria-hidden="true" />
            RETRY LAST LEVEL
          </button>
        </motion.div>

        <p className="mt-10 font-pixel text-base text-text-muted">
          INSERT COIN TO CONTINUE...
        </p>
      </div>
    </div>
  );
}
