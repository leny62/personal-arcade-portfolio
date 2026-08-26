import type { Metadata, Viewport } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import Layout from "./components/layout/Layout";
import { ThemeProvider } from "./components/ThemeProvider";
import { SITE } from "@/lib/site";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.role}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Leny Pascal IHIRWE",
    "Software Engineer",
    "Full-Stack Developer",
    "Web3",
    "Protocol Labs",
    "libp2p",
    "Next.js",
    "React",
    ".NET",
    "Rwanda",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.role}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.role}`,
    description: SITE.description,
    creator: SITE.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5efdf" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a12" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  jobTitle: SITE.role,
  email: `mailto:${SITE.email}`,
  description: SITE.description,
  sameAs: [SITE.github, SITE.linkedin, SITE.x],
  knowsAbout: [
    "Full-Stack Development",
    "Distributed Systems",
    "Web3",
    "libp2p",
    ".NET",
    "React",
    "Next.js",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kigali",
    addressCountry: "RW",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pressStart.variable} ${vt323.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
