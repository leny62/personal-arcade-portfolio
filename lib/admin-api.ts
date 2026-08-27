// Server-only client for the admin endpoints. Types mirror the NestJS DTOs
// exactly; anything that drifts here shows up as a type error rather than an
// undefined at render time.

import { backendUrl } from "./backend";

export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL",
  "WON",
  "LOST",
  "ARCHIVED",
  "SPAM",
] as const;

export const LEAD_SOURCES = [
  "CONTACT_FORM",
  "REFERRAL",
  "MANUAL",
  "IMPORT",
  "OTHER",
] as const;

export const LEAD_PRIORITIES = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type LeadSource = (typeof LEAD_SOURCES)[number];
export type LeadPriority = (typeof LEAD_PRIORITIES)[number];
export type DeviceType = "DESKTOP" | "MOBILE" | "TABLET" | "BOT" | "UNKNOWN";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  status: LeadStatus;
  source: LeadSource;
  priority: LeadPriority;
  tags: string[];
  lastMessage: string | null;
  messageCount: number;
  submissionCount: number;
  visitorId: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  referrer: string | null;
  referrerHost: string | null;
  landingPage: string | null;
  isReturning: boolean;
  sessionCount: number;
  firstVisitAt: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  country: string | null;
  city: string | null;
  device: DeviceType | null;
  browser: string | null;
  os: string | null;
  contactedAt: string | null;
  convertedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeadMessage {
  id: string;
  leadId: string;
  subject: string | null;
  body: string;
  origin: string | null;
  createdAt: string;
}

export interface LeadNote {
  id: string;
  leadId: string;
  body: string;
  author: string | null;
  createdAt: string;
}

export interface LeadActivity {
  id: string;
  leadId: string;
  type: string;
  summary: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

export interface LeadDetail extends Lead {
  messages: LeadMessage[];
  notes: LeadNote[];
  activities: LeadActivity[];
}

export interface PageMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Paginated<T> {
  data: T[];
  meta: PageMeta;
}

export interface LeadStats {
  total: number;
  recent7Days: number;
  returning: number;
  won: number;
  winRate: number;
  avgResponseHours: number | null;
  byStatus: Record<string, number>;
  bySource: Record<string, number>;
  byPriority: Record<string, number>;
  byUtmSource: Record<string, number>;
  timeseries: { date: string; count: number }[];
}

export interface Overview {
  range: { from: string; to: string };
  visitors: number;
  newVisitors: number;
  returningVisitors: number;
  sessions: number;
  pageViews: number;
  events: number;
  conversions: number;
  conversionRate: number;
  bounceRate: number;
  avgSessionDurationMs: number;
  totalTimeOnSiteMs: number;
  pagesPerSession: number;
}

export interface TimeseriesPoint {
  date: string;
  visitors: number;
  sessions: number;
  pageViews: number;
}

export interface PageStat {
  path: string;
  views: number;
  uniqueVisitors: number;
  totalTimeMs: number;
  avgTimeMs: number;
  avgScrollDepth: number;
}

export interface SectionStat {
  section: string;
  path: string;
  views: number;
  uniqueVisitors: number;
  totalTimeMs: number;
  avgTimeMs: number;
}

export interface ClickStat {
  label: string;
  target: string | null;
  path: string;
  clicks: number;
  uniqueVisitors: number;
}

export interface ChannelStat {
  channel: string;
  sessions: number;
  visitors: number;
}

export interface ReferrerStat {
  host: string;
  sessions: number;
}

export interface CampaignStat {
  source: string;
  medium: string | null;
  campaign: string | null;
  sessions: number;
}

export interface Technology {
  devices: { name: string; sessions: number }[];
  browsers: { name: string; sessions: number }[];
  operatingSystems: { name: string; sessions: number }[];
  countries: { name: string; sessions: number }[];
}

export interface DashboardStats {
  overview: Overview;
  timeseries: TimeseriesPoint[];
  pages: PageStat[];
  sections: SectionStat[];
  clicks: ClickStat[];
  channels: ChannelStat[];
  referrers: ReferrerStat[];
  technology: Technology;
}

export interface VisitorPageView {
  id: string;
  path: string;
  title: string | null;
  durationMs: number;
  scrollDepth: number;
  enteredAt: string;
  exitedAt: string | null;
}

export interface VisitorEvent {
  id: string;
  type: string;
  path: string;
  name: string;
  target: string | null;
  durationMs: number;
  metadata: Record<string, unknown> | null;
  occurredAt: string;
}

export interface VisitorSession {
  id: string;
  sessionId: string;
  startedAt: string;
  lastSeenAt: string;
  durationMs: number;
  isReturning: boolean;
  pageViewCount: number;
  eventCount: number;
  isBounce: boolean;
  referrer: string | null;
  referrerHost: string | null;
  landingPage: string | null;
  exitPage: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  country: string | null;
  city: string | null;
  device: DeviceType | null;
  browser: string | null;
  os: string | null;
  screenWidth: number | null;
  screenHeight: number | null;
  language: string | null;
  timezone: string | null;
  pageViews: VisitorPageView[];
  events: VisitorEvent[];
}

export interface VisitorJourney {
  visitorId: string;
  firstSeenAt: string;
  lastSeenAt: string;
  sessionCount: number;
  pageViewCount: number;
  eventCount: number;
  totalDurationMs: number;
  firstReferrerHost: string | null;
  firstLandingPage: string | null;
  device: DeviceType | null;
  browser: string | null;
  os: string | null;
  country: string | null;
  convertedAt: string | null;
  sessions: VisitorSession[];
}

export type QueryValue = string | number | boolean | undefined | null;

const buildQuery = (params: Record<string, QueryValue>): string => {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `?${query}` : "";
};

export class AdminApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly details?: string[]
  ) {
    super(message);
  }
}

