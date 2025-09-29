"use client";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: string;
}

function Button({ children, onClick, variant }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

export default Button;
