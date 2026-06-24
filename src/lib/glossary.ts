/**
 * Stable anchor id for a glossary category, derived from its name (accent- and
 * case-insensitive). Shared by the glossary page's table of contents and the
 * GlossaryList category sections so their links line up.
 */
export function glossaryCategoryId(category: string): string {
  return (
    "glossaire-" +
    category
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}
