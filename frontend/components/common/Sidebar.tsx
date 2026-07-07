'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Send,
  Heart,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useState } from 'react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Send, label: 'Send Payment', href: '/dashboard/send' },
  { icon: Heart, label: 'Campaigns', href: '/dashboard/campaigns' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: FileText, label: 'Invoices', href: '/dashboard/invoices' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { disconnect, address } = useWallet();
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.aside
      className="fixed left-0 top-0 h-screen bg-gray-900/50 backdrop-blur-md border-r border-gray-800 pt-20 w-64 overflow-y-auto hidden md:flex flex-col"
      initial={{ x: -256 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 flex-1">
        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href);

            return (
              <Link key={item.href} href={item.href}>
                <motion.button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary/20 text-primary'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </motion.button>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Wallet Info */}
      <div className="p-6 border-t border-gray-800">
        <div className="mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Wallet Address</p>
          <p className="text-xs font-mono text-gray-300 break-all line-clamp-2">
            {address?.slice(0, 16)}...
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <button className="w-full btn-secondary text-sm py-2 flex items-center justify-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button
            onClick={disconnect}
            className="w-full btn-ghost text-sm py-2 flex items-center justify-center gap-2 text-error hover:text-error"
          >
            <LogOut className="w-4 h-4" />
            Disconnect
          </button>
        </div>
      </div>
    </motion.aside>
  );
}