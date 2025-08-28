import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import simpleParser from 'mailparser';

// This function takes an AddressObject or an array of them and returns a string.
// Had l'function kat'akhed wahd l'AddressObject ola wa7ed l'array w'kat'rjja3 liha wahd l'string.
function formatAddressList(addressList) {
  if (!addressList) return 'N/A';
  if (Array.isArray(addressList)) {
    return addressList.map(addr => addr.text || 'N/A').join(', ');
  }
  return addressList.text || 'N/A';
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const emlFile = formData.get('emlFile');

    if (!emlFile) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await emlFile.arrayBuffer());
    const parsed = await simpleParser.simpleParser(buffer);

    const emailData = {
      from: formatAddressList(parsed.from?.value),
      to: formatAddressList(parsed.to?.value),
      subject: parsed.subject || 'N/A',
      date: parsed.date ? parsed.date.toISOString() : 'N/A',
      html: parsed.html || null,
      text: parsed.text || null,
    };

    return NextResponse.json(emailData);
  } catch (error) {
    console.error('Error parsing EML file:', error);
    return NextResponse.json({ error: 'Failed to process EML file.' }, { status: 500 });
  }
}
