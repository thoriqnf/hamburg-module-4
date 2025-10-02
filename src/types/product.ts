// Product types for DummyJSON API
export interface Product {
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

// TODO 1: Define form data type for creating/editing products
// This should match the fields needed for the product form
export interface ProductFormData {
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

// TODO 2: Define API response type for products list
// This should match the DummyJSON products response structure
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}