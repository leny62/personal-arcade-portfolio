import type { Metadata } from 'next';
import Hero from './components/home/Hero';
import DestinationMenu, { type Destination } from './components/home/DestinationMenu';

export const metadata: Metadata = {
  title: 'Leny Pascal IHIRWE | Software Engineer & Creative Technologist',
  description:
    'Software engineer building secure, scalable web applications and distributed systems. Full-stack, .NET, and Web3. Explore my bio, experience, skills, and projects.',
  alternates: { canonical: '/' },
};

const destinations: Destination[] = [
  {
    title: 'BIO',
    path: '/bio',
    color: 'neon-blue',
    description: 'Background, education, and the story behind the developer.',
  },
  {
    title: 'EXPERIENCE',
    path: '/experience',
    color: 'neon-green',
    description: 'Seven roles across healthcare, fintech, telecom, and Web3.',
  },
  {
    title: 'SKILLS',
    path: '/skills',
    color: 'neon-yellow',
    description: 'The full stack, from C# and .NET to React, Next.js, and libp2p.',
  },
  {
    title: 'PROJECTS',
    path: '/projects',
    color: 'neon-pink',
    description: 'Featured work, including a health system serving 1000+ patients.',
  },
  {
    title: 'CONTACT',
    path: '/contact',
    color: 'neon-purple',
    description: 'Open to full-time roles, freelance work, and collaborations.',
  },
];

export default function Home() {
  return (
    <div className="relative">
      <div
        className="pointer-events-none fixed inset-0 bg-grid-pattern bg-grid-size opacity-60"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-4">
        <section className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center py-12">
          <Hero />
        </section>

        <section
          id="destinations"
          tabIndex={-1}
          aria-labelledby="destinations-heading"
          className="mx-auto max-w-4xl scroll-mt-24 pb-20 focus:outline-none"
        >
          <div className="mb-10 text-center">
            <h2
              id="destinations-heading"
              className="neon-text mb-3 font-arcade text-xl text-text sm:text-2xl md:text-4xl"
            >
              SELECT YOUR DESTINATION
            </h2>
            <p className="font-pixel text-lg text-text-muted">
              Navigate with arrow keys, or pick a level below
            </p>
          </div>

          <DestinationMenu items={destinations} />
        </section>
      </div>
    </div>
  );
}
