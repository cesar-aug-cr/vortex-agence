import type { Metadata } from "next";
import Link from "next/link";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { localized } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { yearsOfExperience } from "@/lib/dates";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Tools } from "@/components/sections/Tools";
import { ContactCta } from "@/components/sections/ContactCta";
import { IconStrategy, IconConversion, IconLocal, IconAI } from "@/components/sections/WhyIcons";
import { Check, ArrowRight } from "@/components/ui/icons";

const pillarIcons = [IconStrategy, IconConversion, IconLocal, IconAI];

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
        <SectionHeading level="h1" eyebrow={a.eyebrow} title={a.title} lead={a.lead} />

        <div className="mt-14 grid gap-10 md:mt-16 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div className="space-y-5">
            {a.story.map((p) => (
              <p key={p} className="text-lg leading-relaxed text-text-dim">
                {p}
              </p>
            ))}
          </div>

          {/* experience card — counter rolls over each Jan 1 (ISR) */}
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-border bg-stage p-10 text-center text-stage-text">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              style={{
                backgroundImage:
                  "radial-gradient(80% 70% at 50% 0%, rgba(20,224,200,0.18), transparent 60%), radial-gradient(70% 60% at 50% 100%, rgba(200,240,46,0.14), transparent 60%)",
              }}
            />
            <span className="relative font-mono text-7xl font-bold leading-none text-accent md:text-8xl">
              {years}
            </span>
            <span className="relative mt-3 text-xl font-semibold">
              {a.experience.suffix} {a.experience.label}
            </span>
            <span className="relative mt-1 font-mono text-xs uppercase tracking-wide text-stage-text-dim">
              {a.experience.note}
            </span>
          </div>
        </div>

        {/* stats band */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {a.stats.map((s) => (
            <div
              key={s.label}
              className="card flex flex-col items-center justify-center p-7 text-center"
            >
              <span className="font-mono text-3xl font-bold text-accent md:text-4xl">
                {s.value}
              </span>
              <span className="mt-2 text-sm text-text-dim">{s.label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* what distinguishes us — pillars with icons */}
      <Section tone="muted">
        <SectionHeading eyebrow={dict.trust.eyebrow} title={a.valuesTitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {dict.trust.pillars.map((p, i) => {
            const Icon = pillarIcons[i % pillarIcons.length];
            return (
              <div key={p.title} className="card card-hover group p-7">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                    <Icon className="h-9 w-9" />
                  </span>
                  <span className="font-mono text-sm text-text-muted">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-text">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-dim">{p.desc}</p>
              </div>
            );
          })}
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

      {/* how we work — process timeline */}
      <Section tone="base">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={dict.process.eyebrow} title={dict.process.title} />
          <Link
            href={localized(lang, "/approche")}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-accent"
          >
            {dict.nav.approach}
            <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {dict.process.steps.map((step) => (
            <li key={step.n} className="card relative p-7">
              <span className="font-mono text-3xl font-bold text-accent/30">{step.n}</span>
              <h3 className="mt-3 text-base font-semibold text-text">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-dim">{step.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* arsenal — reuses the homepage "Notre arsenal" section verbatim */}
      <Tools dict={dict} />

      <ContactCta dict={dict} lang={lang} />
    </PageShell>
  );
}
