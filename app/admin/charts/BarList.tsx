"use client";

import { useState } from "react";
import { full } from "@/lib/format";

export interface BarRow {
  key: string;
  label: string;
  /** Small secondary line under the label, e.g. the path a section sits on. */
  hint?: string;
  value: number;
  /** Extra measures, shown on hover and as table columns. Keep keys uniform. */
  details?: [string, string][];
}

export default function BarList({
  rows,
  unit,
  empty = "Nothing recorded yet.",
}: {
  rows: BarRow[];
  unit: string;
  empty?: string;
}) {
  const [hover, setHover] = useState<string | null>(null);

  if (rows.length === 0) {
    return <p className="py-8 text-center text-sm text-text-muted">{empty}</p>;
  }

  const max = Math.max(...rows.map((r) => r.value), 1);
  const columns = rows[0].details?.map(([k]) => k) ?? [];

  return (
    <div>
      <ul className="flex flex-col gap-3.5">
        {rows.map((row) => {
          const showing = hover === row.key;
          return (
            <li
              key={row.key}
              className="relative"
              onMouseEnter={() => setHover(row.key)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="flex items-baseline gap-3">
                <span className="min-w-0 flex-1 truncate text-sm text-text" title={row.label}>
                  {row.label}
                </span>
                <span className="shrink-0 text-sm font-semibold tabular-nums text-text">
                  {full(row.value)}
                </span>
              </div>

              {row.hint && (
                <p className="truncate font-data text-[0.65rem] text-text-muted">
                  {row.hint}
                </p>
              )}

              <div className="mt-1.5 h-2.5 w-full bg-surface-muted">
                <div
                  className="h-full transition-[width] duration-300"
                  style={{
                    width: `${Math.max(2, (row.value / max) * 100)}%`,
                    background: "var(--color-chart-1)",
                    borderRadius: "0 4px 4px 0",
                  }}
                />
              </div>

              {showing && row.details && row.details.length > 0 && (
                <div className="pointer-events-none absolute right-0 -top-1 z-10 max-w-[calc(100vw-2rem)] min-w-40 -translate-y-full border-2 border-border-strong bg-surface-raised px-3 py-2 text-xs shadow-lg">
                  <p className="mb-1.5 max-w-56 truncate font-semibold text-text">
                    {row.label}
                  </p>
                  {row.details.map(([k, v]) => (
                    <p key={k} className="flex gap-4 py-0.5">
                      <span className="text-text-muted">{k}</span>
                      <span className="ml-auto tabular-nums text-text">{v}</span>
                    </p>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <details className="mt-5 border-t border-border pt-3">
        <summary className="cursor-pointer text-xs text-text-muted hover:text-text">
          Table view
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-text-muted">
                <th className="py-1.5 pr-3 font-medium">Name</th>
                <th className="py-1.5 pr-3 text-right font-medium">{unit}</th>
                {columns.map((c) => (
                  <th key={c} className="py-1.5 pr-3 text-right font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className="border-b border-border/60">
                  <td className="py-1.5 pr-3 text-text">
                    {row.label}
                    {row.hint && (
                      <span className="ml-1.5 text-text-muted">{row.hint}</span>
                    )}
                  </td>
                  <td className="py-1.5 pr-3 text-right tabular-nums text-text">
                    {full(row.value)}
                  </td>
                  {row.details?.map(([k, v]) => (
                    <td key={k} className="py-1.5 pr-3 text-right tabular-nums text-text-muted">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
