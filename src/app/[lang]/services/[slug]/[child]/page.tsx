import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/getDictionary";
import { localized } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactCta } from "@/components/sections/ContactCta";
import { subServiceIllustration } from "@/components/illustrations/map";
import { featureIcons } from "@/components/illustrations/icons";
import { Check, ArrowRight } from "@/components/ui/icons";

type SubService = Dictionary["subServices"][keyof Dictionary["subServices"]][number];

function getSub(dict: Dictionary, parent: string, child: string): SubService | undefined {
  const map = dict.subServices as Record<string, readonly SubService[]>;
  return map[parent]?.find((c) => c.slug === child);
}

export async function generateStaticParams() {
  const dict = await getDictionary(i18n.defaultLocale);
  return i18n.locales.flatMap((lang) =>
    Object.entries(dict.subServices).flatMap(([slug, children]) =>
      children.map((c) => ({ lang, slug, child: c.slug }))
    )
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string; child: string }>;
}): Promise<Metadata> {
  const { lang: raw, slug, child } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  const sub = getSub(dict, slug, child);
  if (!sub) return {};
  return buildMetadata({
    lang,
    path: `/services/${slug}/${child}`,
    title: sub.metaTitle,
    description: sub.metaDescription,
  });
}

export default async function SubServicePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string; child: string }>;
}) {
  const { lang: raw, slug, child } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  const sub = getSub(dict, slug, child);
  if (!sub) notFound();

  const parent = dict.services.find((s) => s.slug === slug);
  const Illu = subServiceIllustration[sub.illustration];
  const sd = dict.servicesDetail;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: sub.title,
    description: sub.short,
    serviceType: sub.title,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "Luxembourg" },
    url: `${site.url}${localized(lang, `/services/${slug}/${child}`)}`,
  };
  const faqJsonLd =
    sub.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: sub.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <PageShell dict={dict} lang={lang}>
      <Breadcrumbs
        lang={lang}
        homeLabel={dict.common.breadcrumbHome}
        items={[
          { label: dict.nav.services, href: "/services" },
          ...(parent ? [{ label: parent.title, href: `/services/${slug}` }] : []),
          { label: sub.title },
        ]}
      />

      <Section tone="base" className="pt-10 md:pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 lg:order-1">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent-strong">
              {parent ? parent.title : dict.servicesSection.eyebrow}
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-[1.08] text-text md:text-5xl">
              {sub.title}
            </h1>
            <p className="tagline mt-3 text-lg font-medium">{sub.tagline}</p>
            <p className="mt-5 max-w-xl text-lg text-text-dim">{sub.short}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {sub.bullets.map((b) => (
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
              {parent && (
                <Link
                  href={localized(lang, `/services/${slug}`)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-text transition-colors hover:text-accent"
                >
                  {parent.title}
                </Link>
              )}
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

      {/* overview */}
      <Section tone="muted">
        <SectionHeading eyebrow={sd.overviewTitle} title={sub.tagline} />
        <div className="mt-8 grid max-w-3xl gap-5">
          {sub.intro.map((p) => (
            <p key={p} className="text-lg leading-relaxed text-text-dim">
              {p}
            </p>
          ))}
        </div>

        <h3 className="mt-16 text-xl font-semibold text-text">{sd.includedTitle}</h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sub.included.map((item) => {
            const Icon = featureIcons[item.icon];
            return (
              <div key={item.title} className="card card-hover group flex flex-col p-6">
                <div className="illu-stage flex h-28 w-28 items-center justify-center self-start rounded-xl border border-border">
                  {Icon && <Icon className="h-20 w-20" />}
                </div>
                <h4 className="mt-5 text-base font-semibold text-text">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-text-dim">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* deliverables + faq */}
      <Section tone="base">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-xl font-semibold text-text">{sd.deliverablesTitle}</h3>
            <ul className="mt-6 grid gap-3">
              {sub.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-text-dim">
                  <Check width={20} height={20} className="mt-0.5 shrink-0 text-accent" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-text">{sd.faqTitle}</h3>
            <div className="mt-6 grid gap-3">
              {sub.faq.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-border bg-bg-card p-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-text">
                    {f.q}
                    <span className="text-accent transition-transform group-open:rotate-45">
                      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-text-dim">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <ContactCta dict={dict} lang={lang} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
    </PageShell>
  );
}
