import { NextResponse } from 'next/server';
import simpleParser, { ParsedMail, AddressObject } from 'mailparser';

// This function now correctly handles a single address object or an array of them.
// Had l'function daba kat'khedem b'sa7a m3a wahd l'AddressObject ola wahd l'array dyalhom.
function formatAddressList(address: AddressObject | AddressObject[] | undefined | null): string {
  if (!address) return 'N/A';
  // Check if it's an array of addresses
  if (Array.isArray(address)) {
    return address.map(addr => addr.text || 'N/A').join(', ');
  }
  // Otherwise, it's a single AddressObject
  return address.text || 'N/A';
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const emlFile = formData.get('emlFile') as Blob | null;

    if (!emlFile) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await emlFile.arrayBuffer());
    const parsed: ParsedMail = await simpleParser.simpleParser(buffer);

    const emailData = {
      // Passing the parsed objects directly to the function
      from: formatAddressList(parsed.from),
      to: formatAddressList(parsed.to),
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
