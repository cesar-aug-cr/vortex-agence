import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ArrowUpRight, Check } from "@/components/ui/icons";

export function Services({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <Section id="services" tone="muted">
      <SectionHeading
        eyebrow={dict.servicesSection.eyebrow}
        title={dict.servicesSection.title}
        lead={dict.servicesSection.lead}
      />
      <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {dict.services.map((s, i) => (
          <Link
            key={s.slug}
            href={localized(lang, `/services/${s.slug}`)}
            className="card card-hover spotlight-card group flex flex-col p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-sm text-text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-dim transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                <ArrowUpRight width={16} height={16} />
              </span>
            </div>
            <h3 className="mt-5 text-xl font-semibold text-text">{s.title}</h3>
            <p className="tagline mt-1 text-sm font-medium">{s.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-text-dim">{s.short}</p>
            <ul className="mt-5 space-y-2 border-t border-border pt-5">
              {s.bullets.slice(0, 3).map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-text-dim">
                  <Check width={16} height={16} className="mt-0.5 shrink-0 text-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </Section>
  );
}
