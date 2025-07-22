'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function ToolClientPage({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [downloading, setDownloading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const convertImageToPDF = async () => {
    if (!file) return;

    setDownloading(true);

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async () => {
      const imageBytes = new Uint8Array(reader.result as ArrayBuffer);

      const pdfDoc = await PDFDocument.create();
      const image = file.type.includes('png')
        ? await pdfDoc.embedPng(imageBytes)
        : await pdfDoc.embedJpg(imageBytes);

      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });

      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.split('.')[0]}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      setDownloading(false);
    };
  };

  if (name === 'Convert to PDF') {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-gray-600">{description}</p>

        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
        />

        <button
          onClick={convertImageToPDF}
          disabled={!file || downloading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {downloading ? 'Converting...' : 'Convert to PDF'}
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{name}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
