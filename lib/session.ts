// Admin session: a signed, expiring cookie. No user table, no database.
//
// Built on Web Crypto rather than node:crypto so the same code runs in Edge
// middleware and in Node route handlers. There is exactly one operator, so
// "auth" here means proving you know one password, nothing more.

const encoder = new TextEncoder();

export const SESSION_COOKIE = "pf_admin";
const TTL_MS = 12 * 60 * 60 * 1000;

const b64url = (bytes: Uint8Array): string => {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const unb64url = (value: string): Uint8Array => {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
};

const hmacKey = (secret: string) =>
  crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );

const secretOrThrow = (): string => {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return secret;
};

/** Issues a signed token that expires on its own. */
export const createSession = async (): Promise<string> => {
  const payload = JSON.stringify({ exp: Date.now() + TTL_MS });
  const encoded = b64url(encoder.encode(payload));

  const signature = await crypto.subtle.sign(
    "HMAC",
    await hmacKey(secretOrThrow()),
    encoder.encode(encoded)
  );

  return `${encoded}.${b64url(new Uint8Array(signature))}`;
};

/**
 * True only for a token that carries a valid signature and has not expired.
 * Any malformed input is a failed verification, never an exception, so a
 * mangled cookie logs you out instead of 500ing the page.
 */
export const verifySession = async (token: string | undefined): Promise<boolean> => {
  if (!token) return false;

  try {
    const [encoded, signature] = token.split(".");
    if (!encoded || !signature) return false;

    const valid = await crypto.subtle.verify(
      "HMAC",
      await hmacKey(secretOrThrow()),
      unb64url(signature),
      encoder.encode(encoded)
    );
    if (!valid) return false;

    const { exp } = JSON.parse(new TextDecoder().decode(unb64url(encoded)));
    return typeof exp === "number" && Date.now() < exp;
  } catch {
    return false;
  }
};

/**
 * Compares against ADMIN_PASSWORD without leaking length or content through
 * timing: both sides are hashed to a fixed 32 bytes first, then compared with
 * no early exit.
 */
export const checkPassword = async (attempt: string): Promise<boolean> => {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD is not set");

  const [a, b] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(attempt)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ]);

  const left = new Uint8Array(a);
  const right = new Uint8Array(b);

  let diff = 0;
  for (let i = 0; i < left.length; i += 1) diff |= left[i] ^ right[i];
  return diff === 0;
};

export const cookieOptions = () => ({
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: TTL_MS / 1000,
});
