[⚠️ Suspicious Content] // src/app/tools/convert-images-to-pdf/page.tsx
'use client';

import React, { useState } from 'react';
import { FaFileImage, FaFilePdf, FaFileUpload, FaDownload } from 'react-icons/fa';
import jsPDF from 'jspdf'; // Library to create PDF files

const ImagesToPdfPage = () => {
  const [files, setFiles] = useState([]); // State to store the selected images
  const [pdfUrl, setPdfUrl] = useState(''); // State to store the URL of the generated PDF
  const [isProcessing, setIsProcessing] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error message state

  // Function to handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Aggiungi un controllo per assicurarti che e.target.files non sia null
    if (!e.target.files) {
      setFiles([]);
      return;
    }

    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(file => 
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
    );

    if (validFiles.length > 0) {
      setFiles(validFiles);
      setError('');
      setPdfUrl('');
    } else {
      setFiles([]);
      setError('المرجو اختيار صور بصيغة JPG, PNG, أو GIF.');
    }
  };

  // Function to convert selected images to PDF
  const convertToPdf = async () => {
    if (files.length === 0) {
      setError('المرجو اختيار صور أولا.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const doc = new jsPDF();
      doc.deletePage(1); // Remove the default empty page

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        // Use a promise to handle the FileReader async process
        const imageData = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });

        const img = new Image();
        img.src = imageData;
        
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        // Add a new page for each image
        doc.addPage();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const imgWidth = img.width;
        const imgHeight = img.height;

        // Calculate aspect ratio and scale image to fit the page
        const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
        const scaledWidth = imgWidth * ratio;
        const scaledHeight = imgHeight * ratio;

        const x = (pageWidth - scaledWidth) / 2;
        const y = (pageHeight - scaledHeight) / 2;

        doc.addImage(imageData, 'JPEG', x, y, scaledWidth, scaledHeight);
      }

      // Generate the PDF blob and create a URL
      const pdfBlob = doc.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);

    } catch (err) {
      console.error('Conversion error:', err);
      setError('حدث خطأ أثناء التحويل. المرجو المحاولة مرة أخرى.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Function to trigger the PDF download
  const downloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'converted_images.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6">تحويل الصور إلى PDF</h1>
        <p className="text-gray-600 mb-8">اختر مجموعة من الصور وحولها إلى ملف PDF واحد بجودة عالية.</p>

        <div className="flex justify-center items-center mb-6">
          <FaFileImage className="text-blue-500 text-6xl mr-2" />
          <FaFilePdf className="text-red-500 text-6xl" />
        </div>

        <div className="flex flex-col items-center space-y-4 mb-6">
          <label 
            htmlFor="file-upload" 
            className="cursor-pointer bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            <FaFileUpload className="inline-block mr-2" />
            اختيار الصور (JPG, PNG, GIF)
          </label>
          <input 
            id="file-upload" 
            type="file" 
            accept="image/jpeg,image/png,image/gif" 
            onChange={handleFileChange} 
            multiple
            className="hidden" 
          />
        </div>

        {files.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <p className="text-gray-700 font-medium">تم اختيار <span className="font-bold">{files.length}</span> ملف.</p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {files.map((file, index) => (
                <span key={index} className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-md">{file.name}</span>
              ))}
            </div>
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
            disabled={files.length === 0}
            className={`w-full py-4 font-bold text-white rounded-lg shadow-lg transition duration-300 ${
              files.length > 0 ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
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

export default ImagesToPdfPage;
