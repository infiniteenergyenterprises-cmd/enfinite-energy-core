'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle, AlertCircle, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onUploadSuccess?: (url: string) => void;
}

export function ImageUploader({ onUploadSuccess }: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setUploadStatus('idle');
      setUploadedUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('idle');

    const formData = new FormData();
    formData.append('image', file);

    try {
      // Pointing to your backend upload endpoint
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setUploadStatus('success');
        setUploadedUrl(data.data.url);
        if (onUploadSuccess) {
          onUploadSuccess(data.data.url);
        }
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error(error);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const clearSelection = () => {
    setFile(null);
    setPreview(null);
    setUploadStatus('idle');
    setUploadedUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <ImageIcon className="w-6 h-6 text-blue-500" />
        Cloudinary Uploader
      </h3>

      {!preview ? (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">Click to select an image</p>
          <p className="text-sm text-gray-400 mt-1">Supports JPG, PNG, WEBP</p>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border border-gray-200">
          <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
          
          {uploadStatus !== 'success' && (
            <button 
              onClick={clearSelection}
              className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full hover:bg-white text-gray-700 transition-colors shadow-sm"
              disabled={isUploading}
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {uploadStatus === 'success' && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
              <div className="bg-white p-3 rounded-full text-green-500 shadow-xl">
                <CheckCircle className="w-8 h-8" />
              </div>
            </div>
          )}
        </div>
      )}

      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />

      {file && uploadStatus !== 'success' && (
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`w-full mt-4 py-3 rounded-lg font-bold text-white transition-all flex justify-center items-center gap-2 ${
            isUploading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'
          }`}
        >
          {isUploading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <UploadCloud className="w-5 h-5" />
              Upload to Cloudinary
            </>
          )}
        </button>
      )}

      {uploadStatus === 'error' && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-start gap-2 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>Upload failed. Make sure your server is running and API keys are correct.</p>
        </div>
      )}

      {uploadStatus === 'success' && uploadedUrl && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
          <p className="text-green-800 font-medium text-sm mb-2">Upload Successful!</p>
          <a 
            href={uploadedUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline break-all"
          >
            {uploadedUrl}
          </a>
          <button 
            onClick={clearSelection}
            className="mt-3 text-sm text-gray-600 hover:text-gray-900 font-medium w-full text-center"
          >
            Upload another image
          </button>
        </div>
      )}
    </div>
  );
}
