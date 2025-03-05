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
  FaLaptopCode 
} from 'react-icons/fa';

// Skill categories with their respective skills
const skillCategories = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: <FaDesktop className="text-2xl" />,
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
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: <FaServer className="text-2xl" />,
    color: 'neon-green',
    skills: [
      { name: '.NET Core/8', level: 90 },
      { name: 'C#', level: 90 },
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 80 },
      { name: 'NestJS', level: 75 },
      { name: 'GraphQL', level: 70 },
      { name: 'REST API Design', level: 90 },
    ]
  },
  {
    id: 'database',
    name: 'Database',
    icon: <FaDatabase className="text-2xl" />,
    color: 'neon-purple',
    skills: [
      { name: 'SQL Server', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'MongoDB', level: 75 },
      { name: 'Redis', level: 70 },
      { name: 'Entity Framework', level: 85 },
      { name: 'Prisma', level: 75 },
    ]
  },
  {
    id: 'mobile',
    name: 'Mobile',
    icon: <FaMobileAlt className="text-2xl" />,
    color: 'neon-pink',
    skills: [
      { name: 'React Native', level: 80 },
      { name: 'Expo', level: 75 },
      { name: 'Mobile UI Design', level: 70 },
      { name: 'App Performance', level: 65 },
    ]
  },
  {
    id: 'devops',
    name: 'DevOps',
    icon: <FaCloud className="text-2xl" />,
    color: 'neon-yellow',
    skills: [
      { name: 'Docker', level: 80 },
      { name: 'CI/CD', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'Azure', level: 65 },
      { name: 'GCP', level: 60 },
      { name: 'Kubernetes', level: 55 },
    ]
  },
  {
    id: 'web3',
    name: 'Web3',
    icon: <FaLaptopCode className="text-2xl" />,
    color: 'neon-orange',
    skills: [
      { name: 'libp2p', level: 80 },
      { name: 'IPFS', level: 75 },
      { name: 'Filecoin', level: 70 },
      { name: 'Ethereum', level: 65 },
      { name: 'Smart Contracts', level: 60 },
    ]
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: <FaTools className="text-2xl" />,
    color: 'neon-cyan',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'VS Code', level: 95 },
      { name: 'Visual Studio', level: 85 },
      { name: 'Jira', level: 80 },
      { name: 'Figma', level: 75 },
      { name: 'Postman', level: 85 },
    ]
  },
  {
    id: 'languages',
    name: 'Languages',
    icon: <FaCode className="text-2xl" />,
    color: 'neon-red',
    skills: [
      { name: 'C#', level: 90 },
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'SQL', level: 80 },
      { name: 'Python', level: 70 },
    ]
  }
];

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Get the active category data
  const activeCategoryData = skillCategories.find(cat => cat.id === activeCategory);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-arcade text-white neon-text mb-4">
            SKILL TREE
          </h1>
          <p className="text-lg font-pixel text-gray-300">
            Technical abilities and power-ups
          </p>
        </motion.div>

        {/* Skill Categories Navigation */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
            {skillCategories.map((category) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex flex-col items-center justify-center p-3 rounded pixel-corners transition-all duration-300 ${
                  activeCategory === category.id 
                    ? `bg-${category.color} bg-opacity-20 border-2 border-${category.color}` 
                    : 'bg-black bg-opacity-50 border-2 border-gray-700 hover:border-gray-500'
                }`}
              >
                <div className={`text-${category.color} mb-2`}>
                  {category.icon}
                </div>
                <span className={`text-sm font-arcade ${
                  activeCategory === category.id ? `text-${category.color}` : 'text-gray-400'
                }`}>
                  {category.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Active Category Skills */}
        {activeCategoryData && (
          <motion.div
            key={activeCategoryData.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className={`mb-8 p-4 border-2 border-${activeCategoryData.color} rounded pixel-corners bg-black bg-opacity-70`}>
              <div className="flex items-center mb-4">
                <div className={`text-${activeCategoryData.color} mr-3`}>
                  {activeCategoryData.icon}
                </div>
                <h2 className={`text-2xl font-arcade text-${activeCategoryData.color}`}>
                  {activeCategoryData.name} Skills
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeCategoryData.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-pixel text-white">{skill.name}</span>
                      <span className={`font-arcade text-${activeCategoryData.color} text-sm`}>
                        {skill.level}/100
                      </span>
                    </div>
                    
                    <div className="h-4 bg-gray-800 rounded-full overflow-hidden pixel-corners">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full bg-${activeCategoryData.color}`}
                      />
                    </div>
                    
                    {/* Skill level indicator */}
                    {hoveredSkill === skill.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`absolute -top-10 left-0 right-0 text-center p-2 bg-${activeCategoryData.color} bg-opacity-90 rounded pixel-corners text-black font-pixel text-sm z-10`}
                      >
                        {skill.level < 60 && "Apprentice"}
                        {skill.level >= 60 && skill.level < 75 && "Adept"}
                        {skill.level >= 75 && skill.level < 85 && "Expert"}
                        {skill.level >= 85 && skill.level < 95 && "Master"}
                        {skill.level >= 95 && "Grandmaster"}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Skill level legend */}
            <div className="bg-black bg-opacity-70 p-4 rounded pixel-corners border border-gray-700">
              <h3 className="text-lg font-arcade text-white mb-3">Skill Levels</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {[
                  { name: "Apprentice", range: "< 60", color: "gray-400" },
                  { name: "Adept", range: "60-74", color: "neon-blue" },
                  { name: "Expert", range: "75-84", color: "neon-green" },
                  { name: "Master", range: "85-94", color: "neon-purple" },
                  { name: "Grandmaster", range: "95-100", color: "neon-yellow" }
                ].map((level) => (
                  <div key={level.name} className="flex flex-col items-center">
                    <span className={`text-${level.color} font-arcade text-sm`}>{level.name}</span>
                    <span className="text-gray-500 text-xs font-pixel">{level.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 