// src/app/tools/convert-files-to-pdf/page.tsx
'use client';

import React, { useState } from 'react';
import { FaFilePdf, FaFileUpload, FaDownload } from 'react-icons/fa';

const ConvertFilesToPdfPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  // This function is just a placeholder and does not perform any conversion.
  // You need to implement the conversion logic here later.
  const convertToPdf = () => {
    if (!file) {
      setError('المرجو اختيار ملف أولا.');
      return;
    }
    alert('هذه الميزة غير متوفرة بعد، يرجى العودة لاحقاً.');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6">تحويل الملفات إلى PDF</h1>
        <p className="text-gray-600 mb-8">اختر ملفًا (مثل DOCX, JPG) لتحويله إلى PDF.</p>

        <div className="flex justify-center items-center mb-6">
          <FaFileUpload className="text-blue-500 text-6xl mr-2" />
          <FaFilePdf className="text-red-500 text-6xl" />
        </div>

        <div className="flex flex-col items-center space-y-4 mb-6">
          <label 
            htmlFor="file-upload" 
            className="cursor-pointer bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            <FaFileUpload className="inline-block mr-2" />
            اختيار ملف
          </label>
          <input 
            id="file-upload" 
            type="file" 
            onChange={handleFileChange} 
            className="hidden" 
          />
        </div>

        {file && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <p className="text-gray-700 font-medium">تم اختيار: <span className="font-bold">{file.name}</span></p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p className="font-bold">خطأ!</p>
            <p>{error}</p>
          </div>
        )}

        <button 
          onClick={convertToPdf} 
          disabled={!file}
          className={`w-full py-4 font-bold text-white rounded-lg shadow-lg transition duration-300 ${
            file ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          تحويل إلى PDF
        </button>

      </div>
    </div>
  );
};

export default ConvertFilesToPdfPage;
