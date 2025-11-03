'use client';

import { motion } from 'framer-motion';
import { Target, Heart, Star, Users, Globe, Shield, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We lead with empathy and humanity in all our actions.',
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We uphold transparency and accountability.',
    },
    {
      icon: Target,
      title: 'Service',
      description: 'We are driven by purpose and impact, not profit.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work with individuals, organizations, and communities for lasting change.',
    },
    {
      icon: Globe,
      title: 'Equity',
      description: 'We believe everyone deserves equal access to opportunities and care.',
    }
  ];

  const milestones = [
    { year: 'Foundation', event: 'Small Beginnings', description: 'Started as friends and volunteers helping families with school fees and essentials' },
    { year: 'Growth', event: 'Kwara State Expansion', description: 'Expanded operations across Kwara State with education and healthcare initiatives' },
    { year: 'Registration', event: 'Official Recognition', description: 'Became registered non-profit organization (RN 8056929)' },
    { year: 'Expansion', event: 'FCT Abuja Reach', description: 'Extended programs to Federal Capital Territory, Abuja' },
    { year: 'Partnerships', event: 'Strategic Collaborations', description: 'Partnered with Worthy Life Foundation, AOB Foundation, and others' },
    { year: 'Impact', event: 'Community Transformation', description: 'Touched thousands of lives through sustainable development programs' }
  ];

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-40 right-10 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 7, repeat: Infinity, delay: 2 }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200 shadow-sm mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-2 h-2 bg-[#08361d] rounded-full animate-pulse" />
              <span className="text-gray-700 text-sm font-medium">Reaching out, Touching lives</span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-[#08361d] to-gray-900 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Who We Are
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              AOA Reach Charity Foundation is a registered non-profit organization committed to transforming lives through compassion, service, and sustainable community development.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Our Mission & Vision</h2>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#08361d] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    To empower underserved communities through education, healthcare, and economic support, fostering self-reliance and sustainable development.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#08361d] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    A society where every child and family can thrive — with access to quality education, basic healthcare, clean water, and the opportunity to live a dignified life.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section with Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to creating meaningful impact across communities.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full group-hover:scale-105">
                    <div className="text-3xl font-bold text-[#08361d] mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{milestone.event}</h3>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                    <motion.div
                      className="w-0 h-0.5 bg-gradient-to-r from-[#08361d] to-emerald-500 mt-4"
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision and action we take.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-full group-hover:scale-105">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-[#08361d] flex items-center justify-center mb-6 text-white shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <value.icon className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get Involved</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Whether as a volunteer, donor, or partner, your support helps us continue this mission of hope and empowerment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className="bg-white text-[#08361d] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-3 text-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.95 }}
              >
                Join Our Mission
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#08361d] transition-colors text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn About Programs
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}