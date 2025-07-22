import CompressPDFPage from '@/app/tools/compress-pdf/page';
const tools = [
  {
    name: 'Merge PDF',
    slug: 'merge-pdf',
    description: 'Combine multiple PDF files into one.',
    // component: MergePDFPage,
  },
  {
    name: 'Split PDF',
    slug: 'split-pdf',
    description: 'Split a PDF file into individual pages.',
    // component: SplitPDFPage,
  }, 
  {
    name: 'Compress PDF',
    slug: 'compress-pdf',
    description: 'Reduce the file size of your PDF.',
    component: CompressPDFPage, 
  },
  {
    name: 'Convert to PDF',
    slug: 'convert-to-pdf',
    description: 'Convert various file formats (e.g. DOCX, JPG) to PDF.',
    // component: ConvertToPDFPage,
  },
];

export default tools;