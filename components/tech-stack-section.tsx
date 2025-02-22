'use client';

import { motion } from 'framer-motion';
import { Code2, Database, Cpu, Lock, Braces, Layers, Brain, Server } from 'lucide-react';

export function TechStackSection() {
  const technologies = [
    { icon: <Code2 className="h-6 w-6" />, name: "Next.js", description: "Frontend Framework" },
    { icon: <Braces className="h-6 w-6" />, name: "Node JS/Express JS", description: "Backend Stack" },
    { icon: <Database className="h-6 w-6" />, name: "Mongodb", description: "Database & Auth" },
    { icon: <Cpu className="h-6 w-6" />, name: "H5", description: "ML Models" },
    { icon: <Cpu className="h-6 w-6" />, name: "GPT", description: "AI Models" },
    { icon: <Braces className="h-6 w-6" />, name: "FastAPI", description: "Backend API" },
    { icon: <Layers className="h-6 w-6" />, name: "Docker", description: "Containerization" },
    { icon: <Brain className="h-6 w-6" />, name: "ONNX", description: "AI Runtime" },
    { icon: <Server className="h-6 w-6" />, name: "Vercel", description: "Orchestration" }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Our Tech Stack</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Built with cutting-edge technologies to ensure performance, security, and scalability
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                {tech.icon}
              </div>
              <h3 className="text-lg font-semibold text-center mb-1">{tech.name}</h3>
              <p className="text-sm text-gray-600 text-center">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}