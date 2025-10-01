"use client";
import { useRef } from "react";

function Uncontrolled() {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <input type="text" ref={ref} placeholder="Ketik nama anda disini" />
      <button onClick={() => alert(`hello my name ${ref.current?.value}`)}>
        Ok
      </button>
    </div>
  );
}

export default Uncontrolled;
