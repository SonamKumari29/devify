"use client";

import Link from 'next/link';
import { Code2, Cpu, Cloud, Shield, Database, Smartphone, Cog, BrainCircuit } from 'lucide-react';
import { FilterTags } from './FilterTags';

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

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  tags: string[];
  href: string;
}

interface CategorySectionProps {
  title: string;
  categories: Category[];
}

export function CategorySection({ title, categories }: CategorySectionProps) {
  const handleTagSelect = (tag: string) => {
    // Handle tag selection logic here
    console.log('Selected tag:', tag);
  };

  return (
    <section className="py-4 sm:py-6 md:py-12">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00FFC2] to-[#00FFE5] bg-clip-text text-transparent">
            Explore Categories
          </h2>
          <FilterTags onTagSelect={handleTagSelect} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="block group"
            >
              <div className="bg-[#1A1A1A] rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:bg-[#252525] transition-colors">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center bg-gradient-to-r ${category.bgColor} p-0.5`}>
                    <div className="w-full h-full rounded-lg sm:rounded-xl bg-[#1A1A1A] flex items-center justify-center">
                      <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#00FFC2]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white group-hover:text-[#00FFC2] transition-colors mb-1 sm:mb-2">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {category.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded-full bg-[#252525] text-[#00FFC2]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}