import type { ReactNode } from "react";

export function Card({
  title,
  subtitle,
  action,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`border-2 border-border-strong bg-surface-raised p-5 ${className}`}
    >
      {(title || action) && (
        <div className="mb-4 flex items-start gap-3">
          <div className="min-w-0">
            {title && (
              <h2 className="font-data text-[0.7rem] tracking-[0.16em] text-text-muted uppercase">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-1 text-xs text-text-muted">{subtitle}</p>
            )}
          </div>
          {action && <div className="ml-auto shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="border-2 border-border-strong bg-surface-raised px-4 py-3.5">
      <p className="font-data text-[0.65rem] tracking-[0.14em] text-text-muted uppercase">
        {label}
      </p>
      <p className="mt-1.5 text-2xl font-semibold text-text">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-text-muted">{hint}</p>}
    </div>
  );
}

/** The one number the view leads with. Exactly one of these per page. */
export function Hero({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="border-2 border-border-strong bg-surface-raised px-5 py-4">
      <p className="font-data text-[0.65rem] tracking-[0.14em] text-text-muted uppercase">
        {label}
      </p>
      <p className="mt-1 text-5xl leading-none font-semibold text-text">{value}</p>
      {hint && <p className="mt-2 text-xs text-text-muted">{hint}</p>}
    </div>
  );
}

const TONE: Record<string, string> = {
  NEW: "border-chart-1 text-chart-1",
  CONTACTED: "border-chart-2 text-chart-2",
  QUALIFIED: "border-chart-2 text-chart-2",
  PROPOSAL: "border-chart-3 text-chart-3",
  WON: "border-neon-green text-neon-green",
  LOST: "border-text-muted text-text-muted",
  ARCHIVED: "border-text-muted text-text-muted",
  SPAM: "border-neon-red text-neon-red",
  URGENT: "border-neon-red text-neon-red",
  HIGH: "border-chart-2 text-chart-2",
  MEDIUM: "border-text-muted text-text-muted",
  LOW: "border-text-muted text-text-muted",
};

export function Pill({ value }: { value: string }) {
  const tone = TONE[value] ?? "border-text-muted text-text-muted";
  return (
    <span
      className={`inline-block border px-1.5 py-0.5 font-data text-[0.6rem] tracking-wider uppercase ${tone}`}
    >
      {value}
    </span>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return (
    <p className="py-10 text-center text-sm text-text-muted">{children}</p>
  );
}
