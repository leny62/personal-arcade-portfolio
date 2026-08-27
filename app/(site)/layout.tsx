import Layout from "../components/layout/Layout";
import AnalyticsTracker from "../components/AnalyticsTracker";

// Scoped to the public site on purpose. Mounting the tracker at the root would
// record every admin page view as visitor traffic and corrupt the very reports
// the admin exists to read.
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AnalyticsTracker />
      <Layout>{children}</Layout>
    </>
  );
}
