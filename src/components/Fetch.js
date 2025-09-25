"use client";
import React, { useEffect, useState } from "react";

function Fetch() {
  const [data, setData] = useState([]);

  async function fetchingData() {
    try {
      const response = await fetch("https://dummyjson.com/products");
      console.log("response", response);
      const result = await response.json();
      setData(result.products);
      console.log("result", result);
    } catch (error) {
      console.log("error", error);
    }
  }
  // cara 1
  // fetchingData();

  // cara 2
  useEffect(() => {
    fetchingData();
  }, []);

  console.log("data", data);
  return (
    <div>
      <h1>Fetch</h1>
      {data.map((item) => {
        return <div>{item.title}</div>;
      })}
    </div>
  );
}

export default Fetch;
