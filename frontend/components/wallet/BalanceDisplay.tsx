'use client';

import { motion } from 'framer-motion';
import { useWallet } from '@/hooks/useWallet';
import { useBalance } from '@/hooks/useBalance';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { TrendingUp } from 'lucide-react';

export default function BalanceDisplay() {
  const { connected } = useWallet();
  const { balance, loading, error } = useBalance();

  if (!connected) {
    return null;
  }

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">XLM Balance</h3>
        <TrendingUp className="w-5 h-5 text-success" />
      </div>

      {loading ? (
        <div className="py-8">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-error text-sm py-8">{error}</div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-5xl font-bold gradient-text">{balance.toFixed(2)}</p>
            <p className="text-gray-400 text-sm mt-2">Available Balance</p>
          </div>

          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex justify-between">
              <span>Minimum Balance</span>
              <span>5 XLM</span>
            </div>
            <div className="flex justify-between">
              <span>Tradeable Balance</span>
              <span>{Math.max(0, balance - 5).toFixed(2)} XLM</span>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}