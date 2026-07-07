'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Wallet, TrendingUp, Zap, Shield, BarChart3, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Wallet,
    title: 'Multi-Wallet Support',
    description: 'Connect and manage multiple Stellar wallets seamlessly',
  },
  {
    icon: TrendingUp,
    title: 'Real-time Transactions',
    description: 'Send XLM instantly with live transaction tracking',
  },
  {
    icon: Zap,
    title: 'Smart Contracts',
    description: 'Deploy and interact with Soroban smart contracts',
  },
  {
    icon: Shield,
    title: 'Secure & Safe',
    description: 'Bank-grade security with Freighter wallet integration',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Comprehensive insights into your transactions',
  },
  {
    icon: Smartphone,
    title: 'Mobile Responsive',
    description: 'Fully optimized for desktop, tablet, and mobile',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <motion.section
        className="relative px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 pb-20 sm:pb-32 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-4000" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm text-primary font-medium">Welcome to the Future of Payments</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold gradient-text mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            StellarPay Pro
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AI-Powered Multi-Wallet Payment & Donation Platform built on Stellar. Send XLM, create campaigns, and manage your finances with enterprise-grade security.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/dashboard">
              <button className="btn-primary group inline-flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="btn-secondary">Learn More</button>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="glass rounded-2xl p-1 overflow-hidden">
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-8">
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border border-primary/20" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="px-4 sm:px-6 lg:px-8 py-20 sm:py-32 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-400 text-lg">Everything you need to manage payments on Stellar</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="card group"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="px-4 sm:px-6 lg:px-8 py-20 sm:py-32 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '1M+', label: 'Transactions' },
            { value: '50K+', label: 'Active Users' },
            { value: '100%', label: 'Uptime' },
            { value: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="card text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="px-4 sm:px-6 lg:px-8 py-20 sm:py-32 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="card text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 text-lg mb-8">Join thousands of users managing their Stellar payments with StellarPay Pro</p>
          <Link href="/dashboard">
            <button className="btn-primary group inline-flex items-center gap-2">
              Launch Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}