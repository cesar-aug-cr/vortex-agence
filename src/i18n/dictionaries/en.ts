/**
 * English dictionary — mirrors the French source of truth for all UI copy.
 * Positioned for the Luxembourg B2B market: local proof, no public
 * pricing (qualification call), conversion-first language.
 */

import type { ArticleBlock, GlossaryTerm } from "./fr";
import type { DictionaryShape } from "../shape";

export const en = {
  locale: "en",
  brand: {
    name: "vortx",
    baseline: "Marketing & web agency · Luxembourg",
    tagline: "Attraction, by design.",
  },

  // ---- Global / reusable ----
  common: {
    cta: "Book a call",
    ctaSecondary: "See our services",
    ctaShort: "Let's talk",
    auditCta: "Get a free audit",
    readMore: "Learn more",
    backHome: "Back to home",
    allServices: "All services",
    servicesShort: "Services",
    menu: "Menu",
    close: "Close",
    openMenu: "Open menu",
    toggleTheme: "Switch theme",
    language: "Language",
    breadcrumbHome: "Home",
  },

  nav: {
    services: "Services",
    approach: "Approach",
    work: "Work",
    about: "Agency",
    resources: "Resources",
    news: "News",
    glossary: "Glossary",
    faq: "FAQ",
    quiz: "Quiz",
    contact: "Contact",
  },

  // ---- Mega menu ----
  megaMenu: {
    servicesTitle: "What we do",
    servicesLead:
      "From first impression to signed client. One complete chain, built for conversion.",
    columns: {
      acquire: "Attract",
      convert: "Convert",
      scale: "Scale",
      design: "Design",
    },
    featured: {
      label: "Featured",
      title: "Lead-gen website, ready to convert",
      desc: "A fast, AI-ready site, built to convert.",
    },
  },

  // ---- HERO ----
  hero: {
    eyebrow: "Marketing agency · Luxembourg",
    titleLead: "Marketing & web in Luxembourg that",
    titleAccent: "attracts and converts.",
    subtitle:
      "vortx builds websites and acquisition strategies that turn attention into clients. Premium design, next-generation SEO, measurable lead generation.",
    primaryCta: "Book a discovery call",
    secondaryCta: "Discover our services",
    note: "Fast reply · Free audit · No commitment · 100% bespoke",
    // Proof card shown in the hero (desktop: bottom-right glass card; phones: last step).
    proof: {
      rows: [
        { label: "Guaranteed reply", value: "Express" },
        { label: "Built bespoke", value: "100%" },
        { label: "Natively multilingual", value: "FR · DE · EN · LU" },
        { label: "Audit", value: "Free" },
      ],
    },
  },

  stats: [
    { value: "Express", label: "Guaranteed reply" },
    { value: "100%", label: "Built bespoke" },
    { value: "FR · DE · EN · LU", label: "Natively multilingual" },
  ],

  // ---- Trust / positioning band ----
  trust: {
    eyebrow: "Why vortx",
    title: "Your growth partner in Luxembourg.",
    lead: "In Luxembourg, your clients compare you in French, German and English. We build a presence that performs in all three — and that speaks to Google as much as to generative AI.",
    pillars: [
      {
        title: "Strategy first",
        desc: "No pretty site without a goal. We start from your sales funnel, not a template.",
      },
      {
        title: "Measurable conversion",
        desc: "Every page has a job: generate a call, a quote, a lead. We measure, we optimise.",
      },
      {
        title: "Local roots",
        desc: "Luxembourg market, multilingual, GDPR. We know your turf.",
      },
      {
        title: "AI-ready",
        desc: "SEO + GEO/GSO: get cited by Google AND by generative AI answers.",
      },
    ],
  },

  // ---- SERVICES ----
  servicesSection: {
    eyebrow: "Our services",
    title: "One complete chain, from attention to client.",
    lead: "Six areas of expertise that lock together. Pick one, or let us orchestrate them all.",
  },

  services: [
    {
      slug: "sites-web",
      group: "convert",
      title: "Website design in Luxembourg",
      tagline: "Fast sites, built to turn visitors into clients.",
      short:
        "Showcase sites, landing pages and fully bespoke platforms. AI-accelerated production, premium design and built-in conversion funnels.",
      bullets: [
        "100% bespoke development",
        "AI-accelerated production, delivered faster",
        "Bespoke design, mobile-first",
        "Smart multi-step forms",
        "100% responsive & accessible",
      ],
      metaTitle: "Website design in Luxembourg | vortx",
      metaDescription:
        "Website design in Luxembourg: fast, premium-design, conversion-focused websites. Next.js development, multilingual, SEO-ready.",
    },
    {
      slug: "seo-geo",
      group: "acquire",
      title: "SEO & GEO / GSO",
      tagline: "Visible on Google. Cited by AI.",
      short:
        "Technical and editorial SEO, extended into the age of generative engines (GEO/GSO): be the answer, not link number seven.",
      bullets: [
        "Technical & semantic audit",
        "Optimised content FR/DE/EN",
        "LLM-ready schemas & structured data",
        "Ranking and AI-citation tracking",
      ],
      metaTitle: "SEO & GEO agency in Luxembourg | vortx",
      metaDescription:
        "Organic SEO and generative AI optimisation (GEO/GSO) in Luxembourg. Get found on Google and cited by AI assistants.",
    },
    {
      slug: "lead-generation",
      group: "convert",
      title: "Lead generation",
      tagline: "Concrete quote requests, every week.",
      short:
        "A complete acquisition system: optimised site, funnels, campaigns and automation to fill your calendar with qualified prospects.",
      bullets: [
        "Bespoke conversion funnels",
        "Landing pages per campaign",
        "Lead qualification & scoring",
        "Clear reporting on cost per lead",
      ],
      metaTitle: "B2B lead generation in Luxembourg | vortx",
      metaDescription:
        "Lead generation system for Luxembourg SMEs and tradespeople: qualified quote requests every week, without prospecting yourself.",
    },
    {
      slug: "publicite",
      group: "acquire",
      title: "Online advertising",
      tagline: "The right message, in front of the right people.",
      short:
        "Google Ads, Meta and LinkedIn campaigns driven by data. We spend your budget where it pays off.",
      bullets: [
        "Google Ads & Performance Max",
        "Meta Ads (Facebook & Instagram)",
        "LinkedIn Ads B2B",
        "Continuous ROAS optimisation",
      ],
      metaTitle: "Online advertising (Google & Meta Ads) Luxembourg | vortx",
      metaDescription:
        "Profitable Google Ads, Meta and LinkedIn campaigns for the Luxembourg market. Data-driven, ROI-focused paid acquisition.",
    },
    {
      slug: "branding-design",
      group: "design",
      title: "Logo, Design, Branding & Brand Identity",
      tagline: "A logo and a brand people remember.",
      short:
        "Bespoke logo, complete visual identity and brand guidelines. The consistency that builds trust before the first word.",
      bullets: [
        "Bespoke logo design",
        "Complete visual identity",
        "Brand guidelines & usage rules",
        "Print & digital variations",
      ],
      metaTitle: "Logo, design, branding & brand identity in Luxembourg | vortx",
      metaDescription:
        "Bespoke logo design, brand identity and brand guidelines for Luxembourg businesses. A consistent image that builds trust.",
    },
    {
      slug: "automatisation-ia",
      group: "scale",
      title: "Automation & AI",
      tagline: "More results, fewer repetitive tasks.",
      short:
        "Automated workflows, integrations and bespoke AI agents to free up your teams and speed up your responses.",
      bullets: [
        "Workflow automation",
        "Bespoke AI agents & assistants",
        "CRM & tool integrations",
        "Chatbots and smart widgets",
      ],
      metaTitle: "Automation & AI for Luxembourg businesses | vortx",
      metaDescription:
        "Workflow automation, integrations and bespoke AI agents for Luxembourg businesses. Save time, respond faster.",
    },
  ],

  // ---- Lead-gen / problem→solution ----
  leadgen: {
    eyebrow: "The problem, then the solution",
    title: "Nobody's paying attention to you.",
    lead: "According to industry studies, a person sees between 4,000 and 10,000 ads a day. To stand out, you have to be unforgettable. And unforgettable is kind of our thing.",
    problemTitle: "Without an acquisition system:",
    problems: [
      "Opportunities that slip by unnoticed",
      "A disappointing marketing ROI",
      "Few visits, few contacts",
    ],
    solutionTitle: "With vortx:",
    solutions: [
      "A site built to convert, delivered fast",
      "A clear funnel: visitor → lead → client",
      "A marketing budget justified in numbers",
    ],
    funnel: ["Visitor", "Interested", "Prospect", "Client"],
    funnelBad: ["Visitor", "Confused", "Gone", "Never back"],
  },

  // ---- Process ----
  process: {
    eyebrow: "Our method",
    title: "Marketing DNA, zero nasty surprises.",
    steps: [
      {
        n: "01",
        icon: "process",
        title: "Situation diagnosis",
        desc: "We analyse your goals and your current funnel to build a bespoke strategy.",
      },
      {
        n: "02",
        icon: "ai-build",
        title: "Design & development",
        desc: "Premium design and development on the latest technologies, with the best conversion practices.",
      },
      {
        n: "03",
        icon: "ab-test",
        title: "Review & adjustments",
        desc: "We present the result and refine it until you're fully satisfied.",
      },
      {
        n: "04",
        icon: "analytics",
        title: "Launch & follow-up",
        desc: "Go-live, configuration and support to start generating results.",
      },
    ],
  },

  // ---- Tools / stack ----
  tools: {
    eyebrow: "Our arsenal",
    title: "The best tools, mastered in depth.",
    lead: "Marketing, code, AI, design. We pick the tool for the result, not the other way round.",
    stat: { value: "50+", label: "tools mastered" },
    categories: [
      {
        name: "Digital marketing",
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
        name: "AI & automation",
        items: [
          "Claude Code",
          "ChatGPT",
          "Perplexity",
          "Zapier",
          "n8n",
          "AI image editing",
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
          "Sketches",
        ],
      },
      {
        name: "Productivity",
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
    eyebrow: "The SEO of the future",
    title: "GEO / GSO: be the AI's answer.",
    lead: "Search is changing. Your clients put their questions to AI assistants. We optimise so that vortx — and you — are the source that gets cited.",
    cta: { label: "Discover GEO / GSO", href: "/services/seo-geo/geo-gso" },
    points: [
      {
        title: "Direct citations by AI",
        href: "/news/geo-seo-luxembourg-etre-cite-par-les-ia",
        desc: "Structured content built to be picked up in generative answers.",
      },
      {
        title: "LLM-ready schemas",
        href: "/glossaire#llms-txt",
        desc: "Structured data and files (llms.txt) that speak to the models.",
      },
      {
        title: "SEO & GEO integrated",
        href: "/services/seo-geo",
        desc: "We don't sacrifice Google for AI — we win on both.",
      },
    ],
  },

  // ---- Proof (honest placeholders) ----
  proof: {
    eyebrow: "Trust",
    title: "Proof through results.",
    placeholderNote:
      "Case studies are being published. Your results will be next.",
    logosTitle: "They trust us",
    guaranteesTitle: "Our commitments",
    testimonials: [
      // To be replaced with real client testimonials.
    ] as { quote: string; author: string; role: string }[],
    guarantees: [
      "Free initial consultation",
      "No-commitment quote",
      "Guaranteed fast reply",
      "Post-launch support",
    ],
  },

  // ---- Work page ----
  workPage: {
    eyebrow: "Work",
    comingSoon: {
      title: "No case studies for now.",
      text: "Our case studies are being written up with our clients. In the meantime, let's talk about your project: we're happy to walk you through our work on a call.",
    },
    title: "Real projects, for real trades.",
    lead: "Garages, tradespeople, SMEs, web products: this is what we design and put online. Every project has one clear goal — get found, build trust, generate enquiries.",
    note: "In the interest of transparency: our numbers-backed case studies (traffic, leads, conversions) are being written up with our clients. We'll gladly walk you through them on a call.",
    caseEyebrow: "Case study",
    contextLabel: "The context",
    deliveredLabel: "What we delivered",
    cases: [
      {
        slug: "garage-biver",
        name: "Garage Martin Biver",
        sector: "Car garage · Luxembourg",
        tags: ["Showcase website", "Online booking", "Multi-brand"],
        context:
          "A family-run garage and automotive partner since 1926, distributing Volkswagen, Škoda and Audi. A century of trust — and the need for an online presence to match, with a simple way to book an appointment.",
        delivered:
          "A clear showcase website presenting the workshop's brands and services, with online appointment booking. Customers find the information, understand the offer and book their slot — without picking up the phone.",
      },
      {
        slug: "vitrophy",
        name: "Vitrophy",
        sector: "Engraving & personalisation · B2B",
        tags: ["Showcase website", "Visual identity", "B2B positioning"],
        context:
          "Vitrophy engraves and personalises locally manufactured products, mainly for professional clients. It needed a site that reflects that craftsmanship and speaks to businesses.",
        delivered:
          "A showcase website with a distinctive dark-and-emerald identity and B2B positioning that's clear from the very first page: what Vitrophy makes, who it's for, and how to request a quote.",
      },
      {
        slug: "cim-by-cacr",
        name: "CIM by CACR",
        sector: "Web application · SaaS",
        tags: ["Web app", "AI", "Branding"],
        context:
          "Building a brand identity takes weeks and costs a fortune. CIM promises the essentials in minutes: the user uploads their logo, the tool does the rest.",
        delivered:
          "A complete web application: logo upload, automatic colour extraction and an AI-assisted PDF brand manual — all wrapped in a polished, dark product interface.",
      },
    ],
    projects: [
      {
        slug: "pauly-losch",
        name: "Garage Pauly-Losch",
        sector: "Car garage · Luxembourg",
        tags: ["Showcase website", "Local roots"],
        summary:
          "Over 70 years of VW, Audi, Škoda and VW Commercial Vehicles expertise — and a greeting in Luxembourgish, « Wëllkomm ». A showcase website true to the house spirit.",
      },
      {
        slug: "autodis",
        name: "Autodis Luxembourg",
        sector: "Car distribution · Esch-sur-Alzette & Mersch",
        tags: ["Showcase website", "Brand catalogue"],
        summary:
          "A multi-brand distributor (BAIC, JAC, Forthing, DFM, Borgward…). A website with a new-models carousel, a brand catalogue and a clear presentation of its services.",
      },
      {
        slug: "isomontage",
        name: "Isomontage Isolation",
        sector: "Insulation · Construction",
        tags: ["Showcase website"],
        summary:
          "A showcase website that presents the company's insulation services, simply and clearly.",
      },
      {
        slug: "blumenthal",
        name: "Blumenthal",
        sector: "Gardening & hydroculture",
        tags: ["Showcase website", "Bespoke design"],
        summary:
          "Gardening and hydroculture deserved a fitting showcase: a website with a fresh, natural design, true to the trade.",
      },
      {
        slug: "lux-habitat",
        name: "Lux Habitat",
        sector: "Carpentry & roofing · Luxembourg",
        tags: ["Showcase website", "Mobile-first"],
        summary:
          "A carpenter in Luxembourg, a mobile-first showcase website: built for the customer searching for a tradesperson from their phone.",
      },
      {
        slug: "momento-relojero",
        name: "Momento Relojero",
        sector: "Editorial media · Watchmaking",
        tags: ["Editorial website", "Premium design"],
        summary:
          "A Spanish-language guide to fine watchmaking — mechanics, history, collecting — carried by a premium black-and-gold design.",
      },
    ],
  },

  // ---- FAQ ----
  faq: {
    eyebrow: "Frequently asked questions",
    title: "What clients ask before getting started.",
    allCta: "See all questions",
    items: [
      {
        q: "How much does a website or campaign cost?",
        a: "Every project is bespoke. Rather than a generic price, we give you a precise quote after a free discovery call and an audit of your situation.",
      },
      {
        q: "Do you work in several languages?",
        a: "Yes. Our sites are natively multilingual (FR, DE, EN, and Lëtzebuergesch on request), tailored to the Luxembourg market.",
      },
      {
        q: "What is GEO / GSO?",
        a: "It's optimisation for AI answer engines (ChatGPT, Claude, Perplexity, Google AI). We structure your content so AI cites you as a source.",
      },
      {
        q: "Do you provide support after go-live?",
        a: "Yes. Maintenance, updates, conversion optimisation and ongoing marketing support are all part of our offer.",
      },
    ],
  },

  // ---- Final CTA / contact ----
  contact: {
    eyebrow: "Let's take action",
    title: "Be the reference in Luxembourg when *your clients* search.",
    lead: "Book a free discovery call. We analyse your situation and tell you, straight up, what can be improved.",
    benefits: [
      "Free initial consultation",
      "Personalised audit with no delay",
      "No-commitment quote",
      "Post-launch support",
    ],
    form: {
      name: "Full name",
      email: "Email",
      phone: "Phone (optional)",
      company: "Company (optional)",
      interest: "Service you're interested in",
      message: "Your message",
      submit: "Send my request",
      sending: "Jumping to hyperspace…",
      success: "Thank you! We'll get back to you very soon.",
      step: "Step",
      next: "Next",
      back: "Back",
      stepServices: "Your needs",
      stepDetails: "Your details",
      stepMessage: "Your message",
      servicesLabel: "Which services are you interested in?",
      servicesHint: "Select one or more services.",
      serviceGraphic: "Graphic Design",
      serviceOther: "Other",
      servicesRequired: "Select at least one service to continue.",
      consentBefore:
        "By ticking this box, I acknowledge that I have read how my personal data is processed and stored, as described in the ",
      consentLink: "privacy policy",
      consentAfter: ".",
      consentRequired: "Please confirm this to continue.",
      error:
        "Something went wrong. Please try again or email us directly.",
    },
  },

  // ---- Quiz page (fun marketing quiz → contact) ----
  quiz: {
    eyebrow: "Quiz",
    title: "Test your marketing IQ",
    lead: "10 random questions, zero mercy. Marketing, web, SEO, ads, AI… how far will you go?",
    intro: "Here's the deal: 10 questions, a score out of 10, and a verdict (sometimes spicy). You learn something with every answer. Ready?",
    start: "Start the quiz",
    questionLabel: "Question",
    next: "Next question",
    finish: "See my score",
    correct: "Correct!",
    wrong: "Wrong!",
    didYouKnow: "Did you know?",
    scorePrefix: "Your score",
    replay: "Play again",
    share: "Share my score",
    shareDone: "Link copied!",
    shareText: "I scored {score}/{total} on vortx's marketing quiz. Your turn 👇",
    ctaSecondary: "See all services",
    certificate: "Download my certificate",
    nameLabel: "Your name on the certificate",
    namePlaceholder: "First name Last name",
    cert: {
      heading: "Certificate",
      subheading: "of Marketing IQ",
      awardedTo: "Awarded to",
      scoreLabel: "Score achieved",
      dateLabel: "Issued on",
      footer: "vortx · Marketing, web & AI",
    },
    tiers: [
      { min: 0, max: 3, emoji: "🌱", title: "Digital isn't (yet) your thing", message: "And that's fine — it's our job, not yours. Let us handle it.", cta: "Leave it to the pros — free audit" },
      { min: 4, max: 6, emoji: "🧭", title: "Solid basics, a few blind spots", message: "You know where you're going; we light up the rest and speed it up.", cta: "Fill the gaps — let's talk strategy" },
      { min: 7, max: 8, emoji: "🚀", title: "You know the drill", message: "Strong! Now to turn that know-how into real results.", cta: "Take action — no-strings quote" },
      { min: 9, max: 9, emoji: "🏆", title: "Almost flawless, hats off", message: "Impressive. We love demanding minds (and clients).", cta: "Challenge us — book a call" },
      { min: 10, max: 10, emoji: "👑", title: "Perfect score — are you bluffing?", message: "Either you're formidable, or you're one of us. Let's talk.", cta: "Let's team up — contact us" },
    ],
  },

  // ---- Floating chat widget (same flow as the contact form) ----
  chat: {
    open: "Open chat",
    close: "Close chat",
    title: "vortx",
    subtitle: "We reply fast",
    greeting:
      "Hi 👋 Tell us what you need — we'll get back to you quickly, no strings attached.",
  },

  // ---- Footer (cd-lac style) ----
  footer: {
    blurb:
      "vortx — marketing and web agency in Luxembourg. We capture attention and convert it into clients.",
    columns: {
      services: {
        title: "Services",
        links: [
          { label: "Websites", href: "/services/sites-web" },
          { label: "SEO & GEO", href: "/services/seo-geo" },
          { label: "Lead generation", href: "/services/lead-generation" },
          { label: "Online advertising", href: "/services/publicite" },
          { label: "Logo, Design, Branding & Brand Identity", href: "/services/branding-design" },
          { label: "Automation & AI", href: "/services/automatisation-ia" },
        ],
      },
      company: {
        title: "Agency",
        links: [
          { label: "About", href: "/agence" },
          { label: "Our method", href: "/approche" },
          { label: "News", href: "/news" },
          { label: "Glossary", href: "/glossaire" },
          { label: "FAQ", href: "/faq" },
          { label: "Contact", href: "/contact" },
        ],
      },
      legal: {
        title: "Legal",
        links: [
          { label: "Legal notice", href: "/mentions-legales" },
          { label: "Privacy", href: "/confidentialite" },
          { label: "Cookies", href: "/cookies" },
          { label: "Terms of sale (CGV)", href: "/docs/cgv-vortx-2026-10-02.pdf" },
        ],
      },
    },
    contactTitle: "Contact",
    location: "Luxembourg",
    rights: "All rights reserved.",
    madeWith: "Crafted with care and a lot of AI.",
    backToTop: "Back to top",
  },

  // ---- Agence (about) page ----
  agence: {
    eyebrow: "The agency",
    title: "An attraction team, at the service of your growth.",
    lead: "vortx brings marketing, design and technology under one roof in Luxembourg. One obsession: turning attention into clients, and proving it in numbers.",
    story: [
      "vortx was born from a simple observation: too many Luxembourg businesses have a site that looks like a brochure — pretty, but bringing in nothing. We build the opposite: digital presences designed as acquisition machines. The agency is a SARL-S based in Luxembourg City, at 18 rue de l'Ouest, bringing marketing, design and technology under one roof — no cascading subcontractors, nothing lost between strategy and execution.",
      "Behind the agency is a team with more than a decade of combined experience in digital marketing, web development and art direction. We've watched the trends come and go; we keep what converts and drop the rest. This dual culture — the marketer who thinks in sales funnels and the developer who thinks in performance — means we never deliver a site that's \"pretty but hollow\", nor a strategy that's impossible to execute.",
      "In practice, we cover six disciplines: websites built to convert, SEO & GEO, lead generation, online advertising, branding and AI automation. Our clients are garages, tradespeople, service SMEs and web products — businesses that don't need a hundred-page report, but quote requests landing every week.",
      "Our philosophy comes down to three principles. Measurable conversion first: no vanity metrics — every euro invested must be tied to a result: a call, a quote, a client. Then strategy before template: we start from your sales funnel, not from an off-the-shelf theme. And finally, total ownership: the code, the content and the access are 100% yours, with no lock-in.",
      "We're rooted in the reality of the Luxembourg market: your clients compare in French, German and English — and increasingly in Spanish. So we build every presence natively multilingual, GDPR-compliant, and designed to reach across the whole Greater Region, not just the capital.",
      "Finally, vortx is an AI-native agency. We use artificial intelligence to design and produce faster — always reviewed and finished by humans — and we optimise your content for the web's new front door: getting cited by ChatGPT, Perplexity or Google AI when your clients ask them a question. That's GEO, and we build it in from the first line of every project.",
    ],
    experience: {
      suffix: "years",
      label: "of combined experience",
      note: "marketing · web · design",
    },
    stats: [
      { value: "100%", label: "Bespoke, never a template" },
      { value: "4 languages", label: "FR · DE · EN · ES" },
      { value: "6 disciplines", label: "Websites, SEO & GEO, leads, ads, branding & graphic design, AI" },
    ],
    valuesTitle: "What sets us apart",
    arsenalTitle: "Our arsenal",
    arsenalLead:
      "The tools we master to design, measure and grow. Marketing, code, AI, design, productivity — we pick the tool for the result, not the other way round.",
    ctaTitle: "Want to work together?",
  },

  // ---- Reviews (homepage) — PLACEHOLDERS: replace with real client reviews ----
  reviews: {
    eyebrow: "Client reviews",
    title: "What the businesses that trust us have to say.",
    lead: "Concrete feedback from leaders and marketing teams in Luxembourg.",
    aggregate: {
      rating: "4.9",
      ratingMax: "5",
      countLabel: "verified reviews",
      count: "27",
      platform: "Google",
    },
    note: "Representative reviews — to be replaced with your real Google / Trustpilot reviews.",
    items: [
      {
        name: "Laurent M.",
        role: "Owner, construction company",
        location: "Strassen",
        rating: 5,
        quote:
          "Our new site generates quote requests every week. Within three months, we'd made back the investment. Responsive, clear, and the result speaks for itself.",
      },
      {
        name: "Sophie R.",
        role: "Marketing manager, consulting firm",
        location: "Luxembourg-Ville",
        rating: 5,
        quote:
          "Finally an agency that talks results, not just design. Their SEO work moved us up on queries our competitors had owned for years.",
      },
      {
        name: "Marco F.",
        role: "Founder, artisan e-commerce",
        location: "Esch-sur-Alzette",
        rating: 5,
        quote:
          "Site rebuilt from A to Z, fast and flawless on mobile. The team automated everything so we spend less time on admin. A real daily win.",
      },
      {
        name: "Anne K.",
        role: "Director, real estate agency",
        location: "Bertrange",
        rating: 5,
        quote:
          "Professional and great advisors. They understood our Luxembourg market and adapted the message in FR and DE. The leads are more qualified than before.",
      },
      {
        name: "David L.",
        role: "CEO, SaaS startup",
        location: "Luxembourg-Ville",
        rating: 5,
        quote:
          "Their GEO approach put us ahead of the competition on ChatGPT and Perplexity. We're now cited as a reference. Impressive and well ahead of the curve.",
      },
      {
        name: "Christine B.",
        role: "Owner, wellness studio",
        location: "Differdange",
        rating: 4,
        quote:
          "Top-notch support from start to finish. The site is gorgeous and the first booking results are in. Can't wait to keep going with them.",
      },
    ],
  },

  // ---- News / blog ----
  news: {
    eyebrow: "News",
    title: "Ideas, trends and the inside story of digital marketing.",
    lead: "Our analysis on SEO, GEO, conversion and the web in Luxembourg. Substance, not hot air.",
    homeTitle: "Latest news",
    homeLead: "We share what we learn. Strategy, AI, conversion — no spin.",
    seeAll: "See all news",
    readArticle: "Read the article",
    readingTime: "min read",
    publishedOn: "Published on",
    updatedOn: "Updated on",
    by: "By",
    backToNews: "All news",
    tocTitle: "Contents",
    relatedTitle: "Read next",
    ctaTitle: "Want to be cited by AI too?",
    summaryLabel: "AI-generated summary",
    summaryDisclaimer: "Automated synthesis of the key points, reviewed by our team.",
    summaryPointsLabel: "Key takeaways",
    summaryShow: "Show summary",
    summaryHide: "Hide summary",
    linksTitle: "Go further",
    allCategories: "All topics",
    filterLabel: "Filter by topic",
    emptyLabel: "No articles in this topic just yet.",
    articleCtaTitle: "Got a project in mind?",
    articleCtaText:
      "Let's talk. Get a clear, no-strings quote for your website or your acquisition strategy.",
    articleCtaButton: "Request a quote",
    shareLabel: "Share",
    shareCopy: "Copy link",
    shareCopied: "Link copied!",
    articles: [
      {
        slug: "ux-ui-design-site-qui-convertit-bonnes-pratiques",
        category: "UX & Design",
        title:
          "UX/UI: the design principles that turn a visitor into a customer",
        excerpt:
          "A beautiful website isn't enough: it has to guide, reassure and convert. Here are the UX and UI principles we apply on every vortx project — hierarchy, clarity, accessibility, performance — illustrated by this very site.",
        metaDescription:
          "Hierarchy, clarity, accessibility, performance: the UX/UI principles that turn visitors into clients. A hands-on guide by vortx, web agency in Luxembourg.",
        date: "2026-06-15",
        updated: "2026-06-15",
        readingMinutes: 8,
        author: "The vortx team",
        cover: "redesign",
        coverImage: "/news/ux-ui-design-site-qui-convertit-bonnes-pratiques.webp",
        summary: {
          text: "UX organises the journey, UI dresses the interface: together they decide whether a visitor takes action or leaves. This article details the concrete principles (visual hierarchy, cognitive load, one goal per page, consistency, contrast, accessibility, performance) and shows how they are applied across the vortx site.",
          points: [
            "UX guides the journey, UI inspires trust — both serve conversion.",
            "A clear hierarchy, a single goal per page and immediate feedback make the difference.",
            "Accessibility and performance aren't optional: they're part of the UX.",
          ],
        },
        links: [
          { label: "Our websites that convert", href: "/services/sites-web", desc: "Bespoke, mobile-first design built around conversion." },
          { label: "Logo, Design, Branding & Brand Identity", href: "/services/branding-design", desc: "The visual identity that feeds a coherent UI." },
          { label: "Marketing & web glossary", href: "/glossaire", desc: "UX/UI, conversion rate, Core Web Vitals… explained simply." },
        ],
        body: [
          {
            type: "p",
            text: "We often mistake a “pretty site” for a “good site”. A site can look stunning and sell nothing; another, more understated, can turn one visitor in ten into a quote request. The difference comes down to experience design — UX — and interface design — UI. One organises the journey, the other dresses it. Together they decide whether the visitor acts or closes the tab.",
          },
          {
            type: "h2",
            id: "ux-ui-difference",
            text: "UX and UI: two crafts, one goal",
          },
          {
            type: "p",
            text: "UX (User Experience) answers “is it easy?”: can people find the information, do they understand what to do, do they reach their goal without friction? UI (User Interface) answers “is it clear and credible?”: colours, typography, spacing, components. Flawless UX with sloppy UI breeds distrust; polished UI with no UX results in beautiful pages where nobody converts.",
          },
          {
            type: "callout",
            title: "In one sentence",
            text: "UX decides where the visitor goes. UI makes them want to go there. Conversion happens when both point in the same direction.",
          },
          {
            type: "h2",
            id: "principes-ux",
            text: "The UX principles that drive conversion",
          },
          {
            type: "h3",
            text: "1. A visual hierarchy that guides the eye",
          },
          {
            type: "p",
            text: "The eye should know where to go within a second: a strong headline, a sub-heading that clarifies, then the action expected. On this site, every section follows the same pattern — a discreet “eyebrow”, a large heading, supporting copy, then a button. It's that repetition of the same rhythm that makes reading effortless.",
          },
          {
            type: "h3",
            text: "2. One goal per page",
          },
          {
            type: "p",
            text: "A page that asks for everything gets nothing. Every screen should have one clear primary action — book a call, request a quote — with everything else subordinate to it. That's why our service pages all lead to the same call to action, and our landing pages even remove the menu to keep a single path.",
          },
          {
            type: "h3",
            text: "3. Reduce cognitive load",
          },
          {
            type: "ul",
            items: [
              "Short sentences, concrete vocabulary, zero needless jargon.",
              "Forms broken into steps rather than a wall of fields: our three-stage contact form qualifies without discouraging.",
              "Limited choices: too many options paralyse (the paradox of choice).",
            ],
          },
          {
            type: "h3",
            text: "4. Immediate feedback",
          },
          {
            type: "p",
            text: "Every action should produce a visible reaction: a button that responds on hover, a loading state, a confirmation after submitting. Without feedback, the user doubts — and doubt kills conversion. Micro-interactions (a hint that blinks once, an arrow that slides on hover) aren't decorative: they say “this is clickable, keep going”.",
          },
          {
            type: "h3",
            text: "5. Mobile-first, for real",
          },
          {
            type: "p",
            text: "In Luxembourg, most traffic arrives on mobile. So we design for the small screen first — generous tap targets, priority content at the top, thumb-friendly navigation — then enrich towards desktop. The reverse produces sites that feel “shrunk” on mobile, which is precisely where the decision gets made.",
          },
          {
            type: "h2",
            id: "principes-ui",
            text: "The UI principles: the layer that inspires trust",
          },
          {
            type: "h3",
            text: "Consistency: a design system, not pages made one by one",
          },
          {
            type: "p",
            text: "A credible brand is recognised by its consistency. We work with a design system — colours, typography, spacing, reusable components — so that every page looks like it came from the same hand. Here, a tight palette (an electric lime, a teal, a dark “stage” background) and a single set of components hold the whole site together.",
          },
          {
            type: "h3",
            text: "Contrast and legibility",
          },
          {
            type: "p",
            text: "Contrast isn't just aesthetic, it's accessibility: light grey text on white excludes part of your audience. We aim for the recommended ratios (WCAG AA), comfortable text sizes and action areas that stand clearly apart from the background.",
          },
          {
            type: "h3",
            text: "White space works for you",
          },
          {
            type: "p",
            text: "Empty space isn't wasted: it highlights what matters. Room around a headline, a button or a price draws attention to it. Cramming, by contrast, dilutes the message. A premium design is often recognised by what it removed, not by what it added.",
          },
          {
            type: "h3",
            text: "Motion, in homeopathic doses",
          },
          {
            type: "p",
            text: "A well-placed animation directs the eye and brings life; too many effects tire the user and slow things down. Our animated vector illustrations and transitions stay subtle — and switch off automatically for visitors who have enabled “reduce motion” in their system.",
          },
          {
            type: "h2",
            id: "accessibilite",
            text: "Accessibility is not optional",
          },
          {
            type: "p",
            text: "An accessible site is one usable by as many people as possible — and it's a better site for everyone. Keyboard navigation, sufficient contrast, semantic structure (hierarchical headings, correct tags), alternative text: these are the foundations. This site goes further with an accessibility widget that lets you adjust text size, spacing, contrast and animations on the fly.",
          },
          {
            type: "quote",
            text: "Designing for the edge cases means designing better for everyone.",
          },
          {
            type: "h2",
            id: "performance-ux",
            text: "Performance is part of the UX",
          },
          {
            type: "p",
            text: "The finest design is useless if it takes three seconds to appear. Speed is a direct component of the experience: every hundredth of a second saved reduces abandonment and improves search ranking (Core Web Vitals are a Google criterion). We build near-instant sites — optimised images, lightweight code, modern technologies — because a fast site converts more, full stop.",
          },
          {
            type: "ul",
            items: [
              "Fast loading: less abandonment, better SEO.",
              "Visual stability: no elements jumping around during load.",
              "Click responsiveness: the interface reacts with no perceptible lag.",
            ],
          },
          {
            type: "h2",
            id: "vortx-application",
            text: "How we apply all this at vortx",
          },
          {
            type: "p",
            text: "These principles aren't theoretical: they shape this site. The repeated hierarchy of every section, the dark background that makes key content stand out, the tight palette, the animated icons that stay understated, the multi-step form, the accessibility widget, the multilingual version thought through language by language — every detail serves the same purpose: helping the visitor understand, feel confident, and take action.",
          },
          {
            type: "sources",
            title: "Sources & references",
            items: [
              { label: "Core Web Vitals — web.dev (Google)", href: "https://web.dev/vitals" },
              { label: "WCAG accessibility — W3C Web Accessibility Initiative", href: "https://www.w3.org/WAI/" },
            ],
          },
          {
            type: "p",
            text: "This is exactly the method we apply to your project: we start from your conversion goal, not from a template. The result is a site that isn't merely beautiful — it works for you.",
          },
        ],
      },
      {
        slug: "geo-seo-luxembourg-etre-cite-par-les-ia",
        category: "SEO & GEO",
        title:
          "SEO vs GEO: how to get found on Google AND cited by AI in 2026",
        excerpt:
          "Search is no longer played out on Google alone. ChatGPT, Perplexity and Google AI are becoming the new front door. Here's how SEO and GEO work together — and what to actually do about it.",
        metaDescription:
          "SEO and GEO in 2026: get found on Google and cited by ChatGPT or Perplexity. The practical vortx method for Luxembourg businesses. Book a free audit.",
        date: "2026-06-02",
        updated: "2026-06-02",
        readingMinutes: 9,
        author: "The vortx team",
        cover: "geo-citation",
        coverImage: "/news/geo-seo-luxembourg-etre-cite-par-les-ia.webp",
        summary: {
          text: "Search is no longer confined to Google: ChatGPT, Perplexity and Google AI are becoming a new front door. This article explains the difference between SEO and GEO and how to work both together, with concrete steps to get cited by AI.",
          points: [
            "SEO ranks you in the results; GEO places you inside the AI's answer.",
            "Structure your pages as question/answer and ground them in local facts to get cited.",
            "In our experience, around 80% of the work is shared: good content performs on Google AND with the models.",
          ],
        },
        links: [
          { label: "Google Ads or SEO: where to invest your budget", href: "/news/google-ads-ou-seo-ou-investir-budget-marketing", desc: "Compare paid and organic acquisition levers." },
          { label: "Our SEO & GEO / GSO service", href: "/services/seo-geo", desc: "How we get you found on Google and cited by AI." },
          { label: "Marketing & web glossary", href: "/glossaire", desc: "SEO, GEO, GSO… the vocabulary explained simply." },
        ],
        body: [
          {
            type: "p",
            text: "For twenty years, \"being visible online\" meant one thing: ranking higher in Google's results. Today, a growing share of your clients no longer type a query into a search engine — they ask a question to an AI. ChatGPT, Perplexity, Google AI Overviews or Copilot answer directly, cite a few sources, and the user sometimes clicks on no link at all. So the question is no longer just \"am I first on Google?\" but \"does the AI cite me as the answer?\".",
          },
          {
            type: "h2",
            id: "seo-geo-definitions",
            text: "SEO, GEO, GSO: what are we talking about?",
          },
          {
            type: "p",
            text: "SEO (Search Engine Optimization) covers everything that moves you up in classic search engines: the site's technical quality, content relevance, authority (links), user experience. It's the foundation, and it isn't going away.",
          },
          {
            type: "p",
            text: "GEO (Generative Engine Optimization), sometimes called GSO (Generative Search Optimization), is optimisation for generative answer engines. The goal shifts: it's no longer just about ranking well, but about being the source the model picks up, summarises and cites in its answer.",
          },
          {
            type: "callout",
            title: "In one sentence",
            text: "SEO puts you in the list of results. GEO puts you in the answer itself.",
          },
          {
            type: "h2",
            id: "pourquoi-maintenant",
            text: "Why it matters now",
          },
          {
            type: "p",
            text: "Because search behaviour is shifting fast, especially in B2B. A decision-maker preparing a purchase increasingly asks an AI \"what are the best marketing agencies in Luxembourg?\" rather than Google. If your company doesn't show up in the answer, you don't exist in that decision — even if you're third on Google.",
          },
          {
            type: "ul",
            items: [
              "AI answers reduce the number of clicks: being cited matters more than being listed.",
              "Models favour content that is clear, structured and factual.",
              "Trust compounds: a brand cited by an AI gains perceived credibility.",
            ],
          },
          {
            type: "h2",
            id: "comment-faire",
            text: "How to optimise for GEO, concretely",
          },
          {
            type: "h3",
            text: "1. Structure content to be cited",
          },
          {
            type: "p",
            text: "Models love clean answers. A page that poses a question in a heading (H2/H3) and answers it in two clear sentences right below has far more chance of being picked up than a long, winding paragraph. Think \"definition, then detail\".",
          },
          {
            type: "h3",
            text: "2. Give facts, figures and local context",
          },
          {
            type: "p",
            text: "Verifiable, precise content (figures, dates, places — here, the Luxembourg market, FR/DE/EN multilingualism, GDPR) is more \"citable\". Generalities are ignored; grounded facts get picked up.",
          },
          {
            type: "h3",
            text: "3. Make the site machine-readable",
          },
          {
            type: "ul",
            items: [
              "Structured data (Schema.org): Organization, Service, FAQPage, Article.",
              "An llms.txt file that summarises your offering for the models.",
              "A clean architecture, hierarchical headings, fast load times.",
            ],
          },
          {
            type: "h3",
            text: "4. Build authority, everywhere",
          },
          {
            type: "p",
            text: "AI relies on what's said about you elsewhere: reviews, directories, press mentions, consistent profiles. A coherent presence (same name, same address, same promise) increases the odds of being held up as a reliable source.",
          },
          {
            type: "h2",
            id: "seo-et-geo-ensemble",
            text: "SEO and GEO don't compete — they reinforce each other",
          },
          {
            type: "p",
            text: "Good news: from our experience on both fronts, around 80% of the work is shared. Structured, fast, reliable and well-marked-up content performs both on Google and with the models. We don't sacrifice one for the other — we design for both from the start.",
          },
          {
            type: "quote",
            text: "The goal is no longer to be link number seven. It's to be the answer.",
          },
          {
            type: "callout",
            title: "Key takeaway",
            text: "Nail your technical and editorial SEO, structure your pages for citation, add structured data and an llms.txt, and ground your content in local facts. You win on Google and in AI answers.",
          },
          {
            type: "sources",
            title: "Sources & references",
            items: [
              { label: "Google Search Essentials — Google Search Central", href: "https://developers.google.com/search" },
            ],
          },
          {
            type: "p",
            text: "At vortx, we build every site and every content strategy to this dual standard from the very first line. If you want to know where you stand today, we'll give you a no-commitment SEO/GEO audit.",
          },
        ],
      },
      {
        slug: "google-ads-ou-seo-ou-investir-budget-marketing",
        category: "Acquisition",
        title:
          "Google Ads or SEO: where should you invest your marketing budget in 2026?",
        excerpt:
          "Should you pay to appear at the top of Google, or build your organic ranking? The real question isn't \"one or the other\", but \"which one, when, and for what goal\". We untangle it all, with figures and common sense to back it up.",
        metaDescription:
          "Google Ads or SEO: which one, when, and for what goal? The jargon-free comparison to invest your marketing budget where it pays off in 2026.",
        date: "2026-06-04",
        updated: "2026-06-04",
        readingMinutes: 8,
        author: "The vortx team",
        cover: "ads-targeting",
        coverImage: "/news/google-ads-ou-seo-ou-investir-budget-marketing.webp",
        summary: {
          text: "Should you invest in Google Ads or in SEO? The answer depends on your goal and your timeline. This article contrasts \"renting\" (Ads, immediate) with \"owning\" (SEO, lasting) and shows how to combine them for your situation.",
          points: [
            "Google Ads = immediate results for as long as you pay; SEO = a lasting asset that takes time.",
            "The right balance depends on your timeline, your market and your budget.",
            "The two complement each other: ads kick-start, SEO frees you from the budget.",
          ],
        },
        links: [
          { label: "SEO vs GEO: get found AND cited in 2026", href: "/news/geo-seo-luxembourg-etre-cite-par-les-ia", desc: "Organic visibility in the age of AI." },
          { label: "Our Online advertising service", href: "/services/publicite", desc: "Google Ads, Meta and LinkedIn driven by data." },
          { label: "Our SEO & GEO service", href: "/services/seo-geo", desc: "Build a lasting visibility asset." },
        ],
        body: [
          {
            type: "p",
            text: "It's one of the questions we're asked most often: \"Should I put my budget into advertising or into SEO?\". The honest answer: it depends on your goal, your timeline and your market. Both bring you clients from Google, but they don't work the same way — and above all, they don't replace each other, they complement each other.",
          },
          {
            type: "h2",
            id: "deux-leviers",
            text: "Two levers, two logics",
          },
          {
            type: "p",
            text: "Google Ads (SEA, or paid search) is renting: you pay to appear right at the top, immediately, for as long as your budget runs. SEO (organic search) is owning: you build an asset that takes time to come together, but keeps generating traffic even when you stop paying.",
          },
          {
            type: "h2",
            id: "google-ads",
            text: "Google Ads: instant visibility",
          },
          {
            type: "p",
            text: "Launch a campaign today and you can be first on your keywords this very afternoon. It's the ideal tool when you need results fast, when you're testing an offer, or for highly competitive queries.",
          },
          {
            type: "ul",
            items: [
              "Immediate results: traffic and leads from day one.",
              "Precise targeting: keywords, geography, time of day, audience.",
              "Measurable to the cent: you know exactly what each lead costs.",
              "Ideal for promotions, launches and seasonal campaigns.",
            ],
          },
          {
            type: "p",
            text: "The flip side: the moment you stop paying, the visibility goes out. And in some sectors, the cost per click can climb fast. Advertising is a tap: powerful, but it stops as soon as you cut the water.",
          },
          {
            type: "h2",
            id: "seo",
            text: "SEO: the asset that works over time",
          },
          {
            type: "p",
            text: "SEO takes patience — a few weeks to a few months — but it builds something that belongs to you. Once well positioned, your site draws steady traffic with no cost per click, and the trust of an organic result is often higher than that of an ad.",
          },
          {
            type: "ul",
            items: [
              "Lasting traffic: your ranking keeps working over time.",
              "Greater credibility: people trust organic results more.",
              "Decreasing cost: the initial investment pays off, the click is \"free\".",
              "GEO-compatible: good SEO also makes you citable by generative AI.",
            ],
          },
          {
            type: "callout",
            title: "In one sentence",
            text: "Google Ads buys visibility now; SEO builds it for tomorrow. One is an expense, the other an investment.",
          },
          {
            type: "h2",
            id: "lequel-choisir",
            text: "Which to choose depending on your situation",
          },
          {
            type: "p",
            text: "Rather than deciding in the abstract, look at where you stand:",
          },
          {
            type: "ul",
            items: [
              "You're launching your business and want leads fast: start with Google Ads.",
              "You're aiming for long-term profitability: invest in SEO in parallel.",
              "Your sector is very competitive on Google: combine both to hold your ground.",
              "Your budget is tight: prioritise SEO on your key pages, and ads on a single flagship offer.",
            ],
          },
          {
            type: "h2",
            id: "ensemble",
            text: "The real answer: both, together",
          },
          {
            type: "p",
            text: "The companies that perform don't choose — they orchestrate. Advertising brings immediate results and valuable data (which keywords actually convert), which then feed the SEO strategy. While SEO builds momentum, ads keep the lead flow going. Then, as organic takes over, you can reduce your reliance on paid.",
          },
          {
            type: "quote",
            text: "Ads light the fire right away. SEO keeps it burning so it never goes out.",
          },
          {
            type: "callout",
            title: "Key takeaway",
            text: "Don't think \"Ads OR SEO\", but \"Ads AND SEO\", dosed according to your timeline and budget. Ads for speed, SEO for the long run — and the two reinforcing each other.",
          },
          {
            type: "sources",
            title: "Sources & references",
            items: [
              { label: "Official Google Ads help", href: "https://support.google.com/google-ads" },
              { label: "Google Search Essentials — Google Search Central", href: "https://developers.google.com/search" },
            ],
          },
          {
            type: "p",
            text: "At vortx, we build this combination around your real situation, without selling you one at the expense of the other. We'll give you a free audit to tell you where your budget will pay off most.",
          },
        ],
      },
      {
        slug: "tunnel-de-conversion-transformer-visiteurs-en-clients",
        category: "Conversion",
        title:
          "Conversion funnel: turning your visitors into clients, step by step",
        excerpt:
          "Attracting traffic is good. Converting it into clients is the whole point. The conversion funnel is the map that links the first click to the signed contract — and every poorly designed step costs you sales. Here's how to build it.",
        metaDescription:
          "The conversion funnel, from first click to signed contract: the steps, the mistakes that cost you sales and the method to convert more of your visitors.",
        date: "2026-06-07",
        updated: "2026-06-07",
        readingMinutes: 7,
        author: "The vortx team",
        cover: "conversion",
        coverImage: "/news/tunnel-de-conversion-transformer-visiteurs-en-clients.webp",
        summary: {
          text: "Attracting traffic is pointless if it doesn't convert. This article breaks the conversion funnel down step by step — from the first click to the contract — and shows where you lose visitors and how to plug each leak.",
          points: [
            "Every poorly designed step in the funnel costs you sales.",
            "Guide the visitor towards one clear action on every page.",
            "Measuring drop-off lets you optimise where it actually matters.",
          ],
        },
        links: [
          { label: "Our Lead generation service", href: "/services/lead-generation", desc: "Turn traffic into qualified quote requests." },
          { label: "How much does a website cost in Luxembourg?", href: "/news/combien-coute-un-site-web-luxembourg-2026", desc: "Invest where conversion is really won." },
          { label: "Glossary: funnel, CRO, landing page…", href: "/glossaire", desc: "The conversion terms explained simply." },
        ],
        body: [
          {
            type: "p",
            text: "You have traffic, but few enquiries? The problem is almost never the number of visitors — it's what happens between their arrival and their decision. That path has a name: the conversion funnel. Understanding it means you stop \"bringing in a crowd\" and start turning that crowd into clients.",
          },
          {
            type: "h2",
            id: "c-est-quoi",
            text: "What is a conversion funnel?",
          },
          {
            type: "p",
            text: "It's the sequence of steps a visitor goes through before becoming a client: they discover you, take an interest, get in touch, then buy. At each step, some people drop off — like a funnel that narrows. The goal isn't to eliminate those losses (impossible), but to reduce them where they cost the most.",
          },
          {
            type: "h2",
            id: "etapes",
            text: "The 4 steps of a funnel that converts",
          },
          {
            type: "h3",
            text: "1. Attract — the right audience, not just traffic",
          },
          {
            type: "p",
            text: "It all starts with attracting the right people (SEO, advertising, social, word of mouth). A thousand unqualified visitors are worth less than a hundred who have a real need. The quality of your traffic shapes everything else in the funnel.",
          },
          {
            type: "h3",
            text: "2. Engage — make them want to stay",
          },
          {
            type: "p",
            text: "Within seconds, the visitor decides whether to stay or leave. A clear message, an understandable promise, a fast and reassuring page: this is where you turn a curious visitor into an interested prospect. If your page takes too long to say what you do, it's lost.",
          },
          {
            type: "h3",
            text: "3. Convert — make taking action easy",
          },
          {
            type: "p",
            text: "This is the decisive step: a quote request, a booking, a purchase. A visible call to action, a short and smart form, zero needless friction. Every extra field, every unanswered doubt drives the conversion rate down.",
          },
          {
            type: "h3",
            text: "4. Retain — a client who comes back and recommends you",
          },
          {
            type: "p",
            text: "The funnel doesn't stop at the sale. A satisfied client comes back, buys more, and above all recommends you. Follow-up, service quality, well-timed nudges: retention is the most profitable lever, and the most neglected.",
          },
          {
            type: "callout",
            title: "The key principle",
            text: "A single leaking step drags down the whole funnel. There's no point attracting more people if your visitors get lost at the moment of taking action.",
          },
          {
            type: "h2",
            id: "fuites",
            text: "Where it leaks (and how to plug it)",
          },
          {
            type: "ul",
            items: [
              "Slow or confusing page: the visitor leaves before understanding your offer.",
              "No clear call to action: they don't know what to do next.",
              "Form too long: they give up halfway through.",
              "Lack of proof (reviews, case studies, guarantees): they doubt and put it off.",
              "No follow-up: a lukewarm prospect you never contact again is a lost client.",
            ],
          },
          {
            type: "h2",
            id: "mesurer",
            text: "Measure to optimise",
          },
          {
            type: "p",
            text: "You only improve what you measure. By tracking the conversion rate of each step, you pinpoint exactly where it stalls — and act there, rather than redoing everything at random.",
          },
          {
            type: "ul",
            items: [
              "Overall conversion rate and rate per step.",
              "Pages where visitors leave the funnel.",
              "Cost per lead and cost per client.",
              "A/B tests to validate each improvement.",
            ],
          },
          {
            type: "quote",
            text: "A good funnel isn't guessed: it's measured, adjusted, and measured again.",
          },
          {
            type: "callout",
            title: "Key takeaway",
            text: "A conversion funnel is a journey: attract, engage, convert, retain. Work on the weakest link first — that's where your lost sales are hiding.",
          },
          {
            type: "p",
            text: "At vortx, we design every site as a funnel built to convert, and optimise it continuously. Want to know where yours is losing clients? We'll give you a free audit of your funnel.",
          },
        ],
      },
      {
        slug: "combien-coute-un-site-web-luxembourg-2026",
        category: "Websites",
        title:
          "How much does a professional website cost in Luxembourg in 2026?",
        excerpt:
          "The real answer isn't a single figure, but a range that depends on your goals. Here's what makes the price of a website vary, and how to invest where it truly counts.",
        metaDescription:
          "How much does a website cost in Luxembourg in 2026? What drives the price, where to invest wisely — and how to get an accurate quote, free of charge.",
        date: "2026-06-08",
        updated: "2026-06-08",
        readingMinutes: 7,
        author: "The vortx team",
        cover: "analytics",
        coverImage: "/news/combien-coute-un-site-web-luxembourg-2026.webp",
        summary: {
          text: "The price of a website isn't a fixed number but a range that depends on your goals. This article breaks down what makes the cost vary and how to invest where it truly pays off, rather than chasing the cheapest option.",
          points: [
            "The price depends on scope and goals, not a generic rate.",
            "Invest in conversion and search visibility, not in the superfluous.",
            "Judge the cost against what the site brings you.",
          ],
        },
        links: [
          { label: "Our Websites service", href: "/services/sites-web", desc: "What we build and what's included in every pack." },
          { label: "Conversion funnel: visitors → clients", href: "/news/tunnel-de-conversion-transformer-visiteurs-en-clients", desc: "Why a site has to be built to convert." },
          { label: "What makes a good logo?", href: "/news/quest-ce-quun-bon-logo-identite-qui-dure", desc: "The brand identity that goes with your site." },
        ],
        body: [
          {
            type: "p",
            text: "\"How much does a website cost?\" It's the first question we get asked, and the hardest to answer with a single number. A website is like a house: between a studio and a villa, the word \"house\" tells you nothing about the price. What matters is what you want to do with it.",
          },
          {
            type: "h2",
            id: "ca-depend",
            text: "Why \"it depends\" is the only honest answer",
          },
          {
            type: "p",
            text: "A price quoted without knowing your project is either too high (padded to cover ourselves) or disappointing (cutting corners on the essentials). The real work is defining the right scope: no more, no less than what serves your goal.",
          },
          {
            type: "h2",
            id: "ce-qui-fait-le-prix",
            text: "What really makes the price vary",
          },
          {
            type: "ul",
            items: [
              "The number of pages and the complexity of the content.",
              "100% bespoke development, tailored to your business.",
              "The level of design: an adapted template or a 100% bespoke identity.",
              "The features: forms, appointment booking, payment, client area…",
              "Multilingual support (FR/DE/EN) and SEO & GEO optimisation.",
              "Integrations (CRM, business tools) and automation.",
            ],
          },
          {
            type: "h2",
            id: "fourchettes",
            text: "Some benchmarks to find your way",
          },
          {
            type: "h3",
            text: "Showcase site or landing page",
          },
          {
            type: "p",
            text: "To present your business and generate contacts, the investment stays modest. It's often the best starting point: quick to deliver, immediately useful, and built to convert.",
          },
          {
            type: "h3",
            text: "Custom-built site or platform",
          },
          {
            type: "p",
            text: "As soon as you need specific features, a unique design, advanced multilingual support or integrations, the budget climbs — but that's also where the site becomes a true asset working for you.",
          },
          {
            type: "callout",
            title: "The right instinct",
            text: "Don't just ask \"how much does it cost\", but \"how much does it bring in\". A €2,000 site that generates nothing is more expensive than one that pays for itself in a few contracts.",
          },
          {
            type: "h2",
            id: "investir-malin",
            text: "Where to invest first",
          },
          {
            type: "ul",
            items: [
              "Performance and mobile: a slow site drives people away before they've even read a word.",
              "The conversion funnel: every page should push towards a clear action.",
              "SEO & GEO from the start: being found on Google and cited by AI.",
              "Honest, precise content, rooted in your reality.",
            ],
          },
          {
            type: "quote",
            text: "A website isn't a one-off expense, it's a salesperson working 24/7. The question is what you expect from it.",
          },
          {
            type: "callout",
            title: "Key takeaway",
            text: "The price of a website depends on your goals, not a generic rate. Define the right scope, invest in conversion and search visibility, and judge the cost against what the site brings you.",
          },
          {
            type: "sources",
            title: "Sources & references",
            items: [
              { label: "Core Web Vitals — web.dev (Google)", href: "https://web.dev/vitals" },
            ],
          },
          {
            type: "p",
            text: "At vortx, we give you a precise quote after a free discovery call — not a price pulled out of thin air. We tell you, straight, what you really need.",
          },
        ],
      },
      {
        slug: "quest-ce-quun-bon-logo-identite-qui-dure",
        category: "Branding",
        title: "What makes a good logo? The principles of an identity that lasts",
        excerpt:
          "A good logo isn't just a pretty picture: it's your brand's first promise. Here are the principles that separate a memorable logo from a forgettable one.",
        metaDescription:
          "What makes a good logo? Simplicity, memorability, relevance: the principles of a brand identity that lasts — and the mistakes that betray a brand.",
        date: "2026-06-08",
        updated: "2026-06-08",
        readingMinutes: 6,
        author: "The vortx team",
        cover: "branding",
        coverImage: "/news/quest-ce-quun-bon-logo-identite-qui-dure.webp",
        summary: {
          text: "A logo isn't just a pretty picture: it's your brand's first promise. This article lays out the principles of a logo that lasts — simple, memorable, timeless, versatile and relevant — and its role within a coherent identity.",
          points: [
            "A good logo is simple, memorable, timeless, versatile and relevant.",
            "It lives within a coherent visual identity, not on its own.",
            "Visual consistency builds trust before the first word.",
          ],
        },
        links: [
          { label: "Our Branding & design service", href: "/services/branding-design", desc: "Bespoke logo and complete brand identity." },
          { label: "How much does a website cost in Luxembourg?", href: "/news/combien-coute-un-site-web-luxembourg-2026", desc: "Dressing your brand on the web." },
          { label: "Glossary: brand identity, design system…", href: "/glossaire", desc: "The branding vocabulary explained." },
        ],
        body: [
          {
            type: "p",
            text: "Before the first word, your logo has already spoken. It's the first impression, the marker people remember, the face of your brand. Yet many businesses treat it as a detail. A good logo is anything but a detail — and it follows a few simple principles.",
          },
          {
            type: "h2",
            id: "pas-juste-joli",
            text: "A logo isn't (just) about looking pretty",
          },
          {
            type: "p",
            text: "A logo's job isn't to please everyone, but to make your brand recognisable and trustworthy. It has to work just as well on a storefront sign as on an app icon, in colour as in black and white.",
          },
          {
            type: "h2",
            id: "principes",
            text: "The 5 principles of a good logo",
          },
          {
            type: "logo",
            tipTitle: "Why the double circle in the “o”?",
            tip: "Two reasons. First, legibility: without it the “o” could read as a dot — “v•rtx” instead of “vortx”. The ring anchors the letter and keeps the name crisp.\n\nSecond, meaning: from the large circle to the small one, the shape forms a funnel — a vortex that draws prospects in and turns them into clients, right to the heart of the brand.",
          },
          { type: "h3", text: "1. Simple" },
          {
            type: "p",
            text: "The strongest logos are often the cleanest. Simplicity is easy to remember, recognised at a glance, and works everywhere without distorting.",
          },
          { type: "h3", text: "2. Memorable" },
          {
            type: "p",
            text: "A good logo leaves a mark. A shape, an idea, a detail that sticks — distinctive enough to be remembered after seeing it just once.",
          },
          { type: "h3", text: "3. Timeless" },
          {
            type: "p",
            text: "Trends come and go. A logo built to last avoids fashionable effects that age badly, and stays relevant ten years later.",
          },
          { type: "h3", text: "4. Versatile" },
          {
            type: "p",
            text: "From a 16-pixel favicon to a billboard, it has to stay legible and consistent everywhere. That's why we always deliver it in several formats.",
          },
          { type: "h3", text: "5. Relevant" },
          {
            type: "p",
            text: "The style should fit your sector and your positioning. A logo doesn't have to say everything about you — just to avoid saying the opposite of what you are.",
          },
          {
            type: "callout",
            title: "The classic trap",
            text: "Wanting the logo to \"explain\" everything you do. A good logo identifies; it's your brand, over time, that tells the rest.",
          },
          {
            type: "h2",
            id: "au-dela",
            text: "Beyond the logo: the complete identity",
          },
          {
            type: "p",
            text: "A logo alone isn't enough. It reaches its full strength within a coherent identity: colours, typefaces, usage rules. It's that consistency, applied everywhere, that builds trust and recognition.",
          },
          {
            type: "accordion",
            title: "Why our colours? The lime → cyan gradient, decoded",
            items: [
              {
                q: "The message: freshness, growth and technology",
                a: "Our lime green deliberately breaks from the corporate blue you see everywhere: it signals energy, momentum and growth — in short, return on investment. The shift toward teal cyan, meanwhile, points to the tech world: startups, software, marketing automation. Together they sign a modern, alive and unmistakably digital brand.",
              },
              {
                q: "The positioning: creative and against the grain",
                a: "This palette sets us apart from the classic, interchangeable agencies. It announces original strategies that stand out, and speaks naturally to fast-moving sectors — tech, e-commerce, mobile apps — as well as to brands aimed at Millennials and Gen Z.",
              },
              {
                q: "The on-screen strength: impact and flow",
                a: "That brightness catches the eye instantly, even in a saturated social feed. And because it's a soft gradient, it suggests flow: adaptability to algorithm changes and agility in our processes. The substance, told by the shape.",
              },
            ],
          },
          {
            type: "quote",
            text: "A logo is the signature. The identity is the whole handwriting. Both have to say the same thing.",
          },
          {
            type: "callout",
            title: "Key takeaway",
            text: "A good logo is simple, memorable, timeless, versatile and relevant — and it lives within a coherent visual identity, not on its own.",
          },
          {
            type: "p",
            text: "At vortx, we design bespoke logos and the complete identity that goes with them. Want a brand people remember? Let's talk.",
          },
        ],
      },
      {
        slug: "rgpd-cookies-site-web-luxembourg",
        category: "Compliance",
        title:
          "GDPR & cookies: the minimum to respect on your Luxembourg website",
        excerpt:
          "Cookie banner, consent, legal notices… GDPR can feel daunting, but the essentials boil down to a few clear rules. Here's the minimum for a worry-free Luxembourg website.",
        metaDescription:
          "GDPR and cookies on your Luxembourg website: banner, consent, legal notices — the essentials in clear rules to stay compliant without the stress.",
        date: "2026-06-08",
        updated: "2026-06-08",
        readingMinutes: 6,
        author: "The vortx team",
        cover: "rgpd",
        coverImage: "/news/rgpd-cookies-site-web-luxembourg.webp",
        summary: {
          text: "GDPR has a scary reputation, but the essentials come down to a few clear rules. This article sums up the minimum to respect on a Luxembourg website — cookie banner, consent and legal notices — to be compliant without tipping into paranoia.",
          points: [
            "Genuine, prior consent before any non-essential cookie.",
            "A clear banner and up-to-date legal notices cover the essentials.",
            "Compliance protects your visitors and your credibility.",
          ],
        },
        links: [
          { label: "Our Websites service", href: "/services/sites-web", desc: "Sites built compliant from the start." },
          { label: "SEO vs GEO: visibility and trust", href: "/news/geo-seo-luxembourg-etre-cite-par-les-ia", desc: "Why trust and visibility go hand in hand." },
          { label: "Glossary: GDPR, cookies, consent…", href: "/glossaire", desc: "The compliance terms explained." },
        ],
        body: [
          {
            type: "p",
            text: "GDPR has a reputation for being a headache. In reality, for a showcase or lead-generation site, the essentials come down to a few common-sense rules. Here's what you need to be compliant — and, above all, to earn your visitors' trust.",
          },
          {
            type: "callout",
            title: "A useful note",
            text: "This article gives practical guidance, not legal advice. For a specific case, have your legal pages validated by a legal professional.",
          },
          {
            type: "h2",
            id: "rgpd-cest-quoi",
            text: "GDPR in two minutes",
          },
          {
            type: "p",
            text: "The General Data Protection Regulation governs how you collect and use personal data (name, email, IP address…). The principle: transparency, consent when required, and respect for people's rights.",
          },
          {
            type: "h2",
            id: "cookies",
            text: "Cookies: consent before placement",
          },
          {
            type: "ul",
            items: [
              "Non-essential cookies (analytics, advertising) are only placed after explicit agreement.",
              "The banner must allow visitors to accept, refuse and customise — refusing must be as easy as accepting.",
              "Cookies strictly necessary for the site to function don't require consent.",
            ],
          },
          {
            type: "h2",
            id: "checklist",
            text: "The minimal checklist",
          },
          {
            type: "ul",
            items: [
              "A compliant cookie banner (accept / refuse / customise).",
              "A clear privacy policy (what data, why, for how long).",
              "Up-to-date legal notices.",
              "A legal basis for each collection (consent, contract, legitimate interest).",
              "A site on HTTPS and data processed securely.",
              "A simple way to exercise one's rights (access, deletion).",
            ],
          },
          {
            type: "callout",
            title: "The right instinct",
            text: "Only collect what you genuinely need. Less data means less risk — and more trust.",
          },
          {
            type: "h2",
            id: "atout",
            text: "Compliance, an asset more than a chore",
          },
          {
            type: "p",
            text: "A site that's clear about how it uses data reassures people. In Luxembourg, where privacy is taken seriously, respecting GDPR is a mark of professionalism that works in your favour.",
          },
          {
            type: "quote",
            text: "GDPR isn't an obstacle to conversion. Done well, it's an argument for trust.",
          },
          {
            type: "sources",
            title: "Sources & references",
            items: [
              { label: "CNPD — Luxembourg's national data protection commission", href: "https://cnpd.public.lu" },
              { label: "GDPR text — Regulation (EU) 2016/679 (EUR-Lex)", href: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" },
            ],
          },
          {
            type: "p",
            text: "At vortx, we design every site with GDPR in mind from the start — consent banner, cookie management and legal pages included. Unsure about your current site? We'll give you a free review.",
          },
        ],
      },
      {
        slug: "5-taches-pme-confier-a-l-ia",
        category: "Automation & AI",
        title: "5 tasks your SME should already be handing over to AI",
        excerpt:
          "AI doesn't replace your teams — it takes the drudgery off their hands. Here are 5 concrete tasks a Luxembourg SME can automate today, without an overengineered setup.",
        metaDescription:
          "5 tasks to hand over to AI in your Luxembourg SME today: replies, lead triage, follow-ups, content, data sync. No overengineered setup required.",
        date: "2026-06-08",
        updated: "2026-06-08",
        readingMinutes: 6,
        author: "The vortx team",
        cover: "automation",
        coverImage: "/news/5-taches-pme-confier-a-l-ia.webp",
        summary: {
          text: "AI doesn't replace your teams, it takes the drudgery off their hands. This article lists five concrete tasks a Luxembourg SME can automate today — without an overengineered setup — to free up valuable time.",
          points: [
            "Start small: repetitive tasks, not a revolution.",
            "Answers, qualification, follow-ups, content, syncing: all good candidates.",
            "Keep control: AI assists, humans decide.",
          ],
        },
        links: [
          { label: "AI for SMEs: where to start", href: "/news/ia-pme-luxembourg-par-ou-commencer", desc: "The guide to getting started without missteps." },
          { label: "Our Automation & AI service", href: "/services/automatisation-ia", desc: "Bespoke workflows and AI agents." },
          { label: "Glossary: automation, AI…", href: "/glossaire", desc: "The automation terms explained." },
        ],
        body: [
          {
            type: "p",
            text: "AI sparks as much fascination as worry. For an SME, the right approach is pragmatic: no revolution, just repetitive tasks you delegate to free up time. Here are five concrete projects, within reach right now.",
          },
          {
            type: "h2",
            id: "pas-remplacer",
            text: "AI isn't here to replace, but to relieve",
          },
          {
            type: "p",
            text: "The goal isn't to cut jobs, but to take off your teams' shoulders what adds no value — so they can focus on your clients and your craft.",
          },
          {
            type: "h2",
            id: "les-5",
            text: "The 5 tasks to delegate right now",
          },
          { type: "h3", text: "1. Answering repetitive questions" },
          {
            type: "p",
            text: "A well-designed chatbot answers common questions 24/7 (opening hours, services, quotes) and guides the visitor, without tying anyone up.",
          },
          { type: "h3", text: "2. Qualifying and sorting leads" },
          {
            type: "p",
            text: "AI can score incoming enquiries and route the hottest ones to the right person — your sales team only handles the best contacts.",
          },
          { type: "h3", text: "3. Following up and tracking" },
          {
            type: "p",
            text: "Automatic follow-ups, appointment reminders, post-quote check-ins: all those small forgotten tasks that, once automated, never fall through the cracks again.",
          },
          { type: "h3", text: "4. Producing and adapting content" },
          {
            type: "p",
            text: "Email drafts, descriptions, multilingual variants: AI speeds up production, your teams review and approve. More volume, less effort.",
          },
          { type: "h3", text: "5. Syncing your tools" },
          {
            type: "p",
            text: "Website, CRM, invoicing, calendar: we connect it all so data flows without re-entry. No more copy-pasting between software.",
          },
          {
            type: "callout",
            title: "The trap to avoid",
            text: "Trying to automate everything at once. Start with one task, measure the gain, then expand. Useful automation is gradual.",
          },
          {
            type: "h2",
            id: "par-ou-commencer",
            text: "Where to start",
          },
          {
            type: "ul",
            items: [
              "Spot the repetitive task that costs you the most time.",
              "Automate it first, measure the time saved.",
              "Always keep a human in the loop to approve.",
              "Then expand, step by step, in line with GDPR.",
            ],
          },
          {
            type: "quote",
            text: "Good automation goes unnoticed: it simply gives you your days back.",
          },
          {
            type: "callout",
            title: "Key takeaway",
            text: "Hand over to AI the repetitive, low-value tasks — answers, qualification, follow-ups, content, syncing — starting small and keeping control.",
          },
          {
            type: "sources",
            title: "Sources & references",
            items: [
              { label: "CNPD — data protection in Luxembourg", href: "https://cnpd.public.lu" },
              { label: "Luxinnovation — digitalisation support for SMEs", href: "https://www.luxinnovation.lu" },
            ],
          },
          {
            type: "p",
            text: "At vortx, we put AI to work where it genuinely saves you time. Want to know what you could automate? We'll tell you for free.",
          },
        ],
      },
      {
        slug: "ia-pme-luxembourg-par-ou-commencer",
        category: "Automation & AI",
        title: "AI for SMEs in Luxembourg: where to start in 2026",
        excerpt:
          "AI is no longer just for big corporations. But where do you begin as an SME, with no tech budget and no dedicated team? Here's a pragmatic roadmap: the right use cases, the traps to avoid and how to keep control of your data.",
        metaDescription:
          "AI for SMEs in Luxembourg: the 2026 roadmap to get started without a tech budget — the right use cases, the traps to avoid, your data under control.",
        date: "2026-06-09",
        updated: "2026-06-09",
        readingMinutes: 7,
        author: "The vortx team",
        cover: "automation",
        coverImage: "/news/ia-pme-luxembourg-par-ou-commencer.webp",
        summary: {
          text: "AI is no longer reserved for big corporations: framed well, it gives an SME the firepower of a bigger team. This guide dismantles the myths, shows where AI genuinely pays off and lays out a method to start small while keeping control of your data.",
          points: [
            "Start from a real problem and a repetitive task, not a trendy tool.",
            "Test on a small scope, measure the time saved, then scale up.",
            "Keep your data under control: GDPR and sovereignty first.",
          ],
        },
        links: [
          { label: "5 tasks your SME should hand over to AI", href: "/news/5-taches-pme-confier-a-l-ia", desc: "Concrete examples to automate right now." },
          { label: "Our Automation & AI service", href: "/services/automatisation-ia", desc: "Bespoke workflows, integrations and AI agents." },
          { label: "Glossary: AI, automation, GDPR…", href: "/glossaire", desc: "The AI vocabulary explained simply." },
        ],
        body: [
          {
            type: "p",
            text: "Artificial intelligence is everywhere in the conversation, yet many SME leaders are still wondering, in practical terms, what they're actually supposed to do with it. The good news: you don't need a data department or a six-figure budget. You need one task that costs you time every week — and a sensible place to start. Here's how to go about it.",
          },
          {
            type: "h2",
            id: "pourquoi-pme",
            text: "Why AI is finally within reach for SMEs",
          },
          {
            type: "p",
            text: "For years, AI was an enterprise project: data, servers, specialists. Today, the essentials have become a service you switch on as needed, billed by usage, and it speaks your language. A Luxembourg SME can plug in an assistant, automate a flow or generate content without hosting anything itself. The cost of entry has melted away; what matters now is choosing the right use case.",
          },
          {
            type: "h2",
            id: "trois-idees-recues",
            text: "Three myths that hold SMEs back",
          },
          {
            type: "h3",
            text: "\"AI is for big corporations\"",
          },
          {
            type: "p",
            text: "It's precisely the opposite. The smaller your team, the more every hour saved counts. A tradesperson, a firm or a shop that automates its replies and follow-ups reclaims time that no large organisation values as highly. AI is a force multiplier for small teams.",
          },
          {
            type: "h3",
            text: "\"You need a developer and a big budget\"",
          },
          {
            type: "p",
            text: "Many of the gains come from off-the-shelf tools and a few well-thought-out automations. You often start without writing a single line of code. The budget is measured in tens of euros a month, not thousands — and it pays for itself from the very first automated task.",
          },
          {
            type: "h3",
            text: "\"AI is going to replace my team\"",
          },
          {
            type: "p",
            text: "AI replaces tasks, not people. It takes on the repetitive, low-value work to give your staff back the time for decisions, client relationships and their craft. Done well, it augments your teams rather than shrinking them.",
          },
          {
            type: "callout",
            title: "In one sentence",
            text: "AI doesn't replace an SME — it gives it the firepower of a bigger team.",
          },
          {
            type: "h2",
            id: "ou-commencer",
            text: "Where AI genuinely pays off for an SME",
          },
          {
            type: "p",
            text: "There's no need to transform everything. A few areas concentrate most of the value for a small business:",
          },
          {
            type: "ul",
            items: [
              "Client relationships: answering frequent questions, qualifying enquiries, booking appointments.",
              "Marketing & content: drafts of articles, posts, emails and descriptions, to review and personalise.",
              "Quotes & admin: pre-filling, document summaries, automatic follow-ups.",
              "Analysis: a quick read of your sales or traffic data to spot what's working.",
              "Internal productivity: meeting notes, FR/DE/EN translation, finding information.",
            ],
          },
          {
            type: "h2",
            id: "demarrer-petit",
            text: "How to start without missteps",
          },
          {
            type: "ol",
            items: [
              "Start from a problem, not a tool: which task costs you time every week?",
              "Choose a repetitive, measurable task with a clear outcome.",
              "Test on a small scope, on a few real cases, before rolling it out.",
              "Measure the time saved and the quality achieved, honestly.",
              "Scale what works, drop what doesn't deliver on its promise.",
            ],
          },
          {
            type: "p",
            text: "This step-by-step approach avoids the \"big AI project\" that gets bogged down. You stack up concrete wins, your team grows in confidence, and you only invest where the value is proven.",
          },
          {
            type: "h2",
            id: "rgpd-donnees",
            text: "GDPR and data: the vigilance that reassures",
          },
          {
            type: "p",
            text: "In Luxembourg, the question of data is no minor detail. Before entrusting anything to a tool, ask yourself three questions: where is the data stored, who can access it, and are you allowed to use it this way? Avoid pasting sensitive or personal data into consumer tools, favour GDPR-compliant solutions hosted in the EU where possible, and keep a record of what you automate. Compliance isn't a brake: it's what makes AI deployable with peace of mind.",
          },
          {
            type: "callout",
            title: "Key takeaway",
            text: "Start with a simple, measurable use case, keep your data under control, and scale once the value is proven.",
          },
          {
            type: "quote",
            text: "The right question isn't \"should I do AI?\" but \"which task costs me time every week?\".",
          },
          {
            type: "sources",
            title: "Sources & references",
            items: [
              { label: "CNPD — data protection in Luxembourg", href: "https://cnpd.public.lu" },
              { label: "Luxinnovation — digitalisation support for SMEs", href: "https://www.luxinnovation.lu" },
            ],
          },
          {
            type: "p",
            text: "At vortx, we help Luxembourg SMEs pinpoint the use cases that genuinely pay off, then put them in place properly — tools, automations and GDPR safeguards included. Want to know where to start in your business? We'll tell you for free.",
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
    eyebrow: "Glossary",
    title: "The vocabulary of marketing and web, jargon-free.",
    lead: "Every term we use — SEO, GEO, ROAS, funnel, CMS… — explained simply, with the Luxembourg context.",
    searchPlaceholder: "Search for a term…",
    tocTitle: "Contents",
    countSuffix: "terms",
    emptyLabel: "No term matches your search.",
    ctaTitle: "Still stuck on a term?",
    terms: [
      {
        term: "SEO (organic search)",
        slug: "seo",
        category: "SEO & GEO",
        short: "Get found on Google for free.",
        def: "Search Engine Optimization covers the techniques that improve a site's position in the organic (non-paid) results of search engines: technical quality, relevant content, authority and user experience. In Luxembourg it's worked in three languages: your clients compare in French, German and English.",
        links: [
          { href: "/services/seo-geo/seo", label: "Our SEO service" },
          { href: "/news/google-ads-ou-seo-ou-investir-budget-marketing", label: "Read: Google Ads or SEO?" },
        ],
      },
      {
        term: "GEO / GSO",
        slug: "geo-gso",
        category: "SEO & GEO",
        short: "Get cited by generative AI.",
        def: "Generative Engine Optimization (or Generative Search Optimization) optimises your content so it is picked up and cited as a source by AI answer engines (ChatGPT, Perplexity, Google AI). The goal: be the answer, not just a link. Good news: most of the best practices are shared with SEO — we work both fronts together.",
        links: [
          { href: "/services/seo-geo/geo-gso", label: "Our GEO / GSO service" },
          { href: "/news/geo-seo-luxembourg-etre-cite-par-les-ia", label: "Read: getting cited by AI" },
        ],
      },
      {
        term: "SERP",
        slug: "serp",
        category: "SEO & GEO",
        short: "Google's results page.",
        def: "Search Engine Results Page: the page that displays the results of a search. It blends organic links, ads, rich snippets, and increasingly AI-generated answers. Owning the top comes down to two complementary levers: SEO for organic, SEA for paid.",
        links: [
          { href: "/services/seo-geo", label: "Our SEO & GEO service" },
          { href: "/services/publicite/google-ads", label: "Our Google Ads campaigns" },
        ],
      },
      {
        term: "Keyword",
        slug: "mot-cle",
        category: "SEO & GEO",
        short: "What your clients type.",
        def: "A term or phrase a user enters into a search engine. SEO is partly about identifying profitable keywords and structuring content around them. In a multilingual market like Luxembourg, we research them in FR, DE and EN — volumes and competition differ from one language to the next.",
        links: [
          { href: "/services/seo-geo/seo", label: "Our SEO service" },
          { href: "/services/publicite/google-ads", label: "Target the right keywords in Ads" },
        ],
      },
      {
        term: "Backlink",
        slug: "backlink",
        category: "SEO & GEO",
        short: "A link from another site to yours.",
        def: "An inbound link from a third-party site. Quality backlinks signal to search engines that your site has authority, which improves ranking. That authority counts for GEO too: AI leans on what's said about you elsewhere.",
        links: [
          { href: "/services/seo-geo/seo", label: "Our SEO service" },
          { href: "/news/geo-seo-luxembourg-etre-cite-par-les-ia", label: "Read: building authority for AI" },
        ],
      },
      {
        term: "Structured data (Schema.org)",
        slug: "donnees-structurees",
        category: "SEO & GEO",
        short: "Code that explains your content to machines.",
        def: "Standardised markup added to a page's code to describe its content (business, service, article, FAQ…). It helps Google and AI understand and surface your information. It's one of the baseline deliverables of any serious GEO work.",
        links: [
          { href: "/services/seo-geo/geo-gso", label: "Our GEO / GSO service" },
          { href: "/news/geo-seo-luxembourg-etre-cite-par-les-ia", label: "Read: making your site readable by AI" },
        ],
      },
      {
        term: "llms.txt",
        slug: "llms-txt",
        category: "SEO & GEO",
        short: "A summary of your site for AI.",
        def: "A text file placed at a site's root to present, in a structured way, its offering and key content to large language models. An emerging GEO lever, and part of our standard deliverables.",
        links: [
          { href: "/services/seo-geo/geo-gso", label: "Our GEO / GSO service" },
          { href: "/news/geo-seo-luxembourg-etre-cite-par-les-ia", label: "Read: SEO vs GEO in 2026" },
        ],
      },
      {
        term: "Conversion funnel",
        slug: "tunnel-de-conversion",
        category: "Conversion",
        short: "The path from visitor to client.",
        def: "The sequence of steps a visitor goes through before becoming a client (discovery → interest → contact → purchase). We optimise it to reduce drop-off at each step. A single leaky step drags down the whole funnel — hence the value of measuring every link in the chain.",
        links: [
          { href: "/services/lead-generation/tunnels-de-conversion", label: "Our conversion funnels" },
          { href: "/news/tunnel-de-conversion-transformer-visiteurs-en-clients", label: "Read: turning your visitors into clients" },
        ],
      },
      {
        term: "Conversion rate",
        slug: "taux-de-conversion",
        category: "Conversion",
        short: "The % of visitors who take action.",
        def: "The percentage of visitors who complete the desired action (quote request, purchase, sign-up). A central indicator of a site's or campaign's effectiveness: doubling it means doubling your leads without buying more traffic.",
        links: [
          { href: "/services/lead-generation", label: "Our lead generation service" },
          { href: "/news/tunnel-de-conversion-transformer-visiteurs-en-clients", label: "Read: the conversion funnel" },
        ],
      },
      {
        term: "Landing page",
        slug: "landing-page",
        category: "Conversion",
        short: "A page built for a single action.",
        def: "A landing page designed around a single goal (often tied to a campaign): convert the visitor into a lead or client, with no distraction. We sometimes strip out even the menu, leaving a single path to action.",
        links: [
          { href: "/services/sites-web/landing-pages", label: "Our landing pages" },
          { href: "/services/lead-generation/landing-pages-campagne", label: "Campaign landing pages" },
        ],
      },
      {
        term: "Call-to-action (CTA)",
        slug: "cta",
        category: "Conversion",
        short: "The button that invites action.",
        def: "An element (button, link) that prompts the visitor to take the next step: \"Book a call\", \"Get a quote\". Its clarity and visibility strongly influence conversion. Golden rule: one goal per page, one primary CTA.",
        links: [
          { href: "/services/lead-generation", label: "Our lead generation service" },
          { href: "/news/ux-ui-design-site-qui-convertit-bonnes-pratiques", label: "Read: UX/UI that converts" },
        ],
      },
      {
        term: "A/B testing",
        slug: "ab-testing",
        category: "Conversion",
        short: "Compare two versions, keep the best.",
        def: "A method that shows two variants of a page or element to different visitors, then measures which one converts best. It's the basic tool of continuous optimisation: we don't guess, we test.",
        links: [
          { href: "/services/lead-generation", label: "Our lead generation service" },
          { href: "/news/tunnel-de-conversion-transformer-visiteurs-en-clients", label: "Read: measure to optimise" },
        ],
      },
      {
        term: "Lead",
        slug: "lead",
        category: "Acquisition",
        short: "A potential sales contact.",
        def: "A person or company that has shown interest (form, call, quote request) and could become a client. A \"qualified\" lead is a good fit for your target — a hundred qualified leads are worth more than a thousand off-target contacts.",
        links: [
          { href: "/services/lead-generation", label: "Our lead generation service" },
          { href: "/news/tunnel-de-conversion-transformer-visiteurs-en-clients", label: "Read: from visitor to client" },
        ],
      },
      {
        term: "Lead generation",
        slug: "generation-de-leads",
        category: "Acquisition",
        short: "Create a steady flow of prospects.",
        def: "The set of actions (site, content, campaigns, automation) designed to attract and capture qualified contacts in a predictable way. The next step — nurturing and scoring — turns those contacts into sales appointments.",
        links: [
          { href: "/services/lead-generation", label: "Our lead generation service" },
        ],
      },
      {
        term: "SEA / Paid advertising",
        slug: "sea",
        category: "Acquisition",
        short: "Buy visibility (Google, Meta…).",
        def: "Search Engine Advertising and social advertising: paid campaigns (Google Ads, Meta, LinkedIn) that put your ads in front of a targeted audience. In Luxembourg, geographic and language targeting (FR/DE/EN) often makes all the difference to profitability.",
        links: [
          { href: "/services/publicite", label: "Our online advertising service" },
          { href: "/news/google-ads-ou-seo-ou-investir-budget-marketing", label: "Read: Google Ads or SEO?" },
        ],
      },
      {
        term: "ROAS",
        slug: "roas",
        category: "Data & measurement",
        short: "What each euro of ad spend returns.",
        def: "Return On Ad Spend: revenue generated for every euro spent on advertising. A ROAS of 4 means €4 of revenue for €1 invested. It's the indicator we track to steer — and cut — every campaign.",
        links: [
          { href: "/services/publicite", label: "Our online advertising service" },
          { href: "/news/google-ads-ou-seo-ou-investir-budget-marketing", label: "Read: where to invest your budget?" },
        ],
      },
      {
        term: "ROI",
        slug: "roi",
        category: "Data & measurement",
        short: "Overall return on investment.",
        def: "Return On Investment: the ratio between the gain obtained and the amount invested. A key indicator for judging the profitability of a marketing action — and our compass: every euro invested must be justifiable.",
        links: [
          { href: "/approche", label: "Our results-driven approach" },
          { href: "/news/google-ads-ou-seo-ou-investir-budget-marketing", label: "Read: Google Ads or SEO?" },
        ],
      },
      {
        term: "CPL / CPA",
        slug: "cpl-cpa",
        category: "Data & measurement",
        short: "What a lead or a sale costs.",
        def: "Cost Per Lead (CPL) and Cost Per Acquisition (CPA): the average amount spent to obtain a qualified contact or a client, respectively. To be compared against the value generated: a \"high\" CPL can be excellent if the average contract is too.",
        links: [
          { href: "/services/publicite", label: "Our online advertising service" },
          { href: "/services/lead-generation", label: "Our lead generation service" },
        ],
      },
      {
        term: "KPI",
        slug: "kpi",
        category: "Data & measurement",
        short: "The numbers that really count.",
        def: "Key Performance Indicator: a key metric chosen to measure progress toward a goal (conversion rate, cost per lead, qualified traffic…). The trap: tracking vanity metrics (followers, impressions) that flatter without proving anything.",
        links: [
          { href: "/approche", label: "Our approach, driven by the numbers" },
          { href: "/services/lead-generation", label: "Our lead generation service" },
        ],
      },
      {
        term: "CTR",
        slug: "ctr",
        category: "Data & measurement",
        short: "The % of clicks on a link or ad.",
        def: "Click-Through Rate: the proportion of people who click after seeing a link, an ad or a result. A high CTR signals a relevant message — in advertising as in email marketing, it's the first signal to watch.",
        links: [
          { href: "/services/publicite/google-ads", label: "Our Google Ads campaigns" },
          { href: "/services/lead-generation/email-marketing-automation", label: "Email marketing & automation" },
        ],
      },
      {
        term: "Analytics",
        slug: "analytics",
        category: "Data & measurement",
        short: "Measure what happens on your site.",
        def: "Tools (Google Analytics, Matomo…) that track visitor behaviour: traffic sources, page views, conversions. The basis of every marketing decision — to be configured in line with GDPR, consent included.",
        links: [
          { href: "/services/lead-generation", label: "Our lead generation service" },
          { href: "/news/rgpd-cookies-site-web-luxembourg", label: "Read: GDPR & cookies in Luxembourg" },
        ],
      },
      {
        term: "CMS",
        slug: "cms",
        category: "Web & tech",
        short: "The tool for managing a site's content.",
        def: "Content Management System: a platform that lets you create and edit a site's pages without coding. Handy for staying hands-on day to day.",
        links: [
          { href: "/services/sites-web", label: "Our websites service" },
          { href: "/news/combien-coute-un-site-web-luxembourg-2026", label: "Read: how much does a website cost?" },
        ],
      },
      {
        term: "Responsive",
        slug: "responsive",
        category: "Web & tech",
        short: "A site that adapts to every screen.",
        def: "Design that automatically adjusts the layout to the device (mobile, tablet, desktop), for an optimal experience everywhere. With most traffic now arriving on mobile, we design for the small screen first.",
        links: [
          { href: "/services/sites-web", label: "Our websites service" },
          { href: "/news/ux-ui-design-site-qui-convertit-bonnes-pratiques", label: "Read: mobile-first, for real" },
        ],
      },
      {
        term: "Core Web Vitals",
        slug: "core-web-vitals",
        category: "Web & tech",
        short: "Google's scores for technical quality.",
        def: "Google indicators measuring a page's load speed, responsiveness and visual stability. They influence ranking and user experience: a slow site loses visitors before it's even read.",
        links: [
          { href: "/services/seo-geo/seo", label: "Our SEO service" },
          { href: "/news/ux-ui-design-site-qui-convertit-bonnes-pratiques", label: "Read: performance & conversion" },
        ],
      },
      {
        term: "GDPR (RGPD)",
        slug: "rgpd",
        category: "Web & tech",
        short: "The European data law.",
        def: "General Data Protection Regulation: the European framework governing the collection and use of personal data. A Luxembourg site must comply (consent, cookies…) — in Luxembourg, the CNPD oversees its enforcement.",
        links: [
          { href: "/news/rgpd-cookies-site-web-luxembourg", label: "Read: GDPR & cookies in Luxembourg" },
          { href: "/services/sites-web", label: "Sites compliant from day one" },
        ],
      },
      {
        term: "Automation",
        slug: "automatisation",
        category: "Web & tech",
        short: "Leave repetitive tasks to machines.",
        def: "Setting up workflows that automatically run tasks (follow-ups, notifications, tool synchronisation), to save time and reduce errors. For an SME it's often the first step towards AI — and the most profitable one.",
        links: [
          { href: "/services/automatisation-ia", label: "Our Automation & AI service" },
          { href: "/news/5-taches-pme-confier-a-l-ia", label: "Read: 5 tasks to hand over to AI" },
        ],
      },
      {
        term: "Brand identity",
        slug: "identite-de-marque",
        category: "Design & brand",
        short: "What makes your brand recognisable.",
        def: "A coherent set of visual elements and messages (logo, colours, typography, tone) that distinguishes your business and builds trust. The logo is its signature; the identity, the entire handwriting.",
        links: [
          { href: "/services/branding-design/identite-visuelle", label: "Our Visual identity & brand guidelines service" },
          { href: "/news/quest-ce-quun-bon-logo-identite-qui-dure", label: "Read: what makes a good logo?" },
        ],
      },
      {
        term: "Design system",
        slug: "design-system",
        category: "Design & brand",
        short: "A brand's visual toolbox.",
        def: "A library of reusable components, rules and styles that guarantees a site's or product's consistency and speeds up its creation. It's what makes a brand look as though it came from the same hand on every page.",
        links: [
          { href: "/services/branding-design/identite-visuelle", label: "Our Visual identity & brand guidelines service" },
          { href: "/news/ux-ui-design-site-qui-convertit-bonnes-pratiques", label: "Read: consistency & conversion" },
        ],
      },
      {
        term: "UX / UI",
        slug: "ux-ui",
        category: "Design & brand",
        short: "The experience and the interface.",
        def: "UX (User Experience) is about the user's feel and journey; UI (User Interface) is about the look and the elements they interact with. Both serve conversion: UX decides where the visitor goes, UI makes them want to go there.",
        links: [
          { href: "/services/sites-web", label: "Our websites service" },
          { href: "/news/ux-ui-design-site-qui-convertit-bonnes-pratiques", label: "Read: the UX/UI principles that convert" },
        ],
      },
    ] as GlossaryTerm[],
  },

  // ---- Service detail (shared labels + per-service content) ----
  servicesDetail: {
    overviewTitle: "In detail",
    includedTitle: "What's included",
    deliverablesTitle: "Deliverables",
    faqTitle: "Frequently asked questions",
    articlesTitle: "Resources",
    articlesLead: "Further reading on this topic.",
    tracking: {
      eyebrow: "Included in every project",
      title: "Tracking and conversion built in",
      lead: "Every site goes live with its measurement already in place: you know where your visitors come from and what they become.",
      items: [
        { icon: "analytics", title: "Google Analytics 4", desc: "Traffic, conversions and visitor journeys, readable by city and by language." },
        { icon: "integration", title: "Google Tag Manager", desc: "One container for your Google, Meta and LinkedIn pixels, switched on or off without touching the code." },
        { icon: "conversion", title: "Conversion tracking", desc: "Forms, calls, email clicks and booked appointments: every action is counted to work out your return." },
      ],
    },
    // Shared "our method" band, rendered on every service & sub-service page.
    method: {
      eyebrow: "Our method",
      title: "Four steps, zero nasty surprises.",
      lead: "A clear framework, the same on every project: you sign off at each step, we move fast, you stay in control.",
      steps: [
        { n: "01", icon: "process", title: "Diagnosis", desc: "We analyse your situation, your market and your goals. A free audit, straight up: we tell you what can be improved before we even talk about a quote." },
        { n: "02", icon: "ai-build", title: "Design & build", desc: "Bespoke design and AI-accelerated production. We build the solution — site, campaign, identity, automation — engineered to convert." },
        { n: "03", icon: "ab-test", title: "Review & optimisation", desc: "We test, we measure, we adjust with you. Nothing is set in stone: every detail is optimised until it performs." },
        { n: "04", icon: "analytics", title: "Launch & follow-up", desc: "Go-live, results tracking and ongoing support. You see the progress, every euro tied to a result." },
      ],
    },
    // Per-page "Notre méthode", keyed by "slug" or "slug/child"; banner photo in
    // public/methode/<slug>[-<child>].webp. Pages missing here use `method` above.
    methods: {
      "sites-web": {
        title: "Four steps to a site that converts.",
        lead: "Showcase site, online store or landing page: the same framework. You sign off on mock-ups, content and go-live; we build fast, with AI and human review.",
        steps: [
          { icon: "process", title: "Audit & scoping", desc: "A free audit of your current site or project: goals, audiences, conversion paths. Together, we scope your bespoke site." },
          { icon: "ai-build", title: "Mock-ups & development", desc: "Site structure, bespoke mock-ups, then AI-accelerated development. You approve the design before the first line of code; forms and SEO & GEO foundations are built in from the start." },
          { icon: "next-perf", title: "Testing & sign-off", desc: "Speed, forms, tracking, display on every screen: everything is checked in staging. You review each page and we adjust until your final sign-off." },
          { icon: "analytics", title: "Launch & follow-up", desc: "Domain, SSL, analytics and conversion tracking set up before the switch-over. After launch, we read the data with you and fix whatever is holding back enquiries." },
        ],
      },
      "sites-web/site-vitrine": {
        title: "A showcase site built to spark contact.",
        lead: "Your showcase site has a few seconds to convince. We pin down the message and the journey with you, then every page is designed, reviewed and approved before go-live.",
        steps: [
          { icon: "strategy", title: "Message & site structure", desc: "We clarify what sets you apart, who you're targeting and the action you expect: a call, a message or a quote request. You approve the site structure — home, services, about, contact — before any design." },
          { icon: "brand-identity", title: "Design that looks like you", desc: "100% bespoke mock-ups, aligned with your identity, zero recycled templates. Credibility proof, calls to action and the contact form placed where the visitor makes up their mind." },
          { icon: "responsive", title: "First-impression test", desc: "We check that a visitor understands who you are and what to do the moment they arrive, mobile first. You review copy and visuals; we refine until the site truly reflects you." },
          { icon: "seo", title: "Launch & SEO", desc: "Go-live with SEO markup, structured data and contact-request tracking. After that, we handle the updates for you." },
        ],
      },
      "sites-web/site-e-commerce": {
        title: "From product to payment, without friction.",
        lead: "An online store is judged on its orders, not its catalogue. Platform, payments, VAT, shipping: every building block is chosen, tested and approved with you before opening.",
        steps: [
          { icon: "ecommerce", title: "Catalogue & platform", desc: "We map your catalogue, your variants, your shipping zones and your existing tools. Then we design a bespoke store, built for performance." },
          { icon: "funnel", title: "Product pages & checkout", desc: "Product pages that answer objections, basket and checkout steps cut to the essentials. Payment methods, Luxembourg VAT rules and shipping costs are configured from the build." },
          { icon: "integration", title: "Test orders", desc: "We simulate complete orders, from basket to confirmation email, and check the sync with your connected tools: stock, shipping, accounting. You approve every scenario." },
          { icon: "analytics", title: "Opening & monitoring", desc: "The store opens with e-commerce tracking live: baskets, abandonments, best-selling products. We train you on the back office, then optimise wherever the numbers show losses." },
        ],
      },
      "sites-web/landing-pages": {
        title: "One campaign, one page, one action.",
        lead: "Every landing page starts from a campaign and a single goal. We match the message to the ad, launch fast, then test to bring down your cost per lead.",
        steps: [
          { icon: "ads-targeting", title: "Goal & ad", desc: "We start from your campaign: audience, the ad's promise, the expected action — form, booking or download. You approve the single goal and the metric the page will be judged on." },
          { icon: "landing", title: "Copy, page, form", desc: "Persuasive copywriting aligned with the ad's message, a page with no menu and no exits, a form cut down to the fields that matter. AI-accelerated production to time the launch with your campaign." },
          { icon: "conversion", title: "Tracking & speed checked", desc: "Before the first euro is spent, we check that every conversion reports back to your ad platforms and that the page loads fast on mobile, where most traffic arrives." },
          { icon: "ab-test", title: "Launch & A/B testing", desc: "The page goes live with the campaign. We then test headlines, visuals and forms, one variable at a time, and keep the version that converts best." },
        ],
      },
      "sites-web/refonte-de-site": {
        title: "Start afresh without losing your rankings.",
        lead: "A poorly handled redesign can wipe out the rankings you've earned. We start with an audit of your current site and finish with a controlled migration, URL by URL.",
        steps: [
          { icon: "redesign", title: "Audit of your current site", desc: "UX, performance, SEO, conversion: we measure what's holding you back and what still pays off. You decide what we keep — content, high-performing pages, brand elements — and what we rebuild." },
          { icon: "ai-build", title: "Design, code, redirects", desc: "A new design and fast technical foundations, built alongside your current site, which stays online. We map all your URLs and prepare every redirect before the switch-over." },
          { icon: "speed", title: "Before-and-after comparison", desc: "In a test environment, we compare the old and new sites: speed, journeys, forms, SEO tags. Redirects are tested one by one; you approve the final version." },
          { icon: "analytics", title: "Switch-over & SEO monitoring", desc: "Go-live, redirects active, Search Console monitored. We track your rankings and conversions after the switch-over to fix the slightest dip quickly." },
        ],
      },
      "sites-web/site-multilingue": {
        title: "Found and understood, in every language.",
        lead: "In Luxembourg, a German-speaking prospect doesn't search like a French-speaking one. We plan languages, URLs and keywords before the design, then each version is optimised and approved separately.",
        steps: [
          { icon: "multilingual", title: "Languages & architecture", desc: "Together, we define your priority languages, URL structure, hreflang markup and the keywords for each language. Multilingual is built in before the first mock-up." },
          { icon: "gen-content", title: "Content per language", desc: "Professional writing and translation, or integration of your own copy, never raw machine translation. The mock-ups absorb the length differences between languages." },
          { icon: "seo", title: "Language-by-language review", desc: "You or your reviewers approve each version. We check hreflang, the language switcher, forms and confirmation emails in every language, so no visitor ends up in French by mistake." },
          { icon: "analytics", title: "Indexing & monitoring", desc: "Go-live and an indexing request for each version. We track rankings, traffic and enquiries language by language, to see which market responds and where to strengthen the content." },
        ],
      },
      "seo-geo": {
        title: "One project, two engines: Google and AI.",
        lead: "We work on SEO and GEO in a single move: you approve every priority, we fix what's blocking, you track rankings and citations.",
        steps: [
          { icon: "process", title: "SEO & GEO audit", desc: "A free audit: technical, semantic and presence in AI answers. You know what's holding back your visibility, and where to start, before we even talk about a quote." },
          { icon: "strategy", title: "Plan & optimisations", desc: "FR/DE/EN keywords, content plan, technical fixes, Schema.org and llms.txt: a foundation Google understands and AI can pick up as a source." },
          { icon: "ab-test", title: "Checks & baseline", desc: "Before go-live, we check each page's indexing, markup and rendering, fix any gaps and record your starting rankings and citations." },
          { icon: "analytics", title: "Rankings & citations tracking", desc: "Go-live, then monthly reporting on Google rankings and AI citations, reviewed with you. You see what's progressing, what's stalling and what we tackle next." },
        ],
      },
      "seo-geo/seo": {
        title: "From technical diagnosis to qualified traffic.",
        lead: "SEO is built in layers: first what blocks indexing, then the pages that answer searches, then tracking. You approve every priority.",
        steps: [
          { icon: "seo", title: "Technical & semantic audit", desc: "Speed, structure, indexing, internal linking, queries where you're missing: we list what's holding back your rankings and prioritise it by impact." },
          { icon: "multilingual", title: "Keywords & on-page", desc: "A FR, DE and EN keyword plan based on search intent, then technical fixes, tags, page structure and content that answers what your clients type." },
          { icon: "speed", title: "Technical check", desc: "We crawl the site the way Google would: redirects, canonical tags, language versions, mobile speed. Every issue is fixed before re-indexing." },
          { icon: "analytics", title: "Tracking & authority", desc: "Go-live, then monthly reporting on rankings, traffic and conversions, with the next content to produce to build your authority on your key queries." },
        ],
      },
      "seo-geo/geo-gso": {
        title: "Readable by the models, cited in their answers.",
        lead: "An emerging field, so a strict method: we start from what AI says about you today, then structure, test and track every citation.",
        steps: [
          { icon: "chatbot", title: "AI presence audit", desc: "We ask ChatGPT, Perplexity and Google AI about your topics: are you cited, how, and who is cited instead of you? Then we audit your site's technical structure." },
          { icon: "ai-build", title: "Citable content & markup", desc: "Clear answers, verifiable facts, Luxembourg context: we restructure your key pages so they can be cited, then add Schema.org structured data and the llms.txt file." },
          { icon: "ab-test", title: "Machine-side validation", desc: "We check that the structured data is valid, that your pages read without JavaScript and that AI crawlers can access them. Every gap is fixed before publication." },
          { icon: "geo-citation", title: "Citation tracking", desc: "After go-live, we regularly put your clients' questions to AI assistants and track where they cite you, how they describe you and what still needs strengthening." },
        ],
      },
      "seo-geo/seo-local": {
        title: "Win the map, where your clients choose.",
        lead: "Profile, contact details, reviews, local pages: we work on the signals Google uses to rank local businesses, in Luxembourg and across the Greater Region.",
        steps: [
          { icon: "local-seo", title: "Local visibility audit", desc: "We review your Google Business Profile, your contact details in directories, your reviews and the competitors ahead of you on the map, query by query." },
          { icon: "integration", title: "Profile, citations & pages", desc: "We complete your profile (categories, services, photos, service area), make your name, address and phone number consistent everywhere, and create your local pages, marked up in FR, DE and EN." },
          { icon: "conversion", title: "Checks & customer reviews", desc: "We hunt down duplicate listings, inconsistent contact details and markup errors, then launch customer review collection with ready-to-use reply templates." },
          { icon: "analytics", title: "Map tracking", desc: "We track your map rankings by area and the calls and direction requests coming from your profile, and post regularly to keep your presence active." },
        ],
      },
      "lead-generation": {
        title: "Qualified enquiries, captured by your site and your landing pages.",
        lead: "Your leads come in through two doors: your site and your landing pages. We design both to capture, qualify and measure every enquiry; you approve every step.",
        steps: [
          { icon: "process", title: "Acquisition diagnosis", desc: "A free audit: we look at where your enquiries come from, which pages of your site convert and where your visitors drop off, before we even talk about a quote." },
          { icon: "conversion", title: "A site that generates enquiries", desc: "Visible calls to action, short forms that qualify, trust signals: your site becomes your first lead channel. If it needs rebuilding from scratch, we design it bespoke.", links: [{ href: "/services/sites-web", label: "Our websites" }] },
          { icon: "landing", title: "One landing page per campaign", desc: "For every offer or campaign, a dedicated page, a message aligned with the ad and a single expected action. We test headlines and forms, and keep the version that converts best.", links: [{ href: "/services/sites-web/landing-pages", label: "Our landing pages" }] },
          { icon: "analytics", title: "Cost-per-lead reporting", desc: "Every enquiry is tracked from its source: page, campaign, channel. Clear monthly reporting shows you lead volume, cost per lead and what's improving." },
        ],
      },
      "lead-generation/tunnels-de-conversion": {
        title: "A mapped journey, measured at every stage.",
        lead: "Discovery, consideration, decision: each phase has its own page, message and metric. You approve the architecture before anything goes live.",
        steps: [
          { icon: "funnel", title: "Journey mapping", desc: "We trace your clients' real path to the quote request, then split it into TOFU, MOFU and BOFU phases matched to your sales cycle." },
          { icon: "conversion", title: "Aligned pages & follow-ups", desc: "For each phase, the page, message and follow-up that move the prospect one step forward: we reassure during consideration and remove the last objections at decision time." },
          { icon: "ab-test", title: "Tracking & tests by stage", desc: "We instrument every step-to-step transition, spot the stages that leak and focus A/B tests there, rather than tweaking everything at random." },
          { icon: "analytics", title: "Launch & attribution", desc: "Funnel live and end-to-end attribution: you know which channel brings which leads and where they stand. An optimisation plan sets the next priorities." },
        ],
      },
      "lead-generation/landing-pages-campagne": {
        title: "One campaign, one page, a single action.",
        lead: "Every paid click should land on the promise that triggered it. We start from your ad and your audience, then build the page that extends it.",
        steps: [
          { icon: "ads-targeting", title: "Campaign brief & intent", desc: "Ad, audience, keyword, offer: we analyse what the visitor saw and searched for before clicking, so the page echoes the ad's promise word for word." },
          { icon: "landing", title: "Copywriting & form", desc: "A headline that confirms the click, benefits that answer objections, reassurance, a single call to action and a form cut down to the fields that truly qualify." },
          { icon: "responsive", title: "Variants & mobile speed", desc: "We prepare headline, offer or form variants for A/B testing, and check loading on mobile, where most paid traffic arrives." },
          { icon: "analytics", title: "Launch with the campaign", desc: "The page goes live with the campaign, conversion tracking in place. We track cost per lead by ad and keep the variant that converts best." },
        ],
      },
      "lead-generation/email-marketing-automation": {
        title: "Sequences that follow up at the right moment.",
        lead: "A prospect who isn't ready yet isn't a lost prospect. We design scenarios that stay with them through to the decision, in line with GDPR.",
        steps: [
          { icon: "rgpd", title: "List & triggers", desc: "We review your list, your opt-in consents and your sending setup, then identify the useful triggers: download, key visit, inactivity, an enquiry that went nowhere." },
          { icon: "email-automation", title: "Scenarios & copywriting", desc: "We write each sequence for the prospect's phase: inform, reassure, suggest an appointment. Short, useful emails in your tone that keep the connection alive without wearing people out." },
          { icon: "ab-test", title: "Deliverability & send tests", desc: "SPF, DKIM and DMARC setup, inbox tests, then A/B tests on subject lines and content with a sample, before writing to your whole list." },
          { icon: "analytics", title: "Activation & tracking", desc: "The scenarios run on their own and each sequence has its own reporting: opens, clicks, replies, unsubscribes. We rewrite the emails that lose traction and adjust the sending pace." },
        ],
      },
      "publicite": {
        title: "Every euro of ad spend must earn its keep.",
        lead: "We start from your real numbers, not hunches. You approve every step, stay in control of the budget and see what it brings in.",
        steps: [
          { icon: "process", title: "Audit & goals", desc: "We analyse your current campaigns, your tracking, your margins and your market. A free audit: you know what works and what leaks before we even talk about a quote." },
          { icon: "ads-targeting", title: "Media plan & campaigns", desc: "Google to capture demand, Meta to create it, LinkedIn to reach decision-makers: we choose your channels, set up tracking and build campaigns and landing pages." },
          { icon: "ab-test", title: "Test budget & adjustments", desc: "We start on a test budget agreed together. Ads, audiences and bids are compared in real conditions; whatever doesn't convert is cut without delay." },
          { icon: "analytics", title: "Scaling & reporting", desc: "We increase only what's profitable and keep optimising. Clear reporting on cost per acquisition and ROAS, channel by channel, without jargon." },
        ],
      },
      "publicite/google-ads": {
        title: "Clicks that turn into enquiries.",
        lead: "On Google, the demand already exists. Our job: put you on the right searches, at the right moment, without paying for the wrong ones.",
        steps: [
          { icon: "seo", title: "Account & keyword audit", desc: "We analyse your existing account — search terms, Quality Score, wasted budget — or, if you're starting from scratch, the real demand for your keywords." },
          { icon: "landing", title: "Structure & landing pages", desc: "Search and Performance Max campaigns structured by intent and by language (FR, DE, EN), negative keywords, dedicated landing pages. Conversion tracking is in place before the first euro is spent." },
          { icon: "conversion", title: "Search terms & bids", desc: "From the first clicks, we exclude search terms that don't convert, test ads and adjust bids based on cost per conversion." },
          { icon: "next-perf", title: "Scaling up", desc: "We expand what pays off: new keywords, Shopping, YouTube where relevant. Reporting compares Google conversions with the enquiries you actually receive." },
        ],
      },
      "publicite/meta-ads": {
        title: "Capture attention, then convert it.",
        lead: "On Meta, the creative now does much of the targeting. We produce, test and retarget: every step is measured all the way to conversion.",
        steps: [
          { icon: "integration", title: "Pixel, audiences & content", desc: "We check your ad account, the pixel and Conversions API, your audiences and your existing content. Without a reliable signal, Meta's algorithm optimises blind." },
          { icon: "branding", title: "Creatives & journey", desc: "We design visuals and videos in native formats — Reels, Stories, carousels — and structure the journey: discovery, consideration, then retargeting of visitors and engaged users." },
          { icon: "ab-test", title: "Creative testing", desc: "Several hooks, visuals and formats launch in parallel. We keep those that lower the cost per result, cut the rest and build variations of the winners." },
          { icon: "analytics", title: "Amplification & tracking", desc: "The budget follows the best performers. We monitor frequency, refresh creatives before they wear out, and you track return on investment in clear reporting." },
        ],
      },
      "publicite/linkedin-ads": {
        title: "Speak to decision-makers, not all of LinkedIn.",
        lead: "In B2B, a lead is only worth something if it moves through your pipeline. We target by account and by job function, then measure all the way to the sales meeting.",
        steps: [
          { icon: "strategy", title: "Ideal client & accounts", desc: "Together, we define your ideal client: job functions, seniority, sectors, company size. For ABM, we build the list of your strategic accounts in Luxembourg and the Greater Region." },
          { icon: "smart-forms", title: "Formats & CRM connection", desc: "Sponsored content, documents, pre-filled Lead Gen Forms: each format serves a stage of the sales cycle. Insight Tag and CRM connection are set up from the start." },
          { icon: "leads", title: "Lead qualification", desc: "We judge campaigns on lead quality, not cost per click. With your sales team's feedback, we filter out off-target profiles and refine audiences and messages." },
          { icon: "funnel", title: "Pipeline measurement", desc: "We focus the budget on the accounts and messages that generate meetings. Reporting tracks cost per lead and pipeline contribution, backed by CRM data." },
        ],
      },
      "branding-design": {
        title: "A brand thought through before it's drawn.",
        lead: "From positioning to delivered files, a clear framework: you approve every step, we refine with you, and your brand speaks with one voice, everywhere.",
        steps: [
          { icon: "process", title: "Brand diagnosis", desc: "We study your starting point, your competitors and your audiences in Luxembourg. A free audit: we identify what's blurring your image before we even talk about a quote." },
          { icon: "brand-identity", title: "Bespoke design", desc: "Strategy, name, logo, full identity or print materials: we design what you need. Every proposal is reasoned and tied to your positioning; nothing is left to chance." },
          { icon: "ab-test", title: "Refinement & sign-off", desc: "We refine the chosen direction through back-and-forth with you until every element is right. Nothing is finalised without your sign-off." },
          { icon: "guidelines", title: "Delivery & roll-out", desc: "All your files are delivered, source files included, with their usage rules. Then we help you roll out your brand on every new medium, without losing consistency." },
        ],
      },
      "branding-design/creation-de-logo": {
        title: "From brief to a logo that holds up everywhere.",
        lead: "A logo is judged in use, not on a mock-up. We root it in your business, refine it with you and deliver it ready for all your materials.",
        steps: [
          { icon: "branding", title: "Brief & immersion", desc: "We get to grips with your business, your clients, your competitors and what your logo needs to express. A precise brief avoids off-target directions and pointless back-and-forth." },
          { icon: "logo", title: "Original concepts", desc: "Several distinct directions, drawn for you, never pulled from a symbol library. Each concept is presented in context, with the intent behind it." },
          { icon: "ab-test", title: "Refinement & legibility", desc: "Curves, proportions, spacing: the chosen direction is refined with you, then tested as a favicon, at large size, in monochrome, on light and dark backgrounds." },
          { icon: "responsive", title: "Logo pack delivery", desc: "You receive the full pack — colour, monochrome, vector, web, print, favicon — and a mini usage guide. The logo is entirely yours, source files included." },
        ],
      },
      "branding-design/identite-visuelle": {
        title: "From logo to guidelines, everything fits together.",
        lead: "An identity is only worth something if it's applied the same way everywhere. We build the system, then set its rules for your teams and suppliers.",
        steps: [
          { icon: "process", title: "Inventory & workshop", desc: "We review your existing materials and your competitors', then, in a workshop, define together the visual territory to claim, based on your values and your audiences." },
          { icon: "brand-identity", title: "Logo & visual system", desc: "Logo, palette, typographic hierarchy, iconography, patterns, photo style: we design each piece in relation to the others, for a coherent system, not a collection of isolated elements." },
          { icon: "responsive", title: "Real-world mock-ups", desc: "We apply the system to your real use cases — stationery, website, social media, presentations — and adjust with you anything lacking contrast, legibility or consistency." },
          { icon: "guidelines", title: "Guidelines & asset library", desc: "The brand guidelines set the rules — clear space, minimum sizes, HEX, CMYK and Pantone codes, forbidden uses — and your assets arrive organised. A living document, expanded with every new medium." },
        ],
      },
      "branding-design/supports-print": {
        title: "Every piece designed, every file compliant.",
        lead: "A printed piece can't be corrected after the fact. We scope, design and check every file so it goes to the printer of your choice with no rework.",
        steps: [
          { icon: "process", title: "Specifications", desc: "We list your materials — uses, formats, content — and your printer's technical constraints if already chosen. We also check that your identity is ready to be rolled out." },
          { icon: "branding", title: "Design & layout", desc: "Business cards, stationery, brochures, reports, signage: each piece is laid out in line with your identity, with a clear hierarchy that serves the message." },
          { icon: "ab-test", title: "Proofreading & prepress check", desc: "You proofread and approve every mock-up. Then the files go through a prepress check: bleed, CMYK, image resolution, fonts, crop marks." },
          { icon: "print", title: "Files & templates", desc: "Compliant HD PDFs, technical specifications for the printer of your choice and reusable templates: your next editions are prepared without starting from scratch." },
        ],
      },
      "automatisation-ia": {
        title: "Automate what matters, not everything.",
        lead: "We start from your real processes, not a trendy tool. The goal: take low-value work off your teams' plates without weakening what already works.",
        steps: [
          { icon: "process", title: "Process mapping", desc: "A free audit: we list your repetitive tasks, who does them, how often and in which tools, then prioritise what will truly save you time." },
          { icon: "automation", title: "Bespoke design", desc: "We choose the stack that fits your existing tools, configure workflows, integrations and AI assistants, and document every scenario so your teams can still follow it." },
          { icon: "ab-test", title: "Real-case testing", desc: "We run each automation on your real data, edge cases included, and check access rights and GDPR compliance. Your teams approve before anything goes into production." },
          { icon: "analytics", title: "Activation & monitoring", desc: "We activate the scenarios, monitor runs and errors, and measure the time actually freed up. Your teams are trained, and the documentation is yours." },
        ],
      },
      "automatisation-ia/chatbots-ia": {
        title: "A chatbot that guides, at any hour.",
        lead: "A good chatbot never leaves a visitor without a next step. Yours leads the conversation step by step, speaks the visitor's language and knows when to hand over to your team.",
        steps: [
          { icon: "leads", title: "Questions & journey", desc: "We list the questions you receive on your site, by email and on your messaging apps, then map out the journey with you: what the bot handles on its own, what it qualifies and what it passes on." },
          { icon: "chatbot", title: "Scenarios, tone & calendar", desc: "We write every step of the conversation in your tone, connect the bot to your calendar for appointment booking and handle the data collected in line with GDPR." },
          { icon: "multilingual", title: "Testing in FR, DE and EN", desc: "We run through every scenario in all three languages, edge cases included, and correct any imprecise answer. You approve before go-live." },
          { icon: "analytics", title: "Launch & improvement", desc: "The bot is deployed on your site, WhatsApp or Messenger. We read the conversations, spot the requests that fall outside the journey and expand the scenarios." },
        ],
      },
      "automatisation-ia/integrations-crm-api": {
        title: "One single source of truth for your data.",
        lead: "A sync that breaks silently does more damage than double entry. We connect, test, then monitor every flow over time.",
        steps: [
          { icon: "process", title: "Data flow audit", desc: "We inventory your tools, their APIs and every piece of data moving between them. We spot double entry, silos and fields that don't match from one software to another." },
          { icon: "integration", title: "Mapping & connectors", desc: "We define which tool is the reference for each piece of data, align the fields, then plug in existing connectors or build a bespoke integration via API and webhooks." },
          { icon: "rgpd", title: "Testing & security", desc: "We stress-test every sync outside production: duplicates, empty fields, API errors. Access limited to the strict minimum, secure connections, data handled in compliance with GDPR." },
          { icon: "automation", title: "Monitored go-live", desc: "Gradual go-live, then monitoring: every sync error triggers an alert so it's fixed fast. You receive documentation of your data flows and access rights." },
        ],
      },
    },
    // Honest "guarantees / engagements" band — no invented client metrics.
    proof: {
      eyebrow: "Our commitments",
      title: "What we guarantee you, in black and white.",
      lead: "No magic promises. Concrete commitments, kept on every project.",
      items: [
        { icon: "guarantee", value: "Free audit", label: "Before any quote", desc: "A free diagnosis of your situation, with no commitment." },
        { icon: "rgpd", value: "100% yours", label: "Code, content, access", desc: "You fully own it. No lock-in, ever." },
        { icon: "multilingual", value: "FR · DE · EN · LU", label: "Natively multilingual", desc: "Built for the Luxembourg market and the Greater Region." },
        { icon: "analytics", value: "Clear reporting", label: "Total transparency", desc: "Every euro spent is tied to a measurable result." },
      ],
    },
    // Per-page "Nos engagements", keyed by "slug" or "slug/child"; `image` is a photo in
    // public/engagements (no extension). Pages missing here use `proof` above.
    proofs: {
      "sites-web": {
        title: "What every site includes, in black and white.",
        lead: "No magic promises. Whatever the pack, these commitments are part of every website project.",
        items: [
          { image: "code", value: "100% yours", label: "Code, content, access", desc: "You remain the owner of your site. No lock-in, even if you change agency." },
          { image: "sites-web-2", value: "Hosting included", label: "In every pack", desc: "First-year domain on us, high-speed hosting and an SSL certificate for HTTPS." },
          { image: "sites-web-3", value: "3 months of support", label: "You're not on your own", desc: "Technical support included for the first three months, whatever the pack." },
          { image: "sites-web-4", value: "100% bespoke", label: "Zero templates", desc: "Every site is designed and built for your business, never adapted from a template." },
        ],
      },
      "sites-web/site-vitrine": {
        title: "What every site includes, in black and white.",
        lead: "No magic promises. Whatever the pack, these commitments are part of every website project.",
        items: [
          { image: "code", value: "100% yours", label: "Code, content, access", desc: "You remain the owner of your site. No lock-in, even if you change agency." },
          { image: "sites-web-2", value: "Hosting included", label: "In every pack", desc: "First-year domain on us, high-speed hosting and an SSL certificate for HTTPS." },
          { image: "sites-web-3", value: "3 months of support", label: "You're not on your own", desc: "Technical support included for the first three months, whatever the pack." },
          { image: "sites-web-4", value: "100% bespoke", label: "Zero templates", desc: "Every site is designed and built for your business, never adapted from a template." },
        ],
      },
      "sites-web/site-e-commerce": {
        title: "From basket to payment, our commitments in writing.",
        lead: "An online store is judged on its sales. Here's what we put in place on every e-commerce project.",
        items: [
          { image: "sites-web-site-e-commerce-1", value: "Luxembourg VAT", label: "Payments configured", desc: "Secure payment methods and Luxembourg VAT rules configured from launch." },
          { image: "sites-web-site-e-commerce-2", value: "Self-sufficient", label: "Back office & training", desc: "Products, stock and orders managed by your teams, trained on the tool, without depending on us." },
          { image: "sites-web-site-e-commerce-3", value: "Frictionless checkout", label: "From product to payment", desc: "A purchase journey designed to reduce basket abandonment, then optimised using your data." },
          { image: "reporting", value: "Sales measured", label: "E-commerce tracking", desc: "Conversions, baskets and best-performing products: a clear dashboard from go-live." },
        ],
      },
      "sites-web/landing-pages": {
        title: "What every site includes, in black and white.",
        lead: "No magic promises. Whatever the pack, these commitments are part of every website project.",
        items: [
          { image: "sites-web-landing-pages-1", value: "A single action", label: "Zero distractions", desc: "No menu, no exits: the whole page drives towards your one goal." },
          { image: "code", value: "100% yours", label: "Code, content, access", desc: "You remain the owner of your site. No lock-in, even if you change agency." },
          { image: "sites-web-2", value: "Hosting included", label: "In every pack", desc: "First-year domain on us, high-speed hosting and an SSL certificate for HTTPS." },
          { image: "sites-web-3", value: "3 months of support", label: "You're not on your own", desc: "Technical support included for the first three months, whatever the pack." },
          { image: "sites-web-4", value: "100% bespoke", label: "Zero templates", desc: "Every site is designed and built for your business, never adapted from a template." },
        ],
      },
      "sites-web/refonte-de-site": {
        title: "What every site includes, in black and white.",
        lead: "No magic promises. Whatever the pack, these commitments are part of every website project.",
        items: [
          { image: "code", value: "100% yours", label: "Code, content, access", desc: "You remain the owner of your site. No lock-in, even if you change agency." },
          { image: "sites-web-2", value: "Hosting included", label: "In every pack", desc: "First-year domain on us, high-speed hosting and an SSL certificate for HTTPS." },
          { image: "sites-web-3", value: "3 months of support", label: "You're not on your own", desc: "Technical support included for the first three months, whatever the pack." },
          { image: "sites-web-4", value: "100% bespoke", label: "Zero templates", desc: "Every site is designed and built for your business, never adapted from a template." },
        ],
      },
      "sites-web/site-multilingue": {
        title: "A real site in every language, in black and white.",
        lead: "No bolted-on translation. Concrete commitments so you truly exist in every language of your market.",
        items: [
          { image: "multilingue", value: "FR · DE · EN · LU", label: "Native languages", desc: "French, German, English; Luxembourgish and other languages on request, for the Greater Region." },
          { image: "sites-web-site-multilingue-2", value: "SEO language by language", label: "Correct hreflang markup", desc: "URLs and content optimised separately: each language captures its own searches." },
          { image: "sites-web-site-multilingue-3", value: "No raw translation", label: "Accurate in every language", desc: "Professional translation or integration of your own copy: accurate content, never word for word." },
          { image: "sites-web-site-multilingue-4", value: "Same tone, same UX", label: "Editorial consistency", desc: "A consistent tone and journey from one language to the next, adapted to each audience." },
        ],
      },
      "seo-geo": {
        title: "Google and AI: commitments, not promises.",
        lead: "No serious agency guarantees a Google ranking or an AI citation. We guarantee the method, the deliverables and transparency.",
        items: [
          { image: "audit", value: "Free SEO/GEO audit", label: "Before any quote", desc: "We tell you where you stand on Google and with AI, with no commitment." },
          { image: "seo-geo-2", value: "Google + AI, together", label: "One single project", desc: "Around 80% of best practices are shared: we don't sacrifice Google for AI." },
          { image: "seo-geo-3", value: "No magic timeline", label: "An honest schedule", desc: "First signals often within a few weeks, solid gains within a few months. We tell you upfront." },
          { image: "reporting", value: "Rankings + citations", label: "Monthly reporting", desc: "Your Google rankings and AI citations, tracked and explained in clear reporting." },
        ],
      },
      "seo-geo/seo": {
        title: "On Google, what we promise and what we won't.",
        lead: "Google's algorithm isn't up for negotiation. We commit to what's in our hands: technical foundations, content, monthly tracking.",
        items: [
          { image: "seo-geo-seo-1", value: "No #1 promised", label: "Honesty first", desc: "A guaranteed ranking is a sales pitch, not a commitment. We show you the progress." },
          { image: "code", value: "Sound technical base", label: "Technical SEO", desc: "Speed, structure, indexing: we fix what's holding back your rankings at the root." },
          { image: "multilingue", value: "FR · DE · EN", label: "Keywords per language", desc: "A keyword plan built for each of the Luxembourg market's three languages." },
          { image: "reporting", value: "Traffic and conversions", label: "Tracked every month", desc: "Rankings, traffic, conversions: you see what your SEO brings in." },
        ],
      },
      "seo-geo/geo-gso": {
        title: "Getting cited by AI: what we control.",
        lead: "Nobody can force an AI to cite you. We make your content citable and machine-readable. Then we measure.",
        items: [
          { image: "code", value: "Schema.org + llms.txt", label: "Delivered on your site", desc: "Structured data and an llms.txt file installed, so the models can read your offer." },
          { image: "seo-geo-geo-gso-2", value: "Verifiable facts", label: "Citable content", desc: "Clear answers and local context: we structure your pages to be picked up as a source." },
          { image: "multilingue", value: "FR · DE · EN", label: "Cited in every language", desc: "Your answers structured in French, German and English, so you're picked up whatever the language of the question." },
          { image: "seo-geo-geo-gso-4", value: "Method, not magic", label: "An emerging field", desc: "GEO moves fast: we test, we measure and we tell you frankly what works." },
        ],
      },
      "seo-geo/seo-local": {
        title: "Profile, reviews, contact details: every local signal worked on.",
        lead: "A spot in the local pack can't be promised. We make your profile complete, your contact details consistent and your reviews monitored.",
        items: [
          { image: "seo-geo-seo-local-1", value: "No empty fields", label: "Google Business Profile", desc: "Categories, services, photos, hours: a fully completed profile that stays in your name." },
          { image: "seo-geo-seo-local-2", value: "Same contact details", label: "Citations & NAP", desc: "Consistent name, address and phone number across local directories: citations cleaned up or created." },
          { image: "seo-geo-seo-local-3", value: "QR code with your logo", label: "Easier Google reviews", desc: "We create your custom QR code with your logo: your clients scan it and leave their Google review in seconds." },
          { image: "multilingue", value: "FR/DE/EN local pages", label: "Luxembourg & cross-border", desc: "Local landing pages and LocalBusiness markup, for every language your clients speak." },
        ],
      },
      "lead-generation": {
        title: "A measurable lead system, not a promise.",
        lead: "No lead volume promised blindly. We commit to what we control: the method, the measurement, the optimisation.",
        items: [
          { image: "lead-generation-1", value: "Goals set together", label: "Matched to your market", desc: "Together, we set realistic goals, then optimise the system until it performs." },
          { image: "lead-generation-2", value: "Qualified leads", label: "Qualification & scoring", desc: "Every enquiry is qualified automatically: your sales team handles the most promising ones first." },
          { image: "audit", value: "Your site before ads", label: "Ad budget optional", desc: "We first maximise what your site already captures. Advertising accelerates; it doesn't compensate." },
          { image: "reporting", value: "Visible cost per lead", label: "Status report", desc: "A regular status report shows you what each lead costs and what it brings in." },
        ],
      },
      "lead-generation/tunnels-de-conversion": {
        title: "Your funnel, mapped and measured at every stage.",
        lead: "A B2B funnel isn't guesswork. We design it with you, instrument it, then improve it stage by stage.",
        items: [
          { image: "lead-generation-tunnels-de-conversion-1", value: "Funnel mapped", label: "TOFU · MOFU · BOFU", desc: "The entire journey, from first contact to quote request, mapped and approved with you." },
          { image: "lead-generation-tunnels-de-conversion-2", value: "One message per stage", label: "Aligned with each phase", desc: "Every page and every follow-up speaks to prospects according to their phase: discovery, consideration, decision." },
          { image: "reporting", value: "End-to-end tracking", label: "Tracking & attribution", desc: "Every stage is measured: you see where you win prospects and where you lose them." },
          { image: "lead-generation-tunnels-de-conversion-4", value: "Your sales cycle", label: "Built for B2B", desc: "The funnel follows your real cycle, even a long one, and leads to a quote or a call." },
        ],
      },
      "lead-generation/landing-pages-campagne": {
        title: "Every paid click lands in the right place.",
        lead: "Your ad makes a promise. The page keeps it: same audience, same message, a single expected action.",
        items: [
          { image: "lead-generation-landing-pages-campagne-1", value: "1 campaign = 1 page", label: "Aligned message", desc: "Each page follows on exactly from its ad. No sending visitors to a generic page on your site." },
          { image: "lead-generation-landing-pages-campagne-2", value: "Mobile first", label: "Fast on smartphones", desc: "Every page is designed for mobile, where most of your campaign traffic comes from." },
          { image: "reporting", value: "Tracking included", label: "Every conversion counted", desc: "Forms, calls and appointments tracked from go-live, linked to their campaign." },
          { image: "lead-generation-landing-pages-campagne-4", value: "Optimised if needed", label: "After launch", desc: "If a page converts less than expected, we adjust it: headline, offer or form, until it performs." },
        ],
      },
      "lead-generation/email-marketing-automation": {
        title: "Compliant, polished, well-paced sequences.",
        lead: "Automation should neither end up in spam nor run on empty: we build it on consent, deliverability and good timing.",
        items: [
          { image: "lead-generation-email-marketing-automation-1", value: "Opt-in only", label: "GDPR by design", desc: "Only contacts who have given consent receive your emails, with a clear unsubscribe link in every send." },
          { image: "code", value: "SPF · DKIM configured", label: "Careful deliverability", desc: "The technical setup is designed to reach the inbox, not the spam folder." },
          { image: "lead-generation-email-marketing-automation-3", value: "Sent at the right time", label: "Triggered sequences", desc: "Each email goes out when it's useful: after a download, a key visit or a long silence from the prospect." },
          { image: "multilingue", value: "Copywriting included", label: "Copy, design, languages", desc: "We write and format every email in your sequences, in FR, DE or EN." },
        ],
      },
      "publicite": {
        title: "Every euro of ad spend, measured and justified.",
        lead: "No ROAS promised upfront. Clear rules on Google, Meta and LinkedIn, kept on every campaign.",
        items: [
          { image: "audit", value: "Free audit", label: "Before any quote", desc: "A free diagnosis of your market and your goals, with no commitment." },
          { image: "reporting", value: "Conversions tracked", label: "Set up by us", desc: "Without reliable tracking, optimisation is impossible. Every euro spent is tied to a result." },
        ],
      },
      "publicite/google-ads": {
        title: "On Google, we buy intent, not volume.",
        lead: "Your clients are already looking for a solution. We put you in front of them at that moment, with a page built to convert.",
        items: [
          { image: "publicite-google-ads-1", value: "Intent first", label: "Search & Performance Max", desc: "Campaigns structured to show up on the searches that convert, not for the merely curious." },
          { image: "publicite-google-ads-2", value: "Dedicated landing page", label: "When it's needed", desc: "If no page on your site matches the ad, we create a dedicated landing page to turn the paid click into an enquiry." },
          { image: "multilingue", value: "FR · DE · EN keywords", label: "Your clients, their language", desc: "In Luxembourg, your clients search in three languages. Your campaigns cover all three." },
          { image: "publicite-google-ads-4", value: "Clicks from launch", label: "Learning phase, upfront", desc: "The first weeks are for learning and optimising. We tell you before, not after." },
        ],
      },
      "publicite/meta-ads": {
        title: "Stop the scroll, then measure what it brings in.",
        lead: "Nobody searches for your product on Instagram. Attention-grabbing creatives, tested, with a visible cost per result.",
        items: [
          { image: "publicite-meta-ads-1", value: "Bespoke creatives", label: "Visuals and videos", desc: "We create your ad visuals and videos, or adapt your existing content." },
          { image: "publicite-meta-ads-2", value: "Ongoing A/B testing", label: "The numbers decide", desc: "Several visuals and messages tested in parallel: we keep what performs and cut the rest." },
          { image: "publicite-meta-ads-3", value: "Chosen placements", label: "Based on your audience", desc: "Facebook, Instagram, Threads or Audience Network: we choose based on your audience and your goals." },
          { image: "reporting", value: "Cost per result", label: "Beyond the likes", desc: "Clear reporting on cost per result and return on investment." },
        ],
      },
      "publicite/linkedin-ads": {
        title: "The right decision-makers, tracked all the way to your pipeline.",
        lead: "Clicks cost more on LinkedIn. We start on a test budget and measure the lead, not the click.",
        items: [
          { image: "publicite-linkedin-ads-1", value: "Targeted decision-makers", label: "Down to named accounts", desc: "Job function, seniority, sector, company size, and your named strategic accounts through ABM." },
          { image: "publicite-linkedin-ads-2", value: "Lead Gen Forms", label: "Pre-filled forms", desc: "Decision-makers send you their details without leaving LinkedIn or retyping anything." },
          { image: "reporting", value: "Tracked into your CRM", label: "Cost per lead measured", desc: "Every lead is linked to your CRM: you see its cost and its contribution to the pipeline." },
          { image: "multilingue", value: "LU + Greater Region", label: "Local focus", desc: "Campaigns designed for decision-makers in Luxembourg and the Greater Region." },
        ],
      },
      "branding-design": {
        title: "What we guarantee your brand, in black and white.",
        lead: "No generic logo, no files held back. Concrete commitments, kept on every brand project.",
        items: [
          { image: "audit", value: "Free audit", label: "Before any quote", desc: "A free diagnosis of your current image: what serves your brand and what holds it back." },
          { image: "branding-design-2", value: "Zero templates", label: "Crafted by hand", desc: "A logo and identity designed for you, never a template seen a thousand times." },
          { image: "branding-design-3", value: "100% yours", label: "Logo & source files", desc: "Vector, colour, black & white, web and print: everything is delivered, everything is yours." },
          { image: "branding-design-4", value: "Beauty that works", label: "Built to convert", desc: "Every visual choice aims for clarity, trust and action. Never beauty for beauty's sake." },
        ],
      },
      "branding-design/creation-de-logo": {
        title: "A logo that's truly you, and truly yours.",
        lead: "Your logo is often the only thing people remember about you. Here's what we commit to delivering.",
        items: [
          { image: "branding-design-creation-de-logo-1", value: "Several directions", label: "Original concepts", desc: "Distinct concepts, hand-drawn for you. Never retouched templates." },
          { image: "branding-design-creation-de-logo-2", value: "Refined together", label: "Back-and-forth", desc: "The chosen direction, reworked with you. The goal: a logo you love." },
          { image: "branding-design-creation-de-logo-3", value: "Legible everywhere", label: "Tested on every medium", desc: "Checked at small and large sizes, on light and dark backgrounds, on screen and on paper." },
          { image: "branding-design-creation-de-logo-4", value: "Full ownership", label: "Source files delivered", desc: "Vector, web, print, favicon: all the files are yours, with no royalties or hidden fees." },
        ],
      },
      "branding-design/identite-visuelle": {
        title: "A consistent brand, with rules in black and white.",
        lead: "Logo, colours, typefaces, guidelines: everything is defined, documented and delivered, so everyone applies your brand without hesitation.",
        items: [
          { image: "branding-design-identite-visuelle-1", value: "Logo included", label: "The heart of the identity", desc: "Designed for you, or built on your existing logo and refreshed if needed." },
          { image: "branding-design-identite-visuelle-2", value: "RGB · CMYK · Pantone", label: "No guesswork on colour", desc: "Every colour defined in HEX, RGB, CMYK and Pantone, for screen and print alike." },
          { image: "branding-design-identite-visuelle-3", value: "PDF brand guidelines", label: "Written usage rules", desc: "Clear space, minimum sizes, forbidden uses: no more room for interpretation." },
          { image: "branding-design-identite-visuelle-4", value: "Organised assets", label: "Ready for your teams", desc: "All your source files organised and accessible, for your teams and your suppliers alike." },
        ],
      },
      "branding-design/supports-print": {
        title: "Materials that reflect you, files without a flaw.",
        lead: "Print reassures your clients. We design every piece with the same care as your website, right down to the final file.",
        items: [
          { image: "branding-design-supports-print-1", value: "Print-ready", label: "Compliant files", desc: "Bleed, CMYK, crop marks, colour profiles: files accepted with no rework." },
          { image: "branding-design-supports-print-2", value: "Technical spec sheet", label: "For your printer", desc: "The specifications to send to the printer of your choice, for a result with no nasty surprises." },
          { image: "branding-design-supports-print-3", value: "True to your brand", label: "Guidelines respected", desc: "Every piece extends your identity, whether we created it or you already have brand guidelines." },
          { image: "branding-design-supports-print-4", value: "Reusable templates", label: "Built for what's next", desc: "Templates and variations delivered with your files: your next edition doesn't start from scratch." },
        ],
      },
      "automatisation-ia": {
        title: "Automate, yes. Lose control, never.",
        lead: "No AI project that gets bogged down. Concrete commitments, from the free audit to the documentation we hand over.",
        items: [
          { image: "audit", value: "Free audit", label: "Before any quote", desc: "We identify, free of charge, the tasks in your business that are truly worth automating." },
          { image: "automatisation-ia-2", value: "One use case first", label: "Then we expand", desc: "We start with one measurable task, then extend only what proves its worth." },
          { image: "automatisation-ia-3", value: "GDPR by design", label: "Privacy first", desc: "Every automation is designed in line with GDPR and the confidentiality of your data." },
          { image: "code", value: "Documentation handed over", label: "No black box", desc: "Every workflow is documented: you know what's running, where and why." },
        ],
      },
      "automatisation-ia/chatbots-ia": {
        title: "A bot that responds, with your team as backup.",
        lead: "A visitor left without an answer leaves. Here's what we commit to delivering on every chatbot.",
        items: [
          { image: "multilingue", value: "FR · DE · EN", label: "Language detected", desc: "The bot detects the visitor's language and leads the conversation in FR, DE or EN." },
          { image: "automatisation-ia-chatbots-ia-2", value: "Bespoke journeys", label: "Your tone, your questions", desc: "We write every step of the conversation with you: questions, answers and suggested choices, in your tone." },
          { image: "automatisation-ia-chatbots-ia-3", value: "Human handover", label: "For complex cases", desc: "When an enquiry falls outside the planned journey, the bot passes it to your team with the full context of the exchange." },
          { image: "reporting", value: "Conversations tracked", label: "Tracking & optimisation", desc: "We analyse real exchanges to enrich the journeys and fine-tune the tone." },
        ],
      },
      "automatisation-ia/integrations-crm-api": {
        title: "Your tools finally connected, without rebuilding everything.",
        lead: "Double entry, leads lost between two tools. Here's how we connect your stack, cleanly and securely.",
        items: [
          { image: "automatisation-ia-integrations-crm-api-1", value: "Your stack, kept", label: "We build on what exists", desc: "We connect the tools your teams already use, without forcing you to switch." },
          { image: "automatisation-ia-integrations-crm-api-2", value: "Bespoke API work", label: "When no connector exists", desc: "No off-the-shelf connector? We build the integration via the API or webhooks." },
          { image: "code", value: "Controlled access", label: "GDPR-compliant sync", desc: "Secure connections and fine-grained access management, in line with GDPR." },
          { image: "reporting", value: "Tested, then monitored", label: "Before and after launch", desc: "Every integration is tested before going live, documented, then monitored." },
        ],
      },
    },
  },
  serviceContent: {
    "sites-web": {
      // headline of the hero laser animation (kept apart from the page title)
      motionTitle: "Websites that convert",
      motionEyebrow: "Bespoke",
      intro: [
        "Your site is often the first — sometimes the only — meeting with a client. We design it like a salesperson who works 24/7: fast, clear, action-driven.",
        "We build everything bespoke: ultra-fast, secure and AI-ready. And yes: a large part of our production is AI-accelerated — more quality, delivered faster.",
      ],
      included: [
        { icon: "ai-build", title: "Built with AI", desc: "We accelerate design and development with AI, never sacrificing quality or consistency." },
        { icon: "process", title: "Managed updates", desc: "Content, security, improvements: we handle your site's updates so you can stay focused on your business." },
        { icon: "next-perf", title: "Performance", desc: "For bespoke work, a near-instant, secure site built for SEO and GEO." },
        { icon: "responsive", title: "100% responsive", desc: "A flawless experience on mobile, tablet and desktop — mobile first." },
        { icon: "conversion", title: "Built to convert", desc: "Every page has a goal: generate a call, a quote, a lead. We guide the visitor to action." },
        { icon: "smart-forms", title: "Smart forms", desc: "Multi-step forms that qualify your prospects and lift the response rate." },
      ],
      deliverables: [
        "Bespoke mockups and design signed off with you",
        "100% bespoke site",
        "Baseline SEO & GEO optimisation built in",
        "Forms, tracking and go-live included",
      ],
      faq: [
        { q: "Why bespoke rather than a template?", a: "Bespoke offers the best performance, security and flexibility: your site is designed for your business, not adapted from a template seen a thousand times." },
        { q: "What does \"built with AI\" mean?", a: "We use AI to accelerate design, code and content. The result: a higher-quality site, delivered faster and with better value for money — reviewed and finalised by humans." },
        { q: "Will my site be optimised for Google and AI?", a: "Yes. We build in SEO and GEO best practices from the start: structure, performance, structured data and citable content." },
      ],
      packsIncluded: {
        eyebrow: "Everything's included",
        title: "What do all our packs include?",
        lead: "Whichever pack you choose, you always get these essential features.",
        items: [
          { icon: "server", title: "Domain & hosting", desc: "First year of domain on us, with high-speed hosting included." },
          { icon: "responsive", title: "100% responsive", desc: "A perfect fit on every screen to capture leads on mobile, tablet and desktop." },
          { icon: "seo", title: "Future-proof SEO", desc: "Optimised for classic search engines and conversational search (GEO) — found on Google and cited by AI." },
          { icon: "contact", title: "Contact form", desc: "Receive messages straight to your inbox (Landing Page & Site S)." },
          { icon: "smartforms", title: "Smart forms", desc: "Multi-step contact and quote forms, built to maximise conversions and capture qualified leads (Site M, L, XL & bespoke)." },
          { icon: "ssl", title: "SSL certificate", desc: "Secure HTTPS connection to protect your visitors and reassure Google." },
          { icon: "support", title: "Technical support", desc: "Technical assistance included for the first 3 months." },
          { icon: "analytics", title: "Built-in analytics", desc: "Full tracking of conversions and user behaviour for continuous optimisation." },
          { icon: "speed", title: "Optimised speed", desc: "Ultra-fast loading for a better experience and better rankings." },
        ],
        moreTitle: "And much more…",
        moreText: "Every project is unique. We can add the features you need: blog, gallery, online booking, social media integration, and more.",
        ctaLabel: "Let's talk about your project",
      },
    },
    "seo-geo": {
      intro: [
        "Being visible is no longer enough: you have to be found on Google and cited by generative AI. We work both fronts at once because, in our experience, around 80% of the best practices are shared.",
        "Technical audit, structured content and machine-readable data: we build a presence that performs today on Google and tomorrow in the answers of ChatGPT, Perplexity and Google AI.",
      ],
      included: [
        { icon: "seo", title: "Technical & editorial SEO", desc: "Full audit, on-page optimisation, speed and content that truly answers search intent." },
        { icon: "geo-citation", title: "GEO / GSO", desc: "We structure your content to be picked up and cited as a source by AI answer engines." },
        { icon: "multilingual", title: "Multilingual FR/DE/EN", desc: "SEO designed for the three languages of the Luxembourg market." },
        { icon: "analytics", title: "Tracking & citations", desc: "Tracking of Google rankings and citations in AI answers, with clear reporting." },
      ],
      deliverables: [
        "Full technical & semantic audit",
        "Content plan and on-page optimisations",
        "Structured data (Schema.org) & llms.txt",
        "Monthly reporting on rankings + AI citations",
      ],
      faq: [
        { q: "What's the difference between SEO and GEO?", a: "SEO puts you in Google's list of results; GEO puts you in the answer generated by an AI. We optimise for both." },
        { q: "How long until we see results?", a: "SEO/GEO is foundational work: the first signals often appear within a few weeks, solid gains within a few months. We show you the progress at every step." },
      ],
    },
    "lead-generation": {
      intro: [
        "A beautiful site that generates no contacts is an expense. We turn it into an acquisition system: a steady, predictable flow of qualified requests.",
        "Optimised site, landing pages per campaign, qualification and automation: every link is designed to fill your calendar with prospects, without you having to prospect yourself.",
      ],
      included: [
        { icon: "leads", title: "Lead capture", desc: "Funnels and forms built to capture as many qualified contacts as possible." },
        { icon: "conversion", title: "Optimised funnels", desc: "A clear visitor → lead → client journey, continuously optimised to reduce drop-off." },
        { icon: "smart-forms", title: "Qualification & scoring", desc: "We qualify leads automatically so your sales team focuses on the best ones." },
        { icon: "analytics", title: "Cost-per-lead reporting", desc: "Transparent tracking of cost per lead and return on investment." },
      ],
      deliverables: [
        "Bespoke conversion funnels",
        "Landing pages per campaign",
        "Qualification & scoring system",
        "Cost-per-lead & ROI dashboard",
      ],
      faq: [
        { q: "Do you guarantee a number of leads?", a: "We don't sell magic promises: we build a measurable system and optimise it until it performs. Goals are set together, based on your market." },
        { q: "Do I need an advertising budget?", a: "Not always. Some leads can come from SEO/GEO and content. Advertising accelerates things, but we start by maximising what your site can already capture." },
      ],
    },
    publicite: {
      intro: [
        "Paid advertising is immediate visibility — provided you spend your budget where it pays off. We drive your campaigns with data, not gut feel.",
        "Google Ads, Meta, LinkedIn: we target the right people, we test, and we optimise continuously to lower cost per acquisition and raise ROAS.",
      ],
      included: [
        { icon: "ads-targeting", title: "Precise targeting", desc: "The right audiences, on the right channels, with the right message at the right time." },
        { icon: "next-perf", title: "Google Ads & Performance Max", desc: "Search and Performance Max campaigns structured for profitability." },
        { icon: "conversion", title: "Dedicated landing pages", desc: "Landing pages designed to turn the paid click into a lead." },
        { icon: "analytics", title: "ROAS optimisation", desc: "Conversion tracking and continuous adjustments to maximise return." },
      ],
      deliverables: [
        "Campaign strategy and structure",
        "Ad creative (Google, Meta, LinkedIn)",
        "Conversion-optimised landing pages",
        "ROAS reporting and continuous optimisation",
      ],
      faq: [
        { q: "What minimum budget should I plan for?", a: "It depends on your sector and your goal. We define a test budget together, measure, then scale only what's profitable." },
        { q: "Do you also handle conversion tracking?", a: "Yes. Without reliable tracking, optimisation is impossible. We set up conversion tracking and tie every euro spent to a result." },
      ],
    },
    "branding-design": {
      intro: [
        "Your logo is the first thing people remember about you. We design it bespoke so it's unique, memorable and true to who you are — not a template seen a thousand times.",
        "Beyond the logo, we build a complete visual identity: colours, typography, usage rules. A brand that stays consistent everywhere, from website to print, and builds trust before the first word.",
      ],
      included: [
        { icon: "branding", title: "Bespoke logo", desc: "A unique, hand-crafted logo, delivered in every format you'll ever need." },
        { icon: "ai-build", title: "Visual identity", desc: "Colour palette, typography and graphic elements that make your brand recognisable." },
        { icon: "responsive", title: "Brand guidelines", desc: "A clear guide to usage rules to keep your brand consistent everywhere, over time." },
        { icon: "conversion", title: "Print & digital variations", desc: "Business cards, signatures, social media, materials… your brand applied to everything." },
      ],
      deliverables: [
        "Bespoke logo (all formats: colour, black & white, vector)",
        "Visual identity: colours & typography",
        "Brand guidelines & usage rules",
        "Print and digital variations",
      ],
      faq: [
        { q: "Do you create a logo from scratch or evolve the existing one?", a: "Both. We can create a logo and an identity from A to Z, or refresh yours while keeping what already works and what you're known for." },
        { q: "Which files do I receive?", a: "You receive your logo in every useful format (vector, colour, black & white, web and print versions) — and you fully own it." },
        { q: "Does the design account for conversion?", a: "Always. We don't do beauty for beauty's sake: every visual choice serves clarity, trust and action." },
      ],
    },
    "automatisation-ia": {
      intro: [
        "Are your teams spending too much time on repetitive tasks? We automate them. More results, less friction — and faster responses to your clients.",
        "Automated workflows, integrations between your tools and bespoke AI agents: we connect your stack and put AI to work where it truly saves you time.",
      ],
      included: [
        { icon: "automation", title: "Workflow automation", desc: "We remove repetitive manual tasks: follow-ups, synchronisation, notifications." },
        { icon: "ai-build", title: "AI agents & assistants", desc: "Bespoke AI assistants trained on your context and your processes." },
        { icon: "smart-forms", title: "CRM & tool integrations", desc: "We connect your site, your CRM and your tools for a smooth data flow." },
        { icon: "analytics", title: "Smart chatbots", desc: "Widgets and chatbots that answer, qualify and guide your visitors 24/7." },
      ],
      deliverables: [
        "Mapping of processes to automate",
        "Configured workflows and integrations",
        "Bespoke AI agent/assistant",
        "Documentation and support",
      ],
      faq: [
        { q: "Will AI replace my teams?", a: "No — it relieves them. We automate low-value tasks so your teams can focus on what matters: your clients." },
        { q: "Is my data safe?", a: "Yes. We design automations in compliance with GDPR and with strong attention to the confidentiality of your data." },
      ],
    },
  },

  portfolio: {
    typewriter: [
      "Build your digital presence",
      "Craft unique experiences",
      "Grow your business online",
      "Stand out from the crowd",
      "Connect with your customers",
    ],
    // Coverflow slides: generic mockups (public/portfolio/mockup-<slug>.webp), one per deliverable type.
    items: [
      { slug: "site-vitrine-garage", name: "Showcase website · Car garage" },
      { slug: "logo-menuiserie", name: "Logo · Carpentry" },
      { slug: "landing-immobilier", name: "Landing page · Real estate" },
      { slug: "identite-cafe", name: "Visual identity · Café" },
      { slug: "site-cabinet", name: "Multilingual website · Law firm" },
      { slug: "charte-graphique", name: "Brand guidelines · SME" },
      { slug: "campagne-solaire", name: "Ad campaign · Solar panels" },
    ],
    cta: "Let's work together",
    prev: "Previous project",
    next: "Next project",
    pause: "Pause",
    play: "Resume scrolling",
  },

  subServicesTitle: "A speciality for every need",
  subServicesLead: "This service breaks down into focused areas of expertise. Take the one that fits your need — or combine them to cover the whole field.",
  subServices: {
    publicite: [
      {
        slug: "google-ads",
        illustration: "google-ads",
        title: "Google Ads",
        tagline: "Capture demand at the exact moment it appears.",
        short:
          "Search, Performance Max, Shopping, YouTube: be there when your clients are searching, with data-driven campaigns built for profitability.",
        bullets: [
          "Search & Performance Max",
          "Shopping & YouTube Ads",
          "Dedicated landing pages",
          "Continuous ROAS optimisation",
        ],
        metaTitle: "Google Ads Agency in Luxembourg | vortx",
        metaDescription:
          "Profitable Google Ads campaigns (Search, Performance Max, Shopping, YouTube) for the Luxembourg market. Capture demand, driven by data.",
        intro: [
          "On Google, your clients aren't looking for a brand: they're looking for a solution. Google Ads puts you in front of them at the precise moment they need it — not before, not after.",
          "We structure your campaigns (Search, Performance Max, Shopping, YouTube) to capture that intent and turn it into concrete enquiries, spending your budget where it truly pays off.",
        ],
        included: [
          { icon: "ads-targeting", title: "Search & Performance Max", desc: "Structured campaigns to show up on the queries that convert." },
          { icon: "conversion", title: "Dedicated landing pages", desc: "Landing pages designed to turn a paid click into a lead." },
          { icon: "analytics", title: "Data-driven management", desc: "Reliable conversion tracking: every euro spent is tied to a result." },
          { icon: "next-perf", title: "ROAS optimisation", desc: "Continuous adjustments to bids and audiences to maximise return." },
        ],
        deliverables: [
          "Strategy & account structure",
          "Campaign setup (Search, PMax, Shopping, YouTube)",
          "Optimised landing pages",
          "ROAS reporting & continuous optimisation",
        ],
        faq: [
          { q: "What minimum budget should I plan for?", a: "It depends on your sector and the competition on your keywords. We set a test budget, measure, then scale up only what's profitable." },
          { q: "How long before we see results?", a: "The first clicks come in as soon as you launch. The first few weeks are about learning and optimising; profitability stabilises after that." },
        ],
      },
      {
        slug: "meta-ads",
        illustration: "meta-ads",
        title: "Meta Ads",
        tagline: "Create demand on Facebook, Instagram and Threads.",
        short:
          "Content that stops the scroll. Targeted Meta campaigns (Facebook, Instagram, Threads) to build your brand awareness, engage your audience and convert.",
        bullets: [
          "Facebook & Instagram Ads",
          "Threads",
          "Audiences & retargeting",
          "Content creation that converts",
        ],
        metaTitle: "Meta Ads Agency (Facebook & Instagram) in Luxembourg | vortx",
        metaDescription:
          "Meta Ads campaigns (Facebook, Instagram) for the Luxembourg market: awareness, engagement and conversions. Precise targeting, creatives that perform.",
        intro: [
          "On social media, no one is searching for your product — it's up to you to grab attention. Meta Ads (Facebook, Instagram, Threads) creates demand right where your clients spend their time.",
          "We combine precise targeting, retargeting and content creation that stops the scroll to turn a cold audience into clients, step by step.",
        ],
        included: [
          { icon: "ads-targeting", title: "Precise social targeting", desc: "The right audiences on Facebook, Instagram and Threads, at the right moment." },
          { icon: "branding", title: "Creatives that convert", desc: "Visuals and videos designed to grab attention and make people want to act." },
          { icon: "leads", title: "Retargeting & audiences", desc: "We retarget visitors and build lookalike audiences to amplify your reach." },
          { icon: "analytics", title: "Performance tracking", desc: "Clear reporting on cost per result and return on investment." },
        ],
        deliverables: [
          "Strategy & Meta campaign structure",
          "Visual and video creation",
          "Audiences, retargeting & A/B tests",
          "Reporting & continuous optimisation",
        ],
        faq: [
          { q: "Is Meta Ads only Facebook and Instagram?", a: "No: we also cover Threads and the Meta Audience Network. We pick the placements based on your target and your goals." },
          { q: "Do I need to have content already?", a: "Not necessarily. We can create the ad visuals and videos, or start from your existing content and adapt it to the format that converts." },
        ],
      },
      {
        slug: "linkedin-ads",
        illustration: "linkedin-ads",
        title: "LinkedIn Ads",
        tagline: "Reach Luxembourg's decision-makers where they decide.",
        short:
          "The most precise B2B advertising there is: target by job function, sector and company. Ideal for long sales cycles and strategic accounts in Luxembourg and the Greater Region.",
        bullets: [
          "Targeting by role, sector & company",
          "Built-in Lead Gen Forms",
          "Account-Based Marketing (ABM)",
          "Cost-per-lead & pipeline tracking",
        ],
        metaTitle: "B2B LinkedIn Ads Agency in Luxembourg | vortx",
        metaDescription:
          "B2B LinkedIn Ads campaigns for the Luxembourg market: targeting by function and company, Lead Gen Forms, ABM. Reach decision-makers, generate qualified leads.",
        intro: [
          "In B2B, you don't sell to a company: you win over people. LinkedIn Ads is the only channel that lets you target decision-makers precisely — by job function, sector, company size and even by named account.",
          "We structure your campaigns (Lead Gen Forms, sponsored content, message ads) to speak to the right people at the right moment, and we tie every lead back to your pipeline to measure real return, not just clicks.",
        ],
        included: [
          { icon: "linkedin", title: "Decision-maker targeting", desc: "By function, seniority, sector and company size — the B2B precision only LinkedIn offers." },
          { icon: "leads", title: "Lead Gen Forms", desc: "Pre-filled forms built into LinkedIn to capture qualified leads without friction." },
          { icon: "ads-targeting", title: "Account-Based Marketing", desc: "We target your named strategic accounts and the right contacts within each one." },
          { icon: "analytics", title: "Pipeline & ROI", desc: "Cost-per-lead and pipeline contribution tracking, integrated with your CRM." },
        ],
        deliverables: [
          "Targeting strategy & campaign structure",
          "Ad creative & Lead Gen Forms",
          "Tracking setup (CRM, conversions)",
          "Cost-per-lead reporting & continuous optimisation",
        ],
        faq: [
          { q: "Isn't LinkedIn Ads too expensive?", a: "The cost per click is higher than elsewhere, but so is the quality of the leads. In B2B, a single signed client often more than pays for the campaign. We start with a test budget and only scale what's profitable." },
          { q: "Do I need an active LinkedIn company page?", a: "It's a plus for credibility, but not a prerequisite to launch campaigns. We can help you bring your page up to standard in parallel." },
        ],
      },
    ],
    "seo-geo": [
      {
        slug: "seo",
        illustration: "seo",
        title: "SEO",
        tagline: "Get found on Google, for the long run.",
        short:
          "Technical and editorial search optimisation: we optimise your site to climb on the queries that matter and attract qualified traffic, without paying for the click.",
        bullets: [
          "Technical & semantic audit",
          "On-page optimisation",
          "Content & keywords",
          "Ranking tracking",
        ],
        metaTitle: "SEO Agency in Luxembourg | vortx",
        metaDescription:
          "Technical and editorial search engine optimisation (SEO) for Luxembourg businesses. Climb on Google and attract qualified traffic, for the long run.",
        intro: [
          "SEO is the art of being found on Google without paying for the click. An asset that takes a few weeks to build, but keeps attracting qualified traffic long after — unlike advertising, which stops the moment you cut the budget.",
          "We work all three pillars: the technical side (speed, structure, indexing), the content (the right keywords, search intent) and authority. All designed for the Luxembourg market and its multilingualism.",
        ],
        included: [
          { icon: "seo", title: "Audit & technical SEO", desc: "Speed, structure, indexing, data: we fix the foundations that are holding back your rankings." },
          { icon: "conversion", title: "Optimised content", desc: "Pages that genuinely match search intent and convert." },
          { icon: "multilingual", title: "Multilingual FR/DE/EN", desc: "Search optimisation designed for the three languages of the Luxembourg market." },
          { icon: "analytics", title: "Ranking tracking", desc: "Clear reporting on your rankings, your traffic and your conversions." },
        ],
        deliverables: [
          "Full technical & semantic audit",
          "Keyword plan and on-page optimisations",
          "Content recommendations",
          "Monthly ranking & traffic reporting",
        ],
        faq: [
          { q: "How long before we see results?", a: "The first signals often appear within a few weeks, solid gains within a few months. SEO is foundational work — we show you the progress at every step." },
          { q: "Is SEO enough, or do I also need ads?", a: "The two complement each other: ads bring immediate results, SEO builds lasting traffic. We advise you on the right balance based on your timeline." },
        ],
      },
      {
        slug: "geo-gso",
        illustration: "geo-gso",
        title: "GEO / GSO",
        tagline: "Be the answer the AIs cite.",
        short:
          "Generative Engine Optimization: we structure your content and your data so that ChatGPT, Perplexity and Google AI cite you as a source — not just a link.",
        bullets: [
          "Structured & citable content",
          "Structured data (Schema.org)",
          "llms.txt file",
          "AI citation tracking",
        ],
        metaTitle: "GEO / GSO Agency in Luxembourg | vortx",
        metaDescription:
          "Optimisation for generative AI (GEO/GSO): get cited by ChatGPT, Perplexity and Google AI. Structured data, citable content, citation tracking.",
        intro: [
          "More and more of your clients put their questions to an AI rather than to Google. GEO (Generative Engine Optimization) optimises your presence so that ChatGPT, Perplexity and Google AI pick you up and cite you as a source — not just as one link among many.",
          "We structure your content so it's \"citable\" (clear answers, verifiable facts, local context) and make your site machine-readable: structured data, llms.txt, clean architecture.",
        ],
        included: [
          { icon: "geo-citation", title: "Citable content", desc: "We structure your pages to be picked up and cited in the answers of generative AIs." },
          { icon: "seo", title: "Structured data", desc: "Schema.org and llms.txt: we make your offer readable and reusable by the models." },
          { icon: "ai-build", title: "AI-ready architecture", desc: "A fast, clean site, designed from the start for answer engines." },
          { icon: "analytics", title: "Citation tracking", desc: "We track where and how the AIs cite you, with clear reporting." },
        ],
        deliverables: [
          "GEO audit & content structuring",
          "Structured data (Schema.org)",
          "llms.txt file & technical optimisations",
          "Reporting on citations in AI answers",
        ],
        faq: [
          { q: "Does GEO replace SEO?", a: "No, it complements it. Around 80% of the best practices are shared: structured, reliable content performs both on Google and with the AIs. We optimise for both." },
          { q: "How do you measure GEO results?", a: "We track your presence in the answers of AI assistants (citations, mentions) and how your authority evolves. It's an emerging field: we move forward with method and transparency." },
        ],
      },
      {
        slug: "seo-local",
        illustration: "seo-local",
        title: "Local SEO & Google Business Profile",
        tagline: "Dominate the \"near me\" searches across Luxembourg.",
        short:
          "Be the obvious answer when a client searches nearby. Optimisation of your Google Business Profile, local citations and reviews to capture local demand, everywhere in the Greater Region.",
        bullets: [
          "Optimised Google Business Profile",
          "Local citations & NAP consistency",
          "Customer review strategy",
          "Multilingual LocalBusiness schema",
        ],
        metaTitle: "Local SEO & Google Business Profile Agency in Luxembourg | vortx",
        metaDescription:
          "Local SEO in Luxembourg: Google Business Profile, citations, customer reviews and local pages. Capture \"near me\" searches across the Greater Region.",
        intro: [
          "When a client searches \"plumber Luxembourg\" or \"agency near me\", Google shows a map and three listings first. If you're not there, you're invisible — even if you rank first in the classic results.",
          "Local SEO optimises your presence on that map and in the local pack: a complete Google Business Profile, consistent contact details across the web, customer reviews and technical markup. A decisive lever for retailers, tradespeople and local services in Luxembourg and across the border.",
        ],
        included: [
          { icon: "local-seo", title: "Google Business Profile", desc: "Categories, services, photos, posts and hours: a complete listing that builds trust and climbs on the map." },
          { icon: "seo", title: "Citations & NAP", desc: "Consistent name, address and phone across directories and local platforms — a key signal for Google." },
          { icon: "conversion", title: "Reviews & reputation", desc: "A customer review and response strategy to strengthen your local signals and your credibility." },
          { icon: "geo-citation", title: "Local pages & schema", desc: "Local landing pages and LocalBusiness structured data, in FR/DE/EN." },
        ],
        deliverables: [
          "Google Business Profile audit & optimisation",
          "Local citation clean-up and creation",
          "Review strategy and response templates",
          "Local pages & multilingual schema markup",
        ],
        faq: [
          { q: "Is local SEO useful if I don't have a shop?", a: "Yes, as soon as you have a service area: tradespeople, home services, independent professionals. We can set up a \"service area\" listing with no public address." },
          { q: "How long before my listing climbs?", a: "The first improvements (completeness, photos, categories) take effect within a few weeks. Consistent reviews and citations consolidate your position over a few months." },
        ],
      },
    ],
    "sites-web": [
      {
        slug: "site-vitrine",
        illustration: "site-vitrine",
        title: "Bespoke showcase site",
        tagline: "A digital showcase that builds trust from the first second.",
        short:
          "The site that presents your business, your services and your credibility — designed 100% bespoke, fast and action-driven. Your best salesperson, available 24/7.",
        bullets: [
          "100% bespoke design, zero template",
          "Architecture built for conversion",
          "Responsive & ultra-fast",
          "SEO-optimised from launch",
        ],
        metaTitle: "Showcase Website Design in Luxembourg | vortx",
        metaDescription:
          "Bespoke showcase website design for Luxembourg businesses: premium design, fast, responsive and conversion-driven. Your best salesperson, 24/7.",
        intro: [
          "Your showcase site is often a prospect's first contact with your business. Within seconds, they decide whether to trust you — or head back to Google. We design that first meeting so it plays in your favour.",
          "Bespoke design, clear structure, near-instant loading: every page showcases your expertise and guides the visitor towards action — a call, a message, a quote. Not a static catalogue, a salesperson working for you.",
        ],
        included: [
          { icon: "ai-build", title: "Bespoke design", desc: "A unique visual identity, true to you — never a recycled template seen a thousand times." },
          { icon: "conversion", title: "Built to convert", desc: "Every page has a clear goal and guides the visitor towards contact or a quote." },
          { icon: "responsive", title: "100% responsive", desc: "A flawless experience on mobile, tablet and desktop — mobile first." },
          { icon: "seo", title: "Built-in SEO", desc: "Structure, performance and data ready for Google and AI from go-live." },
        ],
        deliverables: [
          "Bespoke mockups & design signed off with you",
          "Responsive showcase site",
          "Baseline SEO & GEO optimisation",
          "Forms, tracking and go-live included",
        ],
        faq: [
          { q: "How many pages does a showcase site include?", a: "It depends on your business — often 5 to 10 pages (home, services, about, contact…). We define the clearest structure together, for your visitors and for Google." },
          { q: "Will I be able to edit the content myself?", a: "We handle the updates for you: send us your changes and we put them live." },
        ],
      },
      {
        slug: "site-e-commerce",
        illustration: "site-e-commerce",
        title: "E-commerce site",
        tagline: "From product page to payment, every pixel works for your sales.",
        short:
          "Online stores built to sell: a smooth checkout funnel, secure payments, autonomous catalogue management. A sales engine, not just a site.",
        bullets: [
          "Optimised checkout funnel",
          "Integrated payments & logistics",
          "Autonomous catalogue management",
          "Sales performance tracking",
        ],
        metaTitle: "E-commerce Website Design in Luxembourg | vortx",
        metaDescription:
          "High-performance online store creation in Luxembourg: optimised checkout funnel, secure payments, catalogue management. An e-commerce site that truly sells.",
        intro: [
          "An online store isn't judged on its catalogue, but on its conversion rate. Too many e-commerce sites lose customers between the product and the basket. We build yours to take them all the way to payment, without friction.",
          "Compelling product pages, a smooth checkout funnel, secure payments and autonomous catalogue management: we connect it all to your tools (stock, delivery, accounting) and track performance to optimise what drives sales.",
        ],
        included: [
          { icon: "ecommerce", title: "Optimised checkout funnel", desc: "From product to payment, a smooth journey designed to reduce cart abandonment." },
          { icon: "smart-forms", title: "Secure payments", desc: "Integration of payment methods and VAT rules, securely." },
          { icon: "automation", title: "Autonomous management", desc: "A clear back-office to manage products, stock and orders without depending on us." },
          { icon: "analytics", title: "Sales tracking", desc: "A dashboard of conversions, baskets and the products that perform." },
        ],
        deliverables: [
          "Responsive & secure online store",
          "Catalogue, payments and delivery configured",
          "Conversion-optimised checkout funnel",
          "E-commerce tracking & management training",
        ],
        faq: [
          { q: "Which platform do you build the store on?", a: "On a bespoke solution, built for performance and your specific needs: catalogue, payments, delivery. We advise based on your business." },
          { q: "Do you handle payments and VAT?", a: "Yes. We configure payment methods, Luxembourg VAT rules and, if needed, the connection to your logistics and accounting." },
        ],
      },
      {
        slug: "landing-pages",
        illustration: "landing-pages",
        title: "High-conversion landing pages",
        tagline: "One page, one goal, the maximum number of leads.",
        short:
          "Landing pages designed for a single action: convert. Ideal for your advertising campaigns, launches and targeted offers.",
        bullets: [
          "Designed for a single action",
          "Fast launch, mobile-first",
          "A/B testing & optimisation",
          "Connected to your campaigns",
        ],
        metaTitle: "Landing Page Design in Luxembourg | vortx",
        metaDescription:
          "High-conversion landing page creation in Luxembourg: fast, mobile-first pages optimised for your campaigns. More leads, less wasted budget.",
        intro: [
          "Sending ad traffic to your homepage is wasting budget. A landing page has a single goal and removes every distraction to drive the visitor to one precise action: fill in a form, book, download.",
          "We design fast, persuasive, mobile-first pages aligned with each campaign's message, then test and optimise them to lift the conversion rate — and lower your cost per lead.",
        ],
        included: [
          { icon: "landing", title: "A single action", desc: "Zero distraction: everything converges on the page's one goal." },
          { icon: "speed", title: "Fast & mobile-first", desc: "Near-instant loading, perfect on mobile where most paid traffic lands." },
          { icon: "ab-test", title: "A/B testing", desc: "We test headlines, visuals and forms to optimise conversion continuously." },
          { icon: "ads-targeting", title: "Connected to campaigns", desc: "Message aligned with your ad and end-to-end conversion tracking." },
        ],
        deliverables: [
          "Bespoke conversion-optimised landing page",
          "Persuasive copywriting & optimised form",
          "Conversion tracking setup",
          "A/B testing plan & recommendations",
        ],
        faq: [
          { q: "Is a landing page different from a page on my site?", a: "Yes. A site page informs and offers several paths; a landing page pursues a single goal, with no menu or distraction, to maximise the conversion of a specific campaign." },
          { q: "How long does it take to deliver a landing page?", a: "Often a few days. Our AI-accelerated production lets us launch fast, which is essential to time a campaign right." },
        ],
      },
      {
        slug: "refonte-de-site",
        illustration: "refonte-de-site",
        title: "Website redesign",
        tagline: "Turn a sleeping site into a growth engine.",
        short:
          "Is your site slow, dated or no longer converting? We rethink it from the ground up — design, performance, SEO — without losing the rankings you've earned.",
        bullets: [
          "Full UX & performance audit",
          "Migration with no SEO loss",
          "Visual & technical redesign",
          "Measurable results",
        ],
        metaTitle: "Website Redesign in Luxembourg | vortx",
        metaDescription:
          "Website redesign in Luxembourg: UX audit, new design, performance and migration with no SEO loss. Turn an outdated site into a conversion engine.",
        intro: [
          "A dated site costs more than it seems: it drives visitors away, weighs down your credibility and your rankings. A redesign isn't a simple facelift — it's the chance to start again on healthy foundations.",
          "We start with an audit (UX, performance, SEO, conversion) to understand what's blocking, then rethink design and technology. Crucially: we migrate cleanly to preserve — and often improve — your existing rankings.",
        ],
        included: [
          { icon: "redesign", title: "Full audit", desc: "UX, performance, SEO and conversion: we pinpoint exactly what's holding your current site back." },
          { icon: "ai-build", title: "Design & technical redesign", desc: "A new, modern design on fast, durable technical foundations." },
          { icon: "seo", title: "Migration with no SEO loss", desc: "Redirects, structure and content migrated cleanly to protect your rankings." },
          { icon: "speed", title: "Performance restored", desc: "A near-instant site — better experience, better rankings, more conversions." },
        ],
        deliverables: [
          "Full audit of the existing site",
          "New design & development",
          "Migration plan & SEO redirects",
          "Go-live and ranking tracking",
        ],
        faq: [
          { q: "Will I lose my Google rankings?", a: "That's the whole risk of a poorly done redesign — and exactly what we avoid. We map your URLs, set up the redirects and preserve the SEO structure. Done well, a redesign often improves rankings." },
          { q: "Can we keep part of the existing site?", a: "Yes. We keep what works (content, brand elements, high-performing pages) and redo what's holding you back. The audit decides objectively." },
        ],
      },
      {
        slug: "application-web",
        illustration: "application-web",
        title: "Bespoke apps & platforms",
        tagline: "When a site is no longer enough, we build your tool.",
        short:
          "Client portals, back-offices, business platforms: 100% bespoke development to digitalise a process and create an edge your competitors don't have.",
        bullets: [
          "100% bespoke development",
          "Client portals & back-offices",
          "API integrations & automations",
          "Scalable & secure",
        ],
        metaTitle: "Bespoke Web Application Development in Luxembourg | vortx",
        metaDescription:
          "Bespoke web application and platform development in Luxembourg: client portals, back-offices, API integrations. Digitalise your processes, create your edge.",
        intro: [
          "Some needs go beyond a website: a client portal, an internal management tool, a platform that automates a business process. That's where a bespoke application becomes a genuine competitive edge.",
          "We design and build fast, secure and scalable web applications, connected to your existing tools. From mapping the need to production, we build the tool that fits exactly the way you work.",
        ],
        included: [
          { icon: "webapp", title: "Fully bespoke", desc: "An application built for your precise process — not generic software you have to put up with." },
          { icon: "next-perf", title: "Fast & secure", desc: "A modern, high-performance architecture designed in compliance with GDPR." },
          { icon: "integration", title: "Integrations & APIs", desc: "Connected to your CRM, your tools and third-party services via APIs and webhooks." },
          { icon: "automation", title: "Scalable", desc: "A foundation that grows with you: we add modules as your needs evolve." },
        ],
        deliverables: [
          "Needs mapping & specifications",
          "UX/UI mockups & technical architecture",
          "Development, testing & production deployment",
          "Documentation, training & maintenance",
        ],
        faq: [
          { q: "How does an application project unfold?", a: "In stages: scoping the need, mockups, iterative development you sign off on, then production deployment and follow-up. You see the tool take shape, with no months-long blind tunnel." },
          { q: "Do I fully own the application?", a: "Yes. The code, data and access belong to you. No lock-in: you can develop it further with us or in-house." },
        ],
      },
      {
        slug: "site-multilingue",
        illustration: "site-multilingue",
        title: "Multilingual sites FR / DE / EN / OTHER",
        tagline: "Speak to all of Luxembourg, and well beyond.",
        short:
          "In Luxembourg, your clients compare you in several languages. We build natively multilingual sites, optimised language by language for search and conversion.",
        bullets: [
          "Native multilingual management",
          "Localised SEO per language (hreflang)",
          "Editorial & UX consistency",
          "Built for the cross-border market",
        ],
        metaTitle: "Multilingual Website Design (FR/DE/EN) in Luxembourg | vortx",
        metaDescription:
          "Natively multilingual websites for Luxembourg: FR, DE, EN and more. Localised SEO (hreflang), consistent copy and UX. Speak to your whole market.",
        intro: [
          "Multilingualism isn't an option in Luxembourg: it's the reality of the market. A client searching in German shouldn't land on a rough translation — nor stay invisible because your site only exists in one language.",
          "We build multilingual sites designed for this from the start: clean architecture, correct hreflang markup, SEO optimised language by language and editorial consistency. Not a bolted-on translation, a genuine presence in each language.",
        ],
        included: [
          { icon: "multilingual", title: "Natively multilingual", desc: "An architecture designed for several languages from the start, not added afterwards." },
          { icon: "seo", title: "SEO per language", desc: "Hreflang markup, URLs and content optimised independently for each language." },
          { icon: "conversion", title: "Editorial consistency", desc: "A consistent tone and UX across languages, adapted to each audience." },
          { icon: "geo-citation", title: "Cross-border market", desc: "Built for Luxembourg and the Greater Region — FR, DE, EN and Lëtzebuergesch on request." },
        ],
        deliverables: [
          "Multilingual architecture & hreflang strategy",
          "Site in each language, SEO-optimised",
          "Translation workflow & editorial consistency",
          "Language switcher & go-live",
        ],
        faq: [
          { q: "Do you handle translations?", a: "We can take on the writing and professional translation, or cleanly integrate your existing content. What matters: accurate, optimised content in each language, not raw machine translation." },
          { q: "Does multilingual hurt SEO?", a: "On the contrary, done well it strengthens it: each language captures its own searches. The key is correct hreflang markup and distinct content — exactly what we put in place." },
        ],
      },
    ],
    "lead-generation": [
      {
        slug: "tunnels-de-conversion",
        illustration: "tunnels-de-conversion",
        title: "Conversion funnels",
        tagline: "From the first click to the signed quote, a journey built to convert.",
        short:
          "We architect the full path from stranger to client: aligned steps, messages tailored to each phase, end-to-end tracking. The backbone of your acquisition.",
        bullets: [
          "Funnel architecture (TOFU/MOFU/BOFU)",
          "Aligned steps & messages",
          "Full tracking & attribution",
          "Continuous A/B testing",
        ],
        metaTitle: "Conversion Funnel Design in Luxembourg | vortx",
        metaDescription:
          "Conversion funnel design for Luxembourg businesses: journey from click to client, full tracking and continuous optimisation. More qualified leads.",
        intro: [
          "Your clients don't go from stranger to purchase in a single click. They follow a journey: they discover, they research, they compare, then they decide. A conversion funnel guides that journey step by step, with the right message at the right moment.",
          "We map that path (TOFU/MOFU/BOFU), align each page and each follow-up with the relevant phase, and set up full tracking to know precisely where you win — and where you lose — prospects.",
        ],
        included: [
          { icon: "funnel", title: "Funnel architecture", desc: "A structured journey from first contact to conversion, with no gaps." },
          { icon: "conversion", title: "Aligned messages", desc: "The right argument at each step: discovery, consideration, decision." },
          { icon: "analytics", title: "Tracking & attribution", desc: "We measure each step to know what converts and what holds things back." },
          { icon: "ab-test", title: "Continuous optimisation", desc: "Regular A/B tests to improve the conversion rate at every stage." },
        ],
        deliverables: [
          "Full conversion-funnel mapping",
          "Pages & sequences aligned by step",
          "Tracking & attribution setup",
          "Dashboard & optimisation plan",
        ],
        faq: [
          { q: "Is a funnel only for online sales?", a: "No. In B2B, the funnel often leads to a quote request or a call, not a payment. We adapt it to your real sales cycle, even a long one." },
          { q: "Do I need to have traffic already?", a: "The funnel optimises the conversion of existing traffic; we can also pair it with SEO or ads to feed the top of the funnel. We start by maximising what you already capture." },
        ],
      },
      {
        slug: "landing-pages-campagne",
        illustration: "landing-pages-campagne",
        title: "Campaign landing pages",
        tagline: "Landing pages that turn traffic into enquiries.",
        short:
          "For every campaign, a dedicated page aligned with its message and its audience. The essential complement to your ads, so you don't waste a single click.",
        bullets: [
          "One page per campaign",
          "Persuasive copywriting",
          "Optimised forms",
          "Mobile-first & fast",
        ],
        metaTitle: "Campaign Landing Pages in Luxembourg | vortx",
        metaDescription:
          "Campaign landing page creation in Luxembourg: dedicated pages, persuasive copywriting and optimised forms. Convert every ad click into a qualified lead.",
        intro: [
          "A campaign that points to a generic page loses half its potential. Every ad message should be matched by a page that extends it: same promise, same audience, one single expected action.",
          "We create persuasive, fast landing pages for your Google, Meta or LinkedIn campaigns, with benefit-driven copywriting and forms built to maximise the response rate — not to discourage it.",
        ],
        included: [
          { icon: "landing", title: "One page per campaign", desc: "Each page extends the ad's message: perfect continuity, zero leakage." },
          { icon: "branding", title: "Persuasive copywriting", desc: "Benefit-driven copy that answers objections and triggers action." },
          { icon: "smart-forms", title: "Optimised forms", desc: "Just enough fields to qualify without discouraging, built for the response rate." },
          { icon: "speed", title: "Mobile-first & fast", desc: "Perfect on mobile, where most campaign traffic lands." },
        ],
        deliverables: [
          "Dedicated landing pages per campaign",
          "Copywriting & conversion structure",
          "Optimised forms & tracking",
          "Variants for A/B testing",
        ],
        faq: [
          { q: "How many landing pages do I need?", a: "Ideally one per offer or per key audience. The more the message aligns with intent, the higher the conversion rate climbs. We start with your priority campaigns." },
          { q: "Do you work with my existing campaigns?", a: "Yes. We can create the pages for your live campaigns, whether they're managed by you or by our advertising team." },
        ],
      },
      {
        slug: "email-marketing-automation",
        illustration: "email-marketing-automation",
        title: "Email marketing & automation",
        tagline: "Automated sequences that work your prospects 24/7.",
        short:
          "Email remains the channel with the best ROI. We set up automated sequences that warm up your prospects, follow up at the right moment and turn interest into appointments.",
        bullets: [
          "Automated nurturing sequences",
          "Triggered scenarios",
          "Careful deliverability",
          "CRM integration",
        ],
        metaTitle: "Email Marketing & Marketing Automation in Luxembourg | vortx",
        metaDescription:
          "Email marketing and automation for Luxembourg businesses: nurturing sequences, triggered scenarios and CRM integration. Convert prospects on autopilot.",
        intro: [
          "Not all your prospects are ready to buy today. Without follow-up, most forget you. Email automation keeps the connection alive: it informs, reassures and follows up automatically, until the prospect is ready.",
          "We design sequences triggered by behaviour (download, visit, inactivity), take care of deliverability so you land in the inbox, and connect it all to your CRM so your sales team receives leads that are already warmed up.",
        ],
        included: [
          { icon: "email-automation", title: "Automated sequences", desc: "Scenarios that trigger on their own and support each prospect at the right pace." },
          { icon: "nurturing", title: "Smart nurturing", desc: "The right content for each phase: we warm up without harassing, all the way to the decision." },
          { icon: "conversion", title: "Careful deliverability", desc: "Technical setup (SPF, DKIM) to land in the inbox, not in spam." },
          { icon: "integration", title: "CRM integration", desc: "Synced with your CRM: your sales team receives leads that are already qualified." },
        ],
        deliverables: [
          "Sequence & scenario strategy",
          "Email copywriting & design",
          "Automation & deliverability setup",
          "CRM connection & reporting",
        ],
        faq: [
          { q: "Is it GDPR-compliant?", a: "Yes. We work only on opt-in lists, with clear consent and unsubscribe. GDPR compliance is built into the sequences from the design stage." },
          { q: "Do I need an email list already?", a: "It's a plus, but we can also set up capture (lead magnets, forms) to build it cleanly. We start from your real situation." },
        ],
      },
    ],
    "branding-design": [
      {
        slug: "creation-de-logo",
        illustration: "creation-de-logo",
        title: "Logo design",
        tagline: "A symbol that makes you recognisable at a glance.",
        short:
          "Just your logo: a unique symbol, hand-crafted and delivered in every useful format. The starting point of a brand people remember — not a generic pictogram.",
        bullets: [
          "Original hand-drawn concepts",
          "Variations (colour, mono, favicon)",
          "Vector formats delivered",
          "Multi-medium legibility testing",
        ],
        metaTitle: "Bespoke Logo Design in Luxembourg | vortx",
        metaDescription:
          "Bespoke logo design in Luxembourg: original concepts, variations and vector formats. A unique, memorable symbol, true to your identity.",
        intro: [
          "Your logo is the first thing people remember about you — and often the only thing. It has to be unique, legible everywhere, and true to who you are. We design it bespoke, never from a stock library of recycled symbols.",
          "We explore several creative directions, refine the one that's most you, then deliver it in every format you'll need — colour, monochrome, favicon, web and print versions. A logo that holds up everywhere and over time.",
        ],
        included: [
          { icon: "logo", title: "Hand-drawn concepts", desc: "Several original directions designed for you, not retouched templates." },
          { icon: "branding", title: "Complete variations", desc: "Colour, black & white, monochrome and favicon versions: your logo ready for any use." },
          { icon: "ai-build", title: "Vector formats", desc: "Vector files (SVG, PDF) that stay sharp at every size, from favicon to storefront sign." },
          { icon: "responsive", title: "Legibility tested", desc: "Checked on small and large formats, light and dark backgrounds, screen and paper." },
        ],
        deliverables: [
          "Several original logo concepts",
          "Finalised logo in colour & mono versions",
          "File pack (vector, web, print, favicon)",
          "Mini logo usage guide",
        ],
        faq: [
          { q: "How many proposals will I receive?", a: "We present several distinct directions, then refine the one you prefer through back-and-forth. The goal is a logo you love, not a lukewarm compromise." },
          { q: "Do I really own the logo?", a: "Yes, fully. You receive all the source files and own them completely, with no hidden fees or royalties." },
          { q: "What if I need the whole visual identity?", a: "This offer covers the logo only. For colours, typography and complete brand guidelines, choose our Visual identity & brand guidelines offer: the logo is included." },
        ],
      },
      {
        slug: "identite-visuelle",
        illustration: "identite-visuelle",
        title: "Visual identity & brand guidelines",
        tagline: "Logo, colours, typography and usage rules: your complete brand, ready to use.",
        short: "The complete identity package: your logo, the visual system around it (colours, typography, iconography, art direction) and the brand guidelines that set its rules for your teams and suppliers.",
        bullets: [
          "Bespoke logo included",
          "Colour palette & typography",
          "Iconography, patterns & art direction",
          "Brand guidelines document (PDF)",
          "Ready-to-use asset library",
        ],
        metaTitle: "Visual identity & brand guidelines in Luxembourg | vortx",
        metaDescription:
          "Complete visual identity and brand guidelines in Luxembourg: logo, colours, typography, iconography and usage rules. A coherent brand, applied by everyone.",
        intro: [
          "A logo alone doesn't make a brand. What makes you recognisable is the consistency of everything else: your colours, your typography, your images, your style — and clear rules so everyone applies them the same way.",
          "We build it all, from A to Z: the logo, the visual system that goes with it (palette, typographic hierarchy, iconography, patterns, art direction), then the brand guidelines that document its use — clear space, precise colour codes, spacing, concrete examples.",
          "The result: a modular identity that grows with you, and a guide your teams and suppliers can follow without hesitation, from the website to social media, from print to presentations.",
        ],
        included: [
          { icon: "logo", title: "Bespoke logo", desc: "The heart of the identity: a unique logo, delivered in colour, monochrome and favicon versions." },
          { icon: "brand-identity", title: "Colours & typography", desc: "A distinctive palette and typographic hierarchy, with their exact codes (HEX, RGB, CMYK, Pantone)." },
          { icon: "branding", title: "Iconography & art direction", desc: "Icons, patterns and a photo style of your own, so everything you produce looks like you." },
          { icon: "guidelines", title: "Brand guidelines", desc: "Documented usage rules: minimum sizes, clear space, correct and forbidden uses." },
          { icon: "responsive", title: "Application examples", desc: "Stationery, web, social media, presentations: concrete cases that remove any ambiguity." },
          { icon: "process", title: "Ready-to-use assets", desc: "All source files organised and accessible for your teams and suppliers." },
        ],
        deliverables: [
          "Final logo (colour, mono, favicon, vector)",
          "Colour palette & typographic system",
          "Iconography, patterns & art direction",
          "Complete brand guidelines (PDF)",
          "Organised asset library",
        ],
        faq: [
          { q: "What's the difference between a visual identity and brand guidelines?", a: "The visual identity is the set of elements (logo, colours, typography, style). The brand guidelines are the document that sets their usage rules. This offer brings both together." },
          { q: "I already have a logo — is this still useful?", a: "Yes. We start from your existing logo — refreshing it if needed — and build the visual system and the guidelines around it." },
          { q: "What's the point of guidelines if I work alone?", a: "They guarantee consistency over time and make every future collaboration easier (printer, freelancer, new hire). It's an investment that protects the value of your brand." },
          { q: "Can the identity evolve?", a: "Yes. The system is modular and the guidelines are a living document: we expand them as your brand reaches new media." },
        ],
      },
      {
        slug: "supports-print",
        illustration: "supports-print",
        title: "Print materials & stationery",
        tagline: "All your materials, designed with the same care as your website.",
        short: "Business cards, stationery, brochures, leaflets, reports, signage, roll-ups: we design all your materials in line with your identity and deliver files ready for the printer of your choice.",
        bullets: [
          "Business cards & stationery",
          "Brochures, leaflets & flyers",
          "Reports & corporate documents",
          "Signage & event materials",
        ],
        metaTitle: "Print material & stationery design in Luxembourg | vortx",
        metaDescription:
          "Print design in Luxembourg: business cards, brochures, leaflets, reports, signage. Files ready for the printer of your choice.",
        intro: [
          "Print isn't dead — it reassures. In Luxembourg, the corporate and financial sector remains a big user of carefully crafted materials: a business card, a leaflet or an annual report says a lot about how seriously you work.",
          "We design all your materials in line with your identity, from the business card to signage. You receive technically flawless files (bleed, CMYK, colour profiles, standard formats), ready to go to the printer of your choice.",
        ],
        included: [
          { icon: "print", title: "Cards & stationery", desc: "Business cards, letterheads, envelopes, signatures: your identity down to the details." },
          { icon: "branding", title: "Brochures & leaflets", desc: "Sales materials that showcase your offers with clarity and elegance." },
          { icon: "guidelines", title: "Corporate reports", desc: "Annual reports and institutional documents laid out with rigour." },
          { icon: "responsive", title: "Print-ready files", desc: "Bleed, CMYK, crop marks: compliant files any printer accepts without rework." },
        ],
        deliverables: [
          "Design of all the materials you need",
          "Print-ready files (HD PDF, CMYK, bleed)",
          "Reusable templates & variations",
          "Technical specifications for your printer",
        ],
        faq: [
          { q: "Can you work from my existing guidelines?", a: "Yes. We apply your current identity to your materials, or adapt it if it doesn't have a print version yet." },
          { q: "Will my printer accept the files?", a: "Yes: we deliver files to professional printing standards and, if needed, the technical specifications to pass on to your printer, for a result with no bad surprises." },
        ],
      },
    ],
    "automatisation-ia": [
      {
        slug: "chatbots-ia",
        illustration: "chatbots-ia",
        title: "Smart chatbots",
        tagline: "Answer, qualify and book automatically, 24/7.",
        short:
          "Chatbots that welcome your visitors, ask the right questions, qualify enquiries and book appointments — on your site and on WhatsApp.",
        bullets: [
          "Multilingual website chatbot",
          "WhatsApp & Messenger",
          "Automated appointment booking",
          "Smart handover to a human",
        ],
        metaTitle: "Smart Chatbots in Luxembourg | vortx",
        metaDescription:
          "Smart chatbots for Luxembourg businesses: website, WhatsApp, Messenger, multilingual. Answer, qualify and book automatically, 24/7.",
        intro: [
          "A visitor who can't find an answer leaves. A message left unanswered in the evening or at the weekend is a lost client. A well-designed chatbot answers instantly, at any hour, in the visitor's language — and never sleeps.",
          "We design chatbots that lead the conversation step by step: they answer common questions, ask the right questions to qualify each enquiry, book appointments and hand over to your team when it's relevant. On your site, on WhatsApp or on Messenger.",
        ],
        included: [
          { icon: "chatbot", title: "Multilingual chatbot", desc: "On your site, it welcomes visitors in FR, DE or EN and guides them to the right answer." },
          { icon: "integration", title: "WhatsApp & Messenger", desc: "Where your clients are: we deploy the bot on their preferred channels." },
          { icon: "ai-agent", title: "Appointment booking", desc: "The bot offers your free slots and books straight into your calendar." },
          { icon: "leads", title: "Smart handover", desc: "When useful, the bot hands over to a human with all the context." },
        ],
        deliverables: [
          "Scenario & tone design",
          "Bespoke conversation flows",
          "Deployment on your channels (web, WhatsApp…)",
          "Conversation tracking & optimisation",
        ],
        faq: [
          { q: "Can a chatbot really replace a human?", a: "For common questions and qualification, yes — 24/7 and instantly. For complex cases, it hands over to a human with the context. The goal is to relieve your teams, not to dehumanise." },
          { q: "Is it multilingual?", a: "Yes, and it's a major asset in Luxembourg: the bot detects the visitor's language and answers in FR, DE or EN." },
        ],
      },
      {
        slug: "integrations-crm-api",
        illustration: "integrations-crm-api",
        title: "CRM & API integrations",
        tagline: "All your tools finally connected, your data in sync.",
        short:
          "No more double entry and silos: we connect your site, your CRM and your business software for a smooth, reliable data flow, in real time.",
        bullets: [
          "CRM connection (HubSpot, Salesforce…)",
          "Synchronisation between software",
          "Bespoke APIs & webhooks",
          "End of double entry",
        ],
        metaTitle: "CRM & API Integrations in Luxembourg | vortx",
        metaDescription:
          "CRM and API integrations for Luxembourg businesses: HubSpot, Salesforce, Pipedrive. Sync your tools, remove silos and double entry.",
        intro: [
          "Your data is scattered: one lead in the site form, another in the spreadsheet, a third in the CRM. This dispersion wastes time, creates errors and lets opportunities slip through the cracks.",
          "We connect your tools so they speak the same language: your site feeds your CRM, your CRM syncs with your business software, and everything updates in real time. Via existing connectors or bespoke APIs when needed.",
        ],
        included: [
          { icon: "integration", title: "CRM connection", desc: "HubSpot, Salesforce, Pipedrive… we connect your CRM to your site and your tools." },
          { icon: "automation", title: "Real-time synchronisation", desc: "Your data up to date everywhere, with no manual intervention or delay." },
          { icon: "ai-build", title: "Bespoke APIs & webhooks", desc: "When no standard connector exists, we build the integration bespoke." },
          { icon: "analytics", title: "Data reliability", desc: "End of double entry and silos: one source of truth, sound decisions." },
        ],
        deliverables: [
          "Audit of your tools & data flows",
          "Configured integrations & connectors",
          "Bespoke APIs/webhooks if needed",
          "Testing, documentation & monitoring",
        ],
        faq: [
          { q: "What if my software has no ready-made connector?", a: "We build a bespoke integration via its API or webhooks. Most professional tools expose an API: we plug in cleanly." },
          { q: "Is my data secure during the sync?", a: "Yes. The integrations are designed in compliance with GDPR, with secure connections and fine-grained access management." },
        ],
      },
    ],
  },

  // ---- FAQ page (comprehensive, grouped) ----
  approachPage: {
    eyebrow: "Our approach",
    title: "A clear method, measurable results.",
    lead: "No black box. At every stage you know what we do, what you get, how long it takes — and what we need from you.",
    stepDurationLabel: "Duration",
    stepDeliverablesLabel: "What you get",
    stepYouProvideLabel: "What we need from you",
    steps: [
      {
        n: "01",
        title: "Diagnosis & strategy",
        desc: "We analyse your market, your goals and your current funnel to build a tailored roadmap.",
        duration: "1 to 2 weeks",
        deliverables: [
          "Audit of what exists: site, SEO, acquisition",
          "Competitor & keyword analysis",
          "Roadmap prioritised by impact",
        ],
        youProvide: "A video or phone call about your goals.",
      },
      {
        n: "02",
        title: "Design & development",
        desc: "Premium design and development on the latest technologies, with conversion best practices built in from the start.",
        duration: "2 to 6 weeks",
        deliverables: [
          "Design mockups validated with you",
          "Fast, responsive development",
          "Conversion-focused funnels and forms",
        ],
        youProvide: "Your key content — copy, visuals, logo — or we handle it for you.",
      },
      {
        n: "03",
        title: "Review & adjustments",
        desc: "We present the result and adjust it together until everything matches your expectations.",
        duration: "3 to 5 days",
        deliverables: [
          "Full review over video call",
          "Round of adjustments included",
          "Quality check: speed, mobile, SEO",
        ],
        youProvide: "Your feedback gathered in a single pass, so we move fast.",
      },
      {
        n: "04",
        title: "Launch & follow-up",
        desc: "Go-live, measurement setup and ongoing support to turn traffic into customers.",
        duration: "Ongoing",
        deliverables: [
          "Go-live and analytics setup",
          "Tracking of rankings and conversions",
          "Continuous, data-driven optimisation",
        ],
        youProvide: "A regular check-in to decide the next priorities together.",
      },
    ],
    principles: {
      eyebrow: "What changes",
      title: "A way of working, not just a deliverable.",
      items: [
        { title: "Full transparency", desc: "You see the progress, the decisions and the numbers. Never a black box." },
        { title: "Result-driven", desc: "Every action aims at a measurable goal: a lead, a call, a sale." },
        { title: "One point of contact", desc: "No ping-pong between departments. One contact who knows your project end to end." },
        { title: "Fast iteration", desc: "We ship, measure and adjust — rather than betting everything on one big launch." },
      ],
    },
    faq: {
      eyebrow: "Frequently asked",
      title: "Before we start.",
      items: [
        { q: "How long does a project take?", a: "It depends on the scope: a showcase site takes a few weeks, a full acquisition system takes longer. We give you a precise timeline right after the diagnosis." },
        { q: "Do we have to prepare the content ourselves?", a: "Ideally you provide your key content, but we can also write it and produce the visuals. We adapt to your resources." },
        { q: "What happens after launch?", a: "We stay by your side: performance tracking, continuous optimisation and adjustments based on results. Launch is a beginning, not an end." },
        { q: "Do you work with my industry and company size?", a: "We mainly work with SMEs and freelancers in Luxembourg, across all sectors. The method adapts to your market and your budget." },
      ],
    },
  },

  faqPage: {
    eyebrow: "FAQ",
    title: "All your questions, our clear answers.",
    lead: "Websites, SEO, leads, advertising, AI, pricing, timelines, GDPR… Everything we get asked before getting started. Still have a question? Write to us.",
    searchPlaceholder: "Search for a question…",
    tocTitle: "Contents",
    countSuffix: "questions",
    emptyLabel: "No question matches your search.",
    ctaTitle: "A question left unanswered?",
    groups: [
      {
        title: "The agency & getting started",
        items: [
          { q: "Who is vortx and what exactly do you do?", a: "vortx is a marketing and web agency based in Luxembourg. We build websites that convert and measurable acquisition strategies: SEO & GEO, lead generation, online advertising, branding and AI automation. Our obsession: turning attention into clients." },
          { q: "Do you work with businesses my size?", a: "Yes. We support sole traders and tradespeople just as much as SMEs and startups. The approach adapts to your digital maturity and your budget." },
          { q: "How does a first contact work?", a: "You book a free discovery call. We analyse your situation, your goals and your market, then tell you, straight up, what can be improved — before we even talk about a quote." },
          { q: "Are you a Luxembourg agency?", a: "Yes, we know the local market, its multilingualism (FR/DE/EN) and its GDPR requirements. We design your campaigns for the Luxembourg field." },
        ],
      },
      {
        title: "Websites",
        items: [
          { q: "Why bespoke rather than a template?", a: "Bespoke offers the best performance, security and flexibility: your site is designed for your business, not adapted from a template seen a thousand times." },
          { q: "Is it true your sites are \"built with AI\"?", a: "Yes. We use AI to accelerate design, code and content. The result: a higher-quality site, delivered faster and with better value for money — always reviewed and finalised by humans." },
          { q: "Will my site be fast and mobile-friendly?", a: "Absolutely. Performance and mobile-first are the baseline: a near-instant site, 100% responsive and accessible on every screen." },
          { q: "Will I be able to edit my site myself?", a: "We handle the updates for you: send us your changes and we put them live." },
          { q: "Will my site be optimised for Google and AI?", a: "Yes. We build in SEO and GEO best practices from the start: structure, performance, structured data and content citable by AI answer engines." },
          { q: "Do you handle hosting and maintenance?", a: "Yes. We can take on hosting, updates, security and enhancements, so you don't have to worry about it." },
        ],
      },
      {
        title: "SEO & GEO",
        items: [
          { q: "What's the difference between SEO and GEO?", a: "SEO puts you in Google's list of results; GEO (Generative Engine Optimization) puts you in the answer generated by an AI like ChatGPT or Perplexity. We optimise for both because, in our experience, around 80% of the best practices are shared." },
          { q: "Is GEO real or just a fad?", a: "It's very real: more and more decision-makers put their questions to an AI rather than to Google. If you don't appear in the answer, you don't exist in the decision. We structure your content to be cited as a source." },
          { q: "How long until we see SEO results?", a: "SEO/GEO is foundational work: the first signals often appear within a few weeks, solid gains within a few months. We show you the progress at every step, with no magic promises." },
          { q: "Do you do SEO in several languages?", a: "Yes, FR/DE/EN natively. It's essential in Luxembourg, where your clients compare you in all three languages." },
        ],
      },
      {
        title: "Leads & advertising",
        items: [
          { q: "Do you guarantee a number of leads?", a: "We don't sell magic promises: we build a measurable acquisition system and optimise it until it performs. Goals are set together, based on your market." },
          { q: "Do I necessarily need an advertising budget?", a: "Not always. Some leads can come from SEO/GEO and content. Advertising accelerates things, but we start by maximising what your site can already capture." },
          { q: "What minimum advertising budget should I plan for?", a: "It depends on your sector and your goal. We define a test budget together, measure, then scale only what's profitable." },
          { q: "Which channels do you advertise on?", a: "Google Ads and Performance Max, Meta (Facebook & Instagram) and LinkedIn Ads for B2B. We choose channels based on your target." },
          { q: "How do you measure return on investment?", a: "We set up reliable conversion tracking and clear reporting: cost per lead, ROAS, ROI. Every euro spent is tied to a result." },
        ],
      },
      {
        title: "Branding, design & AI",
        items: [
          { q: "Do you create a brand from scratch or evolve the existing one?", a: "Both. We can create a complete visual identity (logo, guidelines, design system) or refresh yours while keeping what works and what you're already known for." },
          { q: "Does the design account for conversion?", a: "Always. We don't do beauty for beauty's sake: every visual choice serves clarity, trust and action." },
          { q: "What do automation and AI actually do?", a: "They remove repetitive tasks (follow-ups, tool synchronisation, notifications), connect your site and your CRM, and deploy AI assistants or chatbots that answer and qualify your visitors 24/7." },
          { q: "Will AI replace my teams?", a: "No — it relieves them. We automate low-value tasks so your teams can focus on what's essential: your clients." },
        ],
      },
      {
        title: "Pricing, timelines & process",
        items: [
          { q: "How much does a website or campaign cost?", a: "Every project is bespoke. Rather than a generic price, we give you a precise quote after a free discovery call and an audit of your situation." },
          { q: "Why don't you display your prices?", a: "Because a good quote depends on your real goals. A generic price would be either too high or disappointing. We prefer to offer you the right scope, without overcharging." },
          { q: "What are the typical timelines?", a: "It depends on the scale of the project, but our AI-accelerated production lets us deliver fast. We give you a clear timeline from the quote stage." },
          { q: "How does a project unfold, step by step?", a: "Four stages: diagnosis, design & development, review & adjustments, then launch & follow-up. You sign off at every step, with no nasty surprises." },
          { q: "Do you provide support after go-live?", a: "Yes. Maintenance, updates, conversion optimisation and ongoing marketing support are all part of our offer." },
          { q: "Is the quote really no-commitment?", a: "Yes. The discovery call, the audit and the quote are free and no-commitment. You then decide, entirely freely." },
        ],
      },
      {
        title: "Tech, languages & GDPR",
        items: [
          { q: "Are my data and my clients' data protected?", a: "Yes. We design every site and every automation in compliance with GDPR: consent, cookie management and strong attention to confidentiality." },
          { q: "Will my site be multilingual?", a: "Yes, natively if needed (FR, DE, EN, and Lëtzebuergesch on request), with a structure designed for the SEO of each language." },
          { q: "What happens if I want to switch agencies later?", a: "You stay the owner of your site, your content and your access. No lock-in: everything belongs to you." },
          { q: "Will my site be accessible to people with disabilities?", a: "We follow accessibility best practices (contrast, keyboard navigation, semantics) for a site usable by as many people as possible." },
        ],
      },
    ],
  },

  // ---- Accessibility widget ----
  a11y: {
    button: "Accessibility",
    title: "Accessibility",
    profilesTitle: "Quick profiles",
    profileVisual: "Visual comfort",
    profileDyslexia: "Dyslexia",
    profileReading: "Easy reading",
    profileCalm: "Calm mode",
    textGroup: "Text",
    viewGroup: "Colour & view",
    comfortGroup: "Navigation & comfort",
    fontSize: "Text size",
    decrease: "Decrease text",
    increase: "Increase text",
    readable: "Readable font",
    spacing: "Letter spacing",
    lineHeight: "Larger line height",
    links: "Underline links",
    contrast: "High contrast",
    grayscale: "Grayscale",
    saturate: "High saturation",
    hideImages: "Hide images",
    bigCursor: "Big cursor",
    focusHighlight: "Focus highlight",
    readingGuide: "Reading guide",
    readingMask: "Reading mask",
    pauseMotion: "Pause animations",
    reset: "Reset",
    close: "Close",
    active: "active",
  },

  // ---- Per-route metadata ----
  meta: {
    home: {
      title: "vortx | Marketing & web agency in Luxembourg",
      description:
        "vortx, marketing agency in Luxembourg: websites that convert, SEO & GEO, lead generation and online advertising. Free audit, fast reply.",
    },
    services: {
      title: "Marketing & web services | vortx Luxembourg",
      description:
        "Websites, SEO & GEO, lead generation, advertising, branding and AI automation. A complete acquisition chain for Luxembourg businesses.",
    },
    about: {
      title: "The vortx agency | Marketing & web in Luxembourg",
      description:
        "Who vortx is: a Luxembourg marketing and web agency obsessed with conversion and measurable performance. Discover our approach.",
    },
    approach: {
      title: "Our method | vortx Luxembourg",
      description:
        "Diagnosis, design, review, launch: the vortx method for delivering sites and campaigns that pay off.",
    },
    work: {
      title: "Work | vortx Luxembourg",
      description:
        "Websites for garages, tradespeople and SMEs, web apps and branding: the work of vortx, marketing & web agency in Luxembourg. Let's talk about your project.",
    },
    contact: {
      title: "Contact & free audit | vortx Luxembourg",
      description:
        "Book a free discovery call with vortx. Personalised audit with no delay, no-commitment quote. Marketing & web agency in Luxembourg.",
    },
    legalMentions: {
      title: "Legal notice | vortx Luxembourg",
      description: "Legal notice for the vortx site, marketing & web agency in Luxembourg.",
    },
    legalPrivacy: {
      title: "Privacy policy | vortx Luxembourg",
      description:
        "How vortx collects, uses and protects your personal data (GDPR).",
    },
    legalCookies: {
      title: "Cookie policy | vortx Luxembourg",
      description: "Use of cookies and trackers on the vortx site.",
    },
    news: {
      title: "News | Marketing, SEO & GEO — vortx Luxembourg",
      description:
        "Analysis and advice from vortx on SEO, GEO, conversion and the web in Luxembourg. Substance to grow your business.",
    },
    glossary: {
      title: "Marketing & web glossary | vortx Luxembourg",
      description:
        "Every digital marketing and web term explained simply: SEO, GEO, ROAS, conversion funnel, CMS… with the Luxembourg context.",
    },
    faq: {
      title: "FAQ — Websites, SEO, leads & pricing | vortx Luxembourg",
      description:
        "All the answers on our websites, SEO & GEO, lead generation, advertising, AI, pricing, timelines and GDPR. Marketing & web agency in Luxembourg.",
    },
    quiz: {
      title: "Quiz: test your marketing IQ | vortx Luxembourg",
      description:
        "Marketing, web, SEO, GEO, advertising, AI: 10 random questions to test your knowledge. Get your score and a verdict. Free — and a little ruthless.",
    },
  },

  // ---- Standalone pages ----
  pages: {
    thanks: {
      title: "Thank you, your request is on its way.",
      lead: "We're reviewing it and will get back to you quickly with an initial analysis — no commitment.",
      cta: "Back to home",
      metaTitle: "Thank you | vortx Luxembourg",
      quizLead: "While you wait for our reply, find out where your marketing stands.",
      quizCta: "Take the quiz",
    },
    notFound: {
      title: "Page not found",
      lead: "This page crossed the event horizon — it doesn't exist or has been moved.",
      cta: "Back to home",
      didYouMean: "Were you looking for:",
      explore: "Useful pages",
      contactLead: "Can't find what you're looking for?",
      contactCta: "Write to us",
    },
    legalUpdated: "Last updated: to be completed",
    legalTodo:
      "⚠️ Content to be legally validated and completed with the company's real legal information.",
  },

  // ---- Cookie consent (RGPD / ePrivacy) ----
  consent: {
    title: "Cookies & privacy",
    message:
      "We use cookies necessary for the site to function and, with your consent, analytics and advertising cookies.",
    acceptAll: "Accept all",
    rejectAll: "Reject all",
    customize: "Customise",
    save: "Save my choices",
    learnMore: "Learn more",
    manage: "Manage my cookies",
    categories: {
      necessary: {
        title: "Necessary",
        desc: "Essential for the site to function (security, preferences, remembering your consent). Always active.",
        always: "Always active",
      },
      analytics: {
        title: "Analytics",
        desc: "Help us understand how the site is used in order to improve it (anonymised statistics).",
      },
      marketing: {
        title: "Marketing",
        desc: "Allow us to measure and personalise our advertising campaigns.",
      },
    },
  },
} as const satisfies DictionaryShape;
