import type { Metadata } from 'next';
import SkillsContent from './SkillsContent';

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Technical skills across frontend, backend, database, mobile, DevOps, and Web3: React, Next.js, TypeScript, C#, .NET, PostgreSQL, Docker, libp2p, and IPFS.',
  alternates: { canonical: '/skills' },
};

export default function SkillsPage() {
  return <SkillsContent />;
}
