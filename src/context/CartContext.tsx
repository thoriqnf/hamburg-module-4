"use client";
import { useContext, createContext, useState } from "react";
// yang pertama kita buat dulu contextnya

type CartContextType = {
  items: any;
  totalItems: any;
  totalPrice: any;
  addItem: any;
};

// 1. buat context, pake createContext
const CartContext = createContext<CartContextType | undefined>(undefined);

// 2. buatin dulu providernya, isi provider apa aja?
// semua yang berhungan state /value dan function yang mengubah tersebut
export const CartProvider = ({ children }: any) => {
  const [items, setItems] = useState([
    { id: 1, name: "baju merah", price: 1000000, quantity: 1 },
    { id: 2, name: "baju ijo", price: 200000, quantity: 10 },
    { id: 3, name: "baju ungu", price: 230000, quantity: 1100 },
  ]);

  const addItem = (product: any) => {
    setItems((currentItem) => {
      const existingItem = currentItem.find((item) => item.id === product.id);
      if (existingItem) {
        return currentItem.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItem, { ...product, quantity: 1 }];
    });
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  // semua nilai dan method HARUS DIKIRIM MELALUI VALUE
  const value = { items, totalItems, totalPrice, addItem };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 3. kita buat custom hooks untuk consume level component
export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("cart provider error");
  }

  return context;
};
