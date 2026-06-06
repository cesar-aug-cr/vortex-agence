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
    path: "/mentions-legales",
    title: dict.meta.legalMentions.title,
    description: dict.meta.legalMentions.description,
    index: false,
  });
}

export default async function MentionsLegalesPage({
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
        items={[{ label: dict.footer.columns.legal.links[0].label }]}
      />

      <Section tone="base" className="pt-10 md:pt-12">
        <LegalDoc
          title={dict.footer.columns.legal.links[0].label}
          updated={dict.pages.legalUpdated}
          todo={dict.pages.legalTodo}
        >
          <section>
            <h2>Éditeur du site</h2>
            <p>
              <strong>VorTX</strong> — agence marketing &amp; web.<br />
              Forme juridique : [À COMPLÉTER].<br />
              Siège social : [Adresse à compléter], {site.address.locality}, Luxembourg.<br />
              N° RCS / TVA : [À COMPLÉTER].<br />
              E-mail : <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </section>
          <section>
            <h2>Directeur de la publication</h2>
            <p>[Nom du responsable à compléter].</p>
          </section>
          <section>
            <h2>Hébergement</h2>
            <p>
              Le site est hébergé par [Hébergeur à compléter — ex. Vercel Inc.],
              [adresse de l&apos;hébergeur].
            </p>
          </section>
          <section>
            <h2>Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus de ce site (textes, visuels, code,
              identité) est la propriété de VorTX, sauf mention contraire, et est
              protégé par le droit applicable au Luxembourg et dans l&apos;Union
              européenne.
            </p>
          </section>
          <section>
            <h2>Responsabilité</h2>
            <p>
              VorTX s&apos;efforce d&apos;assurer l&apos;exactitude des informations
              publiées mais ne saurait être tenue responsable d&apos;omissions ou
              d&apos;inexactitudes. [Clauses à faire valider.]
            </p>
          </section>
        </LegalDoc>
      </Section>
    </PageShell>
  );
}
