import "@testing-library/jest-dom";
import { api, delay, apiWithDelay } from "../api";

// Mock global fetch for API testing
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock setTimeout for delay function
jest.useFakeTimers();

describe("API Utility Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe("api.getUsers", () => {
    test("fetches users successfully", async () => {
      const mockResponse = {
        users: [
          {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            username: "johndoe",
            image: "https://example.com/john.jpg",
          },
        ],
        total: 1,
        skip: 0,
        limit: 1,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await api.getUsers();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://dummyjson.com/users"
      );
      expect(result).toEqual(mockResponse);
    });

    test("handles API error correctly", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(api.getUsers()).rejects.toThrow("Failed to fetch users");
    });

    test("handles network error correctly", async () => {
      const networkError = new Error("Network error");
      mockFetch.mockRejectedValueOnce(networkError);

      await expect(api.getUsers()).rejects.toThrow("Network error");
    });

    test("handles JSON parsing error", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error("Invalid JSON");
        },
      });

      await expect(api.getUsers()).rejects.toThrow("Invalid JSON");
    });
  });

  describe("api.getUserById", () => {
    test("fetches user by ID successfully", async () => {
      const mockUser = {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        username: "johndoe",
        image: "https://example.com/john.jpg",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

      const result = await api.getUserById(1);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://dummyjson.com/users/1"
      );
      expect(result).toEqual(mockUser);
    });

    test("handles user not found error", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(api.getUserById(999)).rejects.toThrow(
        "Failed to fetch user with ID 999"
      );
    });

    test("handles network error when fetching user", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Connection failed"));

      await expect(api.getUserById(1)).rejects.toThrow("Connection failed");
    });
  });

  describe("api.getProducts", () => {
    test("fetches products with default limit", async () => {
      const mockProducts = [
        {
          id: 1,
          title: "iPhone 15",
          description: "Latest iPhone",
          price: 999,
          brand: "Apple",
          category: "smartphones",
          thumbnail: "https://example.com/iphone.jpg",
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ products: mockProducts }),
      });

      const result = await api.getProducts();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://dummyjson.com/products?limit=10"
      );
      expect(result).toEqual(mockProducts);
    });

    test("fetches products with custom limit", async () => {
      const mockProducts = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        title: `Product ${i + 1}`,
        description: `Description ${i + 1}`,
        price: (i + 1) * 100,
        brand: "Brand",
        category: "category",
        thumbnail: "https://example.com/product.jpg",
      }));

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ products: mockProducts }),
      });

      const result = await api.getProducts(5);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://dummyjson.com/products?limit=5"
      );
      expect(result).toHaveLength(5);
    });

    test("handles products API error", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(api.getProducts()).rejects.toThrow("Failed to fetch products");
    });
  });

  describe("api.getProduct", () => {
    test("fetches single product successfully", async () => {
      const mockProduct = {
        id: 1,
        title: "iPhone 15",
        description: "Latest iPhone",
        price: 999,
        brand: "Apple",
        category: "smartphones",
        thumbnail: "https://example.com/iphone.jpg",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct,
      });

      const result = await api.getProduct(1);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://dummyjson.com/products/1"
      );
      expect(result).toEqual(mockProduct);
    });

    test("handles product not found error", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(api.getProduct(999)).rejects.toThrow(
        "Failed to fetch product"
      );
    });
  });

  describe("api.searchProducts", () => {
    test("searches products successfully", async () => {
      const mockSearchResponse = {
        products: [
          {
            id: 1,
            title: "iPhone 15",
            description: "Latest iPhone",
            price: 999,
            brand: "Apple",
            category: "smartphones",
            thumbnail: "https://example.com/iphone.jpg",
          },
        ],
        total: 1,
        skip: 0,
        limit: 1,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSearchResponse,
      });

      const result = await api.searchProducts("iPhone");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://dummyjson.com/products/search?q=iPhone"
      );
      expect(result).toEqual(mockSearchResponse);
    });

    test("handles search with special characters", async () => {
      const mockSearchResponse = {
        products: [],
        total: 0,
        skip: 0,
        limit: 0,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSearchResponse,
      });

      const result = await api.searchProducts("iPhone & Samsung");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://dummyjson.com/products/search?q=iPhone%20%26%20Samsung"
      );
      expect(result).toEqual(mockSearchResponse);
    });

    test("handles empty search query", async () => {
      const mockSearchResponse = {
        products: [],
        total: 0,
        skip: 0,
        limit: 0,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSearchResponse,
      });

      const result = await api.searchProducts("");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://dummyjson.com/products/search?q="
      );
      expect(result).toEqual(mockSearchResponse);
    });

    test("handles search API error", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(api.searchProducts("iPhone")).rejects.toThrow(
        "Failed to search products"
      );
    });
  });

  describe("delay utility function", () => {
    test("resolves after specified time", async () => {
      const delayPromise = delay(1000);

      // Promise should not resolve immediately
      let isResolved = false;
      delayPromise.then(() => {
        isResolved = true;
      });

      expect(isResolved).toBe(false);

      // Fast-forward time
      jest.advanceTimersByTime(1000);

      await delayPromise;
      expect(isResolved).toBe(true);
    });

    test("works with zero delay", async () => {
      const delayPromise = delay(0);

      jest.advanceTimersByTime(0);
      await delayPromise;

      // Should resolve immediately with zero delay
      expect(true).toBe(true);
    });
  });

  describe("apiWithDelay", () => {
    test("getUsersWithDelay - fetches users after delay", async () => {
      const mockResponse = {
        users: [
          {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            username: "johndoe",
            image: "https://example.com/john.jpg",
          },
        ],
        total: 1,
        skip: 0,
        limit: 1,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const delayPromise = apiWithDelay.getUsersWithDelay(1000);

      // Should not have called fetch yet due to delay
      expect(mockFetch).not.toHaveBeenCalled();

      // Fast-forward time
      jest.advanceTimersByTime(1000);

      const result = await delayPromise;

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse);
    });

    test("getProductsDelay - fetches products after delay", async () => {
      const mockProducts = [
        {
          id: 1,
          title: "Test Product",
          description: "Test Description",
          price: 99,
          brand: "Test Brand",
          category: "test",
          thumbnail: "https://example.com/product.jpg",
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ products: mockProducts }),
      });

      const delayPromise = apiWithDelay.getProductsDelay(5, 1500);

      jest.advanceTimersByTime(1500);

      const result = await delayPromise;

      expect(mockFetch).toHaveBeenCalledWith(
        "https://dummyjson.com/products?limit=5"
      );
      expect(result).toEqual(mockProducts);
    });

    test("searchProductsWithDelay - searches after delay", async () => {
      const mockSearchResponse = {
        products: [
          {
            id: 1,
            title: "iPhone 15",
            description: "Latest iPhone",
            price: 999,
            brand: "Apple",
            category: "smartphones",
            thumbnail: "https://example.com/iphone.jpg",
          },
        ],
        total: 1,
        skip: 0,
        limit: 1,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSearchResponse,
      });

      const delayPromise = apiWithDelay.searchProductsWithDelay("iPhone", 800);

      jest.advanceTimersByTime(800);

      const result = await delayPromise;

      expect(mockFetch).toHaveBeenCalledWith(
        "https://dummyjson.com/products/search?q=iPhone"
      );
      expect(result).toEqual(mockSearchResponse);
    });
  });

  describe("Authentication APIs", () => {
    test("api.login - successful login", async () => {
      const mockLoginResponse = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        gender: "male",
        image: "https://example.com/avatar.jpg",
        token: "mock-jwt-token",
        refreshToken: "mock-refresh-token",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockLoginResponse,
      });

      const result = await api.login("testuser", "password123");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://dummyjson.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "testuser",
            password: "password123",
            expiresInMins: 30,
          }),
        }
      );
      expect(result).toEqual(mockLoginResponse);
    });

    test("api.login - failed login", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
      });

      await expect(api.login("wronguser", "wrongpass")).rejects.toThrow(
        "Invalid credentials"
      );
    });

    test("api.getCurrentUser - successful fetch", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        gender: "male",
        image: "https://example.com/avatar.jpg",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

      // Mock getCookie function
      const originalDocument = global.document;
      Object.defineProperty(global.document, "cookie", {
        writable: true,
        value: "accessToken=mock-token",
      });

      const result = await api.getCurrentUser();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://dummyjson.com/auth/me",
        {
          headers: {
            Authorization: "Bearer mock-token",
            "Content-Type": "application/json",
          },
        }
      );
      expect(result).toEqual(mockUser);

      // Restore original document
      global.document = originalDocument;
    });

    test("api.getCurrentUser - no token", async () => {
      const originalDocument = global.document;
      Object.defineProperty(global.document, "cookie", {
        writable: true,
        value: "",
      });

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
      });

      await expect(api.getCurrentUser()).rejects.toThrow(
        "Failed to get user info"
      );

      global.document = originalDocument;
    });
  });
});