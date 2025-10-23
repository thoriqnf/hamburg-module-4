import { rest } from "msw";

// DummyJSON API base URL
const API_BASE = "https://dummyjson.com";

// Mock users data
const mockUsers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    image: "https://dummyjson.com/icon/johndoe/128",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    username: "janesmith",
    image: "https://dummyjson.com/icon/janesmith/128",
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@example.com",
    username: "bobjohnson",
    image: "https://dummyjson.com/icon/bobjohnson/128",
  },
];

// Mock products data
const mockProducts = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    description: "Latest iPhone with advanced features",
    price: 999,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://dummyjson.com/image/300",
  },
  {
    id: 2,
    title: "Samsung Galaxy S24",
    description: "Premium Android smartphone",
    price: 899,
    brand: "Samsung",
    category: "smartphones",
    thumbnail: "https://dummyjson.com/image/300",
  },
  {
    id: 3,
    title: "MacBook Pro",
    description: "Powerful laptop for professionals",
    price: 1999,
    brand: "Apple",
    category: "laptops",
    thumbnail: "https://dummyjson.com/image/300",
  },
];

// MSW handlers for API endpoints
export const handlers = [
  // GET /users - Get all users
  rest.get(`${API_BASE}/users`, (req, res, ctx) => {
    // Simulate network delay
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        users: mockUsers,
        total: mockUsers.length,
        skip: 0,
        limit: mockUsers.length,
      }),
    );
  }),

  // GET /users/:id - Get user by ID
  rest.get(`${API_BASE}/users/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const user = mockUsers.find((u) => u.id === parseInt(id as string));

    if (!user) {
      return res(ctx.status(404), ctx.json({ message: "User not found" }));
    }

    return res(ctx.delay(500), ctx.status(200), ctx.json(user));
    // kalau nanti backend punya banyak status code, nanti harus diikutin semua status code yang ada
  }),

  // GET /products/search - Search products
  rest.get(`${API_BASE}/products/search`, (req, res, ctx) => {
    const query = req.url.searchParams.get("q") || "";

    const filteredProducts = mockProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()),
    );

    return res(
      ctx.delay(800),
      ctx.status(200),
      ctx.json({
        products: filteredProducts,
        total: filteredProducts.length,
        skip: 0,
        limit: filteredProducts.length,
      }),
    );
  }),

  // GET /products - Get all products
  rest.get(`${API_BASE}/products`, (req, res, ctx) => {
    const limit = parseInt(req.url.searchParams.get("limit") || "10");
    const skip = parseInt(req.url.searchParams.get("skip") || "0");

    const paginatedProducts = mockProducts.slice(skip, skip + limit);

    return res(
      ctx.delay(600),
      ctx.status(200),
      ctx.json({
        products: paginatedProducts,
        total: mockProducts.length,
        skip,
        limit,
      }),
    );
  }),

  // Simulate API error for testing error states
  rest.get(`${API_BASE}/error`, (req, res, ctx) => {
    return res(
      ctx.delay(300),
      ctx.status(500),
      ctx.json({ message: "Internal Server Error" }),
    );
  }),
];

// Error handlers for testing error scenarios
export const errorHandlers = [
  // Handler that always returns an error
  rest.get(`${API_BASE}/users`, (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.status(500),
      ctx.json({ message: "Failed to fetch users" }),
    );
  }),
];

// Slow handlers for testing loading states
// kenapa slow harus ditesting juga
// karena slow itu sangat possible terjadi
// hasilnya ada kemungkinan aplikasinya RTO, request time out

export const slowHandlers = [
  // Handler with very slow response for testing loading states
  rest.get(`${API_BASE}/users`, (req, res, ctx) => {
    return res(
      ctx.delay(5000), // 5 second delay
      ctx.status(200),
      ctx.json({
        users: mockUsers,
        total: mockUsers.length,
        skip: 0,
        limit: mockUsers.length,
      }),
    );
  }),
];

// jest hanya bisa digunakan untuk testing js
// untuk testing react harus pakai react testing library
// untuk testing mock api harus menggunakan MSW
