'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaCode, 
  FaLaptopCode,
  FaChevronLeft,
  FaChevronRight,
  FaTags
} from 'react-icons/fa';

// Project data
const projects = [
  {
    id: 1,
    title: "Tonza Deals",
    description: "A customer engagement and loyalty platform that empowers brands to retarget, reward, and remarket to customers while improving marketing capabilities.",
    image: "/images/projects/tonza-deals.jpg",
    tags: ["Next.js", "Nest.js", "PostgreSQL", "Stripe", "TypeScript"],
    github: "",
    liveUrl: "https://tonzadeals.com",
    features: [
      "Customer loyalty program management",
      "Marketing campaign automation",
      "Analytics dashboard",
      "Subscription management via Stripe",
      "Multi-tenant architecture"
    ],
    technologies: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS", "Redux"],
      backend: ["Nest.js", "PostgreSQL", "Prisma", "JWT Auth"],
      devops: ["Docker", "GitHub Actions", "AWS"]
    }
  },
  {
    id: 2,
    title: ".NET libp2p Chat",
    description: "A cross-platform peer-to-peer chat application built on libp2p using .NET 8, enabling direct communication without centralized servers.",
    image: "/images/projects/libp2p-chat.jpg",
    tags: [".NET 8", "C#", "libp2p", "P2P", "IPFS"],
    github: "https://github.com/leny62/universal-connectivity",
    liveUrl: "",
    features: [
      "Direct peer-to-peer messaging",
      "NAT traversal with AutoNAT",
      "End-to-end encryption",
      "Multi-platform support (Windows, macOS, Linux)",
      "Offline message queueing"
    ],
    technologies: {
      frontend: ["Blazor", "CSS", "SignalR"],
      backend: [".NET 8", "C#", "libp2p", "Protocol Buffers"],
      devops: ["GitHub Actions", "Docker"]
    }
  },
  {
    id: 3,
    title: "Diabetes MIS",
    description: "A comprehensive Diabetes Management Information System used across all hospitals in Rwanda, serving over 1000 patients with tracking and reporting capabilities.",
    image: "/images/projects/diabetes-mis.jpg",
    tags: ["React", "Node.js", "MongoDB", "Express", "Healthcare"],
    github: "",
    liveUrl: "",
    features: [
      "Patient record management",
      "Treatment tracking",
      "Appointment scheduling",
      "Medication management",
      "Analytics and reporting"
    ],
    technologies: {
      frontend: ["React", "Redux", "Bootstrap", "Chart.js"],
      backend: ["Node.js", "Express", "MongoDB", "JWT Auth"],
      devops: ["PM2", "Nginx", "Linux"]
    }
  },
  {
    id: 4,
    title: "S3 to Filecoin Migration Tool",
    description: "A TypeScript utility for seamlessly migrating data from AWS S3 (and compatible services) to Filecoin storage while preserving metadata.",
    image: "/images/projects/s3-filecoin.jpg",
    tags: ["TypeScript", "Filecoin", "IPFS", "AWS S3", "Web3"],
    github: "https://github.com/HarshS1611/storacha-migration-tool",
    liveUrl: "",
    features: [
      "Batch migration of S3 objects",
      "Metadata preservation",
      "Progress tracking and resumability",
      "Verification of stored data",
      "CLI and programmatic API"
    ],
    technologies: {
      frontend: ["React", "TypeScript", "Material UI"],
      backend: ["Node.js", "TypeScript", "AWS SDK", "Filecoin.js"],
      devops: ["GitHub Actions", "NPM"]
    }
  },
  {
    id: 5,
    title: "Hospitality EPoS",
    description: "A cross-platform Electronic Point of Sale system for hospitality businesses, enabling complete stock management and reporting.",
    image: "/images/projects/hospitality-epos.jpg",
    tags: ["React Native", ".NET", "SQL Server", "Mobile", "Web"],
    github: "",
    liveUrl: "",
    features: [
      "Order management",
      "Inventory tracking",
      "Staff management",
      "Sales reporting",
      "Customer loyalty program"
    ],
    technologies: {
      frontend: ["React Native", "Redux", "Styled Components"],
      backend: [".NET Core", "C#", "SQL Server", "Entity Framework"],
      devops: ["Azure DevOps", "App Center"]
    }
  }
];

