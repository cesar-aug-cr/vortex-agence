import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { localized } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { ContactCta } from "@/components/sections/ContactCta";
import { ArrowRight, Check } from "@/components/ui/icons";

/** Same renders as the home service cards (public/services/<slug>.webp, 1536×1024). */
const SERVICE_IMAGES: Record<string, string> = {
  "sites-web": "/services/sites-web.webp",
  "seo-geo": "/services/seo-geo.webp",
  "lead-generation": "/services/lead-generation.webp",
  publicite: "/services/publicite.webp",
  "branding-design": "/services/branding-design.webp",
  "automatisation-ia": "/services/automatisation-ia.webp",
};

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
      {/* Hero: realistic photo of the agency at work (public/services/hero.webp),
          headline on the left over a scrim; dark stage in both themes. */}
      <section className="relative isolate overflow-hidden bg-stage text-stage-text">
        <Image
          src="/services/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(7,7,10,0.9) 0%, rgba(7,7,10,0.72) 38%, rgba(7,7,10,0.3) 68%, rgba(7,7,10,0.1) 100%), linear-gradient(to bottom, rgba(7,7,10,0.55) 0%, transparent 30%, transparent 70%, var(--bg) 100%)",
          }}
        />
        <div className="container-vortx relative z-10 pb-24 pt-28 md:pb-32 md:pt-32">
          <Breadcrumbs lang={lang} homeLabel={dict.common.breadcrumbHome} items={[{ label: dict.nav.services }]} className="" tone="stage" />
          <div className="mt-10 max-w-2xl md:mt-12">
            <span className="section-eyebrow font-mono text-xs font-bold uppercase tracking-[0.22em] text-accent">
              {dict.servicesSection.eyebrow}
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-[1.08] text-stage-text md:text-5xl">{dict.servicesSection.title}</h1>
            <p className="mt-5 text-lg text-stage-text-dim">{dict.servicesSection.lead}</p>
          </div>
        </div>
      </section>

      {/* Services: a compact list, one row per service — small image,
          title + tagline, three bullets, link. */}
      <Section tone="base" className="pt-6 md:pt-8">
        <ol className="card divide-y divide-border p-0">
          {dict.services.map((s) => {
            const img = SERVICE_IMAGES[s.slug];
            const href = localized(lang, `/services/${s.slug}`);
            return (
              <li key={s.slug}>
                <Link href={href} className="group grid items-center gap-5 p-5 transition-colors hover:bg-accent-soft/40 md:grid-cols-[11rem_minmax(0,1fr)_auto] md:gap-8 md:p-6">
                  {img && (
                    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl border border-border bg-bg-card md:w-44">
                      <Image src={img} alt="" fill sizes="(min-width: 768px) 176px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold text-text transition-colors group-hover:text-accent-strong md:text-2xl">{s.title}</h2>
                    <p className="tagline mt-1 text-sm font-medium">{s.tagline}</p>
                    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                      {s.bullets.slice(0, 3).map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-text-dim">
                          <Check width={16} height={16} className="mt-0.5 shrink-0 text-accent" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent md:justify-self-end">
                    {dict.common.readMore}
                    <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </Section>

      <ContactCta dict={dict} lang={lang} />
    </PageShell>
  );
}
