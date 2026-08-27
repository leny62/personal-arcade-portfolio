import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AdminApiError,
  getLead,
  getVisitorJourney,
  type VisitorJourney,
} from "@/lib/admin-api";
import { dateTime, duration, full, humanize, relative } from "@/lib/format";
import { Card, Empty } from "../../ui";
import LeadControls from "./LeadControls";
import NoteForm from "./NoteForm";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const lead = await getLead(id).catch((e: unknown) => {
    if (e instanceof AdminApiError && e.status === 404) notFound();
    throw e;
  });

  // The journey is supplementary; a visitor that was pruned must not 500 the page.
  const journey: VisitorJourney | null = lead.visitorId
    ? await getVisitorJourney(lead.visitorId).catch(() => null)
    : null;

  return (
    <>
      <Link
        href="/admin/leads"
        className="text-sm text-text-muted transition-colors hover:text-accent"
      >
        &larr; Back to leads
      </Link>

      <div className="mt-3 mb-6 flex flex-wrap items-start gap-4">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-text">{lead.name}</h1>
          <p className="text-sm text-text-muted">
            <a href={`mailto:${lead.email}`} className="hover:text-accent">
              {lead.email}
            </a>
            {lead.company && <> &middot; {lead.company}</>}
            {lead.phone && <> &middot; {lead.phone}</>}
          </p>
          <p className="mt-1 text-xs text-text-muted">
            Received {dateTime(lead.createdAt)}
          </p>
        </div>
        <div className="ml-auto">
          <LeadControls id={lead.id} status={lead.status} priority={lead.priority} />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <Card title={`Messages (${lead.messages.length})`}>
            {lead.messages.length === 0 ? (
              <Empty>No messages.</Empty>
            ) : (
              <ul className="flex flex-col gap-4">
                {lead.messages.map((m) => (
                  <li key={m.id} className="border-l-2 border-chart-1 pl-3">
                    {m.subject && (
                      <p className="font-medium text-text">{m.subject}</p>
                    )}
                    <p className="mt-1 text-sm whitespace-pre-wrap text-text">
                      {m.body}
                    </p>
                    <p className="mt-1.5 font-data text-[0.65rem] text-text-muted">
                      {dateTime(m.createdAt)}
                      {m.origin && ` · ${m.origin}`}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card title={`Notes (${lead.notes.length})`}>
            <NoteForm id={lead.id} />
            {lead.notes.length > 0 && (
              <ul className="mt-5 flex flex-col gap-3 border-t border-border pt-4">
                {lead.notes.map((n) => (
                  <li key={n.id}>
                    <p className="text-sm whitespace-pre-wrap text-text">{n.body}</p>
                    <p className="mt-0.5 font-data text-[0.65rem] text-text-muted">
                      {n.author ?? "Admin"} · {relative(n.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {journey && <Journey journey={journey} />}
        </div>

        <div className="flex flex-col gap-5">
          <Card title="Attribution">
            <Facts
              rows={[
                ["Source", humanize(lead.source)],
                ["Channel", lead.utmSource ?? lead.referrerHost ?? "direct"],
                ["Medium", lead.utmMedium],
                ["Campaign", lead.utmCampaign],
                ["Referrer", lead.referrerHost],
                ["Landing page", lead.landingPage],
                ["Returning", lead.isReturning ? "Yes" : "No"],
                ["Sessions", full(lead.sessionCount)],
                [
                  "First visit",
                  lead.firstVisitAt ? dateTime(lead.firstVisitAt) : null,
                ],
                ["Submissions", full(lead.submissionCount)],
              ]}
            />
          </Card>

          <Card title="Device">
            <Facts
              rows={[
                ["Device", lead.device ? humanize(lead.device) : null],
                ["Browser", lead.browser],
                ["OS", lead.os],
                ["Country", lead.country],
                ["City", lead.city],
              ]}
            />
          </Card>

          <Card title={`Activity (${lead.activities.length})`}>
            {lead.activities.length === 0 ? (
              <Empty>No activity yet.</Empty>
            ) : (
              <ul className="flex flex-col gap-2.5">
                {lead.activities.map((a) => (
                  <li key={a.id} className="text-xs">
                    <p className="text-text">{a.summary}</p>
                    <p className="font-data text-[0.6rem] text-text-muted">
                      {relative(a.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

function Facts({ rows }: { rows: [string, string | null | undefined][] }) {
  const present = rows.filter(([, v]) => v);
  if (present.length === 0) return <Empty>Nothing recorded.</Empty>;

  return (
    <dl className="flex flex-col gap-2 text-sm">
      {present.map(([label, value]) => (
        <div key={label} className="flex gap-3">
          <dt className="w-28 shrink-0 text-text-muted">{label}</dt>
          <dd className="min-w-0 break-words text-text">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Journey({ journey }: { journey: VisitorJourney }) {
  return (
    <Card
      title="Visitor journey"
      subtitle={`${full(journey.sessionCount)} sessions · ${full(journey.pageViewCount)} page views · ${duration(journey.totalDurationMs)} on site`}
    >
      {journey.sessions.length === 0 ? (
        <Empty>No sessions recorded.</Empty>
      ) : (
        <ul className="flex flex-col gap-5">
          {journey.sessions.map((s) => (
            <li key={s.id} className="border-l-2 border-border-strong pl-3">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="text-sm font-medium text-text">
                  {dateTime(s.startedAt)}
                </span>
                <span className="text-xs text-text-muted">
                  {duration(s.durationMs)} · {s.referrerHost ?? "direct"}
                  {s.isBounce && " · bounced"}
                </span>
              </div>

              {s.pageViews.length > 0 && (
                <ol className="mt-2 flex flex-col gap-1">
                  {s.pageViews.map((p) => (
                    <li
                      key={p.id}
                      className="flex flex-wrap items-baseline gap-x-2 text-xs"
                    >
                      <span className="font-data text-text">{p.path}</span>
                      <span className="text-text-muted">
                        {duration(p.durationMs)}
                        {p.scrollDepth > 0 && ` · ${p.scrollDepth}% scrolled`}
                      </span>
                    </li>
                  ))}
                </ol>
              )}

              {s.events.length > 0 && (
                <p className="mt-1.5 text-xs text-text-muted">
                  {s.events
                    .slice(0, 6)
                    .map((e) => e.name || humanize(e.type))
                    .join(", ")}
                  {s.events.length > 6 && ` +${s.events.length - 6} more`}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
