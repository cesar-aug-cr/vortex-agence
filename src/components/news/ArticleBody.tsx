import type { ArticleBlock } from "@/i18n/dictionaries/fr";
import { Check } from "@/components/ui/icons";
import { LogoMark } from "@/components/brand/LogoMark";

/** Renders a long-form article body from typed {@link ArticleBlock}s. */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={block.id}
                className="scroll-mt-36 pt-4 text-2xl font-bold text-text md:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="pt-2 text-xl font-semibold text-text">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-lg leading-relaxed text-text-dim">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="grid gap-3">
                {block.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-text-dim">
                    <Check width={20} height={20} className="mt-1 shrink-0 text-accent" />
                    <span className="text-lg leading-relaxed">{it}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="grid gap-3">
                {block.items.map((it, n) => (
                  <li key={it} className="flex items-start gap-3 text-text-dim">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/40 font-mono text-sm font-semibold text-accent">
                      {n + 1}
                    </span>
                    <span className="text-lg leading-relaxed">{it}</span>
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-accent pl-6 text-xl font-medium italic text-text"
              >
                “{block.text}”
                {block.cite && (
                  <cite className="mt-2 block text-sm not-italic text-text-muted">
                    — {block.cite}
                  </cite>
                )}
              </blockquote>
            );
          case "logo":
            return (
              <div
                key={i}
                className="illu-stage relative flex items-center justify-center rounded-2xl border border-border py-12"
              >
                <LogoMark className="h-14 w-auto text-text md:h-20" />
                {block.tip && (
                  <span className="group absolute right-3 top-3">
                    <button
                      type="button"
                      aria-label={block.tipTitle ?? block.tip}
                      className="logo-tip-glow flex h-8 w-8 items-center justify-center rounded-full border border-accent/50 bg-bg/60 text-accent outline-none backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-ink focus-visible:bg-accent focus-visible:text-accent-ink"
                    >
                      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 16v-4M12 8h.01" />
                      </svg>
                    </button>
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute right-0 top-11 z-20 w-64 origin-top-right scale-95 rounded-xl border border-border bg-bg-card p-4 text-left opacity-0 shadow-[var(--shadow-lg)] transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100 sm:w-72"
                    >
                      {block.tipTitle && (
                        <span className="block font-mono text-xs uppercase tracking-wide text-accent">
                          {block.tipTitle}
                        </span>
                      )}
                      <span className="mt-2 block whitespace-pre-line text-sm leading-relaxed text-text-dim">
                        {block.tip}
                      </span>
                    </span>
                  </span>
                )}
              </div>
            );
          case "callout":
            return (
              <div
                key={i}
                className="rounded-2xl border border-accent/25 bg-accent-soft p-6"
              >
                <p className="font-mono text-xs uppercase tracking-wide text-accent">
                  {block.title}
                </p>
                <p className="mt-2 text-lg leading-relaxed text-text">{block.text}</p>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
