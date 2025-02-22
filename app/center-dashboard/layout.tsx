'use client';

import { useState } from 'react';
import { DashboardNav } from '@/components/center-dashboard/dashboard-nav';
import { DashboardHeader } from '@/components/center-dashboard/dashboard-header';

export default function CenterDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        isSidebarOpen={isSidebarOpen}
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex h-[calc(100vh-64px)]">
        <DashboardNav isOpen={isSidebarOpen} />
        <main className={`flex-1 overflow-auto transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}>
          {children}
        </main>
      </div>
    </div>
  );
}