'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface AudioUploaderProps {
  onAudioSubmit: (file: File) => void;
}

export function AudioUploader({ onAudioSubmit }: AudioUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onAudioSubmit(acceptedFiles[0]);
    }
  }, [onAudioSubmit]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.wav', '.aac', '.ogg', '.mp3', '.aiff', '.flac', '.ape', '.dsd', '.mqa', '.wma', '.m4a']
    },
    maxSize: 200 * 1024 * 1024, // 200MB
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'}`}
      >
        <input {...getInputProps()} />
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isDragActive ? 1.05 : 1 }}
          className="flex flex-col items-center"
        >
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600">
            {isDragActive
              ? "Drop your audio file here"
              : "Drag & drop your audio file here, or click to select"}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Supported formats: WAV, AAC, OGG, MP3, AIFF, FLAC, APE, DSD, MQA, WMA, M4A
          </p>
          <p className="text-sm text-gray-500">
            Maximum file size: 200MB
          </p>
        </motion.div>
      </div>
      <div className="mt-4">
        <Button className="w-full">
          <File className="mr-2 h-4 w-4" />
          Select File
        </Button>
      </div>
    </div>
  );
}