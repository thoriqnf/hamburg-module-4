"use client";
import { useForm } from "react-hook-form";

type ProductForm = {
  title: string;
  price: number | string;
  stock: number;
};

function Input() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>();

  const onSubmitFunction = async (values: ProductForm) => {
    console.log("values", values);

    try {
      const response = await fetch(
        "https://64ca45bd700d50e3c7049e2f.mockapi.io/product",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: values.title,
            price: values.price,
            stock: values.stock,
          }),
        }
      );

      if (!response.ok) throw new Error("post failed");
      const data = await response.json();
      console.log("data", data);
    } catch (e) {}
  };

  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <input
          {...register("title", {
            required: "title required",
            minLength: { value: 5, message: "Minimum 5 karakter bos" },
          })}
          placeholder="Isi title"
        />
        {errors.title && <p>{errors.title.message}</p>}
        <input
          type="number"
          {...register("price", {
            required: "price required",
            validate: (item) => Number(item) >= 0 || "price must be >= 0",
          })}
          placeholder="Isi price"
        />
        {errors.price && <p>{errors.price.message}</p>}
        <input {...register("stock")} placeholder="Isi stock" />

        <button>Submit</button>
      </form>
    </div>
  );
}

export default Input;
