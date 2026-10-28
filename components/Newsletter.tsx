"use client";

import { useState, type FormEvent } from "react";
import { AlertIcon } from "./Icons";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Demo newsletter: validates the format only. Nothing is submitted or stored. */
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      setError("Enter your email address.");
      setDone(false);
      return;
    }
    if (!EMAIL.test(value)) {
      setError("Enter an email address like name@example.com.");
      setDone(false);
      return;
    }
    setError(null);
    setDone(true);
  };

  return (
    <section className="sec news" aria-labelledby="news-title">
      <div className="wrap news__in">
        <h2 className="d-l lh-acc" id="news-title">
          Letters from
          <br />
          ÉLANOR
        </h2>
        <form noValidate onSubmit={onSubmit}>
          <p style={{ margin: 0 }}>Occasional notes on new looks and how to wear them.</p>
          <div className="row">
            <div className={error ? "field is-error" : "field"}>
              <label htmlFor="newsletter-email">Email address</label>
              <input
                className="input"
                id="newsletter-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setDone(false);
                }}
                aria-invalid={error ? true : undefined}
                aria-describedby="newsletter-msg"
              />
            </div>
            <button className="btn" type="submit">
              Sign up
            </button>
          </div>
          <div id="newsletter-msg" aria-live="polite">
            {error ? (
              <p className="err" style={{ margin: 0 }}>
                <AlertIcon />
                {error}
              </p>
            ) : done ? (
              <p className="status" style={{ margin: 0 }}>
                Demo only—your email has not been submitted.
              </p>
            ) : (
              <p className="hint" style={{ margin: 0 }}>
                Demo only. Sign-up isn&apos;t connected, so no email is sent or stored.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
