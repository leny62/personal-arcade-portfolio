import type { CSSProperties } from "react";

/**
 * Tailwind scans source text statically, so `text-${color}` never produced a class.
 * Components set `--accent` inline instead and use the `text-(--accent)` shorthand,
 * which is literal in source. The value chains to the theme token, so it flips
 * between the light and dark palettes on its own.
 */
export const NEON = {
  "neon-blue": "var(--color-neon-blue)",
  "neon-green": "var(--color-neon-green)",
  "neon-yellow": "var(--color-neon-yellow)",
  "neon-pink": "var(--color-neon-pink)",
  "neon-purple": "var(--color-neon-purple)",
  "neon-orange": "var(--color-neon-orange)",
  "neon-teal": "var(--color-neon-teal)",
  "neon-red": "var(--color-neon-red)",
  "neon-cyan": "var(--color-neon-cyan)",
} as const;

export type NeonColor = keyof typeof NEON;

export function accent(color: NeonColor): CSSProperties {
  return { "--accent": NEON[color] } as CSSProperties;
}
