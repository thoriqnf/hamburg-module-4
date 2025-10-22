// API calls to DummyJSON
// Simple fetch functions for beginners to understand

const BASE_URL = 'https://dummyjson.com';

// Types based on DummyJSON API structure
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  image: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const api = {
  // Authentication
  login: async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30, // optional, defaults to 60
      }),
      // Note: Removed credentials: 'include' due to CORS issues
      // We'll handle cookies manually in the login page
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    return response.json();
  },

  // Get current user info
  getCurrentUser: async () => {
    const token = getCookie('accessToken');

    const response = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      // Note: No credentials needed since we'll send Authorization header
    });

    if (!response.ok) {
      throw new Error('Failed to get user info');
    }

    return response.json();
  },

  // Users - NEW: For async testing examples
  getUsers: async (): Promise<UsersResponse> => {
    const response = await fetch(`${BASE_URL}/users`);

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json();
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await fetch(`${BASE_URL}/users/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user with ID ${id}`);
    }

    return response.json();
  },

  // Products (existing)
  getProducts: async (limit: number = 10): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/products?limit=${limit}`);

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data.products;
  },

  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return response.json();
  },

  // Search products (enhanced)
  searchProducts: async (query: string): Promise<ProductsResponse> => {
    const response = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error('Failed to search products');
    }

    return response.json();
  },

  // NEW: Error simulation for testing error states
  triggerError: async (): Promise<void> => {
    const response = await fetch(`${BASE_URL}/error`);

    if (!response.ok) {
      throw new Error('Simulated API error for testing');
    }

    return response.json();
  }
};

// Helper function to simulate delay for testing loading states
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Wrapper functions with optional delay for testing
export const apiWithDelay = {
  ...api,

  async getUsersWithDelay(ms = 1000): Promise<UsersResponse> {
    await delay(ms);
    return api.getUsers();
  },

  async getProductsDelay(limit = 10, ms = 800): Promise<Product[]> {
    await delay(ms);
    return api.getProducts(limit);
  },

  async searchProductsWithDelay(query: string, ms = 600): Promise<ProductsResponse> {
    await delay(ms);
    return api.searchProducts(query);
  },
};

// Helper function to get cookies (copied from lib/auth.ts to avoid circular imports)
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
    ?.split('=')[1] || null;
}