import { backendUrl, forwardedHeaders, relay } from "@/lib/backend";

export async function POST(request: Request) {
  const body = await request.text();

  try {
    const upstream = await fetch(backendUrl("/contact"), {
      method: "POST",
      headers: forwardedHeaders(request),
      body,
      cache: "no-store",
    });

    return relay(upstream);
  } catch (error) {
    console.error("contact proxy failed", error);
    return Response.json(
      {
        statusCode: 502,
        message: "Could not reach the message service. Please email me directly.",
      },
      { status: 502 }
    );
  }
}
