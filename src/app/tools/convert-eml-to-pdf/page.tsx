'use client';

import React, { useState } from 'react';
import { FaFileArchive, FaFilePdf, FaFileUpload, FaDownload, FaTimes } from 'react-icons/fa';
import jsPDF from 'jspdf';

const ConvertEmlToPdfPage = () => {
    // State to hold the selected file
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    // State to hold the PDF data (as a URL for now)
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    // State for loading and error messages
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // This function handles the file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            setPdfUrl(null); // Reset previous PDF URL
            setError(null); // Clear any previous errors
        }
    };

    // Function to handle the conversion process
    const handleConvert = async () => {
        if (!selectedFile) {
            setError('المرجو اختيار ملف eml أولا.');
            return;
        }

        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('emlFile', selectedFile);

        try {
            const response = await fetch('/api/convert-eml', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'حدث خطأ أثناء التحويل.');
            }

            const emailData = await response.json();

            // Create a new jsPDF instance
            const doc = new jsPDF();
            
            // Set font for Arabic text
            // Make sure the file is located at /public/fonts/Amiri-Regular.ttf
            doc.addFont('/fonts/Amiri-Regular.ttf', 'Amiri', 'normal');
            doc.setFont('Amiri');
            doc.setR2L(true); // Right-to-Left for Arabic

            // Add email details
            doc.setFontSize(22);
            doc.text(`الموضوع: ${emailData.subject}`, 200, 20, { align: 'right' });
            doc.setFontSize(14);
            doc.text(`من: ${emailData.from}`, 200, 30, { align: 'right' });
            doc.text(`إلى: ${emailData.to}`, 200, 40, { align: 'right' });
            doc.text(`التاريخ: ${new Date(emailData.date).toLocaleString('ar-EG')}`, 200, 50, { align: 'right' });

            // Add a line break
            doc.line(20, 60, 200, 60);

            // Add the email body text with a more suitable font for Arabic
            doc.setFontSize(12);
            const textLines = doc.splitTextToSize(emailData.text, 180);
            doc.text(textLines, 200, 70, { align: 'right' });

            // Save the PDF and create a URL for it
            const pdfBlob = doc.output('blob');
            setPdfUrl(URL.createObjectURL(pdfBlob));

        } catch (err: any) {
            console.error('Conversion failed:', err);
            // Updated error message to be more specific
            setError(err.message || 'حدث خطأ أثناء التحويل. تأكد من وجود ملف Amiri-Regular.ttf في مجلد /public/fonts');
        } finally {
            setIsLoading(false);
        }
    };

    // Function to download the generated PDF
    const handleDownload = () => {
        if (pdfUrl) {
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = `${selectedFile?.name.split('.')[0] || 'converted'}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
                    تحويل البريد الإلكتروني إلى PDF
                </h1>
                <p className="text-gray-600 mb-8">
                    تحويل ملفات البريد الإلكتروني '.eml' إلى PDF وحوله إلى ملف PDF.
                </p>

                <div className="flex justify-center items-center mb-6">
                    <FaFileArchive className="text-blue-500 text-6xl mr-4" />
                    <FaTimes className="text-gray-400 text-4xl mr-4" />
                    <FaFilePdf className="text-red-500 text-6xl" />
                </div>

                <div className="flex flex-col items-center space-y-4 mb-6">
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        <FaFileUpload className="inline-block mr-2" />
                        اختيار ملف eml.
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept=".eml"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>

                {selectedFile && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 text-center">
                        <p className="text-gray-700 font-medium">
                            تم اختيار: <span className="font-bold">{selectedFile.name}</span>
                        </p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                        <p className="font-bold">خطأ!</p>
                        <p>{error}</p>
                    </div>
                )}

                {isLoading ? (
                    <div className="flex justify-center items-center mb-6">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mr-4 animate-spin"></div>
                        <p className="text-blue-600 font-medium">جاري التحويل...</p>
                    </div>
                ) : (
                    <button
                        onClick={handleConvert}
                        disabled={!selectedFile}
                        className={`w-full py-4 font-bold text-white rounded-lg shadow-lg transition duration-300 ${
                            selectedFile ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                        <FaFilePdf className="inline-block mr-2" />
                        PDF تحويل إلى
                    </button>
                )}

                {pdfUrl && (
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-4">تم التحويل بنجاح!</h3>
                        <button
                            onClick={handleDownload}
                            className="bg-purple-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
                        >
                            <FaDownload className="inline-block mr-2" />
                            تحميل الملف
                        </button>
                    </div>
                )}
            </div>
            {/* Simple CSS for the loader */}
            <style jsx>{`
                .loader {
                    border-top-color: #3498db;
                }
            `}</style>
        </div>
    );
};

export default ConvertEmlToPdfPage;
