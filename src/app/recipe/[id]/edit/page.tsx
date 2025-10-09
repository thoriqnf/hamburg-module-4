"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

function page() {
  const [form, setForm] = useState({});
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");

  const params = useParams();
  const recipesId = params.id;

  const getRecipesById = async () => {
    const response = await fetch(`https://dummyjson.com/recipes/${recipesId}`);
    const data = await response.json();
    setForm(data);
    setName(data.name || "");
    setRating(data.rating || "");
  };

  console.log("form", form);

  useEffect(() => {
    getRecipesById();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit clicked");
    try {
      const res = await fetch(`https://dummyjson.com/recipes/${recipesId}`, {
        method: "PUT",
        // headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          rating: rating,
        }),
      });
      const updated = await res.json();
      console.log("updated", updated);
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <div>
      <h1>Halaman Edit</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default page;

// kenapa pakai useParams
// http://localhost:3000/recipe/27/edit
// params itu untuk ambil /27 dan params dipakai untuk datanya getById
