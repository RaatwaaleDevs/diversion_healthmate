'use client';

import { motion } from 'framer-motion';
import { User, Lock, Bell, Shield, Camera } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold"
      >
        Settings
      </motion.h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-10 w-10 text-gray-400" />
                </div>
                <Button size="icon" className="absolute bottom-0 right-0 rounded-full">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Profile Picture</h2>
                <p className="text-sm text-gray-500">Update your profile photo</p>
              </div>
            </div>
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input placeholder="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input type="tel" placeholder="+1 (555) 000-0000" />
              </div>
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Add an extra layer of security</p>
                </div>
                <Switch />
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Current Password</Label>
                  <Input type="password" />
                </div>
                <div className="grid gap-2">
                  <Label>New Password</Label>
                  <Input type="password" />
                </div>
                <div className="grid gap-2">
                  <Label>Confirm Password</Label>
                  <Input type="password" />
                </div>
                <Button>Update Password</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              {[
                { title: 'Appointment Reminders', description: 'Get notified about upcoming appointments' },
                { title: 'Health Tips', description: 'Receive daily health tips and advice' },
                { title: 'Treatment Updates', description: 'Updates about your treatment plan' },
                { title: 'Lab Results', description: 'Notifications when new results are available' }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <Label>{item.title}</Label>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <Switch />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Privacy Controls</h2>
            <div className="space-y-4">
              {[
                { title: 'Share Health Data', description: 'Allow doctors to access your health records' },
                { title: 'Research Participation', description: 'Contribute anonymized data for research' },
                { title: 'Public Profile', description: 'Make your profile visible to other users' }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <Label>{item.title}</Label>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <Switch />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}