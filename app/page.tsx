"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, Loader2, TrendingUp, Code, Cpu, Globe2, Shield } from "lucide-react";
import Link from 'next/link';
import { CategorySection } from "@/components/CategorySection";
import { FilterTags } from "@/components/FilterTags";
import { NewsCard } from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import { fetchDevToArticles, fetchHackerNewsArticles, type Article } from "@/lib/api";

const INITIAL_ARTICLES_COUNT = 6; // Show only 6 articles initially

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  const trendingSearches = [
    'Artificial Intelligence',
    'React 19',
    'Web Assembly',
    'TypeScript 5.0',
    'Next.js',
    'Cloud Computing'
  ];

  const suggestedCategories = [
    { 
      name: 'Web Development', 
      icon: Code, 
      color: 'from-[#00FFC2] to-[#00A8FF]',
      href: '/category/web-development'
    },
    { 
      name: 'AI & ML', 
      icon: Cpu, 
      color: 'from-[#FF00E5] to-[#00FFC2]',
      href: '/category/artificial-intelligence'
    },
    { 
      name: 'Cloud & DevOps', 
      icon: Globe2, 
      color: 'from-[#00A8FF] to-[#00FFC2]',
      href: '/category/cloud-computing'
    },
    { 
      name: 'Cybersecurity', 
      icon: Shield, 
      color: 'from-[#FFB800] to-[#00FFC2]',
      href: '/category/cybersecurity'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const loadMoreArticles = () => {
    const nextBatch = articles.slice(displayedArticles.length, displayedArticles.length + INITIAL_ARTICLES_COUNT);
    setDisplayedArticles(prev => [...prev, ...nextBatch]);
    setHasMore(displayedArticles.length + nextBatch.length < articles.length);
  };

  useEffect(() => {
    const fetchInitialArticles = async () => {
      setLoading(true);
      try {
        const [devToArticles, hackerNewsArticles] = await Promise.all([
          fetchDevToArticles(selectedTags[0] || selectedCategory || undefined, 1),
          fetchHackerNewsArticles(1),
        ]);
        
        let allArticles = [...devToArticles, ...hackerNewsArticles]
          .sort((a, b) => (b.reactions || 0) - (a.reactions || 0));
        
        // Filter by tags
        if (selectedTags.length > 0) {
          allArticles = allArticles.filter(article => 
            selectedTags.some(tag => 
              article.tags.some(articleTag => 
                articleTag.toLowerCase().includes(tag.toLowerCase())
              )
            )
          );
        }
        
        // Filter by category if selected
        if (selectedCategory) {
          allArticles = allArticles.filter(article => 
            article.tags.some(tag => 
              tag.toLowerCase().includes(selectedCategory.toLowerCase())
            )
          );
        }
        
        // Filter by search query
        if (searchQuery) {
          allArticles = allArticles.filter(article =>
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.tags.some(tag => 
              tag.toLowerCase().includes(searchQuery.toLowerCase())
            )
          );
        }
        
        setArticles(allArticles);
        setDisplayedArticles(allArticles.slice(0, INITIAL_ARTICLES_COUNT));
        setHasMore(allArticles.length > INITIAL_ARTICLES_COUNT);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
      setLoading(false);
    };

    fetchInitialArticles();
  }, [selectedTags, searchQuery, selectedCategory]);

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => {
      const newTags = prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag];
      setSelectedCategory(null); // Clear category when tags are selected
      return newTags;
    });
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prev => {
      const newCategory = prev === category ? null : category;
      setSelectedTags([]); // Clear tags when category is selected
      return newCategory;
    });
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center justify-center pt-12 sm:pt-16 md:pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#00FFC2]/20 rounded-full"
              initial={{ 
                x: Math.random() * dimensions.width, 
                y: Math.random() * dimensions.height 
              }}
              animate={{
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height,
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

        <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl sm:max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-3 sm:mb-4 md:mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FFC2] to-[#00A8FF]">
                Stay Updated.
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FFC2] to-[#00A8FF]">
                Stay Devified.
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 md:mb-12">
              Your modern tech news aggregator
            </p>

            {/* Search Section */}
            <div className="relative max-w-xs sm:max-w-md md:max-w-xl mx-auto mb-6 sm:mb-8 md:mb-12">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  placeholder="Search articles, topics, or tags..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#1A1A1A] rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FFC2]/50 text-sm sm:text-base"
                />
                <button type="submit" className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </button>
              </form>

              {/* Trending Searches */}
              {isSearchFocused && (
                <div className="absolute w-full mt-2 bg-[#1A1A1A] rounded-lg sm:rounded-xl border border-[#00FFC2]/20 shadow-lg py-2 sm:py-3 z-50">
                  <div className="px-3 sm:px-4 py-2">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-2">Trending Searches</h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {trendingSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setSearchQuery(search)}
                          className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded-full bg-[#252525] text-[#00FFC2] hover:bg-[#2A2A2A] transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Access Categories */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-3xl sm:max-w-4xl mx-auto px-3 sm:px-4">
              {suggestedCategories.map((category, index) => (
                <Link
                  key={index}
                  href={category.href}
                  className="block group"
                >
                  <div className="bg-[#1A1A1A] rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center hover:bg-[#252525] transition-colors">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full mx-auto mb-1.5 sm:mb-2 md:mb-3 bg-gradient-to-r ${category.color} p-0.5`}>
                      <div className="w-full h-full rounded-full bg-[#1A1A1A] flex items-center justify-center">
                        <category.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#00FFC2]" />
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm md:text-base text-white group-hover:text-[#00FFC2] transition-colors">
                      {category.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00FFC2] to-[#00FFE5] bg-clip-text text-transparent">
              Latest News
            </h2>
            <FilterTags onTagSelect={handleTagSelect} />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-[#1A1A1A] rounded-lg sm:rounded-xl p-4 sm:p-6 animate-pulse">
                  <div className="h-40 sm:h-48 bg-[#252525] rounded-lg mb-4"></div>
                  <div className="h-4 bg-[#252525] rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-[#252525] rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {displayedArticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          )}

          {hasMore && !loading && (
            <div className="text-center mt-8 sm:mt-12">
              <Button
                onClick={loadMoreArticles}
                className="bg-[#00FFC2] hover:bg-[#00FFC2]/90 text-[#0F0F0F] font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl"
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}