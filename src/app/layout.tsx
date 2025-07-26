// src/app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';
// حيد هذا: import Head from 'next/head';
import Script from 'next/script'; // استورد Script من 'next/script'

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      {/* هنا غنحطو كود AdSense باستخدام Script component */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2700291251174134"
        crossOrigin="anonymous"
        strategy="afterInteractive" // هاد الخاصية مهمة باش يتأكد الكود كيتحمل بشكل صحيح
      />

      {/* باقي الـ Head elements (Meta tags, links) كيبقاو هنا إلى عندك */}
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="16x16" />
        {/* أي Meta tags أخرى أو روابط CSS */}
      </head>
      <body>
        {children} {/* هذا هو المحتوى ديال الصفحات ديالك */}

        {/* ... Footer ديالك ... */}
        <footer className="bg-gray-800 text-white py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <nav className="mb-4">
              <ul className="flex justify-center space-x-6">
                <li>
                  <a href="/about" className="hover:text-blue-400 transition-colors duration-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-blue-400 transition-colors duration-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-blue-400 transition-colors duration-300">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-blue-400 transition-colors duration-300">
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} PDF361. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
