import type { Metadata } from 'next';
import ExperienceContent from './ExperienceContent';

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Seven engineering roles across healthcare, fintech, telecom, and Web3, including Bouletteproof, Protocol Labs Dev Guild, Andela, and Karisimbi Technology Solutions.',
  alternates: { canonical: '/experience' },
};

export default function ExperiencePage() {
  return <ExperienceContent />;
}
