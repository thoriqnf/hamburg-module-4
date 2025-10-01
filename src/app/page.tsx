"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Halaman Home</h1>
      <Link href="/about">Go to abouts</Link>
      <a href="/about">Go to abouts</a>
    </>
  );
}
