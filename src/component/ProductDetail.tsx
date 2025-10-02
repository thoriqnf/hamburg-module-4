"use client";
import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { getProduct } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  // TODO 13: Add useEffect to fetch product data
  // This should fetch product when component mounts, handle loading/error states
  useEffect(() => {
    // TODO: Add fetchProduct call when component mounts
    console.log('TODO: Add useEffect to fetch product data');
    setLoading(false);
  }, [productId]);

  const fetchProduct = async () => {
    // TODO: Implement fetchProduct logic with error handling
    console.log('TODO: Implement fetchProduct function');
  };

  const calculateDiscountedPrice = () => {
    if (!product) return 0;
    return product.discountPercentage
      ? product.price * (1 - product.discountPercentage / 100)
      : product.price;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">{error || 'Product not found'}</p>
        <button onClick={fetchProduct} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mr-4">
          Retry
        </button>
        <button onClick={() => router.push('/products')} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
          Back to Products
        </button>
      </div>
    );
  }

  const discountedPrice = calculateDiscountedPrice();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <nav className="text-gray-400 text-sm">
        <ol className="flex items-center space-x-2">
          <li>
            <button onClick={() => router.push('/products')} className="hover:text-white transition-colors">
              Products
            </button>
          </li>
          <li>/</li>
          <li className="text-white truncate max-w-xs">{product.title}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-700 rounded-lg overflow-hidden">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
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
              {product.images.slice(0, 3).map((image, index) => (
                <div key={index} className="aspect-square bg-gray-700 rounded-md overflow-hidden">
                  <img src={image} alt={`Product image ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

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
                  <span className="text-green-400 font-semibold">Save ${(product.price - discountedPrice).toFixed(2)}</span>
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

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>

            <button
              onClick={() => router.push(`/products/${product.id}/edit`)}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Edit Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}