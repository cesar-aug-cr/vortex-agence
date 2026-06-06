import type { Metadata } from "next";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactCta } from "@/components/sections/ContactCta";
import { Check } from "@/components/ui/icons";

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
    path: "/agence",
    title: dict.meta.about.title,
    description: dict.meta.about.description,
  });
}

export default async function AgencePage({
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
        items={[{ label: dict.nav.about }]}
      />

      <Section tone="base" className="pt-10 md:pt-12">
        <SectionHeading
          eyebrow={dict.trust.eyebrow}
          title={dict.trust.title}
          lead={dict.trust.lead}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-16">
          {dict.trust.pillars.map((p) => (
            <div key={p.title} className="card p-7">
              <h2 className="text-lg font-semibold text-text">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-dim">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-bg-card p-8">
          <p className="text-sm font-medium text-text">{dict.proof.guaranteesTitle}</p>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {dict.proof.guarantees.map((g) => (
              <li key={g} className="flex items-center gap-2 text-sm text-text-dim">
                <Check width={16} height={16} className="text-accent" />
                {g}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ContactCta dict={dict} lang={lang} />
    </PageShell>
  );
}
