"use client";

import { useState } from "react";

export default function Page() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) return;

    setSubmittedName(trimmedName);
    setName("");
  };

  return (
    <main>
      <h1>Testing Playground</h1>

      <section aria-labelledby="counter-heading">
        <h2 id="counter-heading">Counter demo</h2>
        <p aria-live="polite">Count: {count}</p>
        <div>
          <button type="button" onClick={() => setCount((value) => value + 1)}>
            Increment count
          </button>
          <button type="button" onClick={() => setCount(0)}>
            Reset count
          </button>
        </div>
      </section>

      <section aria-labelledby="form-heading">
        <h2 id="form-heading">Greeting form</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <button type="submit" disabled={!name.trim()}>
            Submit
          </button>
        </form>
        {submittedName ? (
          <p role="status" aria-live="polite">
            Welcome, {submittedName}!
          </p>
        ) : (
          <p role="status" aria-live="polite">
            Share your name to get a greeting.
          </p>
        )}
      </section>
    </main>
  );
}
