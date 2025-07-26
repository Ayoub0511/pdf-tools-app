// src/app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';
import Head from 'next/head'; // تأكد أن Head مستوردة من 'next/head'

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <Head>
        {/* هذا هو كود AdSense الذي يجب لصقه هنا */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2702391251174134"
               crossorigin="anonymous"></script>
        {/* هنا يمكن أن تكون لديك Meta tags أخرى أو روابط CSS */}
      </Head>
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
