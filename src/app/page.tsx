'use client';

import { motion } from 'framer-motion';
import { Target, Heart, Star } from 'lucide-react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function Home() {
  const missionCards = [
    {
      icon: Target,
      title: 'Our Vision',
      description: 'A world where every community has access to basic necessities and opportunities for growth.',
    },
    {
      icon: Heart,
      title: 'Our Mission',
      description: 'To empower communities through sustainable programs and compassionate action.',
    },
    {
      icon: Star,
      title: 'Our Values',
      description: 'Compassion, Integrity, Sustainability, and Community-driven solutions.',
    }
  ];

  return (
    <main className="min-h-screen">
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#222222] mb-4">Our Mission</h2>
            <p className="text-lg text-[#222222]/80 max-w-2xl mx-auto">
              We are dedicated to creating sustainable change in communities through 
              education, healthcare, and empowerment programs.
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

      {/* Stats Section */}
      <section className="py-20 bg-[#F5F5F5]">
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
              Making a real difference in communities through dedicated efforts and sustainable programs.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '50+', label: 'Projects' },
              { number: '10K+', label: 'Lives Impacted' },
              { number: '5', label: 'Years' },
              { number: '100+', label: 'Volunteers' }
            ].map((stat, index) => (
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#08361d]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join us in our mission to create lasting change in communities around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button 
                className="bg-white text-[#08361d] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-5 h-5" />
                Get Involved
              </motion.button>
              <motion.button 
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