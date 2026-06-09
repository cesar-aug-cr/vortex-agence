import type { Metadata } from "next";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/ui/Section";
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
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent-strong">
              {dict.contact.eyebrow}
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-[1.08] text-text md:text-5xl">
              {dict.contact.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-text-dim">{dict.contact.lead}</p>

            <div className="mt-10">
              <ContactForm lang={lang} form={dict.contact.form} services={services} />
            </div>
          </div>

          {/* Direct channels + benefits */}
          <aside className="lg:pt-10">
            <div className="rounded-2xl border border-border bg-bg-card p-7">
              <p className="font-mono text-xs uppercase tracking-wide text-text-muted">
                {dict.footer.contactTitle}
              </p>
              <ul className="mt-4 grid gap-3 text-sm">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="font-medium text-text transition-colors hover:text-accent"
                  >
                    {site.email}
                  </a>
                </li>
                {site.phone && (
                  <li>
                    <a
                      href={`tel:${site.phone.replace(/\s+/g, "")}`}
                      className="font-medium text-text transition-colors hover:text-accent"
                    >
                      {site.phone}
                    </a>
                  </li>
                )}
                <li className="text-text-dim">{dict.footer.location}</li>
              </ul>
            </div>

            <ul className="mt-8 grid gap-3">
              {dict.contact.benefits.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-text-dim">
                  <Check width={16} height={16} className="text-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            url: `${site.url}/${lang}/contact`,
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
