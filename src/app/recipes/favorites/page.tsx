import RecipeCard from "@/components/recipe/RecipeCard";
import Navigation from "@/components/recipe/Navigation";
import { Recipe } from "@/types/recipe";

// Simple placeholder data for starter version
const placeholderRecipe: Recipe = {
  id: 1,
  name: "Favorite Recipe Placeholder",
  ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
  instructions: ["Step 1", "Step 2", "Step 3"],
  prepTimeMinutes: 15,
  cookTimeMinutes: 20,
  servings: 4,
  difficulty: "Easy",
  cuisine: "Various",
  caloriesPerServing: 350,
  tags: ["placeholder", "demo"],
  userId: 1,
  image: "",
  rating: 4.5,
  reviewCount: 100,
  mealType: ["dinner"]
};

export default function FavoritesPage() {
  const serverTime = new Date().toLocaleString();

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-pink-800 text-white px-4 py-2 rounded-lg inline-block mb-4">
            <strong>CSR - Client-Side Rendering</strong>
          </div>
          <h1 className="text-4xl font-bold text-pink-600 mb-4">
            ❤️ My Favorite Recipes
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Your personal collection of saved recipes
          </p>
          <p className="text-gray-400 text-sm">
            This will be implemented with client-side rendering and local storage
          </p>
        </div>

        {/* Search Bar Placeholder */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <input
            type="text"
            placeholder="Search your favorite recipes..."
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg"
            disabled
          />
        </div>

        {/* Stats Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-pink-500">0</div>
            <div className="text-gray-300">Total Favorites</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-500">0</div>
            <div className="text-gray-300">Easy Recipes</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">0</div>
            <div className="text-gray-300">Avg Calories</div>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-gray-800 rounded-lg p-12 text-center mb-8">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-2xl font-bold text-white mb-2">
            No favorites yet
          </h3>
          <p className="text-gray-300 mb-6">
            Start adding recipes to your favorites to see them here! This page will be implemented with client-side rendering in the finish version.
          </p>
          <a
            href="/recipes/list"
            className="inline-block bg-gray-700 text-gray-400 font-semibold px-6 py-3 rounded-lg cursor-not-allowed"
          >
            Browse All Recipes → (Coming Soon)
          </a>
        </div>

        {/* CSR Info */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-white mb-4">💻 How CSR Will Work Here</h3>
          <div className="space-y-3 text-gray-300">
            <p>
              <strong className="text-pink-600">🌐 Browser Powered:</strong> All data fetching and state management will happen in your browser
            </p>
            <p>
              <strong className="text-pink-600">⚡ Instant Updates:</strong> Changes will happen immediately without server round trips
            </p>
            <p>
              <strong className="text-pink-600">💾 Local Storage:</strong> Your favorites will be saved locally and persist between sessions
            </p>
            <p>
              <strong className="text-pink-600">🔄 Real-time:</strong> Search and filtering will happen instantly as you type
            </p>
            <p>
              <strong className="text-pink-600">🎯 Interactive:</strong> Perfect for user-specific features and dashboards
            </p>
          </div>
          <div className="mt-4 p-4 bg-gray-900 rounded-lg">
            <p className="text-pink-600 font-mono text-sm">
              <strong>Server rendered at:</strong> {serverTime}
            </p>
            <p className="text-gray-400 font-mono text-sm mt-1">
              💡 CSR functionality will be added in the finish version
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}