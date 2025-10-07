import Link from "next/link";
import ProductCard from "@/components/ProductCard";

// Force static generation (no revalidation)
export const dynamic = 'force-static';

// This function runs only at build time
async function getProduct() {
  try {
    const res = await fetch('https://dummyjson.com/products/3', {
      cache: 'force-cache'
    });
    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function SSGPage() {
  const product = await getProduct();
  const buildTime = new Date().toLocaleString();

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">
            📦 Static Site Generation (SSG)
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Built once at build time - super fast forever!
          </p>
          <div className="bg-purple-800 text-white px-4 py-2 rounded-lg inline-block">
            <strong>How it works:</strong> Data fetched once when you build the project
          </div>
        </div>

        {/* Product Card */}
        {product ? (
          <ProductCard
            product={product}
            timestamp={buildTime}
            strategy="SSG"
            strategyColor="bg-purple-800"
          />
        ) : (
          <div className="bg-red-900 border border-red-900 text-red-100 px-4 py-3 rounded-lg">
            ❌ Failed to load product data at build time
          </div>
        )}

        {/* Explanation */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">📖 What's happening here?</h2>
          <div className="space-y-3 text-gray-300">
            <p>
              <strong className="text-purple-600">🚀 Lightning Fast:</strong> HTML generated at build time, served instantly.
            </p>
            <p>
              <strong className="text-purple-600">🏭 Pre-built:</strong> Data fetched once when you run `npm run build`.
            </p>
            <p>
              <strong className="text-purple-600">💰 Cheap Hosting:</strong> Can be deployed to static CDNs.
            </p>
            <p>
              <strong className="text-purple-600">🔍 SEO Perfect:</strong> Search engines see complete HTML immediately.
            </p>
          </div>

          <div className="mt-4 p-4 bg-gray-900 rounded-lg">
            <p className="text-purple-600 font-mono text-sm">
              <strong>Build Time:</strong> {buildTime}
            </p>
            <p className="text-yellow-600 font-mono text-sm mt-1">
              💡 This timestamp never changes!
            </p>
            <p className="text-blue-600 font-mono text-sm mt-1">
              🔄 Refresh as much as you want - instant loading!
            </p>
          </div>

          <div className="mt-4 bg-purple-900 border border-purple-900 p-4 rounded-lg">
            <p className="text-purple-100 text-sm">
              <strong>🏗️ When this updates:</strong> Only when you rebuild and redeploy your app. Perfect for documentation, marketing pages, or content that doesn't change often.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            href="/data-fetching/isr"
            className="bg-green-800 hover:bg-green-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            ← Previous: ISR
          </Link>
          <Link
            href="/data-fetching"
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Back to Demo
          </Link>
          <Link
            href="/data-fetching/dynamic"
            className="bg-orange-800 hover:bg-orange-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Next: Dynamic →
          </Link>
        </div>
      </div>
    </div>
  );
}