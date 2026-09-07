import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { notFound } from "next/navigation";
import { i18n, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { yearsOfExperience } from "@/lib/dates";
import { PageShell } from "@/components/layout/PageShell";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Check, ArrowRight } from "@/components/ui/icons";
import { serviceIllustration, subServiceIllustration } from "@/components/illustrations/map";
import { packIcons } from "@/components/illustrations/packs";
import { HeroParticles } from "@/components/sections/HeroParticles";
import { GlowStar } from "@/components/sections/GlowStar";
import { LogoMark } from "@/components/brand/LogoMark";
import { featureIcons } from "@/components/illustrations/icons";
import { IconStrategy, IconConversion, IconLocal, IconAI } from "@/components/sections/WhyIcons";
import TestBHLazy from "@/components/three/TestBHLazy";
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
      <Image src={`/images-test/${id}.webp`} alt={alt} fill sizes={sizes} loading="eager" className="object-cover" />
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

const HERO_TITLE = "Marketing & web au Luxembourg qui attire et convertit.";

function HeroOverlay({ subtitle }: { subtitle: string }) {
  return (
    <div className="relative z-10 flex h-full max-w-md flex-col justify-center p-7 text-stage-text md:p-9">
      <p className="eyebrow text-accent">vortx · Luxembourg</p>
      <p className="mt-3 text-2xl font-bold leading-tight md:text-3xl">{HERO_TITLE}</p>
      <p className="mt-3 line-clamp-3 text-sm text-stage-text-dim">{subtitle}</p>
    </div>
  );
}

/* ---------- données des comparaisons 19-43 ---------- */

const SitesWebIllu = serviceIllustration["sites-web"];
const SiteVitrineIllu = subServiceIllustration["site-vitrine"];
const FUNNEL_WIDTHS = ["100%", "82%", "64%", "48%"];

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
const ENGAGEMENT_IMGS = ["engagement-audit", "engagement-code", "engagement-multilingue", "engagement-reporting"];

/* ---------- page ---------- */

