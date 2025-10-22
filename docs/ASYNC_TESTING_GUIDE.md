# Asynchronous Testing Guide
## React Testing Library with Jest and DummyJSON API (Simple Approach)

This guide covers everything you need to know about testing asynchronous operations in React applications using React Testing Library and Jest. We use the **simplest approach** - Jest mocks - which is perfect for learning and most real-world scenarios.

## 📚 Table of Contents

1. [Setup & Dependencies](#setup--dependencies)
2. [Two Approaches to Async Testing](#two-approaches-to-async-testing)
3. [Jest Mocks (Simple Approach)](#jest-mocks-simple-approach)
4. [MSW Integration (Realistic Approach)](#msw-integration-realistic-approach)
5. [Testing Patterns & Best Practices](#testing-patterns--best-practices)
6. [Real-World Examples](#real-world-examples)
7. [Common Pitfalls & Solutions](#common-pitfalls--solutions)
8. [Advanced Techniques](#advanced-techniques)

## 🚀 Setup & Dependencies

### What's Already Included

Your project comes with:
- ✅ Jest and React Testing Library
- ✅ TypeScript support
- ✅ Axios for API calls
- ✅ Basic test configuration

### What We Added

```bash
npm install -D msw
```

**MSW (Mock Service Worker)** - Mocks API requests at the network level, providing realistic testing scenarios.

### Project Structure

```
src/
├── components/
│   ├── UserList.tsx              # Example async component
│   ├── ProductSearch.tsx         # Another async component
│   └── __tests__/
│       ├── UserList.test.tsx     # Jest mocks approach
│       └── UserList.msw.test.tsx # MSW integration approach
├── lib/
│   └── api.ts                    # API utility functions
├── mocks/
│   ├── handlers.ts               # MSW API handlers
│   └── browser.ts                # MSW browser setup
└── setupTests.ts                 # Test configuration
```

## 🎯 Two Approaches to Async Testing

### 1. Jest Mocks (Simple Approach) ⚡

**When to use:**
- Unit tests for individual components
- Fast execution is important
- Testing component logic in isolation
- Simple API responses

**Pros:**
- ⚡ Very fast execution
- 🎯 Simple setup and configuration
- 🔧 Easy to control mock responses
- 🧪 Perfect for unit testing

**Cons:**
- 🤖 Doesn't test actual network requests
- 🎭 Less realistic than real API calls
- 🔄 Requires manual mocking for each test

### 2. MSW Integration (Realistic Approach) 🌐

**When to use:**
- Integration tests
- Testing loading states and error handling
- End-to-end component testing
- Realistic user scenarios

**Pros:**
- 🌐 Tests actual network requests
- 🎭 Realistic loading states and delays
- 🔄 Automatic request/response handling
- 🛡️ Works with real API logic

**Cons:**
- ⏱️ Slower execution (network delays)
- 🔧 More complex setup
- 💾 Higher memory usage

## 🔧 Jest Mocks (Simple Approach)

### Basic Pattern

```typescript
// 1. Mock the API module
jest.mock("@/lib/api");
const mockApi = api as jest.Mocked<typeof api>;

// 2. Define mock data
const mockUsers = [
  { id: 1, firstName: "John", lastName: "Doe", /* ... */ }
];

// 3. Mock the API response
mockApi.getUsers.mockResolvedValue({ users: mockUsers });

// 4. Test the component
test("renders users successfully", async () => {
  render(<UserList />);

  // Wait for async operation
  await waitFor(() => {
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
```

### Testing Different Scenarios

#### Success Scenario
```typescript
test("loads users successfully", async () => {
  mockApi.getUsers.mockResolvedValue({
    users: mockUsers,
    total: 2,
    skip: 0,
    limit: 2
  });

  render(<UserList />);

  await waitFor(() => {
    expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  });

  expect(screen.getByText("Total users: 2")).toBeInTheDocument();
});
```

#### Error Scenario
```typescript
test("handles API errors", async () => {
  mockApi.getUsers.mockRejectedValue(new Error("Network error"));

  render(<UserList />);

  await waitFor(() => {
    expect(screen.getByTestId("error-state")).toBeInTheDocument();
  });

  expect(screen.getByText("Error: Network error")).toBeInTheDocument();
});
```

#### Loading State
```typescript
test("shows loading state", () => {
  // Mock to never resolve (stays loading)
  mockApi.getUsers.mockImplementation(() => new Promise(() => {}));

  render(<UserList />);

  expect(screen.getByTestId("loading-state")).toBeInTheDocument();
  expect(screen.getByText("Loading users...")).toBeInTheDocument();
});
```

## 🌐 MSW Integration (Realistic Approach)

### Setup MSW Handlers

```typescript
// src/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  // Mock users endpoint
  rest.get('https://dummyjson.com/users', (req, res, ctx) => {
    return res(
      ctx.delay(1000), // Simulate network delay
      ctx.status(200),
      ctx.json({
        users: mockUsers,
        total: mockUsers.length,
        skip: 0,
        limit: mockUsers.length
      })
    );
  }),

  // Mock error scenario
  rest.get('https://dummyjson.com/users', (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.status(500),
      ctx.json({ message: 'Failed to fetch users' })
    );
  })
];
```

### MSW Test Patterns

#### Basic Success Test
```typescript
test("renders users with MSW", async () => {
  render(<UserList />);

  // Wait for MSW delay (1 second)
  await waitFor(() => {
    expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  }, { timeout: 2000 });

  expect(screen.getByText("Total users: 3")).toBeInTheDocument();
});
```

#### Error Handling Test
```typescript
test("handles API errors with MSW", async () => {
  // Override default handlers with error handlers
  worker.use(...errorHandlers);

  render(<UserList />);

  await waitFor(() => {
    expect(screen.getByTestId("error-state")).toBeInTheDocument();
  }, { timeout: 2000 });

  expect(screen.getByText("Error: Failed to fetch users")).toBeInTheDocument();
});
```

#### Loading State Test
```typescript
test("shows realistic loading state", async () => {
  render(<UserList />);

  // Should show loading immediately
  expect(screen.getByTestId("loading-state")).toBeInTheDocument();

  // Should still be loading after 500ms (due to MSW delay)
  await waitFor(() => {
    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
  }, { timeout: 1000 });
});
```

## 🧪 Testing Patterns & Best Practices

### 1. Async Testing Utilities

```typescript
// waitFor - Wait for element to appear
await waitFor(() => {
  expect(screen.getByText("Success")).toBeInTheDocument();
});

// findBy - Built-in wait for element
const element = await screen.findByText("Success");

// waitForElementToBeRemoved - Wait for element to disappear
await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
```

### 2. Testing Loading States

```typescript
test("comprehensive loading state test", async () => {
  render(<AsyncComponent />);

  // 1. Initial loading state
  expect(screen.getByTestId("loading-state")).toBeInTheDocument();
  expect(screen.getByTestId("submit-button")).toBeDisabled();

  // 2. Success state
  await waitFor(() => {
    expect(screen.getByTestId("success-state")).toBeInTheDocument();
  });

  // 3. Button should be enabled again
  expect(screen.getByTestId("submit-button")).not.toBeDisabled();
});
```

### 3. Testing Error States

```typescript
test("error handling with retry", async () => {
  mockApi.getData
    .mockRejectedValueOnce(new Error("First failure"))
    .mockResolvedValueOnce({ data: "success" });

  render(<AsyncComponent />);

  // Should show error
  await waitFor(() => {
    expect(screen.getByText("Error: First failure")).toBeInTheDocument();
  });

  // Click retry
  fireEvent.click(screen.getByText("Try Again"));

  // Should show success
  await waitFor(() => {
    expect(screen.getByText("success")).toBeInTheDocument();
  });
});
```

### 4. Testing User Interactions

```typescript
test("user interaction with async operations", async () => {
  const user = userEvent.setup(); // Use userEvent for better interaction testing
  mockApi.submitData.mockResolvedValue({ success: true });

  render(<FormComponent />);

  // Fill form
  await user.type(screen.getByLabelText("Name"), "John Doe");
  await user.type(screen.getByLabelText("Email"), "john@example.com");

  // Submit form
  await user.click(screen.getByText("Submit"));

  // Verify success
  await waitFor(() => {
    expect(screen.getByText("Form submitted successfully!")).toBeInTheDocument();
  });
});
```

## 🎯 Real-World Examples

### Example 1: UserList Component

**Component Features:**
- Fetches users from API on mount
- Shows loading state during fetch
- Handles errors gracefully
- Allows refreshing data
- Supports user selection

**Jest Mocks Test:**
```typescript
test("complete user workflow", async () => {
  mockApi.getUsers.mockResolvedValue(mockUserResponse);
  mockApi.getUserById.mockResolvedValue(mockUsers[0]);

  render(<UserList />);

  // Wait for users to load
  await waitFor(() => {
    expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  });

  // Select a user
  fireEvent.click(screen.getByTestId("user-card-1"));

  // Verify user details appear
  await waitFor(() => {
    expect(screen.getByTestId("selected-user")).toBeInTheDocument();
  });

  expect(screen.getByText("John Doe")).toBeInTheDocument();
});
```

**MSW Integration Test:**
```typescript
test("realistic user workflow", async () => {
  render(<UserList />);

  // Wait with realistic delay
  await waitFor(() => {
    expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  }, { timeout: 2000 });

  // All interactions work the same way
  fireEvent.click(screen.getByTestId("user-card-1"));

  await waitFor(() => {
    expect(screen.getByTestId("selected-user")).toBeInTheDocument();
  }, { timeout: 1500 });
});
```

### Example 2: ProductSearch Component

**Component Features:**
- Debounced search input
- Real-time search results
- Category filtering
- Empty state handling
- Error recovery

**Test Pattern:**
```typescript
test("debounced search functionality", async () => {
  mockApi.searchProducts.mockResolvedValue(searchResults);

  render(<ProductSearch />);

  // Type search query
  const searchInput = screen.getByTestId("search-input");
  await userEvent.type(searchInput, "laptop");

  // Should not search immediately (debounce)
  expect(mockApi.searchProducts).not.toHaveBeenCalled();

  // Wait for debounce (500ms)
  await waitFor(() => {
    expect(mockApi.searchProducts).toHaveBeenCalledWith("laptop");
  }, { timeout: 1000 });

  // Verify results
  await waitFor(() => {
    expect(screen.getByTestId("products-grid")).toBeInTheDocument();
  });
});
```

## ⚠️ Common Pitfalls & Solutions

### 1. Race Conditions

**Problem:** Tests fail intermittently due to timing issues.

**Solution:** Use proper async testing utilities:

```typescript
// ❌ Bad - might fail due to timing
expect(screen.getByText("Data loaded")).toBeInTheDocument();

// ✅ Good - waits for element
await waitFor(() => {
  expect(screen.getByText("Data loaded")).toBeInTheDocument();
});

// ✅ Even better - built-in wait
expect(await screen.findByText("Data loaded")).toBeInTheDocument();
```

### 2. Mock Persistence

**Problem:** Mocks persist between tests causing interference.

**Solution:** Clean up mocks in beforeEach:

```typescript
beforeEach(() => {
  jest.clearAllMocks();
  // or
  jest.resetAllMocks();
});
```

### 3. MSW Handler Conflicts

**Problem:** MSW handlers from previous tests affect current test.

**Solution:** Reset handlers between tests:

```typescript
beforeEach(() => {
  worker.resetHandlers();
});
```

### 4. Timeout Issues

**Problem:** Tests timeout waiting for async operations.

**Solution:** Increase timeout or use proper waiting:

```typescript
// Increase timeout for slow operations
await waitFor(() => {
  expect(screen.getByText("Data loaded")).toBeInTheDocument();
}, { timeout: 5000 });

// Or use findBy with timeout
const element = await screen.findByText("Data loaded", {}, { timeout: 5000 });
```

### 5. Act Warning

**Problem:** React complains about state updates not wrapped in act().

**Solution:** Use proper async testing patterns:

```typescript
// ❌ Bad - causes act warning
fireEvent.click(button);
expect(screen.getByText("Success")).toBeInTheDocument();

// ✅ Good - properly handles async
await userEvent.click(button);
await waitFor(() => {
  expect(screen.getByText("Success")).toBeInTheDocument();
});
```

## 🚀 Advanced Techniques

### 1. Custom Render with Providers

```typescript
// test-utils.tsx
import { render } from '@testing-library/react';
import { ReactElement } from 'react';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SomeProvider>
      <AnotherProvider>
        {children}
      </AnotherProvider>
    </SomeProvider>
  );
};

const customRender = (ui: ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

### 2. API Response Testing

```typescript
test("validates API response structure", async () => {
  mockApi.getUsers.mockResolvedValue(invalidResponse);

  render(<UserList />);

  await waitFor(() => {
    expect(screen.getByText("Error: Invalid response format")).toBeInTheDocument();
  });
});
```

### 3. Performance Testing

```typescript
test("component renders within acceptable time", async () => {
  const startTime = performance.now();

  render(<UserList />);

  await waitFor(() => {
    expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  });

  const endTime = performance.now();
  const renderTime = endTime - startTime;

  expect(renderTime).toBeLessThan(2000); // Should render within 2 seconds
});
```

### 4. Accessibility Testing with Async Content

```typescript
test("accessibility of async content", async () => {
  render(<UserList />);

  // Wait for content to load
  await waitFor(() => {
    expect(screen.getByTestId("users-grid")).toBeInTheDocument();
  });

  // Test accessibility
  const userList = screen.getByTestId("users-grid");
  expect(userList).toHaveAttribute("role", "grid");

  // Test ARIA live regions
  const statusElement = screen.getByRole("status");
  expect(statusElement).toHaveAttribute("aria-live", "polite");
});
```

## 📝 Test Organization

### File Structure

```
components/
├── ComponentName.tsx
└── __tests__/
    ├── ComponentName.test.tsx     # Jest mocks tests
    ├── ComponentName.msw.test.tsx # MSW integration tests
    ├── ComponentName.accessibility.test.tsx # Accessibility tests
    └── ComponentName.utils.test.tsx # Utility function tests
```

### Test Naming Conventions

```typescript
describe("ComponentName - Feature", () => {
  describe("when user does X", () => {
    test("should show Y", async () => {
      // Test implementation
    });
  });

  describe("loading states", () => {
    test("shows loading indicator", async () => {
      // Test implementation
    });
  });

  describe("error handling", () => {
    test("shows error message when API fails", async () => {
      // Test implementation
    });
  });
});
```

## 🎓 Learning Journey

### Beginner Level
1. ✅ Basic async testing with `waitFor`
2. ✅ Testing success states
3. ✅ Testing error states
4. ✅ Basic Jest mocking

### Intermediate Level
1. ✅ MSW integration
2. ✅ Debounced input testing
3. ✅ User interaction testing
4. ✅ Loading state testing

### Advanced Level
1. ✅ Custom test utilities
2. ✅ Performance testing
3. ✅ Accessibility testing
4. ✅ Complex async workflows

## 🏁 Conclusion

Async testing doesn't have to be complicated! Start with simple Jest mocks for unit tests, then gradually incorporate MSW for more realistic integration tests. The key is to:

1. **Start Simple** - Use Jest mocks first
2. **Be Patient** - Use proper async waiting utilities
3. **Test Realistically** - Include loading and error states
4. **Keep Learning** - Gradually adopt advanced techniques

Happy testing! 🚀

## 📚 Additional Resources

- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro)
- [MSW Documentation](https://mswjs.io/docs)
- [Jest Async Testing](https://jestjs.io/docs/asynchronous)
- [DummyJSON API](https://dummyjson.com/)