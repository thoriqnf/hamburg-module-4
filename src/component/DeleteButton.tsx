"use client";
import React from "react";

function DeleteButton(id: any) {
  console.log("id", id);
  const handleDelete = async (id: any) => {
    console.log("id deleted", id);
    try {
      const res = await fetch(`https://dummyjson.com/recipes/${id.id}`, {
        method: "DELETE",
      });
      const dataDeleted = await res.json();
      console.log("dataDeleted", dataDeleted);
    } catch (e) {
      console.log("error", e);
    }
  };
  return (
    <div>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
}

export default DeleteButton;
