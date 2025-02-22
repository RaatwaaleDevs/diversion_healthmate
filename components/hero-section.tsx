'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Brain, Heart } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative">
      <div className="absolute inset-0 gif-background"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 text-black relative">
              Transforming Healthcare 
              <br />
              <span className="text-black">with</span> <span className="text-red-600">AI & Innovation</span>
              <div className="absolute inset-x-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/5 bg-gradient-to-r from-red-500 to-red-500 opacity-30 rounded-lg blur-lg"></div>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl text-gray-700 mb-8 max-w-2xl mx-auto font-serif"
          >
            Experience the future of healthcare with our AI-powered platform.
            Personalized health insights, real-time monitoring, and advanced
            analytics at your fingertips.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Button
              size="lg"
              className="group bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
            >
              <Brain className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Explore Healthify
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
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
*/