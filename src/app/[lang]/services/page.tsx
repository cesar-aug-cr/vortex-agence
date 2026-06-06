import type { Metadata } from "next";
import Link from "next/link";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { localized } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactCta } from "@/components/sections/ContactCta";
import { serviceIllustration } from "@/components/illustrations/map";
import { ArrowUpRight, Check } from "@/components/ui/icons";

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    path: "/services",
    title: dict.meta.services.title,
    description: dict.meta.services.description,
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);

  return (
    <PageShell dict={dict} lang={lang}>
      <Breadcrumbs
        lang={lang}
        homeLabel={dict.common.breadcrumbHome}
        items={[{ label: dict.nav.services }]}
      />

      <Section tone="base" className="pt-10 md:pt-12">
        <SectionHeading
          eyebrow={dict.servicesSection.eyebrow}
          title={dict.servicesSection.title}
          lead={dict.servicesSection.lead}
        />

        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {dict.services.map((s) => {
            const Illu = serviceIllustration[s.slug];
            return (
              <Link
                key={s.slug}
                href={localized(lang, `/services/${s.slug}`)}
                className="card card-hover spotlight-card group flex flex-col p-7"
              >
                {Illu && (
                  <div className="illu-stage mb-5 overflow-hidden rounded-xl border border-border">
                    <Illu className="h-40 w-full" />
                  </div>
                )}
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold text-text">{s.title}</h2>
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-text-dim transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                    <ArrowUpRight width={16} height={16} />
                  </span>
                </div>
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
            );
          })}
        </div>
      </Section>

      <ContactCta dict={dict} lang={lang} />
    </PageShell>
  );
}
