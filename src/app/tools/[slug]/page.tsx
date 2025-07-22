import { notFound } from 'next/navigation';
import tools from '@/data/tools';

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = tools.find((t) => t.slug === params.slug);

  if (!tool) {
    return notFound(); // رجع القيمة ديال notFound() باش يتوقف rendering
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{tool.name}</h1>
      <p className="text-gray-600 mt-2">{tool.description}</p>
    </div>
  );
}
