import type { Dictionary } from "@/i18n/getDictionary";
import { Section, SectionHeading } from "@/components/ui/Section";

/**
 * Homepage reviews section — Google/Trustpilot-style: an aggregate rating
 * header plus a grid of starred review cards.
 *
 * NOTE: `dict.reviews.items` are representative PLACEHOLDERS (see
 * `dict.reviews.note`). Replace them with real, verifiable client reviews
 * before relying on them publicly.
 */

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width={16}
          height={16}
          viewBox="0 0 24 24"
          className={i < rating ? "text-[#ffb800]" : "text-text-muted/30"}
          fill="currentColor"
        >
          <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.9l-5.8 3.05 1.1-6.45-4.7-4.6 6.5-.95z" />
        </svg>
      ))}
    </span>
  );
}

export function Reviews({ dict }: { dict: Dictionary }) {
  const r = dict.reviews;

  return (
    <Section tone="muted">
      <SectionHeading eyebrow={r.eyebrow} title={r.title} lead={r.lead} align="center" />

      {/* aggregate header */}
      <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-4 rounded-2xl border border-border bg-bg-card p-6 text-center sm:flex-row sm:justify-center sm:gap-8 sm:text-left">
        <div className="flex flex-col items-center">
          <span className="text-5xl font-bold leading-none text-text">
            {r.aggregate.rating}
            <span className="text-2xl text-text-muted">/{r.aggregate.ratingMax}</span>
          </span>
          <Stars rating={5} className="mt-2" />
        </div>
        <div className="h-px w-16 bg-border sm:h-14 sm:w-px" />
        <div className="flex flex-col items-center sm:items-start">
          <span className="text-2xl font-bold text-text">{r.aggregate.count}</span>
          <span className="mt-1 text-sm text-text-dim">{r.aggregate.countLabel}</span>
        </div>
      </div>

      {/* review cards */}
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {r.items.map((review) => (
          <figure
            key={review.name}
            className="card flex flex-col p-6"
          >
            <Stars rating={review.rating} />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-text-dim">
              “{review.quote}”
            </blockquote>
            <figcaption className="mt-5 border-t border-border pt-4">
              <span className="block text-sm font-semibold text-text">{review.name}</span>
              <span className="block text-xs text-text-muted">
                {review.role} · {review.location}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
