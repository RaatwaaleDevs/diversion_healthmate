'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, Rotate3D as Robot } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AiDocPage() {
  const [message, setMessage] = useState('');

  return (
    <div className="p-6 h-[calc(100vh-96px)] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4 mb-6"
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Robot className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">AI Doc</h1>
          <p className="text-gray-500">Your personal health assistant</p>
        </div>
      </motion.div>

      <Card className="flex-1 p-6 mb-6 overflow-auto">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Robot className="h-4 w-4 text-primary" />
            </div>
            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <p>Hello! I'm your AI health assistant. How can I help you today?</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex space-x-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button variant="outline" size="icon">
          <Mic className="h-4 w-4" />
        </Button>
        <Button size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}