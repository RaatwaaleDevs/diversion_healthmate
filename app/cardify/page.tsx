'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Upload, Mic, AlertTriangle, FileText, UserPlus, Printer, Save, RefreshCcw, Activity, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AudioUploader } from '@/components/audio-uploader';
import { AudioRecorder } from '@/components/audio-recorder';
import { ResultsDisplay } from '@/components/results-display';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const dummyDiseaseRisks = [
  { name: 'Arrhythmia', risk: 0.05 },
  { name: 'Murmur', risk: 0.02 },
  { name: 'Valve Disease', risk: 0.01 },
  { name: 'Tachycardia', risk: 0.03 },
  { name: 'Bradycardia', risk: 0.01 }
];

export default function CardionixPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleAudioSubmit = async (file: File) => {
    setAudioFile(file);
    setResults(null); // Clear previous results
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    try {
      // Simulate analysis progress
      for (let i = 0; i <= 100; i += 5) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setAnalysisProgress(i);
      }

      // Simulated API response
      setResults({
        prediction: 'Healthy',
        probability: 0.92,
        diseaseRisks: dummyDiseaseRisks,
        heartRate: {
          current: 72,
          min: 65,
          max: 80,
          average: 73
        },
        timeSeriesData: [
          { time: '0s', value: 72 },
          { time: '10s', value: 74 },
          { time: '20s', value: 73 },
          { time: '30s', value: 75 },
          { time: '40s', value: 71 },
          { time: '50s', value: 72 },
        ],
        recommendations: [
          'Continue regular exercise routine',
          'Maintain healthy diet',
          'Schedule follow-up in 6 months'
        ],
        aiAnalysis: [
          'Normal sinus rhythm detected',
          'Heart rate variability within healthy range',
          'No significant murmurs or abnormal sounds detected',
          'Regular heart rhythm with consistent intervals'
        ]
      });
    } catch (error) {
      console.error('Error analyzing audio:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setResults(null);
    setAudioFile(null);
    setUploadProgress(0);
    setAnalysisProgress(0);
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
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="inline-block mb-6"
            >
              <Heart className="h-16 w-16 text-primary" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4">
              Cardionix - AI-Powered Heart Analysis
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Upload or record your heartbeat for instant AI analysis and health insights
            </p>
          </motion.div>
        </div>
      </section>

      {/* Audio Input Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Upload Audio</h2>
                <AudioUploader onAudioSubmit={handleAudioSubmit} />
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mt-4">
                    <Progress value={uploadProgress} className="mb-2" />
                    <p className="text-sm text-gray-500 text-center">
                      Uploading: {uploadProgress}%
                    </p>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Record Audio</h2>
                <AudioRecorder onAudioSubmit={handleAudioSubmit} />
              </div>
            </div>

            {audioFile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-4 bg-gray-50 rounded-lg"
              >
                <h3 className="font-semibold mb-2">Audio File Details</h3>
                <p className="text-sm text-gray-600">Name: {audioFile.name}</p>
                <p className="text-sm text-gray-600">
                  Size: {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <p className="text-sm text-gray-600">Type: {audioFile.type}</p>
                <Button
                  onClick={handleAnalyze}
                  className="mt-4"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Audio'}
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <section className="py-8 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-4"
              >
                <Heart className="h-12 w-12 text-primary" />
              </motion.div>
              <h2 className="text-2xl font-semibold mb-4">Analyzing Your Heartbeat</h2>
              <Progress value={analysisProgress} className="max-w-xs mx-auto mb-2" />
              <p className="text-sm text-gray-500">Analysis Progress: {analysisProgress}%</p>
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {results && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Observation Box */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Analysis Observations</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Currently, a recording of your heartbeat has a probability of {results.probability} indicates 
                {results.prediction === 'Healthy' ? ' the absence of ' : ' potential '} 
                deviations from the norm in the cardiovascular system.
              </p>
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Current Heart Rate</p>
                  <p className="text-2xl font-bold text-primary">{results.heartRate.current} BPM</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Minimum</p>
                  <p className="text-2xl font-bold text-primary">{results.heartRate.min} BPM</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Maximum</p>
                  <p className="text-2xl font-bold text-primary">{results.heartRate.max} BPM</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Average</p>
                  <p className="text-2xl font-bold text-primary">{results.heartRate.average} BPM</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Disease Probability Graph */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">Disease Risk Analysis</h2>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={results.diseaseRisks || dummyDiseaseRisks}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 0.1]} tickFormatter={(value) => `${(value * 100).toFixed(1)}%`} />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip formatter={(value) => `${(Number(value) * 100).toFixed(1)}%`} />
                      <Bar dataKey="risk" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Heart Rate Time Series */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Activity className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">Heart Rate Variation</h2>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results.timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* AI Analysis Box */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <Brain className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">AI Analysis Insights</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {results.aiAnalysis.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <p className="text-gray-700">{insight}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Recommendations</h3>
                  <ul className="space-y-2">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Heart Visualization */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <Heart className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Heart Visualization</h2>
              </div>
              <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&h=600"
                  alt="Heart Visualization"
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="group">
                <FileText className="mr-2 h-4 w-4" />
                Prepare Report
              </Button>
              <Button className="group">
                <UserPlus className="mr-2 h-4 w-4" />
                Refer Doctor
              </Button>
              <Button className="group">
                <Save className="mr-2 h-4 w-4" />
                Save Analysis
              </Button>
              <Button className="group">
                <Printer className="mr-2 h-4 w-4" />
                Print Report
              </Button>
              <Button variant="outline" className="group" onClick={handleClear}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Clear Results
              </Button>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div className="text-sm text-yellow-700">
                  <p className="font-medium mb-1">Important Notice</p>
                  <p>
                    For a more reliable result, take measurements three times a day for at least 3-5 days.
                    Please note that we do not have a medical license and cannot provide medical diagnoses
                    or recommendations. Always consult with a healthcare professional for medical advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}