'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Upload, Mic, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AudioUploader } from '@/components/audio-uploader';
import { ResultsDisplay } from '@/components/results-display';

export default function CardionixPage() {
  const [results, setResults] = useState<any>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleAudioSubmit = async (file: File) => {
    setAudioFile(file);
    setResults(null); // Clear previous results
  };

  const handleAnalyze = async () => {
    try {
      const formData = new FormData();
      formData.append('audio', audioFile as Blob);

      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
        throw new Error(errorData.message || 'Failed to analyze audio');
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error analyzing audio:', error);
      alert(`Failed to analyze audio: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block mb-6"
            >
              <Heart className="h-16 w-16 text-primary" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4">Cardionix - AI-Powered Heart Analysis</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Upload your heartbeat audio for instant AI analysis and health insights
            </p>
          </motion.div>
        </div>
      </section>

      {/* Audio Input Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Upload Audio</h2>
            <AudioUploader onAudioSubmit={handleAudioSubmit} />

            {audioFile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-4 bg-gray-50 rounded-lg"
              >
                <h3 className="font-semibold mb-2">Audio File Details</h3>
                <p className="text-sm text-gray-600">Name: {audioFile.name}</p>
                <p className="text-sm text-gray-600">Size: {(audioFile.size / 1024 / 1024).toFixed(2)} MB</p>
                <p className="text-sm text-gray-600">Type: {audioFile.type}</p>
                <Button onClick={handleAnalyze} className="mt-4">Analyze Audio</Button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Results Section */}
      {results && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Analysis Observations</h2>
              </div>
              <p className="text-gray-700 mb-4">
                The uploaded audio file "{results.filename}" has been analyzed.
                The predicted class is "{results.predicted_class}".
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}