export default async function ImagesTestPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== i18n.defaultLocale) notFound();
  const dict = await getDictionary(lang);

  const ready = readdirSync(IMG_DIR).filter((f) => f.endsWith(".webp")).length;

  const serviceImage: Record<string, string> = {
    "sites-web": "services-sites-web",
    "seo-geo": "services-seo-geo",
    "lead-generation": "services-lead-generation",
    publicite: "services-publicite",
    "branding-design": "services-branding-design",
    "automatisation-ia": "services-automatisation-ia",
  };
  const serviceVerdict: Record<string, { verdict: Verdict; why: string; caution: string }> = {
    "sites-web": { verdict: "tester", why: "Le service phare : une scène « écran + interface » rend le résultat concret là où l'illustration reste abstraite.", caution: "Le rendu montre une interface fictive — ne pas la confondre avec une réalisation. L'illustration actuelle est cohérente avec les 5 autres cartes." },
    "seo-geo": { verdict: "garder", why: "Le sujet (classement + IA) est conceptuel : l'illustration vectorielle l'explique aussi bien qu'un rendu 3D.", caution: "L'image générée est jolie mais interchangeable ; elle n'apporte pas d'information." },
    "lead-generation": { verdict: "tester", why: "L'entonnoir lumineux est immédiatement lisible, y compris en vignette.", caution: "Attention à l'homogénéité : mélanger photo et vecteur dans la même grille de 6 cartes casse le rythme." },
    publicite: { verdict: "garder", why: "Les dashboards flottants illustrent bien la publicité pilotée.", caution: "Rendu très « stock » ; l'illustration actuelle est plus distinctive." },
    "branding-design": { verdict: "tester", why: "Une photo de matériel de marque (cartes, nuancier) parle plus qu'un pictogramme pour un service créatif.", caution: "Doit rester sans texte lisible ; vérifier que le rendu ne montre pas de faux logo." },
    "automatisation-ia": { verdict: "garder", why: "Les engrenages de verre et rubans de données sont explicites.", caution: "Le SVG actuel est un visuel temporaire (celui d'« application web ») — à remplacer de toute façon, image ou nouveau SVG." },
  };

  const pillars = dict.trust.pillars;
  const pillarIcons = [IconStrategy, IconConversion, IconLocal, IconAI];
  const pillarImages = ["pilier-strategie", "pilier-conversion", "pilier-local", "pilier-ia"];

  const news = [
    { slug: "combien-coute-un-site-web-luxembourg-2026", img: "news-cout-site-web" },
    { slug: "geo-seo-luxembourg-etre-cite-par-les-ia", img: "news-geo-seo-ia" },
    { slug: "rgpd-cookies-site-web-luxembourg", img: "news-rgpd-cookies" },
  ].map((n) => ({ ...n, article: dict.news.articles.find((a) => a.slug === n.slug)! }));

  const years = yearsOfExperience();
  const newsFirst = dict.news.articles.find((a) => a.slug === "combien-coute-un-site-web-luxembourg-2026")!;
  const NewsCoverIcon = featureIcons[newsFirst.cover];

  return (
    <PageShell dict={dict} lang={lang}>
      <Section>
        <SectionHeading
          eyebrow="Test interne · ne pas indexer"
          title="Images ou éléments actuels : que vaut-il mieux afficher ?"
          lead="Scan complet du site (30 emplacements). Pour chacun d’eux (43 comparaisons), la colonne de gauche montre ce qui est en ligne aujourd'hui, rendu en direct par le vrai composant (icône, animation, scène 3D) ; la colonne de droite montre une image générée avec gpt-image-2 dans la palette du site. Rien n'est appliqué : cette page sert à décider."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["30", "emplacements repérés dans le code"],
            [`${ready}/60`, "rendus générés (public/images-test/)"],
            ["43", "comparaisons côte à côte · 0 changement appliqué"],
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

      {/* ============ 1. Hero ============ */}
      <Section className="pt-0 md:pt-0">
        <h2 className="text-2xl font-bold text-text md:text-3xl">Priorité 1 — les grandes surfaces</h2>
        <div className="mt-8 grid gap-8">
          <Compare
            n="01"
            where="Accueil · hero"
            title="Hero d'accueil : trou noir 3D vs photo de Luxembourg"
            current={
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-stage">
                <div className="pointer-events-none absolute inset-0" aria-hidden>
                  <TestBHLazy bhPositionOverride={[2.4, 0.4, 0]} bhPositionMobileOverride={[1.2, 2.6, 1]} bhScaleOverride={1.7} />
                </div>
                <HeroOverlay subtitle={dict.hero.subtitle} />
              </div>
            }
            proposal={
              <Gen id="hero-accueil" alt="Skyline de Luxembourg-Kirchberg à l'heure bleue" className="aspect-video rounded-2xl border border-border bg-stage">
                <div className="absolute inset-0 bg-gradient-to-r from-stage via-stage/70 to-transparent" aria-hidden />
                <HeroOverlay subtitle={dict.hero.subtitle} />
              </Gen>
            }
            why="Un ancrage géographique immédiat (Kirchberg) pour une cible « PME et artisans du Luxembourg », et zéro JavaScript : la photo s'affiche avant que three.js (229 Ko gzip) ne soit chargé."
            caution="Le trou noir est l'élément le plus mémorable du site et la métaphore de la marque (attraction). La photo est belle mais n'importe quelle agence pourrait l'utiliser. Le rendu est une vue « inspirée », pas une photo réelle de la ville."
            verdict="les-deux"
            format="2560×1440 · focale à droite"
          />
        </div>
      </Section>

      {/* ============ 2. Services ============ */}
      <Section className="pt-0 md:pt-0">
        <h2 className="text-2xl font-bold text-text md:text-3xl">Cartes services (accueil et /services)</h2>
        <p className="mt-2 max-w-3xl text-text-dim">Aujourd’hui : 6 illustrations SVG vectorielles (≈ 5-15 Ko chacune, thème-aware). Chaque ligne compare la carte réelle et la même carte avec le rendu généré à la place de l’illustration.</p>
        <div className="mt-8 grid gap-8">
          {dict.services.map((s, i) => {
            const Illu = serviceIllustration[s.slug];
            const sv = serviceVerdict[s.slug];
            const cardBody = (
              <>
                <h4 className="text-lg font-semibold text-text">{s.title}</h4>
                <p className="tagline mt-1 text-sm font-medium">{s.tagline}</p>
              </>
            );
            return (
              <Compare
                key={s.slug}
                n={`0${i + 2}`}
                where={`Accueil · #services · carte ${i + 1}/6`}
                title={s.title}
                current={
                  <div className="card flex flex-col p-6">
                    {Illu && (
                      <div className="illu-stage mb-5 overflow-hidden rounded-xl border border-border">
                        <Illu className="h-40 w-full" />
                      </div>
                    )}
                    {cardBody}
                  </div>
                }
                proposal={
                  <div className="card flex flex-col p-6">
                    <Gen id={serviceImage[s.slug]} alt={s.title} className="mb-5 h-40 rounded-xl border border-border" />
                    {cardBody}
                  </div>
                }
                why={sv.why}
                caution={sv.caution}
                verdict={sv.verdict}
                format="~720×320 (rendu 360×160 @2x) · même image réutilisable en carré sur la page service"
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

      {/* ============ 4. Piliers ============ */}
      <Section className="pt-0 md:pt-0">
        <h2 className="text-2xl font-bold text-text md:text-3xl">Piliers « Pourquoi vortx » (accueil et page Agence)</h2>
        <p className="mt-2 max-w-3xl text-text-dim">Icônes duotone statiques de 40-48 px dans un badge lime. Comparaison à la taille réelle du badge.</p>
        <div className="mt-8 grid gap-8">
          {pillars.map((p, i) => {
            const Icon = pillarIcons[i];
            const body = (
              <>
                <h4 className="mt-5 text-lg font-semibold text-text">{p.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-text-dim">{p.desc}</p>
              </>
            );
            return (
              <Compare
                key={p.title}
                n={`${11 + i}`}
                where={`Accueil · « Pourquoi vortx » · pilier ${i + 1}/4`}
                title={p.title}
                current={
                  <div className="card p-6">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-accent-soft text-accent sm:h-16 sm:w-16">
                        <Icon className="h-12 w-12 sm:h-10 sm:w-10" />
                      </span>
                      <span className="font-mono text-sm text-text-muted">0{i + 1}</span>
                    </div>
                    {body}
                  </div>
                }
                proposal={
                  <div className="card p-6">
                    <div className="flex items-center justify-between">
                      <Gen id={pillarImages[i]} alt={p.title} className="h-20 w-20 rounded-2xl sm:h-16 sm:w-16" sizes="80px" />
                      <span className="font-mono text-sm text-text-muted">0{i + 1}</span>
                    </div>
                    {body}
                  </div>
                }
                why="Une mini-photo apporte de la matière (verre, lumière) là où l'icône reste plate."
                caution="À 64-80 px, le sujet de la photo est à peine identifiable et le badge perd son lien avec la palette (le lime du fond disparaît). Les 4 icônes forment un système ; 4 photos non."
                verdict="garder"
                format="320×320 — seulement si la carte s'agrandit (≥ 160 px)"
              />
            );
          })}
        </div>
      </Section>

      {/* ============ 5. Pages ============ */}
      <Section className="pt-0 md:pt-0">
        <h2 className="text-2xl font-bold text-text md:text-3xl">Pages Agence, Contact, CTA final et Merci</h2>
        <div className="mt-8 grid gap-8">
          <Compare
            n="15"
            where="/agence · carte « expérience »"
            title="Page Agence : bloc chiffre vs photo de l'équipe / des bureaux"
            current={
              <div className="relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-3xl border border-stage-border bg-stage p-10 text-center text-stage-text">
                <div className="pointer-events-none absolute inset-0" aria-hidden style={{ backgroundImage: "radial-gradient(80% 70% at 50% 0%, rgba(20,224,200,0.18), transparent 60%), radial-gradient(70% 60% at 50% 100%, rgba(200,240,46,0.14), transparent 60%)" }} />
                <span className="relative font-mono text-7xl font-bold leading-none text-[color:var(--accent)] md:text-8xl">{years}</span>
                <span className="relative mt-3 text-xl font-semibold">{dict.agence.experience.suffix} {dict.agence.experience.label}</span>
                <span className="relative mt-1 font-mono text-xs uppercase tracking-wide text-stage-text-dim">{dict.agence.experience.note}</span>
              </div>
            }
            proposal={
              <Gen id="agence-equipe" alt="Équipe au travail dans un bureau lumineux (rendu de démonstration)" className="aspect-[4/5] rounded-3xl border border-border" sizes="(min-width: 768px) 40vw, 100vw">
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stage to-transparent p-6 text-stage-text">
                  <span className="font-mono text-4xl font-bold text-[color:var(--accent)]">{years}</span>
                  <span className="ml-2 font-semibold">{dict.agence.experience.suffix} {dict.agence.experience.label}</span>
                </div>
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wide text-white backdrop-blur-sm">rendu IA · gabarit</span>
              </Gen>
            }
            why="Il n'y a aucune photo humaine ni aucun lieu sur tout le site : c'est le manque de crédibilité le plus criant pour une agence locale. Le chiffre peut vivre en surimpression."
            caution="Ne jamais publier ce rendu : il montre des personnes qui n'existent pas. Il sert à valider le cadrage (portrait 4:5, visages hors champ, lumière naturelle) avant une vraie séance photo au 18 rue de l'Ouest."
            verdict="image"
            format="4:5 · 1000×1250 · vraie photo obligatoire"
          />

          <Compare
            n="16"
            where="/contact · colonne latérale"
            title="Page Contact : aside sans visuel vs photo de bureau"
            current={
              <aside>
                <div className="rounded-2xl border border-border bg-bg-card p-7">
                  <p className="font-mono text-xs uppercase tracking-wide text-text-muted">{dict.footer.contactTitle}</p>
                  <ul className="mt-4 grid gap-3 text-sm">
                    <li className="font-medium text-text">{site.email}</li>
                    <li className="text-text-dim">{dict.footer.location}</li>
                  </ul>
                </div>
                <ul className="mt-8 grid gap-3">
                  {dict.contact.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-text-dim"><Check width={16} height={16} className="text-accent" />{b}</li>
                  ))}
                </ul>
              </aside>
            }
            proposal={
              <aside>
                <Gen id="contact-bureau" alt="Bureau avec téléphone, carnet et café, toits de Luxembourg en arrière-plan" className="aspect-square rounded-2xl border border-border" sizes="(min-width: 768px) 40vw, 100vw" />
                <div className="mt-4 rounded-2xl border border-border bg-bg-card p-7">
                  <p className="font-mono text-xs uppercase tracking-wide text-text-muted">{dict.footer.contactTitle}</p>
                  <ul className="mt-4 grid gap-3 text-sm">
                    <li className="font-medium text-text">{site.email}</li>
                    <li className="text-text-dim">{dict.footer.location}</li>
                  </ul>
                </div>
              </aside>
            }
            why="La colonne est vide au moment le plus sensible du tunnel ; une scène chaleureuse (téléphone, café, toits de la ville) rassure et rappelle qu'un humain répond."
            caution="Idéalement une vraie photo du bureau. Attention au poids sur une page de conversion (viser < 120 Ko en WebP/AVIF)."
            verdict="image"
            format="1:1 · 800×800"
          />

          <Compare
            n="17"
            where="Toutes les pages · bandeau « Passons à l'action »"
            title="CTA final : dégradés CSS vs image de fond"
            current={
              <div className="relative overflow-hidden rounded-2xl border border-stage-border bg-stage px-6 py-12 text-center text-stage-text">
                <div className="pointer-events-none absolute inset-0" aria-hidden style={{ backgroundImage: "radial-gradient(60% 70% at 50% 0%, rgba(200,240,46,0.12), transparent 65%), radial-gradient(50% 50% at 85% 90%, rgba(20,224,200,0.10), transparent 70%)" }} />
                <div className="relative">
                  <p className="eyebrow text-accent">{dict.contact.eyebrow}</p>
                  <p className="mt-3 text-2xl font-bold">{dict.contact.title}</p>
                  <span className="btn btn-primary mt-6 inline-flex">{dict.common.cta}<ArrowRight width={18} height={18} /></span>
                </div>
              </div>
            }
            proposal={
              <Gen id="cta-final" alt="Faisceaux lime et cyan sur fond noir" className="rounded-2xl border border-stage-border bg-stage">
                <div className="absolute inset-0 bg-stage/55" aria-hidden />
                <div className="relative px-6 py-12 text-center text-stage-text">
                  <p className="eyebrow text-accent">{dict.contact.eyebrow}</p>
                  <p className="mt-3 text-2xl font-bold">{dict.contact.title}</p>
                  <span className="btn btn-primary mt-6 inline-flex">{dict.common.cta}<ArrowRight width={18} height={18} /></span>
                </div>
              </Gen>
            }
            why="Un fond texturé donne de la profondeur au bandeau le plus répété du site."
            caution="Gain visuel subtil pour +150 Ko chargés sur chaque page ; les deux dégradés CSS font déjà 90 % du travail gratuitement. Si image : très sombre, sans sujet, en AVIF."
            verdict="garder"
            format="2400×800 · très sombre"
          />

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
                <SitesWebIllu className="h-auto w-full" />
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
            n="27"
            where="Accueil · « Personne ne fait attention à vous »"
            title="Entonnoir typographique vs illustration de tunnel"
            current={
              <div className="card p-6">
                <p className="text-sm font-semibold text-text">{dict.leadgen.solutionTitle}</p>
                <div className="mt-5 flex flex-col items-center gap-2.5">
                  {dict.leadgen.funnel.map((step, i) => (
                    <Fragment key={step}>
                      <div className="flex items-center justify-center rounded-xl border border-accent/40 bg-accent-soft px-4 py-3 text-center text-sm font-semibold text-text" style={{ width: FUNNEL_WIDTHS[i] }}>{step}</div>
                      {i < dict.leadgen.funnel.length - 1 && <ArrowRight width={18} height={18} className="rotate-90 text-accent" />}
                    </Fragment>
                  ))}
                </div>
              </div>
            }
            proposal={
              <div className="card p-6">
                <p className="text-sm font-semibold text-text">{dict.leadgen.solutionTitle}</p>
                <Gen id="leadgen-tunnel" alt="Tunnel de lumière se resserrant vers une goutte lime" className="mt-5 aspect-[4/3] rounded-xl border border-border">
                  <div className="absolute inset-0 flex flex-col items-center justify-between py-4">
                    {dict.leadgen.funnel.map((step) => (
                      <span key={step} className="rounded-full border border-white/20 bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">{step}</span>
                    ))}
                  </div>
                </Gen>
              </div>
            }
            why="Un tunnel dessiné est plus parlant qu’une pile de chips, surtout pour une cible non-marketeuse."
            caution="Les libellés doivent rester du texte HTML (traduisible, accessible) posé sur l’image, jamais dans l’image. Une animation SVG dédiée ferait encore mieux qu’une photo."
            verdict="tester"
            format="~1120×500 (desktop) · portrait 3:4 (mobile)"
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
            n="31"
            where="Pages service · « Nos engagements » (bande sombre)"
            title="Engagements"
            current={
              <div className="grid grid-cols-2 gap-3 rounded-2xl border border-stage-border bg-stage p-4">
                {dict.servicesDetail.proof.items.map((item) => { const Icon = featureIcons[item.icon]; return (
                  <div key={item.value} className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="illu-stage flex h-16 w-16 items-center justify-center rounded-xl border border-white/10">{Icon && <Icon className="h-11 w-11" />}</div>
                    <p className="mt-3 text-base font-bold text-stage-text">{item.value}</p>
                    <p className="text-xs font-medium" style={{ color: "var(--accent)" }}>{item.label}</p>
                  </div>
                ); })}
              </div>
            }
            proposal={
              <div className="grid grid-cols-2 gap-3 rounded-2xl border border-stage-border bg-stage p-4">
                {dict.servicesDetail.proof.items.map((item, i) => (
                  <div key={item.value} className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <Gen id={ENGAGEMENT_IMGS[i]} alt={item.label} className="h-16 w-16 rounded-xl border border-white/10" sizes="64px" />
                    <p className="mt-3 text-base font-bold text-stage-text">{item.value}</p>
                    <p className="text-xs font-medium" style={{ color: "var(--accent)" }}>{item.label}</p>
                  </div>
                ))}
              </div>
            }
            why="Sur fond sombre, une photo sombre se fond bien et évite l’effet « pictogramme »."
            caution="À 64 px, l’image devient une tache lumineuse ; la valeur (« Audit offert », « 100 % à vous ») porte le message, pas l’icône."
            verdict="garder"
            format="256×256 (rendu 64 px)"
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
            n="34"
            where="/quiz · écran d’intro et niveaux de résultat"
            title="Quiz : emojis vs badges illustrés"
            current={
              <div className="card p-6 text-center">
                <span className="text-5xl" aria-hidden>🧠</span>
                <p className="mt-4 line-clamp-2 text-sm text-text-dim">{dict.quiz.intro}</p>
                <div className="mt-5 flex justify-center gap-3">
                  {dict.quiz.tiers.map((t) => (<span key={t.title} className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-2xl" title={t.title}>{t.emoji}</span>))}
                </div>
                <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-wide text-text-muted">5 niveaux · aussi imprimés sur le certificat</p>
              </div>
            }
            proposal={
              <div className="card p-6 text-center">
                <Gen id="quiz-intro" alt="Cerveau en circuits lime" className="mx-auto h-24 w-24 rounded-2xl border border-border" sizes="96px" />
                <p className="mt-4 line-clamp-2 text-sm text-text-dim">{dict.quiz.intro}</p>
                <div className="mt-5 flex justify-center gap-3">
                  {dict.quiz.tiers.map((t, i) => (<Gen key={t.title} id={`quiz-tier-${i + 1}`} alt={t.title} className="h-12 w-12 rounded-full border border-border" sizes="48px" />))}
                </div>
                <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-wide text-text-muted">5 niveaux · aussi imprimés sur le certificat</p>
              </div>
            }
            why="Les emojis dépendent de l’OS (rendu différent sur Windows, iOS, Android) et sortent pixelisés sur le certificat PDF ; des badges dans la palette sont maîtrisés partout."
            caution="Garder une lecture instantanée (graine → couronne) : les rendus doivent rester très simples. Le design system interdit l’emoji comme iconographie — c’est l’un des rares endroits où il reste."
            verdict="image"
            format="512×512 × 6"
          />

          <Compare
            n="35"
            where="/approche · « Notre approche »"
            title="Étapes de la méthode (page Approche)"
            current={
              <div className="grid grid-cols-2 gap-3">
                {dict.approachPage.steps.map((s) => (
                  <div key={s.n} className="card p-4"><span className="font-mono text-xl font-bold text-accent-strong">{s.n}</span><p className="mt-2 text-sm font-semibold text-text">{s.title}</p><span className="chip mt-2">{s.duration}</span></div>
                ))}
              </div>
            }
            proposal={
              <div className="grid grid-cols-2 gap-3">
                {dict.approachPage.steps.map((s, i) => (
                  <div key={s.n} className="card overflow-hidden p-0">
                    <Gen id={`approche-${i + 1}`} alt={s.title} className="h-28 border-b border-border" sizes="(min-width: 768px) 25vw, 50vw">
                      <span className="absolute left-3 top-3 font-mono text-xl font-bold text-accent">{s.n}</span>
                    </Gen>
                    <div className="p-4"><p className="text-sm font-semibold text-text">{s.title}</p><span className="chip mt-2">{s.duration}</span></div>
                  </div>
                ))}
              </div>
            }
            why="La page est 100 % texte ; quatre scènes de travail (audit, maquette, revue, lancement) donnent un rythme visuel et rendent la méthode concrète."
            caution="Rendus « bureau » très proches les uns des autres : il faut de vraies photos de vos sessions de travail pour que ça ne fasse pas banque d’images."
            verdict="image"
            format="~1120×400 × 4 (bandeau de carte)"
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
            n="37"
            where="Méga-menu Services · « À la une »"
            title="Bannière « À la une » du méga-menu"
            current={
              <div className="rounded-xl border border-border bg-stage px-6 py-5 text-stage-text">
                <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wide text-accent">{dict.megaMenu.featured.label}</span>
                <div className="mt-3 flex items-center justify-between gap-6">
                  <div><p className="text-base font-semibold leading-tight">{dict.megaMenu.featured.title}</p><p className="mt-0.5 text-sm text-stage-text-dim">{dict.megaMenu.featured.desc}</p></div>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-accent">{dict.common.readMore}<ArrowRight width={15} height={15} /></span>
                </div>
              </div>
            }
            proposal={
              <div className="rounded-xl border border-border bg-stage px-6 py-5 text-stage-text">
                <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wide text-accent">{dict.megaMenu.featured.label}</span>
                <div className="mt-3 flex items-center gap-4">
                  <Gen id="services-lead-generation" alt="" className="h-[72px] w-32 shrink-0 rounded-lg border border-white/10" sizes="128px" />
                  <div className="min-w-0 flex-1"><p className="text-base font-semibold leading-tight">{dict.megaMenu.featured.title}</p><p className="mt-0.5 text-sm text-stage-text-dim">{dict.megaMenu.featured.desc}</p></div>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-accent">{dict.common.readMore}<ArrowRight width={15} height={15} /></span>
                </div>
              </div>
            }
            why="Une vignette attire l’œil dans un menu très textuel et réutilise le rendu « génération de leads » (n° 04) sans nouvelle image."
            caution="Le menu doit rester léger : vignette ≤ 20 Ko, chargée en lazy (elle n’est visible qu’à l’ouverture)."
            verdict="tester"
            format="480×270"
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

          <Compare
            n="39"
            where="/faq · sous le titre"
            title="FAQ : en-tête texte vs bandeau illustré"
            current={
              <div className="card p-6"><p className="eyebrow text-accent-strong">{dict.faqPage.eyebrow}</p><p className="mt-2 text-xl font-bold text-text">{dict.faqPage.title}</p><p className="mt-2 line-clamp-2 text-sm text-text-dim">{dict.faqPage.lead}</p></div>
            }
            proposal={
              <div className="card overflow-hidden p-0"><Gen id="faq-bandeau" alt="Points d’interrogation de verre lumineux" className="aspect-[16/5] border-b border-border" /><div className="p-6"><p className="eyebrow text-accent-strong">{dict.faqPage.eyebrow}</p><p className="mt-2 text-xl font-bold text-text">{dict.faqPage.title}</p><p className="mt-2 line-clamp-2 text-sm text-text-dim">{dict.faqPage.lead}</p></div></div>
            }
            why="Une page très longue sans un seul visuel ; un bandeau d’ouverture pose le ton et sert d’image de partage."
            caution="Le bandeau repousse le contenu (et le sommaire) sous la ligne de flottaison : le garder bas (≤ 240 px) ou le placer en fond du titre."
            verdict="tester"
            format="1600×500"
          />

          <Compare
            n="40"
            where="/glossaire · sous le titre"
            title="Glossaire : en-tête texte vs bandeau illustré"
            current={
              <div className="card p-6"><p className="eyebrow text-accent-strong">{dict.glossary.eyebrow}</p><p className="mt-2 text-xl font-bold text-text">{dict.glossary.title}</p><p className="mt-2 line-clamp-2 text-sm text-text-dim">{dict.glossary.lead}</p></div>
            }
            proposal={
              <div className="card overflow-hidden p-0"><Gen id="glossaire-bandeau" alt="Livre ouvert lumineux" className="aspect-[16/5] border-b border-border" /><div className="p-6"><p className="eyebrow text-accent-strong">{dict.glossary.eyebrow}</p><p className="mt-2 text-xl font-bold text-text">{dict.glossary.title}</p><p className="mt-2 line-clamp-2 text-sm text-text-dim">{dict.glossary.lead}</p></div></div>
            }
            why="Même logique que la FAQ : un visuel d’ouverture sur une page de référence purement textuelle."
            caution="Page utilitaire (on y vient chercher un terme) : l’image ne doit jamais ralentir l’accès à la recherche."
            verdict="tester"
            format="1600×500"
          />

          <Compare
            n="41"
            where="/realisations · en-tête"
            title="Réalisations : en-tête texte vs mur de projets"
            current={
              <div className="card p-6"><p className="eyebrow text-accent-strong">{dict.workPage.eyebrow}</p><p className="mt-2 text-xl font-bold text-text">{dict.workPage.title}</p><p className="mt-2 line-clamp-2 text-sm text-text-dim">{dict.workPage.lead}</p></div>
            }
            proposal={
              <div className="card overflow-hidden p-0"><Gen id="realisations-mur" alt="Galerie d’écrans encadrés" className="aspect-[3/1] border-b border-border" /><div className="p-6"><p className="eyebrow text-accent-strong">{dict.workPage.eyebrow}</p><p className="mt-2 text-xl font-bold text-text">{dict.workPage.title}</p><p className="mt-2 line-clamp-2 text-sm text-text-dim">{dict.workPage.lead}</p></div></div>
            }
            why="Une ouverture « galerie » annonce la page avant même les mockups."
            caution="Ne pas utiliser ce rendu : un montage des 9 vrais mockups (déjà dans public/portfolio/) fera mieux et sera honnête. L’IA n’a rien à faire sur une page de preuves."
            verdict="image"
            format="1920×640 · montage des mockups réels"
          />

          <Compare
            n="42"
            where="Site entier · décors (AmbientGlow, particules, GlowStar)"
            title="Décors CSS vs texture image"
            current={
              <div className="relative h-64 overflow-hidden rounded-2xl border border-stage-border bg-stage">
                <HeroParticles />
                <GlowStar className="absolute left-[20%] top-[30%]" />
                <GlowStar className="absolute left-[70%] top-[60%]" scale={0.7} delay={1.2} />
              </div>
            }
            proposal={<Gen id="texture-ambiante" alt="Texture sombre avec halos lime et cyan" className="h-64 rounded-2xl border border-stage-border bg-stage" />}
            why="Une texture unique remplacerait plusieurs couches de dégradés et d’animations."
            caution="Les décors CSS pèsent quelques centaines d’octets et s’adaptent au thème ; une texture image pèse 80-150 Ko, ne bouge pas et se répète mal. Aucun intérêt."
            verdict="garder"
            format="—"
          />

          <Compare
            n="43"
            where="/agence · « Ce qui nous distingue »"
            title="Piliers (page Agence, badges 56 px)"
            current={
              <div className="grid grid-cols-2 gap-3">
                {pillars.map((p, i) => { const Icon = pillarIcons[i]; return (
                  <div key={p.title} className="card p-4"><span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent-soft text-accent"><Icon className="h-9 w-9" /></span><p className="mt-3 text-sm font-semibold text-text">{p.title}</p></div>
                ); })}
              </div>
            }
            proposal={
              <div className="grid grid-cols-2 gap-3">
                {pillars.map((p, i) => (
                  <div key={p.title} className="card p-4"><Gen id={pillarImages[i]} alt={p.title} className="h-14 w-14 rounded-xl" sizes="56px" /><p className="mt-3 text-sm font-semibold text-text">{p.title}</p></div>
                ))}
              </div>
            }
            why="Même série que les piliers de l’accueil (n° 11-14) : une seule décision pour les deux pages."
            caution="Encore plus petit qu’à l’accueil (56 px) : la photo n’est plus qu’un point lumineux."
            verdict="garder"
            format="320×320"
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
