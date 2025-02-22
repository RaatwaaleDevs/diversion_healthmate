'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Calendar, 
  ClipboardList, 
  FileText, 
  Brain, 
  Heart, 
  LineChart, 
  Users, 
  ShoppingBag, 
  CreditCard, 
  Settings, 
  HelpCircle 
} from 'lucide-react';

interface DashboardNavProps {
  isOpen: boolean;
}

export function DashboardNav({ isOpen }: DashboardNavProps) {
  const menuItems = [
    { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard', href: '/dashboard' },
    { icon: <Calendar className="h-5 w-5" />, label: 'Appointments', href: '/dashboard/appointments' },
    { icon: <ClipboardList className="h-5 w-5" />, label: 'Treatment Plan', href: '/dashboard/treatment' },
    { icon: <FileText className="h-5 w-5" />, label: 'Health Records', href: '/dashboard/records' },
    { icon: <Brain className="h-5 w-5" />, label: 'AI Analysis', href: '/dashboard/analysis' },
    { icon: <Heart className="h-5 w-5" />, label: 'Heart Health', href: '/dashboard/heart' },
    { icon: <LineChart className="h-5 w-5" />, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: <Users className="h-5 w-5" />, label: 'Family Health', href: '/dashboard/family' },
    { icon: <ShoppingBag className="h-5 w-5" />, label: 'Marketplace', href: '/dashboard/marketplace' },
    { icon: <CreditCard className="h-5 w-5" />, label: 'Payments', href: '/dashboard/payments' },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings', href: '/dashboard/settings' },
    { icon: <HelpCircle className="h-5 w-5" />, label: 'Help & Support', href: '/dashboard/help' },
  ];

  return (
    <motion.nav
      initial={false}
      animate={{ width: isOpen ? 256 : 80 }}
      className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r z-20 overflow-x-hidden`}
    >
      <div className="py-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors ${
              isOpen ? 'space-x-3' : 'justify-center'
            }`}
          >
            {item.icon}
            {isOpen && <span>{item.label}</span>}
            
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}