'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, FileText, Download, Eye } from 'lucide-react';

const invoices = [
  {
    id: 'INV-001',
    recipient: 'Alice Johnson',
    amount: '1,500.00 XLM',
    status: 'Paid',
    date: '2024-01-15',
  },
  {
    id: 'INV-002',
    recipient: 'Bob Smith',
    amount: '2,350.50 XLM',
    status: 'Pending',
    date: '2024-01-18',
  },
  {
    id: 'INV-003',
    recipient: 'Carol Davis',
    amount: '3,200.00 XLM',
    status: 'Paid',
    date: '2024-01-20',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function InvoicesPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex justify-between items-center mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div>
            <h1 className="text-3xl font-bold mb-2">Invoices</h1>
            <p className="text-gray-400">Create and manage payment invoices</p>
          </div>
          <Link href="/dashboard/invoices/new">
            <button className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Invoice
            </button>
          </Link>
        </motion.div>

        <motion.div
          className="card overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Invoice ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Recipient</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <motion.tr
                    key={invoice.id}
                    className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4 text-sm font-semibold">{invoice.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{invoice.recipient}</td>
                    <td className="px-6 py-4 text-sm font-semibold">{invoice.amount}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          invoice.status === 'Paid'
                            ? 'bg-success/20 text-success'
                            : 'bg-warning/20 text-warning'
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{invoice.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}