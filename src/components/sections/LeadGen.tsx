import { Fragment } from "react";
import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Check, ArrowRight } from "@/components/ui/icons";

// Funnel segment widths (mobile): widest at the top, narrowest at the bottom.
/** Four-step flow. Desktop: a horizontal row with arrows; phones: a 2×2 grid. */
/** Phone widths of the vortx funnel steps — a narrowing entonnoir. */
const FUNNEL_WIDTHS = ["100%", "82%", "64%", "48%"];

/** Four-step flow. Desktop: a horizontal row with arrows. Phones: the vortx
 *  funnel is a downward entonnoir (narrowing chips + arrows), the negative
 *  one a plain 2×2 grid. */
function Funnel({ steps, tone, className = "" }: { steps: readonly string[]; tone: "bad" | "good"; className?: string }) {
  const good = tone === "good";
  const chip = good
    ? "funnel-chip chip border-border-strong text-text !text-[0.95rem] !px-4 !py-2"
    : "funnel-chip chip border-border text-text-muted !text-[0.95rem] !px-4 !py-2";
  return (
    <div className={className}>
      {/* desktop (both tones) */}
      <div className="hidden md:flex md:flex-wrap md:items-center md:justify-center md:gap-x-3 md:gap-y-2.5">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center justify-center gap-3">
            <span className={chip}>{step}</span>
            {i < steps.length - 1 && <ArrowRight width={20} height={20} className={good ? "text-accent" : "text-text-muted"} />}
          </div>
        ))}
      </div>
      {/* phones */}
      {good ? (
        <div className="flex flex-col items-center gap-2.5 md:hidden">
          {steps.map((step, i) => (
            <Fragment key={step}>
              <div
                className="funnel-chip flex items-center justify-center rounded-xl border border-accent/40 bg-accent-soft px-4 py-3.5 text-center text-base font-semibold text-text"
                style={{ width: FUNNEL_WIDTHS[i] ?? "60%" }}
              >
                {step}
              </div>
              {i < steps.length - 1 && <ArrowRight width={20} height={20} className="rotate-90 text-accent" />}
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 md:hidden">
          {steps.map((step) => (
            <div key={step} className="flex items-center justify-center">
              <span className={chip}>{step}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function LeadGen({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <Section tone="base">
      <SectionHeading eyebrow={dict.leadgen.eyebrow} title={dict.leadgen.title} lead={dict.leadgen.lead} />

      <div className="mt-14 grid gap-5 md:mt-16 lg:grid-cols-2 lg:gap-y-7">
        {/* problem */}
        <div className="leadgen-problem card p-8 lg:col-start-1 lg:row-start-1">
          <h3 className="font-mono text-sm uppercase tracking-wide text-text-muted">
            {dict.leadgen.problemTitle}
          </h3>
          <ul className="mt-6 mb-7 space-y-4">
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

        {/* what happens without a system — under the problem card */}
        <Funnel steps={dict.leadgen.funnelBad} tone="bad" className="lg:col-start-1 lg:row-start-2" />

          {/* solution — highlighted */}
          <div className="leadgen-solution relative flex flex-col overflow-hidden rounded-2xl border-2 border-accent bg-accent-soft p-8 lg:col-start-2 lg:row-start-1 shadow-[0_0_44px_-12px_rgba(200,240,46,0.45)] lg:scale-[1.02]">
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              aria-hidden
              style={{
                backgroundImage:
                  "radial-gradient(80% 60% at 85% 0%, rgba(200,240,46,0.22), transparent 60%), radial-gradient(70% 60% at 0% 100%, rgba(20,224,200,0.16), transparent 60%)",
              }}
            />
            <h3 className="font-mono text-sm font-bold uppercase tracking-wide text-text">
              {dict.leadgen.solutionTitle}
            </h3>
            <ul className="mt-6 mb-7 space-y-4">
              {dict.leadgen.solutions.map((s) => (
                <li key={s} className="flex items-start gap-3 font-semibold text-text">
                  <Check width={18} height={18} className="mt-0.5 shrink-0 text-accent" />
                  {s}
                </li>
              ))}
            </ul>
            {/* Mid-page conversion point — the hero CTA is 4 sections away and
                the sticky pill is mobile-only, so desktop needs an action here. */}
            <Link href={localized(lang, "/contact")} className="btn btn-primary mt-auto w-full self-start pt-3.5 sm:w-auto">
              {dict.common.auditCta}
              <ArrowRight width={18} height={18} />
            </Link>
          </div>

        {/* the vortx funnel — under the solution card */}
        <Funnel steps={dict.leadgen.funnel} tone="good" className="lg:col-start-2 lg:row-start-2" />
      </div>
    </Section>
  );
}
