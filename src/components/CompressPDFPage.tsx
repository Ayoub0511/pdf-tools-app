'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function CompressPDFPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  const handleCompress = async () => {
    if (!pdfFile) return;
    setStatus('Compressing...');

    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    const compressedPdf = await PDFDocument.create();
    const copiedPages = await compressedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());

    copiedPages.forEach((page) => compressedPdf.addPage(page));

    const compressedBytes = await compressedPdf.save();

    const blob = new Blob([compressedBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'compressed.pdf';
    link.click();

    setStatus('Done!');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Compress PDF</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button
        onClick={handleCompress}
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={!pdfFile}
      >
        Compress
      </button>
      <p className="mt-4">{status}</p>
    </div>
  );
}
