'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">Page not found</p>
        <p className="text-gray-500 mb-8 max-w-md">The page you are looking for doesn't exist or has been moved.</p>
        <Link href="/">
          <button className="btn-primary">Back to Home</button>
        </Link>
      </motion.div>
    </div>
  );
}