'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaBuilding, FaCalendarAlt, FaMapMarkerAlt, FaTrophy } from 'react-icons/fa';

const experiences = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Bouletteproof",
    location: "Port-louis, Remote",
    period: "August 2023 – present",
    achievements: [
      "Engineering 'Tonza Deals,' a customer engagement and loyalty platform leveraging Next.js for the front-end, Nest.js for the back-end, PostgreSQL for database management, and Stripe for subscription services",
      "Empowering brands to retarget, reward, and remarket to customers while improving marketing capabilities",
      "Developed a lead management SaaS using Next.js, Node.js, and GCP, resulting in streamlined lead conversion"
    ]
  },
  {
    id: 2,
    title: "Open Source Contributor",
    company: "Protocol Labs Dev Guild",
    location: "Remote",
    period: "January 2025 – present",
    achievements: [
      "Developed a .NET 8 chat app on libp2p, enhancing cross-platform P2P communication with TCP/QUIC, PubSub messaging, and mDNS-based discovery across multiple languages",
      "Engineered TypeScript tools to seamlessly migrate data from AWS S3 (and compatible services) to Storacha hot storage, implementing protocol compatibility and preserving UnixFS metadata"
    ]
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "Just Slide Media",
    location: "Los Angeles, California, United States",
    period: "November 2022 – June 2024",
    achievements: [
      "Developed more than 50 distinctive marketing landing pages and websites tailored for diverse telecommunication and tech firms",
      "Administered SEO analytics tools for multiple websites, fine-tuning their metadata to enhance search engine visibility and performance",
      "Collaborated with brands including AKKO, Boost Mobile, Boost Infinite, OnTech Deals, Curbio, Lendingslide, Win The Showcase, and Polygraf AI"
    ]
  },
  {
    id: 4,
    title: "Software Engineer",
    company: "Objectivity",
    location: "Coventry, England, Remote",
    period: "February 2023 – August 2023",
    achievements: [
      "Engineered a cross-platform Hospitality EPoS, enabling complete Stock management and reporting with React Native and .NET"
    ]
  },
  {
    id: 5,
    title: "Engineering Lead",
    company: "Karisimbi Technology Solutions",
    location: "Kigali, Rwanda",
    period: "March 2022 – February 2023",
    achievements: [
      "Pioneered the development and successful deployment of a Diabetes Management Information System (MIS) used across all hospitals in Rwanda and serves over 1000 patients",
      "Oversaw program verification and deployment, ensuring seamless operations",
      "Led the development of an electronic medical records software that is used by over 30 clinics across Rwanda"
    ]
  },
  {
    id: 6,
    title: "Technical Team Lead",
    company: "Andela",
    location: "Kigali, Rwanda",
    period: "March 2022 – August 2022",
    achievements: [
      "Oversaw the work of trainees, ensuring high-quality work outputs",
      "Coordinated daily SCRUM ceremonies and conducted standups, promoting efficient teamwork",
      "Prepared demos with trainees and reported their performance, leading to the successful delivery of a real MVP project by a team of 15 software developers",
      "Evaluated trainees based on learning outcomes, guiding their skill development"
    ]
  },
  {
    id: 7,
    title: "AEM Developer",
    company: "CodeLand S.r.I",
    location: "Milan, Italy",
    period: "November 2021 – February 2022",
    achievements: [
      "Enhanced the user and editor experience on the Unicredit Bank website using AEM (Adobe Experience Manager), Java, and XML"
    ]
  }
];

export default function ExperiencePage() {
  const [selectedExp, setSelectedExp] = useState<number | null>(null);

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
            CAREER QUESTS
          </h1>
          <p className="text-lg font-pixel text-gray-300">
            My professional journey and achievements
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Timeline visualization */}
          <div className="relative mb-16 hidden md:block">
            <div className="absolute left-0 right-0 h-2 top-1/2 -translate-y-1/2 bg-dark-purple"></div>
            
            <div className="flex justify-between relative">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                  onClick={() => setSelectedExp(selectedExp === exp.id ? null : exp.id)}
                >
                  <div 
                    className={`w-6 h-6 rounded-full cursor-pointer transition-all duration-300 ${
                      selectedExp === exp.id ? 'bg-neon-green scale-125' : 'bg-neon-blue'
                    }`}
                  ></div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <p className="text-xs font-pixel text-gray-400">{exp.period.split('–')[0]}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Experience cards */}
          <div className="grid grid-cols-1 gap-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-black bg-opacity-70 border-2 p-6 rounded pixel-corners cursor-pointer transition-all duration-300 ${
                  selectedExp === exp.id 
                    ? 'border-neon-green transform scale-[1.02]' 
                    : 'border-neon-blue hover:border-neon-pink'
                }`}
                onClick={() => setSelectedExp(selectedExp === exp.id ? null : exp.id)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div className="flex items-center mb-3 md:mb-0">
                    <FaBriefcase className="text-neon-blue text-2xl mr-3" />
                    <h2 className="text-xl md:text-2xl font-arcade text-white">{exp.title}</h2>
                  </div>
                  
                  <div className="flex items-center text-neon-yellow font-pixel">
                    <FaCalendarAlt className="mr-2" />
                    <span>{exp.period}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <FaBuilding className="text-neon-pink mr-2" />
                    <p className="text-neon-pink font-pixel">{exp.company}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-gray-400 mr-2" />
                    <p className="text-gray-400 font-pixel">{exp.location}</p>
                  </div>
                </div>
                
                <AnimatePresence>
                  {selectedExp === exp.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-700">
                        <h3 className="flex items-center text-neon-green font-arcade text-lg mb-3">
                          <FaTrophy className="mr-2" /> Achievements
                        </h3>
                        <ul className="space-y-3">
                          {exp.achievements.map((achievement, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start font-pixel text-gray-200"
                            >
                              <span className="text-neon-blue mr-2 mt-1">›</span>
                              <span>{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="mt-4 text-center text-sm font-pixel text-gray-400">
                  {selectedExp === exp.id ? "Click to collapse" : "Click to expand"}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 