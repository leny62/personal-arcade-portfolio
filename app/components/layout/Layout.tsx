'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import ArcadeSettings from '../ui/ArcadeSettings';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Scanlines and vignette. Dark mode only, and CSS-driven so it never blocks paint. */}
      <div className="crt-overlay" aria-hidden="true" />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-accent focus:px-4 focus:py-2 focus:font-arcade focus:text-xs focus:text-text-inverse"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" className="flex-grow pt-20">
        {/* Keyed on pathname: with a constant key this never ran. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <ArcadeSettings />
    </div>
  );
};

export default Layout;
