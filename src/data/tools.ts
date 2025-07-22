import CompressPDFPage from '@/components/CompressPDFPage';
const tools = [
  {
    name: 'Merge PDF',
    slug: 'merge-pdf',
    description: 'Combine multiple PDF files into one.',
    // component: MergePDFPage, // Fash t'créer l'component dyal Merge, zidou hna
  },
  {
    name: 'Split PDF',
    slug: 'split-pdf',
    description: 'Split a PDF file into individual pages.',
    // component: SplitPDFPage, // Fash t'créer l'component dyal Split, zidou hna
  },
  {
    name: 'Compress PDF',
    slug: 'compress-pdf',
    description: 'Reduce the file size of your PDF.',
    component: CompressPDFPage, // <--- Hada howa l'Haja l'jdida li zedna!
  },
  {
    name: 'Convert to PDF',
    slug: 'convert-to-pdf',
    description: 'Convert various file formats (e.g. DOCX, JPG) to PDF.',
    // component: ConvertToPDFPage, // Fash t'créer l'component dyal Convert, zidou hna
  },
];

export default tools;