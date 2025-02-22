'use client';

import { motion } from 'framer-motion';
import { Apple, Dumbbell, Pill as Pills, Brain } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function TreatmentPage() {
  const plans = [
    {
      title: "Diet Plan",
      icon: <Apple className="h-6 w-6" />,
      items: [
        "Breakfast: Oatmeal with berries",
        "Lunch: Grilled chicken salad",
        "Dinner: Salmon with vegetables"
      ]
    },
    {
      title: "Exercise Routine",
      icon: <Dumbbell className="h-6 w-6" />,
      items: [
        "30 min cardio daily",
        "Strength training 3x/week",
        "Yoga for flexibility"
      ]
    },
    {
      title: "Medications",
      icon: <Pills className="h-6 w-6" />,
      items: [
        "Aspirin - 1 tablet daily",
        "Vitamin D - Morning",
        "Omega-3 - Evening"
      ]
    },
    {
      title: "Mental Wellness",
      icon: <Brain className="h-6 w-6" />,
      items: [
        "Daily meditation",
        "Stress management",
        "Sleep hygiene"
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-6"
      >
        My Treatment Plan
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  {plan.icon}
                </div>
                <h2 className="text-xl font-semibold">{plan.title}</h2>
              </div>
              <ul className="space-y-2">
                {plan.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}