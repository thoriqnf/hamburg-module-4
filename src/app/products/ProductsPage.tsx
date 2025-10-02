"use client";
import { useState } from 'react';
import ProductList from '@/component/ProductList';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // TODO 14: Add search functionality
  // Handle search input changes and form submission
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implement search input change handler
    console.log('TODO: Implement search functionality');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    // TODO: Implement search form submission
    console.log('TODO: Implement search form submission');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Products</h1>
          <p className="text-gray-400">Browse and manage our product catalog</p>
        </div>

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
                onClick={() => setSearchQuery('')}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="text-gray-400">
            {searchQuery && `Searching for "${searchQuery}"`}
            {!searchQuery && 'All Products'}
          </div>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors flex items-center"
            onClick={() => window.location.href = '/products/create'}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Product
          </button>
        </div>

        {/* TODO 15: Add ProductList component with proper props */}
        <ProductList showActions={true} />

        <div className="mt-12 text-center">
          <a href="/" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}