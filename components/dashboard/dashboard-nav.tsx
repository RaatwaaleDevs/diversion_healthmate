'use client';

import { useState } from 'react';
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
  HelpCircle, 
  Headphones, 
  BookOpen, 
  MessageSquare, 
  Activity 
} from 'lucide-react';

interface DashboardNavProps {
  isOpen: boolean;
}

export function DashboardNav({ isOpen }: DashboardNavProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const menuItems = [
    { label: 'Dashboard', items: [
      { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard', href: '/dashboard' },
      { icon: <Heart className="h-5 w-5" />, label: 'Health Status', href: '/dashboard/health-status' },
      { icon: <Calendar className="h-5 w-5" />, label: 'Appointments', href: '/dashboard/appointments' }
    ]},
    { label: 'Heart Wellness', items: [
      { icon: <Heart className="h-5 w-5" />, label: 'CVD Test', href: '/dashboard/cvd-test' },
      { icon: <FileText className="h-5 w-5" />, label: 'Reports', href: '/dashboard/records' },
      { icon: <ClipboardList className="h-5 w-5" />, label: 'Treatment Plan', href: '/dashboard/treatment' }
    ]},
    { label: 'Mind Wellness', items: [
      { icon: <Brain className="h-5 w-5" />, label: 'Consult Dr. AI', href: '/dashboard/ai-doc' },
      { icon: <Activity className="h-5 w-5" />, label: 'Build Habits', href: '/dashboard/build-habits' },
      { icon: <LineChart className="h-5 w-5" />, label: 'Activity Summary', href: '/dashboard/activity-summary' }
    ]},
    { label: 'Explore', items: [
      { icon: <Headphones className="h-5 w-5" />, label: 'Audio Therapy', href: '/dashboard/audio-therapy' },
      { icon: <Activity className="h-5 w-5" />, label: 'Yoga Therapy', href: '/dashboard/yoga-therapy' },
      { icon: <BookOpen className="h-5 w-5" />, label: 'Reading Therapy', href: '/dashboard/reading-therapy' }
    ]},
    { label: 'Settings & Support', items: [
      { icon: <Settings className="h-5 w-5" />, label: 'Settings', href: '/dashboard/settings' },
      { icon: <HelpCircle className="h-5 w-5" />, label: 'Help & Support', href: '/dashboard/help' }
    ]}
  ];

  return (
    <motion.nav
      initial={false}
      animate={{ width: isOpen ? 256 : 80 }}
      className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r z-20 overflow-x-hidden`}
    >
      <div className="py-4">
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-4">
            {isOpen && <h3 className="px-4 py-2 text-sm font-semibold text-gray-500">{section.label}</h3>}
            {section.items.map((item, itemIndex) => (
              <Link
                key={itemIndex}
                href={item.href}
                className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors ${
                  isOpen ? 'space-x-3' : 'justify-center'
                } ${activeItem === item.href ? 'bg-red-500 text-white' : ''}`}
                onClick={() => setActiveItem(item.href)}
              >
                {item.icon}
                {isOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </motion.nav>
  );
}