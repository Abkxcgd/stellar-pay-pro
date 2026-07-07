'use client';

import { useQuery } from '@tanstack/react-query';
import { useWallet } from './useWallet';
import { fetchTransactionHistory } from '@/lib/stellar';

export interface Transaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  amount: string;
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
  type: 'send' | 'receive';
}

export function useTransactionHistory(limit: number = 20) {
  const { address, connected } = useWallet();

  const { data: transactions = [], isLoading: loading, error } = useQuery({
    queryKey: ['transactions', address, limit],
    queryFn: async () => {
      if (!address) return [];
      return await fetchTransactionHistory(address, limit);
    },
    enabled: connected && !!address,
    refetchInterval: 15000, // Refetch every 15 seconds
    staleTime: 10000,
  });

  return {
    transactions,
    loading,
    error: error?.message || null,
  };
}
