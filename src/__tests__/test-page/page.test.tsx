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

  // ini adalah termasuk testing sebuah function
  it("increment button test event with fireEvent", () => {
    // 1. untuk test sebuah react component harus render page
    render(<Page />);

    // 2. setelah render kita butuh tau kondisi awal dengan kasih expect
    // artinya kita yakin statenya akan sama dengan initial state
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();

    // 3. mengambil element button dengan text yang memiliki regex Increment count
    const incrementButton = screen.getByRole("button", {
      name: /Increment count/i,
    });

    // 4. fireevent mensimulasikan click yang terjadi, untuk fireevent hanya untuk sesuatu yang syncshronous
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);

    // kita sudah panggil sebanyak 3 kali, dengan nilai awal 0
    // kalau sudah 3x artinya? nilai pasti menjadi 3
    //
    expect(screen.getByText(/Count: 3/i)).toBeInTheDocument();
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
    // 1. setiap userevent harus di setup terlebih dahulu
    const user = userEvent.setup();

    // 2. siapkan component dan element terlebih dahulu
    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole("button", { name: /Submit/i });

    // 3. kita cek dulu buttonnya jika blm ada input dia akan disabled
    expect(submitButton).toBeDisabled();

    // 4. masukan userevent dan setup async await

    await user.type(nameInput, "saya kucing meong meong");

    // 5. expect setelah di type disabled sudah tidak ada
    expect(submitButton).not.toBeDisabled();

    // 6. simulasi user click submit

    await user.click(submitButton);

    //7. expect hasil submit
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Welcome, saya kucing meong meong",
    );

    // sampai disini boleh sudah selesai
    // tapi kalau mau lebih bagus, sekalian kita cek dahulu sudah reset belum datanya setelah submit

    expect(nameInput).toHaveValue("");
  });
});
