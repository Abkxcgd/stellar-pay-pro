'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

const transactions = [
  {
    id: 1,
    address: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    type: 'Send',
    amount: '1,500.00 XLM',
    status: 'Success',
    date: '2024-01-20 14:30',
  },
  {
    id: 2,
    address: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    type: 'Receive',
    amount: '2,350.50 XLM',
    status: 'Success',
    date: '2024-01-20 13:15',
  },
  {
    id: 3,
    address: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    type: 'Send',
    amount: '3,200.00 XLM',
    status: 'Failed',
    date: '2024-01-20 12:45',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage transactions and monitor activity</p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="flex gap-4 mb-8 flex-col md:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="all">All Types</option>
                <option value="send">Send</option>
                <option value="receive">Receive</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Transactions Table */}
        <motion.div
          className="card overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Address</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold">#{tx.id}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-400">{tx.address.slice(0, 20)}...</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        tx.type === 'Send' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold">{tx.amount}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        tx.status === 'Success' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}