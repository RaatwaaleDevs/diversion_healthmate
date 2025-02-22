'use client';

import { motion } from 'framer-motion';
import { Menu, Bell, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  isSidebarOpen: boolean;
  onMenuClick: () => void;
}

export function DashboardHeader({ isSidebarOpen, onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="dashboard-header h-16 bg-white border-b fixed top-0 left-0 right-0 z-30">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <span className="font-bold text-xl text-primary">HealthMate</span>
          </motion.div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <Settings className="h-5 w-5" />
          </Button>
          <div className="h-8 w-px bg-gray-200" />
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <p className="font-medium">Sk Riyaz</p>
              <p className="text-gray-500">riyaz.skk1@gmail.com</p>
            </div>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

