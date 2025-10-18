# TODO Guide: Ultra-Simplified E-Commerce App

**Target Audience:** React developers new to Next.js
**Goal:** Recreate this ultra-simplified shopping application from scratch
**Approach:** Implementation-focused steps with essential code snippets

---

## Phase 1: Project Setup & Configuration

### Step 1: Initialize Next.js Project
```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd my-app
```

### Step 2: Install Dependencies
```bash
npm install axios jwt-decode react-hook-form swr
```

### Step 3: Configure Next.js for Images
**File:** `next.config.ts`
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.dummyjson.com", "image.google.com"],
    remotePatterns: [],
  },
};

export default nextConfig;
```

### Step 4: Set Up Folder Structure
Create these directories:
```
src/
├── app/
│   ├── login/
│   ├── products/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
├── context/
├── lib/
└── types/
```

---

## Phase 2: Authentication Foundation

### Step 5: Create Authentication Utilities
**File:** `src/lib/auth.ts`
```typescript
export const setCookie = (name: string, value: string, minutes: number = 30) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (minutes * 60 * 1000));
  document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}`;
};

export const getCookie = (name: string): string | null => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
    ?.split('=')[1] || null;
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
};

export const isAuthenticated = (): boolean => {
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');
  return !!(accessToken && refreshToken);
};

export const logout = (router?: any) => {
  removeCookie('accessToken');
  removeCookie('refreshToken');
  removeCookie('auth-token');
  removeCookie('username');
  removeCookie('user-data');

  if (router && router.push) {
    router.push('/login');
  } else {
    window.location.href = '/login';
  }
};
```

### Step 6: Create API Client
**File:** `src/lib/api.ts`
```typescript
const BASE_URL = 'https://dummyjson.com';

export const api = {
  login: async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    return response.json();
  },

  getCurrentUser: async () => {
    const token = getCookie('accessToken');

    const response = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get user info');
    }

    return response.json();
  },

  getProducts: async (limit: number = 10) => {
    const response = await fetch(`${BASE_URL}/products?limit=${limit}`);

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data.products;
  },

  getProduct: async (id: number) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return response.json();
  },

  searchProducts: async (query: string) => {
    const response = await fetch(`${BASE_URL}/products/search?q=${query}`);

    if (!response.ok) {
      throw new Error('Failed to search products');
    }

    const data = await response.json();
    return data.products;
  }
};

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
    ?.split('=')[1] || null;
}
```

### Step 7: Create Middleware for Route Protection
**File:** `src/middleware.ts`
```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/", "/login"];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!accessToken || !refreshToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
```

### Step 8: Create Types Definition (Ultra-Simplified)
**File:** `src/types/index.ts`
```typescript
// Using any types for ultra-simplification
// No interfaces needed - use any throughout the application
export {};
```

### Step 9: Configure Tailwind CSS
**File:** `src/app/globals.css`
```css
@import "tailwindcss";

:root {
  --background: #ffffff;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
  }
}

body {
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}

/* Custom animations for cart badge */
@keyframes pulse-once {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.animate-pulse-once {
  animation: pulse-once 0.3s ease-in-out;
}

.cart-count-transition {
  transition: all 0.2s ease-in-out;
}

.cart-button-hover {
  transition: all 0.2s ease-in-out;
}

.cart-button-hover:hover {
  transform: translateY(-1px);
}

.cart-focus:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

@media (max-width: 640px) {
  .cart-touch-target {
    min-height: 44px;
    min-width: 44px;
  }
}
```

---

## Phase 3: Core Layout & Context

### Step 10: Create Root Layout with CartProvider
**File:** `src/app/layout.tsx`
```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shop & Learn - React Demo",
  description: "A beginner-friendly React demo showcasing authentication, API integration, and shopping cart functionality",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
```

### Step 11: Implement CartContext (Ultra-Simplified)
**File:** `src/context/CartContext.tsx`
```typescript
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type CartContextType = {
  items: any[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: any) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: any) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
```

### Step 12: Create Basic Loading Component
**File:** `src/app/loading.tsx`
```typescript
export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
```

---

## Phase 4: Pages Implementation

### Step 13: Create Home Page (Landing)
**File:** `src/app/page.tsx`
```typescript
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/lib/auth";
import CartIcon from "@/components/CartIcon";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
```

