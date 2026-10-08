import type { Dictionary } from "@/i18n/getDictionary";
import { Section } from "@/components/ui/Section";
import { FeaturedPhotoCell } from "@/components/sections/FeaturedPhotoCell";
import { IconStrategy, IconConversion, IconLocal, IconAI } from "@/components/sections/WhyIcons";

const icons = [IconStrategy, IconConversion, IconLocal, IconAI];

/**
 * "Pourquoi vortx" — a featured photo cell (title + lead) anchors the left
 * column while the four pillars fill a 2×2 grid without cards: a bare icon,
 * then the title and text. No border, no index; hovering a pillar nudges its
 * icon up with a slight tilt.
 */
export function WhyVortx({ dict, className = "" }: { dict: Dictionary; className?: string }) {
  return (
    <Section tone="base" className={className}>
      <div className="grid gap-5 lg:auto-rows-fr lg:grid-cols-3">
        <FeaturedPhotoCell
          eyebrow={dict.trust.eyebrow}
          title={dict.trust.title}
          lead={dict.trust.lead}
          className="lg:row-span-2"
        />

        {dict.trust.pillars.map((p, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div key={p.title} className="group flex flex-col items-start p-4">
              <Icon className="h-14 w-14 text-accent transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:-rotate-6 group-hover:scale-110" />
              <h3 className="mt-5 text-lg font-semibold text-text">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-dim">{p.desc}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
