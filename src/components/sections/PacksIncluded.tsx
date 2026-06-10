import type { FC } from "react";
import type { SVGProps } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import { Section, SectionHeading } from "@/components/ui/Section";
import {
  Server,
  Smartphone,
  Search,
  Mail,
  FormInput,
  ShieldCheck,
  LifeBuoy,
  BarChart,
  Gauge,
  ArrowRight,
} from "@/components/ui/icons";

const ICONS: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  server: Server,
  responsive: Smartphone,
  seo: Search,
  contact: Mail,
  smartforms: FormInput,
  ssl: ShieldCheck,
  support: LifeBuoy,
  analytics: BarChart,
  speed: Gauge,
};

export type PacksIncludedContent = {
  eyebrow: string;
  title: string;
  lead: string;
  items: readonly { icon: string; title: string; desc: string }[];
  moreTitle: string;
  moreText: string;
  ctaLabel: string;
};

/**
 * "Everything included" — the features shipped with every web pack, shown on
 * the sites-web service page. Closes with a highlighted "and much more" card +
 * a contact CTA.
 */
export function PacksIncluded({
  content,
  lang,
}: {
  content: PacksIncludedContent;
  lang: Locale;
}) {
  return (
    <Section tone="muted">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} lead={content.lead} />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.items.map((item) => {
          const Icon = ICONS[item.icon] ?? Server;
          return (
            <div
              key={item.title}
              className="card flex flex-col gap-3 p-6 transition-colors hover:border-accent/40"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Icon width={22} height={22} />
              </span>
              <h3 className="text-base font-semibold text-text">{item.title}</h3>
              <p className="text-sm leading-relaxed text-text-dim">{item.desc}</p>
            </div>
          );
        })}

        {/* "and much more" — highlighted, spans the row's remainder */}
        <div className="relative flex flex-col justify-between gap-4 overflow-hidden rounded-2xl border-2 border-accent bg-accent-soft p-6 sm:col-span-2 lg:col-span-1">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(80% 70% at 100% 0%, rgba(200,240,46,0.22), transparent 60%)",
            }}
          />
          <div>
            <h3 className="text-lg font-bold text-text">{content.moreTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-dim">{content.moreText}</p>
          </div>
          <Link href={localized(lang, "/contact")} className="btn btn-primary self-start">
            {content.ctaLabel}
            <ArrowRight width={18} height={18} />
          </Link>
        </div>
      </div>
    </Section>
  );
}
