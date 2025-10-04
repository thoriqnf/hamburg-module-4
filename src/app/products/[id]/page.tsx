"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProductDetailPage() {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  // Product type - defined right here where it's used
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

  // API function - right here in the component
  const getProduct = async (id: string): Promise<Product> => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Product not found');
      }
      throw new Error('Failed to fetch product');
    }

    return response.json();
  };

  // Fetch product data when component mounts
  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const productData = await getProduct(productId);
      setProduct(productData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch product details. Please try again.');
      }
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate discounted price
  const calculateDiscountedPrice = () => {
    if (!product) return 0;
    return product.discountPercentage
      ? product.price * (1 - product.discountPercentage / 100)
      : product.price;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Product not found'}</p>
          <div className="space-x-4">
            <button
              onClick={fetchProduct}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Retry
            </button>
            <Link
              href="/products/list"
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md inline-block"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const discountedPrice = calculateDiscountedPrice();

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link
                href="/products/list"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Products
              </Link>
            </li>
            <li className="text-gray-600">/</li>
            <li className="text-white truncate max-w-xs">{product.title}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-700 rounded-lg overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />

                {product.discountPercentage > 0 && (
                  <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-md text-lg font-semibold">
                    -{product.discountPercentage}%
                  </span>
                )}
              </div>

              {product.images && product.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  <div className="aspect-square bg-gray-700 rounded-md overflow-hidden ring-2 ring-blue-500">
                    <img src={product.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                  </div>
                  {product.images.slice(0, 3).map((image: string, index: number) => (
                    <div key={index} className="aspect-square bg-gray-700 rounded-md overflow-hidden">
                      <img src={image} alt={`Product image ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{product.title}</h1>
                <p className="text-gray-400">{product.brand} • {product.category}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="text-white font-semibold">{product.rating}</span>
                  <span className="text-gray-400 ml-1">/5.0</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline space-x-3">
                  {product.discountPercentage > 0 ? (
                    <>
                      <span className="text-gray-400 line-through text-lg">${product.price.toFixed(2)}</span>
                      <span className="text-white text-3xl font-bold">${discountedPrice.toFixed(2)}</span>
                      <span className="text-green-400 font-semibold">
                        Save ${(product.price - discountedPrice).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-white text-3xl font-bold">${product.price.toFixed(2)}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className={`text-sm font-medium ${
                  product.stock > 10 ? 'text-green-400' :
                  product.stock > 0 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {product.stock > 0 ? `${product.stock} units in stock` : 'Out of stock'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-gray-300 leading-relaxed">{product.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                  disabled={product.stock === 0}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>

                <Link
                  href={`/products/${product.id}/edit`}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md font-medium transition-colors text-center"
                >
                  Edit Product
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 text-center">
          <Link
            href="/products/list"
            className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}