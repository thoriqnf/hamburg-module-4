import Link from "next/link";

export default function RecipesHomePage() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-600 mb-4">
            🍳 Recipe App Demo
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Learn Next.js rendering strategies with a recipe app
          </p>
          <div className="bg-orange-800 text-white px-4 py-2 rounded-lg inline-block">
            <strong>SSR - Server-Side Rendering</strong>
          </div>
        </div>

        {/* Recipe of the Day Placeholder */}
        <div className="bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Recipe of the Day</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-700 rounded-lg h-48 flex items-center justify-center">
              <span className="text-gray-400">Recipe Image Placeholder</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Delicious Recipe Name</h3>
              <p className="text-gray-300 mb-4">
                This will show a random recipe fetched on every request using SSR.
                Fresh content every time you visit!
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>⏱️ 30 mins</span>
                <span>👥 4 servings</span>
                <span>⭐ 4.5 rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/recipes/list">
            <div className="bg-green-800 hover:bg-green-900 p-6 rounded-lg transition-all transform hover:scale-105 cursor-pointer">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-xl font-bold text-white mb-2">All Recipes</h3>
              <p className="text-green-200 text-sm">Browse recipe collection (ISR)</p>
            </div>
          </Link>

          <Link href="/recipes/about">
            <div className="bg-purple-800 hover:bg-purple-900 p-6 rounded-lg transition-all transform hover:scale-105 cursor-pointer">
              <div className="text-3xl mb-3">📖</div>
              <h3 className="text-xl font-bold text-white mb-2">About</h3>
              <p className="text-purple-200 text-sm">Learn about our app (SSG)</p>
            </div>
          </Link>

          <Link href="/recipes/favorites">
            <div className="bg-pink-800 hover:bg-pink-900 p-6 rounded-lg transition-all transform hover:scale-105 cursor-pointer">
              <div className="text-3xl mb-3">❤️</div>
              <h3 className="text-xl font-bold text-white mb-2">Favorites</h3>
              <p className="text-pink-200 text-sm">Your saved recipes (CSR)</p>
            </div>
          </Link>

          <Link href="/recipes/1">
            <div className="bg-blue-800 hover:bg-blue-900 p-6 rounded-lg transition-all transform hover:scale-105 cursor-pointer">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">Sample Recipe</h3>
              <p className="text-blue-200 text-sm">View recipe details (SSR)</p>
            </div>
          </Link>
        </div>

        {/* Rendering Strategy Info */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-white mb-4">🎯 Rendering Strategies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <strong className="text-orange-600">SSR:</strong> Server-Side Rendering - Fresh data every request
            </div>
            <div>
              <strong className="text-green-600">ISR:</strong> Incremental Static Regeneration - Fast pages with periodic updates
            </div>
            <div>
              <strong className="text-purple-600">SSG:</strong> Static Site Generation - Built once, super fast
            </div>
            <div>
              <strong className="text-pink-600">CSR:</strong> Client-Side Rendering - Interactive, browser-driven
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}