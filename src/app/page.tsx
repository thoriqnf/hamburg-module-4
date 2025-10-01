"use client";

import Input from "@/component/Input";
import Uncontrolled from "@/component/Uncontrolled";
import Link from "next/link";

export default function Home() {
  console.log("tes");
  return (
    <>
      <h1>Halaman Home</h1>
      <Link href="/about">Go to abouts</Link>
      <a href="/about">Go to abouts</a>

      <div>
        <h1>new</h1>
        <Input />
      </div>
    </>
  );
}
