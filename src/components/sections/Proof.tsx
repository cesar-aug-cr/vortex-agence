import type { Dictionary } from "@/i18n/getDictionary";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Check } from "@/components/ui/icons";

export function Proof({ dict }: { dict: Dictionary }) {
  const hasTestimonials = dict.proof.testimonials.length > 0;

  return (
    <Section tone="base">
      <SectionHeading eyebrow={dict.proof.eyebrow} title={dict.proof.title} />

      {/* Real client logos go here once available. Until then we don't render an
          empty placeholder grid (it reads as a distrust signal) — we lead with
          the honest note + concrete guarantees below. */}

      {hasTestimonials && (
        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3">
          {dict.proof.testimonials.map((t) => (
            <figure key={t.author} className="card p-7">
              <blockquote className="text-text-dim">“{t.quote}”</blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold text-text">{t.author}</span>
                <span className="text-text-muted"> — {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <p className="mt-10 max-w-2xl text-sm italic text-text-muted md:mt-12">
        {dict.proof.placeholderNote}
      </p>

      {/* guarantees */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {dict.proof.guarantees.map((g) => (
          <div
            key={g}
            className="card flex items-center gap-3 p-5 text-sm font-medium text-text"
          >
            <Check width={18} height={18} className="shrink-0 text-accent" />
            {g}
          </div>
        ))}
      </div>
    </Section>
  );
}
