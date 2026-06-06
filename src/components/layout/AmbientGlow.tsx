/**
 * Page-wide ambient colour: large, soft, blurred blue/green/cyan blobs that
 * bleed down the single continuous surface. Sits behind all content (-z-10);
 * content sections are transparent so it shows through.
 */
export function AmbientGlow() {
  // Trimmed to 5 large soft blobs (down from 8) — fewer big blurred paint
  // layers, same vertical spread alternating sides/colours down the page.
  const blobs = [
    "radial-gradient(620px 620px at 86% 16%, rgba(20,224,200,0.13), transparent 68%)", // cyan
    "radial-gradient(720px 720px at 8% 33%, rgba(34,211,140,0.14), transparent 68%)", // green
    "radial-gradient(640px 640px at 92% 48%, rgba(46,102,255,0.13), transparent 68%)", // blue
    "radial-gradient(700px 700px at 16% 64%, rgba(20,224,200,0.12), transparent 68%)", // cyan
    "radial-gradient(660px 660px at 88% 80%, rgba(34,211,140,0.14), transparent 68%)", // green
  ];
  // Fade the glow in only below the hero so the hero → first section
  // transition stays pure black (no blue bleed for clean continuity).
  const topFade =
    "linear-gradient(to bottom, transparent 0, transparent 82svh, black 112svh)";
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage: blobs.join(","),
        maskImage: topFade,
        WebkitMaskImage: topFade,
      }}
    />
  );
}
