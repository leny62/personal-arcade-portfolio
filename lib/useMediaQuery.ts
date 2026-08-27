"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Hydration-safe media query. The server snapshot is always false, so the first
 * client paint matches the server and React swaps in the real value after.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
