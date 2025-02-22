'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Brain, Heart } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center pt-16 relative">
      <div className="absolute inset-0 gif-background"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              <span className="gradient-text">Transforming Healthcare</span>
              <br />
              with AI & Innovation
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
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
              className="group"
            >
              <Brain className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Explore Healthify
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group"
            >
              <Heart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Try Cardionix
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12"
          >
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