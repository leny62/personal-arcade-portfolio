"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { flushNow, track } from "@/lib/analytics";

const HEARTBEAT_MS = 15000;

/**
 * Reports a PAGE_VIEW per route with cumulative time and max scroll depth.
 * Mounted once in the root layout.
 *
 * Durations are always the running total, never a delta since the last beacon.
 * That is what lets a duplicated beacon, a retry, or a double-fired unload be
 * harmless: the backend keeps the larger of the two values.
 */
export default function AnalyticsTracker() {
  const pathname = usePathname();

  // Time already banked on this route, plus the moment the page last became
  // visible. Hidden time is excluded, otherwise a tab left open in the
  // background reports hours of "attention" nobody paid.
  const banked = useRef(0);
  const visibleSince = useRef<number | null>(null);
  const maxScroll = useRef(0);

  useEffect(() => {
    banked.current = 0;
    maxScroll.current = 0;
    visibleSince.current =
      document.visibilityState === "visible" ? Date.now() : null;

    const elapsed = () =>
      banked.current +
      (visibleSince.current === null ? 0 : Date.now() - visibleSince.current);

    const bank = () => {
      if (visibleSince.current !== null) {
        banked.current += Date.now() - visibleSince.current;
        visibleSince.current = null;
      }
    };

    const report = () =>
      track("PAGE_VIEW", {
        path: pathname,
        name: document.title,
        durationMs: elapsed(),
        scrollDepth: maxScroll.current,
      });

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct =
        scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 100;
      maxScroll.current = Math.min(100, Math.max(maxScroll.current, pct));
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        bank();
        report();
        flushNow();
      } else {
        visibleSince.current = Date.now();
      }
    };

    // visibilitychange covers backgrounding a mobile tab; pagehide covers a
    // real navigation away and the bfcache. Reporting twice is safe.
    const onPageHide = () => {
      bank();
      report();
      flushNow();
    };

    report();
    const heartbeat = setInterval(report, HEARTBEAT_MS);

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      clearInterval(heartbeat);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);

      bank();
      report();
      flushNow();
    };
  }, [pathname]);

  return null;
}
