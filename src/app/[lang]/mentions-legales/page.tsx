import type { Metadata } from "next";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { LegalDoc } from "@/components/legal/LegalDoc";

const todo = (v: string, what: string) => v || `[À COMPLÉTER : ${what}]`;

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
  const L = site.legal;

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
            <h2>1. Éditeur du site</h2>
            <p>
              Le présent site <strong>{site.url.replace("https://", "")}</strong> est édité par :
            </p>
            <ul>
              <li><strong>{todo(L.companyName, "raison sociale")}</strong>{L.legalForm ? ` — ${L.legalForm}` : ` — [À COMPLÉTER : forme juridique]`}</li>
              <li>Siège social : {todo(site.address.street, "rue")}, {todo(site.address.postalCode, "code postal")} {site.address.locality}, Luxembourg</li>
              <li>RCS Luxembourg : {todo(L.rcs, "n° RCS")}</li>
              <li>N° TVA : {todo(L.vat, "n° TVA")}</li>
              {L.capital ? <li>Capital social : {L.capital}</li> : null}
              <li>
                E-mail : <a href={`mailto:${site.email}`}>{site.email}</a>
                {site.phone ? <> · Téléphone : <a href={`tel:${site.phone.replace(/\s+/g, "")}`}>{site.phone}</a></> : null}
              </li>
            </ul>
          </section>

          <section>
            <h2>2. Directeur de la publication</h2>
            <p>{todo(L.director, "nom du directeur de la publication")}.</p>
          </section>

          <section>
            <h2>3. Hébergement</h2>
            <p>
              Le site est hébergé par <strong>{todo(L.host.name, "nom de l'hébergeur")}</strong>
              {L.host.address ? `, ${L.host.address}` : " [À COMPLÉTER : adresse de l'hébergeur]"}
              {L.host.url ? (
                <> (<a href={L.host.url} target="_blank" rel="noopener noreferrer">{L.host.url.replace("https://", "")}</a>).</>
              ) : "."}
            </p>
          </section>

          <section>
            <h2>4. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des éléments de ce site (textes, visuels, illustrations,
              identité de marque, code source, structure) est protégé par le droit
              d&apos;auteur et le droit de la propriété intellectuelle. Sauf mention
              contraire, ils sont la propriété exclusive de {todo(L.companyName, "raison sociale")} ou
              de ses partenaires. Toute reproduction, représentation ou exploitation,
              totale ou partielle, sans autorisation écrite préalable, est interdite.
            </p>
          </section>

          <section>
            <h2>5. Données personnelles &amp; cookies</h2>
            <p>
              Le traitement de vos données personnelles est décrit dans notre{" "}
              <a href={`/${lang}/confidentialite`}>politique de confidentialité</a>, et
              l&apos;usage des cookies dans notre{" "}
              <a href={`/${lang}/cookies`}>politique cookies</a>.
            </p>
          </section>

          <section>
            <h2>6. Responsabilité</h2>
            <p>
              {todo(L.companyName, "raison sociale")} s&apos;efforce d&apos;assurer
              l&apos;exactitude et la mise à jour des informations diffusées sur ce site,
              sans pouvoir en garantir l&apos;exhaustivité ni l&apos;absence
              d&apos;erreurs. L&apos;éditeur ne saurait être tenu responsable des
              dommages résultant de l&apos;accès au site ou de son utilisation, ni du
              contenu des sites tiers vers lesquels des liens peuvent pointer.
            </p>
          </section>

          <section>
            <h2>7. Droit applicable &amp; litiges</h2>
            <p>
              Les présentes mentions sont régies par le droit luxembourgeois. Tout
              litige relatif à l&apos;utilisation du site relève de la compétence des
              tribunaux du Grand-Duché de Luxembourg. Conformément à la réglementation
              européenne, vous pouvez recourir à la plateforme de règlement en ligne des
              litiges :{" "}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                ec.europa.eu/consumers/odr
              </a>
              .
            </p>
          </section>
        </LegalDoc>
      </Section>
    </PageShell>
  );
}
