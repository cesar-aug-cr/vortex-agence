import type { Metadata } from "next";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { headerCopy, stickyCopy } from "@/i18n/slices";
import { buildMetadata } from "@/lib/metadata";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AmbientGlow } from "@/components/layout/AmbientGlow";
import { SpotlightCards } from "@/components/ui/SpotlightCards";
import { PauseOffscreen } from "@/components/ui/PauseOffscreen";
import { StickyCta } from "@/components/layout/StickyCta";
import { HeroScrollTest } from "@/components/sections/HeroScrollTest";
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
 * Page interne (noindex, hors sitemap) : la home avec un héros mobile à
 * défilement par étapes (voir HeroScrollTest). Sur desktop, le héros est
 * celui de la home, inchangé. Disponible dans toutes les langues pour juger
 * les textes réels.
 */

const PATH = "/hero-page-test";

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
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
    title: "Page test — héros mobile à défilement | vortx",
    description: "Page interne : la home avec un héros mobile révélé en quatre étapes de défilement.",
    index: false,
  });
}

export default async function HeroPageTest({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header copy={headerCopy(dict)} lang={lang} overHero sandbox />
      <div className="relative isolate bg-bg">
        <AmbientGlow />
        <SpotlightCards />
        <PauseOffscreen />
        <main>
          <HeroScrollTest dict={dict} lang={lang} />
          <div
            aria-hidden
            className="h-28 md:h-40"
            style={{ background: "linear-gradient(to bottom, var(--hero-fade), var(--bg))" }}
          />
          <WhyVortx dict={dict} className="pt-6 md:pt-8" />
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

      <p className="chip fixed bottom-4 left-4 z-[45] border border-accent bg-stage text-stage-text shadow-[var(--shadow-lg)]">
        Page test · héros mobile
      </p>
    </>
  );
}
