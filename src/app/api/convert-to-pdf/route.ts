import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { Readable } from 'stream';
import mammoth from 'mammoth';
// Make sure to install node-fetch if you haven't: npm install node-fetch
import fetch from 'node-fetch'; // Using node-fetch for server-side fetches

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
      // Handle XLSX (Excel) files using an external API (CloudConvert example)
      console.log(`Attempting to convert Excel file: ${file.name} using CloudConvert`);

      const CLOUDCONVERT_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTYxNDc5NTY5YWViZWU2YTg4Y2ExNzk3NjAzMzdmN2I3NjcwOWFlYWJhZDUwZjhjZDRiYmUyN2RlNTNiYjg5M2ZhN2ZjZTI4MTg5YmY1ODciLCJpYXQiOjE3NTMzOTc1NzIuODU1ODk5LCJuYmYiOjE3NTMzOTc1NzIuODU1OTAxLCJleHAiOjQ5MDkwNzExNzIuODUxNTgsInN1YiI6IjcyNDc0MTIxIiwic2NvcGVzIjpbInRhc2sud3JpdGUiLCJ1c2VyLnJlYWQiXX0.Yx0MsozfELAZozDC5oTDRNGRbBID5obPx2U8N1xKc6xzpkboksQ2pXQDK2lCSNLg7AaM0IeMqVWh2QUKHVcbDXkAmNYnGB3zoYwtqCLP4-wlnoWZ40R9sAR1M3CmU_nKkjGbp-yifRVeo7cW-nTT5K_a-3uTUzbFE0jKR8WdkUJZLDrOXD23nrz7otEPzw0kPuDzd9-A55k51HANlgLtMFlP6fvxZPNV8eadPfJHyR7fQeTZw7Dpvl-S6l_ueVhwkaNdRxMtqKS3PEO-bCAa0e1TVnWo4g4_VAy8r2lTVQwFfiMOWBLP9QuzzO7Ovph_ciwsY_-MQm7JCoLKWZAcN-FWcArPsaGBFzhluttxx8ylZiRaXjM7O4S__PDWzozccamwuSYvswthTya1JkKvD5aGMkZL-FXJMDV6ivYFsXbyQjukwnjjEGbkKZTys6zr_ISe4SFIdPTLfWjtUIJO2HNs-n0nycFffzxGVI4oYjIkYOsL1oVs2N0MPxd9s1S3ELJiWSlHN3qPUO6lu_aWtP1i6-tx7qOQ89KmCAQeFh_902-vCFZX-UaKmUI8QmBP2Kt9Mn8y6R5NHnxePmNrjQA7VFk3qgvNHE_ejkMUZKjmKQjDNu6ltZ1mbQ18akAsR5qUvqMsHQz3S4axhKfO8VKc8NbPGMom5T3EgjDSgdY'; // Your actual API Key here
      if (CLOUDCONVERT_API_KEY === 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTYxNDc5NTY5YWViZWU2YTg4Y2ExNzk3NjAzMzdmN2I3NjcwOWFlYWJhZDUwZjhjZDRiZWUyN2RlNTNiYjg5M2ZhN2ZjZTI4MTg5YmY1ODciLCJpYXQiOjE3NTMzOTc1NzIuODU1ODk5LCJuYmYiOjE3NTMzOTc1NzIuODU1OTAxLCJleHAiOjQ5MDkwNzExNzIuODUxNTgsInN1YiI6IjcyNDc0MTIxIiwic2NvcGVzIjpbInRhc2sud3JpdGUiLCJ1c2VyLnJlYWQiXX0.Yx0MsozfELAZozDC5oTDRNGRbBID5obPx2U8N1xKc6xzpkboksQ2pXQDK2lCSNLg7AaM0IeMqVWh2QUKHVcbDXkAmNYnGB3zoYwtqCLP4-wlnoWZ40R9sAR1M3CmU_nKkjGbp-yifRVeo7cW-nTT5K_a-3uTUzbFE0jKR8WdkUJZLDrOXD23nrz7otEPzw0kPuDzd9-A55k51HANlgLtMFlP6fvxZPNV8eadPfJHyR7fQeTZw7Dpvl-S6l_ueVhwkaNdRxMtqKS3PEO-bCAa0e1TVnWo4g4_VAy8r2lTVQwFfiMOWBLP9QuzzO7Ovph_ciwsY_-MQm7JCoLKWZAcN-FWcArPsaGBFzhluttxx8ylZiRaXjM7O4S__PDWzozccamwuSYvswthTya1JkKvD5aGMkZL-FXJMDV6ivYFsXbyQjukwnjjEGbkKZTys6zr_ISe4SFIdPTLfWjtUIJO2HNs-n0nycFffzxGVI4oYjIkYOsL1oVs2N0MPxd9s1S3ELJiWSlHN3qPUO6lu_aWtP1i6-tx7qOQ89KmCAQeFh_902-vCFZX-UaKmUI8QmBP2Kt9Mn8y6R5NHnxePmNrjQA7VFk3qgvNHE_ejkMUZKjmKQjDNu6ltZ1mbQ18akAsR5qUvqMsHQz3S4axhKfO8VKc8NbPGMom5T3EgjDSgdY') {
        console.error("CloudConvert API Key is not set. Please replace 'YOUR_CLOUDCONVERT_API_KEY' with your actual key.");
        return NextResponse.json({ error: "CloudConvert API Key is not configured." }, { status: 500 });
      }

      try {
        // Step 1: Upload file to CloudConvert
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);

        const uploadRes = await fetch('https://api.cloudconvert.com/v2/jobs', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${CLOUDCONVERT_API_KEY}`,
            'Content-Type': 'application/json', // This header is important for the jobs endpoint
          },
          body: JSON.stringify({
            "tasks": {
              "upload": {
                "operation": "import/upload"
              },
              "convert": {
                "operation": "convert",
                "input": "upload",
                "output_format": "pdf",
                "filename": filename.replace(/\.xlsx?$/, '.pdf')
              },
              "export": {
                "operation": "export/url",
                "input": "convert"
              }
            }
          })
        });

        if (!uploadRes.ok) {
          const errorText = await uploadRes.text();
          console.error("CloudConvert Job Creation Failed:", uploadRes.status, errorText);
          throw new Error(`CloudConvert job creation failed: ${uploadRes.status} - ${errorText}`);
        }

        const jobData = await uploadRes.json();
        const jobId = jobData.data.id;
        const uploadUrl = jobData.data.tasks[0].result.form.url;
        const uploadFields = jobData.data.tasks[0].result.form.parameters;

        // Upload the file itself
        const fileUploadFormData = new FormData();
        for (const key in uploadFields) {
          fileUploadFormData.append(key, uploadFields[key]);
        }
        fileUploadFormData.append('file', file);

        const directUploadRes = await fetch(uploadUrl, {
          method: 'POST',
          body: fileUploadFormData,
        });

        if (!directUploadRes.ok) {
          const errorText = await directUploadRes.text();
          console.error("CloudConvert File Upload Failed:", directUploadRes.status, errorText);
          throw new Error(`CloudConvert file upload failed: ${directUploadRes.status} - ${errorText}`);
        }
        console.log("File uploaded to CloudConvert successfully.");

        // Step 2: Poll for job completion
        let jobStatus = jobData.data.status;
        let exportUrl: string | undefined;
        let retries = 0;
        const MAX_RETRIES = 30; // Max 30 retries, ~5 minutes with 10s delay

        while (jobStatus !== 'finished' && jobStatus !== 'error' && retries < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
          const statusRes = await fetch(`https://api.cloudconvert.com/v2/jobs/${jobId}`, {
            headers: {
              'Authorization': `Bearer ${CLOUDCONVERT_API_KEY}`
            }
          });
          const statusData = await statusRes.json();
          jobStatus = statusData.data.status;
          console.log(`CloudConvert Job Status: ${jobStatus}`);

          if (jobStatus === 'finished') {
            const exportTask = statusData.data.tasks.find((task: any) => task.operation === 'export/url');
            if (exportTask && exportTask.result && exportTask.result.files && exportTask.result.files.length > 0) {
              exportUrl = exportTask.result.files[0].url;
            } else {
              throw new Error("CloudConvert export URL not found.");
            }
          } else if (jobStatus === 'error') {
            const errorDetails = statusData.data.tasks.find((task: any) => task.status === 'error')?.code || 'Unknown error';
            throw new Error(`CloudConvert conversion failed: ${errorDetails}`);
          }
          retries++;
        }

        if (!exportUrl) {
          throw new Error("CloudConvert job did not finish or export URL not found within timeout.");
        }

        // Step 3: Download the converted PDF
        const pdfRes = await fetch(exportUrl);
        if (!pdfRes.ok) {
          throw new Error(`Failed to download converted PDF from CloudConvert: ${pdfRes.status}`);
        }
        pdfBuffer = Buffer.from(await pdfRes.arrayBuffer());
        filename = filename.replace(/\.xlsx?$/, '.pdf'); // Ensure .pdf extension
        console.log("Excel converted to PDF successfully via CloudConvert.");

      } catch (cloudConvertError: unknown) {
        if (cloudConvertError instanceof Error) {
          console.error("❌ CloudConvert Conversion Error:", cloudConvertError.message);
          return NextResponse.json({ error: "Failed to convert Excel to PDF via CloudConvert: " + cloudConvertError.message }, { status: 500 });
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
            <p>This converter currently supports HTML, images, DOCX, XLSX (via CloudConvert), and direct PDF upload. For other types, dedicated parsing is required.</p>
            <p>Original file type: ${file.type}</p>
          </body>
        </html>
      `;
      filename = filename + '.pdf';
    }

    // If pdfBuffer is already set (e.g., for direct PDF upload or CloudConvert), use it
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
