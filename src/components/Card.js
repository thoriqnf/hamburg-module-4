"use client";
import React, { useEffect, useState } from "react";

function Card() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [count, setCount] = useState(0);
  const handleChange = (event) => {
    // const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData, // memastikan sebelum mendapat data yang baru, data yang lama tetap sesuai
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("clicked submit", formData);
  };

  useEffect(() => {
    console.log("run every re-render");
  }, [count]);

  // 1. useEffect hanya akan pernah jalan 1x seumur hidup
  // useEffect(() => {
  //   console.log("Mounting");
  // }, []);

  // 2. useEffect akan jalan setiap ada re render terjadi
  // useEffect(() => {
  //   console.log("run every re-render");
  // });

  // 3. useEffect bisa berjalan sesuai kebutuhan berdasarkan watchlist

  return (
    <div>
      <h1>Card</h1>

      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>increment</button>
      </div>

      <div>
        <h1>Form Components</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.name}
            name="name"
            placeholder="type name here"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="type email here"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="type password here"
            onChange={handleChange}
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Card;
