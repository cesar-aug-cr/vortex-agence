import type { Metadata } from "next";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AmbientGlow } from "@/components/layout/AmbientGlow";
import { SpotlightCards } from "@/components/ui/SpotlightCards";
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

// Dev/visual sandbox: the real homepage with the image-disk black hole — never index.
export const metadata: Metadata = {
  title: "home-test — image-disk black hole homepage",
  robots: { index: false, follow: false },
};

export default async function HomeTestPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header dict={dict} lang={lang} overHero sandbox />
      <div className="relative isolate bg-bg">
        <AmbientGlow />
        <SpotlightCards />
        <main>
          <HeroTestBH dict={dict} lang={lang} />
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
      <StickyCta dict={dict} lang={lang} />
    </>
  );
}
