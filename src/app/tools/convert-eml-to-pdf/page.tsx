'use client';

import React, { useState } from 'react';
import { FaFilePdf, FaFileArchive, FaDownload } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Type definitions for the email data received from the server
interface EmailData {
  subject?: string;
  from?: string;
  to?: string;
  date?: string;
  html?: string;
  text?: string;
}

const EmlToPdfPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Handles the file input change event
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.name.endsWith('.eml')) {
        setFile(selectedFile);
        setError('');
        setPdfUrl('');
      } else {
        setFile(null);
        setError('المرجو اختيار ملف بصيغة .eml فقط.');
      }
    }
  };

  // Converts the EML file to a PDF document using the server-side API
  const convertToPdf = async () => {
    if (!file) {
      setError('المرجو اختيار ملف أولا.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('emlFile', file);

      // Send the file to the new API endpoint
      const response = await fetch('/api/convert-eml', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Server conversion failed.');
      }

      const emailData: EmailData = await response.json();

      // Create a new jsPDF instance on the client-side
      const doc = new jsPDF();
      
      const contentDiv = document.createElement('div');
      contentDiv.style.padding = '20px';
      
      // Add email metadata
      const subject = emailData.subject || '(بدون موضوع)';
      const from = emailData.from || '(غير معروف)';
      const to = emailData.to || '(غير معروف)';
      const date = emailData.date ? new Date(emailData.date).toLocaleString('ar-MA') : '(غير معروف)';

      contentDiv.innerHTML = `
        <div style="font-family: Arial, sans-serif;">
          <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">الموضوع: ${subject}</h1>
          <p style="font-size: 14px; margin-bottom: 5px;"><strong>من:</strong> ${from}</p>
          <p style="font-size: 14px; margin-bottom: 5px;"><strong>إلى:</strong> ${to}</p>
          <p style="font-size: 14px; margin-bottom: 20px;"><strong>التاريخ:</strong> ${date}</p>
          <hr style="border: 1px solid #ccc; margin-bottom: 20px;">
          <div style="font-size: 16px;">
            ${emailData.html || emailData.text?.replace(/\n/g, '<br>') || '<div>(لا يوجد محتوى في الرسالة)</div>'}
          </div>
        </div>
      `;

      // Use the html method to render the content to PDF
      await doc.html(contentDiv, {
        callback: (pdf) => {
          const pdfBlob = pdf.output('blob');
          const url = URL.createObjectURL(pdfBlob);
          setPdfUrl(url);
        },
        x: 10,
        y: 10,
      });

    } catch (err) {
      console.error('Conversion error:', err);
      setError('حدث خطأ أثناء التحويل. المرجو التأكد من صحة الملف.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Triggers the PDF download
  const downloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${file?.name.replace('.eml', '.pdf') || 'email.pdf'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6">تحويل البريد الإلكتروني إلى PDF</h1>
        <p className="text-gray-600 mb-8">اختر ملف بريد إلكتروني بصيغة `.eml` وحوله إلى PDF.</p>

        <div className="flex justify-center items-center mb-6">
          <FaFileArchive className="text-blue-500 text-6xl mr-2" />
          <FaFilePdf className="text-red-500 text-6xl" />
        </div>

        <div className="flex flex-col items-center space-y-4 mb-6">
          <label 
            htmlFor="file-upload" 
            className="cursor-pointer bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            <FaFileArchive className="inline-block mr-2" />
            اختيار ملف `.eml`
          </label>
          <input 
            id="file-upload" 
            type="file" 
            accept=".eml" 
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

        {isProcessing ? (
          <div className="flex flex-col items-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <p className="text-blue-600 font-medium">المرجو الانتظار، جاري التحويل...</p>
          </div>
        ) : (
          <button 
            onClick={convertToPdf} 
            disabled={!file}
            className={`w-full py-4 font-bold text-white rounded-lg shadow-lg transition duration-300 ${
              file ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            تحويل إلى PDF
          </button>
        )}

        {pdfUrl && (
          <div className="mt-8">
            <button 
              onClick={downloadPdf} 
              className="w-full py-4 font-bold text-white bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
            >
              <FaDownload className="inline-block mr-2" />
              تحميل ملف PDF
            </button>
          </div>
        )}

      </div>

      <style jsx>{`
        .loader {
          border-top-color: #3B82F6;
          -webkit-animation: spinner 1.5s linear infinite;
          animation: spinner 1.5s linear infinite;
        }
        @-webkit-keyframes spinner {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spinner {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default EmlToPdfPage;
