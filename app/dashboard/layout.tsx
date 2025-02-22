"use client";

import '../globals.css';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { DashboardFooter } from '@/components/dashboard-footer';

const inter = Inter({ subsets: ['latin'] });

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <html lang="en">
      <body className={inter.className}>
        <DashboardHeader
          isSidebarOpen={isSidebarOpen}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className="flex flex-col min-h-screen">
          <div className="flex flex-1">
            <DashboardNav isOpen={isSidebarOpen} />
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
              {children}
            </main>
          </div>
          <DashboardFooter />
        </div>
      </body>
    </html>
  );
}