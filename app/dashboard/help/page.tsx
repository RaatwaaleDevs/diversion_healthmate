'use client';

import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle, Phone, Mail, Plane as Ambulance } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function HelpPage() {
  const faqs = [
    {
      question: "How do I book an appointment?",
      answer: "You can book an appointment through the Appointments page. Click on 'Book New Appointment', select your preferred doctor, date, and time."
    },
    {
      question: "How can I view my test results?",
      answer: "Your test results can be found in the Health Records section. Click on any record to view details or download the report."
    },
    {
      question: "What should I do in case of an emergency?",
      answer: "In case of a medical emergency, immediately call your local emergency services or use the Emergency Contact button in the app."
    }
  ];

  const emergencyContacts = [
    { name: "Emergency Services", number: "911" },
    { name: "Cardionix Hospital", number: "+1 (555) 123-4567" },
    { name: "24/7 Nurse Hotline", number: "+1 (555) 987-6543" }
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold"
      >
        Help & Support
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>support@cardionix.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <Button className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" />
                Start Chat Support
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Card className="p-6 border-red-200 bg-red-50">
            <div className="flex items-center space-x-3 mb-4">
              <Ambulance className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-semibold text-red-700">Emergency Contacts</h2>
            </div>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{contact.name}</span>
                  <Button variant="outline" className="text-red-500 hover:text-red-600">
                    <Phone className="mr-2 h-4 w-4" />
                    {contact.number}
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Input placeholder="Subject" />
              </div>
              <div className="grid gap-2">
                <textarea
                  className="min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="How can we help you?"
                />
              </div>
              <Button className="w-full">Send Message</Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}