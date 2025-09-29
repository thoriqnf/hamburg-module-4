"use client";
import Button from "@/component/Button";
import Counter from "@/component/Counter";
import EmailInput from "@/component/EmailInput";
import MyComponent from "@/component/MyComponent";
import Image from "next/image";

export default function Home() {
  const handleClick = () => {
    console.log("click");
  };
  return (
    <>
      <MyComponent title="Ini title" subTitle="ini subtitle" />
      <Button onClick={handleClick} variant="primary">
        Click me
      </Button>
      <Counter />
      <EmailInput />
    </>
  );
}
