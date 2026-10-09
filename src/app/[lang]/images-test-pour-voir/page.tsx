import type { Metadata } from "next";
import type { ReactNode } from "react";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { notFound } from "next/navigation";
import { i18n, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Check } from "@/components/ui/icons";
import { subServiceIllustration } from "@/components/illustrations/map";
import { SitesWebMotion } from "@/components/illustrations/sites-web-motion/SitesWebMotion";
import { packIcons } from "@/components/illustrations/packs";
import { LogoMark } from "@/components/brand/LogoMark";
import { featureIcons } from "@/components/illustrations/icons";
import BlackHoleLazy from "@/components/three/BlackHoleLazy";
import HelixDNALazy from "@/components/three/HelixDNALazy";

/**
 * Page interne (FR uniquement, noindex) : pour chaque emplacement du site où
 * une vraie image pourrait remplacer l'élément actuel (icône SVG, animation
 * CSS, scène three.js, bloc texte), on affiche côte à côte ce qui est en ligne
 * aujourd'hui — rendu en direct par le composant réel — et une image générée
 * avec gpt-image-2 (scripts/gen-images.mjs → public/images-test/).
 * Aucune de ces images n'est utilisée par le site : cette page sert à choisir.
 */

const PATH = "/images-test-pour-voir";
const IMG_DIR = join(process.cwd(), "public", "images-test");
const hasImage = (id: string) => existsSync(join(IMG_DIR, `${id}.webp`));

