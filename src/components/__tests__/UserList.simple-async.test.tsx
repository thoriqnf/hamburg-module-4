/**
 * Simple Async Testing Examples - Alternative to MSW
 * These tests show how to test async components without complex setup
 */
import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserList from "../UserList";
import { api } from "@/lib/api";

// Mock the API module (similar to first approach but with different scenarios)
jest.mock("@/lib/api");
const mockApi = api as jest.Mocked<typeof api>;

describe("UserList Component - Simple Async Testing Examples", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows realistic loading behavior with delay", async () => {
    // Simulate network delay
    mockApi.getUsers.mockImplementation(
      () => new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            users: [
              {
                id: 1,
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                username: "johndoe",
                image: "https://dummyjson.com/icon/johndoe/128",
              },
            ],
            total: 1,
            skip: 0,
            limit: 1,
          });
        }, 1500); // 1.5 second delay
      })
    );

    render(<UserList />);

    // Should show loading state immediately
    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
    expect(screen.getByTestId("refresh-button")).toBeDisabled();

    // Should still be loading after 1 second
    await waitFor(
      () => {
        expect(screen.getByTestId("loading-state")).toBeInTheDocument();
      },
      { timeout: 1200 }
    );

    // Should complete loading after 2 seconds
    await waitFor(
      () => {
        expect(screen.getByTestId("users-grid")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    expect(screen.getByText("Total users: 1")).toBeInTheDocument();
  });

  test("handles real-world retry scenario", async () => {
    // Simulate failure first, then success
    let callCount = 0;
    mockApi.getUsers.mockImplementation(() => {
      callCount++;
      if (callCount === 1) {
        return Promise.reject(new Error("Network timeout"));
      }
      return Promise.resolve({
        users: [
          {
            id: 1,
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            username: "janesmith",
            image: "https://dummyjson.com/icon/janesmith/128",
          },
        ],
        total: 1,
        skip: 0,
        limit: 1,
      });
    });

    render(<UserList />);

    // Wait for error
    await waitFor(() => {
      expect(screen.getByTestId("error-state")).toBeInTheDocument();
    });

    expect(screen.getByText("Error: Network timeout")).toBeInTheDocument();

    // Click retry
    fireEvent.click(screen.getByText("Try Again"));

    // Wait for success
    await waitFor(() => {
      expect(screen.getByTestId("users-grid")).toBeInTheDocument();
    });

    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  test("simulates paginated user loading", async () => {
    // Simulate paginated response
    mockApi.getUsers.mockResolvedValue({
      users: Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        firstName: `User${i + 1}`,
        lastName: `Test`,
        email: `user${i + 1}@test.com`,
        username: `user${i + 1}test`,
        image: `https://dummyjson.com/icon/user${i + 1}/128`,
      })),
      total: 100,
      skip: 0,
      limit: 50,
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByTestId("users-grid")).toBeInTheDocument();
    });

    expect(screen.getByText("Total users: 50")).toBeInTheDocument();

    // Verify first few users
    expect(screen.getByText("User1 Test")).toBeInTheDocument();
    expect(screen.getByText("User2 Test")).toBeInTheDocument();
    expect(screen.getByTestId("user-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("user-card-50")).toBeInTheDocument();
  });

  test("tests debounced user selection", async () => {
    mockApi.getUsers.mockResolvedValue({
      users: [
        {
          id: 1,
          firstName: "Alice",
          lastName: "Johnson",
          email: "alice@example.com",
          username: "alicej",
          image: "https://dummyjson.com/icon/alice/128",
        },
      ],
      total: 1,
      skip: 0,
      limit: 1,
    });

    // Simulate slow user details API
    mockApi.getUserById.mockImplementation(
      () => new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: 1,
            firstName: "Alice",
            lastName: "Johnson",
            email: "alice@example.com",
            username: "alicej",
            image: "https://dummyjson.com/icon/alice/128",
          });
        }, 800);
      })
    );

    render(<UserList />);

    // Wait for users to load
    await waitFor(() => {
      expect(screen.getByTestId("users-grid")).toBeInTheDocument();
    });

    // Click user
    fireEvent.click(screen.getByTestId("user-card-1"));

    // Should not show details immediately (API delay)
    expect(screen.queryByTestId("selected-user")).not.toBeInTheDocument();

    // Should show details after delay
    await waitFor(
      () => {
        expect(screen.getByTestId("selected-user")).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    // Check within selected user details section to avoid ambiguity
    const selectedUserSection = screen.getByTestId("selected-user");
    expect(selectedUserSection).toHaveTextContent("Alice Johnson");
  });

  test("handles concurrent API calls safely", async () => {
    let resolveUsers: (value: any) => void;
    const usersPromise = new Promise((resolve) => {
      resolveUsers = resolve;
    });

    mockApi.getUsers.mockReturnValue(usersPromise);

    render(<UserList />);

    // Click refresh multiple times before initial load completes
    fireEvent.click(screen.getByTestId("refresh-button"));
    fireEvent.click(screen.getByTestId("refresh-button"));

    // Resolve the original promise
    resolveUsers({
      users: [
        {
          id: 1,
          firstName: "Bob",
          lastName: "Wilson",
          email: "bob@example.com",
          username: "bobw",
          image: "https://dummyjson.com/icon/bob/128",
        },
      ],
      total: 1,
      skip: 0,
      limit: 1,
    });

    // Should eventually show users
    await waitFor(() => {
      expect(screen.getByTestId("users-grid")).toBeInTheDocument();
    });

    expect(screen.getByText("Bob Wilson")).toBeInTheDocument();
  });

  test("simulates real network conditions", async () => {
    // Simulate very slow network
    mockApi.getUsers.mockImplementation(
      () => new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            users: [
              {
                id: 1,
                firstName: "Slow",
                lastName: "Loader",
                email: "slow@load.com",
                username: "slowload",
                image: "https://dummyjson.com/icon/slow/128",
              },
            ],
            total: 1,
            skip: 0,
            limit: 1,
          });
        }, 3000); // 3 second delay
      })
    );

    render(<UserList />);

    // Show loading state
    expect(screen.getByTestId("loading-state")).toBeInTheDocument();

    // Can test timeout behavior
    const startTime = Date.now();

    await waitFor(() => {
      expect(screen.getByTestId("users-grid")).toBeInTheDocument();
    }, { timeout: 5000 });

    const endTime = Date.now();
    const loadTime = endTime - startTime;

    // Should take at least 3 seconds
    expect(loadTime).toBeGreaterThan(2500);
    expect(screen.getByText("Slow Loader")).toBeInTheDocument();
  });
});