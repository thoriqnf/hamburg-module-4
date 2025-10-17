"use client";

import { useState } from "react";
import { usePrevious } from "../../../hooks/usePrevious";

export default function PreviousDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#0070f3");

  // Get previous values
  const prevCount = usePrevious(count);
  const prevName = usePrevious(name);
  const prevColor = usePrevious(color);

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>usePrevious Hook Demo</h2>
      <p style={{ color: "#666", fontSize: "14px", marginBottom: "20px" }}>
        Shows the previous value before it changed. Useful for comparisons!
      </p>

      <div style={{ marginBottom: "20px" }}>
        <h3>Counter: {count}</h3>
        <p style={{ fontSize: "14px", color: "#666" }}>
          Previous: {prevCount !== undefined ? prevCount : "(none)"}
        </p>
        {count !== prevCount && prevCount !== undefined && (
          <p style={{ fontSize: "12px", color: "#0070f3" }}>
            Changed from {prevCount} to {count}
          </p>
        )}
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Increment
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Name Input:</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type your name..."
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <p style={{ fontSize: "14px", color: "#666" }}>
          Previous: {prevName || "(empty)"}
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Color Picker:</h3>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ width: "100px", height: "40px" }}
        />
        <div
          style={{
            marginTop: "10px",
            padding: "20px",
            backgroundColor: color,
            color: "white",
            textAlign: "center",
            borderRadius: "4px",
          }}
        >
          Current: {color}
          <br />
          Previous: {prevColor || "(none)"}
        </div>
      </div>

      <button
        onClick={() => {
          setCount(0);
          setName("");
          setColor("#0070f3");
        }}
        style={{
          padding: "8px 16px",
          backgroundColor: "#666",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Reset All
      </button>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
          fontSize: "12px",
          fontFamily: "monospace",
        }}
      >
        <strong>Performance Benefits:</strong>
        <br />
        • Track changes without extra re-renders
        <br />
        • Compare current vs previous values
        <br />
        • Trigger actions only on value changes
        <br />
        • Useful for animations, validations
        <br />• Lightweight - just uses useRef
      </div>
    </div>
  );
}
