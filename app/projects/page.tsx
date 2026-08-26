import type { Metadata } from 'next';
import ProjectsContent from './ProjectsContent';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Featured projects including Tonza Deals, a .NET libp2p chat app, a Diabetes MIS serving 1000+ patients across Rwanda, and an S3 to Filecoin migration tool.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
