"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ProductForm from '@/component/ProductForm';

export default function EditProductPage() {
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

  // Form data type for editing products
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

  // API functions - right here in the component
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

  const updateProduct = async (id: string, data: ProductFormData): Promise<Product> => {
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

    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
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

  // Event handlers - simple and clear
  const handleSuccess = (updatedProduct: Product) => {
    alert(`Product "${updatedProduct.title}" updated successfully!`);
    // Navigate back to products list
    router.push('/products/list');
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to discard your changes?')) {
      router.push(`/products/${productId}`);
    }
  };

  // Form submission handler
  const handleFormSubmit = async (data: ProductFormData) => {
    try {
      const updatedProduct = await updateProduct(productId, data);
      handleSuccess(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading product for editing...</p>
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

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Edit Product</h1>
          <p className="text-gray-400">Update product information</p>
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
            <li>
              <Link
                href={`/products/${product.id}`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {product.title}
              </Link>
            </li>
            <li className="text-gray-600">/</li>
            <li className="text-white">Edit</li>
          </ol>
        </nav>

        {/* Product Form */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <ProductForm
            product={product}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
            onSubmit={handleFormSubmit}
          />
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 text-center">
          <Link
            href={`/products/${product.id}`}
            className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Product Details
          </Link>
        </div>
      </div>
    </div>
  );
}