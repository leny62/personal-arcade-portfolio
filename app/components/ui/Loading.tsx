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
  
  const loadingMessages = useMemo(() => [
    'Initializing pixel shaders',
    'Powering up arcade cabinet',
    'Inserting virtual quarters',
    'Calibrating joystick',
    'Connecting to mothership',
    'Generating random encounters',
    'Loading high scores',
    'Dusting off cartridges',
    'Untangling controller cords',
    'Charging power-ups'
  ], []);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + '.' : '');
    }, 500);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 10;
        return next > 100 ? 100 : next;
      });
    }, 300);
    
    const textInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingMessages.length);
      setLoadingText(loadingMessages[randomIndex]);
    }, 2000);
    
    return () => {
      clearInterval(dotsInterval);
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [loadingMessages]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 z-50">
      {/* CRT effect */}
      <div className="absolute inset-0 pointer-events-none scanline"></div>
      
      <div className="max-w-md w-full px-6 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-arcade text-neon-green mb-2">
            LOADING
          </h2>
          <p className="font-pixel text-neon-blue">
            {message}{dots}
          </p>
        </motion.div>
        
        {/* Progress bar */}
        <div className="mb-6">
          <div className="h-6 bg-black border-2 border-neon-purple rounded-full pixel-corners overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-neon-purple"
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-pixel text-gray-400 text-sm">0%</span>
            <span className="font-pixel text-neon-yellow text-sm">{Math.round(progress)}%</span>
            <span className="font-pixel text-gray-400 text-sm">100%</span>
          </div>
        </div>
        
        {/* Loading message */}
        <div className="text-center">
          <motion.p
            key={loadingText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-pixel text-gray-300 text-sm italic"
          >
            {loadingText}
          </motion.p>
        </div>
        
        {/* Arcade cabinet animation */}
        <div className="mt-8 flex justify-center">
          <motion.div
            animate={{ 
              y: [0, -5, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 2
            }}
            className="w-16 h-16 text-neon-green"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M21,9V7a2,2,0,0,0-2-2H5A2,2,0,0,0,3,7V9a2,2,0,0,0,2,2H19A2,2,0,0,0,21,9ZM12,7a1,1,0,1,1-1,1A1,1,0,0,1,12,7ZM8,7a1,1,0,1,1-1,1A1,1,0,0,1,8,7Zm8,0a1,1,0,1,1-1,1A1,1,0,0,1,16,7Z"/>
              <path d="M19,11H5a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V13A2,2,0,0,0,19,11Zm-9,6a2,2,0,1,1,2-2A2,2,0,0,1,10,17Zm4-4a1,1,0,1,1,1-1A1,1,0,0,1,14,13Zm2,2a1,1,0,1,1,1-1A1,1,0,0,1,16,15Zm0,2a1,1,0,1,1,1-1A1,1,0,0,1,16,17Zm2-2a1,1,0,1,1,1-1A1,1,0,0,1,18,15Z"/>
            </svg>
          </motion.div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="font-pixel text-gray-400 text-xs">
            PRESS ANY KEY TO SKIP (NOT REALLY)
          </p>
        </div>
      </div>
    </div>
  );
} 