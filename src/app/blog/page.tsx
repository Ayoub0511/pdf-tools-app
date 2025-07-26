// src/app/blog/page.tsx (أو src/app/blog/page.js)

import Head from 'next/head';
import Link from 'next/link';

export default function BlogHome() {
  // هنا نقدروا نجيبوا بيانات المقالات من قاعدة بيانات أو ملف JSON
  // حاليا، غادي نخدموا ببيانات ثابتة (Hardcoded)
  const articles = [
    {
      title: "How to Merge PDF Files Easily with PDF361",
      description: "Learn how to combine multiple PDF files into one single document quickly and easily using PDF361's online tool.",
      link: "/blog/how-to-merge-pdf",
      category: "PDF Tools",
      date: "July 26, 2025"
    },
    {
      title: "How to Split PDF Files Easily with PDF361",
      description: "Learn how to split a single PDF file into multiple individual documents or extract specific pages using PDF361's online tool.",
      link: "/blog/how-to-split-pdf",
      category: "PDF Tools",
      date: "July 26, 2025"
    },
    {
      title: "How to Compress PDF Files Easily with PDF361",
      description: "Learn how to reduce the file size of your PDF documents without compromising quality using PDF361's online compression tool.",
      link: "/blog/how-to-compress-pdf",
      category: "PDF Tools",
      date: "July 26, 2025"
    },
    {
      title: "How to Convert Files to PDF Easily with PDF361",
      description: "Learn how to convert various file formats like Word, Excel, PowerPoint, and images to PDF using PDF361's online converter.",
      link: "/blog/how-to-convert-to-pdf",
      category: "PDF Tools",
      date: "July 26, 2025"
    },
    // زيد هنا أي مقالات أخرى من بعد
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <Head>
        <title>Blog - PDF361</title>
        <meta name="description" content="Explore articles and guides on PDF tools, tips, and best practices from PDF361." />
      </Head>

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-4xl w-full">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Our Blog
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <Link href={article.link} key={index} passHref>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer text-left">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  {article.date} | {article.category}
                </p>
                <p className="text-gray-700">
                  {article.description}
                </p>
              </div>
            </Link>
          ))}
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
