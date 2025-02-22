'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Brain, Heart } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center pt-16 relative">
      <div className="absolute inset-0 gif-background"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 opacity-50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 text-white">
              <span className="gradient-text">Transforming Healthcare</span>
              <br />
              with AI & Innovation
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl text-gray-100 mb-8 max-w-2xl mx-auto"
          >
            Experience the future of healthcare with our AI-powered platform.
            Personalized health insights, real-time monitoring, and advanced
            analytics at your fingertips.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="group bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 transition-all duration-300"
            >
              <Brain className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Explore Healthify
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group background-red border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              <Heart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Try Cardionix
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Add the following CSS to your global stylesheet or a CSS module
/*
.gif-background {
  background: url('/path/to/your-background.gif') no-repeat center center;
  background-size: cover;
  opacity: 0.1;
}
.gradient-text {
  background: linear-gradient(to right, #00c6ff, #0072ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
*/