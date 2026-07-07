'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  title: string;
  message: string;
  onDismiss?: () => void;
}

export default function ErrorAlert({ title, message, onDismiss }: ErrorAlertProps) {
  return (
    <motion.div
      className="p-4 rounded-lg bg-error/20 border border-error/30 text-error flex items-start gap-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm opacity-90">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-sm font-semibold hover:underline flex-shrink-0"
        >
          Dismiss
        </button>
      )}
    </motion.div>
  );
}