import type { ArticleBlock } from "@/i18n/dictionaries/fr";
import { Check } from "@/components/ui/icons";

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
