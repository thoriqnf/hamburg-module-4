import RecipeCard from "@/components/recipe/RecipeCard";
import Navigation from "@/components/recipe/Navigation";

// Fetch all recipes for ISR with 30-second revalidation
export const revalidate = 30;

async function getAllRecipes() {
  try {
    const res = await fetch('https://dummyjson.com/recipes');
    if (!res.ok) throw new Error('Failed to fetch recipes');
    const data = await res.json();
    return data.recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

export default async function RecipesListPage() {
  const recipes = await getAllRecipes();
  const timestamp = new Date().toLocaleString();

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
              onChange={(e) => {
                const params = new URLSearchParams(window.location.search);
                if (e.target.value) {
                  params.set('search', e.target.value);
                } else {
                  params.delete('search');
                }
                window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
              }}
            />
            <select
              className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              onChange={(e) => {
                const params = new URLSearchParams(window.location.search);
                if (e.target.value) {
                  params.set('cuisine', e.target.value);
                } else {
                  params.delete('cuisine');
                }
                window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
              }}
            >
              <option value="">All Cuisines</option>
              <option value="italian">Italian</option>
              <option value="american">American</option>
              <option value="asian">Asian</option>
              <option value="mexican">Mexican</option>
            </select>
            <select
              className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              onChange={(e) => {
                const params = new URLSearchParams(window.location.search);
                if (e.target.value) {
                  params.set('difficulty', e.target.value);
                } else {
                  params.delete('difficulty');
                }
                window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
              }}
            >
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              strategy="ISR"
              strategyColor="bg-green-800"
            />
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
              Page generated at: {timestamp}
            </p>
            <p className="text-yellow-600 font-mono text-sm mt-1">
              💡 This page auto-refreshes every 30 seconds with new content!
            </p>
            <p className="text-blue-600 font-mono text-sm mt-1">
              🔄 ISR in action - check back in 30 seconds to see updates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}