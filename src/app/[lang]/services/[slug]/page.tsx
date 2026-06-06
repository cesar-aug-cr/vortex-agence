import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { localized } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { site, serviceSlugs } from "@/lib/site";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { ContactCta } from "@/components/sections/ContactCta";
import { serviceIllustration } from "@/components/illustrations/map";
import { Check, ArrowRight } from "@/components/ui/icons";

export async function generateStaticParams() {
  return i18n.locales.flatMap((lang) =>
    serviceSlugs.map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  const service = dict.services.find((s) => s.slug === slug);
  if (!service) return {};
  return buildMetadata({
    lang,
    path: `/services/${slug}`,
    title: service.metaTitle,
    description: service.metaDescription,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  const service = dict.services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Illu = serviceIllustration[service.slug];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.short,
    serviceType: service.title,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "Luxembourg" },
    url: `${site.url}${localized(lang, `/services/${service.slug}`)}`,
  };

  return (
    <PageShell dict={dict} lang={lang}>
      <Breadcrumbs
        lang={lang}
        homeLabel={dict.common.breadcrumbHome}
        items={[
          { label: dict.nav.services, href: "/services" },
          { label: service.title },
        ]}
      />

      <Section tone="base" className="pt-10 md:pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 lg:order-1">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              {dict.servicesSection.eyebrow}
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-[1.08] text-text md:text-5xl">
              {service.title}
            </h1>
            <p className="tagline mt-3 text-lg font-medium">{service.tagline}</p>
            <p className="mt-5 max-w-xl text-lg text-text-dim">{service.short}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-text-dim">
                  <Check width={18} height={18} className="mt-0.5 shrink-0 text-accent" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href={localized(lang, "/contact")} className="btn btn-primary">
                {dict.common.cta}
                <ArrowRight width={18} height={18} />
              </Link>
              <Link
                href={localized(lang, "/services")}
                className="inline-flex items-center gap-2 text-sm font-semibold text-text transition-colors hover:text-accent"
              >
                {dict.common.allServices}
              </Link>
            </div>
          </div>

          {Illu && (
            <div className="order-1 lg:order-2">
              <div className="illu-stage overflow-hidden rounded-2xl border border-border p-4">
                <Illu className="h-auto w-full" />
              </div>
            </div>
          )}
        </div>
      </Section>

      <ContactCta dict={dict} lang={lang} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </PageShell>
  );
}
