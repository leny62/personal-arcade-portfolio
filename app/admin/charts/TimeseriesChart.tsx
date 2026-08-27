"use client";

import { useId, useState } from "react";
import type { TimeseriesPoint } from "@/lib/admin-api";
import { full, shortDate } from "@/lib/format";
import { useMediaQuery } from "@/lib/useMediaQuery";

// Slot order is fixed. Visitors leads because it is the series the dashboard is
// about, and it is the one that gets the direct end label.
const SERIES = [
  { key: "visitors", label: "Visitors", color: "var(--color-chart-1)" },
  { key: "sessions", label: "Sessions", color: "var(--color-chart-2)" },
  { key: "pageViews", label: "Page views", color: "var(--color-chart-3)" },
] as const;

type SeriesKey = (typeof SERIES)[number]["key"];

const niceStep = (raw: number): number => {
  if (raw <= 1) return 1;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const norm = raw / mag;
  const pick = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
  return Math.max(1, pick * mag);
};

export default function TimeseriesChart({ data }: { data: TimeseriesPoint[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const narrow = useMediaQuery("(max-width: 640px)");
  const clipId = useId();

  if (data.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-text-muted">
        No traffic recorded in this range.
      </p>
    );
  }

  // Font sizes live in viewBox units, so a wide viewBox on a narrow screen
  // shrinks the labels into illegibility. Narrow screens get their own box.
  const VIEW_W = narrow ? 400 : 820;
  const VIEW_H = narrow ? 300 : 280;
  const PAD = narrow
    ? { top: 16, right: 40, bottom: 34, left: 38 }
    : { top: 18, right: 60, bottom: 30, left: 46 };
  const PLOT_W = VIEW_W - PAD.left - PAD.right;
  const PLOT_H = VIEW_H - PAD.top - PAD.bottom;
  const fs = narrow ? 12 : 11;

  const rawMax = Math.max(
    1,
    ...data.flatMap((d) => [d.visitors, d.sessions, d.pageViews])
  );
  const step = niceStep(rawMax / 4);
  const yMax = step * 4;

  const x = (i: number) =>
    data.length === 1
      ? PAD.left + PLOT_W / 2
      : PAD.left + (i / (data.length - 1)) * PLOT_W;
  const y = (v: number) => PAD.top + PLOT_H - (v / yMax) * PLOT_H;

  const path = (key: SeriesKey) =>
    data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)} ${y(d[key])}`).join(" ");

  const ticks = [0, 1, 2, 3, 4].map((i) => i * step);
  const labelEvery = Math.max(1, Math.ceil(data.length / (narrow ? 3 : 6)));

  const active = hover !== null ? data[hover] : null;
  const hoverPct = hover !== null ? (x(hover) / VIEW_W) * 100 : 0;
  const flip = hoverPct > 62;

  const at = (clientX: number, el: SVGRectElement) => {
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    const i = Math.round(ratio * (data.length - 1));
    setHover(Math.min(data.length - 1, Math.max(0, i)));
  };

  const onKey = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const delta = event.key === "ArrowLeft" ? -1 : 1;
    setHover((prev) => {
      const next = (prev ?? 0) + delta;
      return Math.min(data.length - 1, Math.max(0, next));
    });
  };

  const last = data[data.length - 1];

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="h-auto w-full touch-pan-y"
        role="img"
        aria-label="Visitors, sessions and page views over time"
        tabIndex={0}
        onKeyDown={onKey}
        onBlur={() => setHover(null)}
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={PAD.left} y={PAD.top} width={PLOT_W} height={PLOT_H} />
          </clipPath>
        </defs>

        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={PAD.left}
              x2={PAD.left + PLOT_W}
              y1={y(t)}
              y2={y(t)}
              stroke="var(--color-border)"
              strokeWidth={1}
            />
            <text
              x={PAD.left - 8}
              y={y(t) + 4}
              textAnchor="end"
              fontSize={fs}
              className="fill-text-muted tabular-nums"
            >
              {full(t)}
            </text>
          </g>
        ))}

        {data.map((d, i) =>
          i % labelEvery === 0 || i === data.length - 1 ? (
            <text
              key={d.date}
              x={x(i)}
              y={VIEW_H - 10}
              textAnchor={i === data.length - 1 ? "end" : "middle"}
              fontSize={fs}
              className="fill-text-muted"
            >
              {shortDate(d.date)}
            </text>
          ) : null
        )}

        {active && (
          <line
            x1={x(hover!)}
            x2={x(hover!)}
            y1={PAD.top}
            y2={PAD.top + PLOT_H}
            stroke="var(--color-border-strong)"
            strokeWidth={1}
          />
        )}

        <g clipPath={`url(#${clipId})`}>
          {SERIES.map((s) => (
            <path
              key={s.key}
              d={path(s.key)}
              fill="none"
              stroke={s.color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* End markers carry a surface ring so they stay legible where they cross. */}
        {SERIES.map((s) => (
          <circle
            key={s.key}
            cx={x(data.length - 1)}
            cy={y(last[s.key])}
            r={4.5}
            fill={s.color}
            stroke="var(--color-surface-raised)"
            strokeWidth={2}
          />
        ))}

        {active &&
          SERIES.map((s) => (
            <circle
              key={s.key}
              cx={x(hover!)}
              cy={y(active[s.key])}
              r={4.5}
              fill={s.color}
              stroke="var(--color-surface-raised)"
              strokeWidth={2}
            />
          ))}

        {/* Only the lead series is direct-labelled; three labels at these values
            would sit on top of each other. */}
        <text
          x={x(data.length - 1) + 9}
          y={y(last.visitors) + 4}
          fontSize={fs + 1}
          className="fill-text font-semibold tabular-nums"
        >
          {full(last.visitors)}
        </text>

        <rect
          x={PAD.left}
          y={PAD.top}
          width={PLOT_W}
          height={PLOT_H}
          fill="transparent"
          onMouseMove={(e) => at(e.clientX, e.currentTarget)}
          onMouseLeave={() => setHover(null)}
          onTouchStart={(e) => at(e.touches[0].clientX, e.currentTarget)}
          onTouchMove={(e) => at(e.touches[0].clientX, e.currentTarget)}
          onTouchEnd={() => setHover(null)}
        />
      </svg>

      {active && (
        <div
          className="pointer-events-none absolute top-2 z-10 max-w-[60%] min-w-36 border-2 border-border-strong bg-surface-raised px-3 py-2 text-xs shadow-lg"
          style={
            flip
              ? { right: `${100 - hoverPct}%`, marginRight: 10 }
              : { left: `${hoverPct}%`, marginLeft: 10 }
          }
        >
          <p className="mb-1.5 font-data text-[0.65rem] tracking-wider text-text-muted uppercase">
            {shortDate(active.date)}
          </p>
          {SERIES.map((s) => (
            <p key={s.key} className="flex items-center gap-2 py-0.5">
              <span
                aria-hidden
                className="inline-block h-2 w-2 shrink-0"
                style={{ background: s.color }}
              />
              <span className="text-text-muted">{s.label}</span>
              <span className="ml-auto font-semibold tabular-nums text-text">
                {full(active[s.key])}
              </span>
            </p>
          ))}
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
        {SERIES.map((s) => (
          <span key={s.key} className="flex items-center gap-2 text-xs text-text-muted">
            <span
              aria-hidden
              className="inline-block h-0.5 w-4 rounded-full"
              style={{ background: s.color }}
            />
            {s.label}
          </span>
        ))}
      </div>

      <details className="mt-4 border-t border-border pt-3">
        <summary className="cursor-pointer text-xs text-text-muted hover:text-text">
          Table view
        </summary>
        <div className="mt-3 max-h-72 overflow-auto">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-surface-raised">
              <tr className="border-b border-border text-text-muted">
                <th className="py-1.5 pr-3 font-medium">Date</th>
                {SERIES.map((s) => (
                  <th key={s.key} className="py-1.5 pr-3 text-right font-medium">
                    {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.date} className="border-b border-border/60">
                  <td className="py-1.5 pr-3 whitespace-nowrap text-text">
                    {shortDate(d.date)}
                  </td>
                  {SERIES.map((s) => (
                    <td
                      key={s.key}
                      className="py-1.5 pr-3 text-right tabular-nums text-text-muted"
                    >
                      {full(d[s.key])}
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
