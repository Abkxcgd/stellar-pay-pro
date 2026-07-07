'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
  { label: 'Community', href: '#community' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-950/80 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary"
            >
              <Zap className="w-5 h-5 text-white" />
            </motion.div>
            <span className="font-bold text-lg hidden sm:inline gradient-text">StellarPay Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hidden sm:block">
              <button className="btn-primary text-sm">Dashboard</button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden bg-gray-900 border-t border-gray-800 py-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="px-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-gray-400 hover:text-white transition-colors py-2"
              >
                {item.label}
              </a>
            ))}
            <Link href="/dashboard" className="block">
              <button className="btn-primary w-full">Dashboard</button>
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}