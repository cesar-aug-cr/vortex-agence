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
  | { type: "callout"; title: string; text: string }
  | { type: "logo" };

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
    name: "vortx",
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
    resources: "Ressources",
    news: "News",
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
      "vortx conçoit des sites et des stratégies d'acquisition qui transforment l'attention en clients. Design premium, SEO de nouvelle génération, génération de leads mesurable.",
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
    eyebrow: "Pourquoi vortx",
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
      metaTitle: "Création de sites web à Luxembourg | vortx",
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
      metaTitle: "Agence SEO & GEO à Luxembourg | vortx",
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
      metaTitle: "Génération de leads B2B à Luxembourg | vortx",
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
      metaTitle: "Publicité en ligne (Google & Meta Ads) Luxembourg | vortx",
      metaDescription:
        "Campagnes Google Ads, Meta et LinkedIn rentables pour le marché luxembourgeois. Acquisition payante pilotée par la donnée et orientée ROI.",
    },
    {
      slug: "branding-design",
      group: "convert",
      title: "Création de logos & branding",
      tagline: "Un logo et une marque dont on se souvient.",
      short:
        "Logo sur mesure, identité visuelle complète et charte de marque. La cohérence qui inspire confiance avant même le premier mot.",
      bullets: [
        "Création de logo sur mesure",
        "Identité visuelle complète",
        "Charte graphique & règles d'usage",
        "Déclinaisons print & digital",
      ],
      metaTitle: "Création de logo & branding à Luxembourg | vortx",
      metaDescription:
        "Création de logo sur mesure, identité de marque et charte graphique pour les entreprises luxembourgeoises. Une image cohérente qui inspire confiance.",
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
      metaTitle: "Automatisation & IA pour entreprises Luxembourg | vortx",
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
    solutionTitle: "Avec vortx :",
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
    lead: "La recherche évolue. Vos clients posent leurs questions à des assistants IA. Nous optimisons pour que vortx — et vous — soyez la source citée.",
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
      step: "Étape",
      next: "Suivant",
      back: "Retour",
      stepServices: "Vos besoins",
      stepDetails: "Vos coordonnées",
      stepMessage: "Votre message",
      servicesLabel: "Quels services vous intéressent ?",
      servicesHint: "Sélectionnez un ou plusieurs services.",
      servicesRequired: "Sélectionnez au moins un service pour continuer.",
      consentBefore:
        "En cochant cette case, je reconnais avoir pris connaissance de la façon dont mes données personnelles sont traitées et conservées, décrite dans la ",
      consentLink: "politique de confidentialité",
      consentAfter: ".",
      consentRequired: "Merci de confirmer ce point pour continuer.",
      error:
        "Une erreur est survenue. Réessayez ou écrivez-nous directement par e-mail.",
    },
  },

  // ---- Footer (cd-lac style) ----
  footer: {
    blurb:
      "vortx — agence marketing et web au Luxembourg. On attire l'attention, on la convertit en clients.",
    columns: {
      services: {
        title: "Services",
        links: [
          { label: "Sites web", href: "/services/sites-web" },
          { label: "SEO & GEO", href: "/services/seo-geo" },
          { label: "Génération de leads", href: "/services/lead-generation" },
          { label: "Publicité en ligne", href: "/services/publicite" },
          { label: "Création de logos & branding", href: "/services/branding-design" },
          { label: "Automatisation & IA", href: "/services/automatisation-ia" },
        ],
      },
      company: {
        title: "Agence",
        links: [
          { label: "À propos", href: "/agence" },
          { label: "Notre méthode", href: "/approche" },
          { label: "Réalisations", href: "/realisations" },
          { label: "News", href: "/news" },
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
    madeWith: "Conçu avec amour et beaucoup d'AI.",
    backToTop: "Retour en haut",
  },

  // ---- Agence (about) page ----
  agence: {
    eyebrow: "L'agence",
    title: "Une équipe d'attraction, au service de votre croissance.",
    lead: "vortx réunit le marketing, le design et la technologie sous un même toit, à Luxembourg. Une obsession : transformer l'attention en clients, et le prouver en chiffres.",
    story: [
      "vortx est né d'un constat simple : trop d'entreprises luxembourgeoises ont un site qui ressemble à une brochure — joli, mais qui ne rapporte rien. On construit l'inverse : des présences digitales pensées comme des machines d'acquisition.",
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
    eyebrow: "News",
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
    summaryLabel: "Résumé généré par IA",
    summaryDisclaimer: "Synthèse automatique des points clés, relue par notre équipe.",
    summaryPointsLabel: "À retenir",
    linksTitle: "Pour aller plus loin",
    allCategories: "Tous les sujets",
    filterLabel: "Filtrer par sujet",
    emptyLabel: "Aucun article pour ce sujet pour le moment.",
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
        author: "L'équipe vortx",
        cover: "geo-citation",
        summary: {
          text: "Le référencement ne se limite plus à Google : ChatGPT, Perplexity et Google AI deviennent une nouvelle porte d'entrée. L'article explique la différence entre SEO et GEO et comment travailler les deux ensemble, avec des actions concrètes pour être cité par les IA.",
          points: [
            "Le SEO vous classe dans les résultats ; le GEO vous place dans la réponse de l'IA.",
            "Structurez vos pages en question/réponse et ancrez-les dans des faits locaux pour être cités.",
            "80 % du travail est commun : un bon contenu performe sur Google ET auprès des modèles.",
          ],
        },
        links: [
          { label: "Google Ads ou SEO : où investir votre budget", href: "/news/google-ads-ou-seo-ou-investir-budget-marketing", desc: "Comparer les leviers d'acquisition payants et naturels." },
          { label: "Notre service SEO & GEO / GSO", href: "/services/seo-geo", desc: "Comment on vous rend visible sur Google et cité par les IA." },
          { label: "Glossaire du marketing & du web", href: "/glossaire", desc: "SEO, GEO, GSO… le vocabulaire expliqué simplement." },
        ],
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
            text: "Chez vortx, on construit chaque site et chaque stratégie de contenu avec cette double exigence dès la première ligne. Si vous voulez savoir où vous en êtes aujourd'hui, on vous offre un audit SEO/GEO sans engagement.",
          },
        ],
      },
      {
        slug: "google-ads-ou-seo-ou-investir-budget-marketing",
        category: "Acquisition",
        title:
          "Google Ads ou SEO : où investir votre budget marketing en 2026 ?",
        excerpt:
          "Faut-il payer pour apparaître en haut de Google, ou travailler son référencement naturel ? La vraie question n'est pas « l'un ou l'autre », mais « lequel, quand, et pour quel objectif ». On démêle tout, chiffres et bon sens à l'appui.",
        date: "2026-06-04",
        updated: "2026-06-04",
        readingMinutes: 8,
        author: "L'équipe vortx",
        cover: "ads-targeting",
        summary: {
          text: "Faut-il investir dans Google Ads ou dans le SEO ? La réponse dépend de votre objectif et de votre échéance. L'article oppose la « location » (Ads, immédiat) à la « propriété » (SEO, durable) et montre comment les combiner selon votre situation.",
          points: [
            "Google Ads = résultats immédiats tant que vous payez ; SEO = actif durable qui met du temps.",
            "Le bon dosage dépend de votre échéance, de votre marché et de votre budget.",
            "Les deux se complètent : la pub amorce, le SEO vous rend indépendant du budget.",
          ],
        },
        links: [
          { label: "SEO vs GEO : être trouvé ET cité en 2026", href: "/news/geo-seo-luxembourg-etre-cite-par-les-ia", desc: "La visibilité naturelle à l'ère des IA." },
          { label: "Notre service Publicité en ligne", href: "/services/publicite", desc: "Google Ads, Meta et LinkedIn pilotés par la donnée." },
          { label: "Notre service SEO & GEO", href: "/services/seo-geo", desc: "Construire un actif de visibilité durable." },
        ],
        body: [
          {
            type: "p",
            text: "C'est l'une des questions qu'on nous pose le plus souvent : « Je mets mon budget dans la publicité ou dans le SEO ? ». Réponse honnête : ça dépend de votre objectif, de votre échéance et de votre marché. Les deux amènent des clients depuis Google, mais ils ne fonctionnent pas de la même façon — et surtout, ils ne se remplacent pas, ils se complètent.",
          },
          {
            type: "h2",
            id: "deux-leviers",
            text: "Deux leviers, deux logiques",
          },
          {
            type: "p",
            text: "Google Ads (le SEA, ou référencement payant), c'est de la location : vous payez pour apparaître tout en haut, immédiatement, le temps que votre budget tourne. Le SEO (référencement naturel), c'est de la propriété : vous construisez un actif qui met du temps à se mettre en place, mais qui continue de générer du trafic même quand vous ne payez plus.",
          },
          {
            type: "h2",
            id: "google-ads",
            text: "Google Ads : la visibilité immédiate",
          },
          {
            type: "p",
            text: "Vous lancez une campagne aujourd'hui, vous pouvez être premier sur vos mots-clés dès cet après-midi. C'est l'outil idéal quand vous avez besoin de résultats vite, quand vous testez une offre, ou pour les requêtes très concurrentielles.",
          },
          {
            type: "ul",
            items: [
              "Résultats immédiats : du trafic et des leads dès le premier jour.",
              "Ciblage précis : mots-clés, zone géographique, horaires, audience.",
              "Mesurable au centime : vous savez exactement ce que coûte chaque lead.",
              "Idéal pour les promotions, les lancements et les campagnes saisonnières.",
            ],
          },
          {
            type: "p",
            text: "Le revers : dès que vous arrêtez de payer, la visibilité s'éteint. Et sur certains secteurs, le coût par clic peut grimper vite. La publicité, c'est un robinet : puissant, mais qui s'arrête quand on coupe l'eau.",
          },
          {
            type: "h2",
            id: "seo",
            text: "SEO : l'actif qui travaille dans la durée",
          },
          {
            type: "p",
            text: "Le SEO demande de la patience — quelques semaines à quelques mois — mais il construit quelque chose qui vous appartient. Une fois bien positionné, votre site attire un trafic régulier sans coût par clic, et la confiance d'un résultat naturel est souvent supérieure à celle d'une annonce.",
          },
          {
            type: "ul",
            items: [
              "Trafic durable : votre positionnement continue de travailler dans le temps.",
              "Meilleure crédibilité : on fait davantage confiance aux résultats naturels.",
              "Coût décroissant : l'investissement initial s'amortit, le clic est « gratuit ».",
              "Compatible GEO : un bon SEO vous rend aussi citable par les IA génératives.",
            ],
          },
          {
            type: "callout",
            title: "En une phrase",
            text: "Google Ads achète de la visibilité maintenant ; le SEO la construit pour demain. L'un est une dépense, l'autre un investissement.",
          },
          {
            type: "h2",
            id: "lequel-choisir",
            text: "Lequel choisir selon votre situation",
          },
          {
            type: "p",
            text: "Plutôt que de trancher dans l'absolu, regardez où vous en êtes :",
          },
          {
            type: "ul",
            items: [
              "Vous lancez votre activité et voulez des leads vite : commencez par Google Ads.",
              "Vous visez la rentabilité sur le long terme : investissez dans le SEO en parallèle.",
              "Votre secteur est très concurrentiel sur Google : combinez les deux pour occuper le terrain.",
              "Votre budget est serré : priorisez le SEO sur vos pages clés, et la pub sur une seule offre phare.",
            ],
          },
          {
            type: "h2",
            id: "ensemble",
            text: "La vraie réponse : les deux ensemble",
          },
          {
            type: "p",
            text: "Les entreprises qui performent ne choisissent pas — elles orchestrent. La publicité apporte des résultats immédiats et des données précieuses (quels mots-clés convertissent vraiment), qui nourrissent ensuite la stratégie SEO. Pendant que le SEO monte en puissance, la pub maintient le flux de leads. Puis, à mesure que le naturel prend le relais, on peut réduire la dépendance au payant.",
          },
          {
            type: "quote",
            text: "La pub allume le feu tout de suite. Le SEO l'entretient pour qu'il ne s'éteigne plus.",
          },
          {
            type: "callout",
            title: "À retenir",
            text: "Ne raisonnez pas « Ads OU SEO », mais « Ads ET SEO », dosés selon votre échéance et votre budget. La pub pour la vitesse, le SEO pour la durée — et les deux qui se renforcent.",
          },
          {
            type: "p",
            text: "Chez vortx, on construit cette combinaison selon votre situation réelle, sans vous vendre l'un au détriment de l'autre. On vous offre un audit gratuit pour vous dire où votre budget rapportera le plus.",
          },
        ],
      },
      {
        slug: "tunnel-de-conversion-transformer-visiteurs-en-clients",
        category: "Conversion",
        title:
          "Tunnel de conversion : transformer vos visiteurs en clients, étape par étape",
        excerpt:
          "Attirer du trafic, c'est bien. Le convertir en clients, c'est tout l'enjeu. Le tunnel de conversion est la carte qui relie le premier clic au contrat signé — et chaque étape mal pensée vous coûte des ventes. Voici comment le construire.",
        date: "2026-06-07",
        updated: "2026-06-07",
        readingMinutes: 7,
        author: "L'équipe vortx",
        cover: "conversion",
        summary: {
          text: "Attirer du trafic ne sert à rien s'il ne se transforme pas. L'article décortique le tunnel de conversion étape par étape — du premier clic au contrat — et montre où l'on perd des visiteurs et comment colmater chaque fuite.",
          points: [
            "Chaque étape mal pensée du tunnel vous coûte des ventes.",
            "On guide le visiteur vers une action claire sur chaque page.",
            "Mesurer les abandons permet d'optimiser là où ça compte.",
          ],
        },
        links: [
          { label: "Notre service Génération de leads", href: "/services/lead-generation", desc: "Transformer le trafic en demandes de devis qualifiées." },
          { label: "Combien coûte un site web au Luxembourg ?", href: "/news/combien-coute-un-site-web-luxembourg-2026", desc: "Investir là où la conversion se joue vraiment." },
          { label: "Glossaire : tunnel, CRO, landing page…", href: "/glossaire", desc: "Les termes de la conversion expliqués simplement." },
        ],
        body: [
          {
            type: "p",
            text: "Vous avez du trafic, mais peu de demandes ? Le problème n'est presque jamais le nombre de visiteurs — c'est ce qui se passe entre leur arrivée et leur décision. Ce chemin a un nom : le tunnel de conversion. Le comprendre, c'est arrêter de « faire venir du monde » pour commencer à transformer ce monde en clients.",
          },
          {
            type: "h2",
            id: "c-est-quoi",
            text: "Qu'est-ce qu'un tunnel de conversion ?",
          },
          {
            type: "p",
            text: "C'est la suite d'étapes que franchit un visiteur avant de devenir client : il vous découvre, s'intéresse, vous contacte, puis achète. À chaque étape, une partie des gens abandonne — comme un entonnoir qui se resserre. L'objectif n'est pas d'éliminer ces pertes (impossible), mais de les réduire là où elles coûtent le plus cher.",
          },
          {
            type: "h2",
            id: "etapes",
            text: "Les 4 étapes d'un tunnel qui convertit",
          },
          {
            type: "h3",
            text: "1. Attirer — la bonne audience, pas juste du trafic",
          },
          {
            type: "p",
            text: "Tout commence par attirer les bonnes personnes (SEO, publicité, réseaux, bouche-à-oreille). Mille visiteurs non qualifiés valent moins que cent visiteurs qui ont un vrai besoin. La qualité du trafic conditionne tout le reste du tunnel.",
          },
          {
            type: "h3",
            text: "2. Intéresser — donner envie de rester",
          },
          {
            type: "p",
            text: "En quelques secondes, le visiteur décide s'il reste ou part. Un message clair, une promesse compréhensible, une page rapide et rassurante : c'est ici qu'on transforme un curieux en prospect intéressé. Si votre page met trop de temps à dire ce que vous faites, c'est perdu.",
          },
          {
            type: "h3",
            text: "3. Convertir — faciliter le passage à l'action",
          },
          {
            type: "p",
            text: "C'est l'étape décisive : demande de devis, prise de rendez-vous, achat. Un appel à l'action visible, un formulaire court et intelligent, zéro friction inutile. Chaque champ en trop, chaque doute non levé fait chuter le taux de conversion.",
          },
          {
            type: "h3",
            text: "4. Fidéliser — un client qui revient et recommande",
          },
          {
            type: "p",
            text: "Le tunnel ne s'arrête pas à la vente. Un client satisfait revient, achète plus, et surtout vous recommande. Suivi, qualité de service, relances pertinentes : la fidélisation est le levier le plus rentable, et le plus négligé.",
          },
          {
            type: "callout",
            title: "Le principe clé",
            text: "Une seule étape qui fuit plombe tout le tunnel. Inutile d'attirer plus de monde si vos visiteurs se perdent au moment de passer à l'action.",
          },
          {
            type: "h2",
            id: "fuites",
            text: "Où ça fuit (et comment colmater)",
          },
          {
            type: "ul",
            items: [
              "Page lente ou confuse : le visiteur part avant de comprendre votre offre.",
              "Pas d'appel à l'action clair : il ne sait pas quoi faire ensuite.",
              "Formulaire trop long : il abandonne en cours de route.",
              "Manque de preuves (avis, réalisations, garanties) : il doute et reporte.",
              "Aucune relance : un prospect tiède qu'on ne recontacte jamais est un client perdu.",
            ],
          },
          {
            type: "h2",
            id: "mesurer",
            text: "Mesurer pour optimiser",
          },
          {
            type: "p",
            text: "On n'améliore que ce qu'on mesure. En suivant le taux de conversion de chaque étape, on repère précisément où ça coince — et on agit là, plutôt que de tout refaire au hasard.",
          },
          {
            type: "ul",
            items: [
              "Taux de conversion global et par étape.",
              "Pages où les visiteurs quittent le tunnel.",
              "Coût par lead et coût par client.",
              "Tests A/B pour valider chaque amélioration.",
            ],
          },
          {
            type: "quote",
            text: "Un bon tunnel ne se devine pas : il se mesure, s'ajuste, et se mesure encore.",
          },
          {
            type: "callout",
            title: "À retenir",
            text: "Un tunnel de conversion, c'est un parcours : attirer, intéresser, convertir, fidéliser. Travaillez le maillon le plus faible en premier — c'est là que se cachent vos ventes perdues.",
          },
          {
            type: "p",
            text: "Chez vortx, on conçoit chaque site comme un tunnel pensé pour convertir, et on l'optimise en continu. Envie de savoir où le vôtre perd des clients ? On vous offre un audit gratuit de votre tunnel.",
          },
        ],
      },
      {
        slug: "combien-coute-un-site-web-luxembourg-2026",
        category: "Sites web",
        title:
          "Combien coûte un site web professionnel au Luxembourg en 2026 ?",
        excerpt:
          "La vraie réponse n'est pas un chiffre, mais une fourchette qui dépend de vos objectifs. Voici ce qui fait varier le prix d'un site, et comment investir là où ça compte vraiment.",
        date: "2026-06-08",
        updated: "2026-06-08",
        readingMinutes: 7,
        author: "L'équipe vortx",
        cover: "analytics",
        summary: {
          text: "Le prix d'un site n'est pas un chiffre fixe mais une fourchette qui dépend de vos objectifs. L'article détaille ce qui fait varier le coût et comment investir là où ça rapporte vraiment, plutôt que de chercher le moins cher.",
          points: [
            "Le prix dépend du périmètre et des objectifs, pas d'un tarif générique.",
            "Investissez sur la conversion et le référencement, pas sur le superflu.",
            "Jugez le coût à l'aune de ce que le site vous rapporte.",
          ],
        },
        links: [
          { label: "Notre service Sites web", href: "/services/sites-web", desc: "Ce qu'on construit et ce qui est inclus dans chaque pack." },
          { label: "Tunnel de conversion : visiteurs → clients", href: "/news/tunnel-de-conversion-transformer-visiteurs-en-clients", desc: "Pourquoi un site doit être pensé pour convertir." },
          { label: "Qu'est-ce qu'un bon logo ?", href: "/news/quest-ce-quun-bon-logo-identite-qui-dure", desc: "L'identité de marque qui accompagne votre site." },
        ],
        body: [
          {
            type: "p",
            text: "« Combien coûte un site web ? » C'est la première question qu'on nous pose, et la plus difficile à répondre en un chiffre. Un site, c'est comme une maison : entre un studio et une villa, le mot « maison » ne dit rien du prix. Ce qui compte, c'est ce que vous voulez en faire.",
          },
          {
            type: "h2",
            id: "ca-depend",
            text: "Pourquoi « ça dépend » est la seule réponse honnête",
          },
          {
            type: "p",
            text: "Un prix annoncé sans connaître votre projet est soit trop élevé (on gonfle pour se couvrir), soit décevant (on rogne sur l'essentiel). Le vrai travail, c'est de définir le juste périmètre : ni plus, ni moins que ce qui sert votre objectif.",
          },
          {
            type: "h2",
            id: "ce-qui-fait-le-prix",
            text: "Ce qui fait vraiment varier le prix",
          },
          {
            type: "ul",
            items: [
              "Le nombre de pages et la complexité des contenus.",
              "Sur-mesure (Next.js) ou WordPress, selon votre besoin de flexibilité et d'autonomie.",
              "Le niveau de design : template adapté ou identité 100 % sur mesure.",
              "Les fonctionnalités : formulaires, prise de rendez-vous, paiement, espace client…",
              "Le multilingue (FR/DE/EN) et l'optimisation SEO & GEO.",
              "Les intégrations (CRM, outils métier) et l'automatisation.",
            ],
          },
          {
            type: "h2",
            id: "fourchettes",
            text: "Des repères pour s'y retrouver",
          },
          {
            type: "h3",
            text: "Site vitrine ou landing page",
          },
          {
            type: "p",
            text: "Pour présenter votre activité et générer des contacts, l'investissement reste contenu. C'est souvent le meilleur point de départ : rapide à livrer, immédiatement utile, et conçu pour convertir.",
          },
          {
            type: "h3",
            text: "Site sur-mesure ou plateforme",
          },
          {
            type: "p",
            text: "Dès qu'il faut des fonctionnalités spécifiques, un design unique, du multilingue poussé ou des intégrations, le budget grimpe — mais c'est aussi là que le site devient un vrai actif qui travaille pour vous.",
          },
          {
            type: "callout",
            title: "Le bon réflexe",
            text: "Ne demandez pas seulement « combien ça coûte », mais « combien ça rapporte ». Un site à 2 000 € qui ne génère rien est plus cher qu'un site qui s'amortit en quelques contrats.",
          },
          {
            type: "h2",
            id: "investir-malin",
            text: "Où investir en priorité",
          },
          {
            type: "ul",
            items: [
              "La performance et le mobile : un site lent fait fuir avant même d'être lu.",
              "Le tunnel de conversion : chaque page doit pousser vers une action claire.",
              "Le SEO & GEO dès le départ : être trouvé sur Google et cité par les IA.",
              "Un contenu honnête et précis, ancré dans votre réalité.",
            ],
          },
          {
            type: "quote",
            text: "Un site n'est pas une dépense ponctuelle, c'est un commercial qui travaille 24/7. La question, c'est ce que vous attendez de lui.",
          },
          {
            type: "callout",
            title: "À retenir",
            text: "Le prix d'un site dépend de vos objectifs, pas d'un tarif générique. Définissez le bon périmètre, investissez sur la conversion et le référencement, et jugez le coût à l'aune de ce que le site vous rapporte.",
          },
          {
            type: "p",
            text: "Chez vortx, on vous propose un devis précis après un appel découverte gratuit — pas un prix sorti du chapeau. On vous dit, sans détour, ce dont vous avez vraiment besoin.",
          },
        ],
      },
      {
        slug: "quest-ce-quun-bon-logo-identite-qui-dure",
        category: "Branding",
        title: "Qu'est-ce qu'un bon logo ? Les principes d'une identité qui dure",
        excerpt:
          "Un bon logo n'est pas qu'une jolie image : c'est la première promesse de votre marque. Voici les principes qui séparent un logo mémorable d'un logo oubliable.",
        date: "2026-06-08",
        updated: "2026-06-08",
        readingMinutes: 6,
        author: "L'équipe vortx",
        cover: "branding",
        summary: {
          text: "Un logo n'est pas qu'une jolie image : c'est la première promesse de votre marque. L'article expose les principes d'un logo qui dure — simple, mémorable, intemporel, polyvalent et pertinent — et son rôle au sein d'une identité cohérente.",
          points: [
            "Un bon logo est simple, mémorable, intemporel, polyvalent et pertinent.",
            "Il vit au sein d'une identité visuelle cohérente, pas tout seul.",
            "La cohérence visuelle inspire confiance avant même le premier mot.",
          ],
        },
        links: [
          { label: "Notre service Branding & design", href: "/services/branding-design", desc: "Logo sur mesure et identité de marque complète." },
          { label: "Combien coûte un site web au Luxembourg ?", href: "/news/combien-coute-un-site-web-luxembourg-2026", desc: "Habiller votre marque sur le web." },
          { label: "Glossaire : identité de marque, design system…", href: "/glossaire", desc: "Le vocabulaire du branding expliqué." },
        ],
        body: [
          {
            type: "p",
            text: "Avant le premier mot, votre logo a déjà parlé. C'est la première impression, le repère qu'on retient, le visage de votre marque. Pourtant, beaucoup d'entreprises le traitent comme un détail. Un bon logo, c'est tout sauf un détail — et il obéit à des principes simples.",
          },
          {
            type: "h2",
            id: "pas-juste-joli",
            text: "Un logo, ce n'est pas (que) du joli",
          },
          {
            type: "p",
            text: "Un logo n'a pas pour mission de plaire à tout le monde, mais de rendre votre marque reconnaissable et digne de confiance. Il doit fonctionner aussi bien sur une enseigne que sur une icône d'application, en couleur comme en noir et blanc.",
          },
          {
            type: "h2",
            id: "principes",
            text: "Les 5 principes d'un bon logo",
          },
          { type: "logo" },
          { type: "h3", text: "1. Simple" },
          {
            type: "p",
            text: "Les logos les plus forts sont souvent les plus épurés. La simplicité se mémorise, se reconnaît d'un coup d'œil et se décline partout sans se déformer.",
          },
          { type: "h3", text: "2. Mémorable" },
          {
            type: "p",
            text: "Un bon logo laisse une trace. Une forme, une idée, un détail qui accroche — assez distinctif pour qu'on s'en souvienne après l'avoir vu une fois.",
          },
          { type: "h3", text: "3. Intemporel" },
          {
            type: "p",
            text: "Les modes passent. Un logo conçu pour durer évite les effets à la mode qui vieillissent mal, et reste pertinent dix ans plus tard.",
          },
          { type: "h3", text: "4. Polyvalent" },
          {
            type: "p",
            text: "Du favicon de 16 pixels au panneau publicitaire, il doit rester lisible et cohérent partout. C'est pour ça qu'on le livre toujours en plusieurs formats.",
          },
          { type: "h3", text: "5. Pertinent" },
          {
            type: "p",
            text: "Le style doit coller à votre secteur et à votre positionnement. Un logo n'a pas à tout dire de vous — juste à ne pas dire le contraire de ce que vous êtes.",
          },
          {
            type: "callout",
            title: "Le piège classique",
            text: "Vouloir que le logo « explique » tout ce que vous faites. Un bon logo identifie ; c'est votre marque, dans la durée, qui raconte le reste.",
          },
          {
            type: "h2",
            id: "au-dela",
            text: "Au-delà du logo : l'identité complète",
          },
          {
            type: "p",
            text: "Un logo seul ne suffit pas. Il prend toute sa force au sein d'une identité cohérente : couleurs, typographies, règles d'usage. C'est cette cohérence, appliquée partout, qui construit la confiance et la reconnaissance.",
          },
          {
            type: "quote",
            text: "Un logo, c'est la signature. L'identité, c'est l'écriture entière. Les deux doivent dire la même chose.",
          },
          {
            type: "callout",
            title: "À retenir",
            text: "Un bon logo est simple, mémorable, intemporel, polyvalent et pertinent — et il vit au sein d'une identité visuelle cohérente, pas tout seul.",
          },
          {
            type: "p",
            text: "Chez vortx, on conçoit des logos sur mesure et l'identité complète qui va avec. Envie d'une marque dont on se souvient ? Parlons-en.",
          },
        ],
      },
      {
        slug: "rgpd-cookies-site-web-luxembourg",
        category: "Conformité",
        title:
          "RGPD & cookies : le minimum à respecter sur votre site au Luxembourg",
        excerpt:
          "Bandeau cookies, consentement, mentions… Le RGPD fait peur, mais l'essentiel tient en quelques règles claires. Voici le minimum pour un site luxembourgeois serein.",
        date: "2026-06-08",
        updated: "2026-06-08",
        readingMinutes: 6,
        author: "L'équipe vortx",
        cover: "rgpd",
        summary: {
          text: "Le RGPD fait peur, mais l'essentiel tient en quelques règles claires. L'article résume le minimum à respecter sur un site luxembourgeois — bandeau cookies, consentement et mentions — pour être conforme sans tomber dans la paranoïa.",
          points: [
            "Consentement réel et préalable avant tout cookie non essentiel.",
            "Un bandeau clair et des mentions à jour couvrent l'essentiel.",
            "La conformité protège vos visiteurs et votre crédibilité.",
          ],
        },
        links: [
          { label: "Notre service Sites web", href: "/services/sites-web", desc: "Des sites conçus conformes dès le départ." },
          { label: "SEO vs GEO : visibilité et confiance", href: "/news/geo-seo-luxembourg-etre-cite-par-les-ia", desc: "Pourquoi la confiance et la visibilité vont de pair." },
          { label: "Glossaire : RGPD, cookies, consentement…", href: "/glossaire", desc: "Les termes de la conformité expliqués." },
        ],
        body: [
          {
            type: "p",
            text: "Le RGPD a la réputation d'être un casse-tête. En réalité, pour un site vitrine ou de génération de leads, l'essentiel tient en quelques règles de bon sens. Voici de quoi être en règle — et surtout, en confiance avec vos visiteurs.",
          },
          {
            type: "callout",
            title: "Précision utile",
            text: "Cet article donne des repères pratiques, pas un conseil juridique. Pour un cas précis, faites valider vos pages légales par un professionnel du droit.",
          },
          {
            type: "h2",
            id: "rgpd-cest-quoi",
            text: "Le RGPD en deux minutes",
          },
          {
            type: "p",
            text: "Le Règlement Général sur la Protection des Données encadre la façon dont vous collectez et utilisez les données personnelles (nom, e-mail, adresse IP…). Le principe : transparence, consentement quand il le faut, et respect des droits des personnes.",
          },
          {
            type: "h2",
            id: "cookies",
            text: "Cookies : consentement avant dépôt",
          },
          {
            type: "ul",
            items: [
              "Les cookies non essentiels (mesure d'audience, publicité) ne se déposent qu'après accord explicite.",
              "Le bandeau doit permettre d'accepter, de refuser et de personnaliser — refuser doit être aussi simple qu'accepter.",
              "Les cookies strictement nécessaires au fonctionnement du site ne demandent pas de consentement.",
            ],
          },
          {
            type: "h2",
            id: "checklist",
            text: "La checklist minimale",
          },
          {
            type: "ul",
            items: [
              "Un bandeau cookies conforme (accepter / refuser / personnaliser).",
              "Une politique de confidentialité claire (quelles données, pourquoi, combien de temps).",
              "Des mentions légales à jour.",
              "Une base légale pour chaque collecte (consentement, contrat, intérêt légitime).",
              "Un site en HTTPS et des données traitées de façon sécurisée.",
              "Un moyen simple d'exercer ses droits (accès, suppression).",
            ],
          },
          {
            type: "callout",
            title: "Le bon réflexe",
            text: "Ne collectez que ce dont vous avez réellement besoin. Moins de données, c'est moins de risques — et plus de confiance.",
          },
          {
            type: "h2",
            id: "atout",
            text: "La conformité, un atout plus qu'une corvée",
          },
          {
            type: "p",
            text: "Un site clair sur l'usage des données rassure. Au Luxembourg, où la confidentialité est prise au sérieux, le respect du RGPD est un signe de professionnalisme qui joue en votre faveur.",
          },
          {
            type: "quote",
            text: "Le RGPD n'est pas un obstacle à la conversion. Bien fait, c'est un argument de confiance.",
          },
          {
            type: "p",
            text: "Chez vortx, on conçoit chaque site dans le respect du RGPD dès le départ — bandeau de consentement, gestion des cookies et pages légales incluses. Un doute sur votre site actuel ? On vous fait un point gratuit.",
          },
        ],
      },
      {
        slug: "5-taches-pme-confier-a-l-ia",
        category: "Automatisation & IA",
        title: "5 tâches que votre PME devrait déjà confier à l'IA",
        excerpt:
          "L'IA ne remplace pas vos équipes — elle leur enlève les corvées. Voici 5 tâches concrètes qu'une PME luxembourgeoise peut automatiser dès aujourd'hui, sans usine à gaz.",
        date: "2026-06-08",
        updated: "2026-06-08",
        readingMinutes: 6,
        author: "L'équipe vortx",
        cover: "automation",
        summary: {
          text: "L'IA ne remplace pas vos équipes, elle leur enlève les corvées. L'article liste cinq tâches concrètes qu'une PME luxembourgeoise peut automatiser dès aujourd'hui — sans usine à gaz — pour libérer du temps utile.",
          points: [
            "Commencez petit : des tâches répétitives, pas une révolution.",
            "Réponses, qualification, relances, contenu, synchronisation : autant de candidats.",
            "Gardez la main : l'IA assiste, l'humain décide.",
          ],
        },
        links: [
          { label: "IA pour les PME : par où commencer", href: "/news/ia-pme-luxembourg-par-ou-commencer", desc: "Le guide pour démarrer sans vous tromper." },
          { label: "Notre service Automatisation & IA", href: "/services/automatisation-ia", desc: "Workflows et agents IA sur mesure." },
          { label: "Glossaire : automatisation, IA…", href: "/glossaire", desc: "Les termes de l'automatisation expliqués." },
        ],
        body: [
          {
            type: "p",
            text: "L'IA fait fantasmer autant qu'elle inquiète. Pour une PME, la bonne approche est pragmatique : pas de révolution, mais des tâches répétitives qu'on délègue pour libérer du temps. Voici cinq chantiers concrets, accessibles dès maintenant.",
          },
          {
            type: "h2",
            id: "pas-remplacer",
            text: "L'IA n'est pas là pour remplacer, mais pour soulager",
          },
          {
            type: "p",
            text: "L'objectif n'est pas de supprimer des postes, mais d'enlever à vos équipes ce qui n'a aucune valeur ajoutée — pour qu'elles se concentrent sur vos clients et votre métier.",
          },
          {
            type: "h2",
            id: "les-5",
            text: "Les 5 tâches à déléguer dès maintenant",
          },
          { type: "h3", text: "1. Répondre aux questions répétitives" },
          {
            type: "p",
            text: "Un chatbot bien entraîné répond 24/7 aux questions courantes (horaires, services, devis) et oriente le visiteur, sans mobiliser personne.",
          },
          { type: "h3", text: "2. Qualifier et trier les leads" },
          {
            type: "p",
            text: "L'IA peut scorer les demandes entrantes et router les plus chaudes vers le bon interlocuteur — vos commerciaux ne traitent que les meilleurs contacts.",
          },
          { type: "h3", text: "3. Relancer et suivre" },
          {
            type: "p",
            text: "Relances automatiques, rappels de rendez-vous, suivis après devis : autant de petites tâches oubliées qui, automatisées, ne tombent plus jamais à l'eau.",
          },
          { type: "h3", text: "4. Produire et adapter du contenu" },
          {
            type: "p",
            text: "Brouillons d'e-mails, descriptions, déclinaisons multilingues : l'IA accélère la production, vos équipes relisent et valident. Plus de volume, moins d'effort.",
          },
          { type: "h3", text: "5. Synchroniser vos outils" },
          {
            type: "p",
            text: "Site, CRM, facturation, agenda : on connecte le tout pour que la donnée circule sans ressaisie. Fini le copier-coller entre logiciels.",
          },
          {
            type: "callout",
            title: "Le piège à éviter",
            text: "Vouloir tout automatiser d'un coup. On commence par une tâche, on mesure le gain, puis on étend. L'automatisation utile est progressive.",
          },
          {
            type: "h2",
            id: "par-ou-commencer",
            text: "Par où commencer",
          },
          {
            type: "ul",
            items: [
              "Repérez la tâche répétitive qui vous coûte le plus de temps.",
              "Automatisez-la d'abord, mesurez le temps gagné.",
              "Gardez toujours un humain dans la boucle pour valider.",
              "Étendez ensuite, étape par étape, dans le respect du RGPD.",
            ],
          },
          {
            type: "quote",
            text: "La bonne automatisation ne se voit pas : elle vous rend juste vos journées.",
          },
          {
            type: "callout",
            title: "À retenir",
            text: "Confiez à l'IA les tâches répétitives sans valeur ajoutée — réponses, qualification, relances, contenu, synchronisation — en commençant petit et en gardant la main.",
          },
          {
            type: "p",
            text: "Chez vortx, on met l'IA au travail là où elle vous fait vraiment gagner du temps. Envie de savoir ce que vous pourriez automatiser ? On vous le dit gratuitement.",
          },
        ],
      },
      {
        slug: "ia-pme-luxembourg-par-ou-commencer",
        category: "Automatisation & IA",
        title: "IA pour les PME au Luxembourg : par où commencer en 2026",
        excerpt:
          "L'IA n'est plus réservée aux grands groupes. Mais par où commencer quand on est une PME, sans budget tech ni équipe dédiée ? Voici une feuille de route pragmatique : les bons cas d'usage, les pièges à éviter et comment garder le contrôle de vos données.",
        date: "2026-06-09",
        updated: "2026-06-09",
        readingMinutes: 7,
        author: "L'équipe vortx",
        cover: "ai-build",
        summary: {
          text: "L'IA n'est plus réservée aux grands groupes : bien cadrée, elle donne à une PME la force de frappe d'une équipe plus grande. Ce guide démonte les idées reçues, montre où l'IA paie vraiment et propose une méthode pour démarrer petit en gardant le contrôle de vos données.",
          points: [
            "Partez d'un problème concret et d'une tâche répétitive, pas d'un outil à la mode.",
            "Testez sur un périmètre réduit, mesurez le temps gagné, puis élargissez.",
            "Gardez vos données sous contrôle : RGPD et souveraineté d'abord.",
          ],
        },
        links: [
          { label: "5 tâches que votre PME devrait confier à l'IA", href: "/news/5-taches-pme-confier-a-l-ia", desc: "Des exemples concrets à automatiser dès maintenant." },
          { label: "Notre service Automatisation & IA", href: "/services/automatisation-ia", desc: "Workflows, intégrations et agents IA sur mesure." },
          { label: "Glossaire : IA, automatisation, RGPD…", href: "/glossaire", desc: "Le vocabulaire de l'IA expliqué simplement." },
        ],
        body: [
          {
            type: "p",
            text: "L'intelligence artificielle est partout dans les discours, mais beaucoup de dirigeants de PME se demandent encore, concrètement, ce qu'ils sont censés en faire. La bonne nouvelle : vous n'avez pas besoin d'un département data ni d'un budget à six chiffres. Vous avez besoin d'une tâche qui vous coûte du temps chaque semaine — et d'un point de départ raisonnable. Voici comment vous y prendre.",
          },
          {
            type: "h2",
            id: "pourquoi-pme",
            text: "Pourquoi l'IA est enfin à portée des PME",
          },
          {
            type: "p",
            text: "Pendant des années, l'IA était un projet d'entreprise : des données, des serveurs, des spécialistes. Aujourd'hui, l'essentiel est devenu un service que l'on active à la demande, facturé à l'usage, et qui parle français. Une PME luxembourgeoise peut brancher un assistant, automatiser un flux ou générer du contenu sans rien héberger elle-même. Le coût d'entrée a fondu ; ce qui compte désormais, c'est de choisir le bon cas d'usage.",
          },
          {
            type: "h2",
            id: "trois-idees-recues",
            text: "Trois idées reçues qui bloquent les PME",
          },
          {
            type: "h3",
            text: "« L'IA, c'est pour les grands groupes »",
          },
          {
            type: "p",
            text: "C'est précisément l'inverse. Plus votre équipe est petite, plus chaque heure gagnée pèse lourd. Un artisan, un cabinet ou un commerce qui automatise ses réponses et ses relances récupère un temps qu'aucune grande structure ne valorise autant. L'IA est un multiplicateur de petites équipes.",
          },
          {
            type: "h3",
            text: "« Il faut un développeur et un gros budget »",
          },
          {
            type: "p",
            text: "Beaucoup de gains se font avec des outils prêts à l'emploi et quelques automatisations bien pensées. On commence souvent sans écrire une ligne de code. Le budget se mesure en dizaines d'euros par mois, pas en milliers — et il se justifie dès la première tâche automatisée.",
          },
          {
            type: "h3",
            text: "« L'IA va remplacer mon équipe »",
          },
          {
            type: "p",
            text: "L'IA remplace des tâches, pas des personnes. Elle prend en charge le répétitif et le sans valeur ajoutée pour rendre à vos collaborateurs le temps des décisions, de la relation client et du métier. Bien menée, elle augmente vos équipes au lieu de les diminuer.",
          },
          {
            type: "callout",
            title: "En une phrase",
            text: "L'IA ne remplace pas une PME — elle lui donne la force de frappe d'une équipe plus grande.",
          },
          {
            type: "h2",
            id: "ou-commencer",
            text: "Où l'IA paie vraiment pour une PME",
          },
          {
            type: "p",
            text: "Inutile de tout transformer. Quelques domaines concentrent l'essentiel de la valeur pour une petite structure :",
          },
          {
            type: "ul",
            items: [
              "Relation client : réponses aux questions fréquentes, qualification des demandes, prise de rendez-vous.",
              "Marketing & contenu : brouillons d'articles, posts, e-mails et descriptions, à relire et personnaliser.",
              "Devis & administratif : pré-remplissage, synthèse de documents, relances automatiques.",
              "Analyse : lecture rapide de vos données de vente ou de trafic pour repérer ce qui marche.",
              "Productivité interne : comptes rendus, traduction FR/DE/EN, recherche d'informations.",
            ],
          },
          {
            type: "h2",
            id: "demarrer-petit",
            text: "Comment démarrer sans vous tromper",
          },
          {
            type: "ol",
            items: [
              "Partez d'un problème, pas d'un outil : quelle tâche vous coûte du temps chaque semaine ?",
              "Choisissez une tâche répétitive et mesurable, avec un résultat clair.",
              "Testez sur un périmètre réduit, sur quelques cas réels, avant de généraliser.",
              "Mesurez le temps gagné et la qualité obtenue, honnêtement.",
              "Élargissez ce qui marche, abandonnez ce qui ne tient pas ses promesses.",
            ],
          },
          {
            type: "p",
            text: "Cette approche par petits pas évite l'effet « grand projet IA » qui s'enlise. Vous accumulez des victoires concrètes, votre équipe gagne en confiance, et vous investissez seulement là où la valeur est prouvée.",
          },
          {
            type: "h2",
            id: "rgpd-donnees",
            text: "RGPD et données : la vigilance qui rassure",
          },
          {
            type: "p",
            text: "Au Luxembourg, la question des données n'est pas un détail. Avant de confier quoi que ce soit à un outil, posez-vous trois questions : où sont stockées les données, qui peut y accéder, et avez-vous le droit de les utiliser ainsi ? Évitez de coller des données sensibles ou nominatives dans des outils grand public, privilégiez des solutions conformes au RGPD et hébergées dans l'UE quand c'est possible, et tracez ce que vous automatisez. La conformité n'est pas un frein : c'est ce qui rend l'IA déployable sereinement.",
          },
          {
            type: "callout",
            title: "À retenir",
            text: "Commencez par un cas d'usage simple et mesurable, gardez vos données sous contrôle, et élargissez une fois la valeur prouvée.",
          },
          {
            type: "quote",
            text: "La bonne question n'est pas « est-ce que je dois faire de l'IA ? » mais « quelle tâche me coûte du temps chaque semaine ? ».",
          },
          {
            type: "p",
            text: "Chez vortx, on aide les PME luxembourgeoises à identifier les cas d'usage qui rapportent vraiment, puis à les mettre en place proprement — outils, automatisations et garde-fous RGPD compris. Envie de savoir par où commencer chez vous ? On vous le dit gratuitement.",
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
      /** AI-style synthesis shown at the top of the article (text + key points). */
      summary?: { text: string; points: string[] };
      /** Curated internal links rendered in a "go further" box. */
      links?: { label: string; href: string; desc: string }[];
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
      packsIncluded: {
        eyebrow: "Tout est inclus",
        title: "Que comprennent tous nos packs ?",
        lead: "Quel que soit le pack choisi, vous bénéficiez toujours de ces fonctionnalités essentielles.",
        items: [
          { icon: "server", title: "Domaine & hébergement", desc: "Première année de domaine offerte et hébergement haute vitesse inclus." },
          { icon: "responsive", title: "100 % responsive", desc: "Une adaptation parfaite à tous les écrans pour capter des leads sur mobile, tablette et ordinateur." },
          { icon: "seo", title: "SEO prêt pour l'avenir", desc: "Optimisé pour les moteurs classiques et le référencement conversationnel (GEO) — trouvé sur Google et cité par les IA." },
          { icon: "contact", title: "Formulaire de contact", desc: "Recevez les messages directement par e-mail (Landing Page & Site S)." },
          { icon: "smartforms", title: "Formulaires intelligents", desc: "Formulaires de contact et de devis multi-étapes, conçus pour maximiser les conversions et capter des leads qualifiés (Site M, L, XL & sur-mesure)." },
          { icon: "ssl", title: "Certificat SSL", desc: "Connexion sécurisée HTTPS pour protéger vos visiteurs et rassurer Google." },
          { icon: "support", title: "Support technique", desc: "Assistance technique incluse pendant les 3 premiers mois." },
          { icon: "analytics", title: "Analytics intégré", desc: "Suivi complet des conversions et du comportement utilisateur pour une optimisation continue." },
          { icon: "speed", title: "Vitesse optimisée", desc: "Chargement ultra-rapide pour une meilleure expérience et un meilleur référencement." },
        ],
        moreTitle: "Et bien plus encore…",
        moreText: "Chaque projet est unique. On peut ajouter les fonctionnalités dont vous avez besoin : blog, galerie, réservation en ligne, intégration aux réseaux sociaux, et plus encore.",
        ctaLabel: "Parlons de votre projet",
      },
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
        "Votre logo, c'est la première chose qu'on retient de vous. On le conçoit sur mesure pour qu'il soit unique, mémorable et fidèle à ce que vous êtes — pas un template vu mille fois.",
        "Au-delà du logo, on construit une identité visuelle complète : couleurs, typographies, règles d'usage. Une marque cohérente partout, du site web au print, qui inspire confiance avant même le premier mot.",
      ],
      included: [
        { icon: "branding", title: "Logo sur mesure", desc: "Un logo unique, conçu à la main, décliné dans tous les formats dont vous aurez besoin." },
        { icon: "ai-build", title: "Identité visuelle", desc: "Palette de couleurs, typographies et éléments graphiques qui rendent votre marque reconnaissable." },
        { icon: "responsive", title: "Charte graphique", desc: "Un guide clair des règles d'usage pour garder votre marque cohérente partout, dans le temps." },
        { icon: "conversion", title: "Déclinaisons print & digital", desc: "Cartes de visite, signatures, réseaux sociaux, supports… votre marque appliquée sur tout." },
      ],
      deliverables: [
        "Logo sur mesure (tous formats : couleur, noir & blanc, vectoriel)",
        "Identité visuelle : couleurs & typographies",
        "Charte graphique & règles d'usage",
        "Déclinaisons print et digital",
      ],
      faq: [
        { q: "Vous créez un logo de zéro ou vous faites évoluer l'existant ?", a: "Les deux. On peut créer un logo et une identité de A à Z, ou rafraîchir les vôtres en gardant ce qui fonctionne déjà et qui vous est reconnu." },
        { q: "Quels fichiers est-ce que je reçois ?", a: "Vous recevez votre logo dans tous les formats utiles (vectoriel, couleur, noir & blanc, versions web et print) — vous en êtes pleinement propriétaire." },
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

  // ---- Portfolio coverflow (homepage showcase) ----
  portfolio: {
    typewriter: [
      "Créez votre présence digitale",
      "Concevez des expériences uniques",
      "Boostez votre activité en ligne",
      "Démarquez-vous de la concurrence",
      "Connectez-vous à vos clients",
    ],
    cta: "Travaillons ensemble",
    prev: "Projet précédent",
    next: "Projet suivant",
    pause: "Mettre en pause",
    play: "Reprendre le défilement",
  },

  // ---- Sub-services (children of a parent service) ----
  subServicesTitle: "Deux expertises complémentaires",
  subServicesLead: "Ce service se décline en deux spécialités. Prenez celle qui colle à votre besoin — ou combinez-les pour couvrir tout le terrain.",
  subServices: {
    publicite: [
      {
        slug: "google-ads",
        illustration: "google-ads",
        title: "Google Ads",
        tagline: "Captez la demande au moment exact où elle s'exprime.",
        short:
          "Search, Performance Max, Shopping, YouTube : soyez présent quand vos clients cherchent, avec des campagnes pilotées par la donnée et orientées rentabilité.",
        bullets: [
          "Search & Performance Max",
          "Shopping & YouTube Ads",
          "Landing pages dédiées",
          "Optimisation continue du ROAS",
        ],
        metaTitle: "Agence Google Ads à Luxembourg | vortx",
        metaDescription:
          "Campagnes Google Ads (Search, Performance Max, Shopping, YouTube) rentables pour le marché luxembourgeois. Captez la demande, piloté par la donnée.",
        intro: [
          "Sur Google, vos clients ne cherchent pas une marque : ils cherchent une solution. Google Ads vous met devant eux à l'instant précis où ils en ont besoin — pas avant, pas après.",
          "On structure vos campagnes (Search, Performance Max, Shopping, YouTube) pour capter cette intention et la transformer en demandes concrètes, en dépensant votre budget là où il rapporte vraiment.",
        ],
        included: [
          { icon: "ads-targeting", title: "Search & Performance Max", desc: "Des campagnes structurées pour apparaître sur les requêtes qui convertissent." },
          { icon: "conversion", title: "Landing pages dédiées", desc: "Des pages d'atterrissage pensées pour transformer le clic payant en lead." },
          { icon: "analytics", title: "Pilotage par la donnée", desc: "Un suivi des conversions fiable : chaque euro dépensé est relié à un résultat." },
          { icon: "next-perf", title: "Optimisation du ROAS", desc: "Ajustements continus des enchères et des audiences pour maximiser le retour." },
        ],
        deliverables: [
          "Stratégie & structure de comptes",
          "Création des campagnes (Search, PMax, Shopping, YouTube)",
          "Landing pages optimisées",
          "Reporting ROAS & optimisation continue",
        ],
        faq: [
          { q: "Quel budget minimum prévoir ?", a: "Cela dépend de votre secteur et de la concurrence sur vos mots-clés. On définit un budget test, on mesure, puis on augmente uniquement ce qui est rentable." },
          { q: "En combien de temps voit-on des résultats ?", a: "Les premiers clics arrivent dès le lancement. Les premières semaines servent à apprendre et à optimiser ; la rentabilité se stabilise ensuite." },
        ],
      },
      {
        slug: "meta-ads",
        illustration: "meta-ads",
        title: "Meta Ads",
        tagline: "Créez la demande sur Facebook, Instagram et Threads.",
        short:
          "Du contenu qui arrête le scroll. Des campagnes Meta (Facebook, Instagram, Threads) ciblées pour faire connaître votre marque, engager votre audience et convertir.",
        bullets: [
          "Facebook & Instagram Ads",
          "Threads",
          "Audiences & retargeting",
          "Création de contenus qui convertissent",
        ],
        metaTitle: "Agence Meta Ads (Facebook & Instagram) à Luxembourg | vortx",
        metaDescription:
          "Campagnes Meta Ads (Facebook, Instagram, Threads) pour le marché luxembourgeois : notoriété, engagement et conversions. Ciblage précis et créas qui performent.",
        intro: [
          "Sur les réseaux sociaux, personne ne cherche votre produit — c'est à vous d'attirer l'attention. Meta Ads (Facebook, Instagram, Threads) crée la demande là où vos clients passent leur temps.",
          "On combine ciblage précis, retargeting et création de contenus qui arrêtent le scroll pour transformer une audience froide en clients, étape par étape.",
        ],
        included: [
          { icon: "ads-targeting", title: "Ciblage social précis", desc: "Les bonnes audiences sur Facebook, Instagram et Threads, au bon moment." },
          { icon: "branding", title: "Créas qui convertissent", desc: "Des visuels et vidéos pensés pour capter l'attention et donner envie d'agir." },
          { icon: "leads", title: "Retargeting & audiences", desc: "On recible les visiteurs et on construit des audiences similaires pour amplifier." },
          { icon: "analytics", title: "Suivi des performances", desc: "Un reporting clair sur le coût par résultat et le retour sur investissement." },
        ],
        deliverables: [
          "Stratégie & structure de campagnes Meta",
          "Création des visuels et vidéos",
          "Audiences, retargeting & A/B tests",
          "Reporting & optimisation continue",
        ],
        faq: [
          { q: "Meta Ads, c'est seulement Facebook et Instagram ?", a: "Non : on couvre aussi Threads et le réseau d'audience Meta. On choisit les placements selon votre cible et vos objectifs." },
          { q: "Faut-il déjà avoir du contenu ?", a: "Pas forcément. On peut créer les visuels et vidéos publicitaires, ou partir de vos contenus existants et les adapter au format qui convertit." },
        ],
      },
    ],
    "seo-geo": [
      {
        slug: "seo",
        illustration: "seo",
        title: "SEO",
        tagline: "Être trouvé sur Google, durablement.",
        short:
          "Référencement naturel technique et éditorial : on optimise votre site pour remonter sur les requêtes qui comptent et attirer un trafic qualifié, sans payer le clic.",
        bullets: [
          "Audit technique & sémantique",
          "Optimisation on-page",
          "Contenu & mots-clés",
          "Suivi des positions",
        ],
        metaTitle: "Agence SEO à Luxembourg | vortx",
        metaDescription:
          "Référencement naturel (SEO) technique et éditorial pour les entreprises luxembourgeoises. Remontez sur Google et attirez un trafic qualifié, durablement.",
        intro: [
          "Le SEO, c'est l'art d'être trouvé sur Google sans payer le clic. Un actif qui met quelques semaines à se construire, mais qui continue d'attirer du trafic qualifié longtemps après — contrairement à la publicité qui s'arrête dès qu'on coupe le budget.",
          "On travaille les trois piliers : la technique (vitesse, structure, indexation), le contenu (les bons mots-clés, l'intention de recherche) et l'autorité. Le tout pensé pour le marché luxembourgeois et son multilinguisme.",
        ],
        included: [
          { icon: "seo", title: "Audit & SEO technique", desc: "Vitesse, structure, indexation, données : on corrige les fondations qui bloquent votre référencement." },
          { icon: "conversion", title: "Contenu optimisé", desc: "Des pages qui répondent vraiment à l'intention de recherche et qui convertissent." },
          { icon: "multilingual", title: "Multilingue FR/DE/EN", desc: "Un référencement pensé pour les trois langues du marché luxembourgeois." },
          { icon: "analytics", title: "Suivi des positions", desc: "Reporting clair sur vos positions, votre trafic et vos conversions." },
        ],
        deliverables: [
          "Audit technique & sémantique complet",
          "Plan de mots-clés et optimisations on-page",
          "Recommandations de contenu",
          "Reporting mensuel des positions & du trafic",
        ],
        faq: [
          { q: "En combien de temps voit-on des résultats ?", a: "Les premiers signaux apparaissent souvent en quelques semaines, les gains solides en quelques mois. Le SEO est un travail de fond — on vous montre la progression à chaque étape." },
          { q: "Le SEO suffit-il, ou faut-il aussi de la pub ?", a: "Les deux se complètent : la pub apporte des résultats immédiats, le SEO construit un trafic durable. On vous conseille le bon dosage selon votre échéance." },
        ],
      },
      {
        slug: "geo-gso",
        illustration: "geo-gso",
        title: "GEO / GSO",
        tagline: "Être la réponse citée par les IA.",
        short:
          "Generative Engine Optimization : on structure votre contenu et vos données pour que ChatGPT, Perplexity et Google AI vous citent comme source — pas juste un lien.",
        bullets: [
          "Contenu structuré & citable",
          "Données structurées (Schema.org)",
          "Fichier llms.txt",
          "Suivi des citations IA",
        ],
        metaTitle: "Agence GEO / GSO à Luxembourg | vortx",
        metaDescription:
          "Optimisation pour les IA génératives (GEO/GSO) : soyez cité par ChatGPT, Perplexity et Google AI. Données structurées, contenu citable, suivi des citations.",
        intro: [
          "De plus en plus de vos clients posent leurs questions à une IA plutôt qu'à Google. Le GEO (Generative Engine Optimization) optimise votre présence pour que ChatGPT, Perplexity et Google AI vous reprennent et vous citent comme source — pas seulement comme un lien parmi d'autres.",
          "On structure votre contenu pour qu'il soit « citable » (réponses nettes, faits vérifiables, contexte local) et on rend votre site lisible par les machines : données structurées, llms.txt, architecture propre.",
        ],
        included: [
          { icon: "geo-citation", title: "Contenu citable", desc: "On structure vos pages pour être repris et cités dans les réponses des IA génératives." },
          { icon: "seo", title: "Données structurées", desc: "Schema.org et llms.txt : on rend votre offre lisible et reprenable par les modèles." },
          { icon: "ai-build", title: "Architecture IA-ready", desc: "Un site rapide et propre, pensé dès le départ pour les moteurs de réponse." },
          { icon: "analytics", title: "Suivi des citations", desc: "On suit où et comment les IA vous citent, avec un reporting clair." },
        ],
        deliverables: [
          "Audit GEO & structuration du contenu",
          "Données structurées (Schema.org)",
          "Fichier llms.txt & optimisations techniques",
          "Reporting des citations dans les réponses IA",
        ],
        faq: [
          { q: "Le GEO remplace-t-il le SEO ?", a: "Non, il le complète. 80 % des bonnes pratiques sont communes : un contenu structuré et fiable performe à la fois sur Google et auprès des IA. On optimise pour les deux." },
          { q: "Comment mesure-t-on les résultats du GEO ?", a: "On suit votre présence dans les réponses des assistants IA (citations, mentions) et l'évolution de votre autorité. C'est un domaine émergent : on avance avec méthode et transparence." },
        ],
      },
    ],
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
          { q: "Qui est vortx et que faites-vous exactement ?", a: "vortx est une agence marketing et web basée au Luxembourg. On conçoit des sites qui convertissent et des stratégies d'acquisition mesurables : SEO & GEO, génération de leads, publicité en ligne, branding et automatisation IA. Notre obsession : transformer l'attention en clients." },
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

  // ---- Accessibility widget ----
  a11y: {
    button: "Accessibilité",
    title: "Accessibilité",
    profilesTitle: "Profils rapides",
    profileVisual: "Confort visuel",
    profileDyslexia: "Dyslexie",
    profileReading: "Lecture facile",
    profileCalm: "Sobriété",
    textGroup: "Texte",
    viewGroup: "Couleurs & vue",
    comfortGroup: "Navigation & confort",
    fontSize: "Taille du texte",
    decrease: "Réduire le texte",
    increase: "Agrandir le texte",
    readable: "Police adaptée",
    spacing: "Espacement des lettres",
    lineHeight: "Interligne large",
    links: "Souligner les liens",
    contrast: "Contraste élevé",
    grayscale: "Niveaux de gris",
    saturate: "Saturation élevée",
    hideImages: "Masquer les images",
    bigCursor: "Grand curseur",
    focusHighlight: "Surbrillance du focus",
    readingGuide: "Guide de lecture",
    readingMask: "Masque de lecture",
    pauseMotion: "Couper les animations",
    reset: "Réinitialiser",
    close: "Fermer",
    active: "actifs",
  },

  // ---- Per-route metadata ----
  meta: {
    home: {
      title: "vortx | Agence marketing & web à Luxembourg",
      description:
        "vortx, agence marketing à Luxembourg : sites web qui convertissent, SEO & GEO, génération de leads et publicité en ligne. Audit gratuit, réponse rapide.",
    },
    services: {
      title: "Services marketing & web | vortx Luxembourg",
      description:
        "Sites web, SEO & GEO, génération de leads, publicité, branding et automatisation IA. Une chaîne complète d'acquisition pour les entreprises luxembourgeoises.",
    },
    about: {
      title: "L'agence vortx | Marketing & web à Luxembourg",
      description:
        "Qui est vortx : une agence marketing et web luxembourgeoise obsédée par la conversion et la performance mesurable. Découvrez notre approche.",
    },
    approach: {
      title: "Notre méthode | vortx Luxembourg",
      description:
        "Diagnostic, conception, revue, lancement : la méthode vortx pour livrer des sites et des campagnes qui rapportent.",
    },
    work: {
      title: "Réalisations | vortx Luxembourg",
      description:
        "Découvrez les projets et résultats de vortx, agence marketing et web au Luxembourg.",
    },
    contact: {
      title: "Contact & audit gratuit | vortx Luxembourg",
      description:
        "Réservez un appel découverte gratuit avec vortx. Audit personnalisé sans délai, devis sans engagement. Agence marketing & web à Luxembourg.",
    },
    legalMentions: {
      title: "Mentions légales | vortx Luxembourg",
      description: "Mentions légales du site vortx, agence marketing & web à Luxembourg.",
    },
    legalPrivacy: {
      title: "Politique de confidentialité | vortx Luxembourg",
      description:
        "Comment vortx collecte, utilise et protège vos données personnelles (RGPD).",
    },
    legalCookies: {
      title: "Politique cookies | vortx Luxembourg",
      description: "Utilisation des cookies et traceurs sur le site vortx.",
    },
    news: {
      title: "News | Marketing, SEO & GEO — vortx Luxembourg",
      description:
        "Analyses et conseils de vortx sur le SEO, le GEO, la conversion et le web au Luxembourg. Du concret pour faire croître votre entreprise.",
    },
    glossary: {
      title: "Glossaire marketing & web | vortx Luxembourg",
      description:
        "Tous les termes du marketing digital et du web expliqués simplement : SEO, GEO, ROAS, tunnel de conversion, CMS… avec le contexte luxembourgeois.",
    },
    faq: {
      title: "FAQ — Sites web, SEO, leads & tarifs | vortx Luxembourg",
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
      metaTitle: "Merci | vortx Luxembourg",
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
