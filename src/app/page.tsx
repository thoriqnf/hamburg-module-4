"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/lib/auth";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="border border-gray-200 rounded-lg p-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Shop & Learn
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            A beginner-friendly React demo showcasing authentication,
            API integration, and shopping cart functionality.
          </p>

          <div className="text-gray-500 mb-8 font-medium">
            Built with Next.js 15, TypeScript & Tailwind CSS
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {isLoggedIn ? (
              <Link
                href="/products"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors text-lg w-full sm:w-auto"
              >
                Continue Shopping
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors text-lg w-full sm:w-auto"
              >
                Login to Start Shopping
              </Link>
            )}
          </div>

          {/* Features Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="text-2xl mb-4">🔐</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                Secure Authentication
              </h3>
              <p className="text-gray-600 text-sm">
                Cookie-based login system with DummyJSON API integration
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <div className="text-2xl mb-4">🛒</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                Shopping Cart
              </h3>
              <p className="text-gray-600 text-sm">
                React Context API for state management and cart functionality
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <div className="text-2xl mb-4">📱</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                Responsive Design
              </h3>
              <p className="text-gray-600 text-sm">
                Mobile-first design with Tailwind CSS
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-12 border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold mb-4 text-lg text-gray-900">
              🚀 What You'll Learn
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-gray-600">
                <div className="font-semibold mb-1 text-gray-900">React Hooks</div>
                <div className="text-xs">useState, useEffect, useContext</div>
              </div>
              <div className="text-gray-600">
                <div className="font-semibold mb-1 text-gray-900">API Integration</div>
                <div className="text-xs">Fetch, async/await, error handling</div>
              </div>
              <div className="text-gray-600">
                <div className="font-semibold mb-1 text-gray-900">State Management</div>
                <div className="text-xs">Context API, cart functionality</div>
              </div>
              <div className="text-gray-600">
                <div className="font-semibold mb-1 text-gray-900">Authentication</div>
                <div className="text-xs">Cookies, route protection</div>
              </div>
            </div>
          </div>

          {/* Demo Note */}
          <div className="mt-8 text-gray-500 text-sm">
            <p>✨ This is a learning demo using the DummyJSON API</p>
            <p className="mt-1">🎯 Perfect for beginners to understand React concepts</p>
          </div>
        </div>
      </div>
    </div>
  );
}