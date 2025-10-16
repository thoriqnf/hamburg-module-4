"use client";
import { useCart } from "@/context/CartContext";

export default function Headers() {
  // 5. tinggal consume level component yang sudah dibuatkan hooks nya
  const { items, totalItems, totalPrice } = useCart();

  console.log("total items", totalItems);
  return (
    <div>
      <h1>total belanjaan anda</h1>
      <h1>total item {totalItems}</h1>
      <h1>total price {totalPrice}</h1>
    </div>
  );
}
