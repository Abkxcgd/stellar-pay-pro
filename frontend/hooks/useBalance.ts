'use client';

import { useQuery } from '@tanstack/react-query';
import { useWallet } from './useWallet';
import { fetchBalance } from '@/lib/stellar';

export function useBalance() {
  const { address, connected } = useWallet();

  const { data: balance = 0, isLoading: loading, error } = useQuery({
    queryKey: ['balance', address],
    queryFn: async () => {
      if (!address) return 0;
      return await fetchBalance(address);
    },
    enabled: connected && !!address,
    refetchInterval: 10000, // Refetch every 10 seconds
    staleTime: 5000,
  });

  return {
    balance,
    loading,
    error: error?.message || null,
  };
}