### Step 14: Create Login Page with Form
**File:** `src/app/login/page.tsx`
```typescript
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setCookie, isAuthenticated } from "@/lib/auth";
import { api } from "@/lib/api";
import LoginButton from "@/components/LoginButton";

export default function LoginPage() {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/products");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await api.login(username, password);

      setCookie('accessToken', data.accessToken, 30);
      setCookie('refreshToken', data.refreshToken, 30);
      setCookie('username', data.username, 30);
      setCookie('user-data', JSON.stringify(data), 30);

      router.push("/products");

    } catch (error) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to access our product catalog
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <LoginButton
              isLoading={isLoading}
              disabled={!username || !password}
            />
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Demo Credentials
            </h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Username:</strong> emilys</p>
              <p><strong>Password:</strong> emilyspass</p>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          <p>This is a demo application using DummyJSON API</p>
        </div>
      </div>
    </div>
  );
}
```

### Step 15: Create Products Page (No Search)
**File:** `src/app/products/page.tsx`
```typescript
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { isAuthenticated, logout } from "@/lib/auth";
import ProductCard from "@/components/ProductCard";
import CartIcon from "@/components/CartIcon";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
      const data = await api.getProducts(12);
      setProducts(data);
    } catch (error) {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      logout(router);
    } catch (error) {
      setError("Logout failed. Please try again.");
      setIsLoggingOut(false);
    }
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
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Product Store
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <CartIcon />
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No products found
            </h3>
            <p className="mt-1 text-gray-500">
              Try refreshing the page.
            </p>
            <button
              onClick={fetchProducts}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
            >
              Load Products
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
```

### Step 16: Add Route Protection and Navigation
Route protection is already handled by the middleware created in Step 7. Navigation links are included in the pages above.

---

## Phase 5: Components

### Step 17: Create CartIcon Component (Display-Only)
**File:** `src/components/CartIcon.tsx`
```typescript
"use client";

import { useCart } from "@/context/CartContext";

interface CartIconProps {
  className?: string;
}

export default function CartIcon({ className = "" }: CartIconProps) {
  const { totalItems } = useCart();

  return (
    <div className={"relative p-2 rounded-lg " + className}>
      <svg
        className="w-6 h-6 text-gray-600 cart-button-hover"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>

      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse-once cart-count-transition">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </div>
  );
}
```

### Step 18: Create ProductCard Component (Basic)
**File:** `src/components/ProductCard.tsx`
```typescript
"use client";

import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: any }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square w-full bg-gray-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>

          <div className="flex items-center text-sm text-gray-500">
            <span className="text-yellow-400 mr-1">★</span>
            {product.rating}
          </div>
        </div>

        <div className="mb-3">
          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 cart-button-hover"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
```

### Step 19: Create LoginButton Component
**File:** `src/components/LoginButton.tsx`
```typescript
export default function LoginButton({ isLoading, disabled }: {
  isLoading: boolean;
  disabled: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
    >
      {isLoading ? "Signing in..." : "Sign In"}
    </button>
  );
}
```

### Step 20: Test Complete Flow
Run these commands to test:

```bash
# Start development server
npm run dev

# Test in browser at http://localhost:3000
# 1. Visit home page
# 2. Click login
# 3. Use demo credentials (emilys/emilyspass)
# 4. View products
# 5. Add items to cart
# 6. Check cart count updates
# 7. Test logout functionality
```

### Step 21: Final Optimizations and Cleanup
```bash
# Build for production to verify everything works
npm run build

# Start production server to test
npm start
```

---

## Quick Reference Summary

**Key Files Created:**
- `next.config.ts` - Next.js configuration
- `src/middleware.ts` - Route protection
- `src/lib/auth.ts` - Authentication utilities
- `src/lib/api.ts` - API client
- `src/types/index.ts` - Empty (using any types)
- `src/context/CartContext.tsx` - Cart state management
- `src/app/layout.tsx` - Root layout
- `src/app/page.tsx` - Home page
- `src/app/login/page.tsx` - Login page
- `src/app/products/page.tsx` - Products page
- `src/components/CartIcon.tsx` - Cart icon display
- `src/components/ProductCard.tsx` - Product card
- `src/components/LoginButton.tsx` - Login button

**Key Features Implemented:**
- ✅ Cookie-based authentication
- ✅ Route protection with middleware
- ✅ Product listing with DummyJSON API
- ✅ Shopping cart with local storage
- ✅ Responsive design with Tailwind
- ✅ Ultra-simplified with `any` types
- ✅ No search functionality (as requested)
- ✅ Cart icon is display-only (no sidebar)

**Application Flow:**
Home → Login → Products → Add to Cart → Logout → Back to Login

---

**Development Commands:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
```

This guide recreates the exact ultra-simplified e-commerce application with all the specific simplifications you requested.