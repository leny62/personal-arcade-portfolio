import {
  getDashboard,
  getLeadStats,
  type TimeseriesPoint,
} from "@/lib/admin-api";
import { compact, duration, full, humanize, percent } from "@/lib/format";
import BarList, { type BarRow } from "./charts/BarList";
import TimeseriesChart from "./charts/TimeseriesChart";
import RangeFilter from "./RangeFilter";
import { Card, Empty, Hero, StatTile } from "./ui";

export const dynamic = "force-dynamic";

/** The API only returns days that saw traffic; a line chart needs every day. */
function fillDays(
  points: TimeseriesPoint[],
  from: Date,
  to: Date
): TimeseriesPoint[] {
  const byDay = new Map(points.map((p) => [p.date.slice(0, 10), p]));
  const out: TimeseriesPoint[] = [];
  const cursor = new Date(
    Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate())
  );
  const end = Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate());

  while (cursor.getTime() <= end) {
    const key = cursor.toISOString().slice(0, 10);
    out.push(
      byDay.get(key) ?? {
        date: `${key}T00:00:00.000Z`,
        visitors: 0,
        sessions: 0,
        pageViews: 0,
      }
    );
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return out;
}

const toRows = (
  items: { name: string; sessions: number }[]
): BarRow[] =>
  items.map((t) => ({ key: t.name, label: humanize(t.name), value: t.sessions }));

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const { range } = await searchParams;
  const days = ["7", "30", "90"].includes(range ?? "") ? Number(range) : 30;

  const to = new Date();
  const from = new Date(to.getTime() - days * 86_400_000);
  const window = { from: from.toISOString(), to: to.toISOString() };

  const [dash, leads] = await Promise.all([
    getDashboard({ ...window, limit: 8 }).catch((e: Error) => e),
    getLeadStats(window).catch((e: Error) => e),
  ]);

  if (dash instanceof Error) {
    return (
      <>
        <PageHead days={days} />
        <Card title="Analytics unavailable">
          <p className="text-sm text-text-muted">
            Could not reach the backend. Check that it is running on{" "}
            <code className="font-data">localhost:3002</code>.
          </p>
          <p className="mt-2 font-data text-xs text-neon-red">{dash.message}</p>
        </Card>
      </>
    );
  }

  const o = dash.overview;
  const series = fillDays(dash.timeseries, from, to);

  return (
    <>
      <PageHead days={days} />

      <div className="mb-5 grid gap-3 md:grid-cols-4">
        <div className="md:col-span-1">
          <Hero
            label="Visitors"
            value={compact(o.visitors)}
            hint={`${full(o.newVisitors)} new · ${full(o.returningVisitors)} returning`}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 md:col-span-3 lg:grid-cols-3">
          <StatTile label="Sessions" value={compact(o.sessions)} hint={`${o.pagesPerSession} pages each`} />
          <StatTile label="Page views" value={compact(o.pageViews)} />
          <StatTile label="Conversions" value={full(o.conversions)} hint={percent(o.conversionRate)} />
          <StatTile label="Bounce rate" value={percent(o.bounceRate)} />
          <StatTile label="Avg session" value={duration(o.avgSessionDurationMs)} />
          <StatTile label="Time on site" value={duration(o.totalTimeOnSiteMs)} />
        </div>
      </div>

      <div className="mb-5">
        <Card
          title="Traffic over time"
          subtitle={`Daily, last ${days} days`}
        >
          <TimeseriesChart data={series} />
        </Card>
      </div>

      <div className="mb-5 grid gap-5 lg:grid-cols-3">
        <Card title="Top pages" className="lg:col-span-2">
          <BarList
            unit="Views"
            empty="No page views in this range."
            rows={dash.pages.map((p) => ({
              key: p.path,
              label: p.path,
              value: p.views,
              details: [
                ["Unique", full(p.uniqueVisitors)],
                ["Avg time", duration(p.avgTimeMs)],
                ["Scroll", `${p.avgScrollDepth}%`],
              ],
            }))}
          />
        </Card>

        <Card title="Channels">
          <BarList
            unit="Sessions"
            empty="No sessions in this range."
            rows={dash.channels.map((c) => ({
              key: c.channel,
              label: humanize(c.channel),
              value: c.sessions,
              details: [["Visitors", full(c.visitors)]],
            }))}
          />
        </Card>
      </div>

      <div className="mb-5 grid gap-5 lg:grid-cols-3">
        <Card title="Sections viewed">
          <BarList
            unit="Views"
            empty="No section views yet."
            rows={dash.sections.map((s) => ({
              key: `${s.path}${s.section}`,
              label: s.section,
              hint: s.path,
              value: s.views,
              details: [
                ["Unique", full(s.uniqueVisitors)],
                ["Avg time", duration(s.avgTimeMs)],
              ],
            }))}
          />
        </Card>

        <Card title="Clicks">
          <BarList
            unit="Clicks"
            empty="No clicks tracked yet."
            rows={dash.clicks.map((c) => ({
              key: `${c.path}${c.label}`,
              label: c.label,
              hint: c.target ?? c.path,
              value: c.clicks,
              details: [["Unique", full(c.uniqueVisitors)]],
            }))}
          />
        </Card>

        <Card title="Referrers">
          <BarList
            unit="Sessions"
            empty="No referrers in this range."
            rows={dash.referrers.map((r) => ({
              key: r.host,
              label: r.host,
              value: r.sessions,
            }))}
          />
        </Card>
      </div>

      <div className="mb-5">
        <Card title="Technology">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <TechBlock title="Devices" rows={toRows(dash.technology.devices)} />
            <TechBlock title="Browsers" rows={toRows(dash.technology.browsers)} />
            <TechBlock title="Operating systems" rows={toRows(dash.technology.operatingSystems)} />
            <TechBlock title="Countries" rows={toRows(dash.technology.countries)} />
          </div>
        </Card>
      </div>

      <Card title="Leads" subtitle={`Last ${days} days`}>
        {leads instanceof Error ? (
          <Empty>Lead stats unavailable.</Empty>
        ) : (
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="grid grid-cols-2 gap-3 lg:col-span-1">
              <StatTile label="Total" value={full(leads.total)} />
              <StatTile label="Last 7 days" value={full(leads.recent7Days)} />
              <StatTile label="Won" value={full(leads.won)} hint={percent(leads.winRate)} />
              <StatTile label="Returning" value={full(leads.returning)} />
            </div>
            <div className="lg:col-span-2">
              <p className="mb-3 font-data text-[0.65rem] tracking-[0.14em] text-text-muted uppercase">
                By status
              </p>
              <BarList
                unit="Leads"
                empty="No leads in this range."
                rows={Object.entries(leads.byStatus).map(([status, count]) => ({
                  key: status,
                  label: humanize(status),
                  value: count,
                }))}
              />
            </div>
          </div>
        )}
      </Card>
    </>
  );
}

function PageHead({ days }: { days: number }) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-4">
      <div>
        <h1 className="text-xl font-semibold text-text">Dashboard</h1>
        <p className="text-sm text-text-muted">
          Traffic and leads for the last {days} days.
        </p>
      </div>
      <div className="ml-auto">
        <RangeFilter />
      </div>
    </div>
  );
}

function TechBlock({ title, rows }: { title: string; rows: BarRow[] }) {
  return (
    <div>
      <p className="mb-3 font-data text-[0.65rem] tracking-[0.14em] text-text-muted uppercase">
        {title}
      </p>
      <BarList unit="Sessions" rows={rows} empty="No data." />
    </div>
  );
}
