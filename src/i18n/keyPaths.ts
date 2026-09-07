/**
 * Flatten a dictionary into its sorted list of leaf key paths
 * ("pages.notFound.title", "news.articles.3.slug", …). Array indices are part
 * of the path on purpose: a translation missing a list item is drift too.
 * Pure — shared by the i18n test and by scripts/check-i18n.ts.
 */
export function keyPaths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((v, i) => keyPaths(v, prefix ? `${prefix}.${i}` : String(i)));
  }
  if (value !== null && typeof value === "object") {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .flatMap((k) =>
        keyPaths((value as Record<string, unknown>)[k], prefix ? `${prefix}.${k}` : k)
      );
  }
  return [prefix];
}

/** Paths present in `reference` but not `candidate`, and vice-versa. */
export function diffKeyPaths(reference: unknown, candidate: unknown) {
  const ref = new Set(keyPaths(reference));
  const cand = new Set(keyPaths(candidate));
  return {
    missing: [...ref].filter((p) => !cand.has(p)),
    extra: [...cand].filter((p) => !ref.has(p)),
    total: ref.size,
  };
}
