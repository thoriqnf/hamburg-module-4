// Basic types for our beginner-friendly demo
// Updated to match DummyJSON API structure exactly
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string; // API provides thumbnail, not single image
  images: string[];  // API provides array of images
  rating: number;    // API provides rating as number, not object
  stock: number;     // API provides stock information
  brand?: string;    // Optional brand from API
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string; // JWT accessToken (for backward compatibility) in response and cookies
  refreshToken: string; // refreshToken in response and cookies
}