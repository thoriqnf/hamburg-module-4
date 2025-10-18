import { getCookie } from "./auth";

const BASE_URL = "https://dummyjson.com";

export const api = {
  login: async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30,
      }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    return response.json();
  },

  getCurrentUser: async () => {
    const token = getCookie("accessToken");

    const response = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user info");
    }

    return response.json();
  },

  getProducts: async (limit: number = 10) => {
    const response = await fetch(`${BASE_URL}/products?limit=${limit}`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data.products;
  },

  getProduct: async (id: number) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    return response.json();
  },

  searchProducts: async (query: string) => {
    const response = await fetch(`${BASE_URL}/products/search?q=${query}`);

    if (!response.ok) {
      throw new Error("Failed to search products");
    }

    const data = await response.json();
    return data.products;
  },
};

// function getCookie(name: string): string | null {
//   if (typeof document === 'undefined') return null;
//   return document.cookie
//     .split('; ')
//     .find(row => row.startsWith(`${name}=`))
//     ?.split('=')[1] || null;
// }
