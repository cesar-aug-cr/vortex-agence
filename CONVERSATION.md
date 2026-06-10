# VorTX — Journal de conversation & de projet

> Site de l'agence marketing **VorTX** (Luxembourg) — Next.js 16.
> Récapitulatif complet : décisions, travaux, réglages, et **reprise pour la suite**.
> Dernière mise à jour : 2026-06-10.
> Dossier de travail actuel : `C:\Users\CACR\Documents\sites\VorTX` · Repo : `github.com/cesar-aug-cr/vortex-agence` (branche `main`).

---

## 1. Brief initial

Site web pour une **agence marketing au Luxembourg** en **Next.js**.

- **Nom :** VorTX · **Langue :** FR d'abord, architecture **prête à traduire** (DE/EN/LU).
- **Inspirations :** wedo-solutions.lu, leadgen.lu, cd-lac.vercel.app, vortx-three.vercel.app.
- **Demandes :** agents/skills dans le projet · breadcrumbs · llms.txt / llms-full.txt · robots.txt · sitemap.xml · humans.txt · schema JSON-LD · **OG images dynamiques** · **illustrations vectorielles complexes par service** · vérif SEO (titres/meta) · **pas de scroll horizontal mobile** · footer style cd-lac · **mega menu** · **clair/sombre** · reprendre l'**ADN** et le **trou noir** de `Catalogo` · reprendre le **SVG VorTX** · proposer des **couleurs de marque**.

**Règles de collaboration (posture) :** conseiller marketing + dev senior (20 ans). Ne jamais commencer par approuver ; remettre en question ; afficher la certitude ([Certain]/[Probable]/[Supposition]) ; bannir la flatterie ; désaccords structurés ; vérité qui dérange d'abord ; pas d'intro ; tenir sa position.

---

## 2. Vérités exposées & décisions

- **[Certain]** `cd-lac.vercel.app` = le dossier `Catalogo` déployé ; `Catalogo` = déjà VorTX en Next.js (espagnol). Source des actifs 3D.
- Le SVG hero original (22 Mo) = **5 images base64** dans les lettres → extrait en **wordmark 1,8 Ko**.
- Contenu Catalogo inadapté au LU (prix MXN, faux témoignages EN) → repositionné, prix cachés, preuve = placeholders honnêtes.

| Décision | Choix |
|---|---|
| Approche | Build neuf, en réutilisant ADN + trou noir + SVG VorTX |
| Prix | Cachés → CTA « Réserver un appel » + audit gratuit |
| Palette | **Vortex Lime** : `#0A0A0B` / lime `#C8F02E` / cyan `#14E0C8` / clair `#F7F8F4` |
| Preuve | Placeholders honnêtes |
| i18n | Routing `[lang]` (`/fr`), dico typé, `proxy.ts` (Next 16) |
| Thème | Tokens sémantiques light/dark (pas de `!important`), stage 3D toujours sombre |

---

## 3. Stack

Next.js 16.1.6 (App Router, Turbopack) · React 19.2 · TypeScript strict · Tailwind v4 · Three.js 0.182 + @react-three/fiber + drei · Node 20.11. Dev QA : `puppeteer-core` + `scripts/shot.mjs` (captures via Chrome local, WebGL logiciel).

---

## 4. Construit & VÉRIFIÉ (tsc exit 0, /fr 200)

### Fondation
Scaffolding, i18n (`src/i18n/*`, `src/lib/locale.ts`), `src/proxy.ts` (redir `/`→`/fr`), design system `globals.css`, thème sans flash (`ThemeScript` + `ThemeToggle`), wordmark `Wordmark.tsx` (1,8 Ko, `preserveAspectRatio` xMinYMid).

### Homepage (10 sections) — gabarit UNIQUE
`Hero` · `WhyVortx` · `Services` · `LeadGen` · `Process` · `Geo` (ADN) · `Tools` · `Proof` · `Faq` · `ContactCta`.
Tout passe par **`src/components/ui/Section.tsx`** (`Section` + `SectionHeading`) → rythme/typo/conteneur cohérents.

### Shell
`Header` (mega menu CSS hover, transparent→solide, menu mobile, indicateur FR) · `Footer` style cd-lac (marquee outils, colonnes, bottom bar) · `Breadcrumbs` (visuel + `BreadcrumbList` JSON-LD).

