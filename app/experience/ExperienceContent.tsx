'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTrophy,
  FaChevronDown,
} from 'react-icons/fa';
import PageHeader from '../components/ui/PageHeader';

const experiences = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Bouletteproof',
    location: 'Port-Louis, Remote',
    period: 'August 2023 – present',
    start: '2023',
    achievements: [
      "Engineering 'Tonza Deals,' a customer engagement and loyalty platform leveraging Next.js for the front-end, Nest.js for the back-end, PostgreSQL for database management, and Stripe for subscription services",
      'Empowering brands to retarget, reward, and remarket to customers while improving marketing capabilities',
      'Developed a lead management SaaS using Next.js, Node.js, and GCP, resulting in streamlined lead conversion',
    ],
  },
  {
    id: 2,
    title: 'Open Source Contributor',
    company: 'Protocol Labs Dev Guild',
    location: 'Remote',
    period: 'January 2025 – present',
    start: '2025',
    achievements: [
      'Developed a .NET 8 chat app on libp2p, enhancing cross-platform P2P communication with TCP/QUIC, PubSub messaging, and mDNS-based discovery across multiple languages',
      'Engineered TypeScript tools to seamlessly migrate data from AWS S3 (and compatible services) to Storacha hot storage, implementing protocol compatibility and preserving UnixFS metadata',
    ],
  },
  {
    id: 3,
    title: 'Frontend Developer',
    company: 'Just Slide Media',
    location: 'Los Angeles, California, United States',
    period: 'November 2022 – June 2024',
    start: '2022',
    achievements: [
      'Developed more than 50 distinctive marketing landing pages and websites tailored for diverse telecommunication and tech firms',
      'Administered SEO analytics tools for multiple websites, fine-tuning their metadata to enhance search engine visibility and performance',
      'Collaborated with brands including AKKO, Boost Mobile, Boost Infinite, OnTech Deals, Curbio, Lendingslide, Win The Showcase, and Polygraf AI',
    ],
  },
  {
    id: 4,
    title: 'Software Engineer',
    company: 'Objectivity',
    location: 'Coventry, England, Remote',
    period: 'February 2023 – August 2023',
    start: '2023',
    achievements: [
      'Engineered a cross-platform Hospitality EPoS, enabling complete stock management and reporting with React Native and .NET',
    ],
  },
  {
    id: 5,
    title: 'Engineering Lead',
    company: 'Karisimbi Technology Solutions',
    location: 'Kigali, Rwanda',
    period: 'March 2022 – February 2023',
    start: '2022',
    achievements: [
      'Pioneered the development and successful deployment of a Diabetes Management Information System used across all hospitals in Rwanda, serving over 1000 patients',
      'Oversaw program verification and deployment, ensuring seamless operations',
      'Led the development of electronic medical records software used by over 30 clinics across Rwanda',
    ],
  },
  {
    id: 6,
    title: 'Technical Team Lead',
    company: 'Andela',
    location: 'Kigali, Rwanda',
    period: 'March 2022 – August 2022',
    start: '2022',
    achievements: [
      'Oversaw the work of trainees, ensuring high-quality work outputs',
      'Coordinated daily SCRUM ceremonies and conducted standups, promoting efficient teamwork',
      'Prepared demos with trainees and reported their performance, leading to the successful delivery of a real MVP project by a team of 15 software developers',
      'Evaluated trainees based on learning outcomes, guiding their skill development',
    ],
  },
  {
    id: 7,
    title: 'AEM Developer',
    company: 'CodeLand S.r.I',
    location: 'Milan, Italy',
    period: 'November 2021 – February 2022',
    start: '2021',
    achievements: [
      'Enhanced the user and editor experience on the Unicredit Bank website using AEM (Adobe Experience Manager), Java, and XML',
    ],
  },
];

export default function ExperienceContent() {
  const [selected, setSelected] = useState<number | null>(experiences[0].id);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <PageHeader
          title="CAREER QUESTS"
          subtitle="My professional journey and achievements"
        />

        <div className="mx-auto max-w-5xl">
          {/* Timeline. Labels alternate above and below the rail so they stop
              colliding at narrow widths. */}
          <div className="relative mb-16 hidden py-10 md:block">
            <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-border-strong" />

            <ol className="relative flex justify-between">
              {experiences.map((exp, index) => {
                const isSelected = selected === exp.id;
                const above = index % 2 === 0;
                return (
                  <li key={exp.id} className="relative">
                    <button
                      type="button"
                      onClick={() => setSelected(isSelected ? null : exp.id)}
                      aria-label={`${exp.title} at ${exp.company}, ${exp.period}`}
                      aria-pressed={isSelected}
                      className={`block h-5 w-5 rounded-full border-2 transition-transform duration-200 hover:scale-125 ${
                        isSelected
                          ? 'scale-125 border-neon-green bg-neon-green'
                          : 'border-accent bg-surface-raised'
                      }`}
                    />
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-pixel text-sm ${
                        above ? '-top-8' : 'top-8'
                      } ${isSelected ? 'text-neon-green' : 'text-text-muted'}`}
                    >
                      {exp.start}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {experiences.map((exp, index) => {
              const isSelected = selected === exp.id;
              const panelId = `exp-panel-${exp.id}`;
              return (
                <motion.article
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.25) }}
                  className={`arcade-panel pixel-corners p-6 transition-colors ${
                    isSelected ? 'border-neon-green' : 'border-border-strong'
                  }`}
                >
                  <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                    <div className="flex items-center gap-3">
                      <FaBriefcase className="text-xl text-accent" aria-hidden="true" />
                      <h2 className="font-arcade text-sm text-text md:text-base">
                        {exp.title}
                      </h2>
                    </div>
                    <p className="flex items-center gap-2 font-pixel text-base text-neon-yellow">
                      <FaCalendarAlt aria-hidden="true" />
                      {exp.period}
                    </p>
                  </div>

                  <div className="mb-4 space-y-1">
                    <p className="flex items-center gap-2 font-pixel text-lg text-neon-pink">
                      <FaBuilding aria-hidden="true" />
                      {exp.company}
                    </p>
                    <p className="flex items-center gap-2 font-pixel text-base text-text-muted">
                      <FaMapMarkerAlt aria-hidden="true" />
                      {exp.location}
                    </p>
                  </div>

                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        id={panelId}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t-2 border-border pt-4">
                          <h3 className="mb-3 flex items-center gap-2 font-arcade text-xs text-neon-green">
                            <FaTrophy aria-hidden="true" /> ACHIEVEMENTS
                          </h3>
                          <ul className="space-y-3">
                            {exp.achievements.map((achievement, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 font-pixel text-lg text-text-muted"
                              >
                                <span className="mt-1 text-accent" aria-hidden="true">
                                  ›
                                </span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={() => setSelected(isSelected ? null : exp.id)}
                    aria-expanded={isSelected}
                    aria-controls={panelId}
                    className="mt-4 flex w-full items-center justify-center gap-2 border-t-2 border-border pt-3 font-pixel text-base text-text-muted transition-colors hover:text-accent"
                  >
                    {isSelected ? 'Collapse' : 'View achievements'}
                    <FaChevronDown
                      className={`transition-transform duration-200 ${
                        isSelected ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
