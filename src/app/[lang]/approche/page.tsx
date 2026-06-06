import type { Metadata } from "next";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Process } from "@/components/sections/Process";
import { LeadGen } from "@/components/sections/LeadGen";
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
    path: "/approche",
    title: dict.meta.approach.title,
    description: dict.meta.approach.description,
  });
}

export default async function ApprochePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);

  return (
    <PageShell dict={dict} lang={lang}>
      <Breadcrumbs
        lang={lang}
        homeLabel={dict.common.breadcrumbHome}
        items={[{ label: dict.nav.approach }]}
      />

      <Process dict={dict} />
      <LeadGen dict={dict} />
      <ContactCta dict={dict} lang={lang} />
    </PageShell>
  );
}
