import Link from "next/link";
import { getLeads } from "@/lib/admin-api";
import { full, humanize, relative } from "@/lib/format";
import { Card, Empty, Pill } from "../ui";
import LeadFilters from "./LeadFilters";

export const dynamic = "force-dynamic";

const PER_PAGE = 20;

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);

  const result = await getLeads({
    page,
    limit: PER_PAGE,
    search: sp.search,
    status: sp.status,
    priority: sp.priority,
    source: sp.source,
  }).catch((e: Error) => e);

  return (
    <>
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-text">Leads</h1>
        <p className="text-sm text-text-muted">
          {result instanceof Error
            ? "Could not load leads."
            : `${full(result.meta.total)} total`}
        </p>
      </div>

      <div className="mb-5">
        <LeadFilters />
      </div>

      {result instanceof Error ? (
        <Card title="Leads unavailable">
          <p className="text-sm text-text-muted">
            Could not reach the backend. Check that it is running on{" "}
            <code className="font-data">localhost:3002</code>.
          </p>
          <p className="mt-2 font-data text-xs text-neon-red">{result.message}</p>
        </Card>
      ) : result.data.length === 0 ? (
        <Card>
          <Empty>No leads match these filters.</Empty>
        </Card>
      ) : (
        <>
          <ul className="flex flex-col gap-3 md:hidden">
            {result.data.map((lead) => (
              <li
                key={lead.id}
                className="border-2 border-border-strong bg-surface-raised p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="font-medium text-text hover:text-accent"
                    >
                      {lead.name}
                    </Link>
                    <p className="truncate text-xs text-text-muted">{lead.email}</p>
                    {lead.company && (
                      <p className="truncate text-xs text-text-muted">{lead.company}</p>
                    )}
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <Pill value={lead.status} />
                    <Pill value={lead.priority} />
                  </div>
                </div>
                <p className="mt-2.5 text-xs text-text-muted">
                  {humanize(lead.source)}
                  {lead.isReturning && <span className="ml-1.5 text-chart-2">returning</span>}
                  <span className="text-text-muted"> · {relative(lead.createdAt)}</span>
                </p>
              </li>
            ))}
          </ul>

          <div className="hidden overflow-x-auto border-2 border-border-strong bg-surface-raised md:block">
            <table className="w-full min-w-3xl text-left text-sm">
              <thead>
                <tr className="border-b-2 border-border-strong">
                  {["Lead", "Status", "Priority", "Source", "Channel", "Received"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 font-data text-[0.65rem] tracking-[0.14em] text-text-muted uppercase"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {result.data.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-border transition-colors last:border-0 hover:bg-surface-muted"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="font-medium text-text hover:text-accent"
                      >
                        {lead.name}
                      </Link>
                      <p className="text-xs text-text-muted">{lead.email}</p>
                      {lead.company && (
                        <p className="text-xs text-text-muted">{lead.company}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Pill value={lead.status} />
                    </td>
                    <td className="px-4 py-3">
                      <Pill value={lead.priority} />
                    </td>
                    <td className="px-4 py-3 text-xs text-text-muted">
                      {humanize(lead.source)}
                    </td>
                    <td className="px-4 py-3 text-xs text-text-muted">
                      {lead.utmSource ?? lead.referrerHost ?? "direct"}
                      {lead.isReturning && (
                        <span className="ml-1.5 text-chart-2">returning</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap text-text-muted">
                      {relative(lead.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination meta={result.meta} params={sp} />
        </>
      )}
    </>
  );
}

function Pagination({
  meta,
  params,
}: {
  meta: { page: number; totalPages: number; hasNextPage: boolean; hasPreviousPage: boolean };
  params: Record<string, string | undefined>;
}) {
  if (meta.totalPages <= 1) return null;

  const href = (page: number) => {
    const next = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v && k !== "page") next.set(k, v);
    }
    next.set("page", String(page));
    return `/admin/leads?${next}`;
  };

  const link =
    "border-2 border-border-strong px-3 py-1.5 text-sm text-text transition-colors hover:border-accent hover:text-accent";

  return (
    <div className="mt-4 flex items-center gap-3">
      {meta.hasPreviousPage ? (
        <Link href={href(meta.page - 1)} className={link}>
          Previous
        </Link>
      ) : (
        <span className={`${link} pointer-events-none opacity-40`}>Previous</span>
      )}

      <span className="text-sm text-text-muted">
        Page {meta.page} of {meta.totalPages}
      </span>

      {meta.hasNextPage ? (
        <Link href={href(meta.page + 1)} className={link}>
          Next
        </Link>
      ) : (
        <span className={`${link} pointer-events-none opacity-40`}>Next</span>
      )}
    </div>
  );
}
