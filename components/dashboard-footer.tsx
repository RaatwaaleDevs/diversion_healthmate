'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';

export function DashboardFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white text-center py-4 border-t mt-auto">
      <p className="text-gray-500">&copy; {currentYear} HealthMate by Raatwaale Devs. All rights reserved.</p>
    </footer>
  );
}