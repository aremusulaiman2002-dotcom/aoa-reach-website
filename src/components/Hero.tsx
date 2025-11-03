'use client';

import { motion, Variants } from 'framer-motion';
import { ArrowDown, Users } from 'lucide-react';

export default function Hero() {
  // Properly typed variants for container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Properly typed variants for items
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="pt-20 md:pt-24 min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-[#F5F5F5] via-white to-[#F5F5F5]">
      
      {/* Animated Background Blobs - Enhanced with more spots */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main large bouncing blobs */}
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-[#08361d] opacity-5 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#08361d] opacity-7 rounded-full blur-3xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#08361d] opacity-3 rounded-full blur-3xl"
          animate={{
            y: [0, -15, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Additional medium blurred spots */}
        <motion.div
          className="absolute top-10 right-1/4 w-64 h-64 bg-[#08361d] opacity-4 rounded-full blur-3xl"
          animate={{
            y: [0, 10, 0],
            x: [0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        <motion.div
          className="absolute bottom-20 left-1/3 w-56 h-56 bg-[#08361d] opacity-6 rounded-full blur-3xl"
          animate={{
            y: [0, -8, 0],
            x: [0, 8, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />

        {/* Small floating spots */}
        <motion.div
          className="absolute top-32 left-10 w-40 h-40 bg-[#08361d] opacity-3 rounded-full blur-3xl"
          animate={{
            y: [0, 12, 0],
            x: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
        />
        
        <motion.div
          className="absolute bottom-32 right-32 w-36 h-36 bg-[#08361d] opacity-5 rounded-full blur-3xl"
          animate={{
            y: [0, -10, 0],
            x: [0, 6, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.2
          }}
        />

        {/* Extra tiny spots for depth */}
        <motion.div
          className="absolute top-1/3 right-20 w-24 h-24 bg-[#08361d] opacity-4 rounded-full blur-2xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -12, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 left-20 w-28 h-28 bg-[#08361d] opacity-3 rounded-full blur-2xl"
          animate={{
            y: [0, -12, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3
          }}
        />

        {/* Corner spots */}
        <motion.div
          className="absolute top-16 right-16 w-32 h-32 bg-[#08361d] opacity-2 rounded-full blur-2xl"
          animate={{
            y: [0, 8, 0],
            x: [0, -4, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        />
        
        <motion.div
          className="absolute bottom-16 left-16 w-30 h-30 bg-[#08361d] opacity-3 rounded-full blur-2xl"
          animate={{
            y: [0, -6, 0],
            x: [0, 4, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.8
          }}
        />
      </div>

      <motion.div 
        className="text-center max-w-4xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Professional Badge */}
        <motion.div 
          className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-[#08361d]/20 shadow-sm mb-8"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <motion.div 
            className="w-3 h-3 bg-[#08361d] rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[#222222] text-sm font-medium tracking-wide">Registered NGO (RN 8056929)</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#222222] mb-6 leading-tight"
          variants={itemVariants}
        >
          Reaching out,{' '}
          <span className="text-[#08361d]">
            Touching lives
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-lg md:text-xl text-[#222222]/80 mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Creating positive change and uplifting communities through compassion, 
          action, and sustainable impact.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <motion.button 
            className="bg-[#08361d] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#062814] transition-colors flex items-center gap-2"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 20px 40px -10px rgba(8, 54, 29, 0.4)',
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Users className="w-5 h-5" />
            Join Our Mission
          </motion.button>
          <motion.button 
            className="border-2 border-[#08361d] text-[#08361d] px-8 py-4 rounded-full font-semibold hover:bg-[#08361d] hover:text-white transition-colors"
            whileHover={{ 
              scale: 1.05,
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>


    </section>
  );
}