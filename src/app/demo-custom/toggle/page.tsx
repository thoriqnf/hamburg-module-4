"use client";
import { useToggle } from "../../../hooks/useToggle";

function page() {
  const [isOn, toggleIsOn] = useToggle(false);
  return (
    <div>
      <h1>use toggle {isOn ? "mati lampu" : "nyala lampu"}</h1>
      <button onClick={toggleIsOn}>button toggle</button>
    </div>
  );
}

export default page;
