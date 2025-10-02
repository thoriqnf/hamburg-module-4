import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-white mb-6">
          Product CRUD Demo
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Learn Next.js, TypeScript, and React Hook Form by building a complete product management system
        </p>

        <div className="space-y-4">
          <Link
            href="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            View Products Demo
          </Link>

          <div className="text-gray-400">
            <p className="mb-2">📝 Complete 22 TODOs to build a full CRUD application</p>
            <p className="text-sm">• Next.js App Router • TypeScript • Tailwind CSS • DummyJSON API</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-white font-semibold mb-2">🎯 Learning Goals</h3>
            <p className="text-gray-400 text-sm">
              Master Next.js routing, TypeScript types, and form validation
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-white font-semibold mb-2">🛠 Technologies</h3>
            <p className="text-gray-400 text-sm">
              Next.js 15, React Hook Form, Tailwind CSS, DummyJSON API
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-white font-semibold mb-2">⏱ Time Estimate</h3>
            <p className="text-gray-400 text-sm">
              Complete in ~2 hours with step-by-step guidance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
