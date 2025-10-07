interface Product {
  id?: number;
  title: string;
  description?: string;
  price: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  stock?: number;
  rating?: number;
}

interface ProductCardProps {
  product: Product;
  timestamp: string;
  strategy: string;
  strategyColor: string;
}

export default function ProductCard({ product, timestamp, strategy, strategyColor }: ProductCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      {/* Header with Strategy Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className={`${strategyColor} px-3 py-1 rounded-full text-sm font-bold text-white`}>
          {strategy}
        </div>
        <div className="text-gray-400 text-sm">
          {timestamp}
        </div>
      </div>

      {/* Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        {product.thumbnail && (
          <div className="flex justify-center">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-white mb-2">{product.title}</h3>

          {product.brand && (
            <p className="text-gray-400 mb-1">Brand: <span className="text-white">{product.brand}</span></p>
          )}

          {product.category && (
            <p className="text-gray-400 mb-1">Category: <span className="text-white">{product.category}</span></p>
          )}

          <p className="text-3xl font-bold text-green-400 mb-2">${product.price}</p>

          {product.stock !== undefined && (
            <p className="text-gray-400 mb-1">
              Stock: <span className={product.stock > 10 ? "text-green-400" : "text-orange-400"}>
                {product.stock} items
              </span>
            </p>
          )}

          {product.rating && (
            <p className="text-gray-400 mb-2">
              Rating: <span className="text-yellow-400">★ {product.rating}</span>
            </p>
          )}

          {product.description && (
            <p className="text-gray-300 text-sm mt-2 line-clamp-3">
              {product.description}
            </p>
          )}
        </div>
      </div>

      {/* Product ID */}
      {product.id && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-gray-500 text-xs">Product ID: {product.id}</p>
        </div>
      )}
    </div>
  );
}