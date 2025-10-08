import Navigation from "@/components/recipe/Navigation";

export const metadata = {
  title: "About RecipeHub - Learn About Our Recipe Platform",
  description: "Discover RecipeHub, your ultimate destination for delicious recipes. Learn about our mission, team, and how we make cooking accessible to everyone.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-purple-800 text-white px-4 py-2 rounded-lg inline-block mb-4">
            <strong>SSG - Static Site Generation</strong>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            📖 About RecipeHub
          </h1>
          <p className="text-xl text-gray-300">
            Your ultimate destination for discovering and sharing delicious recipes
          </p>
          <p className="text-gray-400 mt-2 text-sm">
            This page was built at build time and served as static HTML
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">🎯 Our Mission</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            At RecipeHub, we believe that cooking should be accessible, enjoyable, and inspiring for everyone.
            Our platform connects home cooks with a diverse collection of recipes from around the world,
            making it easy to discover new flavors and perfect your favorite dishes.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Whether you're a beginner looking for simple weeknight dinners or an experienced chef seeking
            new culinary challenges, RecipeHub has something for every taste and skill level.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🍳</div>
            <h3 className="text-xl font-bold text-white mb-2">Quality Recipes</h3>
            <p className="text-gray-300">
              Every recipe is carefully tested and reviewed by our community to ensure delicious results every time.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-bold text-white mb-2">Global Cuisine</h3>
            <p className="text-gray-300">
              Explore flavors from around the world with recipes from diverse culinary traditions and cultures.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-bold text-white mb-2">Community Driven</h3>
            <p className="text-gray-300">
              Join our passionate community of home cooks sharing tips, variations, and feedback on every recipe.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">👥 Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gray-700 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👨‍🍳</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Chef Antonio</h3>
              <p className="text-gray-400 text-sm mb-2">Head Recipe Curator</p>
              <p className="text-gray-300 text-sm">
                Professional chef with 15+ years of experience in Italian and Mediterranean cuisine.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-700 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👩‍💻</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Sarah Chen</h3>
              <p className="text-gray-400 text-sm mb-2">Tech Lead</p>
              <p className="text-gray-300 text-sm">
                Full-stack developer passionate about creating intuitive cooking experiences.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-700 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Mike Johnson</h3>
              <p className="text-gray-400 text-sm mb-2">Food Photographer</p>
              <p className="text-gray-300 text-sm">
                Capturing the beauty of food through stunning photography and videography.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">📊 By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">1,000+</div>
              <div className="text-gray-300">Recipes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-500 mb-2">50,000+</div>
              <div className="text-gray-300">Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-500 mb-2">25+</div>
              <div className="text-gray-300">Cuisines</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-500 mb-2">4.8</div>
              <div className="text-gray-300">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">📧 Get in Touch</h2>
          <p className="text-gray-300 mb-6">
            Have questions, suggestions, or want to share your favorite recipe? We'd love to hear from you!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div className="flex items-center space-x-2">
              <span>📧</span>
              <span>hello@recipehub.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🐦</span>
              <span>@recipehub</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📷</span>
              <span>@recipehub_official</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📍</span>
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* SSG Info */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-white mb-4">📦 How SSG Works Here</h3>
          <div className="space-y-3 text-gray-300">
            <p>
              <strong className="text-purple-600">⚡ Lightning Fast:</strong> This page was pre-built at deploy time and served as static HTML
            </p>
            <p>
              <strong className="text-purple-600">🔍 SEO Perfect:</strong> Search engines can easily index this static content
            </p>
            <p>
              <strong className="text-purple-600">🌍 CDN Ready:</strong> Distributed globally for instant access anywhere
            </p>
            <p>
              <strong className="text-purple-600">📱 Reliable:</strong> No server rendering means no failures or slow loading
            </p>
            <p>
              <strong className="text-purple-600">🔒 Secure:</strong> No database queries or server-side processing at request time
            </p>
          </div>
          <div className="mt-4 p-4 bg-gray-900 rounded-lg">
            <p className="text-purple-600 font-mono text-sm">
              <strong>Build time:</strong> {new Date().toLocaleString()}
            </p>
            <p className="text-green-600 font-mono text-sm mt-1">
              💡 This page never changes unless we rebuild the app
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}