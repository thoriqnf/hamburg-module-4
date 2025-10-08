import { Recipe, RecipeDetailProps } from "@/types/recipe";
import FavoriteButton from "./FavoriteButton";

export default function RecipeDetail({
  recipe,
  strategy = "SSR",
  strategyColor = "bg-blue-800"
}: RecipeDetailProps) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header with Strategy Badge */}
      <div className="flex items-center justify-between mb-6">
        <div className={`${strategyColor} px-4 py-2 rounded-full text-white font-semibold`}>
          {strategy}
        </div>
        <FavoriteButton recipeId={recipe.id} />
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {/* Recipe Image */}
        <div className="h-64 bg-gray-700 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400 text-xl">Recipe Image Placeholder</span>
          </div>
        </div>

        {/* Recipe Info */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-white mb-4">{recipe.name}</h1>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-300">
            <div className="flex items-center space-x-1">
              <span>⭐</span>
              <span>{recipe.rating}</span>
              <span className="text-gray-400">({recipe.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>⏱️</span>
              <span>{totalTime} mins</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>👥</span>
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>📊</span>
              <span>{recipe.difficulty}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>🍽️</span>
              <span>{recipe.cuisine}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>🔥</span>
              <span>{recipe.caloriesPerServing} cal/serving</span>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ingredients */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h2 className="text-xl font-bold text-white mb-4">🥘 Ingredients</h2>
              <ul className="space-y-2 text-gray-300">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h2 className="text-xl font-bold text-white mb-4">👨‍🍳 Instructions</h2>
              <ol className="space-y-3 text-gray-300">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 font-bold mr-3 min-w-6">
                      {index + 1}.
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl mb-1">⏱️</div>
              <div className="text-white font-semibold">Prep Time</div>
              <div className="text-gray-300">{recipe.prepTimeMinutes} minutes</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl mb-1">🔥</div>
              <div className="text-white font-semibold">Cook Time</div>
              <div className="text-gray-300">{recipe.cookTimeMinutes} minutes</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl mb-1">🍽️</div>
              <div className="text-white font-semibold">Meal Type</div>
              <div className="text-gray-300">{recipe.mealType.join(", ")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}