import type { Dictionary } from "@/i18n/getDictionary";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Check } from "@/components/ui/icons";
import { PortfolioCoverflow } from "@/components/sections/PortfolioCoverflow";

export function Proof({ dict }: { dict: Dictionary }) {
  const hasTestimonials = dict.proof.testimonials.length > 0;

  return (
    <Section tone="base">
      <SectionHeading
        eyebrow={dict.proof.eyebrow}
        title={dict.proof.title}
        align="center"
      />

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

      {/* Portfolio coverflow (ported & rebranded) replaces the old placeholder
          note — full-bleed (breaks out of the container) like the source. */}
      <div className="relative left-1/2 right-1/2 mt-8 w-screen -translate-x-1/2 md:mt-10">
        <PortfolioCoverflow copy={dict.portfolio} />
      </div>

      {/* guarantees — 2×2 without background on mobile, cards from sm up */}
      <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {dict.proof.guarantees.map((g) => (
          <div
            key={g}
            className="flex items-center justify-center gap-2 rounded-2xl p-3 text-center text-sm font-medium text-text sm:gap-3 sm:border sm:border-border sm:bg-bg-card sm:p-5"
          >
            <Check width={18} height={18} className="shrink-0 text-accent" />
            {g}
          </div>
        ))}
      </div>
    </Section>
  );
}
