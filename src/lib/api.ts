import { Product, ProductsResponse, ProductFormData } from '@/types/product';
import axios from 'axios';

const DUMMYJSON_API_BASE = 'https://dummyjson.com';

// TODO 3: Implement getProducts function to fetch all products
// Use axios to fetch from DummyJSON and return ProductsResponse
export async function getProducts(): Promise<ProductsResponse> {
  // TODO: Replace this placeholder with actual axios implementation
  console.log('TODO: Implement getProducts with axios');
  return {
    products: [],
    total: 0,
    skip: 0,
    limit: 10,
  };
}

// TODO 4: Implement getProduct function to fetch single product
// Use axios to fetch one product by ID from DummyJSON
export async function getProduct(id: number): Promise<Product> {
  // TODO: Replace this placeholder with actual axios implementation
  console.log('TODO: Implement getProduct with axios');
  throw new Error('Not implemented yet');
}

// TODO 5: Implement createProduct function to add new product
// Use axios to POST new product data to DummyJSON
export async function createProduct(data: ProductFormData): Promise<Product> {
  // TODO: Replace this placeholder with actual axios implementation
  console.log('TODO: Implement createProduct with axios');
  throw new Error('Not implemented yet');
}