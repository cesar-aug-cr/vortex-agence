import type { Metadata } from "next";
import Link from "next/link";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { localized } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { PageFadeIn } from "@/components/layout/PageFadeIn";
import BlackHoleLazy from "@/components/three/BlackHoleLazy";

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
    path: "/merci",
    title: dict.pages.thanks.metaTitle,
    description: dict.pages.thanks.lead,
    index: false,
  });
}

export default async function MerciPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);

  return (
    <PageShell dict={dict} lang={lang}>
      <PageFadeIn />
      <section className="hero-section relative isolate flex min-h-svh items-center overflow-hidden bg-stage text-stage-text">
        {/* 3D black hole — the particle version from the original home hero,
            centred behind the content */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <BlackHoleLazy
            showSphere={false}
            bhPositionOverride={[0, 0, 0]}
            bhPositionMobileOverride={[0, 0, 1]}
            bhScaleOverride={1.7}
            eventHorizonColorLight="#ffffff"
            diskLimeOnLight
          />
        </div>
        {/* readability scrim between the 3D scene and the text — fades in 1s
            before the content. Dark theme: dark veil; light theme: lime veil
            (colour set per-theme in globals.css). Semi-transparent so the
            black hole stays visible underneath. */}
        <div className="thanks-scrim pointer-events-none absolute inset-0 z-[1]" aria-hidden />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/3"
          aria-hidden
          style={{ background: "linear-gradient(to top, var(--stage), transparent)" }}
        />

        <div className="thanks-content relative z-10 mx-auto w-full max-w-xl px-6 pb-16 pt-32 text-center md:pt-36">
          <span className="thanks-check relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <h1 className="mt-6 text-3xl font-bold md:text-4xl">
            {dict.pages.thanks.title}
          </h1>
          <p className="mt-4 text-lg text-stage-text-dim">{dict.pages.thanks.lead}</p>
          <div className="mt-8 flex justify-center">
            <Link href={localized(lang, "/")} className="btn btn-primary">
              {dict.pages.thanks.cta}
            </Link>
          </div>

          {/* keep the wait useful: marketing quiz */}
          <p className="mt-12 text-sm text-stage-text-dim">{dict.pages.thanks.quizLead}</p>
          <div className="mt-3 flex justify-center">
            <Link href={localized(lang, "/quiz")} className="btn btn-ghost">
              {dict.pages.thanks.quizCta}
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
