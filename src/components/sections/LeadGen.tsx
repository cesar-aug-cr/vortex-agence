import { Fragment } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Check, ArrowRight } from "@/components/ui/icons";

// Funnel segment widths (mobile): widest at the top, narrowest at the bottom.
const FUNNEL_WIDTHS = ["100%", "82%", "64%", "48%"];

export function LeadGen({ dict }: { dict: Dictionary }) {
  return (
    <Section tone="base">
      <SectionHeading eyebrow={dict.leadgen.eyebrow} title={dict.leadgen.title} />

      <div className="mt-14 grid items-start gap-5 md:mt-16 lg:grid-cols-2">
        {/* problem */}
        <div className="leadgen-problem card p-8">
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

        {/* right column: solution card + the funnel directly beneath it */}
        <div className="flex flex-col gap-7">
          {/* solution — highlighted */}
          <div className="leadgen-solution relative overflow-hidden rounded-2xl border-2 border-accent bg-accent-soft p-8 shadow-[0_0_44px_-12px_rgba(200,240,46,0.45)] lg:scale-[1.02]">
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              aria-hidden
              style={{
                backgroundImage:
                  "radial-gradient(80% 60% at 85% 0%, rgba(200,240,46,0.22), transparent 60%), radial-gradient(70% 60% at 0% 100%, rgba(20,224,200,0.16), transparent 60%)",
              }}
            />
            <h3 className="inline-flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wide text-text">
              <Check width={16} height={16} className="text-accent" />
              {dict.leadgen.solutionTitle}
            </h3>
            <ul className="mt-6 space-y-4">
              {dict.leadgen.solutions.map((s) => (
                <li key={s} className="flex items-start gap-3 font-semibold text-text">
                  <Check width={18} height={18} className="mt-0.5 shrink-0 text-accent" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* funnel — directly under the solution. Horizontal flow on desktop,
              a downward entonnoir on mobile. Larger text than before. */}
          <div className="hidden flex-wrap items-center justify-center gap-x-3 gap-y-2.5 md:flex">
            {dict.leadgen.funnel.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <span className="funnel-chip chip border-border-strong text-text !text-[0.95rem] !px-4 !py-2">
                  {step}
                </span>
                {i < dict.leadgen.funnel.length - 1 && (
                  <ArrowRight width={20} height={20} className="text-accent" />
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2.5 md:hidden">
            {dict.leadgen.funnel.map((step, i) => (
              <Fragment key={step}>
                <div
                  className="funnel-chip flex items-center justify-center rounded-xl border border-accent/40 bg-accent-soft px-4 py-3.5 text-center text-base font-semibold text-text"
                  style={{ width: FUNNEL_WIDTHS[i] ?? "60%" }}
                >
                  {step}
                </div>
                {i < dict.leadgen.funnel.length - 1 && (
                  <ArrowRight width={20} height={20} className="rotate-90 text-accent" />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
