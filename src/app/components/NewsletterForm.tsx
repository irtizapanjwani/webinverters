"use client";

import { useId, useState } from "react";
import { PRIMARY_SURFACE, TRANSITION } from "./Button";
import { ArrowRightIcon } from "./icons";

/**
 * Presentation-complete subscribe field.
 *
 * Validation, error, and pending states are real and run entirely in the
 * browser. Submission is deliberately not wired: there is no endpoint yet, and
 * a fake "You're subscribed!" would tell a visitor something untrue. When a
 * provider is chosen, replace the body of `handleSubmit`'s success branch —
 * everything around it is already in place.
 */
export default function NewsletterForm() {
  const id = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const emailId = `${id}-email`;
  const errorId = `${id}-error`;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const email = value.trim();

    if (email === "") {
      setError("Enter your email address to subscribe.");
      return;
    }
    // Deliberately permissive: one @, something either side, a dot in the
    // domain. Anything stricter starts rejecting valid real-world addresses.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("That doesn't look like an email address — check for a typo.");
      return;
    }

    setError(null);
    // No endpoint yet. See the note above this component.
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-3">
      <div className="flex gap-2">
        <label htmlFor={emailId} className="sr-only">
          Email address
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          maxLength={254}
          placeholder="you@company.com"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          /* 16px minimum: iOS Safari force-zooms a focused input below it,
             which throws the whole footer layout off-centre. */
          className={`min-w-0 grow rounded-[10px] border bg-surface px-3.5 py-3 font-body text-base text-ink transition-colors placeholder:text-ink-faint sm:text-[15px] ${
            error ? "border-accent-2" : "border-border-strong"
          }`}
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className={`flex shrink-0 items-center justify-center rounded-full px-4.5 py-3 ${PRIMARY_SURFACE} ${TRANSITION} active:scale-[0.97]`}
        >
          <ArrowRightIcon className="size-4" />
        </button>
      </div>

      {error && (
        <p id={errorId} role="alert" className="mt-2 text-[12.5px] text-accent-2">
          {error}
        </p>
      )}
    </form>
  );
}
