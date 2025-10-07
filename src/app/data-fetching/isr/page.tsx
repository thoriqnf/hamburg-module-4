import Link from "next/link";
import ProductCard from "@/components/ProductCard";

// Revalidate this page every 30 seconds
export const revalidate = 30;

// This function runs on the server and caches the result for 30 seconds
async function getProduct() {
  try {
    const res = await fetch('https://dummyjson.com/products/2', {
      next: { revalidate: 30 }
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

export default async function ISRPage() {
  const product = await getProduct();
  const timestamp = new Date().toLocaleString();

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            ⏰ Incremental Static Regeneration (ISR)
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Static page that updates every 30 seconds
          </p>
          <div className="bg-green-800 text-white px-4 py-2 rounded-lg inline-block">
            <strong>How it works:</strong> Page is static but regenerates in background every 30s
          </div>
        </div>

        {/* Product Card */}
        {product ? (
          <ProductCard
            product={product}
            timestamp={timestamp}
            strategy="ISR"
            strategyColor="bg-green-800"
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
              <strong className="text-green-600">⚡ Super Fast:</strong> Page loads instantly from cache.
            </p>
            <p>
              <strong className="text-green-600">🔄 Auto Updates:</strong> Background regeneration every 30 seconds.
            </p>
            <p>
              <strong className="text-green-600">👥 Perfect for:</strong> Blogs, news, product pages that update periodically.
            </p>
            <p>
              <strong className="text-green-600">🎯 Best of Both:</strong> Static speed + fresh content.
            </p>
          </div>

          <div className="mt-4 p-4 bg-gray-900 rounded-lg">
            <p className="text-green-600 font-mono text-sm">
              <strong>Current Server Time:</strong> {timestamp}
            </p>
            <p className="text-yellow-600 font-mono text-sm mt-1">
              💡 Refresh immediately - loads instantly!
            </p>
            <p className="text-blue-600 font-mono text-sm mt-1">
              ⏰ Wait 30+ seconds and refresh - content updates!
            </p>
          </div>

          <div className="mt-4 bg-green-900 border border-green-900 p-4 rounded-lg">
            <p className="text-green-100 text-sm">
              <strong>🔍 Try this:</strong> Open this page in multiple tabs. Notice how all tabs show the same timestamp initially, but after 30 seconds, they'll all update together when you refresh!
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            href="/data-fetching/ssr"
            className="bg-blue-800 hover:bg-blue-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            ← Previous: SSR
          </Link>
          <Link
            href="/data-fetching"
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Back to Demo
          </Link>
          <Link
            href="/data-fetching/ssg"
            className="bg-purple-800 hover:bg-purple-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Next: SSG →
          </Link>
        </div>
      </div>
    </div>
  );
}