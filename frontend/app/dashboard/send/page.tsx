'use client';

import { motion } from 'framer-motion';
import SendPaymentForm from '@/components/payment/SendPaymentForm';
import WalletCard from '@/components/wallet/WalletCard';

export default function SendPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-2">Send XLM</h1>
          <p className="text-gray-400">Transfer XLM to any Stellar address</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SendPaymentForm />
          </div>
          <div>
            <WalletCard />
          </div>
        </div>
      </motion.div>
    </div>
  );
}