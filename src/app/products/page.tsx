"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { api } from "@/lib/api";
import { isAuthenticated, logout } from "@/lib/auth";
import ProductCard from "@/components/ProductCard";
import CartButton from "@/components/CartButton";
import CartIcon from "@/components/CartIcon";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();

  // Check authentication and fetch products
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    fetchProducts();
  }, [router]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts(12); // Get first 12 products
      setProducts(data);
    } catch (error) {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchProducts();
      return;
    }

    try {
      setLoading(true);
      const data = await api.searchProducts(searchQuery);
      setProducts(data);
    } catch (error) {
      setError("Failed to search products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Product Store
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Cart Icon in Navbar */}
              <CartIcon
                onClick={() => setIsCartOpen(true)}
                className="hover:bg-blue-50"
              />

              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Search
            </button>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  fetchProducts();
                }}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No products found
            </h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search terms or browse all products.
            </p>
            <button
              onClick={fetchProducts}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Browse All Products
            </button>
          </div>
        )}
      </main>

      {/* Floating Cart Button - Now uses shared state */}
      <CartButton isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </div>
  );
}