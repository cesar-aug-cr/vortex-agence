/**
 * German dictionary — UI copy for the German-speaking Luxembourg market.
 * Positioned for the Luxembourg B2B market: local proof, no public
 * pricing (qualification call), conversion-first language.
 */

import type { ArticleBlock, GlossaryTerm } from "./fr";

export const de = {
  locale: "de",
  brand: {
    name: "vortx",
    baseline: "Marketing- & Web-Agentur · Luxemburg",
    tagline: "Anziehungskraft durch Design.",
  },

  // ---- Global / reusable ----
  common: {
    cta: "Gespräch buchen",
    ctaSecondary: "Leistungen ansehen",
    ctaShort: "Sprechen wir darüber",
    auditCta: "Kostenloses Audit anfordern",
    readMore: "Mehr erfahren",
    backHome: "Zurück zur Startseite",
    allServices: "Alle Leistungen",
    servicesShort: "Die Leistungen",
    menu: "Menü",
    close: "Schließen",
    openMenu: "Menü öffnen",
    toggleTheme: "Design wechseln",
    language: "Sprache",
    breadcrumbHome: "Startseite",
  },

  nav: {
    services: "Leistungen",
    approach: "Vorgehen",
    work: "Referenzen",
    about: "Agentur",
    resources: "Ressourcen",
    news: "News",
    glossary: "Glossar",
    faq: "FAQ",
    contact: "Kontakt",
  },

  // ---- Mega menu ----
  megaMenu: {
    servicesTitle: "Was wir tun",
    servicesLead:
      "Vom ersten Eindruck bis zum unterschriebenen Kunden. Eine komplette Kette, auf Conversion ausgelegt.",
    columns: {
      acquire: "Anziehen",
      convert: "Konvertieren",
      scale: "Wachsen lassen",
    },
    featured: {
      label: "Im Fokus",
      title: "Lead-Gen-Website, bereit zu konvertieren",
      desc: "Eine schnelle, KI-ready gedachte Website, bereit zu konvertieren.",
    },
  },

  // ---- HERO ----
  hero: {
    eyebrow: "Marketing-Agentur · Luxemburg",
    titleLead: "Marketing & Web in Luxemburg, das",
    titleAccent: "anzieht und konvertiert.",
    subtitle:
      "vortx entwickelt Websites und Akquise-Strategien, die Aufmerksamkeit in Kunden verwandeln. Premium-Design, SEO der neuen Generation, messbare Leadgenerierung.",
    primaryCta: "Erstgespräch buchen",
    secondaryCta: "Unser Vorgehen entdecken",
    note: "Schnelle Antwort · Audit gratis · Unverbindlich · 100 % maßgeschneidert",
  },

  stats: [
    { value: "Express", label: "Garantierte Antwort" },
    { value: "100 %", label: "Maßgeschneidert" },
    { value: "FR · DE · EN", label: "Nativ mehrsprachig" },
  ],

  // ---- Trust / positioning band ----
  trust: {
    eyebrow: "Warum vortx",
    title: "Eine Agentur, kein Dienstleister.",
    lead: "In Luxemburg vergleichen Ihre Kunden auf Französisch, Deutsch und Englisch. Wir bauen Präsenzen, die in allen drei Sprachen performen — und die sowohl Google als auch generative KI ansprechen.",
    pillars: [
      {
        title: "Strategie zuerst",
        desc: "Keine schöne Website ohne Ziel. Wir starten bei Ihrem Verkaufstrichter, nicht bei einem Template.",
      },
      {
        title: "Messbare Conversion",
        desc: "Jede Seite hat eine Aufgabe: einen Anruf, ein Angebot, einen Lead generieren. Wir messen, wir optimieren.",
      },
      {
        title: "Lokal verankert",
        desc: "Luxemburger Markt, mehrsprachig, DSGVO. Wir kennen Ihr Terrain.",
      },
      {
        title: "Bereit für KI",
        desc: "SEO + GEO/GSO: von Google UND von den Antworten generativer KI zitiert werden.",
      },
    ],
  },

  // ---- SERVICES ----
  servicesSection: {
    eyebrow: "Unsere Leistungen",
    title: "Eine komplette Kette, von der Aufmerksamkeit zum Kunden.",
    lead: "Sechs Kompetenzen, die ineinandergreifen. Nehmen Sie eine — oder lassen Sie uns das Ganze orchestrieren.",
  },

  services: [
    {
      slug: "sites-web",
      group: "convert",
      title: "Websites, die konvertieren",
      tagline: "Schnelle Websites, gemacht, um Besucher in Kunden zu verwandeln.",
      short:
        "Visitenkarten-Websites, Landingpages und maßgeschneiderte Plattformen in Next.js — oder auf WordPress, wenn Sie selbst die Kontrolle behalten wollen. KI-beschleunigte Produktion, Premium-Design und integrierte Conversion-Trichter.",
      bullets: [
        "Maßgeschneidert mit Next.js oder WordPress, je nach Bedarf",
        "KI-beschleunigte Produktion, schneller geliefert",
        "Maßgeschneidertes Design, mobile-first",
        "Intelligente mehrstufige Formulare",
        "100 % responsiv & barrierefrei",
      ],
      metaTitle: "Webdesign & Websites in Luxemburg | vortx",
      metaDescription:
        "Schnelle Websites, Premium-Design und conversion-orientiert für Luxemburger Unternehmen. Next.js-Entwicklung, mehrsprachig, SEO-ready.",
    },
    {
      slug: "seo-geo",
      group: "acquire",
      title: "SEO & GEO / GSO",
      tagline: "Sichtbar bei Google. Zitiert von KI.",
      short:
        "Technische und redaktionelle Suchmaschinenoptimierung, erweitert um das Zeitalter generativer Suchmaschinen (GEO/GSO): die Antwort sein, nicht Link Nr. 7.",
      bullets: [
        "Technisches & semantisches Audit",
        "Optimierte Inhalte FR/DE/EN",
        "LLM-ready Schemata & strukturierte Daten",
        "Tracking von Rankings und KI-Zitaten",
      ],
      metaTitle: "SEO- & GEO-Agentur in Luxemburg | vortx",
      metaDescription:
        "Suchmaschinenoptimierung und Optimierung für generative KI (GEO/GSO) in Luxemburg. Werden Sie bei Google gefunden und von KI-Assistenten zitiert.",
    },
    {
      slug: "lead-generation",
      group: "convert",
      title: "Leadgenerierung",
      tagline: "Konkrete Angebotsanfragen, jede Woche.",
      short:
        "Ein komplettes Akquise-System: optimierte Website, Trichter, Kampagnen und Automatisierung, um Ihren Kalender mit qualifizierten Interessenten zu füllen.",
      bullets: [
        "Maßgeschneiderte Conversion-Trichter",
        "Landingpages pro Kampagne",
        "Qualifizierung & Scoring der Leads",
        "Klares Reporting zu den Kosten pro Lead",
      ],
      metaTitle: "B2B-Leadgenerierung in Luxemburg | vortx",
      metaDescription:
        "Leadgenerierungs-System für Luxemburger KMU und Handwerker: qualifizierte Angebotsanfragen jede Woche, ganz ohne selbst zu akquirieren.",
    },
    {
      slug: "publicite",
      group: "acquire",
      title: "Online-Werbung",
      tagline: "Die richtige Botschaft, vor den richtigen Menschen.",
      short:
        "Datengesteuerte Kampagnen auf Google Ads, Meta und LinkedIn. Wir investieren Ihr Budget dort, wo es sich auszahlt.",
      bullets: [
        "Google Ads & Performance Max",
        "Meta Ads (Facebook & Instagram)",
        "LinkedIn Ads B2B",
        "Laufende ROAS-Optimierung",
      ],
      metaTitle: "Online-Werbung (Google & Meta Ads) Luxemburg | vortx",
      metaDescription:
        "Rentable Kampagnen auf Google Ads, Meta und LinkedIn für den Luxemburger Markt. Datengesteuerte, ROI-orientierte bezahlte Akquise.",
    },
    {
      slug: "branding-design",
      group: "convert",
      title: "Logo-Gestaltung & Branding",
      tagline: "Ein Logo und eine Marke, an die man sich erinnert.",
      short:
        "Maßgeschneidertes Logo, vollständige visuelle Identität und Markenrichtlinien. Die Kohärenz, die Vertrauen schafft, noch vor dem ersten Wort.",
      bullets: [
        "Maßgeschneiderte Logo-Gestaltung",
        "Vollständige visuelle Identität",
        "Styleguide & Anwendungsregeln",
        "Print- & Digital-Ableitungen",
      ],
      metaTitle: "Logo-Gestaltung & Branding in Luxemburg | vortx",
      metaDescription:
        "Maßgeschneiderte Logo-Gestaltung, Markenidentität und Styleguide für Luxemburger Unternehmen. Ein kohärentes Bild, das Vertrauen schafft.",
    },
    {
      slug: "automatisation-ia",
      group: "scale",
      title: "Automatisierung & KI",
      tagline: "Mehr Ergebnisse, weniger Routineaufgaben.",
      short:
        "Automatisierte Workflows, Integrationen und maßgeschneiderte KI-Agenten, die Ihren Teams Zeit sparen und Ihre Antworten beschleunigen.",
      bullets: [
        "Automatisierung von Workflows",
        "Maßgeschneiderte KI-Agenten & -Assistenten",
        "CRM- & Tool-Integrationen",
        "Intelligente Chatbots und Widgets",
      ],
      metaTitle: "Automatisierung & KI für Unternehmen Luxemburg | vortx",
      metaDescription:
        "Automatisierung von Workflows, Integrationen und maßgeschneiderte KI-Agenten für Luxemburger Unternehmen. Zeit sparen, schneller antworten.",
    },
  ],

  // ---- Lead-gen / problem→solution ----
  leadgen: {
    eyebrow: "Das Problem, dann die Lösung",
    title: "Eine schöne Website reicht nicht. Sie muss sich auszahlen.",
    problemTitle: "Ohne Akquise-System:",
    problems: [
      "Chancen, die unbemerkt vorbeiziehen",
      "Ein enttäuschender Marketing-ROI",
      "Zu viele Besuche, zu wenige Kontakte",
    ],
    solutionTitle: "Mit vortx:",
    solutions: [
      "Eine auf Conversion ausgelegte Website, schnell geliefert",
      "Ein klarer Trichter: Besucher → Lead → Kunde",
      "Ein Marketing-Budget, das sich in Zahlen rechtfertigt",
    ],
    funnel: ["Besucher", "Interessiert", "Interessent", "Kunde"],
  },

  // ---- Process ----
  process: {
    eyebrow: "Unsere Methode",
    title: "Marketing-DNA, null böse Überraschungen.",
    steps: [
      {
        n: "01",
        title: "Diagnose",
        desc: "Wir analysieren Ihren Markt, Ihre Ziele und Ihren aktuellen Trichter, um eine maßgeschneiderte Strategie zu entwickeln.",
      },
      {
        n: "02",
        title: "Konzeption & Entwicklung",
        desc: "Premium-Design und Entwicklung mit neuesten Technologien, nach den besten Conversion-Praktiken.",
      },
      {
        n: "03",
        title: "Review & Anpassungen",
        desc: "Wir präsentieren Ihnen das Ergebnis und justieren nach, bis Sie rundum zufrieden sind.",
      },
      {
        n: "04",
        title: "Launch & Betreuung",
        desc: "Veröffentlichung, Konfiguration und Begleitung, damit Sie sofort Ergebnisse erzielen.",
      },
    ],
  },

  // ---- Tools / stack ----
  tools: {
    eyebrow: "Unser Arsenal",
    title: "Die besten Tools, in der Tiefe beherrscht.",
    lead: "Marketing, Code, KI, Design. Wir wählen das Tool fürs Ergebnis, nicht umgekehrt.",
    stat: { value: "40+", label: "beherrschte Tools" },
    categories: [
      {
        name: "Digitales Marketing",
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
        name: "Web & Code",
        items: ["WordPress", "Divi", "CSS", "HTML", "VS Code"],
      },
      {
        name: "KI & Automatisierung",
        items: [
          "Claude Code",
          "ChatGPT",
          "Perplexity",
          "Zapier",
          "KI-Bildbearbeitung",
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
          "Mockups",
        ],
      },
      {
        name: "Produktivität",
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
    eyebrow: "Das SEO der Zukunft",
    title: "GEO / GSO: die Antwort der KI sein.",
    lead: "Die Suche verändert sich. Ihre Kunden stellen ihre Fragen KI-Assistenten. Wir optimieren so, dass vortx — und Sie — die zitierte Quelle sind.",
    points: [
      {
        title: "Direkte Zitate durch KI",
        desc: "Strukturierte Inhalte, um in generativen Antworten aufgegriffen zu werden.",
      },
      {
        title: "LLM-ready Schemata",
        desc: "Strukturierte Daten und Dateien (llms.txt), die zu den Modellen sprechen.",
      },
      {
        title: "SEO & GEO integriert",
        desc: "Wir opfern Google nicht für die KI — wir gewinnen auf beiden Seiten.",
      },
    ],
  },

  // ---- Proof (honest placeholders) ----
  proof: {
    eyebrow: "Vertrauen",
    title: "Der Beweis durch Ergebnisse.",
    placeholderNote:
      "Fallstudien werden gerade veröffentlicht. Ihre Ergebnisse sind die nächsten.",
    logosTitle: "Sie vertrauen uns",
    guaranteesTitle: "Unsere Zusagen",
    testimonials: [
      // Durch echte Kundenstimmen zu ersetzen.
    ] as { quote: string; author: string; role: string }[],
    guarantees: [
      "Kostenlose Erstberatung",
      "Unverbindliches Angebot",
      "Garantiert schnelle Antwort",
      "Begleitung nach dem Launch",
    ],
  },

  // ---- FAQ ----
  faq: {
    eyebrow: "Häufige Fragen",
    title: "Was Kunden fragen, bevor sie starten.",
    items: [
      {
        q: "Was kostet eine Website oder eine Kampagne?",
        a: "Jedes Projekt ist maßgeschneidert. Statt eines Pauschaltarifs erstellen wir Ihnen ein präzises Angebot nach einem kostenlosen Erstgespräch und einem Audit Ihrer Situation.",
      },
      {
        q: "Arbeiten Sie in mehreren Sprachen?",
        a: "Ja. Unsere Websites sind nativ mehrsprachig (FR, DE, EN und Lëtzebuergesch auf Anfrage), zugeschnitten auf den Luxemburger Markt.",
      },
      {
        q: "Was ist GEO / GSO?",
        a: "Es ist die Optimierung für KI-Antwortmaschinen (ChatGPT, Perplexity, Google AI). Wir strukturieren Ihre Inhalte so, dass KI Sie als Quelle zitiert.",
      },
      {
        q: "Bieten Sie Betreuung nach dem Launch an?",
        a: "Ja. Wartung, Weiterentwicklung, Conversion-Optimierung und laufende Marketing-Begleitung gehören zu unserem Angebot.",
      },
    ],
  },

  // ---- Final CTA / contact ----
  contact: {
    eyebrow: "Kommen wir ins Handeln",
    title: "Bereit, Ihre Online-Präsenz zu verwandeln?",
    lead: "Buchen Sie ein kostenloses Erstgespräch. Wir analysieren Ihre Situation und sagen Ihnen ohne Umschweife, was sich verbessern lässt.",
    benefits: [
      "Kostenlose Erstberatung",
      "Persönliches Audit ohne Verzögerung",
      "Unverbindliches Angebot",
      "Begleitung nach dem Launch",
    ],
    form: {
      name: "Vollständiger Name",
      email: "E-Mail",
      phone: "Telefon (optional)",
      company: "Unternehmen (optional)",
      interest: "Leistung, die Sie interessiert",
      message: "Ihre Nachricht",
      submit: "Anfrage senden",
      success: "Danke! Wir melden uns sehr bald bei Ihnen.",
      step: "Schritt",
      next: "Weiter",
      back: "Zurück",
      stepServices: "Ihr Bedarf",
      stepDetails: "Ihre Kontaktdaten",
      stepMessage: "Ihre Nachricht",
      servicesLabel: "Welche Leistungen interessieren Sie?",
      servicesHint: "Wählen Sie eine oder mehrere Leistungen.",
      servicesRequired: "Wählen Sie mindestens eine Leistung aus, um fortzufahren.",
      consentBefore:
        "Mit dem Anklicken dieses Kästchens bestätige ich, dass ich zur Kenntnis genommen habe, wie meine personenbezogenen Daten verarbeitet und gespeichert werden, wie in der ",
      consentLink: "Datenschutzerklärung",
      consentAfter: " beschrieben.",
      consentRequired: "Bitte bestätigen Sie dies, um fortzufahren.",
      error:
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt eine E-Mail.",
    },
  },

  // ---- Footer (cd-lac style) ----
  footer: {
    blurb:
      "vortx — Marketing- und Web-Agentur in Luxemburg. Wir ziehen Aufmerksamkeit an und verwandeln sie in Kunden.",
    columns: {
      services: {
        title: "Leistungen",
        links: [
          { label: "Websites", href: "/services/sites-web" },
          { label: "SEO & GEO", href: "/services/seo-geo" },
          { label: "Leadgenerierung", href: "/services/lead-generation" },
          { label: "Online-Werbung", href: "/services/publicite" },
          { label: "Logo-Gestaltung & Branding", href: "/services/branding-design" },
          { label: "Automatisierung & KI", href: "/services/automatisation-ia" },
        ],
      },
      company: {
        title: "Agentur",
        links: [
          { label: "Über uns", href: "/agence" },
          { label: "Unsere Methode", href: "/approche" },
          { label: "Referenzen", href: "/realisations" },
          { label: "News", href: "/news" },
          { label: "Glossar", href: "/glossaire" },
          { label: "FAQ", href: "/faq" },
          { label: "Kontakt", href: "/contact" },
        ],
      },
      legal: {
        title: "Rechtliches",
        links: [
          { label: "Impressum", href: "/mentions-legales" },
          { label: "Datenschutz", href: "/confidentialite" },
          { label: "Cookies", href: "/cookies" },
        ],
      },
    },
    contactTitle: "Kontakt",
    location: "Luxemburg",
    rights: "Alle Rechte vorbehalten.",
    madeWith: "Mit Sorgfalt und viel KI gestaltet.",
    backToTop: "Nach oben",
  },

  // ---- Agence (about) page ----
  agence: {
    eyebrow: "Die Agentur",
    title: "Ein Team für Anziehungskraft, im Dienst Ihres Wachstums.",
    lead: "vortx vereint Marketing, Design und Technologie unter einem Dach, in Luxemburg. Eine Obsession: Aufmerksamkeit in Kunden verwandeln und es in Zahlen belegen.",
    story: [
      "vortx entstand aus einer einfachen Feststellung: Zu viele Luxemburger Unternehmen haben eine Website, die wie eine Broschüre wirkt — schön, aber ohne Ertrag. Wir bauen das Gegenteil: digitale Präsenzen, gedacht als Akquise-Maschinen.",
      "Hinter der Agentur steht ein Team mit über einem Jahrzehnt Erfahrung in digitalem Marketing, Webentwicklung und künstlerischer Leitung. Wir haben Moden kommen und gehen sehen; wir behalten, was konvertiert, und werfen den Rest weg.",
      "Wir arbeiten auf Französisch, Deutsch und Englisch, mit nur einem Anspruch: dass jeder in Ihr Marketing investierte Euro begründbar ist. Kein Fachjargon, keine leeren Versprechen — messbare Ergebnisse.",
    ],
    experience: {
      suffix: "Jahre",
      label: "geballte Erfahrung",
      note: "Marketing · Web · Design",
    },
    stats: [
      { value: "100 %", label: "Maßgeschneidert, nie ein Template" },
      { value: "FR·DE·EN", label: "Nativ mehrsprachig" },
      { value: "GEO", label: "Optimiert für generative KI" },
    ],
    valuesTitle: "Was uns auszeichnet",
    arsenalTitle: "Unser Arsenal",
    arsenalLead:
      "Die Tools, die wir beherrschen, um zu gestalten, zu messen und wachsen zu lassen. Marketing, Code, KI, Design, Produktivität — wir wählen das Tool fürs Ergebnis, nicht umgekehrt.",
    ctaTitle: "Lust, zusammenzuarbeiten?",
  },

  // ---- Reviews (homepage) — PLACEHOLDERS: replace with real client reviews ----
  reviews: {
    eyebrow: "Kundenstimmen",
    title: "Was die Unternehmen sagen, die uns vertrauen.",
    lead: "Konkrete Rückmeldungen von Geschäftsführern und Marketing-Teams in Luxemburg.",
    aggregate: {
      rating: "4,9",
      ratingMax: "5",
      countLabel: "verifizierte Bewertungen",
      count: "27",
      platform: "Google",
    },
    note: "Repräsentative Bewertungen — durch Ihre echten Google-/Trustpilot-Bewertungen zu ersetzen.",
    items: [
      {
        name: "Laurent M.",
        role: "Geschäftsführer, Bauunternehmen",
        location: "Strassen",
        rating: 5,
        quote:
          "Unsere neue Website generiert jede Woche Angebotsanfragen. In drei Monaten hatten wir die Investition wieder drin. Reaktionsschnell, klar, und das Ergebnis spricht für sich.",
      },
      {
        name: "Sophie R.",
        role: "Marketingleiterin, Beratungsunternehmen",
        location: "Luxemburg-Stadt",
        rating: 5,
        quote:
          "Endlich eine Agentur, die über Ergebnisse spricht und nicht nur über Design. Die SEO-Arbeit hat uns bei Suchanfragen nach vorne gebracht, die unsere Wettbewerber jahrelang dominierten.",
      },
      {
        name: "Marco F.",
        role: "Gründer, handwerklicher E-Commerce",
        location: "Esch-sur-Alzette",
        rating: 5,
        quote:
          "Website von A bis Z neu gemacht, schnell und makellos auf dem Handy. Das Team hat alles automatisiert, damit wir weniger Zeit mit Verwaltung verbringen. Ein echter Gewinn im Alltag.",
      },
      {
        name: "Anne K.",
        role: "Direktorin, Immobilienagentur",
        location: "Bertrange",
        rating: 5,
        quote:
          "Professionell und gut beraten. Sie haben unseren Luxemburger Markt verstanden und die Botschaft auf FR und DE angepasst. Die Leads sind qualifizierter als zuvor.",
      },
      {
        name: "David L.",
        role: "CEO, SaaS-Startup",
        location: "Luxemburg-Stadt",
        rating: 5,
        quote:
          "Ihr GEO-Ansatz hat uns auf ChatGPT und Perplexity vor die Konkurrenz gebracht. Wir werden jetzt als Referenz zitiert. Beeindruckend und der Zeit weit voraus.",
      },
      {
        name: "Christine B.",
        role: "Geschäftsführerin, Wellness-Institut",
        location: "Differdange",
        rating: 4,
        quote:
          "Top-Begleitung von Anfang bis Ende. Die Website ist wunderschön und die ersten Ergebnisse bei den Buchungen sind da. Ich freue mich, weiterzumachen.",
      },
    ],
  },

  // ---- News / blog ----
  news: {
    eyebrow: "News",
    title: "Ideen, Trends und Einblicke ins digitale Marketing.",
    lead: "Unsere Analysen zu SEO, GEO, Conversion und Web in Luxemburg. Konkret, keine heiße Luft.",
    homeTitle: "Neueste News",
    homeLead: "Wir teilen, was wir lernen. Strategie, KI, Conversion — ohne Drumherumreden.",
    seeAll: "Alle News ansehen",
    readArticle: "Artikel lesen",
    readingTime: "Min. Lesezeit",
    publishedOn: "Veröffentlicht am",
    updatedOn: "Aktualisiert am",
    by: "Von",
    backToNews: "Alle News",
    tocTitle: "Inhalt",
    relatedTitle: "Auch lesenswert",
    ctaTitle: "Möchten auch Sie von KI zitiert werden?",
    summaryLabel: "Von KI erstellte Zusammenfassung",
    summaryDisclaimer: "Automatische Synthese der Kernpunkte, von unserem Team geprüft.",
    summaryPointsLabel: "Auf einen Blick",
    linksTitle: "Zum Weiterlesen",
    allCategories: "Alle Themen",
    filterLabel: "Nach Thema filtern",
    emptyLabel: "Zu diesem Thema gibt es derzeit keinen Artikel.",
    articleCtaTitle: "Sie haben ein Projekt im Kopf?",
    articleCtaText:
      "Sprechen wir darüber. Erhalten Sie ein klares, unverbindliches Angebot für Ihre Website oder Ihre Akquisestrategie.",
    articleCtaButton: "Angebot anfordern",
    shareLabel: "Teilen",
    shareCopy: "Link kopieren",
    shareCopied: "Link kopiert!",
    articles: [
      {
        slug: "geo-seo-luxembourg-etre-cite-par-les-ia",
        category: "SEO & GEO",
        title:
          "SEO vs. GEO: Wie Sie 2026 bei Google gefunden UND von KI zitiert werden",
        excerpt:
          "Suchmaschinenoptimierung spielt sich nicht mehr nur bei Google ab. ChatGPT, Perplexity und Google AI werden zum neuen Eingangstor. So arbeiten SEO und GEO zusammen — und das müssen Sie konkret tun.",
        date: "2026-06-02",
        updated: "2026-06-02",
        readingMinutes: 9,
        author: "Das vortx-Team",
        cover: "geo-citation",
        summary: {
          text: "Suchmaschinenoptimierung beschränkt sich nicht mehr auf Google: ChatGPT, Perplexity und Google AI werden zu einem neuen Eingangstor. Der Artikel erklärt den Unterschied zwischen SEO und GEO und wie Sie beide gemeinsam bespielen — mit konkreten Schritten, um von KI zitiert zu werden.",
          points: [
            "SEO platziert Sie in den Ergebnissen; GEO platziert Sie in der KI-Antwort.",
            "Strukturieren Sie Ihre Seiten als Frage/Antwort und verankern Sie sie in lokalen Fakten, um zitiert zu werden.",
            "80 % der Arbeit ist gemeinsam: Guter Content performt bei Google UND bei den Modellen.",
          ],
        },
        links: [
          { label: "Google Ads oder SEO: wohin mit Ihrem Budget", href: "/news/google-ads-ou-seo-ou-investir-budget-marketing", desc: "Bezahlte und organische Akquise-Hebel im Vergleich." },
          { label: "Unsere Leistung SEO & GEO / GSO", href: "/services/seo-geo", desc: "Wie wir Sie bei Google sichtbar und von KI zitiert machen." },
          { label: "Glossar des Marketings & Webs", href: "/glossaire", desc: "SEO, GEO, GSO… das Vokabular einfach erklärt." },
        ],
        body: [
          {
            type: "p",
            text: "Zwanzig Jahre lang bedeutete „online sichtbar sein\" eine Sache: in den Google-Ergebnissen nach oben zu kommen. Heute tippt ein wachsender Teil Ihrer Kunden keine Suchanfrage mehr in eine Suchmaschine — sie stellen einer KI eine Frage. ChatGPT, Perplexity, Google AI Overviews oder Copilot antworten direkt, zitieren einige Quellen, und der Nutzer klickt manchmal auf gar keinen Link. Die Frage ist also nicht mehr nur „Bin ich bei Google auf Platz eins?\", sondern „Zitiert mich die KI als Antwort?\".",
          },
          {
            type: "h2",
            id: "seo-geo-definitions",
            text: "SEO, GEO, GSO: Wovon reden wir?",
          },
          {
            type: "p",
            text: "SEO (Search Engine Optimization) umfasst alles, was Sie in klassischen Suchmaschinen nach oben bringt: technische Qualität der Website, Relevanz der Inhalte, Autorität (Links), Nutzererfahrung. Das ist die Basis, und sie verschwindet nicht.",
          },
          {
            type: "p",
            text: "GEO (Generative Engine Optimization), manchmal GSO (Generative Search Optimization) genannt, ist die Optimierung für generative Antwortmaschinen. Das Ziel ändert sich: Es geht nicht mehr nur darum, gut platziert zu sein, sondern die Quelle zu sein, die das Modell aufgreift, zusammenfasst und in seiner Antwort zitiert.",
          },
          {
            type: "callout",
            title: "In einem Satz",
            text: "SEO platziert Sie in der Ergebnisliste. GEO platziert Sie in der Antwort selbst.",
          },
          {
            type: "h2",
            id: "pourquoi-maintenant",
            text: "Warum Sie sich jetzt darum kümmern sollten",
          },
          {
            type: "p",
            text: "Weil sich das Suchverhalten schnell verschiebt, besonders im B2B. Ein Entscheider, der einen Kauf vorbereitet, fragt zunehmend eine KI „Welche sind die besten Marketing-Agenturen in Luxemburg?\" statt Google. Wenn Ihr Unternehmen in der Antwort nicht auftaucht, existieren Sie in dieser Entscheidung nicht — selbst wenn Sie bei Google Dritter sind.",
          },
          {
            type: "ul",
            items: [
              "KI-Antworten reduzieren die Zahl der Klicks: zitiert zu werden zählt mehr als gelistet zu sein.",
              "Die Modelle bevorzugen klare, strukturierte und faktische Inhalte.",
              "Vertrauen baut sich auf: Eine von KI zitierte Marke gewinnt an wahrgenommener Glaubwürdigkeit.",
            ],
          },
          {
            type: "h2",
            id: "comment-faire",
            text: "Wie Sie konkret für GEO optimieren",
          },
          {
            type: "h3",
            text: "1. Strukturieren Sie Inhalte, um zitiert zu werden",
          },
          {
            type: "p",
            text: "Die Modelle mögen klare Antworten. Eine Seite, die eine Frage in der Überschrift (H2/H3) stellt und direkt darunter in zwei klaren Sätzen beantwortet, hat viel bessere Chancen, aufgegriffen zu werden, als ein langer, verschachtelter Absatz. Denken Sie „Definition, dann Detail\".",
          },
          {
            type: "h3",
            text: "2. Liefern Sie Fakten, Zahlen und lokalen Kontext",
          },
          {
            type: "p",
            text: "Ein nachprüfbarer und präziser Inhalt (Zahlen, Daten, Orte — hier der Luxemburger Markt, die Mehrsprachigkeit FR/DE/EN, die DSGVO) ist „zitierbarer\". Allgemeinplätze werden ignoriert; verankerte Fakten werden aufgegriffen.",
          },
          {
            type: "h3",
            text: "3. Machen Sie die Website für Maschinen lesbar",
          },
          {
            type: "ul",
            items: [
              "Strukturierte Daten (Schema.org): Organization, Service, FAQPage, Article.",
              "Eine llms.txt-Datei, die Ihr Angebot für die Modelle zusammenfasst.",
              "Eine saubere Architektur, hierarchisierte Überschriften, kurze Ladezeiten.",
            ],
          },
          {
            type: "h3",
            text: "4. Bauen Sie Autorität auf, überall",
          },
          {
            type: "p",
            text: "Die KI stützt sich darauf, was anderswo über Sie gesagt wird: Bewertungen, Verzeichnisse, Presseerwähnungen, kohärente Profile. Eine einheitliche Präsenz (gleicher Name, gleiche Adresse, gleiches Versprechen) erhöht die Wahrscheinlichkeit, als verlässliche Quelle herangezogen zu werden.",
          },
          {
            type: "h2",
            id: "seo-et-geo-ensemble",
            text: "SEO und GEO widersprechen sich nicht — sie verstärken sich",
          },
          {
            type: "p",
            text: "Gute Nachricht: 80 % der Arbeit ist gemeinsam. Ein strukturierter, schneller, verlässlicher und gut ausgezeichneter Inhalt performt sowohl bei Google als auch bei den Modellen. Wir opfern nicht das eine für das andere — wir gestalten von Anfang an für beide.",
          },
          {
            type: "quote",
            text: "Das Ziel ist nicht mehr, Link Nr. 7 zu sein. Es ist, die Antwort zu sein.",
          },
          {
            type: "callout",
            title: "Zum Mitnehmen",
            text: "Pflegen Sie Ihr technisches und redaktionelles SEO, strukturieren Sie Ihre Seiten für die Zitierung, fügen Sie strukturierte Daten und eine llms.txt hinzu und verankern Sie Ihre Inhalte in lokalen Fakten. So gewinnen Sie bei Google und in den KI-Antworten.",
          },
          {
            type: "p",
            text: "Bei vortx bauen wir jede Website und jede Content-Strategie von der ersten Zeile an mit diesem doppelten Anspruch. Wenn Sie wissen wollen, wo Sie heute stehen, schenken wir Ihnen ein unverbindliches SEO-/GEO-Audit.",
          },
        ],
      },
      {
        slug: "google-ads-ou-seo-ou-investir-budget-marketing",
        category: "Akquise",
        title:
          "Google Ads oder SEO: Wohin sollten Sie 2026 Ihr Marketing-Budget investieren?",
        excerpt:
          "Sollten Sie dafür bezahlen, oben bei Google zu erscheinen, oder lieber an Ihrer organischen Sichtbarkeit arbeiten? Die eigentliche Frage ist nicht „das eine oder das andere\", sondern „welches, wann und für welches Ziel\". Wir entwirren das Ganze — mit Zahlen und gesundem Menschenverstand.",
        date: "2026-06-04",
        updated: "2026-06-04",
        readingMinutes: 8,
        author: "Das vortx-Team",
        cover: "ads-targeting",
        summary: {
          text: "Soll man in Google Ads oder in SEO investieren? Die Antwort hängt von Ihrem Ziel und Ihrem Zeithorizont ab. Der Artikel stellt das „Mieten\" (Ads, sofort) dem „Besitzen\" (SEO, dauerhaft) gegenüber und zeigt, wie Sie beide je nach Situation kombinieren.",
          points: [
            "Google Ads = sofortige Ergebnisse, solange Sie zahlen; SEO = dauerhaftes Asset, das Zeit braucht.",
            "Die richtige Dosierung hängt von Zeithorizont, Markt und Budget ab.",
            "Beide ergänzen sich: Werbung zündet, SEO macht Sie vom Budget unabhängig.",
          ],
        },
        links: [
          { label: "SEO vs. GEO: 2026 gefunden UND zitiert werden", href: "/news/geo-seo-luxembourg-etre-cite-par-les-ia", desc: "Organische Sichtbarkeit im Zeitalter der KI." },
          { label: "Unsere Leistung Online-Werbung", href: "/services/publicite", desc: "Google Ads, Meta und LinkedIn, datengesteuert." },
          { label: "Unsere Leistung SEO & GEO", href: "/services/seo-geo", desc: "Ein dauerhaftes Sichtbarkeits-Asset aufbauen." },
        ],
        body: [
          {
            type: "p",
            text: "Es ist eine der Fragen, die man uns am häufigsten stellt: „Soll ich mein Budget in Werbung oder in SEO stecken?\". Ehrliche Antwort: Das hängt von Ihrem Ziel, Ihrem Zeithorizont und Ihrem Markt ab. Beide bringen Kunden über Google, aber sie funktionieren nicht gleich — und vor allem ersetzen sie sich nicht, sie ergänzen sich.",
          },
          {
            type: "h2",
            id: "deux-leviers",
            text: "Zwei Hebel, zwei Logiken",
          },
          {
            type: "p",
            text: "Google Ads (SEA, also bezahlte Suche) ist wie Miete: Sie zahlen, um sofort ganz oben zu erscheinen — so lange Ihr Budget läuft. SEO (organische Suche) ist wie Eigentum: Sie bauen ein Asset auf, das Zeit braucht, aber weiter Traffic bringt, auch wenn Sie nicht mehr zahlen.",
          },
          {
            type: "h2",
            id: "google-ads",
            text: "Google Ads: sofortige Sichtbarkeit",
          },
          {
            type: "p",
            text: "Sie starten heute eine Kampagne und können schon heute Nachmittag bei Ihren Keywords auf Platz eins stehen. Das ideale Werkzeug, wenn Sie schnell Ergebnisse brauchen, ein Angebot testen oder bei stark umkämpften Suchanfragen mitspielen wollen.",
          },
          {
            type: "ul",
            items: [
              "Sofortige Ergebnisse: Traffic und Leads schon am ersten Tag.",
              "Präzises Targeting: Keywords, geografische Zone, Uhrzeiten, Zielgruppe.",
              "Auf den Cent genau messbar: Sie wissen exakt, was jeder Lead kostet.",
              "Ideal für Aktionen, Launches und saisonale Kampagnen.",
            ],
          },
          {
            type: "p",
            text: "Die Kehrseite: Sobald Sie aufhören zu zahlen, erlischt die Sichtbarkeit. In manchen Branchen kann der Klickpreis schnell steigen. Werbung ist wie ein Wasserhahn: kraftvoll, aber sie versiegt, sobald Sie ihn zudrehen.",
          },
          {
            type: "h2",
            id: "seo",
            text: "SEO: das Asset, das langfristig arbeitet",
          },
          {
            type: "p",
            text: "SEO verlangt Geduld — einige Wochen bis einige Monate —, aber es baut etwas auf, das Ihnen gehört. Gut positioniert zieht Ihre Website regelmäßigen Traffic ohne Klickkosten an, und das Vertrauen in ein organisches Ergebnis ist oft größer als das in eine Anzeige.",
          },
          {
            type: "ul",
            items: [
              "Dauerhafter Traffic: Ihre Positionierung arbeitet über die Zeit weiter.",
              "Höhere Glaubwürdigkeit: Organischen Ergebnissen wird mehr vertraut.",
              "Sinkende Kosten: Die Anfangsinvestition amortisiert sich, der Klick ist „gratis\".",
              "GEO-kompatibel: Gutes SEO macht Sie auch für generative KI zitierbar.",
            ],
          },
          {
            type: "callout",
            title: "In einem Satz",
            text: "Google Ads kauft Sichtbarkeit jetzt; SEO baut sie für morgen auf. Das eine ist eine Ausgabe, das andere eine Investition.",
          },
          {
            type: "h2",
            id: "lequel-choisir",
            text: "Welches passt zu Ihrer Situation",
          },
          {
            type: "p",
            text: "Statt grundsätzlich zu entscheiden, schauen Sie, wo Sie stehen:",
          },
          {
            type: "ul",
            items: [
              "Sie starten Ihr Geschäft und wollen schnell Leads: Beginnen Sie mit Google Ads.",
              "Sie zielen auf langfristige Rentabilität: Investieren Sie parallel in SEO.",
              "Ihre Branche ist bei Google stark umkämpft: Kombinieren Sie beides, um das Feld zu besetzen.",
              "Ihr Budget ist knapp: Priorisieren Sie SEO auf Ihren Schlüsselseiten und Werbung für ein einziges Top-Angebot.",
            ],
          },
          {
            type: "h2",
            id: "ensemble",
            text: "Die echte Antwort: beides zusammen",
          },
          {
            type: "p",
            text: "Unternehmen mit starker Performance wählen nicht — sie orchestrieren. Werbung liefert sofortige Ergebnisse und wertvolle Daten (welche Keywords wirklich konvertieren), die dann die SEO-Strategie nähren. Während SEO an Kraft gewinnt, hält die Werbung den Lead-Fluss aufrecht. Übernimmt das Organische die Führung, lässt sich die Abhängigkeit von der bezahlten Suche verringern.",
          },
          {
            type: "quote",
            text: "Werbung entfacht das Feuer sofort. SEO hält es am Brennen, damit es nie wieder erlischt.",
          },
          {
            type: "callout",
            title: "Zum Mitnehmen",
            text: "Denken Sie nicht „Ads ODER SEO\", sondern „Ads UND SEO\", dosiert nach Ihrem Zeithorizont und Budget. Werbung für die Geschwindigkeit, SEO für die Dauer — und beide verstärken sich gegenseitig.",
          },
          {
            type: "p",
            text: "Bei vortx bauen wir diese Kombination nach Ihrer echten Situation auf, ohne Ihnen das eine auf Kosten des anderen zu verkaufen. Wir schenken Ihnen ein kostenloses Audit, das Ihnen zeigt, wo Ihr Budget am meisten bringt.",
          },
        ],
      },
      {
        slug: "tunnel-de-conversion-transformer-visiteurs-en-clients",
        category: "Conversion",
        title:
          "Conversion-Funnel: So machen Sie aus Besuchern Schritt für Schritt Kunden",
        excerpt:
          "Traffic anzuziehen ist schön. Ihn in Kunden zu verwandeln, darum geht es. Der Conversion-Funnel ist die Karte, die den ersten Klick mit dem unterschriebenen Vertrag verbindet — und jede schlecht durchdachte Stufe kostet Sie Umsatz. So bauen Sie ihn richtig auf.",
        date: "2026-06-07",
        updated: "2026-06-07",
        readingMinutes: 7,
        author: "Das vortx-Team",
        cover: "conversion",
        summary: {
          text: "Traffic anzuziehen bringt nichts, wenn er sich nicht verwandelt. Der Artikel zerlegt den Conversion-Funnel Schritt für Schritt — vom ersten Klick bis zum Vertrag — und zeigt, wo Sie Besucher verlieren und wie Sie jedes Leck abdichten.",
          points: [
            "Jede schlecht durchdachte Stufe des Funnels kostet Sie Umsatz.",
            "Wir führen den Besucher auf jeder Seite zu einer klaren Handlung.",
            "Abbrüche zu messen erlaubt, dort zu optimieren, wo es zählt.",
          ],
        },
        links: [
          { label: "Unsere Leistung Leadgenerierung", href: "/services/lead-generation", desc: "Traffic in qualifizierte Angebotsanfragen verwandeln." },
          { label: "Was kostet eine Website in Luxemburg?", href: "/news/combien-coute-un-site-web-luxembourg-2026", desc: "Dort investieren, wo die Conversion wirklich entsteht." },
          { label: "Glossar: Funnel, CRO, Landingpage…", href: "/glossaire", desc: "Die Begriffe der Conversion einfach erklärt." },
        ],
        body: [
          {
            type: "p",
            text: "Sie haben Traffic, aber wenige Anfragen? Das Problem ist fast nie die Zahl der Besucher — es ist das, was zwischen ihrer Ankunft und ihrer Entscheidung passiert. Dieser Weg hat einen Namen: der Conversion-Funnel. Ihn zu verstehen heißt, mit dem bloßen „Leute herbringen\" aufzuhören und anzufangen, diese Leute in Kunden zu verwandeln.",
          },
          {
            type: "h2",
            id: "c-est-quoi",
            text: "Was ist ein Conversion-Funnel?",
          },
          {
            type: "p",
            text: "Es ist die Abfolge von Schritten, die ein Besucher durchläuft, bevor er Kunde wird: Er entdeckt Sie, interessiert sich, kontaktiert Sie und kauft dann. Bei jedem Schritt springt ein Teil der Leute ab — wie ein Trichter, der sich verengt. Das Ziel ist nicht, diese Verluste auszuschalten (unmöglich), sondern sie dort zu reduzieren, wo sie am teuersten sind.",
          },
          {
            type: "h2",
            id: "etapes",
            text: "Die 4 Stufen eines Funnels, der konvertiert",
          },
          {
            type: "h3",
            text: "1. Anziehen — die richtige Zielgruppe, nicht nur Traffic",
          },
          {
            type: "p",
            text: "Alles beginnt damit, die richtigen Menschen anzuziehen (SEO, Werbung, Social Media, Mundpropaganda). Tausend unqualifizierte Besucher sind weniger wert als hundert Besucher mit echtem Bedarf. Die Qualität des Traffics bestimmt den gesamten Rest des Funnels.",
          },
          {
            type: "h3",
            text: "2. Interessieren — Lust machen zu bleiben",
          },
          {
            type: "p",
            text: "In wenigen Sekunden entscheidet der Besucher, ob er bleibt oder geht. Eine klare Botschaft, ein verständliches Versprechen, eine schnelle und vertrauenswürdige Seite: Hier wird aus einem Neugierigen ein interessierter Interessent. Braucht Ihre Seite zu lange, um zu sagen, was Sie tun, ist er weg.",
          },
          {
            type: "h3",
            text: "3. Konvertieren — den Schritt zur Aktion erleichtern",
          },
          {
            type: "p",
            text: "Das ist die entscheidende Stufe: Angebotsanfrage, Terminvereinbarung, Kauf. Ein sichtbarer Call-to-Action, ein kurzes und intelligentes Formular, null unnötige Reibung. Jedes überflüssige Feld, jeder nicht ausgeräumte Zweifel senkt die Conversion-Rate.",
          },
          {
            type: "h3",
            text: "4. Binden — ein Kunde, der wiederkommt und weiterempfiehlt",
          },
          {
            type: "p",
            text: "Der Funnel endet nicht beim Verkauf. Ein zufriedener Kunde kommt wieder, kauft mehr und empfiehlt Sie vor allem weiter. Nachbetreuung, Servicequalität, passende Follow-ups: Kundenbindung ist der rentabelste — und am meisten vernachlässigte — Hebel.",
          },
          {
            type: "callout",
            title: "Das Schlüsselprinzip",
            text: "Eine einzige undichte Stufe zieht den ganzen Funnel nach unten. Es bringt nichts, mehr Leute anzuziehen, wenn sich Ihre Besucher genau im Moment der Aktion verlieren.",
          },
          {
            type: "h2",
            id: "fuites",
            text: "Wo es leckt (und wie Sie es abdichten)",
          },
          {
            type: "ul",
            items: [
              "Langsame oder verwirrende Seite: Der Besucher geht, bevor er Ihr Angebot versteht.",
              "Kein klarer Call-to-Action: Er weiß nicht, was er als Nächstes tun soll.",
              "Zu langes Formular: Er bricht unterwegs ab.",
              "Fehlende Belege (Bewertungen, Referenzen, Garantien): Er zweifelt und schiebt es auf.",
              "Kein Follow-up: Ein lauwarmer Interessent, den man nie wieder kontaktiert, ist ein verlorener Kunde.",
            ],
          },
          {
            type: "h2",
            id: "mesurer",
            text: "Messen, um zu optimieren",
          },
          {
            type: "p",
            text: "Man verbessert nur, was man misst. Wenn Sie die Conversion-Rate jeder Stufe verfolgen, erkennen Sie genau, wo es klemmt — und handeln genau dort, statt alles aufs Geratewohl neu zu machen.",
          },
          {
            type: "ul",
            items: [
              "Gesamte Conversion-Rate und je Stufe.",
              "Seiten, auf denen Besucher den Funnel verlassen.",
              "Kosten pro Lead und Kosten pro Kunde.",
              "A/B-Tests, um jede Verbesserung zu bestätigen.",
            ],
          },
          {
            type: "quote",
            text: "Ein guter Funnel wird nicht erraten: Er wird gemessen, angepasst und wieder gemessen.",
          },
          {
            type: "callout",
            title: "Zum Mitnehmen",
            text: "Ein Conversion-Funnel ist eine Reise: anziehen, interessieren, konvertieren, binden. Arbeiten Sie zuerst am schwächsten Glied — genau dort verstecken sich Ihre verlorenen Umsätze.",
          },
          {
            type: "p",
            text: "Bei vortx gestalten wir jede Website als Funnel, der zum Konvertieren gebaut ist, und optimieren ihn laufend. Wollen Sie wissen, wo Ihrer Kunden verliert? Wir schenken Ihnen ein kostenloses Audit Ihres Funnels.",
          },
        ],
      },
      {
        slug: "combien-coute-un-site-web-luxembourg-2026",
        category: "Websites",
        title:
          "Was kostet eine professionelle Website in Luxemburg 2026?",
        excerpt:
          "Die ehrliche Antwort ist keine einzelne Zahl, sondern eine Spanne, die von Ihren Zielen abhängt. Hier erfahren Sie, was den Preis einer Website beeinflusst und wie Sie dort investieren, wo es wirklich zählt.",
        date: "2026-06-08",
        updated: "2026-06-08",
        readingMinutes: 7,
        author: "Das vortx-Team",
        cover: "analytics",
        summary: {
          text: "Der Preis einer Website ist keine feste Zahl, sondern eine Spanne, die von Ihren Zielen abhängt. Der Artikel erläutert, was die Kosten beeinflusst und wie Sie dort investieren, wo es sich wirklich auszahlt, statt nur das Günstigste zu suchen.",
          points: [
            "Der Preis hängt von Umfang und Zielen ab, nicht von einem Pauschaltarif.",
            "Investieren Sie in Conversion und Auffindbarkeit, nicht in Überflüssiges.",
            "Beurteilen Sie die Kosten daran, was die Website Ihnen einbringt.",
          ],
        },
        links: [
          { label: "Unsere Leistung Websites", href: "/services/sites-web", desc: "Was wir bauen und was in jedem Paket enthalten ist." },
          { label: "Conversion-Funnel: Besucher → Kunden", href: "/news/tunnel-de-conversion-transformer-visiteurs-en-clients", desc: "Warum eine Website zum Konvertieren gebaut sein muss." },
          { label: "Was macht ein gutes Logo aus?", href: "/news/quest-ce-quun-bon-logo-identite-qui-dure", desc: "Die Markenidentität, die Ihre Website begleitet." },
        ],
        body: [
          {
            type: "p",
            text: "„Was kostet eine Website?“ Das ist die erste Frage, die man uns stellt – und die am schwersten mit einer einzigen Zahl zu beantworten ist. Eine Website ist wie ein Haus: Zwischen einem Studio und einer Villa sagt das Wort „Haus“ nichts über den Preis aus. Worauf es ankommt, ist, was Sie damit erreichen wollen.",
          },
          {
            type: "h2",
            id: "ca-depend",
            text: "Warum „das kommt darauf an“ die einzige ehrliche Antwort ist",
          },
          {
            type: "p",
            text: "Ein Preis, der ohne Kenntnis Ihres Projekts genannt wird, ist entweder zu hoch (man rechnet sich zur Sicherheit nach oben) oder enttäuschend (man spart am Wesentlichen). Die eigentliche Arbeit besteht darin, den richtigen Umfang zu definieren: nicht mehr und nicht weniger, als Ihrem Ziel dient.",
          },
          {
            type: "h2",
            id: "ce-qui-fait-le-prix",
            text: "Was den Preis wirklich beeinflusst",
          },
          {
            type: "ul",
            items: [
              "Die Anzahl der Seiten und die Komplexität der Inhalte.",
              "Maßgeschneidert (Next.js) oder WordPress, je nach Ihrem Bedarf an Flexibilität und Eigenständigkeit.",
              "Das Designniveau: angepasstes Template oder zu 100 % maßgeschneiderte Identität.",
              "Die Funktionen: Formulare, Terminbuchung, Zahlung, Kundenbereich …",
              "Mehrsprachigkeit (FR/DE/EN) sowie SEO- & GEO-Optimierung.",
              "Integrationen (CRM, Fachtools) und Automatisierung.",
            ],
          },
          {
            type: "h2",
            id: "fourchettes",
            text: "Anhaltspunkte zur Orientierung",
          },
          {
            type: "h3",
            text: "Visitenkarten-Website oder Landingpage",
          },
          {
            type: "p",
            text: "Um Ihre Tätigkeit vorzustellen und Kontakte zu generieren, bleibt die Investition überschaubar. Das ist oft der beste Ausgangspunkt: schnell umgesetzt, sofort nützlich und auf Conversion ausgelegt.",
          },
          {
            type: "h3",
            text: "Maßgeschneiderte Website oder Plattform",
          },
          {
            type: "p",
            text: "Sobald spezifische Funktionen, ein einzigartiges Design, ausgefeilte Mehrsprachigkeit oder Integrationen nötig sind, steigt das Budget – aber genau dann wird die Website zu einem echten Vermögenswert, der für Sie arbeitet.",
          },
          {
            type: "callout",
            title: "Der richtige Reflex",
            text: "Fragen Sie nicht nur „Was kostet das?“, sondern „Was bringt das ein?“. Eine Website für 2.000 €, die nichts generiert, ist teurer als eine, die sich mit ein paar Aufträgen amortisiert.",
          },
          {
            type: "h2",
            id: "investir-malin",
            text: "Wo Sie mit Priorität investieren sollten",
          },
          {
            type: "ul",
            items: [
              "Performance und Mobile: Eine langsame Website vertreibt Besucher, bevor sie überhaupt gelesen wird.",
              "Der Conversion-Funnel: Jede Seite muss zu einer klaren Handlung führen.",
              "SEO & GEO von Anfang an: bei Google gefunden und von KIs zitiert werden.",
              "Ein ehrlicher, präziser Inhalt, der in Ihrer Realität verankert ist.",
            ],
          },
          {
            type: "quote",
            text: "Eine Website ist keine einmalige Ausgabe, sondern ein Vertriebsmitarbeiter, der rund um die Uhr arbeitet. Die Frage ist, was Sie von ihm erwarten.",
          },
          {
            type: "callout",
            title: "Zum Mitnehmen",
            text: "Der Preis einer Website hängt von Ihren Zielen ab, nicht von einem Pauschaltarif. Definieren Sie den richtigen Umfang, investieren Sie in Conversion und Auffindbarkeit und beurteilen Sie die Kosten an dem, was die Website Ihnen einbringt.",
          },
          {
            type: "p",
            text: "Bei vortx erhalten Sie nach einem kostenlosen Kennenlerngespräch ein präzises Angebot – keinen aus der Luft gegriffenen Preis. Wir sagen Ihnen ohne Umschweife, was Sie wirklich brauchen.",
          },
        ],
      },
      {
        slug: "quest-ce-quun-bon-logo-identite-qui-dure",
        category: "Branding",
        title: "Was macht ein gutes Logo aus? Die Prinzipien einer Identität, die bleibt",
        excerpt:
          "Ein gutes Logo ist nicht nur ein hübsches Bild: Es ist das erste Versprechen Ihrer Marke. Hier sind die Prinzipien, die ein einprägsames von einem vergesslichen Logo unterscheiden.",
        date: "2026-06-08",
        updated: "2026-06-08",
        readingMinutes: 6,
        author: "Das vortx-Team",
        cover: "branding",
        summary: {
          text: "Ein Logo ist nicht nur ein hübsches Bild: Es ist das erste Versprechen Ihrer Marke. Der Artikel erläutert die Prinzipien eines Logos, das bleibt — einfach, einprägsam, zeitlos, vielseitig und passend — und seine Rolle innerhalb einer stimmigen Identität.",
          points: [
            "Ein gutes Logo ist einfach, einprägsam, zeitlos, vielseitig und passend.",
            "Es lebt innerhalb einer stimmigen visuellen Identität, nicht für sich allein.",
            "Visuelle Stimmigkeit schafft Vertrauen, noch vor dem ersten Wort.",
          ],
        },
        links: [
          { label: "Unsere Leistung Branding & Design", href: "/services/branding-design", desc: "Maßgeschneidertes Logo und komplette Markenidentität." },
          { label: "Was kostet eine Website in Luxemburg?", href: "/news/combien-coute-un-site-web-luxembourg-2026", desc: "Ihre Marke fürs Web in Szene setzen." },
          { label: "Glossar: Markenidentität, Design-System…", href: "/glossaire", desc: "Das Vokabular des Brandings erklärt." },
        ],
        body: [
          {
            type: "p",
            text: "Noch vor dem ersten Wort hat Ihr Logo bereits gesprochen. Es ist der erste Eindruck, der Anker, an den man sich erinnert, das Gesicht Ihrer Marke. Dennoch behandeln viele Unternehmen es wie eine Nebensache. Ein gutes Logo ist alles andere als eine Nebensache – und es folgt einfachen Prinzipien.",
          },
          {
            type: "h2",
            id: "pas-juste-joli",
            text: "Ein Logo ist nicht (nur) etwas Hübsches",
          },
          {
            type: "p",
            text: "Ein Logo hat nicht die Aufgabe, jedem zu gefallen, sondern Ihre Marke erkennbar und vertrauenswürdig zu machen. Es muss auf einem Schild ebenso funktionieren wie auf einem App-Icon, in Farbe wie in Schwarz-Weiß.",
          },
          {
            type: "h2",
            id: "principes",
            text: "Die 5 Prinzipien eines guten Logos",
          },
          { type: "logo" },
          { type: "h3", text: "1. Einfach" },
          {
            type: "p",
            text: "Die stärksten Logos sind oft die schlichtesten. Einfachheit prägt sich ein, wird auf einen Blick erkannt und lässt sich überall einsetzen, ohne sich zu verformen.",
          },
          { type: "h3", text: "2. Einprägsam" },
          {
            type: "p",
            text: "Ein gutes Logo hinterlässt eine Spur. Eine Form, eine Idee, ein Detail, das hängen bleibt – markant genug, dass man sich nach einmaligem Sehen daran erinnert.",
          },
          { type: "h3", text: "3. Zeitlos" },
          {
            type: "p",
            text: "Moden vergehen. Ein Logo, das bleiben soll, vermeidet modische Effekte, die schlecht altern, und bleibt auch zehn Jahre später relevant.",
          },
          { type: "h3", text: "4. Vielseitig" },
          {
            type: "p",
            text: "Vom 16-Pixel-Favicon bis zur Plakatwand muss es überall lesbar und stimmig bleiben. Deshalb liefern wir es immer in mehreren Formaten.",
          },
          { type: "h3", text: "5. Passend" },
          {
            type: "p",
            text: "Der Stil muss zu Ihrer Branche und Ihrer Positionierung passen. Ein Logo muss nicht alles über Sie aussagen – nur nicht das Gegenteil von dem, was Sie sind.",
          },
          {
            type: "callout",
            title: "Die klassische Falle",
            text: "Wollen, dass das Logo alles „erklärt“, was Sie tun. Ein gutes Logo identifiziert; den Rest erzählt Ihre Marke über die Zeit.",
          },
          {
            type: "h2",
            id: "au-dela",
            text: "Über das Logo hinaus: die komplette Identität",
          },
          {
            type: "p",
            text: "Ein Logo allein genügt nicht. Seine volle Kraft entfaltet es innerhalb einer stimmigen Identität: Farben, Schriften, Anwendungsregeln. Es ist diese überall angewandte Stimmigkeit, die Vertrauen und Wiedererkennung aufbaut.",
          },
          {
            type: "quote",
            text: "Ein Logo ist die Unterschrift. Die Identität ist die gesamte Handschrift. Beide müssen dasselbe sagen.",
          },
          {
            type: "callout",
            title: "Zum Mitnehmen",
            text: "Ein gutes Logo ist einfach, einprägsam, zeitlos, vielseitig und passend – und es lebt innerhalb einer stimmigen visuellen Identität, nicht für sich allein.",
          },
          {
            type: "p",
            text: "Bei vortx gestalten wir maßgeschneiderte Logos und die komplette Identität, die dazugehört. Lust auf eine Marke, an die man sich erinnert? Sprechen wir darüber.",
          },
        ],
      },
      {
        slug: "rgpd-cookies-site-web-luxembourg",
        category: "Compliance",
        title:
          "DSGVO & Cookies: das Minimum, das Ihre Website in Luxemburg einhalten muss",
        excerpt:
          "Cookie-Banner, Einwilligung, Pflichtangaben … Die DSGVO macht Angst, doch das Wesentliche lässt sich in wenigen klaren Regeln zusammenfassen. Hier ist das Minimum für eine sorgenfreie luxemburgische Website.",
        date: "2026-06-08",
        updated: "2026-06-08",
        readingMinutes: 6,
        author: "Das vortx-Team",
        cover: "rgpd",
        summary: {
          text: "Die DSGVO macht Angst, doch das Wesentliche lässt sich in wenigen klaren Regeln zusammenfassen. Der Artikel fasst das Minimum für eine luxemburgische Website zusammen — Cookie-Banner, Einwilligung und Pflichtangaben — um regelkonform zu sein, ohne in Paranoia zu verfallen.",
          points: [
            "Echte, vorherige Einwilligung vor jedem nicht notwendigen Cookie.",
            "Ein klares Banner und aktuelle Pflichtangaben decken das Wesentliche ab.",
            "Compliance schützt Ihre Besucher und Ihre Glaubwürdigkeit.",
          ],
        },
        links: [
          { label: "Unsere Leistung Websites", href: "/services/sites-web", desc: "Websites, die von Anfang an konform gebaut sind." },
          { label: "SEO vs. GEO: Sichtbarkeit und Vertrauen", href: "/news/geo-seo-luxembourg-etre-cite-par-les-ia", desc: "Warum Vertrauen und Sichtbarkeit zusammengehören." },
          { label: "Glossar: DSGVO, Cookies, Einwilligung…", href: "/glossaire", desc: "Die Begriffe der Compliance erklärt." },
        ],
        body: [
          {
            type: "p",
            text: "Die DSGVO hat den Ruf, ein Kopfzerbrechen zu sein. In Wirklichkeit lässt sich für eine Visitenkarten- oder Lead-Generierungs-Website das Wesentliche auf wenige Regeln des gesunden Menschenverstands reduzieren. Hier ist, was Sie brauchen, um regelkonform zu sein – und vor allem im Vertrauensverhältnis zu Ihren Besuchern.",
          },
          {
            type: "callout",
            title: "Nützlicher Hinweis",
            text: "Dieser Artikel gibt praktische Anhaltspunkte, keine Rechtsberatung. Lassen Sie Ihre Rechtsseiten für einen konkreten Fall von einem Rechtsexperten prüfen.",
          },
          {
            type: "h2",
            id: "rgpd-cest-quoi",
            text: "Die DSGVO in zwei Minuten",
          },
          {
            type: "p",
            text: "Die Datenschutz-Grundverordnung regelt, wie Sie personenbezogene Daten (Name, E-Mail, IP-Adresse …) erheben und verwenden. Das Prinzip: Transparenz, Einwilligung wo nötig und Achtung der Rechte der Betroffenen.",
          },
          {
            type: "h2",
            id: "cookies",
            text: "Cookies: Einwilligung vor dem Setzen",
          },
          {
            type: "ul",
            items: [
              "Nicht notwendige Cookies (Reichweitenmessung, Werbung) werden erst nach ausdrücklicher Zustimmung gesetzt.",
              "Das Banner muss das Annehmen, Ablehnen und Anpassen ermöglichen – Ablehnen muss so einfach sein wie Annehmen.",
              "Für den Betrieb der Website unbedingt notwendige Cookies erfordern keine Einwilligung.",
            ],
          },
          {
            type: "h2",
            id: "checklist",
            text: "Die minimale Checkliste",
          },
          {
            type: "ul",
            items: [
              "Ein DSGVO-konformes Cookie-Banner (annehmen / ablehnen / anpassen).",
              "Eine klare Datenschutzerklärung (welche Daten, wozu, wie lange).",
              "Aktuelle Impressums- und Pflichtangaben.",
              "Eine Rechtsgrundlage für jede Erhebung (Einwilligung, Vertrag, berechtigtes Interesse).",
              "Eine Website über HTTPS und eine sichere Datenverarbeitung.",
              "Eine einfache Möglichkeit, seine Rechte auszuüben (Auskunft, Löschung).",
            ],
          },
          {
            type: "callout",
            title: "Der richtige Reflex",
            text: "Erheben Sie nur, was Sie wirklich brauchen. Weniger Daten bedeutet weniger Risiken – und mehr Vertrauen.",
          },
          {
            type: "h2",
            id: "atout",
            text: "Compliance: eher ein Vorteil als eine lästige Pflicht",
          },
          {
            type: "p",
            text: "Eine Website, die transparent mit dem Umgang von Daten ist, schafft Vertrauen. In Luxemburg, wo Datenschutz ernst genommen wird, ist die Einhaltung der DSGVO ein Zeichen von Professionalität, das zu Ihren Gunsten spricht.",
          },
          {
            type: "quote",
            text: "Die DSGVO ist kein Hindernis für die Conversion. Gut umgesetzt ist sie ein Vertrauensargument.",
          },
          {
            type: "p",
            text: "Bei vortx gestalten wir jede Website von Anfang an DSGVO-konform – Einwilligungs-Banner, Cookie-Verwaltung und Rechtsseiten inklusive. Zweifel an Ihrer aktuellen Website? Wir machen Ihnen eine kostenlose Bestandsaufnahme.",
          },
        ],
      },
      {
        slug: "5-taches-pme-confier-a-l-ia",
        category: "Automatisierung & KI",
        title: "5 Aufgaben, die Ihr KMU schon heute der KI überlassen sollte",
        excerpt:
          "Die KI ersetzt Ihre Teams nicht – sie nimmt ihnen die lästigen Routinen ab. Hier sind 5 konkrete Aufgaben, die ein luxemburgisches KMU schon heute automatisieren kann, ohne Bürokratie-Monster.",
        date: "2026-06-08",
        updated: "2026-06-08",
        readingMinutes: 6,
        author: "Das vortx-Team",
        cover: "automation",
        summary: {
          text: "Die KI ersetzt Ihre Teams nicht, sie nimmt ihnen die lästigen Routinen ab. Der Artikel listet fünf konkrete Aufgaben, die ein luxemburgisches KMU schon heute automatisieren kann — ohne Bürokratie-Monster — um nützliche Zeit freizusetzen.",
          points: [
            "Fangen Sie klein an: wiederkehrende Aufgaben, keine Revolution.",
            "Antworten, Qualifizierung, Nachfassen, Inhalte, Synchronisation: lauter Kandidaten.",
            "Behalten Sie die Kontrolle: Die KI assistiert, der Mensch entscheidet.",
          ],
        },
        links: [
          { label: "KI für KMU: wo Sie anfangen sollten", href: "/news/ia-pme-luxembourg-par-ou-commencer", desc: "Der Leitfaden für den Einstieg ohne Fehlstart." },
          { label: "Unsere Leistung Automatisierung & KI", href: "/services/automatisation-ia", desc: "Maßgeschneiderte Workflows und KI-Agenten." },
          { label: "Glossar: Automatisierung, KI…", href: "/glossaire", desc: "Die Begriffe der Automatisierung erklärt." },
        ],
        body: [
          {
            type: "p",
            text: "Die KI beflügelt die Fantasie ebenso sehr, wie sie beunruhigt. Für ein KMU ist der richtige Ansatz pragmatisch: keine Revolution, sondern wiederkehrende Aufgaben, die man delegiert, um Zeit freizusetzen. Hier sind fünf konkrete Felder, die schon jetzt zugänglich sind.",
          },
          {
            type: "h2",
            id: "pas-remplacer",
            text: "Die KI ist nicht da, um zu ersetzen, sondern um zu entlasten",
          },
          {
            type: "p",
            text: "Das Ziel ist nicht, Stellen abzuschaffen, sondern Ihren Teams das abzunehmen, was keinen Mehrwert bringt – damit sie sich auf Ihre Kunden und Ihr Kerngeschäft konzentrieren können.",
          },
          {
            type: "h2",
            id: "les-5",
            text: "Die 5 Aufgaben, die Sie schon jetzt delegieren sollten",
          },
          { type: "h3", text: "1. Wiederkehrende Fragen beantworten" },
          {
            type: "p",
            text: "Ein gut trainierter Chatbot beantwortet rund um die Uhr gängige Fragen (Öffnungszeiten, Leistungen, Angebote) und leitet den Besucher weiter, ohne jemanden zu binden.",
          },
          { type: "h3", text: "2. Leads qualifizieren und sortieren" },
          {
            type: "p",
            text: "Die KI kann eingehende Anfragen bewerten und die heißesten an den richtigen Ansprechpartner weiterleiten – Ihr Vertrieb bearbeitet nur die besten Kontakte.",
          },
          { type: "h3", text: "3. Nachfassen und Nachverfolgen" },
          {
            type: "p",
            text: "Automatische Nachfass-Mails, Terminerinnerungen, Follow-ups nach einem Angebot: lauter kleine, leicht vergessene Aufgaben, die automatisiert nie mehr unter den Tisch fallen.",
          },
          { type: "h3", text: "4. Inhalte erstellen und anpassen" },
          {
            type: "p",
            text: "E-Mail-Entwürfe, Beschreibungen, mehrsprachige Varianten: Die KI beschleunigt die Produktion, Ihre Teams lesen gegen und geben frei. Mehr Volumen, weniger Aufwand.",
          },
          { type: "h3", text: "5. Ihre Tools synchronisieren" },
          {
            type: "p",
            text: "Website, CRM, Rechnungsstellung, Kalender: Wir verbinden alles, damit die Daten ohne erneute Eingabe fließen. Schluss mit dem Copy-Paste zwischen Programmen.",
          },
          {
            type: "callout",
            title: "Die zu vermeidende Falle",
            text: "Alles auf einmal automatisieren wollen. Man beginnt mit einer Aufgabe, misst den Gewinn und weitet dann aus. Nützliche Automatisierung ist schrittweise.",
          },
          {
            type: "h2",
            id: "par-ou-commencer",
            text: "Wo Sie anfangen sollten",
          },
          {
            type: "ul",
            items: [
              "Finden Sie die wiederkehrende Aufgabe, die Sie am meisten Zeit kostet.",
              "Automatisieren Sie sie zuerst, messen Sie die gewonnene Zeit.",
              "Behalten Sie immer einen Menschen in der Schleife, der freigibt.",
              "Weiten Sie danach Schritt für Schritt aus, im Einklang mit der DSGVO.",
            ],
          },
          {
            type: "quote",
            text: "Die richtige Automatisierung sieht man nicht: Sie gibt Ihnen einfach Ihre Tage zurück.",
          },
          {
            type: "callout",
            title: "Zum Mitnehmen",
            text: "Überlassen Sie der KI die wiederkehrenden Aufgaben ohne Mehrwert – Antworten, Qualifizierung, Nachfassen, Inhalte, Synchronisation – fangen Sie klein an und behalten Sie die Kontrolle.",
          },
          {
            type: "p",
            text: "Bei vortx setzen wir die KI dort ein, wo sie Ihnen wirklich Zeit spart. Wollen Sie wissen, was Sie automatisieren könnten? Wir sagen es Ihnen kostenlos.",
          },
        ],
      },
      {
        slug: "ia-pme-luxembourg-par-ou-commencer",
        category: "Automatisierung & KI",
        title: "KI für KMU in Luxemburg: Wo Sie 2026 anfangen sollten",
        excerpt:
          "KI ist nicht mehr nur den Großkonzernen vorbehalten. Aber wo fängt man als KMU an, ohne Tech-Budget und ohne eigenes Team? Hier ist eine pragmatische Roadmap: die richtigen Anwendungsfälle, die zu vermeidenden Fallen und wie Sie die Kontrolle über Ihre Daten behalten.",
        date: "2026-06-09",
        updated: "2026-06-09",
        readingMinutes: 7,
        author: "Das vortx-Team",
        cover: "ai-build",
        summary: {
          text: "KI ist nicht mehr nur den Großkonzernen vorbehalten: richtig eingesetzt, gibt sie einem KMU die Schlagkraft eines größeren Teams. Dieser Leitfaden räumt mit Vorurteilen auf, zeigt, wo KI sich wirklich auszahlt, und liefert eine Methode, um klein zu starten und dabei die Kontrolle über Ihre Daten zu behalten.",
          points: [
            "Gehen Sie von einem konkreten Problem und einer wiederkehrenden Aufgabe aus, nicht von einem Trend-Tool.",
            "Testen Sie auf einem begrenzten Bereich, messen Sie die gewonnene Zeit und weiten Sie dann aus.",
            "Behalten Sie Ihre Daten unter Kontrolle: DSGVO und Souveränität zuerst.",
          ],
        },
        links: [
          { label: "5 Aufgaben, die Ihr KMU der KI überlassen sollte", href: "/news/5-taches-pme-confier-a-l-ia", desc: "Konkrete Beispiele, die Sie schon jetzt automatisieren können." },
          { label: "Unsere Leistung Automatisierung & KI", href: "/services/automatisation-ia", desc: "Maßgeschneiderte Workflows, Integrationen und KI-Agenten." },
          { label: "Glossar: KI, Automatisierung, DSGVO…", href: "/glossaire", desc: "Das Vokabular der KI einfach erklärt." },
        ],
        body: [
          {
            type: "p",
            text: "Künstliche Intelligenz ist in aller Munde, doch viele KMU-Geschäftsführer fragen sich noch ganz konkret, was sie damit eigentlich anfangen sollen. Die gute Nachricht: Sie brauchen weder eine Datenabteilung noch ein sechsstelliges Budget. Sie brauchen eine Aufgabe, die Sie jede Woche Zeit kostet — und einen vernünftigen Ausgangspunkt. So gehen Sie es an.",
          },
          {
            type: "h2",
            id: "pourquoi-pme",
            text: "Warum KI endlich in Reichweite der KMU ist",
          },
          {
            type: "p",
            text: "Jahrelang war KI ein Konzernprojekt: Daten, Server, Spezialisten. Heute ist das Wesentliche zu einem Dienst geworden, den man auf Abruf aktiviert, nach Nutzung abrechnet und der Deutsch spricht. Ein luxemburgisches KMU kann einen Assistenten anbinden, einen Ablauf automatisieren oder Inhalte erzeugen, ohne selbst etwas zu hosten. Die Einstiegskosten sind geschmolzen; worauf es jetzt ankommt, ist die Wahl des richtigen Anwendungsfalls.",
          },
          {
            type: "h2",
            id: "trois-idees-recues",
            text: "Drei Vorurteile, die KMU blockieren",
          },
          {
            type: "h3",
            text: "„KI ist etwas für Großkonzerne\"",
          },
          {
            type: "p",
            text: "Es ist genau umgekehrt. Je kleiner Ihr Team, desto schwerer wiegt jede gewonnene Stunde. Ein Handwerker, eine Kanzlei oder ein Geschäft, das seine Antworten und sein Nachfassen automatisiert, gewinnt eine Zeit zurück, die keine Großstruktur derart wertschätzt. KI ist ein Multiplikator für kleine Teams.",
          },
          {
            type: "h3",
            text: "„Man braucht einen Entwickler und ein großes Budget\"",
          },
          {
            type: "p",
            text: "Viele Gewinne entstehen mit gebrauchsfertigen Tools und einigen gut durchdachten Automatisierungen. Oft beginnt man, ohne eine einzige Zeile Code zu schreiben. Das Budget bemisst sich in zehn Euro pro Monat, nicht in Tausenden — und es rechtfertigt sich schon mit der ersten automatisierten Aufgabe.",
          },
          {
            type: "h3",
            text: "„Die KI wird mein Team ersetzen\"",
          },
          {
            type: "p",
            text: "Die KI ersetzt Aufgaben, nicht Menschen. Sie übernimmt das Wiederkehrende und das ohne Mehrwert, um Ihren Mitarbeitenden die Zeit für Entscheidungen, Kundenbeziehung und Kerngeschäft zurückzugeben. Richtig geführt, stärkt sie Ihre Teams, statt sie zu verkleinern.",
          },
          {
            type: "callout",
            title: "In einem Satz",
            text: "Die KI ersetzt kein KMU — sie gibt ihm die Schlagkraft eines größeren Teams.",
          },
          {
            type: "h2",
            id: "ou-commencer",
            text: "Wo sich KI für ein KMU wirklich auszahlt",
          },
          {
            type: "p",
            text: "Sie müssen nicht alles umkrempeln. Einige Bereiche bündeln den Großteil des Werts für eine kleine Struktur:",
          },
          {
            type: "ul",
            items: [
              "Kundenbeziehung: Antworten auf häufige Fragen, Qualifizierung von Anfragen, Terminvereinbarung.",
              "Marketing & Content: Entwürfe für Artikel, Posts, E-Mails und Beschreibungen, zum Gegenlesen und Personalisieren.",
              "Angebote & Administration: Vorbefüllung, Zusammenfassung von Dokumenten, automatisches Nachfassen.",
              "Analyse: schnelles Auslesen Ihrer Verkaufs- oder Traffic-Daten, um zu erkennen, was funktioniert.",
              "Interne Produktivität: Protokolle, Übersetzung FR/DE/EN, Informationsrecherche.",
            ],
          },
          {
            type: "h2",
            id: "demarrer-petit",
            text: "Wie Sie ohne Fehlstart anfangen",
          },
          {
            type: "ol",
            items: [
              "Gehen Sie von einem Problem aus, nicht von einem Tool: Welche Aufgabe kostet Sie jede Woche Zeit?",
              "Wählen Sie eine wiederkehrende und messbare Aufgabe mit einem klaren Ergebnis.",
              "Testen Sie auf einem begrenzten Bereich, an einigen echten Fällen, bevor Sie verallgemeinern.",
              "Messen Sie ehrlich die gewonnene Zeit und die erreichte Qualität.",
              "Weiten Sie aus, was funktioniert, und lassen Sie fallen, was seine Versprechen nicht hält.",
            ],
          },
          {
            type: "p",
            text: "Dieser Ansatz in kleinen Schritten vermeidet den Effekt des „großen KI-Projekts\", das im Sande verläuft. Sie sammeln konkrete Erfolge, Ihr Team gewinnt an Vertrauen, und Sie investieren nur dort, wo der Wert bewiesen ist.",
          },
          {
            type: "h2",
            id: "rgpd-donnees",
            text: "DSGVO und Daten: die Sorgfalt, die beruhigt",
          },
          {
            type: "p",
            text: "In Luxemburg ist die Frage der Daten kein Detail. Bevor Sie einem Tool irgendetwas anvertrauen, stellen Sie sich drei Fragen: Wo werden die Daten gespeichert, wer hat Zugriff darauf, und dürfen Sie sie so überhaupt nutzen? Vermeiden Sie es, sensible oder personenbezogene Daten in Consumer-Tools einzufügen, bevorzugen Sie nach Möglichkeit DSGVO-konforme und in der EU gehostete Lösungen, und dokumentieren Sie, was Sie automatisieren. Compliance ist keine Bremse: Sie ist das, was den Einsatz von KI sorgenfrei macht.",
          },
          {
            type: "callout",
            title: "Zum Mitnehmen",
            text: "Beginnen Sie mit einem einfachen und messbaren Anwendungsfall, behalten Sie Ihre Daten unter Kontrolle und weiten Sie aus, sobald der Wert bewiesen ist.",
          },
          {
            type: "quote",
            text: "Die richtige Frage lautet nicht „Muss ich KI machen?\", sondern „Welche Aufgabe kostet mich jede Woche Zeit?\".",
          },
          {
            type: "p",
            text: "Bei vortx helfen wir luxemburgischen KMU, die Anwendungsfälle zu identifizieren, die sich wirklich auszahlen, und sie dann sauber umzusetzen — Tools, Automatisierungen und DSGVO-Schutzmaßnahmen inklusive. Wollen Sie wissen, wo Sie bei sich anfangen sollten? Wir sagen es Ihnen kostenlos.",
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
    eyebrow: "Glossar",
    title: "Das Vokabular von Marketing und Web, ohne Fachjargon.",
    lead: "Alle Begriffe, die wir verwenden — SEO, GEO, ROAS, Trichter, CMS… — einfach erklärt, mit dem Luxemburger Kontext.",
    searchPlaceholder: "Begriff suchen…",
    countSuffix: "Begriffe",
    emptyLabel: "Kein Begriff entspricht Ihrer Suche.",
    ctaTitle: "Ein Begriff ist Ihnen noch unklar?",
    terms: [
      {
        term: "SEO (Suchmaschinenoptimierung)",
        slug: "seo",
        category: "SEO & GEO",
        short: "Kostenlos bei Google gefunden werden.",
        def: "Search Engine Optimization umfasst die Techniken, die die Position einer Website in den natürlichen (nicht bezahlten) Ergebnissen der Suchmaschinen verbessern: technische Qualität, relevante Inhalte, Autorität und Nutzererfahrung.",
      },
      {
        term: "GEO / GSO",
        slug: "geo-gso",
        category: "SEO & GEO",
        short: "Von generativer KI zitiert werden.",
        def: "Generative Engine Optimization (oder Generative Search Optimization) optimiert Ihre Inhalte so, dass sie von KI-Antwortmaschinen (ChatGPT, Perplexity, Google AI) aufgegriffen und als Quelle zitiert werden. Das Ziel: die Antwort sein, nicht nur ein Link.",
      },
      {
        term: "SERP",
        slug: "serp",
        category: "SEO & GEO",
        short: "Die Ergebnisseite von Google.",
        def: "Search Engine Results Page: die Seite, die die Ergebnisse einer Suche anzeigt. Sie verbindet natürliche Links, Anzeigen, Rich Snippets und zunehmend KI-generierte Antworten.",
      },
      {
        term: "Keyword",
        slug: "mot-cle",
        category: "SEO & GEO",
        short: "Was Ihre Kunden eintippen.",
        def: "Begriff oder Ausdruck, den ein Nutzer in eine Suchmaschine eingibt. SEO besteht zum Teil darin, die rentablen Keywords zu identifizieren und die Inhalte um sie herum zu strukturieren.",
      },
      {
        term: "Backlink",
        slug: "backlink",
        category: "SEO & GEO",
        short: "Ein Link von einer anderen Website zu Ihrer.",
        def: "Eingehender Link von einer Drittseite. Hochwertige Backlinks signalisieren den Suchmaschinen, dass Ihre Website Autorität besitzt, was das Ranking verbessert.",
      },
      {
        term: "Strukturierte Daten (Schema.org)",
        slug: "donnees-structurees",
        category: "SEO & GEO",
        short: "Code, der Maschinen Ihre Inhalte erklärt.",
        def: "Standardisierte Auszeichnung, die dem Code einer Seite hinzugefügt wird, um deren Inhalt zu beschreiben (Unternehmen, Leistung, Artikel, FAQ…). Sie hilft Google und KI, Ihre Informationen zu verstehen und hervorzuheben.",
      },
      {
        term: "llms.txt",
        slug: "llms-txt",
        category: "SEO & GEO",
        short: "Eine Zusammenfassung Ihrer Website für KI.",
        def: "Textdatei im Wurzelverzeichnis einer Website, die deren Angebot und Schlüsselinhalte strukturiert für große Sprachmodelle aufbereitet. Ein aufkommender Hebel des GEO.",
      },
      {
        term: "Conversion-Trichter",
        slug: "tunnel-de-conversion",
        category: "Conversion",
        short: "Der Weg vom Besucher zum Kunden.",
        def: "Folge von Schritten, die ein Besucher durchläuft, bevor er Kunde wird (Entdeckung → Interesse → Kontakt → Kauf). Man optimiert ihn, um die Abbrüche bei jedem Schritt zu reduzieren.",
      },
      {
        term: "Conversion-Rate",
        slug: "taux-de-conversion",
        category: "Conversion",
        short: "Der %-Anteil der Besucher, die handeln.",
        def: "Prozentsatz der Besucher, die die gewünschte Aktion ausführen (Angebotsanfrage, Kauf, Anmeldung). Zentraler Indikator für die Wirksamkeit einer Website oder Kampagne.",
      },
      {
        term: "Landingpage",
        slug: "landing-page",
        category: "Conversion",
        short: "Eine Seite für eine einzige Aktion.",
        def: "Zielseite, die um ein einziges Ziel herum gestaltet ist (oft an eine Kampagne gekoppelt): den Besucher ohne Ablenkung in einen Lead oder Kunden zu verwandeln.",
      },
      {
        term: "Call-to-Action (CTA)",
        slug: "cta",
        category: "Conversion",
        short: "Der Button, der zum Handeln einlädt.",
        def: "Element (Button, Link), das den Besucher zum nächsten Schritt bewegt: „Gespräch buchen\", „Angebot erhalten\". Seine Klarheit und Sichtbarkeit beeinflussen die Conversion stark.",
      },
      {
        term: "A/B-Testing",
        slug: "ab-testing",
        category: "Conversion",
        short: "Zwei Versionen vergleichen, die beste behalten.",
        def: "Methode, bei der man zwei Varianten einer Seite oder eines Elements verschiedenen Besuchern zeigt und dann misst, welche besser konvertiert.",
      },
      {
        term: "Lead",
        slug: "lead",
        category: "Akquise",
        short: "Ein potenzieller Geschäftskontakt.",
        def: "Person oder Unternehmen, das Interesse gezeigt hat (Formular, Anruf, Angebotsanfrage) und Kunde werden könnte. Ein „qualifizierter\" Lead passt gut zu Ihrer Zielgruppe.",
      },
      {
        term: "Leadgenerierung",
        slug: "generation-de-leads",
        category: "Akquise",
        short: "Einen stetigen Strom an Interessenten schaffen.",
        def: "Gesamtheit der Maßnahmen (Website, Inhalte, Kampagnen, Automatisierung), die qualifizierte Kontakte planbar anziehen und erfassen.",
      },
      {
        term: "SEA / Bezahlte Werbung",
        slug: "sea",
        category: "Akquise",
        short: "Sichtbarkeit kaufen (Google, Meta…).",
        def: "Search Engine Advertising und Werbung in sozialen Netzwerken: bezahlte Kampagnen (Google Ads, Meta, LinkedIn), die Ihre Anzeigen vor einer gezielten Zielgruppe ausspielen.",
      },
      {
        term: "ROAS",
        slug: "roas",
        category: "Daten & Messung",
        short: "Was jeder Werbe-Euro einbringt.",
        def: "Return On Ad Spend: Umsatz, der für jeden in Werbung investierten Euro erzielt wird. Ein ROAS von 4 bedeutet 4 € Umsatz für 1 € Einsatz.",
      },
      {
        term: "ROI",
        slug: "roi",
        category: "Daten & Messung",
        short: "Der gesamte Return on Investment.",
        def: "Return On Investment: Verhältnis zwischen dem erzielten Gewinn und der investierten Summe. Schlüsselindikator, um die Rentabilität einer Marketing-Maßnahme zu beurteilen.",
      },
      {
        term: "CPL / CPA",
        slug: "cpl-cpa",
        category: "Daten & Messung",
        short: "Was ein Lead oder Verkauf kostet.",
        def: "Cost Per Lead (CPL) und Cost Per Acquisition (CPA): durchschnittlicher Betrag, der ausgegeben wird, um jeweils einen qualifizierten Kontakt oder einen Kunden zu gewinnen. Mit dem erzeugten Wert zu vergleichen.",
      },
      {
        term: "KPI",
        slug: "kpi",
        category: "Daten & Messung",
        short: "Die Zahlen, die wirklich zählen.",
        def: "Key Performance Indicator: Schlüsselkennzahl, die gewählt wird, um den Fortschritt zu einem Ziel zu messen (Conversion-Rate, Kosten pro Lead, qualifizierter Traffic…).",
      },
      {
        term: "CTR",
        slug: "ctr",
        category: "Daten & Messung",
        short: "Der %-Anteil der Klicks auf einen Link oder eine Anzeige.",
        def: "Click-Through-Rate: Anteil der Personen, die klicken, nachdem sie einen Link, eine Anzeige oder ein Ergebnis gesehen haben. Eine hohe CTR signalisiert eine relevante Botschaft.",
      },
      {
        term: "Analytics",
        slug: "analytics",
        category: "Daten & Messung",
        short: "Messen, was auf Ihrer Website passiert.",
        def: "Tools (Google Analytics, Matomo…), die das Verhalten der Besucher verfolgen: Traffic-Quellen, Seitenaufrufe, Conversions. Die Grundlage jeder Marketing-Entscheidung.",
      },
      {
        term: "CMS",
        slug: "cms",
        category: "Web & Technik",
        short: "Das Tool zur Verwaltung der Website-Inhalte.",
        def: "Content Management System (z. B. WordPress): Plattform, mit der man die Seiten einer Website ohne Programmieren erstellen und bearbeiten kann. Praktisch, um im Alltag selbst die Kontrolle zu behalten.",
      },
      {
        term: "WordPress",
        slug: "wordpress",
        category: "Web & Technik",
        short: "Das weltweit verbreitetste CMS.",
        def: "Sehr beliebtes Open-Source-Content-Management-System, ideal, wenn Sie Ihre Seiten selbst bearbeiten wollen. Flexibel dank seiner Themes und Erweiterungen.",
      },
      {
        term: "Next.js",
        slug: "nextjs",
        category: "Web & Technik",
        short: "Ein ultraschnelles Web-Framework.",
        def: "Auf React basierendes Framework, das genutzt wird, um sehr performante, sichere und SEO-optimierte Websites zu bauen. Unsere Standardwahl für Maßanfertigungen.",
      },
      {
        term: "Responsiv",
        slug: "responsive",
        category: "Web & Technik",
        short: "Eine Website, die sich allen Bildschirmen anpasst.",
        def: "Gestaltung, die das Layout je nach Gerät (Handy, Tablet, Computer) automatisch anpasst, für ein optimales Erlebnis überall.",
      },
      {
        term: "Core Web Vitals",
        slug: "core-web-vitals",
        category: "Web & Technik",
        short: "Googles Noten für die technische Qualität.",
        def: "Indikatoren von Google, die Ladegeschwindigkeit, Reaktionsfähigkeit und visuelle Stabilität einer Seite messen. Sie beeinflussen das Ranking und die Nutzererfahrung.",
      },
      {
        term: "DSGVO (RGPD)",
        slug: "rgpd",
        category: "Web & Technik",
        short: "Das europäische Datenschutzgesetz.",
        def: "Datenschutz-Grundverordnung: europäischer Rahmen, der die Erhebung und Nutzung personenbezogener Daten regelt. Eine Luxemburger Website muss ihr entsprechen (Einwilligung, Cookies…).",
      },
      {
        term: "Automatisierung",
        slug: "automatisation",
        category: "Web & Technik",
        short: "Routineaufgaben den Maschinen überlassen.",
        def: "Einrichtung von Workflows, die Aufgaben automatisch ausführen (Nachfassen, Benachrichtigungen, Synchronisierung von Tools), um Zeit zu sparen und Fehler zu reduzieren.",
      },
      {
        term: "Markenidentität",
        slug: "identite-de-marque",
        category: "Design & Marke",
        short: "Was Ihre Marke wiedererkennbar macht.",
        def: "Kohärentes Ensemble aus visuellen Elementen und Botschaften (Logo, Farben, Typografie, Ton), das Ihr Unternehmen abhebt und Vertrauen schafft.",
      },
      {
        term: "Design-System",
        slug: "design-system",
        category: "Design & Marke",
        short: "Der visuelle Werkzeugkasten einer Marke.",
        def: "Bibliothek aus wiederverwendbaren Komponenten, Regeln und Stilen, die die Kohärenz einer Website oder eines Produkts sichert und deren Erstellung beschleunigt.",
      },
      {
        term: "UX / UI",
        slug: "ux-ui",
        category: "Design & Marke",
        short: "Das Erlebnis und die Oberfläche.",
        def: "Die UX (User Experience) betrifft das Empfinden und den Weg des Nutzers; die UI (User Interface) betrifft das Aussehen und die Elemente, mit denen er interagiert. Beide dienen der Conversion.",
      },
    ] as GlossaryTerm[],
  },

  // ---- Service detail (shared labels + per-service content) ----
  servicesDetail: {
    overviewTitle: "Im Detail",
    includedTitle: "Was darin enthalten ist",
    deliverablesTitle: "Liefergegenstände",
    faqTitle: "Häufige Fragen",
  },
  serviceContent: {
    "sites-web": {
      intro: [
        "Ihre Website ist oft das erste — manchmal das einzige — Treffen mit einem Kunden. Wir gestalten sie wie einen Vertriebsmitarbeiter, der rund um die Uhr arbeitet: schnell, klar, handlungsorientiert.",
        "Je nach Bedarf bauen wir maßgeschneidert (Next.js, ultraschnell und KI-ready gedacht) oder auf WordPress, wenn Sie die Kontrolle über die Inhalte im Alltag behalten wollen. Und ja: Ein großer Teil unserer Produktion ist KI-beschleunigt — mehr Qualität, schneller geliefert.",
      ],
      included: [
        { icon: "ai-build", title: "Mit KI gestaltet", desc: "Wir beschleunigen Design und Entwicklung mit KI, ohne je Qualität oder Kohärenz zu opfern." },
        { icon: "wordpress", title: "WordPress, wenn nötig", desc: "Sie wollen Ihre Seiten selbst bearbeiten? Wir liefern ein sauberes, sicheres und leicht zu verwaltendes WordPress." },
        { icon: "next-perf", title: "Next.js-Performance", desc: "Für Maßanfertigungen eine nahezu sofortige, sichere und auf SEO und GEO zugeschnittene Website." },
        { icon: "responsive", title: "100 % responsiv", desc: "Ein makelloses Erlebnis auf Handy, Tablet und Computer — mobile-first." },
        { icon: "conversion", title: "Auf Conversion ausgelegt", desc: "Jede Seite hat ein Ziel: einen Anruf, ein Angebot, einen Lead generieren. Wir führen den Besucher zur Aktion." },
        { icon: "smart-forms", title: "Intelligente Formulare", desc: "Mehrstufige Formulare, die Ihre Interessenten qualifizieren und die Antwortrate erhöhen." },
      ],
      deliverables: [
        "Mockups und maßgeschneidertes Design, mit Ihnen abgestimmt",
        "Maßgeschneiderte Website (Next.js) oder WordPress, nach Wahl",
        "Grundlegende SEO- & GEO-Optimierung integriert",
        "Formulare, Tracking und Veröffentlichung inklusive",
      ],
      faq: [
        { q: "Maßanfertigung oder WordPress, wie wähle ich?", a: "Die Maßanfertigung (Next.js) bietet die beste Performance und Flexibilität; WordPress ist ideal, wenn Sie die Inhalte selbst bearbeiten wollen. Wir beraten Sie nach Ihrer tatsächlichen Nutzung, ohne Dogma." },
        { q: "Was bedeutet „mit KI gemacht\"?", a: "Wir nutzen KI, um Konzeption, Code und Inhalte zu beschleunigen. Ergebnis: eine Website von besserer Qualität, schneller geliefert und mit einem besseren Preis-Leistungs-Verhältnis — von Menschen geprüft und finalisiert." },
        { q: "Wird meine Website für Google und KI optimiert sein?", a: "Ja. Wir integrieren von Anfang an die SEO- und GEO-Best-Practices: Struktur, Performance, strukturierte Daten und zitierbare Inhalte." },
      ],
      packsIncluded: {
        eyebrow: "Alles inklusive",
        title: "Was ist in all unseren Paketen enthalten?",
        lead: "Welches Paket Sie auch wählen, diese essenziellen Funktionen sind immer dabei.",
        items: [
          { icon: "server", title: "Domain & Hosting", desc: "Erstes Domain-Jahr geschenkt und Highspeed-Hosting inklusive." },
          { icon: "responsive", title: "100 % responsiv", desc: "Perfekte Darstellung auf allen Bildschirmen, um Leads auf Handy, Tablet und Computer zu gewinnen." },
          { icon: "seo", title: "Zukunftssicheres SEO", desc: "Optimiert für klassische Suchmaschinen und konversationelle Suche (GEO) — bei Google gefunden und von KIs zitiert." },
          { icon: "contact", title: "Kontaktformular", desc: "Erhalten Sie Nachrichten direkt per E-Mail (Landing Page & Website S)." },
          { icon: "smartforms", title: "Intelligente Formulare", desc: "Mehrstufige Kontakt- und Angebotsformulare, gemacht, um Conversions zu maximieren und qualifizierte Leads zu gewinnen (Website M, L, XL & maßgeschneidert)." },
          { icon: "ssl", title: "SSL-Zertifikat", desc: "Sichere HTTPS-Verbindung, um Ihre Besucher zu schützen und Google zu überzeugen." },
          { icon: "support", title: "Technischer Support", desc: "Technische Unterstützung in den ersten 3 Monaten inklusive." },
          { icon: "analytics", title: "Integriertes Analytics", desc: "Vollständige Verfolgung von Conversions und Nutzerverhalten für eine laufende Optimierung." },
          { icon: "speed", title: "Optimierte Geschwindigkeit", desc: "Ultraschnelles Laden für ein besseres Erlebnis und ein besseres Ranking." },
        ],
        moreTitle: "Und noch vieles mehr…",
        moreText: "Jedes Projekt ist einzigartig. Wir können die Funktionen ergänzen, die Sie brauchen: Blog, Galerie, Online-Buchung, Anbindung an soziale Netzwerke und mehr.",
        ctaLabel: "Sprechen wir über Ihr Projekt",
      },
    },
    "seo-geo": {
      intro: [
        "Sichtbar zu sein reicht nicht mehr: Man muss bei Google gefunden und von generativer KI zitiert werden. Wir bearbeiten beide Fronten gleichzeitig, denn 80 % der Best-Practices sind gemeinsam.",
        "Technisches Audit, strukturierte Inhalte und für Maschinen lesbare Daten: Wir bauen eine Präsenz, die heute bei Google performt und morgen in den Antworten von ChatGPT, Perplexity und Google AI.",
      ],
      included: [
        { icon: "seo", title: "Technisches & redaktionelles SEO", desc: "Vollständiges Audit, On-Page-Optimierung, Geschwindigkeit und Inhalte, die der Suchintention wirklich entsprechen." },
        { icon: "geo-citation", title: "GEO / GSO", desc: "Wir strukturieren Ihre Inhalte so, dass sie von KI-Antwortmaschinen aufgegriffen und als Quelle zitiert werden." },
        { icon: "multilingual", title: "Mehrsprachig FR/DE/EN", desc: "Eine Suchmaschinenoptimierung, gedacht für die drei Sprachen des Luxemburger Marktes." },
        { icon: "analytics", title: "Tracking & Zitate", desc: "Verfolgung der Google-Rankings und der Zitate in KI-Antworten, mit klarem Reporting." },
      ],
      deliverables: [
        "Vollständiges technisches & semantisches Audit",
        "Content-Plan und On-Page-Optimierungen",
        "Strukturierte Daten (Schema.org) & llms.txt",
        "Monatliches Reporting Rankings + KI-Zitate",
      ],
      faq: [
        { q: "Was ist der Unterschied zwischen SEO und GEO?", a: "SEO platziert Sie in der Ergebnisliste von Google; GEO platziert Sie in der von einer KI generierten Antwort. Wir optimieren für beide." },
        { q: "In welcher Zeit sieht man Ergebnisse?", a: "SEO/GEO ist Grundlagenarbeit: Die ersten Signale erscheinen oft in einigen Wochen, die soliden Gewinne in einigen Monaten. Wir zeigen Ihnen den Fortschritt bei jedem Schritt." },
      ],
    },
    "lead-generation": {
      intro: [
        "Eine schöne Website, die keine Kontakte generiert, ist eine Ausgabe. Wir verwandeln sie in ein Akquise-System: einen stetigen und planbaren Strom qualifizierter Anfragen.",
        "Optimierte Website, Landingpages pro Kampagne, Qualifizierung und Automatisierung: Jedes Glied ist darauf ausgelegt, Ihren Kalender mit Interessenten zu füllen, ohne dass Sie selbst akquirieren müssen.",
      ],
      included: [
        { icon: "leads", title: "Lead-Erfassung", desc: "Trichter und Formulare, gemacht, um ein Maximum an qualifizierten Kontakten zu erfassen." },
        { icon: "conversion", title: "Optimierte Trichter", desc: "Ein klarer Weg Besucher → Lead → Kunde, laufend optimiert, um Abbrüche zu reduzieren." },
        { icon: "smart-forms", title: "Qualifizierung & Scoring", desc: "Wir qualifizieren die Leads automatisch, damit sich Ihr Vertrieb auf die besten konzentriert." },
        { icon: "analytics", title: "Reporting Kosten pro Lead", desc: "Eine transparente Verfolgung der Kosten pro Lead und des Return on Investment." },
      ],
      deliverables: [
        "Maßgeschneiderte Conversion-Trichter",
        "Landingpages pro Kampagne",
        "Qualifizierungs- & Scoring-System",
        "Dashboard Kosten pro Lead & ROI",
      ],
      faq: [
        { q: "Garantieren Sie eine Anzahl an Leads?", a: "Wir verkaufen kein magisches Versprechen: Wir bauen ein messbares System und optimieren es, bis es performt. Die Ziele werden gemeinsam festgelegt, abhängig von Ihrem Markt." },
        { q: "Braucht man ein Werbebudget?", a: "Nicht immer. Ein Teil der Leads kann aus SEO/GEO und Inhalten kommen. Werbung beschleunigt, aber wir beginnen damit, das zu maximieren, was Ihre Website bereits erfassen kann." },
      ],
    },
    publicite: {
      intro: [
        "Bezahlte Werbung ist sofortige Sichtbarkeit — vorausgesetzt, Sie geben Ihr Budget dort aus, wo es sich auszahlt. Wir steuern Ihre Kampagnen über Daten, nicht aus dem Bauch heraus.",
        "Google Ads, Meta, LinkedIn: Wir zielen auf die richtigen Menschen, testen und optimieren laufend, um die Kosten pro Akquise zu senken und den ROAS zu steigern.",
      ],
      included: [
        { icon: "ads-targeting", title: "Präzises Targeting", desc: "Die richtigen Zielgruppen, auf den richtigen Kanälen, mit der richtigen Botschaft zum richtigen Zeitpunkt." },
        { icon: "next-perf", title: "Google Ads & Performance Max", desc: "Search- und Performance-Max-Kampagnen, auf Rentabilität strukturiert." },
        { icon: "conversion", title: "Dedizierte Landingpages", desc: "Zielseiten, gemacht, um den bezahlten Klick in einen Lead zu verwandeln." },
        { icon: "analytics", title: "ROAS-Optimierung", desc: "Conversion-Tracking und laufende Anpassungen, um den Return zu maximieren." },
      ],
      deliverables: [
        "Strategie und Kampagnenstruktur",
        "Erstellung der Anzeigen (Google, Meta, LinkedIn)",
        "Auf Conversion optimierte Landingpages",
        "ROAS-Reporting und laufende Optimierung",
      ],
      faq: [
        { q: "Welches Mindestbudget einplanen?", a: "Das hängt von Ihrer Branche und Ihrem Ziel ab. Wir definieren gemeinsam ein Testbudget, messen und erhöhen dann nur, was rentabel ist." },
        { q: "Übernehmen Sie auch das Conversion-Tracking?", a: "Ja. Ohne verlässliches Tracking ist Optimierung unmöglich. Wir richten das Conversion-Tracking ein und verbinden jeden ausgegebenen Euro mit einem Ergebnis." },
      ],
    },
    "branding-design": {
      intro: [
        "Ihr Logo ist das Erste, was man von Ihnen behält. Wir gestalten es maßgeschneidert, damit es einzigartig, einprägsam und Ihnen treu ist — kein tausendfach gesehenes Template.",
        "Über das Logo hinaus bauen wir eine vollständige visuelle Identität auf: Farben, Typografien, Anwendungsregeln. Eine überall kohärente Marke, von der Website bis zum Print, die Vertrauen schafft, noch vor dem ersten Wort.",
      ],
      included: [
        { icon: "branding", title: "Maßgeschneidertes Logo", desc: "Ein einzigartiges, von Hand gestaltetes Logo, abgeleitet in allen Formaten, die Sie brauchen werden." },
        { icon: "ai-build", title: "Visuelle Identität", desc: "Farbpalette, Typografien und grafische Elemente, die Ihre Marke wiedererkennbar machen." },
        { icon: "responsive", title: "Styleguide", desc: "Ein klarer Leitfaden der Anwendungsregeln, um Ihre Marke überall und über die Zeit kohärent zu halten." },
        { icon: "conversion", title: "Print- & Digital-Ableitungen", desc: "Visitenkarten, Signaturen, soziale Netzwerke, Medien… Ihre Marke auf alles angewendet." },
      ],
      deliverables: [
        "Maßgeschneidertes Logo (alle Formate: Farbe, Schwarz-Weiß, vektoriell)",
        "Visuelle Identität: Farben & Typografien",
        "Styleguide & Anwendungsregeln",
        "Print- und Digital-Ableitungen",
      ],
      faq: [
        { q: "Erstellen Sie ein Logo von Grund auf neu oder entwickeln Sie das Bestehende weiter?", a: "Beides. Wir können ein Logo und eine Identität von A bis Z schaffen oder Ihre auffrischen, indem wir behalten, was bereits funktioniert und mit dem Sie erkannt werden." },
        { q: "Welche Dateien erhalte ich?", a: "Sie erhalten Ihr Logo in allen nützlichen Formaten (vektoriell, Farbe, Schwarz-Weiß, Web- und Print-Versionen) — Sie sind vollumfänglich Eigentümer davon." },
        { q: "Berücksichtigt das Design die Conversion?", a: "Immer. Wir machen nicht Schönes um des Schönen willen: Jede visuelle Entscheidung dient Klarheit, Vertrauen und Aktion." },
      ],
    },
    "automatisation-ia": {
      intro: [
        "Ihre Teams verbringen zu viel Zeit mit Routineaufgaben? Wir automatisieren sie. Mehr Ergebnisse, weniger Reibung — und schnellere Antworten an Ihre Kunden.",
        "Automatisierte Workflows, Integrationen zwischen Ihren Tools und maßgeschneiderte KI-Agenten: Wir verbinden Ihren Stack und setzen die KI dort ein, wo sie Ihnen wirklich Zeit spart.",
      ],
      included: [
        { icon: "automation", title: "Automatisierung von Workflows", desc: "Wir beseitigen die manuellen Routineaufgaben: Nachfassen, Synchronisierung, Benachrichtigungen." },
        { icon: "ai-build", title: "KI-Agenten & -Assistenten", desc: "Maßgeschneiderte KI-Assistenten, trainiert auf Ihren Kontext und Ihre Prozesse." },
        { icon: "smart-forms", title: "CRM- & Tool-Integrationen", desc: "Wir verbinden Ihre Website, Ihr CRM und Ihre Tools für einen reibungslosen Datenfluss." },
        { icon: "analytics", title: "Intelligente Chatbots", desc: "Widgets und Chatbots, die Ihre Besucher rund um die Uhr beantworten, qualifizieren und lenken." },
      ],
      deliverables: [
        "Kartierung der zu automatisierenden Prozesse",
        "Konfigurierte Workflows und Integrationen",
        "Maßgeschneiderter KI-Agent/-Assistent",
        "Dokumentation und Begleitung",
      ],
      faq: [
        { q: "Wird die KI meine Teams ersetzen?", a: "Nein — sie entlastet sie. Wir automatisieren die Aufgaben ohne Mehrwert, damit sich Ihre Teams auf das Wesentliche konzentrieren: Ihre Kunden." },
        { q: "Sind meine Daten sicher?", a: "Ja. Wir konzipieren die Automatisierungen unter Einhaltung der DSGVO und mit großer Aufmerksamkeit für die Vertraulichkeit Ihrer Daten." },
      ],
    },
  },

  portfolio: {
    typewriter: [
      "Gestalten Sie Ihre digitale Präsenz",
      "Schaffen Sie einzigartige Erlebnisse",
      "Bringen Sie Ihr Geschäft online voran",
      "Heben Sie sich vom Wettbewerb ab",
      "Verbinden Sie sich mit Ihren Kunden",
    ],
    cta: "Lassen Sie uns zusammenarbeiten",
    prev: "Vorheriges Projekt",
    next: "Nächstes Projekt",
    pause: "Pausieren",
    play: "Wiedergabe fortsetzen",
  },

  // ---- Sub-services (children of a parent service) ----
  subServicesTitle: "Zwei sich ergänzende Kompetenzen",
  subServicesLead: "Diese Leistung gliedert sich in zwei Spezialgebiete. Nehmen Sie das, was zu Ihrem Bedarf passt — oder kombinieren Sie beide, um das gesamte Feld abzudecken.",
  subServices: {
    publicite: [
      {
        slug: "google-ads",
        illustration: "google-ads",
        title: "Google Ads",
        tagline: "Fangen Sie die Nachfrage genau in dem Moment ein, in dem sie entsteht.",
        short:
          "Search, Performance Max, Shopping, YouTube: Seien Sie präsent, wenn Ihre Kunden suchen — mit datengesteuerten und auf Rentabilität ausgerichteten Kampagnen.",
        bullets: [
          "Search & Performance Max",
          "Shopping & YouTube Ads",
          "Dedizierte Landingpages",
          "Kontinuierliche ROAS-Optimierung",
        ],
        metaTitle: "Google-Ads-Agentur in Luxemburg | vortx",
        metaDescription:
          "Rentable Google-Ads-Kampagnen (Search, Performance Max, Shopping, YouTube) für den luxemburgischen Markt. Fangen Sie die Nachfrage ein, datengesteuert.",
        intro: [
          "Bei Google suchen Ihre Kunden nicht nach einer Marke: Sie suchen nach einer Lösung. Google Ads platziert Sie genau in dem Moment vor ihnen, in dem sie es brauchen — nicht früher, nicht später.",
          "Wir strukturieren Ihre Kampagnen (Search, Performance Max, Shopping, YouTube) so, dass diese Absicht eingefangen und in konkrete Anfragen umgewandelt wird — indem wir Ihr Budget dort einsetzen, wo es sich wirklich auszahlt.",
        ],
        included: [
          { icon: "ads-targeting", title: "Search & Performance Max", desc: "Strukturierte Kampagnen, um bei den Suchanfragen zu erscheinen, die konvertieren." },
          { icon: "conversion", title: "Dedizierte Landingpages", desc: "Landingpages, die darauf ausgelegt sind, den bezahlten Klick in einen Lead zu verwandeln." },
          { icon: "analytics", title: "Datengesteuerte Steuerung", desc: "Ein zuverlässiges Conversion-Tracking: Jeder ausgegebene Euro ist mit einem Ergebnis verknüpft." },
          { icon: "next-perf", title: "ROAS-Optimierung", desc: "Kontinuierliche Anpassungen von Geboten und Zielgruppen, um die Rendite zu maximieren." },
        ],
        deliverables: [
          "Strategie & Kontostruktur",
          "Erstellung der Kampagnen (Search, PMax, Shopping, YouTube)",
          "Optimierte Landingpages",
          "ROAS-Reporting & kontinuierliche Optimierung",
        ],
        faq: [
          { q: "Welches Mindestbudget sollte man einplanen?", a: "Das hängt von Ihrer Branche und dem Wettbewerb um Ihre Keywords ab. Wir legen ein Testbudget fest, messen die Ergebnisse und erhöhen dann nur das, was rentabel ist." },
          { q: "Wie lange dauert es, bis man Ergebnisse sieht?", a: "Die ersten Klicks kommen bereits ab dem Start. Die ersten Wochen dienen dem Lernen und Optimieren; danach stabilisiert sich die Rentabilität." },
        ],
      },
      {
        slug: "meta-ads",
        illustration: "meta-ads",
        title: "Meta Ads",
        tagline: "Wecken Sie die Nachfrage auf Facebook, Instagram und Threads.",
        short:
          "Inhalte, die das Scrollen stoppen. Gezielte Meta-Kampagnen (Facebook, Instagram, Threads), um Ihre Marke bekannt zu machen, Ihr Publikum zu binden und zu konvertieren.",
        bullets: [
          "Facebook & Instagram Ads",
          "Threads",
          "Zielgruppen & Retargeting",
          "Erstellung von Inhalten, die konvertieren",
        ],
        metaTitle: "Meta-Ads-Agentur (Facebook & Instagram) in Luxemburg | vortx",
        metaDescription:
          "Meta-Ads-Kampagnen (Facebook, Instagram, Threads) für den luxemburgischen Markt: Bekanntheit, Engagement und Conversions. Präzises Targeting und Creatives, die performen.",
        intro: [
          "In den sozialen Netzwerken sucht niemand nach Ihrem Produkt — es liegt an Ihnen, die Aufmerksamkeit zu gewinnen. Meta Ads (Facebook, Instagram, Threads) weckt die Nachfrage dort, wo Ihre Kunden ihre Zeit verbringen.",
          "Wir kombinieren präzises Targeting, Retargeting und die Erstellung von Inhalten, die das Scrollen stoppen, um ein kaltes Publikum Schritt für Schritt in Kunden zu verwandeln.",
        ],
        included: [
          { icon: "ads-targeting", title: "Präzises Social-Targeting", desc: "Die richtigen Zielgruppen auf Facebook, Instagram und Threads, zum richtigen Zeitpunkt." },
          { icon: "branding", title: "Creatives, die konvertieren", desc: "Visuals und Videos, die darauf ausgelegt sind, Aufmerksamkeit zu erregen und zum Handeln zu motivieren." },
          { icon: "leads", title: "Retargeting & Zielgruppen", desc: "Wir sprechen Besucher erneut an und bauen ähnliche Zielgruppen auf, um die Wirkung zu verstärken." },
          { icon: "analytics", title: "Performance-Tracking", desc: "Ein klares Reporting zu den Kosten pro Ergebnis und der Rendite Ihrer Investition." },
        ],
        deliverables: [
          "Strategie & Struktur der Meta-Kampagnen",
          "Erstellung der Visuals und Videos",
          "Zielgruppen, Retargeting & A/B-Tests",
          "Reporting & kontinuierliche Optimierung",
        ],
        faq: [
          { q: "Sind Meta Ads nur Facebook und Instagram?", a: "Nein: Wir decken auch Threads und das Meta Audience Network ab. Wir wählen die Platzierungen je nach Ihrer Zielgruppe und Ihren Zielen." },
          { q: "Muss man bereits Inhalte haben?", a: "Nicht unbedingt. Wir können die Werbe-Visuals und -Videos erstellen oder von Ihren bestehenden Inhalten ausgehen und sie an das Format anpassen, das konvertiert." },
        ],
      },
    ],
    "seo-geo": [
      {
        slug: "seo",
        illustration: "seo",
        title: "SEO",
        tagline: "Bei Google gefunden werden, dauerhaft.",
        short:
          "Technische und redaktionelle Suchmaschinenoptimierung: Wir optimieren Ihre Website, damit sie bei den Suchanfragen, die zählen, nach oben kommt und qualifizierten Traffic anzieht — ohne den Klick zu bezahlen.",
        bullets: [
          "Technisches & semantisches Audit",
          "On-Page-Optimierung",
          "Inhalte & Keywords",
          "Tracking der Rankings",
        ],
        metaTitle: "SEO-Agentur in Luxemburg | vortx",
        metaDescription:
          "Technische und redaktionelle Suchmaschinenoptimierung (SEO) für Luxemburger Unternehmen. Steigen Sie bei Google auf und ziehen Sie dauerhaft qualifizierten Traffic an.",
        intro: [
          "SEO ist die Kunst, bei Google gefunden zu werden, ohne den Klick zu bezahlen. Ein Asset, dessen Aufbau einige Wochen dauert, das aber noch lange danach qualifizierten Traffic anzieht — anders als Werbung, die stoppt, sobald man das Budget abdreht.",
          "Wir bearbeiten die drei Säulen: die Technik (Geschwindigkeit, Struktur, Indexierung), die Inhalte (die richtigen Keywords, die Suchintention) und die Autorität. Alles gedacht für den Luxemburger Markt und seine Mehrsprachigkeit.",
        ],
        included: [
          { icon: "seo", title: "Audit & technisches SEO", desc: "Geschwindigkeit, Struktur, Indexierung, Daten: Wir beheben die Grundlagen, die Ihr Ranking blockieren." },
          { icon: "conversion", title: "Optimierte Inhalte", desc: "Seiten, die wirklich auf die Suchintention antworten und konvertieren." },
          { icon: "multilingual", title: "Mehrsprachig FR/DE/EN", desc: "Ein Ranking, gedacht für die drei Sprachen des Luxemburger Marktes." },
          { icon: "analytics", title: "Tracking der Rankings", desc: "Klares Reporting zu Ihren Positionen, Ihrem Traffic und Ihren Conversions." },
        ],
        deliverables: [
          "Vollständiges technisches & semantisches Audit",
          "Keyword-Plan und On-Page-Optimierungen",
          "Content-Empfehlungen",
          "Monatliches Reporting der Rankings & des Traffics",
        ],
        faq: [
          { q: "Wie lange dauert es, bis man Ergebnisse sieht?", a: "Die ersten Signale erscheinen oft in wenigen Wochen, solide Zugewinne in einigen Monaten. SEO ist Grundlagenarbeit — wir zeigen Ihnen den Fortschritt bei jedem Schritt." },
          { q: "Reicht SEO, oder braucht es auch Werbung?", a: "Beides ergänzt sich: Werbung bringt sofortige Ergebnisse, SEO baut dauerhaften Traffic auf. Wir empfehlen Ihnen die richtige Dosierung je nach Ihrem Zeithorizont." },
        ],
      },
      {
        slug: "geo-gso",
        illustration: "geo-gso",
        title: "GEO / GSO",
        tagline: "Die Antwort sein, die von KI zitiert wird.",
        short:
          "Generative Engine Optimization: Wir strukturieren Ihre Inhalte und Daten so, dass ChatGPT, Perplexity und Google AI Sie als Quelle zitieren — nicht nur als Link.",
        bullets: [
          "Strukturierte & zitierbare Inhalte",
          "Strukturierte Daten (Schema.org)",
          "llms.txt-Datei",
          "Tracking der KI-Zitate",
        ],
        metaTitle: "GEO- / GSO-Agentur in Luxemburg | vortx",
        metaDescription:
          "Optimierung für generative KI (GEO/GSO): Werden Sie von ChatGPT, Perplexity und Google AI zitiert. Strukturierte Daten, zitierbare Inhalte, Tracking der Zitate.",
        intro: [
          "Immer mehr Ihrer Kunden stellen ihre Fragen einer KI statt Google. GEO (Generative Engine Optimization) optimiert Ihre Präsenz so, dass ChatGPT, Perplexity und Google AI Sie aufgreifen und als Quelle zitieren — nicht nur als einen Link unter vielen.",
          "Wir strukturieren Ihre Inhalte so, dass sie „zitierbar\" sind (klare Antworten, nachprüfbare Fakten, lokaler Kontext), und machen Ihre Website für Maschinen lesbar: strukturierte Daten, llms.txt, saubere Architektur.",
        ],
        included: [
          { icon: "geo-citation", title: "Zitierbare Inhalte", desc: "Wir strukturieren Ihre Seiten so, dass sie in den Antworten generativer KI aufgegriffen und zitiert werden." },
          { icon: "seo", title: "Strukturierte Daten", desc: "Schema.org und llms.txt: Wir machen Ihr Angebot für die Modelle lesbar und aufgreifbar." },
          { icon: "ai-build", title: "KI-ready Architektur", desc: "Eine schnelle und saubere Website, von Anfang an für Antwortmaschinen gedacht." },
          { icon: "analytics", title: "Tracking der Zitate", desc: "Wir verfolgen, wo und wie die KI Sie zitiert, mit klarem Reporting." },
        ],
        deliverables: [
          "GEO-Audit & Strukturierung der Inhalte",
          "Strukturierte Daten (Schema.org)",
          "llms.txt-Datei & technische Optimierungen",
          "Reporting der Zitate in den KI-Antworten",
        ],
        faq: [
          { q: "Ersetzt GEO das SEO?", a: "Nein, es ergänzt es. 80 % der Best Practices sind gemeinsam: Ein strukturierter und verlässlicher Inhalt performt sowohl bei Google als auch bei der KI. Wir optimieren für beide." },
          { q: "Wie misst man die Ergebnisse von GEO?", a: "Wir verfolgen Ihre Präsenz in den Antworten der KI-Assistenten (Zitate, Erwähnungen) und die Entwicklung Ihrer Autorität. Es ist ein aufkommendes Feld: Wir gehen methodisch und transparent vor." },
        ],
      },
    ],
  },

  // ---- FAQ page (comprehensive, grouped) ----
  faqPage: {
    eyebrow: "FAQ",
    title: "Alle Ihre Fragen, unsere klaren Antworten.",
    lead: "Website, SEO, Leads, Werbung, KI, Preise, Fristen, DSGVO… Alles, was man uns vor dem Start fragt. Eine Frage bleibt offen? Schreiben Sie uns.",
    searchPlaceholder: "Eine Frage suchen…",
    countSuffix: "Fragen",
    emptyLabel: "Keine Frage entspricht Ihrer Suche.",
    ctaTitle: "Eine Frage ohne Antwort?",
    groups: [
      {
        title: "Die Agentur & der Start",
        items: [
          { q: "Wer ist vortx und was machen Sie genau?", a: "vortx ist eine in Luxemburg ansässige Marketing- und Web-Agentur. Wir gestalten Websites, die konvertieren, und messbare Akquise-Strategien: SEO & GEO, Leadgenerierung, Online-Werbung, Branding und KI-Automatisierung. Unsere Obsession: Aufmerksamkeit in Kunden verwandeln." },
          { q: "Arbeiten Sie mit Unternehmen meiner Größe?", a: "Ja. Wir begleiten sowohl Selbstständige und Handwerker als auch KMU und Startups. Der Ansatz passt sich Ihrer digitalen Reife und Ihrem Budget an." },
          { q: "Wie läuft ein Erstkontakt ab?", a: "Sie buchen ein kostenloses Erstgespräch. Wir analysieren Ihre Situation, Ihre Ziele und Ihren Markt und sagen Ihnen dann ohne Umschweife, was sich verbessern lässt — noch bevor wir über ein Angebot sprechen." },
          { q: "Sind Sie eine Luxemburger Agentur?", a: "Ja, wir kennen den lokalen Markt, seine Mehrsprachigkeit (FR/DE/EN) und seine DSGVO-Anforderungen. Wir denken Ihre Kampagnen für das Luxemburger Terrain." },
        ],
      },
      {
        title: "Websites",
        items: [
          { q: "Maßanfertigung oder WordPress, wie wähle ich?", a: "Die Maßanfertigung (Next.js) bietet die beste Performance, Sicherheit und Flexibilität; WordPress ist ideal, wenn Sie die Inhalte im Alltag selbst bearbeiten wollen. Wir beraten Sie nach Ihrer tatsächlichen Nutzung, ohne Dogma." },
          { q: "Stimmt es, dass Ihre Websites „mit KI gemacht\" sind?", a: "Ja. Wir nutzen KI, um Design, Code und Inhalte zu beschleunigen. Ergebnis: eine Website von besserer Qualität, schneller geliefert und mit einem besseren Preis-Leistungs-Verhältnis — stets von Menschen geprüft und finalisiert." },
          { q: "Wird meine Website schnell und mobiltauglich sein?", a: "Absolut. Performance und mobile-first sind die Basis: eine nahezu sofortige Website, 100 % responsiv und auf allen Bildschirmen zugänglich." },
          { q: "Kann ich meine Website selbst ändern?", a: "Auf WordPress ja, ganz leicht. Bei einer Maßanfertigung richten wir ein, was nötig ist, damit Sie Ihre Schlüsselinhalte verwalten können — oder wir übernehmen es für Sie." },
          { q: "Wird meine Website für Google und KI optimiert sein?", a: "Ja. Wir integrieren von Anfang an die SEO- und GEO-Best-Practices: Struktur, Performance, strukturierte Daten und durch KI-Antwortmaschinen zitierbare Inhalte." },
          { q: "Übernehmen Sie Hosting und Wartung?", a: "Ja. Wir können Hosting, Updates, Sicherheit und Weiterentwicklungen übernehmen, damit Sie sich darum nicht kümmern müssen." },
        ],
      },
      {
        title: "SEO & GEO",
        items: [
          { q: "Was ist der Unterschied zwischen SEO und GEO?", a: "SEO platziert Sie in der Ergebnisliste von Google; GEO (Generative Engine Optimization) platziert Sie in der von einer KI wie ChatGPT oder Perplexity generierten Antwort. Wir optimieren für beide, denn 80 % der Best-Practices sind gemeinsam." },
          { q: "Ist GEO konkret oder ein Modetrend?", a: "Es ist sehr konkret: Immer mehr Entscheider stellen ihre Fragen einer KI statt Google. Wenn Sie in der Antwort nicht auftauchen, existieren Sie in der Entscheidung nicht. Wir strukturieren Ihre Inhalte, um als Quelle zitiert zu werden." },
          { q: "In welcher Zeit sieht man Ergebnisse im SEO?", a: "SEO/GEO ist Grundlagenarbeit: Die ersten Signale erscheinen oft in einigen Wochen, die soliden Gewinne in einigen Monaten. Wir zeigen Ihnen den Fortschritt bei jedem Schritt, ohne magisches Versprechen." },
          { q: "Bearbeiten Sie die Suchmaschinenoptimierung in mehreren Sprachen?", a: "Ja, FR/DE/EN nativ. Das ist in Luxemburg essenziell, wo Ihre Kunden in allen drei Sprachen vergleichen." },
        ],
      },
      {
        title: "Leads & Werbung",
        items: [
          { q: "Garantieren Sie eine Anzahl an Leads?", a: "Wir verkaufen kein magisches Versprechen: Wir bauen ein messbares Akquise-System und optimieren es, bis es performt. Die Ziele werden gemeinsam festgelegt, je nach Ihrem Markt." },
          { q: "Braucht man zwingend ein Werbebudget?", a: "Nicht immer. Ein Teil der Leads kann aus SEO/GEO und Inhalten kommen. Werbung beschleunigt, aber wir beginnen damit, das zu maximieren, was Ihre Website bereits erfassen kann." },
          { q: "Welches Mindest-Werbebudget einplanen?", a: "Das hängt von Ihrer Branche und Ihrem Ziel ab. Wir definieren gemeinsam ein Testbudget, messen und erhöhen dann nur, was rentabel ist." },
          { q: "Auf welchen Kanälen schalten Sie Werbung?", a: "Google Ads und Performance Max, Meta (Facebook & Instagram) und LinkedIn Ads für B2B. Wir wählen die Kanäle nach Ihrer Zielgruppe." },
          { q: "Wie messen Sie den Return on Investment?", a: "Wir richten ein verlässliches Conversion-Tracking und ein klares Reporting ein: Kosten pro Lead, ROAS, ROI. Jeder ausgegebene Euro ist mit einem Ergebnis verbunden." },
        ],
      },
      {
        title: "Branding, Design & KI",
        items: [
          { q: "Schaffen Sie eine Marke von Grund auf neu oder entwickeln Sie das Bestehende weiter?", a: "Beides. Wir können eine vollständige visuelle Identität schaffen (Logo, Styleguide, Design-System) oder Ihre auffrischen, indem wir behalten, was funktioniert und mit dem Sie bereits erkannt werden." },
          { q: "Berücksichtigt das Design die Conversion?", a: "Immer. Wir machen nicht Schönes um des Schönen willen: Jede visuelle Entscheidung dient Klarheit, Vertrauen und Aktion." },
          { q: "Wofür sind Automatisierung und KI konkret nützlich?", a: "Um Routineaufgaben zu beseitigen (Nachfassen, Synchronisierung von Tools, Benachrichtigungen), Ihre Website und Ihr CRM zu verbinden und KI-Assistenten oder -Chatbots einzusetzen, die Ihre Besucher rund um die Uhr beantworten und qualifizieren." },
          { q: "Wird die KI meine Teams ersetzen?", a: "Nein — sie entlastet sie. Wir automatisieren die Aufgaben ohne Mehrwert, damit sich Ihre Teams auf das Wesentliche konzentrieren: Ihre Kunden." },
        ],
      },
      {
        title: "Preise, Fristen & Prozess",
        items: [
          { q: "Was kostet eine Website oder eine Kampagne?", a: "Jedes Projekt ist maßgeschneidert. Statt eines Pauschaltarifs erstellen wir Ihnen ein präzises Angebot nach einem kostenlosen Erstgespräch und einem Audit Ihrer Situation." },
          { q: "Warum zeigen Sie Ihre Preise nicht an?", a: "Weil ein gutes Angebot von Ihren realen Zielen abhängt. Ein Pauschalpreis wäre entweder zu hoch oder enttäuschend. Wir ziehen es vor, Ihnen den passenden Umfang anzubieten, ohne zu viel zu berechnen." },
          { q: "Wie lang sind die Umsetzungsfristen?", a: "Das hängt vom Umfang des Projekts ab, aber unsere KI-beschleunigte Produktion erlaubt es uns, schnell zu liefern. Wir geben Ihnen einen klaren Zeitplan schon mit dem Angebot." },
          { q: "Wie läuft ein Projekt Schritt für Schritt ab?", a: "Vier Phasen: Diagnose, Konzeption & Entwicklung, Review & Anpassungen, dann Launch & Betreuung. Sie geben bei jedem Schritt Ihr Okay, ohne böse Überraschung." },
          { q: "Bieten Sie Betreuung nach dem Launch an?", a: "Ja. Wartung, Weiterentwicklung, Conversion-Optimierung und laufende Marketing-Begleitung gehören zu unserem Angebot." },
          { q: "Ist das Angebot wirklich unverbindlich?", a: "Ja. Das Erstgespräch, das Audit und das Angebot sind kostenlos und unverbindlich. Sie entscheiden danach, in voller Freiheit." },
        ],
      },
      {
        title: "Technik, Sprachen & DSGVO",
        items: [
          { q: "Sind meine Daten und die meiner Kunden geschützt?", a: "Ja. Wir konzipieren jede Website und jede Automatisierung unter Einhaltung der DSGVO: Einwilligung, Cookie-Verwaltung und große Aufmerksamkeit für die Vertraulichkeit." },
          { q: "Wird meine Website mehrsprachig sein?", a: "Ja, nativ bei Bedarf (FR, DE, EN und Lëtzebuergesch auf Anfrage), mit einer Struktur, die für die Suchmaschinenoptimierung jeder Sprache gedacht ist." },
          { q: "Was passiert, wenn ich später die Agentur wechseln will?", a: "Sie bleiben Eigentümer Ihrer Website, Ihrer Inhalte und Ihrer Zugänge. Keine Einsperrung: Alles gehört Ihnen." },
          { q: "Wird meine Website für Menschen mit Behinderung zugänglich sein?", a: "Wir folgen den Best-Practices der Barrierefreiheit (Kontraste, Tastaturnavigation, Semantik) für eine Website, die von möglichst vielen nutzbar ist." },
        ],
      },
    ],
  },

  // ---- Accessibility widget ----
  a11y: {
    button: "Barrierefreiheit",
    title: "Barrierefreiheit",
    profilesTitle: "Schnellprofile",
    profileVisual: "Sehkomfort",
    profileDyslexia: "Legasthenie",
    profileReading: "Einfaches Lesen",
    profileCalm: "Ruhiger Modus",
    textGroup: "Text",
    viewGroup: "Farben & Ansicht",
    comfortGroup: "Navigation & Komfort",
    fontSize: "Textgröße",
    decrease: "Text verkleinern",
    increase: "Text vergrößern",
    readable: "Lesbare Schrift",
    spacing: "Buchstabenabstand",
    lineHeight: "Größerer Zeilenabstand",
    links: "Links unterstreichen",
    contrast: "Hoher Kontrast",
    grayscale: "Graustufen",
    saturate: "Hohe Sättigung",
    hideImages: "Bilder ausblenden",
    bigCursor: "Großer Cursor",
    focusHighlight: "Fokus hervorheben",
    readingGuide: "Lesehilfe",
    readingMask: "Lesemaske",
    pauseMotion: "Animationen stoppen",
    reset: "Zurücksetzen",
    close: "Schließen",
    active: "aktiv",
  },

  // ---- Per-route metadata ----
  meta: {
    home: {
      title: "vortx | Marketing- & Web-Agentur in Luxemburg",
      description:
        "vortx, Marketing-Agentur in Luxemburg: Websites, die konvertieren, SEO & GEO, Leadgenerierung und Online-Werbung. Kostenloses Audit, schnelle Antwort.",
    },
    services: {
      title: "Marketing- & Web-Leistungen | vortx Luxemburg",
      description:
        "Websites, SEO & GEO, Leadgenerierung, Werbung, Branding und KI-Automatisierung. Eine komplette Akquise-Kette für Luxemburger Unternehmen.",
    },
    about: {
      title: "Die Agentur vortx | Marketing & Web in Luxemburg",
      description:
        "Wer ist vortx: eine Luxemburger Marketing- und Web-Agentur, besessen von Conversion und messbarer Performance. Entdecken Sie unser Vorgehen.",
    },
    approach: {
      title: "Unsere Methode | vortx Luxemburg",
      description:
        "Diagnose, Konzeption, Review, Launch: die vortx-Methode, um Websites und Kampagnen zu liefern, die sich auszahlen.",
    },
    work: {
      title: "Referenzen | vortx Luxemburg",
      description:
        "Entdecken Sie die Projekte und Ergebnisse von vortx, der Marketing- und Web-Agentur in Luxemburg.",
    },
    contact: {
      title: "Kontakt & kostenloses Audit | vortx Luxemburg",
      description:
        "Buchen Sie ein kostenloses Erstgespräch mit vortx. Persönliches Audit ohne Verzögerung, unverbindliches Angebot. Marketing- & Web-Agentur in Luxemburg.",
    },
    legalMentions: {
      title: "Impressum | vortx Luxemburg",
      description: "Impressum der Website von vortx, Marketing- & Web-Agentur in Luxemburg.",
    },
    legalPrivacy: {
      title: "Datenschutzerklärung | vortx Luxemburg",
      description:
        "Wie vortx Ihre personenbezogenen Daten erhebt, nutzt und schützt (DSGVO).",
    },
    legalCookies: {
      title: "Cookie-Richtlinie | vortx Luxemburg",
      description: "Nutzung von Cookies und Trackern auf der Website von vortx.",
    },
    news: {
      title: "News | Marketing, SEO & GEO — vortx Luxemburg",
      description:
        "Analysen und Tipps von vortx zu SEO, GEO, Conversion und Web in Luxemburg. Konkretes, um Ihr Unternehmen wachsen zu lassen.",
    },
    glossary: {
      title: "Marketing- & Web-Glossar | vortx Luxemburg",
      description:
        "Alle Begriffe des digitalen Marketings und des Webs einfach erklärt: SEO, GEO, ROAS, Conversion-Trichter, CMS… mit dem Luxemburger Kontext.",
    },
    faq: {
      title: "FAQ — Websites, SEO, Leads & Preise | vortx Luxemburg",
      description:
        "Alle Antworten zu unseren Websites, SEO & GEO, Leadgenerierung, Werbung, KI, Preisen, Fristen und DSGVO. Marketing- & Web-Agentur in Luxemburg.",
    },
  },

  // ---- Standalone pages ----
  pages: {
    thanks: {
      title: "Danke, Ihre Anfrage ist auf dem Weg.",
      lead: "Wir prüfen sie und melden uns rasch mit einer ersten Analyse zurück — unverbindlich.",
      cta: "Zurück zur Startseite",
      metaTitle: "Danke | vortx Luxemburg",
    },
    notFound: {
      title: "Seite nicht gefunden",
      lead: "Die Seite, die Sie suchen, existiert nicht oder wurde verschoben.",
      cta: "Zurück zur Startseite",
    },
    legalUpdated: "Letzte Aktualisierung: noch zu ergänzen",
    legalTodo:
      "⚠️ Inhalt juristisch zu prüfen und mit den realen rechtlichen Angaben des Unternehmens zu vervollständigen.",
  },

  // ---- Cookie consent (RGPD / ePrivacy) ----
  consent: {
    title: "Cookies & Datenschutz",
    message:
      "Wir verwenden Cookies, die für den Betrieb der Website notwendig sind, und mit Ihrer Zustimmung Cookies zur Reichweitenmessung und für Werbung.",
    acceptAll: "Alle akzeptieren",
    rejectAll: "Alle ablehnen",
    customize: "Anpassen",
    save: "Auswahl speichern",
    learnMore: "Mehr erfahren",
    manage: "Cookies verwalten",
    categories: {
      necessary: {
        title: "Notwendig",
        desc: "Unverzichtbar für den Betrieb der Website (Sicherheit, Präferenzen, Speicherung Ihrer Einwilligung). Immer aktiv.",
        always: "Immer aktiv",
      },
      analytics: {
        title: "Reichweitenmessung",
        desc: "Helfen uns, die Nutzung der Website zu verstehen, um sie zu verbessern (anonymisierte Statistiken).",
      },
      marketing: {
        title: "Marketing",
        desc: "Ermöglichen es, unsere Werbekampagnen zu messen und zu personalisieren.",
      },
    },
  },
} as const;
