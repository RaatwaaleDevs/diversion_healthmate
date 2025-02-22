'use client';

import { useState, useRef } from 'react';
import { ReactMic } from 'react-mic';
import { Mic, Square, Play, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface AudioRecorderProps {
  onAudioSubmit: (file: File) => void;
}

export function AudioRecorder({ onAudioSubmit }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const handleStartRecording = () => {
    setIsRecording(true);
    startTimeRef.current = Date.now();
    const interval = setInterval(() => {
      if (startTimeRef.current) {
        setRecordingTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }
    }, 1000);
    return () => clearInterval(interval);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    startTimeRef.current = null;
    setRecordingTime(0);
  };

  const onStop = (recordedData: { blob: Blob }) => {
    setRecordedBlob(recordedData.blob);
  };

  const handleSubmit = () => {
    if (recordedBlob) {
      const file = new File([recordedBlob], 'recording.wav', { type: 'audio/wav' });
      onAudioSubmit(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-4">
        <ReactMic
          record={isRecording}
          className="w-full h-32"
          onStop={onStop}
          strokeColor="#dc2626"
          backgroundColor="#f3f4f6"
        />
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex space-x-2">
            {!isRecording ? (
              <Button
                onClick={handleStartRecording}
                variant="outline"
                size="icon"
                className="group"
              >
                <Mic className="h-4 w-4 group-hover:text-primary transition-colors" />
              </Button>
            ) : (
              <Button
                onClick={handleStopRecording}
                variant="outline"
                size="icon"
                className="group"
              >
                <Square className="h-4 w-4 group-hover:text-primary transition-colors" />
              </Button>
            )}
            
            {recordedBlob && !isRecording && (
              <Button
                onClick={() => {
                  const audio = new Audio(URL.createObjectURL(recordedBlob));
                  audio.play();
                }}
                variant="outline"
                size="icon"
                className="group"
              >
                <Play className="h-4 w-4 group-hover:text-primary transition-colors" />
              </Button>
            )}
          </div>
          
          <div className="text-sm text-gray-500">
            {isRecording && `Recording: ${recordingTime}s`}
          </div>
        </div>
      </div>

      {recordedBlob && !isRecording && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button onClick={handleSubmit} className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Submit Recording
          </Button>
        </motion.div>
      )}
    </div>
  );
}