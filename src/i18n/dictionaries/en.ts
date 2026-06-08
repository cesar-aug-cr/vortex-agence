/**
 * English dictionary — mirrors the French source of truth for all UI copy.
 * Positioned for the Luxembourg B2B market: local proof, no public
 * pricing (qualification call), conversion-first language.
 */

import type { ArticleBlock, GlossaryTerm } from "./fr";

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
    secondaryCta: "Discover our approach",
    note: "Fast reply · Free audit · No commitment · 100% bespoke",
  },

  stats: [
    { value: "Express", label: "Guaranteed reply" },
    { value: "100 %", label: "Built bespoke" },
    { value: "FR · DE · EN", label: "Natively multilingual" },
  ],

  // ---- Trust / positioning band ----
  trust: {
    eyebrow: "Why vortx",
    title: "An agency, not a vendor.",
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
    lead: "Six expertises that lock together. Pick one, or let us orchestrate the whole.",
  },

  services: [
    {
      slug: "sites-web",
      group: "convert",
      title: "Websites that convert",
      tagline: "Fast sites, built to turn visitors into clients.",
      short:
        "Showcase sites, landing pages and bespoke platforms in Next.js — or on WordPress when you want to keep control. AI-accelerated production, premium design and built-in conversion funnels.",
      bullets: [
        "Bespoke Next.js or WordPress, to match your need",
        "AI-accelerated production, delivered faster",
        "Bespoke design, mobile-first",
        "Smart multi-step forms",
        "100% responsive & accessible",
      ],
      metaTitle: "Website design in Luxembourg | vortx",
      metaDescription:
        "Fast, premium-design, conversion-focused websites for Luxembourg businesses. Next.js development, multilingual, SEO-ready.",
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
      group: "convert",
      title: "Logo design & branding",
      tagline: "A logo and a brand people remember.",
      short:
        "Bespoke logo, complete visual identity and brand guidelines. The consistency that builds trust before the first word.",
      bullets: [
        "Bespoke logo design",
        "Complete visual identity",
        "Brand guidelines & usage rules",
        "Print & digital variations",
      ],
      metaTitle: "Logo design & branding in Luxembourg | vortx",
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
    title: "A beautiful site isn't enough. It has to pay off.",
    problemTitle: "Without an acquisition system:",
    problems: [
      "Opportunities that slip by unnoticed",
      "A disappointing marketing ROI",
      "Too many visits, too few contacts",
    ],
    solutionTitle: "With vortx:",
    solutions: [
      "A site built to convert, delivered fast",
      "A clear funnel: visitor → lead → client",
      "A marketing budget justified in numbers",
    ],
    funnel: ["Visitor", "Interested", "Prospect", "Client"],
  },

  // ---- Process ----
  process: {
    eyebrow: "Our method",
    title: "Marketing DNA, zero nasty surprises.",
    steps: [
      {
        n: "01",
        title: "Diagnosis",
        desc: "We analyse your market, your goals and your current funnel to build a bespoke strategy.",
      },
      {
        n: "02",
        title: "Design & development",
        desc: "Premium design and development on the latest technologies, with the best conversion practices.",
      },
      {
        n: "03",
        title: "Review & adjustments",
        desc: "We present the result and refine it until you're fully satisfied.",
      },
      {
        n: "04",
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
    stat: { value: "40+", label: "tools mastered" },
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
        name: "AI & automation",
        items: [
          "Claude Code",
          "ChatGPT",
          "Perplexity",
          "Zapier",
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
          "GIMP",
          "UI/UX",
          "Mockups",
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
    lead: "Search is changing. Your clients ask their questions to AI assistants. We optimise so that vortx — and you — are the source that gets cited.",
    points: [
      {
        title: "Direct citations by AI",
        desc: "Structured content built to be picked up in generative answers.",
      },
      {
        title: "LLM-ready schemas",
        desc: "Structured data and files (llms.txt) that speak to the models.",
      },
      {
        title: "SEO & GEO integrated",
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

  // ---- FAQ ----
  faq: {
    eyebrow: "Frequently asked questions",
    title: "What clients ask before getting started.",
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
        a: "It's optimisation for AI answer engines (ChatGPT, Perplexity, Google AI). We structure your content so AI cites you as a source.",
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
    title: "Ready to transform your online presence?",
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
      success: "Thank you! We'll get back to you very soon.",
      step: "Step",
      next: "Next",
      back: "Back",
      stepServices: "Your needs",
      stepDetails: "Your details",
      stepMessage: "Your message",
      servicesLabel: "Which services are you interested in?",
      servicesHint: "Select one or more services.",
      consentBefore:
        "By ticking this box, I acknowledge that I have read how my personal data is processed and stored, as described in the ",
      consentLink: "privacy policy",
      consentAfter: ".",
      consentRequired: "Please confirm this to continue.",
      error:
        "Something went wrong. Please try again or email us directly.",
    },
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
          { label: "Logo design & branding", href: "/services/branding-design" },
          { label: "Automation & AI", href: "/services/automatisation-ia" },
        ],
      },
      company: {
        title: "Agency",
        links: [
          { label: "About", href: "/agence" },
          { label: "Our method", href: "/approche" },
          { label: "Work", href: "/realisations" },
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
      "vortx was born from a simple observation: too many Luxembourg businesses have a site that looks like a brochure — pretty, but bringing in nothing. We build the opposite: digital presences designed as acquisition machines.",
      "Behind the agency is a team with more than a decade of combined experience in digital marketing, web development and art direction. We've watched the trends come and go; we keep what converts and drop the rest.",
      "We work in French, German and English, with a single requirement: every euro invested in your marketing must be justifiable. No jargon, no empty promises — measurable results.",
    ],
    experience: {
      suffix: "years",
      label: "of combined experience",
      note: "marketing · web · design",
    },
    stats: [
      { value: "100 %", label: "Bespoke, never a template" },
      { value: "FR·DE·EN", label: "Natively multilingual" },
      { value: "GEO", label: "Optimised for generative AI" },
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
    articles: [
      {
        slug: "geo-seo-luxembourg-etre-cite-par-les-ia",
        category: "SEO & GEO",
        title:
          "SEO vs GEO: how to get found on Google AND cited by AI in 2026",
        excerpt:
          "Search is no longer played out on Google alone. ChatGPT, Perplexity and Google AI are becoming the new front door. Here's how SEO and GEO work together — and what to actually do about it.",
        date: "2026-06-02",
        updated: "2026-06-02",
        readingMinutes: 9,
        author: "The vortx team",
        cover: "geo-citation",
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
            text: "Good news: 80% of the work is shared. Structured, fast, reliable and well-marked-up content performs both on Google and with the models. We don't sacrifice one for the other — we design for both from the start.",
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
        date: "2026-06-04",
        updated: "2026-06-04",
        readingMinutes: 8,
        author: "The vortx team",
        cover: "ads-targeting",
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
        date: "2026-06-07",
        updated: "2026-06-07",
        readingMinutes: 7,
        author: "The vortx team",
        cover: "conversion",
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
    eyebrow: "Glossary",
    title: "The vocabulary of marketing and web, jargon-free.",
    lead: "Every term we use — SEO, GEO, ROAS, funnel, CMS… — explained simply, with the Luxembourg context.",
    searchPlaceholder: "Search for a term…",
    countSuffix: "terms",
    emptyLabel: "No term matches your search.",
    ctaTitle: "Still stuck on a term?",
    terms: [
      {
        term: "SEO (organic search)",
        slug: "seo",
        category: "SEO & GEO",
        short: "Get found on Google for free.",
        def: "Search Engine Optimization covers the techniques that improve a site's position in the organic (non-paid) results of search engines: technical quality, relevant content, authority and user experience.",
      },
      {
        term: "GEO / GSO",
        slug: "geo-gso",
        category: "SEO & GEO",
        short: "Get cited by generative AI.",
        def: "Generative Engine Optimization (or Generative Search Optimization) optimises your content so it is picked up and cited as a source by AI answer engines (ChatGPT, Perplexity, Google AI). The goal: be the answer, not just a link.",
      },
      {
        term: "SERP",
        slug: "serp",
        category: "SEO & GEO",
        short: "Google's results page.",
        def: "Search Engine Results Page: the page that displays the results of a search. It blends organic links, ads, rich snippets, and increasingly AI-generated answers.",
      },
      {
        term: "Keyword",
        slug: "mot-cle",
        category: "SEO & GEO",
        short: "What your clients type.",
        def: "A term or phrase a user enters into a search engine. SEO is partly about identifying profitable keywords and structuring content around them.",
      },
      {
        term: "Backlink",
        slug: "backlink",
        category: "SEO & GEO",
        short: "A link from another site to yours.",
        def: "An inbound link from a third-party site. Quality backlinks signal to search engines that your site has authority, which improves ranking.",
      },
      {
        term: "Structured data (Schema.org)",
        slug: "donnees-structurees",
        category: "SEO & GEO",
        short: "Code that explains your content to machines.",
        def: "Standardised markup added to a page's code to describe its content (business, service, article, FAQ…). It helps Google and AI understand and surface your information.",
      },
      {
        term: "llms.txt",
        slug: "llms-txt",
        category: "SEO & GEO",
        short: "A summary of your site for AI.",
        def: "A text file placed at a site's root to present, in a structured way, its offering and key content to large language models. An emerging GEO lever.",
      },
      {
        term: "Conversion funnel",
        slug: "tunnel-de-conversion",
        category: "Conversion",
        short: "The path from visitor to client.",
        def: "The sequence of steps a visitor goes through before becoming a client (discovery → interest → contact → purchase). We optimise it to reduce drop-off at each step.",
      },
      {
        term: "Conversion rate",
        slug: "taux-de-conversion",
        category: "Conversion",
        short: "The % of visitors who take action.",
        def: "The percentage of visitors who complete the desired action (quote request, purchase, sign-up). A central indicator of a site's or campaign's effectiveness.",
      },
      {
        term: "Landing page",
        slug: "landing-page",
        category: "Conversion",
        short: "A page built for a single action.",
        def: "A landing page designed around a single goal (often tied to a campaign): convert the visitor into a lead or client, with no distraction.",
      },
      {
        term: "Call-to-action (CTA)",
        slug: "cta",
        category: "Conversion",
        short: "The button that invites action.",
        def: "An element (button, link) that prompts the visitor to take the next step: \"Book a call\", \"Get a quote\". Its clarity and visibility strongly influence conversion.",
      },
      {
        term: "A/B testing",
        slug: "ab-testing",
        category: "Conversion",
        short: "Compare two versions, keep the best.",
        def: "A method that shows two variants of a page or element to different visitors, then measures which one converts best.",
      },
      {
        term: "Lead",
        slug: "lead",
        category: "Acquisition",
        short: "A potential sales contact.",
        def: "A person or company that has shown interest (form, call, quote request) and could become a client. A \"qualified\" lead is a good fit for your target.",
      },
      {
        term: "Lead generation",
        slug: "generation-de-leads",
        category: "Acquisition",
        short: "Create a steady flow of prospects.",
        def: "The set of actions (site, content, campaigns, automation) designed to attract and capture qualified contacts in a predictable way.",
      },
      {
        term: "SEA / Paid advertising",
        slug: "sea",
        category: "Acquisition",
        short: "Buy visibility (Google, Meta…).",
        def: "Search Engine Advertising and social advertising: paid campaigns (Google Ads, Meta, LinkedIn) that put your ads in front of a targeted audience.",
      },
      {
        term: "ROAS",
        slug: "roas",
        category: "Data & measurement",
        short: "What each euro of ad spend returns.",
        def: "Return On Ad Spend: revenue generated for every euro spent on advertising. A ROAS of 4 means €4 of revenue for €1 invested.",
      },
      {
        term: "ROI",
        slug: "roi",
        category: "Data & measurement",
        short: "Overall return on investment.",
        def: "Return On Investment: the ratio between the gain obtained and the amount invested. A key indicator for judging the profitability of a marketing action.",
      },
      {
        term: "CPL / CPA",
        slug: "cpl-cpa",
        category: "Data & measurement",
        short: "What a lead or a sale costs.",
        def: "Cost Per Lead (CPL) and Cost Per Acquisition (CPA): the average amount spent to obtain a qualified contact or a client, respectively. To be compared against the value generated.",
      },
      {
        term: "KPI",
        slug: "kpi",
        category: "Data & measurement",
        short: "The numbers that really count.",
        def: "Key Performance Indicator: a key metric chosen to measure progress toward a goal (conversion rate, cost per lead, qualified traffic…).",
      },
      {
        term: "CTR",
        slug: "ctr",
        category: "Data & measurement",
        short: "The % of clicks on a link or ad.",
        def: "Click-Through Rate: the proportion of people who click after seeing a link, an ad or a result. A high CTR signals a relevant message.",
      },
      {
        term: "Analytics",
        slug: "analytics",
        category: "Data & measurement",
        short: "Measure what happens on your site.",
        def: "Tools (Google Analytics, Matomo…) that track visitor behaviour: traffic sources, page views, conversions. The basis of every marketing decision.",
      },
      {
        term: "CMS",
        slug: "cms",
        category: "Web & tech",
        short: "The tool for managing a site's content.",
        def: "Content Management System (e.g. WordPress): a platform that lets you create and edit a site's pages without coding. Handy for staying hands-on day to day.",
      },
      {
        term: "WordPress",
        slug: "wordpress",
        category: "Web & tech",
        short: "The world's most widespread CMS.",
        def: "A hugely popular open-source content management system, ideal when you want to edit your pages yourself. Flexible thanks to its themes and plugins.",
      },
      {
        term: "Next.js",
        slug: "nextjs",
        category: "Web & tech",
        short: "An ultra-fast web framework.",
        def: "A React-based framework used to build highly performant, secure and SEO-optimised sites. Our default choice for bespoke work.",
      },
      {
        term: "Responsive",
        slug: "responsive",
        category: "Web & tech",
        short: "A site that adapts to every screen.",
        def: "Design that automatically adjusts the layout to the device (mobile, tablet, desktop), for an optimal experience everywhere.",
      },
      {
        term: "Core Web Vitals",
        slug: "core-web-vitals",
        category: "Web & tech",
        short: "Google's scores for technical quality.",
        def: "Google indicators measuring a page's load speed, responsiveness and visual stability. They influence ranking and user experience.",
      },
      {
        term: "GDPR (RGPD)",
        slug: "rgpd",
        category: "Web & tech",
        short: "The European data law.",
        def: "General Data Protection Regulation: the European framework governing the collection and use of personal data. A Luxembourg site must comply (consent, cookies…).",
      },
      {
        term: "Automation",
        slug: "automatisation",
        category: "Web & tech",
        short: "Leave repetitive tasks to machines.",
        def: "Setting up workflows that automatically run tasks (follow-ups, notifications, tool synchronisation), to save time and reduce errors.",
      },
      {
        term: "Brand identity",
        slug: "identite-de-marque",
        category: "Design & brand",
        short: "What makes your brand recognisable.",
        def: "A coherent set of visual elements and messages (logo, colours, typography, tone) that distinguishes your business and builds trust.",
      },
      {
        term: "Design system",
        slug: "design-system",
        category: "Design & brand",
        short: "A brand's visual toolbox.",
        def: "A library of reusable components, rules and styles that guarantees a site's or product's consistency and speeds up its creation.",
      },
      {
        term: "UX / UI",
        slug: "ux-ui",
        category: "Design & brand",
        short: "The experience and the interface.",
        def: "UX (User Experience) is about the user's feel and journey; UI (User Interface) is about the look and the elements they interact with. Both serve conversion.",
      },
    ] as GlossaryTerm[],
  },

  // ---- Service detail (shared labels + per-service content) ----
  servicesDetail: {
    overviewTitle: "In detail",
    includedTitle: "What's included",
    deliverablesTitle: "Deliverables",
    faqTitle: "Frequently asked questions",
  },
  serviceContent: {
    "sites-web": {
      intro: [
        "Your site is often the first — sometimes the only — meeting with a client. We design it like a salesperson who works 24/7: fast, clear, action-driven.",
        "Depending on your need, we build bespoke (Next.js, ultra-fast and AI-ready) or on WordPress when you want to keep control of content day to day. And yes: a large part of our production is AI-accelerated — more quality, delivered faster.",
      ],
      included: [
        { icon: "ai-build", title: "Built with AI", desc: "We accelerate design and development with AI, never sacrificing quality or consistency." },
        { icon: "wordpress", title: "WordPress when needed", desc: "Need to edit your pages yourself? We deliver a clean, secure and easy-to-manage WordPress." },
        { icon: "next-perf", title: "Next.js performance", desc: "For bespoke work, a near-instant, secure site built for SEO and GEO." },
        { icon: "responsive", title: "100% responsive", desc: "A flawless experience on mobile, tablet and desktop — mobile first." },
        { icon: "conversion", title: "Built to convert", desc: "Every page has a goal: generate a call, a quote, a lead. We guide the visitor to action." },
        { icon: "smart-forms", title: "Smart forms", desc: "Multi-step forms that qualify your prospects and lift the response rate." },
      ],
      deliverables: [
        "Bespoke mockups and design signed off with you",
        "Bespoke site (Next.js) or WordPress, your choice",
        "Baseline SEO & GEO optimisation built in",
        "Forms, tracking and go-live included",
      ],
      faq: [
        { q: "Bespoke or WordPress, how to choose?", a: "Bespoke (Next.js) offers the best performance and flexibility; WordPress is ideal if you want to edit content yourself. We advise based on your real use, no dogma." },
        { q: "What does \"built with AI\" mean?", a: "We use AI to accelerate design, code and content. The result: a higher-quality site, delivered faster and at a better value-for-money — reviewed and finalised by humans." },
        { q: "Will my site be optimised for Google and AI?", a: "Yes. We build in SEO and GEO best practices from the start: structure, performance, structured data and citable content." },
      ],
    },
    "seo-geo": {
      intro: [
        "Being visible is no longer enough: you have to be found on Google and cited by generative AI. We work both fronts at once, because 80% of the best practices are shared.",
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

  // ---- FAQ page (comprehensive, grouped) ----
  faqPage: {
    eyebrow: "FAQ",
    title: "All your questions, our clear answers.",
    lead: "Websites, SEO, leads, advertising, AI, pricing, timelines, GDPR… Everything we get asked before getting started. Still have a question? Write to us.",
    searchPlaceholder: "Search for a question…",
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
          { q: "Bespoke or WordPress, how to choose?", a: "Bespoke (Next.js) offers the best performance, security and flexibility; WordPress is ideal if you want to edit content yourself day to day. We advise based on your real use, no dogma." },
          { q: "Is it true your sites are \"built with AI\"?", a: "Yes. We use AI to accelerate design, code and content. The result: a higher-quality site, delivered faster and at a better value-for-money — always reviewed and finalised by humans." },
          { q: "Will my site be fast and mobile-friendly?", a: "Absolutely. Performance and mobile-first are the baseline: a near-instant site, 100% responsive and accessible on every screen." },
          { q: "Will I be able to edit my site myself?", a: "On WordPress, yes, easily. On bespoke builds, we set up what's needed for you to manage your key content — or we handle it for you." },
          { q: "Will my site be optimised for Google and AI?", a: "Yes. We build in SEO and GEO best practices from the start: structure, performance, structured data and content citable by AI answer engines." },
          { q: "Do you handle hosting and maintenance?", a: "Yes. We can take on hosting, updates, security and enhancements, so you don't have to worry about it." },
        ],
      },
      {
        title: "SEO & GEO",
        items: [
          { q: "What's the difference between SEO and GEO?", a: "SEO puts you in Google's list of results; GEO (Generative Engine Optimization) puts you in the answer generated by an AI like ChatGPT or Perplexity. We optimise for both, because 80% of the best practices are shared." },
          { q: "Is GEO real or just a fad?", a: "It's very real: more and more decision-makers ask their questions to an AI rather than Google. If you don't appear in the answer, you don't exist in the decision. We structure your content to be cited as a source." },
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
        "Discover the projects and results of vortx, marketing and web agency in Luxembourg.",
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
  },

  // ---- Standalone pages ----
  pages: {
    thanks: {
      title: "Thank you, your request is on its way.",
      lead: "We're reviewing it and will get back to you quickly with an initial analysis — no commitment.",
      cta: "Back to home",
      metaTitle: "Thank you | vortx Luxembourg",
    },
    notFound: {
      title: "Page not found",
      lead: "The page you're looking for doesn't exist or has been moved.",
      cta: "Back to home",
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
} as const;
