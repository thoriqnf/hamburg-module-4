import Link from "next/link";
import ProductCard from "@/components/ProductCard";

// Force dynamic rendering - no caching at all
export const dynamic = 'force-dynamic';

// This function runs on every request with no caching
async function getRandomProduct() {
  try {
    // Fetch all products and pick a random one
    const cacheBuster = Date.now(); // Current timestamp to prevent any caching
    const res = await fetch(`https://dummyjson.com/products?limit=100&t=${cacheBuster}`, {
      cache: 'no-store'
    });
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await res.json();
    // Pick a random product from the list
    const products = data.products || [];
    const randomIndex = Math.floor(Math.random() * products.length);
    return products[randomIndex] || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function DynamicPage() {
  const product = await getRandomProduct();
  const timestamp = new Date().toLocaleString();

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-600 mb-4">
            ⚡ Dynamic Fetching (No Caching)
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Fresh data every single time - no caching whatsoever!
          </p>
          <div className="bg-orange-800 text-white px-4 py-2 rounded-lg inline-block">
            <strong>How it works:</strong> Fetches new random product on every refresh
          </div>
        </div>

        {/* Product Card */}
        {product ? (
          <ProductCard
            product={product}
            timestamp={timestamp}
            strategy="Dynamic"
            strategyColor="bg-orange-800"
          />
        ) : (
          <div className="bg-red-900 border border-red-900 text-red-100 px-4 py-3 rounded-lg">
            ❌ Failed to load product data
          </div>
        )}

        {/* Explanation */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">📖 What's happening here?</h2>
          <div className="space-y-3 text-gray-300">
            <p>
              <strong className="text-orange-600">🎲 Random Product:</strong> Different product every time you refresh!
            </p>
            <p>
              <strong className="text-orange-600">🚫 No Caching:</strong> cache: 'no-store' ensures fresh data.
            </p>
            <p>
              <strong className="text-orange-600">⚡ Always Live:</strong> Force-dynamic rendering.
            </p>
            <p>
              <strong className="text-orange-600">📊 Perfect for:</strong> Live data, stock prices, user-specific content.
            </p>
          </div>

          <div className="mt-4 p-4 bg-gray-900 rounded-lg">
            <p className="text-orange-600 font-mono text-sm">
              <strong>Request Time:</strong> {timestamp}
            </p>
            <p className="text-yellow-600 font-mono text-sm mt-1">
              🎲 Refresh to get a DIFFERENT product!
            </p>
            <p className="text-green-600 font-mono text-sm mt-1">
              ⚡ Notice how the product ID changes every time!
            </p>
          </div>

          <div className="mt-4 bg-orange-900 border border-orange-900 p-4 rounded-lg">
            <p className="text-orange-100 text-sm">
              <strong>🔍 Try this:</strong> Refresh multiple times quickly. Notice how each refresh gives you a different random product with a fresh timestamp. This is perfect for content that must always be up-to-date!
            </p>
          </div>
        </div>

        {/* Refresh Note */}
        <div className="mt-6 text-center">
          <p className="text-orange-600 text-sm">
            🎲 Just refresh the page to see a fresh fetch!
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            href="/data-fetching/ssg"
            className="bg-purple-800 hover:bg-purple-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            ← Previous: SSG
          </Link>
          <Link
            href="/data-fetching"
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Back to Demo
          </Link>
          <Link
            href="/data-fetching/csr"
            className="bg-pink-800 hover:bg-pink-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Next: CSR →
          </Link>
        </div>
      </div>
    </div>
  );
}