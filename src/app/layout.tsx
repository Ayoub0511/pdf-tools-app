// src/app/layout.tsx

import './globals.css'; // Khalli hada ila kan
import { Inter } from 'next/font/google'; // Importina Inter

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children} {/* هذا هو المحتوى ديال الصفحات ديالك */}

        {/* هذا هو كود الـ Footer الجديد والمحدث */}
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
