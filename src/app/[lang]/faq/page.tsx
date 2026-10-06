import type { Metadata } from "next";
import Image from "next/image";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactCta } from "@/components/sections/ContactCta";
import { FaqList } from "@/components/sections/FaqList";
import { ArticleToc } from "@/components/news/ArticleToc";
import { faqGroupId } from "@/lib/faq";

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
    path: "/faq",
    title: dict.meta.faq.title,
    description: dict.meta.faq.description,
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);

  const tocItems = dict.faqPage.groups.map((g) => ({
    id: faqGroupId(g.title),
    text: g.title,
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faqPage.groups.flatMap((g) =>
      g.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      }))
    ),
  };

  return (
    <PageShell dict={dict} lang={lang}>
      <Breadcrumbs
        lang={lang}
        homeLabel={dict.common.breadcrumbHome}
        items={[{ label: dict.nav.faq }]}
      />

      <Section tone="base" className="pt-10 md:pt-12">
        <SectionHeading
          level="h1"
          eyebrow={dict.faqPage.eyebrow}
          title={dict.faqPage.title}
          lead={dict.faqPage.lead}
        />

        {/* Opening banner (images-test proposal 39): public/bandeaux/faq.webp,
            1536×1024, glass question marks. Kept low (≤ 224 px) so the summary and the
            search stay near the fold. Decorative AI render: empty alt, like
            the other promoted visuals. */}
        <div
          aria-hidden
          className="relative mt-10 h-40 w-full overflow-hidden rounded-2xl border border-border bg-stage md:h-56"
        >
          <Image
            src="/bandeaux/faq.webp"
            alt=""
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-10 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
          {/* desktop — sticky left sidebar summary (scroll-spy) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <ArticleToc items={tocItems} title={dict.faqPage.tocTitle} variant="desktop" />
            </div>
          </aside>

          <div className="min-w-0">
            {/* mobile — sticky collapsible summary bar under the nav */}
            <ArticleToc items={tocItems} title={dict.faqPage.tocTitle} variant="mobile" />

            <FaqList
              groups={dict.faqPage.groups}
              searchPlaceholder={dict.faqPage.searchPlaceholder}
              countSuffix={dict.faqPage.countSuffix}
              emptyLabel={dict.faqPage.emptyLabel}
            />
          </div>
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
