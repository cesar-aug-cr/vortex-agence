import type { FC } from "react";
import type { Metadata } from "next";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";
import { Check } from "@/components/ui/icons";
import type { SitesWebMotionProps } from "@/components/illustrations/sites-web-motion/types";
import LabA from "@/components/illustrations/sites-web-motion/LabA";
import LabB from "@/components/illustrations/sites-web-motion/LabB";
import LabC from "@/components/illustrations/sites-web-motion/LabC";

/**
 * TEMPORARY lab (delete before merge): renders the /services/sites-web hero
 * with each candidate motion graphic. `?v=a|b|c` renders a single variant.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

const VARIANTS: Record<string, FC<SitesWebMotionProps>> = { a: LabA, b: LabB, c: LabC };

export default async function MotionLab({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  const service = dict.services.find((s) => s.slug === "sites-web")!;
  const v = (await searchParams).v;
  const keys = typeof v === "string" && VARIANTS[v] ? [v] : Object.keys(VARIANTS);

  return (
    <PageShell dict={dict} lang={lang}>
      {keys.map((k) => {
        const Illu = VARIANTS[k];
        return (
          <Section key={k} tone="base" className="pt-10 md:pt-12">
            <div id={`lab-${k}`} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div className="order-2 lg:order-1">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] eyebrow-badge section-eyebrow">
                  Variant {k.toUpperCase()}
                </span>
                <h1 className="mt-4 text-3xl font-bold leading-[1.08] text-text md:text-5xl">
                  {service.title}
                </h1>
                <p className="tagline mt-3 text-lg font-medium">{service.tagline}</p>
                <p className="mt-5 max-w-xl text-lg text-text-dim">{service.short}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-text-dim">
                      <Check width={18} height={18} className="mt-0.5 shrink-0 text-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 lg:order-2">
                <div className="illu-stage overflow-hidden rounded-2xl border border-border p-4">
                  <Illu
                    className="h-auto w-full"
                    title={service.title}
                    tagline={service.tagline}
                    cta={dict.common.cta}
                  />
                </div>
              </div>
            </div>
          </Section>
        );
      })}
    </PageShell>
  );
}
