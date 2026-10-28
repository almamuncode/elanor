"use client";

import Link from "next/link";
import { useEffect } from "react";

/** Route error boundary: keeps the header and footer, explains what happened and offers a retry. */
export default function RouteError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="wrap empty" role="alert">
      <h1 className="d-xl">Something went wrong</h1>
      <p>This page didn&apos;t load properly. Try again, or head back to the collection. Your bag and saved pieces are still on this device.</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <button type="button" className="btn" onClick={() => retry()}>
          Try again
        </button>
        <Link className="btn btn--ghost" href="/shop">
          Back to the collection
        </Link>
      </div>
      {error.digest && <p className="hint">Reference: {error.digest}</p>}
    </div>
  );
}
