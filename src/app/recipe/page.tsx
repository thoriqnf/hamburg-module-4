// "use client";
import React from "react";
import Image from "next/image";
import StateX from "@/components/StateX";
import Link from "next/link";
import DeleteButton from "@/component/DeleteButton";

// halaman awal kita beri SSR

async function getRandomRecipes() {
  try {
    // limit gunanya untuk membatasi total data yang diminta
    // kalo offset untuk apa?
    // data ini kan dipotong, misal potong 10. Artinya akan dapat data 1-10
    // kalau mau ambil data dari 25 ke 34 bagaimana?
    // ternyata setelah baca dokumentasi kita menggunakan skip untuk pengganti offset dan pagination
    // sort biasanya akan membutuhkan 2 parameter, data apa yang mau di sort dan arah sortnya
    const response = await fetch(
      "https://dummyjson.com/recipes?sortBy=userId&order=asc"
    );
    // optional untuk tangkap error jika gagal fetch
    if (!response.ok) throw new Error("Failed to fetch recipes from API");

    const data = await response.json();
    console.log("data server", data);

    return data;

    // nanti kita akan pilih random recipesnya
  } catch (error) {
    console.log("error", error);
  }
}

export default async function page() {
  const randomRecipes = await getRandomRecipes();
  // const recipes = randomRecipes?.recipes;

  // console.log("random", recipes);

  return (
    <div>
      <h1>Halaman landing page receipe</h1>
      <StateX />

      {randomRecipes.recipes?.map((item: any) => (
        // key selalu beri ke parent tempat mapping
        <div key={item.id}>
          <h1>{item.name}</h1>
          <h1>{item.rating}</h1>
          <Image src={item.image} alt="image recipe" width={200} height={200} />
          {/* <button
            onClick={() => {
              router.push(`/products/${item.id}/editpage`);
            }}
          >
            edit
          </button> */}
          <Link href={`/recipe/${item.id}/edit`}>edit</Link>
          <DeleteButton id={item.id} />
        </div>
      ))}
    </div>
  );
}

// bagaimana step by step kita buat fitur edit data
// 1. kita ambil data dari id terserbut, artinya kita akan ambil get by id, dibagian sini kita bisa taroh form ke modal atau ke halaman lain atau paling gampang masukin prompt
// 2. setelah get by id kita perlu pasang ke componentnya dahulu
// 3. kita melakukan change event data formnya
// 4. kita akan kirim datanya menggunakan method PUT

// useRouter itu hanya bisa dipakai di CSR
// Jika component itu adalah SSR harus menggunakan LINK
// Kalau memang mau pakai CSR apakah bisa?
