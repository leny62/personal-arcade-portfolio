'use client';

import { motion } from 'framer-motion';

export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-12 text-center"
    >
      <h1 className="neon-text mb-4 font-arcade text-2xl text-text sm:text-3xl md:text-5xl">
        {title}
      </h1>
      <p className="font-pixel text-lg text-text-muted">{subtitle}</p>
    </motion.div>
  );
}
