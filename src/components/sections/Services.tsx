import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ArrowUpRight, Check } from "@/components/ui/icons";

/**
 * Home-only: the cards use the generated renders (public/services/<slug>.webp,
 * 1536×1024, from scripts/images-manifest.mjs) instead of the animated SVG
 * illustrations. /services and the service pages keep the SVGs.
 */
const SERVICE_IMAGES: Record<string, string> = {
  "sites-web": "/services/sites-web.webp",
  "seo-geo": "/services/seo-geo.webp",
  "lead-generation": "/services/lead-generation.webp",
  publicite: "/services/publicite.webp",
  "branding-design": "/services/branding-design.webp",
  "automatisation-ia": "/services/automatisation-ia.webp",
};

export function Services({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <Section id="services" tone="muted">
      <SectionHeading
        eyebrow={dict.servicesSection.eyebrow}
        title={dict.servicesSection.title}
        lead={dict.servicesSection.lead}
      />
      {/* one row per service, image and text alternating sides */}
      <ol className="mt-14 grid gap-12 md:mt-16 md:gap-16">
        {dict.services.map((s, i) => {
          const img = SERVICE_IMAGES[s.slug];
          const flip = i % 2 === 1;
          const href = localized(lang, `/services/${s.slug}`);
          return (
            <li key={s.slug} className="grid items-center gap-7 md:grid-cols-2 md:gap-12">
              {img && (
                <Link
                  href={href}
                  aria-label={s.title}
                  className={`group relative block aspect-[3/2] overflow-hidden rounded-2xl border border-border bg-bg-card shadow-[var(--shadow-md)] ${flip ? "md:order-2" : ""}`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </Link>
              )}
              <div className={flip ? "md:order-1" : ""}>
                <span className="mb-4 block h-0.5 w-12 bg-[color:var(--accent)]" aria-hidden />
                <h3 className="text-2xl font-semibold text-text md:text-3xl">
                  <Link href={href} className="transition-colors hover:text-accent-strong">
                    {s.title}
                  </Link>
                </h3>
                <p className="tagline mt-2 text-base font-medium">{s.tagline}</p>
                <p className="mt-4 text-base leading-relaxed text-text-dim">{s.short}</p>
                <ul className="mt-5 space-y-2">
                  {s.bullets.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-text-dim">
                      <Check width={16} height={16} className="mt-0.5 shrink-0 text-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link href={href} className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  {dict.common.readMore}
                  <ArrowUpRight width={16} height={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
