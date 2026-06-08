/**
 * French dictionary — source of truth for all UI copy.
 * Positioned for the Luxembourg B2B market: local proof, no public
 * pricing (qualification call), conversion-first language.
 */

/** A block of long-form article body (discriminated by `type`). */
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; title: string; text: string };

/** One glossary entry. */
export type GlossaryTerm = {
  term: string;
  slug: string;
  category: string;
  short: string;
  def: string;
};

export const fr = {
  locale: "fr",
  brand: {
    name: "VorTX",
    baseline: "Agence marketing & web · Luxembourg",
    tagline: "L'attraction, par le design.",
  },

  // ---- Global / reusable ----
  common: {
    cta: "Réserver un appel",
    ctaSecondary: "Voir les services",
    ctaShort: "Parlons-en",
    auditCta: "Obtenir un audit gratuit",
    readMore: "En savoir plus",
    backHome: "Retour à l'accueil",
    allServices: "Tous les services",
    servicesShort: "Les services",
    menu: "Menu",
    close: "Fermer",
    openMenu: "Ouvrir le menu",
    toggleTheme: "Changer de thème",
    language: "Langue",
    breadcrumbHome: "Accueil",
  },

  nav: {
    services: "Services",
    approach: "Approche",
    work: "Réalisations",
    about: "Agence",
    news: "Les news",
    glossary: "Glossaire",
    faq: "FAQ",
    contact: "Contact",
  },

  // ---- Mega menu ----
  megaMenu: {
    servicesTitle: "Ce que nous faisons",
    servicesLead:
      "De la première impression au client signé. Une chaîne complète, pensée pour la conversion.",
    columns: {
      acquire: "Attirer",
      convert: "Convertir",
      scale: "Faire croître",
    },
    featured: {
      label: "À la une",
      title: "Site Lead Gen prêt à convertir",
      desc: "Un site rapide, pensé IA-ready, prêt à convertir.",
    },
  },

  // ---- HERO ----
  hero: {
    eyebrow: "Agence marketing · Luxembourg",
    titleLead: "Marketing & web à Luxembourg qui",
    titleAccent: "attire et convertit.",
    subtitle:
      "VorTX conçoit des sites et des stratégies d'acquisition qui transforment l'attention en clients. Design premium, SEO de nouvelle génération, génération de leads mesurable.",
    primaryCta: "Réserver un appel découverte",
    secondaryCta: "Découvrir notre approche",
    note: "Réponse rapide · Audit offert · Sans engagement · 100% sur-mesure",
  },

  stats: [
    { value: "Express", label: "Réponse garantie" },
    { value: "100 %", label: "Conçu sur mesure" },
    { value: "FR · DE · EN", label: "Multilingue natif" },
  ],

  // ---- Trust / positioning band ----
  trust: {
    eyebrow: "Pourquoi VorTX",
    title: "Une agence, pas un prestataire.",
    lead: "Au Luxembourg, vos clients comparent en français, en allemand et en anglais. Nous construisons des présences qui performent dans les trois — et qui parlent autant à Google qu'aux IA génératives.",
    pillars: [
      {
        title: "Stratégie d'abord",
        desc: "Pas de site joli sans objectif. On part de votre tunnel de vente, pas d'un template.",
      },
      {
        title: "Conversion mesurable",
        desc: "Chaque page a un job : générer un appel, un devis, un lead. On mesure, on optimise.",
      },
      {
        title: "Ancrage local",
        desc: "Marché luxembourgeois, multilingue, RGPD. On connaît votre terrain.",
      },
      {
        title: "Prêt pour l'IA",
        desc: "SEO + GEO/GSO : être cité par Google ET par les réponses des IA génératives.",
      },
    ],
  },

  // ---- SERVICES ----
  servicesSection: {
    eyebrow: "Nos services",
    title: "Une chaîne complète, de l'attention au client.",
    lead: "Six expertises qui s'emboîtent. Prenez-en une, ou laissez-nous orchestrer l'ensemble.",
  },

  services: [
    {
      slug: "sites-web",
      group: "convert",
      title: "Sites web qui convertissent",
      tagline: "Des sites rapides, pensés pour transformer le visiteur en client.",
      short:
        "Sites vitrines, landing pages et plateformes sur mesure en Next.js — ou sur WordPress quand vous voulez garder la main. Production accélérée par l'IA, design premium et tunnels de conversion intégrés.",
      bullets: [
        "Sur-mesure Next.js ou WordPress, selon votre besoin",
        "Production accélérée par l'IA, livrée plus vite",
        "Design sur mesure, mobile-first",
        "Formulaires intelligents multi-étapes",
        "100 % responsive & accessible",
      ],
      metaTitle: "Création de sites web à Luxembourg | VorTX",
      metaDescription:
        "Sites web rapides, design premium et orientés conversion pour les entreprises luxembourgeoises. Développement Next.js, multilingue, SEO-ready.",
    },
    {
      slug: "seo-geo",
      group: "acquire",
      title: "SEO & GEO / GSO",
      tagline: "Visible sur Google. Cité par les IA.",
      short:
        "Référencement naturel technique et éditorial, étendu à l'ère des moteurs génératifs (GEO/GSO) : être la réponse, pas le lien n°7.",
      bullets: [
        "Audit technique & sémantique",
        "Contenu optimisé FR/DE/EN",
        "Schémas LLM-ready & données structurées",
        "Suivi de positions et de citations IA",
      ],
      metaTitle: "Agence SEO & GEO à Luxembourg | VorTX",
      metaDescription:
        "Référencement naturel et optimisation pour les IA génératives (GEO/GSO) au Luxembourg. Soyez trouvé sur Google et cité par les assistants IA.",
    },
    {
      slug: "lead-generation",
      group: "convert",
      title: "Génération de leads",
      tagline: "Des demandes de devis concrètes, chaque semaine.",
      short:
        "Un système d'acquisition complet : site optimisé, tunnels, campagnes et automatisation pour remplir votre agenda de prospects qualifiés.",
      bullets: [
        "Tunnels de conversion sur mesure",
        "Landing pages par campagne",
        "Qualification & scoring des leads",
        "Reporting clair sur le coût par lead",
      ],
      metaTitle: "Génération de leads B2B à Luxembourg | VorTX",
      metaDescription:
        "Système de génération de leads pour PME et artisans luxembourgeois : demandes de devis qualifiées chaque semaine, sans prospecter vous-même.",
    },
    {
      slug: "publicite",
      group: "acquire",
      title: "Publicité en ligne",
      tagline: "Le bon message, devant les bonnes personnes.",
      short:
        "Campagnes Google Ads, Meta et LinkedIn pilotées par la donnée. On dépense votre budget là où il rapporte.",
      bullets: [
        "Google Ads & Performance Max",
        "Meta Ads (Facebook & Instagram)",
        "LinkedIn Ads B2B",
        "Optimisation continue du ROAS",
      ],
      metaTitle: "Publicité en ligne (Google & Meta Ads) Luxembourg | VorTX",
      metaDescription:
        "Campagnes Google Ads, Meta et LinkedIn rentables pour le marché luxembourgeois. Acquisition payante pilotée par la donnée et orientée ROI.",
    },
    {
      slug: "branding-design",
      group: "convert",
      title: "Identité & design",
      tagline: "Une marque dont on se souvient.",
      short:
        "Identité visuelle, direction artistique et systèmes de design. La cohérence qui inspire confiance avant le premier mot.",
      bullets: [
        "Logo & identité de marque",
        "Direction artistique",
        "Design system & UI/UX",
        "Déclinaisons print & digital",
      ],
      metaTitle: "Branding & design graphique à Luxembourg | VorTX",
      metaDescription:
        "Identité de marque, direction artistique et design system pour les entreprises luxembourgeoises. Une image cohérente qui inspire confiance.",
    },
    {
      slug: "automatisation-ia",
      group: "scale",
      title: "Automatisation & IA",
      tagline: "Plus de résultats, moins de tâches répétitives.",
      short:
        "Workflows automatisés, intégrations et agents IA sur mesure pour faire gagner du temps à vos équipes et accélérer vos réponses.",
      bullets: [
        "Automatisation des workflows",
        "Agents & assistants IA sur mesure",
        "Intégrations CRM & outils",
        "Chatbots et widgets intelligents",
      ],
      metaTitle: "Automatisation & IA pour entreprises Luxembourg | VorTX",
      metaDescription:
        "Automatisation des workflows, intégrations et agents IA sur mesure pour les entreprises luxembourgeoises. Gagnez du temps, répondez plus vite.",
    },
  ],

  // ---- Lead-gen / problem→solution ----
  leadgen: {
    eyebrow: "Le problème, puis la solution",
    title: "Un beau site ne suffit pas. Il faut qu'il rapporte.",
    problemTitle: "Sans système d'acquisition :",
    problems: [
      "Des opportunités qui passent inaperçues",
      "Un ROI marketing décevant",
      "Trop de visites, trop peu de contacts",
    ],
    solutionTitle: "Avec VorTX :",
    solutions: [
      "Un site pensé pour convertir, livré vite",
      "Un tunnel clair : visiteur → lead → client",
      "Un budget marketing qui se justifie en chiffres",
    ],
    funnel: ["Visiteur", "Intéressé", "Prospect", "Client"],
  },

  // ---- Process ----
  process: {
    eyebrow: "Notre méthode",
    title: "L'adn Marketing, zéro mauvaise surprise.",
    steps: [
      {
        n: "01",
        title: "Diagnostic",
        desc: "On analyse votre marché, vos objectifs et votre tunnel actuel pour bâtir une stratégie sur mesure.",
      },
      {
        n: "02",
        title: "Conception & développement",
        desc: "Design premium et développement aux dernières technologies, avec les meilleures pratiques de conversion.",
      },
      {
        n: "03",
        title: "Revue & ajustements",
        desc: "On vous présente le résultat et on ajuste jusqu'à ce que vous soyez pleinement satisfait.",
      },
      {
        n: "04",
        title: "Lancement & suivi",
        desc: "Mise en ligne, configuration et accompagnement pour commencer à générer des résultats.",
      },
    ],
  },

  // ---- Tools / stack ----
  tools: {
    eyebrow: "Notre arsenal",
    title: "Les meilleurs outils, maîtrisés en profondeur.",
    lead: "Marketing, code, IA, design. On choisit l'outil pour le résultat, pas l'inverse.",
    stat: { value: "40+", label: "outils maîtrisés" },
    categories: [
      {
        name: "Marketing digital",
        items: [
          "Google Ads",
          "Facebook Ads",
          "LinkedIn Ads",
          "Google Analytics",
          "Tag Manager",
          "Search Console",
          "Bing Webmaster",
          "Matomo",
          "Ahrefs",
          "Semrush",
          "Whatagraph",
          "Google My Business",
          "Mailchimp",
          "SendGrid",
        ],
      },
      {
        name: "Web & code",
        items: ["WordPress", "Divi", "CSS", "HTML", "VS Code"],
      },
      {
        name: "IA & automatisation",
        items: [
          "Claude Code",
          "ChatGPT",
          "Perplexity",
          "Zapier",
          "IA édition d'images",
        ],
      },
      {
        name: "Design",
        items: [
          "Photoshop",
          "Illustrator",
          "Adobe Express",
          "Canva",
          "Affinity",
          "Figma",
          "GIMP",
          "UI/UX",
          "Maquettes",
        ],
      },
      {
        name: "Productivité",
        items: [
          "Word",
          "Excel",
          "Google Docs",
          "Google Sheets",
          "PowerPoint",
          "Google Slides",
          "Salesforce",
          "Asana",
          "Slack",
          "Discord",
          "Teams",
          "Google Meet",
        ],
      },
    ],
  },

  // ---- GEO / SEO IA ----
  geo: {
    eyebrow: "Le SEO du futur",
    title: "GEO / GSO : être la réponse de l'IA.",
    lead: "La recherche évolue. Vos clients posent leurs questions à des assistants IA. Nous optimisons pour que VorTX — et vous — soyez la source citée.",
    points: [
      {
        title: "Citations directes par l'IA",
        desc: "Du contenu structuré pour être repris dans les réponses génératives.",
      },
      {
        title: "Schémas LLM-ready",
        desc: "Données structurées et fichiers (llms.txt) qui parlent aux modèles.",
      },
      {
        title: "SEO & GEO intégrés",
        desc: "On ne sacrifie pas Google pour l'IA — on gagne sur les deux.",
      },
    ],
  },

  // ---- Proof (honest placeholders) ----
  proof: {
    eyebrow: "Confiance",
    title: "La preuve par les résultats.",
    placeholderNote:
      "Études de cas en cours de publication. Vos résultats seront les prochains.",
    logosTitle: "Ils nous font confiance",
    guaranteesTitle: "Nos engagements",
    testimonials: [
      // À remplacer par de vrais témoignages clients.
    ] as { quote: string; author: string; role: string }[],
    guarantees: [
      "Consultation initiale gratuite",
      "Devis sans engagement",
      "Réponse rapide garantie",
      "Accompagnement après lancement",
    ],
  },

  // ---- FAQ ----
  faq: {
    eyebrow: "Questions fréquentes",
    title: "Ce que les clients demandent avant de démarrer.",
    items: [
      {
        q: "Combien coûte un site ou une campagne ?",
        a: "Chaque projet est sur mesure. Plutôt qu'un tarif générique, on vous propose un devis précis après un appel découverte gratuit et un audit de votre situation.",
      },
      {
        q: "Travaillez-vous en plusieurs langues ?",
        a: "Oui. Nos sites sont multilingues nativement (FR, DE, EN, et Lëtzebuergesch sur demande), adaptés au marché luxembourgeois.",
      },
      {
        q: "Qu'est-ce que le GEO / GSO ?",
        a: "C'est l'optimisation pour les moteurs de réponse IA (ChatGPT, Perplexity, Google AI). On structure votre contenu pour que les IA vous citent comme source.",
      },
      {
        q: "Proposez-vous un suivi après la mise en ligne ?",
        a: "Oui. Maintenance, évolutions, optimisation de la conversion et accompagnement marketing continu font partie de notre offre.",
      },
    ],
  },

  // ---- Final CTA / contact ----
  contact: {
    eyebrow: "Passons à l'action",
    title: "Prêt à transformer votre présence en ligne ?",
    lead: "Réservez un appel découverte gratuit. On analyse votre situation et on vous dit, sans détour, ce qui peut être amélioré.",
    benefits: [
      "Consultation initiale gratuite",
      "Audit personnalisé sans délai",
      "Devis sans engagement",
      "Accompagnement après lancement",
    ],
    form: {
      name: "Nom complet",
      email: "E-mail",
      phone: "Téléphone (optionnel)",
      company: "Entreprise (optionnel)",
      interest: "Service qui vous intéresse",
      message: "Votre message",
      submit: "Envoyer ma demande",
      success: "Merci ! Nous revenons vers vous très vite.",
    },
  },

  // ---- Footer (cd-lac style) ----
  footer: {
    blurb:
      "VorTX — agence marketing et web au Luxembourg. On attire l'attention, on la convertit en clients.",
    columns: {
      services: {
        title: "Services",
        links: [
          { label: "Sites web", href: "/services/sites-web" },
          { label: "SEO & GEO", href: "/services/seo-geo" },
          { label: "Génération de leads", href: "/services/lead-generation" },
          { label: "Publicité en ligne", href: "/services/publicite" },
          { label: "Identité & design", href: "/services/branding-design" },
          { label: "Automatisation & IA", href: "/services/automatisation-ia" },
        ],
      },
      company: {
        title: "Agence",
        links: [
          { label: "À propos", href: "/agence" },
          { label: "Notre méthode", href: "/approche" },
          { label: "Réalisations", href: "/realisations" },
          { label: "Les news", href: "/news" },
          { label: "Glossaire", href: "/glossaire" },
          { label: "FAQ", href: "/faq" },
          { label: "Contact", href: "/contact" },
        ],
      },
      legal: {
        title: "Légal",
        links: [
          { label: "Mentions légales", href: "/mentions-legales" },
          { label: "Confidentialité", href: "/confidentialite" },
          { label: "Cookies", href: "/cookies" },
        ],
      },
    },
    contactTitle: "Contact",
    location: "Luxembourg",
    rights: "Tous droits réservés.",
    madeWith: "Conçu avec soin et beaucoup d'IA.",
    backToTop: "Retour en haut",
  },

  // ---- Agence (about) page ----
  agence: {
    eyebrow: "L'agence",
    title: "Une équipe d'attraction, au service de votre croissance.",
    lead: "VorTX réunit le marketing, le design et la technologie sous un même toit, à Luxembourg. Une obsession : transformer l'attention en clients, et le prouver en chiffres.",
    story: [
      "VorTX est né d'un constat simple : trop d'entreprises luxembourgeoises ont un site qui ressemble à une brochure — joli, mais qui ne rapporte rien. On construit l'inverse : des présences digitales pensées comme des machines d'acquisition.",
      "Derrière l'agence, une équipe qui cumule plus d'une décennie d'expérience en marketing digital, développement web et direction artistique. On a vu les modes passer ; on garde ce qui convertit, on jette le reste.",
      "On travaille en français, en allemand et en anglais, avec une seule exigence : que chaque euro investi dans votre marketing soit justifiable. Pas de jargon, pas de promesse en l'air — des résultats mesurables.",
    ],
    experience: {
      suffix: "ans",
      label: "d'expérience cumulée",
      note: "marketing · web · design",
    },
    stats: [
      { value: "100 %", label: "Sur mesure, jamais de template" },
      { value: "FR·DE·EN", label: "Multilingue natif" },
      { value: "GEO", label: "Optimisé pour les IA génératives" },
    ],
    valuesTitle: "Ce qui nous distingue",
    arsenalTitle: "Notre arsenal",
    arsenalLead:
      "Les outils qu'on maîtrise pour concevoir, mesurer et faire croître. Marketing, code, IA, design, productivité — on choisit l'outil pour le résultat, pas l'inverse.",
    ctaTitle: "Envie de travailler ensemble ?",
  },

  // ---- Reviews (homepage) — PLACEHOLDERS: replace with real client reviews ----
  reviews: {
    eyebrow: "Avis clients",
    title: "Ce que disent les entreprises qui nous font confiance.",
    lead: "Des retours concrets de dirigeants et d'équipes marketing au Luxembourg.",
    aggregate: {
      rating: "4,9",
      ratingMax: "5",
      countLabel: "avis vérifiés",
      count: "27",
      platform: "Google",
    },
    note: "Avis représentatifs — à remplacer par vos vrais avis Google / Trustpilot.",
    items: [
      {
        name: "Laurent M.",
        role: "Gérant, entreprise de construction",
        location: "Strassen",
        rating: 5,
        quote:
          "Notre nouveau site génère des demandes de devis chaque semaine. En trois mois, on a récupéré l'investissement. Réactifs, clairs, et le résultat parle de lui-même.",
      },
      {
        name: "Sophie R.",
        role: "Responsable marketing, cabinet de conseil",
        location: "Luxembourg-Ville",
        rating: 5,
        quote:
          "Enfin une agence qui parle résultats et pas seulement design. Le travail SEO nous a fait remonter sur des requêtes que nos concurrents trustaient depuis des années.",
      },
      {
        name: "Marco F.",
        role: "Fondateur, e-commerce artisanal",
        location: "Esch-sur-Alzette",
        rating: 5,
        quote:
          "Site refait de A à Z, rapide et impeccable sur mobile. L'équipe a tout automatisé pour qu'on passe moins de temps sur l'administratif. Un vrai gain au quotidien.",
      },
      {
        name: "Anne K.",
        role: "Directrice, agence immobilière",
        location: "Bertrange",
        rating: 5,
        quote:
          "Professionnels et de bon conseil. Ils ont compris notre marché luxembourgeois et adapté le message en FR et en DE. Les leads sont plus qualifiés qu'avant.",
      },
      {
        name: "David L.",
        role: "CEO, startup SaaS",
        location: "Luxembourg-Ville",
        rating: 5,
        quote:
          "Leur approche GEO nous a mis devant la concurrence sur ChatGPT et Perplexity. On est désormais cités comme référence. Bluffant et très en avance.",
      },
      {
        name: "Christine B.",
        role: "Gérante, institut de bien-être",
        location: "Differdange",
        rating: 4,
        quote:
          "Accompagnement au top du début à la fin. Le site est magnifique et les premiers résultats en réservations sont là. Hâte de continuer avec eux.",
      },
    ],
  },

  // ---- News / blog ----
  news: {
    eyebrow: "Les news",
    title: "Idées, tendances et coulisses du marketing digital.",
    lead: "Nos analyses sur le SEO, le GEO, la conversion et le web au Luxembourg. Du concret, pas du vent.",
    homeTitle: "Dernières news",
    homeLead: "On partage ce qu'on apprend. Stratégie, IA, conversion — sans la langue de bois.",
    seeAll: "Voir toutes les news",
    readArticle: "Lire l'article",
    readingTime: "min de lecture",
    publishedOn: "Publié le",
    updatedOn: "Mis à jour le",
    by: "Par",
    backToNews: "Toutes les news",
    tocTitle: "Sommaire",
    relatedTitle: "À lire aussi",
    ctaTitle: "Envie d'être cité par les IA, vous aussi ?",
    articles: [
      {
        slug: "geo-seo-luxembourg-etre-cite-par-les-ia",
        category: "SEO & GEO",
        title:
          "SEO vs GEO : comment être trouvé sur Google ET cité par les IA en 2026",
        excerpt:
          "Le référencement ne se joue plus seulement sur Google. ChatGPT, Perplexity et Google AI deviennent la nouvelle porte d'entrée. Voici comment le SEO et le GEO travaillent ensemble — et ce qu'il faut faire concrètement.",
        date: "2026-06-02",
        updated: "2026-06-02",
        readingMinutes: 9,
        author: "L'équipe VorTX",
        cover: "geo-citation",
        body: [
          {
            type: "p",
            text: "Pendant vingt ans, « être visible en ligne » voulait dire une chose : remonter dans les résultats de Google. Aujourd'hui, une partie croissante de vos clients ne tape plus une requête dans un moteur — ils posent une question à une IA. ChatGPT, Perplexity, Google AI Overviews ou Copilot répondent directement, citent quelques sources, et l'internaute ne clique parfois sur aucun lien. La question n'est donc plus seulement « est-ce que je suis premier sur Google ? » mais « est-ce que l'IA me cite comme réponse ? ».",
          },
          {
            type: "h2",
            id: "seo-geo-definitions",
            text: "SEO, GEO, GSO : de quoi parle-t-on ?",
          },
          {
            type: "p",
            text: "Le SEO (Search Engine Optimization) regroupe tout ce qui vous fait remonter dans les moteurs de recherche classiques : qualité technique du site, pertinence du contenu, autorité (liens), expérience utilisateur. C'est la base, et elle ne disparaît pas.",
          },
          {
            type: "p",
            text: "Le GEO (Generative Engine Optimization), parfois appelé GSO (Generative Search Optimization), c'est l'optimisation pour les moteurs de réponse génératifs. L'objectif change : il ne s'agit plus seulement d'être bien classé, mais d'être la source que le modèle reprend, résume et cite dans sa réponse.",
          },
          {
            type: "callout",
            title: "En une phrase",
            text: "Le SEO vous place dans la liste des résultats. Le GEO vous place dans la réponse elle-même.",
          },
          {
            type: "h2",
            id: "pourquoi-maintenant",
            text: "Pourquoi s'en préoccuper maintenant",
          },
          {
            type: "p",
            text: "Parce que le comportement de recherche bascule vite, surtout en B2B. Un décideur qui prépare un achat demande de plus en plus « quelles sont les meilleures agences marketing au Luxembourg ? » à une IA plutôt qu'à Google. Si votre entreprise n'apparaît pas dans la réponse, vous n'existez pas dans cette décision — même si vous êtes troisième sur Google.",
          },
          {
            type: "ul",
            items: [
              "Les réponses IA réduisent le nombre de clics : être cité compte plus qu'être listé.",
              "Les modèles privilégient les contenus clairs, structurés et factuels.",
              "La confiance se construit : une marque citée par une IA gagne en crédibilité perçue.",
            ],
          },
          {
            type: "h2",
            id: "comment-faire",
            text: "Comment optimiser concrètement pour le GEO",
          },
          {
            type: "h3",
            text: "1. Structurez le contenu pour être cité",
          },
          {
            type: "p",
            text: "Les modèles aiment les réponses nettes. Une page qui pose une question en titre (H2/H3) et y répond en deux phrases claires juste en dessous a beaucoup plus de chances d'être reprise qu'un long paragraphe sinueux. Pensez « définition, puis détail ».",
          },
          {
            type: "h3",
            text: "2. Donnez des faits, des chiffres et du contexte local",
          },
          {
            type: "p",
            text: "Un contenu vérifiable et précis (chiffres, dates, lieux — ici, le marché luxembourgeois, le multilinguisme FR/DE/EN, le RGPD) est plus « citable ». Les généralités sont ignorées ; les faits ancrés sont repris.",
          },
          {
            type: "h3",
            text: "3. Rendez le site lisible par les machines",
          },
          {
            type: "ul",
            items: [
              "Données structurées (Schema.org) : Organization, Service, FAQPage, Article.",
              "Un fichier llms.txt qui résume votre offre pour les modèles.",
              "Une architecture propre, des titres hiérarchisés, des temps de chargement courts.",
            ],
          },
          {
            type: "h3",
            text: "4. Construisez l'autorité, partout",
          },
          {
            type: "p",
            text: "Les IA s'appuient sur ce qui se dit de vous ailleurs : avis, annuaires, mentions presse, profils cohérents. Une présence homogène (même nom, même adresse, même promesse) renforce la probabilité d'être retenu comme source fiable.",
          },
          {
            type: "h2",
            id: "seo-et-geo-ensemble",
            text: "SEO et GEO ne s'opposent pas — ils se renforcent",
          },
          {
            type: "p",
            text: "Bonne nouvelle : 80 % du travail est commun. Un contenu structuré, rapide, fiable et bien balisé performe à la fois sur Google et auprès des modèles. On ne sacrifie pas l'un pour l'autre — on conçoit dès le départ pour les deux.",
          },
          {
            type: "quote",
            text: "Le but n'est plus d'être le lien n°7. C'est d'être la réponse.",
          },
          {
            type: "callout",
            title: "À retenir",
            text: "Soignez votre SEO technique et éditorial, structurez vos pages pour la citation, ajoutez des données structurées et un llms.txt, et ancrez votre contenu dans des faits locaux. Vous gagnez sur Google et dans les réponses IA.",
          },
          {
            type: "p",
            text: "Chez VorTX, on construit chaque site et chaque stratégie de contenu avec cette double exigence dès la première ligne. Si vous voulez savoir où vous en êtes aujourd'hui, on vous offre un audit SEO/GEO sans engagement.",
          },
        ],
      },
    ] as {
      slug: string;
      category: string;
      title: string;
      excerpt: string;
      date: string;
      updated?: string;
      readingMinutes: number;
      author: string;
      cover: string;
      body: ArticleBlock[];
    }[],
  },

  // ---- Glossaire ----
  glossary: {
    eyebrow: "Glossaire",
    title: "Le vocabulaire du marketing et du web, sans jargon.",
    lead: "Tous les termes qu'on utilise — SEO, GEO, ROAS, tunnel, CMS… — expliqués simplement, avec le contexte luxembourgeois.",
    searchPlaceholder: "Rechercher un terme…",
    countSuffix: "termes",
    emptyLabel: "Aucun terme ne correspond à votre recherche.",
    ctaTitle: "Un terme vous échappe encore ?",
    terms: [
      {
        term: "SEO (référencement naturel)",
        slug: "seo",
        category: "SEO & GEO",
        short: "Être trouvé gratuitement sur Google.",
        def: "Le Search Engine Optimization regroupe les techniques qui améliorent la position d'un site dans les résultats naturels (non payants) des moteurs de recherche : qualité technique, contenu pertinent, autorité et expérience utilisateur.",
      },
      {
        term: "GEO / GSO",
        slug: "geo-gso",
        category: "SEO & GEO",
        short: "Être cité par les IA génératives.",
        def: "La Generative Engine Optimization (ou Generative Search Optimization) optimise votre contenu pour qu'il soit repris et cité comme source par les moteurs de réponse IA (ChatGPT, Perplexity, Google AI). L'objectif : être la réponse, pas seulement un lien.",
      },
      {
        term: "SERP",
        slug: "serp",
        category: "SEO & GEO",
        short: "La page de résultats de Google.",
        def: "Search Engine Results Page : la page qui affiche les résultats d'une recherche. Elle mêle liens naturels, annonces, extraits enrichis, et de plus en plus de réponses générées par IA.",
      },
      {
        term: "Mot-clé",
        slug: "mot-cle",
        category: "SEO & GEO",
        short: "Ce que tapent vos clients.",
        def: "Terme ou expression qu'un internaute saisit dans un moteur de recherche. Le SEO consiste en partie à identifier les mots-clés rentables et à structurer le contenu autour d'eux.",
      },
      {
        term: "Backlink",
        slug: "backlink",
        category: "SEO & GEO",
        short: "Un lien d'un autre site vers le vôtre.",
        def: "Lien entrant depuis un site tiers. Les backlinks de qualité signalent aux moteurs que votre site fait autorité, ce qui améliore le référencement.",
      },
      {
        term: "Données structurées (Schema.org)",
        slug: "donnees-structurees",
        category: "SEO & GEO",
        short: "Du code qui explique votre contenu aux machines.",
        def: "Balisage standardisé ajouté au code d'une page pour décrire son contenu (entreprise, service, article, FAQ…). Il aide Google et les IA à comprendre et à mettre en avant vos informations.",
      },
      {
        term: "llms.txt",
        slug: "llms-txt",
        category: "SEO & GEO",
        short: "Un résumé de votre site pour les IA.",
        def: "Fichier texte placé à la racine d'un site pour présenter, de façon structurée, son offre et ses contenus clés aux grands modèles de langage. Un levier émergent du GEO.",
      },
      {
        term: "Tunnel de conversion",
        slug: "tunnel-de-conversion",
        category: "Conversion",
        short: "Le chemin du visiteur jusqu'au client.",
        def: "Suite d'étapes par lesquelles passe un visiteur avant de devenir client (découverte → intérêt → contact → achat). On l'optimise pour réduire les abandons à chaque étape.",
      },
      {
        term: "Taux de conversion",
        slug: "taux-de-conversion",
        category: "Conversion",
        short: "Le % de visiteurs qui passent à l'action.",
        def: "Pourcentage de visiteurs qui réalisent l'action souhaitée (demande de devis, achat, inscription). Indicateur central de l'efficacité d'un site ou d'une campagne.",
      },
      {
        term: "Landing page",
        slug: "landing-page",
        category: "Conversion",
        short: "Une page faite pour une seule action.",
        def: "Page d'atterrissage conçue autour d'un objectif unique (souvent lié à une campagne) : convertir le visiteur en lead ou en client, sans distraction.",
      },
      {
        term: "Call-to-action (CTA)",
        slug: "cta",
        category: "Conversion",
        short: "Le bouton qui invite à agir.",
        def: "Élément (bouton, lien) qui incite le visiteur à passer à l'étape suivante : « Réserver un appel », « Obtenir un devis ». Sa clarté et sa visibilité influencent fortement la conversion.",
      },
      {
        term: "A/B testing",
        slug: "ab-testing",
        category: "Conversion",
        short: "Comparer deux versions pour garder la meilleure.",
        def: "Méthode qui consiste à montrer deux variantes d'une page ou d'un élément à des visiteurs différents, puis à mesurer laquelle convertit le mieux.",
      },
      {
        term: "Lead",
        slug: "lead",
        category: "Acquisition",
        short: "Un contact commercial potentiel.",
        def: "Personne ou entreprise ayant manifesté un intérêt (formulaire, appel, demande de devis) et susceptible de devenir client. Un lead « qualifié » correspond bien à votre cible.",
      },
      {
        term: "Génération de leads",
        slug: "generation-de-leads",
        category: "Acquisition",
        short: "Créer un flux régulier de prospects.",
        def: "Ensemble des actions (site, contenu, campagnes, automatisation) destinées à attirer et capturer des contacts qualifiés de façon prévisible.",
      },
      {
        term: "SEA / Publicité payante",
        slug: "sea",
        category: "Acquisition",
        short: "Acheter de la visibilité (Google, Meta…).",
        def: "Search Engine Advertising et publicité sur les réseaux : campagnes payantes (Google Ads, Meta, LinkedIn) qui affichent vos annonces devant une audience ciblée.",
      },
      {
        term: "ROAS",
        slug: "roas",
        category: "Données & mesure",
        short: "Ce que rapporte chaque euro de pub.",
        def: "Return On Ad Spend : revenu généré pour chaque euro dépensé en publicité. Un ROAS de 4 signifie 4 € de chiffre d'affaires pour 1 € investi.",
      },
      {
        term: "ROI",
        slug: "roi",
        category: "Données & mesure",
        short: "Le retour sur investissement global.",
        def: "Return On Investment : rapport entre le gain obtenu et la somme investie. Indicateur clé pour juger la rentabilité d'une action marketing.",
      },
      {
        term: "CPL / CPA",
        slug: "cpl-cpa",
        category: "Données & mesure",
        short: "Combien coûte un lead ou une vente.",
        def: "Coût Par Lead (CPL) et Coût Par Acquisition (CPA) : montant moyen dépensé pour obtenir respectivement un contact qualifié ou un client. À comparer à la valeur générée.",
      },
      {
        term: "KPI",
        slug: "kpi",
        category: "Données & mesure",
        short: "Les chiffres qui comptent vraiment.",
        def: "Key Performance Indicator : indicateur clé choisi pour mesurer la progression vers un objectif (taux de conversion, coût par lead, trafic qualifié…).",
      },
      {
        term: "CTR",
        slug: "ctr",
        category: "Données & mesure",
        short: "Le % de clics sur un lien ou une annonce.",
        def: "Click-Through Rate : proportion de personnes qui cliquent après avoir vu un lien, une annonce ou un résultat. Un CTR élevé signale un message pertinent.",
      },
      {
        term: "Analytics",
        slug: "analytics",
        category: "Données & mesure",
        short: "Mesurer ce qui se passe sur votre site.",
        def: "Outils (Google Analytics, Matomo…) qui suivent le comportement des visiteurs : sources de trafic, pages vues, conversions. La base de toute décision marketing.",
      },
      {
        term: "CMS",
        slug: "cms",
        category: "Web & tech",
        short: "L'outil pour gérer le contenu d'un site.",
        def: "Content Management System (ex : WordPress) : plateforme qui permet de créer et modifier les pages d'un site sans coder. Pratique pour garder la main au quotidien.",
      },
      {
        term: "WordPress",
        slug: "wordpress",
        category: "Web & tech",
        short: "Le CMS le plus répandu au monde.",
        def: "Système de gestion de contenu open-source très populaire, idéal quand vous voulez éditer vos pages vous-même. Flexible grâce à ses thèmes et extensions.",
      },
      {
        term: "Next.js",
        slug: "nextjs",
        category: "Web & tech",
        short: "Un framework web ultra-rapide.",
        def: "Framework basé sur React, utilisé pour construire des sites très performants, sécurisés et optimisés pour le SEO. Notre choix par défaut pour le sur-mesure.",
      },
      {
        term: "Responsive",
        slug: "responsive",
        category: "Web & tech",
        short: "Un site qui s'adapte à tous les écrans.",
        def: "Conception qui ajuste automatiquement la mise en page selon l'appareil (mobile, tablette, ordinateur), pour une expérience optimale partout.",
      },
      {
        term: "Core Web Vitals",
        slug: "core-web-vitals",
        category: "Web & tech",
        short: "Les notes de Google sur la qualité technique.",
        def: "Indicateurs de Google mesurant la vitesse de chargement, la réactivité et la stabilité visuelle d'une page. Ils influencent le référencement et l'expérience utilisateur.",
      },
      {
        term: "RGPD",
        slug: "rgpd",
        category: "Web & tech",
        short: "La loi européenne sur les données.",
        def: "Règlement Général sur la Protection des Données : cadre européen qui encadre la collecte et l'usage des données personnelles. Un site luxembourgeois doit s'y conformer (consentement, cookies…).",
      },
      {
        term: "Automatisation",
        slug: "automatisation",
        category: "Web & tech",
        short: "Laisser les tâches répétitives aux machines.",
        def: "Mise en place de workflows qui exécutent automatiquement des tâches (relances, notifications, synchronisation d'outils), pour gagner du temps et réduire les erreurs.",
      },
      {
        term: "Identité de marque",
        slug: "identite-de-marque",
        category: "Design & marque",
        short: "Ce qui rend votre marque reconnaissable.",
        def: "Ensemble cohérent d'éléments visuels et de messages (logo, couleurs, typographie, ton) qui distingue votre entreprise et inspire confiance.",
      },
      {
        term: "Design system",
        slug: "design-system",
        category: "Design & marque",
        short: "La boîte à outils visuelle d'une marque.",
        def: "Bibliothèque de composants, de règles et de styles réutilisables qui garantit la cohérence d'un site ou d'un produit, et accélère sa création.",
      },
      {
        term: "UX / UI",
        slug: "ux-ui",
        category: "Design & marque",
        short: "L'expérience et l'interface.",
        def: "L'UX (User Experience) concerne le ressenti et le parcours de l'utilisateur ; l'UI (User Interface) concerne l'apparence et les éléments avec lesquels il interagit. Les deux servent la conversion.",
      },
    ] as GlossaryTerm[],
  },

  // ---- Service detail (shared labels + per-service content) ----
  servicesDetail: {
    overviewTitle: "En détail",
    includedTitle: "Ce que ça comprend",
    deliverablesTitle: "Livrables",
    faqTitle: "Questions fréquentes",
  },
  serviceContent: {
    "sites-web": {
      intro: [
        "Votre site est souvent le premier — parfois le seul — rendez-vous avec un client. On le conçoit comme un commercial qui travaille 24/7 : rapide, clair, orienté action.",
        "Selon votre besoin, on construit en sur-mesure (Next.js, ultra-rapide et pensé IA-ready) ou sur WordPress quand vous voulez garder la main sur le contenu au quotidien. Et oui : une grande partie de notre production est accélérée par l'IA — plus de qualité, livrée plus vite.",
      ],
      included: [
        { icon: "ai-build", title: "Conçu avec l'IA", desc: "On accélère le design et le développement avec l'IA, sans jamais sacrifier la qualité ni la cohérence." },
        { icon: "wordpress", title: "WordPress quand il le faut", desc: "Besoin d'éditer vos pages vous-même ? On livre un WordPress propre, sécurisé et facile à gérer." },
        { icon: "next-perf", title: "Performance Next.js", desc: "Pour le sur-mesure, un site quasi instantané, sécurisé et taillé pour le SEO et le GEO." },
        { icon: "responsive", title: "100 % responsive", desc: "Une expérience impeccable sur mobile, tablette et ordinateur — le mobile d'abord." },
        { icon: "conversion", title: "Pensé pour convertir", desc: "Chaque page a un objectif : générer un appel, un devis, un lead. On guide le visiteur vers l'action." },
        { icon: "smart-forms", title: "Formulaires intelligents", desc: "Formulaires multi-étapes qui qualifient vos prospects et augmentent le taux de réponse." },
      ],
      deliverables: [
        "Maquettes et design sur mesure validés avec vous",
        "Site sur-mesure (Next.js) ou WordPress, au choix",
        "Optimisation SEO & GEO de base intégrée",
        "Formulaires, tracking et mise en ligne inclus",
      ],
      faq: [
        { q: "Sur-mesure ou WordPress, comment choisir ?", a: "Le sur-mesure (Next.js) offre la meilleure performance et flexibilité ; WordPress est idéal si vous voulez éditer le contenu vous-même. On vous conseille selon votre usage réel, sans dogme." },
        { q: "Que veut dire « fait avec l'IA » ?", a: "On utilise l'IA pour accélérer la conception, le code et le contenu. Résultat : un site de meilleure qualité, livré plus vite et à un meilleur rapport valeur/prix — relu et finalisé par des humains." },
        { q: "Mon site sera-t-il optimisé pour Google et les IA ?", a: "Oui. On intègre dès le départ les bonnes pratiques SEO et GEO : structure, performance, données structurées et contenu citable." },
      ],
    },
    "seo-geo": {
      intro: [
        "Être visible ne suffit plus : il faut être trouvé sur Google et cité par les IA génératives. On travaille les deux fronts en même temps, car 80 % des bonnes pratiques sont communes.",
        "Audit technique, contenu structuré et données lisibles par les machines : on construit une présence qui performe aujourd'hui sur Google et demain dans les réponses de ChatGPT, Perplexity et Google AI.",
      ],
      included: [
        { icon: "seo", title: "SEO technique & éditorial", desc: "Audit complet, optimisation on-page, vitesse et contenu qui répond vraiment à l'intention de recherche." },
        { icon: "geo-citation", title: "GEO / GSO", desc: "On structure votre contenu pour être repris et cité comme source par les moteurs de réponse IA." },
        { icon: "multilingual", title: "Multilingue FR/DE/EN", desc: "Un référencement pensé pour les trois langues du marché luxembourgeois." },
        { icon: "analytics", title: "Suivi & citations", desc: "Suivi des positions Google et des citations dans les réponses IA, avec un reporting clair." },
      ],
      deliverables: [
        "Audit technique & sémantique complet",
        "Plan de contenu et optimisations on-page",
        "Données structurées (Schema.org) & llms.txt",
        "Reporting mensuel positions + citations IA",
      ],
      faq: [
        { q: "Quelle différence entre SEO et GEO ?", a: "Le SEO vous place dans la liste des résultats de Google ; le GEO vous place dans la réponse générée par une IA. On optimise pour les deux." },
        { q: "En combien de temps voit-on des résultats ?", a: "Le SEO/GEO est un travail de fond : les premiers signaux apparaissent souvent en quelques semaines, les gains solides en quelques mois. On vous montre la progression à chaque étape." },
      ],
    },
    "lead-generation": {
      intro: [
        "Un beau site qui ne génère pas de contacts, c'est une dépense. On le transforme en système d'acquisition : un flux régulier et prévisible de demandes qualifiées.",
        "Site optimisé, landing pages par campagne, qualification et automatisation : chaque maillon est pensé pour remplir votre agenda de prospects, sans que vous ayez à prospecter vous-même.",
      ],
      included: [
        { icon: "leads", title: "Captation de leads", desc: "Tunnels et formulaires conçus pour capturer un maximum de contacts qualifiés." },
        { icon: "conversion", title: "Tunnels optimisés", desc: "Un parcours clair visiteur → lead → client, optimisé en continu pour réduire les abandons." },
        { icon: "smart-forms", title: "Qualification & scoring", desc: "On qualifie automatiquement les leads pour que vos commerciaux se concentrent sur les meilleurs." },
        { icon: "analytics", title: "Reporting coût par lead", desc: "Un suivi transparent du coût par lead et du retour sur investissement." },
      ],
      deliverables: [
        "Tunnels de conversion sur mesure",
        "Landing pages par campagne",
        "Système de qualification & scoring",
        "Tableau de bord coût par lead & ROI",
      ],
      faq: [
        { q: "Garantissez-vous un nombre de leads ?", a: "On ne vend pas de promesse magique : on construit un système mesurable et on l'optimise jusqu'à ce qu'il performe. Les objectifs sont fixés ensemble, en fonction de votre marché." },
        { q: "Faut-il un budget publicitaire ?", a: "Pas toujours. Une partie des leads peut venir du SEO/GEO et du contenu. La publicité accélère, mais on commence par maximiser ce que votre site peut déjà capter." },
      ],
    },
    publicite: {
      intro: [
        "La publicité payante, c'est de la visibilité immédiate — à condition de dépenser votre budget là où il rapporte. On pilote vos campagnes par la donnée, pas à l'instinct.",
        "Google Ads, Meta, LinkedIn : on cible les bonnes personnes, on teste, et on optimise en continu pour faire baisser le coût par acquisition et monter le ROAS.",
      ],
      included: [
        { icon: "ads-targeting", title: "Ciblage précis", desc: "Les bonnes audiences, sur les bons canaux, avec le bon message au bon moment." },
        { icon: "next-perf", title: "Google Ads & Performance Max", desc: "Campagnes search et Performance Max structurées pour la rentabilité." },
        { icon: "conversion", title: "Landing pages dédiées", desc: "Des pages d'atterrissage conçues pour transformer le clic payant en lead." },
        { icon: "analytics", title: "Optimisation du ROAS", desc: "Suivi des conversions et ajustements continus pour maximiser le retour." },
      ],
      deliverables: [
        "Stratégie et structure de campagnes",
        "Création des annonces (Google, Meta, LinkedIn)",
        "Landing pages optimisées pour la conversion",
        "Reporting ROAS et optimisation continue",
      ],
      faq: [
        { q: "Quel budget minimum prévoir ?", a: "Cela dépend de votre secteur et de votre objectif. On définit ensemble un budget test, on mesure, puis on augmente uniquement ce qui est rentable." },
        { q: "Gérez-vous aussi le suivi des conversions ?", a: "Oui. Sans tracking fiable, impossible d'optimiser. On configure le suivi des conversions et on relie chaque euro dépensé à un résultat." },
      ],
    },
    "branding-design": {
      intro: [
        "Avant le premier mot, votre image parle déjà. Une identité cohérente inspire confiance et fait la différence sur un marché où tout le monde se ressemble.",
        "Logo, direction artistique, design system : on construit une marque mémorable et un univers visuel qui se décline partout, du site au print.",
      ],
      included: [
        { icon: "branding", title: "Identité de marque", desc: "Logo, palette, typographie et règles d'usage qui rendent votre marque reconnaissable." },
        { icon: "responsive", title: "Direction artistique", desc: "Un univers visuel cohérent, décliné sur tous vos supports digitaux et imprimés." },
        { icon: "ai-build", title: "Design system", desc: "Une bibliothèque de composants réutilisables pour une cohérence parfaite et durable." },
        { icon: "conversion", title: "Design orienté conversion", desc: "Du beau qui sert un objectif : guider l'œil et l'action, pas seulement décorer." },
      ],
      deliverables: [
        "Logo et identité visuelle complète",
        "Charte graphique & règles d'usage",
        "Design system & maquettes UI/UX",
        "Déclinaisons print et digital",
      ],
      faq: [
        { q: "Vous refaites une marque de zéro ou vous faites évoluer l'existant ?", a: "Les deux. On peut créer une identité complète ou rafraîchir la vôtre en gardant ce qui fonctionne déjà et qui vous est reconnu." },
        { q: "Le design tient-il compte de la conversion ?", a: "Toujours. On ne fait pas du beau pour du beau : chaque choix visuel sert la clarté, la confiance et l'action." },
      ],
    },
    "automatisation-ia": {
      intro: [
        "Vos équipes passent trop de temps sur des tâches répétitives ? On les automatise. Plus de résultats, moins de friction — et des réponses plus rapides à vos clients.",
        "Workflows automatisés, intégrations entre vos outils et agents IA sur mesure : on connecte votre stack et on met l'IA au travail là où elle vous fait vraiment gagner du temps.",
      ],
      included: [
        { icon: "automation", title: "Automatisation des workflows", desc: "On supprime les tâches manuelles répétitives : relances, synchronisation, notifications." },
        { icon: "ai-build", title: "Agents & assistants IA", desc: "Des assistants IA sur mesure entraînés sur votre contexte et vos process." },
        { icon: "smart-forms", title: "Intégrations CRM & outils", desc: "On relie votre site, votre CRM et vos outils pour un flux de données fluide." },
        { icon: "analytics", title: "Chatbots intelligents", desc: "Des widgets et chatbots qui répondent, qualifient et orientent vos visiteurs 24/7." },
      ],
      deliverables: [
        "Cartographie des process à automatiser",
        "Workflows et intégrations configurés",
        "Agent/assistant IA sur mesure",
        "Documentation et accompagnement",
      ],
      faq: [
        { q: "L'IA va-t-elle remplacer mes équipes ?", a: "Non — elle les soulage. On automatise les tâches sans valeur ajoutée pour que vos équipes se concentrent sur ce qui compte : vos clients." },
        { q: "Mes données sont-elles en sécurité ?", a: "Oui. On conçoit les automatisations dans le respect du RGPD et avec une attention forte à la confidentialité de vos données." },
      ],
    },
  },

  // ---- FAQ page (comprehensive, grouped) ----
  faqPage: {
    eyebrow: "FAQ",
    title: "Toutes vos questions, nos réponses claires.",
    lead: "Site web, SEO, leads, publicité, IA, tarifs, délais, RGPD… Tout ce qu'on nous demande avant de démarrer. Une question reste sans réponse ? Écrivez-nous.",
    searchPlaceholder: "Rechercher une question…",
    countSuffix: "questions",
    emptyLabel: "Aucune question ne correspond à votre recherche.",
    ctaTitle: "Une question sans réponse ?",
    groups: [
      {
        title: "L'agence & démarrer",
        items: [
          { q: "Qui est VorTX et que faites-vous exactement ?", a: "VorTX est une agence marketing et web basée au Luxembourg. On conçoit des sites qui convertissent et des stratégies d'acquisition mesurables : SEO & GEO, génération de leads, publicité en ligne, branding et automatisation IA. Notre obsession : transformer l'attention en clients." },
          { q: "Travaillez-vous avec des entreprises de ma taille ?", a: "Oui. On accompagne aussi bien les indépendants et artisans que les PME et startups. L'approche s'adapte à votre maturité digitale et à votre budget." },
          { q: "Comment se passe un premier contact ?", a: "Vous réservez un appel découverte gratuit. On analyse votre situation, vos objectifs et votre marché, puis on vous dit, sans détour, ce qui peut être amélioré — avant même de parler de devis." },
          { q: "Êtes-vous une agence luxembourgeoise ?", a: "Oui, on connaît le marché local, son multilinguisme (FR/DE/EN) et ses exigences RGPD. On pense vos campagnes pour le terrain luxembourgeois." },
        ],
      },
      {
        title: "Sites web",
        items: [
          { q: "Sur-mesure ou WordPress, comment choisir ?", a: "Le sur-mesure (Next.js) offre la meilleure performance, sécurité et flexibilité ; WordPress est idéal si vous voulez éditer le contenu vous-même au quotidien. On vous conseille selon votre usage réel, sans dogme." },
          { q: "C'est vrai que vos sites sont « faits avec l'IA » ?", a: "Oui. On utilise l'IA pour accélérer le design, le code et le contenu. Résultat : un site de meilleure qualité, livré plus vite et à un meilleur rapport valeur/prix — toujours relu et finalisé par des humains." },
          { q: "Mon site sera-t-il rapide et adapté au mobile ?", a: "Absolument. Performance et mobile-first sont la base : un site quasi instantané, 100 % responsive et accessible sur tous les écrans." },
          { q: "Pourrai-je modifier mon site moi-même ?", a: "Sur WordPress, oui, facilement. Sur du sur-mesure, on met en place ce qu'il faut pour que vous puissiez gérer vos contenus clés — ou on s'en occupe pour vous." },
          { q: "Mon site sera-t-il optimisé pour Google et les IA ?", a: "Oui. On intègre dès le départ les bonnes pratiques SEO et GEO : structure, performance, données structurées et contenu citable par les moteurs de réponse IA." },
          { q: "Gérez-vous l'hébergement et la maintenance ?", a: "Oui. On peut prendre en charge l'hébergement, les mises à jour, la sécurité et les évolutions, pour que vous n'ayez pas à vous en soucier." },
        ],
      },
      {
        title: "SEO & GEO",
        items: [
          { q: "Quelle différence entre SEO et GEO ?", a: "Le SEO vous place dans la liste des résultats de Google ; le GEO (Generative Engine Optimization) vous place dans la réponse générée par une IA comme ChatGPT ou Perplexity. On optimise pour les deux, car 80 % des bonnes pratiques sont communes." },
          { q: "Le GEO, c'est du concret ou un effet de mode ?", a: "C'est très concret : de plus en plus de décideurs posent leurs questions à une IA plutôt qu'à Google. Si vous n'apparaissez pas dans la réponse, vous n'existez pas dans la décision. On structure votre contenu pour être cité comme source." },
          { q: "En combien de temps voit-on des résultats en SEO ?", a: "Le SEO/GEO est un travail de fond : les premiers signaux apparaissent souvent en quelques semaines, les gains solides en quelques mois. On vous montre la progression à chaque étape, sans promesse magique." },
          { q: "Travaillez-vous le référencement en plusieurs langues ?", a: "Oui, FR/DE/EN nativement. C'est essentiel au Luxembourg où vos clients comparent dans les trois langues." },
        ],
      },
      {
        title: "Leads & publicité",
        items: [
          { q: "Garantissez-vous un nombre de leads ?", a: "On ne vend pas de promesse magique : on construit un système d'acquisition mesurable et on l'optimise jusqu'à ce qu'il performe. Les objectifs sont fixés ensemble, selon votre marché." },
          { q: "Faut-il forcément un budget publicitaire ?", a: "Pas toujours. Une partie des leads peut venir du SEO/GEO et du contenu. La publicité accélère, mais on commence par maximiser ce que votre site peut déjà capter." },
          { q: "Quel budget publicitaire minimum prévoir ?", a: "Cela dépend de votre secteur et de votre objectif. On définit ensemble un budget test, on mesure, puis on augmente uniquement ce qui est rentable." },
          { q: "Sur quels canaux faites-vous de la publicité ?", a: "Google Ads et Performance Max, Meta (Facebook & Instagram) et LinkedIn Ads pour le B2B. On choisit les canaux selon votre cible." },
          { q: "Comment mesurez-vous le retour sur investissement ?", a: "On configure un suivi des conversions fiable et un reporting clair : coût par lead, ROAS, ROI. Chaque euro dépensé est relié à un résultat." },
        ],
      },
      {
        title: "Branding, design & IA",
        items: [
          { q: "Vous créez une marque de zéro ou faites évoluer l'existant ?", a: "Les deux. On peut créer une identité visuelle complète (logo, charte, design system) ou rafraîchir la vôtre en gardant ce qui fonctionne et qui vous est déjà reconnu." },
          { q: "Le design tient-il compte de la conversion ?", a: "Toujours. On ne fait pas du beau pour du beau : chaque choix visuel sert la clarté, la confiance et l'action." },
          { q: "L'automatisation et l'IA, ça sert à quoi concrètement ?", a: "À supprimer les tâches répétitives (relances, synchronisation d'outils, notifications), à connecter votre site et votre CRM, et à déployer des assistants ou chatbots IA qui répondent et qualifient vos visiteurs 24/7." },
          { q: "L'IA va-t-elle remplacer mes équipes ?", a: "Non — elle les soulage. On automatise les tâches sans valeur ajoutée pour que vos équipes se concentrent sur l'essentiel : vos clients." },
        ],
      },
      {
        title: "Tarifs, délais & process",
        items: [
          { q: "Combien coûte un site ou une campagne ?", a: "Chaque projet est sur mesure. Plutôt qu'un tarif générique, on vous propose un devis précis après un appel découverte gratuit et un audit de votre situation." },
          { q: "Pourquoi n'affichez-vous pas vos prix ?", a: "Parce qu'un bon devis dépend de vos objectifs réels. Un prix générique serait soit trop élevé, soit décevant. On préfère vous proposer le juste périmètre, sans surfacturer." },
          { q: "Quels sont les délais de réalisation ?", a: "Cela dépend de l'ampleur du projet, mais notre production accélérée par l'IA nous permet de livrer vite. On vous donne un calendrier clair dès le devis." },
          { q: "Comment se déroule un projet, étape par étape ?", a: "Quatre temps : diagnostic, conception & développement, revue & ajustements, puis lancement & suivi. Vous validez à chaque étape, sans mauvaise surprise." },
          { q: "Proposez-vous un suivi après la mise en ligne ?", a: "Oui. Maintenance, évolutions, optimisation de la conversion et accompagnement marketing continu font partie de notre offre." },
          { q: "Le devis est-il vraiment sans engagement ?", a: "Oui. L'appel découverte, l'audit et le devis sont gratuits et sans engagement. Vous décidez ensuite, en toute liberté." },
        ],
      },
      {
        title: "Technique, langues & RGPD",
        items: [
          { q: "Mes données et celles de mes clients sont-elles protégées ?", a: "Oui. On conçoit chaque site et chaque automatisation dans le respect du RGPD : consentement, gestion des cookies et attention forte à la confidentialité." },
          { q: "Mon site sera-t-il multilingue ?", a: "Oui, nativement si besoin (FR, DE, EN, et Lëtzebuergesch sur demande), avec une structure pensée pour le référencement de chaque langue." },
          { q: "Que se passe-t-il si je veux changer d'agence plus tard ?", a: "Vous restez propriétaire de votre site, de vos contenus et de vos accès. Pas d'enfermement : tout vous appartient." },
          { q: "Mon site sera-t-il accessible aux personnes en situation de handicap ?", a: "On suit les bonnes pratiques d'accessibilité (contrastes, navigation clavier, sémantique) pour un site utilisable par le plus grand nombre." },
        ],
      },
    ],
  },

  // ---- Per-route metadata ----
  meta: {
    home: {
      title: "VorTX | Agence marketing & web à Luxembourg",
      description:
        "VorTX, agence marketing à Luxembourg : sites web qui convertissent, SEO & GEO, génération de leads et publicité en ligne. Audit gratuit, réponse rapide.",
    },
    services: {
      title: "Services marketing & web | VorTX Luxembourg",
      description:
        "Sites web, SEO & GEO, génération de leads, publicité, branding et automatisation IA. Une chaîne complète d'acquisition pour les entreprises luxembourgeoises.",
    },
    about: {
      title: "L'agence VorTX | Marketing & web à Luxembourg",
      description:
        "Qui est VorTX : une agence marketing et web luxembourgeoise obsédée par la conversion et la performance mesurable. Découvrez notre approche.",
    },
    approach: {
      title: "Notre méthode | VorTX Luxembourg",
      description:
        "Diagnostic, conception, revue, lancement : la méthode VorTX pour livrer des sites et des campagnes qui rapportent.",
    },
    work: {
      title: "Réalisations | VorTX Luxembourg",
      description:
        "Découvrez les projets et résultats de VorTX, agence marketing et web au Luxembourg.",
    },
    contact: {
      title: "Contact & audit gratuit | VorTX Luxembourg",
      description:
        "Réservez un appel découverte gratuit avec VorTX. Audit personnalisé sans délai, devis sans engagement. Agence marketing & web à Luxembourg.",
    },
    legalMentions: {
      title: "Mentions légales | VorTX Luxembourg",
      description: "Mentions légales du site VorTX, agence marketing & web à Luxembourg.",
    },
    legalPrivacy: {
      title: "Politique de confidentialité | VorTX Luxembourg",
      description:
        "Comment VorTX collecte, utilise et protège vos données personnelles (RGPD).",
    },
    legalCookies: {
      title: "Politique cookies | VorTX Luxembourg",
      description: "Utilisation des cookies et traceurs sur le site VorTX.",
    },
    news: {
      title: "Les news | Marketing, SEO & GEO — VorTX Luxembourg",
      description:
        "Analyses et conseils de VorTX sur le SEO, le GEO, la conversion et le web au Luxembourg. Du concret pour faire croître votre entreprise.",
    },
    glossary: {
      title: "Glossaire marketing & web | VorTX Luxembourg",
      description:
        "Tous les termes du marketing digital et du web expliqués simplement : SEO, GEO, ROAS, tunnel de conversion, CMS… avec le contexte luxembourgeois.",
    },
    faq: {
      title: "FAQ — Sites web, SEO, leads & tarifs | VorTX Luxembourg",
      description:
        "Toutes les réponses sur nos sites web, le SEO & GEO, la génération de leads, la publicité, l'IA, les tarifs, les délais et le RGPD. Agence marketing & web à Luxembourg.",
    },
  },

  // ---- Standalone pages ----
  pages: {
    thanks: {
      title: "Merci, votre demande est bien partie.",
      lead: "Nous l'étudions et revenons vers vous rapidement avec une première analyse — sans engagement.",
      cta: "Retour à l'accueil",
      metaTitle: "Merci | VorTX Luxembourg",
    },
    notFound: {
      title: "Page introuvable",
      lead: "La page que vous cherchez n'existe pas ou a été déplacée.",
      cta: "Retour à l'accueil",
    },
    legalUpdated: "Dernière mise à jour : à compléter",
    legalTodo:
      "⚠️ Contenu à faire valider juridiquement et à compléter avec les informations légales réelles de la société.",
  },

  // ---- Cookie consent (RGPD / ePrivacy) ----
  consent: {
    title: "Cookies & confidentialité",
    message:
      "Nous utilisons des cookies nécessaires au fonctionnement du site et, avec votre accord, des cookies de mesure d'audience et de publicité.",
    acceptAll: "Tout accepter",
    rejectAll: "Tout refuser",
    customize: "Personnaliser",
    save: "Enregistrer mes choix",
    learnMore: "En savoir plus",
    manage: "Gérer mes cookies",
    categories: {
      necessary: {
        title: "Nécessaires",
        desc: "Indispensables au fonctionnement du site (sécurité, préférences, mémorisation de votre consentement). Toujours actifs.",
        always: "Toujours actifs",
      },
      analytics: {
        title: "Mesure d'audience",
        desc: "Nous aident à comprendre l'utilisation du site afin de l'améliorer (statistiques anonymisées).",
      },
      marketing: {
        title: "Marketing",
        desc: "Permettent de mesurer et de personnaliser nos campagnes publicitaires.",
      },
    },
  },
} as const;
