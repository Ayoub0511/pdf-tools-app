import React from 'react';
import ToolPage from "@/components/ToolPage";


interface ToolPageProps {
  params: { slug: string };
}

const ToolDynamicPage: React.FC<ToolPageProps> = ({ params }) => {
  const toolSlug = params.slug;
  
  let title = '';
  let description = '';

  if (toolSlug === 'convert-to-pdf') {
    title = 'Convert to PDF';
    description = 'Convert various file formats (e.g., DOCX, JPG) to PDF.';
  } else if (toolSlug === 'merge-pdf') {
    title = 'Merge PDF';
    description = 'Combine multiple PDF files into one.';
  } else if (toolSlug === 'compress-pdf') {
    title = 'Compress PDF';
    description = 'Reduce the size of your PDF files.';
  }
  
  return (
    <ToolPage title={title} description={description} /> // Beddel "ToolCard" b' "ToolPage"
  );
};

export default ToolDynamicPage;