'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function SplitPDFPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  const handleSplit = async () => {
    if (!pdfFile) return;
    setStatus('Splitting...');

    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    const numPages = pdfDoc.getPageCount();

    for (let i = 0; i < numPages; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(copiedPage);

      const newPdfBytes = await newPdf.save();
      const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `page-${i + 1}.pdf`;
      link.click();
    }

    setStatus('Done!');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Split PDF</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button
        onClick={handleSplit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!pdfFile}
      >
        Split
      </button>
      <p className="mt-4">{status}</p>
    </div>
  );
}
