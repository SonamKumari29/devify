"use client";

import Link from 'next/link';
import { Code2, Cpu, Cloud, Shield, Database, Smartphone, Cog, BrainCircuit } from 'lucide-react';

const categories = [
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Latest in web technologies and frameworks',
    icon: Code2,
    tags: ['React', 'Next.js', 'TypeScript'],
    iconColor: 'text-[#00FFC2]',
    bgColor: 'bg-[#0F0F0F]',
    href: '/category/web-development'
  },
  {
    id: 'artificial-intelligence',
    name: 'AI & ML',
    description: 'Artificial Intelligence and Machine Learning updates',
    icon: BrainCircuit,
    tags: ['GPT-4', 'Machine Learning', 'Neural Networks'],
    iconColor: 'text-[#00FFC2]',
    bgColor: 'bg-[#0F0F0F]',
    href: '/category/artificial-intelligence'
  },
  {
    id: 'cloud-computing',
    name: 'Cloud & DevOps',
    description: 'Cloud computing and DevOps practices',
    icon: Cloud,
    tags: ['AWS', 'Docker', 'Kubernetes'],
    iconColor: 'text-[#00FFC2]',
    bgColor: 'bg-[#0F0F0F]',
    href: '/category/cloud-computing'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Security trends and best practices',
    icon: Shield,
    tags: ['Security', 'Privacy', 'Encryption'],
    iconColor: 'text-[#00FFC2]',
    bgColor: 'bg-[#0F0F0F]',
    href: '/category/cybersecurity'
  },
  {
    id: 'blockchain',
    name: 'Blockchain',
    description: 'Blockchain and cryptocurrency news',
    icon: Database,
    tags: ['Web3', 'DeFi', 'Smart Contracts'],
    iconColor: 'text-[#00FFC2]',
    bgColor: 'bg-[#0F0F0F]',
    href: '/category/blockchain'
  },
  {
    id: 'mobile-development',
    name: 'Mobile Dev',
    description: 'Mobile development and app trends',
    icon: Smartphone,
    tags: ['iOS', 'Android', 'React Native'],
    iconColor: 'text-[#00FFC2]',
    bgColor: 'bg-[#0F0F0F]',
    href: '/category/mobile-development'
  }
];

export function CategorySection() {
  return (
    <section className="py-4 sm:py-6 md:py-12">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-4 bg-gradient-to-r from-[#00FFC2] to-[#00FFE5] bg-clip-text text-transparent">
          Explore Categories
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-400 text-center mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto">
          Discover the latest news and updates in your favorite tech categories
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={category.href}
                className="block group"
              >
                <div className="bg-[#0F0F0F] rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 h-full hover:bg-[#1A1A1A] transition-colors border border-[#00FFC2]/10 hover:border-[#00FFC2]/20">
                  <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full ${category.bgColor} border border-[#00FFC2]/20 flex items-center justify-center relative shrink-0`}>
                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${category.iconColor}`} />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white group-hover:text-[#00FFC2] transition-colors line-clamp-2">
                        {category.name}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-gray-400 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-auto">
                      {category.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs rounded-full bg-[#1A1A1A] text-[#00FFC2] border border-[#00FFC2]/10 whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}