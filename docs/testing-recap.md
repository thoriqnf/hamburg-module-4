# Testing Recap: Next.js + Jest + Testing Library

## Project setup
- Jest picks up tests under `src/__tests__` thanks to `jest.config.ts`. The config also wires `setupTests.ts`, which imports `@testing-library/jest-dom` so that matchers like `toBeInTheDocument`, `toHaveTextContent`, and `toBeDisabled` are available globally.
- Each test runs in jsdom, so React components render the same way as in the browser without any Next.js routing setup.

## Helpful Testing Library helpers
- `render(<Component />)` mounts a component into a lightweight DOM for the test. Call it once per scenario inside `it` blocks.
- `screen` exposes all the queries. Prefer role- and label-based queries such as `getByRole`, `getByLabelText`, and `findByRole` to mirror how users experience the UI.
- `fireEvent` dispatches low-level DOM events (`click`, `change`, etc.) and is useful for quick checks on simple handlers.
- `userEvent` simulates higher-level interactions (typing, clicking, tabbing) with realistic timing. Always create an instance (`const user = userEvent.setup()`) and `await` async interactions.

## Demo page: `src/app/test-page/page.tsx`
- The page renders a counter and a small greeting form so we have stateful behavior to assert.
- The counter uses two buttons: "Increment count" and "Reset count". The `aria-live` attribute on the count text keeps assistive tech in sync.
- The form includes a labeled text input and a submit button that is disabled until a non-empty name is typed. Submitting shows a status message and clears the field.

## Demo tests: `src/__tests__/test-page/page.test.tsx`
- The first test is a sanity check that the heading renders, reinforcing `render` plus `screen.getByRole`.
- The second test employs `fireEvent.click` to increment the counter and asserts the DOM with `toBeInTheDocument`.
- The third test uses `userEvent.type` and `userEvent.click`, awaiting each call to simulate a realistic form submission, and demonstrates extra matchers like `toHaveValue` and `toHaveTextContent`.

## Running the suite
- Execute `npm test` (or `npm test -- --watch`) from the project root to run the full Jest suite.
- If you add new components under `src/app`, mirror their tests inside `src/__tests__` so the structure stays predictable for everyone on the team.