export async function generateStaticParams() {
  return [{ lang: i18n.defaultLocale }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata({
    lang: isLocale(lang) ? lang : i18n.defaultLocale,
    path: PATH,
    title: "Images test — comparaison des visuels | vortx",
    description: "Page interne : images générées vs éléments actuels du site, emplacement par emplacement.",
    index: false,
  });
}

/* ---------- briques ---------- */

type Verdict = "image" | "garder" | "les-deux" | "tester";
const VERDICT: Record<Verdict, { label: string; cls: string }> = {
  image: { label: "Recommandation : passer à l'image", cls: "border-accent bg-accent-soft text-text" },
  garder: { label: "Recommandation : garder l'existant", cls: "border-border-strong text-text-dim" },
  "les-deux": { label: "Recommandation : combiner les deux", cls: "border-accent-2/60 text-text" },
  tester: { label: "Recommandation : à tester en A/B", cls: "border-border-strong text-text-dim" },
};

/** Image générée (ou message si le fichier n'est pas encore là). */
function Gen({
  id,
  alt,
  className = "",
  sizes = "(min-width: 768px) 50vw, 100vw",
  children,
}: {
  id: string;
  alt: string;
  className?: string;
  sizes?: string;
  children?: ReactNode;
}) {
  if (!hasImage(id)) {
    return (
      <div
        className={`flex items-center justify-center overflow-hidden bg-surface p-4 text-center text-xs text-text-muted ${className}`}
      >
        <span>
          Image «&nbsp;{id}&nbsp;» pas encore générée —{" "}
          <code className="font-mono">node scripts/gen-images.mjs {id}</code>
        </span>
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* eager: page de comparaison — on veut tout voir d’un coup (et les captures pleine page) */}
      {/* unoptimized: internal page, serve the originals (never through an optimizer) */}
      <Image src={`/images-test/${id}.webp`} alt={alt} fill sizes={sizes} loading="eager" unoptimized className="object-cover" />
      {children}
    </div>
  );
}

function Compare({
  n,
  where,
  title,
  current,
  proposal,
  currentLabel = "Aujourd'hui (rendu réel du composant)",
  proposalLabel = "Proposition — image générée (gpt-image-2)",
  why,
  caution,
  verdict,
  format,
}: {
  n: string;
  where: string;
  title: string;
  current: ReactNode;
  proposal: ReactNode;
  currentLabel?: string;
  proposalLabel?: string;
  why: string;
  caution: string;
  verdict: Verdict;
  format: string;
}) {
  const v = VERDICT[verdict];
  return (
    <article className="card p-6 md:p-8">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="chip">{n}</span>
        <h3 className="text-xl font-semibold text-text">{title}</h3>
        <span className="font-mono text-xs text-text-muted">{where}</span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <p className="eyebrow mb-3">{currentLabel}</p>
          {current}
        </div>
        <div>
          <p className="eyebrow mb-3">{proposalLabel}</p>
          {proposal}
        </div>
      </div>

      <dl className="mt-6 grid gap-4 text-sm md:grid-cols-3">
        <div>
          <dt className="font-mono text-xs uppercase tracking-wide text-text-muted">Pourquoi une image ici</dt>
          <dd className="mt-1 text-text-dim">{why}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-wide text-text-muted">Points d’attention</dt>
          <dd className="mt-1 text-text-dim">{caution}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-wide text-text-muted">Format cible</dt>
          <dd className="mt-1 text-text-dim">{format}</dd>
        </div>
      </dl>

      <p className={`mt-5 inline-flex rounded-full border px-4 py-1.5 text-sm font-medium ${v.cls}`}>
        {v.label}
      </p>
    </article>
  );
}

/* ---------- répliques des éléments actuels ---------- */



/* ---------- données des comparaisons 19-43 ---------- */

const SiteVitrineIllu = subServiceIllustration["site-vitrine"];

/** Home service cards: first-generation render (kept in public/images-test) vs the second generation now in production (public/services). */
const SERVICE_CARD_IMAGES: Record<string, { previous: string; current: string }> = {
  "sites-web": { previous: "services-sites-web", current: "/services/sites-web.webp" },
  "seo-geo": { previous: "services-seo-geo", current: "/services/seo-geo.webp" },
  "lead-generation": { previous: "services-lead-generation", current: "/services/lead-generation.webp" },
  publicite: { previous: "services-publicite", current: "/services/publicite.webp" },
  "branding-design": { previous: "services-branding-design", current: "/services/branding-design.webp" },
  "automatisation-ia": { previous: "services-automatisation-ia", current: "/services/automatisation-ia.webp" },
};

const SUB_HEROES: { key: string; title: string; img: string; why: string; verdict: Verdict }[] = [
  { key: "google-ads", title: "Google Ads", img: "sub-google-ads", why: "Le résultat surligné au-dessus d’une ville de nuit dit « être vu au bon moment » sans jargon.", verdict: "tester" },
  { key: "refonte-de-site", title: "Refonte de site", img: "sub-refonte-de-site", why: "Avant/après en une image : la pierre fissurée qui devient écran de verre, c’est la refonte.", verdict: "tester" },
  { key: "chatbots-ia", title: "Chatbots IA", img: "sub-chatbots-ia", why: "Un « personnage » rend le service moins abstrait — utile pour une offre que les PME visualisent mal.", verdict: "tester" },
];

const FEATURE_SAMPLES = [
  { icon: "responsive", label: "100 % responsive", img: "feature-responsive" },
  { icon: "smart-forms", label: "Formulaires intelligents", img: "feature-smart-forms" },
  { icon: "rgpd", label: "RGPD", img: "feature-rgpd" },
];
const PACK_SAMPLES = [
  { icon: "server", img: "pack-domaine" },
  { icon: "ssl", img: "pack-ssl" },
  { icon: "support", img: "pack-support" },
];

/* ---------- page ---------- */

export default async function ImagesTestPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== i18n.defaultLocale) notFound();
  const dict = await getDictionary(lang);
  const sitesWeb = dict.services.find((s) => s.slug === "sites-web")!;

  const ready = readdirSync(IMG_DIR).filter((f) => f.endsWith(".webp")).length;


  const news = [
    { slug: "combien-coute-un-site-web-luxembourg-2026", img: "news-cout-site-web" },
    { slug: "geo-seo-luxembourg-etre-cite-par-les-ia", img: "news-geo-seo-ia" },
    { slug: "rgpd-cookies-site-web-luxembourg", img: "news-rgpd-cookies" },
  ].map((n) => ({ ...n, article: dict.news.articles.find((a) => a.slug === n.slug)! }));

  const newsFirst = dict.news.articles.find((a) => a.slug === "combien-coute-un-site-web-luxembourg-2026")!;
  const NewsCoverIcon = featureIcons[newsFirst.cover];

  return (
    <PageShell dict={dict} lang={lang}>
      <Section>
        <SectionHeading
          eyebrow="Test interne · ne pas indexer"
          title="Images ou éléments actuels : que vaut-il mieux afficher ?"
          lead="Scan complet du site (15 emplacements restants). Pour chacun d’eux (20 comparaisons), la colonne de gauche montre ce qui est en ligne aujourd'hui, rendu en direct par le vrai composant (icône, animation, scène 3D) ; la colonne de droite montre une image générée avec gpt-image-2 dans la palette du site. Les propositions déjà intégrées au site (hero ville, cartes services, photo Agence, étapes Approche, bandeau CTA final, engagements, badges du quiz, vignette du méga-menu, bandeaux FAQ et glossaire, mur de projets des réalisations) ont été retirées de cette page ; la texture d’ambiance se juge sur /page-test-ok ; le reste sert à décider."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["26", "emplacements encore à décider"],
            [`${ready}/60`, "rendus générés (public/images-test/)"],
            ["29", "comparaisons côte à côte · 4 propositions déjà en ligne"],
          ].map(([num, label]) => (
            <li key={label} className="card p-6">
              <span className="block font-mono text-4xl font-bold text-accent-strong">{num}</span>
              <span className="mt-1 block text-sm text-text-dim">{label}</span>
            </li>
          ))}
        </ul>

        <div className="card mt-6 p-6 text-sm text-text-dim">
          <p className="font-semibold text-text">Lecture rapide</p>
          <ul className="mt-2 grid gap-1.5 md:grid-cols-2">
            <li className="flex gap-2"><Check width={16} height={16} className="mt-0.5 shrink-0 text-accent" /><span><strong className="text-text">Où l’image gagne :</strong> couvertures d’articles, page Agence, colonne Contact — les endroits où le site manque de crédibilité concrète (aucune photo nulle part aujourd’hui).</span></li>
            <li className="flex gap-2"><Check width={16} height={16} className="mt-0.5 shrink-0 text-accent" /><span><strong className="text-text">Où l’existant gagne :</strong> hero, page Merci, hélice ADN — les scènes 3D sont la signature de la marque ; une image ne fait que les remplacer par du générique.</span></li>
            <li className="flex gap-2"><Check width={16} height={16} className="mt-0.5 shrink-0 text-accent" /><span><strong className="text-text">Petits formats :</strong> sous 100 px (piliers, icônes de features) une photo devient illisible — garder les icônes.</span></li>
            <li className="flex gap-2"><Check width={16} height={16} className="mt-0.5 shrink-0 text-accent" /><span><strong className="text-text">Éthique :</strong> les rendus « équipe » et « clients » sont des gabarits de cadrage, pas du contenu final — une agence ne publie pas de faux visages ni de faux logos.</span></li>
          </ul>
        </div>
      </Section>

      {/* ============ 2. Cartes services (accueil) : visuels actuels vs nouvelle génération ============ */}
      <Section className="pt-0 md:pt-0">
        <h2 className="text-2xl font-bold text-text md:text-3xl">Cartes services de l’accueil : première génération vs rendu en production</h2>
        <p className="mt-2 max-w-3xl text-text-dim">
          À gauche, la première série (gpt-image-2, conservée dans public/images-test). À droite, la seconde génération avec gpt-image-2.5-flare, briefée pour un sujet
          reconnaissable au premier coup d’œil (écran de site, loupe sur résultats, téléphone qui reçoit des demandes, mégaphone et cible, tampon de logo, robot assistant) — c’est elle qui est en production depuis le 6 octobre 2026. Même cadrage que la carte réelle (160 px de haut).
        </p>
        <div className="mt-8 grid gap-8">
          {dict.services.map((svc, i) => {
            const imgs = SERVICE_CARD_IMAGES[svc.slug];
            if (!imgs) return null;
            const Card = ({ visual }: { visual: ReactNode }) => (
              <div className="card flex flex-col p-7">
                <div className="relative mb-5 h-40 w-full overflow-hidden rounded-xl border border-border">{visual}</div>
                <h4 className="text-xl font-semibold text-text">{svc.title}</h4>
                <p className="tagline mt-1 text-sm font-medium">{svc.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-text-dim">{svc.short}</p>
              </div>
            );
            return (
              <Compare
                key={svc.slug}
                n={`${44 + i}`}
                where="Accueil · « Nos services » · carte"
                title={svc.title}
                current={<Card visual={<Gen id={imgs.previous} alt={svc.title} className="h-full w-full" sizes="(min-width: 768px) 50vw, 100vw" />} />}
                proposal={<Card visual={<Image src={imgs.current} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />} />}
                currentLabel="Avant — première génération (gpt-image-2)"
                proposalLabel="Aujourd'hui — en production (gpt-image-2.5-flare)"
                why="Un sujet lisible instantanément : on comprend le service avant de lire le titre."
                caution="Série homogène (même lumière, même matière) : si une image doit changer, régénérer les six ensemble."
                verdict="image"
                format="1536×1024 · recadrage object-cover 160 px"
              />
            );
          })}
        </div>
      </Section>

      {/* ============ 3. News ============ */}
      <Section className="pt-0 md:pt-0">
        <h2 className="text-2xl font-bold text-text md:text-3xl">Couvertures d’articles</h2>
        <p className="mt-2 max-w-3xl text-text-dim">Le placeholder le plus visible du site : une icône de 160-190 px flottant dans un cadre vide de 288 px, sur 9 articles × 4 langues. Trois exemples.</p>
        <div className="mt-8 grid gap-8">
          {news.map((n, i) => {
            const Cover = featureIcons[n.article.cover];
            return (
              <Compare
                key={n.slug}
                n={`0${8 + i}`}
                where={`/news/${n.slug}`}
                title={n.article.title}
                current={
                  <div className="illu-stage relative flex h-56 items-center justify-center overflow-hidden rounded-2xl border border-border md:h-72">
                    {Cover && <Cover className="h-40 w-40 md:h-48 md:w-48" />}
                  </div>
                }
                proposal={<Gen id={n.img} alt={n.article.title} className="h-56 rounded-2xl border border-border md:h-72" />}
                why="Une couverture éditoriale donne un poids « média » à l'article, améliore le partage social (l'image OG actuelle est un gabarit typographique) et sert les 4 vignettes qui réutilisent la même icône."
                caution="Rester sans texte dans l'image (le titre est déjà en dessous). Les rendus photo-réalistes d'objets (cookies, pièces) vieillissent mieux que les scènes « IA abstraite »."
                verdict="image"
                format="1600×900 · recadrage object-cover · 1 image = 4 emplacements"
              />
            );
          })}
        </div>
      </Section>

      {/* ============ 5. Pages ============ */}
      <Section className="pt-0 md:pt-0">
        <h2 className="text-2xl font-bold text-text md:text-3xl">Page Merci</h2>
        <div className="mt-8 grid gap-8">
          <Compare
            n="18"
            where="/merci"
            title="Page Merci : trou noir 3D vs illustration de confirmation"
            current={
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-stage-border bg-stage text-stage-text">
                <div className="pointer-events-none absolute inset-0" aria-hidden>
                  <BlackHoleLazy showSphere={false} bhPositionOverride={[0, 0, 0]} bhPositionMobileOverride={[0, 0, 1]} bhScaleOverride={1.7} eventHorizonColorLight="#ffffff" diskLimeOnLight />
                </div>
                <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent"><Check width={24} height={24} /></span>
                  <p className="mt-4 text-xl font-bold">Merci, votre demande est bien partie.</p>
                </div>
              </div>
            }
            proposal={
              <Gen id="merci-confirmation" alt="Avion en papier lumineux filant vers un horizon cyan" className="aspect-video rounded-2xl border border-stage-border bg-stage">
                <div className="absolute inset-0 bg-stage/40" aria-hidden />
                <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center text-stage-text">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent"><Check width={24} height={24} /></span>
                  <p className="mt-4 text-xl font-bold">Merci, votre demande est bien partie.</p>
                </div>
              </Gen>
            }
            why="L'avion en papier raconte « c'est parti » plus littéralement que le trou noir, et se charge sans WebGL."
            caution="La page n'est vue que quelques secondes : l'animation porte l'émotion du moment et reste cohérente avec le hero. Une image ne se justifie qu'en fallback (contexte WebGL perdu, Data Saver)."
            verdict="garder"
            format="2560×1440 · sujet centré"
          />
        </div>
      </Section>

      {/* ============ 6. Pages service : héros, sous-services, cartes ============ */}
      <Section className="pt-0 md:pt-0">
        <h2 className="text-2xl font-bold text-text md:text-3xl">Pages service et sous-services</h2>
        <p className="mt-2 max-w-3xl text-text-dim">Les mêmes illustrations SVG que les cartes, affichées en grand (carré) sur la page service, puis sur les 27 pages de sous-services et leurs cartes « spécialités ».</p>
        <div className="mt-8 grid gap-8">
          <Compare
            n="19"
            where="/services/sites-web · colonne droite du héros"
            title="Illustration héros d’une page service"
            current={
              <div className="illu-stage overflow-hidden rounded-2xl border border-border p-4">
                <SitesWebMotion
                  className="h-auto w-full"
                  title={dict.serviceContent["sites-web"].motionTitle}
                  tagline={sitesWeb.tagline}
                  cta={dict.common.cta}
                  eyebrow={dict.serviceContent["sites-web"].motionEyebrow}
                />
              </div>
            }
            proposal={<Gen id="service-hero-sites-web" alt="Site web sur un écran de verre flottant" className="aspect-square rounded-2xl border border-border" sizes="(min-width: 768px) 40vw, 100vw" />}
            why="C’est le plus grand visuel d’une page service (≈ 560 px) : à cette taille, un rendu photo-réaliste a la place d’exister et donne une impression de « produit fini »."
            caution="Même sujet que la carte (n° 02) : si la carte reste en SVG, garder le SVG ici aussi pour la cohérence entre l’accueil et la page."
            verdict="tester"
            format="1:1 · 1200×1200"
          />

          {SUB_HEROES.map((sub, i) => {
            const Illu = subServiceIllustration[sub.key];
            return (
              <Compare
                key={sub.key}
                n={`${20 + i}`}
                where={`/services/…/${sub.key} · héros`}
                title={`Sous-service : ${sub.title}`}
                current={
                  <div className="illu-stage overflow-hidden rounded-2xl border border-border p-4">
                    {Illu && <Illu className="h-auto w-full" />}
                  </div>
                }
                proposal={<Gen id={sub.img} alt={sub.title} className="aspect-square rounded-2xl border border-border" sizes="(min-width: 768px) 40vw, 100vw" />}
                why={sub.why}
                caution="27 sous-services = 27 visuels à produire et maintenir. Commencer par les 6-8 pages les plus consultées ; les autres gardent le SVG sans que ça se voie."
                verdict={sub.verdict}
                format="1:1 · 1200×1200"
              />
            );
          })}

          <Compare
            n="23"
            where="/services/sites-web · « Des spécialités pour chaque besoin »"
            title="Cartes sous-services (bandeau)"
            current={
              <div className="card flex flex-col p-6">
                <div className="illu-stage mb-5 overflow-hidden rounded-xl border border-border">
                  <SiteVitrineIllu className="h-40 w-full" />
                </div>
                <h4 className="text-lg font-semibold text-text">Site vitrine</h4>
              </div>
            }
            proposal={
              <div className="card flex flex-col p-6">
                <Gen id="sub-card-site-vitrine" alt="Vitrine de boutique la nuit" className="mb-5 h-40 rounded-xl border border-border" />
                <h4 className="text-lg font-semibold text-text">Site vitrine</h4>
              </div>
            }
            why="Une vitrine éclairée la nuit dit « site vitrine » sans lire le titre."
            caution="Le SVG est recadré en bandeau et perd déjà de sa lisibilité ; une photo recadrée en 2,25:1 doit être composée pour ce ratio (sujet centré)."
            verdict="tester"
            format="~1120×320"
          />
        </div>
      </Section>

      {/* ============ 7. Accueil : news, logos, ADN, LeadGen, avis ============ */}
      <Section className="pt-0 md:pt-0">
        <h2 className="text-2xl font-bold text-text md:text-3xl">Accueil — les autres sections</h2>
        <div className="mt-8 grid gap-8">
          <Compare
            n="24"
            where="Accueil · « Dernières news » (+ /news, + « Ressources » des pages service)"
            title="Vignettes d’articles"
            current={
              <div className="card flex flex-col overflow-hidden">
                <div className="illu-stage relative flex h-40 items-center justify-center overflow-hidden border-b border-border">
                  {NewsCoverIcon && <NewsCoverIcon className="h-28 w-28" />}
                  <span className="absolute left-4 top-4 rounded-full border border-border bg-bg/70 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wide text-text-dim backdrop-blur-sm">{newsFirst.category}</span>
                </div>
                <div className="p-6"><p className="font-semibold text-text">{newsFirst.title}</p></div>
              </div>
            }
            proposal={
              <div className="card flex flex-col overflow-hidden">
                <Gen id="news-cout-site-web" alt={newsFirst.title} className="h-40 border-b border-border">
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wide text-white backdrop-blur-sm">{newsFirst.category}</span>
                </Gen>
                <div className="p-6"><p className="font-semibold text-text">{newsFirst.title}</p></div>
              </div>
            }
            why="Trois composants (NewsTeaser, NewsList, RelatedServiceArticles) affichent la même icône ; la couverture de l’article (n° 08-10) les sert tous sans image supplémentaire."
            caution="Le badge de catégorie doit rester lisible sur la photo : fond sombre semi-opaque, comme ici."
            verdict="image"
            format="~720×352 · même fichier que la couverture"
          />

          <Compare
            n="25"
            where="Accueil · « La preuve par les résultats »"
            title="Bande de logos clients (absente aujourd’hui)"
            current={
              <div className="card p-6">
                <p className="eyebrow text-accent-strong">{dict.proof.eyebrow}</p>
                <p className="mt-2 text-xl font-bold text-text">{dict.proof.title}</p>
                <div className="mt-5 flex h-24 items-center justify-center rounded-xl border border-dashed border-border-strong text-center text-xs text-text-muted">Aucune bande de logos — commentaire « Real client logos go here » dans Proof.tsx</div>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  {dict.proof.guarantees.map((g) => (
                    <span key={g} className="flex items-center gap-2 rounded-xl border border-border p-3 text-xs font-medium text-text"><Check width={14} height={14} className="shrink-0 text-accent" />{g}</span>
                  ))}
                </div>
              </div>
            }
            proposal={
              <div className="card p-6">
                <p className="eyebrow text-accent-strong">{dict.proof.eyebrow}</p>
                <p className="mt-2 text-xl font-bold text-text">{dict.proof.title}</p>
                <Gen id="logos-clients" alt="Mur de neuf emblèmes génériques (placeholders)" className="mt-5 h-24 rounded-xl border border-border">
                  <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/50 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wide text-white">placeholders</span>
                </Gen>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  {dict.proof.guarantees.map((g) => (
                    <span key={g} className="flex items-center gap-2 rounded-xl border border-border p-3 text-xs font-medium text-text"><Check width={14} height={14} className="shrink-0 text-accent" />{g}</span>
                  ))}
                </div>
              </div>
            }
            why="Une rangée de logos est la preuve sociale la plus rapide à lire ; le site a 9 clients réels (Garage Biver, Vitrophy, Autodis…) mais n’affiche aucun logo."
            caution="Le rendu ne montre que des formes génériques pour visualiser l’emplacement : il faut collecter les vrais logos (avec accord des clients). Ne jamais générer un logo de marque existante."
            verdict="image"
            format="9 × 400×200 PNG/SVG transparents, mono/gris"
          />

          <Compare
            n="26"
            where="Accueil · #approche (« Notre méthode » + « Le SEO du futur »)"
            title="Hélice ADN 3D vs image de fond"
            current={
              <div className="relative h-[420px] overflow-hidden rounded-2xl border border-stage-border bg-stage text-stage-text">
                <div className="absolute inset-0" aria-hidden><HelixDNALazy height={420} tiltDeg={-35} /></div>
                <div className="relative z-10 max-w-xs p-7"><p className="eyebrow text-accent">{dict.process.eyebrow}</p><p className="mt-2 text-xl font-bold">{dict.process.title}</p></div>
              </div>
            }
            proposal={
              <Gen id="adn-fond" alt="Double hélice lumineuse lime et cyan" className="h-[420px] rounded-2xl border border-stage-border bg-stage">
                <div className="absolute inset-0 bg-gradient-to-r from-stage/90 via-stage/40 to-transparent" aria-hidden />
                <div className="relative z-10 max-w-xs p-7 text-stage-text"><p className="eyebrow text-accent">{dict.process.eyebrow}</p><p className="mt-2 text-xl font-bold">{dict.process.title}</p></div>
              </Gen>
            }
            why="Même métaphore (l’ADN), sans WebGL : utile en fallback mobile, Data Saver ou contexte WebGL perdu."
            caution="L’hélice qui tourne au scroll est un moment fort de la page ; l’image figée est un compromis, pas un remplacement. Utiliser l’image uniquement comme repli."
            verdict="les-deux"
            format="2400×1400 · masque diagonal conservé"
          />

          <Compare
            n="28"
            where="Accueil et /approche · « Avis clients »"
            title="Cartes d’avis sans portrait vs avec avatar"
            current={
              <div className="grid gap-4">
                {dict.reviews.items.slice(0, 2).map((r) => (
                  <figure key={r.name} className="card p-5">
                    <blockquote className="line-clamp-2 text-sm text-text-dim">“{r.quote}”</blockquote>
                    <figcaption className="relative mt-4 overflow-hidden rounded-xl border border-border">
                      <span aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, #06060a 0%, rgba(6,6,10,0.82) 32%, rgba(6,6,10,0.32) 64%, rgba(6,6,10,0) 92%)" }} />
                      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-accent" />
                      <div className="relative px-4 py-3"><span className="block text-sm font-semibold text-white">{r.name}</span><span className="block text-xs text-white/55">{r.role} · {r.location}</span></div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            }
            proposal={
              <div className="grid gap-4">
                {dict.reviews.items.slice(0, 2).map((r, i) => (
                  <figure key={r.name} className="card p-5">
                    <blockquote className="line-clamp-2 text-sm text-text-dim">“{r.quote}”</blockquote>
                    <figcaption className="relative mt-4 overflow-hidden rounded-xl border border-border">
                      <span aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, #06060a 0%, rgba(6,6,10,0.82) 32%, rgba(6,6,10,0.32) 64%, rgba(6,6,10,0) 92%)" }} />
                      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-accent" />
                      <div className="relative flex items-center gap-3 px-4 py-3">
                        <Gen id={`avatar-${i + 1}`} alt="" className="h-10 w-10 shrink-0 rounded-full border border-white/20" sizes="40px" />
                        <div><span className="block text-sm font-semibold text-white">{r.name}</span><span className="block text-xs text-white/55">{r.role} · {r.location}</span></div>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            }
            why="Un visage (ou un logo) à côté d’un témoignage double sa crédibilité perçue."
            caution="Les avis sont aujourd’hui des placeholders et les avatars générés sont des silhouettes volontairement sans visage. Ne publier que de vrais portraits ou logos, avec accord écrit."
            verdict="image"
            format="256×256 · rond 40-48 px"
          />
        </div>
      </Section>

      {/* ============ 8. Pages service : features, méthode, engagements, packs ============ */}
      <Section className="pt-0 md:pt-0">
        <h2 className="text-2xl font-bold text-text md:text-3xl">Petits formats des pages service</h2>
        <p className="mt-2 max-w-3xl text-text-dim">Icônes de 44 à 80 px : la comparaison est faite à la taille réelle, c’est là que la photo montre ses limites.</p>
        <div className="mt-8 grid gap-8">
          <Compare
            n="29"
            where="Pages service · « Ce que ça comprend »"
            title="Icônes de fonctionnalités (3 des 37)"
            current={
              <div className="grid grid-cols-3 gap-3">
                {FEATURE_SAMPLES.map((f) => { const Icon = featureIcons[f.icon]; return (
                  <div key={f.icon} className="card flex flex-col items-center p-4 text-center">
                    <div className="illu-stage flex h-28 w-28 items-center justify-center rounded-xl border border-border">{Icon && <Icon className="h-20 w-20" />}</div>
                    <span className="mt-3 text-xs font-semibold text-text">{f.label}</span>
                  </div>
                ); })}
              </div>
            }
            proposal={
              <div className="grid grid-cols-3 gap-3">
                {FEATURE_SAMPLES.map((f) => (
                  <div key={f.icon} className="card flex flex-col items-center p-4 text-center">
                    <Gen id={f.img} alt={f.label} className="h-28 w-28 rounded-xl border border-border" sizes="112px" />
                    <span className="mt-3 text-xs font-semibold text-text">{f.label}</span>
                  </div>
                ))}
              </div>
            }
            why="Les photos d’objets (appareils, cadenas) sont reconnaissables même petites."
            caution="37 icônes forment un système graphique cohérent ; 37 photos non. Et à 112 px les détails disparaissent. Coût de production disproportionné pour le gain."
            verdict="garder"
            format="448×448 (rendu 112 px)"
          />

          <Compare
            n="30"
            where="Pages service · « Notre méthode, quatre temps »"
            title="Étapes de la méthode"
            current={
              <ol className="grid grid-cols-2 gap-3">
                {dict.servicesDetail.method.steps.map((step) => { const Icon = featureIcons[step.icon]; return (
                  <li key={step.n} className="card flex flex-col p-4">
                    <div className="flex items-center justify-between"><div className="illu-stage flex h-20 w-20 items-center justify-center rounded-xl border border-border">{Icon && <Icon className="h-14 w-14" />}</div><span className="font-mono text-2xl font-bold text-border">{step.n}</span></div>
                    <span className="mt-3 text-sm font-semibold text-text">{step.title}</span>
                  </li>
                ); })}
              </ol>
            }
            proposal={
              <ol className="grid grid-cols-2 gap-3">
                {dict.servicesDetail.method.steps.map((step, i) => (
                  <li key={step.n} className="card flex flex-col p-4">
                    <div className="flex items-center justify-between"><Gen id={`methode-${i + 1}`} alt={step.title} className="h-20 w-20 rounded-xl border border-border" sizes="80px" /><span className="font-mono text-2xl font-bold text-border">{step.n}</span></div>
                    <span className="mt-3 text-sm font-semibold text-text">{step.title}</span>
                  </li>
                ))}
              </ol>
            }
            why="Loupe, stylet, panneaux A/B, fusée : les objets racontent chaque étape."
            caution="Les 4 icônes actuelles sont déjà spécifiques et cohérentes avec le reste des pages service ; la photo n’ajoute que de la matière."
            verdict="garder"
            format="320×320 (rendu 80 px)"
          />

          <Compare
            n="32"
            where="/services/sites-web · « Tout ce qui est inclus »"
            title="Packs sites web (3 des 9)"
            current={
              <div className="grid grid-cols-3 gap-3">
                {PACK_SAMPLES.map((p) => { const Icon = packIcons[p.icon]; const item = dict.serviceContent["sites-web"].packsIncluded.items.find((x) => x.icon === p.icon); return (
                  <div key={p.icon} className="card flex flex-col gap-3 p-4">
                    <div className="illu-stage flex h-20 w-20 items-center justify-center rounded-xl border border-border">{Icon && <Icon className="h-14 w-14" />}</div>
                    <span className="text-xs font-semibold text-text">{item?.title}</span>
                  </div>
                ); })}
              </div>
            }
            proposal={
              <div className="grid grid-cols-3 gap-3">
                {PACK_SAMPLES.map((p) => { const item = dict.serviceContent["sites-web"].packsIncluded.items.find((x) => x.icon === p.icon); return (
                  <div key={p.icon} className="card flex flex-col gap-3 p-4">
                    <Gen id={p.img} alt={item?.title ?? p.icon} className="h-20 w-20 rounded-xl border border-border" sizes="80px" />
                    <span className="text-xs font-semibold text-text">{item?.title}</span>
                  </div>
                ); })}
              </div>
            }
            why="Globe, cadenas, casque : des objets universels, lisibles même en vignette."
            caution="Les 9 icônes de packs sont les plus spécifiques du site (dessinées pour chaque item) ; les remplacer par des photos les banalise."
            verdict="garder"
            format="320×320 (rendu 80 px)"
          />
        </div>
      </Section>

      {/* ============ 9. Autres pages ============ */}
      <Section className="pt-0 md:pt-0">
        <h2 className="text-2xl font-bold text-text md:text-3xl">Autres pages</h2>
        <div className="mt-8 grid gap-8">
          <Compare
            n="33"
            where="/[...] · page 404"
            title="Page 404 : trou noir 3D vs illustration"
            current={
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-stage-border bg-stage text-stage-text">
                <div className="pointer-events-none absolute inset-0" aria-hidden><BlackHoleLazy showSphere={false} bhPositionOverride={[2.4, 0.4, 0]} bhPositionMobileOverride={[1.2, 2.6, 1]} bhScaleOverride={1.7} eventHorizonColorLight="#ffffff" diskLimeOnLight /></div>
                <div className="relative z-10 flex h-full flex-col justify-center p-7"><p className="font-mono text-5xl font-bold text-accent">404</p><p className="mt-2 text-lg font-bold">Page introuvable</p></div>
              </div>
            }
            proposal={
              <Gen id="page-404" alt="Anneau lumineux avalant des feuilles de papier" className="aspect-video rounded-2xl border border-stage-border bg-stage">
                <div className="absolute inset-0 bg-gradient-to-r from-stage/90 via-stage/40 to-transparent" aria-hidden />
                <div className="relative z-10 flex h-full flex-col justify-center p-7 text-stage-text"><p className="font-mono text-5xl font-bold text-accent">404</p><p className="mt-2 text-lg font-bold">Page introuvable</p></div>
              </Gen>
            }
            why="L’image reprend l’idée « avalé par l’horizon des événements » et se charge sans three.js — utile sur une page où l’on arrive souvent par erreur, parfois sur mobile lent."
            caution="Le trou noir 3D est cohérent avec le hero et la page Merci ; garder la scène, réserver l’image au fallback."
            verdict="les-deux"
            format="2560×1440 · focale à droite"
          />

          <Compare
            n="36"
            where="/agence · « Notre arsenal »"
            title="Marquee de noms d’outils vs logos"
            current={
              <div className="card p-5">
                <p className="text-sm font-semibold text-text">{dict.tools.title}</p>
                <div className="mt-4 overflow-hidden whitespace-nowrap rounded-xl border border-border bg-bg-card py-4" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
                  {dict.tools.categories[0].items.slice(0, 8).map((t) => (<span key={t} className="mx-4 font-mono text-xs uppercase tracking-widest text-text-muted">{t}<span className="mx-4 text-accent">•</span></span>))}
                </div>
              </div>
            }
            proposal={
              <div className="card p-5">
                <p className="text-sm font-semibold text-text">{dict.tools.title}</p>
                <Gen id="outils-logos" alt="Tuiles d’icônes génériques (placeholders)" className="mt-4 aspect-[3/1] rounded-xl border border-border">
                  <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/50 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wide text-white">placeholders</span>
                </Gen>
              </div>
            }
            why="Les logos (Next.js, WordPress, GA4, Figma, HubSpot, n8n…) se reconnaissent en une fraction de seconde, contrairement à une liste en capitales."
            caution="Le rendu ne contient que des tuiles vides : les vrais logos sont des marques déposées, à télécharger depuis les kits presse officiels (et à respecter : couleurs, marges)."
            verdict="image"
            format="~20 logos 200×200 SVG"
          />

          <Compare
            n="38"
            where="Articles · bloc « logo » du corps de texte"
            title="Logo animé vs illustration éditoriale"
            current={
              <div className="illu-stage relative flex items-center justify-center rounded-2xl border border-border py-12"><LogoMark className="h-14 w-auto text-stage-text md:h-20" /></div>
            }
            proposal={<Gen id="article-schema" alt="Schéma isométrique de nœuds lumineux" className="aspect-[3/1] rounded-2xl border border-border" />}
            why="Un schéma lié au sujet de l’article (tunnel, architecture, workflow) apporte de l’information ; le logo n’en apporte pas."
            caution="Chaque article aurait besoin de son propre schéma : c’est un travail éditorial, pas une image générique. Le logo reste un bon séparateur par défaut."
            verdict="tester"
            format="1440×480"
          />
        </div>
      </Section>

      <Section className="pt-0 md:pt-0">
        <div className="card p-6 text-sm text-text-dim">
          <p className="font-semibold text-text">Comment relancer ou modifier les rendus</p>
          <p className="mt-2">Les prompts sont dans <code className="font-mono">scripts/images-manifest.mjs</code>. <code className="font-mono">node scripts/gen-images.mjs</code> génère les images manquantes, <code className="font-mono">--force</code> régénère tout, et un ou plusieurs identifiants (<code className="font-mono">hero-accueil</code>, <code className="font-mono">news-rgpd-cookies</code>…) limitent la génération. La clé se lit dans <code className="font-mono">.env.local</code> (jamais commitée).</p>
        </div>
      </Section>
    </PageShell>
  );
}
