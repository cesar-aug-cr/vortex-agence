import { Sparkles, Check } from "@/components/ui/icons";

/**
 * "AI-generated summary" box shown at the top of an article — a short synthesis
 * plus the key takeaways. Content is hand-written (no API) and flagged as such.
 */
export function AiSummary({
  summary,
  label,
  disclaimer,
  pointsLabel,
}: {
  summary: { text: string; points: string[] };
  label: string;
  disclaimer: string;
  pointsLabel: string;
}) {
  return (
    <aside
      className="relative mt-10 overflow-hidden rounded-2xl border border-accent/30 bg-accent-soft p-6 md:p-7"
      aria-label={label}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(70% 80% at 100% 0%, rgba(200,240,46,0.16), transparent 60%)",
        }}
      />
      <div className="flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Sparkles width={16} height={16} />
        </span>
        <p className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">
          {label}
        </p>
      </div>

      <p className="mt-4 text-base leading-relaxed text-text md:text-lg">{summary.text}</p>

      {summary.points.length > 0 && (
        <>
          <p className="mt-5 font-mono text-xs uppercase tracking-wide text-text-muted">
            {pointsLabel}
          </p>
          <ul className="mt-3 grid gap-2.5">
            {summary.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-text-dim">
                <Check width={17} height={17} className="mt-0.5 shrink-0 text-accent" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="mt-5 border-t border-accent/20 pt-3 text-xs italic text-text-muted">
        {disclaimer}
      </p>
    </aside>
  );
}
