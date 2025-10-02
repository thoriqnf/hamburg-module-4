"use client";
import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { getProducts } from '@/lib/api';
import ProductCard from './ProductCard';

interface ProductListProps {
  showActions?: boolean;
}

export default function ProductList({ showActions = false }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // TODO 9: Implement fetchProducts function with error handling
  // This should fetch products and update state, handle loading/error states
  const fetchProducts = async () => {
    // TODO: Implement fetchProducts logic with error handling
    console.log('TODO: Implement fetchProducts with error handling');
    setLoading(false);
  };

  // TODO 10: Add useEffect to fetch products on mount
  // This should call fetchProducts when component mounts
  useEffect(() => {
    // TODO: Call fetchProducts when component mounts
    console.log('TODO: Add useEffect to fetch products on mount');
  }, []);

  // TODO 11: Add handleDelete function
  // This should remove product from state after deletion
  const handleDelete = (id: number) => {
    // TODO: Implement handleDelete logic
    console.log('TODO: Implement handleDelete function');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">{error}</p>
        <button onClick={fetchProducts} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          Retry
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No products available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={handleDelete}
          showActions={showActions}
        />
      ))}
    </div>
  );
}