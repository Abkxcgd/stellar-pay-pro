'use client';

import { motion } from 'framer-motion';
import { useWallet } from '@/hooks/useWallet';
import { Wallet, Copy, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export default function WalletCard() {
  const { address, connected, disconnect, connect } = useWallet();
  const [showMenu, setShowMenu] = useState(false);

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard');
    }
  };

  if (!connected) {
    return (
      <motion.div
        className="card text-center py-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Wallet className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
        <p className="text-gray-400 mb-6">Connect Freighter to get started</p>
        <button onClick={connect} className="btn-primary">
          Connect Wallet
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/20">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Stellar Wallet</p>
            <p className="font-semibold text-white">Connected</p>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            ⋯
          </button>
          {showMenu && (
            <motion.div
              className="absolute right-0 mt-2 bg-gray-900 border border-gray-800 rounded-lg shadow-lg w-48 z-50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <button
                onClick={handleCopyAddress}
                className="w-full text-left px-4 py-2 hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm"
              >
                <Copy className="w-4 h-4" />
                Copy Address
              </button>
              <button
                onClick={() => {
                  disconnect();
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm text-error"
              >
                <LogOut className="w-4 h-4" />
                Disconnect
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Address Display */}
      <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Address</p>
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-sm break-all">{address}</p>
          <button
            onClick={handleCopyAddress}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Network Info */}
      <div className="text-xs text-gray-400">
        <p className="mb-2">
          <span className="text-gray-500">Network:</span> Stellar Testnet
        </p>
        <p>
          <span className="text-gray-500">Status:</span>
          <span className="ml-2 text-success">● Connected</span>
        </p>
      </div>
    </motion.div>
  );
}