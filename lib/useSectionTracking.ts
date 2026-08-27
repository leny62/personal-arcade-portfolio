"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

// Half the section on screen is treated as being read. Lower thresholds count
// sections that merely scrolled past.
const VISIBLE_THRESHOLD = 0.5;

/**
 * Measures how long a section stays at least half visible and reports the
 * running total as SECTION_VIEW. Feeds the "sections ranked by attention"
 * report, so the id should be stable and human-readable.
 */
export function useSectionTracking<T extends HTMLElement = HTMLElement>(
  sectionId: string
) {
  const ref = useRef<T | null>(null);
  const visibleSince = useRef<number | null>(null);
  const total = useRef(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const bank = () => {
      if (visibleSince.current !== null) {
        total.current += Date.now() - visibleSince.current;
        visibleSince.current = null;
      }
    };

    const report = () => {
      if (total.current > 0) {
        track("SECTION_VIEW", { name: sectionId, durationMs: total.current });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (visibleSince.current === null) visibleSince.current = Date.now();
        } else {
          bank();
          report();
        }
      },
      { threshold: VISIBLE_THRESHOLD }
    );

    observer.observe(element);

    // Without this, a visitor who reads a section and then closes the tab
    // without scrolling away is never counted.
    const onHidden = () => {
      if (document.visibilityState === "hidden") {
        bank();
        report();
      } else if (entryIsVisible(element)) {
        visibleSince.current = Date.now();
      }
    };

    document.addEventListener("visibilitychange", onHidden);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onHidden);
      bank();
      report();
    };
  }, [sectionId]);

  return ref;
}

const entryIsVisible = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  const height = window.innerHeight;
  const shown = Math.min(rect.bottom, height) - Math.max(rect.top, 0);
  return rect.height > 0 && shown / rect.height >= VISIBLE_THRESHOLD;
};
