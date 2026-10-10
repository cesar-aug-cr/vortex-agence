import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { FeaturedPhotoCell } from "@/components/sections/FeaturedPhotoCell";
import { featureIcons } from "@/components/illustrations/icons";
import { ArrowRight } from "@/components/ui/icons";
import { localized } from "@/lib/locale";

type MethodStep = {
  icon: string;
  title: string;
  desc: string;
  /** Canonical internal paths (e.g. "/services/sites-web"), localized here. */
  links?: readonly { href: string; label: string }[];
};

export type ServiceMethodContent = {
  eyebrow: string;
  title: string;
  lead: string;
  steps: readonly ({ n: string } & MethodStep)[];
};

/** Method written for one page — keyed by "slug" or "slug/child" in servicesDetail.methods. */
export type ServiceMethodPage = {
  title: string;
  lead: string;
  steps: readonly MethodStep[];
};

/**
 * "Our method" — four steps on every service & sub-service page. Pages listed
 * in `pages` get their own heading, steps and banner photo
 * (public/methode/<slug>[-<child>].webp); the others fall back to the shared
 * text and /hero/methode.webp. A full-width photo banner carries the heading;
 * the four steps sit on one continuous lime line, each icon on a round dark
 * stage, index underneath, then title and text. No cards.
 */
export function ServiceMethod({
  content,
  pages,
  path,
  lang,
}: {
  content: ServiceMethodContent;
  pages: object;
  /** "slug" or "slug/child". */
  path: string;
  lang: string;
}) {
  const own = (pages as Record<string, ServiceMethodPage | undefined>)[path];
  const title = own?.title ?? content.title;
  const lead = own?.lead ?? content.lead;
  const steps: readonly MethodStep[] = own?.steps ?? content.steps;
  const src = own ? `/methode/${path.replace("/", "-")}.webp` : "/hero/methode.webp";

  return (
    <Section tone="base">
      <FeaturedPhotoCell
        eyebrow={content.eyebrow}
        title={title}
        lead={lead}
        src={src}
        position="center 40%"
        layout="banner"
      />

      <ol className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-6">
        <span
          className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-[color:var(--accent)] via-[color:var(--accent)]/40 to-transparent md:block"
          aria-hidden
        />
        {steps.map((step, i) => {
          const Icon = featureIcons[step.icon];
          return (
            <li key={step.title} className="relative">
              <div className="flex items-center gap-4 md:flex-col md:items-start">
                <span className="illu-stage relative z-10 inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-accent/40">
                  {Icon && <Icon className="h-14 w-14" />}
                </span>
                <span className="font-mono text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-text">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-dim">{step.desc}</p>
              {step.links && step.links.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {step.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={localized(lang, l.href)}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-accent-strong hover:underline"
                      >
                        {l.label}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
