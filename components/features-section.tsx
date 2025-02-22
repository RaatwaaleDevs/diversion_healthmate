'use client';

import { motion } from 'framer-motion';
import { Heart, Brain, Calendar, Shield, Trophy, ChartLine } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Health Insights",
      description: "Get personalized health recommendations powered by advanced AI"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Heart Analysis",
      description: "Real-time heart health monitoring and early warning system"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Smart Scheduling",
      description: "AI-powered appointment booking and reminders"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Data",
      description: "Enterprise-grade security for your health information"
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Health Score",
      description: "Gamified health tracking and achievement system"
    },
    {
      icon: <ChartLine className="h-6 w-6" />,
      title: "Progress Tracking",
      description: "Visual insights into your health journey"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the future of healthcare with our innovative features
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-lg border border-gray-100 hover:border-primary/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}