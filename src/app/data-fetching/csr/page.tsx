'use client';

import Link from "next/link";
import useSWR from 'swr';
import ProductCard from "@/components/ProductCard";

// Simple fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  return res.json();
});

// Loading spinner component
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-700"></div>
    </div>
  );
}

// Error component
function ErrorComponent({ error, onRetry }: { error: Error; onRetry: () => void }) {
  return (
    <div className="bg-red-900 border border-red-900 text-red-100 px-4 py-6 rounded-lg">
      <p className="font-bold mb-2">❌ Failed to load product data</p>
      <p className="text-sm mb-4">{error.message}</p>
      <button
        onClick={onRetry}
        className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded transition-colors"
      >
        🔄 Try Again
      </button>
    </div>
  );
}

export default function CSRPage() {
  const {
    data: product,
    error,
    isLoading,
    mutate
  } = useSWR('https://dummyjson.com/products/4', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 0, // Don't auto-refresh
  });

  const timestamp = new Date().toLocaleString();

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600 mb-4">
            💻 Client-Side Rendering with SWR
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Data fetched in the browser with smart caching and revalidation
          </p>
          <div className="bg-pink-800 text-white px-4 py-2 rounded-lg inline-block">
            <strong>How it works:</strong> SWR handles data fetching, caching, and revalidation
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-sm">Status:</span>
              {isLoading && <span className="text-yellow-600 font-semibold">⏳ Loading...</span>}
              {error && <span className="text-red-600 font-semibold">❌ Error</span>}
              {product && !isLoading && !error && <span className="text-green-600 font-semibold">✅ Loaded</span>}
            </div>
            <div className="text-gray-600 text-sm">
              Client Time: {timestamp}
            </div>
          </div>
        </div>

        {/* Product Card */}
        {isLoading && <LoadingSpinner />}
        {error && <ErrorComponent error={error} onRetry={() => mutate()} />}
        {product && !isLoading && !error && (
          <ProductCard
            product={product}
            timestamp={timestamp}
            strategy="CSR + SWR"
            strategyColor="bg-pink-800"
          />
        )}

        {/* Explanation */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">📖 What's happening here?</h2>
          <div className="space-y-3 text-gray-300">
            <p>
              <strong className="text-pink-600">🌐 Browser Fetch:</strong> Data is fetched in the browser, not server.
            </p>
            <p>
              <strong className="text-pink-600">🧠 Smart Caching:</strong> SWR caches data and reuses it.
            </p>
            <p>
              <strong className="text-pink-600">🔄 Auto Revalidation:</strong> Refreshes when you focus the window.
            </p>
            <p>
              <strong className="text-pink-600">⚡ Instant Updates:</strong> Shows cached data immediately, updates in background.
            </p>
          </div>

          <div className="mt-4 p-4 bg-gray-900 rounded-lg">
            <p className="text-pink-600 font-mono text-sm">
              <strong>Client Time:</strong> {timestamp}
            </p>
            <p className="text-yellow-600 font-mono text-sm mt-1">
              💡 Try switching tabs and coming back!
            </p>
            <p className="text-green-600 font-mono text-sm mt-1">
              🔄 SWR auto-refreshes when you refocus this tab.
            </p>
          </div>

          {/* SWR Features Demo */}
          <div className="mt-4 bg-pink-900 border border-pink-900 p-4 rounded-lg">
            <p className="text-pink-100 text-sm mb-2">
              <strong>🎯 SWR Features:</strong>
            </p>
            <ul className="text-pink-100 text-sm space-y-1">
              <li>• ✅ Fast page loads (shows cached data)</li>
              <li>• 🔄 Auto-revalidates on window focus</li>
              <li>• 📱 Handles connection loss/recovery</li>
              <li>• 🔄 Manual refresh with button below</li>
              <li>• 🚫 Built-in error handling and retry logic</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => mutate()}
            className="bg-pink-800 hover:bg-pink-900 text-white font-bold px-6 py-3 rounded-lg transition-colors"
          >
            🔄 Refresh Data
          </button>
          <button
            onClick={() => mutate(undefined, { revalidate: false })}
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            🗑️ Clear Cache
          </button>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            href="/data-fetching/dynamic"
            className="bg-orange-800 hover:bg-orange-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            ← Previous: Dynamic
          </Link>
          <Link
            href="/data-fetching"
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Back to Demo
          </Link>
          <Link
            href="/"
            className="bg-blue-800 hover:bg-blue-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            🏠 Home →
          </Link>
        </div>
      </div>
    </div>
  );
}