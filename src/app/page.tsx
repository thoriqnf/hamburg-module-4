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
            href="/login"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg w-full"
          >
            🛡️ Middleware & Auth Demo (NEW!)
          </Link>

          <Link
            href="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg w-full"
          >
            View Products Demo
          </Link>

          <Link
            href="/data-fetching"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg w-full"
          >
            🚀 Learn Data Fetching (SSR, ISR, SSG, CSR)
          </Link>

          <Link
            href="/recipes"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg w-full"
          >
            🍳 Recipe App Demo (SSR, ISR, SSG, CSR)
          </Link>

          <div className="text-gray-400">
            <p className="mb-2">✅ Four complete demos - Pick what you want to learn!</p>
            <p className="text-sm">• Next.js App Router • TypeScript • Tailwind CSS • DummyJSON API • Middleware & Auth</p>
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
            <h3 className="text-white font-semibold mb-2">⏱ Time to Learn</h3>
            <p className="text-gray-400 text-sm">
              Beginner-friendly! Complete CRUD in ~30 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
