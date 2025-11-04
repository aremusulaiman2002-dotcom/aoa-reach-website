'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, DollarSign } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/programs' },
    { name: 'Impact', href: '/impact' },
    { name: 'Get Involved', href: '/get-involved' },
  ];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Icon + |AOA REACH */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="flex items-center gap-3">
              {logoError ? (
                // Fallback if icon fails to load
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#08361d] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#222222] font-elegant font-bold text-xl leading-tight">|AOA REACH</span>
                    <span className="text-[#08361d] text-xs font-medium leading-tight">Charity Foundation</span>
                  </div>
                </div>
              ) : (
                // Standalone icon + |AOA REACH text
                <div className="flex items-center gap-3">
                  {/* Standalone Icon */}
                  <motion.div 
                    className="relative"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src="/aoa-icon.png" // Your standalone icon file
                      alt="AOA Reach Icon"
                      width={48} // Larger icon
                      height={48} // Larger icon
                      className="object-contain"
                      priority
                      onError={() => setLogoError(true)}
                    />
                  </motion.div>
                  
                  {/* |AOA REACH Text */}
                  <div className="flex flex-col">
                    <span className="text-[#08361d] font-elegant font-bold text-2xl leading-tight tracking-tight">AOA REACH</span>
                  </div>
                </div>
              )}
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[#222222] hover:text-[#08361d] font-medium transition-colors relative"
              >
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="block"
                >
                  {item.name}
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#08361d]"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>
              </Link>
            ))}
            <motion.button 
              className="bg-[#08361d] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#062814] transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(8, 54, 29, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Donate
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="w-6 h-6 text-[#222222]" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu className="w-6 h-6 text-[#222222]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col space-y-4 py-4">
                {menuItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-[#222222] hover:text-[#08361d] font-medium py-2 px-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <motion.span
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="block"
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                ))}
                <motion.button 
                  className="bg-[#08361d] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#062814] transition-colors flex items-center justify-center gap-2 mx-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: menuItems.length * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Donate
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}