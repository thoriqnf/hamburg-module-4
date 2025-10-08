'use client';

import { useState, useEffect } from "react";
import RecipeCard from "@/components/recipe/RecipeCard";
import Navigation from "@/components/recipe/Navigation";
import { Recipe } from "@/types/recipe";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);

  // Load favorites from localStorage and fetch recipe data
  useEffect(() => {
    const loadFavoritesAndRecipes = async () => {
      try {
        // Load favorite IDs from localStorage
        const savedFavorites = JSON.parse(localStorage.getItem('recipeFavorites') || '[]');
        setFavorites(savedFavorites);

        // Fetch all recipes from API
        const res = await fetch('https://dummyjson.com/recipes');
        const data = await res.json();
        const recipes = data.recipes || [];
        setAllRecipes(recipes);

        // Filter recipes to show only favorited ones
        const favorited = recipes.filter(recipe => savedFavorites.includes(recipe.id));
        setFavoriteRecipes(favorited);
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavoritesAndRecipes();
  }, []);

  // Filter recipes based on search term
  const filteredRecipes = favoriteRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleToggleFavorite = (recipeId: number, isFavorited: boolean) => {
    if (isFavorited) {
      setFavorites(prev => {
        const newFavorites = [...prev, recipeId];
        const recipe = allRecipes.find(r => r.id === recipeId);
        if (recipe && !favoriteRecipes.find(r => r.id === recipeId)) {
          setFavoriteRecipes(prev => [...prev, recipe]);
        }
        // Update localStorage
        localStorage.setItem('recipeFavorites', JSON.stringify(newFavorites));
        return newFavorites;
      });
    } else {
      setFavorites(prev => {
        const newFavorites = prev.filter(id => id !== recipeId);
        setFavoriteRecipes(prev => prev.filter(r => r.id !== recipeId));
        // Update localStorage
        localStorage.setItem('recipeFavorites', JSON.stringify(newFavorites));
        return newFavorites;
      });
    }
  };

  const clientTime = new Date().toLocaleString();

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

        {/* Search Bar */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <input
            type="text"
            placeholder="Search your favorite recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-pink-500">{favorites.length}</div>
            <div className="text-gray-300">Total Favorites</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-500">
              {favoriteRecipes.filter(r => r.difficulty === "Easy").length}
            </div>
            <div className="text-gray-300">Easy Recipes</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">
              {Math.round(favoriteRecipes.reduce((acc, r) => acc + r.caloriesPerServing, 0) / favoriteRecipes.length) || 0}
            </div>
            <div className="text-gray-300">Avg Calories</div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
            <p className="text-gray-300 mt-4">Loading your favorites...</p>
          </div>
        )}

        {/* Recipe Grid or Empty State */}
        {!isLoading && (
          <>
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    strategy="CSR"
                    strategyColor="bg-pink-800"
                  />
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-12 text-center mb-8">
                <div className="text-6xl mb-4">🍽️</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {searchTerm ? "No matching favorites found" : "No favorites yet"}
                </h3>
                <p className="text-gray-300 mb-6">
                  {searchTerm
                    ? "Try searching with different keywords or browse all recipes to add more favorites."
                    : "Start adding recipes to your favorites to see them here!"
                  }
                </p>
                {!searchTerm && (
                  <a
                    href="/recipes/list"
                    className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    Browse All Recipes →
                  </a>
                )}
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* CSR Info */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-white mb-4">💻 How CSR Works Here</h3>
          <div className="space-y-3 text-gray-300">
            <p>
              <strong className="text-pink-600">🌐 Browser Powered:</strong> All data fetching and state management happens in your browser
            </p>
            <p>
              <strong className="text-pink-600">⚡ Instant Updates:</strong> Changes happen immediately without server round trips
            </p>
            <p>
              <strong className="text-pink-600">💾 Local Storage:</strong> Your favorites are saved locally and persist between sessions
            </p>
            <p>
              <strong className="text-pink-600">🔄 Real-time:</strong> Search and filtering happen instantly as you type
            </p>
            <p>
              <strong className="text-pink-600">🎯 Interactive:</strong> Perfect for user-specific features and dashboards
            </p>
          </div>
          <div className="mt-4 p-4 bg-gray-900 rounded-lg">
            <p className="text-pink-600 font-mono text-sm">
              <strong>Client time:</strong> {clientTime}
            </p>
            <p className="text-green-600 font-mono text-sm mt-1">
              💡 Try adding favorites and see the instant updates!
            </p>
            <p className="text-yellow-600 font-mono text-sm mt-1">
              🔄 Refresh the page - your favorites are saved locally
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}