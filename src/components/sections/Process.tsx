import type { Dictionary } from "@/i18n/getDictionary";
import { Section, SectionHeading } from "@/components/ui/Section";

export function Process({ dict }: { dict: Dictionary }) {
  return (
    <Section id="approche" tone="muted">
      <SectionHeading eyebrow={dict.process.eyebrow} title={dict.process.title} />

      <ol className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
        {dict.process.steps.map((step) => (
          <li key={step.n} className="card flex flex-col p-7">
            <span className="font-mono text-4xl font-bold text-accent">{step.n}</span>
            <h3 className="mt-6 text-lg font-semibold text-text">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-dim">{step.desc}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
