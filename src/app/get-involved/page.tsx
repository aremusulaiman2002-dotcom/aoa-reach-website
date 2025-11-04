'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart, Users, Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle, Star, Target, Gift, HandHeart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GetInvolved() {
  const [activeTab, setActiveTab] = useState('volunteer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: '',
    availability: '',
    skills: ''
  });

  const waysToHelp = [
    {
      icon: Users,
      title: 'Volunteer',
      description: 'Join our team on the ground and make a direct impact in communities across Kwara State and Abuja.',
      features: ['Flexible time commitments', 'Various skill sets needed', 'Training provided', 'Community immersion']
    },
    {
      icon: Heart,
      title: 'Donate',
      description: 'Support our programs financially and help us reach more underserved communities.',
      features: ['One-time or recurring gifts', 'Project-specific funding', 'Transparent reporting', 'Direct community impact']
    },
    {
      icon: HandHeart,
      title: 'Partner',
      description: 'Collaborate with us through corporate partnerships or organizational alliances for greater impact.',
      features: ['Corporate sponsorships', 'CSR initiatives', 'Strategic partnerships', 'Resource sharing']
    },
    {
      icon: Gift,
      title: 'In-Kind Support',
      description: 'Donate goods, services, or expertise that can benefit our education and healthcare programs.',
      features: ['Educational materials', 'Medical supplies', 'Professional services', 'Equipment donations']
    }
  ];

  const volunteerRoles = [
    {
      title: 'Education Volunteer',
      time: 'Weekdays during school hours',
      commitment: 'Regular',
      skills: ['Teaching assistance', 'Mentorship', 'Child engagement'],
      urgency: 'High need'
    },
    {
      title: 'Healthcare Assistant',
      time: 'Medical outreach days',
      commitment: 'Event-based',
      skills: ['Medical background', 'First aid training', 'Patient care'],
      urgency: 'High need'
    },
    {
      title: 'Community Mobilizer',
      time: 'Flexible hours',
      commitment: 'Part-time',
      skills: ['Community engagement', 'Communication skills', 'Local knowledge'],
      urgency: 'Medium need'
    },
    {
      title: 'Skills Trainer',
      time: 'Weekends or evenings',
      commitment: 'Workshop-based',
      skills: ['Vocational skills', 'Teaching ability', 'Entrepreneurship knowledge'],
      urgency: 'Growing need'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your interest in AOA Reach! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      interest: '',
      availability: '',
      skills: ''
    });
  };

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
              Get Involved
            </motion.h1>

            <motion.p 
              className="font-elegant text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Whether as a volunteer, donor, or partner, your support helps us continue this mission of hope and empowerment.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-elegant text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ways to Make a Difference</h2>
            <p className="font-elegant text-xl text-gray-600 max-w-2xl mx-auto">
              Choose how you'd like to contribute to our mission of transforming lives through sustainable community development.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {waysToHelp.map((way, index) => (
              <motion.div
                key={way.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setActiveTab(way.title.toLowerCase())}
              >
                <div className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border-2 transition-all duration-500 h-full group-hover:scale-105 ${
                  activeTab === way.title.toLowerCase() 
                    ? 'border-[#08361d] shadow-xl' 
                    : 'border-gray-100 shadow-sm hover:shadow-lg'
                }`}>
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-[#08361d] flex items-center justify-center mb-6 text-white shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <way.icon className="w-8 h-8" />
                  </motion.div>
                  <h3 className="font-elegant text-2xl font-bold text-gray-900 mb-4">{way.title}</h3>
                  <p className="font-sans text-gray-600 leading-relaxed mb-6">{way.description}</p>
                  <ul className="space-y-2">
                    {way.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-gray-600 font-sans">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Roles */}
      {activeTab === 'volunteer' && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-elegant text-4xl md:text-5xl font-bold text-gray-900 mb-4">Volunteer Opportunities</h2>
              <p className="font-elegant text-xl text-gray-600 max-w-2xl mx-auto">
                Join our dedicated team of volunteers making a direct impact in Kwara State and Abuja communities.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {volunteerRoles.map((role, index) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-elegant text-2xl font-bold text-gray-900">{role.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium font-sans ${
                      role.urgency === 'High need' 
                        ? 'bg-red-100 text-red-800'
                        : role.urgency === 'Medium need'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {role.urgency}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4 text-gray-600 font-sans">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{role.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{role.commitment}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2 font-sans">Required Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-sans">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    className="w-full bg-[#08361d] text-white py-3 rounded-xl font-semibold hover:bg-[#062814] transition-colors font-sans"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Apply for this Role
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Form */}
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
              <h2 className="font-elegant text-4xl md:text-5xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
              <p className="font-elegant text-xl text-gray-600 max-w-2xl mx-auto">
                Tell us about your interest and we'll help you find the best way to get involved with AOA Reach.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#08361d] focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#08361d] focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#08361d] focus:border-transparent transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                      Area of Interest *
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#08361d] focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select an option</option>
                      <option value="volunteer">Volunteering</option>
                      <option value="donate">Donation</option>
                      <option value="partner">Partnership</option>
                      <option value="in-kind">In-Kind Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                      Availability
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#08361d] focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select availability</option>
                      <option value="weekdays">Weekdays</option>
                      <option value="weekends">Weekends</option>
                      <option value="flexible">Flexible</option>
                      <option value="remote">Remote Only</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                      Skills & Expertise
                    </label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#08361d] focus:border-transparent transition-all duration-300"
                      placeholder="e.g., Teaching, Medical, Community work, etc."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#08361d] focus:border-transparent transition-all duration-300"
                    placeholder="Tell us about your motivation and how you'd like to help AOA Reach..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-[#08361d] text-white py-4 rounded-xl font-semibold hover:bg-[#062814] transition-colors flex items-center justify-center gap-3 text-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Your Interest
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-20 bg-gradient-to-r from-[#08361d] to-emerald-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="font-elegant text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
            <p className="font-elegant text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Reach out to our team for more information about getting involved with AOA Reach Charity Foundation.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center font-sans">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6" />
                <span>contact@aoareach.org</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6" />
                <span>+234 XXX XXX XXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6" />
                <span>Kwara State & Abuja, Nigeria</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}