async function adminFetch<T>(
  path: string,
  params: Record<string, QueryValue> = {},
  init?: RequestInit
): Promise<T> {
  // Belt and braces: this module must never end up in a client bundle, since
  // it carries the admin key.
  if (typeof window !== "undefined") {
    throw new Error("admin-api is server-only");
  }

  const key = process.env.ADMIN_API_KEY;
  if (!key) throw new Error("ADMIN_API_KEY is not set");

  const response = await fetch(backendUrl(path) + buildQuery(params), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new AdminApiError(
      response.status,
      body?.message ?? `Request failed with ${response.status}`,
      body?.details
    );
  }

  return body as T;
}

export interface LeadQuery {
  page?: number;
  limit?: number;
  order?: "asc" | "desc";
  sortBy?: string;
  search?: string;
  status?: string;
  source?: string;
  priority?: string;
  tags?: string;
  utmSource?: string;
  isReturning?: boolean;
  from?: string;
  to?: string;
  expand?: boolean;
}

export const getLeads = (query: LeadQuery = {}) =>
  adminFetch<Paginated<Lead>>("/leads", { ...query });

export const getLead = (id: string) => adminFetch<LeadDetail>(`/leads/${id}`);

export const getLeadStats = (query: LeadQuery = {}) =>
  adminFetch<LeadStats>("/leads/stats", { ...query });

export const getDashboard = (params: { from?: string; to?: string; limit?: number } = {}) =>
  adminFetch<DashboardStats>("/analytics/stats/dashboard", { ...params });

export const getCampaigns = (params: { from?: string; to?: string; limit?: number } = {}) =>
  adminFetch<CampaignStat[]>("/analytics/stats/campaigns", { ...params });

export const getTimeseries = (params: {
  from?: string;
  to?: string;
  granularity?: "day" | "week" | "month";
} = {}) => adminFetch<TimeseriesPoint[]>("/analytics/stats/timeseries", { ...params });

export const getVisitorJourney = (visitorId: string) =>
  adminFetch<VisitorJourney>(`/analytics/visitors/${encodeURIComponent(visitorId)}`);

export const updateLead = (
  id: string,
  patch: Partial<Pick<Lead, "status" | "priority" | "name" | "email" | "phone" | "company" | "tags">>
) =>
  adminFetch<Lead>(`/leads/${id}`, {}, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });

export const addNote = (id: string, body: string, author = "Admin") =>
  adminFetch<LeadNote>(`/leads/${id}/notes`, {}, {
    method: "POST",
    body: JSON.stringify({ body, author }),
  });

export const deleteLead = (id: string) =>
  adminFetch<void>(`/leads/${id}`, {}, { method: "DELETE" });
