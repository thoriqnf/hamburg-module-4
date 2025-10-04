"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const router = useRouter();

  // Redirect to the products list page
  useEffect(() => {
    router.replace('/products/list');
  }, [router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading products...</p>
      </div>
    </div>
  );
}