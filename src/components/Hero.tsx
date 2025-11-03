'use client';

import { motion, Variants } from 'framer-motion';
import { ArrowDown, Users, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();

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

  const handleGetInvolved = () => {
    // Navigate to Get Involved page
    router.push('/get-involved');
  };

  const handleLearnMore = () => {
    // Navigate to About page
    router.push('/about');
  };

  const handleScrollToContent = () => {
    // Scroll to main content section
    const element = document.getElementById('main-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-20 md:pt-24 min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-[#F5F5F5] via-white to-[#F5F5F5]">
      
      {/* Animated Background Blobs */}
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
          A registered non-profit organization committed to transforming lives through compassion, service, and sustainable community development.
        </motion.p>

        {/* Location Info */}
        <motion.div 
          className="flex items-center justify-center gap-6 mb-8 text-[#222222]/70"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#08361d]" />
            <span className="text-sm font-medium">Kwara State & Abuja</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#08361d]" />
            <span className="text-sm font-medium">Serving Multiple Communities</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <motion.button 
            onClick={handleGetInvolved}
            className="bg-[#08361d] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#062814] transition-colors flex items-center gap-2"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 20px 40px -10px rgba(8, 54, 29, 0.4)',
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Users className="w-5 h-5" />
            Get Involved
          </motion.button>
          <motion.button 
            onClick={handleLearnMore}
            className="border-2 border-[#08361d] text-[#08361d] px-8 py-4 rounded-full font-semibold hover:bg-[#08361d] hover:text-white transition-colors"
            whileHover={{ 
              scale: 1.05,
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
          >
            Learn About Our Work
          </motion.button>
        </motion.div>

        {/* Founder Quote */}
        <motion.div
          className="mt-12 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          <p className="text-[#222222]/70 italic text-lg leading-relaxed">
            "True change doesn't start in boardrooms or big speeches — it starts in communities, when people decide to care for one another."
          </p>
          <p className="text-[#08361d] font-semibold mt-2 text-sm">
            — Abdallah Abdulkadir, Founder
          </p>
        </motion.div>
      </motion.div>

    
    </section>
  );
}