"use client";

import { useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";

export default function DebounceDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  // Debounce the search term with 500ms delay
  const debouncedSearchTerm = useDebounce(searchTerm, 2000);

  // Mock search function - in real app this would call an API
  const performSearch = (term: string) => {
    console.log("Searching for:", term);
    return term ? `Results for "${term}"` : "Type to search...";
  };

  const searchResults = performSearch(debouncedSearchTerm);

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>useDebounce Hook Demo</h2>
      <p style={{ color: "#666", fontSize: "14px", marginBottom: "20px" }}>
        Search waits 500ms after you stop typing. Check console for API calls!
      </p>

      <div style={{ marginBottom: "20px" }}>
        <h3>Search Input:</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to search..."
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>Current Input: "{searchTerm}"</h4>
        <h4>Debounced Value: "{debouncedSearchTerm}"</h4>
        <h4>Search Results: {searchResults}</h4>
      </div>

      <button
        onClick={() => setSearchTerm("")}
        style={{
          padding: "8px 16px",
          backgroundColor: "#666",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Clear Search
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
        • Reduces API calls from 100+ to 1-2 per search
        <br />
        • Prevents server overload from rapid typing
        <br />
        • Better UX with less unnecessary loading
        <br />
        • Saves bandwidth and processing power
        <br />• Essential for search, autocomplete, filters
      </div>
    </div>
  );
}
