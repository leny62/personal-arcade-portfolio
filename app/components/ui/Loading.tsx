'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = 'Loading game assets' }: LoadingProps) {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');

  const loadingMessages = useMemo(
    () => [
      'Initializing pixel shaders',
      'Powering up arcade cabinet',
      'Inserting virtual quarters',
      'Calibrating joystick',
      'Connecting to mothership',
      'Generating random encounters',
      'Loading high scores',
      'Dusting off cartridges',
      'Untangling controller cords',
      'Charging power-ups',
    ],
    []
  );

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 10, 100));
    }, 300);

    const textInterval = setInterval(() => {
      setLoadingText(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }, 2000);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [loadingMessages]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[65] flex flex-col items-center justify-center bg-surface"
    >
      <div className="scanline" aria-hidden="true" />

      <div className="w-full max-w-md px-6 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-center"
        >
          <h2 className="mb-2 font-arcade text-xl text-neon-green">LOADING</h2>
          <p className="font-pixel text-lg text-accent">
            {message}
            {dots}
          </p>
        </motion.div>

        <div className="mb-6">
          <div
            className="h-6 overflow-hidden border-2 border-neon-purple bg-surface-muted pixel-corners"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-neon-purple"
            />
          </div>
          <div className="mt-2 flex justify-between font-pixel text-sm text-text-muted">
            <span>0%</span>
            <span className="text-neon-yellow">{Math.round(progress)}%</span>
            <span>100%</span>
          </div>
        </div>

        <p className="text-center font-pixel text-base text-text-muted italic">
          {loadingText}
        </p>
      </div>
    </div>
  );
}
