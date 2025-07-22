import './globals.css'; // Khalli hada ila kan
import { Inter } from 'next/font/google'; // Importina Inter

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}> {/* Nsta3mlo inter.className hna */}
      <body>{children}</body>
    </html>
  );
}