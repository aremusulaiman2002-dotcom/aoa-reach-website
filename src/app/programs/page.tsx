'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Book, Heart, Users, Stethoscope, ArrowRight, Filter, Target, X, Calendar, MapPin, Users as UsersIcon, Droplets, Utensils, Briefcase, Accessibility } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Define the Program type
type Program = {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  icon: any;
  category: string;
  status: 'active' | 'upcoming';
  impact: string;
  location: string;
  duration: string;
  volunteers: string;
  image: string;
  color: string;
  goals: string[];
};

export default function Programs() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const programs: Program[] = [
    {
      id: 1,
      title: 'Education Initiatives',
      description: 'Providing school supplies, tuition support, and mentorship to help children stay in school and break the cycle of poverty.',
      fullDescription: 'Our Education Initiatives focus on the Back-to-School Program that provides comprehensive educational support to disadvantaged students. We supply school materials, pay tuition fees for those in need, and offer mentorship programs across several schools in Kwara State. We believe education is the foundation of empowerment and work to ensure every child has the opportunity to learn and dream bigger.',
      icon: Book,
      category: 'education',
      status: 'active',
      impact: '2,000+ students reached',
      location: 'Kwara State Schools',
      duration: 'Ongoing',
      volunteers: '50+',
      image: '/api/placeholder/400/250',
      color: 'from-blue-500 to-cyan-500',
      goals: [
        'Provide school supplies to 5,000 students',
        'Support tuition for 500 disadvantaged students',
        'Establish mentorship programs in 20 schools',
        'Reduce school dropout rate by 50%'
      ]
    },
    {
      id: 2,
      title: 'Healthcare Outreach',
      description: 'Organizing free medical outreaches and health awareness campaigns for low-income and rural communities.',
      fullDescription: 'Our Healthcare Outreach program brings essential medical services directly to underserved communities. We organize free medical camps in partnership with organizations like Worthy Life Foundation, providing consultations, blood pressure checks, sugar level tests, and medications. Our volunteer-driven campaigns also promote health awareness on hygiene, nutrition, and wellness, ensuring communities have both treatment and preventive care knowledge.',
      icon: Stethoscope,
      category: 'healthcare',
      status: 'active',
      impact: 'Hundreds served in medical outreaches',
      location: 'Kwara State & Rural Communities',
      duration: 'Ongoing',
      volunteers: '30+',
      image: '/api/placeholder/400/250',
      color: 'from-green-500 to-emerald-500',
      goals: [
        'Conduct quarterly medical outreaches',
        'Serve 2,000+ patients annually',
        'Train community health volunteers',
        'Establish permanent health awareness programs'
      ]
    },
    {
      id: 3,
      title: 'Water and Sanitation',
      description: 'Providing access to clean water through borehole projects and improving community sanitation standards.',
      fullDescription: 'Our Water and Sanitation projects address the critical need for clean water in underserved communities. We recently provided a borehole to a Kwara community that had gone 14 years without reliable water access. This project has significantly improved living standards and reduced waterborne diseases. We focus on sustainable water solutions that communities can maintain long-term.',
      icon: Droplets,
      category: 'water',
      status: 'active',
      impact: '1 community transformed with clean water',
      location: 'Kwara State Communities',
      duration: '2 years',
      volunteers: '25+',
      image: '/api/placeholder/400/250',
      color: 'from-cyan-500 to-blue-500',
      goals: [
        'Provide 5 more boreholes to water-scarce communities',
        'Reduce waterborne diseases by 70%',
        'Train communities in water resource management',
        'Improve sanitation facilities in schools'
      ]
    },
    {
      id: 4,
      title: 'Feeding and Humanitarian Relief',
      description: 'Addressing food insecurity through year-round food distribution programs and emergency relief support.',
      fullDescription: 'Our Feeding and Humanitarian Relief program tackles food insecurity through regular food distributions and seasonal programs like Ramadan feeding. We support households in crisis and displaced children in IDP camps. Through partnerships with AOB Foundation, DKS Relief, Al-Fauz Foundation, No Hunger Initiative, Safma Farms, and others, we distribute thousands of food packs to vulnerable families across Kwara and Abuja.',
      icon: Utensils,
      category: 'relief',
      status: 'active',
      impact: 'Thousands of families fed annually',
      location: 'Kwara State & Abuja',
      duration: 'Year-round',
      volunteers: '80+',
      image: '/api/placeholder/400/250',
      color: 'from-orange-500 to-amber-500',
      goals: [
        'Distribute 10,000+ food packs annually',
        'Support 500+ households in crisis',
        'Expand Ramadan feeding program',
        'Establish community food banks'
      ]
    },
    {
      id: 5,
      title: 'Empowerment and Livelihood',
      description: 'Empowering individuals through skill acquisition programs and small business support for self-reliance.',
      fullDescription: 'Our Empowerment and Livelihood program focuses on creating economic independence through vocational training and business support. We provide skill acquisition programs, donate sewing machines to aspiring tailors, and support small business development for women and youth. Our model ensures beneficiaries gain both the skills and tools needed to succeed, creating sustainable livelihoods and reducing dependency.',
      icon: Briefcase,
      category: 'empowerment',
      status: 'active',
      impact: 'Women and youth equipped with skills',
      location: 'Kwara State',
      duration: 'Ongoing',
      volunteers: '40+',
      image: '/api/placeholder/400/250',
      color: 'from-purple-500 to-pink-500',
      goals: [
        'Train 200 women in vocational skills',
        'Provide startup kits to 50 entrepreneurs',
        'Establish 5 community cooperatives',
        'Create 100+ sustainable livelihoods'
      ]
    },
    {
      id: 6,
      title: 'Disability Support & Inclusion',
      description: 'Promoting inclusion and providing assistive devices to restore mobility and confidence for people with disabilities.',
      fullDescription: 'Our Disability Support & Inclusion program is committed to ensuring equal opportunities and dignity for persons with disabilities. We distribute walking clutches and other assistive devices, advocate for inclusive policies, and work to make communities more accessible. We believe every life deserves visibility and the opportunity to participate fully in society.',
      icon: Accessibility,
      category: 'disability',
      status: 'active',
      impact: 'Dozens provided with mobility aids',
      location: 'Kwara State Communities',
      duration: 'Ongoing',
      volunteers: '20+',
      image: '/api/placeholder/400/250',
      color: 'from-indigo-500 to-purple-500',
      goals: [
        'Distribute 100+ assistive devices annually',
        'Advocate for disability-inclusive policies',
        'Create awareness in 10 communities',
        'Establish peer support networks'
      ]
    }
  ];

  const filters = [
    { key: 'all', label: 'All Programs', icon: Target },
    { key: 'education', label: 'Education', icon: Book },
    { key: 'healthcare', label: 'Healthcare', icon: Stethoscope },
    { key: 'water', label: 'Water & Sanitation', icon: Droplets },
    { key: 'relief', label: 'Food Relief', icon: Utensils },
    { key: 'empowerment', label: 'Empowerment', icon: Briefcase },
    { key: 'disability', label: 'Disability Support', icon: Accessibility }
  ];

  const filteredPrograms = activeFilter === 'all' 
    ? programs 
    : programs.filter(program => program.category === activeFilter);

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
              <span className="text-gray-700 text-sm font-medium">What We Do</span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-gray-900 via-[#08361d] to-gray-900 bg-clip-text text-transparent mb-6 leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{ lineHeight: '1.1' }}
            >
              Our Programs
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Transforming lives through sustainable community development across Nigeria.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Filter Programs</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((filter) => (
                <motion.button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeFilter === filter.key
                      ? 'bg-[#08361d] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <filter.icon className="w-4 h-4" />
                  {filter.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-full group-hover:scale-105">
                  {/* Program Image */}
                  <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${program.color} opacity-20`} />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        program.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {program.status === 'active' ? 'Active' : 'Upcoming'}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
                        <program.icon className="w-6 h-6 text-[#08361d]" />
                      </div>
                    </div>
                  </div>

                  {/* Program Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{program.description}</p>
                    
                    <div className="flex items-center justify-between mt-6">
                      <span className="text-sm font-medium text-[#08361d] bg-[#08361d]/10 px-3 py-1 rounded-full">
                        {program.impact}
                      </span>
                      <motion.button
                        onClick={() => setSelectedProgram(program)}
                        className="flex items-center gap-2 text-[#08361d] font-semibold hover:text-[#062814] transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredPrograms.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No programs found</h3>
              <p className="text-gray-500">Try selecting a different filter category</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Program Detail Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProgram(null)}
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
                <div className={`absolute inset-0 bg-gradient-to-r ${selectedProgram.color} opacity-30`} />
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center">
                      <selectedProgram.icon className="w-8 h-8 text-[#08361d]" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white drop-shadow-lg">{selectedProgram.title}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedProgram.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedProgram.status === 'active' ? 'Active Program' : 'Upcoming Program'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Program Overview</h3>
                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                      {selectedProgram.fullDescription}
                    </p>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Program Goals</h4>
                      <ul className="space-y-2">
                        {selectedProgram.goals.map((goal: string, index: number) => (
                          <li key={index} className="flex items-center gap-3 text-gray-600">
                            <div className="w-2 h-2 bg-[#08361d] rounded-full" />
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Program Details</h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-[#08361d]" />
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium text-gray-900">{selectedProgram.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-[#08361d]" />
                          <div>
                            <p className="text-sm text-gray-500">Duration</p>
                            <p className="font-medium text-gray-900">{selectedProgram.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <UsersIcon className="w-5 h-5 text-[#08361d]" />
                          <div>
                            <p className="text-sm text-gray-500">Volunteers</p>
                            <p className="font-medium text-gray-900">{selectedProgram.volunteers}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#08361d] rounded-xl p-6 text-white">
                      <h4 className="text-lg font-semibold mb-2">Impact Achieved</h4>
                      <p className="text-white/80">{selectedProgram.impact}</p>
                    </div>

                    <button className="w-full bg-[#08361d] text-white py-3 rounded-xl font-semibold hover:bg-[#062814] transition-colors">
                      Support This Program
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
                <Heart className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#08361d] transition-colors text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Partner With Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}