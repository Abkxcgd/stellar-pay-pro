'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Send, ArrowUpRight } from 'lucide-react';

const transactionData = [
  { date: 'Jan', value: 4000 },
  { date: 'Feb', value: 3000 },
  { date: 'Mar', value: 5000 },
  { date: 'Apr', value: 4500 },
  { date: 'May', value: 6000 },
  { date: 'Jun', value: 5500 },
];

const categoryData = [
  { name: 'Payments', value: 45 },
  { name: 'Donations', value: 30 },
  { name: 'Transfers', value: 15 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#0ea5e9', '#2563eb', '#7c3aed', '#f59e0b'];

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

export default function AnalyticsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-12" variants={itemVariants}>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-gray-400">Track your transaction patterns and insights</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
        >
          {[
            {
              icon: TrendingUp,
              label: 'Total Transactions',
              value: '1,234',
              change: '+12.5%',
            },
            {
              icon: Send,
              label: 'Total Sent',
              value: '5,432.50 XLM',
              change: '+8.2%',
            },
            {
              icon: ArrowUpRight,
              label: 'Total Received',
              value: '3,210.75 XLM',
              change: '+15.3%',
            },
            {
              icon: DollarSign,
              label: 'Average Transaction',
              value: '6.91 XLM',
              change: '-2.1%',
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={index} className="card" variants={itemVariants}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm text-success">{stat.change}</span>
                </div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart */}
          <motion.div className="card" variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6">Transaction Volume</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={transactionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  dot={{ fill: '#0ea5e9', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div className="card" variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6">Transaction Categories</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}