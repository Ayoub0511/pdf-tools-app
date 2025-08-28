import { NextResponse } from 'next/server';
import simpleParser from 'mailparser';

export async function POST(request) {
  try {
    if (!request.headers.get('content-type')?.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    const formData = await request.formData();
    const emlFile = formData.get('emlFile');

    if (!emlFile) {
      return NextResponse.json({ error: 'No EML file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await emlFile.arrayBuffer());

    const parsed = await simpleParser.simpleParser(buffer);

    const emailData = {
      from: parsed.from?.text || 'N/A',
      to: parsed.to?.text || 'N/A',
      subject: parsed.subject || 'N/A',
      date: parsed.date ? parsed.date.toISOString() : 'N/A',
      html: parsed.html || null,
      text: parsed.text || null,
    };

    return NextResponse.json(emailData);
  } catch (error) {
    console.error('Error parsing EML file:', error);
    return NextResponse.json({ error: 'Failed to parse EML file.' }, { status: 500 });
  }
}