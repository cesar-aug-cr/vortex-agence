import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { i18n, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { headerCopy, stickyCopy } from "@/i18n/slices";
import { buildMetadata } from "@/lib/metadata";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SpotlightCards } from "@/components/ui/SpotlightCards";
import { PauseOffscreen } from "@/components/ui/PauseOffscreen";
import { StickyCta } from "@/components/layout/StickyCta";
import { HeroTestBH } from "@/components/sections/HeroTestBH";
import { WhyVortx } from "@/components/sections/WhyVortx";
import { Services } from "@/components/sections/Services";
import { LeadGen } from "@/components/sections/LeadGen";
import { ProcessGeo } from "@/components/sections/ProcessGeo";
import { Proof } from "@/components/sections/Proof";
import { Reviews } from "@/components/sections/Reviews";
import { NewsTeaser } from "@/components/sections/NewsTeaser";
import { Faq } from "@/components/sections/Faq";
import { ContactCta } from "@/components/sections/ContactCta";

/**
 * Page interne (FR uniquement, noindex, hors sitemap) : la home à l'identique,
 * mais les décors CSS (AmbientGlow, particules et étoiles du héros) sont
 * remplacés par une texture image unique — comparaison n° 42 de
 * /images-test-pour-voir, à juger en vraie grandeur.
 *
 * Texture : public/decor/texture-ambiante.webp (1536×1024, sombre, halos lime
 * et cyan), servie par les variantes statiques.
 */

const PATH = "/page-test-ok";

export async function generateStaticParams() {
  return [{ lang: i18n.defaultLocale }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    lang: isLocale(lang) ? lang : i18n.defaultLocale,
    path: PATH,
    title: "Page test — texture image vs décors CSS | vortx",
    description: "Page interne : la home avec une texture image à la place des décors CSS.",
    index: false,
  });
}

export default async function PageTestOk({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== i18n.defaultLocale) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Header copy={headerCopy(dict)} lang={lang} overHero sandbox />
      {/* No `bg-bg` on this wrapper (unlike the home): the sections are
          transparent, so the fixed texture below must be able to show through. */}
      <div className="relative isolate">
        {/* Texture layer — fixed, full viewport, behind everything (-z-10
            inside the isolated wrapper). The texture is a dark render while
            the site runs its curated LIGHT theme on an off-white ground; shown
            raw it would turn the page dark and break every light-theme token.
            So it plays the same role as the CSS AmbientGlow: a tint UNDER the
            page colour. The scrim is `--bg` at 86 % (color-mix), so in light
            theme the halos only tint the off-white surface, and in dark theme
            the same rule lets the texture read almost fully. The hero is an
            opaque dark stage, so the texture only starts below it — like the
            AmbientGlow mask. */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <Image
            src="/decor/texture-ambiante.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "color-mix(in srgb, var(--bg) 86%, transparent)" }}
          />
        </div>

        <SpotlightCards />
        <PauseOffscreen />
        <main>
          <HeroTestBH dict={dict} lang={lang} decors={false} />
          <div
            aria-hidden
            className="h-28 md:h-40"
            style={{ background: "linear-gradient(to bottom, var(--hero-fade), transparent)" }}
          />
          <WhyVortx dict={dict} />
          <Services dict={dict} lang={lang} />
          <LeadGen dict={dict} lang={lang} />
          <ProcessGeo dict={dict} />
          <Proof dict={dict} />
          <Reviews dict={dict} />
          <NewsTeaser dict={dict} lang={lang} />
          <Faq dict={dict} lang={lang} />
          <ContactCta dict={dict} lang={lang} />
        </main>
        <Footer dict={dict} lang={lang} />
      </div>
      <StickyCta copy={stickyCopy(dict)} lang={lang} />

      {/* Sandbox marker — bottom-left (the a11y launcher sits top-right, the
          mobile sticky CTA is centred). */}
      <p className="chip fixed bottom-4 left-4 z-[45] border border-accent bg-stage text-stage-text shadow-[var(--shadow-lg)]">
        Page test · texture image
      </p>
    </>
  );
}
