import { notFound } from 'next/navigation';
import tools from '@/data/tools';

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export default async function ToolPage({ params }: { params: { slug: string } }) { // async hna
  const tool = tools.find((t) => t.slug === params.slug);

  if (!tool) {
    return notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{tool.name}</h1>
      <p className="text-gray-600 mt-2">{tool.description}</p>
    </div>
  );
}