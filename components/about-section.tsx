'use client';

import { motion } from 'framer-motion';
import { Activity, Shield, Zap, Brain, HeartPulse, BatteryPlus } from 'lucide-react';

export function AboutSection() {
  const features = [
    {
      icon: <Activity className="h-6 w-6" />,
      title: "AI-Powered Analytics",
      description: "Advanced health monitoring using state-of-the-art AI algorithms"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Private",
      description: "Your health data is protected with enterprise-grade security"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Insights",
      description: "Instant health analytics and personalized recommendations"
    },
    {
      icon: <BatteryPlus className="h-6 w-6" />,
      title: "Promoting Healthy Living",
      description: "Encouraging healthy habits and lifestyle changes"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Mental Wellness",
      description: "Monitoring mental health and providing support"
    },
    {
      icon: <HeartPulse className="h-6 w-6" />,
      title: "CVD Alerts",
      description: "Early detection of Cardiovascular Diseases and alerts"
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
          <h2 className="text-3xl font-bold mb-4">About Our Mission</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're revolutionizing healthcare through artificial intelligence and machine learning,
            making advanced health monitoring accessible to everyone.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}