export default function ProjectsPage() {
  const [currentProject, setCurrentProject] = useState(0);
  const [detailView, setDetailView] = useState(false);
  const [direction, setDirection] = useState(0);

  const nextProject = () => {
    setDirection(1);
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const toggleDetailView = () => {
    setDetailView(!detailView);
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

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
            PROJECT ARCADE
          </h1>
          <p className="text-lg font-pixel text-gray-300">
            My featured development achievements
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto relative">
          {/* Project Showcase */}
          <div className="relative overflow-hidden bg-black bg-opacity-70 border-4 border-neon-purple rounded-lg pixel-corners p-4 md:p-8 min-h-[600px]">
            {/* CRT Screen Effect */}
            <div className="absolute inset-0 pointer-events-none scanline"></div>
            
            {/* Navigation Controls */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevProject}
                className="bg-black bg-opacity-70 text-neon-blue hover:text-neon-green p-3 rounded-full"
              >
                <FaChevronLeft size={24} />
              </motion.button>
            </div>
            
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextProject}
                className="bg-black bg-opacity-70 text-neon-blue hover:text-neon-green p-3 rounded-full"
              >
                <FaChevronRight size={24} />
              </motion.button>
            </div>
            
            {/* Project Display */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentProject}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Project Image */}
                  <div className="relative h-64 md:h-full overflow-hidden rounded pixel-corners border-2 border-neon-blue">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 z-10"></div>
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      {/* Placeholder for project image */}
                      <FaLaptopCode className="text-neon-blue text-6xl" />
                    </div>
                  </div>
                  
                  {/* Project Info */}
                  <div className="flex flex-col">
                    <h2 className="text-3xl font-arcade text-neon-green mb-4">
                      {projects[currentProject].title}
                    </h2>
                    
                    <p className="font-pixel text-gray-300 mb-6">
                      {projects[currentProject].description}
                    </p>
                    
                    {/* Tags */}
                    <div className="mb-6">
                      <div className="flex items-center mb-2">
                        <FaTags className="text-neon-yellow mr-2" />
                        <span className="font-arcade text-neon-yellow text-sm">TECH STACK</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {projects[currentProject].tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className={`px-3 py-1 ${
                              tag.includes("React") || tag.includes("Next.js") 
                                ? "bg-dark-purple text-neon-pink" 
                                : tag.includes(".NET") || tag.includes("C#") 
                                  ? "bg-dark-blue text-neon-teal" 
                                  : tag.includes("TypeScript") || tag.includes("JavaScript") 
                                    ? "bg-dark-teal text-neon-orange" 
                                    : "bg-dark-purple text-neon-yellow"
                            } text-xs font-pixel rounded-full`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 mt-auto">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleDetailView}
                        className="flex items-center px-4 py-2 bg-neon-blue bg-opacity-20 border-2 border-neon-blue text-neon-blue font-arcade rounded pixel-corners transition-all hover:bg-opacity-30"
                      >
                        <FaCode className="mr-2" />
                        {detailView ? "Hide Details" : "View Details"}
                      </motion.button>
                      
                      {projects[currentProject].github && (
                        <motion.a
                          href={projects[currentProject].github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center px-4 py-2 bg-neon-purple bg-opacity-20 border-2 border-neon-purple text-neon-purple font-arcade rounded pixel-corners transition-all hover:bg-opacity-30"
                        >
                          <FaGithub className="mr-2" />
                          GitHub
                        </motion.a>
                      )}
                      
                      {projects[currentProject].liveUrl && (
                        <motion.a
                          href={projects[currentProject].liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center px-4 py-2 bg-neon-green bg-opacity-20 border-2 border-neon-green text-neon-green font-arcade rounded pixel-corners transition-all hover:bg-opacity-30"
                        >
                          <FaExternalLinkAlt className="mr-2" />
                          Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Project Details */}
                <AnimatePresence>
                  {detailView && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-8 overflow-hidden"
                    >
                      <div className="border-t-2 border-gray-700 pt-6">
                        <h3 className="text-xl font-arcade text-neon-yellow mb-4">Key Features</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                          {projects[currentProject].features.map((feature, index) => (
                            <motion.li 
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start font-pixel text-gray-300"
                            >
                              <span className="text-neon-green mr-2 mt-1">›</span>
                              <span>{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                        
                        <h3 className="text-xl font-arcade text-neon-yellow mb-4">Technology Breakdown</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-black bg-opacity-50 p-4 rounded pixel-corners border border-neon-blue">
                            <h4 className="font-arcade text-neon-blue mb-3">Frontend</h4>
                            <ul className="space-y-2">
                              {projects[currentProject].technologies.frontend.map((tech, index) => (
                                <li key={index} className="font-pixel text-gray-300 flex items-center">
                                  <span className="text-neon-blue mr-2">•</span>
                                  {tech}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-black bg-opacity-50 p-4 rounded pixel-corners border border-neon-green">
                            <h4 className="font-arcade text-neon-green mb-3">Backend</h4>
                            <ul className="space-y-2">
                              {projects[currentProject].technologies.backend.map((tech, index) => (
                                <li key={index} className="font-pixel text-gray-300 flex items-center">
                                  <span className="text-neon-green mr-2">•</span>
                                  {tech}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-black bg-opacity-50 p-4 rounded pixel-corners border border-neon-purple">
                            <h4 className="font-arcade text-neon-purple mb-3">DevOps</h4>
                            <ul className="space-y-2">
                              {projects[currentProject].technologies.devops.map((tech, index) => (
                                <li key={index} className="font-pixel text-gray-300 flex items-center">
                                  <span className="text-neon-purple mr-2">•</span>
                                  {tech}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
            
            {/* Project Navigation Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentProject ? 1 : -1);
                    setCurrentProject(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentProject === index 
                      ? 'bg-neon-green scale-125' 
                      : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Project Counter */}
          <div className="mt-6 text-center font-arcade text-neon-yellow">
            PROJECT {currentProject + 1} / {projects.length}
          </div>
        </div>
      </div>
    </div>
  );
}