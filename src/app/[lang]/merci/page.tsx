import type { Metadata } from "next";
import Link from "next/link";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { localized } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";

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
    path: "/merci",
    title: dict.pages.thanks.metaTitle,
    description: dict.pages.thanks.lead,
    index: false,
  });
}

export default async function MerciPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);

  return (
    <PageShell dict={dict} lang={lang}>
      <Section tone="base" className="pt-28 md:pt-32">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <h1 className="mt-6 text-3xl font-bold text-text md:text-4xl">
            {dict.pages.thanks.title}
          </h1>
          <p className="mt-4 text-lg text-text-dim">{dict.pages.thanks.lead}</p>
          <div className="mt-8 flex justify-center">
            <Link href={localized(lang, "/")} className="btn btn-primary">
              {dict.pages.thanks.cta}
            </Link>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
