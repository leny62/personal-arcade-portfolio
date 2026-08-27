import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const authed = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);

  // Already signed in, so the login form has nothing to offer.
  if (pathname === "/admin/login") {
    if (!authed) return NextResponse.next();
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (authed) return NextResponse.next();

  // Remember where they were headed so login can send them back.
  const login = new URL("/admin/login", request.url);
  if (pathname !== "/admin") login.searchParams.set("next", pathname + search);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin/:path*"],
};
