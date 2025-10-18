"use client";

import { useState } from 'react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [imageError, setImageError] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Beginner-friendly logging for debugging
  console.log('ProductCard rendering:', product.title, '- Rating:', product.rating, '- Price:', product.price);

  const handleAddToCart = async () => {
    // Validate product data before adding to cart
    if (!product || !product.id) {
      console.error('Invalid product data:', product);
      return;
    }

    setIsAddingToCart(true);
    try {
      addItem(product);
      console.log('✅ Added to cart:', product.title);
    } catch (error) {
      console.error('❌ Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Handle image loading errors
  const handleImageError = () => {
    console.log('❌ Image failed to load:', product.thumbnail);
    setImageError(true);
  };

  // Fallback values for safety
  const safePrice = product.price || 0;
  const safeRating = product.rating || 0;
  const safeTitle = product.title || 'Unknown Product';
  const safeDescription = product.description || 'No description available';
  const safeCategory = product.category || 'General';
  const safeThumbnail = product.thumbnail || '';

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-gray-50">
        {imageError || !safeThumbnail ? (
          // Fallback placeholder for missing/broken images
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        ) : (
          <img
            src={safeThumbnail}
            alt={safeTitle}
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2" title={safeTitle}>
          {safeTitle}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2" title={safeDescription}>
          {safeDescription}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-gray-900">
            ${safePrice.toFixed(2)}
          </span>

          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{safeRating.toFixed(1)}</span>
            {product.stock !== undefined && (
              <span className="ml-2 text-xs text-green-600">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            )}
          </div>
        </div>

        {/* Category and Brand */}
        <div className="mb-4 space-y-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
            {safeCategory}
          </span>
          {product.brand && (
            <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full ml-2">
              {product.brand}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart || (product.stock !== undefined && product.stock === 0)}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {isAddingToCart ? 'Adding...' :
           (product.stock === 0 ? 'Out of Stock' : 'Add to Cart')}
        </button>
      </div>
    </div>
  );
}