import tools from '@/data/tools';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">PDF Tools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="block p-4 bg-white shadow rounded-lg hover:bg-gray-100 transition"
          >
            <h2 className="text-xl font-semibold">{tool.name}</h2>
            <p className="text-gray-600">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
