import { Section, SectionHeading } from "@/components/ui/Section";
import { featureIcons } from "@/components/illustrations/icons";

export type ServiceProofContent = {
  eyebrow: string;
  title: string;
  lead: string;
  items: readonly { icon: string; value: string; label: string; desc: string }[];
};

/**
 * "Our guarantees" — honest, verifiable commitments (no invented client
 * metrics). Rendered on the dark stage band for contrast and emphasis.
 */
export function ServiceProof({ content }: { content: ServiceProofContent }) {
  return (
    <Section tone="stage">
      <SectionHeading
        tone="stage"
        eyebrow={content.eyebrow}
        title={content.title}
        lead={content.lead}
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {content.items.map((item) => {
          const Icon = featureIcons[item.icon];
          return (
            <div
              key={item.value}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="illu-stage flex h-16 w-16 items-center justify-center rounded-xl border border-white/10">
                {Icon && <Icon className="h-11 w-11" />}
              </div>
              <p className="mt-5 text-xl font-bold text-stage-text">{item.value}</p>
              <p className="mt-1 text-sm font-medium text-accent">{item.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-stage-text-dim">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
