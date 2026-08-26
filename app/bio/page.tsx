import type { Metadata } from 'next';
import BioContent from './BioContent';

export const metadata: Metadata = {
  title: 'Bio',
  description:
    'Leny Pascal IHIRWE is a full-stack developer with a background in secure, scalable web applications and distributed systems, with a B.Sc. from The African Leadership University.',
  alternates: { canonical: '/bio' },
};

export default function BioPage() {
  return <BioContent />;
}
