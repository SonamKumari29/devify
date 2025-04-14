'use client';

import { motion } from 'framer-motion';
import { Zap, Globe, Users, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { icon: Zap, value: '50K+', label: 'Daily Articles', color: 'from-[#FF00E5] to-[#00FFC2]' },
    { icon: Globe, value: '100+', label: 'Countries', color: 'from-[#00FFC2] to-[#00A8FF]' },
    { icon: Users, value: '1M+', label: 'Active Users', color: 'from-[#00A8FF] to-[#FF00E5]' },
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'Tech News',
      description: 'Stay updated with the latest technology trends and breakthroughs.',
      color: 'from-[#00FFC2] to-[#00A8FF]'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Access news and insights from tech communities worldwide.',
      color: 'from-[#FF00E5] to-[#00FFC2]'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join a thriving community of tech enthusiasts and professionals.',
      color: 'from-[#00A8FF] to-[#FF00E5]'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero Section */}
      <section className="relative pt-24 pb-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FFC2] to-[#00A8FF]">
                About Devify
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              Your modern tech news aggregator, bringing you the latest updates from the world of technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#00FFC2]/20 text-center group hover:border-[#00FFC2] transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} p-0.5 mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <div className="w-full h-full rounded-full bg-[#1A1A1A] flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-[#00FFC2]" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#00FFC2]/20 group hover:border-[#00FFC2] transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} p-0.5 mb-4 group-hover:scale-110 transition-transform`}>
                  <div className="w-full h-full rounded-full bg-[#1A1A1A] flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-[#00FFC2]" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#00FFC2] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00FFC2] to-[#00A8FF]">
              Join Our Journey
            </h2>
            <p className="text-gray-400 mb-6">
              Be part of our growing community and stay ahead in the tech world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/subscribe"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00FFC2] to-[#00A8FF] text-black font-semibold hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-[#1A1A1A] border border-[#00FFC2]/20 text-[#00FFC2] font-semibold hover:border-[#00FFC2] transition-all"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 