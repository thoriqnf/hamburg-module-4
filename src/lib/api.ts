import { Product, ProductsResponse, ProductFormData } from '@/types/product';

const DUMMYJSON_API_BASE = 'https://dummyjson.com';

// TODO 3: Implement getProducts function to fetch all products
// This should fetch from DummyJSON and return ProductsResponse
export async function getProducts(): Promise<ProductsResponse> {
  const response = await fetch(`${DUMMYJSON_API_BASE}/products?limit=10`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
}

// TODO 4: Implement getProduct function to fetch single product
// This should fetch one product by ID from DummyJSON
export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${DUMMYJSON_API_BASE}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
}

// TODO 5: Implement createProduct function to add new product
// This should POST new product data to DummyJSON
export async function createProduct(data: ProductFormData): Promise<Product> {
  const response = await fetch(`${DUMMYJSON_API_BASE}/products/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create product');
  return response.json();
}