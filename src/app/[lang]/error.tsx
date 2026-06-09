"use client";

import { useEffect } from "react";

/**
 * Segment error boundary — catches render/runtime errors in any page under
 * /[lang] so users see a branded recovery screen instead of a white page.
 * Rendered inside the locale layout (theme + fonts apply).
 */
export default function Error({
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
    <main className="flex min-h-[70svh] flex-col items-center justify-center bg-bg px-6 py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-strong">
        Erreur
      </p>
      <h1 className="mt-4 text-3xl font-bold text-text md:text-4xl">
        Quelque chose s&apos;est mal passé.
      </h1>
      <p className="mt-4 max-w-md text-text-dim">
        Une erreur inattendue est survenue. Réessayez, ou revenez à l&apos;accueil.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button type="button" onClick={reset} className="btn btn-primary">
          Réessayer
        </button>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3.5 font-semibold text-text transition-colors hover:border-accent hover:text-accent"
        >
          Accueil
        </a>
      </div>
    </main>
  );
}
