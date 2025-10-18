"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product } from '@/types';

// Cart context type definition
type CartContextType = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product | CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Add item to cart
  const addItem = (product: Product | CartItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Item exists, increase quantity
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // New item, add to cart
        return [...currentItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  // Update item quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
  };

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Context value
  const value = {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};