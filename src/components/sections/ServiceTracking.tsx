import { Section, SectionHeading } from "@/components/ui/Section";
import { featureIcons } from "@/components/illustrations/icons";

export type ServiceTrackingContent = {
  eyebrow: string;
  title: string;
  lead: string;
  items: readonly { icon: string; title: string; desc: string }[];
};

/**
 * "Tracking & conversion included" — the measurement stack every website and
 * landing page ships with (GA4, Tag Manager, conversion tracking). Rendered as
 * a list of rows: icon, title, one-line description. Shown on the sites-web
 * service page, its sub-services and the campaign landing pages page.
 */
export function ServiceTracking({ content }: { content: ServiceTrackingContent }) {
  return (
    <Section tone="base">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} lead={content.lead} />
      <ul className="card mt-10 divide-y divide-border p-0 md:mt-12">
        {content.items.map((item) => {
          const Icon = featureIcons[item.icon];
          return (
            <li key={item.title} className="flex items-start gap-5 p-5 md:items-center md:gap-7 md:p-6">
              <div className="illu-stage flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-border md:h-20 md:w-20">
                {Icon && <Icon className="h-11 w-11 md:h-14 md:w-14" />}
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-text md:text-lg">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-text-dim md:text-base">{item.desc}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
