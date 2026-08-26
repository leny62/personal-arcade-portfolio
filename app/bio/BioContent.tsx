'use client';

import { motion } from 'framer-motion';
import { FaUser, FaGraduationCap, FaCode } from 'react-icons/fa';
import PageHeader from '../components/ui/PageHeader';

const stats = [
  { label: 'NAME', value: 'Leny Pascal IHIRWE' },
  { label: 'CLASS', value: 'Software Engineer' },
  { label: 'SPECIALIZATION', value: 'Full-Stack Development' },
  { label: 'LOCATION', value: 'Kigali, Rwanda / Remote' },
];

const languages = ['C#', 'JavaScript', 'TypeScript', 'Python', 'Ruby', 'Java'];

const education = [
  {
    school: 'The African Leadership University',
    detail: 'B.Sc. with Honors in Software Engineering (2023 – 2025)',
    note: 'Core coursework: Algorithms and Data Structures, Web Development & Infrastructure, Machine Learning, Leadership & Entrepreneurship',
  },
  {
    school: 'Frankfurt School Blockchain Center',
    detail: 'ReFi Talents Program (2024)',
    note: 'An 18-week intensive program covering regenerative finance, blockchain technology, and sustainable finance',
  },
  {
    school: 'Google Generative AI Fundamentals',
    detail: 'Kaggle (2024)',
    note: 'Hands-on course covering LLMs, generative AI applications, model fine-tuning, and AI evaluation methods',
  },
];

const certifications = [
  'IQBBA Agile Business Analysis',
  'TMAP Quality Engineer for cross-functional teams',
  'ISTQB Software Testing',
  'ISOC Network Operation',
  'EOSIO Blockchain development',
];

const story = [
  'I am an experienced full-stack developer with a robust background in designing secure, scalable web applications and distributed systems. My work has been driven by a interest in solving real problems rather than chasing novelty.',
  'With expertise in modern JavaScript frameworks, .NET technologies, and cloud-based architectures, I have contributed to projects ranging from enterprise applications to Web3 implementations. My work with Protocol Labs deepened my understanding of decentralized systems and peer-to-peer technologies.',
  'I am recognized for delivering client-oriented, high-quality solutions and for leading cross-functional teams in agile environments. My approach combines technical depth with creative problem-solving, keeping the end-user experience central to development decisions.',
  'Outside of work I explore new technologies, contribute to open source, and share what I learn with the developer community.',
];

export default function BioContent() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <PageHeader title="PLAYER PROFILE" subtitle="The story behind the developer" />

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            aria-labelledby="stats-heading"
            className="arcade-panel pixel-corners p-6"
          >
            <div className="mb-6 flex items-center gap-3">
              <FaUser className="text-2xl text-neon-blue" aria-hidden="true" />
              <h2 id="stats-heading" className="font-arcade text-lg text-text">
                STATS
              </h2>
            </div>

            <dl className="space-y-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="mb-1 font-pixel text-sm text-neon-green">{s.label}</dt>
                  <dd className="font-pixel text-lg text-text">{s.value}</dd>
                </div>
              ))}
              <div>
                <dt className="mb-2 font-pixel text-sm text-neon-green">LANGUAGES</dt>
                <dd className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <span
                      key={lang}
                      className="border border-border-strong bg-dark-purple px-2 py-1 font-pixel text-sm text-neon-yellow"
                    >
                      {lang}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            aria-labelledby="backstory-heading"
            className="arcade-panel pixel-corners p-6 lg:col-span-2"
          >
            <div className="mb-6 flex items-center gap-3">
              <FaCode className="text-2xl text-neon-pink" aria-hidden="true" />
              <h2 id="backstory-heading" className="font-arcade text-lg text-text">
                BACKSTORY
              </h2>
            </div>

            <div className="space-y-5 font-pixel text-lg text-text-muted">
              {story.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            aria-labelledby="education-heading"
            className="arcade-panel pixel-corners p-6 lg:col-span-3"
          >
            <div className="mb-6 flex items-center gap-3">
              <FaGraduationCap className="text-2xl text-neon-green" aria-hidden="true" />
              <h2 id="education-heading" className="font-arcade text-lg text-text">
                EDUCATION & TRAINING
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {education.map((e) => (
                <div key={e.school} className="border-l-4 border-neon-green pl-4">
                  <h3 className="mb-2 font-arcade text-sm text-neon-yellow">{e.school}</h3>
                  <p className="font-pixel text-lg text-text">{e.detail}</p>
                  <p className="mt-2 font-pixel text-base text-text-muted">{e.note}</p>
                </div>
              ))}

              <div className="border-l-4 border-neon-green pl-4">
                <h3 className="mb-2 font-arcade text-sm text-neon-yellow">
                  Certifications
                </h3>
                <ul className="list-inside list-disc font-pixel text-lg text-text-muted">
                  {certifications.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
