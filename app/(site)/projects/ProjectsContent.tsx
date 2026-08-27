'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
  FaLaptopCode,
  FaChevronLeft,
  FaChevronRight,
  FaTags,
} from 'react-icons/fa';
import PageHeader from '../../components/ui/PageHeader';
import { trackClick, trackOutbound } from '@/lib/analytics';
import { useSectionTracking } from '@/lib/useSectionTracking';

const projects = [
  {
    id: 1,
    title: 'Tonza Deals',
    description:
      'A customer engagement and loyalty platform that empowers brands to retarget, reward, and remarket to customers while improving marketing capabilities.',
    tags: ['Next.js', 'Nest.js', 'PostgreSQL', 'Stripe', 'TypeScript'],
    github: '',
    liveUrl: 'https://tonzadeals.com',
    features: [
      'Customer loyalty program management',
      'Marketing campaign automation',
      'Analytics dashboard',
      'Subscription management via Stripe',
      'Multi-tenant architecture',
    ],
    technologies: {
      frontend: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'],
      backend: ['Nest.js', 'PostgreSQL', 'Prisma', 'JWT Auth'],
      devops: ['Docker', 'GitHub Actions', 'AWS'],
    },
  },
  {
    id: 2,
    title: '.NET libp2p Chat',
    description:
      'A cross-platform peer-to-peer chat application built on libp2p using .NET 8, enabling direct communication without centralized servers.',
    tags: ['.NET 8', 'C#', 'libp2p', 'P2P', 'IPFS'],
    github: 'https://github.com/leny62/universal-connectivity',
    liveUrl: '',
    features: [
      'Direct peer-to-peer messaging',
      'NAT traversal with AutoNAT',
      'End-to-end encryption',
      'Multi-platform support (Windows, macOS, Linux)',
      'Offline message queueing',
    ],
    technologies: {
      frontend: ['Blazor', 'CSS', 'SignalR'],
      backend: ['.NET 8', 'C#', 'libp2p', 'Protocol Buffers'],
      devops: ['GitHub Actions', 'Docker'],
    },
  },
  {
    id: 3,
    title: 'Diabetes MIS',
    description:
      'A comprehensive Diabetes Management Information System used across all hospitals in Rwanda, serving over 1000 patients with tracking and reporting capabilities.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Healthcare'],
    github: '',
    liveUrl: '',
    features: [
      'Patient record management',
      'Treatment tracking',
      'Appointment scheduling',
      'Medication management',
      'Analytics and reporting',
    ],
    technologies: {
      frontend: ['React', 'Redux', 'Bootstrap', 'Chart.js'],
      backend: ['Node.js', 'Express', 'MongoDB', 'JWT Auth'],
      devops: ['PM2', 'Nginx', 'Linux'],
    },
  },
  {
    id: 4,
    title: 'S3 to Filecoin Migration Tool',
    description:
      'A TypeScript utility for seamlessly migrating data from AWS S3 (and compatible services) to Filecoin storage while preserving metadata.',
    tags: ['TypeScript', 'Filecoin', 'IPFS', 'AWS S3', 'Web3'],
    github: 'https://github.com/HarshS1611/storacha-migration-tool',
    liveUrl: '',
    features: [
      'Batch migration of S3 objects',
      'Metadata preservation',
      'Progress tracking and resumability',
      'Verification of stored data',
      'CLI and programmatic API',
    ],
    technologies: {
      frontend: ['React', 'TypeScript', 'Material UI'],
      backend: ['Node.js', 'TypeScript', 'AWS SDK', 'Filecoin.js'],
      devops: ['GitHub Actions', 'NPM'],
    },
  },
  {
    id: 5,
    title: 'Hospitality EPoS',
    description:
      'A cross-platform Electronic Point of Sale system for hospitality businesses, enabling complete stock management and reporting.',
    tags: ['React Native', '.NET', 'SQL Server', 'Mobile', 'Web'],
    github: '',
    liveUrl: '',
    features: [
      'Order management',
      'Inventory tracking',
      'Staff management',
      'Sales reporting',
      'Customer loyalty program',
    ],
    technologies: {
      frontend: ['React Native', 'Redux', 'Styled Components'],
      backend: ['.NET Core', 'C#', 'SQL Server', 'Entity Framework'],
      devops: ['Azure DevOps', 'App Center'],
    },
  },
];

const STACKS = [
  { key: 'frontend', label: 'Frontend', color: 'text-neon-blue', border: 'border-neon-blue' },
  { key: 'backend', label: 'Backend', color: 'text-neon-green', border: 'border-neon-green' },
  { key: 'devops', label: 'DevOps', color: 'text-neon-purple', border: 'border-neon-purple' },
] as const;

function tagStyle(tag: string) {
  if (tag.includes('React') || tag.includes('Next.js'))
    return 'bg-dark-purple text-neon-pink';
  if (tag.includes('.NET') || tag.includes('C#')) return 'bg-dark-blue text-neon-teal';
  if (tag.includes('TypeScript') || tag.includes('JavaScript'))
    return 'bg-dark-teal text-neon-orange';
  return 'bg-dark-purple text-neon-yellow';
}

