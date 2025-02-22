'use client';

import { motion } from 'framer-motion';
import { Heart, Activity, AlertTriangle, TrendingUp, Scale, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function HeartHealthPage() {
  const heartRateData = [
    { time: '00:00', value: 72 },
    { time: '04:00', value: 68 },
    { time: '08:00', value: 75 },
    { time: '12:00', value: 82 },
    { time: '16:00', value: 78 },
    { time: '20:00', value: 70 }
  ];

  const healthScore = 85;
  const riskLevel = "Low";
  const riskColor = {
    Low: "text-green-500",
    Medium: "text-yellow-500",
    High: "text-red-500"
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold">Heart Health</h1>
          <p className="text-gray-500">Your daily heart health overview</p>
        </div>
        <Button>
          <Activity className="mr-2 h-4 w-4" />
          Start Health Check
        </Button>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Health Score</h3>
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-3xl font-bold">{healthScore}</span>
                <span className="text-sm text-gray-500">/ 100</span>
              </div>
              <Progress value={healthScore} className="h-2" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Risk Level</h3>
              <AlertTriangle className={`h-5 w-5 ${riskColor[riskLevel]}`} />
            </div>
            <p className={`text-2xl font-bold ${riskColor[riskLevel]}`}>
              {riskLevel}
            </p>
            <p className="text-sm text-gray-500">Based on recent activity</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Current Heart Rate</h3>
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">75 BPM</p>
            <p className="text-sm text-gray-500">Normal range</p>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Heart Rate Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heartRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {[
                { icon: <Scale className="h-5 w-5" />, text: "Blood pressure check completed", time: "2 hours ago" },
                { icon: <Activity className="h-5 w-5" />, text: "Exercise session recorded", time: "5 hours ago" },
                { icon: <Clock className="h-5 w-5" />, text: "Medication reminder", time: "Yesterday" }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="font-medium">{activity.text}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Health Tips</h3>
            <div className="space-y-4">
              {[
                "Maintain regular exercise routine",
                "Keep blood pressure in check",
                "Stay hydrated throughout the day",
                "Get adequate sleep"
              ].map((tip, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}