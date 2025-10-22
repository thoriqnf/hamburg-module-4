"use client";

import React, { useState, useEffect } from "react";
import { api, Product, ProductsResponse } from "@/lib/api";

type LoadingState = "idle" | "loading" | "success" | "error";

export default function ProductSearch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search query (wait 500ms after user stops typing)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Search products when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setProducts([]);
      setLoadingState("idle");
      return;
    }

    searchProducts(debouncedQuery);
  }, [debouncedQuery]);

  const searchProducts = async (query: string) => {
    try {
      setLoadingState("loading");
      setError(null);

      const response: ProductsResponse = await api.searchProducts(query);
      setProducts(response.products);
      setLoadingState("success");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to search products";
      setError(errorMessage);
      setLoadingState("error");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setProducts([]);
    setLoadingState("idle");
    setError(null);
  };

  const getUniqueCategories = () => {
    return [...new Set(products.map(product => product.category))];
  };

  return (
    <div className="product-search" data-testid="product-search">
      <header>
        <h2>Product Search</h2>
        <p>Search for products by name, description, or category</p>
      </header>

      {/* Search Input */}
      <div className="search-form" data-testid="search-form">
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products..."
            style={{
              flex: 1,
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            data-testid="search-input"
          />
          <button
            onClick={handleClearSearch}
            disabled={!searchQuery.trim()}
            data-testid="clear-button"
          >
            Clear
          </button>
        </div>

        {searchQuery && (
          <div data-testid="search-status">
            {loadingState === "loading" && "Searching..."}
            {loadingState === "success" && `Found ${products.length} products`}
            {loadingState === "error" && `Error: ${error}`}
          </div>
        )}
      </div>

      {/* Loading State */}
      {loadingState === "loading" && (
        <div data-testid="loading-state">
          <p>Searching products...</p>
        </div>
      )}

      {/* Error State */}
      {loadingState === "error" && (
        <div data-testid="error-state" style={{ color: "red" }}>
          <p>Error: {error}</p>
          <button onClick={() => searchProducts(debouncedQuery)}>
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {searchQuery.trim() === "" && loadingState === "idle" && (
        <div data-testid="empty-state" style={{ textAlign: "center", padding: "2rem" }}>
          <p>Start typing to search for products</p>
        </div>
      )}

      {/* No Results State */}
      {searchQuery.trim() !== "" && loadingState === "success" && products.length === 0 && (
        <div data-testid="no-results-state" style={{ textAlign: "center", padding: "2rem" }}>
          <p>No products found for "{debouncedQuery}"</p>
          <p>Try searching for different keywords like "phone", "laptop", or "apple"</p>
        </div>
      )}

      {/* Results State */}
      {loadingState === "success" && products.length > 0 && (
        <div>
          {/* Category Filter */}
          <div data-testid="category-filter" style={{ marginBottom: "1rem" }}>
            <h4>Categories found:</h4>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {getUniqueCategories().map((category) => (
                <span
                  key={category}
                  style={{
                    backgroundColor: "#e0e0e0",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                  }}
                  data-testid={`category-${category}`}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div data-testid="products-grid">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "1rem",
                  marginBottom: "1rem",
                  display: "flex",
                  gap: "1rem",
                }}
                data-testid={`product-card-${product.id}`}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h4>{product.title}</h4>
                  <p style={{ color: "#666", fontSize: "0.875rem" }}>
                    {product.description}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                    <span style={{ fontWeight: "bold", color: "#007bff" }}>
                      ${product.price}
                    </span>
                    <span style={{
                      backgroundColor: "#f0f0f0",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.75rem"
                    }}>
                      {product.brand}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div data-testid="results-count">
            Showing {products.length} products for "{debouncedQuery}"
          </div>
        </div>
      )}
    </div>
  );
}