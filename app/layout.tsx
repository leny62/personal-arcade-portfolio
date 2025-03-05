import type { Metadata } from "next";
import "./globals.css";
import Layout from './components/layout/Layout';
import { ThemeProvider } from './components/ThemeProvider';

export const metadata: Metadata = {
  title: "Leny Pascal IHIRWE | Software Engineer & Creative Technologist",
  description: "Personal portfolio of Leny Pascal IHIRWE, a Software Engineer specializing in Full-Stack Development, Web3, and Creative Technology.",
  keywords: "Leny Pascal IHIRWE, Software Engineer, Full-Stack Developer, Web3, Protocol Labs, Next.js, React, .NET",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Layout>
            {children}
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
