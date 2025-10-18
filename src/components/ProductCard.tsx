"use client";

import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: any }) {
  const { addItem } = useCart();

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{product.title}</h3>

        <p className="text-sm text-gray-600 mb-3">{product.description}</p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>

          <div className="flex items-center text-sm text-gray-500">
            <svg
              className="w-4 h-4 text-yellow-400 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="mb-4">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
            {product.category}
          </span>
        </div>

        <button
          onClick={() => addItem(product)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
