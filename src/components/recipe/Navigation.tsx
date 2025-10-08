'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RecipeNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

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
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/recipes")
                  ? "bg-orange-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/recipes/list"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/recipes/list")
                  ? "bg-green-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              All Recipes
            </Link>
            <Link
              href="/recipes/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/recipes/about")
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              About
            </Link>
            <Link
              href="/recipes/favorites"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/recipes/favorites")
                  ? "bg-pink-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
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
              className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                isActive("/recipes")
                  ? "bg-orange-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/recipes/list"
              className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                isActive("/recipes/list")
                  ? "bg-green-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              All Recipes
            </Link>
            <Link
              href="/recipes/about"
              className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                isActive("/recipes/about")
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              About
            </Link>
            <Link
              href="/recipes/favorites"
              className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                isActive("/recipes/favorites")
                  ? "bg-pink-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}