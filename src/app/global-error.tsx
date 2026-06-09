"use client";

import { useEffect } from "react";

/**
 * Root error boundary — replaces the whole document if the root layout itself
 * throws. Must render its own <html>/<body>. Kept dependency-free (no theme
 * tokens, since globals may not have loaded).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          background: "#09090c",
          color: "#f2f3ee",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700 }}>
          Une erreur est survenue.
        </h1>
        <p style={{ color: "#b9bcb2", maxWidth: "28rem" }}>
          Rechargez la page, ou réessayez dans un instant.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "0.5rem",
            background: "#c8f02e",
            color: "#0a0a0b",
            border: "none",
            borderRadius: "9999px",
            padding: "0.75rem 1.5rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Réessayer
        </button>
      </body>
    </html>
  );
}
