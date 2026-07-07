'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { useTransaction } from '@/hooks/useTransaction';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface TransactionResult {
  hash?: string;
  status: 'success' | 'error' | 'pending';
  message: string;
}

interface SendPaymentFormProps {
  onSuccess?: (result: TransactionResult) => void;
}

export default function SendPaymentForm({ onSuccess }: SendPaymentFormProps) {
  const { address, connected } = useWallet();
  const { sendTransaction, loading } = useTransaction();
  const [formData, setFormData] = useState({
    recipientAddress: '',
    amount: '',
    memo: '',
  });
  const [result, setResult] = useState<TransactionResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.recipientAddress) {
      toast.error('Recipient address is required');
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error('Amount must be greater than 0');
      return;
    }

    if (formData.recipientAddress === address) {
      toast.error('Cannot send to the same address');
      return;
    }

    try {
      const txResult = await sendTransaction({
        toAddress: formData.recipientAddress,
        amount: formData.amount,
        memo: formData.memo,
      });

      setResult(txResult);
      if (txResult.status === 'success') {
        toast.success('Transaction sent successfully!');
        setFormData({ recipientAddress: '', amount: '', memo: '' });
        onSuccess?.(txResult);
      } else if (txResult.status === 'pending') {
        toast.info('Transaction is pending...');
      } else {
        toast.error(txResult.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Transaction failed';
      toast.error(errorMessage);
      setResult({
        status: 'error',
        message: errorMessage,
      });
    }
  };

  if (!connected) {
    return (
      <motion.div
        className="card text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <AlertCircle className="w-12 h-12 text-warning mx-auto mb-4" />
        <p className="text-gray-400">Connect your wallet to send payments</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <h2 className="text-2xl font-bold mb-6">Send XLM</h2>

      {result && (
        <motion.div
          className={`p-4 rounded-lg mb-6 flex items-start gap-3 ${
            result.status === 'success'
              ? 'bg-success/20 text-success'
              : result.status === 'error'
              ? 'bg-error/20 text-error'
              : 'bg-warning/20 text-warning'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {result.status === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          ) : result.status === 'error' ? (
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          ) : (
            <Clock className="w-5 h-5 flex-shrink-0 mt-0.5 animate-spin" />
          )}
          <div className="flex-1">
            <p className="font-semibold mb-1">{result.message}</p>
            {result.hash && (
              <p className="text-xs font-mono opacity-75 break-all">{result.hash}</p>
            )}
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Recipient Address */}
        <div>
          <label className="block text-sm font-medium mb-2">Recipient Address</label>
          <input
            type="text"
            name="recipientAddress"
            value={formData.recipientAddress}
            onChange={handleChange}
            placeholder="G..."
            className="w-full input"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium mb-2">Amount (XLM)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="w-full input"
            required
          />
        </div>

        {/* Memo */}
        <div>
          <label className="block text-sm font-medium mb-2">Memo (Optional)</label>
          <textarea
            name="memo"
            value={formData.memo}
            onChange={handleChange}
            placeholder="Add a note..."
            rows={3}
            className="w-full input"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Send Payment'}
        </button>
      </form>
    </motion.div>
  );
}