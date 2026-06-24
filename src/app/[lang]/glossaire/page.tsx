import type { Metadata } from "next";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactCta } from "@/components/sections/ContactCta";
import { GlossaryList } from "@/components/glossary/GlossaryList";
import { ArticleToc } from "@/components/news/ArticleToc";
import { glossaryCategoryId } from "@/lib/glossary";

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
    path: "/glossaire",
    title: dict.meta.glossary.title,
    description: dict.meta.glossary.description,
  });
}

export default async function GlossairePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);

  // table of contents — one entry per category, in order of first appearance
  const tocItems: { id: string; text: string }[] = [];
  for (const t of dict.glossary.terms) {
    if (!tocItems.some((i) => i.text === t.category)) {
      tocItems.push({ id: glossaryCategoryId(t.category), text: t.category });
    }
  }

  const definedTermSetJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: dict.meta.glossary.title,
    description: dict.glossary.lead,
    hasDefinedTerm: dict.glossary.terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.def,
      inDefinedTermSet: dict.meta.glossary.title,
    })),
  };

  return (
    <PageShell dict={dict} lang={lang}>
      <Breadcrumbs
        lang={lang}
        homeLabel={dict.common.breadcrumbHome}
        items={[{ label: dict.nav.glossary }]}
      />

      <Section tone="base" className="pt-10 md:pt-12">
        <SectionHeading
          level="h1"
          eyebrow={dict.glossary.eyebrow}
          title={dict.glossary.title}
          lead={dict.glossary.lead}
        />

        <div className="mt-10 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
          {/* desktop — sticky left sidebar summary (scroll-spy) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <ArticleToc items={tocItems} title={dict.glossary.tocTitle} variant="desktop" />
            </div>
          </aside>

          <div className="min-w-0">
            {/* mobile — sticky collapsible summary bar under the nav */}
            <ArticleToc items={tocItems} title={dict.glossary.tocTitle} variant="mobile" />

            <GlossaryList
              terms={dict.glossary.terms}
              searchPlaceholder={dict.glossary.searchPlaceholder}
              countSuffix={dict.glossary.countSuffix}
              emptyLabel={dict.glossary.emptyLabel}
            />
          </div>
        </div>
      </Section>

      <ContactCta dict={dict} lang={lang} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetJsonLd) }}
      />
    </PageShell>
  );
}
