// mainly jest hanya bisa dipakai untuk testing js app biasa
// apakah bisa untuk test html?
// apakah bisa untuk test react?

test("ini test pertama", () => {
  expect(1 + 1).toBe(2); // happy path / positive case
  expect(1 + 1).not.toBe(1); // kita mau negative case, artinya wajib salah
});

test("deep equal", () => {
  expect({ a: "1", b: 2 }).toEqual({ b: 2, a: "1" });
});

// toBeDefined ini adalah cheat code
// karena tugas dia cmn mengecheck ada atau tidak
test("to be defined", () => {
  expect("a").toBeDefined();
});

test("to be undefined", () => {
  expect(undefined).toBeUndefined();
});

test("apakah saya benar", () => {
  expect(true).toBeTruthy();
});

test("apakah saya salah", () => {
  expect(false).toBeFalsy();
});
