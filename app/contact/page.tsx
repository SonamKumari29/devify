'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      info: "contact@devify.com",
      color: "from-[#00FFC2] to-[#00A8FF]"
    },
    {
      icon: MapPin,
      title: "Location",
      info: "New Delhi, India",
      color: "from-[#FF00E5] to-[#00FFC2]"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-12">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#00FFC2]/20 rounded-full"
              initial={{ 
                x: Math.random() * 100 + '%', 
                y: Math.random() * 100 + '%' 
              }}
              animate={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FFC2] to-[#00A8FF]">
                Get in Touch
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Have questions or feedback? We'd love to hear from you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#00FFC2]/20 hover:border-[#00FFC2] transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} p-0.5 mb-6 group-hover:scale-110 transition-transform`}>
                  <div className="w-full h-full rounded-full bg-[#1A1A1A] flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-[#00FFC2]" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#00FFC2] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400">
                  {item.info}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] p-6 rounded-xl border border-[#00FFC2]/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00FFC2] to-[#00A8FF] p-0.5">
                  <div className="w-full h-full rounded-full bg-[#1A1A1A] flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-[#00FFC2]" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00FFC2] to-[#00A8FF]">
                    Send us a Message
                  </h2>
                  <p className="text-gray-400">We'll get back to you as soon as possible.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0F0F0F] border border-[#00FFC2]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFC2] transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0F0F0F] border border-[#00FFC2]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFC2] transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0F0F0F] border border-[#00FFC2]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFC2] transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-[#0F0F0F] border border-[#00FFC2]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFC2] transition-all duration-300 resize-none"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-[#00FFC2] to-[#00A8FF] text-black font-semibold hover:opacity-90 transition-opacity"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 