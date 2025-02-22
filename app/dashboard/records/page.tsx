'use client';

import { motion } from 'framer-motion';
import { FileText, Upload, Download, Share2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function RecordsPage() {
  const records = [
    {
      id: 1,
      title: "Annual Health Checkup",
      date: "2025-02-15",
      type: "PDF",
      size: "2.4 MB"
    },
    {
      id: 2,
      title: "Blood Test Results",
      date: "2025-02-01",
      type: "PDF",
      size: "1.8 MB"
    },
    {
      id: 3,
      title: "ECG Report",
      date: "2025-01-15",
      type: "PDF",
      size: "3.2 MB"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold">Health Records</h1>
        <Button className="group">
          <Upload className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
          Upload New Record
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-4"
      >
        {records.map((record) => (
          <Card key={record.id} className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{record.title}</h3>
                  <p className="text-sm text-gray-500">
                    {record.date} • {record.type} • {record.size}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}