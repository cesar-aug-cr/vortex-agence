import type { Metadata } from "next";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactCta } from "@/components/sections/ContactCta";

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
    path: "/realisations",
    title: dict.meta.work.title,
    description: dict.meta.work.description,
    // Hidden for now: no case studies published yet (also removed from the
    // nav, footer, sitemap and llms.txt). Reachable by URL only, noindex.
    index: false,
  });
}

/* Placeholder page: no case studies are published for now, so it shows a
 * short "coming soon" message. The dictionaries still hold every project
 * (Proof.tsx uses them for alt text). */
export default async function RealisationsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  const work = dict.workPage;

  return (
    <PageShell dict={dict} lang={lang}>
      <Breadcrumbs
        lang={lang}
        homeLabel={dict.common.breadcrumbHome}
        items={[{ label: dict.nav.work }]}
      />

      <Section tone="base" className="pt-10 md:pt-12">
        <SectionHeading
          level="h1"
          eyebrow={work.eyebrow}
          title={work.comingSoon.title}
          lead={work.comingSoon.text}
        />
      </Section>

      <ContactCta dict={dict} lang={lang} />
    </PageShell>
  );
}
