import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UploadCloud, File, X, Check, Loader2 } from 'lucide-react';
import { isPDF, isImage, formatFileSize } from '@/lib/utils';
import { extractTextFromPDF, parseExtractedText } from '@/lib/cvUtils';
import { CV } from '@/data/cvData';

interface CVUploaderProps {
  userId: string;
  onUploadComplete: (cv: Partial<CV>) => void;
  onCancel: () => void;
}

export const CVUploader: React.FC<CVUploaderProps> = ({ 
  userId, 
  onUploadComplete, 
  onCancel 
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Reset states
    setError(null);
    setPreview(null);

    // Validate file
    if (!isPDF(selectedFile) && !isImage(selectedFile)) {
      setError('Please upload a PDF or image file.');
      return;
    }

    // Set file
    setFile(selectedFile);

    // Generate preview for images
    if (isImage(selectedFile)) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    // Reset states
    setError(null);
    setPreview(null);

    // Validate file
    if (!isPDF(droppedFile) && !isImage(droppedFile)) {
      setError('Please upload a PDF or image file.');
      return;
    }

    // Set file
    setFile(droppedFile);

    // Generate preview for images
    if (isImage(droppedFile)) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return newProgress;
        });
      }, 300);

      let extractedText = '';
      
      // Process file based on type
      if (isPDF(file)) {
        extractedText = await extractTextFromPDF(file);
      } else if (isImage(file)) {
        // In a real implementation, you'd use OCR to extract text from images
        extractedText = 'Text extracted from image using OCR would go here';
      }

      // Parse extracted text to get CV data
      const cvData = await parseExtractedText(extractedText, userId);
      
      // Complete progress
      clearInterval(progressInterval);
      setProgress(100);
      
      // Return the parsed CV data
      setTimeout(() => {
        onUploadComplete(cvData);
      }, 500);
    } catch (err) {
      setError('Failed to process the file. Please try again.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Upload Your CV</h2>
        <Button variant="ghost" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>

      {!file ? (
        <Card>
          <CardContent className="pt-6">
            <div 
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept=".pdf,.jpg,.jpeg,.png" 
                onChange={handleFileChange}
              />
              <UploadCloud className="h-10 w-10 mx-auto mb-4 text-gray-400" />
              <h3 className="font-medium mb-1">Upload your CV</h3>
              <p className="text-sm text-gray-500 mb-4">Drag and drop or click to upload your CV as PDF or image</p>
              <Button variant="outline" size="sm" className="mx-auto">
                Select File
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              {preview ? (
                <div className="w-14 h-20 rounded border overflow-hidden">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-14 h-20 bg-gray-100 rounded border flex items-center justify-center">
                  <File className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <div className="flex-1">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                {progress > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={handleRemoveFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={handleUpload} 
          disabled={!file || uploading}
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Check className="h-4 w-4 mr-2" />
              Upload and Process
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
