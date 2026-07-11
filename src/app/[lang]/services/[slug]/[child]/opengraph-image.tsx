import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { subServiceRoutes, hiddenSubServices } from "@/lib/site";
import { renderOgImage } from "@/lib/og";

export const alt = "vortx — Services · Luxembourg";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return i18n.locales.flatMap((lang) =>
    subServiceRoutes
      .filter((r) => !hiddenSubServices.has(r.child))
      .map((r) => ({ lang, slug: r.parent, child: r.child }))
  );
}

const EYEBROW_FALLBACK: Record<Locale, string> = {
  fr: "Services · Luxembourg",
  en: "Services · Luxembourg",
  de: "Leistungen · Luxemburg",
  es: "Servicios · Luxemburgo",
};

/** Generic title when the slug/child is unknown — never throw for an OG image. */
const FALLBACK_TITLE: Record<Locale, string> = {
  fr: "Agence marketing & web",
  en: "Marketing & web agency",
  de: "Marketing- & Web-Agentur",
  es: "Agencia de marketing y web",
};

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; slug: string; child: string }>;
}) {
  const { lang: raw, slug, child } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;

  let eyebrow = EYEBROW_FALLBACK[lang] ?? EYEBROW_FALLBACK[i18n.defaultLocale];
  let title = FALLBACK_TITLE[lang] ?? FALLBACK_TITLE[i18n.defaultLocale];
  try {
    const dict = await getDictionary(lang);
    const map = dict.subServices as Record<
      string,
      ReadonlyArray<{ slug: string; title: string }>
    >;
    const sub = map[slug]?.find((c) => c.slug === child);
    const parent = dict.services.find((s) => s.slug === slug);
    if (sub) title = sub.title;
    if (parent) eyebrow = parent.title;
  } catch {
    // keep the generic fallbacks
  }

  return renderOgImage({ eyebrow, title });
}
