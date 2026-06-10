import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import type { ArticleBlock } from "@/i18n/dictionaries/fr";
import { localized } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { ContactCta } from "@/components/sections/ContactCta";
import { ArticleBody } from "@/components/news/ArticleBody";
import { ArticleToc } from "@/components/news/ArticleToc";
import { AiSummary } from "@/components/news/AiSummary";
import { ArticleLinks } from "@/components/news/ArticleLinks";
import { featureIcons } from "@/components/illustrations/icons";
import { ArrowRight } from "@/components/ui/icons";

export async function generateStaticParams() {
  const dict = await getDictionary(i18n.defaultLocale);
  return i18n.locales.flatMap((lang) =>
    dict.news.articles.map((a) => ({ lang, slug: a.slug }))
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
  const article = dict.news.articles.find((a) => a.slug === slug);
  if (!article) return {};
  return buildMetadata({
    lang,
    path: `/news/${slug}`,
    title: `${article.title} | ${dict.nav.news} vortx`,
    description: article.excerpt,
  });
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  const article = dict.news.articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const Cover = featureIcons[article.cover];
  const toc = article.body.filter(
    (b): b is Extract<ArticleBlock, { type: "h2" }> => b.type === "h2"
  );
  const related = dict.news.articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: `${site.url}/opengraph-image`,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: lang,
    mainEntityOfPage: `${site.url}${localized(lang, `/news/${article.slug}`)}`,
    articleSection: article.category,
  };

  return (
    <PageShell dict={dict} lang={lang}>
      <Breadcrumbs
        lang={lang}
        homeLabel={dict.common.breadcrumbHome}
        items={[
          { label: dict.nav.news, href: "/news" },
          { label: article.title },
        ]}
      />

      <Section tone="base" className="pt-10 md:pt-12">
        <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
          {/* desktop — sticky left sidebar table of contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <ArticleToc
                items={toc.map((h) => ({ id: h.id, text: h.text }))}
                title={dict.news.tocTitle}
                variant="desktop"
              />
            </div>
          </aside>

          <article className="min-w-0">
          {/* mobile — sticky clickable table of contents under the nav */}
          <ArticleToc
            items={toc.map((h) => ({ id: h.id, text: h.text }))}
            title={dict.news.tocTitle}
            variant="mobile"
          />

          {/* header */}
          <header>
            <span className="inline-flex rounded-full border border-border px-3 py-1 font-mono text-xs uppercase tracking-wide text-accent">
              {article.category}
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-[1.1] text-text md:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-lg text-text-dim">{article.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-text-muted">
              <span>{dict.news.by} {article.author}</span>
              <span aria-hidden>·</span>
              <span>{dict.news.publishedOn} {formatDate(article.date)}</span>
              <span aria-hidden>·</span>
              <span>{article.readingMinutes} {dict.news.readingTime}</span>
            </div>
          </header>

          {/* AI-generated summary */}
          {article.summary && (
            <AiSummary
              summary={article.summary}
              label={dict.news.summaryLabel}
              disclaimer={dict.news.summaryDisclaimer}
              pointsLabel={dict.news.summaryPointsLabel}
            />
          )}

          {/* cover */}
          {Cover && (
            <div className="illu-stage mt-10 flex h-56 items-center justify-center overflow-hidden rounded-2xl border border-border md:h-72">
              <Cover className="h-40 w-40 md:h-48 md:w-48" />
            </div>
          )}

          {/* body */}
          <div className="mt-10">
            <ArticleBody blocks={article.body} />
          </div>

          {/* internal links — go further */}
          {article.links && article.links.length > 0 && (
            <ArticleLinks links={article.links} title={dict.news.linksTitle} lang={lang} />
          )}

          {/* back link */}
          <div className="mt-12 border-t border-border pt-8">
            <Link
              href={localized(lang, "/news")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
            >
              ← {dict.news.backToNews}
            </Link>
          </div>
          </article>
        </div>

        {/* related */}
        {related.length > 0 && (
          <div className="mx-auto mt-16 max-w-3xl">
            <h2 className="text-xl font-semibold text-text">{dict.news.relatedTitle}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={localized(lang, `/news/${a.slug}`)}
                  className="card card-hover group p-6"
                >
                  <span className="font-mono text-xs text-text-muted">{a.category}</span>
                  <h3 className="mt-2 font-semibold text-text transition-colors group-hover:text-accent">
                    {a.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    {dict.news.readArticle}
                    <ArrowRight width={15} height={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Section>

      <ContactCta dict={dict} lang={lang} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </PageShell>
  );
}
