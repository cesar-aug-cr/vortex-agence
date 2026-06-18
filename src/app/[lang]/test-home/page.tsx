import type { Metadata } from "next";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AmbientGlow } from "@/components/layout/AmbientGlow";
import { SpotlightCards } from "@/components/ui/SpotlightCards";
import { StickyCta } from "@/components/layout/StickyCta";
import { Hero } from "@/components/sections/Hero";
import { WhyVortx } from "@/components/sections/WhyVortx";
import { Services } from "@/components/sections/Services";
import { LeadGen } from "@/components/sections/LeadGen";
import { ProcessGeo } from "@/components/sections/ProcessGeo";
import { Tools } from "@/components/sections/Tools";
import { Proof } from "@/components/sections/Proof";
import { Reviews } from "@/components/sections/Reviews";
import { NewsTeaser } from "@/components/sections/NewsTeaser";
import { Faq } from "@/components/sections/Faq";
import { ContactCta } from "@/components/sections/ContactCta";

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

// Sandbox copy of the homepage to trial contrast/colour tweaks (scoped via the
// `.test-home` wrapper in globals.css). Not indexed.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Test home — vortx (sandbox)",
};

export default async function TestHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header dict={dict} lang={lang} overHero />
      <div className="test-home relative isolate bg-bg">
        <AmbientGlow />
        <SpotlightCards />
        <main>
          <Hero dict={dict} lang={lang} sandbox />
          <WhyVortx dict={dict} />
          <Services dict={dict} lang={lang} />
          <LeadGen dict={dict} />
          <ProcessGeo dict={dict} />
          <Tools dict={dict} />
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
