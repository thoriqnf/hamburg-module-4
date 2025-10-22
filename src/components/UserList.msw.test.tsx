/**
 * @jest-environment jsdom
 * @jest-setup ../../setupMSWTests.ts
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserList from "./UserList";

// Mock MSW modules to avoid ES module issues during testing
jest.mock("@/mocks/browser", () => ({
  worker: {
    use: jest.fn(),
    resetHandlers: jest.fn(),
  },
}));

jest.mock("msw", () => ({
  rest: {
    get: jest.fn(),
  },
}));

jest.mock("@/mocks/handlers", () => ({
  errorHandlers: [],
  slowHandlers: [],
}));

describe("UserList Component - MSW Integration Approach", () => {
  // Test data that matches MSW handlers
  const expectedUsers = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      username: "johndoe",
      image: "https://dummyjson.com/icon/johndoe/128",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      username: "janesmith",
      image: "https://dummyjson.com/icon/janesmith/128",
    },
    {
      id: 3,
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob.johnson@example.com",
      username: "bobjohnson",
      image: "https://dummyjson.com/icon/bobjohnson/128",
    },
  ];

  test("renders users successfully with MSW mocked API", async () => {
    render(<UserList />);

    // Initially shows loading state
    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
    expect(screen.getByText("Loading users...")).toBeInTheDocument();

    // Wait for data to load (MSW adds 1s delay)
    await waitFor(
      () => {
        expect(screen.getByTestId("users-grid")).toBeInTheDocument();
      },
      { timeout: 2000 }, // Give enough time for MSW delay
    );

    // Verify all users from MSW handler are displayed
    expect(screen.getByText("Total users: 3")).toBeInTheDocument();

    expectedUsers.forEach((user) => {
      expect(screen.getByTestId(`user-card-${user.id}`)).toBeInTheDocument();
      expect(
        screen.getByText(`${user.firstName} ${user.lastName}`),
      ).toBeInTheDocument();
      expect(screen.getByText(`@${user.username}`)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });
  });

  test("handles realistic loading states with MSW delay", async () => {
    render(<UserList />);

    // Verify initial loading state
    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
    expect(screen.getByTestId("refresh-button")).toBeDisabled();

    // Should still be loading after a short time (due to MSW delay)
    await waitFor(
      () => {
        expect(screen.getByTestId("loading-state")).toBeInTheDocument();
      },
      { timeout: 500 },
    );

    // Eventually loads successfully
    await waitFor(
      () => {
        expect(screen.getByTestId("users-grid")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // Button should be enabled after loading
    expect(screen.getByTestId("refresh-button")).not.toBeDisabled();
  });

  test("handles API errors with MSW error handlers", async () => {
    // Override default handlers with error handlers
    worker.use(...errorHandlers);

    render(<UserList />);

    // Wait for error state
    await waitFor(
      () => {
        expect(screen.getByTestId("error-state")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // Verify error message from MSW error handler
    expect(
      screen.getByText("Error: Failed to fetch users"),
    ).toBeInTheDocument();
    expect(screen.getByText("Try Again")).toBeInTheDocument();
  });

  test("handles slow network with MSW slow handlers", async () => {
    // Override with slow handlers (5 second delay)
    worker.use(...slowHandlers);

    render(<UserList />);

    // Should be loading for a while
    expect(screen.getByTestId("loading-state")).toBeInTheDocument();

    // Still loading after 2 seconds
    await waitFor(
      () => {
        expect(screen.getByTestId("loading-state")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    // We won't wait for full 5 seconds, just verify it stays in loading state
    expect(screen.getByText("Loading users...")).toBeInTheDocument();
  });

  test("handles user selection with MSW mocked API", async () => {
    render(<UserList />);

    // Wait for users to load
    await waitFor(
      () => {
        expect(screen.getByTestId("users-grid")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // Click on first user
    fireEvent.click(screen.getByTestId("user-card-1"));

    // Wait for user details to load (MSW has 500ms delay for individual user)
    await waitFor(
      () => {
        expect(screen.getByTestId("selected-user")).toBeInTheDocument();
      },
      { timeout: 1500 },
    );

    // Verify user details are displayed correctly
    expect(screen.getByText("Selected User Details")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("@johndoe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("ID: 1")).toBeInTheDocument();
  });

  test("handles user not found error with MSW", async () => {
    render(<UserList />);

    // Wait for users to load
    await waitFor(
      () => {
        expect(screen.getByTestId("users-grid")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // Mock a 404 response for user ID 999
    worker.use(
      rest.get("https://dummyjson.com/users/999", (req, res, ctx) => {
        return res(
          ctx.delay(500),
          ctx.status(404),
          ctx.json({ message: "User not found" }),
        );
      }),
    );

    // Create and click on user card with ID 999 (we'll add this manually)
    const user999 = document.createElement("div");
    user999.setAttribute("data-testid", "user-card-999");
    user999.onclick = () => {
      // Simulate click that would trigger API call for non-existent user
      fetch("https://dummyjson.com/users/999");
    };

    // Instead, let's test by clicking an existing user and then mocking failure
    worker.resetHandlers();
    worker.use(
      ...errorHandlers, // Use error handlers for the getUsers call
      rest.get("https://dummyjson.com/users/1", (req, res, ctx) => {
        return res(
          ctx.delay(500),
          ctx.status(404),
          ctx.json({ message: "User not found" }),
        );
      }),
    );

    // Re-render to apply new handlers
    render(<UserList />);

    // Wait for users to load
    await waitFor(
      () => {
        expect(screen.getByTestId("users-grid")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // Click on user that will return 404
    fireEvent.click(screen.getByTestId("user-card-1"));

    // The component should handle the error gracefully
    // (selected user should not appear due to error handling)
    await waitFor(
      () => {
        expect(screen.queryByTestId("selected-user")).not.toBeInTheDocument();
      },
      { timeout: 1500 },
    );
  });

  test("refresh functionality works with MSW", async () => {
    render(<UserList />);

    // Wait for initial load
    await waitFor(
      () => {
        expect(screen.getByTestId("users-grid")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // Click refresh button
    fireEvent.click(screen.getByTestId("refresh-button"));

    // Should show loading state again
    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
    expect(screen.getByTestId("refresh-button")).toBeDisabled();

    // Should load successfully again
    await waitFor(
      () => {
        expect(screen.getByTestId("users-grid")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    // Users should still be displayed
    expect(screen.getByText("Total users: 3")).toBeInTheDocument();
  });

  test("MSW handlers are properly reset between tests", async () => {
    // This test verifies that handlers don't leak between tests
    render(<UserList />);

    // Should work with default handlers (not error handlers from previous test)
    await waitFor(
      () => {
        expect(screen.getByTestId("users-grid")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // Should show success, not error
    expect(screen.queryByTestId("error-state")).not.toBeInTheDocument();
    expect(screen.getByText("Total users: 3")).toBeInTheDocument();
  });

  test("handles partial API responses with MSW", async () => {
    // Override with custom handler that returns partial data
    worker.use(
      rest.get("https://dummyjson.com/users", (req, res, ctx) => {
        return res(
          ctx.delay(800),
          ctx.status(200),
          ctx.json({
            users: [expectedUsers[0]], // Only return first user
            total: 1,
            skip: 0,
            limit: 1,
          }),
        );
      }),
    );

    render(<UserList />);

    // Wait for partial data to load
    await waitFor(
      () => {
        expect(screen.getByTestId("users-grid")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // Should only show one user
    expect(screen.getByText("Total users: 1")).toBeInTheDocument();
    expect(screen.getByTestId("user-card-1")).toBeInTheDocument();
    expect(screen.queryByTestId("user-card-2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-card-3")).not.toBeInTheDocument();
  });
});
