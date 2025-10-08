import Link from "next/link";

export default function RecipeNavigation() {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/recipes" className="flex items-center space-x-2">
            <span className="text-2xl">🍳</span>
            <span className="text-white font-bold text-lg">RecipeHub</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/recipes"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/recipes/list"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              All Recipes
            </Link>
            <Link
              href="/recipes/about"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/recipes/favorites"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              Favorites
            </Link>
          </div>

          {/* Back to Main Site */}
          <Link
            href="/"
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            ← Main Site
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/recipes"
              className="px-3 py-2 rounded-md text-xs font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/recipes/list"
              className="px-3 py-2 rounded-md text-xs font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              All Recipes
            </Link>
            <Link
              href="/recipes/about"
              className="px-3 py-2 rounded-md text-xs font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/recipes/favorites"
              className="px-3 py-2 rounded-md text-xs font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}