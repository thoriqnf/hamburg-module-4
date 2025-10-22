import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
// userEvent emang importnya berbeda
import { userEvent } from "@testing-library/user-event";
import Page from "../../app/test-page/page";

// describe bisa membuat test suite, 1 test suite bisa berisi 1 test case / banyak
describe("Page", () => {
  test("render a heading", () => {
    render(<Page />);

    const heading1 = screen.getByRole("heading", { level: 1 });
    expect(heading1).toBeInTheDocument();
  });

  it("render a heading 2", () => {
    render(<Page />);
    const heading2 = screen.getByRole("heading", {
      level: 2,
      name: /Counter demo/i,
    });
    expect(heading2).toBeInTheDocument();
  });

  it("increment button test event with fireEvent", () => {
    render(<Page />);

    // pastikan text count: 0 itu ada
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument;

    // pastikan buttonnya juga ada
    // ini untuk mencari button yang mengandung kalimat increment count
    const incrementButton = screen.getByRole("button", {
      name: /Increment count/i,
    });

    // fireevent membantu kita mensimulasikan klik event terjadi
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);

    // kalau sudah selesai semua, pastikan hasil akhir sudah berubah.
    expect(screen.getByText(/count: 2/i)).toBeInTheDocument();
  });

  it("reset button test event with fireEvent", () => {
    render(<Page />);

    // pastikan text count: 0 itu ada
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument;

    const resetButton = screen.getByRole("button", {
      name: /Reset count/i,
    });

    const incrementButton = screen.getByRole("button", {
      name: /Increment count/i,
    });

    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);

    fireEvent.click(resetButton);

    fireEvent.click(incrementButton);

    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });

  it("submit form greeting with userEvent", async () => {
    // userEvent harus disetup dan testcase harus async
    const user = userEvent.setup();
    render(<Page />);

    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole("button", { name: /Submit/i });

    expect(submitButton).toBeDisabled();

    // untuk userevent harus menggunakan await untuk memastikan async nya jalan
    // user.type itu langsung jadi, bukan seperti onchange yang setiap ketikan adalah sebuah event
    await user.type(nameInput, "saya kucing");

    expect(submitButton).not.toBeDisabled();

    await user.click(submitButton);

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Welcome, saya kucing",
    );

    // kalau bisa ketika testing kembalikan dalam kondisi awal
    expect(nameInput).toHaveValue("");
  });
});
