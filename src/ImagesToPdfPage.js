'use client';

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { FaFileUpload, FaDownload } from 'react-icons/fa';

const ImagesToPdfPage = () => {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && ['image/jpeg', 'image/png'].includes(selectedFile.type)) {
      setFile(selectedFile);
      setError('');
      setPdfUrl('');
    } else {
      setFile(null);
      setError('Please select a JPG or PNG image.');
    }
  };

  const convertToPdf = async () => {
    if (!file) {
      setError('Please select an image first.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const doc = new jsPDF();
      const reader = new FileReader();

      reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function() {
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();
          const imgWidth = img.width;
          const imgHeight = img.height;

          const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
          const scaledWidth = imgWidth * ratio;
          const scaledHeight = imgHeight * ratio;

          const x = (pageWidth - scaledWidth) / 2;
          const y = (pageHeight - scaledHeight) / 2;

          doc.addImage(img.src, 'JPEG', x, y, scaledWidth, scaledHeight);
          const pdfBlob = doc.output('blob');
          const url = URL.createObjectURL(pdfBlob);
          setPdfUrl(url);
          setIsProcessing(false);
        };
      };
      reader.readAsDataURL(file);

    } catch (err) {
      console.error('Conversion error:', err);
      setError('An error occurred during conversion. Please try again.');
      setIsProcessing(false);
    }
  };

  const downloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'converted_image.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6">Image to PDF Converter</h1>
        <p className="text-gray-600 mb-8">Select an image (JPG, PNG) and convert it into a single PDF file.</p>

        <div className="flex flex-col items-center space-y-4 mb-6">
          <label htmlFor="file-upload" className="cursor-pointer bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            <FaFileUpload className="inline-block mr-2" />
            Choisir un fichier
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="hidden"
          />
          {file && (
            <p className="text-gray-700 font-medium mt-2">Fichier sélectionné: <span className="font-bold">{file.name}</span></p>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p className="font-bold">Erreur!</p>
            <p>{error}</p>
          </div>
        )}

        {isProcessing ? (
          <div className="flex flex-col items-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <p className="text-blue-600 font-medium">Veuillez patienter, conversion...</p>
          </div>
        ) : (
          <button
            onClick={convertToPdf}
            disabled={!file}
            className={`w-full py-4 font-bold text-white rounded-lg shadow-lg transition duration-300 ${
              file ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Convertir
          </button>
        )}

        {pdfUrl && (
          <div className="mt-8">
            <button
              onClick={downloadPdf}
              className="w-full py-4 font-bold text-white bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
            >
              <FaDownload className="inline-block mr-2" />
              Télécharger le PDF
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