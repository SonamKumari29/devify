"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-t border-white/10 bg-black/20 backdrop-blur-lg mt-12"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Left side - Logo and Quote */}
          <div className="flex flex-col items-center">
            <h3 className="text-base font-bold">Devify</h3>
            <p className="text-xs text-gray-400 mt-1 text-center">
              Your modern tech news aggregator
            </p>
          </div>
          
          {/* Right side - Navigation Links in two columns */}
          <div className="flex gap-8">
            <div className="flex flex-col gap-2 items-center">
              <Link href="/about" className="text-xs text-gray-400 hover:text-[#00FFC2]">
                About
              </Link>
              <Link href="/contact" className="text-xs text-gray-400 hover:text-[#00FFC2]">
                Contact
              </Link>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Link href="/category" className="text-xs text-gray-400 hover:text-[#00FFC2]">
                Categories
              </Link>
              <Link href="/subscribe" className="text-xs text-gray-400 hover:text-[#00FFC2]">
                Subscribe
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-2 pt-2 border-t border-white/10 text-center text-gray-400 text-xs">
          <p>© {new Date().getFullYear()} Devify. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}