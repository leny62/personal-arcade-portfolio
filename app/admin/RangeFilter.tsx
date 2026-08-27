"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const RANGES = [
  { value: "7", label: "7 days" },
  { value: "30", label: "30 days" },
  { value: "90", label: "90 days" },
];

export default function RangeFilter() {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const current = params.get("range") ?? "30";

  const select = (value: string) => {
    const next = new URLSearchParams(params.toString());
    next.set("range", value);
    startTransition(() => router.push(`/admin?${next}`, { scroll: false }));
  };

  return (
    <div
      className="flex items-center gap-1 border-2 border-border-strong bg-surface-raised p-1"
      data-pending={pending ? "" : undefined}
    >
      {RANGES.map((r) => {
        const active = r.value === current;
        return (
          <button
            key={r.value}
            type="button"
            onClick={() => select(r.value)}
            aria-pressed={active}
            className={`px-3 py-1.5 text-xs transition-colors ${
              active
                ? "bg-accent font-semibold text-text-inverse"
                : "text-text-muted hover:bg-surface-muted hover:text-text"
            }`}
          >
            {r.label}
          </button>
        );
      })}
      <span
        aria-live="polite"
        className={`ml-1 pr-1 text-xs text-text-muted transition-opacity ${
          pending ? "opacity-100" : "opacity-0"
        }`}
      >
        Updating
      </span>
    </div>
  );
}
