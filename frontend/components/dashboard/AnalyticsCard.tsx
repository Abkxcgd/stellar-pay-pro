'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: LucideIcon;
  trend?: 'up' | 'down';
}

export default function AnalyticsCard({
  title,
  value,
  change,
  icon: Icon,
  trend = 'up',
}: AnalyticsCardProps) {
  const isPositive = change.startsWith('+');

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-primary/20">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span className={`text-sm font-semibold ${
          isPositive ? 'text-success' : 'text-error'
        }`}>
          {change}
        </span>
      </div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </motion.div>
  );
}