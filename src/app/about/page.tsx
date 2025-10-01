"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";

function about() {
  const router = useRouter();
  console.log("router", router);

  return (
    <div>
      <h1>about</h1>
      <a href="https://www.google.com">Go to goole.com</a>
      <button onClick={() => router.push("/about/me")}>go to me page</button>
    </div>
  );
}

export default about;
