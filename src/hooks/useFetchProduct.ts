"use client";
import { useEffect, useState } from "react";

export function useFetchProduct() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("data", data);

  const fetchProduct = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) throw new Error("fetch gagal");

      const result = await response.json();
      setData(result.products);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return { data, loading, error };
}
