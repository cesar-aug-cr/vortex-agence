import type { Metadata } from "next";
import Image from "next/image";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { localized } from "@/lib/locale";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { withEmphasis } from "@/lib/emphasis";
import { ContactForm } from "@/components/forms/ContactForm";
import { Check } from "@/components/ui/icons";

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
    path: "/contact",
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  const services = dict.services.map((s) => ({ slug: s.slug, title: s.title }));

  return (
    <PageShell dict={dict} lang={lang}>
      <Breadcrumbs
        lang={lang}
        homeLabel={dict.common.breadcrumbHome}
        items={[{ label: dict.nav.contact }]}
      />

      <Section tone="base" className="pt-10 md:pt-12">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Intro + form */}
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] eyebrow-badge section-eyebrow">
              {dict.contact.eyebrow}
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-[1.08] text-text md:text-5xl">
              {withEmphasis(dict.contact.title)}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-text-dim">{dict.contact.lead}</p>

            <div className="mt-10">
              <ContactForm lang={lang} form={dict.contact.form} services={services} />
            </div>
          </div>

          {/* Direct channels + benefits, laid over the office photo
              (images-test proposal 16: public/contact/bureau.webp, 1024×1024).
              The photo is dark, so the panel uses light text + brand lime
              regardless of theme. NOTE: AI render standing in for a real
              photo of the office. */}
          <aside className="lg:pt-10">
            <div className="relative flex min-h-[520px] flex-col justify-end overflow-hidden rounded-2xl border border-stage-border bg-stage text-stage-text shadow-[var(--shadow-lg)]">
              <Image
                src="/contact/bureau.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
              {/* scrim: clear at the top, near-opaque behind the text */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(7,7,10,0.05) 0%, rgba(7,7,10,0.45) 40%, rgba(7,7,10,0.9) 72%, rgba(7,7,10,0.96) 100%)",
                }}
              />

              <div className="relative p-7">
                <p className="font-mono text-xs font-bold uppercase tracking-wide text-stage-text-dim">
                  {dict.footer.contactTitle}
                </p>
                <ul className="mt-4 grid gap-3 text-sm">
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="font-medium text-stage-text transition-colors hover:text-[color:var(--accent)]"
                    >
                      {site.email}
                    </a>
                  </li>
                  {site.phone && (
                    <li>
                      <a
                        href={`tel:${site.phone.replace(/\s+/g, "")}`}
                        className="font-medium text-stage-text transition-colors hover:text-[color:var(--accent)]"
                      >
                        {site.phone}
                      </a>
                    </li>
                  )}
                  <li className="text-stage-text-dim">{dict.footer.location}</li>
                </ul>

                <ul className="mt-6 grid gap-3 border-t border-white/10 pt-6">
                  {dict.contact.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-stage-text-dim">
                      <Check width={16} height={16} className="shrink-0 text-[color:var(--accent)]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            url: `${site.url}${localized(lang, "/contact")}`,
            mainEntity: {
              "@type": "Organization",
              "@id": `${site.url}/#organization`,
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                email: site.email || undefined,
                telephone: site.phone || undefined,
                areaServed: "LU",
                availableLanguage: [...site.locales],
              },
            },
          }),
        }}
      />
    </PageShell>
  );
}
