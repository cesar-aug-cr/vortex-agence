import { Fragment, type ReactNode } from "react";

/**
 * Renders a dictionary string where `*…*` marks an emphasised span, e.g.
 * "Soyez la référence quand *vos clients* cherchent au Luxembourg." The span
 * gets a thick lime underline. Strings without markers render as-is.
 */
export function withEmphasis(text: string, className = "underline decoration-[0.14em] underline-offset-[0.18em] decoration-[color:var(--accent)]"): ReactNode {
  if (!text.includes("*")) return text;
  const parts = text.split("*");
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className={className}>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

/** Plain-text version (metadata, JSON-LD, aria labels). */
export function stripEmphasis(text: string): string {
  return text.replace(/\*/g, "");
}
