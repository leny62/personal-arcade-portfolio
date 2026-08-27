// Client-side analytics. Posts to the same-origin proxy in app/api/analytics,
// which forwards to the backend with the real client IP attached.

const COLLECT_URL = "/api/analytics/collect";

// Deliberately the same key the old anonymous-id helper used, so visitors who
// were here before this rewrite keep their identity instead of being counted
// as new.
const VISITOR_KEY = "personal-portfolio-anonymous-id";
const SESSION_KEY = "pp-session";
const CONTEXT_SENT_KEY = "pp-context-sent";

const SESSION_TTL_MS = 30 * 60 * 1000;
const BATCH_SIZE = 50;
const FLUSH_DELAY_MS = 3000;

// Backend column limits. Exceeding any of them fails validation for the whole
// batch, not just the offending event, so everything is clamped before queueing.
const MAX_PATH = 512;
const MAX_NAME = 255;
const MAX_TARGET = 1024;
const MAX_DURATION_MS = 86_400_000;

export type EventType =
  | "PAGE_VIEW"
  | "SECTION_VIEW"
  | "CLICK"
  | "OUTBOUND_LINK"
  | "DOWNLOAD"
  | "FORM_START"
  | "FORM_SUBMIT"
  | "SCROLL_DEPTH"
  | "CUSTOM";

interface QueuedEvent {
  type: EventType;
  path: string;
  name?: string;
  target?: string;
  durationMs?: number;
  scrollDepth?: number;
  metadata?: Record<string, unknown>;
  occurredAt: string;
}

export interface TrackData {
  path?: string;
  name?: string;
  target?: string;
  durationMs?: number;
  scrollDepth?: number;
  metadata?: Record<string, unknown>;
}

const isBrowser = () => typeof window !== "undefined";

// Storage throws in Safari private mode and when cookies are blocked entirely.
// Analytics is never allowed to break the page, so every access degrades to a
// per-tab in-memory store.
const memoryStore = new Map<string, string>();

const readStore = (store: "local" | "session", key: string): string | null => {
  try {
    const value =
      store === "local"
        ? window.localStorage.getItem(key)
        : window.sessionStorage.getItem(key);
    return value;
  } catch {
    return memoryStore.get(`${store}:${key}`) ?? null;
  }
};

const writeStore = (store: "local" | "session", key: string, value: string) => {
  try {
    if (store === "local") window.localStorage.setItem(key, value);
    else window.sessionStorage.setItem(key, value);
  } catch {
    memoryStore.set(`${store}:${key}`, value);
  }
};

const removeStore = (store: "local" | "session", key: string) => {
  try {
    if (store === "local") window.localStorage.removeItem(key);
    else window.sessionStorage.removeItem(key);
  } catch {
    memoryStore.delete(`${store}:${key}`);
  }
};

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};

export const getVisitorId = (): string => {
  if (!isBrowser()) return "";

  const existing = readStore("local", VISITOR_KEY);
  if (existing) return existing;

  const id = createId();
  writeStore("local", VISITOR_KEY, id);
  return id;
};

export const getSessionId = (): string => {
  if (!isBrowser()) return "";

  const now = Date.now();
  const raw = readStore("session", SESSION_KEY);

  if (raw) {
    try {
      const parsed = JSON.parse(raw) as { id: string; last: number };
      if (parsed?.id && now - parsed.last < SESSION_TTL_MS) {
        writeStore("session", SESSION_KEY, JSON.stringify({ id: parsed.id, last: now }));
        return parsed.id;
      }
    } catch {
      // Corrupt entry, fall through and mint a new session.
    }
  }

  const id = createId();
  writeStore("session", SESSION_KEY, JSON.stringify({ id, last: now }));
  // A new session needs its context sent again.
  removeStore("session", CONTEXT_SENT_KEY);
  return id;
};

