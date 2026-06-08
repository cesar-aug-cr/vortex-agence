import type { Metadata } from "next";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/metadata";
import { yearsOfExperience } from "@/lib/dates";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Tools } from "@/components/sections/Tools";
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
  const a = dict.agence;
  const years = yearsOfExperience();

  return (
    <PageShell dict={dict} lang={lang}>
      <Breadcrumbs
        lang={lang}
        homeLabel={dict.common.breadcrumbHome}
        items={[{ label: dict.nav.about }]}
      />

      {/* intro + story + dynamic experience counter */}
      <Section tone="base" className="pt-10 md:pt-12">
        <SectionHeading eyebrow={a.eyebrow} title={a.title} lead={a.lead} />

        <div className="mt-14 grid gap-10 md:mt-16 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <div className="space-y-5">
            {a.story.map((p) => (
              <p key={p} className="text-lg leading-relaxed text-text-dim">
                {p}
              </p>
            ))}
          </div>

          {/* experience card — counter rolls over each Jan 1 (ISR) */}
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-bg-card p-8 text-center">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              style={{
                backgroundImage:
                  "radial-gradient(75% 75% at 50% 30%, rgba(200,240,46,0.12), transparent 70%)",
              }}
            />
            <span className="relative font-mono text-7xl font-bold leading-none text-accent md:text-8xl">
              {years}
            </span>
            <span className="relative mt-3 text-lg font-semibold text-text">
              {a.experience.suffix} {a.experience.label}
            </span>
            <span className="relative mt-1 text-sm text-text-muted">
              {a.experience.note}
            </span>
          </div>
        </div>

        {/* stats band */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {a.stats.map((s) => (
            <div
              key={s.label}
              className="card flex flex-col items-center justify-center p-6 text-center"
            >
              <span className="font-mono text-3xl font-bold text-accent md:text-4xl">
                {s.value}
              </span>
              <span className="mt-2 text-sm text-text-dim">{s.label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* what distinguishes us — pillars */}
      <Section tone="muted">
        <SectionHeading eyebrow={dict.trust.eyebrow} title={a.valuesTitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {dict.trust.pillars.map((p) => (
            <div key={p.title} className="card p-7">
              <h3 className="text-lg font-semibold text-text">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-dim">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* guarantees */}
        <div className="mt-8 rounded-2xl border border-border bg-bg-card p-8">
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

      {/* arsenal — reuses the homepage "Notre arsenal" section verbatim */}
      <Tools dict={dict} />

      <ContactCta dict={dict} lang={lang} />
    </PageShell>
  );
}
