import { Section } from "@/components/ui/Section";
import { FeaturedPhotoCell } from "@/components/sections/FeaturedPhotoCell";
import { featureIcons } from "@/components/illustrations/icons";

export type ServiceMethodContent = {
  eyebrow: string;
  title: string;
  lead: string;
  steps: readonly { n: string; icon: string; title: string; desc: string }[];
};

/**
 * "Our method" — the shared four-step VorTX process, rendered on every
 * service & sub-service page. A full-width photo banner carries the heading;
 * the four steps sit on one continuous lime line, each icon on a round dark
 * stage, index underneath, then title and text. No cards.
 */
export function ServiceMethod({ content }: { content: ServiceMethodContent }) {
  return (
    <Section tone="base">
      <FeaturedPhotoCell
        eyebrow={content.eyebrow}
        title={content.title}
        lead={content.lead}
        src="/hero/methode.webp"
        position="center 40%"
        layout="banner"
      />

      <ol className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-6">
        <span
          className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-[color:var(--accent)] via-[color:var(--accent)]/40 to-transparent md:block"
          aria-hidden
        />
        {content.steps.map((step) => {
          const Icon = featureIcons[step.icon];
          return (
            <li key={step.n} className="relative">
              <div className="flex items-center gap-4 md:flex-col md:items-start">
                <span className="illu-stage relative z-10 inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-accent/40">
                  {Icon && <Icon className="h-14 w-14" />}
                </span>
                <span className="font-mono text-sm font-bold text-accent">{step.n}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-text">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-dim">{step.desc}</p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
