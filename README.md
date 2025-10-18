# 🛍️ Shop & Learn - Beginner React Demo

A clean, beginner-friendly React demo showcasing authentication, API integration, and shopping cart functionality. Perfect for learning React hooks, state management, and modern web development concepts.

## 🎯 What You'll Learn

### React Fundamentals
- **useState** - Form inputs and cart state management
- **useEffect** - Data fetching and side effects
- **useContext** - Global state management for shopping cart
- **TypeScript** - Type safety and better development experience

### Modern Web Development
- **Next.js 15** - React framework with App Router
- **API Integration** - Working with DummyJSON REST API
- **Authentication** - Cookie-based login system
- **Responsive Design** - Mobile-first with Tailwind CSS

## 🚀 Features

### 🔐 Authentication
- Cookie-based login using DummyJSON API
- Demo credentials pre-filled for convenience
- Route protection - redirects unauthenticated users
- Automatic logout and session management

### 🛒 Shopping Cart
- Add/remove products from cart
- Real-time cart item count and total calculation
- Floating cart button with sliding panel
- Context API for state management

### 📱 Product Catalog
- Product listing from DummyJSON API
- Search functionality
- Product cards with images, prices, and ratings
- Responsive grid layout

## 🛠 Tech Stack

- **Frontend**: React 19, Next.js 15, TypeScript
- **Styling**: Tailwind CSS
- **API**: DummyJSON (free fake API for testing)
- **State Management**: React Context API
- **Authentication**: Browser cookies

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Landing page with hero section
│   ├── login/page.tsx    # Simple login form
│   ├── products/page.tsx # Products listing page
│   └── layout.tsx        # Root layout with CartProvider
├── components/
│   ├── LoginButton.tsx   # Reusable login button
│   ├── ProductCard.tsx   # Product display component
│   └── CartButton.tsx    # Floating cart with sidebar
├── context/
│   └── CartContext.tsx   # Cart state management
├── lib/
│   ├── auth.ts          # Cookie helpers and auth utilities
│   └── api.ts           # API calls to DummyJSON
└── types/
    └── index.ts         # TypeScript type definitions
```

## 🎮 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Credentials

- **Username**: `emilys`
- **Password**: `emilyspass`

These are pre-filled in the login form for your convenience!

## 📚 Learning Path

### 1. Understanding the Project Structure
Start by exploring the file structure to understand how React components, contexts, and utilities are organized.

### 2. Authentication Flow
Study the `login/page.tsx` to understand:
- Form handling with useState
- API calls with async/await
- Cookie management
- Route protection

### 3. Product Catalog
Examine `products/page.tsx` to learn:
- Data fetching and loading states
- Search functionality
- Grid layouts with Tailwind CSS
- Error handling

### 4. Shopping Cart
Explore `context/CartContext.tsx` to understand:
- React Context API
- State management patterns
- Cart operations (add, remove, update)

### 5. Component Design
Review the components to learn:
- Reusable component design
- Props and TypeScript interfaces
- Event handling
- Conditional rendering

## 🔍 Key Concepts Explained

### Cookie-Based Authentication
This demo uses browser cookies for authentication storage:
- Simple and effective for learning purposes
- No complex JWT handling required
- Automatic expiration and cleanup

### Context API for State Management
The shopping cart uses React Context to share state across components:
- Avoids prop drilling
- Centralized state management
- Easy to understand for beginners

### API Integration with DummyJSON
Uses DummyJSON - a free fake API for testing:
- No setup required
- Real API responses
- Perfect for learning fetch, async/await, and error handling

## 🎨 Styling with Tailwind CSS

This project uses Tailwind CSS for modern, responsive styling:
- Utility-first CSS framework
- Mobile-first responsive design
- Consistent design system
- Fast development without writing custom CSS

## 🚀 Next Steps

After understanding this demo, you can explore:
- More complex state management (Redux, Zustand)
- Database integration
- Payment processing
- User profiles and preferences
- Product categories and filtering
- Order history and tracking

## 🛠 Build & Deploy

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## 📝 Notes

- This is a learning demo, not a production-ready e-commerce site
- Uses browser cookies for simplicity - real apps would use more secure methods
- DummyJSON API is read-only except for authentication
- Focus is on teaching React concepts, not e-commerce functionality

## 🤝 Contributing

This is a learning project. Feel free to:
- Fork and modify
- Add new features
- Improve the documentation
- Report issues

## 📄 License

MIT License - feel free to use this for learning purposes!

---

**Happy Learning! 🎓**