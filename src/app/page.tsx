'use client';

import { motion } from 'framer-motion';
import { Target, Heart, Star, Users, Book, Stethoscope, Droplets, Utensils, Zap, Gift, Shield, Activity } from 'lucide-react';
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
      description: 'We envision a society where every child and family can thrive — with access to quality education, basic healthcare, clean water, dignity, and the opportunity to live a purposeful life.',
    },
    {
      icon: Heart,
      title: 'Our Mission',
      description: 'Our mission is to empower underserved communities through targeted education support, healthcare initiatives, humanitarian relief, and economic empowerment programs that foster self-reliance and long-term development.',
    },
    {
      icon: Star,
      title: 'Our Values',
      description: 'At the core of AOA Reach are values that guide every decision and programme we implement: Compassion, Integrity, Service, Collaboration, and Equity.',
    }
  ];

  const programs = [
    {
      icon: Book,
      title: 'Education Support',
      description: 'Through our Back-to-School initiatives, we provide school supplies, learning materials, tuition support, and mentorship to disadvantaged students, helping them remain in school and pursue their full potential.'
    },
    {
      icon: Stethoscope,
      title: 'Healthcare & Medical Outreach',
      description: 'We organise free medical outreaches and health-education campaigns for low-income and underserved communities, offering basic health screenings, preventive care, and public health awareness.'
    },
    {
      icon: Droplets,
      title: 'Water & Sanitation',
      description: 'We implement borehole projects and clean-water interventions in water-scarce communities, addressing long-standing water challenges and improving public health outcomes.'
    },
    {
      icon: Utensils,
      title: 'Food & Humanitarian Relief',
      description: 'We conduct year-round food distributions and emergency relief programmes, supporting individuals and families facing food insecurity, displacement, or economic hardship.'
    },
    {
      icon: Zap,
      title: 'Women & Youth Empowerment',
      description: 'Our empowerment programmes support women and young people through skill-acquisition initiatives and small-scale economic support, promoting independence and sustainable livelihoods.'
    },
    {
      icon: Gift,
      title: 'Menstrual Health & Dignity',
      description: 'We deliver menstrual hygiene education and distribute sanitary products to secondary-school girls, addressing myths, promoting awareness, and supporting menstrual dignity in schools and communities.'
    },
    {
      icon: Users,
      title: 'Disability Inclusion',
      description: 'We promote inclusion by providing mobility aids and advocating for the dignity, access, and rights of persons living with disabilities.'
    },
    {
      icon: Shield,
      title: 'Clothing Support',
      description: 'We distribute clothing to children and vulnerable individuals during festive seasons and throughout the year, ensuring warmth, dignity, and care for those in need.'
    }
  ];

  const impactStats = [
    { number: '3,500+', label: 'Students Supported' },
    { number: '10,000+', label: 'Individuals Reached' },
    { number: '80+', label: 'Women & Youths Empowered' },
    { number: '3,000+', label: 'Sanitary Pads Distributed' }
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
            <h2 className="font-elegant text-3xl md:text-4xl font-bold text-[#222222] mb-4">Our Mission & Vision</h2>
            <p className="font-elegant text-lg text-[#222222]/80 max-w-2xl mx-auto">
              AOA Reach Charity Foundation is a registered non-profit organisation officially established in 2024, built on years of grassroots humanitarian work. We are committed to transforming lives through compassion, service, and sustainable community development.
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
                <h3 className="font-elegant text-xl font-bold text-[#222222] mb-4">{card.title}</h3>
                {/* Changed: Added text-justify for justified alignment */}
                <p className="font-sans text-[#222222]/80 leading-relaxed text-justify">{card.description}</p>
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
            <h2 className="font-elegant text-3xl md:text-4xl font-bold text-[#222222] mb-4">What We Do</h2>
            <p className="font-elegant text-lg text-[#222222]/80 max-w-2xl mx-auto">
              Operating primarily in Kwara State and Abuja, AOA Reach exists to bridge the gap between vulnerable communities and access to essential services — ensuring that no child, family, or community is left behind due to circumstance or poverty.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <h3 className="font-elegant text-xl font-bold text-[#222222] mb-3">{program.title}</h3>
                {/* Changed: Added text-justify for justified alignment */}
                <p className="font-sans text-[#222222]/80 leading-relaxed text-justify">{program.description}</p>
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
            <h2 className="font-elegant text-3xl md:text-4xl font-bold text-[#222222] mb-4">Our Impact (So Far)</h2>
            <p className="font-elegant text-lg text-[#222222]/80 max-w-2xl mx-auto">
              Despite being officially registered in 2024, the impact of AOA Reach reflects years of consistent community-based action across Kwara State and Abuja.
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
                <div className="font-elegant text-3xl md:text-4xl font-bold text-[#08361d] mb-2">{stat.number}</div>
                <div className="font-sans text-[#222222]/70 text-sm uppercase tracking-wider font-medium">{stat.label}</div>
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
            <p className="font-elegant text-lg text-[#222222]/80 italic max-w-2xl mx-auto">
              "Behind every number is a real story — of hope restored, lives improved, and communities strengthened."
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
            <h2 className="font-elegant text-3xl md:text-4xl font-bold text-white mb-4">Get Involved</h2>
            <p className="font-elegant text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Whether as a volunteer, donor, partner, or advocate, your support enables us to continue building resilient communities and creating lasting impact. Together, we can do more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-sans">
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