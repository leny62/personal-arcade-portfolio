'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCode,
  FaDatabase,
  FaServer,
  FaTools,
  FaCloud,
  FaMobileAlt,
  FaDesktop,
  FaLaptopCode,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';
import PageHeader from '../components/ui/PageHeader';
import { accent, type NeonColor } from '@/lib/arcade';

interface Category {
  id: string;
  name: string;
  icon: IconType;
  color: NeonColor;
  skills: { name: string; level: number }[];
}

const skillCategories: Category[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: FaDesktop,
    color: 'neon-blue',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'JavaScript', level: 95 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Redux', level: 80 },
      { name: 'Framer Motion', level: 75 },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: FaServer,
    color: 'neon-green',
    skills: [
      { name: '.NET Core/8', level: 90 },
      { name: 'C#', level: 90 },
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 80 },
      { name: 'NestJS', level: 75 },
      { name: 'GraphQL', level: 70 },
      { name: 'REST API Design', level: 90 },
    ],
  },
  {
    id: 'database',
    name: 'Database',
    icon: FaDatabase,
    color: 'neon-purple',
    skills: [
      { name: 'SQL Server', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'MongoDB', level: 75 },
      { name: 'Redis', level: 70 },
      { name: 'Entity Framework', level: 85 },
      { name: 'Prisma', level: 75 },
    ],
  },
  {
    id: 'mobile',
    name: 'Mobile',
    icon: FaMobileAlt,
    color: 'neon-pink',
    skills: [
      { name: 'React Native', level: 80 },
      { name: 'Expo', level: 75 },
      { name: 'Mobile UI Design', level: 70 },
      { name: 'App Performance', level: 65 },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps',
    icon: FaCloud,
    color: 'neon-yellow',
    skills: [
      { name: 'Docker', level: 80 },
      { name: 'CI/CD', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'Azure', level: 65 },
      { name: 'GCP', level: 60 },
      { name: 'Kubernetes', level: 55 },
    ],
  },
  {
    id: 'web3',
    name: 'Web3',
    icon: FaLaptopCode,
    color: 'neon-orange',
    skills: [
      { name: 'libp2p', level: 80 },
      { name: 'IPFS', level: 75 },
      { name: 'Filecoin', level: 70 },
      { name: 'Ethereum', level: 65 },
      { name: 'Smart Contracts', level: 60 },
    ],
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: FaTools,
    color: 'neon-cyan',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'VS Code', level: 95 },
      { name: 'Visual Studio', level: 85 },
      { name: 'Jira', level: 80 },
      { name: 'Figma', level: 75 },
      { name: 'Postman', level: 85 },
    ],
  },
  {
    id: 'languages',
    name: 'Languages',
    icon: FaCode,
    color: 'neon-red',
    skills: [
      { name: 'C#', level: 90 },
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'SQL', level: 80 },
      { name: 'Python', level: 70 },
    ],
  },
];

const RANKS = [
  { name: 'Apprentice', range: '< 60', color: 'neon-orange' as NeonColor },
  { name: 'Adept', range: '60-74', color: 'neon-blue' as NeonColor },
  { name: 'Expert', range: '75-84', color: 'neon-green' as NeonColor },
  { name: 'Master', range: '85-94', color: 'neon-purple' as NeonColor },
  { name: 'Grandmaster', range: '95-100', color: 'neon-yellow' as NeonColor },
];

function rankFor(level: number) {
  if (level < 60) return 'Apprentice';
  if (level < 75) return 'Adept';
  if (level < 85) return 'Expert';
  if (level < 95) return 'Master';
  return 'Grandmaster';
}

export default function SkillsContent() {
  const [activeId, setActiveId] = useState(skillCategories[0].id);
  const active = skillCategories.find((c) => c.id === activeId)!;
  const ActiveIcon = active.icon;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <PageHeader title="SKILL TREE" subtitle="Technical abilities and power-ups" />

        <div className="mx-auto mb-10 max-w-5xl">
          {/* Tabs: arrow keys move between them, as the arcade framing implies. */}
          <div
            role="tablist"
            aria-label="Skill categories"
            className="grid grid-cols-2 gap-2 sm:grid-cols-4"
          >
            {skillCategories.map((category, index) => {
              const isActive = activeId === category.id;
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  role="tab"
                  id={`tab-${category.id}`}
                  aria-selected={isActive}
                  aria-controls="skill-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveId(category.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                      e.preventDefault();
                      const dir = e.key === 'ArrowRight' ? 1 : -1;
                      const next =
                        (index + dir + skillCategories.length) % skillCategories.length;
                      setActiveId(skillCategories[next].id);
                      document.getElementById(`tab-${skillCategories[next].id}`)?.focus();
                    }
                  }}
                  style={accent(category.color)}
                  className={`flex flex-col items-center justify-center gap-2 border-2 p-3 pixel-corners transition-all duration-200 ${
                    isActive
                      ? 'border-(--accent) bg-(--accent)/15 text-(--accent)'
                      : 'border-border-strong text-text-muted hover:border-(--accent) hover:text-(--accent)'
                  }`}
                >
                  <Icon className="text-xl" aria-hidden="true" />
                  <span className="font-arcade text-[0.6rem]">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.section
          key={active.id}
          id="skill-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={accent(active.color)}
          className="mx-auto max-w-4xl"
        >
          <div className="arcade-panel pixel-corners mb-6 border-(--accent) p-6">
            <div className="mb-6 flex items-center gap-3">
              <ActiveIcon className="text-2xl text-(--accent)" aria-hidden="true" />
              <h2 className="font-arcade text-base text-(--accent)">
                {active.name} Skills
              </h2>
            </div>

            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {active.skills.map((skill, index) => (
                <li key={skill.name}>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="font-pixel text-lg text-text">{skill.name}</span>
                    <span className="font-pixel text-base text-text-muted">
                      {rankFor(skill.level)}
                      <span className="ml-2 text-(--accent)">{skill.level}</span>
                    </span>
                  </div>

                  <div
                    className="h-4 overflow-hidden border-2 border-border-strong bg-surface-muted pixel-corners"
                    role="meter"
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name}: ${rankFor(skill.level)}`}
                  >
                    {/* whileInView, not animate: bars used to finish before you
                        ever scrolled to them. */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.8, delay: Math.min(index * 0.06, 0.4) }}
                      className="h-full bg-(--accent)"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="arcade-panel pixel-corners p-4">
            <h3 className="mb-3 font-arcade text-xs text-text">SKILL LEVELS</h3>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-5">
              {RANKS.map((rank) => (
                <li
                  key={rank.name}
                  style={accent(rank.color)}
                  className="flex flex-col items-center text-center"
                >
                  <span className="font-arcade text-[0.6rem] text-(--accent)">
                    {rank.name}
                  </span>
                  <span className="font-pixel text-sm text-text-muted">{rank.range}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
