import type { Metadata } from "next";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { localized } from "@/lib/locale";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactCta } from "@/components/sections/ContactCta";
import { NewsList } from "@/components/news/NewsList";

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
    path: "/news",
    title: dict.meta.news.title,
    description: dict.meta.news.description,
  });
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  const articles = [...dict.news.articles].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <PageShell dict={dict} lang={lang}>
      <Breadcrumbs
        lang={lang}
        homeLabel={dict.common.breadcrumbHome}
        items={[{ label: dict.nav.news }]}
      />

      <Section tone="base" className="pt-10 md:pt-12">
        <SectionHeading
          level="h1"
          eyebrow={dict.news.eyebrow}
          title={dict.news.title}
          lead={dict.news.lead}
        />

        <NewsList
          locale={lang}
          articles={articles.map((a) => ({
            slug: a.slug,
            href: localized(lang, `/news/${a.slug}`),
            category: a.category,
            title: a.title,
            excerpt: a.excerpt,
            date: a.date,
            readingMinutes: a.readingMinutes,
            cover: a.cover,
          }))}
          labels={{
            all: dict.news.allCategories,
            filterLabel: dict.news.filterLabel,
            readingTime: dict.news.readingTime,
            readArticle: dict.news.readArticle,
            empty: dict.news.emptyLabel,
          }}
        />
      </Section>

      <ContactCta dict={dict} lang={lang} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: dict.meta.news.title,
            url: `${site.url}${localized(lang, "/news")}`,
            inLanguage: lang,
            blogPost: articles.map((a) => ({
              "@type": "BlogPosting",
              headline: a.title,
              description: a.excerpt,
              datePublished: a.date,
              dateModified: a.updated ?? a.date,
              url: `${site.url}${localized(lang, `/news/${a.slug}`)}`,
            })),
          }),
        }}
      />
    </PageShell>
  );
}
