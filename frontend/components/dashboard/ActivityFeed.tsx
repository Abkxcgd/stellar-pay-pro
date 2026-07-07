'use client';

import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Clock, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'send' | 'receive';
  address: string;
  amount: string;
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
  hash?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'send',
    address: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    amount: '1,500.00 XLM',
    status: 'success',
    timestamp: '2024-01-20 14:30',
    hash: 'abc123def456',
  },
  {
    id: '2',
    type: 'receive',
    address: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    amount: '2,350.50 XLM',
    status: 'success',
    timestamp: '2024-01-20 13:15',
    hash: 'xyz789uvw012',
  },
  {
    id: '3',
    type: 'send',
    address: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    amount: '800.00 XLM',
    status: 'pending',
    timestamp: '2024-01-20 12:45',
  },
  {
    id: '4',
    type: 'receive',
    address: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    amount: '500.00 XLM',
    status: 'failed',
    timestamp: '2024-01-20 11:20',
    hash: 'failed123',
  },
];

function getStatusIcon(status: string): LucideIcon {
  switch (status) {
    case 'success':
      return CheckCircle;
    case 'pending':
      return Clock;
    default:
      return AlertCircle;
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'success':
      return 'text-success';
    case 'pending':
      return 'text-warning animate-spin';
    default:
      return 'text-error';
  }
}

export default function ActivityFeed() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="card"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-4">
        {mockTransactions.map((tx, index) => {
          const StatusIcon = getStatusIcon(tx.status);
          const TypeIcon = tx.type === 'send' ? ArrowUpRight : ArrowDownLeft;
          const typeColor = tx.type === 'send' ? 'text-error' : 'text-success';
          const statusColor = getStatusColor(tx.status);

          return (
            <motion.div
              key={tx.id}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-800/50 transition-colors border border-gray-700/50"
              variants={itemVariants}
            >
              {/* Icon */}
              <div className={`p-3 rounded-lg ${
                tx.type === 'send' ? 'bg-error/20' : 'bg-success/20'
              }`}>
                <TypeIcon className={`w-5 h-5 ${typeColor}`} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold capitalize">
                    {tx.type} XLM
                  </p>
                  <StatusIcon className={`w-4 h-4 ${statusColor}`} />
                </div>
                <p className="text-sm text-gray-400 truncate">{tx.address}</p>
                <p className="text-xs text-gray-500 mt-1">{tx.timestamp}</p>
              </div>

              {/* Amount */}
              <div className="text-right">
                <p className={`font-semibold ${
                  tx.type === 'send' ? 'text-error' : 'text-success'
                }`}>
                  {tx.type === 'send' ? '-' : '+'}{tx.amount}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}