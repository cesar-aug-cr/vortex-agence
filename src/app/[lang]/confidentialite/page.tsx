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
  const L = site.legal;
  const company = todo(L.companyName, "raison sociale");

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
            <p>
              La présente politique explique comment {company} (« nous ») collecte et
              traite vos données personnelles lorsque vous utilisez ce site ou nous
              contactez, conformément au Règlement (UE) 2016/679 (RGPD) et à la loi
              luxembourgeoise applicable.
            </p>
          </section>

          <section>
            <h2>1. Responsable du traitement</h2>
            <p>
              {company} — {todo(site.address.street, "rue")}, {todo(site.address.postalCode, "code postal")}{" "}
              {site.address.locality}, Luxembourg.<br />
              Contact : <a href={`mailto:${site.email}`}>{site.email}</a>
              {site.phone ? <> · <a href={`tel:${site.phone.replace(/\s+/g, "")}`}>{site.phone}</a></> : null}.
            </p>
          </section>

          <section>
            <h2>2. Données que nous collectons</h2>
            <ul>
              <li>
                <strong>Données de contact</strong> que vous nous transmettez via le
                formulaire : nom, e-mail, téléphone (optionnel), entreprise (optionnel),
                service souhaité et contenu de votre message.
              </li>
              <li>
                <strong>Données techniques et d&apos;usage</strong> (adresse IP,
                navigateur, pages consultées, mesures d&apos;audience) — uniquement avec
                votre consentement via les cookies non essentiels.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Finalités &amp; bases légales</h2>
            <ul>
              <li><strong>Répondre à vos demandes</strong> et établir un devis — mesures précontractuelles / intérêt légitime (art. 6.1.b / 6.1.f RGPD).</li>
              <li><strong>Mesure d&apos;audience et marketing</strong> — votre consentement (art. 6.1.a RGPD), révocable à tout moment.</li>
              <li><strong>Sécurité et bon fonctionnement</strong> du site — intérêt légitime (art. 6.1.f RGPD).</li>
            </ul>
          </section>

          <section>
            <h2>4. Destinataires &amp; sous-traitants</h2>
            <p>
              Vos données sont traitées par nos soins et par des sous-traitants agissant
              pour notre compte, notamment : l&apos;hébergeur du site
              ({todo(L.host.name, "hébergeur")}), notre service d&apos;envoi d&apos;e-mails, et,
              sous réserve de consentement, nos outils de mesure d&apos;audience et de
              publicité. [À COMPLÉTER : liste précise des outils — ex. Google Analytics,
              Meta, etc.] Nous ne vendons pas vos données.
            </p>
          </section>

          <section>
            <h2>5. Transferts hors de l&apos;Union européenne</h2>
            <p>
              Certains prestataires peuvent traiter des données en dehors de l&apos;UE.
              Le cas échéant, ces transferts sont encadrés par des garanties appropriées
              (clauses contractuelles types de la Commission européenne).
              [À COMPLÉTER : préciser selon vos outils.]
            </p>
          </section>

          <section>
            <h2>6. Durées de conservation</h2>
            <ul>
              <li>Demandes via le formulaire : [À COMPLÉTER — ex. 3 ans après le dernier contact].</li>
              <li>Données de mesure d&apos;audience : selon la durée de vie des cookies (voir la <a href={`/${lang}/cookies`}>politique cookies</a>).</li>
            </ul>
          </section>

          <section>
            <h2>7. Vos droits</h2>
            <p>
              Vous disposez des droits d&apos;accès, de rectification, d&apos;effacement,
              de limitation, d&apos;opposition, de portabilité, et du droit de retirer
              votre consentement à tout moment. Pour les exercer, écrivez-nous à{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>. Vous pouvez également
              introduire une réclamation auprès de l&apos;autorité de contrôle
              luxembourgeoise : <strong>Commission nationale pour la protection des
              données (CNPD)</strong>, 15 boulevard du Jazz, L-4370 Belvaux —{" "}
              <a href="https://cnpd.public.lu" target="_blank" rel="noopener noreferrer">cnpd.public.lu</a>.
            </p>
          </section>

          <section>
            <h2>8. Cookies</h2>
            <p>
              L&apos;utilisation des cookies et la gestion de votre consentement sont
              détaillées dans notre <a href={`/${lang}/cookies`}>politique cookies</a>.
            </p>
          </section>

          <section>
            <h2>9. Sécurité &amp; modifications</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles
              appropriées pour protéger vos données. La présente politique peut être mise
              à jour ; la date de dernière mise à jour figure en tête de page.
            </p>
          </section>
        </LegalDoc>
      </Section>
    </PageShell>
  );
}
