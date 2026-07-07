'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, Heart, Target, Users } from 'lucide-react';

const campaigns = [
  {
    id: 1,
    title: 'Community Education Fund',
    description: 'Support blockchain education initiatives',
    goal: 5000,
    raised: 3250,
    donors: 42,
    image: '🎓',
  },
  {
    id: 2,
    title: 'Emergency Relief',
    description: 'Help families affected by natural disasters',
    goal: 10000,
    raised: 7890,
    donors: 156,
    image: '🆘',
  },
  {
    id: 3,
    title: 'Tech for All',
    description: 'Provide technology access to underserved communities',
    goal: 8000,
    raised: 2100,
    donors: 28,
    image: '💻',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function CampaignsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex justify-between items-center mb-12" variants={itemVariants}>
          <div>
            <h1 className="text-3xl font-bold mb-2">Campaigns</h1>
            <p className="text-gray-400">Create and support fundraising campaigns</p>
          </div>
          <Link href="/dashboard/campaigns/new">
            <button className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Campaign
            </button>
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {campaigns.map((campaign) => {
            const progress = (campaign.raised / campaign.goal) * 100;
            return (
              <motion.div
                key={campaign.id}
                className="card group cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{campaign.image}</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {campaign.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{campaign.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">{campaign.raised.toLocaleString()} XLM</span>
                    <span className="text-primary font-semibold">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-400 border-t border-gray-700 pt-4">
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>{campaign.goal.toLocaleString()} XLM</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{campaign.donors} donors</span>
                  </div>
                </div>

                <button className="w-full mt-4 btn-secondary text-sm">
                  Donate Now
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}