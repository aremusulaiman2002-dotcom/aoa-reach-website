'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Target, Users, Heart, TrendingUp, Award, Star, MapPin, Calendar, ArrowRight, X, Quote, User, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Story = {
  id: number;
  name: string;
  location: string;
  story: string;
  fullStory: string;
  image: string;
  category: string;
  date: string;
  duration: string;
};

export default function Impact() {
  const [activeYear, setActiveYear] = useState('2024');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const impactStats = [
    { icon: Users, value: '50,000+', label: 'Lives Impacted' },
    { icon: Heart, value: '500+', label: 'Projects Completed' },
    { icon: Target, value: '25+', label: 'Communities Served' },
    { icon: TrendingUp, value: '95%', label: 'Success Rate' },
  ];

  const yearlyData = {
    '2024': {
      communities: 28,
      projects: 145,
      beneficiaries: 18500,
      volunteers: 450,
      highlights: [
        'Expanded to 5 new regions',
        'Launched digital education platform',
        'Reduced child malnutrition by 40%',
        'Trained 200 community health workers'
      ]
    },
    '2023': {
      communities: 23,
      projects: 120,
      beneficiaries: 15200,
      volunteers: 380,
      highlights: [
        'Built 3 new community centers',
        'Provided clean water to 10,000 people',
        'Established women empowerment programs',
        'Reduced school dropout rate by 35%'
      ]
    },
    '2022': {
      communities: 18,
      projects: 98,
      beneficiaries: 12500,
      volunteers: 320,
      highlights: [
        'Launched healthcare access initiative',
        'Distributed 5,000 educational kits',
        'Trained 150 local entrepreneurs',
        'Improved agricultural yields by 50%'
      ]
    }
  };

  const successStories: Story[] = [
    {
      id: 1,
      name: 'Amina Lawal',
      location: 'Kano State',
      story: 'Thanks to AOA Reach\'s education program, I was able to complete my studies and start my own tailoring business.',
      fullStory: `Amina's journey began when she had to drop out of school due to financial constraints. Through AOA Reach's Education for All program, she received not only educational support but also vocational training in tailoring. 

"Before AOA Reach, I had given up on my dreams. The program provided me with sewing machines, fabrics, and business training. Today, I run a successful tailoring business with five employees, all women from my community who I'm now training.

The impact goes beyond just me - I'm able to support my family and create opportunities for others. Education truly is the key to breaking the cycle of poverty."`,
      image: '/api/placeholder/400/400',
      category: 'Education & Empowerment',
      date: 'March 15, 2024',
      duration: '2 years in program'
    },
    {
      id: 2,
      name: 'Chukwuma Okoro',
      location: 'Enugu State',
      story: 'The healthcare initiative saved my daughter\'s life with immediate care and follow-up treatment.',
      fullStory: `Chukwuma's daughter, Nneoma, fell seriously ill with malaria complications. Without access to affordable healthcare, the situation seemed hopeless until AOA Reach's mobile clinic arrived in their community.

"The doctors from AOA Reach provided immediate treatment and followed up for weeks. They didn't just treat the illness; they educated our family on prevention and gave us mosquito nets.

Today, Nneoma is healthy and back in school. The healthcare workers still visit our community regularly, and many families have benefited from their services. This program has literally been a lifesaver for our community."`,
      image: '/api/placeholder/400/400',
      category: 'Healthcare',
      date: 'January 8, 2024',
      duration: '6 months of care'
    },
    {
      id: 3,
      name: 'Community Leaders',
      location: 'Plateau State',
      story: 'Sustainable farming practices helped double our yields and achieve food security for our community.',
      fullStory: `The farming community in Plateau State was struggling with poor harvests and food insecurity. AOA Reach introduced modern agricultural techniques while preserving traditional knowledge.

"AOA Reach taught us crop rotation, organic fertilization, and water conservation methods. They provided better seeds and connected us with markets for our surplus.

Our yields have doubled, and for the first time, we have enough food for our families with extra to sell. The community has established a cooperative that manages our collective resources. This transformation has brought hope and prosperity to our entire village."`,
      image: '/api/placeholder/400/400',
      category: 'Agriculture',
      date: 'November 22, 2023',
      duration: '18 months of partnership'
    }
  ];

  const currentData = yearlyData[activeYear as keyof typeof yearlyData];

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-40 right-10 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
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
              <span className="text-gray-700 text-sm font-medium">Measuring Success</span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-gray-900 via-[#08361d] to-gray-900 bg-clip-text text-transparent mb-6 leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{ lineHeight: '1.1' }}
            >
              Our Impact
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Tracking progress, celebrating milestones, and sharing stories of transformation from communities we serve.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Overall Impact Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Overall Impact</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Years of dedicated work creating sustainable change across communities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group-hover:scale-105">
                  <motion.div
                    className="w-20 h-20 rounded-2xl bg-[#08361d] flex items-center justify-center mx-auto mb-6 text-white shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-10 h-10" />
                  </motion.div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Yearly Progress */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Yearly Progress</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tracking our growth and impact year by year.
            </p>
          </motion.div>

          {/* Year Selector */}
          <div className="flex justify-center gap-4 mb-12">
            {Object.keys(yearlyData).map((year) => (
              <motion.button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeYear === year
                    ? 'bg-[#08361d] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {year}
              </motion.button>
            ))}
          </div>

          {/* Yearly Data */}
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="text-3xl font-bold text-[#08361d] mb-2">{currentData.communities}</div>
                <div className="text-gray-600">Communities</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="text-3xl font-bold text-[#08361d] mb-2">{currentData.projects}</div>
                <div className="text-gray-600">Projects</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="text-3xl font-bold text-[#08361d] mb-2">{currentData.beneficiaries.toLocaleString()}</div>
                <div className="text-gray-600">Beneficiaries</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="text-3xl font-bold text-[#08361d] mb-2">{currentData.volunteers}</div>
                <div className="text-gray-600">Volunteers</div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{activeYear} Highlights</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {currentData.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <Award className="w-6 h-6 text-[#08361d] flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories of transformation from the communities we serve.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {successStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-full group-hover:scale-105">
                  {/* Story Image */}
                  <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#08361d] to-emerald-600 opacity-20" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-[#08361d]">
                        {story.category}
                      </span>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-gray-500 mb-3">
                      <MapPin className="w-4 h-4 text-[#08361d]" />
                      <span className="text-sm">{story.location}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{story.name}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4 italic">"{story.story}"</p>
                    
                    <motion.button
                      onClick={() => setSelectedStory(story)}
                      className="flex items-center gap-2 text-[#08361d] font-semibold hover:text-[#062814] transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      Read Full Story
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Detail Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-64 bg-gradient-to-r from-gray-200 to-gray-300">
                <div className="absolute inset-0 bg-gradient-to-r from-[#08361d] to-emerald-600 opacity-30" />
                <button
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-2xl flex items-center justify-center flex-shrink-0">
                      <User className="w-10 h-10 text-[#08361d]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-4xl font-bold text-white drop-shadow-lg mb-2 leading-tight break-words">
                        {selectedStory.name}
                      </h2>
                      <div className="flex items-center gap-4 text-white/90">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedStory.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{selectedStory.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="grid lg:grid-cols-4 gap-8 mb-8">
                  <div className="lg:col-span-3">
                    {/* Story Category Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#08361d]/10 px-4 py-2 rounded-full mb-6">
                      <Quote className="w-4 h-4 text-[#08361d]" />
                      <span className="text-[#08361d] font-medium">{selectedStory.category}</span>
                    </div>

                    {/* Full Story */}
                    <div className="prose prose-lg max-w-none">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Transformation Story</h3>
                      <div className="text-gray-700 leading-relaxed text-lg space-y-4">
                        {selectedStory.fullStory.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="leading-8">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Story Details</h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-[#08361d]" />
                          <div>
                            <p className="text-sm text-gray-500">Date Shared</p>
                            <p className="font-medium text-gray-900">{selectedStory.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-[#08361d]" />
                          <div>
                            <p className="text-sm text-gray-500">Program Duration</p>
                            <p className="font-medium text-gray-900">{selectedStory.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-[#08361d]" />
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium text-gray-900">{selectedStory.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#08361d] rounded-xl p-6 text-white">
                      <h4 className="text-lg font-semibold mb-2">Impact Created</h4>
                      <p className="text-white/80">
                        This story represents the real change happening in communities through our programs.
                      </p>
                    </div>

                    <button className="w-full bg-[#08361d] text-white py-3 rounded-xl font-semibold hover:bg-[#062814] transition-colors">
                      Support More Stories Like This
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#08361d] to-emerald-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Be Part of Our Impact</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join us in creating more success stories and expanding our reach to communities in need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className="bg-white text-[#08361d] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-3 text-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.95 }}
              >
                Support Our Work
                <TrendingUp className="w-5 h-5 text-[#08361d]" />
              </motion.button>
              <motion.button
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#08361d] transition-colors text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Share Your Story
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}