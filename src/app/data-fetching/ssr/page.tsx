import Link from "next/link";
import ProductCard from "@/components/ProductCard";

// This function runs on the server for every request
async function getProduct() {
  try {
    const res = await fetch('https://dummyjson.com/products/1');
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

export default async function SSRPage() {
  const product = await getProduct();
  const timestamp = new Date().toLocaleString();

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            🔄 Server-Side Rendering (SSR)
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Fresh data fetched on every request
          </p>
          <div className="bg-blue-800 text-white px-4 py-2 rounded-lg inline-block">
            <strong>How it works:</strong> Data is fetched on the server for each page visit
          </div>
        </div>

        {/* Product Card */}
        {product ? (
          <ProductCard
            product={product}
            timestamp={timestamp}
            strategy="SSR"
            strategyColor="bg-blue-800"
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
              <strong className="text-blue-600">🔄 Fresh Data:</strong> Every time you refresh this page,
              the server fetches new data from the DummyJSON API.
            </p>
            <p>
              <strong className="text-blue-600">⚡ Fast First Load:</strong> The user receives fully rendered HTML.
            </p>
            <p>
              <strong className="text-blue-600">👤 User-Specific:</strong> Perfect for personalized content or real-time data.
            </p>
            <p>
              <strong className="text-blue-600">🔍 SEO Friendly:</strong> Search engines can see the content.
            </p>
          </div>

          <div className="mt-4 p-4 bg-gray-900 rounded-lg">
            <p className="text-green-600 font-mono text-sm">
              <strong>Current Server Time:</strong> {timestamp}
            </p>
            <p className="text-yellow-600 font-mono text-sm mt-1">
              💡 Refresh the page to see the timestamp change!
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            href="/data-fetching"
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            ← Back to Demo
          </Link>
          <Link
            href="/data-fetching/isr"
            className="bg-green-800 hover:bg-green-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Next: ISR →
          </Link>
        </div>
      </div>
    </div>
  );
}