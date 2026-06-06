import type { ReactNode } from "react";

/** Shared shell for legal pages: title, updated date, a visible "to complete"
 *  notice (placeholder mode), and a readable prose column. */
export function LegalDoc({
  title,
  updated,
  todo,
  children,
}: {
  title: string;
  updated: string;
  todo: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold text-text md:text-4xl">{title}</h1>
      <p className="mt-2 font-mono text-xs uppercase tracking-wide text-text-muted">
        {updated}
      </p>
      <p className="mt-4 rounded-lg border border-accent/30 bg-accent-soft px-4 py-3 text-sm text-text-dim">
        {todo}
      </p>
      <div className="legal-prose mt-8 space-y-7">{children}</div>
    </div>
  );
}
