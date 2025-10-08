"use client";
import React, { useEffect, useState } from "react";

function StateX() {
  let [x, setX] = useState(0);
  useEffect(() => {
    console.log("effect");
  });
  x = 5;
  console.log("x", x);
  return <div>StateX</div>;
}

export default StateX;

// dalam page csr apakah boleh ada SSR
