"use client";

import { useState } from "react";

export function Newsletter() {
  const [done, setDone] = useState(false);

  return (
    <section aria-labelledby="news-title" className="container-prose text-center">
      <h2 id="news-title" className="text-headline">
        Letters from the atelier
      </h2>
      <p className="mx-auto mt-4 max-w-md text-mute">
        Early access to new collections, private events and stories from our
        makers.
      </p>
      {done ? (
        <p role="status" className="mt-8 eyebrow text-success">
          Thank you. You&rsquo;re on the list.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
          className="mx-auto mt-8 flex max-w-lg flex-col gap-2 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email address"
            className="field flex-1"
          />
          <button type="submit" className="btn btn-primary">
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}
