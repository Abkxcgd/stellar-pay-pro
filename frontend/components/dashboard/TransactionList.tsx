'use client';

import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'payment' | 'donation' | 'invoice' | 'campaign';
  description: string;
  amount: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'payment',
    description: 'Payment to Alice Johnson',
    amount: '1,500.00 XLM',
    status: 'completed',
    date: '2024-01-20',
  },
  {
    id: '2',
    type: 'donation',
    description: 'Donation to Community Education',
    amount: '500.00 XLM',
    status: 'completed',
    date: '2024-01-19',
  },
  {
    id: '3',
    type: 'invoice',
    description: 'Invoice INV-002 from Bob',
    amount: '2,350.50 XLM',
    status: 'pending',
    date: '2024-01-18',
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case 'completed':
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-success/20 text-success">
          <CheckCircle className="w-3 h-3" />
          Completed
        </span>
      );
    case 'pending':
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-warning/20 text-warning">
          <Clock className="w-3 h-3" />
          Pending
        </span>
      );
    case 'failed':
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-error/20 text-error">
          <AlertCircle className="w-3 h-3" />
          Failed
        </span>
      );
    default:
      return null;
  }
}

export default function TransactionList() {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="space-y-4">
        {mockTransactions.map((tx, index) => (
          <motion.div
            key={tx.id}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-700/30 hover:border-primary/30 transition-all"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex-1">
              <p className="font-semibold text-sm mb-1">{tx.description}</p>
              <p className="text-xs text-gray-400">{tx.date}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm mb-2">{tx.amount}</p>
              {getStatusBadge(tx.status)}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}