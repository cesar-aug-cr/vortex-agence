import type { Metadata } from "next";
import Link from "next/link";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { localized } from "@/lib/locale";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactCta } from "@/components/sections/ContactCta";
import { featureIcons } from "@/components/illustrations/icons";
import { ArrowUpRight } from "@/components/ui/icons";

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

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
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

        <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => {
            const Cover = featureIcons[a.cover];
            return (
              <Link
                key={a.slug}
                href={localized(lang, `/news/${a.slug}`)}
                className="card card-hover group flex flex-col overflow-hidden"
              >
                <div className="illu-stage relative flex h-44 items-center justify-center overflow-hidden border-b border-border">
                  {Cover && <Cover className="h-28 w-28" />}
                  <span className="absolute left-4 top-4 rounded-full border border-border bg-bg/70 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wide text-text-dim backdrop-blur-sm">
                    {a.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-xs text-text-muted">
                    {formatDate(a.date)} · {a.readingMinutes} {dict.news.readingTime}
                  </span>
                  <h2 className="mt-3 text-lg font-semibold leading-snug text-text transition-colors group-hover:text-accent">
                    {a.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm text-text-dim">{a.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    {dict.news.readArticle}
                    <ArrowUpRight width={15} height={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
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
