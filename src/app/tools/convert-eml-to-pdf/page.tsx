'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

// Ghadi nkhdem had l'bibliothèques mn window bach ykono moujoudin
declare const html2canvas: any;
declare const jsPDF: any;
declare const domtoimage: any;

const App = () => {
  const [emlFile, setEmlFile] = useState<File | null>(null);
  const [parsedEmail, setParsedEmail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef(null);

  // Kanzidou wa7ed useEffect bach ytechargiw les scripts dial l'bibliothèques
  useEffect(() => {
    const scriptHtml2canvas = document.createElement('script');
    scriptHtml2canvas.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    scriptHtml2canvas.async = true;
    document.body.appendChild(scriptHtml2canvas);

    const scriptJsPDF = document.createElement('script');
    scriptJsPDF.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    scriptJsPDF.async = true;
    document.body.appendChild(scriptJsPDF);

    const scriptDomToImage = document.createElement('script');
    scriptDomToImage.src = 'https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js';
    scriptDomToImage.async = true;
    document.body.appendChild(scriptDomToImage);

    return () => {
      // Kan7aydou les scripts ila l'component t7ayed
      document.body.removeChild(scriptHtml2canvas);
      document.body.removeChild(scriptJsPDF);
      document.body.removeChild(scriptDomToImage);
    };
  }, []); // [] bach ykhedem gha mra wa7da

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setEmlFile(file);
      setParsedEmail(null);
      setError(null);
    }
  };

  const handleConvert = useCallback(async () => {
    if (!emlFile) {
      setError("Please select an EML file first.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('emlFile', emlFile);

    try {
      const response = await fetch('/api/convert-eml', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with an error: ${response.statusText}`);
      }

      const data = await response.json();
      setParsedEmail(data);
    } catch (err) {
      console.error('Conversion failed:', err);
      setError('Failed to convert file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [emlFile]);

  const sanitizeHtml = (htmlString: string) => {
    if (!htmlString) return '';
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    doc.querySelectorAll('[style]').forEach(el => {
      if (el instanceof HTMLElement) {
        if (el.style.length > 0) {
          el.style.cssText = el.style.cssText.replace(/oklch\([^)]*\)/g, 'rgb(0,0,0)');
        }
      }
    });
    return doc.body.innerHTML;
  };

  const handlePrint = useCallback(() => {
    if (typeof jsPDF === 'undefined' || typeof html2canvas === 'undefined' || typeof domtoimage === 'undefined') {
        setError("Libraries are not loaded yet. Please wait a moment.");
        return;
    }
    const input = contentRef.current as HTMLElement | null;
    if (!input) {
      setError("Content not available for PDF conversion.");
      return;
    }

    const tryHtml2canvas = () => {
      html2canvas(input, { scale: 2, useCORS: true, logging: true })
        .then((canvas: HTMLCanvasElement) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4', true);
          const imgWidth = 210;
          const pageHeight = 295;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;
          let position = 0;
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
          pdf.save('converted-email.pdf');
          setIsLoading(false);
        })
        .catch((error: any) => {
          console.error("html2canvas failed, trying dom-to-image:", error);
          tryDomToImage();
        });
    };

    const tryDomToImage = () => {
      domtoimage.toPng(input)
        .then((dataUrl: string) => {
          const pdf = new jsPDF('p', 'mm', 'a4', true);
          const imgWidth = 210;
          const pageHeight = 295;
          const imgHeight = (input.clientHeight * imgWidth) / input.clientWidth;
          let heightLeft = imgHeight;
          let position = 0;
          pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
          pdf.save('converted-email.pdf');
          setIsLoading(false);
        })
        .catch((error: any) => {
          console.error('dom-to-image also failed:', error);
          setError('Failed to create PDF. The email content may contain unsupported styles.');
          setIsLoading(false);
        });
    };

    setIsLoading(true);
    setError(null);
    tryHtml2canvas();
  }, [contentRef]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <header className="text-center mb-12 w-full max-w-4xl">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Email to PDF Converter Tool
        </h1>
        <p className="text-lg text-gray-600">
          Convert your '.eml' email files into a downloadable PDF document.
        </p>
      </header>

      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl text-center">
        <div className="flex justify-center items-center gap-4 mb-6">
          <svg className="text-indigo-500 text-6xl w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M480 32C506.5 32 528 53.5 528 80V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48H480zM320 224h128V320H320V224zm0-96H448V192H320V128zM48 96a32 32 0 1 1 64 0 32 32 0 1 1-64 0zM176 128H288V192H176V128zm0 96H288V320H176V224zM48 352a32 32 0 1 1 64 0 32 32 0 1 1-64 0zM48 256a32 32 0 1 1 64 0 32 32 0 1 1-64 0z"/></svg>
          <span className="text-4xl font-light text-gray-400">×</span>
          <svg className="text-red-500 text-6xl w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M369.9 97.9L286 14.1C277 5 264.8 0 252.6 0H48C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48H336c26.5 0 48-21.5 48-48V127.4c0-12.2-4.9-23.4-12.1-31.5zM336 480H48V48h192v80c0 13.3 10.7 24 24 24h80V464c0 17.6-14.4 32-32 32zM272 256H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h160c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-16 96H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h160c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM280 152h-12c-6.6 0-12-5.4-12-12V72h24c6.6 0 12 5.4 12 12v68z"/></svg>
        </div>

        <input
          type="file"
          id="emlFileInput"
          className="hidden"
          accept=".eml"
          onChange={handleFileChange}
        />
        
        <label
          htmlFor="emlFileInput"
          className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300"
        >
          Select EML file
        </label>
        
        {emlFile && (
          <p className="mt-4 text-gray-700">File selected: <span className="font-semibold">{emlFile.name}</span></p>
        )}
        
        <button
          onClick={handleConvert}
          className="mt-6 w-full px-8 py-4 bg-gray-500 text-white font-bold rounded-lg cursor-pointer hover:bg-gray-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!emlFile || isLoading}
        >
          {isLoading ? 'Converting...' : 'Convert to PDF'}
        </button>

        {error && (
          <p className="mt-4 text-red-600">{error}</p>
        )}
      </div>
      
      {parsedEmail && (
        <div className="mt-8 w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg" ref={contentRef}>
          <h2 className="text-3xl font-bold mb-4 border-b-2 pb-2">Email Content</h2>
          <div className="mb-4">
            <p><span className="font-semibold">From:</span> {parsedEmail.from}</p>
            <p><span className="font-semibold">To:</span> {parsedEmail.to}</p>
            <p><span className="font-semibold">Subject:</span> {parsedEmail.subject}</p>
            <p><span className="font-semibold">Date:</span> {new Date(parsedEmail.date).toLocaleString()}</p>
          </div>
          
          <div className="email-body prose max-w-none">
            {parsedEmail.html ? (
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(parsedEmail.html) }} />
            ) : (
              <pre>{parsedEmail.text}</pre>
            )}
          </div>
          
          <button
            onClick={handlePrint}
            className="mt-6 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
