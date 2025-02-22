'use client';

import { motion } from 'framer-motion';
import { Heart, AlertTriangle } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface ResultsDisplayProps {
  results: {
    prediction: string;
    probability: number;
    recommendations?: string[];
  };
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const isHealthy = results.prediction === 'Healthy';
  const confidenceData = [
    { name: 'Confidence', value: results.probability * 100 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-8"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="inline-block mb-4"
        >
          {isHealthy ? (
            <Heart className="h-16 w-16 text-green-500" />
          ) : (
            <AlertTriangle className="h-16 w-16 text-red-500" />
          )}
        </motion.div>
        
        <h2 className="text-3xl font-bold mb-2">
          {isHealthy ? (
            <span className="text-green-500">Healthy Heartbeat</span>
          ) : (
            <span className="text-red-500">Abnormal Pattern Detected</span>
          )}
        </h2>
        
        <p className="text-gray-600">
          Our AI analysis indicates a {(results.probability * 100).toFixed(1)}% confidence level
        </p>
      </div>

      <div className="mb-8 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={confidenceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={isHealthy ? "#22c55e" : "#ef4444"}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {!isHealthy && results.recommendations && results.recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <h3 className="text-lg font-semibold text-red-700 mb-2">
            Recommendations
          </h3>
          <ul className="list-disc list-inside text-red-600 space-y-1">
            {results.recommendations.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}