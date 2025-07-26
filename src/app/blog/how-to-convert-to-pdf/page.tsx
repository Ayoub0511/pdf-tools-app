// src/app/blog/how-to-convert-to-pdf/page.tsx

import Head from 'next/head';

export default function HowToConvertToPdf() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <Head>
        <title>How to Convert Files to PDF Easily with PDF361</title>
        <meta name="description" content="Learn how to convert various file formats like Word, Excel, PowerPoint, and images to PDF using PDF361's online converter." />
      </Head>

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-3xl w-full">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 text-center">
          How to Convert Files to PDF Easily with PDF361
        </h1>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Introduction</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Converting documents and images to PDF format is a common need for many users, whether for professional, academic, or personal use. PDF is a universal format that ensures your documents look the same on any device and are easy to share. <span className="font-semibold text-blue-600">PDF361</span> offers a free and efficient online tool to convert various file types, such as Word, Excel, PowerPoint, and images (JPG, PNG), into high-quality PDF documents.
          </p>
        </section>

        {/* Why Choose PDF361 for Converting to PDF? */}
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Why Choose PDF361 for Converting to PDF?</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed pl-4">
            <li><span className="font-semibold">Wide Format Support:</span> Convert from popular formats like DOCX, XLSX, PPTX, JPG, PNG, and more.</li>
            <li><span className="font-semibold">High Quality Output:</span> Our converter ensures your converted PDFs maintain their original formatting and quality.</li>
            <li><span className="font-semibold">Free and Fast:</span> Enjoy quick conversions without any cost or software installation.</li>
            <li><span className="font-semibold">Secure and Private:</span> Your files are processed securely and deleted from our servers after conversion.</li>
            <li><span className="font-semibold">User-Friendly:</span> The intuitive interface makes the conversion process straightforward for everyone.</li>
          </ul>
        </section>

        {/* Step-by-Step Guide */}
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Step-by-Step Guide: How to Convert Files to PDF</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Follow these simple steps to convert your files into PDF format:
          </p>

          <ol className="list-decimal list-inside text-gray-700 text-lg leading-relaxed pl-4 space-y-4">
            <li>
              <span className="font-semibold">Step 1: Access the Convert Tool</span><br />
              Navigate to our <a href="/tools/convert-to-pdf" className="text-blue-600 hover:underline">Convert to PDF tool page</a> on PDF361.
              {/* Add an image here:  */}
            </li>
            <li>
              <span className="font-semibold">Step 2: Upload Your File</span><br />
              Click on the "Upload File" button or drag and drop your document/image into the designated area.
              {/* Add an image here:  */}
            </li>
            <li>
              <span className="font-semibold">Step 3: Initiate Conversion</span><br />
              Once your file is uploaded, click the "Convert" button. Our tool will quickly transform your file into a PDF.
              {/* Add an image here:  */}
            </li>
            <li>
              <span className="font-semibold">Step 4: Download Your New PDF</span><br />
              After the conversion is complete, a download link will appear. Click it to save your new PDF file to your device.
              {/* Add an image here:  */}
            </li>
          </ol>
        </section>

        {/* Extra Tips */}
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Extra Tips for Effective Conversion</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed pl-4">
            <li>Ensure your original file is not corrupted for best conversion results.</li>
            <li>For image conversions, consider the resolution of the original image for PDF quality.</li>
            <li>Always preview the converted PDF to ensure it meets your expectations.</li>
          </ul>
        </section>

        {/* Conclusion */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Conclusion</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Converting files to PDF has never been easier with PDF361. Our online converter provides a seamless and reliable way to transform your documents and images into the widely compatible PDF format. Try our Convert to PDF tool today and simplify your document management!
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
