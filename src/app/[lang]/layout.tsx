import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { i18n, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { ThemeSync } from "@/components/theme/ThemeSync";
import { ConsentScript } from "@/components/layout/ConsentScript";
import { A11yScript } from "@/components/layout/A11yScript";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { ConsentBanner } from "@/components/layout/ConsentBanner";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = "https://vortx.lu";

// Daily ISR: lets statically-generated pages refresh on their own so the
// dynamic year / "X ans d'expérience" counters roll over after Jan 1 with no
// redeploy. Applies as the default for every page under this segment.
export const revalidate = 86400;

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : i18n.defaultLocale;
  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.home.title,
      template: "%s",
    },
    description: dict.meta.home.description,
    applicationName: "vortx",
    authors: [{ name: "vortx" }],
    creator: "vortx",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(i18n.locales.map((l) => [l, `/${l}`])),
        "x-default": `/${i18n.defaultLocale}`,
      },
    },
    openGraph: {
      type: "website",
      locale: "fr_LU",
      siteName: "vortx",
      title: dict.meta.home.title,
      description: dict.meta.home.description,
      url: `/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.home.title,
      description: dict.meta.home.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <A11yScript />
        <ConsentScript />
      </head>
      <body className={`${interTight.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeSync />
        <SchemaMarkup />
        {children}
        <ConsentBanner lang={lang} consent={dict.consent} />
      </body>
    </html>
  );
}
