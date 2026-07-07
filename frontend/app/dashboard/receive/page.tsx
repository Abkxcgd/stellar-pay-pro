'use client';

import { motion } from 'framer-motion';
import { useWallet } from '@/hooks/useWallet';
import QRCode from 'qrcode.react';
import { Copy, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function ReceivePage() {
  const { address } = useWallet();

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard');
    }
  };

  const handleDownloadQR = () => {
    const qrCode = document.querySelector('canvas');
    if (qrCode) {
      const url = (qrCode as HTMLCanvasElement).toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qr-code.png';
      link.click();
      toast.success('QR code downloaded');
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-2">Receive XLM</h1>
          <p className="text-gray-400">Share your wallet address or QR code to receive payments</p>
        </motion.div>

        <motion.div
          className="card text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-6">Your Wallet Address</h2>

          {/* QR Code */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="p-4 bg-white rounded-lg">
              {address && <QRCode value={address} size={256} level="H" includeMargin={true} />}
            </div>
          </motion.div>

          {/* Address Display */}
          <motion.div
            className="bg-gray-800 rounded-lg p-4 mb-6 break-all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-xs text-gray-400 mb-2">Stellar Address</p>
            <p className="font-mono text-sm">{address}</p>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button onClick={handleCopyAddress} className="btn-primary flex-1 inline-flex items-center justify-center gap-2">
              <Copy className="w-5 h-5" />
              Copy Address
            </button>
            <button onClick={handleDownloadQR} className="btn-secondary flex-1 inline-flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download QR
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}