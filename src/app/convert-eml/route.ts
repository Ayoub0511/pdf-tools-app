import { NextResponse } from 'next/server';
import * as mailparser from 'mailparser';

/**
 * Handles POST requests to convert an EML file to structured JSON data.
 * This function runs only on the server, allowing the use of Node.js-specific modules like `mailparser`.
 * @param request The incoming request containing the EML file.
 * @returns A JSON response with the parsed email data or an error message.
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('emlFile');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No EML file provided.' }, { status: 400 });
    }

    const fileBuffer = await (file as Blob).arrayBuffer();
    const parsedEmail = await mailparser.simpleParser(Buffer.from(fileBuffer));

    // We send back only the data needed to create the PDF on the client
    const emailData = {
      subject: parsedEmail.subject,
      from: parsedEmail.from?.text || '',
      to: Array.isArray(parsedEmail.to) ? parsedEmail.to.map(t => t.text).join(', ') : parsedEmail.to?.text || '',
      date: parsedEmail.date?.toISOString() || '',
      html: parsedEmail.html || '',
      text: parsedEmail.text || '',
    };

    return NextResponse.json(emailData, { status: 200 });
  } catch (error) {
    console.error('Error processing EML file:', error);
    return NextResponse.json({ error: 'Failed to process EML file.' }, { status: 500 });
  }
}
