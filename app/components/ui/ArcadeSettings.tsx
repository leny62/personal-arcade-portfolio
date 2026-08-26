'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSlidersH, FaTimes } from 'react-icons/fa';

type Pref = 'on' | 'off';

function read(key: string, fallback: Pref): Pref {
  if (typeof window === 'undefined') return fallback;
  const v = window.localStorage.getItem(key);
  return v === 'on' || v === 'off' ? v : fallback;
}

export default function ArcadeSettings() {
  const [open, setOpen] = useState(false);
  const [crt, setCrt] = useState<Pref>('on');
  const [motionPref, setMotionPref] = useState<Pref>('on');
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Read once on mount, then mirror both prefs onto <html> for the CSS in globals.css.
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCrt(read('arcade:crt', 'on'));
    setMotionPref(read('arcade:motion', prefersReduced ? 'off' : 'on'));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.crt = crt;
    window.localStorage.setItem('arcade:crt', crt);
  }, [crt]);

  useEffect(() => {
    document.documentElement.dataset.motion = motionPref;
    window.localStorage.setItem('arcade:motion', motionPref);
  }, [motionPref]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !triggerRef.current?.contains(t)) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  return (
    <div className="fixed bottom-4 right-4 z-[70]">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="arcade-settings-panel"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="arcade-panel pixel-corners absolute bottom-14 right-0 w-60 p-4"
            role="group"
            aria-label="Display settings"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="font-arcade text-[0.6rem] text-accent">SETTINGS</p>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label="Close settings"
                className="text-text-muted hover:text-accent"
              >
                <FaTimes />
              </button>
            </div>

            <Toggle
              label="CRT effect"
              hint="Scanlines and vignette"
              value={crt}
              onChange={setCrt}
            />
            <Toggle
              label="Animations"
              hint="Motion and transitions"
              value={motionPref}
              onChange={setMotionPref}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={triggerRef}
        type="button"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="arcade-settings-panel"
        aria-label="Display settings"
        title="Display settings"
        className="arcade-panel pixel-corners flex h-11 w-11 items-center justify-center text-accent"
      >
        <FaSlidersH />
      </motion.button>
    </div>
  );
}

function Toggle({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: Pref;
  onChange: (v: Pref) => void;
}) {
  const on = value === 'on';
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(on ? 'off' : 'on')}
      className="mb-3 flex w-full items-center justify-between gap-3 text-left last:mb-0"
    >
      <span>
        <span className="block font-pixel text-base text-text">{label}</span>
        <span className="block font-pixel text-xs text-text-muted">{hint}</span>
      </span>
      <span
        aria-hidden="true"
        className={`relative h-6 w-11 shrink-0 border-2 transition-colors ${
          on ? 'border-accent bg-accent/25' : 'border-border-strong bg-transparent'
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 transition-all ${
            on ? 'left-[1.375rem] bg-accent' : 'left-0.5 bg-border-strong'
          }`}
        />
      </span>
    </button>
  );
}
