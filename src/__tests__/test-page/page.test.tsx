import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from "../../app/test-page/page";

describe("Page", () => {
  it("renders a heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });

  it("increments the counter with fireEvent", () => {
    render(<Page />);

    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();

    const incrementButton = screen.getByRole("button", {
      name: /increment count/i,
    });

    fireEvent.click(incrementButton);

    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });

  it("submits the greeting form with userEvent", async () => {
    const user = userEvent.setup();
    render(<Page />);

    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    expect(submitButton).toBeDisabled();

    await user.type(nameInput, "Ada Lovelace");

    expect(submitButton).not.toBeDisabled();

    await user.click(submitButton);

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Welcome, Ada Lovelace!"
    );
    expect(nameInput).toHaveValue("");
  });
});
