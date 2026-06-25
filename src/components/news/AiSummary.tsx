"use client";

import { useState } from "react";
import { Sparkles, Check } from "@/components/ui/icons";

/**
 * "AI-generated summary" box at the top of an article — collapsed by default.
 * Tapping the "+" plays a ~2s reveal (two logo-coloured "O" dots alternate, the
 * card border turns green→dark and the card fills green) before the synthesis
 * and key takeaways appear. Content is hand-written (no API) and flagged as such.
 */
export function AiSummary({
  summary,
  label,
  disclaimer,
  pointsLabel,
  showLabel,
  hideLabel,
}: {
  summary: { text: string; points: string[] };
  label: string;
  disclaimer: string;
  pointsLabel: string;
  showLabel: string;
  hideLabel: string;
}) {
  const [phase, setPhase] = useState<"closed" | "revealing" | "open">("closed");
  const open = phase === "open";

  const toggle = () => {
    if (phase === "open") {
      setPhase("closed");
    } else if (phase === "closed") {
      setPhase("revealing");
      setTimeout(() => setPhase("open"), 2000);
    }
  };

  return (
    <aside
      aria-label={label}
      data-phase={phase}
      className={`ai-summary relative mt-10 overflow-hidden rounded-2xl border p-6 md:p-7 ${
        phase === "revealing"
          ? "ai-summary-revealing"
          : open
            ? "ai-summary-lit border-accent/30 bg-accent-soft"
            : "border-accent/30 bg-accent-soft"
      }`}
    >
      {phase !== "revealing" && (
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(70% 80% at 100% 0%, rgba(200,240,46,0.16), transparent 60%)",
          }}
        />
      )}

      {/* header — always visible */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Sparkles width={16} height={16} />
          </span>
          <p className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">
            {label}
          </p>
        </div>
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="ai-summary-content"
          aria-label={open ? hideLabel : showLabel}
          title={open ? hideLabel : showLabel}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent transition-colors hover:bg-accent hover:text-accent-ink disabled:opacity-60 ${
            phase === "closed" ? "ai-summary-blink" : ""
          }`}
          disabled={phase === "revealing"}
        >
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            aria-hidden
            className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      {/* revealing — two logo-coloured O's alternating */}
      {phase === "revealing" && (
        <div className="ai-summary-loader" aria-hidden>
          <span className="ai-o ai-o-1" />
          <span className="ai-o ai-o-2" />
        </div>
      )}

      {/* content — only when open */}
      {open && (
        <div id="ai-summary-content" className="ai-summary-content">
          <p className="mt-4 text-base leading-relaxed text-text md:text-lg">
            {summary.text}
          </p>

          {summary.points.length > 0 && (
            <>
              <p className="mt-5 font-mono text-xs uppercase tracking-wide text-text-muted">
                {pointsLabel}
              </p>
              <ul className="mt-3 grid gap-2.5">
                {summary.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-text-dim"
                  >
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
        </div>
      )}
    </aside>
  );
}
