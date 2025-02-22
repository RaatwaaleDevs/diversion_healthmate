'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, User, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AppointmentsPage() {
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Chen",
      date: "2025-03-15",
      time: "10:00 AM",
      location: "Cardionix Health Center",
      type: "Regular Checkup"
    },
    {
      id: 2,
      doctor: "Dr. Michael Brown",
      date: "2025-03-20",
      time: "2:30 PM",
      location: "Heart Care Clinic",
      type: "Follow-up"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold">My Appointments</h1>
        <Button className="group">
          <Calendar className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
          Book New Appointment
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-4"
      >
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-primary" />
                  <span className="font-medium">{appointment.doctor}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{appointment.location}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
                <Button variant="outline" size="sm" className="text-destructive">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}