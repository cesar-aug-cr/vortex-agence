/**
 * Stable anchor id for a FAQ category, derived from its title (accent- and
 * case-insensitive). Shared by the FAQ page's table of contents and the
 * FaqList group sections so their links line up.
 */
export function faqGroupId(title: string): string {
  return (
    "faq-" +
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}
