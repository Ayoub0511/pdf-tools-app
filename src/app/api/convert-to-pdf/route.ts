import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { Readable } from 'stream';
import mammoth from 'mammoth'; // Import mammoth.js

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    let htmlContent: string;
    let filename = file.name;

    // --- Handling different file types ---
    if (file.type === 'text/html') {
      htmlContent = await file.text();
      filename = filename.replace(/\.html$/, '.pdf');
    } else if (file.type.startsWith('image/')) {
      const arrayBuffer = await file.arrayBuffer();
      const base64Image = Buffer.from(arrayBuffer).toString('base64');
      const imageMimeType = file.type;
      htmlContent = `
        <html>
          <head>
            <title>Converted Image</title>
            <style>
              body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
              img { max-width: 100%; max-height: 100vh; display: block; }
            </style>
          </head>
          <body>
            <img src="data:${imageMimeType};base64,${base64Image}" />
          </body>
        </html>
      `;
      filename = filename.replace(/\.(jpeg|jpg|png|gif)$/, '.pdf');
    } else if (file.type === 'application/pdf') {
      const buffer = Buffer.from(await file.arrayBuffer());
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null);

      return new NextResponse(stream as any, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // Handle .docx files using mammoth.js
      console.log(`Converting DOCX file: ${file.name}`);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      try {
        const result = await mammoth.convertToHtml({ buffer: buffer });
        htmlContent = result.value; // The generated HTML
        // You might want to wrap the HTML in basic head/body tags for better PDF formatting
        htmlContent = `
          <html>
            <head>
              <title>${filename.replace(/\.docx$/, '')}</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20mm; }
                p { margin-bottom: 1em; }
                h1, h2, h3, h4, h5, h6 { margin-top: 1em; margin-bottom: 0.5em; }
                /* Basic styling for images, tables from DOCX conversion */
                img { max-width: 100%; height: auto; }
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
              </style>
            </head>
            <body>
              ${htmlContent}
            </body>
          </html>
        `;
        filename = filename.replace(/\.docx$/, '.pdf');
        console.log("DOCX converted to HTML successfully.");
      } catch (mammothError: any) {
        console.error("❌ Mammoth DOCX Conversion Error:", mammothError);
        return NextResponse.json({ error: "Failed to convert DOCX to HTML: " + mammothError.message }, { status: 500 });
      }

    }
    // Add more else if blocks for .xlsx, etc., using appropriate libraries
    else {
      htmlContent = `
        <html>
          <head>
            <title>Unsupported Document</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
            </style>
          </head>
          <body>
            <h1>Unsupported File Type: ${filename}</h1>
            <p>This converter currently supports HTML, images, DOCX, and direct PDF upload. For other types like XLSX, dedicated parsing is required.</p>
            <p>Original file type: ${file.type}</p>
          </body>
        </html>
      `;
      filename = filename + '.pdf';
    }

    if (!htmlContent) {
      return NextResponse.json({ error: "Could not generate HTML content from file." }, { status: 400 });
    }

    console.log("Launching browser for PDF conversion...");
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    console.log("Generating PDF...");
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm',
      },
    });

    await browser.close();
    console.log("PDF generation complete. Streaming to client.");

    const stream = new Readable();
    stream.push(pdfBuffer);
    stream.push(null);

    return new NextResponse(stream as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });

  } catch (error: any) {
    console.error("❌ PDF Conversion Error:", error);
    return NextResponse.json({ error: "Failed to convert file to PDF: " + error.message }, { status: 500 });
  }
}