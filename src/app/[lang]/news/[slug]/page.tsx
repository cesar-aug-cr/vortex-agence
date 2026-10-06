import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
import { ArticleCta } from "@/components/news/ArticleCta";
import { ShareButton } from "@/components/news/ShareButton";
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
    title: `${article.title} | vortx`,
    description: article.metaDescription || article.excerpt,
  });
}

const DATE_LOCALE: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
  de: "de-DE",
  es: "es-ES",
};

function formatDate(iso: string, lang: Locale) {
  return new Intl.DateTimeFormat(DATE_LOCALE[lang] ?? "fr-FR", {
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
  // Realistic cover photo: public/news/<slug>.webp (variants from
  // scripts/build-images.mjs), shown as a full-bleed band with the breadcrumbs.
  const coverImage = article.coverImage;
  const toc = article.body.filter(
    (b): b is Extract<ArticleBlock, { type: "h2" }> => b.type === "h2"
  );
  // The paragraphs before the first h2 are the introduction: they open the
  // page with the header; the table of contents starts with the first h2.
  const firstH2 = article.body.findIndex((b) => b.type === "h2");
  const intro = firstH2 > 0 ? article.body.slice(0, firstH2) : [];
  const rest = firstH2 > 0 ? article.body.slice(firstH2) : article.body;
  const related = dict.news.articles.filter((a) => a.slug !== article.slug).slice(0, 2);
  const shareUrl = `${site.url}${localized(lang, `/news/${article.slug}`)}`;
  const shareLabels = {
    share: dict.news.shareLabel,
    copy: dict.news.shareCopy,
    copied: dict.news.shareCopied,
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: `${shareUrl}/opengraph-image`,
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
      {/* Full-bleed photo band — only when the article has a realistic cover
          photo (`coverImage`, see above). Breadcrumbs sit inside it. The
          category's animated icon is shown next to the title instead. */}
      {coverImage ? (
        <div className="relative overflow-hidden bg-stage">
          <Image src={coverImage} alt="" fill priority sizes="100vw" className="object-cover" />
          {/* top scrim so the breadcrumbs stay legible on any photo */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-80" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0) 100%)" }} />
          <div className="container-vortx relative z-10">
            <div className="mx-auto max-w-5xl">
              <Breadcrumbs
                lang={lang}
                homeLabel={dict.common.breadcrumbHome}
                items={[
                  { label: dict.nav.news, href: "/news" },
                  { label: article.title },
                ]}
                className="pt-28 md:pt-32"
                tone="stage"
              />
              <div className="h-56 md:h-80" />
            </div>
          </div>
        </div>
      ) : (
        <Breadcrumbs
          lang={lang}
          homeLabel={dict.common.breadcrumbHome}
          items={[
            { label: dict.nav.news, href: "/news" },
            { label: article.title },
          ]}
        />
      )}

      {/* 1. Opening: category, title, excerpt, meta, AI summary and the
          introduction, at the width of the content grid below. */}
      <Section tone="base" className="pb-0 pt-10 md:pb-0 md:pt-12">
        <div className="mx-auto max-w-5xl">
          {/* header */}
          <header>
            <span className="section-eyebrow eyebrow-badge font-mono text-xs font-bold uppercase tracking-[0.22em]">
              {article.category}
            </span>
            {/* category icon (one animated icon per category) on the left of
                the title only — eyebrow above, excerpt and meta below span the
                full width */}
            <div className="mt-4 flex items-center gap-5 md:gap-7">
              {Cover && (
                <div className="illu-stage flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-border md:h-28 md:w-28">
                  <Cover className="h-14 w-14 md:h-20 md:w-20" />
                </div>
              )}
              <h1 className="min-w-0 flex-1 text-3xl font-bold leading-[1.1] text-text md:text-5xl">
                {article.title}
              </h1>
            </div>
            <p className="mt-5 text-lg text-text-dim">{article.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-text-muted">
              <span>{dict.news.by} {article.author}</span>
              <span aria-hidden>·</span>
              <span>{dict.news.publishedOn} {formatDate(article.date, lang)}</span>
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
              showLabel={dict.news.summaryShow}
              hideLabel={dict.news.summaryHide}
            />
          )}

          {intro.length > 0 && (
            <div className="mt-10">
              <ArticleBody blocks={intro} />
            </div>
          )}
        </div>
      </Section>

      {/* 2. Table of contents + the rest of the article, as before. */}
      <Section tone="base" className="pt-12 md:pt-16">
        <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
          {/* desktop — sticky left sidebar table of contents + share */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <ArticleToc
                items={toc.map((h) => ({ id: h.id, text: h.text }))}
                title={dict.news.tocTitle}
                variant="desktop"
              />
              <ShareButton url={shareUrl} title={article.title} labels={shareLabels} variant="panel" />
            </div>
          </aside>

          <article className="min-w-0">
          {/* mobile — sticky clickable table of contents under the nav */}
          <ArticleToc
            items={toc.map((h) => ({ id: h.id, text: h.text }))}
            title={dict.news.tocTitle}
            variant="mobile"
          />

          {/* body */}
          <div className="mt-10 lg:mt-0">
            <ArticleBody blocks={rest} />
          </div>

          {/* in-article conversion CTA — before the "go further" links */}
          <ArticleCta
            title={dict.news.articleCtaTitle}
            text={dict.news.articleCtaText}
            button={dict.news.articleCtaButton}
            lang={lang}
          />

          {/* internal links — go further */}
          {article.links && article.links.length > 0 && (
            <ArticleLinks links={article.links} title={dict.news.linksTitle} lang={lang} />
          )}

          {/* back link + share */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            <Link
              href={localized(lang, "/news")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
            >
              ← {dict.news.backToNews}
            </Link>
            <ShareButton url={shareUrl} title={article.title} labels={shareLabels} variant="inline" />
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
                  className="card card-hover spotlight-card group p-6"
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
