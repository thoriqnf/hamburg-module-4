"use client";
import { useRouter } from 'next/navigation';
import ProductForm from '@/component/ProductForm';
import { Product } from '@/types/product';

export default function CreateProductPage() {
  const router = useRouter();

  // TODO 18: Add success handler and navigation
  // Handle successful product creation and show appropriate feedback
  const handleProductCreate = async (product: Product) => {
    alert(`Product "${product.title}" created successfully!`);
    router.push(`/products/${product.id}`);
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to discard your changes?')) {
      router.push('/products');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Create New Product</h1>
              <p className="text-gray-400">Add a new product to your catalog</p>
            </div>
            <button
              onClick={handleCancel}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a>
            </li>
            <li className="text-gray-600">/</li>
            <li>
              <a href="/products" className="text-gray-400 hover:text-white transition-colors">Products</a>
            </li>
            <li className="text-gray-600">/</li>
            <li className="text-white">Create Product</li>
          </ol>
        </nav>

        {/* TODO 19: Add ProductForm component */}
        {/* The ProductForm component handles all the form logic */}
        <ProductForm
          onSuccess={handleProductCreate}
          onCancel={handleCancel}
        />

        <div className="mt-8 text-center">
          <div className="inline-flex space-x-6 text-sm">
            <a href="/products" className="text-gray-400 hover:text-white transition-colors">
              ← Back to Products
            </a>
            <a href="/" className="text-gray-400 hover:text-white transition-colors">
              Home →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

