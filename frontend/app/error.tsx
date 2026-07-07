'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-6xl font-bold gradient-text mb-4">Oops!</h1>
        <p className="text-xl text-gray-400 mb-8">Something went wrong</p>
        <p className="text-gray-500 mb-8 max-w-md">{error.message}</p>
        <div className="flex gap-4 justify-center">
          <button onClick={reset} className="btn-primary">
            Try Again
          </button>
          <Link href="/">
            <button className="btn-secondary">Go Home</button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}