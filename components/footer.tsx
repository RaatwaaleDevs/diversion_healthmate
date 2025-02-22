'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';

export function MainFooter() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">HealthTech AI</span>
            </div>
            <p className="text-gray-600">
              Transforming healthcare with AI & innovation
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-primary">Home</Link></li>
              <li><Link href="/blogs" className="text-gray-600 hover:text-primary">Blogs</Link></li>
              <li><Link href="/moodify" className="text-gray-600 hover:text-primary">Mind Wellness</Link></li>
              <li><Link href="/cardify" className="text-gray-600 hover:text-primary">Heart Wellness</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-600 hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-primary">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-gray-600 hover:text-primary">Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">support@healthtech.ai</li>
              <li className="text-gray-600">+1 (555) 123-4567</li>
              <li className="text-gray-600">123 Health Street</li>
              <li className="text-gray-600">San Francisco, CA 94105</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} HealthTech AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
