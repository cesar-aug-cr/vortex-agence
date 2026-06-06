/**
 * French dictionary — source of truth for all UI copy.
 * Positioned for the Luxembourg B2B market: local proof, no public
 * pricing (qualification call), conversion-first language.
 */
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
    note: "Réponse sous 48 h · Audit offert · Sans engagement · 100% sur-mesure",
  },

  stats: [
    { value: "48 h", label: "Réponse garantie" },
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
        "Sites vitrines, landing pages et plateformes sur mesure en Next.js. Performance, design premium et tunnels de conversion intégrés.",
      bullets: [
        "Développement Next.js ultra-rapide",
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
    title: "Quatre étapes, zéro mauvaise surprise.",
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
    categories: [
      {
        name: "Marketing digital",
        items: [
          "Google Ads",
          "Meta Ads",
          "LinkedIn Ads",
          "Google Analytics 4",
          "Search Console",
          "Tag Manager",
          "Ahrefs",
          "Semrush",
        ],
      },
      {
        name: "Web & code",
        items: ["Next.js", "React", "TypeScript", "Tailwind", "WordPress"],
      },
      {
        name: "IA & automatisation",
        items: ["Claude", "ChatGPT", "Perplexity", "Zapier", "n8n"],
      },
      {
        name: "Design",
        items: ["Figma", "Photoshop", "Illustrator", "After Effects"],
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
      "Réponse en moins de 48 h",
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
      "Audit personnalisé sous 48 h",
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
      success: "Merci ! Nous vous répondons sous 48 h.",
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
  },

  // ---- Per-route metadata ----
  meta: {
    home: {
      title: "VorTX | Agence marketing & web à Luxembourg",
      description:
        "VorTX, agence marketing à Luxembourg : sites web qui convertissent, SEO & GEO, génération de leads et publicité en ligne. Audit gratuit, réponse sous 48 h.",
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
        "Réservez un appel découverte gratuit avec VorTX. Audit personnalisé sous 48 h, devis sans engagement. Agence marketing & web à Luxembourg.",
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
  },

  // ---- Standalone pages ----
  pages: {
    thanks: {
      title: "Merci, votre demande est bien partie.",
      lead: "Nous l'étudions et revenons vers vous sous 48 h ouvrées avec une première analyse — sans engagement.",
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
