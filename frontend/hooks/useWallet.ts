'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as StellarSdk from '@stellar/js-sdk';
import { toast } from 'sonner';

interface WalletContextType {
  connected: boolean;
  address: string | null;
  publicKey: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  signTransaction: (xdr: string) => Promise<string>;
  loading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize wallet on mount
  useEffect(() => {
    const initWallet = async () => {
      try {
        // Check if Freighter is installed
        if (!window.__freighter) {
          return;
        }

        // Check if already connected
        const publicKey = await window.__freighter?.getPublicKey();
        if (publicKey) {
          setAddress(publicKey);
          setPublicKey(publicKey);
          setConnected(true);
        }
      } catch (error) {
        console.error('Failed to initialize wallet:', error);
      }
    };

    initWallet();
  }, []);

  const connect = async () => {
    try {
      setLoading(true);

      // Check if Freighter is installed
      if (!window.__freighter) {
        toast.error('Freighter wallet is not installed');
        return;
      }

      // Request connection
      const publicKey = await window.__freighter.getPublicKey();
      
      if (publicKey) {
        setAddress(publicKey);
        setPublicKey(publicKey);
        setConnected(true);
        toast.success('Wallet connected successfully');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect wallet';
      toast.error(errorMessage);
      console.error('Wallet connection error:', error);
    } finally {
      setLoading(false);
    }
  };

  const disconnect = () => {
    setConnected(false);
    setAddress(null);
    setPublicKey(null);
    toast.success('Wallet disconnected');
  };

  const signTransaction = async (xdr: string): Promise<string> => {
    try {
      if (!window.__freighter) {
        throw new Error('Freighter wallet is not installed');
      }

      const signedXdr = await window.__freighter.signTransaction(xdr, {
        network: process.env.NEXT_PUBLIC_FREIGHTER_NETWORK_PASSPHRASE,
      });

      return signedXdr;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign transaction';
      throw new Error(errorMessage);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        connected,
        address,
        publicKey,
        connect,
        disconnect,
        signTransaction,
        loading,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
}

// Extend window to include Freighter types
declare global {
  interface Window {
    __freighter?: {
      getPublicKey: () => Promise<string>;
      signTransaction: (xdr: string, options: any) => Promise<string>;
      isConnected: () => Promise<boolean>;
    };
  }
}
