import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { newsSlugs } from "@/lib/site";
import { renderOgImage } from "@/lib/og";

export const alt = "vortx — News · Marketing & web, Luxembourg";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return i18n.locales.flatMap((lang) =>
    newsSlugs.map((slug) => ({ lang, slug }))
  );
}

const NEWS_LABEL: Record<Locale, string> = {
  fr: "News",
  en: "News",
  de: "News",
  es: "Noticias",
};

/** Generic title when the slug is unknown — never throw for an OG image. */
const FALLBACK_TITLE: Record<Locale, string> = {
  fr: "Conseils marketing & web",
  en: "Marketing & web insights",
  de: "Marketing- & Web-Insights",
  es: "Consejos de marketing y web",
};

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;

  const newsLabel = NEWS_LABEL[lang] ?? NEWS_LABEL[i18n.defaultLocale];
  let eyebrow = `vortx · ${newsLabel}`;
  let title = FALLBACK_TITLE[lang] ?? FALLBACK_TITLE[i18n.defaultLocale];
  try {
    const dict = await getDictionary(lang);
    const article = dict.news.articles.find((a) => a.slug === slug);
    if (article) {
      title = article.title;
      eyebrow = `vortx · ${article.category}`;
    }
  } catch {
    // keep the generic fallbacks
  }

  return renderOgImage({ eyebrow, title });
}
