'use client';

import { motion } from 'framer-motion';
import { FaUser, FaGraduationCap, FaCode } from 'react-icons/fa';

export default function BioPage() {
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
            PLAYER PROFILE
          </h1>
          <p className="text-lg font-pixel text-gray-300">
            The story behind the developer
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Character Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-black bg-opacity-70 border-2 border-neon-blue p-6 rounded pixel-corners"
          >
            <div className="flex items-center mb-6">
              <FaUser className="text-neon-blue text-3xl mr-4" />
              <h2 className="text-2xl font-arcade text-white">STATS</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-neon-green font-pixel mb-1">NAME</p>
                <p className="text-white font-pixel text-lg">Leny Pascal IHIRWE</p>
              </div>
              
              <div>
                <p className="text-neon-green font-pixel mb-1">CLASS</p>
                <p className="text-white font-pixel text-lg">Software Engineer</p>
              </div>
              
              <div>
                <p className="text-neon-green font-pixel mb-1">SPECIALIZATION</p>
                <p className="text-white font-pixel text-lg">Full-Stack Development</p>
              </div>
              
              <div>
                <p className="text-neon-green font-pixel mb-1">LOCATION</p>
                <p className="text-white font-pixel text-lg">Remote</p>
              </div>
              
              <div>
                <p className="text-neon-green font-pixel mb-1">LANGUAGES</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-dark-purple px-2 py-1 text-neon-yellow font-pixel text-sm">C#</span>
                  <span className="bg-dark-purple px-2 py-1 text-neon-yellow font-pixel text-sm">JavaScript</span>
                  <span className="bg-dark-purple px-2 py-1 text-neon-yellow font-pixel text-sm">TypeScript</span>
                  <span className="bg-dark-purple px-2 py-1 text-neon-yellow font-pixel text-sm">Python</span>
                  <span className="bg-dark-purple px-2 py-1 text-neon-yellow font-pixel text-sm">Ruby</span>
                  <span className="bg-dark-purple px-2 py-1 text-neon-yellow font-pixel text-sm">Java</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio Story */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black bg-opacity-70 border-2 border-neon-pink p-6 rounded pixel-corners lg:col-span-2"
          >
            <div className="flex items-center mb-6">
              <FaCode className="text-neon-pink text-3xl mr-4" />
              <h2 className="text-2xl font-arcade text-white">BACKSTORY</h2>
            </div>

            <div className="space-y-6 font-pixel text-gray-200">
              <p>
                I am an experienced Full-Stack Developer with a robust background in designing secure, 
                scalable web applications and distributed systems. My journey in software development 
                has been driven by a passion for creating innovative solutions that solve real-world problems.
              </p>
              
              <p>
                With expertise in modern JavaScript frameworks, .NET technologies, and cloud-based architectures, 
                I&apos;ve contributed to projects ranging from enterprise-level applications to cutting-edge Web3 
                implementations. My work with Protocol Labs has deepened my understanding of decentralized 
                systems and peer-to-peer technologies.
              </p>
              
              <p>
                I&apos;m recognized for delivering client-oriented, high-quality solutions and leading cross-functional 
                teams in agile environments. My approach combines technical excellence with creative problem-solving, 
                always keeping the end-user experience at the forefront of development decisions.
              </p>
              
              <p>
                When I&apos;m not coding, I enjoy exploring new technologies, contributing to open-source projects, 
                and sharing knowledge with the developer community. I believe in continuous learning and staying 
                at the cutting edge of technological advancements.
              </p>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-black bg-opacity-70 border-2 border-neon-green p-6 rounded pixel-corners lg:col-span-3"
          >
            <div className="flex items-center mb-6">
              <FaGraduationCap className="text-neon-green text-3xl mr-4" />
              <h2 className="text-2xl font-arcade text-white">EDUCATION & TRAINING</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-2 border-neon-green pl-4">
                <h3 className="text-neon-yellow font-arcade text-lg mb-2">The African Leadership University</h3>
                <p className="text-white font-pixel">B.Sc. with Honors in Software Engineering (2023 – 2025)</p>
                <p className="text-gray-400 font-pixel mt-2">
                  Core Coursework: Algorithms and Data Structures, Web Development & Infrastructure, 
                  Machine Learning, Leadership & Entrepreneurship
                </p>
              </div>
              
              <div className="border-l-2 border-neon-green pl-4">
                <h3 className="text-neon-yellow font-arcade text-lg mb-2">Frankfurt School Blockchain Center</h3>
                <p className="text-white font-pixel">ReFi Talents Program (2024)</p>
                <p className="text-gray-400 font-pixel mt-2">
                  Completed an 18-week intensive program focused on regenerative finance (ReFi), 
                  blockchain technology, and sustainable finance
                </p>
              </div>
              
              <div className="border-l-2 border-neon-green pl-4">
                <h3 className="text-neon-yellow font-arcade text-lg mb-2">Google Generative AI Fundamentals</h3>
                <p className="text-white font-pixel">Kaggle (2024)</p>
                <p className="text-gray-400 font-pixel mt-2">
                  Hands-on course covering LLMs, generative AI applications, model fine-tuning, 
                  and AI evaluation methods
                </p>
              </div>
              
              <div className="border-l-2 border-neon-green pl-4">
                <h3 className="text-neon-yellow font-arcade text-lg mb-2">Certifications</h3>
                <ul className="text-gray-300 font-pixel list-disc list-inside">
                  <li>IQBBA Agile Business Analysis</li>
                  <li>TMAP Quality Engineer for cross-functional teams</li>
                  <li>ISTQB Software Testing</li>
                  <li>ISOC Network Operation</li>
                  <li>EOSIO Blockchain development</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 