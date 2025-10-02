# Product CRUD Demo - Next.js Tutorial

A complete product management demo built with Next.js 15, TypeScript, and Tailwind CSS. This demo teaches essential CRUD operations using the DummyJSON API.

## 🎯 Learning Objectives

- **Next.js App Router** - Dynamic routing and layouts
- **TypeScript** - Type safety and interfaces
- **Data Fetching** - API integration with error handling
- **Forms** - React Hook Form with validation
- **State Management** - useState and useEffect hooks
- **Styling** - Dark theme with Tailwind CSS

## 📋 Prerequisites

- Node.js 18+ installed
- Basic understanding of React and TypeScript
- Code editor (VS Code recommended)

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── types/
│   └── product.ts          # Product type definitions
├── lib/
│   └── api.ts              # API functions for DummyJSON
├── component/
│   ├── ProductCard.tsx     # Product card component
│   ├── ProductList.tsx     # Product listing component
│   ├── ProductForm.tsx     # Product form component
│   └── ProductDetail.tsx   # Product detail component
└── app/
    ├── products/
    │   ├── page.tsx            # Products listing page
    │   ├── create/page.tsx     # Create product page
    │   └── [id]/
    │       ├── page.tsx        # Product detail page
    │       └── edit/page.tsx   # Edit product page
    └── layout.tsx             # Root layout
```

## 🛠 Tutorial Steps

### Step 1: Complete the API Functions (`src/lib/api.ts`)
- Implement `getProducts()` to fetch all products
- Implement `getProduct()` to fetch a single product
- Implement `createProduct()` to add a new product

### Step 2: Build the Product Card (`src/component/ProductCard.tsx`)
- Add delete handler with confirmation dialog
- Calculate and display discounted prices
- Implement discount badge display

### Step 3: Create the Product List (`src/component/ProductList.tsx`)
- Implement `fetchProducts()` with error handling
- Add useEffect to fetch products on mount
- Add delete handler to remove products from state

### Step 4: Complete the Product Form (`src/component/ProductForm.tsx`)
- Implement form submission with validation
- Add error handling and success states
- Connect with React Hook Form

### Step 5: Build Product Detail View (`src/component/ProductDetail.tsx`)
- Add useEffect to fetch product data
- Implement loading and error states
- Calculate discounted prices

### Step 6: Complete the Pages
- **Products Page** (`src/app/products/page.tsx`)
  - Add search functionality
  - Connect ProductList component

- **Product Detail Page** (`src/app/products/[id]/page.tsx`)
  - Add product ID validation
  - Connect ProductDetail component

- **Create Product Page** (`src/app/products/create/page.tsx`)
  - Add success handler
  - Connect ProductForm component

- **Edit Product Page** (`src/app/products/[id]/edit/page.tsx`)
  - Add product data fetching
  - Connect ProductForm component with existing data

## 🔧 Available Features

### ✅ Completed
- Dark theme styling with Tailwind CSS
- Component structure and routing
- Form validation with React Hook Form
- Error handling and loading states
- Responsive design

### 📝 TODO Items (Complete these during the demo)
1. **API Functions** - Complete DummyJSON integration
2. **ProductCard** - Add delete handler and discount display
3. **ProductList** - Add product fetching and state management
4. **ProductForm** - Complete form submission and validation
5. **ProductDetail** - Add data fetching and error handling
6. **Page Components** - Connect all components and add navigation

## 🌐 API Integration

This demo uses **DummyJSON** - a free fake API for testing and prototyping:

- **Base URL**: `https://dummyjson.com`
- **Products Endpoint**: `/products`
- **Single Product**: `/products/{id}`
- **Create Product**: `/products/add`

No API key required!

## 🎨 Styling

- **Dark Theme** - Complete dark mode design
- **Tailwind CSS** - Utility-first styling
- **Responsive** - Mobile-first approach
- **Components** - Reusable UI components

## 🚀 Routes

- `/` - Home page
- `/products` - Product listing with search
- `/products/create` - Create new product
- `/products/{id}` - Product details
- `/products/{id}/edit` - Edit existing product

## 💡 Tips for the Demo

1. **Start with API functions** - Get data flowing first
2. **Test each component** - Verify functionality before moving on
3. **Use browser dev tools** - Check network requests and console
4. **Follow the TODOs** - They're numbered in learning order
5. **Ask questions** - Each TODO teaches a specific concept

## 🎯 Expected Outcome

After completing all TODO items, you'll have:
- Fully functional product CRUD application
- Understanding of Next.js App Router
- Experience with TypeScript and API integration
- Working knowledge of React Hook Form
- Complete dark-themed UI with Tailwind CSS

---

## 📂 Branch Structure

- **`starter` branch** - Incomplete code with TODOs (current branch)
- **`finish` branch** - Completed working code (after demo)

## 🏁 Current Status: Starter Branch

This branch contains the **incomplete starter code** with TODOs for you to complete during the demo. All pages load without errors, but the functionality needs to be implemented by following the numbered TODO items.

## 🔗 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DummyJSON API](https://dummyjson.com/)

---

**Happy coding!** 🎉

This demo is designed to be completed in approximately 2 hours, providing hands-on experience with modern web development tools and patterns.
