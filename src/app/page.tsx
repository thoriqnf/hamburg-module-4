"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/lib/auth";
import CartIcon from "@/components/CartIcon";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // dipanggil dalam useeffect karena dia paling awal untuk mengetahui apakah user sudah login atau belum
  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Shop & Learn
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {isLoggedIn && <CartIcon />}
              {isLoggedIn ? (
                <Link
                  href="/products"
                  className="text-blue-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Shop
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center px-4 min-h-[calc(100vh-4rem)]">
        <div className="text-center max-w-4xl mx-auto">
          <div className="border border-gray-200 rounded-lg p-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Shop & Learn
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              A beginner-friendly React demo.
            </p>

            <div className="text-gray-500 mb-8 font-medium">
              Built with Next.js 15, TypeScript & Tailwind CSS
            </div>

            <div className="space-y-4">
              {isLoggedIn ? (
                <Link
                  href="/products"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg text-lg"
                >
                  Continue Shopping
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg text-lg"
                >
                  Login to Start Shopping
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
