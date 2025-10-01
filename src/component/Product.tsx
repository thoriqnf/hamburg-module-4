import { useEffect, useState } from "react";

type Product = {
  id: string;
  title: string;
  stock: string;
  price: string;
};

function Product() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    setLoading(true);

    try {
      const response = await fetch(
        "https://64ca45bd700d50e3c7049e2f.mockapi.io/product"
      );
      if (!response.ok) throw new Error("fetch failed");
      const data = await response.json();
      console.log("data", data);
      setItems(data);
    } catch (e) {
      console.log("error", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>product page</h1>
      {items.map((item) => (
        <li key={item.id}>
          <div>
            <p>title: {item.title}</p>
            <p>price: {item.price}</p>
            <p>stock: {item.stock}</p>
          </div>
        </li>
      ))}
    </div>
  );
}

export default Product;
