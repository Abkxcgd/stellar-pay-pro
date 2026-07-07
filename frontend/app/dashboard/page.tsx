'use client';

import { motion } from 'framer-motion';
import { useWallet } from '@/hooks/useWallet';
import WalletCard from '@/components/wallet/WalletCard';
import BalanceDisplay from '@/components/wallet/BalanceDisplay';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import AnalyticsCard from '@/components/dashboard/AnalyticsCard';
import { TrendingUp, Send, DollarSign, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function DashboardPage() {
  const { connected } = useWallet();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-12" variants={itemVariants}>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">Manage your Stellar payments and portfolio</p>
        </motion.div>

        {connected ? (
          <>
            {/* Wallet Section */}
            <motion.div className="mb-12" variants={itemVariants}>
              <h2 className="text-xl font-semibold mb-6">Wallet</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <WalletCard />
                </div>
                <div>
                  <BalanceDisplay />
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div className="mb-12" variants={itemVariants}>
              <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/dashboard/send">
                  <button className="card group text-center hover:bg-primary/10 transition-colors h-full">
                    <div className="flex justify-center mb-3">
                      <Send className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="font-semibold">Send XLM</p>
                  </button>
                </Link>
                <Link href="/dashboard/receive">
                  <button className="card group text-center hover:bg-secondary/10 transition-colors h-full">
                    <div className="flex justify-center mb-3">
                      <ArrowUpRight className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="font-semibold">Receive</p>
                  </button>
                </Link>
                <Link href="/dashboard/campaigns">
                  <button className="card group text-center hover:bg-accent/10 transition-colors h-full">
                    <div className="flex justify-center mb-3">
                      <DollarSign className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="font-semibold">Campaigns</p>
                  </button>
                </Link>
                <Link href="/dashboard/analytics">
                  <button className="card group text-center hover:bg-info/10 transition-colors h-full">
                    <div className="flex justify-center mb-3">
                      <TrendingUp className="w-8 h-8 text-info group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="font-semibold">Analytics</p>
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Analytics Cards */}
            <motion.div className="mb-12" variants={itemVariants}>
              <h2 className="text-xl font-semibold mb-6">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <AnalyticsCard
                  title="Total Transactions"
                  value="1,234"
                  change="+12.5%"
                  icon={TrendingUp}
                />
                <AnalyticsCard
                  title="Total Sent"
                  value="5,432.50 XLM"
                  change="+8.2%"
                  icon={Send}
                />
                <AnalyticsCard
                  title="Total Received"
                  value="3,210.75 XLM"
                  change="+15.3%"
                  icon={ArrowUpRight}
                />
                <AnalyticsCard
                  title="Pending"
                  value="$1,234"
                  change="-2.1%"
                  icon={DollarSign}
                />
              </div>
            </motion.div>

            {/* Activity Feed */}
            <motion.div variants={itemVariants}>
              <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
              <ActivityFeed />
            </motion.div>
          </>
        ) : (
          <motion.div
            className="card text-center py-16"
            variants={itemVariants}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
              <Send className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
            <p className="text-gray-400 mb-6">Connect your Freighter wallet to get started</p>
            <button className="btn-primary">Connect Wallet</button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}