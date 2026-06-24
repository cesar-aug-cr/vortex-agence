import type { Dictionary } from "@/i18n/getDictionary";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Check } from "@/components/ui/icons";

/**
 * Approach page core: the page intro (h1), the detailed method — each step
 * with its duration, deliverables and what the client provides — followed by
 * the working principles that differentiate the method.
 */
export function Approach({ dict }: { dict: Dictionary }) {
  const a = dict.approachPage;

  return (
    <>
      <Section tone="muted" className="pt-10 md:pt-12">
        <SectionHeading
          level="h1"
          eyebrow={a.eyebrow}
          title={a.title}
          lead={a.lead}
        />

        <ol className="mt-14 grid gap-6 md:mt-16 lg:grid-cols-2">
          {a.steps.map((step) => (
            <li key={step.n} className="card flex flex-col p-7 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-4xl font-bold text-accent">{step.n}</span>
                <span className="chip">
                  {a.stepDurationLabel} · {step.duration}
                </span>
              </div>

              <h2 className="mt-6 text-xl font-semibold text-text">{step.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-dim">{step.desc}</p>

              <p className="mt-6 font-mono text-xs uppercase tracking-wide text-text-muted">
                {a.stepDeliverablesLabel}
              </p>
              <ul className="mt-3 space-y-2">
                {step.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-text-dim">
                    <Check width={16} height={16} className="mt-0.5 shrink-0 text-accent" />
                    {d}
                  </li>
                ))}
              </ul>

              <p className="mt-6 rounded-xl border border-stage-border bg-stage p-4 text-sm text-stage-text-dim">
                <span className="font-semibold text-stage-text">{a.stepYouProvideLabel} : </span>
                {step.youProvide}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="base">
        <SectionHeading eyebrow={a.principles.eyebrow} title={a.principles.title} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {a.principles.items.map((p) => (
            <div key={p.title} className="card flex flex-col p-6">
              <h3 className="text-base font-semibold text-text">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-dim">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
