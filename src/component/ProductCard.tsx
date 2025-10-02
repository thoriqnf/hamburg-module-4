"use client";
import { Product } from '@/types/product';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  onDelete?: (id: number) => void;
  showActions?: boolean;
}

export default function ProductCard({ product, onDelete, showActions = false }: ProductCardProps) {
  // TODO 6: Add delete handler with confirmation
  // This should confirm before calling onDelete prop
  const handleDelete = () => {
    // TODO: Implement delete confirmation logic
    console.log('TODO: Implement delete handler with confirmation');
  };

  // TODO 7: Calculate discounted price display
  // Show original price and discounted price if discount exists
  // TODO: Implement discounted price calculation
  const discountedPrice = product.price.toFixed(2);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48 bg-gray-700">
        {/* TODO 22: Add Next.js Image component for optimization */}
        {/* Replace regular img tag with Next.js Image for better performance */}
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />

        {/* TODO 8: Add discount badge */}
        {/* Show discount percentage badge if discount exists */}
        {product.discountPercentage > 0 && (
          <span className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
            -{product.discountPercentage}%
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">{product.title}</h3>
        <p className="text-gray-400 text-sm mb-2">{product.brand} • {product.category}</p>

        <div className="flex items-center mb-2">
          <span className="text-yellow-400 mr-1">★</span>
          <span className="text-white text-sm">{product.rating}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            {product.discountPercentage > 0 ? (
              <>
                <span className="text-gray-400 line-through text-sm">${product.price.toFixed(2)}</span>
                <span className="text-white font-bold ml-2">${discountedPrice}</span>
              </>
            ) : (
              <span className="text-white font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
          <span className={`text-sm ${product.stock > 10 ? 'text-green-400' : product.stock > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>

        {showActions ? (
          <div className="flex gap-2">
            <Link href={`/products/${product.id}/edit`} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium text-center">
              Edit
            </Link>
            <button onClick={handleDelete} className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium">
              Delete
            </button>
          </div>
        ) : (
          <Link href={`/products/${product.id}`} className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-center text-sm font-medium block">
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}