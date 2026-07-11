import type { Metadata } from "next";
import Image from "next/image";
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
  });
}

/**
 * Portfolio mockups live in /public — mapped by slug here so the dictionaries
 * stay copy-only (images are locale-independent).
 */
const PORTFOLIO_IMAGES: Record<string, string> = {
  "garage-biver": "/portfolio/garage-biver.jpg",
  vitrophy: "/portfolio/vitrophy.jpg",
  "cim-by-cacr": "/portfolio/cim-by-cacr.jpg",
  "pauly-losch": "/portfolio/pauly-losch.jpg",
  autodis: "/portfolio/autodis.jpg",
  isomontage: "/portfolio/isomontage.jpg",
  blumenthal: "/portfolio/blumenthal.jpg",
  "lux-habitat": "/portfolio/lux-habitat.png",
  "momento-relojero": "/portfolio/momento-relojero.jpg",
};

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
          title={work.title}
          lead={work.lead}
        />

        {/* Case studies — alternating image/text rows */}
        <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
          {work.cases.map((cs, index) => {
            const reversed = index % 2 === 1;
            return (
              <article
                key={cs.slug}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-sm)] ${
                    reversed ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={PORTFOLIO_IMAGES[cs.slug]}
                    alt={`${cs.name} — ${cs.sector}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top"
                    quality={85}
                    priority={index === 0}
                  />
                </div>

                <div className={reversed ? "lg:order-1" : ""}>
                  <span className="section-eyebrow eyebrow-badge font-mono text-xs uppercase tracking-[0.22em]">
                    {work.caseEyebrow}
                  </span>
                  <h2 className="mt-4 text-2xl font-bold leading-[1.1] text-text md:text-3xl">
                    {cs.name}
                  </h2>
                  <p className="mt-2 font-mono text-sm text-text-muted">
                    {cs.sector}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {cs.tags.map((tag) => (
                      <li key={tag} className="chip">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <dl className="mt-7 space-y-6">
                    <div>
                      <dt className="text-sm font-semibold text-text">
                        {work.contextLabel}
                      </dt>
                      <dd className="mt-2 text-text-dim">{cs.context}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-text">
                        {work.deliveredLabel}
                      </dt>
                      <dd className="mt-2 text-text-dim">{cs.delivered}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            );
          })}
        </div>

        {/* Other projects — card grid */}
        <ul className="mt-20 grid gap-6 md:mt-28 md:grid-cols-2 lg:grid-cols-3">
          {work.projects.map((project) => (
            <li key={project.slug}>
              <article className="card card-hover h-full overflow-hidden">
                <div className="relative aspect-[4/3] border-b border-border">
                  <Image
                    src={PORTFOLIO_IMAGES[project.slug]}
                    alt={`${project.name} — ${project.sector}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top"
                    quality={80}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-text">
                    {project.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-text-muted">
                    {project.sector}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li key={tag} className="chip">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm leading-relaxed text-text-dim">
                    {project.summary}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Transparency note */}
        <div className="mt-14 rounded-xl border border-dashed border-border bg-surface/60 p-5 md:mt-16 md:p-6">
          <p className="text-sm text-text-dim">{work.note}</p>
        </div>
      </Section>

      <ContactCta dict={dict} lang={lang} />
    </PageShell>
  );
}
