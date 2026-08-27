// Server-only. Never import this from a client component: the backend origin
// is deliberately kept out of the browser bundle.

const API_PREFIX = "/api/v1";

/**
 * Builds an absolute backend URL. Accepts NEXT_PUBLIC_API_URL with or without
 * the /api/v1 suffix so an existing .env keeps working either way.
 */
export const backendUrl = (path: string): string => {
  const configured = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
  if (!configured) {
    throw new Error("API_URL (or NEXT_PUBLIC_API_URL) is not configured");
  }

  const origin = configured.replace(/\/+$/, "").replace(/\/api\/v1$/, "");
  return `${origin}${API_PREFIX}${path}`;
};

/**
 * Headers the backend needs to see the visitor rather than this server.
 * Without them every submission shares one IP, which breaks both the per-IP
 * rate limit and the bot filtering that keys off the user agent.
 */
export const forwardedHeaders = (request: Request): HeadersInit => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) headers["x-forwarded-for"] = forwardedFor;

  const realIp = request.headers.get("x-real-ip");
  if (realIp) headers["x-real-ip"] = realIp;

  const userAgent = request.headers.get("user-agent");
  if (userAgent) headers["user-agent"] = userAgent;

  return headers;
};

/** Pipes the backend response through unchanged so status codes survive. */
export const relay = async (upstream: Response): Promise<Response> => {
  const body = await upstream.text();
  return new Response(body, {
    status: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "application/json",
    },
  });
};
