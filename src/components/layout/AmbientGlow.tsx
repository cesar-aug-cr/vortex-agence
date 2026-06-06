/**
 * Page-wide ambient colour: large, soft, blurred blue/green/cyan blobs that
 * bleed down the single continuous surface. Sits behind all content (-z-10);
 * content sections are transparent so it shows through.
 *
 * The coloured glow only renders in DARK mode (it's designed for the dark
 * stage). In light mode it stays off so the page reads as clean white — see
 * `.ambient-glow` / `.dark .ambient-glow` in globals.css.
 */
export function AmbientGlow() {
  return (
    <div aria-hidden className="ambient-glow pointer-events-none absolute inset-0 -z-10" />
  );
}
