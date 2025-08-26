import PDFDocument from 'pdfkit';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const form = formidable();

  try {
    const [fields, files] = await form.parse(req);
    const uploadedFile = files.image[0];

    if (!uploadedFile) {
      return res.status(400).json({ error: 'No image uploaded' });
    }
    
    // 7ded l-header dial l-response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${uploadedFile.originalFilename}.pdf"`);

    // Khlaq un document PDF
    const doc = new PDFDocument();
    doc.pipe(res);

    // Qra l-fichier li jay men l-user b-streams
    const imageStream = fs.createReadStream(uploadedFile.filepath);

    // Zid l-image f-PDF
    doc.image(imageStream, {
        fit: [doc.page.width, doc.page.height],
        align: 'center',
        valign: 'center'
    });

    // Salina, dima khassk dir .end()
    doc.end();

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process the image' });
  }
}