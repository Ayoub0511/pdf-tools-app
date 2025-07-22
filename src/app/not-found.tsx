// src/app/not-found.tsx

'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
      <h1 className="text-5xl font-bold mb-4 text-red-600">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">Oops! The page you’re looking for doesn’t exist.</p>
      <Link href="/" className="text-blue-500 hover:underline text-lg">
        Go back home →
      </Link>
    </div>
  );
}
