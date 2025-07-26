import Head from 'next/head'; // This is important for SEO

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <Head>
        <title>About Us - PDF361</title>
        <meta name="description" content="Learn about PDF361, our mission, vision, and our team specialized in PDF tools." />
      </Head>

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-3xl w-full">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 text-center">
          About Us
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Welcome to <span className="font-semibold text-blue-600">PDF361</span>, your comprehensive destination for all your PDF tool needs. We are a team of passionate developers and designers who believe in simplifying daily document-related tasks. Our mission is to provide easy-to-use, fast, and reliable PDF solutions for everyone, whether you are a student, a professional, or a casual user.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          We started <span className="font-semibold text-blue-600">PDF361</span> with a clear vision: to make handling PDF files an enjoyable and hassle-free experience. Through our innovative tools, you can easily merge, split, compress, and convert PDF files, all in one place, and with the highest standards of security and privacy.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          We are committed to providing the best user experience and constantly strive to develop and improve our services based on your feedback and needs. Thank you for trusting us!
        </p>

        <div className="text-center">
          <a href="/" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
