'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function MergePDFPage() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState('');

  const handleMerge = async () => {
    if (!files || files.length < 2) {
      setStatus('Please select at least 2 PDF files.');
      return;
    }

    setStatus('Merging...');

    const mergedPdf = await PDFDocument.create();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();
    const blob = new Blob([mergedBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'merged.pdf';
    link.click();

    setStatus('Done!');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Merge PDF</h1>
      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={(e) => setFiles(e.target.files)}
        className="mb-4"
      />
      <button
        onClick={handleMerge}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={!files}
      >
        Merge
      </button>
      <p className="mt-4">{status}</p>
    </div>
  );
}
