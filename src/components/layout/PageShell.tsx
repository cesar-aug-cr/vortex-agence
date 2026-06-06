import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AmbientGlow } from "@/components/layout/AmbientGlow";
import { SpotlightCards } from "@/components/ui/SpotlightCards";
import { StickyCta } from "@/components/layout/StickyCta";

/**
 * Shell for every internal page: fixed Header (not over-hero), the page-wide
 * AmbientGlow + cursor-spotlight behaviour, the page content, then Footer —
 * mirroring the homepage layout so internal pages read as one surface.
 */
export function PageShell({
  dict,
  lang,
  children,
}: {
  dict: Dictionary;
  lang: Locale;
  children: ReactNode;
}) {
  return (
    <>
      <Header dict={dict} lang={lang} />
      <div className="relative isolate bg-bg">
        <AmbientGlow />
        <SpotlightCards />
        <main>{children}</main>
        <Footer dict={dict} lang={lang} />
      </div>
      <StickyCta dict={dict} lang={lang} />
    </>
  );
}
