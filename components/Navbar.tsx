"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Code, Menu, ChevronRight, Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { searchArticles, type Article } from '@/lib/api';

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [noResults, setNoResults] = useState(false);
  const pathname = usePathname();

  const trendingSearches = [
    'Artificial Intelligence',
    'React 19',
    'Web Assembly',
    'TypeScript 5.0',
    'Next.js',
    'Cloud Computing'
  ];

  const recentSearches = [
    'Machine Learning',
    'DevOps',
    'Cybersecurity',
    'Web Dev'
  ];

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setNoResults(false);
    try {
      const results = await searchArticles(searchQuery);
      setSearchResults(results);
      setNoResults(results.length === 0);
    } catch (error) {
      console.error('Search error:', error);
      setNoResults(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchClick = async (search: string) => {
    setSearchQuery(search);
    setIsSearching(true);
    setNoResults(false);
    try {
      const results = await searchArticles(search);
      setSearchResults(results);
      setNoResults(results.length === 0);
    } catch (error) {
      console.error('Search error:', error);
      setNoResults(true);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setNoResults(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const menuItems = [
    { href: '/trending', label: 'Trending' },
    { href: '/category/all', label: 'Categories' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F0F] border-b border-[#00FFC2]/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-4 relative group">
              <motion.span 
                className="text-3xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="relative">
                  <span className="absolute -inset-1 bg-gradient-to-r from-[#00FFC2] via-[#00A8FF] to-[#00FFC2] opacity-20 blur-lg rounded-full group-hover:opacity-30 transition-opacity" />
                  <span className="relative bg-gradient-to-r from-[#00FFC2] via-[#00A8FF] to-[#00FFC2] bg-clip-text text-transparent bg-[length:200%_100%] group-hover:bg-[length:100%_100%] transition-all duration-500">
                    Devify
                  </span>
                </span>
              </motion.span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-button md:hidden p-2 text-gray-400 hover:text-[#00FFC2] transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-400 hover:text-[#00FFC2] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link href="/trending" className="text-gray-400 hover:text-[#00FFC2] transition-colors">
                Trending
              </Link>
              <Link href="/category/all" className="text-gray-400 hover:text-[#00FFC2] transition-colors">
                Categories
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-[#00FFC2] transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-[#00FFC2] transition-colors">
                Contact
              </Link>
              <Link
                href="/subscribe"
                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-[#00FFC2] text-[#0F0F0F] font-semibold hover:bg-[#00FFC2]/90 transition-colors shadow-lg shadow-[#00FFC2]/20 text-sm sm:text-base"
              >
                Subscribe
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                onClick={handleLinkClick}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ 
                  type: 'spring',
                  damping: 25,
                  stiffness: 200
                }}
                className="mobile-menu fixed top-20 right-0 bottom-0 w-72 bg-[#0F0F0F] border-l border-[#00FFC2]/20 z-50 overflow-y-auto md:hidden"
              >
                <div className="p-4 space-y-2">
                  {/* Search Button */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsSearchOpen(true);
                      handleLinkClick();
                    }}
                    className="flex items-center justify-between w-full p-3 text-gray-400 hover:text-[#00FFC2] transition-colors rounded-lg hover:bg-[#1A1A1A] group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#1A1A1A] group-hover:bg-[#00FFC2]/10">
                        <Search className="w-5 h-5" />
                      </div>
                      <span>Search</span>
                    </div>
                    <ChevronRight className="w-5 h-5 opacity-50 group-hover:opacity-100" />
                  </motion.button>

                  {/* Menu Items */}
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.href}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link 
                        href={item.href}
                        className={`flex items-center justify-between w-full p-3 transition-colors rounded-lg group ${
                          pathname === item.href
                            ? 'bg-[#00FFC2]/10 text-[#00FFC2]'
                            : 'text-gray-400 hover:text-[#00FFC2] hover:bg-[#1A1A1A]'
                        }`}
                        onClick={handleLinkClick}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            pathname === item.href
                              ? 'bg-[#00FFC2]/20'
                              : 'bg-[#1A1A1A] group-hover:bg-[#00FFC2]/10'
                          }`}>
                            <Code className="w-5 h-5" />
                          </div>
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 opacity-50 group-hover:opacity-100" />
                      </Link>
                    </motion.div>
                  ))}

                  {/* Subscribe Button */}
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="mt-4"
                  >
                    <Link
                      href="/subscribe"
                      className="flex items-center justify-center w-full p-3 rounded-xl bg-gradient-to-r from-[#00FFC2] to-[#00A8FF] text-[#0F0F0F] font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[#00FFC2]/20"
                      onClick={handleLinkClick}
                    >
                      Subscribe Now
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
      <div className="h-20"></div>

      <AnimatePresence mode="wait">
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-0 left-0 right-0 bg-[#0F0F0F] border-b border-[#00FFC2]/20 p-4 z-50"
            >
              <div className="container mx-auto max-w-3xl">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-14 pr-14 py-4 bg-[#1A1A1A] border border-[#00FFC2]/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00FFC2] transition-all"
                    autoFocus
                    disabled={isSearching}
                  />
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {isSearching ? (
                      <Loader2 className="w-5 h-5 text-[#00FFC2] animate-spin" />
                    ) : (
                      <button
                        type="button"
                        onClick={searchQuery ? clearSearch : () => setIsSearchOpen(false)}
                        className="text-gray-400 hover:text-white transition-colors p-1"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </form>

                <div className="mt-6">
                  {/* Search Results */}
                  {searchQuery && (
                    <div className="mb-8">
                      {isSearching ? (
                        <div className="text-center py-6">
                          <div className="relative w-12 h-12 mx-auto mb-3">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00FFC2] to-[#00A8FF] rounded-full animate-ping opacity-20"></div>
                            <Loader2 className="w-12 h-12 text-[#00FFC2] animate-spin" />
                          </div>
                          <p className="text-gray-400">Searching for "{searchQuery}"...</p>
                        </div>
                      ) : noResults ? (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#00FFC2]/10 to-[#00A8FF]/10 flex items-center justify-center">
                            <Search className="w-8 h-8 text-gray-500" />
                          </div>
                          <p className="text-gray-400 mb-2">No articles found for "{searchQuery}"</p>
                          <p className="text-sm text-gray-500 mb-4">We're constantly adding new content. Please check back soon!</p>
                          <button
                            onClick={clearSearch}
                            className="text-sm text-[#00FFC2] hover:text-[#00FFC2]/80 transition-colors"
                          >
                            Clear search
                          </button>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-medium text-[#00FFC2]">Search Results</h3>
                              <span className="text-xs text-gray-500">for "{searchQuery}"</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-500">{searchResults.length} articles found</span>
                              <button
                                onClick={clearSearch}
                                className="text-xs text-gray-400 hover:text-[#00FFC2] transition-colors flex items-center gap-1"
                              >
                                <X className="w-3 h-3" />
                                Clear
                              </button>
                            </div>
                          </div>
                          <div className="space-y-3">
                            {searchResults.map((article) => (
                              <Link
                                key={article.id}
                                href={article.url}
                                target="_blank"
                                className="block p-3 rounded-lg bg-[#252525] hover:bg-[#2A2A2A] transition-all transform hover:scale-[1.02] group"
                                onClick={() => setIsSearchOpen(false)}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#00FFC2]/10 to-[#00A8FF]/10 flex items-center justify-center flex-shrink-0">
                                    <Code className="w-6 h-6 text-[#00FFC2]" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-white group-hover:text-[#00FFC2] transition-colors line-clamp-1 font-medium">
                                      {article.title}
                                    </h4>
                                    <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                                      {article.description}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <span className="text-xs text-[#00FFC2]">{article.source}</span>
                                      <span className="text-xs text-gray-500">•</span>
                                      <span className="text-xs text-gray-500">
                                        {new Date(article.publishedAt).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}

                  {/* Trending and Recent Searches */}
                  {!searchQuery && (
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="w-4 h-4 text-[#00FFC2]" />
                          <span className="text-sm font-medium text-gray-400">Trending Searches</span>
                        </div>
                        <div className="space-y-2">
                          {trendingSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => handleSearchClick(search)}
                              className="block w-full text-left px-3 py-2 text-sm text-gray-400 hover:bg-[#252525] hover:text-[#00FFC2] rounded-lg transition-all transform hover:scale-[1.02] group flex items-center justify-between"
                            >
                              <span>{search}</span>
                              <Search className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="w-4 h-4 text-[#00FFC2]" />
                          <span className="text-sm font-medium text-gray-400">Recent Searches</span>
                        </div>
                        <div className="space-y-2">
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => handleSearchClick(search)}
                              className="block w-full text-left px-3 py-2 text-sm text-gray-400 hover:bg-[#252525] hover:text-[#00FFC2] rounded-lg transition-all transform hover:scale-[1.02] group flex items-center justify-between"
                            >
                              <span>{search}</span>
                              <Search className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}