"use client";
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState<number>(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("event", e);
    setCount(count + 1);
  };
  return (
    <div>
      <h1>Counter {count}</h1>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

export default Counter;
