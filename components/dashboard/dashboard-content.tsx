'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Heart, Calendar, Activity, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 72 },
  { name: 'Mar', value: 68 },
  { name: 'Apr', value: 75 },
  { name: 'May', value: 70 },
  { name: 'Jun', value: 80 }
];

export function DashboardContent() {
  return (
    <div className="user-dashboard p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <Heart className="h-6 w-6 text-primary" />
            <h3 className="font-semibold">Heart Health Score</h3>
          </div>
          <div className="text-3xl font-bold">85</div>
          <p className="text-sm text-gray-500">Excellent condition</p>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6 text-primary" />
            <h3 className="font-semibold">Next Appointment</h3>
          </div>
          <div className="text-lg font-medium">Dr. Sarah Chen</div>
          <p className="text-sm text-gray-500">Tomorrow, 10:00 AM</p>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <Activity className="h-6 w-6 text-primary" />
            <h3 className="font-semibold">AI Analysis Status</h3>
          </div>
          <div className="text-lg font-medium text-green-600">All Clear</div>
          <p className="text-sm text-gray-500">Last updated: 2 hours ago</p>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h3 className="font-semibold">Health Trends</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <h3 className="font-semibold">Recent Activities</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div>
                <p className="font-medium">Health check completed</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <div>
                <p className="font-medium">Medication reminder set</p>
                <p className="text-sm text-gray-500">5 hours ago</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-6 w-6 text-yellow-500" />
            <h3 className="font-semibold">Upcoming Tasks</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div>
                <p className="font-medium">Blood pressure check</p>
                <p className="text-sm text-gray-500">Tomorrow, 9:00 AM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <div>
                <p className="font-medium">Medication refill</p>
                <p className="text-sm text-gray-500">In 3 days</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}