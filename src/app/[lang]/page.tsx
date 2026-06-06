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
import { Process } from "@/components/sections/Process";
import { Geo } from "@/components/sections/Geo";
import { Tools } from "@/components/sections/Tools";
import { Proof } from "@/components/sections/Proof";
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
      <Header dict={dict} lang={lang} overHero />
      <div className="relative isolate bg-bg">
        <AmbientGlow />
        <SpotlightCards />
        <main>
          <Hero dict={dict} lang={lang} />
          <WhyVortx dict={dict} />
          <Services dict={dict} lang={lang} />
          <LeadGen dict={dict} />
          <Process dict={dict} />
          <Geo dict={dict} />
          <Tools dict={dict} />
          <Proof dict={dict} />
          <Faq dict={dict} />
          <ContactCta dict={dict} lang={lang} />
        </main>
        <Footer dict={dict} lang={lang} />
      </div>
      <StickyCta dict={dict} lang={lang} />
    </>
  );
}
