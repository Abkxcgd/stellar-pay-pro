'use client';

import { useState } from 'react';
import { useWallet } from './useWallet';
import { sendPayment } from '@/lib/stellar';
import { validateAddress, validateAmount } from '@/utils/validators';

interface TransactionParams {
  toAddress: string;
  amount: string;
  memo?: string;
}

interface TransactionResult {
  hash?: string;
  status: 'success' | 'error' | 'pending';
  message: string;
}

export function useTransaction() {
  const { address, signTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendTransaction = async (params: TransactionParams): Promise<TransactionResult> => {
    try {
      setLoading(true);
      setError(null);

      // Validation
      if (!address) {
        throw new Error('Wallet not connected');
      }

      if (!validateAddress(params.toAddress)) {
        throw new Error('Invalid recipient address');
      }

      if (!validateAmount(params.amount)) {
        throw new Error('Invalid amount');
      }

      // Send transaction
      const result = await sendPayment({
        fromAddress: address,
        toAddress: params.toAddress,
        amount: params.amount,
        memo: params.memo,
        signTransaction,
      });

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Transaction failed';
      setError(errorMessage);
      return {
        status: 'error',
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    sendTransaction,
    loading,
    error,
  };
}
