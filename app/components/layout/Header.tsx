'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGamepad } from 'react-icons/fa';
import ThemeToggle from '../ui/ThemeToggle';
import { ROUTES } from '@/lib/site';
import { trackClick } from '@/lib/analytics';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  const close = useCallback(() => {
    setIsOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Open the menu on whichever route you're currently on.
  useEffect(() => {
    if (!isOpen) return;
    const current = ROUTES.findIndex((r) => r.path === pathname);
    setActiveItem(current === -1 ? 0 : current);
  }, [isOpen, pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const t = event.target as Node;
      if (!menuRef.current?.contains(t) && !toggleRef.current?.contains(t)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          // Without this the page scrolls behind the open menu.
          e.preventDefault();
          setActiveItem((prev) => (prev === 0 ? ROUTES.length - 1 : prev - 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setActiveItem((prev) => (prev === ROUTES.length - 1 ? 0 : prev + 1));
          break;
        case 'Home':
          e.preventDefault();
          setActiveItem(0);
          break;
        case 'End':
          e.preventDefault();
          setActiveItem(ROUTES.length - 1);
          break;
        case 'Enter':
          e.preventDefault();
          // router.push, not window.location: a full reload discards the SPA.
          router.push(ROUTES[activeItem].path);
          setIsOpen(false);
          break;
        case 'Escape':
          e.preventDefault();
          close();
          break;
        case 'Tab': {
          // Keep focus inside the open menu.
          const items = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
          if (!items.length) return;
          const first = items[0];
          const last = items[items.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeItem, router, close]);

  // Move real focus with the highlight so screen readers follow along.
  useEffect(() => {
    if (isOpen) itemRefs.current[activeItem]?.focus();
  }, [isOpen, activeItem]);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b-2 border-border-strong bg-surface-raised/90 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          onClick={() => trackClick('header-logo', '/')}
          className="flex min-h-11 shrink-0 items-center gap-2"
        >
          <FaGamepad className="text-2xl text-neon-green" aria-hidden="true" />
          <span className="font-arcade text-base text-text sm:text-xl">
            LENY<span className="text-accent">.DEV</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {ROUTES.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() =>
                        trackClick(`nav-${item.name.toLowerCase()}`, item.path)
                      }
                      className={`group relative flex min-h-11 items-center font-arcade text-xs tracking-wider transition-colors ${
                        isActive ? 'text-accent' : 'text-text hover:text-accent'
                      }`}
                    >
                      {item.name}
                      <span
                        className={`absolute bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <ThemeToggle />

          <button
            ref={toggleRef}
            type="button"
            className="arcade-btn px-3 py-2 text-[0.6rem] md:hidden"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            className="absolute left-0 top-full z-40 w-full md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
          >
            <div className="container mx-auto px-4 pb-4">
              <nav
                aria-label="Mobile"
                className="arcade-panel pixel-corners overflow-hidden"
              >
                <ul className="py-2">
                  {ROUTES.map((item, index) => {
                    const isActive = pathname === item.path;
                    return (
                      <li key={item.name}>
                        <Link
                          ref={(el) => {
                            itemRefs.current[index] = el;
                          }}
                          href={item.path}
                          aria-current={isActive ? 'page' : undefined}
                          className={`flex items-center gap-2 px-4 py-3 font-arcade text-xs transition-colors ${
                            activeItem === index
                              ? 'bg-accent/15 text-accent'
                              : 'text-text hover:bg-accent/10'
                          }`}
                          onClick={() => {
                            trackClick(
                              `mobile-nav-${item.name.toLowerCase()}`,
                              item.path
                            );
                            setIsOpen(false);
                          }}
                          onMouseEnter={() => setActiveItem(index)}
                        >
                          <span className="text-accent" aria-hidden="true">
                            {activeItem === index ? '▶' : '›'}
                          </span>
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <p className="border-t-2 border-border px-4 py-3 text-center font-pixel text-xs text-text-muted">
                  <span className="text-neon-green">ESC</span> to close,{' '}
                  <span className="text-neon-yellow">&uarr;/&darr;</span> to navigate
                </p>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
