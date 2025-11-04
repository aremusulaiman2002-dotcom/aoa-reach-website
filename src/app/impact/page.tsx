'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Target, Users, Heart, TrendingUp, Award, Star, MapPin, Calendar, ArrowRight, X, Quote, User, Clock, Book, Stethoscope, Droplets, Utensils, Briefcase, Accessibility } from 'lucide-react';
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
    { icon: Users, value: '2,000+', label: 'Students Reached' },
    { icon: Heart, value: '474', label: 'Healthcare Beneficiaries' },
    { icon: Target, value: '5,000+', label: 'People with Clean Water' },
    { icon: TrendingUp, value: '10,000+', label: 'Families Fed' },
  ];

  const yearlyData = {
    '2024': {
      communities: 15,
      projects: 25,
      beneficiaries: 5000,
      volunteers: 120,
      highlights: [
        'Expanded education programs to Abuja',
        'Conducted multiple medical outreaches',
        'Distributed food packs to vulnerable families',
        'Provided skills training for women and youth'
      ]
    },
    '2023': {
      communities: 12,
      projects: 18,
      beneficiaries: 3500,
      volunteers: 85,
      highlights: [
        'Launched Back-to-School Initiative',
        'Partnered with Worthy Life Foundation for healthcare',
        'Provided borehole to community without water for 14 years',
        'Distributed walking clutches to people with disabilities'
      ]
    },
    '2022': {
      communities: 8,
      projects: 12,
      beneficiaries: 2000,
      volunteers: 50,
      highlights: [
        'Started small with education support',
        'Began healthcare awareness campaigns',
        'Initiated food distribution programs',
        'Built foundation for community partnerships'
      ]
    }
  };

  const successStories: Story[] = [
    {
      id: 1,
      name: 'Education Beneficiary',
      location: 'Ilorin, Kwara State',
      story: 'Thanks to AOA Reach\'s Back-to-School Initiative, I was able to continue my education and pursue my dreams.',
      fullStory: `This student's journey began when financial constraints threatened to end their education. Through AOA Reach's Back-to-School Initiative, they received school supplies, paid tuition, and mentorship support across 10 schools in Kwara State.

"Before AOA Reach intervened, I had lost hope of completing my education. The foundation not only provided the financial support I needed but also gave me mentorship that helped me believe in myself again.

Today, I'm excelling in school and looking forward to a brighter future. The impact of this support goes beyond just me - it gives hope to my entire family and shows our community that education is achievable for everyone."`,
      image: '/api/placeholder/400/400',
      category: 'Education',
      date: 'September 2023',
      duration: '2 years of support'
    },
    {
      id: 2,
      name: 'Healthcare Recipient',
      location: 'Yeregi, Moro LGA',
      story: 'The free medical outreach provided essential healthcare services that I couldn\'t afford otherwise.',
      fullStory: `This community member benefited from AOA Reach's healthcare partnership with Worthy Life Foundation in Yeregi, where 394 adults and 80 children received free medical services.

"I had been living with untreated health issues for years because I couldn't afford hospital visits. When AOA Reach came to our community with free medical services, I received proper consultation, blood pressure checks, and medications.

The healthcare workers didn't just treat us; they educated us about preventive care and healthy living. This outreach brought relief to our entire community and showed us that someone cares about our wellbeing."`,
      image: '/api/placeholder/400/400',
      category: 'Healthcare',
      date: 'June 2023',
      duration: 'Ongoing support'
    },
    {
      id: 3,
      name: 'Water Project Beneficiary',
      location: 'Kwara State Community',
      story: 'After 14 years without clean water, the borehole provided by AOA Reach transformed our community.',
      fullStory: `This community member witnessed the transformation when AOA Reach provided a borehole to their community that had gone 14 years without reliable water access.

"For 14 years, we struggled to get clean water. Women and children had to walk long distances, and waterborne diseases were common in our community. When AOA Reach provided the borehole, it changed everything.

Now we have clean water for drinking, cooking, and sanitation. Our children are healthier, and we have more time for productive activities. This single project has improved the lives of over 5,000 people in our area."`,
      image: '/api/placeholder/400/400',
      category: 'Water Access',
      date: 'March 2023',
      duration: 'Life-changing impact'
    }
  ];

  const programAreas = [
    {
      icon: Book,
      title: 'Education',
      impact: '2,000+ students reached across 10 schools',
      description: 'Back-to-School Initiative providing educational support'
    },
    {
      icon: Stethoscope,
      title: 'Healthcare',
      impact: '450+ beneficiaries served in medical outreaches',
      description: 'Free medical services with 15 volunteer health professionals'
    },
    {
      icon: Droplets,
      title: 'Water Access',
      impact: '5,000+ people served with clean water',
      description: '2 boreholes ending water scarcity in communities'
    },
    {
      icon: Utensils,
      title: 'Food Relief',
      impact: '10,000+ families fed with 13,000+ food packs',
      description: 'Year-round food distribution programs'
    },
    {
      icon: Briefcase,
      title: 'Empowerment',
      impact: '67 people equipped with skills and tools',
      description: 'Vocational training and business support'
    },
    {
      icon: Accessibility,
      title: 'Disability Support',
      impact: '40 individuals provided with mobility aids',
      description: 'Walking clutches distribution and inclusion advocacy'
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
              Behind every number is a real story — of hope renewed, lives changed, and communities strengthened.
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
            <h2 className="font-elegant text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p className="font-elegant text-xl text-gray-600 max-w-2xl mx-auto">
              Measurable change created through sustainable community development.
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
              Transforming lives across multiple program areas in Kwara State and Abuja.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
                  <h3 className="font-elegant text-2xl font-bold text-gray-900 mb-4">{program.title}</h3>
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
              From small beginnings to creating meaningful impact across communities.
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
                <div className="font-sans text-gray-600">Projects</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="font-elegant text-3xl font-bold text-[#08361d] mb-2">{currentData.beneficiaries.toLocaleString()}</div>
                <div className="font-sans text-gray-600">Beneficiaries</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="font-elegant text-3xl font-bold text-[#08361d] mb-2">{currentData.volunteers}</div>
                <div className="font-sans text-gray-600">Volunteers</div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h3 className="font-elegant text-2xl font-bold text-gray-900 mb-6 text-center">{activeYear} Achievements</h3>
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
                      <h4 className="font-elegant text-lg font-semibold mb-2">Impact Created</h4>
                      <p className="font-sans text-white/80">
                        This story represents the real change happening in communities through AOA Reach programs.
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
            <h2 className="font-elegant text-4xl md:text-5xl font-bold text-white mb-6">Join Our Mission</h2>
            <p className="font-elegant text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Together, we can build a society where compassion meets opportunity, and every life counts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className="bg-white text-[#08361d] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-3 text-lg font-sans"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.95 }}
              >
                Get Involved
                <TrendingUp className="w-5 h-5 text-[#08361d]" />
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