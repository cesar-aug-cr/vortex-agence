import type { Metadata } from "next";
import Link from "next/link";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { localized } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactCta } from "@/components/sections/ContactCta";
import { ArrowRight } from "@/components/ui/icons";

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
  });
}

export default async function RealisationsPage({
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
        items={[{ label: dict.nav.work }]}
      />

      <Section tone="base" className="pt-10 md:pt-12">
        <SectionHeading
          level="h1"
          eyebrow={dict.proof.eyebrow}
          title={dict.proof.title}
          lead={dict.proof.placeholderNote}
        />

        <div className="mt-12 rounded-2xl border border-dashed border-border bg-bg-card/60 p-10 text-center">
          <p className="mx-auto max-w-xl text-text-dim">
            {dict.proof.placeholderNote}
          </p>
          <div className="mt-8 flex justify-center">
            <Link href={localized(lang, "/contact")} className="btn btn-primary">
              {dict.common.cta}
              <ArrowRight width={18} height={18} />
            </Link>
          </div>
        </div>
      </Section>

      <ContactCta dict={dict} lang={lang} />
    </PageShell>
  );
}
