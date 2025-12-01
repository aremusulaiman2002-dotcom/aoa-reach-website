'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Target, Users, Heart, TrendingUp, Award, Star, MapPin, Calendar, ArrowRight, X, Quote, User, Clock, Book, Stethoscope, Droplets, Utensils, Zap, Gift, Shield, Accessibility } from 'lucide-react';
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
    { icon: Users, value: '3,500+', label: 'Students Supported' },
    { icon: Heart, value: '10,000+', label: 'Individuals & Families Reached' },
    { icon: Target, value: '80+', label: 'Women & Youths Empowered' },
    { icon: TrendingUp, value: '3,000+', label: 'Sanitary Pads Distributed' },
  ];

  const yearlyData = {
    '2024': {
      communities: 'Multiple',
      projects: 25,
      beneficiaries: 15000,
      volunteers: 120,
      highlights: [
        'Officially established as registered non-profit organisation',
        'Expanded programs to Abuja',
        'Conducted multiple medical outreaches across communities',
        'Distributed food packs to vulnerable families'
      ]
    },
    '2023': {
      communities: 'Multiple',
      projects: 18,
      beneficiaries: 10000,
      volunteers: 85,
      highlights: [
        'Launched Back-to-School Initiative across 10+ schools',
        'Partnered with organizations for healthcare outreaches',
        'Provided borehole to community without water for over 7 years',
        'Distributed menstrual hygiene pads to secondary-school girls'
      ]
    },
    '2022': {
      communities: 'Multiple',
      projects: 12,
      beneficiaries: 5000,
      volunteers: 50,
      highlights: [
        'Started grassroots humanitarian work',
        'Began education support programs',
        'Initiated food distribution programs',
        'Built foundation for community partnerships'
      ]
    }
  };

  const successStories: Story[] = [
    {
      id: 1,
      name: 'Education Beneficiary',
      location: 'Kwara State Schools',
      story: 'Thanks to AOA Reach\'s Back-to-School Initiative, I received school supplies, learning materials, and tuition support to continue my education.',
      fullStory: `This student's journey began when financial constraints threatened to end their education. Through AOA Reach's Back-to-School Initiative, they received school supplies, learning materials, tuition support, and mentorship to remain in school and pursue their full potential.

"Before AOA Reach intervened, I had lost hope of continuing my education. The foundation not only provided the educational support I needed but also gave me mentorship that helped me believe in myself again.

Today, I'm excelling in school and looking forward to a brighter future. The impact of this support goes beyond just me - it gives hope to my entire family and shows our community that education is achievable for everyone."`,
      image: '/api/placeholder/400/400',
      category: 'Education Support',
      date: '2023',
      duration: 'Ongoing support'
    },
    {
      id: 2,
      name: 'Community Water Project',
      location: 'Water-Scarce Community, Kwara State',
      story: 'After over 7 years without clean water, the borehole provided by AOA Reach transformed our community\'s health and daily life.',
      fullStory: `This community member witnessed the transformation when AOA Reach provided a borehole to their community that had gone over 7 years without reliable water access.

"For over 7 years, we struggled to get clean water. Women and children had to walk long distances, and waterborne diseases were common in our community. When AOA Reach provided the borehole, it changed everything.

Now we have clean water for drinking, cooking, and sanitation. Our children are healthier, and we have more time for productive activities. This single project has improved public health outcomes and brought dignity to our community."`,
      image: '/api/placeholder/400/400',
      category: 'Water & Sanitation',
      date: '2023',
      duration: 'Life-changing impact'
    },
    {
      id: 3,
      name: 'Women Empowerment',
      location: 'Kwara State',
      story: 'Through AOA Reach\'s skill-acquisition initiatives, I gained independence and started my own sustainable livelihood.',
      fullStory: `This woman benefited from AOA Reach's Women & Youth Empowerment program, which supports women and young people through skill-acquisition initiatives and small-scale economic support.

"I had always wanted to start my own business but lacked the skills and resources. AOA Reach provided me with vocational training and the tools I needed to begin.

Now I have a sustainable livelihood that supports my family. The empowerment program didn't just give me skills - it gave me confidence and independence. I'm now able to contribute to my community and inspire other women."`,
      image: '/api/placeholder/400/400',
      category: 'Women & Youth Empowerment',
      date: '2023',
      duration: 'Ongoing support'
    }
  ];

  const programAreas = [
    {
      icon: Book,
      title: 'Education Support',
      impact: '3,500+ students supported across 10+ schools',
      description: 'Back-to-School initiatives providing school supplies, learning materials, tuition support, and mentorship'
    },
    {
      icon: Stethoscope,
      title: 'Healthcare & Medical Outreach',
      impact: 'Multiple communities reached with health support',
      description: 'Free medical outreaches and health-education campaigns for low-income and underserved communities'
    },
    {
      icon: Droplets,
      title: 'Water & Sanitation',
      impact: 'Borehole projects completed in water-scarce communities',
      description: 'Implementing borehole projects and clean-water interventions to address long-standing water challenges'
    },
    {
      icon: Utensils,
      title: 'Food & Humanitarian Relief',
      impact: '10,000+ individuals and families supported',
      description: 'Year-round food distributions and emergency relief programmes'
    },
    {
      icon: Zap,
      title: 'Women & Youth Empowerment',
      impact: '80+ women and youths empowered',
      description: 'Skill-acquisition initiatives and small-scale economic support promoting sustainable livelihoods'
    },
    {
      icon: Gift,
      title: 'Menstrual Health & Dignity',
      impact: '3,000+ menstrual hygiene pads distributed',
      description: 'Menstrual hygiene education and sanitary products distribution to secondary-school girls'
    },
    {
      icon: Accessibility,
      title: 'Disability Inclusion',
      impact: 'Mobility aids provided to persons with disabilities',
      description: 'Promoting inclusion by providing mobility aids and advocating for dignity, access, and rights'
    },
    {
      icon: Shield,
      title: 'Clothing Support',
      impact: '1,500+ clothing items distributed',
      description: 'Clothing distribution to children and vulnerable individuals during festive seasons and year-round'
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
              <span className="text-gray-700 text-sm font-medium font-sans">Reaching out, Touching lives</span>
            </motion.div>

            <motion.h1 
              className="font-elegant text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-gray-900 via-[#08361d] to-gray-900 bg-clip-text text-transparent mb-6 leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{ lineHeight: '1.1' }}
            >
              Our Impact
            </motion.h1>

            <motion.p 
              className="font-elegant text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Despite being officially registered in 2024, the impact of AOA Reach reflects years of consistent community-based action across Kwara State and Abuja.
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
            <h2 className="font-elegant text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Impact (So Far)</h2>
            <p className="font-elegant text-xl text-gray-600 max-w-2xl mx-auto">
              Behind every number is a real story — of hope restored, lives improved, and communities strengthened.
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
                  <div className="font-elegant text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="font-sans text-gray-600 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Areas */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-elegant text-4xl md:text-5xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="font-elegant text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive initiatives designed to bridge gaps in education, healthcare, empowerment, water access, and humanitarian relief.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {programAreas.map((program, index) => (
              <motion.div
                key={program.title}
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
                    <program.icon className="w-8 h-8" />
                  </motion.div>
                  <h3 className="font-elegant text-xl font-bold text-gray-900 mb-4">{program.title}</h3>
                  <p className="font-sans text-lg font-semibold text-[#08361d] mb-3">{program.impact}</p>
                  <p className="font-sans text-gray-600 leading-relaxed">{program.description}</p>
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
            <h2 className="font-elegant text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="font-elegant text-xl text-gray-600 max-w-2xl mx-auto">
              Operating primarily in Kwara State and Abuja, AOA Reach exists to bridge the gap between vulnerable communities and access to essential services — ensuring that no child, family, or community is left behind due to circumstance or poverty.
            </p>
          </motion.div>

          {/* Year Selector */}
          <div className="flex justify-center gap-4 mb-12">
            {Object.keys(yearlyData).map((year) => (
              <motion.button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 font-sans ${
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
                <div className="font-elegant text-3xl font-bold text-[#08361d] mb-2">{currentData.communities}</div>
                <div className="font-sans text-gray-600">Communities</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="font-elegant text-3xl font-bold text-[#08361d] mb-2">{currentData.projects}</div>
                <div className="font-sans text-gray-600">Programs</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="font-elegant text-3xl font-bold text-[#08361d] mb-2">{currentData.beneficiaries.toLocaleString()}+</div>
                <div className="font-sans text-gray-600">Beneficiaries</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="font-elegant text-3xl font-bold text-[#08361d] mb-2">{currentData.volunteers}</div>
                <div className="font-sans text-gray-600">Volunteers</div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h3 className="font-elegant text-2xl font-bold text-gray-900 mb-6 text-center">{activeYear} Highlights</h3>
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
                    <span className="font-sans text-gray-700">{highlight}</span>
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
            <h2 className="font-elegant text-4xl md:text-5xl font-bold text-gray-900 mb-4">Transformation Stories</h2>
            <p className="font-elegant text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories of hope and change from the communities we serve.
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
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-[#08361d] font-sans">
                        {story.category}
                      </span>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-gray-500 mb-3">
                      <MapPin className="w-4 h-4 text-[#08361d]" />
                      <span className="font-sans text-sm">{story.location}</span>
                    </div>
                    
                    <h3 className="font-elegant text-xl font-bold text-gray-900 mb-4">{story.name}</h3>
                    <p className="font-sans text-gray-600 leading-relaxed mb-4 italic">"{story.story}"</p>
                    
                    <motion.button
                      onClick={() => setSelectedStory(story)}
                      className="flex items-center gap-2 text-[#08361d] font-semibold hover:text-[#062814] transition-colors font-sans"
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
                      <h2 className="font-elegant text-4xl font-bold text-white drop-shadow-lg mb-2 leading-tight break-words">
                        {selectedStory.name}
                      </h2>
                      <div className="flex items-center gap-4 text-white/90 font-sans">
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
                    <div className="inline-flex items-center gap-2 bg-[#08361d]/10 px-4 py-2 rounded-full mb-6 font-sans">
                      <Quote className="w-4 h-4 text-[#08361d]" />
                      <span className="text-[#08361d] font-medium">{selectedStory.category}</span>
                    </div>

                    {/* Full Story */}
                    <div className="prose prose-lg max-w-none">
                      <h3 className="font-elegant text-2xl font-bold text-gray-900 mb-6">Transformation Story</h3>
                      <div className="text-gray-700 leading-relaxed text-lg space-y-4 font-sans">
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
                      <h4 className="font-elegant text-lg font-semibold text-gray-900 mb-4">Story Details</h4>
                      <div className="space-y-4 font-sans">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-[#08361d]" />
                          <div>
                            <p className="text-sm text-gray-500">Year</p>
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
                      <h4 className="font-elegant text-lg font-semibold mb-2">Impact Created</h4>
                      <p className="font-sans text-white/80">
                        This story represents the real change happening in communities through AOA Reach programs, where compassion meets action to transform lives.
                      </p>
                    </div>

                    <button className="w-full bg-[#08361d] text-white py-3 rounded-xl font-semibold hover:bg-[#062814] transition-colors font-sans">
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
            <h2 className="font-elegant text-4xl md:text-5xl font-bold text-white mb-6">Get Involved</h2>
            <p className="font-elegant text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Whether as a volunteer, donor, partner, or advocate, your support enables us to continue building resilient communities and creating lasting impact. Together, we can do more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className="bg-white text-[#08361d] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-3 text-lg font-sans"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.95 }}
              >
                Get Involved
                <Heart className="w-5 h-5 text-[#08361d]" />
              </motion.button>
              <motion.button
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#08361d] transition-colors text-lg font-sans"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Support Our Work
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}