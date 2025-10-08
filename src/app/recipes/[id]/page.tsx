import RecipeDetail from "@/components/recipe/RecipeDetail";
import Navigation from "@/components/recipe/Navigation";
import { notFound } from "next/navigation";

// Mock data for starter version - in real app this would be fetched
const mockRecipe = {
  id: 1,
  name: "Classic Spaghetti Carbonara",
  ingredients: [
    "400g Spaghetti",
    "200g Pancetta or Guanciale",
    "4 Large Eggs",
    "100g Pecorino Romano Cheese",
    "Black Pepper",
    "Salt"
  ],
  instructions: [
    "Bring a large pot of salted water to boil and cook spaghetti according to package directions.",
    "While pasta cooks, cut pancetta into small cubes and fry in a large pan until crispy.",
    "In a bowl, whisk eggs with grated Pecorino cheese and plenty of black pepper.",
    "Drain pasta, reserving 1 cup pasta water. Add hot pasta to the pan with pancetta.",
    "Remove from heat and quickly stir in egg mixture, adding pasta water as needed to create creamy sauce.",
    "Serve immediately with extra cheese and black pepper."
  ],
  prepTimeMinutes: 10,
  cookTimeMinutes: 15,
  servings: 4,
  difficulty: "Easy",
  cuisine: "Italian",
  caloriesPerServing: 380,
  tags: ["pasta", "quick", "italian", "dinner", "traditional"],
  userId: 1,
  image: "",
  rating: 4.5,
  reviewCount: 234,
  mealType: ["dinner"]
};

// Mock function to check if recipe exists
async function getRecipe(id: string) {
  // In starter version, we'll just return the mock recipe for ID "1"
  if (id === "1") {
    return mockRecipe;
  }
  return null;
}

export default async function RecipeDetailPage({ params }: { params: { id: string } }) {
  const recipe = await getRecipe(params.id);

  if (!recipe) {
    notFound();
  }

  const timestamp = new Date().toLocaleString();

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-800 text-white px-4 py-2 rounded-lg inline-block mb-4">
            <strong>SSR - Server-Side Rendering</strong>
          </div>
          <p className="text-gray-400">
            Fresh data fetched on every request • Server time: {timestamp}
          </p>
        </div>

        {/* Recipe Detail Component */}
        <RecipeDetail
          recipe={recipe}
          strategy="SSR"
          strategyColor="bg-blue-800"
        />

        {/* Related Recipes */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Related Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4">
                <div className="bg-gray-700 h-32 rounded mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Recipe Image</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Related Recipe {i}
                </h3>
                <p className="text-gray-300 text-sm">
                  Another delicious Italian pasta dish you might enjoy.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Reviews & Ratings</h2>
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                  <span className="text-white font-semibold">John D.</span>
                </div>
                <span className="text-gray-400 text-sm">2 days ago</span>
              </div>
              <p className="text-gray-300">
                Amazing recipe! Just like my grandmother used to make. The key is using quality pancetta!
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400">⭐⭐⭐⭐</span>
                  <span className="text-white font-semibold">Maria S.</span>
                </div>
                <span className="text-gray-400 text-sm">1 week ago</span>
              </div>
              <p className="text-gray-300">
                Very tasty! I added a little garlic for extra flavor. Perfect for weeknight dinner.
              </p>
            </div>
          </div>

          {/* Add Review Button */}
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Write a Review
          </button>
        </div>

        {/* SSR Info */}
        <div className="mt-12 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-white mb-4">🔄 How SSR Works Here</h3>
          <div className="space-y-3 text-gray-300">
            <p>
              <strong className="text-blue-600">🔄 Fresh Data:</strong> This page is generated on the server for every request
            </p>
            <p>
              <strong className="text-blue-600">👤 User-Specific:</strong> Perfect for personalized content like reviews and ratings
            </p>
            <p>
              <strong className="text-blue-600">🔍 SEO Friendly:</strong> Search engines can crawl the fully rendered page
            </p>
            <p>
              <strong className="text-blue-600">⚡ Fast First Load:</strong> User receives complete HTML with no client-side rendering needed
            </p>
          </div>
          <div className="mt-4 p-4 bg-gray-900 rounded-lg">
            <p className="text-blue-600 font-mono text-sm">
              <strong>Server rendered at:</strong> {timestamp}
            </p>
            <p className="text-yellow-600 font-mono text-sm mt-1">
              💡 Refresh this page to see the timestamp change
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}