import type { Metadata } from "next";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
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
    path: "/confidentialite",
    title: dict.meta.legalPrivacy.title,
    description: dict.meta.legalPrivacy.description,
    index: false,
  });
}

export default async function ConfidentialitePage({
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
        items={[{ label: dict.footer.columns.legal.links[1].label }]}
      />

      <Section tone="base" className="pt-10 md:pt-12">
        <LegalDoc
          title={dict.footer.columns.legal.links[1].label}
          updated={dict.pages.legalUpdated}
          todo={dict.pages.legalTodo}
        >
          <section>
            <h2>Responsable du traitement</h2>
            <p>
              VorTX, [adresse à compléter], {site.address.locality}, Luxembourg —{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </section>
          <section>
            <h2>Données collectées</h2>
            <ul>
              <li>Données de contact transmises via le formulaire (nom, e-mail, téléphone, entreprise, message).</li>
              <li>Données de navigation et de mesure d&apos;audience, sous réserve de votre consentement.</li>
            </ul>
          </section>
          <section>
            <h2>Finalités &amp; base légale</h2>
            <p>
              Les données de contact sont traitées pour répondre à votre demande
              (mesure précontractuelle / intérêt légitime). Les données de mesure
              d&apos;audience reposent sur votre consentement (art. 6.1.a RGPD).
            </p>
          </section>
          <section>
            <h2>Durée de conservation</h2>
            <p>[À compléter — ex. 3 ans à compter du dernier contact pour les prospects.]</p>
          </section>
          <section>
            <h2>Vos droits</h2>
            <p>
              Vous disposez d&apos;un droit d&apos;accès, de rectification,
              d&apos;effacement, de limitation, d&apos;opposition et de portabilité.
              Pour les exercer : <a href={`mailto:${site.email}`}>{site.email}</a>.
              Vous pouvez introduire une réclamation auprès de la CNPD
              (Commission nationale pour la protection des données, Luxembourg).
            </p>
          </section>
          <section>
            <h2>Sous-traitants</h2>
            <p>[Lister les outils traitant des données : hébergeur, e-mail, analytics, etc. — à compléter.]</p>
          </section>
        </LegalDoc>
      </Section>
    </PageShell>
  );
}
