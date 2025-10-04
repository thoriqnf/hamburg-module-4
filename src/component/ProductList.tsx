"use client";
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

interface ProductListProps {
  showActions?: boolean;
  searchResults?: any[] | null;
  isSearching?: boolean;
  searchQuery?: string;
  onViewProduct?: (id: number) => void;
  onEditProduct?: (id: number) => void;
  getProducts?: () => Promise<any>;
}

export default function ProductList({
  showActions = false,
  searchResults = null,
  isSearching = false,
  searchQuery = '',
  onViewProduct,
  onEditProduct,
  getProducts
}: ProductListProps) {
  // Product type - defined right here
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

  // State - simple and clear
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // API function - right here in the component
  const fetchProducts = async () => {
    if (getProducts) {
      // Use the passed function from parent
      return getProducts();
    }

    // Default API function
    try {
      const response = await fetch('https://dummyjson.com/products?limit=10');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Could not load products. Please try again.');
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Remove product from state
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Failed to delete product. Please try again.');
    }
  };

  // Fetch products on mount
  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data.products || data);
      setLoading(false);
    }).catch(err => {
      setError('Failed to fetch products. Please try again.');
      setLoading(false);
    });
  }, []);

  // Don't fetch if we have search results
  useEffect(() => {
    if (searchResults !== null) {
      setLoading(false);
    }
  }, [searchResults]);

  // Show loading spinner when searching
  if (isSearching) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  // Show loading spinner when initially loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={() => {
            setLoading(true);
            setError(null);
            fetchProducts().then(data => {
              setProducts(data.products || data);
              setLoading(false);
            }).catch(err => {
              setError('Failed to fetch products. Please try again.');
              setLoading(false);
            });
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  // Determine which products to display
  const displayProducts = searchResults !== null ? searchResults : products;

  // Show no results message for search
  if (searchResults !== null && searchResults.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No products found for "{searchQuery}".</p>
      </div>
    );
  }

  // Show no products message for empty catalog
  if (displayProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No products available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayProducts.map((product: Product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={deleteProduct}
          showActions={showActions}
          onViewProduct={onViewProduct}
          onEditProduct={onEditProduct}
        />
      ))}
    </div>
  );
}