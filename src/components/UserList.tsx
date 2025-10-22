"use client";

import React, { useState, useEffect } from "react";
import { api, User, UsersResponse } from "@/lib/api";

type LoadingState = "idle" | "loading" | "success" | "error";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      setLoadingState("loading");
      setError(null);

      const response: UsersResponse = await api.getUsers();
      setUsers(response.users);
      setLoadingState("success");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch users";
      setError(errorMessage);
      setLoadingState("error");
    }
  };

  const fetchUserById = async (id: number) => {
    try {
      setError(null);
      const user = await api.getUserById(id);
      setSelectedUser(user);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch user";
      setError(errorMessage);
      setSelectedUser(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRefresh = () => {
    setUsers([]);
    setSelectedUser(null);
    fetchUsers();
  };

  const handleUserClick = (user: User) => {
    fetchUserById(user.id);
  };

  return (
    <div className="user-list" data-testid="user-list">
      <header>
        <h2>User List</h2>
        <button
          onClick={handleRefresh}
          disabled={loadingState === "loading"}
          data-testid="refresh-button"
        >
          {loadingState === "loading" ? "Loading..." : "Refresh"}
        </button>
      </header>

      {/* Loading State */}
      {loadingState === "loading" && (
        <div data-testid="loading-state">
          <p>Loading users...</p>
        </div>
      )}

      {/* Error State */}
      {loadingState === "error" && (
        <div data-testid="error-state" style={{ color: "red" }}>
          <p>Error: {error}</p>
          <button onClick={handleRefresh}>Try Again</button>
        </div>
      )}

      {/* Success State */}
      {loadingState === "success" && (
        <div>
          <div data-testid="users-grid">
            {users.map((user) => (
              <div
                key={user.id}
                className="user-card"
                onClick={() => handleUserClick(user)}
                style={{
                  border: "1px solid #ccc",
                  padding: "1rem",
                  margin: "0.5rem 0",
                  cursor: "pointer",
                  borderRadius: "8px",
                }}
                data-testid={`user-card-${user.id}`}
              >
                <img
                  src={user.image}
                  alt={`${user.firstName} ${user.lastName}`}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
                <div>
                  <h4>{user.firstName} {user.lastName}</h4>
                  <p>@{user.username}</p>
                  <p>{user.email}</p>
                </div>
              </div>
            ))}
          </div>

          <div data-testid="users-count">
            Total users: {users.length}
          </div>
        </div>
      )}

      {/* Selected User Details */}
      {selectedUser && (
        <div
          data-testid="selected-user"
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px"
          }}
        >
          <h3>Selected User Details</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <img
              src={selectedUser.image}
              alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <div>
              <h4>{selectedUser.firstName} {selectedUser.lastName}</h4>
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>ID:</strong> {selectedUser.id}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}