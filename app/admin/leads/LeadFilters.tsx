"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { LEAD_PRIORITIES, LEAD_STATUSES } from "@/lib/admin-api";
import { humanize } from "@/lib/format";

const FIELD =
  "w-full border-2 border-border-strong bg-surface px-3 py-2 text-sm text-text focus:border-accent focus:outline-none sm:w-auto";

export default function LeadFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  // Any filter change invalidates the current page number.
  const apply = (changes: Record<string, string>) => {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    next.delete("page");
    startTransition(() => router.push(`/admin/leads?${next}`, { scroll: false }));
  };

  const active = params.get("search") || params.get("status") || params.get("priority");

  return (
    <form
      className="flex flex-wrap items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        apply({ search: String(data.get("search") ?? "").trim() });
      }}
    >
      <input
        name="search"
        type="search"
        placeholder="Search name, email, company"
        defaultValue={params.get("search") ?? ""}
        className={`${FIELD} min-w-0 flex-1`}
      />

      <select
        name="status"
        defaultValue={params.get("status") ?? ""}
        onChange={(e) => apply({ status: e.target.value })}
        className={FIELD}
        aria-label="Filter by status"
      >
        <option value="">All statuses</option>
        {LEAD_STATUSES.map((s) => (
          <option key={s} value={s}>
            {humanize(s)}
          </option>
        ))}
      </select>

      <select
        name="priority"
        defaultValue={params.get("priority") ?? ""}
        onChange={(e) => apply({ priority: e.target.value })}
        className={FIELD}
        aria-label="Filter by priority"
      >
        <option value="">All priorities</option>
        {LEAD_PRIORITIES.map((p) => (
          <option key={p} value={p}>
            {humanize(p)}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full border-2 border-accent bg-accent px-4 py-2 text-sm font-medium text-text-inverse transition-opacity hover:opacity-90 sm:w-auto"
      >
        Search
      </button>

      {active && (
        <button
          type="button"
          onClick={() => startTransition(() => router.push("/admin/leads"))}
          className="px-2 py-2 text-sm text-text-muted underline-offset-4 hover:text-text hover:underline"
        >
          Clear
        </button>
      )}

      <span
        aria-live="polite"
        className={`text-xs text-text-muted transition-opacity ${pending ? "opacity-100" : "opacity-0"}`}
      >
        Updating
      </span>
    </form>
  );
}
