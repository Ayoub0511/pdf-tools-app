// src/app/api/convert-eml/route.ts
import { NextResponse } from 'next/server';
import * as mailparser from 'mailparser';
import type { AddressObject } from 'mailparser';

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
      console.error('No EML file provided.');
      return NextResponse.json({ error: 'No EML file provided.' }, { status: 400 });
    }

    // Convert the file to a buffer for mailparser
    const fileBuffer = await (file as Blob).arrayBuffer();
    const emailBuffer = Buffer.from(fileBuffer);

    // Use simpleParser to get the email data
    const parsedEmail = await mailparser.simpleParser(emailBuffer);

    // Helper function to handle both single address and array of addresses
    const getAddressText = (address: string | AddressObject | AddressObject[] | undefined) => {
      if (!address) {
        return '';
      }
      if (Array.isArray(address)) {
        return address.map(addr => addr.text).join(', ');
      }
      if (typeof address === 'object') {
        return address.text || '';
      }
      return address;
    };

    // We send back only the data needed to create the PDF on the client
    const emailData = {
      subject: parsedEmail.subject || '',
      from: getAddressText(parsedEmail.from),
      to: getAddressText(parsedEmail.to),
      date: parsedEmail.date?.toISOString() || '',
      html: parsedEmail.html || '',
      text: parsedEmail.text || '',
    };
    
    console.log('Successfully parsed EML file:', emailData.subject);

    return NextResponse.json(emailData, { status: 200 });

  } catch (error) {
    console.error('Error processing EML file:', error);
    // Return a more descriptive error message to the client
    return NextResponse.json({ error: 'Failed to process EML file. Please ensure the file is a valid .eml file.' }, { status: 500 });
  }
}
