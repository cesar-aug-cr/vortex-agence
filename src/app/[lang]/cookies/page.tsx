import type { Metadata } from "next";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { LegalDoc } from "@/components/legal/LegalDoc";
import { ConsentSettingsButton } from "@/components/layout/ConsentSettingsButton";

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
  const cat = dict.consent.categories;

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
            <h2>1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
            <p>
              Un cookie est un petit fichier déposé sur votre appareil lors de la
              visite d&apos;un site. Certains sont indispensables au fonctionnement du
              site ; d&apos;autres, soumis à votre consentement préalable, servent à la
              mesure d&apos;audience ou à la publicité.
            </p>
          </section>

          <section>
            <h2>2. Cookies que nous utilisons</h2>
            <ul>
              <li>
                <strong>{cat.necessary.title}</strong> — {cat.necessary.desc} Inclut le
                cookie <code>vortx_consent</code> qui mémorise vos choix (durée : 6 mois).
              </li>
              <li>
                <strong>{cat.analytics.title}</strong> — {cat.analytics.desc}{" "}
                [À COMPLÉTER : outil utilisé, ex. Google Analytics 4, et durée des cookies.]
              </li>
              <li>
                <strong>{cat.marketing.title}</strong> — {cat.marketing.desc}{" "}
                [À COMPLÉTER : outils utilisés, ex. Meta Ads / Google Ads, et durées.]
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Base légale</h2>
            <p>
              Les cookies nécessaires reposent sur notre intérêt légitime à fournir un
              site fonctionnel. Les cookies de mesure d&apos;audience et de marketing ne
              sont déposés <strong>qu&apos;après votre consentement</strong> (art. 6.1.a
              RGPD et loi modifiée du 30 mai 2005). Aucun traceur non essentiel n&apos;est
              chargé tant que vous n&apos;avez pas accepté.
            </p>
          </section>

          <section>
            <h2>4. Gérer votre consentement</h2>
            <p>
              Vous pouvez accepter, refuser ou personnaliser les cookies non essentiels à
              tout moment, et modifier votre choix quand vous le souhaitez :
            </p>
            <div className="not-prose mt-4">
              <ConsentSettingsButton label={dict.consent.manage} />
            </div>
            <p className="mt-4">
              Vous pouvez aussi configurer votre navigateur pour bloquer ou supprimer les
              cookies. Le retrait du consentement n&apos;affecte pas la licéité des
              traitements déjà effectués.
            </p>
          </section>
        </LegalDoc>
      </Section>
    </PageShell>
  );
}
