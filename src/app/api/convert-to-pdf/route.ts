import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { Readable } from 'stream';
import mammoth from 'mammoth';
import axios from 'axios'; // Using axios for server-side HTTP requests, more common for APIs

// Define interfaces for CloudConvert API response (still needed for other parts if not removed)
// If you decide to completely remove CloudConvert, you can remove these interfaces.
interface CloudConvertTaskResultForm {
  url: string;
  parameters: Record<string, string>;
}

interface CloudConvertTaskResult {
  form?: CloudConvertTaskResultForm;
  files?: Array<{ url: string; filename: string; }>;
}

interface CloudConvertTask {
  id: string;
  operation: string;
  status: string;
  result?: CloudConvertTaskResult;
  code?: string; // For error codes
}

interface CloudConvertJobData {
  id: string;
  status: string;
  tasks: CloudConvertTask[];
}

interface CloudConvertApiResponse {
  data: CloudConvertJobData;
}


// Function to convert Node.js Readable stream to Web ReadableStream
function toWebReadableStream(nodeReadable: Readable): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      nodeReadable.on('data', (chunk: Buffer) => {
        controller.enqueue(new Uint8Array(chunk));
      });
      nodeReadable.on('end', () => {
        controller.close();
      });
      nodeReadable.on('error', (err) => {
        controller.error(err);
      });
    },
    cancel() {
      nodeReadable.destroy();
    }
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    let htmlContent: string | undefined;
    let filename = file.name;
    let pdfBuffer: Buffer | undefined; // To store the final PDF buffer

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
      // If the file is already a PDF, return it directly
      pdfBuffer = Buffer.from(await file.arrayBuffer());
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // Handle .docx files using mammoth.js
      console.log(`Converting DOCX file: ${file.name}`);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      try {
        const result = await mammoth.convertToHtml({ buffer: buffer });
        htmlContent = result.value; // The generated HTML
        htmlContent = `
          <html>
            <head>
              <title>${filename.replace(/\.docx$/, '')}</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20mm; }
                p { margin-bottom: 1em; }
                h1, h2, h3, h4, h5, h6 { margin-top: 1em; margin-bottom: 0.5em; }
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
      } catch (mammothError: unknown) {
        if (mammothError instanceof Error) {
          console.error("❌ Mammoth DOCX Conversion Error:", mammothError.message);
          return NextResponse.json({ error: "Failed to convert DOCX to HTML: " + mammothError.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Unknown DOCX conversion error." }, { status: 500 });
      }
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel') {
      // Handle XLSX (Excel) files using Aspose.Cells Cloud API
      console.log(`Attempting to convert Excel file: ${file.name} using Aspose.Cells Cloud`);

      // YOUR ASPOSE API CREDENTIALS HERE
      // Ensure these are your actual Client ID and Client Secret from Aspose Cloud Dashboard
      const ASPOSE_CLIENT_ID = '52aba14d-2168-4408-95b5-c13066ef64cd';
      const ASPOSE_CLIENT_SECRET = '209bff3d24db90658fe223e5992b5d82';

      // No need for an explicit check here, Aspose API will return 401 if credentials are wrong.
      // If you want to add a check for empty strings:
      if (!ASPOSE_CLIENT_ID || !ASPOSE_CLIENT_SECRET) {
        console.error("Aspose API credentials are not set. Please ensure Client ID and Client Secret are provided.");
        return NextResponse.json({ error: "Aspose API credentials are not configured." }, { status: 500 });
      }

      try {
        // Step 1: Get Access Token from Aspose
        const tokenRes = await axios.post(
          'https://api.aspose.cloud/connect/token',
          new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: ASPOSE_CLIENT_ID,
            client_secret: ASPOSE_CLIENT_SECRET,
          }).toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        const accessToken = tokenRes.data.access_token;
        console.log("Aspose Access Token obtained.");

        // Step 2: Upload file to Aspose Storage (or convert directly if API supports it)
        // For simplicity, we'll use a direct conversion endpoint if available,
        // otherwise, we'd need to upload to Aspose Cloud Storage first.
        // Aspose.Cells Cloud has a direct convert endpoint for stream/file.
        
        const excelBuffer = Buffer.from(await file.arrayBuffer());

        const convertRes = await axios.put(
          `https://api.aspose.cloud/v3.0/cells/convert?format=pdf`,
          excelBuffer,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': file.type, // Use original file type for upload
              'Accept': 'application/pdf',
            },
            responseType: 'arraybuffer', // Get response as a buffer
          }
        );

        if (convertRes.status !== 200) {
          const errorText = convertRes.data ? Buffer.from(convertRes.data).toString('utf8') : 'Unknown error';
          console.error("Aspose.Cells Conversion Failed:", convertRes.status, errorText);
          throw new Error(`Aspose.Cells conversion failed: ${convertRes.status} - ${errorText}`);
        }

        pdfBuffer = Buffer.from(convertRes.data);
        filename = filename.replace(/\.xlsx?$/, '.pdf'); // Ensure .pdf extension
        console.log("Excel converted to PDF successfully via Aspose.Cells Cloud.");

      } catch (asposeError: unknown) {
        if (axios.isAxiosError(asposeError)) {
          console.error("❌ Aspose.Cells Conversion Error (Axios):", asposeError.message);
          if (asposeError.response) {
            console.error("Aspose Response Status:", asposeError.response.status);
            console.error("Aspose Response Data:", asposeError.response.data ? Buffer.from(asposeError.response.data).toString('utf8') : 'No data');
          }
          return NextResponse.json({ error: "Failed to convert Excel to PDF via Aspose.Cells: " + (asposeError.response?.data ? Buffer.from(asposeError.response.data).toString('utf8') : asposeError.message) }, { status: 500 });
        } else if (asposeError instanceof Error) {
          console.error("❌ Aspose.Cells Conversion Error:", asposeError.message);
          return NextResponse.json({ error: "Failed to convert Excel to PDF via Aspose.Cells: " + asposeError.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Unknown Excel conversion error." }, { status: 500 });
      }

    } else {
      // Fallback for unsupported file types
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
            <p>This converter currently supports HTML, images, DOCX, XLSX (via Aspose.Cells Cloud), and direct PDF upload. For other types, dedicated parsing is required.</p>
            <p>Original file type: ${file.type}</p>
          </body>
        </html>
      `;
      filename = filename + '.pdf';
    }

    // If pdfBuffer is already set (e.g., for direct PDF upload or Aspose conversion), use it
    if (pdfBuffer) {
      const nodeReadablePdfStream = new Readable();
      nodeReadablePdfStream.push(pdfBuffer);
      nodeReadablePdfStream.push(null); // Signal end of stream
      const webReadablePdfStream = toWebReadableStream(nodeReadablePdfStream);

      return new NextResponse(webReadablePdfStream, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    }

    // Otherwise, if htmlContent is available, use Puppeteer to convert HTML to PDF
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
    const finalPdfBuffer = await page.pdf({
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

    const nodeReadablePdfStream = new Readable();
    nodeReadablePdfStream.push(finalPdfBuffer);
    nodeReadablePdfStream.push(null); // Signal end of stream

    const webReadablePdfStream = toWebReadableStream(nodeReadablePdfStream);

    return new NextResponse(webReadablePdfStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ PDF Conversion Error:", error.message);
      return NextResponse.json({ error: "Failed to convert file to PDF: " + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error occurred." }, { status: 500 });
  }
}
