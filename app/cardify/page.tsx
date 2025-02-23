'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Upload, Mic, Activity, AlertCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function CardionixPage() {
  const [results, setResults] = useState<any>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleAudioSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
      setResults(null);
      setAnalysisProgress(0);
    }
  };

  // Health tips based on analysis
  const healthTips = {
    normal: [
      "Maintain regular exercise (30 mins/day, 5 days/week)",
      "Monitor your diet - include more fruits and vegetables",
      "Get 7-8 hours of quality sleep",
      "Stay hydrated - aim for 8 glasses of water daily",
      "Schedule annual check-ups with your doctor"
    ],
    abnormal: [
      "Consult a cardiologist promptly",
      "Avoid strenuous activities until cleared by a doctor",
      "Reduce salt and saturated fat intake",
      "Monitor blood pressure daily",
      "Consider stress management techniques like meditation"
    ]
  };

  const handleAnalyze = async () => {
    if (!audioFile) {
      alert('Please upload an audio file first.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 300);

    try {
      const formData = new FormData();
      formData.append('audio', audioFile);

      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to analyze audio');
      }

      const data = await response.json();
      setResults({
        ...data,
        timestamp: new Date().toLocaleString(),
        confidence: (Math.random() * (0.95 - 0.75) + 0.75).toFixed(2), // Mock confidence score
        analysisDuration: `${((Math.random() * 2) + 1).toFixed(1)} seconds` // Mock duration
      });
      setAnalysisProgress(100);
    } catch (error: any) {
      console.error('Error analyzing audio:', error);
<<<<<<< Updated upstream
      alert(`Failed to analyze audio: ${error.message || 'Unknown error'}`);
      setAnalysisProgress(0);
    } finally {
      setIsAnalyzing(false);
      clearInterval(progressInterval);
=======
      if (error instanceof Error) {
        alert(`Failed to analyze audio: ${error.message}`);
      } else {
        alert('Failed to analyze audio: An unknown error occurred');
      }
>>>>>>> Stashed changes
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
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              className="inline-block mb-6"
            >
              <Heart className="h-16 w-16 text-red-500" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4">Cardionix - AI Heart Health Monitor</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Analyze your heartbeat audio for personalized cardiovascular insights
            </p>
          </motion.div>
        </div>
      </section>

      {/* Audio Input Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Mic className="mr-2 h-6 w-6" /> Record or Upload Heartbeat
            </h2>
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioSubmit}
              className="mb-4 w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
            />

            {audioFile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-gray-50 rounded-lg"
              >
                <h3 className="font-semibold mb-2">Selected Audio</h3>
                <p className="text-sm text-gray-600">Name: {audioFile.name}</p>
                <p className="text-sm text-gray-600">
                  Size: {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <p className="text-sm text-gray-600">Type: {audioFile.type}</p>
                
                {isAnalyzing && (
                  <div className="mt-4">
                    <Progress value={analysisProgress} className="w-full" />
                    <p className="text-sm text-gray-500 mt-2">Analyzing... {analysisProgress}%</p>
                  </div>
                )}
                
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="mt-4 bg-red-500 hover:bg-red-600"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Heartbeat'}
                </Button>
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
              <div className="flex items-center space-x-3 mb-6">
                <Activity className="h-6 w-6 text-red-500" />
                <h2 className="text-2xl font-semibold">Heart Health Analysis</h2>
              </div>
              
              {/* Analysis Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-gray-700">
                    File: <span className="font-medium">{results.filename}</span>
                  </p>
                  <p className="text-gray-700">
                    Prediction: <span className={`font-medium ${results.predicted_class === 'normal' ? 'text-green-600' : 'text-red-600'}`}>
                      {results.predicted_class}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    Confidence: <span className="font-medium">{results.confidence * 100}%</span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-700">
                    Analyzed on: <span className="font-medium">{results.timestamp}</span>
                  </p>
                  <p className="text-gray-700">
                    Analysis Time: <span className="font-medium">{results.analysisDuration}</span>
                  </p>
                </div>
              </div>

              {/* Health Tips */}
              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  Personalized Health Recommendations
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  {(results.predicted_class === 'normal' ? healthTips.normal : healthTips.abnormal).map((tip, index) => (
                    <li key={index} className="text-gray-700">{tip}</li>
                  ))}
                </ul>
              </div>

              {/* Additional Insights */}
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Next Steps
                </h4>
                <p className="text-blue-700 mt-2">
                  {results.predicted_class === 'normal'
                    ? 'Continue monitoring your heart health monthly for consistent results.'
                    : 'Schedule an immediate consultation with a healthcare professional.'}
                </p>
                <Button
                  variant="outline"
                  className="mt-4 border-blue-500 text-blue-500 hover:bg-blue-100"
                  onClick={() => window.open('https://www.heart.org', '_blank')}
                >
                  Learn More About Heart Health
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}