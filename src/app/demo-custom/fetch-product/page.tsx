"use client";
import React from "react";
import { useFetchProduct } from "@/hooks/useFetchProduct";

function page() {
  const { data, loading, error } = useFetchProduct();
  return (
    <div>
      <h1>halaman product</h1>
      {data.map((item: any) => (
        <h1>{item.title}</h1>
      ))}
    </div>
  );
}

export default page;
