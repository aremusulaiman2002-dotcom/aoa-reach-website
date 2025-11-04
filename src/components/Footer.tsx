'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Programs', href: '/programs' },
    { name: 'Our Impact', href: '/impact' },
    { name: 'Get Involved', href: '/get-involved' },
    { name: 'Contact', href: '/get-involved#contact' },
  ];

  return (
    <footer className="bg-[#08361d] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            {/* Footer Logo - Larger */}
            <div className="flex items-center mb-6">
              <Link href="/" className="relative">
                <Image
                  src="/images/logo/aoa-reach-logo.png"
                  alt="AOA Reach Charity Foundation Logo"
                  width={220}  // Increased from 180
                  height={70}  // Increased from 48
                  className="object-contain h-14 md:h-16 w-auto" // Larger size
                />
              </Link>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed text-lg">
              Creating positive change and uplifting African communities through compassion, 
              action, and sustainable impact. Registered NGO (RN 8056929).
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://facebook.com/aoareach"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com/aoareach"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://instagram.com/aoareach"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-xl mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <motion.span
                      className="text-white/80 hover:text-white transition-colors block text-lg"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-xl mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-white/80" />
                <span className="text-white/80 text-lg">contact@aoareach.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-white/80" />
                <span className="text-white/80 text-lg">+234 XXX XXX XXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-white/80" />
                <span className="text-white/80 text-lg">Kwara State & Abuja, Nigeria</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-white/20 mt-8 pt-8 text-center"
        >
          <p className="text-white/60 text-lg">
            © {currentYear} AOA Reach Charity Foundation. All rights reserved. | Registered NGO (RN 8056929)
          </p>
        </motion.div>
      </div>
    </footer>
  );
}