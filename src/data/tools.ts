
import React from 'react';


export interface Tool { 
  name: string;
  slug: string;
  description: string;
  component?: React.ComponentType<any>;
}

import CompressPDFPage from '@/app/tools/compress-pdf/page';

// import MergePDFPage from '@/app/tools/merge-pdf/page';
// import SplitPDFPage from '@/app/tools/split-pdf/page';
// import ConvertToPDFPage from '@/app/tools/convert-to-pdf/page';


const tools: Tool[] = [
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
