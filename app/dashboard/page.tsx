'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Heart,
  Calendar,
  Brain,
  Activity,
  MessageCircle,
  ArrowRight,
  UserPlus,
  BookOpen,
  Headphones,
  MessageSquare
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Welcome back, John!</h1>
          <p className="text-gray-500">Let's take care of your health today</p>
        </div>
        <Button className="group">
          <MessageCircle className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
          Chat with AI Doc
        </Button>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-2"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Guided Health Therapy</h2>
              <Button variant="outline" size="sm">
                Start New Session
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'Heart Analysis', icon: <Heart className="h-5 w-5" />, color: 'bg-red-100 text-red-600' },
                { name: 'Mental Wellness', icon: <Brain className="h-5 w-5" />, color: 'bg-purple-100 text-purple-600' },
                { name: 'Physical Activity', icon: <Activity className="h-5 w-5" />, color: 'bg-green-100 text-green-600' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border hover:border-primary/50 cursor-pointer transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center mb-3`}>
                    {item.icon}
                  </div>
                  <p className="font-medium">{item.name}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Health Score</h2>
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-3xl font-bold">85</span>
                <span className="text-sm text-gray-500">/ 100</span>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-sm text-gray-600">Your health is in excellent condition!</p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Therapy Options */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Explore Therapy</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Audio Therapy', icon: <Headphones className="h-5 w-5" />, color: 'bg-blue-100 text-blue-600' },
                { name: 'Reading Therapy', icon: <BookOpen className="h-5 w-5" />, color: 'bg-yellow-100 text-yellow-600' },
                { name: 'Talk Therapy', icon: <MessageSquare className="h-5 w-5" />, color: 'bg-green-100 text-green-600' },
                { name: 'Find Therapist', icon: <UserPlus className="h-5 w-5" />, color: 'bg-purple-100 text-purple-600' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border hover:border-primary/50 cursor-pointer transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center mb-3`}>
                    {item.icon}
                  </div>
                  <p className="font-medium">{item.name}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Upcoming Sessions</h2>
            <div className="space-y-4">
              {[
                { title: 'Heart Checkup', time: 'Today, 2:00 PM', doctor: 'Dr. Sarah Chen' },
                { title: 'Mental Wellness', time: 'Tomorrow, 10:00 AM', doctor: 'Dr. Michael Brown' }
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium">{session.title}</p>
                    <p className="text-sm text-gray-500">{session.time}</p>
                  </div>
                  <p className="text-sm text-primary">{session.doctor}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                View All Appointments
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Health Tips & Resources</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              "Maintain regular exercise routine for better heart health",
              "Practice mindfulness meditation for stress relief",
              "Stay hydrated and maintain a balanced diet"
            ].map((tip, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <p className="font-medium">Tip {index + 1}</p>
                </div>
                <p className="text-gray-600">{tip}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}