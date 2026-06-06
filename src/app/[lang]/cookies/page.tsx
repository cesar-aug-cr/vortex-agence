import type { Metadata } from "next";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { LegalDoc } from "@/components/legal/LegalDoc";

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
    path: "/cookies",
    title: dict.meta.legalCookies.title,
    description: dict.meta.legalCookies.description,
    index: false,
  });
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);

  return (
    <PageShell dict={dict} lang={lang}>
      <Breadcrumbs
        lang={lang}
        homeLabel={dict.common.breadcrumbHome}
        items={[{ label: dict.footer.columns.legal.links[2].label }]}
      />

      <Section tone="base" className="pt-10 md:pt-12">
        <LegalDoc
          title={dict.footer.columns.legal.links[2].label}
          updated={dict.pages.legalUpdated}
          todo={dict.pages.legalTodo}
        >
          <section>
            <h2>Qu&apos;est-ce qu&apos;un cookie ?</h2>
            <p>
              Un cookie est un petit fichier déposé sur votre appareil lors de la
              visite d&apos;un site. Certains sont nécessaires au fonctionnement du
              site, d&apos;autres servent à la mesure d&apos;audience ou à la
              publicité et requièrent votre consentement préalable.
            </p>
          </section>
          <section>
            <h2>Cookies utilisés</h2>
            <ul>
              <li><strong>Essentiels</strong> — fonctionnement du site et mémorisation de votre choix de consentement. (Pas de consentement requis.)</li>
              <li><strong>Mesure d&apos;audience</strong> — [Google Analytics 4 / autre, à compléter]. Déposés uniquement après consentement.</li>
              <li><strong>Publicité</strong> — [Meta Ads / Google Ads, à compléter]. Déposés uniquement après consentement.</li>
            </ul>
          </section>
          <section>
            <h2>Gérer votre consentement</h2>
            <p>
              Vous pouvez accepter ou refuser les cookies non essentiels via la
              bannière de consentement, et modifier votre choix à tout moment. Vous
              pouvez aussi configurer votre navigateur pour les bloquer.
            </p>
          </section>
        </LegalDoc>
      </Section>
    </PageShell>
  );
}
