"use client";
import { useState } from 'react';
import Link from 'next/link';
import ProductList from '@/component/ProductList';

export default function ProductsListPage() {
  // Product type - simple and clear, defined right here
  interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  }

  // Response type for API calls
  interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }

  // API functions - right here in the component where they're used
  const getProducts = async (): Promise<ProductsResponse> => {
    const response = await fetch('https://dummyjson.com/products?limit=10');
    return response.json();
  };

  const searchProducts = async (query: string): Promise<ProductsResponse> => {
    const response = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`);
    return response.json();
  };

  // State - easy to understand, right below the functions that use it
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[] | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Event handlers - simple and clear
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchProducts(searchQuery);
      setSearchResults(results.products);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Products</h1>
          <p className="text-gray-400">Browse and manage our product catalog</p>
        </div>

        {/* Search Bar */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSearchSubmit} className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products by name, brand, or category..."
                className="w-full px-4 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors">
              Search
            </button>
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {/* Action Bar */}
        <div className="mb-6 flex justify-between items-center">
          <div className="text-gray-400">
            {isSearching && `Searching for "${searchQuery}"...`}
            {searchResults && !isSearching && `Found ${searchResults.length} results for "${searchQuery}"`}
            {searchResults === null && !isSearching && 'All Products'}
          </div>

          {/* Create Product Button - uses Next.js Link for routing */}
          <Link
            href="/products/create"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Product
          </Link>
        </div>

        {/* Product List */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <ProductList
            showActions={true}
            searchResults={searchResults}
            isSearching={isSearching}
            searchQuery={searchQuery}
            onViewProduct={(productId) => {
              // Navigate to product detail page
              window.location.href = `/products/${productId}`;
            }}
            onEditProduct={(productId) => {
              // Navigate to product edit page
              window.location.href = `/products/${productId}/edit`;
            }}
            getProducts={getProducts}
          />
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}