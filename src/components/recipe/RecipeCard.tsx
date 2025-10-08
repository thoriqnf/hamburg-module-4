import { Recipe, RecipeCardProps } from "@/types/recipe";
import FavoriteButton from "./FavoriteButton";

export default function RecipeCard({
  recipe,
  strategy = "SSR",
  strategyColor = "bg-blue-800"
}: RecipeCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Strategy Badge */}
      <div className={`${strategyColor} px-3 py-1 text-white text-sm font-semibold`}>
        {strategy}
      </div>

      {/* Recipe Image */}
      <div className="relative h-48 bg-gray-700">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-gray-400">Recipe Image</span>
        </div>

        {/* Favorite Button Overlay */}
        <div className="absolute top-2 right-2">
          <FavoriteButton recipeId={recipe.id} />
        </div>
      </div>

      {/* Recipe Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {recipe.name}
        </h3>

        <div className="flex items-center space-x-2 mb-3">
          <span className="text-yellow-400">⭐ {recipe.rating}</span>
          <span className="text-gray-400">({recipe.reviewCount} reviews)</span>
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          Delicious {recipe.cuisine} cuisine recipe that takes {recipe.prepTimeMinutes + recipe.cookTimeMinutes} minutes to prepare.
        </p>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-3">
            <span>⏱️ {recipe.prepTimeMinutes + recipe.cookTimeMinutes}m</span>
            <span>👥 {recipe.servings}</span>
            <span>📊 {recipe.difficulty}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1">
          {recipe.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
          {recipe.tags.length > 3 && (
            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
              +{recipe.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* View Recipe Button */}
      <div className="px-4 pb-4">
        <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg transition-colors">
          View Recipe →
        </button>
      </div>
    </div>
  );
}