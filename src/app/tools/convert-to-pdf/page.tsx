'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UploadCloud, FileCheck, Loader2 } from 'lucide-react';

export default function ConvertToPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setConvertedFileUrl(null);
      setError(null);
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    setIsConverting(true);
    setError(null);
    setConvertedFileUrl(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/convert-to-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to convert');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setConvertedFileUrl(url);
    } catch (err) {
      setError('Conversion failed. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-center">
      <h1 className="text-3xl font-bold mb-6">Convert to PDF</h1>

      <div className="flex flex-col items-center gap-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />

        <Button
          onClick={handleConvert}
          disabled={!file || isConverting}
          className="flex items-center gap-2"
        >
          {isConverting ? (
            <>
              <Loader2 className="animate-spin h-4 w-4" />
              Converting...
            </>
          ) : (
            <>
              <UploadCloud className="h-4 w-4" />
              Convert
            </>
          )}
        </Button>

        {convertedFileUrl && (
          <a
            href={convertedFileUrl}
            download="converted.pdf"
            className="mt-4 inline-flex items-center gap-2 text-green-600 font-medium hover:underline"
          >
            <FileCheck className="w-5 h-5" />
            Download Converted PDF
          </a>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
