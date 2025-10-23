import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserList from "../UserList";
import { api } from "@/lib/api";

// Mock the entire API module
jest.mock("@/lib/api");
const mockApi = api as jest.Mocked<typeof api>;

// Mock data for testing
const mockUsers = [
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
];

const mockUserResponse = {
  users: mockUsers,
  total: mockUsers.length,
  skip: 0,
  limit: mockUsers.length,
};

describe("UserList Component - Comprehensive Testing", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    // setiap sebelum test akan mulai dari mocks kosong
    jest.clearAllMocks();
  });

  // fase 1 persiapan aja
  describe("Initial Rendering", () => {
    // disini testing awal masih kosong, cmn mengecheck structure
    test("renders component structure correctly", () => {
      mockApi.getUsers.mockImplementation(() => new Promise(() => {}));

      render(<UserList />);

      expect(
        screen.getByRole("heading", { name: "User List" }),
      ).toBeInTheDocument();
      expect(screen.getByTestId("refresh-button")).toBeInTheDocument();
      expect(screen.getByTestId("loading-state")).toBeInTheDocument();
    });

    test("renders initial loading state", () => {
      mockApi.getUsers.mockImplementation(() => new Promise(() => {}));

      render(<UserList />);

      expect(screen.getByTestId("loading-state")).toBeInTheDocument();
      expect(screen.getByText("Loading users...")).toBeInTheDocument();
      expect(screen.getByTestId("refresh-button")).toBeDisabled();
    });
  });

  // fase 2 api success
  // describe("API Success Scenarios", () => {
  //   test("renders users successfully after API call", async () => {
  //     mockApi.getUsers.mockResolvedValue(mockUserResponse);

  //     render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  //     });

  //     expect(screen.getByText("Total users: 2")).toBeInTheDocument();
  //     expect(screen.getByTestId("user-card-1")).toBeInTheDocument();
  //     expect(screen.getByTestId("user-card-2")).toBeInTheDocument();
  //     expect(screen.getByText("John Doe")).toBeInTheDocument();
  //     expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  //     expect(screen.getByText("@johndoe")).toBeInTheDocument();
  //     expect(screen.getByText("@janesmith")).toBeInTheDocument();
  //   });

  //   test("displays empty state when no users are returned", async () => {
  //     const emptyResponse = {
  //       users: [],
  //       total: 0,
  //       skip: 0,
  //       limit: 0,
  //     };
  //     mockApi.getUsers.mockResolvedValue(emptyResponse);

  //     render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  //     });

  //     expect(screen.getByText("Total users: 0")).toBeInTheDocument();
  //     expect(screen.queryByTestId("user-card-1")).not.toBeInTheDocument();
  //   });

  //   test("displays users in correct order", async () => {
  //     mockApi.getUsers.mockResolvedValue(mockUserResponse);

  //     render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  //     });

  //     const userCards = screen.getAllByTestId(/user-card-/);
  //     expect(userCards).toHaveLength(2);
  //     expect(userCards[0]).toHaveAttribute("data-testid", "user-card-1");
  //     expect(userCards[1]).toHaveAttribute("data-testid", "user-card-2");
  //   });
  // });

  // describe("API Error Scenarios", () => {
  //   test("displays error message when API call fails", async () => {
  //     const errorMessage = "Failed to fetch users";
  //     mockApi.getUsers.mockRejectedValue(new Error(errorMessage));

  //     render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByTestId("error-state")).toBeInTheDocument();
  //     });

  //     expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  //     expect(screen.getByText("Try Again")).toBeInTheDocument();
  //   });

  //   test("allows retry after error", async () => {
  //     mockApi.getUsers
  //       .mockRejectedValueOnce(new Error("Network error"))
  //       .mockResolvedValueOnce(mockUserResponse);

  //     render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByTestId("error-state")).toBeInTheDocument();
  //     });

  //     fireEvent.click(screen.getByText("Try Again"));

  //     await waitFor(() => {
  //       expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  //     });

  //     expect(screen.getByText("Total users: 2")).toBeInTheDocument();
  //     expect(mockApi.getUsers).toHaveBeenCalledTimes(2);
  //   });

  //   test("handles non-Error objects in error handling", async () => {
  //     mockApi.getUsers.mockRejectedValue("String error");

  //     render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByTestId("error-state")).toBeInTheDocument();
  //     });

  //     expect(
  //       screen.getByText("Error: Failed to fetch users"),
  //     ).toBeInTheDocument();
  //   });
  // });

  // describe("Refresh Functionality", () => {
  //   test("refresh functionality works correctly", async () => {
  //     mockApi.getUsers.mockResolvedValue(mockUserResponse);

  //     render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  //     });

  //     fireEvent.click(screen.getByTestId("refresh-button"));

  //     expect(screen.getByTestId("loading-state")).toBeInTheDocument();
  //     expect(screen.getByTestId("refresh-button")).toBeDisabled();

  //     await waitFor(() => {
  //       expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  //     });

  //     // toHaveBeenCalledTimes, kenapa? karena disini kita ingin tau berapa kali sudah dipanggil
  //     expect(mockApi.getUsers).toHaveBeenCalledTimes(2);
  //     // kenapa lebih pilih cek apakah function ke panggil daripada cek hasilnya?
  //   });

  //   test("reset selected user on refresh", async () => {
  //     mockApi.getUsers.mockResolvedValue(mockUserResponse);
  //     mockApi.getUserById.mockResolvedValue(mockUsers[0]);

  //     render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  //     });

  //     fireEvent.click(screen.getByTestId("user-card-1"));

  //     await waitFor(() => {
  //       expect(screen.getByTestId("selected-user")).toBeInTheDocument();
  //     });

  //     fireEvent.click(screen.getByTestId("refresh-button"));

  //     await waitFor(() => {
  //       expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  //     });

  //     expect(screen.queryByTestId("selected-user")).not.toBeInTheDocument();
  //   });
  // });

  // describe("User Selection Scenarios", () => {
  //   test("handles user selection correctly", async () => {
  //     mockApi.getUsers.mockResolvedValue(mockUserResponse);
  //     mockApi.getUserById.mockResolvedValue(mockUsers[0]);

  //     render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  //     });

  //     fireEvent.click(screen.getByTestId("user-card-1"));

  //     await waitFor(() => {
  //       expect(screen.getByTestId("selected-user")).toBeInTheDocument();
  //     });

  //     expect(screen.getByText("Selected User Details")).toBeInTheDocument();

  //     const selectedUserSection = screen.getByTestId("selected-user");
  //     expect(selectedUserSection).toHaveTextContent("John Doe");
  //     expect(selectedUserSection).toHaveTextContent("Username: johndoe");
  //     expect(selectedUserSection).toHaveTextContent(
  //       "Email: john.doe@example.com",
  //     );
  //     expect(selectedUserSection).toHaveTextContent("ID: 1");

  //     expect(mockApi.getUserById).toHaveBeenCalledWith(1);
  //   });

  //   test("handles user selection error correctly", async () => {
  //     mockApi.getUsers.mockResolvedValue(mockUserResponse);
  //     mockApi.getUserById.mockRejectedValue(new Error("User not found"));

  //     render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  //     });

  //     fireEvent.click(screen.getByTestId("user-card-1"));

  //     // Wait for error to be handled
  //     await waitFor(
  //       () => {
  //         expect(screen.queryByTestId("selected-user")).not.toBeInTheDocument();
  //       },
  //       { timeout: 2000 },
  //     );

  //     // Check that error was set in state (might be displayed differently)
  //     expect(mockApi.getUserById).toHaveBeenCalledWith(1);
  //     expect(screen.getByTestId("user-card-1")).toBeInTheDocument();
  //   });

  //   test("handles non-Error objects in user selection error", async () => {
  //     mockApi.getUsers.mockResolvedValue(mockUserResponse);
  //     mockApi.getUserById.mockRejectedValue("String error");

  //     render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  //     });

  //     fireEvent.click(screen.getByTestId("user-card-1"));

  //     // Wait for error to be handled
  //     await waitFor(
  //       () => {
  //         expect(screen.queryByTestId("selected-user")).not.toBeInTheDocument();
  //       },
  //       { timeout: 2000 },
  //     );

  //     // Verify the error was handled
  //     expect(mockApi.getUserById).toHaveBeenCalledWith(1);
  //     expect(screen.getByTestId("user-card-1")).toBeInTheDocument();
  //   });

  //   test("selects different users correctly", async () => {
  //     mockApi.getUsers.mockResolvedValue(mockUserResponse);
  //     mockApi.getUserById
  //       .mockResolvedValueOnce(mockUsers[0])
  //       .mockResolvedValueOnce(mockUsers[1]);

  //     render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  //     });

  //     // Select first user
  //     fireEvent.click(screen.getByTestId("user-card-1"));

  //     await waitFor(() => {
  //       expect(screen.getByTestId("selected-user")).toBeInTheDocument();
  //     });

  //     const selectedUserSection = screen.getByTestId("selected-user");
  //     expect(selectedUserSection).toHaveTextContent("John Doe");

  //     // Select second user
  //     fireEvent.click(screen.getByTestId("user-card-2"));

  //     await waitFor(() => {
  //       expect(selectedUserSection).toHaveTextContent("Jane Smith");
  //     });

  //     expect(mockApi.getUserById).toHaveBeenCalledTimes(2);
  //     expect(mockApi.getUserById).toHaveBeenNthCalledWith(1, 1);
  //     expect(mockApi.getUserById).toHaveBeenNthCalledWith(2, 2);
  //   });
  // });

  // describe("Accessibility Tests", () => {
  //   test("has proper ARIA attributes", async () => {
  //     mockApi.getUsers.mockResolvedValue(mockUserResponse);

  //     render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  //     });

  //     // Check for proper structure and accessibility
  //     expect(screen.getByRole("heading", { name: "User List" })).toBeInTheDocument();
  //     expect(screen.getByRole("button", { name: "Refresh" })).toBeInTheDocument();

  //     // User cards are clickable divs with onClick handlers, not button elements
  //     expect(screen.getByTestId("user-card-1")).toBeInTheDocument();
  //     expect(screen.getByTestId("user-card-2")).toBeInTheDocument();
  //   });

  //   test("images have proper alt text", async () => {
  //     mockApi.getUsers.mockResolvedValue(mockUserResponse);

  //     render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  //     });

  //     const images = screen.getAllByRole("img");
  //     expect(images).toHaveLength(2);
  //     expect(images[0]).toHaveAttribute("alt", "John Doe");
  //     expect(images[1]).toHaveAttribute("alt", "Jane Smith");
  //   });
  // });

  // describe("API Call Behavior", () => {
  //   test("API is called only once on initial render", async () => {
  //     mockApi.getUsers.mockResolvedValue(mockUserResponse);

  //     render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  //     });

  //     expect(mockApi.getUsers).toHaveBeenCalledTimes(1);
  //   });

  //   test("API is called with correct parameters", async () => {
  //     mockApi.getUsers.mockResolvedValue(mockUserResponse);

  //     render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  //     });

  //     expect(mockApi.getUsers).toHaveBeenCalledWith();
  //   });
  // });

  // describe("Component Lifecycle", () => {
  //   test("cleans up properly on unmount", async () => {
  //     mockApi.getUsers.mockResolvedValue(mockUserResponse);

  //     const { unmount } = render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  //     });

  //     expect(() => unmount()).not.toThrow();
  //   });

  //   test("handles rapid state changes", async () => {
  //     mockApi.getUsers.mockResolvedValue(mockUserResponse);
  //     mockApi.getUserById.mockResolvedValue(mockUsers[0]);

  //     render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  //     });

  //     // Rapid clicking should not cause issues
  //     fireEvent.click(screen.getByTestId("user-card-1"));
  //     fireEvent.click(screen.getByTestId("user-card-1"));
  //     fireEvent.click(screen.getByTestId("user-card-1"));

  //     await waitFor(() => {
  //       expect(screen.getByTestId("selected-user")).toBeInTheDocument();
  //     });

  //     expect(screen.getByTestId("selected-user")).toBeInTheDocument();
  //   });
  // });

  // describe("Edge Cases", () => {
  //   test("handles very long usernames", async () => {
  //     const longUsername = "verylongusernamethatmightbreakthelayout";
  //     const userWithLongUsername = {
  //       ...mockUsers[0],
  //       username: longUsername,
  //     };

  //     mockApi.getUsers.mockResolvedValue({
  //       users: [userWithLongUsername],
  //       total: 1,
  //       skip: 0,
  //       limit: 1,
  //     });

  //     render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByText(`@${longUsername}`)).toBeInTheDocument();
  //     });
  //   });

  //   test("handles very long email addresses", async () => {
  //     const longEmail = "very.long.email.address@very.long.domain.name.com";
  //     const userWithLongEmail = {
  //       ...mockUsers[0],
  //       email: longEmail,
  //     };

  //     mockApi.getUsers.mockResolvedValue({
  //       users: [userWithLongEmail],
  //       total: 1,
  //       skip: 0,
  //       limit: 1,
  //     });

  //     render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByText(longEmail)).toBeInTheDocument();
  //     });
  //   });

  //   test("handles missing user image gracefully", async () => {
  //     const userWithoutImage = {
  //       ...mockUsers[0],
  //       image: "",
  //     };

  //     mockApi.getUsers.mockResolvedValue({
  //       users: [userWithoutImage],
  //       total: 1,
  //       skip: 0,
  //       limit: 1,
  //     });

  //     render(<UserList />);

  //     await waitFor(() => {
  //       expect(screen.getByTestId("user-card-1")).toBeInTheDocument();
  //     });

  //     expect(screen.getByTestId("user-card-1")).toBeInTheDocument();
  //   });
  // });
});
