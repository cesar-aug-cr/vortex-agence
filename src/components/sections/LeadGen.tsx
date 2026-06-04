import type { Dictionary } from "@/i18n/getDictionary";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Check, ArrowRight } from "@/components/ui/icons";

export function LeadGen({ dict }: { dict: Dictionary }) {
  return (
    <Section tone="base">
      <SectionHeading eyebrow={dict.leadgen.eyebrow} title={dict.leadgen.title} />

      <div className="mt-14 grid gap-5 md:mt-16 lg:grid-cols-2">
        {/* problem */}
        <div className="card p-8">
          <h3 className="font-mono text-sm uppercase tracking-wide text-text-muted">
            {dict.leadgen.problemTitle}
          </h3>
          <ul className="mt-6 space-y-4">
            {dict.leadgen.problems.map((p) => (
              <li key={p} className="flex items-start gap-3 text-text-dim">
                <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border-strong text-text-muted">
                  <svg width="10" height="10" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden>
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* solution */}
        <div className="card border-accent/40 bg-accent-soft p-8">
          <h3 className="font-mono text-sm uppercase tracking-wide text-text">
            {dict.leadgen.solutionTitle}
          </h3>
          <ul className="mt-6 space-y-4">
            {dict.leadgen.solutions.map((s) => (
              <li key={s} className="flex items-start gap-3 font-medium text-text">
                <Check width={18} height={18} className="mt-0.5 shrink-0 text-accent" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* funnel */}
      <div className="mt-10 flex flex-wrap items-center gap-3">
        {dict.leadgen.funnel.map((step, i) => (
          <div key={step} className="flex items-center gap-3">
            <span className="chip border-border-strong text-text">{step}</span>
            {i < dict.leadgen.funnel.length - 1 && (
              <ArrowRight width={18} height={18} className="text-accent" />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
