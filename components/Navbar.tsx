"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Code, Menu, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
    'Web Development'
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setIsSearchOpen(false);
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
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-[#00FFC2] to-[#00A8FF] opacity-50 blur-2xl rounded-full group-hover:opacity-75 transition-opacity" />
                <motion.div 
                  className="absolute -inset-2 bg-gradient-to-r from-[#00FFC2] via-[#00A8FF] to-[#00FFC2] rounded-full opacity-0 group-hover:opacity-50"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="relative bg-[#1A1A1A] p-2 rounded-xl border border-[#00FFC2]/50 group-hover:border-[#00FFC2] transition-colors">
                  <motion.div
                    animate={{
                      rotateY: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Code className="w-8 h-8 text-[#00FFC2] group-hover:text-[#00A8FF] transition-colors" />
                  </motion.div>
                </div>
              </div>
              <div className="relative">
                <motion.span 
                  className="text-2xl font-bold bg-gradient-to-r from-[#00FFC2] via-[#00A8FF] to-[#00FFC2] bg-clip-text text-transparent bg-[length:200%_100%]"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  Devify
                </motion.span>
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00FFC2] to-[#00A8FF] opacity-25 blur-lg rounded-full" />
              </div>
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
        <AnimatePresence>
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

      <AnimatePresence>
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
                    className="w-full pl-12 pr-12 py-4 bg-[#1A1A1A] border border-[#00FFC2]/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00FFC2] transition-all"
                    autoFocus
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </form>

                <div className="mt-6 grid grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-[#00FFC2] mb-3">
                      <TrendingUp className="w-4 h-4" />
                      <span>Trending Searches</span>
                    </div>
                    <div className="space-y-2">
                      {trendingSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(search);
                            handleSearch(new Event('submit') as any);
                          }}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-400 hover:bg-[#00FFC2]/10 hover:text-white rounded-lg transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-[#00FFC2] mb-3">
                      <TrendingUp className="w-4 h-4" />
                      <span>Recent Searches</span>
                    </div>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(search);
                            handleSearch(new Event('submit') as any);
                          }}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-400 hover:bg-[#00FFC2]/10 hover:text-white rounded-lg transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}