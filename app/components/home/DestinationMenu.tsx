'use client';

import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { accent, type NeonColor } from '@/lib/arcade';
import { trackClick } from '@/lib/analytics';
import { useSectionTracking } from '@/lib/useSectionTracking';

export interface Destination {
  title: string;
  path: string;
  color: NeonColor;
  description: string;
}

/**
 * Roving tabindex over the card grid. The old page told users "use arrow keys to
 * navigate" but never listened for them.
 */
export default function DestinationMenu({ items }: { items: Destination[] }) {
  const [focused, setFocused] = useState(0);
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const sectionRef = useSectionTracking<HTMLUListElement>('select-destination');

  const move = useCallback(
    (next: number) => {
      const clamped = (next + items.length) % items.length;
      setFocused(clamped);
      refs.current[clamped]?.focus();
    },
    [items.length]
  );

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    // Two columns at md and up; one below. Treat up/down as +/- 2 either way,
    // which still lands somewhere sensible in a single column.
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        move(index + 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        move(index - 1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        move(index + 2);
        break;
      case 'ArrowUp':
        e.preventDefault();
        move(index - 2);
        break;
      case 'Home':
        e.preventDefault();
        move(0);
        break;
      case 'End':
        e.preventDefault();
        move(items.length - 1);
        break;
    }
  };

  return (
    <ul ref={sectionRef} className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {items.map((item, index) => (
        <motion.li
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.3) }}
        >
          <Link
            ref={(el) => {
              refs.current[index] = el;
            }}
            href={item.path}
            style={accent(item.color)}
            tabIndex={index === focused ? 0 : -1}
            onFocus={() => setFocused(index)}
            onKeyDown={(e) => onKeyDown(e, index)}
            onClick={() =>
              trackClick(`destination-${item.title.toLowerCase()}`, item.path)
            }
            className="group block h-full border-2 border-(--accent) bg-surface-raised p-6 pixel-corners transition-transform duration-200 hover:-translate-y-1 dark:bg-black/60"
          >
            <div className="flex h-full flex-col">
              <h3 className="mb-3 font-arcade text-lg text-(--accent)">{item.title}</h3>
              <p className="mb-5 flex-grow font-pixel text-base text-text-muted">
                {item.description}
              </p>
              <span className="flex items-center justify-end gap-2 font-pixel text-sm text-(--accent)">
                ENTER
                <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
