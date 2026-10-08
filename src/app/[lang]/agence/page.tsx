import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { featureIcons } from "@/components/illustrations/icons";
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
import { FeaturedPhotoCell } from "@/components/sections/FeaturedPhotoCell";
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

      {/* intro hero — heading + experience anchor, story + dynamic stats */}
      <section className="relative isolate scroll-mt-24 overflow-hidden pb-24 pt-10 md:pb-32 md:pt-14">
        {/* decorative brand background — radial glows + faint grid */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(46% 48% at 90% 0%, rgba(20,224,200,0.13), transparent 60%), radial-gradient(42% 48% at 0% 24%, rgba(200,240,46,0.13), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 text-text opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage: "radial-gradient(120% 85% at 50% 0%, #000, transparent 72%)",
              WebkitMaskImage: "radial-gradient(120% 85% at 50% 0%, #000, transparent 72%)",
            }}
          />
        </div>

        <div className="container-vortx relative">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-14">
            <div className="max-w-2xl">
              <span className="section-eyebrow eyebrow-badge font-mono text-xs font-bold uppercase tracking-[0.22em]">
                {a.eyebrow}
              </span>
              <h1 className="mt-4 text-4xl font-bold leading-[1.05] text-text md:text-5xl lg:text-6xl">
                {a.title}
              </h1>
              <p className="mt-5 text-lg text-text-dim">{a.lead}</p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link href={localized(lang, "/contact")} className="btn btn-primary">
                  {dict.common.cta}
                </Link>
                <Link
                  href={localized(lang, "/approche")}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-accent-strong"
                >
                  {dict.nav.approach}
                  <ArrowRight
                    width={16}
                    height={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            {/* team photo with the experience counter in overlay (counter rolls
                over each Jan 1 — ISR). Image from images-test proposal 15:
                public/agence/equipe.webp, 1024×1536, shown 4:5 object-cover.
                NOTE: it is an AI render used as a placeholder for framing until
                a real photo shoot — the people in it do not exist. The full
                "years · note" line also lives in the footer. */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-stage-border bg-stage text-stage-text shadow-[var(--shadow-lg)]">
              <Image
                src="/agence/equipe.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stage via-stage/70 to-transparent px-6 pb-6 pt-16">
                {/* Always-dark overlay → force brand lime (the light-theme
                    `.text-accent` → olive override would be illegible here). */}
                <span className="font-mono text-5xl font-bold leading-none text-[color:var(--accent)] md:text-6xl">
                  {years}
                </span>
                <span className="ml-2 text-lg font-semibold">
                  {a.experience.suffix} {a.experience.label}
                </span>
              </div>
            </div>
          </div>

          {/* story — six chapters in a zigzag: photo on one side, text on the
              other, alternating
              (public/agence/histoire-<n>.webp, 1024², natural colours). */}
          <ol className="mx-auto mt-14 grid max-w-5xl gap-12 md:mt-16 md:gap-16">
            {a.story.map((p, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={p} className="grid items-center gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10">
                  <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-bg-card shadow-[var(--shadow-md)] ${flip ? "md:order-2" : ""}`}>
                    <Image
                      src={`/agence/histoire-${i + 1}.webp`}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 400px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className={flip ? "md:order-1" : ""}>
                    <span className="mb-4 block h-0.5 w-12 bg-[color:var(--accent)]" aria-hidden />
                    <p className="text-lg leading-relaxed text-text-dim md:text-xl md:leading-relaxed">{p}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* stats band */}
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {a.stats.map((s) => (
              <div
                key={s.label}
                className="card card-hover flex flex-col items-center justify-center p-7 text-center"
              >
                <span className="font-mono text-3xl font-bold text-accent md:text-4xl">
                  {s.value}
                </span>
                <span className="mt-2 text-sm text-text-dim">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* what distinguishes us — the home photo cell beside an editorial list:
          big index, icon, title and text, separated by thin rules */}
      <Section tone="muted">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <FeaturedPhotoCell
            eyebrow={dict.trust.eyebrow}
            title={a.valuesTitle}
            lead={dict.trust.lead}
            src="/agence/distingue.webp"
            position="center 35%"
          />
          <ol className="divide-y divide-border">
            {dict.trust.pillars.map((p, i) => {
              const Icon = pillarIcons[i % pillarIcons.length];
              return (
                <li
                  key={p.title}
                  className="grid grid-cols-[2.5rem_3.5rem_1fr] items-start gap-4 py-6 first:pt-0 last:pb-0 sm:grid-cols-[3rem_4rem_1fr] sm:gap-5"
                >
                  <span className="pt-1 font-mono text-2xl font-bold text-accent/60">0{i + 1}</span>
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="h-9 w-9" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-text">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-dim">{p.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* guarantees */}
        <div className="card mt-8 p-8">
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
          {dict.process.steps.map((step) => {
            const Icon = featureIcons[step.icon];
            return (
              <li key={step.n} className="card card-hover relative p-7">
                <div className="flex items-start justify-between gap-4">
                  {/* same animated icon set as the method band on the service pages */}
                  <div className="illu-stage flex h-28 w-28 items-center justify-center rounded-xl border border-border">
                    {Icon && <Icon className="h-20 w-20" />}
                  </div>
                  <span className="font-mono text-3xl font-bold text-accent/30">{step.n}</span>
                </div>
                <h3 className="mt-5 text-base font-semibold text-text">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-dim">{step.desc}</p>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* arsenal — reuses the homepage "Notre arsenal" section verbatim */}
      <Tools dict={dict} />

      <ContactCta dict={dict} lang={lang} />
    </PageShell>
  );
}
