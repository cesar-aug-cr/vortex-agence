import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { headerCopy, stickyCopy } from "@/i18n/slices";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AmbientGlow } from "@/components/layout/AmbientGlow";
import { SpotlightCards } from "@/components/ui/SpotlightCards";
import { PauseOffscreen } from "@/components/ui/PauseOffscreen";
import { StickyCta } from "@/components/layout/StickyCta";
import { HeroHome } from "@/components/sections/HeroHome";
import { WhyVortx } from "@/components/sections/WhyVortx";
import { Services } from "@/components/sections/Services";
import { LeadGen } from "@/components/sections/LeadGen";
import { ProcessGeo } from "@/components/sections/ProcessGeo";
import { Proof } from "@/components/sections/Proof";
import { Reviews } from "@/components/sections/Reviews";
import { NewsTeaser } from "@/components/sections/NewsTeaser";
import { Faq } from "@/components/sections/Faq";
import { ContactCta } from "@/components/sections/ContactCta";

export default async function HomePage({
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
          <HeroHome dict={dict} lang={lang} />
          {/* Divider: the hero fades to --hero-fade at its bottom edge, this
              band fades that colour into the page background. Dark theme:
              black → #09090c; light theme: white → #f7f8f4 (no black band). */}
          <div
            aria-hidden
            className="h-28 md:h-40"
            style={{ background: "linear-gradient(to bottom, var(--hero-fade), var(--bg))" }}
          />
          {/* reduced top padding so the cards show up sooner after the hero */}
          <WhyVortx dict={dict} className="pt-6 md:pt-8" />
          <Services dict={dict} lang={lang} />
          <LeadGen dict={dict} lang={lang} />
          <ProcessGeo dict={dict} />
          {/* Tools ("Notre arsenal") lives on /agence — on the home it made an
              11-section page longer and diluted the premium positioning. */}
          <Proof dict={dict} />
          <Reviews dict={dict} />
          <NewsTeaser dict={dict} lang={lang} />
          <Faq dict={dict} lang={lang} />
          <ContactCta dict={dict} lang={lang} />
        </main>
        <Footer dict={dict} lang={lang} />
      </div>
      <StickyCta copy={stickyCopy(dict)} lang={lang} />
    </>
  );
}
