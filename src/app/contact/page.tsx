// src/app/contact/page.tsx (أو src/app/contact/page.js)

import Head from 'next/head'; // This is important for SEO

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <Head>
        <title>Contact Us - PDF361</title>
        <meta name="description" content="Contact PDF361 for support, inquiries, or feedback." />
      </Head>

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-3xl w-full">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-4 text-center">
          We'd love to hear from you! Whether you have a question, feedback, or need support, feel free to reach out to us.
        </p>
        
        <div className="flex flex-col items-center justify-center space-y-4 mt-8">
          <p className="text-gray-800 text-xl font-semibold">
            Email:
          </p>
          <a 
            href="mailto:support@pdf361.com" 
            className="text-blue-600 hover:underline text-lg sm:text-xl transition-colors duration-300"
          >
            support@pdf361.com
          </a>
          <p className="text-gray-600 text-md text-center mt-4">
            We aim to respond to all inquiries within 24-48 hours.
          </p>
        </div>

        <div className="text-center mt-10">
          <a href="/" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
