"use client";

import { useState, useTransition } from "react";
import {
  LEAD_PRIORITIES,
  LEAD_STATUSES,
  type LeadPriority,
  type LeadStatus,
} from "@/lib/admin-api";
import { humanize } from "@/lib/format";
import { setPriority, setStatus } from "../actions";

const FIELD =
  "w-full border-2 border-border-strong bg-surface px-3 py-2 text-sm text-text focus:border-accent focus:outline-none disabled:opacity-60 sm:w-auto";

export default function LeadControls({
  id,
  status,
  priority,
}: {
  id: string;
  status: LeadStatus;
  priority: LeadPriority;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Optimistic local value so the select does not snap back while the action
  // is in flight.
  const [localStatus, setLocalStatus] = useState(status);
  const [localPriority, setLocalPriority] = useState(priority);

  const run = (fn: () => Promise<void>, revert: () => void) => {
    setError(null);
    startTransition(async () => {
      try {
        await fn();
      } catch {
        revert();
        setError("Could not save. Try again.");
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <label className="sr-only" htmlFor="status">
        Status
      </label>
      <select
        id="status"
        value={localStatus}
        disabled={pending}
        className={FIELD}
        onChange={(e) => {
          const next = e.target.value as LeadStatus;
          const prev = localStatus;
          setLocalStatus(next);
          run(() => setStatus(id, next), () => setLocalStatus(prev));
        }}
      >
        {LEAD_STATUSES.map((s) => (
          <option key={s} value={s}>
            {humanize(s)}
          </option>
        ))}
      </select>

      <label className="sr-only" htmlFor="priority">
        Priority
      </label>
      <select
        id="priority"
        value={localPriority}
        disabled={pending}
        className={FIELD}
        onChange={(e) => {
          const next = e.target.value as LeadPriority;
          const prev = localPriority;
          setLocalPriority(next);
          run(() => setPriority(id, next), () => setLocalPriority(prev));
        }}
      >
        {LEAD_PRIORITIES.map((p) => (
          <option key={p} value={p}>
            {humanize(p)}
          </option>
        ))}
      </select>

      <span
        role="status"
        aria-live="polite"
        className="text-xs text-text-muted"
      >
        {pending ? "Saving..." : ""}
      </span>
      {error && <span className="text-xs text-neon-red">{error}</span>}
    </div>
  );
}
