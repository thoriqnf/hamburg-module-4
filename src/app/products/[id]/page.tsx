import ProductDetail from '@/component/ProductDetail';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = params.id;
  const isValidId = /^\d+$/.test(productId);

  // TODO 16: Add product ID validation and error handling
  // Validate ID and show appropriate error if invalid
  // TODO: Implement product ID validation logic
  console.log('TODO: Implement product ID validation and error handling');

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a>
            </li>
            <li className="text-gray-600">/</li>
            <li>
              <a href="/products" className="text-gray-400 hover:text-white transition-colors">Products</a>
            </li>
            <li className="text-gray-600">/</li>
            <li className="text-white truncate max-w-xs">Product {productId}</li>
          </ol>
        </nav>

        <div className="mb-6">
          <a
            href="/products"
            className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Products
          </a>
        </div>

        {/* TODO 17: Add ProductDetail component */}
        {/* This component will handle all product display logic */}
        <ProductDetail />
      </div>
    </div>
  );
}