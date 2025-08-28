// src/app/page.tsx
'use client';

import ToolCard from './components/ToolCard';
import { FaFilePdf, FaUnlink, FaCompress, FaArrowsAltH, FaEnvelopeOpenText } from 'react-icons/fa';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
                    PDF Tools
                </h1>
                <p className="text-lg text-gray-600">
                    Your complete collection of online tools for all your PDF needs.
                </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ToolCard
                    title="Merge PDF"
                    description="Combine multiple PDF files into one single document."
                    icon={FaUnlink}
                    iconColor="text-blue-500"
                    bgColor="bg-blue-50"
                    href="/tools/merge-pdf"
                />
                <ToolCard
                    title="Split PDF"
                    description="Extract specific pages from a PDF to create individual files."
                    icon={FaArrowsAltH}
                    iconColor="text-green-500"
                    bgColor="bg-green-50"
                    href="/tools/split-pdf"
                />
                <ToolCard
                    title="Compress PDF"
                    description="Reduce the size of your PDF files without losing quality."
                    icon={FaCompress}
                    iconColor="text-red-500"
                    bgColor="bg-red-50"
                    href="/tools/compress-pdf"
                />
                <ToolCard
                    title="Convert to PDF"
                    description="Convert various file formats (like DOCX and JPG) to PDF."
                    icon={FaFilePdf}
                    iconColor="text-orange-500"
                    bgColor="bg-orange-50"
                    href="/tools/convert-to-pdf"
                />
                <ToolCard
                    title="EML to PDF"
                    description="Convert your '.eml' email files into a PDF document."
                    icon={FaEnvelopeOpenText}
                    iconColor="text-indigo-500"
                    bgColor="bg-indigo-50"
                    href="/tools/convert-eml-to-pdf"
                />
            </section>
        </div>
    );
};

export default HomePage;
