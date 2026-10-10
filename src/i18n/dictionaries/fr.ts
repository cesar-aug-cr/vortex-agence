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
  | { type: "logo"; tipTitle?: string; tip?: string }
  | { type: "accordion"; title?: string; items: { q: string; a: string }[] }
  /** External authority references, rendered as a small "sources" box. */
  | { type: "sources"; title?: string; items: { label: string; href: string }[] };

/** One glossary entry. */
export type GlossaryTerm = {
  term: string;
  slug: string;
  category: string;
  short: string;
  def: string;
  /** Internal links to the matching service page / article (canonical paths). */
  links?: { href: string; label: string }[];
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
    quiz: "Quiz",
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
      design: "Design",
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
    titleLead: "Marketing & web au Luxembourg qui",
    titleAccent: "attire et convertit.",
    subtitle:
      "vortx conçoit des sites et des stratégies d'acquisition qui transforment l'attention en clients. Design premium, SEO de nouvelle génération, génération de leads mesurable.",
    primaryCta: "Réserver un appel découverte",
    secondaryCta: "Découvrir nos services",
    note: "Réponse rapide · Audit offert · Sans engagement · 100 % sur-mesure",
    // Proof card shown in the hero (desktop: bottom-right glass card; phones: last step).
    proof: {
      rows: [
        { label: "Réponse garantie", value: "Express" },
        { label: "Conçu sur mesure", value: "100 %" },
        { label: "Multilingue natif", value: "FR · DE · EN · LU" },
        { label: "Audit", value: "Offert" },
      ],
    },
  },

  stats: [
    { value: "Express", label: "Réponse garantie" },
    { value: "100 %", label: "Conçu sur mesure" },
    { value: "FR · DE · EN · LU", label: "Multilingue natif" },
  ],

  // ---- Trust / positioning band ----
  trust: {
    eyebrow: "Pourquoi vortx",
    title: "Votre partenaire de croissance au Luxembourg.",
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
      title: "Création de sites web au Luxembourg",
      tagline: "Des sites rapides, pensés pour transformer le visiteur en client.",
      short:
        "Sites vitrines, landing pages et plateformes 100 % sur mesure. Production accélérée par l'IA, design premium et tunnels de conversion intégrés.",
      bullets: [
        "Développement 100 % sur mesure",
        "Production accélérée par l'IA, livrée plus vite",
        "Design sur mesure, mobile-first",
        "Formulaires intelligents multi-étapes",
        "100 % responsive & accessible",
      ],
      metaTitle: "Création de sites web au Luxembourg | vortx",
      metaDescription:
        "Création de sites web au Luxembourg : des sites rapides, au design premium et orientés conversion. Développement Next.js, multilingue, SEO-ready.",
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
      group: "design",
      title: "Logo, Design, Branding & Identité de marque",
      tagline: "Un logo et une marque dont on se souvient.",
      short:
        "Logo sur mesure, identité visuelle complète et charte de marque. La cohérence qui inspire confiance avant même le premier mot.",
      bullets: [
        "Création de logo sur mesure",
        "Identité visuelle complète",
        "Charte graphique & règles d'usage",
        "Déclinaisons print & digital",
      ],
      metaTitle: "Logo, design, branding & identité de marque à Luxembourg | vortx",
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
    title: "Personne ne fait attention à vous.",
    lead: "Selon les études du secteur, une personne croise entre 4 000 et 10 000 publicités par jour. Pour sortir du lot, il faut être inoubliable. Et l'inoubliable, c'est justement notre métier.",
    problemTitle: "Sans système d'acquisition :",
    problems: [
      "Des opportunités qui passent inaperçues",
      "Un ROI marketing décevant",
      "Peu de visites, peu de contacts",
    ],
    solutionTitle: "Avec vortx :",
    solutions: [
      "Un site pensé pour convertir, livré vite",
      "Un tunnel clair : visiteur → lead → client",
      "Un budget marketing qui se justifie en chiffres",
    ],
    funnel: ["Visiteur", "Intéressé", "Prospect", "Client"],
    funnelBad: ["Visiteur", "Confus", "Parti", "Jamais revenu"],
  },

  // ---- Process ----
  process: {
    eyebrow: "Notre méthode",
    title: "L'ADN marketing, zéro mauvaise surprise.",
    steps: [
      {
        n: "01",
        icon: "process",
        title: "Diagnostic de la situation",
        desc: "On analyse vos objectifs et votre tunnel actuel pour bâtir une stratégie sur mesure.",
      },
      {
        n: "02",
        icon: "ai-build",
        title: "Conception & développement",
        desc: "Design premium et développement aux dernières technologies, avec les meilleures pratiques de conversion.",
      },
      {
        n: "03",
        icon: "ab-test",
        title: "Revue & ajustements",
        desc: "On vous présente le résultat et on ajuste jusqu'à ce que vous soyez pleinement satisfait.",
      },
      {
        n: "04",
        icon: "analytics",
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
    stat: { value: "50+", label: "outils maîtrisés" },
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
          "Ahrefs",
          "Semrush",
          "Google My Business",
          "Mailchimp",
          "SendGrid",
          "Resend",
        ],
      },
      {
        name: "Web & code",
        items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js", "WordPress", "Divi", "Elementor", "HTML", "CSS", "GitHub"],
      },
      {
        name: "IA & automatisation",
        items: [
          "Claude Code",
          "ChatGPT",
          "Perplexity",
          "Zapier",
          "n8n",
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
          "UI/UX",
          "Croquis",
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
    cta: { label: "Découvrir le GEO / GSO", href: "/services/seo-geo/geo-gso" },
    points: [
      {
        title: "Citations directes par l'IA",
        href: "/news/geo-seo-luxembourg-etre-cite-par-les-ia",
        desc: "Du contenu structuré pour être repris dans les réponses génératives.",
      },
      {
        title: "Schémas LLM-ready",
        href: "/glossaire#llms-txt",
        desc: "Données structurées et fichiers (llms.txt) qui parlent aux modèles.",
      },
      {
        title: "SEO & GEO intégrés",
        href: "/services/seo-geo",
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

  // ---- Réalisations page ----
  workPage: {
    eyebrow: "Réalisations",
    comingSoon: {
      title: "Pas de réalisations pour le moment.",
      text: "Nos études de cas sont en cours de rédaction avec nos clients. En attendant, parlons de votre projet : on vous présente volontiers nos travaux en appel.",
    },
    title: "Des projets concrets, pour des métiers concrets.",
    lead: "Garages, artisans, PME, produits web : voici ce qu'on conçoit et met en ligne. Chaque projet a un objectif clair — être trouvé, inspirer confiance, générer des demandes.",
    note: "Par transparence : les études de cas chiffrées (trafic, leads, conversions) sont en cours de rédaction avec nos clients. On vous les présente volontiers en appel.",
    caseEyebrow: "Étude de cas",
    contextLabel: "Le contexte",
    deliveredLabel: "Ce qu'on a livré",
    cases: [
      {
        slug: "garage-biver",
        name: "Garage Martin Biver",
        sector: "Garage automobile · Luxembourg",
        tags: ["Site vitrine", "Prise de RDV en ligne", "Multimarque"],
        context:
          "Un garage familial, partenaire automobile depuis 1926, distributeur Volkswagen, Škoda et Audi. Un siècle de confiance — et le besoin d'une présence en ligne à la hauteur, avec un moyen simple de prendre rendez-vous.",
        delivered:
          "Un site vitrine clair qui présente les marques et les prestations de l'atelier, avec prise de rendez-vous en ligne. Le client trouve l'info, comprend l'offre et réserve son créneau — sans décrocher son téléphone.",
      },
      {
        slug: "vitrophy",
        name: "Vitrophy",
        sector: "Gravure & personnalisation · B2B",
        tags: ["Site vitrine", "Identité visuelle", "Positionnement B2B"],
        context:
          "Vitrophy grave et personnalise des produits en fabrication locale, pour une clientèle avant tout professionnelle. Il fallait un site qui reflète ce savoir-faire et parle aux entreprises.",
        delivered:
          "Un site vitrine à l'identité sombre et émeraude, distinctive, avec un positionnement B2B lisible dès la première page : ce que Vitrophy fabrique, pour qui, et comment demander un devis.",
      },
      {
        slug: "cim-by-cacr",
        name: "CIM by CACR",
        sector: "Application web · SaaS",
        tags: ["Web app", "IA", "Branding"],
        context:
          "Créer une identité de marque prend des semaines et coûte cher. CIM promet l'essentiel en quelques minutes : l'utilisateur charge son logo, l'outil fait le reste.",
        delivered:
          "Une application web complète : upload du logo, extraction automatique des couleurs et manuel de marque PDF généré avec l'aide de l'IA — le tout dans une interface produit sombre et soignée.",
      },
    ],
    projects: [
      {
        slug: "pauly-losch",
        name: "Garage Pauly-Losch",
        sector: "Garage automobile · Luxembourg",
        tags: ["Site vitrine", "Ancrage local"],
        summary:
          "Plus de 70 ans d'expérience VW, Audi, Škoda et VW Utilitaires — et un accueil en luxembourgeois, « Wëllkomm ». Un site vitrine fidèle à l'esprit maison.",
      },
      {
        slug: "autodis",
        name: "Autodis Luxembourg",
        sector: "Distribution automobile · Esch-sur-Alzette & Mersch",
        tags: ["Site vitrine", "Catalogue de marques"],
        summary:
          "Distributeur multimarque (BAIC, JAC, Forthing, DFM, Borgward…). Un site avec carrousel de nouveautés, catalogue de marques et présentation des prestations.",
      },
      {
        slug: "isomontage",
        name: "Isomontage Isolation",
        sector: "Isolation · Bâtiment",
        tags: ["Site vitrine"],
        summary:
          "Un site vitrine qui présente les services d'isolation de l'entreprise, simplement et clairement.",
      },
      {
        slug: "blumenthal",
        name: "Blumenthal",
        sector: "Jardinage & hydroculture",
        tags: ["Site vitrine", "Design sur mesure"],
        summary:
          "Jardinage et hydroculture méritaient un écrin : un site vitrine au design frais et naturel, à l'image du métier.",
      },
      {
        slug: "lux-habitat",
        name: "Lux Habitat",
        sector: "Charpente & toiture · Luxembourg",
        tags: ["Site vitrine", "Mobile-first"],
        summary:
          "Un charpentier au Luxembourg, un site vitrine mobile-first : pensé pour le client qui cherche un artisan depuis son téléphone.",
      },
      {
        slug: "momento-relojero",
        name: "Momento Relojero",
        sector: "Média éditorial · Horlogerie",
        tags: ["Site éditorial", "Design premium"],
        summary:
          "Un guide de l'horlogerie en espagnol — mécanique, histoire, collectionnisme — porté par un design premium noir et or.",
      },
    ],
  },

  // ---- FAQ ----
  faq: {
    eyebrow: "Questions fréquentes",
    title: "Ce que les clients demandent avant de démarrer.",
    allCta: "Voir toutes les questions",
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
        a: "C'est l'optimisation pour les moteurs de réponse IA (ChatGPT, Claude, Perplexity, Google AI). On structure votre contenu pour que les IA vous citent comme source.",
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
    title: "Soyez la référence au Luxembourg quand *vos clients* cherchent.",
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
      sending: "Passage en hypervitesse…",
      success: "Merci ! Nous revenons vers vous très vite.",
      step: "Étape",
      next: "Suivant",
      back: "Retour",
      stepServices: "Vos besoins",
      stepDetails: "Vos coordonnées",
      stepMessage: "Votre message",
      servicesLabel: "Quels services vous intéressent ?",
      servicesHint: "Sélectionnez un ou plusieurs services.",
      serviceGraphic: "Graphic Design",
      serviceOther: "Autre",
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

  // ---- Quiz page (fun marketing quiz → contact) ----
  quiz: {
    eyebrow: "Quiz",
    title: "Testez votre QI marketing",
    lead: "10 questions tirées au hasard, 0 pitié. Marketing, web, SEO, pub, IA… jusqu'où irez-vous ?",
    intro: "Le principe : 10 questions, une note sur 10, et un verdict (parfois piquant). On apprend un truc à chaque réponse. Prêt ?",
    start: "Commencer le quiz",
    questionLabel: "Question",
    next: "Question suivante",
    finish: "Voir mon score",
    correct: "Bonne réponse !",
    wrong: "Raté !",
    didYouKnow: "Le saviez-vous ?",
    scorePrefix: "Votre score",
    replay: "Rejouer",
    share: "Partager mon score",
    shareDone: "Lien copié !",
    shareText: "J'ai eu {score}/{total} au quiz marketing de vortx. À votre tour 👇",
    ctaSecondary: "Voir tous les services",
    certificate: "Télécharger mon certificat",
    nameLabel: "Votre nom sur le certificat",
    namePlaceholder: "Prénom Nom",
    cert: {
      heading: "Certificat",
      subheading: "de QI Marketing",
      awardedTo: "Décerné à",
      scoreLabel: "Score obtenu",
      dateLabel: "Délivré le",
      footer: "vortx · Marketing, web & AI",
    },
    tiers: [
      { min: 0, max: 3, emoji: "🌱", title: "Le digital, c'est pas (encore) votre truc", message: "Et c'est normal — c'est notre métier, pas le vôtre. Laissez-nous nous en occuper.", cta: "Confiez-le à des pros — audit gratuit" },
      { min: 4, max: 6, emoji: "🧭", title: "Bonnes bases, quelques angles morts", message: "Vous savez où vous allez ; on éclaire le reste et on accélère.", cta: "Comblons les lacunes — parlons stratégie" },
      { min: 7, max: 8, emoji: "🚀", title: "Vous connaissez la musique", message: "Solide ! Reste à transformer ce savoir en résultats concrets.", cta: "Passez à l'action — devis sans engagement" },
      { min: 9, max: 9, emoji: "🏆", title: "Quasi sans-faute, chapeau", message: "Impressionnant. On adore les profils (et les clients) exigeants.", cta: "Challengez-nous — réserver un appel" },
      { min: 10, max: 10, emoji: "👑", title: "Score parfait — vous bluffez ?", message: "Soit vous êtes redoutable, soit vous êtes des nôtres. Discutons.", cta: "On collabore — contactez-nous" },
    ],
  },

  // ---- Floating chat widget (same flow as the contact form) ----
  chat: {
    open: "Ouvrir le chat",
    close: "Fermer le chat",
    title: "vortx",
    subtitle: "On vous répond vite",
    greeting:
      "Bonjour 👋 Dites-nous ce dont vous avez besoin — on revient vers vous très vite, sans engagement.",
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
          { label: "Logo, Design, Branding & Identité de marque", href: "/services/branding-design" },
          { label: "Automatisation & IA", href: "/services/automatisation-ia" },
        ],
      },
      company: {
        title: "Agence",
        links: [
          { label: "À propos", href: "/agence" },
          { label: "Notre méthode", href: "/approche" },
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
          { label: "CGV", href: "/docs/cgv-vortx-2026-10-02.pdf" },
        ],
      },
    },
    contactTitle: "Contact",
    location: "Luxembourg",
    rights: "Tous droits réservés.",
    madeWith: "Conçu avec amour et beaucoup d'IA.",
    backToTop: "Retour en haut",
  },

  // ---- Agence (about) page ----
  agence: {
    eyebrow: "L'agence",
    title: "Une équipe d'attraction, au service de votre croissance.",
    lead: "vortx réunit le marketing, le design et la technologie sous un même toit, à Luxembourg. Une obsession : transformer l'attention en clients, et le prouver en chiffres.",
    story: [
      "vortx est né d'un constat simple : trop d'entreprises luxembourgeoises ont un site qui ressemble à une brochure — joli, mais qui ne rapporte rien. On construit l'inverse : des présences digitales pensées comme des machines d'acquisition. L'agence est une SARL-S basée à Luxembourg-ville, au 18 rue de l'Ouest, qui réunit marketing, design et technologie sous un même toit — sans sous-traitance en cascade, sans perte en ligne entre la stratégie et l'exécution.",
      "Derrière l'agence, une équipe qui cumule plus d'une décennie d'expérience en marketing digital, développement web et direction artistique. On a vu les modes passer ; on garde ce qui convertit, on jette le reste. Cette double culture — celle du marketeur qui pense tunnel de vente et celle du développeur qui pense performance — fait qu'on ne livre jamais un site « joli mais creux », ni une stratégie impossible à exécuter.",
      "Concrètement, on couvre six métiers : des sites web conçus pour convertir, le référencement SEO & GEO, la génération de leads, la publicité en ligne, le branding et l'automatisation IA. Nos clients sont des garages, des artisans, des PME de services et des produits web — des entreprises qui n'ont pas besoin d'un rapport de cent pages, mais de demandes de devis qui arrivent chaque semaine.",
      "Notre philosophie tient en trois principes. La conversion mesurable d'abord : pas de vanity metrics, chaque euro investi doit être relié à un résultat — un appel, un devis, un client. La stratégie avant le template ensuite : on part de votre tunnel de vente, pas d'un thème acheté sur étagère. La propriété totale enfin : le code, les contenus et les accès vous appartiennent à 100 %, sans enfermement.",
      "On est ancrés dans la réalité du marché luxembourgeois : vos clients comparent en français, en allemand et en anglais — et de plus en plus en espagnol. On conçoit donc chaque présence en multilingue natif, conforme au RGPD, et pensée pour rayonner sur toute la Grande Région, pas seulement dans la capitale.",
      "Enfin, vortx est une agence native IA. On utilise l'intelligence artificielle pour concevoir et produire plus vite — toujours relu et finalisé par des humains — et on optimise vos contenus pour la nouvelle porte d'entrée du web : être cité par ChatGPT, Perplexity ou Google AI quand vos clients leur posent une question. C'est le GEO, et on l'intègre dès la première ligne de chaque projet.",
    ],
    experience: {
      suffix: "ans",
      label: "d'expérience cumulée",
      note: "marketing · web · design",
    },
    stats: [
      { value: "100 %", label: "Sur mesure, jamais de template" },
      { value: "4 langues", label: "FR · DE · EN · ES" },
      { value: "6 métiers", label: "Sites web, SEO & GEO, leads, pub, branding & design graphique, IA" },
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
    summaryShow: "Afficher le résumé",
    summaryHide: "Masquer le résumé",
    linksTitle: "Pour aller plus loin",
    allCategories: "Tous les sujets",
    filterLabel: "Filtrer par sujet",
    emptyLabel: "Aucun article pour ce sujet pour le moment.",
    articleCtaTitle: "Un projet en tête ?",
    articleCtaText:
      "Discutons-en. Recevez un devis clair et sans engagement pour votre site ou votre stratégie d'acquisition.",
    articleCtaButton: "Demander un devis",
    shareLabel: "Partager",
    shareCopy: "Copier le lien",
    shareCopied: "Lien copié !",
    // One animated cover icon per category (8 categories, 8 icons): an article
    // reuses the icon of its category. Automatisation & IA → "automation".
    articles: [
      {
        slug: "ux-ui-design-site-qui-convertit-bonnes-pratiques",
        category: "UX & Design",
        title:
          "UX/UI : les principes de design qui transforment un visiteur en client",
        excerpt:
          "Un beau site ne suffit pas : il doit guider, rassurer et convertir. Voici les principes UX et UI que nous appliquons sur chaque projet vortx — hiérarchie, clarté, accessibilité, performance — illustrés par ce site lui-même.",
        metaDescription:
          "Hiérarchie, clarté, accessibilité, performance : les principes UX/UI qui transforment un visiteur en client. Guide concret par vortx, agence web à Luxembourg.",
        date: "2026-06-15",
        updated: "2026-06-15",
        readingMinutes: 8,
        author: "L'équipe vortx",
        cover: "redesign",
        coverImage: "/news/ux-ui-design-site-qui-convertit-bonnes-pratiques.webp",
        summary: {
          text: "L'UX organise le parcours, l'UI habille l'interface : ensemble, ils décident si un visiteur agit ou repart. L'article détaille les principes concrets (hiérarchie visuelle, charge cognitive, un objectif par page, cohérence, contraste, accessibilité, performance) et montre comment ils sont appliqués sur le site vortx.",
          points: [
            "L'UX guide le parcours, l'UI inspire confiance — les deux servent la conversion.",
            "Hiérarchie claire, un seul objectif par page et feedback immédiat font la différence.",
            "Accessibilité et performance ne sont pas des options : elles font partie de l'UX.",
          ],
        },
        links: [
          { label: "Nos sites web qui convertissent", href: "/services/sites-web", desc: "Design sur mesure, mobile-first et orienté conversion." },
          { label: "Logo, Design, Branding & Identité de marque", href: "/services/branding-design", desc: "L'identité visuelle qui nourrit une UI cohérente." },
          { label: "Glossaire du marketing & du web", href: "/glossaire", desc: "UX/UI, taux de conversion, Core Web Vitals… expliqués simplement." },
        ],
        body: [
          {
            type: "p",
            text: "On confond souvent « joli site » et « bon site ». Un site peut être superbe et ne rien vendre ; un autre, plus sobre, peut transformer un visiteur sur dix en demande de devis. La différence se joue sur le design d'expérience — l'UX — et le design d'interface — l'UI. L'un organise le parcours, l'autre l'habille. Ensemble, ils décident si l'internaute agit ou referme l'onglet.",
          },
          {
            type: "h2",
            id: "ux-ui-difference",
            text: "UX et UI : deux métiers, un seul objectif",
          },
          {
            type: "p",
            text: "L'UX (User Experience) répond à « est-ce facile ? » : trouve-t-on l'information, comprend-on quoi faire, atteint-on son but sans friction ? L'UI (User Interface) répond à « est-ce clair et crédible ? » : couleurs, typographies, espacements, composants. Une UX impeccable avec une UI bâclée inspire la méfiance ; une UI léchée sans UX se traduit par de jolies pages où personne ne convertit.",
          },
          {
            type: "callout",
            title: "En une phrase",
            text: "L'UX décide où va le visiteur. L'UI lui donne envie d'y aller. La conversion naît quand les deux pointent dans la même direction.",
          },
          {
            type: "h2",
            id: "principes-ux",
            text: "Les principes UX qui font convertir",
          },
          {
            type: "h3",
            text: "1. Une hiérarchie visuelle qui guide l'œil",
          },
          {
            type: "p",
            text: "Le regard doit savoir où aller en une seconde : un titre fort, un sous-titre qui précise, puis l'action attendue. Sur ce site, chaque section suit le même schéma — un « eyebrow » discret, un grand titre, un texte de soutien, puis un bouton. C'est cette répétition d'un même rythme qui rend la lecture sans effort.",
          },
          {
            type: "h3",
            text: "2. Un seul objectif par page",
          },
          {
            type: "p",
            text: "Une page qui demande tout n'obtient rien. Chaque écran doit avoir une action principale claire — réserver un appel, demander un devis — et tout le reste lui est subordonné. C'est pourquoi nos pages de service mènent toutes au même appel à l'action, et nos landing pages suppriment jusqu'au menu pour ne garder qu'un chemin.",
          },
          {
            type: "h3",
            text: "3. Réduire la charge cognitive",
          },
          {
            type: "ul",
            items: [
              "Des phrases courtes, du vocabulaire concret, zéro jargon inutile.",
              "Des formulaires découpés en étapes plutôt qu'un mur de champs : notre formulaire de contact en trois temps qualifie sans décourager.",
              "Des choix limités : trop d'options paralyse (paradoxe du choix).",
            ],
          },
          {
            type: "h3",
            text: "4. Du feedback immédiat",
          },
          {
            type: "p",
            text: "Chaque action doit produire une réaction visible : un bouton qui réagit au survol, un état de chargement, une confirmation après l'envoi. Sans retour, l'utilisateur doute — et le doute tue la conversion. Les micro-interactions (un indice qui clignote une fois, une flèche qui glisse au survol) ne sont pas décoratives : elles disent « c'est cliquable, continue ».",
          },
          {
            type: "h3",
            text: "5. Mobile-first, pour de vrai",
          },
          {
            type: "p",
            text: "Au Luxembourg, l'essentiel du trafic arrive sur mobile. On conçoit donc d'abord pour le petit écran — zones tactiles généreuses, contenu prioritaire en haut, navigation au pouce — puis on enrichit vers le desktop. L'inverse produit des sites « réduits » sur mobile, là où se prend pourtant la décision.",
          },
          {
            type: "h2",
            id: "principes-ui",
            text: "Les principes UI : la couche qui inspire confiance",
          },
          {
            type: "h3",
            text: "Cohérence : un design system, pas des pages au cas par cas",
          },
          {
            type: "p",
            text: "Une marque crédible se reconnaît à sa cohérence. On travaille avec un système de design — couleurs, typographies, espacements, composants réutilisables — pour que chaque page semble issue de la même main. Ici, une palette resserrée (un lime électrique, un teal, un fond sombre « stage ») et un seul jeu de composants tiennent tout le site ensemble.",
          },
          {
            type: "h3",
            text: "Contraste et lisibilité",
          },
          {
            type: "p",
            text: "Le contraste n'est pas qu'esthétique, c'est de l'accessibilité : un texte gris clair sur blanc exclut une partie de vos visiteurs. On vise les ratios recommandés (WCAG AA), des tailles de texte confortables et des zones d'action bien détachées du fond.",
          },
          {
            type: "h3",
            text: "L'espace blanc travaille pour vous",
          },
          {
            type: "p",
            text: "Le vide n'est pas perdu : il met en valeur ce qui compte. De l'air autour d'un titre, d'un bouton ou d'un prix attire l'attention dessus. Entasser, au contraire, dilue le message. Un design premium se reconnaît souvent à ce qu'il a retiré, pas à ce qu'il a ajouté.",
          },
          {
            type: "h3",
            text: "Le mouvement, à dose homéopathique",
          },
          {
            type: "p",
            text: "Une animation bien placée oriente le regard et donne de la vie ; trop d'effets fatiguent et ralentissent. Nos illustrations vectorielles animées et nos transitions restent subtiles — et se coupent automatiquement pour les visiteurs qui ont activé « réduire les animations » dans leur système.",
          },
          {
            type: "h2",
            id: "accessibilite",
            text: "L'accessibilité n'est pas une option",
          },
          {
            type: "p",
            text: "Un site accessible est un site utilisable par le plus grand nombre — et c'est aussi un meilleur site pour tout le monde. Navigation au clavier, contrastes suffisants, structure sémantique (titres hiérarchisés, balises correctes), textes alternatifs : ce sont les fondations. Ce site va plus loin avec un widget d'accessibilité qui permet d'ajuster taille du texte, espacement, contraste et animations à la volée.",
          },
          {
            type: "quote",
            text: "Concevoir pour les cas limites, c'est concevoir mieux pour tout le monde.",
          },
          {
            type: "h2",
            id: "performance-ux",
            text: "La performance fait partie de l'UX",
          },
          {
            type: "p",
            text: "Le plus beau design ne sert à rien s'il met trois secondes à s'afficher. La vitesse est une composante directe de l'expérience : chaque centième de seconde gagné réduit l'abandon et améliore le référencement (les Core Web Vitals sont un critère Google). On construit des sites quasi instantanés — images optimisées, code léger, technologies modernes — parce qu'un site rapide convertit davantage, point.",
          },
          {
            type: "ul",
            items: [
              "Chargement rapide : moins d'abandon, meilleur SEO.",
              "Stabilité visuelle : pas d'éléments qui sautent pendant le chargement.",
              "Réactivité au clic : l'interface répond sans latence perceptible.",
            ],
          },
          {
            type: "h2",
            id: "vortx-application",
            text: "Comment on applique tout ça chez vortx",
          },
          {
            type: "p",
            text: "Ces principes ne sont pas théoriques : ils façonnent ce site. La hiérarchie répétée de chaque section, le fond sombre qui fait ressortir les contenus clés, la palette resserrée, les icônes animées qui restent sobres, le formulaire en plusieurs étapes, le widget d'accessibilité, la version multilingue pensée langue par langue — chaque détail sert la même chose : aider le visiteur à comprendre, à se sentir en confiance, et à passer à l'action.",
          },
          {
            type: "sources",
            title: "Sources & références",
            items: [
              { label: "Core Web Vitals — web.dev (Google)", href: "https://web.dev/vitals" },
              { label: "Accessibilité WCAG — W3C Web Accessibility Initiative", href: "https://www.w3.org/WAI/" },
            ],
          },
          {
            type: "p",
            text: "C'est exactement la méthode qu'on applique à votre projet : on part de votre objectif de conversion, pas d'un template. Le résultat est un site qui n'est pas seulement beau — il travaille pour vous.",
          },
        ],
      },
      {
        slug: "geo-seo-luxembourg-etre-cite-par-les-ia",
        category: "SEO & GEO",
        title:
          "SEO vs GEO : comment être trouvé sur Google ET cité par les IA en 2026",
        excerpt:
          "Le référencement ne se joue plus seulement sur Google. ChatGPT, Perplexity et Google AI deviennent la nouvelle porte d'entrée. Voici comment le SEO et le GEO travaillent ensemble — et ce qu'il faut faire concrètement.",
        metaDescription:
          "SEO et GEO en 2026 : être trouvé sur Google et cité par ChatGPT ou Perplexity. La méthode concrète de vortx pour les entreprises luxembourgeoises.",
        date: "2026-06-02",
        updated: "2026-06-02",
        readingMinutes: 9,
        author: "L'équipe vortx",
        cover: "geo-citation",
        coverImage: "/news/geo-seo-luxembourg-etre-cite-par-les-ia.webp",
        summary: {
          text: "Le référencement ne se limite plus à Google : ChatGPT, Perplexity et Google AI deviennent une nouvelle porte d'entrée. L'article explique la différence entre SEO et GEO et comment travailler les deux ensemble, avec des actions concrètes pour être cité par les IA.",
          points: [
            "Le SEO vous classe dans les résultats ; le GEO vous place dans la réponse de l'IA.",
            "Structurez vos pages en question/réponse et ancrez-les dans des faits locaux pour être cités.",
            "Selon notre pratique, environ 80 % du travail est commun : un bon contenu performe sur Google ET auprès des modèles.",
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
            text: "Bonne nouvelle : d'après notre expérience sur les deux fronts, environ 80 % du travail est commun. Un contenu structuré, rapide, fiable et bien balisé performe à la fois sur Google et auprès des modèles. On ne sacrifie pas l'un pour l'autre — on conçoit dès le départ pour les deux.",
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
            type: "sources",
            title: "Sources & références",
            items: [
              { label: "Google Search Essentials — Google Search Central", href: "https://developers.google.com/search" },
            ],
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
        metaDescription:
          "Google Ads ou SEO : lequel choisir, quand, et pour quel objectif ? Le comparatif sans jargon pour investir votre budget marketing au bon endroit en 2026.",
        date: "2026-06-04",
        updated: "2026-06-04",
        readingMinutes: 8,
        author: "L'équipe vortx",
        cover: "ads-targeting",
        coverImage: "/news/google-ads-ou-seo-ou-investir-budget-marketing.webp",
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
            type: "sources",
            title: "Sources & références",
            items: [
              { label: "Aide officielle Google Ads", href: "https://support.google.com/google-ads" },
              { label: "Google Search Essentials — Google Search Central", href: "https://developers.google.com/search" },
            ],
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
        metaDescription:
          "Le tunnel de conversion, du premier clic au contrat signé : les étapes, les erreurs qui coûtent des ventes et la méthode pour convertir plus de visiteurs.",
        date: "2026-06-07",
        updated: "2026-06-07",
        readingMinutes: 7,
        author: "L'équipe vortx",
        cover: "conversion",
        coverImage: "/news/tunnel-de-conversion-transformer-visiteurs-en-clients.webp",
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
        metaDescription:
          "Combien coûte un site web au Luxembourg en 2026 ? Ce qui fait varier le prix, où investir vraiment — et comment obtenir un devis précis, gratuitement.",
        date: "2026-06-08",
        updated: "2026-06-08",
        readingMinutes: 7,
        author: "L'équipe vortx",
        cover: "analytics",
        coverImage: "/news/combien-coute-un-site-web-luxembourg-2026.webp",
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
              "Un développement 100 % sur mesure, adapté à votre activité.",
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
            type: "sources",
            title: "Sources & références",
            items: [
              { label: "Core Web Vitals — web.dev (Google)", href: "https://web.dev/vitals" },
            ],
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
        metaDescription:
          "Qu'est-ce qu'un bon logo ? Simplicité, mémorabilité, pertinence : les principes d'une identité qui dure — et les erreurs qui trahissent une marque.",
        date: "2026-06-08",
        updated: "2026-06-08",
        readingMinutes: 6,
        author: "L'équipe vortx",
        cover: "branding",
        coverImage: "/news/quest-ce-quun-bon-logo-identite-qui-dure.webp",
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
          {
            type: "logo",
            tipTitle: "Pourquoi ce double cercle dans le « o » ?",
            tip: "Deux raisons. D'abord la lisibilité : sans lui, le « o » pourrait passer pour un point — « v•rtx » au lieu de « vortx ». Le cercle ancre la lettre et garde le nom net.\n\nEnsuite le sens : du grand cercle vers le petit, la forme dessine un entonnoir — un tourbillon (vortex) qui aspire les prospects et les transforme en clients, jusqu'au cœur de la marque.",
          },
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
            type: "accordion",
            title: "Pourquoi nos couleurs ? Le dégradé lime → cyan, décodé",
            items: [
              {
                q: "Le message : fraîcheur, croissance et technologie",
                a: "Notre vert lime tranche volontairement avec le bleu corporate qu'on voit partout : il évoque l'énergie, l'élan et la croissance — bref, le retour sur investissement. La bascule vers le cyan turquoise, elle, renvoie à l'univers tech : startups, logiciel, automatisation du marketing. Ensemble, ils signent une marque moderne, vivante et résolument digitale.",
              },
              {
                q: "Le positionnement : créatif et à contre-courant",
                a: "Cette palette nous éloigne des agences classiques et interchangeables. Elle annonce des stratégies originales, qui sortent du lot, et parle naturellement aux secteurs qui bougent — tech, e-commerce, applications mobiles — comme aux marques qui s'adressent aux Millennials et à la Gen Z.",
              },
              {
                q: "La force à l'écran : impact et fluidité",
                a: "Une telle luminosité accroche l'œil instantanément, même dans un fil social saturé. Et parce que c'est un dégradé doux, il suggère la fluidité : l'adaptabilité face aux changements d'algorithmes et l'agilité de nos process. Le fond, dit par la forme.",
              },
            ],
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
        metaDescription:
          "RGPD et cookies sur votre site au Luxembourg : bandeau, consentement, mentions légales — l'essentiel en règles claires pour être conforme sans stress.",
        date: "2026-06-08",
        updated: "2026-06-08",
        readingMinutes: 6,
        author: "L'équipe vortx",
        cover: "rgpd",
        coverImage: "/news/rgpd-cookies-site-web-luxembourg.webp",
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
            type: "sources",
            title: "Sources & références",
            items: [
              { label: "CNPD — Commission nationale pour la protection des données (Luxembourg)", href: "https://cnpd.public.lu" },
              { label: "Texte du RGPD — Règlement (UE) 2016/679 (EUR-Lex)", href: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" },
            ],
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
        metaDescription:
          "5 tâches à confier à l'IA dès aujourd'hui dans votre PME luxembourgeoise : réponses, tri des leads, relances, contenu, synchronisation. Sans usine à gaz.",
        date: "2026-06-08",
        updated: "2026-06-08",
        readingMinutes: 6,
        author: "L'équipe vortx",
        cover: "automation",
        coverImage: "/news/5-taches-pme-confier-a-l-ia.webp",
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
            text: "Un chatbot bien conçu répond 24/7 aux questions courantes (horaires, services, devis) et oriente le visiteur, sans mobiliser personne.",
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
            type: "sources",
            title: "Sources & références",
            items: [
              { label: "CNPD — protection des données au Luxembourg", href: "https://cnpd.public.lu" },
              { label: "Luxinnovation — accompagnement à la digitalisation des PME", href: "https://www.luxinnovation.lu" },
            ],
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
        metaDescription:
          "IA pour les PME au Luxembourg : la feuille de route 2026 pour démarrer sans budget tech — bons cas d'usage, pièges à éviter, données sous contrôle.",
        date: "2026-06-09",
        updated: "2026-06-09",
        readingMinutes: 7,
        author: "L'équipe vortx",
        cover: "automation",
        coverImage: "/news/ia-pme-luxembourg-par-ou-commencer.webp",
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
            type: "sources",
            title: "Sources & références",
            items: [
              { label: "CNPD — protection des données au Luxembourg", href: "https://cnpd.public.lu" },
              { label: "Luxinnovation — accompagnement à la digitalisation des PME", href: "https://www.luxinnovation.lu" },
            ],
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
      /** SEO meta description (140–160 chars). */
      metaDescription: string;
      date: string;
      updated?: string;
      readingMinutes: number;
      author: string;
      cover: string;
      /** Realistic cover photo, public/news/<slug>.webp (band on the article, card on /news). */
      coverImage?: string;
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
    tocTitle: "Sommaire",
    countSuffix: "termes",
    emptyLabel: "Aucun terme ne correspond à votre recherche.",
    ctaTitle: "Un terme vous échappe encore ?",
    terms: [
      {
        term: "SEO (référencement naturel)",
        slug: "seo",
        category: "SEO & GEO",
        short: "Être trouvé gratuitement sur Google.",
        def: "Le Search Engine Optimization regroupe les techniques qui améliorent la position d'un site dans les résultats naturels (non payants) des moteurs de recherche : qualité technique, contenu pertinent, autorité et expérience utilisateur. Au Luxembourg, il se travaille en trois langues : vos clients comparent en français, en allemand et en anglais.",
        links: [
          { href: "/services/seo-geo/seo", label: "Notre service SEO" },
          { href: "/news/google-ads-ou-seo-ou-investir-budget-marketing", label: "Lire : Google Ads ou SEO ?" },
        ],
      },
      {
        term: "GEO / GSO",
        slug: "geo-gso",
        category: "SEO & GEO",
        short: "Être cité par les IA génératives.",
        def: "La Generative Engine Optimization (ou Generative Search Optimization) optimise votre contenu pour qu'il soit repris et cité comme source par les moteurs de réponse IA (ChatGPT, Perplexity, Google AI). L'objectif : être la réponse, pas seulement un lien. Bonne nouvelle : l'essentiel des bonnes pratiques est commun avec le SEO — on travaille les deux fronts ensemble.",
        links: [
          { href: "/services/seo-geo/geo-gso", label: "Notre service GEO / GSO" },
          { href: "/news/geo-seo-luxembourg-etre-cite-par-les-ia", label: "Lire : être cité par les IA" },
        ],
      },
      {
        term: "SERP",
        slug: "serp",
        category: "SEO & GEO",
        short: "La page de résultats de Google.",
        def: "Search Engine Results Page : la page qui affiche les résultats d'une recherche. Elle mêle liens naturels, annonces, extraits enrichis, et de plus en plus de réponses générées par IA. Y occuper le haut se joue sur deux leviers complémentaires : le SEO pour le naturel, le SEA pour le payant.",
        links: [
          { href: "/services/seo-geo", label: "Notre service SEO & GEO" },
          { href: "/services/publicite/google-ads", label: "Nos campagnes Google Ads" },
        ],
      },
      {
        term: "Mot-clé",
        slug: "mot-cle",
        category: "SEO & GEO",
        short: "Ce que tapent vos clients.",
        def: "Terme ou expression qu'un internaute saisit dans un moteur de recherche. Le SEO consiste en partie à identifier les mots-clés rentables et à structurer le contenu autour d'eux. Sur un marché multilingue comme le Luxembourg, on les étudie en FR, DE et EN — les volumes et la concurrence diffèrent d'une langue à l'autre.",
        links: [
          { href: "/services/seo-geo/seo", label: "Notre service SEO" },
          { href: "/services/publicite/google-ads", label: "Cibler les bons mots-clés en Ads" },
        ],
      },
      {
        term: "Backlink",
        slug: "backlink",
        category: "SEO & GEO",
        short: "Un lien d'un autre site vers le vôtre.",
        def: "Lien entrant depuis un site tiers. Les backlinks de qualité signalent aux moteurs que votre site fait autorité, ce qui améliore le référencement. Cette autorité compte aussi pour le GEO : les IA s'appuient sur ce qui se dit de vous ailleurs.",
        links: [
          { href: "/services/seo-geo/seo", label: "Notre service SEO" },
          { href: "/news/geo-seo-luxembourg-etre-cite-par-les-ia", label: "Lire : construire l'autorité pour les IA" },
        ],
      },
      {
        term: "Données structurées (Schema.org)",
        slug: "donnees-structurees",
        category: "SEO & GEO",
        short: "Du code qui explique votre contenu aux machines.",
        def: "Balisage standardisé ajouté au code d'une page pour décrire son contenu (entreprise, service, article, FAQ…). Il aide Google et les IA à comprendre et à mettre en avant vos informations. C'est l'un des livrables de base de tout travail GEO sérieux.",
        links: [
          { href: "/services/seo-geo/geo-gso", label: "Notre service GEO / GSO" },
          { href: "/news/geo-seo-luxembourg-etre-cite-par-les-ia", label: "Lire : rendre son site lisible par les IA" },
        ],
      },
      {
        term: "llms.txt",
        slug: "llms-txt",
        category: "SEO & GEO",
        short: "Un résumé de votre site pour les IA.",
        def: "Fichier texte placé à la racine d'un site pour présenter, de façon structurée, son offre et ses contenus clés aux grands modèles de langage. Un levier émergent du GEO, qui fait partie de nos livrables standards.",
        links: [
          { href: "/services/seo-geo/geo-gso", label: "Notre service GEO / GSO" },
          { href: "/news/geo-seo-luxembourg-etre-cite-par-les-ia", label: "Lire : SEO vs GEO en 2026" },
        ],
      },
      {
        term: "Tunnel de conversion",
        slug: "tunnel-de-conversion",
        category: "Conversion",
        short: "Le chemin du visiteur jusqu'au client.",
        def: "Suite d'étapes par lesquelles passe un visiteur avant de devenir client (découverte → intérêt → contact → achat). On l'optimise pour réduire les abandons à chaque étape. Une seule étape qui fuit plombe tout le tunnel — d'où l'intérêt de mesurer chaque maillon.",
        links: [
          { href: "/services/lead-generation/tunnels-de-conversion", label: "Nos tunnels de conversion" },
          { href: "/news/tunnel-de-conversion-transformer-visiteurs-en-clients", label: "Lire : transformer vos visiteurs en clients" },
        ],
      },
      {
        term: "Taux de conversion",
        slug: "taux-de-conversion",
        category: "Conversion",
        short: "Le % de visiteurs qui passent à l'action.",
        def: "Pourcentage de visiteurs qui réalisent l'action souhaitée (demande de devis, achat, inscription). Indicateur central de l'efficacité d'un site ou d'une campagne : le doubler revient à doubler vos leads sans acheter plus de trafic.",
        links: [
          { href: "/services/lead-generation", label: "Notre service Génération de leads" },
          { href: "/news/tunnel-de-conversion-transformer-visiteurs-en-clients", label: "Lire : le tunnel de conversion" },
        ],
      },
      {
        term: "Landing page",
        slug: "landing-page",
        category: "Conversion",
        short: "Une page faite pour une seule action.",
        def: "Page d'atterrissage conçue autour d'un objectif unique (souvent lié à une campagne) : convertir le visiteur en lead ou en client, sans distraction. On y supprime parfois jusqu'au menu pour ne garder qu'un seul chemin vers l'action.",
        links: [
          { href: "/services/sites-web/landing-pages", label: "Nos landing pages" },
          { href: "/services/lead-generation/landing-pages-campagne", label: "Landing pages de campagne" },
        ],
      },
      {
        term: "Call-to-action (CTA)",
        slug: "cta",
        category: "Conversion",
        short: "Le bouton qui invite à agir.",
        def: "Élément (bouton, lien) qui incite le visiteur à passer à l'étape suivante : « Réserver un appel », « Obtenir un devis ». Sa clarté et sa visibilité influencent fortement la conversion. Règle d'or : un objectif par page, un CTA principal.",
        links: [
          { href: "/services/lead-generation", label: "Notre service Génération de leads" },
          { href: "/news/ux-ui-design-site-qui-convertit-bonnes-pratiques", label: "Lire : l'UX/UI qui convertit" },
        ],
      },
      {
        term: "A/B testing",
        slug: "ab-testing",
        category: "Conversion",
        short: "Comparer deux versions pour garder la meilleure.",
        def: "Méthode qui consiste à montrer deux variantes d'une page ou d'un élément à des visiteurs différents, puis à mesurer laquelle convertit le mieux. C'est l'outil de base de l'optimisation continue : on ne devine pas, on teste.",
        links: [
          { href: "/services/lead-generation", label: "Notre service Génération de leads" },
          { href: "/news/tunnel-de-conversion-transformer-visiteurs-en-clients", label: "Lire : mesurer pour optimiser" },
        ],
      },
      {
        term: "Lead",
        slug: "lead",
        category: "Acquisition",
        short: "Un contact commercial potentiel.",
        def: "Personne ou entreprise ayant manifesté un intérêt (formulaire, appel, demande de devis) et susceptible de devenir client. Un lead « qualifié » correspond bien à votre cible — cent leads qualifiés valent plus que mille contacts hors sujet.",
        links: [
          { href: "/services/lead-generation", label: "Notre service Génération de leads" },
          { href: "/news/tunnel-de-conversion-transformer-visiteurs-en-clients", label: "Lire : du visiteur au client" },
        ],
      },
      {
        term: "Génération de leads",
        slug: "generation-de-leads",
        category: "Acquisition",
        short: "Créer un flux régulier de prospects.",
        def: "Ensemble des actions (site, contenu, campagnes, automatisation) destinées à attirer et capturer des contacts qualifiés de façon prévisible. L'étape suivante — nurturing et scoring — transforme ces contacts en rendez-vous commerciaux.",
        links: [
          { href: "/services/lead-generation", label: "Notre service Génération de leads" },
        ],
      },
      {
        term: "SEA / Publicité payante",
        slug: "sea",
        category: "Acquisition",
        short: "Acheter de la visibilité (Google, Meta…).",
        def: "Search Engine Advertising et publicité sur les réseaux : campagnes payantes (Google Ads, Meta, LinkedIn) qui affichent vos annonces devant une audience ciblée. Au Luxembourg, le ciblage géographique et linguistique (FR/DE/EN) fait souvent toute la différence de rentabilité.",
        links: [
          { href: "/services/publicite", label: "Notre service Publicité en ligne" },
          { href: "/news/google-ads-ou-seo-ou-investir-budget-marketing", label: "Lire : Google Ads ou SEO ?" },
        ],
      },
      {
        term: "ROAS",
        slug: "roas",
        category: "Données & mesure",
        short: "Ce que rapporte chaque euro de pub.",
        def: "Return On Ad Spend : revenu généré pour chaque euro dépensé en publicité. Un ROAS de 4 signifie 4 € de chiffre d'affaires pour 1 € investi. C'est l'indicateur qu'on suit pour piloter — et couper — chaque campagne.",
        links: [
          { href: "/services/publicite", label: "Notre service Publicité en ligne" },
          { href: "/news/google-ads-ou-seo-ou-investir-budget-marketing", label: "Lire : où investir votre budget ?" },
        ],
      },
      {
        term: "ROI",
        slug: "roi",
        category: "Données & mesure",
        short: "Le retour sur investissement global.",
        def: "Return On Investment : rapport entre le gain obtenu et la somme investie. Indicateur clé pour juger la rentabilité d'une action marketing — et notre boussole : chaque euro investi doit être justifiable.",
        links: [
          { href: "/approche", label: "Notre approche orientée résultats" },
          { href: "/news/google-ads-ou-seo-ou-investir-budget-marketing", label: "Lire : Google Ads ou SEO ?" },
        ],
      },
      {
        term: "CPL / CPA",
        slug: "cpl-cpa",
        category: "Données & mesure",
        short: "Combien coûte un lead ou une vente.",
        def: "Coût Par Lead (CPL) et Coût Par Acquisition (CPA) : montant moyen dépensé pour obtenir respectivement un contact qualifié ou un client. À comparer à la valeur générée : un CPL « élevé » peut être excellent si le contrat moyen l'est aussi.",
        links: [
          { href: "/services/publicite", label: "Notre service Publicité en ligne" },
          { href: "/services/lead-generation", label: "Notre service Génération de leads" },
        ],
      },
      {
        term: "KPI",
        slug: "kpi",
        category: "Données & mesure",
        short: "Les chiffres qui comptent vraiment.",
        def: "Key Performance Indicator : indicateur clé choisi pour mesurer la progression vers un objectif (taux de conversion, coût par lead, trafic qualifié…). Le piège : suivre des vanity metrics (abonnés, impressions) qui flattent sans rien prouver.",
        links: [
          { href: "/approche", label: "Notre approche, pilotée par les chiffres" },
          { href: "/services/lead-generation", label: "Notre service Génération de leads" },
        ],
      },
      {
        term: "CTR",
        slug: "ctr",
        category: "Données & mesure",
        short: "Le % de clics sur un lien ou une annonce.",
        def: "Click-Through Rate : proportion de personnes qui cliquent après avoir vu un lien, une annonce ou un résultat. Un CTR élevé signale un message pertinent — en publicité comme en e-mail marketing, c'est le premier signal à surveiller.",
        links: [
          { href: "/services/publicite/google-ads", label: "Nos campagnes Google Ads" },
          { href: "/services/lead-generation/email-marketing-automation", label: "E-mail marketing & automation" },
        ],
      },
      {
        term: "Analytics",
        slug: "analytics",
        category: "Données & mesure",
        short: "Mesurer ce qui se passe sur votre site.",
        def: "Outils (Google Analytics, Matomo…) qui suivent le comportement des visiteurs : sources de trafic, pages vues, conversions. La base de toute décision marketing — à configurer dans le respect du RGPD, consentement compris.",
        links: [
          { href: "/services/lead-generation", label: "Notre service Génération de leads" },
          { href: "/news/rgpd-cookies-site-web-luxembourg", label: "Lire : RGPD & cookies au Luxembourg" },
        ],
      },
      {
        term: "CMS",
        slug: "cms",
        category: "Web & tech",
        short: "L'outil pour gérer le contenu d'un site.",
        def: "Content Management System : plateforme qui permet de créer et modifier les pages d'un site sans coder. Pratique pour garder la main au quotidien.",
        links: [
          { href: "/services/sites-web", label: "Notre service Sites web" },
          { href: "/news/combien-coute-un-site-web-luxembourg-2026", label: "Lire : combien coûte un site web ?" },
        ],
      },
      {
        term: "Responsive",
        slug: "responsive",
        category: "Web & tech",
        short: "Un site qui s'adapte à tous les écrans.",
        def: "Conception qui ajuste automatiquement la mise en page selon l'appareil (mobile, tablette, ordinateur), pour une expérience optimale partout. L'essentiel du trafic arrivant désormais sur mobile, on conçoit d'abord pour le petit écran.",
        links: [
          { href: "/services/sites-web", label: "Notre service Sites web" },
          { href: "/news/ux-ui-design-site-qui-convertit-bonnes-pratiques", label: "Lire : mobile-first, pour de vrai" },
        ],
      },
      {
        term: "Core Web Vitals",
        slug: "core-web-vitals",
        category: "Web & tech",
        short: "Les notes de Google sur la qualité technique.",
        def: "Indicateurs de Google mesurant la vitesse de chargement, la réactivité et la stabilité visuelle d'une page. Ils influencent le référencement et l'expérience utilisateur : un site lent perd des visiteurs avant même d'être lu.",
        links: [
          { href: "/services/seo-geo/seo", label: "Notre service SEO" },
          { href: "/news/ux-ui-design-site-qui-convertit-bonnes-pratiques", label: "Lire : performance & conversion" },
        ],
      },
      {
        term: "RGPD",
        slug: "rgpd",
        category: "Web & tech",
        short: "La loi européenne sur les données.",
        def: "Règlement Général sur la Protection des Données : cadre européen qui encadre la collecte et l'usage des données personnelles. Un site luxembourgeois doit s'y conformer (consentement, cookies…) — au Luxembourg, c'est la CNPD qui veille à son application.",
        links: [
          { href: "/news/rgpd-cookies-site-web-luxembourg", label: "Lire : RGPD & cookies au Luxembourg" },
          { href: "/services/sites-web", label: "Des sites conformes dès le départ" },
        ],
      },
      {
        term: "Automatisation",
        slug: "automatisation",
        category: "Web & tech",
        short: "Laisser les tâches répétitives aux machines.",
        def: "Mise en place de workflows qui exécutent automatiquement des tâches (relances, notifications, synchronisation d'outils), pour gagner du temps et réduire les erreurs. Pour une PME, c'est souvent le premier pas vers l'IA — le plus rentable aussi.",
        links: [
          { href: "/services/automatisation-ia", label: "Notre service Automatisation & IA" },
          { href: "/news/5-taches-pme-confier-a-l-ia", label: "Lire : 5 tâches à confier à l'IA" },
        ],
      },
      {
        term: "Identité de marque",
        slug: "identite-de-marque",
        category: "Design & marque",
        short: "Ce qui rend votre marque reconnaissable.",
        def: "Ensemble cohérent d'éléments visuels et de messages (logo, couleurs, typographie, ton) qui distingue votre entreprise et inspire confiance. Le logo en est la signature ; l'identité, l'écriture entière.",
        links: [
          { href: "/services/branding-design/identite-visuelle", label: "Notre service Identité visuelle & charte graphique" },
          { href: "/news/quest-ce-quun-bon-logo-identite-qui-dure", label: "Lire : qu'est-ce qu'un bon logo ?" },
        ],
      },
      {
        term: "Design system",
        slug: "design-system",
        category: "Design & marque",
        short: "La boîte à outils visuelle d'une marque.",
        def: "Bibliothèque de composants, de règles et de styles réutilisables qui garantit la cohérence d'un site ou d'un produit, et accélère sa création. C'est ce qui fait qu'une marque semble « issue de la même main » sur chaque page.",
        links: [
          { href: "/services/branding-design/identite-visuelle", label: "Notre service Identité visuelle & charte graphique" },
          { href: "/news/ux-ui-design-site-qui-convertit-bonnes-pratiques", label: "Lire : cohérence & conversion" },
        ],
      },
      {
        term: "UX / UI",
        slug: "ux-ui",
        category: "Design & marque",
        short: "L'expérience et l'interface.",
        def: "L'UX (User Experience) concerne le ressenti et le parcours de l'utilisateur ; l'UI (User Interface) concerne l'apparence et les éléments avec lesquels il interagit. Les deux servent la conversion : l'UX décide où va le visiteur, l'UI lui donne envie d'y aller.",
        links: [
          { href: "/services/sites-web", label: "Notre service Sites web" },
          { href: "/news/ux-ui-design-site-qui-convertit-bonnes-pratiques", label: "Lire : les principes UX/UI qui convertissent" },
        ],
      },
    ] as GlossaryTerm[],
  },

  // ---- Service detail (shared labels + per-service content) ----
  servicesDetail: {
    overviewTitle: "En détail",
    includedTitle: "Ce que ça comprend",
    deliverablesTitle: "Livrables",
    faqTitle: "Questions fréquentes",
    articlesTitle: "Ressources",
    articlesLead: "À lire sur le sujet.",
    // "Tracking & conversion included" — websites and landing pages only.
    tracking: {
      eyebrow: "Inclus dans chaque projet",
      title: "Suivi et conversion intégrés",
      lead: "Chaque site part en ligne avec sa mesure déjà en place : vous savez d'où viennent vos visiteurs et ce qu'ils deviennent.",
      items: [
        { icon: "analytics", title: "Google Analytics 4", desc: "Trafic, conversions et parcours des visiteurs, lisibles par ville et par langue." },
        { icon: "integration", title: "Google Tag Manager", desc: "Un seul conteneur pour vos pixels Google, Meta et LinkedIn, à activer ou retirer sans toucher au code." },
        { icon: "conversion", title: "Suivi des conversions", desc: "Formulaires, appels, clics sur l'e-mail et rendez-vous pris : chaque action est comptée pour calculer votre retour." },
      ],
    },
    // Shared "our method" band, rendered on every service & sub-service page.
    method: {
      eyebrow: "Notre méthode",
      title: "Quatre temps, zéro mauvaise surprise.",
      lead: "Un cadre clair, le même sur chaque projet : vous validez à chaque étape, on avance vite, vous gardez le contrôle.",
      steps: [
        { n: "01", icon: "process", title: "Diagnostic", desc: "On analyse votre situation, votre marché et vos objectifs. Audit offert, sans détour : on vous dit ce qui peut être amélioré avant même de parler de devis." },
        { n: "02", icon: "ai-build", title: "Conception & build", desc: "Design sur mesure et production accélérée par l'IA. On construit la solution — site, campagne, identité, automatisation — pensée pour la conversion." },
        { n: "03", icon: "ab-test", title: "Revue & optimisation", desc: "On teste, on mesure, on ajuste avec vous. Rien n'est figé : chaque détail est optimisé jusqu'à ce qu'il performe." },
        { n: "04", icon: "analytics", title: "Lancement & suivi", desc: "Mise en ligne, suivi des résultats et accompagnement continu. Vous voyez la progression, chaque euro relié à un résultat." },
      ],
    },
    // Per-page "Notre méthode", keyed by "slug" or "slug/child"; banner photo in
    // public/methode/<slug>[-<child>].webp. Pages missing here use `method` above.
    methods: {
      "sites-web": {
        title: "Quatre étapes vers un site qui convertit.",
        lead: "Vitrine, boutique ou landing page : le même cadre. Vous validez maquettes, contenus et mise en ligne ; on construit vite, avec l'IA et une relecture humaine.",
        steps: [
          { icon: "process", title: "Audit & cadrage", desc: "Audit offert de votre site actuel ou de votre projet : objectifs, cibles, parcours de conversion. On pose avec vous le cadrage de votre site sur mesure." },
          { icon: "ai-build", title: "Maquettes & développement", desc: "Arborescence, maquettes sur mesure, puis développement accéléré par l'IA. Vous validez le design avant la première ligne de code ; formulaires et socle SEO & GEO sont intégrés d'emblée." },
          { icon: "next-perf", title: "Tests & validation", desc: "Vitesse, formulaires, tracking, affichage sur tous les écrans : tout est vérifié en préproduction. Vous relisez chaque page et on ajuste jusqu'à votre validation finale." },
          { icon: "analytics", title: "Lancement & suivi", desc: "Domaine, SSL, analytics et suivi des conversions configurés avant la bascule. Après le lancement, on lit les données avec vous et on ajuste ce qui freine les demandes." },
        ],
      },
      "sites-web/site-vitrine": {
        title: "Une vitrine construite pour déclencher le contact.",
        lead: "Votre vitrine a quelques secondes pour convaincre. On fixe avec vous le message et le parcours, puis chaque page est conçue, relue et validée avant la mise en ligne.",
        steps: [
          { icon: "strategy", title: "Message & arborescence", desc: "On clarifie ce qui vous distingue, qui vous visez et l'action attendue : appel, message ou devis. Vous validez l'arborescence — accueil, services, à propos, contact — avant tout design." },
          { icon: "brand-identity", title: "Design à votre image", desc: "Maquettes 100 % sur mesure, alignées sur votre identité, zéro template recyclé. Preuves de crédibilité, appels à l'action et formulaire de contact placés là où le visiteur décide." },
          { icon: "responsive", title: "Test de première impression", desc: "On vérifie qu'un visiteur comprend qui vous êtes et quoi faire dès l'arrivée, sur mobile d'abord. Vous relisez textes et visuels ; on affine jusqu'à ce que la vitrine vous ressemble." },
          { icon: "seo", title: "Lancement & référencement", desc: "Mise en ligne avec balisage SEO, données structurées et suivi des demandes de contact. Ensuite, on gère les mises à jour pour vous." },
        ],
      },
      "sites-web/site-e-commerce": {
        title: "Du produit au paiement, sans friction.",
        lead: "Une boutique se juge à ses commandes, pas à son catalogue. Plateforme, paiements, TVA, livraison : chaque brique est choisie, testée et validée avec vous avant d'ouvrir.",
        steps: [
          { icon: "ecommerce", title: "Catalogue & plateforme", desc: "On cartographie votre catalogue, vos variantes, vos zones de livraison et vos outils existants. Puis on conçoit une boutique sur mesure, pensée pour la performance." },
          { icon: "funnel", title: "Fiches & tunnel d'achat", desc: "Fiches produits qui répondent aux objections, panier et étapes de commande réduits à l'essentiel. Moyens de paiement, règles de TVA luxembourgeoises et frais de livraison sont configurés dès le build." },
          { icon: "integration", title: "Commandes de test", desc: "On simule des commandes complètes, du panier à l'e-mail de confirmation, et on vérifie la synchronisation avec vos outils connectés : stock, livraison, comptabilité. Vous validez chaque scénario." },
          { icon: "analytics", title: "Ouverture & pilotage", desc: "Ouverture de la boutique avec suivi e-commerce actif : paniers, abandons, produits qui vendent. On vous forme au back-office, puis on optimise là où les chiffres montrent des pertes." },
        ],
      },
      "sites-web/landing-pages": {
        title: "Une campagne, une page, une action.",
        lead: "Chaque landing page part d'une campagne et d'un objectif unique. On cale le message sur l'annonce, on lance vite, puis on teste pour faire baisser votre coût par lead.",
        steps: [
          { icon: "ads-targeting", title: "Objectif & annonce", desc: "On part de votre campagne : audience, promesse de l'annonce, action attendue — formulaire, réservation ou téléchargement. Vous validez l'objectif unique et l'indicateur qui jugera la page." },
          { icon: "landing", title: "Texte, page, formulaire", desc: "Copywriting persuasif aligné sur le message de l'annonce, page sans menu ni sortie, formulaire réduit aux champs utiles. Production accélérée par l'IA pour caler le lancement sur votre campagne." },
          { icon: "conversion", title: "Tracking & vitesse vérifiés", desc: "Avant le premier euro dépensé, on vérifie que chaque conversion remonte dans vos outils publicitaires et que la page charge vite sur mobile, là où arrive l'essentiel du trafic." },
          { icon: "ab-test", title: "Lancement & A/B testing", desc: "La page est mise en ligne avec la campagne. On teste ensuite titres, visuels et formulaires, une variable à la fois, et on garde la version qui convertit le mieux." },
        ],
      },
      "sites-web/refonte-de-site": {
        title: "Repartir à neuf sans perdre votre référencement.",
        lead: "Une refonte mal menée peut effacer votre référencement acquis. On part d'un audit de l'existant et on termine par une migration contrôlée, URL par URL.",
        steps: [
          { icon: "redesign", title: "Audit de l'existant", desc: "UX, performance, SEO, conversion : on mesure ce qui freine et ce qui rapporte encore. Vous validez ce qu'on garde — contenus, pages performantes, éléments de marque — et ce qu'on refait." },
          { icon: "ai-build", title: "Design, code, redirections", desc: "Nouveau design et bases techniques rapides, construits en parallèle de votre site actuel, qui reste en ligne. On cartographie toutes vos URLs et on prépare chaque redirection avant la bascule." },
          { icon: "speed", title: "Comparatif avant-après", desc: "Sur un environnement de test, on compare l'ancien et le nouveau site : vitesse, parcours, formulaires, balises SEO. Les redirections sont testées une à une ; vous validez la version finale." },
          { icon: "analytics", title: "Bascule & suivi SEO", desc: "Mise en ligne, redirections actives, Search Console surveillée. On suit vos positions et vos conversions après la bascule pour corriger vite le moindre recul." },
        ],
      },
      "sites-web/site-multilingue": {
        title: "Trouvé et compris, dans chaque langue.",
        lead: "Au Luxembourg, un prospect germanophone ne cherche pas comme un francophone. On cadre langues, URLs et mots-clés avant le design, puis chaque version est optimisée et validée séparément.",
        steps: [
          { icon: "multilingual", title: "Langues & architecture", desc: "On définit avec vous les langues prioritaires, la structure des URLs, le balisage hreflang et les mots-clés de chaque langue. Le multilingue est posé avant la première maquette." },
          { icon: "gen-content", title: "Contenus par langue", desc: "Rédaction et traduction professionnelles, ou intégration de vos textes, jamais de traduction automatique brute. Les maquettes absorbent les écarts de longueur entre langues." },
          { icon: "seo", title: "Relecture langue par langue", desc: "Vous ou vos relecteurs validez chaque version. On contrôle hreflang, sélecteur de langue, formulaires et e-mails de confirmation dans chaque langue, pour qu'aucun visiteur ne bascule en français par erreur." },
          { icon: "analytics", title: "Indexation & suivi", desc: "Mise en ligne et demande d'indexation de chaque version. On suit positions, trafic et demandes langue par langue, pour savoir quel marché répond et où renforcer le contenu." },
        ],
      },
      "seo-geo": {
        title: "Un chantier, deux moteurs : Google et les IA.",
        lead: "On travaille le SEO et le GEO dans le même mouvement : vous validez chaque priorité, on corrige ce qui bloque, vous suivez positions et citations.",
        steps: [
          { icon: "process", title: "Audit SEO & GEO", desc: "Audit offert : technique, sémantique et présence dans les réponses IA. Vous savez ce qui freine votre visibilité, et par où commencer, avant même de parler de devis." },
          { icon: "strategy", title: "Plan & optimisations", desc: "Mots-clés FR/DE/EN, plan de contenu, corrections techniques, Schema.org et llms.txt : une base que Google comprend et que les IA peuvent reprendre comme source." },
          { icon: "ab-test", title: "Vérifications & point zéro", desc: "Avant mise en ligne, on vérifie indexation, balisage et rendu de chaque page, on corrige les écarts et on relève vos positions et citations de départ." },
          { icon: "analytics", title: "Suivi positions & citations", desc: "Mise en ligne, puis reporting mensuel des positions Google et des citations IA, lu avec vous. Vous voyez ce qui progresse, ce qui stagne et ce qu'on attaque ensuite." },
        ],
      },
      "seo-geo/seo": {
        title: "Du diagnostic technique au trafic qualifié.",
        lead: "Le SEO se construit par couches : d'abord ce qui bloque l'indexation, ensuite les pages qui répondent à la recherche, puis le suivi. Vous validez chaque priorité.",
        steps: [
          { icon: "seo", title: "Audit technique & sémantique", desc: "Vitesse, structure, indexation, maillage interne, requêtes où vous êtes absent : on liste ce qui freine votre référencement et on le classe par impact." },
          { icon: "multilingual", title: "Mots-clés & on-page", desc: "Plan de mots-clés FR, DE et EN selon l'intention de recherche, puis corrections techniques, balises, structure des pages et contenus qui répondent à ce que vos clients tapent." },
          { icon: "speed", title: "Contrôle technique", desc: "On explore le site comme Google le ferait : redirections, balises canoniques, versions linguistiques, vitesse mobile. Chaque anomalie est corrigée avant la réindexation." },
          { icon: "analytics", title: "Suivi & autorité", desc: "Mise en ligne, puis reporting mensuel des positions, du trafic et des conversions, avec les prochains contenus à produire pour asseoir votre autorité sur vos requêtes clés." },
        ],
      },
      "seo-geo/geo-gso": {
        title: "Lisible par les modèles, cité dans leurs réponses.",
        lead: "Domaine émergent, donc méthode stricte : on part de ce que les IA disent de vous aujourd'hui, on structure, on teste, et chaque citation est suivie.",
        steps: [
          { icon: "chatbot", title: "Audit de présence IA", desc: "On interroge ChatGPT, Perplexity et Google AI sur vos sujets : êtes-vous cité, de quelle façon, et qui l'est à votre place ? Puis on audite la structure technique de votre site." },
          { icon: "ai-build", title: "Contenu citable & balisage", desc: "Réponses nettes, faits vérifiables, contexte luxembourgeois : on restructure vos pages clés pour qu'elles soient citables, puis on ajoute les données structurées Schema.org et le fichier llms.txt." },
          { icon: "ab-test", title: "Validation côté machines", desc: "On vérifie la validité des données structurées, la lecture de vos pages sans JavaScript et l'accès des robots d'IA. Chaque écart est corrigé avant publication." },
          { icon: "geo-citation", title: "Suivi des citations", desc: "Après mise en ligne, on soumet régulièrement aux IA les questions de vos clients et on suit où elles vous citent, comment elles vous décrivent et ce qu'il reste à renforcer." },
        ],
      },
      "seo-geo/seo-local": {
        title: "Gagner la carte, là où vos clients choisissent.",
        lead: "Fiche, coordonnées, avis, pages locales : on travaille les signaux que Google utilise pour classer les entreprises de proximité, au Luxembourg et dans la Grande Région.",
        steps: [
          { icon: "local-seo", title: "Audit de visibilité locale", desc: "On passe en revue votre fiche Google Business Profile, vos coordonnées sur les annuaires, vos avis et les concurrents qui vous devancent sur la carte, requête par requête." },
          { icon: "integration", title: "Fiche, citations & pages", desc: "On complète votre fiche (catégories, services, photos, zone desservie), on harmonise nom, adresse et téléphone partout, et on crée vos pages locales balisées en FR, DE et EN." },
          { icon: "conversion", title: "Contrôles & avis clients", desc: "On traque les doublons de fiche, les coordonnées divergentes et les erreurs de balisage, puis on lance la collecte d'avis clients avec des modèles de réponse prêts à l'emploi." },
          { icon: "analytics", title: "Suivi sur la carte", desc: "On suit vos positions sur la carte par zone, les appels et demandes d'itinéraire issus de la fiche, et on publie régulièrement pour garder votre présence active." },
        ],
      },
      "lead-generation/tunnels-de-conversion": {
        title: "Un parcours cartographié, mesuré à chaque palier.",
        lead: "Découverte, considération, décision : chaque phase a sa page, son message et sa mesure. Vous validez l'architecture avant la moindre mise en ligne.",
        steps: [
          { icon: "funnel", title: "Cartographie du parcours", desc: "On retrace le chemin réel de vos clients jusqu'à la demande de devis, puis on le découpe en phases TOFU, MOFU, BOFU calées sur votre cycle de vente." },
          { icon: "conversion", title: "Pages & relances alignées", desc: "Pour chaque phase, la page, le message et la relance qui font avancer le prospect d'un cran : on rassure en considération, on lève les dernières objections au moment de décider." },
          { icon: "ab-test", title: "Tracking & tests par palier", desc: "On instrumente chaque passage d'étape à étape, on repère les paliers qui fuient et on y concentre les tests A/B, plutôt que de tout retoucher au hasard." },
          { icon: "analytics", title: "Lancement & attribution", desc: "Tunnel en ligne et attribution de bout en bout : vous savez quel canal amène quels leads et où ils en sont. Un plan d'optimisation fixe les prochains chantiers." },
        ],
      },
      "lead-generation/landing-pages-campagne": {
        title: "Une campagne, une page, une seule action.",
        lead: "Chaque clic payé doit atterrir sur la promesse qui l'a déclenché. On part de votre annonce et de votre audience, puis on construit la page qui la prolonge.",
        steps: [
          { icon: "ads-targeting", title: "Brief campagne & intention", desc: "Annonce, audience, mot-clé, offre : on analyse ce que le visiteur a vu et cherché avant de cliquer, pour que la page reprenne mot pour mot la promesse de l'annonce." },
          { icon: "landing", title: "Copywriting & formulaire", desc: "Un titre qui confirme le clic, des bénéfices qui répondent aux objections, de la réassurance, un seul appel à l'action et un formulaire réduit aux champs qui qualifient vraiment." },
          { icon: "responsive", title: "Variantes & vitesse mobile", desc: "On prépare des variantes de titre, d'offre ou de formulaire pour l'A/B testing, et on vérifie le chargement sur mobile, là où arrive l'essentiel du trafic payant." },
          { icon: "analytics", title: "Lancement avec la campagne", desc: "La page part en ligne avec la campagne, tracking des conversions en place. On suit le coût par lead par annonce et on garde la variante qui convertit le mieux." },
        ],
      },
      "lead-generation/email-marketing-automation": {
        title: "Des séquences qui relancent au bon moment.",
        lead: "Un prospect pas encore prêt n'est pas un prospect perdu. On conçoit des scénarios qui le suivent jusqu'à la décision, dans le respect du RGPD.",
        steps: [
          { icon: "rgpd", title: "Base & déclencheurs", desc: "On fait le point sur votre base, vos consentements opt-in et votre configuration d'envoi, puis on repère les déclencheurs utiles : téléchargement, visite clé, inactivité, demande restée sans suite." },
          { icon: "email-automation", title: "Scénarios & rédaction", desc: "On écrit chaque séquence selon la phase du prospect : informer, rassurer, proposer un rendez-vous. Des emails courts, utiles, à votre ton, qui entretiennent le lien sans lasser." },
          { icon: "ab-test", title: "Délivrabilité & tests d'envoi", desc: "Configuration SPF, DKIM et DMARC, tests de réception, puis tests A/B des objets et des contenus sur un échantillon, avant d'écrire à toute votre base." },
          { icon: "analytics", title: "Activation & suivi", desc: "Les scénarios tournent seuls et chaque séquence a son reporting : ouvertures, clics, réponses, désinscriptions. On réécrit les emails qui décrochent et on ajuste le rythme des envois." },
        ],
      },
      "publicite": {
        title: "Chaque euro de pub doit se justifier.",
        lead: "On part de vos chiffres réels, pas d'intuitions. Vous validez chaque étape, gardez la main sur le budget et voyez ce qu'il rapporte.",
        steps: [
          { icon: "process", title: "Audit & objectifs", desc: "On analyse vos campagnes en cours, votre tracking, vos marges et votre marché. Audit offert : vous savez ce qui fonctionne, ce qui fuit, avant même de parler de devis." },
          { icon: "ads-targeting", title: "Plan média & campagnes", desc: "Google pour capter la demande, Meta pour la créer, LinkedIn pour toucher les décideurs : on choisit vos canaux, on pose le tracking et on construit campagnes et landing pages." },
          { icon: "ab-test", title: "Budget test & ajustements", desc: "On démarre sur un budget test défini ensemble. Annonces, audiences et enchères sont comparées en conditions réelles ; ce qui ne convertit pas est coupé sans attendre." },
          { icon: "analytics", title: "Accélération & reporting", desc: "On augmente uniquement ce qui est rentable et on continue d'optimiser. Reporting clair sur le coût par acquisition et le ROAS, canal par canal, sans jargon." },
        ],
      },
      "publicite/google-ads": {
        title: "Des clics qui deviennent des demandes.",
        lead: "Sur Google, la demande existe déjà. Notre travail : vous placer sur les bonnes requêtes, au bon moment, sans payer pour les mauvaises.",
        steps: [
          { icon: "seo", title: "Audit compte & mots-clés", desc: "On analyse votre compte existant — termes de recherche, niveau de qualité, budget gaspillé — ou, si vous partez de zéro, la demande réelle sur vos mots-clés." },
          { icon: "landing", title: "Structure & landing pages", desc: "Campagnes Search et Performance Max structurées par intention et par langue (FR, DE, EN), mots-clés négatifs, landing pages dédiées. Le suivi des conversions est posé avant le premier euro dépensé." },
          { icon: "conversion", title: "Requêtes & enchères", desc: "Dès les premiers clics, on exclut les requêtes qui ne convertissent pas, on teste les annonces et on ajuste les enchères selon le coût par conversion." },
          { icon: "next-perf", title: "Montée en puissance", desc: "On étend ce qui rapporte : nouveaux mots-clés, Shopping, YouTube si pertinent. Le reporting confronte les conversions Google à vos demandes réellement reçues." },
        ],
      },
      "publicite/meta-ads": {
        title: "Capter l'attention, puis la convertir.",
        lead: "Sur Meta, la créa fait désormais une grande partie du ciblage. On produit, on teste, on recible : chaque étape est mesurée jusqu'à la conversion.",
        steps: [
          { icon: "integration", title: "Pixel, audiences & contenus", desc: "On vérifie votre compte publicitaire, le pixel et l'API Conversions, vos audiences et vos contenus existants. Sans signal fiable, l'algorithme de Meta optimise à l'aveugle." },
          { icon: "branding", title: "Créas & parcours", desc: "On conçoit des visuels et vidéos aux formats natifs — Reels, Stories, carrousels — et on structure le parcours : découverte, considération, puis retargeting des visiteurs et des engagés." },
          { icon: "ab-test", title: "Tests créatifs", desc: "Plusieurs accroches, visuels et formats sont lancés en parallèle. On garde ceux qui font baisser le coût par résultat, on coupe les autres et on décline les gagnants." },
          { icon: "analytics", title: "Amplification & suivi", desc: "Le budget suit les meilleures performances. On surveille la fréquence, on renouvelle les créas avant qu'elles ne s'usent et vous suivez le retour sur investissement dans un reporting clair." },
        ],
      },
      "publicite/linkedin-ads": {
        title: "Parler aux décideurs, pas à tout LinkedIn.",
        lead: "En B2B, un lead ne vaut que s'il avance dans votre pipeline. On cible par compte et par fonction, puis on mesure jusqu'au rendez-vous commercial.",
        steps: [
          { icon: "strategy", title: "Client idéal & comptes", desc: "On définit avec vous votre client idéal : fonctions, séniorité, secteurs, taille d'entreprise. Pour l'ABM, on construit la liste de vos comptes stratégiques au Luxembourg et dans la Grande Région." },
          { icon: "smart-forms", title: "Formats & connexion CRM", desc: "Contenus sponsorisés, documents, Lead Gen Forms pré-remplis : chaque format sert une étape du cycle de vente. Insight Tag et connexion CRM sont posés dès le départ." },
          { icon: "leads", title: "Qualification des leads", desc: "On juge les campagnes sur la qualité des leads, pas sur le coût par clic. Avec vos retours terrain, on écarte les profils hors cible et on affine audiences et messages." },
          { icon: "funnel", title: "Mesure du pipeline", desc: "On concentre le budget sur les comptes et les messages qui génèrent des rendez-vous. Le reporting suit le coût par lead et la contribution au pipeline, données CRM à l'appui." },
        ],
      },
      "branding-design": {
        title: "Une marque pensée avant d'être dessinée.",
        lead: "Du positionnement aux fichiers livrés, un cadre clair : vous validez chaque étape, on affine avec vous, et votre marque parle d'une seule voix, partout.",
        steps: [
          { icon: "process", title: "Diagnostic de marque", desc: "On étudie votre point de départ, vos concurrents et vos publics au Luxembourg. Audit offert : on identifie ce qui brouille votre image avant même de parler de devis." },
          { icon: "brand-identity", title: "Conception sur mesure", desc: "Stratégie, nom, logo, identité complète ou supports print : on conçoit ce dont vous avez besoin. Chaque proposition est argumentée et reliée à votre positionnement, rien n'est laissé au hasard." },
          { icon: "ab-test", title: "Affinage & validation", desc: "On affine la piste retenue par allers-retours, avec vous, jusqu'à ce que chaque élément soit juste. Rien n'est finalisé sans votre validation." },
          { icon: "guidelines", title: "Livraison & déploiement", desc: "Tous vos fichiers vous sont livrés, sources comprises, avec leurs règles d'usage. Ensuite, on vous accompagne pour décliner votre marque sur chaque nouveau support, sans perdre en cohérence." },
        ],
      },
      "branding-design/creation-de-logo": {
        title: "Du brief au logo qui tient partout.",
        lead: "Un logo se juge à l'usage, pas sur une maquette. On l'ancre dans votre activité, on l'affine avec vous et on le livre prêt pour tous vos supports.",
        steps: [
          { icon: "branding", title: "Brief & immersion", desc: "On cerne votre activité, vos clients, vos concurrents et ce que votre logo doit exprimer. Un brief précis évite les pistes hors sujet et les allers-retours inutiles." },
          { icon: "logo", title: "Concepts originaux", desc: "Plusieurs pistes distinctes, dessinées pour vous, jamais tirées d'une banque de symboles. Chaque concept est présenté en contexte, avec l'intention qui le justifie." },
          { icon: "ab-test", title: "Affinage & lisibilité", desc: "Courbes, proportions, espacements : la piste choisie est affinée avec vous, puis testée en favicon, en grand format, en monochrome, sur fond clair et foncé." },
          { icon: "responsive", title: "Livraison du pack logo", desc: "Vous recevez le pack complet — couleur, monochrome, vectoriel, web, print, favicon — et un mini-guide d'utilisation. Le logo vous appartient intégralement, sources comprises." },
        ],
      },
      "branding-design/identite-visuelle": {
        title: "Du logo à la charte, tout se tient.",
        lead: "Une identité ne vaut que si elle est appliquée de la même façon partout. On construit le système, puis on en fixe les règles pour vos équipes et prestataires.",
        steps: [
          { icon: "process", title: "Inventaire & atelier", desc: "On passe en revue vos supports existants et ceux de vos concurrents, puis, en atelier, on définit ensemble le territoire visuel à occuper, selon vos valeurs et vos publics." },
          { icon: "brand-identity", title: "Logo & système visuel", desc: "Logo, palette, hiérarchie typographique, iconographie, motifs, style photo : on conçoit chaque pièce en lien avec les autres, pour obtenir un système cohérent, pas une collection d'éléments isolés." },
          { icon: "responsive", title: "Mise en situation", desc: "On applique le système à vos cas réels — papeterie, site, réseaux sociaux, présentation — et on ajuste avec vous ce qui manque de contraste, de lisibilité ou de cohérence." },
          { icon: "guidelines", title: "Charte & bibliothèque d'assets", desc: "La charte fixe les règles — zones de protection, tailles minimales, codes HEX, CMJN, Pantone, usages interdits — et vos assets arrivent organisés. Un document vivant, enrichi à chaque nouveau support." },
        ],
      },
      "branding-design/supports-print": {
        title: "Chaque support conçu, chaque fichier conforme.",
        lead: "Un support imprimé ne se corrige pas après coup. On cadre, on conçoit et on contrôle chaque fichier pour qu'il parte chez l'imprimeur de votre choix sans retouche.",
        steps: [
          { icon: "process", title: "Cahier des charges", desc: "On recense vos supports — usages, formats, contenus — et les contraintes techniques de votre imprimeur s'il est déjà choisi. On vérifie aussi que votre identité est prête à être déclinée." },
          { icon: "branding", title: "Conception & mise en page", desc: "Cartes de visite, papeterie, brochures, rapports, signalétique : chaque support est mis en page dans la continuité de votre identité, avec une hiérarchie claire au service du message." },
          { icon: "ab-test", title: "Relecture & contrôle prépresse", desc: "Vous relisez et validez chaque maquette. Puis on passe les fichiers au contrôle prépresse : fonds perdus, CMJN, résolution des images, polices, traits de coupe." },
          { icon: "print", title: "Fichiers & gabarits", desc: "Des PDF HD conformes, les spécifications techniques pour l'imprimeur de votre choix et des gabarits réutilisables : vos prochaines éditions se préparent sans repartir de zéro." },
        ],
      },
      "automatisation-ia": {
        title: "Automatiser ce qui compte, pas tout automatiser.",
        lead: "On part de vos process réels, pas d'un outil à la mode. L'objectif : retirer à vos équipes le travail sans valeur, sans fragiliser ce qui fonctionne déjà.",
        steps: [
          { icon: "process", title: "Cartographie des process", desc: "Audit offert : on liste vos tâches répétitives, qui les fait, à quelle fréquence et dans quels outils, puis on priorise ce qui vous fera vraiment gagner du temps." },
          { icon: "automation", title: "Conception sur mesure", desc: "On choisit la stack adaptée à vos outils existants, on configure workflows, intégrations et assistants IA, et on documente chaque scénario pour qu'il reste lisible par vos équipes." },
          { icon: "ab-test", title: "Tests sur cas réels", desc: "On fait tourner chaque automatisation sur vos vraies données, cas limites compris, et on vérifie les accès et le respect du RGPD. Vos équipes valident avant toute mise en production." },
          { icon: "analytics", title: "Activation & supervision", desc: "On active les scénarios, on surveille les exécutions et les erreurs, et on mesure le temps réellement libéré. Vos équipes sont formées, la documentation vous appartient." },
        ],
      },
      "automatisation-ia/integrations-crm-api": {
        title: "Une seule source de vérité pour vos données.",
        lead: "Une synchronisation qui casse en silence fait plus de dégâts qu'une double saisie. On connecte, on teste, puis on surveille chaque flux dans la durée.",
        steps: [
          { icon: "process", title: "Audit des flux", desc: "On inventorie vos outils, leurs API et chaque donnée qui circule entre eux. On repère les doubles saisies, les silos et les champs incohérents d'un logiciel à l'autre." },
          { icon: "integration", title: "Mapping & connecteurs", desc: "On définit quel outil fait foi pour chaque donnée, on aligne les champs, puis on branche les connecteurs existants ou on développe l'intégration sur mesure via API et webhooks." },
          { icon: "rgpd", title: "Tests & sécurité", desc: "On éprouve chaque synchronisation hors production : doublons, champs vides, erreurs d'API. Accès limités au strict nécessaire, connexions sécurisées, données traitées dans le respect du RGPD." },
          { icon: "automation", title: "Mise en service supervisée", desc: "Mise en service progressive, puis supervision : chaque erreur de synchronisation remonte en alerte pour être corrigée vite. Vous recevez la documentation de vos flux et des accès." },
        ],
      },
    },
    // Honest "guarantees / engagements" band — no invented client metrics.
    proof: {
      eyebrow: "Nos engagements",
      title: "Ce qu'on vous garantit, noir sur blanc.",
      lead: "Pas de promesse magique. Des engagements concrets, tenus sur chaque projet.",
      items: [
        { icon: "guarantee", value: "Audit offert", label: "Avant tout devis", desc: "Un diagnostic gratuit de votre situation, sans engagement." },
        { icon: "rgpd", value: "100 % à vous", label: "Code, contenus, accès", desc: "Vous êtes pleinement propriétaire. Pas d'enfermement, jamais." },
        { icon: "multilingual", value: "FR · DE · EN · LU", label: "Multilingue natif", desc: "Pensé pour le marché luxembourgeois et la Grande Région." },
        { icon: "analytics", value: "Reporting clair", label: "Transparence totale", desc: "Chaque euro dépensé est relié à un résultat mesurable." },
      ],
    },
    // Per-page "Nos engagements", keyed by "slug" or "slug/child"; `image` is a photo in
    // public/engagements (no extension). Pages missing here use `proof` above.
    proofs: {
      "sites-web": {
        title: "Ce que chaque site inclut, noir sur blanc.",
        lead: "Pas de promesse magique. Quel que soit le pack, ces engagements figurent dans chaque projet de site.",
        items: [
          { image: "code", value: "100 % à vous", label: "Code, contenus, accès", desc: "Vous restez propriétaire de votre site. Pas d'enfermement, même si vous changez d'agence." },
          { image: "sites-web-2", value: "Hébergement inclus", label: "Dans chaque pack", desc: "Domaine offert la première année, hébergement haute vitesse et certificat SSL HTTPS." },
          { image: "sites-web-3", value: "3 mois de support", label: "Vous n'êtes pas seul", desc: "Une assistance technique incluse pendant les trois premiers mois, quel que soit le pack." },
          { image: "sites-web-4", value: "100 % sur mesure", label: "Zéro template", desc: "Chaque site est conçu et développé pour votre activité, jamais adapté d'un modèle." },
        ],
      },
      "sites-web/site-vitrine": {
        title: "Ce que chaque site inclut, noir sur blanc.",
        lead: "Pas de promesse magique. Quel que soit le pack, ces engagements figurent dans chaque projet de site.",
        items: [
          { image: "code", value: "100 % à vous", label: "Code, contenus, accès", desc: "Vous restez propriétaire de votre site. Pas d'enfermement, même si vous changez d'agence." },
          { image: "sites-web-2", value: "Hébergement inclus", label: "Dans chaque pack", desc: "Domaine offert la première année, hébergement haute vitesse et certificat SSL HTTPS." },
          { image: "sites-web-3", value: "3 mois de support", label: "Vous n'êtes pas seul", desc: "Une assistance technique incluse pendant les trois premiers mois, quel que soit le pack." },
          { image: "sites-web-4", value: "100 % sur mesure", label: "Zéro template", desc: "Chaque site est conçu et développé pour votre activité, jamais adapté d'un modèle." },
        ],
      },
      "sites-web/site-e-commerce": {
        title: "Du panier au paiement, nos engagements écrits.",
        lead: "Une boutique se juge à ses ventes. Voici ce qu'on met en place, sur chaque projet e-commerce.",
        items: [
          { image: "sites-web-site-e-commerce-1", value: "TVA luxembourgeoise", label: "Paiements configurés", desc: "Moyens de paiement sécurisés et règles de TVA luxembourgeoises configurés dès le lancement." },
          { image: "sites-web-site-e-commerce-2", value: "Autonome au quotidien", label: "Back-office & formation", desc: "Produits, stocks et commandes gérés par vos équipes, formées à l'outil, sans dépendre de nous." },
          { image: "sites-web-site-e-commerce-3", value: "Tunnel sans friction", label: "Du produit au paiement", desc: "Un parcours d'achat conçu pour réduire l'abandon de panier, puis optimisé sur vos données." },
          { image: "reporting", value: "Ventes mesurées", label: "Suivi e-commerce", desc: "Conversions, paniers et produits qui performent : un tableau de bord clair, dès la mise en ligne." },
        ],
      },
      "sites-web/landing-pages": {
        title: "Ce que chaque site inclut, noir sur blanc.",
        lead: "Pas de promesse magique. Quel que soit le pack, ces engagements figurent dans chaque projet de site.",
        items: [
          { image: "sites-web-landing-pages-1", value: "Une seule action", label: "Zéro distraction", desc: "Sans menu ni fuite : toute la page converge vers votre unique objectif." },
          { image: "code", value: "100 % à vous", label: "Code, contenus, accès", desc: "Vous restez propriétaire de votre site. Pas d'enfermement, même si vous changez d'agence." },
          { image: "sites-web-2", value: "Hébergement inclus", label: "Dans chaque pack", desc: "Domaine offert la première année, hébergement haute vitesse et certificat SSL HTTPS." },
          { image: "sites-web-3", value: "3 mois de support", label: "Vous n'êtes pas seul", desc: "Une assistance technique incluse pendant les trois premiers mois, quel que soit le pack." },
          { image: "sites-web-4", value: "100 % sur mesure", label: "Zéro template", desc: "Chaque site est conçu et développé pour votre activité, jamais adapté d'un modèle." },
        ],
      },
      "sites-web/refonte-de-site": {
        title: "Ce que chaque site inclut, noir sur blanc.",
        lead: "Pas de promesse magique. Quel que soit le pack, ces engagements figurent dans chaque projet de site.",
        items: [
          { image: "code", value: "100 % à vous", label: "Code, contenus, accès", desc: "Vous restez propriétaire de votre site. Pas d'enfermement, même si vous changez d'agence." },
          { image: "sites-web-2", value: "Hébergement inclus", label: "Dans chaque pack", desc: "Domaine offert la première année, hébergement haute vitesse et certificat SSL HTTPS." },
          { image: "sites-web-3", value: "3 mois de support", label: "Vous n'êtes pas seul", desc: "Une assistance technique incluse pendant les trois premiers mois, quel que soit le pack." },
          { image: "sites-web-4", value: "100 % sur mesure", label: "Zéro template", desc: "Chaque site est conçu et développé pour votre activité, jamais adapté d'un modèle." },
        ],
      },
      "sites-web/site-multilingue": {
        title: "Un vrai site par langue, noir sur blanc.",
        lead: "Pas de traduction plaquée. Des engagements concrets pour exister dans chaque langue de votre marché.",
        items: [
          { image: "multilingue", value: "FR · DE · EN · LU", label: "Langues natives", desc: "Français, allemand, anglais ; luxembourgeois et autres langues sur demande, pour la Grande Région." },
          { image: "sites-web-site-multilingue-2", value: "SEO langue par langue", label: "Balisage hreflang correct", desc: "URLs et contenus optimisés séparément : chaque langue capte ses propres recherches." },
          { image: "sites-web-site-multilingue-3", value: "Zéro traduction brute", label: "Contenu juste par langue", desc: "Traduction professionnelle ou intégration de vos textes : un contenu juste, jamais du mot à mot." },
          { image: "sites-web-site-multilingue-4", value: "Même ton, même UX", label: "Cohérence éditoriale", desc: "Un ton et un parcours cohérents d'une langue à l'autre, adaptés à chaque public." },
        ],
      },
      "seo-geo": {
        title: "Google et IA : des engagements, pas des promesses.",
        lead: "Aucune agence sérieuse ne garantit une position Google ou une citation IA. On garantit la méthode, les livrables et la transparence.",
        items: [
          { image: "audit", value: "Audit SEO/GEO offert", label: "Avant tout devis", desc: "On vous dit où vous en êtes sur Google et auprès des IA, sans engagement." },
          { image: "seo-geo-2", value: "Google + IA, ensemble", label: "Un seul chantier", desc: "Environ 80 % des bonnes pratiques sont communes : on ne sacrifie pas Google pour l'IA." },
          { image: "seo-geo-3", value: "Pas de délai magique", label: "Calendrier honnête", desc: "Premiers signaux souvent en quelques semaines, gains solides en quelques mois. On vous le dit d'emblée." },
          { image: "reporting", value: "Positions + citations", label: "Reporting mensuel", desc: "Vos positions Google et vos citations IA, suivies et expliquées dans un reporting clair." },
        ],
      },
      "seo-geo/seo": {
        title: "Sur Google, ce qu'on promet et ce qu'on refuse.",
        lead: "L'algorithme de Google ne se négocie pas. On s'engage sur ce qui dépend de nous : fondations techniques, contenus, suivi mensuel.",
        items: [
          { image: "seo-geo-seo-1", value: "Aucun n°1 promis", label: "Honnêteté d'abord", desc: "Une position garantie est un argument de vente, pas un engagement. On vous montre la progression." },
          { image: "code", value: "Socle technique sain", label: "SEO technique", desc: "Vitesse, structure, indexation : on corrige ce qui bloque votre référencement à la racine." },
          { image: "multilingue", value: "FR · DE · EN", label: "Mots-clés par langue", desc: "Un plan de mots-clés pensé pour chacune des trois langues du marché luxembourgeois." },
          { image: "reporting", value: "Trafic et conversions", label: "Suivi chaque mois", desc: "Positions, trafic, conversions : vous voyez ce que votre référencement vous rapporte." },
        ],
      },
      "lead-generation/tunnels-de-conversion": {
        title: "Votre tunnel, cartographié et mesuré à chaque étape.",
        lead: "Un tunnel B2B ne se devine pas. On le dessine avec vous, on l'instrumente, puis on l'améliore palier par palier.",
        items: [
          { image: "lead-generation-tunnels-de-conversion-1", value: "Tunnel cartographié", label: "TOFU · MOFU · BOFU", desc: "Le parcours entier, du premier contact à la demande de devis, cartographié et validé avec vous." },
          { image: "lead-generation-tunnels-de-conversion-2", value: "Un message par étape", label: "Aligné sur chaque phase", desc: "Chaque page et chaque relance parlent au prospect selon sa phase : découverte, considération, décision." },
          { image: "reporting", value: "Suivi de bout en bout", label: "Tracking & attribution", desc: "Chaque étape est mesurée : vous voyez où vous gagnez et où vous perdez des prospects." },
          { image: "lead-generation-tunnels-de-conversion-4", value: "Votre cycle de vente", label: "Pensé pour le B2B", desc: "Le tunnel suit votre cycle réel, même long, et mène à un devis ou un appel." },
        ],
      },
      "publicite/google-ads": {
        title: "Sur Google, on achète de l'intention, pas du volume.",
        lead: "Vos clients cherchent déjà une solution. On vous place devant eux à cet instant, avec une page faite pour convertir.",
        items: [
          { image: "publicite-google-ads-1", value: "Intention d'abord", label: "Search & Performance Max", desc: "Des campagnes structurées pour apparaître sur les requêtes qui convertissent, pas sur les curieux." },
          { image: "publicite-google-ads-2", value: "Landing page dédiée", label: "Quand elle s'impose", desc: "Si aucune page de votre site ne colle à l'annonce, on crée une landing page dédiée pour transformer le clic payant en demande." },
          { image: "multilingue", value: "Mots-clés FR · DE · EN", label: "Vos clients, leur langue", desc: "Au Luxembourg, vos clients cherchent dans trois langues. Vos campagnes couvrent les trois." },
          { image: "publicite-google-ads-4", value: "Clics dès le lancement", label: "Apprentissage annoncé", desc: "Les premières semaines servent à apprendre et optimiser. On vous le dit avant, pas après." },
        ],
      },
      "publicite/meta-ads": {
        title: "Arrêter le scroll, puis mesurer ce que ça rapporte.",
        lead: "Personne ne cherche votre produit sur Instagram. Des créas qui captent l'attention, testées, et un coût par résultat visible.",
        items: [
          { image: "publicite-meta-ads-1", value: "Créas sur mesure", label: "Visuels et vidéos", desc: "On crée vos visuels et vidéos publicitaires, ou on adapte vos contenus existants." },
          { image: "publicite-meta-ads-2", value: "Tests A/B en continu", label: "Le chiffre tranche", desc: "Plusieurs visuels et messages testés en parallèle : on garde ce qui performe, on coupe le reste." },
          { image: "publicite-meta-ads-3", value: "Placements choisis", label: "Selon votre cible", desc: "Facebook, Instagram, Threads ou réseau d'audience : on choisit selon votre cible et vos objectifs." },
          { image: "reporting", value: "Coût par résultat", label: "Au-delà des likes", desc: "Un reporting clair sur le coût par résultat et le retour sur investissement." },
        ],
      },
      "publicite/linkedin-ads": {
        title: "Les bons décideurs, suivis jusqu'à votre pipeline.",
        lead: "Le clic coûte plus cher sur LinkedIn. On démarre sur un budget test et on mesure le lead, pas le clic.",
        items: [
          { image: "publicite-linkedin-ads-1", value: "Décideurs ciblés", label: "Jusqu'au compte nommé", desc: "Fonction, séniorité, secteur, taille d'entreprise, et vos comptes stratégiques nommés en ABM." },
          { image: "publicite-linkedin-ads-2", value: "Lead Gen Forms", label: "Formulaires pré-remplis", desc: "Le décideur vous transmet ses coordonnées sans quitter LinkedIn ni rien ressaisir." },
          { image: "reporting", value: "Suivi jusqu'au CRM", label: "Coût par lead mesuré", desc: "Chaque lead est relié à votre CRM : vous voyez son coût et sa contribution au pipeline." },
          { image: "multilingue", value: "LU + Grande Région", label: "Terrain local", desc: "Des campagnes pensées pour les décideurs du Luxembourg et de la Grande Région." },
        ],
      },
      "branding-design": {
        title: "Ce qu'on garantit à votre marque, noir sur blanc.",
        lead: "Pas de logo générique, pas de fichiers retenus. Des engagements concrets, tenus sur chaque projet de marque.",
        items: [
          { image: "audit", value: "Audit offert", label: "Avant tout devis", desc: "Un diagnostic gratuit de votre image actuelle : ce qui sert votre marque, ce qui la dessert." },
          { image: "branding-design-2", value: "Zéro template", label: "Conçu à la main", desc: "Un logo et une identité pensés pour vous, jamais un modèle vu mille fois." },
          { image: "branding-design-3", value: "100 % à vous", label: "Logo & fichiers sources", desc: "Vectoriel, couleur, noir & blanc, web et print : tout est livré, tout vous appartient." },
          { image: "branding-design-4", value: "Du beau qui sert", label: "Pensé pour convertir", desc: "Chaque choix visuel vise la clarté, la confiance et l'action. Jamais du beau pour du beau." },
        ],
      },
      "branding-design/creation-de-logo": {
        title: "Un logo qui vous ressemble, et qui vous appartient.",
        lead: "Votre logo est souvent la seule chose qu'on retient de vous. Voici ce qu'on s'engage à livrer.",
        items: [
          { image: "branding-design-creation-de-logo-1", value: "Plusieurs pistes", label: "Concepts originaux", desc: "Des concepts distincts, dessinés main pour vous. Jamais des templates retouchés." },
          { image: "branding-design-creation-de-logo-2", value: "Affiné ensemble", label: "Allers-retours", desc: "La piste choisie, retravaillée avec vous. Objectif : un logo que vous adorez." },
          { image: "branding-design-creation-de-logo-3", value: "Lisible partout", label: "Tests multi-supports", desc: "Vérifié en petit et grand format, sur fond clair et foncé, à l'écran et sur papier." },
          { image: "branding-design-creation-de-logo-4", value: "Propriété intégrale", label: "Fichiers sources livrés", desc: "Vectoriel, web, print, favicon : tous les fichiers sont à vous, sans redevance ni frais cachés." },
        ],
      },
      "branding-design/identite-visuelle": {
        title: "Une marque cohérente, des règles noir sur blanc.",
        lead: "Logo, couleurs, typographies, charte : tout est défini, documenté et livré, pour que chacun applique votre marque sans hésiter.",
        items: [
          { image: "branding-design-identite-visuelle-1", value: "Logo inclus", label: "Le cœur de l'identité", desc: "Créé sur mesure, ou repris de votre logo existant et rafraîchi si besoin." },
          { image: "branding-design-identite-visuelle-2", value: "RGB · CMJN · Pantone", label: "Couleurs sans approximation", desc: "Chaque couleur définie en HEX, RGB, CMJN et Pantone, pour l'écran comme pour l'impression." },
          { image: "branding-design-identite-visuelle-3", value: "Charte en PDF", label: "Règles d'usage écrites", desc: "Zones de protection, tailles minimales, usages interdits : plus aucune place à l'interprétation." },
          { image: "branding-design-identite-visuelle-4", value: "Assets organisés", label: "Prêts pour vos équipes", desc: "Tous vos fichiers sources rangés et accessibles, pour vos équipes comme pour vos prestataires." },
        ],
      },
      "branding-design/supports-print": {
        title: "Des supports à votre image, des fichiers irréprochables.",
        lead: "Le print rassure vos clients. On conçoit chaque support avec le même soin que votre site, jusqu'au fichier final.",
        items: [
          { image: "branding-design-supports-print-1", value: "Prêts pour l'imprimeur", label: "Fichiers conformes", desc: "Fonds perdus, CMJN, traits de coupe, profils colorimétriques : des fichiers acceptés sans retouche." },
          { image: "branding-design-supports-print-2", value: "Fiche technique", label: "Pour votre imprimeur", desc: "Les spécifications à transmettre à l'imprimeur de votre choix, pour un résultat sans mauvaise surprise." },
          { image: "branding-design-supports-print-3", value: "Fidèle à votre marque", label: "Charte respectée", desc: "Chaque support prolonge votre identité, qu'on l'ait créée ou que vous ayez déjà une charte." },
          { image: "branding-design-supports-print-4", value: "Gabarits réutilisables", label: "Pensé pour la suite", desc: "Des modèles et déclinaisons livrés avec vos fichiers : la prochaine édition ne repart pas de zéro." },
        ],
      },
      "automatisation-ia": {
        title: "Automatiser, oui. Perdre le contrôle, jamais.",
        lead: "Pas de projet IA qui s'enlise. Des engagements concrets, de l'audit offert à la documentation remise.",
        items: [
          { image: "audit", value: "Audit offert", label: "Avant tout devis", desc: "On identifie gratuitement les tâches qui méritent vraiment d'être automatisées chez vous." },
          { image: "automatisation-ia-2", value: "Un cas d'usage d'abord", label: "Puis on élargit", desc: "On démarre sur une tâche mesurable, puis on étend seulement ce qui fait ses preuves." },
          { image: "automatisation-ia-3", value: "RGPD dès la conception", label: "Confidentialité d'abord", desc: "Chaque automatisation est conçue dans le respect du RGPD et de la confidentialité de vos données." },
          { image: "code", value: "Documentation remise", label: "Pas de boîte noire", desc: "Chaque workflow est documenté : vous savez ce qui tourne, où, et pourquoi." },
        ],
      },
      "automatisation-ia/integrations-crm-api": {
        title: "Vos outils enfin reliés, sans tout reconstruire.",
        lead: "Doubles saisies, leads perdus entre deux outils. Voici comment on connecte votre stack, proprement et en sécurité.",
        items: [
          { image: "automatisation-ia-integrations-crm-api-1", value: "Votre stack conservée", label: "On part de l'existant", desc: "On connecte les outils que vos équipes utilisent déjà, sans vous imposer d'en changer." },
          { image: "automatisation-ia-integrations-crm-api-2", value: "API sur mesure", label: "Quand le connecteur manque", desc: "Pas de connecteur tout fait ? On développe l'intégration via l'API ou des webhooks." },
          { image: "code", value: "Accès maîtrisés", label: "Synchro conforme RGPD", desc: "Connexions sécurisées et gestion fine des accès, dans le respect du RGPD." },
          { image: "reporting", value: "Testé, puis supervisé", label: "Avant et après lancement", desc: "Chaque intégration est testée avant mise en service, documentée, puis supervisée." },
        ],
      },
    },
  },
  serviceContent: {
    "sites-web": {
      // headline of the hero laser animation (kept apart from the page title)
      motionTitle: "Sites web qui convertissent",
      motionEyebrow: "Sur-mesure",
      intro: [
        "Votre site est souvent le premier — parfois le seul — rendez-vous avec un client. On le conçoit comme un commercial qui travaille 24/7 : rapide, clair, orienté action.",
        "On construit tout en sur-mesure : ultra-rapide, sécurisé et pensé IA-ready. Et oui : une grande partie de notre production est accélérée par l'IA — plus de qualité, livrée plus vite.",
      ],
      included: [
        { icon: "ai-build", title: "Conçu avec l'IA", desc: "On accélère le design et le développement avec l'IA, sans jamais sacrifier la qualité ni la cohérence." },
        { icon: "process", title: "Mises à jour gérées", desc: "Contenus, sécurité, évolutions : on s'occupe des mises à jour de votre site, vous restez concentré sur votre activité." },
        { icon: "next-perf", title: "Performance", desc: "Pour le sur-mesure, un site quasi instantané, sécurisé et taillé pour le SEO et le GEO." },
        { icon: "responsive", title: "100 % responsive", desc: "Une expérience impeccable sur mobile, tablette et ordinateur — le mobile d'abord." },
        { icon: "conversion", title: "Pensé pour convertir", desc: "Chaque page a un objectif : générer un appel, un devis, un lead. On guide le visiteur vers l'action." },
        { icon: "smart-forms", title: "Formulaires intelligents", desc: "Formulaires multi-étapes qui qualifient vos prospects et augmentent le taux de réponse." },
      ],
      deliverables: [
        "Maquettes et design sur mesure validés avec vous",
        "Site 100 % sur mesure",
        "Optimisation SEO & GEO de base intégrée",
        "Formulaires, tracking et mise en ligne inclus",
      ],
      faq: [
        { q: "Pourquoi du sur-mesure plutôt qu'un template ?", a: "Le sur-mesure offre la meilleure performance, sécurité et flexibilité : votre site est conçu pour votre activité, pas adapté d'un modèle vu mille fois." },
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
        "Être visible ne suffit plus : il faut être trouvé sur Google et cité par les IA génératives. On travaille les deux fronts en même temps car, selon notre pratique, environ 80 % des bonnes pratiques sont communes.",
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
    // Coverflow slides: generic mockups (public/portfolio/mockup-<slug>.webp), one per deliverable type.
    items: [
      { slug: "site-vitrine-garage", name: "Site vitrine · Garage automobile" },
      { slug: "logo-menuiserie", name: "Logo · Menuiserie" },
      { slug: "landing-immobilier", name: "Landing page · Immobilier" },
      { slug: "identite-cafe", name: "Identité visuelle · Café" },
      { slug: "site-cabinet", name: "Site multilingue · Cabinet" },
      { slug: "charte-graphique", name: "Charte graphique · PME" },
      { slug: "campagne-solaire", name: "Campagne publicitaire · Panneaux solaires" },
    ],
    cta: "Travaillons ensemble",
    prev: "Projet précédent",
    next: "Projet suivant",
    pause: "Mettre en pause",
    play: "Reprendre le défilement",
  },

  // ---- Sub-services (children of a parent service) ----
  subServicesTitle: "Des spécialités pour chaque besoin",
  subServicesLead: "Ce service se décline en expertises ciblées. Prenez celle qui colle à votre besoin — ou combinez-les pour couvrir tout le terrain.",
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
      {
        slug: "linkedin-ads",
        illustration: "linkedin-ads",
        title: "LinkedIn Ads",
        tagline: "Touchez les décideurs luxembourgeois là où ils décident.",
        short:
          "La publicité B2B la plus précise : ciblez par fonction, secteur et entreprise. Idéal pour les cycles de vente longs et les comptes stratégiques au Luxembourg et dans la Grande Région.",
        bullets: [
          "Ciblage par poste, secteur & entreprise",
          "Lead Gen Forms intégrés",
          "Account-Based Marketing (ABM)",
          "Suivi du coût par lead & du pipeline",
        ],
        metaTitle: "Agence LinkedIn Ads B2B à Luxembourg | vortx",
        metaDescription:
          "Campagnes LinkedIn Ads B2B au Luxembourg : ciblage par fonction et entreprise, Lead Gen Forms, ABM. Touchez les décideurs, générez des leads qualifiés.",
        intro: [
          "En B2B, vous ne vendez pas à une entreprise : vous convainquez des personnes. LinkedIn Ads est le seul canal qui vous permet de cibler précisément les décideurs — par fonction, secteur, taille d'entreprise et même par compte nommé.",
          "On structure vos campagnes (Lead Gen Forms, contenus sponsorisés, message ads) pour parler aux bonnes personnes au bon moment, et on relie chaque lead à votre pipeline pour mesurer le vrai retour, pas juste des clics.",
        ],
        included: [
          { icon: "linkedin", title: "Ciblage décideurs", desc: "Par fonction, séniorité, secteur et taille d'entreprise — la précision B2B que seul LinkedIn offre." },
          { icon: "leads", title: "Lead Gen Forms", desc: "Des formulaires pré-remplis intégrés à LinkedIn pour capter des leads qualifiés sans friction." },
          { icon: "ads-targeting", title: "Account-Based Marketing", desc: "On cible vos comptes stratégiques nommés et les bons interlocuteurs au sein de chacun." },
          { icon: "analytics", title: "Pipeline & ROI", desc: "Suivi du coût par lead et de la contribution au pipeline, intégré à votre CRM." },
        ],
        deliverables: [
          "Stratégie de ciblage & structure de campagnes",
          "Création des annonces & Lead Gen Forms",
          "Mise en place du suivi (CRM, conversions)",
          "Reporting coût par lead & optimisation continue",
        ],
        faq: [
          { q: "LinkedIn Ads, n'est-ce pas trop cher ?", a: "Le coût par clic est plus élevé qu'ailleurs, mais la qualité des leads aussi. En B2B, un seul client signé rentabilise souvent largement la campagne. On commence par un budget test et on n'augmente que ce qui est rentable." },
          { q: "Faut-il une page entreprise LinkedIn active ?", a: "C'est un plus pour la crédibilité, mais pas un prérequis pour lancer des campagnes. On peut vous aider à mettre votre page à niveau en parallèle." },
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
          { q: "Le GEO remplace-t-il le SEO ?", a: "Non, il le complète. Environ 80 % des bonnes pratiques sont communes : un contenu structuré et fiable performe à la fois sur Google et auprès des IA. On optimise pour les deux." },
          { q: "Comment mesure-t-on les résultats du GEO ?", a: "On suit votre présence dans les réponses des assistants IA (citations, mentions) et l'évolution de votre autorité. C'est un domaine émergent : on avance avec méthode et transparence." },
        ],
      },
      {
        slug: "seo-local",
        illustration: "seo-local",
        title: "SEO local & Google Business Profile",
        tagline: "Dominez les recherches « près de moi » au Luxembourg.",
        short:
          "Soyez la réponse évidente quand un client cherche près de chez lui. Optimisation de votre fiche Google Business Profile, citations locales et avis pour capter la demande de proximité, partout dans la Grande Région.",
        bullets: [
          "Fiche Google Business Profile optimisée",
          "Citations & cohérence NAP locales",
          "Stratégie d'avis clients",
          "Schema LocalBusiness multilingue",
        ],
        metaTitle: "Agence SEO local & Google Business Profile à Luxembourg | vortx",
        metaDescription:
          "Référencement local au Luxembourg : Google Business Profile, avis clients et pages locales. Captez les recherches « près de moi » avant vos concurrents.",
        intro: [
          "Quand un client cherche « plombier Luxembourg » ou « agence près de moi », Google affiche d'abord une carte et trois fiches. Si vous n'y êtes pas, vous êtes invisible — même premier dans les résultats classiques.",
          "Le SEO local optimise votre présence sur cette carte et dans le pack local : fiche Google Business Profile complète, cohérence de vos coordonnées partout sur le web, avis clients et balisage technique. Un levier décisif pour les commerces, artisans et services de proximité au Luxembourg et à la frontière.",
        ],
        included: [
          { icon: "local-seo", title: "Google Business Profile", desc: "Catégories, services, photos, posts et horaires : une fiche complète qui inspire confiance et remonte sur la carte." },
          { icon: "seo", title: "Citations & NAP", desc: "Nom, adresse, téléphone cohérents sur les annuaires et plateformes locales — un signal clé pour Google." },
          { icon: "conversion", title: "Avis & réputation", desc: "Une stratégie d'avis clients et de réponses pour renforcer vos signaux locaux et votre crédibilité." },
          { icon: "geo-citation", title: "Pages & Schema locaux", desc: "Pages de destination locales et données structurées LocalBusiness, en FR/DE/EN." },
        ],
        deliverables: [
          "Audit & optimisation Google Business Profile",
          "Nettoyage et création de citations locales",
          "Stratégie d'avis et modèles de réponses",
          "Pages locales & balisage Schema multilingue",
        ],
        faq: [
          { q: "Le SEO local, c'est utile si je n'ai pas de boutique ?", a: "Oui, dès que vous avez une zone de chalandise : artisans, services à domicile, professions libérales. On peut configurer une fiche « zone desservie » sans adresse publique." },
          { q: "En combien de temps ma fiche remonte-t-elle ?", a: "Les premières améliorations (complétude, photos, catégories) agissent en quelques semaines. La constance des avis et des citations consolide la position sur quelques mois." },
        ],
      },
    ],
    "sites-web": [
      {
        slug: "site-vitrine",
        illustration: "site-vitrine",
        title: "Site vitrine sur-mesure",
        tagline: "Une vitrine digitale qui inspire confiance dès la première seconde.",
        short:
          "Le site qui présente votre entreprise, vos services et votre crédibilité — conçu 100 % sur mesure, rapide et orienté action. Votre meilleur commercial, disponible 24/7.",
        bullets: [
          "Design 100 % sur mesure, zéro template",
          "Architecture pensée pour la conversion",
          "Responsive & ultra-rapide",
          "Optimisé SEO dès le lancement",
        ],
        metaTitle: "Création de site vitrine à Luxembourg | vortx",
        metaDescription:
          "Création de site vitrine sur mesure au Luxembourg : design premium, rapide, responsive et orienté conversion. Votre meilleur commercial, 24/7.",
        intro: [
          "Votre site vitrine est souvent le premier contact d'un prospect avec votre entreprise. En quelques secondes, il décide s'il vous fait confiance — ou s'il retourne sur Google. On conçoit ce premier rendez-vous pour qu'il joue en votre faveur.",
          "Design sur mesure, structure claire, chargement quasi instantané : chaque page met en valeur votre expertise et guide le visiteur vers l'action — un appel, un message, un devis. Pas un catalogue figé, un commercial qui travaille pour vous.",
        ],
        included: [
          { icon: "ai-build", title: "Design sur mesure", desc: "Une identité visuelle unique, à votre image — jamais un template recyclé vu mille fois." },
          { icon: "conversion", title: "Pensé pour convertir", desc: "Chaque page a un objectif clair et guide le visiteur vers le contact ou le devis." },
          { icon: "responsive", title: "100 % responsive", desc: "Une expérience impeccable sur mobile, tablette et ordinateur — le mobile d'abord." },
          { icon: "seo", title: "SEO intégré", desc: "Structure, performance et données prêtes pour Google et les IA dès la mise en ligne." },
        ],
        deliverables: [
          "Maquettes & design sur mesure validés avec vous",
          "Site vitrine responsive",
          "Optimisation SEO & GEO de base",
          "Formulaires, tracking et mise en ligne inclus",
        ],
        faq: [
          { q: "Combien de pages comprend un site vitrine ?", a: "Cela dépend de votre activité — souvent 5 à 10 pages (accueil, services, à propos, contact…). On définit ensemble l'arborescence la plus claire pour vos visiteurs et pour Google." },
          { q: "Pourrai-je modifier le contenu moi-même ?", a: "On s'occupe des mises à jour pour vous : vous nous envoyez vos changements, on les intègre." },
        ],
      },
      {
        slug: "site-e-commerce",
        illustration: "site-e-commerce",
        title: "Site e-commerce",
        tagline: "De la fiche produit au paiement, chaque pixel travaille pour vos ventes.",
        short:
          "Des boutiques en ligne pensées pour vendre : tunnel d'achat fluide, paiements sécurisés, gestion autonome du catalogue. Une mécanique de vente, pas juste un site.",
        bullets: [
          "Tunnel d'achat optimisé",
          "Paiements & logistique intégrés",
          "Gestion catalogue autonome",
          "Suivi des performances de vente",
        ],
        metaTitle: "Création de site e-commerce à Luxembourg | vortx",
        metaDescription:
          "Création de boutiques en ligne performantes au Luxembourg : tunnel d'achat optimisé, paiements sécurisés, gestion catalogue. Un e-commerce qui vend.",
        intro: [
          "Une boutique en ligne ne se juge pas à son catalogue, mais à son taux de conversion. Trop de sites e-commerce perdent leurs clients entre le produit et le panier. On construit le vôtre pour les amener jusqu'au paiement, sans friction.",
          "Fiches produits convaincantes, tunnel d'achat fluide, paiements sécurisés et gestion autonome de votre catalogue : on relie le tout à vos outils (stock, livraison, comptabilité) et on suit les performances pour optimiser ce qui fait vendre.",
        ],
        included: [
          { icon: "ecommerce", title: "Tunnel d'achat optimisé", desc: "Du produit au paiement, un parcours fluide conçu pour réduire l'abandon de panier." },
          { icon: "smart-forms", title: "Paiements sécurisés", desc: "Intégration des moyens de paiement et des règles de TVA, en toute sécurité." },
          { icon: "automation", title: "Gestion autonome", desc: "Un back-office clair pour gérer produits, stocks et commandes sans dépendre de nous." },
          { icon: "analytics", title: "Suivi des ventes", desc: "Tableau de bord des conversions, paniers et produits qui performent." },
        ],
        deliverables: [
          "Boutique en ligne responsive & sécurisée",
          "Catalogue, paiements et livraison configurés",
          "Tunnel d'achat optimisé pour la conversion",
          "Suivi e-commerce & formation à la gestion",
        ],
        faq: [
          { q: "Sur quelle plateforme construisez-vous la boutique ?", a: "Sur une solution sur mesure, pensée pour la performance et vos besoins spécifiques : catalogue, paiements, livraison. On vous conseille selon votre activité." },
          { q: "Gérez-vous les paiements et la TVA ?", a: "Oui. On configure les moyens de paiement, les règles de TVA luxembourgeoises et, si besoin, la connexion à votre logistique et votre comptabilité." },
        ],
      },
      {
        slug: "landing-pages",
        illustration: "landing-pages",
        title: "Landing pages haute conversion",
        tagline: "Une page, un objectif, un maximum de leads.",
        short:
          "Des pages d'atterrissage conçues pour une seule action : convertir. Idéales pour vos campagnes publicitaires, lancements et offres ciblées.",
        bullets: [
          "Conçue pour une seule action",
          "Lancement rapide, mobile-first",
          "A/B testing & optimisation",
          "Connectée à vos campagnes",
        ],
        metaTitle: "Création de landing pages à Luxembourg | vortx",
        metaDescription:
          "Création de landing pages haute conversion au Luxembourg : rapides, mobile-first, optimisées pour vos campagnes. Plus de leads, moins de budget gaspillé.",
        intro: [
          "Envoyer du trafic publicitaire vers votre page d'accueil, c'est gaspiller du budget. Une landing page a un seul objectif et supprime toutes les distractions pour amener le visiteur à une action précise : remplir un formulaire, réserver, télécharger.",
          "On conçoit des pages rapides, persuasives et mobile-first, alignées sur le message de chaque campagne, puis on les teste et on les optimise pour faire grimper le taux de conversion — et baisser votre coût par lead.",
        ],
        included: [
          { icon: "landing", title: "Une seule action", desc: "Zéro distraction : tout converge vers l'objectif unique de la page." },
          { icon: "speed", title: "Rapide & mobile-first", desc: "Chargement quasi instantané, parfaite sur mobile où arrive l'essentiel du trafic payant." },
          { icon: "ab-test", title: "A/B testing", desc: "On teste titres, visuels et formulaires pour optimiser la conversion en continu." },
          { icon: "ads-targeting", title: "Connectée aux campagnes", desc: "Message aligné sur votre pub et tracking des conversions de bout en bout." },
        ],
        deliverables: [
          "Landing page sur mesure optimisée conversion",
          "Copywriting persuasif & formulaire optimisé",
          "Mise en place du tracking des conversions",
          "Plan d'A/B testing & recommandations",
        ],
        faq: [
          { q: "Une landing page, c'est différent d'une page de mon site ?", a: "Oui. Une page de site informe et propose plusieurs chemins ; une landing page poursuit un objectif unique, sans menu ni distraction, pour maximiser la conversion d'une campagne précise." },
          { q: "Combien de temps pour livrer une landing page ?", a: "Souvent quelques jours. Notre production accélérée par l'IA permet de lancer vite, ce qui est essentiel pour caler une campagne." },
        ],
      },
      {
        slug: "refonte-de-site",
        illustration: "refonte-de-site",
        title: "Refonte de site web",
        tagline: "Transformez un site qui dort en moteur de croissance.",
        short:
          "Votre site est lent, daté ou ne convertit plus ? On le repense de fond en comble — design, performance, SEO — sans perdre votre référencement acquis.",
        bullets: [
          "Audit UX & performance complet",
          "Migration sans perte de SEO",
          "Refonte visuelle & technique",
          "Résultats mesurables",
        ],
        metaTitle: "Refonte de site web à Luxembourg | vortx",
        metaDescription:
          "Refonte de site web au Luxembourg : audit UX, nouveau design, performance et migration sans perte de SEO. Transformez un site dépassé en moteur de conversion.",
        intro: [
          "Un site daté coûte plus cher qu'il n'y paraît : il fait fuir les visiteurs, plombe votre crédibilité et votre référencement. La refonte n'est pas un simple relooking — c'est l'occasion de repartir sur des fondations saines.",
          "On commence par un audit (UX, performance, SEO, conversion) pour comprendre ce qui bloque, puis on repense design et technique. Point crucial : on migre proprement pour préserver — et souvent améliorer — votre référencement existant.",
        ],
        included: [
          { icon: "redesign", title: "Audit complet", desc: "UX, performance, SEO et conversion : on identifie précisément ce qui freine votre site actuel." },
          { icon: "ai-build", title: "Refonte design & technique", desc: "Un nouveau design moderne sur des bases techniques rapides et durables." },
          { icon: "seo", title: "Migration sans perte SEO", desc: "Redirections, structure et contenu migrés proprement pour protéger votre référencement." },
          { icon: "speed", title: "Performance retrouvée", desc: "Un site quasi instantané — meilleure expérience, meilleur référencement, plus de conversions." },
        ],
        deliverables: [
          "Audit complet du site existant",
          "Nouveau design & développement",
          "Plan de migration & redirections SEO",
          "Mise en ligne et suivi des positions",
        ],
        faq: [
          { q: "Vais-je perdre mon référencement Google ?", a: "C'est tout le risque d'une refonte mal faite — et précisément ce qu'on évite. On cartographie vos URLs, on met en place les redirections et on préserve la structure SEO. Bien menée, une refonte améliore souvent le référencement." },
          { q: "Peut-on garder une partie de l'existant ?", a: "Oui. On garde ce qui fonctionne (contenus, éléments de marque, pages performantes) et on refait ce qui freine. L'audit le détermine objectivement." },
        ],
      },
      {
        slug: "application-web",
        illustration: "application-web",
        title: "Applications & plateformes sur-mesure",
        tagline: "Quand un site ne suffit plus, on construit votre outil.",
        short:
          "Espaces clients, back-offices, plateformes métier : du développement 100 % sur mesure pour digitaliser un process et créer un avantage que vos concurrents n'ont pas.",
        bullets: [
          "Développement 100 % sur mesure",
          "Espaces clients & back-offices",
          "Intégrations API & automatisations",
          "Scalable & sécurisé",
        ],
        metaTitle: "Développement d'applications web sur-mesure à Luxembourg | vortx",
        metaDescription:
          "Applications et plateformes web sur mesure au Luxembourg : espaces clients, back-offices, intégrations API. Digitalisez vos process, prenez de l'avance.",
        intro: [
          "Certains besoins dépassent le site web : un espace client, un outil de gestion interne, une plateforme qui automatise un process métier. C'est là qu'une application sur mesure devient un vrai avantage concurrentiel.",
          "On conçoit et développe des applications web rapides, sécurisées et évolutives, connectées à vos outils existants. De la cartographie du besoin jusqu'à la mise en production, on construit l'outil qui colle exactement à votre façon de travailler.",
        ],
        included: [
          { icon: "webapp", title: "Sur mesure intégral", desc: "Une application pensée pour votre process précis — pas un logiciel générique qu'on subit." },
          { icon: "next-perf", title: "Rapide & sécurisée", desc: "Architecture moderne, performante et conçue dans le respect du RGPD." },
          { icon: "integration", title: "Intégrations & API", desc: "Connectée à votre CRM, vos outils et des services tiers via API et webhooks." },
          { icon: "automation", title: "Évolutive", desc: "Une base qui grandit avec vous : on ajoute des modules au fil de vos besoins." },
        ],
        deliverables: [
          "Cartographie du besoin & spécifications",
          "Maquettes UX/UI & architecture technique",
          "Développement, tests & mise en production",
          "Documentation, formation & maintenance",
        ],
        faq: [
          { q: "Comment se déroule un projet d'application ?", a: "Par étapes : cadrage du besoin, maquettes, développement par itérations que vous validez, puis mise en production et suivi. Vous voyez l'outil prendre forme sans tunnel de plusieurs mois à l'aveugle." },
          { q: "L'application m'appartient-elle entièrement ?", a: "Oui. Code, données et accès vous appartiennent. Pas d'enfermement : vous pouvez la faire évoluer avec nous ou en interne." },
        ],
      },
      {
        slug: "site-multilingue",
        illustration: "site-multilingue",
        title: "Sites multilingues FR / DE / EN / AUTRE",
        tagline: "Parlez à tout le Luxembourg, et bien au-delà.",
        short:
          "Au Luxembourg, vos clients comparent en plusieurs langues. On construit des sites multilingues natifs, optimisés langue par langue pour le référencement et la conversion.",
        bullets: [
          "Gestion native du multilingue",
          "SEO localisé par langue (hreflang)",
          "Cohérence éditoriale & UX",
          "Adapté au marché transfrontalier",
        ],
        metaTitle: "Création de site multilingue (FR/DE/EN) à Luxembourg | vortx",
        metaDescription:
          "Sites multilingues natifs pour le Luxembourg : FR, DE, EN et plus. SEO localisé (hreflang), cohérence éditoriale et UX. Parlez à tout votre marché.",
        intro: [
          "Le multilinguisme n'est pas une option au Luxembourg : c'est la réalité du marché. Un client qui cherche en allemand ne doit pas tomber sur une traduction approximative — ni rester invisible parce que votre site n'existe que dans une langue.",
          "On construit des sites multilingues pensés dès le départ pour ça : architecture propre, balisage hreflang correct, SEO optimisé langue par langue et cohérence éditoriale. Pas une traduction plaquée, une vraie présence dans chaque langue.",
        ],
        included: [
          { icon: "multilingual", title: "Multilingue natif", desc: "Une architecture pensée pour plusieurs langues dès la conception, pas ajoutée après coup." },
          { icon: "seo", title: "SEO par langue", desc: "Balisage hreflang, URLs et contenu optimisés indépendamment pour chaque langue." },
          { icon: "conversion", title: "Cohérence éditoriale", desc: "Un ton et une UX cohérents d'une langue à l'autre, adaptés à chaque public." },
          { icon: "geo-citation", title: "Marché transfrontalier", desc: "Pensé pour le Luxembourg et la Grande Région — FR, DE, EN et Lëtzebuergesch sur demande." },
        ],
        deliverables: [
          "Architecture multilingue & stratégie hreflang",
          "Site dans chaque langue, optimisé SEO",
          "Workflow de traduction & cohérence éditoriale",
          "Sélecteur de langue & mise en ligne",
        ],
        faq: [
          { q: "Faites-vous les traductions ?", a: "On peut prendre en charge la rédaction et la traduction professionnelle, ou intégrer proprement vos contenus existants. L'important : un contenu juste et optimisé dans chaque langue, pas une traduction automatique brute." },
          { q: "Le multilingue pénalise-t-il le SEO ?", a: "Au contraire, bien fait, il le renforce : chaque langue capte ses propres recherches. La clé est un balisage hreflang correct et des contenus distincts — exactement ce qu'on met en place." },
        ],
      },
    ],
    "lead-generation": [
      {
        slug: "tunnels-de-conversion",
        illustration: "tunnels-de-conversion",
        title: "Tunnels de conversion",
        tagline: "Du premier clic au devis signé, un parcours pensé pour convertir.",
        short:
          "On architecture le chemin complet entre l'inconnu et le client : étapes alignées, messages adaptés à chaque phase, tracking de bout en bout. Le squelette de votre acquisition.",
        bullets: [
          "Architecture de funnel (TOFU/MOFU/BOFU)",
          "Étapes & messages alignés",
          "Tracking & attribution complets",
          "Tests A/B continus",
        ],
        metaTitle: "Création de tunnels de conversion à Luxembourg | vortx",
        metaDescription:
          "Tunnels de conversion pour les entreprises luxembourgeoises : parcours du clic au client, tracking complet, optimisation continue. Plus de leads qualifiés.",
        intro: [
          "Vos clients ne passent pas de l'inconnu à l'achat en un clic. Ils suivent un parcours : ils découvrent, ils se renseignent, ils comparent, puis ils décident. Un tunnel de conversion accompagne ce parcours étape par étape, avec le bon message au bon moment.",
          "On cartographie ce chemin (TOFU/MOFU/BOFU), on aligne chaque page et chaque relance sur la phase concernée, et on installe un tracking complet pour savoir précisément où vous gagnez — et où vous perdez — des prospects.",
        ],
        included: [
          { icon: "funnel", title: "Architecture de funnel", desc: "Un parcours structuré du premier contact à la conversion, sans trou dans la raquette." },
          { icon: "conversion", title: "Messages alignés", desc: "Le bon argument à chaque étape : découverte, considération, décision." },
          { icon: "analytics", title: "Tracking & attribution", desc: "On mesure chaque étape pour savoir ce qui convertit et ce qui freine." },
          { icon: "ab-test", title: "Optimisation continue", desc: "Tests A/B réguliers pour améliorer le taux de conversion à chaque palier." },
        ],
        deliverables: [
          "Cartographie complète du tunnel de conversion",
          "Pages & séquences alignées par étape",
          "Mise en place du tracking & de l'attribution",
          "Tableau de bord & plan d'optimisation",
        ],
        faq: [
          { q: "Un tunnel, c'est seulement pour la vente en ligne ?", a: "Non. En B2B, le tunnel mène souvent à une demande de devis ou un appel, pas à un paiement. On l'adapte à votre cycle de vente réel, même long." },
          { q: "Faut-il déjà avoir du trafic ?", a: "Le tunnel optimise la conversion du trafic existant ; on peut aussi le coupler à du SEO ou de la pub pour alimenter le haut du funnel. On commence par maximiser ce que vous captez déjà." },
        ],
      },
      {
        slug: "landing-pages-campagne",
        illustration: "landing-pages-campagne",
        title: "Landing pages de campagne",
        tagline: "Des pages d'atterrissage qui transforment le trafic en demandes.",
        short:
          "Pour chaque campagne, une page dédiée alignée sur son message et son audience. Le complément indispensable de vos publicités pour ne pas gaspiller un seul clic.",
        bullets: [
          "Une page par campagne",
          "Copywriting persuasif",
          "Formulaires optimisés",
          "Mobile-first & rapide",
        ],
        metaTitle: "Landing pages de campagne à Luxembourg | vortx",
        metaDescription:
          "Landing pages de campagne au Luxembourg : pages dédiées, copywriting persuasif, formulaires optimisés. Convertissez chaque clic publicitaire en lead.",
        intro: [
          "Une campagne qui renvoie vers une page générique perd la moitié de son potentiel. À chaque message publicitaire doit correspondre une page qui le prolonge : même promesse, même audience, une seule action attendue.",
          "On crée des landing pages persuasives et rapides pour vos campagnes Google, Meta ou LinkedIn, avec un copywriting orienté bénéfice et des formulaires conçus pour maximiser le taux de réponse — pas pour décourager.",
        ],
        included: [
          { icon: "landing", title: "Une page par campagne", desc: "Chaque page prolonge le message de la pub : continuité parfaite, zéro déperdition." },
          { icon: "branding", title: "Copywriting persuasif", desc: "Des textes orientés bénéfices qui répondent aux objections et déclenchent l'action." },
          { icon: "smart-forms", title: "Formulaires optimisés", desc: "Juste assez de champs pour qualifier sans décourager, pensés pour le taux de réponse." },
          { icon: "speed", title: "Mobile-first & rapide", desc: "Parfaites sur mobile, où arrive l'essentiel du trafic des campagnes." },
        ],
        deliverables: [
          "Landing pages dédiées par campagne",
          "Copywriting & structure de conversion",
          "Formulaires optimisés & tracking",
          "Variantes pour A/B testing",
        ],
        faq: [
          { q: "Combien de landing pages me faut-il ?", a: "Idéalement une par offre ou par audience clé. Plus le message est aligné sur l'intention, plus le taux de conversion grimpe. On commence par vos campagnes prioritaires." },
          { q: "Travaillez-vous avec mes campagnes existantes ?", a: "Oui. On peut créer les pages pour vos campagnes en cours, qu'elles soient gérées par vous ou par notre équipe publicité." },
        ],
      },
      {
        slug: "email-marketing-automation",
        illustration: "email-marketing-automation",
        title: "Email marketing & automation",
        tagline: "Des séquences automatisées qui travaillent vos prospects 24/7.",
        short:
          "L'email reste le canal au meilleur ROI. On met en place des séquences automatisées qui réchauffent vos prospects, relancent au bon moment et transforment l'intérêt en rendez-vous.",
        bullets: [
          "Séquences de nurturing automatisées",
          "Scénarios déclenchés (triggers)",
          "Délivrabilité soignée",
          "Intégration CRM",
        ],
        metaTitle: "Email marketing & marketing automation à Luxembourg | vortx",
        metaDescription:
          "Email marketing et automation au Luxembourg : séquences de nurturing, scénarios déclenchés, intégration CRM. Convertissez vos prospects en pilote automatique.",
        intro: [
          "Tous vos prospects ne sont pas prêts à acheter aujourd'hui. Sans suivi, la plupart vous oublient. L'email automation garde le lien : il informe, rassure et relance automatiquement, jusqu'à ce que le prospect soit prêt.",
          "On conçoit des séquences déclenchées par le comportement (téléchargement, visite, inactivité), on soigne la délivrabilité pour atterrir dans la boîte de réception, et on relie le tout à votre CRM pour que vos commerciaux reçoivent des leads déjà réchauffés.",
        ],
        included: [
          { icon: "email-automation", title: "Séquences automatisées", desc: "Des scénarios qui se déclenchent seuls et accompagnent chaque prospect au bon rythme." },
          { icon: "nurturing", title: "Nurturing intelligent", desc: "Le bon contenu selon la phase : on réchauffe sans harceler, jusqu'à la décision." },
          { icon: "conversion", title: "Délivrabilité soignée", desc: "Configuration technique (SPF, DKIM) pour atterrir dans la boîte de réception, pas en spam." },
          { icon: "integration", title: "Intégration CRM", desc: "Synchronisation avec votre CRM : vos commerciaux reçoivent des leads déjà qualifiés." },
        ],
        deliverables: [
          "Stratégie de séquences & scénarios",
          "Rédaction & design des emails",
          "Configuration de l'automatisation & délivrabilité",
          "Connexion CRM & reporting",
        ],
        faq: [
          { q: "Est-ce conforme au RGPD ?", a: "Oui. On travaille uniquement sur des bases opt-in, avec consentement et désinscription clairs. La conformité RGPD est intégrée dès la conception des séquences." },
          { q: "Faut-il déjà une liste d'emails ?", a: "C'est un plus, mais on peut aussi mettre en place la captation (lead magnets, formulaires) pour la construire proprement. On part de votre situation réelle." },
        ],
      },
    ],
    "branding-design": [
      {
        slug: "creation-de-logo",
        illustration: "creation-de-logo",
        title: "Création de logo",
        tagline: "Un symbole qui vous rend reconnaissable en un coup d'œil.",
        short:
          "Uniquement votre logo : un symbole unique, conçu à la main et décliné dans tous les formats utiles. Le point de départ d'une marque dont on se souvient — pas un pictogramme générique.",
        bullets: [
          "Concepts originaux dessinés main",
          "Déclinaisons (couleur, mono, favicon)",
          "Formats vectoriels livrés",
          "Tests de lisibilité multi-supports",
        ],
        metaTitle: "Création de logo sur mesure à Luxembourg | vortx",
        metaDescription:
          "Création de logo sur mesure à Luxembourg : concepts originaux, déclinaisons et formats vectoriels. Un symbole unique et mémorable, fidèle à votre identité.",
        intro: [
          "Votre logo est la première chose qu'on retient de vous — et souvent la seule. Il doit être unique, lisible partout, et fidèle à ce que vous êtes. On le conçoit sur mesure, jamais à partir d'une banque de symboles recyclés.",
          "On explore plusieurs pistes créatives, on affine avec vous celle qui vous ressemble, puis on la décline dans tous les formats dont vous aurez besoin — couleur, monochrome, favicon, versions web et print. Un logo qui tient la route partout et dans le temps.",
        ],
        included: [
          { icon: "logo", title: "Concepts dessinés main", desc: "Plusieurs pistes originales conçues pour vous, pas des templates retouchés." },
          { icon: "branding", title: "Déclinaisons complètes", desc: "Versions couleur, noir & blanc, monochrome, favicon : votre logo prêt pour tout usage." },
          { icon: "ai-build", title: "Formats vectoriels", desc: "Fichiers vectoriels (SVG, PDF) qui restent nets à toutes les tailles, du favicon à l'enseigne." },
          { icon: "responsive", title: "Lisibilité testée", desc: "Vérifié sur petits et grands formats, fond clair et foncé, écran et papier." },
        ],
        deliverables: [
          "Plusieurs concepts de logo originaux",
          "Logo finalisé en versions couleur & mono",
          "Pack de fichiers (vectoriel, web, print, favicon)",
          "Mini-guide d'utilisation du logo",
        ],
        faq: [
          { q: "Combien de propositions vais-je recevoir ?", a: "On présente plusieurs pistes distinctes, puis on affine celle que vous préférez avec des allers-retours. L'objectif est un logo que vous adorez, pas un compromis tiède." },
          { q: "Le logo m'appartient-il vraiment ?", a: "Oui, intégralement. Vous recevez tous les fichiers sources et en êtes pleinement propriétaire, sans frais cachés ni redevance." },
          { q: "Et si j'ai besoin de toute l'identité visuelle ?", a: "Cette offre porte sur le logo seul. Pour les couleurs, les typographies et la charte graphique complète, choisissez notre offre Identité visuelle & charte graphique : le logo y est inclus." },
        ],
      },
      {
        slug: "identite-visuelle",
        illustration: "identite-visuelle",
        title: "Identité visuelle & charte graphique",
        tagline: "Logo, couleurs, typographies et règles d'usage : votre marque complète, prête à l'emploi.",
        short: "Le pack identité complet : votre logo, le système visuel qui l'entoure (couleurs, typographies, iconographie, direction artistique) et la charte graphique qui en fixe les règles pour vos équipes et vos prestataires.",
        bullets: [
          "Logo sur mesure inclus",
          "Palette de couleurs & typographies",
          "Iconographie, motifs & direction artistique",
          "Charte graphique en document (PDF)",
          "Bibliothèque d'assets prête à l'emploi",
        ],
        metaTitle: "Identité visuelle & charte graphique à Luxembourg | vortx",
        metaDescription:
          "Identité visuelle complète et charte graphique à Luxembourg : logo, couleurs, typographies, iconographie et règles d'usage. Une marque cohérente, appliquée par tous.",
        intro: [
          "Un logo seul ne fait pas une marque. Ce qui vous rend reconnaissable, c'est la cohérence de tout le reste : vos couleurs, vos typographies, vos images, votre style — et des règles claires pour que chacun les applique de la même façon.",
          "On construit tout, de A à Z : le logo, le système visuel qui l'accompagne (palette, hiérarchie typographique, iconographie, motifs, direction artistique), puis la charte graphique qui documente son usage — zones de protection, codes couleurs précis, espacements, exemples concrets.",
          "Résultat : une identité modulaire qui évolue avec vous, et un guide que vos équipes comme vos prestataires peuvent suivre sans hésiter, du site web aux réseaux sociaux, du print à la présentation.",
        ],
        included: [
          { icon: "logo", title: "Logo sur mesure", desc: "Le cœur de l'identité : un logo unique, décliné en couleur, monochrome et favicon." },
          { icon: "brand-identity", title: "Couleurs & typographies", desc: "Une palette et une hiérarchie typographique distinctives, avec leurs codes précis (HEX, RGB, CMJN, Pantone)." },
          { icon: "branding", title: "Iconographie & direction artistique", desc: "Icônes, motifs et style photo propres à votre marque, pour que tout ce que vous produisez vous ressemble." },
          { icon: "guidelines", title: "Charte graphique", desc: "Les règles d'usage documentées : tailles minimales, zones de protection, usages corrects et interdits." },
          { icon: "responsive", title: "Exemples d'application", desc: "Papeterie, web, réseaux sociaux, présentations : des cas concrets pour lever toute ambiguïté." },
          { icon: "process", title: "Assets prêts à l'emploi", desc: "Tous les fichiers sources organisés et accessibles pour vos équipes et vos prestataires." },
        ],
        deliverables: [
          "Logo finalisé (couleur, mono, favicon, vectoriel)",
          "Palette de couleurs & système typographique",
          "Iconographie, motifs & direction artistique",
          "Charte graphique complète (PDF)",
          "Bibliothèque d'assets organisée",
        ],
        faq: [
          { q: "Quelle différence entre identité visuelle et charte graphique ?", a: "L'identité visuelle, ce sont les éléments (logo, couleurs, typographies, style). La charte graphique, c'est le document qui en fixe les règles d'usage. Cette offre réunit les deux." },
          { q: "J'ai déjà un logo, est-ce utile ?", a: "Oui. On part de votre logo existant — en le rafraîchissant si besoin — et on construit autour de lui le système visuel et la charte." },
          { q: "À quoi sert une charte si je suis seul ?", a: "Elle garantit la cohérence dans le temps et facilite chaque collaboration future (imprimeur, freelance, nouvelle recrue). C'est un investissement qui protège la valeur de votre marque." },
          { q: "L'identité peut-elle évoluer ?", a: "Oui. Le système est modulaire et la charte est un document vivant : on l'enrichit à mesure que votre marque s'étend à de nouveaux supports." },
        ],
      },
      {
        slug: "supports-print",
        illustration: "supports-print",
        title: "Supports print & papeterie",
        tagline: "Tous vos supports, conçus avec le même soin que votre site.",
        short: "Cartes de visite, papeterie, brochures, plaquettes, rapports, signalétique, kakémonos : on conçoit tous vos supports dans la continuité de votre identité, et on vous livre des fichiers prêts pour l'imprimeur de votre choix.",
        bullets: [
          "Cartes de visite & papeterie",
          "Brochures, plaquettes & flyers",
          "Rapports & documents corporate",
          "Signalétique & supports événementiels",
        ],
        metaTitle: "Conception de supports print & papeterie à Luxembourg | vortx",
        metaDescription:
          "Conception de supports print à Luxembourg : cartes de visite, brochures, plaquettes, rapports, signalétique. Des fichiers prêts pour l'imprimeur de votre choix.",
        intro: [
          "Le print n'est pas mort — il rassure. Au Luxembourg, le tissu corporate et financier reste un grand consommateur de supports soignés : une carte de visite, une plaquette ou un rapport annuel en disent long sur votre sérieux.",
          "On conçoit l'ensemble de vos supports dans la continuité de votre identité, de la carte de visite à la signalétique. Vous recevez des fichiers techniquement irréprochables (fonds perdus, CMJN, profils colorimétriques, formats normalisés), prêts à partir chez l'imprimeur de votre choix.",
        ],
        included: [
          { icon: "print", title: "Cartes & papeterie", desc: "Cartes de visite, en-têtes, enveloppes, signatures : votre identité jusque dans les détails." },
          { icon: "branding", title: "Brochures & plaquettes", desc: "Des supports commerciaux qui valorisent vos offres avec clarté et élégance." },
          { icon: "guidelines", title: "Rapports corporate", desc: "Rapports annuels et documents institutionnels mis en page avec rigueur." },
          { icon: "responsive", title: "Fichiers prêts à imprimer", desc: "Fonds perdus, CMJN, traits de coupe : des fichiers conformes que tout imprimeur accepte sans retouche." },
        ],
        deliverables: [
          "Conception de tous les supports dont vous avez besoin",
          "Fichiers prêts à imprimer (PDF HD, CMJN, fonds perdus)",
          "Gabarits réutilisables & déclinaisons",
          "Spécifications techniques pour votre imprimeur",
        ],
        faq: [
          { q: "Pouvez-vous reprendre ma charte existante ?", a: "Oui. On applique votre identité actuelle à vos supports, ou on l'adapte si elle n'a pas encore de déclinaison imprimée." },
          { q: "Mes fichiers seront-ils acceptés par mon imprimeur ?", a: "Oui : on livre des fichiers aux normes d'impression professionnelles et, si besoin, les spécifications techniques à transmettre à votre imprimeur, pour un résultat sans mauvaise surprise." },
        ],
      },
    ],
    "automatisation-ia": [
      {
        slug: "chatbots-ia",
        illustration: "chatbots-ia",
        title: "Chatbots intelligents",
        tagline: "Répondez, qualifiez et réservez automatiquement, 24/7.",
        short:
          "Des chatbots qui accueillent vos visiteurs, posent les bonnes questions, qualifient les demandes et prennent des rendez-vous — sur votre site comme sur WhatsApp.",
        bullets: [
          "Chatbot site web multilingue",
          "WhatsApp & Messenger",
          "Prise de rendez-vous automatisée",
          "Transfert intelligent vers un humain",
        ],
        metaTitle: "Création de chatbots intelligents à Luxembourg | vortx",
        metaDescription:
          "Chatbots intelligents au Luxembourg : site web, WhatsApp, Messenger, multilingue. Répondez, qualifiez et réservez automatiquement, 24/7.",
        intro: [
          "Un visiteur qui ne trouve pas de réponse repart. Un message resté sans réponse le soir ou le week-end, c'est un client perdu. Un chatbot bien conçu répond instantanément, à toute heure, dans la langue du visiteur — et ne dort jamais.",
          "On conçoit des chatbots qui mènent la conversation étape par étape : ils répondent aux questions fréquentes, posent les bonnes questions pour qualifier chaque demande, prennent des rendez-vous et passent la main à votre équipe quand c'est pertinent. Sur votre site, sur WhatsApp ou sur Messenger.",
        ],
        included: [
          { icon: "chatbot", title: "Chatbot multilingue", desc: "Sur votre site, il accueille vos visiteurs en FR, DE ou EN et les guide jusqu'à la bonne réponse." },
          { icon: "integration", title: "WhatsApp & Messenger", desc: "Là où sont vos clients : on déploie le bot sur leurs canaux préférés." },
          { icon: "ai-agent", title: "Prise de rendez-vous", desc: "Le bot propose vos créneaux libres et réserve directement dans votre agenda." },
          { icon: "leads", title: "Transfert intelligent", desc: "Quand c'est utile, le bot passe la main à un humain avec tout le contexte." },
        ],
        deliverables: [
          "Conception des scénarios & du ton",
          "Parcours de conversation sur mesure",
          "Déploiement sur vos canaux (web, WhatsApp…)",
          "Suivi des conversations & optimisation",
        ],
        faq: [
          { q: "Le chatbot peut-il vraiment remplacer un humain ?", a: "Pour les questions fréquentes et la qualification, oui — 24/7 et instantanément. Pour les cas complexes, il transfère à un humain avec le contexte. L'objectif est de soulager vos équipes, pas de déshumaniser." },
          { q: "Est-il multilingue ?", a: "Oui, c'est même un atout majeur au Luxembourg : le bot détecte la langue du visiteur et répond en FR, DE ou EN." },
        ],
      },
      {
        slug: "integrations-crm-api",
        illustration: "integrations-crm-api",
        title: "Intégrations CRM & API",
        tagline: "Tous vos outils enfin connectés, vos données synchronisées.",
        short:
          "Fini les doubles saisies et les silos : on connecte votre site, votre CRM et vos logiciels métier pour un flux de données fluide et fiable, en temps réel.",
        bullets: [
          "Connexion CRM (HubSpot, Salesforce…)",
          "Synchronisation entre logiciels",
          "API sur mesure & webhooks",
          "Fin des doubles saisies",
        ],
        metaTitle: "Intégrations CRM & API à Luxembourg | vortx",
        metaDescription:
          "Intégrations CRM et API au Luxembourg : HubSpot, Salesforce, Pipedrive. Synchronisez vos outils, supprimez les silos et les doubles saisies.",
        intro: [
          "Vos données sont éparpillées : un lead dans le formulaire du site, un autre dans le tableur, un troisième dans le CRM. Cette dispersion fait perdre du temps, crée des erreurs et fait passer des opportunités à la trappe.",
          "On connecte vos outils pour qu'ils parlent le même langage : votre site alimente votre CRM, votre CRM se synchronise avec vos logiciels métier, et tout se met à jour en temps réel. Via des connecteurs existants ou des API sur mesure quand c'est nécessaire.",
        ],
        included: [
          { icon: "integration", title: "Connexion CRM", desc: "HubSpot, Salesforce, Pipedrive… on relie votre CRM à votre site et vos outils." },
          { icon: "automation", title: "Synchronisation temps réel", desc: "Vos données à jour partout, sans intervention manuelle ni délai." },
          { icon: "ai-build", title: "API & webhooks sur mesure", desc: "Quand aucun connecteur standard n'existe, on développe l'intégration sur mesure." },
          { icon: "analytics", title: "Fiabilité des données", desc: "Fin des doubles saisies et des silos : une source de vérité, des décisions justes." },
        ],
        deliverables: [
          "Audit de vos outils & flux de données",
          "Intégrations & connecteurs configurés",
          "API/webhooks sur mesure si nécessaire",
          "Tests, documentation & supervision",
        ],
        faq: [
          { q: "Et si mon logiciel n'a pas de connecteur tout fait ?", a: "On développe une intégration sur mesure via son API ou des webhooks. La plupart des outils professionnels exposent une API : on s'y branche proprement." },
          { q: "Mes données sont-elles sécurisées pendant la synchro ?", a: "Oui. Les intégrations sont conçues dans le respect du RGPD, avec des connexions sécurisées et une gestion fine des accès." },
        ],
      },
    ],
  },

  // ---- FAQ page (comprehensive, grouped) ----
  approachPage: {
    eyebrow: "Notre approche",
    title: "Une méthode claire, des résultats mesurables.",
    lead: "Pas de boîte noire. À chaque étape, vous savez ce qu'on fait, ce que vous recevez, en combien de temps — et ce qu'on attend de vous.",
    stepDurationLabel: "Durée",
    stepDeliverablesLabel: "Ce que vous recevez",
    stepYouProvideLabel: "Ce qu'on attend de vous",
    steps: [
      {
        n: "01",
        title: "Diagnostic & stratégie",
        desc: "On analyse votre marché, vos objectifs et votre tunnel actuel pour bâtir une feuille de route sur mesure.",
        duration: "1 à 2 semaines",
        deliverables: [
          "Audit de l'existant : site, SEO, acquisition",
          "Analyse concurrentielle & mots-clés",
          "Feuille de route priorisée par impact",
        ],
        youProvide: "Un échange par visio ou par téléphone sur vos objectifs.",
      },
      {
        n: "02",
        title: "Conception & développement",
        desc: "Design premium et développement aux dernières technologies, avec les bonnes pratiques de conversion intégrées dès le départ.",
        duration: "2 à 6 semaines",
        deliverables: [
          "Maquettes design validées avec vous",
          "Développement rapide et responsive",
          "Tunnels et formulaires orientés conversion",
        ],
        youProvide: "Vos contenus clés — textes, visuels, logo — ou on s'en charge pour vous.",
      },
      {
        n: "03",
        title: "Revue & ajustements",
        desc: "On vous présente le résultat et on ajuste, ensemble, jusqu'à ce que tout soit aligné avec vos attentes.",
        duration: "3 à 5 jours",
        deliverables: [
          "Revue complète en visio",
          "Cycle d'ajustements inclus",
          "Recette qualité : vitesse, mobile, SEO",
        ],
        youProvide: "Vos retours regroupés en une seule passe, pour avancer vite.",
      },
      {
        n: "04",
        title: "Lancement & suivi",
        desc: "Mise en ligne, configuration des outils de mesure et accompagnement pour transformer le trafic en clients.",
        duration: "En continu",
        deliverables: [
          "Mise en ligne et configuration analytics",
          "Suivi des positions et des conversions",
          "Optimisations continues, pilotées par la donnée",
        ],
        youProvide: "Un point régulier pour décider ensemble des prochaines priorités.",
      },
    ],
    principles: {
      eyebrow: "Ce qui change",
      title: "Une façon de travailler, pas juste un livrable.",
      items: [
        { title: "Transparence totale", desc: "Vous voyez l'avancement, les décisions et les chiffres. Jamais de boîte noire." },
        { title: "Orientation résultat", desc: "Chaque action vise un objectif mesurable : un lead, un appel, une vente." },
        { title: "Un seul interlocuteur", desc: "Pas de ping-pong entre services. Un contact qui connaît votre projet de bout en bout." },
        { title: "Itération rapide", desc: "On livre, on mesure, on ajuste — plutôt que de tout miser sur un grand lancement." },
      ],
    },
    faq: {
      eyebrow: "Questions fréquentes",
      title: "Avant de démarrer.",
      items: [
        { q: "Combien de temps prend un projet ?", a: "Cela dépend du périmètre : un site vitrine prend quelques semaines, un système d'acquisition complet demande davantage. On vous donne un calendrier précis dès le diagnostic." },
        { q: "Faut-il préparer le contenu nous-mêmes ?", a: "Idéalement vous fournissez vos contenus clés, mais on peut aussi les rédiger et produire les visuels. On s'adapte à vos ressources." },
        { q: "Que se passe-t-il après le lancement ?", a: "On reste à vos côtés : suivi des performances, optimisations continues et ajustements selon les résultats. Le lancement est un début, pas une fin." },
        { q: "Travaillez-vous avec mon secteur et ma taille d'entreprise ?", a: "On accompagne surtout des PME et des indépendants au Luxembourg, tous secteurs confondus. La méthode s'adapte à votre marché et à votre budget." },
      ],
    },
  },

  faqPage: {
    eyebrow: "FAQ",
    title: "Toutes vos questions, nos réponses claires.",
    lead: "Site web, SEO, leads, publicité, IA, tarifs, délais, RGPD… Tout ce qu'on nous demande avant de démarrer. Une question reste sans réponse ? Écrivez-nous.",
    searchPlaceholder: "Rechercher une question…",
    tocTitle: "Sommaire",
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
          { q: "Pourquoi du sur-mesure plutôt qu'un template ?", a: "Le sur-mesure offre la meilleure performance, sécurité et flexibilité : votre site est conçu pour votre activité, pas adapté d'un modèle vu mille fois." },
          { q: "C'est vrai que vos sites sont « faits avec l'IA » ?", a: "Oui. On utilise l'IA pour accélérer le design, le code et le contenu. Résultat : un site de meilleure qualité, livré plus vite et à un meilleur rapport valeur/prix — toujours relu et finalisé par des humains." },
          { q: "Mon site sera-t-il rapide et adapté au mobile ?", a: "Absolument. Performance et mobile-first sont la base : un site quasi instantané, 100 % responsive et accessible sur tous les écrans." },
          { q: "Pourrai-je modifier mon site moi-même ?", a: "On s'occupe des mises à jour pour vous : vous nous envoyez vos changements, on les intègre." },
          { q: "Mon site sera-t-il optimisé pour Google et les IA ?", a: "Oui. On intègre dès le départ les bonnes pratiques SEO et GEO : structure, performance, données structurées et contenu citable par les moteurs de réponse IA." },
          { q: "Gérez-vous l'hébergement et la maintenance ?", a: "Oui. On peut prendre en charge l'hébergement, les mises à jour, la sécurité et les évolutions, pour que vous n'ayez pas à vous en soucier." },
        ],
      },
      {
        title: "SEO & GEO",
        items: [
          { q: "Quelle différence entre SEO et GEO ?", a: "Le SEO vous place dans la liste des résultats de Google ; le GEO (Generative Engine Optimization) vous place dans la réponse générée par une IA comme ChatGPT ou Perplexity. On optimise pour les deux, car environ 80 % des bonnes pratiques sont communes." },
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
        "Sites web pour garages, artisans et PME, web apps et branding : les réalisations de vortx, agence marketing & web au Luxembourg. Parlons de votre projet.",
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
        "Sites web, SEO & GEO, leads, publicité, IA, tarifs, délais, RGPD : toutes les réponses avant de démarrer avec vortx, agence marketing & web à Luxembourg.",
    },
    quiz: {
      title: "Quiz : testez votre QI marketing | vortx Luxembourg",
      description:
        "Marketing, web, SEO, GEO, publicité, IA : 10 questions pour tester vos connaissances. Obtenez votre note et un verdict. Gratuit — et ça pique un peu.",
    },
  },

  // ---- Standalone pages ----
  pages: {
    thanks: {
      title: "Merci, votre demande est bien partie.",
      lead: "Nous l'étudions et revenons vers vous rapidement avec une première analyse — sans engagement.",
      cta: "Retour à l'accueil",
      metaTitle: "Merci | vortx Luxembourg",
      quizLead: "En attendant notre réponse, découvrez où en est votre marketing.",
      quizCta: "Faire le quiz",
    },
    notFound: {
      title: "Page introuvable",
      lead: "Cette page a franchi l'horizon des événements — elle n'existe pas ou a été déplacée.",
      cta: "Retour à l'accueil",
      didYouMean: "Vous cherchiez peut-être :",
      explore: "Pages utiles",
      contactLead: "Vous ne trouvez pas ce que vous cherchez ?",
      contactCta: "Écrivez-nous",
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
