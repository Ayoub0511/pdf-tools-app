import { FaFilePdf, FaFileArchive, FaCompress, FaTools, FaTimes, FaExchangeAlt } from 'react-icons/fa';

// Array of all available tools
const tools = [
  {
    title: 'دمج PDF',
    description: 'دمج عدة ملفات PDF في ملف واحد.',
    icon: <FaTimes />,
    link: '/tools/merge-pdf',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800'
  },
  {
    title: 'تقسيم PDF',
    description: 'تقسيم ملف PDF إلى عدة صفحات فردية.',
    icon: <FaTimes />,
    link: '/tools/split-pdf',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800'
  },
  {
    title: 'ضغط PDF',
    description: 'تقليل حجم ملف PDF.',
    icon: <FaCompress />,
    link: '/tools/compress-pdf',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800'
  },
  {
    title: 'تحويل إلى PDF',
    description: 'تحويل صيغ مختلفة (مثل DOCX, JPG) إلى PDF.',
    icon: <FaFilePdf />,
    link: '/tools/convert-files-to-pdf',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800'
  },
  {
    title: 'تحويل الصور إلى PDF',
    description: 'تحويل عدة صور إلى ملف PDF واحد.',
    icon: <FaFilePdf />,
    link: '/tools/convert-images-to-pdf',
    bgColor: 'bg-gray-200',
    textColor: 'text-gray-800'
  },
  {
    title: 'تحويل EML إلى PDF',
    description: 'تحويل ملفات البريد الإلكتروني (.eml) إلى PDF.',
    icon: <FaFileArchive />,
    link: '/tools/convert-eml-to-pdf',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-12">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          أدوات PDF
        </h1>
        <p className="text-xl text-gray-600">
          مجموعتك الشاملة من الأدوات عبر الإنترنت لجميع احتياجات PDF الخاصة بك.
        </p>
      </header>

      <section className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.link} href={tool.link}>
              <div
                className={`flex flex-col items-start p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 ${tool.bgColor} cursor-pointer`}
              >
                <div className={`p-4 rounded-full ${tool.bgColor.replace('100', '300')} mb-4`}>
                  {React.cloneElement(tool.icon, { className: `${tool.textColor.replace('800', '600')} text-2xl` })}
                </div>
                <h3 className={`text-2xl font-bold ${tool.textColor} mb-2`}>{tool.title}</h3>
                <p className={`text-lg ${tool.textColor.replace('800', '600')}`}>{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          أحدث المقالات
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Article 1 */}
          <Link href="#">
            <div className="p-6 rounded-2xl shadow-lg bg-blue-100 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <h4 className="text-lg font-bold text-blue-800 mb-2">كيفية دمج ملفات PDF بسهولة باستخدام PDF361</h4>
              <p className="text-sm text-blue-600">تعلم كيفية دمج عدة ملفات PDF في مستند واحد بسرعة وسهولة باستخدام أداة PDF361 عبر الإنترنت.</p>
            </div>
          </Link>
          {/* Article 2 */}
          <Link href="#">
            <div className="p-6 rounded-2xl shadow-lg bg-green-100 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <h4 className="text-lg font-bold text-green-800 mb-2">كيفية تقسيم ملفات PDF بسهولة باستخدام PDF361</h4>
              <p className="text-sm text-green-600">تعلم كيفية تقسيم ملف PDF واحد إلى مستندات فردية أو استخراج صفحات معينة باستخدام أداة PDF361 عبر الإنترنت.</p>
            </div>
          </Link>
          {/* Article 3 */}
          <Link href="#">
            <div className="p-6 rounded-2xl shadow-lg bg-red-100 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <h4 className="text-lg font-bold text-red-800 mb-2">كيفية ضغط ملفات PDF بسهولة باستخدام PDF361</h4>
              <p className="text-sm text-red-600">تعلم كيفية تقليل حجم ملف PDF الخاص بك دون المساومة على الجودة باستخدام أداة ضغط PDF361 عبر الإنترنت.</p>
            </div>
          </Link>
          {/* Article 4 */}
          <Link href="#">
            <div className="p-6 rounded-2xl shadow-lg bg-orange-100 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <h4 className="text-lg font-bold text-orange-800 mb-2">كيفية تحويل الملفات بسهولة باستخدام PDF361</h4>
              <p className="text-sm text-orange-600">تعلم كيفية تحويل تنسيقات ملفات مختلفة مثل Word وExcel وPowerPoint والصور إلى PDF باستخدام أداة التحويل PDF361.</p>
            </div>
          </Link>
        </div>
      </section>

      <div className="text-center">
        <button className="bg-white text-gray-800 font-semibold py-3 px-8 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300">
          عرض جميع المقالات
        </button>
      </div>
    </div>
  );
}