const buildContext = () => {
  const params = new URLSearchParams(window.location.search);
  const pick = (key: string) => params.get(key)?.slice(0, 255) || undefined;

  return {
    referrer: document.referrer ? document.referrer.slice(0, 2048) : undefined,
    landingPage: window.location.pathname.slice(0, MAX_PATH),
    utmSource: pick("utm_source"),
    utmMedium: pick("utm_medium"),
    utmCampaign: pick("utm_campaign"),
    utmTerm: pick("utm_term"),
    utmContent: pick("utm_content"),
    screenWidth: clampInt(window.screen?.width, 0, 20000),
    screenHeight: clampInt(window.screen?.height, 0, 20000),
    language: navigator.language?.slice(0, 35),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone?.slice(0, 64),
  };
};

function clampInt(value: unknown, min: number, max: number): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  return Math.min(max, Math.max(min, Math.round(value)));
}

const trim = (value: string | undefined, max: number) =>
  value ? value.slice(0, max) : undefined;

let queue: QueuedEvent[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;

const scheduleFlush = () => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => flush(false), FLUSH_DELAY_MS);
};

const flush = (useBeacon: boolean): void => {
  if (!isBrowser() || queue.length === 0) return;

  if (timer) {
    clearTimeout(timer);
    timer = null;
  }

  const batch = queue.slice(0, BATCH_SIZE);
  queue = queue.slice(BATCH_SIZE);

  // Resolved before the context flag is read: an expired session mints a new
  // id and clears that flag, and reading it first would then skip the context
  // for the new session.
  const visitorId = getVisitorId();
  const sessionId = getSessionId();

  // Context is per-session and only useful once. Sending it on every batch
  // would just overwrite the session row with the same values.
  const contextAlreadySent = readStore("session", CONTEXT_SENT_KEY) === "1";
  const payload = {
    visitorId,
    sessionId,
    ...(contextAlreadySent ? {} : { context: buildContext() }),
    events: batch,
  };
  writeStore("session", CONTEXT_SENT_KEY, "1");

  const body = JSON.stringify(payload);
  let delivered = true;

  // A normal fetch is cancelled when the page goes away; sendBeacon is not.
  if (useBeacon && typeof navigator.sendBeacon === "function") {
    const blob = new Blob([body], { type: "application/json" });
    delivered = navigator.sendBeacon(COLLECT_URL, blob);
    if (!delivered) {
      // Beacon queue is full. Put the batch back rather than drop it, and stop
      // draining: retrying immediately would just spin on the same full queue.
      queue = batch.concat(queue);
    }
  } else {
    fetch(COLLECT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      // A visitor must never see an analytics failure.
    });
  }

  // More than one batch was pending.
  if (delivered && queue.length > 0) {
    if (useBeacon) flush(true);
    else scheduleFlush();
  }
};

export const track = (type: EventType, data: TrackData = {}): void => {
  if (!isBrowser()) return;

  queue.push({
    type,
    path: trim(data.path ?? window.location.pathname, MAX_PATH) ?? "/",
    name: trim(data.name, MAX_NAME),
    target: trim(data.target, MAX_TARGET),
    durationMs: clampInt(data.durationMs, 0, MAX_DURATION_MS),
    scrollDepth: clampInt(data.scrollDepth, 0, 100),
    metadata: data.metadata,
    occurredAt: new Date().toISOString(),
  });

  // The queue is flushed immediately once a full batch is ready, otherwise the
  // 51st event would sit behind the debounce with no way to jump it.
  if (queue.length >= BATCH_SIZE) flush(false);
  else scheduleFlush();
};

/** Flush synchronously via sendBeacon. Safe to call during unload. */
export const flushNow = (): void => flush(true);

export const trackClick = (name: string, target?: string) =>
  track("CLICK", { name, target });

export const trackOutbound = (name: string, target: string) =>
  track("OUTBOUND_LINK", { name, target });

export const trackDownload = (name: string, target: string) =>
  track("DOWNLOAD", { name, target });
