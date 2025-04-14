"use client";

import { motion } from "framer-motion";
import { Github, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-t border-white/10 bg-black/20 backdrop-blur-lg mt-20"
    >
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold mb-4">Devify</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Your modern tech news aggregator. Stay updated. Stay Devified.
            </p>
          </div>
          
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-400 hover:text-[#00FFC2] text-sm sm:text-base">
                About
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-[#00FFC2] text-sm sm:text-base">
                Contact
              </Link>
            </div>
          </div>
          
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00FFC2] transition-colors"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00FFC2] transition-colors"
              >
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400 text-sm sm:text-base">
          <p>© {new Date().getFullYear()} Devify. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}