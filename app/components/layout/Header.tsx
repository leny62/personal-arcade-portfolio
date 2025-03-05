'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGamepad } from 'react-icons/fa';
import ThemeToggle from '../ui/ThemeToggle';

const navItems = [
  { name: 'HOME', path: '/' },
  { name: 'BIO', path: '/bio' },
  { name: 'EXPERIENCE', path: '/experience' },
  { name: 'SKILLS', path: '/skills' },
  { name: 'PROJECTS', path: '/projects' },
  { name: 'CONTACT', path: '/contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowUp':
          setActiveItem((prev) => (prev === 0 ? navItems.length - 1 : prev - 1));
          break;
        case 'ArrowDown':
          setActiveItem((prev) => (prev === navItems.length - 1 ? 0 : prev + 1));
          break;
        case 'Enter':
          window.location.href = navItems[activeItem].path;
          setIsOpen(false);
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeItem]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 dark:bg-black dark:bg-opacity-80 bg-light-bg bg-opacity-90 backdrop-blur-sm border-b-2 border-neon-blue">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <FaGamepad className="text-neon-green text-2xl" />
          <motion.span 
            className="text-xl font-arcade dark:text-white text-light-text neon-text motion-div-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            LENY.DEV
          </motion.span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden arcade-btn px-3 py-2 text-sm"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? 'CLOSE' : 'MENU'}
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.path}
                className="relative group"
              >
                <motion.span 
                  className="text-sm font-arcade tracking-wider hover:text-neon-blue transition-colors dark:text-white text-light-text motion-div-text"
                  whileHover={{ y: -3 }}
                >
                  {item.name}
                </motion.span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            ref={menuRef}
            id="mobile-menu"
            className="md:hidden fixed top-[60px] left-0 w-full z-40 shadow-lg dark:shadow-neon-blue/20 shadow-neon-purple/20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto px-4">
              <div className="rounded-lg overflow-hidden dark:bg-dark-blue/95 bg-white/95 border-2 dark:border-neon-blue border-neon-purple">
                <ul className="py-2">
                  {navItems.map((item, index) => (
                    <motion.li 
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`
                        ${activeItem === index 
                          ? 'dark:bg-neon-blue/20 bg-neon-purple/10 dark:border-l-4 dark:border-neon-blue border-l-4 border-neon-purple' 
                          : 'hover:dark:bg-dark-purple/50 hover:bg-light-bg/80'
                        }
                        transition-colors duration-200
                      `}
                    >
                      <Link 
                        href={item.path} 
                        className="block font-arcade text-sm dark:text-white text-gray-800 px-4 py-3 motion-div-text"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="dark:text-neon-blue text-neon-purple mr-2">&gt;</span>
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <div className="px-4 py-3 dark:bg-dark-purple/30 bg-light-bg/30 border-t dark:border-dark-purple border-gray-200">
                  <p className="text-xs font-pixel dark:text-gray-300 text-gray-700 text-center motion-div-text">
                    Press <span className="dark:text-neon-green text-neon-purple font-bold">ESC</span> to close or <span className="dark:text-neon-yellow text-neon-teal font-bold">↑/↓</span> to navigate
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 