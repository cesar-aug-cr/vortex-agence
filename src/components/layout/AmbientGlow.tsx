/**
 * Page-wide ambient colour: large, soft, blurred blue/green/cyan blobs that
 * bleed down the single continuous surface. Sits behind all content (-z-10);
 * content sections are transparent so it shows through.
 */
export function AmbientGlow() {
  const blobs = [
    "radial-gradient(680px 680px at 14% 5%, rgba(46,102,255,0.16), transparent 68%)", // blue
    "radial-gradient(620px 620px at 86% 16%, rgba(20,224,200,0.13), transparent 68%)", // cyan
    "radial-gradient(720px 720px at 8% 33%, rgba(34,211,140,0.14), transparent 68%)", // green
    "radial-gradient(640px 640px at 92% 48%, rgba(46,102,255,0.13), transparent 68%)", // blue
    "radial-gradient(700px 700px at 16% 64%, rgba(20,224,200,0.12), transparent 68%)", // cyan
    "radial-gradient(660px 660px at 88% 80%, rgba(34,211,140,0.14), transparent 68%)", // green
    "radial-gradient(560px 560px at 30% 93%, rgba(46,102,255,0.12), transparent 68%)", // blue
    "radial-gradient(520px 520px at 50% 40%, rgba(200,240,46,0.05), transparent 70%)", // faint lime
  ];
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ backgroundImage: blobs.join(",") }}
    />
  );
}
