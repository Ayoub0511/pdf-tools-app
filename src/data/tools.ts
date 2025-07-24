import React from 'react';

// Define the structure for a Tool
export interface Tool {
  name: string;
  slug: string;
  description: string;
  component?: React.ComponentType<any>; // component is optional, but needed for rendering
}

// Import all the PDF tool components
// Make sure these paths are correct based on your project structure
import CompressPDFPage from '@/app/tools/compress-pdf/page';
import MergePDFPage from '@/app/tools/merge-pdf/page'; // Uncommented
import SplitPDFPage from '@/app/tools/split-pdf/page'; // Uncommented
import ConvertToPDFPage from '@/app/tools/convert-to-pdf/page'; // Uncommented


const tools: Tool[] = [
  {
    name: 'Merge PDF',
    slug: 'merge-pdf',
    description: 'Combine multiple PDF files into one.',
    component: MergePDFPage, // Uncommented and assigned
  },
  {
    name: 'Split PDF',
    slug: 'split-pdf',
    description: 'Split a PDF file into individual pages.',
    component: SplitPDFPage, // Uncommented and assigned
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
    component: ConvertToPDFPage, // Uncommented and assigned
  },
];

export default tools;
