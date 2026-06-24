import type { Metadata } from "next";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { Approach } from "@/components/sections/Approach";
import { Reviews } from "@/components/sections/Reviews";
import { ContactCta } from "@/components/sections/ContactCta";
import { Plus } from "@/components/ui/icons";

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
    path: "/approche",
    title: dict.meta.approach.title,
    description: dict.meta.approach.description,
  });
}

export default async function ApprochePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);

  const faq = dict.approachPage.faq;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <PageShell dict={dict} lang={lang}>
      <Breadcrumbs
        lang={lang}
        homeLabel={dict.common.breadcrumbHome}
        items={[{ label: dict.nav.approach }]}
      />

      <Approach dict={dict} />

      <Reviews dict={dict} />

      <Section tone="muted" containerClassName="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <span className="section-eyebrow eyebrow-badge font-mono text-xs uppercase tracking-[0.22em]">
            {faq.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-text md:text-4xl">{faq.title}</h2>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {faq.items.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-text marker:hidden">
                {item.q}
                <Plus
                  width={20}
                  height={20}
                  className="shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="mt-3 max-w-2xl text-text-dim">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <ContactCta dict={dict} lang={lang} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </PageShell>
  );
}
