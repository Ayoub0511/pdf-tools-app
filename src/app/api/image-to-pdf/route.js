import PDFDocument from 'pdfkit';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const uploadedFile = formData.get('image');

    if (!uploadedFile) {
      return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

    const doc = new PDFDocument();
    
    // Zid l-header dyal l-response
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', `attachment; filename="${uploadedFile.name}.pdf"`);

    // Gha ncreer wahed stream bach n7to fiha l-PDF
    const stream = doc.pipe(new require('stream').PassThrough());

    doc.image(fileBuffer, {
      fit: [doc.page.width, doc.page.height],
      align: 'center',
      valign: 'center'
    });

    doc.end();

    // Red l-PDF l-l-user
    return new NextResponse(stream, { headers });

  } catch (error) {
    console.error('Mochkil f-conversion:', error);
    return NextResponse.json({ error: 'Failed to process the image' }, { status: 500 });
  }
}