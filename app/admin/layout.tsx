import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { SESSION_COOKIE, verifySession } from "@/lib/session";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
];

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const store = await cookies();
  const authed = await verifySession(store.get(SESSION_COOKIE)?.value);

  // The login page lives under /admin too, and should render without chrome.
  if (!authed) {
    return <div className="admin-root min-h-screen bg-surface font-ui text-text">{children}</div>;
  }

  return (
    <div className="admin-root min-h-screen bg-surface font-ui text-text">
      <header className="border-b-2 border-border-strong bg-surface-raised">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-5">
          <span className="font-data text-xs tracking-[0.18em] text-accent uppercase">
            Portfolio Admin
          </span>

          <div className="order-3 ml-auto flex items-center gap-3 sm:order-none">
            <Link
              href="/"
              className="text-sm text-text-muted transition-colors hover:text-accent"
            >
              View site
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="border-2 border-border-strong px-3 py-1 text-sm text-text-muted transition-colors hover:border-neon-red hover:text-neon-red"
              >
                Sign out
              </button>
            </form>
          </div>

          <nav
            aria-label="Admin"
            className="order-4 -mx-1 flex w-full items-center gap-1 border-t border-border pt-1.5 sm:order-none sm:mx-0 sm:w-auto sm:border-0 sm:pt-0"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-sm text-text-muted transition-colors hover:bg-surface-muted hover:text-text"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-5 sm:py-8">{children}</main>
    </div>
  );
}
