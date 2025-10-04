"use client";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProductForm from '@/component/ProductForm';

export default function CreateProductPage() {
  const router = useRouter();

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

  // Form data type for creating products
  interface ProductFormData {
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string;
  }

  // API function - right here in the component
  const createProduct = async (data: ProductFormData): Promise<Product> => {
    // Prepare product data for the API
    const productData = {
      title: data.title,
      description: data.description,
      price: Number(data.price),
      discountPercentage: Number(data.discountPercentage),
      stock: Number(data.stock),
      brand: data.brand,
      category: data.category,
      thumbnail: data.thumbnail || 'https://via.placeholder.com/300x200?text=No+Image',
      images: data.images
        ? data.images.split(',').map(img => img.trim()).filter(Boolean)
        : []
    };

    const response = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    return response.json();
  };

  // Event handlers - simple and clear
  const handleSuccess = (product: Product) => {
    alert(`Product "${product.title}" created successfully!`);
    // Navigate back to products list
    router.push('/products/list');
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to discard your changes?')) {
      router.push('/products/list');
    }
  };

  // Form submission handler
  const handleFormSubmit = async (data: ProductFormData) => {
    try {
      const newProduct = await createProduct(data);
      handleSuccess(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Product</h1>
          <p className="text-gray-400">Add a new product to the catalog</p>
        </div>

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
            <li className="text-white">Create Product</li>
          </ol>
        </nav>

        {/* Product Form */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <ProductForm
            onSuccess={handleSuccess}
            onCancel={handleCancel}
            onSubmit={handleFormSubmit}
          />
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