### « Une seule surface » + ambiance
- Tokens sombres **unifiés** : `bg = surface = stage = #09090c` → aucune coupure entre sections ; cartes `#121218` + bordure pour le relief.
- Sections de contenu **transparentes** + **`AmbientGlow`** (halos flous **bleus/verts/cyan** répartis sur toute la page, `-z-10`).

### Actifs 3D
- **Trou noir** (`ThreeSphereV2BlackHole`) : voir réglages §6.
- **ADN** (`HelixDNA3D`) : recoloré lime/cyan, **diagonale** (tilt −35°, bas-gauche→haut-droite), **estompé aux deux bouts** (masque linéaire), sans vignette.

### Illustrations services (6, générées par sous-agent — tsc-clean, vectoriel pur, animé)
`src/components/illustrations/` : `SitesWeb` · `SeoGeo` · `LeadGeneration` · `Publicite` · `BrandingDesign` · `AutomatisationIa`.
**Mapping slug → composant** (pour le câblage à venir) :
`sites-web→SitesWeb` · `seo-geo→SeoGeo` · `lead-generation→LeadGeneration` · `publicite→Publicite` · `branding-design→BrandingDesign` · `automatisation-ia→AutomatisationIa`.

### Infra SEO
`src/lib/site.ts` (config + placeholders) · `SchemaMarkup` (Organization + LocalBusiness + WebSite, câblé layout) · `robots.ts` · `sitemap.ts` · `manifest.ts` · `icon.tsx` (favicon) · `public/llms.txt` · `public/humans.txt`.

### Agents & Skills (`.claude/`)
Agents : copywriter-fr, seo, threejs, ui-designer, svg-illustrator, qa. Skills : design-system (ancre cohérence), seo-checklist, i18n-content.
NB : le tool Agent du runtime n'expose pas les agents projet → l'illustrateur a tourné via `general-purpose` avec les contraintes injectées.

---

## 5. Bugs corrigés
| Bug | Cause | Fix |
|---|---|---|
| `/` → 404 | proxy ignoré à la racine quand app sous `src/` | déplacé `src/proxy.ts` + matcher `"/"` |
| Hero illisible | titre sur l'anneau du trou noir | trou noir déplacé + 3 filtres scrim |
| **Scroll horizontal 8591 px** | `.marquee-container{overflow:hidden}` manquant | règle CSS ajoutée → 1440 px / mobile 390 px |
| Logo centré | svg étiré (flex stretch) | `self-start` + `preserveAspectRatio` |

---

