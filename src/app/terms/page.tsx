// src/app/terms/page.tsx (أو src/app/terms/page.js)

import Head from 'next/head'; // This is important for SEO

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <Head>
        <title>Terms of Service - PDF361</title>
        <meta name="description" content="Terms of Service for PDF361, outlining the rules and regulations for using our website." />
      </Head>

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-3xl w-full">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Terms of Service
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Welcome to PDF361! These terms and conditions outline the rules and regulations for the use of PDF361's Website, located at www.pdf361.com.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          By accessing this website we assume you accept these terms and conditions. Do not continue to use PDF361 if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 mt-6">
          Cookies
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          The website uses cookies to help personalize your online experience. By accessing PDF361, you agreed to use cookies in agreement with the PDF361's Privacy Policy.
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 mt-6">
          License
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Unless otherwise stated, PDF361 and/or its licensors own the intellectual property rights for all material on PDF361. All intellectual property rights are reserved. You may access this from PDF361 for your own personal use subjected to restrictions set in these terms and conditions.
        </p>
        <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed mb-4 pl-4">
          <li>Republish material from PDF361</li>
          <li>Sell, rent or sub-license material from PDF361</li>
          <li>Reproduce, duplicate or copy material from PDF361</li>
          <li>Redistribute content from PDF361</li>
        </ul>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          This Agreement shall begin on the date hereof.
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 mt-6">
          Hyperlinking to our Content
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          The following organizations may link to our Website without prior written approval:
        </p>
        <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed mb-4 pl-4">
          <li>Government agencies;</li>
          <li>Search engines;</li>
          <li>News organizations;</li>
          <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
          <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
        </ul>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of PDF361; and (d) the link is in the context of general resource information.
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 mt-6">
          iFrames
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 mt-6">
          Content Liability
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that are rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 mt-6">
          Reservation of Rights
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 mt-6">
          Removal of links from our website
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
        </p>

        <div className="text-center mt-8">
          <a href="/" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
