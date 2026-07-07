'use client';

import { ReactNode } from 'react';
import Sidebar from '@/components/common/Sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-0 min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}