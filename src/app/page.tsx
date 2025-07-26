// src/app/page.tsx

import Head from 'next/head'; // Import Head for SEO
import Link from 'next/link'; // Import Link for navigation

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <Head>
        <title>PDF Tools - PDF361</title>
        <meta name="description" content="All-in-one online PDF tools for merging, splitting, compressing, and converting PDF files." />
      </Head>

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-4xl w-full text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6">
          PDF Tools
        </h1>
        <p className="text-gray-700 text-xl leading-relaxed mb-8">
          Your comprehensive suite of online tools for all your PDF needs.
        </p>

        {/* PDF Tools Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          <Link href="/tools/merge-pdf" passHref>
            <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <h2 className="text-2xl font-bold text-blue-700 mb-2">Merge PDF</h2>
              <p className="text-gray-600">Combine multiple PDF files into one.</p>
            </div>
          </Link>
          <Link href="/tools/split-pdf" passHref>
            <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Split PDF</h2>
              <p className="text-gray-600">Split a PDF file into individual pages.</p>
            </div>
          </Link>
          <Link href="/tools/compress-pdf" passHref>
            <div className="bg-yellow-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <h2 className="text-2xl font-bold text-yellow-700 mb-2">Compress PDF</h2>
              <p className="text-gray-600">Reduce the file size of your PDF.</p>
            </div>
          </Link>
          <Link href="/tools/convert-to-pdf" passHref>
            <div className="bg-red-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <h2 className="text-2xl font-bold text-red-700 mb-2">Convert to PDF</h2>
              <p className="text-gray-600">Convert various file formats (e.g., DOCX, JPG) to PDF.</p>
            </div>
          </Link>
        </div>

        {/* Latest Articles Section */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <Link href="/blog/how-to-merge-pdf" passHref>
              <div className="bg-purple-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer text-left">
                <h3 className="text-xl font-bold text-purple-700 mb-2">
                  How to Merge PDF Files Easily with PDF361
                </h3>
                <p className="text-gray-600">
                  Learn how to combine multiple PDF files into one single document quickly and easily using PDF361's online tool.
                </p>
              </div>
            </Link>
            <Link href="/blog/how-to-split-pdf" passHref>
              <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer text-left">
                <h3 className="text-xl font-bold text-green-700 mb-2">
                  How to Split PDF Files Easily with PDF361
                </h3>
                <p className="text-gray-600">
                  Learn how to split a single PDF file into multiple individual documents or extract specific pages using PDF361's online tool.
                </p>
              </div>
            </Link>
            <Link href="/blog/how-to-compress-pdf" passHref>
              <div className="bg-yellow-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer text-left">
                <h3 className="text-xl font-bold text-yellow-700 mb-2">
                  How to Compress PDF Files Easily with PDF361
                </h3>
                <p className="text-gray-600">
                  Learn how to reduce the file size of your PDF documents without compromising quality using PDF361's online compression tool.
                </p>
              </div>
            </Link>
            <Link href="/blog/how-to-convert-to-pdf" passHref>
              <div className="bg-red-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer text-left">
                <h3 className="text-xl font-bold text-red-700 mb-2">
                  How to Convert Files to PDF Easily with PDF361
                </h3>
                <p className="text-gray-600">
                  Learn how to convert various file formats like Word, Excel, PowerPoint, and images to PDF using PDF361's online converter.
                </p>
              </div>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" passHref>
              <a className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                View All Articles
              </a>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
