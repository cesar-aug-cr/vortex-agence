import type { Dictionary } from "@/i18n/getDictionary";
import { Section, SectionHeading } from "@/components/ui/Section";

/**
 * Homepage reviews section — a swipeable slider of client testimonials
 * (1 card on phones, 2 on tablets, a 3-up grid on desktop).
 *
 * NOTE: `dict.reviews.items` are representative PLACEHOLDERS (see
 * `dict.reviews.note`). Replace them with real, verifiable client reviews
 * before relying on them publicly.
 */
export function Reviews({ dict }: { dict: Dictionary }) {
  const r = dict.reviews;

  return (
    <Section tone="muted">
      <SectionHeading eyebrow={r.eyebrow} title={r.title} lead={r.lead} align="center" />

      {/* review cards — horizontal snap slider on phone/tablet, grid on desktop */}
      <div className="reviews-slider mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
        {r.items.map((review) => (
          <figure
            key={review.name}
            className="card flex shrink-0 basis-[85%] snap-start flex-col p-6 sm:basis-[60%] md:basis-[47%] lg:basis-auto"
          >
            <blockquote className="flex-1 text-sm leading-relaxed text-text-dim">
              “{review.quote}”
            </blockquote>

            {/* name banner — dark "illu-stage"-like fill emanating from the left */}
            <figcaption className="relative mt-6 overflow-hidden rounded-xl border border-border">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, #06060a 0%, rgba(6,6,10,0.82) 32%, rgba(6,6,10,0.32) 64%, rgba(6,6,10,0) 92%)",
                }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-accent"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 130% at 0% 50%, rgba(200,240,46,0.16), transparent 60%)",
                }}
              />
              <div className="relative px-4 py-3">
                <span className="block text-sm font-semibold text-white">{review.name}</span>
                <span className="block text-xs text-white/55">
                  {review.role} · {review.location}
                </span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
