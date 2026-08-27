import { backendUrl, forwardedHeaders, relay } from "@/lib/backend";

export async function POST(request: Request) {
  // Forwarded verbatim rather than parsed and re-serialised: sendBeacon sends
  // the exact bytes the client queued and there is nothing here worth editing.
  const body = await request.text();

  try {
    const upstream = await fetch(backendUrl("/analytics/collect"), {
      method: "POST",
      headers: forwardedHeaders(request),
      body,
      cache: "no-store",
    });

    return relay(upstream);
  } catch (error) {
    // Analytics is best-effort. A dead backend should leave a server-side
    // trail but must never turn into a visible error on the page.
    console.error("analytics collect proxy failed", error);
    return Response.json({ accepted: 0 }, { status: 202 });
  }
}