export default function ProjectsContent() {
  const [current, setCurrent] = useState(0);
  const [detail, setDetail] = useState(false);
  const [direction, setDirection] = useState(0);

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setCurrent((next + projects.length) % projects.length);
  }, []);

  const next = useCallback(() => go(current + 1, 1), [current, go]);
  const prev = useCallback(() => go(current - 1, -1), [current, go]);

  const project = projects[current];
  const sectionRef = useSectionTracking<HTMLDivElement>('project-arcade');

  const slug = (title: string) => title.toLowerCase().replace(/\s+/g, '-');

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 600 : -600, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 600 : -600, opacity: 0 }),
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <PageHeader title="PROJECT ARCADE" subtitle="My featured development work" />

        <div ref={sectionRef} className="relative mx-auto max-w-6xl">
          <section
            aria-roledescription="carousel"
            aria-label="Featured projects"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') {
                e.preventDefault();
                next();
              } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prev();
              }
            }}
            className="arcade-panel pixel-corners relative overflow-hidden border-neon-purple p-4 md:p-8"
          >
            <div className="scanline" aria-hidden="true" />

            <div className="relative z-10 min-h-[34rem]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 32 },
                    opacity: { duration: 0.18 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80) next();
                    else if (info.offset.x > 80) prev();
                  }}
                  className="w-full cursor-grab active:cursor-grabbing"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="relative flex h-56 items-center justify-center overflow-hidden border-2 border-accent bg-surface-muted pixel-corners md:h-auto md:min-h-[16rem]">
                      <FaLaptopCode className="text-6xl text-accent" aria-hidden="true" />
                    </div>

                    <div className="flex flex-col">
                      <h2 className="mb-3 font-arcade text-lg text-neon-green md:text-xl">
                        {project.title}
                      </h2>
                      <p className="mb-5 font-pixel text-lg text-text-muted">
                        {project.description}
                      </p>

                      <div className="mb-5">
                        <p className="mb-2 flex items-center gap-2 font-arcade text-[0.6rem] text-neon-yellow">
                          <FaTags aria-hidden="true" /> TECH STACK
                        </p>
                        <ul className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <li
                              key={tag}
                              className={`rounded-full border border-border-strong px-3 py-1 font-pixel text-sm ${tagStyle(tag)}`}
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            if (!detail) {
                              trackClick(`project-details-${slug(project.title)}`);
                            }
                            setDetail((v) => !v);
                          }}
                          aria-expanded={detail}
                          aria-controls="project-detail"
                          className="arcade-btn arcade-btn-ghost pixel-corners px-4 py-2 text-[0.6rem]"
                        >
                          <FaCode aria-hidden="true" />
                          {detail ? 'Hide details' : 'View details'}
                        </button>

                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              trackOutbound(
                                `project-github-${slug(project.title)}`,
                                project.github
                              )
                            }
                            className="arcade-btn pixel-corners px-4 py-2 text-[0.6rem]"
                          >
                            <FaGithub aria-hidden="true" />
                            GitHub
                          </a>
                        )}

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              trackOutbound(
                                `project-live-${slug(project.title)}`,
                                project.liveUrl
                              )
                            }
                            className="arcade-btn pixel-corners px-4 py-2 text-[0.6rem]"
                          >
                            <FaExternalLinkAlt aria-hidden="true" />
                            Live demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {detail && (
                      <motion.div
                        id="project-detail"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 border-t-2 border-border pt-5">
                          <h3 className="mb-3 font-arcade text-xs text-neon-yellow">
                            KEY FEATURES
                          </h3>
                          <ul className="mb-6 grid grid-cols-1 gap-2 md:grid-cols-2">
                            {project.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-2 font-pixel text-lg text-text-muted"
                              >
                                <span className="mt-1 text-neon-green" aria-hidden="true">
                                  ›
                                </span>
                                {feature}
                              </li>
                            ))}
                          </ul>

                          <h3 className="mb-3 font-arcade text-xs text-neon-yellow">
                            TECHNOLOGY BREAKDOWN
                          </h3>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {STACKS.map((stack) => (
                              <div
                                key={stack.key}
                                className={`border-2 bg-surface-muted p-4 pixel-corners dark:bg-black/40 ${stack.border}`}
                              >
                                <h4
                                  className={`mb-3 font-arcade text-[0.6rem] ${stack.color}`}
                                >
                                  {stack.label}
                                </h4>
                                <ul className="space-y-1">
                                  {project.technologies[stack.key].map((tech) => (
                                    <li
                                      key={tech}
                                      className="font-pixel text-base text-text-muted"
                                    >
                                      <span className={stack.color} aria-hidden="true">
                                        •
                                      </span>{' '}
                                      {tech}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={prev}
              aria-label="Previous project"
              className="arcade-panel pixel-corners absolute left-2 top-1/2 z-20 -translate-y-1/2 p-3 text-accent transition-transform hover:scale-110"
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next project"
              className="arcade-panel pixel-corners absolute right-2 top-1/2 z-20 -translate-y-1/2 p-3 text-accent transition-transform hover:scale-110"
            >
              <FaChevronRight />
            </button>
          </section>

          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="flex">
              {projects.map((p, index) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => go(index, index > current ? 1 : -1)}
                  aria-label={`Go to ${p.title}`}
                  aria-current={current === index}
                  className="group flex h-11 w-8 items-center justify-center"
                >
                  {/* Dot is decorative; the button around it carries the hit area. */}
                  <span
                    className={`h-3 w-3 rounded-full border-2 transition-all ${
                      current === index
                        ? 'scale-125 border-neon-green bg-neon-green'
                        : 'border-border-strong bg-transparent group-hover:border-accent'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Announce slide changes; the old carousel was silent to screen readers. */}
            <p aria-live="polite" className="font-arcade text-[0.6rem] text-neon-yellow">
              PROJECT {current + 1} / {projects.length}
            </p>
            <p className="font-pixel text-base text-text-muted">
              Swipe, or use &larr; and &rarr; keys
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
