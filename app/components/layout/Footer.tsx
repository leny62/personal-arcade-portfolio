'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/leny62', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/leny-pascal-ihirwe', label: 'LinkedIn' },
    { icon: <FaEnvelope />, url: 'mailto:lihirwe6@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative dark:bg-black dark:bg-opacity-80 bg-light-bg bg-opacity-90 border-t-2 border-neon-purple mt-20 py-8">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid-size opacity-10 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <motion.h3 
              className="text-lg font-arcade text-neon-blue mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              LENY PASCAL IHIRWE
            </motion.h3>
            <p className="text-sm font-pixel dark:text-gray-400 text-gray-600">
              Software Engineer & Creative Technologist
            </p>
          </div>
          
          <div className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="dark:text-white text-light-text hover:text-neon-green transition-colors duration-300"
                aria-label={link.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.2,
                  textShadow: "0 0 8px rgb(0, 255, 0)"
                }}
              >
                <span className="text-2xl">{link.icon}</span>
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t dark:border-gray-800 border-gray-300 text-center">
          <p className="text-xs font-pixel dark:text-gray-500 text-gray-600">
            <span className="text-neon-blue">©{currentYear}</span> All rights reserved. 
            <span className="block sm:inline sm:ml-2">
              Built with <span className="text-neon-red">❤</span> by Leny Pascal Ihirwe
            </span>
          </p>
          
          <motion.div 
            className="mt-4 text-xs font-arcade dark:text-gray-600 text-gray-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-neon-pink">PRESS START</span> TO CONNECT
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 