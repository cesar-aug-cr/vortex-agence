/**
 * Decorative glow "sparkle" star — 4 crossing rays (H, V + 2 diagonals) around
 * a bright white core with a lime/cyan halo. Purely presentational; size is
 * driven by `scale`, position by `className` (left/top), and it twinkles via
 * the `star-twinkle` keyframe (offset per star with `delay`).
 */
export function GlowStar({
  className = "",
  scale = 1,
  delay = 0,
}: {
  className?: string;
  scale?: number;
  delay?: number;
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-0 w-0 ${className}`}
      style={{
        transform: `scale(${scale})`,
        animation: `star-twinkle 4s ease-in-out ${delay}s infinite`,
      }}
    >
      {/* long rays — horizontal + vertical */}
      <span className="absolute left-1/2 top-1/2 h-[2px] w-[260px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-accent-2/60 to-transparent" />
      <span className="absolute left-1/2 top-1/2 h-[2px] w-[260px] -translate-x-1/2 -translate-y-1/2 rotate-90 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      {/* short rays — diagonals */}
      <span className="absolute left-1/2 top-1/2 h-[1.5px] w-[150px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gradient-to-r from-transparent via-accent-2/40 to-transparent" />
      <span className="absolute left-1/2 top-1/2 h-[1.5px] w-[150px] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      {/* bright core + halo */}
      <span
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{
          boxShadow:
            "0 0 12px 4px rgba(255,255,255,0.55), 0 0 28px 10px rgba(20,224,200,0.35)",
        }}
      />
    </span>
  );
}
