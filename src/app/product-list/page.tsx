"use client";
import Headers from "@/components/Headers";
import { useCart } from "@/context/CartContext";

export default function ProductList() {
  const { items, addItem } = useCart();

  return (
    <div>
      <Headers />
      {items.map((product: any) => (
        <li key={product.id}>
          <h1>{product.name}</h1>
          <button onClick={() => addItem(product)}>add item</button>
        </li>
      ))}
    </div>
  );
}
