import PDFDocument from 'pdfkit';
import fs from 'fs';

export default function handler(req, res) {
  // A7sen haja diriha hiya t7amel l-image men l-request, walakin daba ghankhadmou b-wa7ed l-image moujoud.
  // Dir l-chemin l-s7i7 dial l-image dialk hna.
  const imagePath = './public/image.png'; // L-image dialk khas tkoun f-dossier "public"

  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ error: 'Image not found!' });
  }

  // Khlaq un document PDF
  const doc = new PDFDocument();

  // 7ded l-header dial l-response
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="converted.pdf"');

  // Pipe the PDF document to the response
  doc.pipe(res);

  // Zid l-image f-PDF
  doc.image(imagePath, {
    fit: [doc.page.width, doc.page.height], // Hta l-image tkoun qad l-page
    align: 'center',
    valign: 'center'
  });

  // Salina, dima khassk dir .end()
  doc.end();
}