"use client";

// 1. import custom hooks
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useFetchProduct } from "@/hooks/useFetchProduct";

function page() {
  // 2. pakai customs yang sudah dibuat
  const [count, setCount] = useLocalStorage("dm-counter", 100);
  const { data, loading, error } = useFetchProduct();
  return (
    <div>
      <h1>local storage counter {count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <h1>halaman product</h1>
      {data.map((item: any) => (
        <h1>{item.title}</h1>
      ))}
    </div>
  );
}

export default page;
