'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Brain, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoginRegisterModal } from '@/components/login-register-modal';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-red-500" />
                <span className="font-bold text-xl">HealthMate</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/blogs" className="nav-link">Blogs</Link>
              <Link href="/cardify" className="nav-link">Heart Wellness</Link>
              <Link href="/Nearby" className="nav-link">Nearby Health Centers</Link>
              <Link href="/" className="nav-link">About Us</Link>
             
              <Button
                variant="default"
                size="sm"
                className="bg-red-500 text-white hover:bg-white hover:text-red-500"
                onClick={() => router.push('/login')}
              >
                Login
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-gray-500 text-white hover:bg-red-500 hover:text-white"
                onClick={() => router.push('/register')}
              >
                Start Free
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="default"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/" className="mobile-nav-link">Home</Link>
                <Link href="/blogs" className="mobile-nav-link">Blogs</Link>
                <Link href="/moodify" className="mobile-nav-link">Mind Wellness</Link>
                <Link href="/cardify" className="mobile-nav-link">Heart Wellness</Link>
                <Link href="/" className="mobile-nav-link">About Us</Link>
                <Link href="/" className="mobile-nav-link">Contact Us</Link>
                <Button
                  className="w-full mt-4 bg-red-500 text-white hover:bg-white hover:text-red-500"
                  onClick={() => router.push('/login')}
                >
                  Login
                </Button>
                <Button
                  className="w-full mt-4 bg-gray-500 text-white hover:bg-red-500 hover:text-white"
                  onClick={() => router.push('/register')}
                >
                  Start Free
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>
    </>
  );
}