import { Section, SectionHeading } from "@/components/ui/Section";
import { featureIcons } from "@/components/illustrations/icons";

export type ServiceMethodContent = {
  eyebrow: string;
  title: string;
  lead: string;
  steps: readonly { n: string; icon: string; title: string; desc: string }[];
};

/**
 * "Our method" — the shared four-step VorTX process, rendered on every
 * service & sub-service page. Numbered, icon-led steps connected by a rail.
 */
export function ServiceMethod({ content }: { content: ServiceMethodContent }) {
  return (
    <Section tone="base">
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        lead={content.lead}
      />

      <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {content.steps.map((step) => {
          const Icon = featureIcons[step.icon];
          return (
            <li
              key={step.n}
              className="card card-hover group relative flex flex-col p-6"
            >
              <div className="flex items-center justify-between">
                <div className="illu-stage flex h-20 w-20 items-center justify-center rounded-xl border border-border">
                  {Icon && <Icon className="h-14 w-14" />}
                </div>
                <span className="font-mono text-3xl font-bold text-border transition-colors group-hover:text-accent">
                  {step.n}
                </span>
              </div>
              <h3 className="mt-5 text-base font-semibold text-text">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-dim">
                {step.desc}
              </p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
