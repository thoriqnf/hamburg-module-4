"use client";

import { useToggle } from "../../../hooks/useToggle";

export default function ToggleDemo() {
  const [isOn, toggleIsOn] = useToggle(false);
  const [showContent, toggleShowContent] = useToggle(true);
  const [darkMode, toggleDarkMode, setDarkModeTrue, setDarkModeFalse] =
    useToggle(false);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "0 auto",
        backgroundColor: darkMode ? "#333" : "white",
        color: darkMode ? "white" : "black",
        minHeight: "100vh",
      }}
    >
      <h2>useToggle Hook Demo</h2>
      <p
        style={{
          color: darkMode ? "#ccc" : "#666",
          fontSize: "14px",
          marginBottom: "20px",
        }}
      >
        Simple boolean state management cleaner than useState(false).
      </p>

      <div style={{ marginBottom: "20px" }}>
        <h3>Simple Toggle: {isOn ? "ON" : "OFF"}</h3>
        <button
          onClick={toggleIsOn}
          style={{
            padding: "8px 16px",
            backgroundColor: isOn ? "#4caf50" : "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {isOn ? "Turn OFF" : "Turn ON"}
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Show/Hide Content</h3>
        <button
          onClick={toggleShowContent}
          style={{
            padding: "8px 16px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {showContent ? "Hide Content" : "Show Content"}
        </button>

        {showContent && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: darkMode ? "#555" : "#f5f5f5",
              borderRadius: "4px",
            }}
          >
            <p>This content can be toggled on and off!</p>
            <p>It's conditionally rendered based on the toggle state.</p>
          </div>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Dark Mode: {darkMode ? "Enabled" : "Disabled"}</h3>
        <div style={{ marginBottom: "10px" }}>
          <button
            onClick={toggleDarkMode}
            style={{
              marginRight: "10px",
              padding: "8px 16px",
              backgroundColor: "#ff9800",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Toggle
          </button>
          <button
            onClick={setDarkModeTrue}
            style={{
              marginRight: "10px",
              padding: "8px 16px",
              backgroundColor: "#333",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Set Dark
          </button>
          <button
            onClick={setDarkModeFalse}
            style={{
              padding: "8px 16px",
              backgroundColor: "#fff",
              color: "black",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Set Light
          </button>
        </div>
        <p style={{ fontSize: "12px", color: darkMode ? "#ccc" : "#666" }}>
          Current theme affects this entire demo!
        </p>
      </div>

      <div
        style={{
          padding: "15px",
          backgroundColor: darkMode ? "#555" : "#f5f5f5",
          borderRadius: "4px",
          fontSize: "12px",
          fontFamily: "monospace",
        }}
      >
        <strong>Benefits:</strong>
        <br />
        • Cleaner than useState(false)
        <br />
        • Built-in toggle function
        <br />
        • Optional setTrue/setFalse helpers
        <br />
        • Perfect for modals, dropdowns, themes
        <br />• Reduces boilerplate code
      </div>
    </div>
  );
}
