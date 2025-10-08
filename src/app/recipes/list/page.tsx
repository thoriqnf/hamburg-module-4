import RecipeCard from "@/components/recipe/RecipeCard";
import Navigation from "@/components/recipe/Navigation";

// Simple placeholder data for starter version
const placeholderRecipes = [
  { id: 1, name: "Recipe Placeholder 1", cuisine: "Italian", difficulty: "Easy", rating: 4.5, reviewCount: 100 },
  { id: 2, name: "Recipe Placeholder 2", cuisine: "American", difficulty: "Medium", rating: 4.2, reviewCount: 50 },
  { id: 3, name: "Recipe Placeholder 3", cuisine: "Asian", difficulty: "Easy", rating: 4.7, reviewCount: 75 },
  { id: 4, name: "Recipe Placeholder 4", cuisine: "Mexican", difficulty: "Easy", rating: 4.6, reviewCount: 120 },
  { id: 5, name: "Recipe Placeholder 5", cuisine: "French", difficulty: "Hard", rating: 4.8, reviewCount: 200 },
  { id: 6, name: "Recipe Placeholder 6", cuisine: "Mediterranean", difficulty: "Medium", rating: 4.3, reviewCount: 80 }
];

export default function RecipesListPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            📚 All Recipes
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Browse our complete recipe collection
          </p>
          <div className="bg-green-800 text-white px-4 py-2 rounded-lg inline-block">
            <strong>ISR - Incremental Static Regeneration</strong>
          </div>
          <p className="text-gray-400 mt-2 text-sm">
            This page updates every 30 seconds with new content
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search recipes..."
              className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <select className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600">
              <option value="">All Cuisines</option>
              <option value="italian">Italian</option>
              <option value="american">American</option>
              <option value="asian">Asian</option>
              <option value="mexican">Mexican</option>
            </select>
            <select className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600">
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {placeholderRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="bg-green-800 px-3 py-1 text-white text-sm font-semibold">
                ISR
              </div>
              <div className="h-48 bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">Recipe Image</span>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">{recipe.name}</h3>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{recipe.cuisine}</span>
                  <span>⭐ {recipe.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
            ← Previous
          </button>
          <span className="text-gray-300 px-4">Page 1 of 10</span>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
            Next →
          </button>
        </div>

        {/* ISR Info */}
        <div className="mt-12 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-white mb-4">🔄 How ISR Works Here</h3>
          <div className="space-y-3 text-gray-300">
            <p>
              <strong className="text-green-600">⚡ Fast Loading:</strong> Pages are pre-built and cached for instant delivery
            </p>
            <p>
              <strong className="text-green-600">🔄 Auto Updates:</strong> New recipes appear every 30 seconds without rebuild
            </p>
            <p>
              <strong className="text-green-600">📈 SEO Friendly:</strong> Search engines can crawl the static content
            </p>
            <p>
              <strong className="text-green-600">🌍 Global CDN:</strong> Content is distributed globally for fast access
            </p>
          </div>
          <div className="mt-4 p-4 bg-gray-900 rounded-lg">
            <p className="text-green-600 font-mono text-sm">
              Last updated: {new Date().toLocaleString()}
            </p>
            <p className="text-yellow-600 font-mono text-sm mt-1">
              💡 This page will refresh with new content automatically
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}