## 6. État ACTUEL du trou noir (Hero)
- Position : `[3.5, 0.4, 0]` (desktop, à droite légèrement ramené à gauche), mobile `[1.2, 2.6, 1]`, scale `1.7`.
- **Filtre dépoli** devant le trou noir (flou 2px + voile sombre, masqué sur sa zone droite).
- **Palette bleu-vert** : cœur `#eafffb` → `#7df5e6` → vert `#22d38c` → `#14a7c8` → bleu `#0e3a6b` ; anneaux photons `#cffef6`.
- **Disque 1** (plat) : 4500 desktop / 2300 mobile, maxRadius 1.4.
- **Disque 2** (incliné `Math.PI*0.35`) : 1000 / 600, maxRadius 0.7, `coreWhite=0.75` (blanc près de l'horizon), `extraSoftness=0.22` (plus flou).
- + horizon noir (r 0.42) + lentille gravitationnelle (shader FBO).
- Props de réglage : `diskCount`, `disk2Count`, `diskMaxRadius`, `disk2MaxRadius`, `diskSizeScale`, `diskBrightness`, `diskSpeed`, `coreWhite`, `extraSoftness`.

---

## 7. REPRISE — prochaines phases (pour la prochaine fois)

### Phase A — Pages internes (tâche #7, en cours)
Câbler les 6 illustrations + Breadcrumbs + `Service` JSON-LD. Pages à créer sous `src/app/[lang]/` :
- [ ] `services/page.tsx` (index des 6 services, avec illustrations)
- [ ] `services/[slug]/page.tsx` (détail : `generateStaticParams` + `generateMetadata` via `dict.services[].metaTitle/metaDescription`, illustration, bullets, CTA, `Service`+`BreadcrumbList` JSON-LD)
- [ ] `agence`, `approche`, `realisations`, `contact` (formulaire), `merci`
- [ ] `mentions-legales`, `confidentialite`, `cookies`
- [ ] `not-found.tsx`
- Pattern page interne : `Header` (sans `overHero`) + `Breadcrumbs` + contenu + `ContactCta` + `Footer`.

### Phase B — SEO restant (tâche #8)
- [ ] `public/llms-full.txt` (contenu texte intégral)
- [ ] **OG images dynamiques** : `opengraph-image.tsx` (+ `twitter-image.tsx`) par route, design de marque (noir + lime + titre de page)
- [ ] Meta titles/descriptions des pages non-services (agence, approche, contact… → déjà partiellement dans `dict.meta`)
- [ ] Compléter `src/lib/site.ts` avec les vraies données (voir §8)

### Phase C — QA (tâche #9)
- [ ] `npm run build` propre
- [ ] Lighthouse (perf/SEO/a11y ≥ 95)
- [ ] Re-vérifier overflow horizontal à 360px sur toutes les pages
- [ ] Contraste (lime sur blanc en mode clair), focus, reduced-motion

### Idées/réglages en attente
- Light mode : revérifier que les bandes sombres (hero/Geo/CTA) restent cohérentes.
- Densité/luminosité des halos `AmbientGlow` ajustable.

---

## 8. 4 faits bloquants (à fournir) — rendent SEO/schema/footer réels
1. **Domaine** final (codé : `https://vortx.lu`)
2. **Coordonnées** : adresse, téléphone, e-mail
3. **Réseaux sociaux** (sameAs + footer)
4. **Preuve réelle** : clients/résultats, ou placeholders

---

## 9. Lancer / vérifier

```bash
cd "C:\Users\Cesar\Documents\AI SITES\VorTX"
npm run dev          # http://localhost:3000 → /fr
npm run build        # build prod
npx tsc --noEmit     # type-check
node scripts/shot.mjs "http://localhost:3000/fr" out.png 1440 950 dark 0   # capture hero
node scripts/shot.mjs "http://localhost:3000/fr" full.png 1440 900 dark 1  # capture pleine page
node scripts/check-overflow.mjs http://localhost:3005 360 /fr /fr/services # anti-scroll-horizontal
```

> Note Windows : lancer les scripts puppeteer via **PowerShell** (Git Bash mange les
> chemins commençant par `/`). Un 2ᵉ serveur dev tourne sur :3005 avec son propre
> cache (`NEXT_DIST_DIR=.next-dev2 npx next dev -p 3005`). Build isolé :
> `NEXT_DIST_DIR=.next-build npx next build`.

---

## 10. Session 2026-06 — buildout complet (branche `feat/site-buildout-perf-seo`)

Audit multi-agents (56 constats) → exécution des 8 chantiers. **`tsc` exit 0 ; `next build` OK (26 routes) ; 0 scroll horizontal à 360px.**

**Pages internes (Phase A — FAIT).** Tous les liens pointaient vers des 404 ; créées sous `src/app/[lang]/` : `services` (index + illustrations), `services/[slug]` (×6, `generateStaticParams` + `Service` JSON-LD + illustration mappée via `components/illustrations/map.ts`), `agence`, `approche`, `realisations`, `contact`, `merci`, `not-found`, + 3 pages légales (placeholder `[À COMPLÉTER]`, `noindex`). Pièces partagées : `layout/PageShell`, `lib/metadata.ts` (`buildMetadata`), `legal/LegalDoc`. Formulaire → `app/api/contact/route.ts` (validation, honeypot, **Resend si `RESEND_API_KEY`+`CONTACT_TO`**, sinon log).

**SEO (Phase B — FAIT).** Corrigé 404 `/icon` (le `proxy` redirigeait les routes de métadonnées → matcher étendu). Ajouté `opengraph-image`/`twitter-image`/`apple-icon`, `FAQPage` JSON-LD (Faq), `BreadcrumbList` (toutes pages internes), hreflang `x-default`, `metadataBase` par page. `robots` host retiré. `public/llms-full.txt` ajouté. `LocalBusiness` dégradé en `Organization/ProfessionalService` (bascule auto via `site.address.street`). Titre template gardé `%s` (les titres du dict portent déjà la marque).

**3D / animations.** Disque d'accrétion : orbite en vertex shader (`uTime`) au lieu d'une boucle CPU ; `prefers-reduced-motion` → frame statique ; fallback WebGL context-loss ; `next/dynamic ssr:false` (`BlackHoleLazy`/`HelixDNALazy`). Hélice : ponts fusionnés (1 draw call), scaling mobile, GL tuning. CSS : `backdrop-filter` hero desktop-only (`@supports`), `@supports` mask-composite spotlight, `AmbientGlow` 8→5 blobs, `svh`, `SpotlightCards` rAF + `pointer:fine`.

**RGPD / Trust / a11y.** Bannière consentement opt-in (`layout/ConsentBanner`, `getConsent()` — gate GA4/GTM/Meta à brancher). `Proof` : grille de logos vides retirée. Footer : e-mail/tél/réseaux conditionnels. CTA sticky mobile (`layout/StickyCta`). Cibles tactiles 44px, `aria-haspopup`, `Wordmark` `aria-hidden` propagé, taglines `.tagline` (teal AA en clair).

**Contenu.** Retiré toutes les mentions « livraison 2 à 4 semaines ». Hero : wordmark VORTX en filigrane, ligne de réassurance animée (`.brand-sweep`), bloc stats retiré.

### §8 — toujours à fournir (bloque le réel)
1. Domaine final · 2. **Adresse/tél/e-mail réels** (→ `lib/site.ts` : remplir `address.street`/`postalCode` rebascule le schema en LocalBusiness ; `phone`/`sameAs` activent footer) · 3. Réseaux · 4. Preuve réelle (témoignages/logos pour `Proof`). + Brancher un transport e-mail (`RESEND_API_KEY`) et l'analytics derrière le consentement.

### Reste / idées
- Mega-menu : passer en vrai disclosure (aria-expanded + Échap + clic-extérieur) — actuellement hover/focus CSS (le déclencheur navigue désormais vers `/services` réel).
- Marquees/logo nav : pause hors-écran via IntersectionObserver (micro-opt).
- DE/EN : créer `de.ts`/`en.ts` + switcher quand décidé (archi déjà prête).

---

## 11. Session 2026-06-09/10 — contenu News, URLs localisées, partage, icônes complexes

> Marque écrite **`vortx`** (minuscule) dans le dico. **Les 4 langues sont live** : `fr` (source `as const`), `en`/`de`/`es` (cast `as unknown as Dictionary`). `tsc` exit 0 + `next build` (142 pages) verts à chaque étape. Tout est poussé sur `main`.

### A. Sandbox typographies (`/[lang]/typographies-testsss`, noindex)
Page interne pour comparer des polices en live. Accents/diacritiques + phrases multilingues FR/DE/ES/EN + ponctuation, toutes les polices en `subsets: ["latin","latin-ext"]`. Sections réduites à **6 sans + 2 mono**. Ajout de **Clarity City** (OFL, VMware) en **self-host** (`next/font/local`, 5 `.woff2` Light→Bold + `OFL.txt` dans `src/fonts/clarity-city/`) — pas sur Google Fonts.
Commits : `d1a65fa`, `9f55a94`, `032f3ae`.

### B. News / articles — gros lot (commit `3ac11f8`)
- **Résumé « généré par IA » par article** (écrit à la main, **sans clé API**) : encadré sparkle + synthèse + « À retenir » (3 points) + disclaimer honnête. Composant `news/AiSummary`.
- **Liens internes** « Pour aller plus loin » par article (`news/ArticleLinks`) → articles liés / services / glossaire (SEO).
- **Catégories + filtres** sur `/news` : `news/NewsList` (client) avec pastilles de filtre dérivées des articles, « Tous les sujets » actif en lime.
- **Sommaire scroll-spy** : `news/ArticleToc` réécrit avec IntersectionObserver → section courante **en lime** (desktop + mobile).
- **Nouvel article** `ia-pme-luxembourg-par-ou-commencer` (« IA pour les PME au Luxembourg : par où commencer ») — angle stratégique, complémentaire de l'existant « 5 tâches PME », cross-link mutuel. Slug ajouté à `lib/site.ts`.
- **Modèle de données** : type article étendu (`summary?`, `links?`) ; labels `news.*` ajoutés.
- **Traductions EN/DE/ES** produites par **workflow (1 agent par fichier de dico → zéro conflit)** + agent de revue de complétude. Voir mémoire `vortx-translation-workflow-one-agent-per-file`.

### C. Page Sites web — section « Tout est inclus » (commit `3ac11f8`, icônes `22862c6`)
- Nouvelle section `sections/PacksIncluded` dans `serviceContent["sites-web"].packsIncluded` (9 features + carte « Et bien plus encore… » + bouton contact). **ES = texte espagnol du client au mot près** ; FR/EN/DE localisés.
- **Icônes super complexes** : 9 illustrations SVG dédiées animées (`src/components/illustrations/packs/Pack*.tsx` + `index.ts` → `packIcons`), style maison 120×120 (dégradés cyan/vert/bleu/lime + halo + SMIL). **Préfixe d'ID unique `pk*` par icône** (sinon collision de gradients sur une même page). Générées par **9 agents `vortx-svg-illustrator` en parallèle** (un fichier chacun) + revue. Affichées dans un cadre `illu-stage`.

### D. URLs localisées par langue (commit `8ae7101`)
Slugs publics traduits par langue : `/es/agencia`, `/de/kontakt`, `/en/agency`, `/fr/agence`…
- **`src/i18n/routes.ts`** (nouveau) : table `routeSlugs` (segment canonique = nom de dossier FR → slug par locale) + `localizePath`/`canonicalizePath` (1ᵉʳ segment seulement ; les slugs de contenu service/article **restent stables**).
- **`lib/locale.ts`** : `localized()` traduit le 1ᵉʳ segment → tous les liens, `canonical`, `hreflang`, `sitemap` deviennent localisés.
- **`proxy.ts`** (middleware) : réécrit l'URL localisée → dossier canonique, et **redirige (307)** les mauvaises formes (ex. `/es/agence` → `/es/agencia`). 307 temporaire en pré-prod → passer 308 au lancement.
- **`LanguageSwitcher`** : canonicalise puis re-localise (reste sur la même page dans la langue cible).
- Corrigé les constructeurs d'URL manuels (sitemap, JSON-LD contact, liens légaux inline).
- Slugs : services→servicios/leistungen · agence→agency/agentur/agencia · contact→kontakt/contacto · approche→approach/ansatz/enfoque · realisations→work/referenzen/proyectos · glossaire→glossary/glossar/glosario · news→noticias (es) · légales (impressum/datenschutz/aviso-legal…).
- **À décider** : faut-il aussi traduire les slugs de **contenu** (service `sites-web`, slugs d'articles) ? Pour l'instant **non** (identité stable = usage habituel).

### E. CTA devis + bouton Partager dans les articles (commit `1568495`)
- `news/ArticleCta` : encadré conversion en fin d'article, **avant** « Pour aller plus loin » → bouton « Demander un devis » vers `/contact`.
- `news/ShareButton` (client) : **copier le lien** (presse-papiers + feedback) + LinkedIn / X / WhatsApp / e-mail + **partage natif** (`navigator.share`). Placé **dans le Sommaire desktop** (panel) et **après « ← Toutes les news »** (inline). URL partagée = URL **canonique localisée**.

### F. Hero — étoile mobile (commit `89ebab7`)
Étoile glow en bas à droite (`HeroParticles`, `left-[80%] top-[74%]`) **légèrement réduite sur mobile uniquement** (`scale 0.8` via instance `md:hidden`, desktop reste `scale 1`). Le `transform: scale()` inline n'étant pas responsive en Tailwind → deux instances.

### Notes techniques / leçons
- **Gotcha i18n** : en/de/es sont **force-cast** `as unknown as Dictionary` → un champ manquant **ne lève pas d'erreur tsc** (rendu `undefined` à l'exécution). Donc **vérifier par rendu** (build/captures), pas seulement `tsc`. Tout champ optionnel du dico est gardé par `&&`. (Mémoire : `i18n-force-cast-hides-missing-translations`.) Exception : les objets `news.articles` ont un cast inline `as {...}[]` qui, lui, est strict.
- **Le tool Agent expose désormais les agents projet** (`vortx-svg-illustrator`, `vortx-copywriter-fr`, etc.) via `agentType` dans un Workflow — contredit la note de §4/§10.
- **Build pendant que `dev` tourne = `.next` corrompu** → toujours build isolé `NEXT_DIST_DIR=.next-prod npx next build` (puis `git checkout tsconfig.json` car Next ré-ajoute le dist dir, et `rm -rf .next-prod`).
- **`git push` qui hangue** (stall HTTP/2) → pousser en **HTTP/1.1** : `git -c http.version=HTTP/1.1 push origin main`.

### Historique commits de la session
`d1a65fa` typo accents/multilingue · `9f55a94` retrait 9 polices · `032f3ae` Clarity City · `3ac11f8` News (résumés IA, liens, filtres, ToC lime, article PME×IA, section packs) · `8ae7101` URLs localisées · `1568495` CTA devis + partage · `89ebab7` étoile hero mobile · `22862c6` icônes complexes packs.
