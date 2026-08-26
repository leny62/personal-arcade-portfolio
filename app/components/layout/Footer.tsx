'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SITE, ROUTES } from '@/lib/site';

const socialLinks = [
  { icon: FaGithub, url: SITE.github, label: 'GitHub' },
  { icon: FaLinkedin, url: SITE.linkedin, label: 'LinkedIn' },
  { icon: FaEnvelope, url: `mailto:${SITE.email}`, label: 'Email' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t-2 border-border-strong bg-surface-raised/90 py-10">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid-size opacity-40" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <h2 className="mb-2 font-arcade text-sm text-accent sm:text-base">
              {SITE.name.toUpperCase()}
            </h2>
            <p className="font-pixel text-base text-text-muted">{SITE.role}</p>

            <div className="mt-3 flex justify-center gap-2 md:justify-start md:-ml-3">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center text-text transition-colors hover:text-accent"
                    aria-label={link.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.15, y: -2 }}
                  >
                    <Icon className="text-2xl" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Footer" className="text-center md:text-right">
            <h2 className="mb-3 font-arcade text-[0.6rem] text-text-muted">LEVELS</h2>
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 md:justify-end">
              {ROUTES.filter((r) => r.path !== '/').map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="inline-flex min-h-11 items-center font-pixel text-base text-text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t-2 border-border pt-6 text-center">
          <p className="font-pixel text-sm text-text-muted">
            <span className="text-accent">&copy; {currentYear}</span> All rights reserved.
            <span className="block sm:ml-2 sm:inline">
              Built with <span className="text-neon-red">&hearts;</span> by {SITE.name}
            </span>
          </p>

          <Link
            href="/contact"
            className="mt-2 inline-flex min-h-11 items-center font-arcade text-[0.6rem] text-text-muted transition-colors hover:text-neon-pink"
          >
            <span className="text-neon-pink">PRESS START</span> TO CONNECT
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
