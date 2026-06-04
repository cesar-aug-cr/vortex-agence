import type { Dictionary } from "@/i18n/getDictionary";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Target, Pulse, Globe, Spark } from "@/components/ui/icons";

const icons = [Target, Pulse, Globe, Spark];

export function WhyVortx({ dict }: { dict: Dictionary }) {
  return (
    <Section tone="base">
      <SectionHeading
        eyebrow={dict.trust.eyebrow}
        title={dict.trust.title}
        lead={dict.trust.lead}
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
        {dict.trust.pillars.map((p, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div key={p.title} className="card card-hover p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Icon />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-text">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-dim">{p.desc}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
