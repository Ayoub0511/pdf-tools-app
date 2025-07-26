// src/app/blog/how-to-split-pdf/page.tsx

import Head from 'next/head';

export default function HowToSplitPdf() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <Head>
        <title>How to Split PDF Files Easily with PDF361</title>
        <meta name="description" content="Learn how to split a single PDF file into multiple individual documents or extract specific pages using PDF361's online tool." />
      </Head>

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-3xl w-full">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 text-center">
          How to Split PDF Files Easily with PDF361
        </h1>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Introduction</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Dealing with large PDF documents can sometimes be challenging, especially when you only need a few specific pages. Whether it's extracting a single chapter from an e-book, separating invoices, or breaking down a long report, splitting PDF files is a common necessity. <span className="font-semibold text-blue-600">PDF361</span> offers a user-friendly and efficient online tool to help you easily split your PDF documents into smaller, manageable files.
          </p>
        </section>

        {/* Why Choose PDF361 for Splitting PDFs? */}
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Why Choose PDF361 for Splitting PDFs?</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed pl-4">
            <li><span className="font-semibold">Free and Accessible:</span> Our tool is completely free and available directly from your web browser.</li>
            <li><span className="font-semibold">Precise Splitting:</span> Split your PDF by page range or extract individual pages with accuracy.</li>
            <li><span className="font-semibold">Secure Processing:</span> Your documents are handled with utmost security and deleted from our servers after processing.</li>
            <li><span className="font-semibold">No Installation Required:</span> Use our tool online without the need for any software downloads.</li>
            <li><span className="font-semibold">Intuitive Interface:</span> Designed for ease of use, making the splitting process straightforward for everyone.</li>
          </ul>
        </section>

        {/* Step-by-Step Guide */}
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Step-by-Step Guide: How to Split PDF Files</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Follow these simple steps to divide your PDF documents:
          </p>

          <ol className="list-decimal list-inside text-gray-700 text-lg leading-relaxed pl-4 space-y-4">
            <li>
              <span className="font-semibold">Step 1: Access the Split Tool</span><br />
              Go to our <a href="/tools/split-pdf" className="text-blue-600 hover:underline">Split PDF tool page</a> on PDF361.
              {/* Add an image here:  */}
            </li>
            <li>
              <span className="font-semibold">Step 2: Upload Your PDF File</span><br />
              Click on the "Upload PDF" button or drag and drop your PDF document into the designated area.
              {/* Add an image here:  */}
            </li>
            <li>
              <span className="font-semibold">Step 3: Choose Splitting Options</span><br />
              Once uploaded, you'll see options to split your PDF. You can choose to split by specific page ranges (e.g., 1-5, 10-12) or extract all pages into individual PDFs.
              {/* Add an image here:  */}
            </li>
            <li>
              <span className="font-semibold">Step 4: Split the PDF</span><br />
              After selecting your desired options, click the "Split" button. Our tool will quickly process your document.
              {/* Add an image here:  */}
            </li>
            <li>
              <span className="font-semibold">Step 5: Download Your Split PDFs</span><br />
              Once the splitting process is complete, a download link will appear. You can download your individual PDF files or a compressed archive containing all of them.
              {/* Add an image here:  */}
            </li>
          </ol>
        </section>

        {/* Extra Tips */}
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Extra Tips for Effective Splitting</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed pl-4">
            <li>Always double-check your page ranges or selections before splitting.</li>
            <li>For large documents, ensure a stable internet connection for smooth processing.</li>
            <li>Consider organizing your split files immediately after downloading them.</li>
          </ul>
        </section>

        {/* Conclusion */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Conclusion</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Splitting PDF files is made easy and efficient with PDF361. Our online tool provides you with the flexibility to manage your documents precisely as you need. Try our Split PDF tool today and streamline your document workflow!
          </p>
        </section>

        <div className="text-center mt-10">
          <a href="/" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
