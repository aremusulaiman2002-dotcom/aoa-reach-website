'use client';

import { motion } from 'framer-motion';
import { Target, Heart, Star, Users, Book, Stethoscope, Droplets, Utensils, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function Home() {
  const router = useRouter();

  const missionCards = [
    {
      icon: Target,
      title: 'Our Vision',
      description: 'A society where every child and family can thrive — with access to quality education, basic healthcare, clean water, and the opportunity to live a dignified life.',
    },
    {
      icon: Heart,
      title: 'Our Mission',
      description: 'To empower underserved communities through education, healthcare, and economic support, fostering self-reliance and sustainable development.',
    },
    {
      icon: Star,
      title: 'Our Values',
      description: 'Compassion, Integrity, Service, Collaboration, and Equity guide every action we take.',
    }
  ];

  const programs = [
    {
      icon: Book,
      title: 'Education Initiatives',
      description: 'Back-to-School Initiative providing school supplies, tuition, and mentorship to disadvantaged students.'
    },
    {
      icon: Stethoscope,
      title: 'Healthcare Outreach',
      description: 'Free medical outreaches and health awareness campaigns for low-income communities.'
    },
    {
      icon: Droplets,
      title: 'Water & Sanitation',
      description: 'Providing boreholes and clean water access to communities in need.'
    },
    {
      icon: Utensils,
      title: 'Feeding & Relief',
      description: 'Year-round food distributions and humanitarian support for vulnerable families.'
    },
    {
      icon: Zap,
      title: 'Empowerment Support',
      description: 'Skill acquisition programs and small business support for self-reliance.'
    },
    {
      icon: Users,
      title: 'Disability Inclusion',
      description: 'Mobility aids distribution and advocacy for persons with disabilities.'
    }
  ];

  const impactStats = [
    { number: '2,000+', label: 'Students Reached' },
    { number: '14 Years', label: 'Water Crisis Solved' },
    { number: 'Multiple', label: 'Communities Served' },
    { number: '10,000+', label: 'Families Fed' }
  ];

  return (
    <main className="min-h-screen" id="main-content">
      <Header />
      <Hero />
      
      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#222222] mb-4">Our Mission & Vision</h2>
            <p className="text-lg text-[#222222]/80 max-w-2xl mx-auto">
              Transforming lives through compassion, service, and sustainable community development across Kwara State and Abuja.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {missionCards.map((card, index) => (
              <motion.div
                key={card.title}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div 
                  className="w-20 h-20 bg-[#08361d] rounded-full flex items-center justify-center mx-auto mb-6 text-white"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <card.icon className="w-8 h-8" />
                </motion.div>
                <h3 className="text-xl font-bold text-[#222222] mb-4">{card.title}</h3>
                <p className="text-[#222222]/80 leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#222222] mb-4">What We Do</h2>
            <p className="text-lg text-[#222222]/80 max-w-2xl mx-auto">
              Comprehensive initiatives designed to bridge gaps in education, healthcare, empowerment, water access, and humanitarian relief.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-[#08361d] rounded-lg flex items-center justify-center mb-4 text-white">
                  <program.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#222222] mb-3">{program.title}</h3>
                <p className="text-[#222222]/80 leading-relaxed">{program.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#222222] mb-4">Our Impact</h2>
            <p className="text-lg text-[#222222]/80 max-w-2xl mx-auto">
              In just a few years, AOA Reach has touched thousands of lives through direct community interventions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold text-[#08361d] mb-2">{stat.number}</div>
                <div className="text-[#222222]/70 text-sm uppercase tracking-wider font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-lg text-[#222222]/80 italic max-w-2xl mx-auto">
              "Behind every number is a real story — of hope renewed, lives changed, and communities strengthened."
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#08361d] to-emerald-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get Involved</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Whether as a volunteer, donor, or partner, your support helps us continue this mission of hope and empowerment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button 
                onClick={() => router.push('/get-involved')}
                className="bg-white text-[#08361d] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-5 h-5" />
                Join Our Mission
              </motion.button>
              <motion.button 
                onClick={() => router.push('/about')}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#08361d] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
            
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}