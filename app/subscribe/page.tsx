'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Sparkles, Zap, Star } from 'lucide-react';

export default function SubscribePage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic
    console.log('Subscription email:', email);
  };

  const features = [
    {
      icon: Sparkles,
      title: "Early Access",
      description: "Be the first to try new features and updates",
      color: "from-[#00FFC2] to-[#00A8FF]"
    },
    {
      icon: Zap,
      title: "Instant Updates",
      description: "Get real-time notifications for tech news",
      color: "from-[#FF00E5] to-[#00FFC2]"
    },
    {
      icon: Star,
      title: "Premium Content",
      description: "Access exclusive articles and insights",
      color: "from-[#00A8FF] to-[#FF00E5]"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-12">
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
              className="text-5xl md:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FFC2] to-[#00A8FF]">
                Stay Updated
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Subscribe to our newsletter and never miss the latest tech updates and insights.
            </motion.p>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl bg-[#1A1A1A] border border-[#00FFC2]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFC2] transition-all duration-300"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00FFC2] to-[#00A8FF] text-black font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Bell className="w-5 h-5" />
                  Subscribe
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
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
                className="p-5 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#00FFC2]/20 hover:border-[#00FFC2] transition-all duration-300 group"
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
    </div>
  );
} 