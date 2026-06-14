import type { ArticleBlock, GlossaryTerm } from "./fr";

export const es = {
  locale: "es",
  brand: {
    name: "vortx",
    baseline: "Agencia de marketing y web · Luxemburgo",
    tagline: "La atracción, por el diseño.",
  },

  // ---- Global / reusable ----
  common: {
    cta: "Reservar una llamada",
    ctaSecondary: "Ver los servicios",
    ctaShort: "Hablemos",
    auditCta: "Obtener una auditoría gratuita",
    readMore: "Saber más",
    backHome: "Volver al inicio",
    allServices: "Todos los servicios",
    servicesShort: "Los servicios",
    menu: "Menú",
    close: "Cerrar",
    openMenu: "Abrir el menú",
    toggleTheme: "Cambiar de tema",
    language: "Idioma",
    breadcrumbHome: "Inicio",
  },

  nav: {
    services: "Servicios",
    approach: "Enfoque",
    work: "Proyectos",
    about: "Agencia",
    resources: "Recursos",
    news: "Novedades",
    glossary: "Glosario",
    faq: "Preguntas frecuentes",
    contact: "Contacto",
  },

  // ---- Mega menu ----
  megaMenu: {
    servicesTitle: "Lo que hacemos",
    servicesLead:
      "De la primera impresión al cliente firmado. Una cadena completa, pensada para la conversión.",
    columns: {
      acquire: "Atraer",
      convert: "Convertir",
      scale: "Hacer crecer",
    },
    featured: {
      label: "Destacado",
      title: "Sitio de captación listo para convertir",
      desc: "Un sitio rápido, pensado para la IA, listo para convertir.",
    },
  },

  // ---- HERO ----
  hero: {
    eyebrow: "Agencia de marketing · Luxemburgo",
    titleLead: "Marketing y web en Luxemburgo que",
    titleAccent: "atrae y convierte.",
    subtitle:
      "vortx diseña sitios y estrategias de captación que transforman la atención en clientes. Diseño premium, SEO de nueva generación, generación de leads medible.",
    primaryCta: "Reservar una llamada de descubrimiento",
    secondaryCta: "Descubrir nuestro enfoque",
    note: "Respuesta rápida · Auditoría gratuita · Sin compromiso · 100 % a medida",
  },

  stats: [
    { value: "Express", label: "Respuesta garantizada" },
    { value: "100 %", label: "Diseñado a medida" },
    { value: "FR · DE · EN", label: "Multilingüe nativo" },
  ],

  // ---- Trust / positioning band ----
  trust: {
    eyebrow: "Por qué vortx",
    title: "Una agencia, no un proveedor.",
    lead: "En Luxemburgo, sus clientes comparan en francés, en alemán y en inglés. Construimos presencias que rinden en los tres idiomas — y que hablan tanto a Google como a las IA generativas.",
    pillars: [
      {
        title: "La estrategia primero",
        desc: "No hay sitio bonito sin objetivo. Partimos de su embudo de ventas, no de una plantilla.",
      },
      {
        title: "Conversión medible",
        desc: "Cada página tiene una misión: generar una llamada, un presupuesto, un lead. Medimos y optimizamos.",
      },
      {
        title: "Anclaje local",
        desc: "Mercado luxemburgués, multilingüe, RGPD. Conocemos su terreno.",
      },
      {
        title: "Listo para la IA",
        desc: "SEO + GEO/GSO: ser citado por Google Y por las respuestas de las IA generativas.",
      },
    ],
  },

  // ---- SERVICES ----
  servicesSection: {
    eyebrow: "Nuestros servicios",
    title: "Una cadena completa, de la atención al cliente.",
    lead: "Seis especialidades que encajan entre sí. Tome una, o déjenos orquestar el conjunto.",
  },

  services: [
    {
      slug: "sites-web",
      group: "convert",
      title: "Sitios web que convierten",
      tagline: "Sitios rápidos, pensados para transformar al visitante en cliente.",
      short:
        "Sitios corporativos, landing pages y plataformas a medida en Next.js — o en WordPress cuando quiere conservar el control. Producción acelerada por IA, diseño premium y embudos de conversión integrados.",
      bullets: [
        "A medida en Next.js o WordPress, según su necesidad",
        "Producción acelerada por IA, entregada más rápido",
        "Diseño a medida, mobile-first",
        "Formularios inteligentes de varios pasos",
        "100 % responsive y accesible",
      ],
      metaTitle: "Creación de sitios web en Luxemburgo | vortx",
      metaDescription:
        "Sitios web rápidos, de diseño premium y orientados a la conversión para las empresas luxemburguesas. Desarrollo Next.js, multilingüe, listo para SEO.",
    },
    {
      slug: "seo-geo",
      group: "acquire",
      title: "SEO y GEO / GSO",
      tagline: "Visible en Google. Citado por las IA.",
      short:
        "Posicionamiento orgánico técnico y editorial, ampliado a la era de los motores generativos (GEO/GSO): ser la respuesta, no el enlace n.º 7.",
      bullets: [
        "Auditoría técnica y semántica",
        "Contenido optimizado FR/DE/EN",
        "Esquemas listos para LLM y datos estructurados",
        "Seguimiento de posiciones y de citas en IA",
      ],
      metaTitle: "Agencia SEO y GEO en Luxemburgo | vortx",
      metaDescription:
        "Posicionamiento orgánico y optimización para las IA generativas (GEO/GSO) en Luxemburgo. Sea encontrado en Google y citado por los asistentes de IA.",
    },
    {
      slug: "lead-generation",
      group: "convert",
      title: "Generación de leads",
      tagline: "Solicitudes de presupuesto concretas, cada semana.",
      short:
        "Un sistema de captación completo: sitio optimizado, embudos, campañas y automatización para llenar su agenda de prospectos cualificados.",
      bullets: [
        "Embudos de conversión a medida",
        "Landing pages por campaña",
        "Cualificación y scoring de los leads",
        "Reporting claro sobre el coste por lead",
      ],
      metaTitle: "Generación de leads B2B en Luxemburgo | vortx",
      metaDescription:
        "Sistema de generación de leads para pymes y autónomos luxemburgueses: solicitudes de presupuesto cualificadas cada semana, sin tener que prospectar usted mismo.",
    },
    {
      slug: "publicite",
      group: "acquire",
      title: "Publicidad online",
      tagline: "El mensaje correcto, ante las personas correctas.",
      short:
        "Campañas en Google Ads, Meta y LinkedIn dirigidas por los datos. Invertimos su presupuesto donde da resultados.",
      bullets: [
        "Google Ads y Performance Max",
        "Meta Ads (Facebook e Instagram)",
        "LinkedIn Ads B2B",
        "Optimización continua del ROAS",
      ],
      metaTitle: "Publicidad online (Google y Meta Ads) Luxemburgo | vortx",
      metaDescription:
        "Campañas en Google Ads, Meta y LinkedIn rentables para el mercado luxemburgués. Adquisición de pago dirigida por los datos y orientada al ROI.",
    },
    {
      slug: "branding-design",
      group: "convert",
      title: "Creación de logos y branding",
      tagline: "Un logo y una marca que se recuerdan.",
      short:
        "Logo a medida, identidad visual completa y manual de marca. La coherencia que inspira confianza antes incluso de la primera palabra.",
      bullets: [
        "Creación de logo a medida",
        "Identidad visual completa",
        "Manual de marca y reglas de uso",
        "Adaptaciones impresas y digitales",
      ],
      metaTitle: "Creación de logo y branding en Luxemburgo | vortx",
      metaDescription:
        "Creación de logo a medida, identidad de marca y manual de marca para las empresas luxemburguesas. Una imagen coherente que inspira confianza.",
    },
    {
      slug: "automatisation-ia",
      group: "scale",
      title: "Automatización e IA",
      tagline: "Más resultados, menos tareas repetitivas.",
      short:
        "Flujos de trabajo automatizados, integraciones y agentes de IA a medida para que sus equipos ganen tiempo y respondan más rápido.",
      bullets: [
        "Automatización de los flujos de trabajo",
        "Agentes y asistentes de IA a medida",
        "Integraciones con CRM y herramientas",
        "Chatbots y widgets inteligentes",
      ],
      metaTitle: "Automatización e IA para empresas Luxemburgo | vortx",
      metaDescription:
        "Automatización de los flujos de trabajo, integraciones y agentes de IA a medida para las empresas luxemburguesas. Gane tiempo, responda más rápido.",
    },
  ],

  // ---- Lead-gen / problem→solution ----
  leadgen: {
    eyebrow: "El problema, luego la solución",
    title: "Un buen sitio no basta. Tiene que dar resultados.",
    problemTitle: "Sin un sistema de captación:",
    problems: [
      "Oportunidades que pasan desapercibidas",
      "Un ROI de marketing decepcionante",
      "Demasiadas visitas, demasiado pocos contactos",
    ],
    solutionTitle: "Con vortx:",
    solutions: [
      "Un sitio pensado para convertir, entregado rápido",
      "Un embudo claro: visitante → lead → cliente",
      "Un presupuesto de marketing que se justifica en cifras",
    ],
    funnel: ["Visitante", "Interesado", "Prospecto", "Cliente"],
  },

  // ---- Process ----
  process: {
    eyebrow: "Nuestro método",
    title: "El ADN del marketing, cero sorpresas desagradables.",
    steps: [
      {
        n: "01",
        title: "Diagnóstico",
        desc: "Analizamos su mercado, sus objetivos y su embudo actual para construir una estrategia a medida.",
      },
      {
        n: "02",
        title: "Diseño y desarrollo",
        desc: "Diseño premium y desarrollo con las últimas tecnologías, con las mejores prácticas de conversión.",
      },
      {
        n: "03",
        title: "Revisión y ajustes",
        desc: "Le presentamos el resultado y ajustamos hasta que quede plenamente satisfecho.",
      },
      {
        n: "04",
        title: "Lanzamiento y seguimiento",
        desc: "Puesta en línea, configuración y acompañamiento para empezar a generar resultados.",
      },
    ],
  },

  // ---- Tools / stack ----
  tools: {
    eyebrow: "Nuestro arsenal",
    title: "Las mejores herramientas, dominadas en profundidad.",
    lead: "Marketing, código, IA, diseño. Elegimos la herramienta por el resultado, no al revés.",
    stat: { value: "40+", label: "herramientas dominadas" },
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
        name: "Web y código",
        items: ["WordPress", "Divi", "CSS", "HTML", "VS Code"],
      },
      {
        name: "IA y automatización",
        items: [
          "Claude Code",
          "ChatGPT",
          "Perplexity",
          "Zapier",
          "IA edición de imágenes",
        ],
      },
      {
        name: "Diseño",
        items: [
          "Photoshop",
          "Illustrator",
          "Adobe Express",
          "Canva",
          "Affinity",
          "Figma",
          "GIMP",
          "UI/UX",
          "Maquetas",
        ],
      },
      {
        name: "Productividad",
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
    eyebrow: "El SEO del futuro",
    title: "GEO / GSO: ser la respuesta de la IA.",
    lead: "La búsqueda evoluciona. Sus clientes plantean sus preguntas a asistentes de IA. Optimizamos para que vortx — y usted — sean la fuente citada.",
    points: [
      {
        title: "Citas directas por la IA",
        desc: "Contenido estructurado para ser retomado en las respuestas generativas.",
      },
      {
        title: "Esquemas listos para LLM",
        desc: "Datos estructurados y archivos (llms.txt) que hablan a los modelos.",
      },
      {
        title: "SEO y GEO integrados",
        desc: "No sacrificamos Google por la IA — ganamos en ambos.",
      },
    ],
  },

  // ---- Proof (honest placeholders) ----
  proof: {
    eyebrow: "Confianza",
    title: "La prueba por los resultados.",
    placeholderNote:
      "Casos de éxito en proceso de publicación. Sus resultados serán los próximos.",
    logosTitle: "Confían en nosotros",
    guaranteesTitle: "Nuestros compromisos",
    testimonials: [
      // À remplacer par de vrais témoignages clients.
    ] as { quote: string; author: string; role: string }[],
    guarantees: [
      "Consulta inicial gratuita",
      "Presupuesto sin compromiso",
      "Respuesta rápida garantizada",
      "Acompañamiento tras el lanzamiento",
    ],
  },

  // ---- FAQ ----
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que los clientes preguntan antes de empezar.",
    items: [
      {
        q: "¿Cuánto cuesta un sitio o una campaña?",
        a: "Cada proyecto es a medida. En lugar de una tarifa genérica, le proponemos un presupuesto preciso tras una llamada de descubrimiento gratuita y una auditoría de su situación.",
      },
      {
        q: "¿Trabajan en varios idiomas?",
        a: "Sí. Nuestros sitios son multilingües de forma nativa (FR, DE, EN, y Lëtzebuergesch bajo petición), adaptados al mercado luxemburgués.",
      },
      {
        q: "¿Qué es el GEO / GSO?",
        a: "Es la optimización para los motores de respuesta de IA (ChatGPT, Perplexity, Google AI). Estructuramos su contenido para que las IA le citen como fuente.",
      },
      {
        q: "¿Ofrecen seguimiento tras la puesta en línea?",
        a: "Sí. Mantenimiento, evoluciones, optimización de la conversión y acompañamiento de marketing continuo forman parte de nuestra oferta.",
      },
    ],
  },

  // ---- Final CTA / contact ----
  contact: {
    eyebrow: "Pasemos a la acción",
    title: "¿Listo para transformar su presencia online?",
    lead: "Reserve una llamada de descubrimiento gratuita. Analizamos su situación y le decimos, sin rodeos, qué se puede mejorar.",
    benefits: [
      "Consulta inicial gratuita",
      "Auditoría personalizada sin demora",
      "Presupuesto sin compromiso",
      "Acompañamiento tras el lanzamiento",
    ],
    form: {
      name: "Nombre completo",
      email: "Correo electrónico",
      phone: "Teléfono (opcional)",
      company: "Empresa (opcional)",
      interest: "Servicio que le interesa",
      message: "Su mensaje",
      submit: "Enviar mi solicitud",
      success: "¡Gracias! Le responderemos muy pronto.",
      step: "Paso",
      next: "Siguiente",
      back: "Atrás",
      stepServices: "Sus necesidades",
      stepDetails: "Sus datos",
      stepMessage: "Su mensaje",
      servicesLabel: "¿Qué servicios le interesan?",
      servicesHint: "Seleccione uno o varios servicios.",
      servicesRequired: "Seleccione al menos un servicio para continuar.",
      consentBefore:
        "Al marcar esta casilla, confirmo que he tomado conocimiento de cómo se tratan y conservan mis datos personales, tal como se describe en la ",
      consentLink: "política de privacidad",
      consentAfter: ".",
      consentRequired: "Por favor, confirme este punto para continuar.",
      error:
        "Se ha producido un error. Vuelva a intentarlo o escríbanos directamente por correo.",
    },
  },

  // ---- Footer (cd-lac style) ----
  footer: {
    blurb:
      "vortx — agencia de marketing y web en Luxemburgo. Atraemos la atención y la convertimos en clientes.",
    columns: {
      services: {
        title: "Servicios",
        links: [
          { label: "Sitios web", href: "/services/sites-web" },
          { label: "SEO y GEO", href: "/services/seo-geo" },
          { label: "Generación de leads", href: "/services/lead-generation" },
          { label: "Publicidad online", href: "/services/publicite" },
          { label: "Creación de logos y branding", href: "/services/branding-design" },
          { label: "Automatización e IA", href: "/services/automatisation-ia" },
        ],
      },
      company: {
        title: "Agencia",
        links: [
          { label: "Quiénes somos", href: "/agence" },
          { label: "Nuestro método", href: "/approche" },
          { label: "Proyectos", href: "/realisations" },
          { label: "Novedades", href: "/news" },
          { label: "Glosario", href: "/glossaire" },
          { label: "Preguntas frecuentes", href: "/faq" },
          { label: "Contacto", href: "/contact" },
        ],
      },
      legal: {
        title: "Legal",
        links: [
          { label: "Aviso legal", href: "/mentions-legales" },
          { label: "Privacidad", href: "/confidentialite" },
          { label: "Cookies", href: "/cookies" },
        ],
      },
    },
    contactTitle: "Contacto",
    location: "Luxemburgo",
    rights: "Todos los derechos reservados.",
    madeWith: "Diseñado con esmero y mucha IA.",
    backToTop: "Volver arriba",
  },

  // ---- Agence (about) page ----
  agence: {
    eyebrow: "La agencia",
    title: "Un equipo de atracción, al servicio de su crecimiento.",
    lead: "vortx reúne el marketing, el diseño y la tecnología bajo un mismo techo, en Luxemburgo. Una obsesión: transformar la atención en clientes, y demostrarlo en cifras.",
    story: [
      "vortx nació de una constatación simple: demasiadas empresas luxemburguesas tienen un sitio que parece un folleto — bonito, pero que no genera nada. Construimos lo contrario: presencias digitales pensadas como máquinas de captación.",
      "Detrás de la agencia hay un equipo que suma más de una década de experiencia en marketing digital, desarrollo web y dirección artística. Hemos visto pasar las modas; conservamos lo que convierte y desechamos el resto.",
      "Trabajamos en francés, en alemán y en inglés, con una sola exigencia: que cada euro invertido en su marketing sea justificable. Sin jerga, sin promesas vacías — resultados medibles.",
    ],
    experience: {
      suffix: "años",
      label: "de experiencia acumulada",
      note: "marketing · web · diseño",
    },
    stats: [
      { value: "100 %", label: "A medida, nunca una plantilla" },
      { value: "FR·DE·EN", label: "Multilingüe nativo" },
      { value: "GEO", label: "Optimizado para las IA generativas" },
    ],
    valuesTitle: "Lo que nos distingue",
    arsenalTitle: "Nuestro arsenal",
    arsenalLead:
      "Las herramientas que dominamos para diseñar, medir y hacer crecer. Marketing, código, IA, diseño, productividad — elegimos la herramienta por el resultado, no al revés.",
    ctaTitle: "¿Le apetece trabajar juntos?",
  },

  // ---- Reviews (homepage) — PLACEHOLDERS: replace with real client reviews ----
  reviews: {
    eyebrow: "Opiniones de clientes",
    title: "Lo que dicen las empresas que confían en nosotros.",
    lead: "Comentarios concretos de directivos y equipos de marketing en Luxemburgo.",
    aggregate: {
      rating: "4,9",
      ratingMax: "5",
      countLabel: "opiniones verificadas",
      count: "27",
      platform: "Google",
    },
    note: "Opiniones representativas — a reemplazar por sus opiniones reales de Google / Trustpilot.",
    items: [
      {
        name: "Laurent M.",
        role: "Gerente, empresa de construcción",
        location: "Strassen",
        rating: 5,
        quote:
          "Nuestro nuevo sitio genera solicitudes de presupuesto cada semana. En tres meses recuperamos la inversión. Ágiles, claros, y el resultado habla por sí solo.",
      },
      {
        name: "Sophie R.",
        role: "Responsable de marketing, consultora",
        location: "Luxembourg-Ville",
        rating: 5,
        quote:
          "Por fin una agencia que habla de resultados y no solo de diseño. El trabajo de SEO nos hizo subir en búsquedas que nuestros competidores dominaban desde hacía años.",
      },
      {
        name: "Marco F.",
        role: "Fundador, e-commerce artesanal",
        location: "Esch-sur-Alzette",
        rating: 5,
        quote:
          "Sitio rehecho de cero a fin, rápido e impecable en móvil. El equipo lo automatizó todo para que dediquemos menos tiempo a lo administrativo. Una ganancia real en el día a día.",
      },
      {
        name: "Anne K.",
        role: "Directora, agencia inmobiliaria",
        location: "Bertrange",
        rating: 5,
        quote:
          "Profesionales y con buen criterio. Entendieron nuestro mercado luxemburgués y adaptaron el mensaje en FR y en DE. Los leads están más cualificados que antes.",
      },
      {
        name: "David L.",
        role: "CEO, startup SaaS",
        location: "Luxembourg-Ville",
        rating: 5,
        quote:
          "Su enfoque GEO nos puso por delante de la competencia en ChatGPT y Perplexity. Ahora nos citan como referencia. Impresionante y muy adelantado a su tiempo.",
      },
      {
        name: "Christine B.",
        role: "Gerente, instituto de bienestar",
        location: "Differdange",
        rating: 4,
        quote:
          "Acompañamiento excelente de principio a fin. El sitio es magnífico y los primeros resultados en reservas ya están aquí. Con ganas de seguir con ellos.",
      },
    ],
  },

  // ---- News / blog ----
  news: {
    eyebrow: "Novedades",
    title: "Ideas, tendencias y entresijos del marketing digital.",
    lead: "Nuestros análisis sobre el SEO, el GEO, la conversión y el web en Luxemburgo. Algo concreto, no humo.",
    homeTitle: "Últimas novedades",
    homeLead: "Compartimos lo que aprendemos. Estrategia, IA, conversión — sin rodeos.",
    seeAll: "Ver todas las novedades",
    readArticle: "Leer el artículo",
    readingTime: "min de lectura",
    publishedOn: "Publicado el",
    updatedOn: "Actualizado el",
    by: "Por",
    backToNews: "Todas las novedades",
    tocTitle: "Índice",
    relatedTitle: "Lea también",
    ctaTitle: "¿Quiere ser citado por las IA, usted también?",
    summaryLabel: "Resumen generado por IA",
    summaryDisclaimer: "Síntesis automática de los puntos clave, revisada por nuestro equipo.",
    summaryPointsLabel: "Para recordar",
    linksTitle: "Para profundizar",
    allCategories: "Todos los temas",
    filterLabel: "Filtrar por tema",
    emptyLabel: "Aún no hay artículos sobre este tema.",
    articleCtaTitle: "¿Tiene un proyecto en mente?",
    articleCtaText:
      "Hablemos. Reciba un presupuesto claro y sin compromiso para su sitio web o su estrategia de captación.",
    articleCtaButton: "Solicitar presupuesto",
    shareLabel: "Compartir",
    shareCopy: "Copiar enlace",
    shareCopied: "¡Enlace copiado!",
    articles: [
      {
        slug: "geo-seo-luxembourg-etre-cite-par-les-ia",
        category: "SEO y GEO",
        title:
          "SEO vs GEO: cómo ser encontrado en Google Y citado por las IA en 2026",
        excerpt:
          "El posicionamiento ya no se juega solo en Google. ChatGPT, Perplexity y Google AI se convierten en la nueva puerta de entrada. Le explicamos cómo el SEO y el GEO trabajan juntos — y qué hay que hacer concretamente.",
        date: "2026-06-02",
        updated: "2026-06-02",
        readingMinutes: 9,
        author: "El equipo vortx",
        cover: "geo-citation",
        summary: {
          text: "El posicionamiento ya no se limita a Google: ChatGPT, Perplexity y Google AI se convierten en una nueva puerta de entrada. El artículo explica la diferencia entre SEO y GEO y cómo trabajar ambos juntos, con acciones concretas para ser citado por las IA.",
          points: [
            "El SEO le posiciona en los resultados; el GEO le coloca dentro de la respuesta de la IA.",
            "Estructure sus páginas en formato pregunta/respuesta y ánclelas en hechos locales para ser citado.",
            "El 80 % del trabajo es común: un buen contenido rinde en Google Y ante los modelos.",
          ],
        },
        links: [
          { label: "Google Ads o SEO: dónde invertir su presupuesto", href: "/news/google-ads-ou-seo-ou-investir-budget-marketing", desc: "Comparar las palancas de captación de pago y orgánicas." },
          { label: "Nuestro servicio SEO y GEO / GSO", href: "/services/seo-geo", desc: "Cómo le hacemos visible en Google y citado por las IA." },
          { label: "Glosario del marketing y del web", href: "/glossaire", desc: "SEO, GEO, GSO… el vocabulario explicado de forma sencilla." },
        ],
        body: [
          {
            type: "p",
            text: "Durante veinte años, «ser visible en línea» significaba una cosa: subir en los resultados de Google. Hoy, una parte creciente de sus clientes ya no escribe una consulta en un buscador — plantea una pregunta a una IA. ChatGPT, Perplexity, Google AI Overviews o Copilot responden directamente, citan algunas fuentes, y el usuario a veces no hace clic en ningún enlace. La pregunta, por tanto, ya no es solo «¿estoy primero en Google?» sino «¿me cita la IA como respuesta?».",
          },
          {
            type: "h2",
            id: "seo-geo-definitions",
            text: "SEO, GEO, GSO: ¿de qué hablamos?",
          },
          {
            type: "p",
            text: "El SEO (Search Engine Optimization) reúne todo lo que le hace subir en los buscadores clásicos: calidad técnica del sitio, relevancia del contenido, autoridad (enlaces), experiencia de usuario. Es la base, y no desaparece.",
          },
          {
            type: "p",
            text: "El GEO (Generative Engine Optimization), a veces llamado GSO (Generative Search Optimization), es la optimización para los motores de respuesta generativos. El objetivo cambia: ya no se trata solo de estar bien posicionado, sino de ser la fuente que el modelo retoma, resume y cita en su respuesta.",
          },
          {
            type: "callout",
            title: "En una frase",
            text: "El SEO le coloca en la lista de resultados. El GEO le coloca en la respuesta misma.",
          },
          {
            type: "h2",
            id: "pourquoi-maintenant",
            text: "Por qué preocuparse ahora",
          },
          {
            type: "p",
            text: "Porque el comportamiento de búsqueda cambia rápido, sobre todo en B2B. Un decisor que prepara una compra pregunta cada vez más «¿cuáles son las mejores agencias de marketing en Luxemburgo?» a una IA en lugar de a Google. Si su empresa no aparece en la respuesta, no existe en esa decisión — aunque sea tercero en Google.",
          },
          {
            type: "ul",
            items: [
              "Las respuestas de IA reducen el número de clics: ser citado cuenta más que ser listado.",
              "Los modelos priorizan los contenidos claros, estructurados y objetivos.",
              "La confianza se construye: una marca citada por una IA gana en credibilidad percibida.",
            ],
          },
          {
            type: "h2",
            id: "comment-faire",
            text: "Cómo optimizar concretamente para el GEO",
          },
          {
            type: "h3",
            text: "1. Estructure el contenido para ser citado",
          },
          {
            type: "p",
            text: "A los modelos les gustan las respuestas nítidas. Una página que plantea una pregunta en el título (H2/H3) y la responde en dos frases claras justo debajo tiene muchas más probabilidades de ser retomada que un párrafo largo y sinuoso. Piense «definición, luego detalle».",
          },
          {
            type: "h3",
            text: "2. Aporte hechos, cifras y contexto local",
          },
          {
            type: "p",
            text: "Un contenido verificable y preciso (cifras, fechas, lugares — aquí, el mercado luxemburgués, el multilingüismo FR/DE/EN, el RGPD) es más «citable». Las generalidades se ignoran; los hechos anclados se retoman.",
          },
          {
            type: "h3",
            text: "3. Haga el sitio legible por las máquinas",
          },
          {
            type: "ul",
            items: [
              "Datos estructurados (Schema.org): Organization, Service, FAQPage, Article.",
              "Un archivo llms.txt que resuma su oferta para los modelos.",
              "Una arquitectura limpia, títulos jerarquizados, tiempos de carga cortos.",
            ],
          },
          {
            type: "h3",
            text: "4. Construya la autoridad, en todas partes",
          },
          {
            type: "p",
            text: "Las IA se apoyan en lo que se dice de usted en otros sitios: opiniones, directorios, menciones de prensa, perfiles coherentes. Una presencia homogénea (mismo nombre, misma dirección, misma promesa) refuerza la probabilidad de ser retenido como fuente fiable.",
          },
          {
            type: "h2",
            id: "seo-et-geo-ensemble",
            text: "El SEO y el GEO no se oponen — se refuerzan",
          },
          {
            type: "p",
            text: "Buena noticia: el 80 % del trabajo es común. Un contenido estructurado, rápido, fiable y bien etiquetado rinde a la vez en Google y ante los modelos. No sacrificamos uno por el otro — diseñamos desde el principio para los dos.",
          },
          {
            type: "quote",
            text: "El objetivo ya no es ser el enlace n.º 7. Es ser la respuesta.",
          },
          {
            type: "callout",
            title: "Para recordar",
            text: "Cuide su SEO técnico y editorial, estructure sus páginas para la cita, añada datos estructurados y un llms.txt, y ancle su contenido en hechos locales. Gana en Google y en las respuestas de IA.",
          },
          {
            type: "p",
            text: "En vortx, construimos cada sitio y cada estrategia de contenido con esta doble exigencia desde la primera línea. Si quiere saber en qué punto se encuentra hoy, le ofrecemos una auditoría SEO/GEO sin compromiso.",
          },
        ],
      },
      {
        slug: "google-ads-ou-seo-ou-investir-budget-marketing",
        category: "Adquisición",
        title:
          "Google Ads o SEO: ¿dónde invertir su presupuesto de marketing en 2026?",
        excerpt:
          "¿Hay que pagar para aparecer en lo más alto de Google, o trabajar el posicionamiento natural? La verdadera pregunta no es «lo uno o lo otro», sino «cuál, cuándo y para qué objetivo». Lo aclaramos todo, con cifras y sentido común.",
        date: "2026-06-04",
        updated: "2026-06-04",
        readingMinutes: 8,
        author: "El equipo vortx",
        cover: "ads-targeting",
        summary: {
          text: "¿Hay que invertir en Google Ads o en SEO? La respuesta depende de su objetivo y de su plazo. El artículo contrapone el «alquiler» (Ads, inmediato) a la «propiedad» (SEO, duradera) y muestra cómo combinarlos según su situación.",
          points: [
            "Google Ads = resultados inmediatos mientras paga; SEO = activo duradero que tarda en llegar.",
            "La dosis adecuada depende de su plazo, de su mercado y de su presupuesto.",
            "Ambos se complementan: la publicidad arranca, el SEO le independiza del presupuesto.",
          ],
        },
        links: [
          { label: "SEO vs GEO: ser encontrado Y citado en 2026", href: "/news/geo-seo-luxembourg-etre-cite-par-les-ia", desc: "La visibilidad orgánica en la era de las IA." },
          { label: "Nuestro servicio Publicidad online", href: "/services/publicite", desc: "Google Ads, Meta y LinkedIn pilotados por los datos." },
          { label: "Nuestro servicio SEO y GEO", href: "/services/seo-geo", desc: "Construir un activo de visibilidad duradero." },
        ],
        body: [
          {
            type: "p",
            text: "Es una de las preguntas que más nos hacen: «¿Pongo mi presupuesto en publicidad o en SEO?». Respuesta honesta: depende de su objetivo, de su plazo y de su mercado. Ambos traen clientes desde Google, pero no funcionan de la misma manera — y, sobre todo, no se sustituyen, se complementan.",
          },
          {
            type: "h2",
            id: "deux-leviers",
            text: "Dos palancas, dos lógicas",
          },
          {
            type: "p",
            text: "Google Ads (el SEA, o posicionamiento de pago) es alquiler: usted paga para aparecer en lo más alto, de inmediato, mientras su presupuesto siga rodando. El SEO (posicionamiento natural) es propiedad: usted construye un activo que tarda en consolidarse, pero que sigue generando tráfico incluso cuando deja de pagar.",
          },
          {
            type: "h2",
            id: "google-ads",
            text: "Google Ads: la visibilidad inmediata",
          },
          {
            type: "p",
            text: "Lanza una campaña hoy y puede ser el primero en sus palabras clave esta misma tarde. Es la herramienta ideal cuando necesita resultados rápidos, cuando prueba una oferta, o para las búsquedas muy competitivas.",
          },
          {
            type: "ul",
            items: [
              "Resultados inmediatos: tráfico y leads desde el primer día.",
              "Segmentación precisa: palabras clave, zona geográfica, horarios, audiencia.",
              "Medible al céntimo: sabe exactamente cuánto le cuesta cada lead.",
              "Ideal para las promociones, los lanzamientos y las campañas estacionales.",
            ],
          },
          {
            type: "p",
            text: "El reverso: en cuanto deja de pagar, la visibilidad se apaga. Y en ciertos sectores, el coste por clic puede dispararse rápido. La publicidad es un grifo: potente, pero que se para cuando cierra el agua.",
          },
          {
            type: "h2",
            id: "seo",
            text: "SEO: el activo que trabaja a largo plazo",
          },
          {
            type: "p",
            text: "El SEO requiere paciencia — de unas semanas a unos meses — pero construye algo que le pertenece. Una vez bien posicionado, su sitio atrae un tráfico constante sin coste por clic, y la confianza de un resultado natural suele ser superior a la de un anuncio.",
          },
          {
            type: "ul",
            items: [
              "Tráfico duradero: su posicionamiento sigue trabajando con el tiempo.",
              "Mayor credibilidad: se confía más en los resultados naturales.",
              "Coste decreciente: la inversión inicial se amortiza, el clic es «gratis».",
              "Compatible con el GEO: un buen SEO también le hace citable por las IA generativas.",
            ],
          },
          {
            type: "callout",
            title: "En una frase",
            text: "Google Ads compra visibilidad ahora; el SEO la construye para mañana. Lo uno es un gasto, lo otro una inversión.",
          },
          {
            type: "h2",
            id: "lequel-choisir",
            text: "Cuál elegir según su situación",
          },
          {
            type: "p",
            text: "En lugar de zanjarlo en abstracto, mire en qué punto está:",
          },
          {
            type: "ul",
            items: [
              "Está lanzando su actividad y quiere leads rápido: empiece por Google Ads.",
              "Busca rentabilidad a largo plazo: invierta en SEO en paralelo.",
              "Su sector es muy competitivo en Google: combine ambos para ocupar el terreno.",
              "Su presupuesto es ajustado: priorice el SEO en sus páginas clave, y la publicidad en una sola oferta estrella.",
            ],
          },
          {
            type: "h2",
            id: "ensemble",
            text: "La verdadera respuesta: los dos juntos",
          },
          {
            type: "p",
            text: "Las empresas que rinden no eligen — orquestan. La publicidad aporta resultados inmediatos y datos valiosos (qué palabras clave convierten de verdad), que luego alimentan la estrategia SEO. Mientras el SEO gana fuerza, la publicidad mantiene el flujo de leads. Después, a medida que lo natural toma el relevo, se puede reducir la dependencia del pago.",
          },
          {
            type: "quote",
            text: "La publicidad enciende el fuego al instante. El SEO lo mantiene para que no vuelva a apagarse.",
          },
          {
            type: "callout",
            title: "Para recordar",
            text: "No razone «Ads O SEO», sino «Ads Y SEO», dosificados según su plazo y su presupuesto. La publicidad para la velocidad, el SEO para la duración — y ambos reforzándose.",
          },
          {
            type: "p",
            text: "En vortx, construimos esta combinación según su situación real, sin venderle uno en detrimento del otro. Le ofrecemos una auditoría gratuita para decirle dónde rendirá más su presupuesto.",
          },
        ],
      },
      {
        slug: "tunnel-de-conversion-transformer-visiteurs-en-clients",
        category: "Conversión",
        title:
          "Embudo de conversión: transformar a sus visitantes en clientes, paso a paso",
        excerpt:
          "Atraer tráfico está bien. Convertirlo en clientes es lo que de verdad importa. El embudo de conversión es el mapa que une el primer clic con el contrato firmado — y cada etapa mal pensada le cuesta ventas. Así se construye.",
        date: "2026-06-07",
        updated: "2026-06-07",
        readingMinutes: 7,
        author: "El equipo vortx",
        cover: "conversion",
        summary: {
          text: "Atraer tráfico no sirve de nada si no se transforma. El artículo desglosa el embudo de conversión paso a paso — del primer clic al contrato — y muestra dónde se pierden visitantes y cómo tapar cada fuga.",
          points: [
            "Cada etapa mal pensada del embudo le cuesta ventas.",
            "Guiamos al visitante hacia una acción clara en cada página.",
            "Medir los abandonos permite optimizar donde de verdad importa.",
          ],
        },
        links: [
          { label: "Nuestro servicio Generación de leads", href: "/services/lead-generation", desc: "Transformar el tráfico en solicitudes de presupuesto cualificadas." },
          { label: "¿Cuánto cuesta un sitio web en Luxemburgo?", href: "/news/combien-coute-un-site-web-luxembourg-2026", desc: "Invertir donde de verdad se juega la conversión." },
          { label: "Glosario: embudo, CRO, landing page…", href: "/glossaire", desc: "Los términos de la conversión explicados de forma sencilla." },
        ],
        body: [
          {
            type: "p",
            text: "¿Tiene tráfico, pero pocas solicitudes? El problema casi nunca es el número de visitantes — es lo que ocurre entre su llegada y su decisión. Ese camino tiene un nombre: el embudo de conversión. Entenderlo es dejar de «hacer venir gente» para empezar a transformar a esa gente en clientes.",
          },
          {
            type: "h2",
            id: "c-est-quoi",
            text: "¿Qué es un embudo de conversión?",
          },
          {
            type: "p",
            text: "Es la sucesión de etapas que recorre un visitante antes de convertirse en cliente: le descubre, se interesa, le contacta y luego compra. En cada etapa, una parte de las personas abandona — como un embudo que se estrecha. El objetivo no es eliminar esas pérdidas (imposible), sino reducirlas allí donde más caro cuestan.",
          },
          {
            type: "h2",
            id: "etapes",
            text: "Las 4 etapas de un embudo que convierte",
          },
          {
            type: "h3",
            text: "1. Atraer — la audiencia adecuada, no solo tráfico",
          },
          {
            type: "p",
            text: "Todo empieza por atraer a las personas adecuadas (SEO, publicidad, redes, boca a boca). Mil visitantes no cualificados valen menos que cien visitantes con una necesidad real. La calidad del tráfico condiciona todo el resto del embudo.",
          },
          {
            type: "h3",
            text: "2. Interesar — dar ganas de quedarse",
          },
          {
            type: "p",
            text: "En unos segundos, el visitante decide si se queda o se va. Un mensaje claro, una promesa comprensible, una página rápida y tranquilizadora: es aquí donde se transforma a un curioso en un prospecto interesado. Si su página tarda demasiado en decir lo que hace, está perdido.",
          },
          {
            type: "h3",
            text: "3. Convertir — facilitar el paso a la acción",
          },
          {
            type: "p",
            text: "Es la etapa decisiva: solicitud de presupuesto, concertación de cita, compra. Una llamada a la acción visible, un formulario corto e inteligente, cero fricción inútil. Cada campo de más, cada duda sin resolver hace caer la tasa de conversión.",
          },
          {
            type: "h3",
            text: "4. Fidelizar — un cliente que vuelve y recomienda",
          },
          {
            type: "p",
            text: "El embudo no termina en la venta. Un cliente satisfecho vuelve, compra más y, sobre todo, le recomienda. Seguimiento, calidad de servicio, recordatorios pertinentes: la fidelización es la palanca más rentable, y la más descuidada.",
          },
          {
            type: "callout",
            title: "El principio clave",
            text: "Una sola etapa que pierde lastra todo el embudo. De nada sirve atraer a más gente si sus visitantes se pierden en el momento de pasar a la acción.",
          },
          {
            type: "h2",
            id: "fuites",
            text: "Por dónde se pierde (y cómo taparlo)",
          },
          {
            type: "ul",
            items: [
              "Página lenta o confusa: el visitante se va antes de entender su oferta.",
              "Sin una llamada a la acción clara: no sabe qué hacer a continuación.",
              "Formulario demasiado largo: abandona a medio camino.",
              "Falta de pruebas (opiniones, proyectos, garantías): duda y lo pospone.",
              "Ningún recordatorio: un prospecto tibio al que no se vuelve a contactar es un cliente perdido.",
            ],
          },
          {
            type: "h2",
            id: "mesurer",
            text: "Medir para optimizar",
          },
          {
            type: "p",
            text: "Solo se mejora lo que se mide. Al seguir la tasa de conversión de cada etapa, se detecta con precisión dónde se atasca — y se actúa ahí, en lugar de rehacerlo todo al azar.",
          },
          {
            type: "ul",
            items: [
              "Tasa de conversión global y por etapa.",
              "Páginas donde los visitantes abandonan el embudo.",
              "Coste por lead y coste por cliente.",
              "Pruebas A/B para validar cada mejora.",
            ],
          },
          {
            type: "quote",
            text: "Un buen embudo no se adivina: se mide, se ajusta, y se vuelve a medir.",
          },
          {
            type: "callout",
            title: "Para recordar",
            text: "Un embudo de conversión es un recorrido: atraer, interesar, convertir, fidelizar. Trabaje primero el eslabón más débil — ahí es donde se esconden sus ventas perdidas.",
          },
          {
            type: "p",
            text: "En vortx, concebimos cada sitio como un embudo pensado para convertir, y lo optimizamos de forma continua. ¿Quiere saber dónde pierde clientes el suyo? Le ofrecemos una auditoría gratuita de su embudo.",
          },
        ],
      },
      {
        slug: "combien-coute-un-site-web-luxembourg-2026",
        category: "Sitios web",
        title:
          "¿Cuánto cuesta un sitio web profesional en Luxemburgo en 2026?",
        excerpt:
          "La verdadera respuesta no es una cifra, sino un rango que depende de sus objetivos. Esto es lo que hace variar el precio de un sitio, y cómo invertir donde de verdad importa.",
        date: "2026-06-08",
        updated: "2026-06-08",
        readingMinutes: 7,
        author: "El equipo vortx",
        cover: "analytics",
        summary: {
          text: "El precio de un sitio no es una cifra fija, sino un rango que depende de sus objetivos. El artículo detalla qué hace variar el coste y cómo invertir donde de verdad rinde, en lugar de buscar lo más barato.",
          points: [
            "El precio depende del alcance y de los objetivos, no de una tarifa genérica.",
            "Invierta en la conversión y el posicionamiento, no en lo superfluo.",
            "Juzgue el coste a la luz de lo que el sitio le aporta.",
          ],
        },
        links: [
          { label: "Nuestro servicio Sitios web", href: "/services/sites-web", desc: "Lo que construimos y lo que incluye cada pack." },
          { label: "Embudo de conversión: visitantes → clientes", href: "/news/tunnel-de-conversion-transformer-visiteurs-en-clients", desc: "Por qué un sitio debe pensarse para convertir." },
          { label: "¿Qué es un buen logo?", href: "/news/quest-ce-quun-bon-logo-identite-qui-dure", desc: "La identidad de marca que acompaña a su sitio." },
        ],
        body: [
          {
            type: "p",
            text: "«¿Cuánto cuesta un sitio web?» Es la primera pregunta que nos hacen, y la más difícil de responder con una sola cifra. Un sitio es como una casa: entre un estudio y una villa, la palabra «casa» no dice nada del precio. Lo que cuenta es lo que usted quiere hacer con él.",
          },
          {
            type: "h2",
            id: "ca-depend",
            text: "Por qué «depende» es la única respuesta honesta",
          },
          {
            type: "p",
            text: "Un precio anunciado sin conocer su proyecto es o demasiado alto (se infla para cubrirse) o decepcionante (se recorta lo esencial). El verdadero trabajo es definir el alcance justo: ni más, ni menos que lo que sirve a su objetivo.",
          },
          {
            type: "h2",
            id: "ce-qui-fait-le-prix",
            text: "Lo que de verdad hace variar el precio",
          },
          {
            type: "ul",
            items: [
              "El número de páginas y la complejidad de los contenidos.",
              "A medida (Next.js) o WordPress, según su necesidad de flexibilidad y autonomía.",
              "El nivel de diseño: plantilla adaptada o identidad 100 % a medida.",
              "Las funcionalidades: formularios, reserva de citas, pago, área de cliente…",
              "El multilingüe (FR/DE/EN) y la optimización SEO y GEO.",
              "Las integraciones (CRM, herramientas de negocio) y la automatización.",
            ],
          },
          {
            type: "h2",
            id: "fourchettes",
            text: "Algunas referencias para situarse",
          },
          {
            type: "h3",
            text: "Sitio escaparate o landing page",
          },
          {
            type: "p",
            text: "Para presentar su actividad y generar contactos, la inversión se mantiene contenida. Suele ser el mejor punto de partida: rápido de entregar, útil de inmediato y diseñado para convertir.",
          },
          {
            type: "h3",
            text: "Sitio a medida o plataforma",
          },
          {
            type: "p",
            text: "En cuanto hacen falta funcionalidades específicas, un diseño único, multilingüe avanzado o integraciones, el presupuesto sube — pero es también ahí donde el sitio se convierte en un verdadero activo que trabaja para usted.",
          },
          {
            type: "callout",
            title: "El buen reflejo",
            text: "No pregunte solo «cuánto cuesta», sino «cuánto rinde». Un sitio de 2.000 € que no genera nada es más caro que un sitio que se amortiza con unos pocos contratos.",
          },
          {
            type: "h2",
            id: "investir-malin",
            text: "Dónde invertir como prioridad",
          },
          {
            type: "ul",
            items: [
              "El rendimiento y el móvil: un sitio lento ahuyenta antes incluso de ser leído.",
              "El embudo de conversión: cada página debe empujar hacia una acción clara.",
              "El SEO y GEO desde el principio: ser encontrado en Google y citado por las IA.",
              "Un contenido honesto y preciso, anclado en su realidad.",
            ],
          },
          {
            type: "quote",
            text: "Un sitio no es un gasto puntual, es un comercial que trabaja 24/7. La pregunta es qué espera usted de él.",
          },
          {
            type: "callout",
            title: "Para recordar",
            text: "El precio de un sitio depende de sus objetivos, no de una tarifa genérica. Defina el alcance adecuado, invierta en la conversión y el posicionamiento, y juzgue el coste a la luz de lo que el sitio le aporta.",
          },
          {
            type: "p",
            text: "En vortx, le proponemos un presupuesto preciso tras una llamada de descubrimiento gratuita — no un precio sacado de la chistera. Le decimos, sin rodeos, lo que de verdad necesita.",
          },
        ],
      },
      {
        slug: "quest-ce-quun-bon-logo-identite-qui-dure",
        category: "Branding",
        title: "¿Qué es un buen logo? Los principios de una identidad que perdura",
        excerpt:
          "Un buen logo no es solo una imagen bonita: es la primera promesa de su marca. Estos son los principios que separan un logo memorable de uno olvidable.",
        date: "2026-06-08",
        updated: "2026-06-08",
        readingMinutes: 6,
        author: "El equipo vortx",
        cover: "branding",
        summary: {
          text: "Un logo no es solo una imagen bonita: es la primera promesa de su marca. El artículo expone los principios de un logo que perdura — simple, memorable, atemporal, versátil y pertinente — y su papel dentro de una identidad coherente.",
          points: [
            "Un buen logo es simple, memorable, atemporal, versátil y pertinente.",
            "Vive dentro de una identidad visual coherente, no aislado.",
            "La coherencia visual inspira confianza antes incluso de la primera palabra.",
          ],
        },
        links: [
          { label: "Nuestro servicio Branding y diseño", href: "/services/branding-design", desc: "Logo a medida e identidad de marca completa." },
          { label: "¿Cuánto cuesta un sitio web en Luxemburgo?", href: "/news/combien-coute-un-site-web-luxembourg-2026", desc: "Vestir su marca en la web." },
          { label: "Glosario: identidad de marca, design system…", href: "/glossaire", desc: "El vocabulario del branding explicado." },
        ],
        body: [
          {
            type: "p",
            text: "Antes de la primera palabra, su logo ya ha hablado. Es la primera impresión, la referencia que se recuerda, el rostro de su marca. Sin embargo, muchas empresas lo tratan como un detalle. Un buen logo es todo menos un detalle — y obedece a principios sencillos.",
          },
          {
            type: "h2",
            id: "pas-juste-joli",
            text: "Un logo no es (solo) algo bonito",
          },
          {
            type: "p",
            text: "Un logo no tiene la misión de gustar a todo el mundo, sino de hacer su marca reconocible y digna de confianza. Debe funcionar igual de bien en un rótulo que en un icono de aplicación, en color como en blanco y negro.",
          },
          {
            type: "h2",
            id: "principes",
            text: "Los 5 principios de un buen logo",
          },
          { type: "logo" },
          { type: "h3", text: "1. Simple" },
          {
            type: "p",
            text: "Los logos más potentes suelen ser los más depurados. La simplicidad se memoriza, se reconoce de un vistazo y se adapta a todas partes sin deformarse.",
          },
          { type: "h3", text: "2. Memorable" },
          {
            type: "p",
            text: "Un buen logo deja huella. Una forma, una idea, un detalle que engancha — lo bastante distintivo para que se recuerde tras haberlo visto una sola vez.",
          },
          { type: "h3", text: "3. Atemporal" },
          {
            type: "p",
            text: "Las modas pasan. Un logo diseñado para durar evita los efectos de moda que envejecen mal, y sigue siendo pertinente diez años después.",
          },
          { type: "h3", text: "4. Versátil" },
          {
            type: "p",
            text: "Del favicon de 16 píxeles al cartel publicitario, debe seguir siendo legible y coherente en todas partes. Por eso lo entregamos siempre en varios formatos.",
          },
          { type: "h3", text: "5. Pertinente" },
          {
            type: "p",
            text: "El estilo debe encajar con su sector y su posicionamiento. Un logo no tiene que decirlo todo sobre usted — solo no decir lo contrario de lo que usted es.",
          },
          {
            type: "callout",
            title: "La trampa clásica",
            text: "Querer que el logo «explique» todo lo que usted hace. Un buen logo identifica; es su marca, a lo largo del tiempo, la que cuenta el resto.",
          },
          {
            type: "h2",
            id: "au-dela",
            text: "Más allá del logo: la identidad completa",
          },
          {
            type: "p",
            text: "Un logo por sí solo no basta. Cobra toda su fuerza dentro de una identidad coherente: colores, tipografías, reglas de uso. Es esa coherencia, aplicada en todas partes, la que construye la confianza y el reconocimiento.",
          },
          {
            type: "quote",
            text: "Un logo es la firma. La identidad es la escritura entera. Las dos deben decir lo mismo.",
          },
          {
            type: "callout",
            title: "Para recordar",
            text: "Un buen logo es simple, memorable, atemporal, versátil y pertinente — y vive dentro de una identidad visual coherente, no aislado.",
          },
          {
            type: "p",
            text: "En vortx, diseñamos logos a medida y la identidad completa que los acompaña. ¿Quiere una marca que se recuerde? Hablemos de ello.",
          },
        ],
      },
      {
        slug: "rgpd-cookies-site-web-luxembourg",
        category: "Cumplimiento",
        title:
          "RGPD y cookies: el mínimo a respetar en su sitio web en Luxemburgo",
        excerpt:
          "Banner de cookies, consentimiento, avisos legales… El RGPD asusta, pero lo esencial se resume en unas pocas reglas claras. Este es el mínimo para un sitio luxemburgués tranquilo.",
        date: "2026-06-08",
        updated: "2026-06-08",
        readingMinutes: 6,
        author: "El equipo vortx",
        cover: "rgpd",
        summary: {
          text: "El RGPD asusta, pero lo esencial se resume en unas pocas reglas claras. El artículo recoge el mínimo a respetar en un sitio luxemburgués — banner de cookies, consentimiento y avisos legales — para cumplir sin caer en la paranoia.",
          points: [
            "Consentimiento real y previo antes de cualquier cookie no esencial.",
            "Un banner claro y unos avisos legales actualizados cubren lo esencial.",
            "El cumplimiento protege a sus visitantes y su credibilidad.",
          ],
        },
        links: [
          { label: "Nuestro servicio Sitios web", href: "/services/sites-web", desc: "Sitios concebidos conformes desde el principio." },
          { label: "SEO vs GEO: visibilidad y confianza", href: "/news/geo-seo-luxembourg-etre-cite-par-les-ia", desc: "Por qué la confianza y la visibilidad van de la mano." },
          { label: "Glosario: RGPD, cookies, consentimiento…", href: "/glossaire", desc: "Los términos del cumplimiento explicados." },
        ],
        body: [
          {
            type: "p",
            text: "El RGPD tiene fama de ser un quebradero de cabeza. En realidad, para un sitio escaparate o de generación de leads, lo esencial se resume en unas pocas reglas de sentido común. Aquí tiene lo necesario para estar en regla — y, sobre todo, en confianza con sus visitantes.",
          },
          {
            type: "callout",
            title: "Aclaración útil",
            text: "Este artículo ofrece referencias prácticas, no asesoramiento jurídico. Para un caso concreto, haga validar sus páginas legales por un profesional del derecho.",
          },
          {
            type: "h2",
            id: "rgpd-cest-quoi",
            text: "El RGPD en dos minutos",
          },
          {
            type: "p",
            text: "El Reglamento General de Protección de Datos regula la forma en que usted recopila y utiliza los datos personales (nombre, correo electrónico, dirección IP…). El principio: transparencia, consentimiento cuando hace falta, y respeto de los derechos de las personas.",
          },
          {
            type: "h2",
            id: "cookies",
            text: "Cookies: consentimiento antes del depósito",
          },
          {
            type: "ul",
            items: [
              "Las cookies no esenciales (medición de audiencia, publicidad) solo se depositan tras un acuerdo explícito.",
              "El banner debe permitir aceptar, rechazar y personalizar — rechazar debe ser tan sencillo como aceptar.",
              "Las cookies estrictamente necesarias para el funcionamiento del sitio no requieren consentimiento.",
            ],
          },
          {
            type: "h2",
            id: "checklist",
            text: "La checklist mínima",
          },
          {
            type: "ul",
            items: [
              "Un banner de cookies conforme (aceptar / rechazar / personalizar).",
              "Una política de privacidad clara (qué datos, por qué, durante cuánto tiempo).",
              "Unos avisos legales actualizados.",
              "Una base legal para cada recogida (consentimiento, contrato, interés legítimo).",
              "Un sitio en HTTPS y datos tratados de forma segura.",
              "Un medio sencillo para ejercer sus derechos (acceso, supresión).",
            ],
          },
          {
            type: "callout",
            title: "El buen reflejo",
            text: "Recopile solo lo que de verdad necesita. Menos datos significa menos riesgos — y más confianza.",
          },
          {
            type: "h2",
            id: "atout",
            text: "El cumplimiento, una ventaja más que una carga",
          },
          {
            type: "p",
            text: "Un sitio claro sobre el uso de los datos tranquiliza. En Luxemburgo, donde la privacidad se toma en serio, el respeto del RGPD es una señal de profesionalidad que juega a su favor.",
          },
          {
            type: "quote",
            text: "El RGPD no es un obstáculo para la conversión. Bien hecho, es un argumento de confianza.",
          },
          {
            type: "p",
            text: "En vortx, concebimos cada sitio respetando el RGPD desde el principio — banner de consentimiento, gestión de cookies y páginas legales incluidos. ¿Tiene dudas sobre su sitio actual? Le hacemos una revisión gratuita.",
          },
        ],
      },
      {
        slug: "5-taches-pme-confier-a-l-ia",
        category: "Automatización e IA",
        title: "5 tareas que su pyme ya debería confiar a la IA",
        excerpt:
          "La IA no sustituye a sus equipos — les quita las tareas pesadas. Aquí tiene 5 tareas concretas que una pyme luxemburguesa puede automatizar desde hoy, sin montar un mecanismo enrevesado.",
        date: "2026-06-08",
        updated: "2026-06-08",
        readingMinutes: 6,
        author: "El equipo vortx",
        cover: "automation",
        summary: {
          text: "La IA no sustituye a sus equipos, les quita las tareas pesadas. El artículo enumera cinco tareas concretas que una pyme luxemburguesa puede automatizar desde hoy — sin montar un mecanismo enrevesado — para liberar tiempo útil.",
          points: [
            "Empiece poco a poco: tareas repetitivas, no una revolución.",
            "Respuestas, cualificación, recordatorios, contenido, sincronización: otros tantos candidatos.",
            "Mantenga el control: la IA asiste, la persona decide.",
          ],
        },
        links: [
          { label: "IA para las pymes: por dónde empezar", href: "/news/ia-pme-luxembourg-par-ou-commencer", desc: "La guía para arrancar sin equivocarse." },
          { label: "Nuestro servicio Automatización e IA", href: "/services/automatisation-ia", desc: "Flujos de trabajo y agentes de IA a medida." },
          { label: "Glosario: automatización, IA…", href: "/glossaire", desc: "Los términos de la automatización explicados." },
        ],
        body: [
          {
            type: "p",
            text: "La IA fascina tanto como inquieta. Para una pyme, el buen enfoque es pragmático: nada de revoluciones, sino tareas repetitivas que se delegan para liberar tiempo. Aquí tiene cinco frentes concretos, accesibles desde ahora mismo.",
          },
          {
            type: "h2",
            id: "pas-remplacer",
            text: "La IA no está para reemplazar, sino para aliviar",
          },
          {
            type: "p",
            text: "El objetivo no es suprimir puestos, sino quitar a sus equipos lo que no aporta ningún valor — para que se concentren en sus clientes y en su negocio.",
          },
          {
            type: "h2",
            id: "les-5",
            text: "Las 5 tareas a delegar desde ahora",
          },
          { type: "h3", text: "1. Responder a las preguntas repetitivas" },
          {
            type: "p",
            text: "Un chatbot bien entrenado responde 24/7 a las preguntas habituales (horarios, servicios, presupuestos) y orienta al visitante, sin movilizar a nadie.",
          },
          { type: "h3", text: "2. Cualificar y filtrar los leads" },
          {
            type: "p",
            text: "La IA puede puntuar las solicitudes entrantes y dirigir las más prometedoras al interlocutor adecuado — sus comerciales solo atienden los mejores contactos.",
          },
          { type: "h3", text: "3. Recordar y hacer seguimiento" },
          {
            type: "p",
            text: "Recordatorios automáticos, avisos de citas, seguimientos tras un presupuesto: pequeñas tareas que se olvidan y que, automatizadas, ya no se quedan nunca en el aire.",
          },
          { type: "h3", text: "4. Producir y adaptar contenido" },
          {
            type: "p",
            text: "Borradores de correos, descripciones, versiones multilingües: la IA acelera la producción, sus equipos revisan y validan. Más volumen, menos esfuerzo.",
          },
          { type: "h3", text: "5. Sincronizar sus herramientas" },
          {
            type: "p",
            text: "Sitio, CRM, facturación, agenda: lo conectamos todo para que el dato circule sin reintroducirlo. Se acabó el copiar y pegar entre programas.",
          },
          {
            type: "callout",
            title: "La trampa a evitar",
            text: "Querer automatizarlo todo de golpe. Se empieza por una tarea, se mide la ganancia, y luego se amplía. La automatización útil es progresiva.",
          },
          {
            type: "h2",
            id: "par-ou-commencer",
            text: "Por dónde empezar",
          },
          {
            type: "ul",
            items: [
              "Identifique la tarea repetitiva que más tiempo le cuesta.",
              "Automatícela primero, mida el tiempo ganado.",
              "Mantenga siempre a una persona en el bucle para validar.",
              "Amplíe después, paso a paso, respetando el RGPD.",
            ],
          },
          {
            type: "quote",
            text: "La buena automatización no se nota: simplemente le devuelve sus jornadas.",
          },
          {
            type: "callout",
            title: "Para recordar",
            text: "Confíe a la IA las tareas repetitivas sin valor añadido — respuestas, cualificación, recordatorios, contenido, sincronización — empezando poco a poco y manteniendo el control.",
          },
          {
            type: "p",
            text: "En vortx, ponemos la IA a trabajar allí donde de verdad le hace ganar tiempo. ¿Quiere saber qué podría automatizar? Se lo decimos gratis.",
          },
        ],
      },
      {
        slug: "ia-pme-luxembourg-par-ou-commencer",
        category: "Automatización e IA",
        title: "IA para las pymes en Luxemburgo: por dónde empezar en 2026",
        excerpt:
          "La IA ya no está reservada a las grandes empresas. Pero ¿por dónde empezar siendo una pyme, sin presupuesto tecnológico ni equipo dedicado? Aquí tiene una hoja de ruta pragmática: los buenos casos de uso, las trampas a evitar y cómo mantener el control de sus datos.",
        date: "2026-06-09",
        updated: "2026-06-09",
        readingMinutes: 7,
        author: "El equipo vortx",
        cover: "ai-build",
        summary: {
          text: "La IA ya no está reservada a las grandes empresas: bien encuadrada, da a una pyme la capacidad de impacto de un equipo mayor. Esta guía desmonta las ideas preconcebidas, muestra dónde la IA rinde de verdad y propone un método para empezar poco a poco manteniendo el control de sus datos.",
          points: [
            "Parta de un problema concreto y de una tarea repetitiva, no de una herramienta de moda.",
            "Pruebe en un alcance reducido, mida el tiempo ganado, y luego amplíe.",
            "Mantenga sus datos bajo control: RGPD y soberanía primero.",
          ],
        },
        links: [
          { label: "5 tareas que su pyme debería confiar a la IA", href: "/news/5-taches-pme-confier-a-l-ia", desc: "Ejemplos concretos para automatizar desde ahora mismo." },
          { label: "Nuestro servicio Automatización e IA", href: "/services/automatisation-ia", desc: "Flujos de trabajo, integraciones y agentes de IA a medida." },
          { label: "Glosario: IA, automatización, RGPD…", href: "/glossaire", desc: "El vocabulario de la IA explicado de forma sencilla." },
        ],
        body: [
          {
            type: "p",
            text: "La inteligencia artificial está en todos los discursos, pero muchos directivos de pymes aún se preguntan, concretamente, qué se supone que deben hacer con ella. La buena noticia: no necesita un departamento de datos ni un presupuesto de seis cifras. Necesita una tarea que le cueste tiempo cada semana — y un punto de partida razonable. Aquí le explicamos cómo abordarlo.",
          },
          {
            type: "h2",
            id: "pourquoi-pme",
            text: "Por qué la IA está por fin al alcance de las pymes",
          },
          {
            type: "p",
            text: "Durante años, la IA fue un proyecto de gran empresa: datos, servidores, especialistas. Hoy, lo esencial se ha convertido en un servicio que se activa bajo demanda, se factura por uso y habla español. Una pyme luxemburguesa puede conectar un asistente, automatizar un flujo o generar contenido sin alojar nada por sí misma. El coste de entrada se ha desplomado; lo que cuenta ahora es elegir el buen caso de uso.",
          },
          {
            type: "h2",
            id: "trois-idees-recues",
            text: "Tres ideas preconcebidas que frenan a las pymes",
          },
          {
            type: "h3",
            text: "«La IA es para las grandes empresas»",
          },
          {
            type: "p",
            text: "Es justo lo contrario. Cuanto más pequeño es su equipo, más pesa cada hora ganada. Un autónomo, un despacho o un comercio que automatiza sus respuestas y sus recordatorios recupera un tiempo que ninguna gran estructura valora tanto. La IA es un multiplicador de equipos pequeños.",
          },
          {
            type: "h3",
            text: "«Hace falta un desarrollador y un gran presupuesto»",
          },
          {
            type: "p",
            text: "Muchas ganancias se consiguen con herramientas listas para usar y unas cuantas automatizaciones bien pensadas. A menudo se empieza sin escribir una sola línea de código. El presupuesto se mide en decenas de euros al mes, no en miles — y se justifica desde la primera tarea automatizada.",
          },
          {
            type: "h3",
            text: "«La IA va a reemplazar a mi equipo»",
          },
          {
            type: "p",
            text: "La IA reemplaza tareas, no personas. Se hace cargo de lo repetitivo y de lo que no aporta valor para devolver a sus colaboradores el tiempo de las decisiones, de la relación con el cliente y del oficio. Bien llevada, aumenta sus equipos en lugar de reducirlos.",
          },
          {
            type: "callout",
            title: "En una frase",
            text: "La IA no reemplaza a una pyme — le da la capacidad de impacto de un equipo mayor.",
          },
          {
            type: "h2",
            id: "ou-commencer",
            text: "Dónde rinde de verdad la IA para una pyme",
          },
          {
            type: "p",
            text: "No hace falta transformarlo todo. Unos pocos ámbitos concentran lo esencial del valor para una estructura pequeña:",
          },
          {
            type: "ul",
            items: [
              "Relación con el cliente: respuestas a las preguntas frecuentes, cualificación de las solicitudes, concertación de citas.",
              "Marketing y contenido: borradores de artículos, publicaciones, correos y descripciones, para revisar y personalizar.",
              "Presupuestos y administración: precumplimentación, síntesis de documentos, recordatorios automáticos.",
              "Análisis: lectura rápida de sus datos de ventas o de tráfico para detectar lo que funciona.",
              "Productividad interna: actas de reuniones, traducción FR/DE/EN, búsqueda de información.",
            ],
          },
          {
            type: "h2",
            id: "demarrer-petit",
            text: "Cómo empezar sin equivocarse",
          },
          {
            type: "ol",
            items: [
              "Parta de un problema, no de una herramienta: ¿qué tarea le cuesta tiempo cada semana?",
              "Elija una tarea repetitiva y medible, con un resultado claro.",
              "Pruebe en un alcance reducido, sobre unos pocos casos reales, antes de generalizar.",
              "Mida el tiempo ganado y la calidad obtenida, con honestidad.",
              "Amplíe lo que funciona, abandone lo que no cumple sus promesas.",
            ],
          },
          {
            type: "p",
            text: "Este enfoque de pasos pequeños evita el efecto «gran proyecto de IA» que se atasca. Va acumulando victorias concretas, su equipo gana confianza, y solo invierte allí donde el valor está probado.",
          },
          {
            type: "h2",
            id: "rgpd-donnees",
            text: "RGPD y datos: la vigilancia que tranquiliza",
          },
          {
            type: "p",
            text: "En Luxemburgo, la cuestión de los datos no es un detalle. Antes de confiar lo que sea a una herramienta, hágase tres preguntas: dónde se almacenan los datos, quién puede acceder a ellos, y si tiene derecho a usarlos así. Evite pegar datos sensibles o nominativos en herramientas de gran público, priorice soluciones conformes al RGPD y alojadas en la UE cuando sea posible, y deje traza de lo que automatiza. El cumplimiento no es un freno: es lo que hace que la IA se pueda desplegar con tranquilidad.",
          },
          {
            type: "callout",
            title: "Para recordar",
            text: "Empiece por un caso de uso simple y medible, mantenga sus datos bajo control, y amplíe una vez probado el valor.",
          },
          {
            type: "quote",
            text: "La buena pregunta no es «¿debo hacer IA?» sino «¿qué tarea me cuesta tiempo cada semana?».",
          },
          {
            type: "p",
            text: "En vortx, ayudamos a las pymes luxemburguesas a identificar los casos de uso que de verdad rinden, y luego a implementarlos correctamente — herramientas, automatizaciones y salvaguardas RGPD incluidas. ¿Quiere saber por dónde empezar en su caso? Se lo decimos gratis.",
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
    eyebrow: "Glosario",
    title: "El vocabulario del marketing y del web, sin jerga.",
    lead: "Todos los términos que usamos — SEO, GEO, ROAS, embudo, CMS… — explicados de forma sencilla, con el contexto luxemburgués.",
    searchPlaceholder: "Buscar un término…",
    countSuffix: "términos",
    emptyLabel: "Ningún término coincide con su búsqueda.",
    ctaTitle: "¿Aún se le escapa algún término?",
    terms: [
      {
        term: "SEO (posicionamiento orgánico)",
        slug: "seo",
        category: "SEO y GEO",
        short: "Ser encontrado gratis en Google.",
        def: "El Search Engine Optimization reúne las técnicas que mejoran la posición de un sitio en los resultados orgánicos (no pagados) de los buscadores: calidad técnica, contenido relevante, autoridad y experiencia de usuario.",
      },
      {
        term: "GEO / GSO",
        slug: "geo-gso",
        category: "SEO y GEO",
        short: "Ser citado por las IA generativas.",
        def: "La Generative Engine Optimization (o Generative Search Optimization) optimiza su contenido para que sea retomado y citado como fuente por los motores de respuesta de IA (ChatGPT, Perplexity, Google AI). El objetivo: ser la respuesta, no solo un enlace.",
      },
      {
        term: "SERP",
        slug: "serp",
        category: "SEO y GEO",
        short: "La página de resultados de Google.",
        def: "Search Engine Results Page: la página que muestra los resultados de una búsqueda. Combina enlaces orgánicos, anuncios, fragmentos enriquecidos, y cada vez más respuestas generadas por IA.",
      },
      {
        term: "Palabra clave",
        slug: "mot-cle",
        category: "SEO y GEO",
        short: "Lo que escriben sus clientes.",
        def: "Término o expresión que un usuario introduce en un buscador. El SEO consiste en parte en identificar las palabras clave rentables y estructurar el contenido en torno a ellas.",
      },
      {
        term: "Backlink",
        slug: "backlink",
        category: "SEO y GEO",
        short: "Un enlace de otro sitio hacia el suyo.",
        def: "Enlace entrante desde un sitio externo. Los backlinks de calidad indican a los buscadores que su sitio tiene autoridad, lo que mejora el posicionamiento.",
      },
      {
        term: "Datos estructurados (Schema.org)",
        slug: "donnees-structurees",
        category: "SEO y GEO",
        short: "Código que explica su contenido a las máquinas.",
        def: "Etiquetado estandarizado añadido al código de una página para describir su contenido (empresa, servicio, artículo, FAQ…). Ayuda a Google y a las IA a entender y destacar su información.",
      },
      {
        term: "llms.txt",
        slug: "llms-txt",
        category: "SEO y GEO",
        short: "Un resumen de su sitio para las IA.",
        def: "Archivo de texto colocado en la raíz de un sitio para presentar, de forma estructurada, su oferta y sus contenidos clave a los grandes modelos de lenguaje. Una palanca emergente del GEO.",
      },
      {
        term: "Embudo de conversión",
        slug: "tunnel-de-conversion",
        category: "Conversión",
        short: "El camino del visitante hasta el cliente.",
        def: "Sucesión de etapas por las que pasa un visitante antes de convertirse en cliente (descubrimiento → interés → contacto → compra). Se optimiza para reducir los abandonos en cada etapa.",
      },
      {
        term: "Tasa de conversión",
        slug: "taux-de-conversion",
        category: "Conversión",
        short: "El % de visitantes que pasan a la acción.",
        def: "Porcentaje de visitantes que realizan la acción deseada (solicitud de presupuesto, compra, registro). Indicador central de la eficacia de un sitio o de una campaña.",
      },
      {
        term: "Landing page",
        slug: "landing-page",
        category: "Conversión",
        short: "Una página hecha para una sola acción.",
        def: "Página de aterrizaje diseñada en torno a un objetivo único (a menudo ligado a una campaña): convertir al visitante en lead o en cliente, sin distracción.",
      },
      {
        term: "Call-to-action (CTA)",
        slug: "cta",
        category: "Conversión",
        short: "El botón que invita a actuar.",
        def: "Elemento (botón, enlace) que incita al visitante a pasar a la siguiente etapa: «Reservar una llamada», «Obtener un presupuesto». Su claridad y visibilidad influyen mucho en la conversión.",
      },
      {
        term: "A/B testing",
        slug: "ab-testing",
        category: "Conversión",
        short: "Comparar dos versiones para quedarse con la mejor.",
        def: "Método que consiste en mostrar dos variantes de una página o de un elemento a visitantes distintos, y luego medir cuál convierte mejor.",
      },
      {
        term: "Lead",
        slug: "lead",
        category: "Adquisición",
        short: "Un contacto comercial potencial.",
        def: "Persona o empresa que ha manifestado un interés (formulario, llamada, solicitud de presupuesto) y susceptible de convertirse en cliente. Un lead «cualificado» encaja bien con su público objetivo.",
      },
      {
        term: "Generación de leads",
        slug: "generation-de-leads",
        category: "Adquisición",
        short: "Crear un flujo regular de prospectos.",
        def: "Conjunto de acciones (sitio, contenido, campañas, automatización) destinadas a atraer y captar contactos cualificados de forma previsible.",
      },
      {
        term: "SEA / Publicidad de pago",
        slug: "sea",
        category: "Adquisición",
        short: "Comprar visibilidad (Google, Meta…).",
        def: "Search Engine Advertising y publicidad en redes: campañas de pago (Google Ads, Meta, LinkedIn) que muestran sus anuncios ante una audiencia segmentada.",
      },
      {
        term: "ROAS",
        slug: "roas",
        category: "Datos y medición",
        short: "Lo que aporta cada euro de publicidad.",
        def: "Return On Ad Spend: ingresos generados por cada euro gastado en publicidad. Un ROAS de 4 significa 4 € de facturación por cada 1 € invertido.",
      },
      {
        term: "ROI",
        slug: "roi",
        category: "Datos y medición",
        short: "El retorno de la inversión global.",
        def: "Return On Investment: relación entre la ganancia obtenida y la suma invertida. Indicador clave para juzgar la rentabilidad de una acción de marketing.",
      },
      {
        term: "CPL / CPA",
        slug: "cpl-cpa",
        category: "Datos y medición",
        short: "Cuánto cuesta un lead o una venta.",
        def: "Coste Por Lead (CPL) y Coste Por Adquisición (CPA): importe medio gastado para obtener respectivamente un contacto cualificado o un cliente. Se compara con el valor generado.",
      },
      {
        term: "KPI",
        slug: "kpi",
        category: "Datos y medición",
        short: "Las cifras que realmente importan.",
        def: "Key Performance Indicator: indicador clave elegido para medir el avance hacia un objetivo (tasa de conversión, coste por lead, tráfico cualificado…).",
      },
      {
        term: "CTR",
        slug: "ctr",
        category: "Datos y medición",
        short: "El % de clics en un enlace o un anuncio.",
        def: "Click-Through Rate: proporción de personas que hacen clic tras ver un enlace, un anuncio o un resultado. Un CTR alto indica un mensaje relevante.",
      },
      {
        term: "Analytics",
        slug: "analytics",
        category: "Datos y medición",
        short: "Medir lo que ocurre en su sitio.",
        def: "Herramientas (Google Analytics, Matomo…) que siguen el comportamiento de los visitantes: fuentes de tráfico, páginas vistas, conversiones. La base de toda decisión de marketing.",
      },
      {
        term: "CMS",
        slug: "cms",
        category: "Web y tecnología",
        short: "La herramienta para gestionar el contenido de un sitio.",
        def: "Content Management System (p. ej. WordPress): plataforma que permite crear y modificar las páginas de un sitio sin programar. Práctica para conservar el control en el día a día.",
      },
      {
        term: "WordPress",
        slug: "wordpress",
        category: "Web y tecnología",
        short: "El CMS más extendido del mundo.",
        def: "Sistema de gestión de contenido de código abierto muy popular, ideal cuando quiere editar sus páginas usted mismo. Flexible gracias a sus temas y extensiones.",
      },
      {
        term: "Next.js",
        slug: "nextjs",
        category: "Web y tecnología",
        short: "Un framework web ultrarrápido.",
        def: "Framework basado en React, utilizado para construir sitios de muy alto rendimiento, seguros y optimizados para el SEO. Nuestra opción por defecto para el desarrollo a medida.",
      },
      {
        term: "Responsive",
        slug: "responsive",
        category: "Web y tecnología",
        short: "Un sitio que se adapta a todas las pantallas.",
        def: "Diseño que ajusta automáticamente la disposición según el dispositivo (móvil, tableta, ordenador), para una experiencia óptima en todas partes.",
      },
      {
        term: "Core Web Vitals",
        slug: "core-web-vitals",
        category: "Web y tecnología",
        short: "Las notas de Google sobre la calidad técnica.",
        def: "Indicadores de Google que miden la velocidad de carga, la reactividad y la estabilidad visual de una página. Influyen en el posicionamiento y en la experiencia de usuario.",
      },
      {
        term: "RGPD",
        slug: "rgpd",
        category: "Web y tecnología",
        short: "La ley europea sobre los datos.",
        def: "Reglamento General de Protección de Datos: marco europeo que regula la recogida y el uso de los datos personales. Un sitio luxemburgués debe cumplirlo (consentimiento, cookies…).",
      },
      {
        term: "Automatización",
        slug: "automatisation",
        category: "Web y tecnología",
        short: "Dejar las tareas repetitivas a las máquinas.",
        def: "Implementación de flujos de trabajo que ejecutan automáticamente tareas (recordatorios, notificaciones, sincronización de herramientas), para ganar tiempo y reducir errores.",
      },
      {
        term: "Identidad de marca",
        slug: "identite-de-marque",
        category: "Diseño y marca",
        short: "Lo que hace reconocible a su marca.",
        def: "Conjunto coherente de elementos visuales y mensajes (logo, colores, tipografía, tono) que distingue a su empresa e inspira confianza.",
      },
      {
        term: "Design system",
        slug: "design-system",
        category: "Diseño y marca",
        short: "La caja de herramientas visual de una marca.",
        def: "Biblioteca de componentes, reglas y estilos reutilizables que garantiza la coherencia de un sitio o de un producto, y acelera su creación.",
      },
      {
        term: "UX / UI",
        slug: "ux-ui",
        category: "Diseño y marca",
        short: "La experiencia y la interfaz.",
        def: "La UX (User Experience) se refiere a la sensación y al recorrido del usuario; la UI (User Interface) se refiere a la apariencia y a los elementos con los que interactúa. Ambas sirven a la conversión.",
      },
    ] as GlossaryTerm[],
  },

  // ---- Service detail (shared labels + per-service content) ----
  servicesDetail: {
    overviewTitle: "En detalle",
    includedTitle: "Lo que incluye",
    deliverablesTitle: "Entregables",
    faqTitle: "Preguntas frecuentes",
    // Shared "our method" band, rendered on every service & sub-service page.
    method: {
      eyebrow: "Nuestro método",
      title: "Cuatro tiempos, cero sorpresas desagradables.",
      lead: "Un marco claro, el mismo en cada proyecto: usted valida en cada etapa, avanzamos rápido y usted mantiene el control.",
      steps: [
        { n: "01", icon: "process", title: "Diagnóstico", desc: "Analizamos su situación, su mercado y sus objetivos. Auditoría gratuita, sin rodeos: le decimos qué se puede mejorar antes incluso de hablar de presupuesto." },
        { n: "02", icon: "ai-build", title: "Diseño y construcción", desc: "Diseño a medida y producción acelerada por IA. Construimos la solución — sitio, campaña, identidad, automatización — pensada para la conversión." },
        { n: "03", icon: "ab-test", title: "Revisión y optimización", desc: "Probamos, medimos y ajustamos con usted. Nada está cerrado: cada detalle se optimiza hasta que rinde." },
        { n: "04", icon: "analytics", title: "Lanzamiento y seguimiento", desc: "Puesta en línea, seguimiento de los resultados y acompañamiento continuo. Usted ve el progreso, cada euro ligado a un resultado." },
      ],
    },
    // Honest "guarantees / engagements" band — no invented client metrics.
    proof: {
      eyebrow: "Nuestros compromisos",
      title: "Lo que le garantizamos, negro sobre blanco.",
      lead: "Sin promesas mágicas. Compromisos concretos, cumplidos en cada proyecto.",
      items: [
        { icon: "guarantee", value: "Auditoría gratuita", label: "Antes de cualquier presupuesto", desc: "Un diagnóstico gratuito de su situación, sin compromiso." },
        { icon: "rgpd", value: "100 % suyo", label: "Código, contenidos, accesos", desc: "Usted es plenamente propietario. Sin ataduras, nunca." },
        { icon: "multilingual", value: "FR · DE · EN", label: "Multilingüe nativo", desc: "Pensado para el mercado luxemburgués y la Gran Región." },
        { icon: "analytics", value: "Reporting claro", label: "Transparencia total", desc: "Cada euro gastado está ligado a un resultado medible." },
      ],
    },
  },
  serviceContent: {
    "sites-web": {
      intro: [
        "Su sitio es a menudo la primera — a veces la única — cita con un cliente. Lo concebimos como un comercial que trabaja 24/7: rápido, claro, orientado a la acción.",
        "Según su necesidad, construimos a medida (Next.js, ultrarrápido y pensado para la IA) o en WordPress cuando quiere conservar el control del contenido en el día a día. Y sí: gran parte de nuestra producción está acelerada por IA — más calidad, entregada más rápido.",
      ],
      included: [
        { icon: "ai-build", title: "Diseñado con IA", desc: "Aceleramos el diseño y el desarrollo con IA, sin sacrificar nunca la calidad ni la coherencia." },
        { icon: "wordpress", title: "WordPress cuando hace falta", desc: "¿Necesita editar sus páginas usted mismo? Entregamos un WordPress limpio, seguro y fácil de gestionar." },
        { icon: "next-perf", title: "Rendimiento Next.js", desc: "Para el desarrollo a medida, un sitio casi instantáneo, seguro y preparado para el SEO y el GEO." },
        { icon: "responsive", title: "100 % responsive", desc: "Una experiencia impecable en móvil, tableta y ordenador — el móvil primero." },
        { icon: "conversion", title: "Pensado para convertir", desc: "Cada página tiene un objetivo: generar una llamada, un presupuesto, un lead. Guiamos al visitante hacia la acción." },
        { icon: "smart-forms", title: "Formularios inteligentes", desc: "Formularios de varios pasos que cualifican a sus prospectos y aumentan la tasa de respuesta." },
      ],
      deliverables: [
        "Maquetas y diseño a medida validados con usted",
        "Sitio a medida (Next.js) o WordPress, a elegir",
        "Optimización SEO y GEO de base integrada",
        "Formularios, tracking y puesta en línea incluidos",
      ],
      faq: [
        { q: "¿A medida o WordPress, cómo elegir?", a: "El desarrollo a medida (Next.js) ofrece el mejor rendimiento y flexibilidad; WordPress es ideal si quiere editar el contenido usted mismo. Le aconsejamos según su uso real, sin dogmas." },
        { q: "¿Qué significa «hecho con IA»?", a: "Usamos la IA para acelerar el diseño, el código y el contenido. Resultado: un sitio de mayor calidad, entregado más rápido y con una mejor relación valor/precio — revisado y finalizado por humanos." },
        { q: "¿Mi sitio estará optimizado para Google y las IA?", a: "Sí. Integramos desde el principio las buenas prácticas de SEO y GEO: estructura, rendimiento, datos estructurados y contenido citable." },
      ],
      packsIncluded: {
        eyebrow: "Todo Incluido",
        title: "¿Qué incluyen todos nuestros packs?",
        lead: "Independientemente del pack que elijas, siempre disfrutarás de estas características esenciales.",
        items: [
          { icon: "server", title: "Dominio y Hosting", desc: "Primer año de dominio incluido y hosting de alta velocidad." },
          { icon: "responsive", title: "100% Responsive", desc: "Adaptación perfecta a todos los dispositivos para capturar leads desde móvil, tablet y escritorio." },
          { icon: "seo", title: "SEO Preparado para el Futuro", desc: "Optimización para motores de búsqueda tradicionales y posicionamiento conversacional." },
          { icon: "contact", title: "Formulario de Contacto", desc: "Recibe mensajes directamente en tu email (Landing Page & Site S)." },
          { icon: "smartforms", title: "Formularios inteligentes", desc: "Formularios de contacto y cotización multi-paso diseñados para maximizar las conversiones y capturar leads cualificados (Site M, L, XL & Custom)." },
          { icon: "ssl", title: "Certificado SSL", desc: "Conexión segura HTTPS para proteger a tus visitantes." },
          { icon: "support", title: "Soporte Técnico", desc: "Asistencia técnica durante los primeros 3 meses." },
          { icon: "analytics", title: "Analytics integrado", desc: "Seguimiento completo de conversiones y comportamiento de usuarios para optimización continua." },
          { icon: "speed", title: "Velocidad optimizada", desc: "Carga ultra-rápida para mejorar la experiencia de usuario y el posicionamiento en buscadores." },
        ],
        moreTitle: "Y mucho más...",
        moreText: "Cada proyecto es único. Podemos añadir funcionalidades adicionales según tus necesidades: blog, galería, reservas online, integración con redes sociales y más.",
        ctaLabel: "Pregúntanos",
      },
    },
    "seo-geo": {
      intro: [
        "Ser visible ya no basta: hay que ser encontrado en Google y citado por las IA generativas. Trabajamos los dos frentes a la vez, porque el 80 % de las buenas prácticas son comunes.",
        "Auditoría técnica, contenido estructurado y datos legibles por las máquinas: construimos una presencia que rinde hoy en Google y mañana en las respuestas de ChatGPT, Perplexity y Google AI.",
      ],
      included: [
        { icon: "seo", title: "SEO técnico y editorial", desc: "Auditoría completa, optimización on-page, velocidad y contenido que responde de verdad a la intención de búsqueda." },
        { icon: "geo-citation", title: "GEO / GSO", desc: "Estructuramos su contenido para ser retomado y citado como fuente por los motores de respuesta de IA." },
        { icon: "multilingual", title: "Multilingüe FR/DE/EN", desc: "Un posicionamiento pensado para los tres idiomas del mercado luxemburgués." },
        { icon: "analytics", title: "Seguimiento y citas", desc: "Seguimiento de las posiciones en Google y de las citas en las respuestas de IA, con un reporting claro." },
      ],
      deliverables: [
        "Auditoría técnica y semántica completa",
        "Plan de contenido y optimizaciones on-page",
        "Datos estructurados (Schema.org) y llms.txt",
        "Reporting mensual de posiciones + citas en IA",
      ],
      faq: [
        { q: "¿Qué diferencia hay entre SEO y GEO?", a: "El SEO le coloca en la lista de resultados de Google; el GEO le coloca en la respuesta generada por una IA. Optimizamos para ambos." },
        { q: "¿En cuánto tiempo se ven resultados?", a: "El SEO/GEO es un trabajo de fondo: las primeras señales aparecen a menudo en unas semanas, las ganancias sólidas en unos meses. Le mostramos el avance en cada etapa." },
      ],
    },
    "lead-generation": {
      intro: [
        "Un buen sitio que no genera contactos es un gasto. Lo transformamos en un sistema de captación: un flujo regular y previsible de solicitudes cualificadas.",
        "Sitio optimizado, landing pages por campaña, cualificación y automatización: cada eslabón está pensado para llenar su agenda de prospectos, sin que tenga que prospectar usted mismo.",
      ],
      included: [
        { icon: "leads", title: "Captación de leads", desc: "Embudos y formularios diseñados para captar el máximo de contactos cualificados." },
        { icon: "conversion", title: "Embudos optimizados", desc: "Un recorrido claro visitante → lead → cliente, optimizado de forma continua para reducir los abandonos." },
        { icon: "smart-forms", title: "Cualificación y scoring", desc: "Cualificamos automáticamente los leads para que sus comerciales se centren en los mejores." },
        { icon: "analytics", title: "Reporting coste por lead", desc: "Un seguimiento transparente del coste por lead y del retorno de la inversión." },
      ],
      deliverables: [
        "Embudos de conversión a medida",
        "Landing pages por campaña",
        "Sistema de cualificación y scoring",
        "Panel de control de coste por lead y ROI",
      ],
      faq: [
        { q: "¿Garantizan un número de leads?", a: "No vendemos promesas mágicas: construimos un sistema medible y lo optimizamos hasta que rinda. Los objetivos se fijan juntos, en función de su mercado." },
        { q: "¿Hace falta un presupuesto publicitario?", a: "No siempre. Una parte de los leads puede venir del SEO/GEO y del contenido. La publicidad acelera, pero empezamos por maximizar lo que su sitio ya puede captar." },
      ],
    },
    publicite: {
      intro: [
        "La publicidad de pago es visibilidad inmediata — siempre que invierta su presupuesto donde da resultados. Dirigimos sus campañas con los datos, no por instinto.",
        "Google Ads, Meta, LinkedIn: segmentamos a las personas adecuadas, probamos y optimizamos de forma continua para bajar el coste por adquisición y subir el ROAS.",
      ],
      included: [
        { icon: "ads-targeting", title: "Segmentación precisa", desc: "Las audiencias adecuadas, en los canales adecuados, con el mensaje adecuado en el momento adecuado." },
        { icon: "next-perf", title: "Google Ads y Performance Max", desc: "Campañas de search y Performance Max estructuradas para la rentabilidad." },
        { icon: "conversion", title: "Landing pages dedicadas", desc: "Páginas de aterrizaje diseñadas para transformar el clic de pago en lead." },
        { icon: "analytics", title: "Optimización del ROAS", desc: "Seguimiento de las conversiones y ajustes continuos para maximizar el retorno." },
      ],
      deliverables: [
        "Estrategia y estructura de campañas",
        "Creación de los anuncios (Google, Meta, LinkedIn)",
        "Landing pages optimizadas para la conversión",
        "Reporting de ROAS y optimización continua",
      ],
      faq: [
        { q: "¿Qué presupuesto mínimo hay que prever?", a: "Depende de su sector y de su objetivo. Definimos juntos un presupuesto de prueba, medimos, y luego aumentamos únicamente lo que es rentable." },
        { q: "¿Gestionan también el seguimiento de las conversiones?", a: "Sí. Sin un tracking fiable es imposible optimizar. Configuramos el seguimiento de las conversiones y vinculamos cada euro gastado a un resultado." },
      ],
    },
    "branding-design": {
      intro: [
        "Su logo es lo primero que se recuerda de usted. Lo concebimos a medida para que sea único, memorable y fiel a lo que usted es — no una plantilla vista mil veces.",
        "Más allá del logo, construimos una identidad visual completa: colores, tipografías, reglas de uso. Una marca coherente en todas partes, del sitio web al impreso, que inspira confianza antes incluso de la primera palabra.",
      ],
      included: [
        { icon: "branding", title: "Logo a medida", desc: "Un logo único, diseñado a mano, declinado en todos los formatos que vaya a necesitar." },
        { icon: "ai-build", title: "Identidad visual", desc: "Paleta de colores, tipografías y elementos gráficos que hacen reconocible su marca." },
        { icon: "responsive", title: "Manual de marca", desc: "Una guía clara de las reglas de uso para mantener su marca coherente en todas partes, con el tiempo." },
        { icon: "conversion", title: "Adaptaciones impresas y digitales", desc: "Tarjetas de visita, firmas, redes sociales, soportes… su marca aplicada en todo." },
      ],
      deliverables: [
        "Logo a medida (todos los formatos: color, blanco y negro, vectorial)",
        "Identidad visual: colores y tipografías",
        "Manual de marca y reglas de uso",
        "Adaptaciones impresas y digitales",
      ],
      faq: [
        { q: "¿Crean un logo de cero o hacen evolucionar el existente?", a: "Ambas cosas. Podemos crear un logo y una identidad de la A a la Z, o renovar los suyos conservando lo que ya funciona y por lo que se le reconoce." },
        { q: "¿Qué archivos recibo?", a: "Recibe su logo en todos los formatos útiles (vectorial, color, blanco y negro, versiones web e impresas) — usted es plenamente propietario de ellos." },
        { q: "¿El diseño tiene en cuenta la conversión?", a: "Siempre. No hacemos belleza por la belleza: cada decisión visual sirve a la claridad, la confianza y la acción." },
      ],
    },
    "automatisation-ia": {
      intro: [
        "¿Sus equipos dedican demasiado tiempo a tareas repetitivas? Las automatizamos. Más resultados, menos fricción — y respuestas más rápidas a sus clientes.",
        "Flujos de trabajo automatizados, integraciones entre sus herramientas y agentes de IA a medida: conectamos su stack y ponemos la IA a trabajar donde de verdad le hace ganar tiempo.",
      ],
      included: [
        { icon: "automation", title: "Automatización de los flujos de trabajo", desc: "Eliminamos las tareas manuales repetitivas: recordatorios, sincronización, notificaciones." },
        { icon: "ai-build", title: "Agentes y asistentes de IA", desc: "Asistentes de IA a medida entrenados sobre su contexto y sus procesos." },
        { icon: "smart-forms", title: "Integraciones con CRM y herramientas", desc: "Conectamos su sitio, su CRM y sus herramientas para un flujo de datos fluido." },
        { icon: "analytics", title: "Chatbots inteligentes", desc: "Widgets y chatbots que responden, cualifican y orientan a sus visitantes 24/7." },
      ],
      deliverables: [
        "Mapeo de los procesos a automatizar",
        "Flujos de trabajo e integraciones configurados",
        "Agente/asistente de IA a medida",
        "Documentación y acompañamiento",
      ],
      faq: [
        { q: "¿La IA va a reemplazar a mis equipos?", a: "No — los alivia. Automatizamos las tareas sin valor añadido para que sus equipos se concentren en lo que importa: sus clientes." },
        { q: "¿Mis datos están seguros?", a: "Sí. Diseñamos las automatizaciones respetando el RGPD y con una fuerte atención a la confidencialidad de sus datos." },
      ],
    },
  },

  // ---- Portfolio coverflow (homepage showcase) ----
  portfolio: {
    typewriter: [
      "Cree su presencia digital",
      "Diseñe experiencias únicas",
      "Impulse su negocio online",
      "Destaque frente a la competencia",
      "Conecte con sus clientes",
    ],
    cta: "Trabajemos juntos",
    prev: "Proyecto anterior",
    next: "Proyecto siguiente",
    pause: "Pausar",
    play: "Reanudar el desplazamiento",
  },

  subServicesTitle: "Una especialidad para cada necesidad",
  subServicesLead: "Este servicio se desglosa en especialidades concretas. Tome la que encaje con su necesidad — o combínelas para cubrir todo el terreno.",
  subServices: {
    publicite: [
      {
        slug: "google-ads",
        illustration: "google-ads",
        title: "Google Ads",
        tagline: "Capte la demanda en el momento exacto en que se expresa.",
        short:
          "Search, Performance Max, Shopping, YouTube: esté presente cuando sus clientes buscan, con campañas pilotadas por los datos y orientadas a la rentabilidad.",
        bullets: [
          "Search y Performance Max",
          "Shopping y YouTube Ads",
          "Landing pages dedicadas",
          "Optimización continua del ROAS",
        ],
        metaTitle: "Agencia Google Ads en Luxemburgo | vortx",
        metaDescription:
          "Campañas Google Ads (Search, Performance Max, Shopping, YouTube) rentables para el mercado luxemburgués. Capte la demanda, pilotado por los datos.",
        intro: [
          "En Google, sus clientes no buscan una marca: buscan una solución. Google Ads le coloca ante ellos en el instante preciso en que lo necesitan — ni antes, ni después.",
          "Estructuramos sus campañas (Search, Performance Max, Shopping, YouTube) para captar esa intención y transformarla en solicitudes concretas, gastando su presupuesto allí donde realmente rinde.",
        ],
        included: [
          { icon: "ads-targeting", title: "Search y Performance Max", desc: "Campañas estructuradas para aparecer en las búsquedas que convierten." },
          { icon: "conversion", title: "Landing pages dedicadas", desc: "Páginas de aterrizaje pensadas para transformar el clic de pago en lead." },
          { icon: "analytics", title: "Pilotaje por los datos", desc: "Un seguimiento de conversiones fiable: cada euro gastado está vinculado a un resultado." },
          { icon: "next-perf", title: "Optimización del ROAS", desc: "Ajustes continuos de las pujas y las audiencias para maximizar el retorno." },
        ],
        deliverables: [
          "Estrategia y estructura de cuentas",
          "Creación de las campañas (Search, PMax, Shopping, YouTube)",
          "Landing pages optimizadas",
          "Reporting ROAS y optimización continua",
        ],
        faq: [
          { q: "¿Qué presupuesto mínimo hay que prever?", a: "Depende de su sector y de la competencia en sus palabras clave. Definimos un presupuesto de prueba, medimos, y luego aumentamos únicamente lo que es rentable." },
          { q: "¿En cuánto tiempo se ven resultados?", a: "Los primeros clics llegan desde el lanzamiento. Las primeras semanas sirven para aprender y optimizar; la rentabilidad se estabiliza después." },
        ],
      },
      {
        slug: "meta-ads",
        illustration: "meta-ads",
        title: "Meta Ads",
        tagline: "Cree la demanda en Facebook, Instagram y Threads.",
        short:
          "Contenido que detiene el scroll. Campañas Meta (Facebook, Instagram, Threads) segmentadas para dar a conocer su marca, captar a su audiencia y convertir.",
        bullets: [
          "Facebook e Instagram Ads",
          "Threads",
          "Audiencias y retargeting",
          "Creación de contenidos que convierten",
        ],
        metaTitle: "Agencia Meta Ads (Facebook e Instagram) en Luxemburgo | vortx",
        metaDescription:
          "Campañas Meta Ads (Facebook, Instagram, Threads) para el mercado luxemburgués: notoriedad, engagement y conversiones. Segmentación precisa y creatividades que rinden.",
        intro: [
          "En las redes sociales, nadie busca su producto — es usted quien debe atraer la atención. Meta Ads (Facebook, Instagram, Threads) crea la demanda allí donde sus clientes pasan su tiempo.",
          "Combinamos segmentación precisa, retargeting y creación de contenidos que detienen el scroll para transformar una audiencia fría en clientes, paso a paso.",
        ],
        included: [
          { icon: "ads-targeting", title: "Segmentación social precisa", desc: "Las audiencias adecuadas en Facebook, Instagram y Threads, en el momento adecuado." },
          { icon: "branding", title: "Creatividades que convierten", desc: "Imágenes y vídeos pensados para captar la atención y dar ganas de actuar." },
          { icon: "leads", title: "Retargeting y audiencias", desc: "Reimpactamos a los visitantes y construimos audiencias similares para amplificar." },
          { icon: "analytics", title: "Seguimiento del rendimiento", desc: "Un reporting claro sobre el coste por resultado y el retorno de la inversión." },
        ],
        deliverables: [
          "Estrategia y estructura de campañas Meta",
          "Creación de las imágenes y vídeos",
          "Audiencias, retargeting y A/B tests",
          "Reporting y optimización continua",
        ],
        faq: [
          { q: "¿Meta Ads es solo Facebook e Instagram?", a: "No: cubrimos también Threads y la red de audiencia de Meta. Elegimos los emplazamientos según su público y sus objetivos." },
          { q: "¿Hay que tener ya contenido?", a: "No necesariamente. Podemos crear las imágenes y vídeos publicitarios, o partir de sus contenidos existentes y adaptarlos al formato que convierte." },
        ],
      },
      {
        slug: "linkedin-ads",
        illustration: "linkedin-ads",
        title: "LinkedIn Ads",
        tagline: "Llegue a los decisores luxemburgueses allí donde deciden.",
        short:
          "La publicidad B2B más precisa: segmente por cargo, sector y empresa. Ideal para los ciclos de venta largos y las cuentas estratégicas en Luxemburgo y en la Gran Región.",
        bullets: [
          "Segmentación por cargo, sector y empresa",
          "Lead Gen Forms integrados",
          "Account-Based Marketing (ABM)",
          "Seguimiento del coste por lead y del pipeline",
        ],
        metaTitle: "Agencia LinkedIn Ads B2B en Luxemburgo | vortx",
        metaDescription:
          "Campañas LinkedIn Ads B2B para el mercado luxemburgués: segmentación por cargo y empresa, Lead Gen Forms, ABM. Llegue a los decisores, genere leads cualificados.",
        intro: [
          "En B2B, no vende a una empresa: convence a personas. LinkedIn Ads es el único canal que le permite segmentar con precisión a los decisores — por cargo, sector, tamaño de empresa e incluso por cuenta nominal.",
          "Estructuramos sus campañas (Lead Gen Forms, contenidos patrocinados, message ads) para hablar a las personas adecuadas en el momento adecuado, y vinculamos cada lead a su pipeline para medir el retorno real, no solo clics.",
        ],
        included: [
          { icon: "linkedin", title: "Segmentación de decisores", desc: "Por cargo, antigüedad, sector y tamaño de empresa — la precisión B2B que solo LinkedIn ofrece." },
          { icon: "leads", title: "Lead Gen Forms", desc: "Formularios precargados integrados en LinkedIn para captar leads cualificados sin fricción." },
          { icon: "ads-targeting", title: "Account-Based Marketing", desc: "Segmentamos sus cuentas estratégicas nominales y a los interlocutores adecuados dentro de cada una." },
          { icon: "analytics", title: "Pipeline y ROI", desc: "Seguimiento del coste por lead y de la contribución al pipeline, integrado con su CRM." },
        ],
        deliverables: [
          "Estrategia de segmentación y estructura de campañas",
          "Creación de los anuncios y Lead Gen Forms",
          "Implementación del seguimiento (CRM, conversiones)",
          "Reporting coste por lead y optimización continua",
        ],
        faq: [
          { q: "¿LinkedIn Ads no es demasiado caro?", a: "El coste por clic es más elevado que en otros canales, pero la calidad de los leads también. En B2B, un solo cliente firmado suele rentabilizar de sobra la campaña. Empezamos con un presupuesto de prueba y solo aumentamos lo que es rentable." },
          { q: "¿Hace falta una página de empresa activa en LinkedIn?", a: "Es un plus para la credibilidad, pero no un requisito para lanzar campañas. Podemos ayudarle a poner su página a punto en paralelo." },
        ],
      },
    ],
    "seo-geo": [
      {
        slug: "seo",
        illustration: "seo",
        title: "SEO",
        tagline: "Ser encontrado en Google, de forma duradera.",
        short:
          "Posicionamiento orgánico técnico y editorial: optimizamos su sitio para subir en las búsquedas que importan y atraer un tráfico cualificado, sin pagar el clic.",
        bullets: [
          "Auditoría técnica y semántica",
          "Optimización on-page",
          "Contenido y palabras clave",
          "Seguimiento de posiciones",
        ],
        metaTitle: "Agencia SEO en Luxemburgo | vortx",
        metaDescription:
          "Posicionamiento orgánico (SEO) técnico y editorial para las empresas luxemburguesas. Suba en Google y atraiga un tráfico cualificado, de forma duradera.",
        intro: [
          "El SEO es el arte de ser encontrado en Google sin pagar el clic. Un activo que tarda unas semanas en construirse, pero que sigue atrayendo tráfico cualificado mucho tiempo después — al contrario que la publicidad, que se detiene en cuanto se corta el presupuesto.",
          "Trabajamos los tres pilares: la técnica (velocidad, estructura, indexación), el contenido (las palabras clave correctas, la intención de búsqueda) y la autoridad. Todo pensado para el mercado luxemburgués y su multilingüismo.",
        ],
        included: [
          { icon: "seo", title: "Auditoría y SEO técnico", desc: "Velocidad, estructura, indexación, datos: corregimos los cimientos que bloquean su posicionamiento." },
          { icon: "conversion", title: "Contenido optimizado", desc: "Páginas que responden de verdad a la intención de búsqueda y que convierten." },
          { icon: "multilingual", title: "Multilingüe FR/DE/EN", desc: "Un posicionamiento pensado para los tres idiomas del mercado luxemburgués." },
          { icon: "analytics", title: "Seguimiento de posiciones", desc: "Reporting claro sobre sus posiciones, su tráfico y sus conversiones." },
        ],
        deliverables: [
          "Auditoría técnica y semántica completa",
          "Plan de palabras clave y optimizaciones on-page",
          "Recomendaciones de contenido",
          "Reporting mensual de posiciones y tráfico",
        ],
        faq: [
          { q: "¿En cuánto tiempo se ven resultados?", a: "Las primeras señales aparecen a menudo en unas semanas, las ganancias sólidas en unos meses. El SEO es un trabajo de fondo — le mostramos el progreso en cada etapa." },
          { q: "¿Basta con el SEO, o hace falta también publicidad?", a: "Los dos se complementan: la publicidad aporta resultados inmediatos, el SEO construye un tráfico duradero. Le aconsejamos la dosis adecuada según su plazo." },
        ],
      },
      {
        slug: "geo-gso",
        illustration: "geo-gso",
        title: "GEO / GSO",
        tagline: "Ser la respuesta citada por las IA.",
        short:
          "Generative Engine Optimization: estructuramos su contenido y sus datos para que ChatGPT, Perplexity y Google AI le citen como fuente — no solo un enlace.",
        bullets: [
          "Contenido estructurado y citable",
          "Datos estructurados (Schema.org)",
          "Archivo llms.txt",
          "Seguimiento de citas en IA",
        ],
        metaTitle: "Agencia GEO / GSO en Luxemburgo | vortx",
        metaDescription:
          "Optimización para las IA generativas (GEO/GSO): sea citado por ChatGPT, Perplexity y Google AI. Datos estructurados, contenido citable, seguimiento de citas.",
        intro: [
          "Cada vez más clientes plantean sus preguntas a una IA en lugar de a Google. El GEO (Generative Engine Optimization) optimiza su presencia para que ChatGPT, Perplexity y Google AI le retomen y le citen como fuente — no solo como un enlace más.",
          "Estructuramos su contenido para que sea «citable» (respuestas nítidas, hechos verificables, contexto local) y hacemos su sitio legible por las máquinas: datos estructurados, llms.txt, arquitectura limpia.",
        ],
        included: [
          { icon: "geo-citation", title: "Contenido citable", desc: "Estructuramos sus páginas para ser retomadas y citadas en las respuestas de las IA generativas." },
          { icon: "seo", title: "Datos estructurados", desc: "Schema.org y llms.txt: hacemos su oferta legible y reutilizable por los modelos." },
          { icon: "ai-build", title: "Arquitectura lista para IA", desc: "Un sitio rápido y limpio, pensado desde el principio para los motores de respuesta." },
          { icon: "analytics", title: "Seguimiento de citas", desc: "Seguimos dónde y cómo le citan las IA, con un reporting claro." },
        ],
        deliverables: [
          "Auditoría GEO y estructuración del contenido",
          "Datos estructurados (Schema.org)",
          "Archivo llms.txt y optimizaciones técnicas",
          "Reporting de las citas en las respuestas de IA",
        ],
        faq: [
          { q: "¿El GEO reemplaza al SEO?", a: "No, lo complementa. El 80 % de las buenas prácticas son comunes: un contenido estructurado y fiable rinde a la vez en Google y ante las IA. Optimizamos para los dos." },
          { q: "¿Cómo se miden los resultados del GEO?", a: "Seguimos su presencia en las respuestas de los asistentes de IA (citas, menciones) y la evolución de su autoridad. Es un campo emergente: avanzamos con método y transparencia." },
        ],
      },
      {
        slug: "seo-local",
        illustration: "seo-local",
        title: "SEO local y Google Business Profile",
        tagline: "Domine las búsquedas «cerca de mí» en Luxemburgo.",
        short:
          "Sea la respuesta evidente cuando un cliente busca cerca de él. Optimización de su ficha de Google Business Profile, citaciones locales y reseñas para captar la demanda de proximidad, en toda la Gran Región.",
        bullets: [
          "Ficha de Google Business Profile optimizada",
          "Citaciones y coherencia NAP locales",
          "Estrategia de reseñas de clientes",
          "Schema LocalBusiness multilingüe",
        ],
        metaTitle: "Agencia SEO local y Google Business Profile en Luxemburgo | vortx",
        metaDescription:
          "Posicionamiento local en Luxemburgo: optimización de Google Business Profile, citaciones, reseñas de clientes y páginas locales. Capte las búsquedas «cerca de mí» en la Gran Región.",
        intro: [
          "Cuando un cliente busca «fontanero Luxemburgo» o «agencia cerca de mí», Google muestra primero un mapa y tres fichas. Si no está ahí, es invisible — aunque sea el primero en los resultados clásicos.",
          "El SEO local optimiza su presencia en ese mapa y en el pack local: ficha de Google Business Profile completa, coherencia de sus datos de contacto en toda la web, reseñas de clientes y marcado técnico. Una palanca decisiva para comercios, autónomos y servicios de proximidad en Luxemburgo y en la frontera.",
        ],
        included: [
          { icon: "local-seo", title: "Google Business Profile", desc: "Categorías, servicios, fotos, publicaciones y horarios: una ficha completa que inspira confianza y sube en el mapa." },
          { icon: "seo", title: "Citaciones y NAP", desc: "Nombre, dirección y teléfono coherentes en los directorios y plataformas locales — una señal clave para Google." },
          { icon: "conversion", title: "Reseñas y reputación", desc: "Una estrategia de reseñas de clientes y de respuestas para reforzar sus señales locales y su credibilidad." },
          { icon: "geo-citation", title: "Páginas y Schema locales", desc: "Páginas de destino locales y datos estructurados LocalBusiness, en FR/DE/EN." },
        ],
        deliverables: [
          "Auditoría y optimización de Google Business Profile",
          "Limpieza y creación de citaciones locales",
          "Estrategia de reseñas y plantillas de respuestas",
          "Páginas locales y marcado Schema multilingüe",
        ],
        faq: [
          { q: "¿El SEO local sirve si no tengo tienda?", a: "Sí, en cuanto tiene una zona de servicio: autónomos, servicios a domicilio, profesiones liberales. Podemos configurar una ficha de «zona de servicio» sin dirección pública." },
          { q: "¿En cuánto tiempo sube mi ficha?", a: "Las primeras mejoras (completitud, fotos, categorías) actúan en unas semanas. La constancia de las reseñas y de las citaciones consolida la posición a lo largo de unos meses." },
        ],
      },
    ],
    "sites-web": [
      {
        slug: "site-vitrine",
        illustration: "site-vitrine",
        title: "Sitio corporativo a medida",
        tagline: "Un escaparate digital que inspira confianza desde el primer segundo.",
        short:
          "El sitio que presenta su empresa, sus servicios y su credibilidad — concebido 100 % a medida, rápido y orientado a la acción. Su mejor comercial, disponible 24/7.",
        bullets: [
          "Diseño 100 % a medida, cero plantillas",
          "Arquitectura pensada para la conversión",
          "Responsive y ultrarrápido",
          "Optimizado para SEO desde el lanzamiento",
        ],
        metaTitle: "Creación de sitio corporativo en Luxemburgo | vortx",
        metaDescription:
          "Creación de sitio corporativo a medida para las empresas luxemburguesas: diseño premium, rápido, responsive y orientado a la conversión. Su mejor comercial, 24/7.",
        intro: [
          "Su sitio corporativo es a menudo el primer contacto de un prospecto con su empresa. En unos segundos decide si confía en usted — o si vuelve a Google. Concebimos esa primera cita para que juegue a su favor.",
          "Diseño a medida, estructura clara, carga casi instantánea: cada página pone en valor su experiencia y guía al visitante hacia la acción — una llamada, un mensaje, un presupuesto. No un catálogo estático, sino un comercial que trabaja para usted.",
        ],
        included: [
          { icon: "ai-build", title: "Diseño a medida", desc: "Una identidad visual única, a su imagen — nunca una plantilla reciclada vista mil veces." },
          { icon: "conversion", title: "Pensado para convertir", desc: "Cada página tiene un objetivo claro y guía al visitante hacia el contacto o el presupuesto." },
          { icon: "responsive", title: "100 % responsive", desc: "Una experiencia impecable en móvil, tableta y ordenador — el móvil primero." },
          { icon: "seo", title: "SEO integrado", desc: "Estructura, rendimiento y datos listos para Google y las IA desde la puesta en línea." },
        ],
        deliverables: [
          "Maquetas y diseño a medida validados con usted",
          "Sitio corporativo responsive (Next.js o WordPress)",
          "Optimización SEO y GEO de base",
          "Formularios, tracking y puesta en línea incluidos",
        ],
        faq: [
          { q: "¿Cuántas páginas incluye un sitio corporativo?", a: "Depende de su actividad — a menudo de 5 a 10 páginas (inicio, servicios, quiénes somos, contacto…). Definimos juntos la arquitectura más clara para sus visitantes y para Google." },
          { q: "¿Podré modificar el contenido yo mismo?", a: "Sí, si lo desea. En WordPress, la edición es sencilla; en el desarrollo a medida, ponemos lo necesario para gestionar sus contenidos clave — o nos encargamos nosotros." },
        ],
      },
      {
        slug: "site-e-commerce",
        illustration: "site-e-commerce",
        title: "Sitio e-commerce",
        tagline: "De la ficha de producto al pago, cada píxel trabaja por sus ventas.",
        short:
          "Tiendas online pensadas para vender: embudo de compra fluido, pagos seguros, gestión autónoma del catálogo. Una mecánica de venta, no solo un sitio.",
        bullets: [
          "Embudo de compra optimizado",
          "Pagos y logística integrados",
          "Gestión autónoma del catálogo",
          "Seguimiento del rendimiento de ventas",
        ],
        metaTitle: "Creación de sitio e-commerce en Luxemburgo | vortx",
        metaDescription:
          "Creación de tiendas online de alto rendimiento en Luxemburgo: embudo de compra optimizado, pagos seguros, gestión del catálogo. Un sitio e-commerce que vende de verdad.",
        intro: [
          "Una tienda online no se juzga por su catálogo, sino por su tasa de conversión. Demasiados sitios e-commerce pierden a sus clientes entre el producto y el carrito. Construimos el suyo para llevarlos hasta el pago, sin fricción.",
          "Fichas de producto convincentes, embudo de compra fluido, pagos seguros y gestión autónoma de su catálogo: lo conectamos todo con sus herramientas (stock, envío, contabilidad) y seguimos el rendimiento para optimizar lo que hace vender.",
        ],
        included: [
          { icon: "ecommerce", title: "Embudo de compra optimizado", desc: "Del producto al pago, un recorrido fluido diseñado para reducir el abandono de carrito." },
          { icon: "smart-forms", title: "Pagos seguros", desc: "Integración de los medios de pago y de las reglas de IVA, con total seguridad." },
          { icon: "automation", title: "Gestión autónoma", desc: "Un back-office claro para gestionar productos, stocks y pedidos sin depender de nosotros." },
          { icon: "analytics", title: "Seguimiento de ventas", desc: "Panel de control de conversiones, carritos y productos que rinden." },
        ],
        deliverables: [
          "Tienda online responsive y segura",
          "Catálogo, pagos y envío configurados",
          "Embudo de compra optimizado para la conversión",
          "Seguimiento e-commerce y formación en la gestión",
        ],
        faq: [
          { q: "¿En qué plataforma construyen la tienda?", a: "Según su necesidad: WooCommerce/WordPress para la autonomía, o una solución a medida (Next.js) para el rendimiento y necesidades específicas. Le aconsejamos sin dogmas." },
          { q: "¿Gestionan los pagos y el IVA?", a: "Sí. Configuramos los medios de pago, las reglas de IVA luxemburguesas y, si hace falta, la conexión con su logística y su contabilidad." },
        ],
      },
      {
        slug: "landing-pages",
        illustration: "landing-pages",
        title: "Landing pages de alta conversión",
        tagline: "Una página, un objetivo, el máximo de leads.",
        short:
          "Páginas de aterrizaje diseñadas para una sola acción: convertir. Ideales para sus campañas publicitarias, lanzamientos y ofertas segmentadas.",
        bullets: [
          "Diseñada para una sola acción",
          "Lanzamiento rápido, mobile-first",
          "A/B testing y optimización",
          "Conectada a sus campañas",
        ],
        metaTitle: "Creación de landing pages en Luxemburgo | vortx",
        metaDescription:
          "Creación de landing pages de alta conversión en Luxemburgo: páginas de aterrizaje rápidas, mobile-first y optimizadas para sus campañas. Más leads, menos presupuesto desperdiciado.",
        intro: [
          "Enviar tráfico publicitario a su página de inicio es desperdiciar presupuesto. Una landing page tiene un solo objetivo y elimina todas las distracciones para llevar al visitante a una acción precisa: rellenar un formulario, reservar, descargar.",
          "Diseñamos páginas rápidas, persuasivas y mobile-first, alineadas con el mensaje de cada campaña, y luego las probamos y optimizamos para hacer subir la tasa de conversión — y bajar su coste por lead.",
        ],
        included: [
          { icon: "landing", title: "Una sola acción", desc: "Cero distracción: todo converge hacia el objetivo único de la página." },
          { icon: "speed", title: "Rápida y mobile-first", desc: "Carga casi instantánea, perfecta en móvil, donde llega la mayor parte del tráfico de pago." },
          { icon: "ab-test", title: "A/B testing", desc: "Probamos títulos, imágenes y formularios para optimizar la conversión de forma continua." },
          { icon: "ads-targeting", title: "Conectada a las campañas", desc: "Mensaje alineado con su publicidad y tracking de las conversiones de principio a fin." },
        ],
        deliverables: [
          "Landing page a medida optimizada para la conversión",
          "Copywriting persuasivo y formulario optimizado",
          "Implementación del tracking de las conversiones",
          "Plan de A/B testing y recomendaciones",
        ],
        faq: [
          { q: "Una landing page, ¿es distinta de una página de mi sitio?", a: "Sí. Una página de sitio informa y propone varios caminos; una landing page persigue un objetivo único, sin menú ni distracción, para maximizar la conversión de una campaña concreta." },
          { q: "¿Cuánto se tarda en entregar una landing page?", a: "A menudo unos pocos días. Nuestra producción acelerada por IA permite lanzar rápido, algo esencial para encajar una campaña." },
        ],
      },
      {
        slug: "refonte-de-site",
        illustration: "refonte-de-site",
        title: "Rediseño de sitio web",
        tagline: "Transforme un sitio dormido en un motor de crecimiento.",
        short:
          "¿Su sitio es lento, anticuado o ya no convierte? Lo repensamos de arriba abajo — diseño, rendimiento, SEO — sin perder su posicionamiento adquirido.",
        bullets: [
          "Auditoría UX y de rendimiento completa",
          "Migración sin pérdida de SEO",
          "Rediseño visual y técnico",
          "Resultados medibles",
        ],
        metaTitle: "Rediseño de sitio web en Luxemburgo | vortx",
        metaDescription:
          "Rediseño de sitio web en Luxemburgo: auditoría UX, nuevo diseño, rendimiento y migración sin pérdida de SEO. Transforme un sitio anticuado en un motor de conversión.",
        intro: [
          "Un sitio anticuado cuesta más de lo que parece: ahuyenta a los visitantes y lastra su credibilidad y su posicionamiento. El rediseño no es un simple lavado de cara — es la oportunidad de partir de cimientos sanos.",
          "Empezamos por una auditoría (UX, rendimiento, SEO, conversión) para entender qué bloquea, y luego repensamos diseño y técnica. Punto crucial: migramos de forma limpia para preservar — y a menudo mejorar — su posicionamiento existente.",
        ],
        included: [
          { icon: "redesign", title: "Auditoría completa", desc: "UX, rendimiento, SEO y conversión: identificamos con precisión qué frena su sitio actual." },
          { icon: "ai-build", title: "Rediseño visual y técnico", desc: "Un nuevo diseño moderno sobre bases técnicas rápidas y duraderas." },
          { icon: "seo", title: "Migración sin pérdida de SEO", desc: "Redirecciones, estructura y contenido migrados de forma limpia para proteger su posicionamiento." },
          { icon: "speed", title: "Rendimiento recuperado", desc: "Un sitio casi instantáneo — mejor experiencia, mejor posicionamiento, más conversiones." },
        ],
        deliverables: [
          "Auditoría completa del sitio existente",
          "Nuevo diseño y desarrollo",
          "Plan de migración y redirecciones SEO",
          "Puesta en línea y seguimiento de las posiciones",
        ],
        faq: [
          { q: "¿Voy a perder mi posicionamiento en Google?", a: "Ese es el riesgo de un rediseño mal hecho — y precisamente lo que evitamos. Mapeamos sus URLs, implementamos las redirecciones y preservamos la estructura SEO. Bien llevado, un rediseño suele mejorar el posicionamiento." },
          { q: "¿Se puede conservar parte de lo existente?", a: "Sí. Conservamos lo que funciona (contenidos, elementos de marca, páginas que rinden) y rehacemos lo que frena. La auditoría lo determina de forma objetiva." },
        ],
      },
      {
        slug: "application-web",
        illustration: "application-web",
        title: "Aplicaciones y plataformas a medida",
        tagline: "Cuando un sitio ya no basta, construimos su herramienta.",
        short:
          "Áreas de cliente, back-offices, plataformas de negocio: desarrollo 100 % a medida para digitalizar un proceso y crear una ventaja que sus competidores no tienen.",
        bullets: [
          "Desarrollo 100 % a medida",
          "Áreas de cliente y back-offices",
          "Integraciones API y automatizaciones",
          "Escalable y seguro",
        ],
        metaTitle: "Desarrollo de aplicaciones web a medida en Luxemburgo | vortx",
        metaDescription:
          "Desarrollo de aplicaciones y plataformas web a medida en Luxemburgo: áreas de cliente, back-offices, integraciones API. Digitalice sus procesos, cree su ventaja.",
        intro: [
          "Algunas necesidades superan al sitio web: un área de cliente, una herramienta de gestión interna, una plataforma que automatiza un proceso de negocio. Ahí es donde una aplicación a medida se convierte en una verdadera ventaja competitiva.",
          "Diseñamos y desarrollamos aplicaciones web rápidas, seguras y escalables, conectadas a sus herramientas existentes. Desde el mapeo de la necesidad hasta la puesta en producción, construimos la herramienta que se ajusta exactamente a su forma de trabajar.",
        ],
        included: [
          { icon: "webapp", title: "A medida integral", desc: "Una aplicación pensada para su proceso concreto — no un software genérico que se padece." },
          { icon: "next-perf", title: "Rápida y segura", desc: "Arquitectura moderna, de alto rendimiento y diseñada respetando el RGPD." },
          { icon: "integration", title: "Integraciones y API", desc: "Conectada a su CRM, sus herramientas y servicios de terceros mediante API y webhooks." },
          { icon: "automation", title: "Escalable", desc: "Una base que crece con usted: añadimos módulos a medida que surgen sus necesidades." },
        ],
        deliverables: [
          "Mapeo de la necesidad y especificaciones",
          "Maquetas UX/UI y arquitectura técnica",
          "Desarrollo, pruebas y puesta en producción",
          "Documentación, formación y mantenimiento",
        ],
        faq: [
          { q: "¿Cómo se desarrolla un proyecto de aplicación?", a: "Por etapas: encuadre de la necesidad, maquetas, desarrollo por iteraciones que usted valida, y luego puesta en producción y seguimiento. Ve la herramienta tomar forma sin un túnel de varios meses a ciegas." },
          { q: "¿La aplicación me pertenece por completo?", a: "Sí. Código, datos y accesos le pertenecen. Sin ataduras: puede hacerla evolucionar con nosotros o internamente." },
        ],
      },
      {
        slug: "site-multilingue",
        illustration: "site-multilingue",
        title: "Sitios multilingües FR / DE / EN / LU",
        tagline: "Hable a todo Luxemburgo, y mucho más allá.",
        short:
          "En Luxemburgo, sus clientes comparan en varios idiomas. Construimos sitios multilingües nativos, optimizados idioma por idioma para el posicionamiento y la conversión.",
        bullets: [
          "Gestión nativa del multilingüe",
          "SEO localizado por idioma (hreflang)",
          "Coherencia editorial y UX",
          "Adaptado al mercado transfronterizo",
        ],
        metaTitle: "Creación de sitio multilingüe (FR/DE/EN) en Luxemburgo | vortx",
        metaDescription:
          "Sitios multilingües nativos para Luxemburgo: FR, DE, EN, LU. SEO localizado por idioma (hreflang), coherencia editorial y UX. Hable a todo su mercado.",
        intro: [
          "El multilingüismo no es una opción en Luxemburgo: es la realidad del mercado. Un cliente que busca en alemán no debe encontrarse con una traducción aproximada — ni quedarse invisible porque su sitio solo existe en un idioma.",
          "Construimos sitios multilingües pensados para ello desde el principio: arquitectura limpia, marcado hreflang correcto, SEO optimizado idioma por idioma y coherencia editorial. No una traducción superpuesta, sino una presencia real en cada idioma.",
        ],
        included: [
          { icon: "multilingual", title: "Multilingüe nativo", desc: "Una arquitectura pensada para varios idiomas desde el diseño, no añadida después." },
          { icon: "seo", title: "SEO por idioma", desc: "Marcado hreflang, URLs y contenido optimizados de forma independiente para cada idioma." },
          { icon: "conversion", title: "Coherencia editorial", desc: "Un tono y una UX coherentes de un idioma a otro, adaptados a cada público." },
          { icon: "geo-citation", title: "Mercado transfronterizo", desc: "Pensado para Luxemburgo y la Gran Región — FR, DE, EN y Lëtzebuergesch bajo petición." },
        ],
        deliverables: [
          "Arquitectura multilingüe y estrategia hreflang",
          "Sitio en cada idioma, optimizado para SEO",
          "Flujo de traducción y coherencia editorial",
          "Selector de idioma y puesta en línea",
        ],
        faq: [
          { q: "¿Hacen ustedes las traducciones?", a: "Podemos encargarnos de la redacción y la traducción profesional, o integrar de forma limpia sus contenidos existentes. Lo importante: un contenido correcto y optimizado en cada idioma, no una traducción automática en bruto." },
          { q: "¿El multilingüe penaliza el SEO?", a: "Al contrario, bien hecho lo refuerza: cada idioma capta sus propias búsquedas. La clave es un marcado hreflang correcto y contenidos distintos — exactamente lo que implementamos." },
        ],
      },
    ],
    "lead-generation": [
      {
        slug: "tunnels-de-conversion",
        illustration: "tunnels-de-conversion",
        title: "Embudos de conversión",
        tagline: "Del primer clic al presupuesto firmado, un recorrido pensado para convertir.",
        short:
          "Diseñamos el camino completo entre el desconocido y el cliente: etapas alineadas, mensajes adaptados a cada fase, tracking de principio a fin. El esqueleto de su captación.",
        bullets: [
          "Arquitectura de embudo (TOFU/MOFU/BOFU)",
          "Etapas y mensajes alineados",
          "Tracking y atribución completos",
          "Tests A/B continuos",
        ],
        metaTitle: "Creación de embudos de conversión en Luxemburgo | vortx",
        metaDescription:
          "Diseño de embudos de conversión (funnels) para las empresas luxemburguesas: recorrido del clic al cliente, tracking completo y optimización continua. Más leads cualificados.",
        intro: [
          "Sus clientes no pasan del desconocido a la compra en un clic. Siguen un recorrido: descubren, se informan, comparan y luego deciden. Un embudo de conversión acompaña ese recorrido paso a paso, con el mensaje adecuado en el momento adecuado.",
          "Mapeamos ese camino (TOFU/MOFU/BOFU), alineamos cada página y cada recordatorio con la fase correspondiente, e instalamos un tracking completo para saber con precisión dónde gana — y dónde pierde — prospectos.",
        ],
        included: [
          { icon: "funnel", title: "Arquitectura de embudo", desc: "Un recorrido estructurado del primer contacto a la conversión, sin agujeros." },
          { icon: "conversion", title: "Mensajes alineados", desc: "El argumento adecuado en cada etapa: descubrimiento, consideración, decisión." },
          { icon: "analytics", title: "Tracking y atribución", desc: "Medimos cada etapa para saber qué convierte y qué frena." },
          { icon: "ab-test", title: "Optimización continua", desc: "Tests A/B regulares para mejorar la tasa de conversión en cada nivel." },
        ],
        deliverables: [
          "Mapeo completo del embudo de conversión",
          "Páginas y secuencias alineadas por etapa",
          "Implementación del tracking y de la atribución",
          "Panel de control y plan de optimización",
        ],
        faq: [
          { q: "Un embudo, ¿es solo para la venta online?", a: "No. En B2B, el embudo suele llevar a una solicitud de presupuesto o una llamada, no a un pago. Lo adaptamos a su ciclo de venta real, aunque sea largo." },
          { q: "¿Hace falta tener ya tráfico?", a: "El embudo optimiza la conversión del tráfico existente; también podemos combinarlo con SEO o publicidad para alimentar la parte alta del embudo. Empezamos por maximizar lo que ya capta." },
        ],
      },
      {
        slug: "landing-pages-campagne",
        illustration: "landing-pages-campagne",
        title: "Landing pages de campaña",
        tagline: "Páginas de aterrizaje que transforman el tráfico en solicitudes.",
        short:
          "Para cada campaña, una página dedicada alineada con su mensaje y su audiencia. El complemento imprescindible de su publicidad para no desperdiciar ni un solo clic.",
        bullets: [
          "Una página por campaña",
          "Copywriting persuasivo",
          "Formularios optimizados",
          "Mobile-first y rápida",
        ],
        metaTitle: "Landing pages de campaña en Luxemburgo | vortx",
        metaDescription:
          "Creación de landing pages de campaña en Luxemburgo: páginas dedicadas, copywriting persuasivo y formularios optimizados. Convierta cada clic publicitario en lead cualificado.",
        intro: [
          "Una campaña que dirige a una página genérica pierde la mitad de su potencial. A cada mensaje publicitario debe corresponder una página que lo prolongue: misma promesa, misma audiencia, una sola acción esperada.",
          "Creamos landing pages persuasivas y rápidas para sus campañas de Google, Meta o LinkedIn, con un copywriting orientado al beneficio y formularios diseñados para maximizar la tasa de respuesta — no para desanimar.",
        ],
        included: [
          { icon: "landing", title: "Una página por campaña", desc: "Cada página prolonga el mensaje del anuncio: continuidad perfecta, cero pérdida." },
          { icon: "branding", title: "Copywriting persuasivo", desc: "Textos orientados a beneficios que responden a las objeciones y desencadenan la acción." },
          { icon: "smart-forms", title: "Formularios optimizados", desc: "Justo los campos necesarios para cualificar sin desanimar, pensados para la tasa de respuesta." },
          { icon: "speed", title: "Mobile-first y rápida", desc: "Perfectas en móvil, donde llega la mayor parte del tráfico de las campañas." },
        ],
        deliverables: [
          "Landing pages dedicadas por campaña",
          "Copywriting y estructura de conversión",
          "Formularios optimizados y tracking",
          "Variantes para A/B testing",
        ],
        faq: [
          { q: "¿Cuántas landing pages necesito?", a: "Idealmente una por oferta o por audiencia clave. Cuanto más alineado esté el mensaje con la intención, más sube la tasa de conversión. Empezamos por sus campañas prioritarias." },
          { q: "¿Trabajan con mis campañas existentes?", a: "Sí. Podemos crear las páginas para sus campañas en curso, ya estén gestionadas por usted o por nuestro equipo de publicidad." },
        ],
      },
      {
        slug: "email-marketing-automation",
        illustration: "email-marketing-automation",
        title: "Email marketing y automation",
        tagline: "Secuencias automatizadas que trabajan a sus prospectos 24/7.",
        short:
          "El email sigue siendo el canal con mejor ROI. Implementamos secuencias automatizadas que calientan a sus prospectos, hacen seguimiento en el momento adecuado y transforman el interés en cita.",
        bullets: [
          "Secuencias de nurturing automatizadas",
          "Escenarios disparados (triggers)",
          "Entregabilidad cuidada",
          "Integración con CRM",
        ],
        metaTitle: "Email marketing y marketing automation en Luxemburgo | vortx",
        metaDescription:
          "Email marketing y marketing automation para las empresas luxemburguesas: secuencias de nurturing, escenarios disparados e integración con CRM. Convierta sus prospectos automáticamente.",
        intro: [
          "No todos sus prospectos están listos para comprar hoy. Sin seguimiento, la mayoría le olvida. El email automation mantiene el vínculo: informa, tranquiliza y hace seguimiento automáticamente, hasta que el prospecto está listo.",
          "Diseñamos secuencias disparadas por el comportamiento (descarga, visita, inactividad), cuidamos la entregabilidad para aterrizar en la bandeja de entrada, y lo conectamos todo a su CRM para que sus comerciales reciban leads ya calientes.",
        ],
        included: [
          { icon: "email-automation", title: "Secuencias automatizadas", desc: "Escenarios que se disparan solos y acompañan a cada prospecto al ritmo adecuado." },
          { icon: "nurturing", title: "Nurturing inteligente", desc: "El contenido adecuado según la fase: calentamos sin acosar, hasta la decisión." },
          { icon: "conversion", title: "Entregabilidad cuidada", desc: "Configuración técnica (SPF, DKIM) para aterrizar en la bandeja de entrada, no en spam." },
          { icon: "integration", title: "Integración con CRM", desc: "Sincronización con su CRM: sus comerciales reciben leads ya cualificados." },
        ],
        deliverables: [
          "Estrategia de secuencias y escenarios",
          "Redacción y diseño de los emails",
          "Configuración de la automatización y entregabilidad",
          "Conexión con CRM y reporting",
        ],
        faq: [
          { q: "¿Cumple con el RGPD?", a: "Sí. Trabajamos únicamente sobre bases opt-in, con consentimiento y baja claros. La conformidad con el RGPD está integrada desde el diseño de las secuencias." },
          { q: "¿Hace falta tener ya una lista de emails?", a: "Es un plus, pero también podemos implementar la captación (lead magnets, formularios) para construirla de forma limpia. Partimos de su situación real." },
        ],
      },
      {
        slug: "lead-nurturing-scoring",
        illustration: "lead-nurturing-scoring",
        title: "Lead nurturing y scoring",
        tagline: "Identifique y caliente a los prospectos listos para comprar.",
        short:
          "No todos los leads valen lo mismo. Los puntuamos según su comportamiento y su perfil para que sus comerciales concentren su energía en los más calientes — en el momento adecuado.",
        bullets: [
          "Scoring comportamental de los leads",
          "Workflows de maduración",
          "Cualificación MQL → SQL",
          "Bucle de feedback comercial",
        ],
        metaTitle: "Lead nurturing y scoring en Luxemburgo | vortx",
        metaDescription:
          "Lead nurturing y scoring para las empresas luxemburguesas: puntuación comportamental, maduración automatizada y cualificación MQL/SQL. Sus comerciales sobre los leads adecuados, en el momento adecuado.",
        intro: [
          "Ahogar a sus comerciales bajo leads no cualificados es hacerles perder tiempo y motivación. El scoring resuelve eso: cada lead recibe una puntuación según su perfil y su comportamiento, y solo sube cuando está listo.",
          "Definimos con usted los criterios de cualificación (MQL, SQL), automatizamos la maduración de los leads aún tibios, e instalamos un bucle de feedback con sus comerciales para afinar el scoring de forma continua. Resultado: más tiempo sobre las oportunidades adecuadas.",
        ],
        included: [
          { icon: "nurturing", title: "Scoring comportamental", desc: "Cada lead se puntúa según su perfil y sus acciones — sabemos quién está listo." },
          { icon: "email-automation", title: "Workflows de maduración", desc: "Los leads tibios se calientan automáticamente hasta alcanzar el nivel adecuado." },
          { icon: "leads", title: "Cualificación MQL → SQL", desc: "Criterios claros para distinguir al simple interesado del prospecto listo para hablar." },
          { icon: "analytics", title: "Bucle de feedback", desc: "El retorno de sus comerciales afina el scoring de forma continua para más precisión." },
        ],
        deliverables: [
          "Modelo de scoring y criterios de cualificación",
          "Workflows de nurturing automatizados",
          "Configuración en su CRM",
          "Ritual de feedback y ajuste continuo",
        ],
        faq: [
          { q: "¿El scoring funciona sin gran volumen?", a: "Sí. Incluso con pocos leads, priorizar los buenos hace ganar un tiempo valioso a sus comerciales. El modelo sigue siendo sencillo y se afina con los datos." },
          { q: "¿Hace falta un CRM concreto?", a: "Trabajamos con la mayoría de los CRM (HubSpot, Pipedrive, Salesforce…). Si no tiene ninguno, le ayudamos a elegir y configurar el adecuado." },
        ],
      },
      {
        slug: "optimisation-conversion-cro",
        illustration: "optimisation-conversion-cro",
        title: "Optimización de la tasa de conversión (CRO)",
        tagline: "Más leads con el mismo tráfico, gracias a los datos.",
        short:
          "Duplicar sus conversiones sin duplicar su presupuesto: esa es la apuesta del CRO. Identificamos los frenos, probamos soluciones y conservamos lo que funciona, con pruebas en mano.",
        bullets: [
          "Auditoría de los frenos a la conversión",
          "Tests A/B y multivariantes",
          "Análisis comportamental (heatmaps)",
          "Optimización de los formularios",
        ],
        metaTitle: "Optimización de la tasa de conversión (CRO) en Luxemburgo | vortx",
        metaDescription:
          "Optimización de la tasa de conversión (CRO) en Luxemburgo: auditoría de frenos, tests A/B, heatmaps y optimización de formularios. Más leads con el mismo tráfico, pilotado por los datos.",
        intro: [
          "Atraer más tráfico cuesta caro. Convertir mejor el que ya tiene cuesta mucho menos — y a menudo rinde más. El CRO (Conversion Rate Optimization) consiste en transformar una proporción mayor de sus visitantes en leads.",
          "Analizamos el comportamiento real de sus visitantes (heatmaps, grabaciones, embudos), formulamos hipótesis y luego las validamos mediante tests A/B. Sin opiniones: solo conservamos lo que los datos demuestran ganador.",
        ],
        included: [
          { icon: "ab-test", title: "Auditoría de los frenos", desc: "Detectamos con precisión dónde y por qué sus visitantes abandonan antes de convertir." },
          { icon: "analytics", title: "Tests A/B y multivariantes", desc: "Probamos variantes y medimos: solo se conservan las versiones ganadoras." },
          { icon: "conversion", title: "Análisis comportamental", desc: "Heatmaps y grabaciones de sesión para comprender las fricciones reales." },
          { icon: "smart-forms", title: "Optimización de los formularios", desc: "Menos fricción, más cumplimentaciones: el formulario suele ser el punto clave." },
        ],
        deliverables: [
          "Auditoría de conversión y análisis comportamental",
          "Plan de hipótesis y priorización",
          "Tests A/B implementados y analizados",
          "Reporting de las ganancias e iteraciones",
        ],
        faq: [
          { q: "¿Qué ganancia de conversión se puede esperar?", a: "Depende de su punto de partida. No prometemos una cifra mágica: instalamos un proceso de mejora continua y documentamos cada ganancia validada por los tests." },
          { q: "¿Hace falta mucho tráfico para hacer CRO?", a: "Un mínimo de volumen ayuda a obtener resultados estadísticamente fiables. Por debajo, empezamos por optimizaciones basadas en las buenas prácticas y el análisis comportamental." },
        ],
      },
    ],
    "branding-design": [
      {
        slug: "creation-de-logo",
        illustration: "creation-de-logo",
        title: "Creación de logo",
        tagline: "Un símbolo que le hace reconocible de un vistazo.",
        short:
          "Un logo único, diseñado a mano y declinado en todos los formatos útiles. El punto de partida de una marca que se recuerda — no un pictograma genérico.",
        bullets: [
          "Conceptos originales dibujados a mano",
          "Declinaciones (color, mono, favicon)",
          "Formatos vectoriales entregados",
          "Pruebas de legibilidad multisoporte",
        ],
        metaTitle: "Creación de logo a medida en Luxemburgo | vortx",
        metaDescription:
          "Creación de logo a medida en Luxemburgo: conceptos originales, declinaciones y formatos vectoriales. Un símbolo único y memorable, fiel a su identidad.",
        intro: [
          "Su logo es lo primero que se recuerda de usted — y a menudo lo único. Debe ser único, legible en todas partes y fiel a lo que usted es. Lo concebimos a medida, nunca a partir de un banco de símbolos reciclados.",
          "Exploramos varias pistas creativas, afinamos con usted la que le representa, y luego la declinamos en todos los formatos que vaya a necesitar — color, monocromo, favicon, versiones web e impresas. Un logo que aguanta en todas partes y con el tiempo.",
        ],
        included: [
          { icon: "logo", title: "Conceptos dibujados a mano", desc: "Varias pistas originales diseñadas para usted, no plantillas retocadas." },
          { icon: "branding", title: "Declinaciones completas", desc: "Versiones color, blanco y negro, monocromo, favicon: su logo listo para cualquier uso." },
          { icon: "ai-build", title: "Formatos vectoriales", desc: "Archivos vectoriales (SVG, PDF) que se mantienen nítidos a cualquier tamaño, del favicon al rótulo." },
          { icon: "responsive", title: "Legibilidad probada", desc: "Verificado en formatos pequeños y grandes, fondo claro y oscuro, pantalla y papel." },
        ],
        deliverables: [
          "Varios conceptos de logo originales",
          "Logo finalizado en versiones color y mono",
          "Pack de archivos (vectorial, web, impresión, favicon)",
          "Miniguía de uso del logo",
        ],
        faq: [
          { q: "¿Cuántas propuestas voy a recibir?", a: "Presentamos varias pistas distintas, y luego afinamos la que prefiera con idas y venidas. El objetivo es un logo que adore, no un compromiso tibio." },
          { q: "¿El logo me pertenece de verdad?", a: "Sí, íntegramente. Recibe todos los archivos fuente y es plenamente propietario de ellos, sin costes ocultos ni canon." },
        ],
      },
      {
        slug: "identite-visuelle",
        illustration: "identite-visuelle",
        title: "Identidad visual completa",
        tagline: "Mucho más que un logo: un sistema visual coherente en todas partes.",
        short:
          "Colores, tipografías, iconografía, dirección artística: un sistema visual completo que hace reconocible su marca en todos sus puntos de contacto.",
        bullets: [
          "Paleta de colores y tipografías",
          "Iconografía y motivos",
          "Dirección artística fotográfica",
          "Sistema modular escalable",
        ],
        metaTitle: "Identidad visual de marca en Luxemburgo | vortx",
        metaDescription:
          "Creación de identidad visual completa en Luxemburgo: colores, tipografías, iconografía y dirección artística. Un sistema coherente que hace reconocible su marca en todas partes.",
        intro: [
          "Un logo por sí solo no hace una marca. Lo que le hace reconocible es la coherencia de todo lo demás: sus colores, sus tipografías, sus imágenes, su estilo. Una identidad visual completa orquesta esos elementos en un sistema armonioso.",
          "Construimos ese sistema de la A a la Z: paleta de colores, jerarquía tipográfica, iconografía, motivos y dirección artística. Modular y escalable, le da todo para comunicar de forma coherente — del sitio web a la red social, del impreso a la presentación.",
        ],
        included: [
          { icon: "brand-identity", title: "Colores y tipografías", desc: "Una paleta y una jerarquía tipográfica distintivas, declinadas para todos los usos." },
          { icon: "branding", title: "Iconografía y motivos", desc: "Elementos gráficos propios de su marca que refuerzan su reconocimiento." },
          { icon: "ai-build", title: "Dirección artística", desc: "Un estilo fotográfico y visual coherente para que todo lo que produzca se parezca." },
          { icon: "automation", title: "Sistema modular", desc: "Una base escalable: podemos extenderla a nuevos soportes sin rehacerlo todo." },
        ],
        deliverables: [
          "Paleta de colores y sistema tipográfico",
          "Iconografía, motivos y elementos gráficos",
          "Dirección artística y ejemplos de aplicación",
          "Archivos fuente organizados y listos para usar",
        ],
        faq: [
          { q: "¿Hace falta tener ya un logo?", a: "Idealmente sí — la identidad se articula en torno a él. Si no tiene ninguno, empezamos por crearlo, y luego desplegamos la identidad visual coherente a su alrededor." },
          { q: "¿Qué diferencia hay con un manual de marca?", a: "La identidad visual son los elementos (colores, tipografía, estilo). El manual de marca es el documento que fija sus reglas de uso. Ambos son complementarios y podemos entregar el conjunto." },
        ],
      },
      {
        slug: "charte-graphique",
        illustration: "charte-graphique",
        title: "Manual de marca y brand guidelines",
        tagline: "Las reglas que garantizan una marca coherente, en todas partes, por todos.",
        short:
          "El documento de referencia que fija el uso de su marca: logo, colores, tipografías, tono. Para que todo el mundo — sus equipos y sus proveedores — lo aplique correctamente.",
        bullets: [
          "Manual de uso del logo",
          "Reglas de colores, tipografía y espaciados",
          "Ejemplos de aplicaciones",
          "Archivos listos para sus equipos",
        ],
        metaTitle: "Manual de marca y brand guidelines en Luxemburgo | vortx",
        metaDescription:
          "Creación de manual de marca y brand guidelines en Luxemburgo: reglas de uso del logo, colores, tipografías y aplicaciones. Una marca coherente, aplicada por todos.",
        intro: [
          "Una marca pierde su fuerza en cuanto cada uno la aplica a su manera: logo deformado, colores aproximados, tipografías dispares. El manual de marca evita eso fijando reglas claras, seguidas por todos.",
          "Documentamos el uso de su marca: zonas de protección del logo, códigos de color precisos, jerarquía tipográfica, espaciados, tono de voz y ejemplos concretos de aplicación. Una guía que sus equipos y sus proveedores pueden seguir sin dudar.",
        ],
        included: [
          { icon: "guidelines", title: "Manual del logo", desc: "Tamaños mínimos, zonas de protección, usos correctos y prohibidos, sobre cualquier fondo." },
          { icon: "brand-identity", title: "Reglas de colores y tipografía", desc: "Códigos precisos (HEX, RGB, CMYK, Pantone) y jerarquía tipográfica documentada." },
          { icon: "conversion", title: "Ejemplos de aplicación", desc: "Casos concretos — papelería, web, redes sociales — para despejar toda ambigüedad." },
          { icon: "ai-build", title: "Archivos listos para usar", desc: "Todos los recursos organizados y accesibles para sus equipos y proveedores." },
        ],
        deliverables: [
          "Documento de manual de marca completo (PDF)",
          "Reglas de logo, colores, tipografías y espaciados",
          "Tono de voz y ejemplos de aplicación",
          "Biblioteca de recursos organizada",
        ],
        faq: [
          { q: "¿De qué sirve un manual si trabajo solo?", a: "Garantiza la coherencia en el tiempo y facilita cada colaboración futura (imprenta, freelance, nueva incorporación). Es una inversión que protege el valor de su marca." },
          { q: "¿El manual puede evolucionar?", a: "Sí. Es un documento vivo: podemos enriquecerlo a medida que su marca se extiende a nuevos soportes." },
        ],
      },
      {
        slug: "supports-print",
        illustration: "supports-print",
        title: "Soportes impresos y papelería",
        tagline: "Una marca que se sostiene tan bien en las manos como en pantalla.",
        short:
          "Tarjetas de visita, folletos, dossieres, informes, señalética: sus soportes impresos diseñados con el mismo cuidado que su presencia digital.",
        bullets: [
          "Tarjetas de visita y papelería",
          "Folletos y dossieres",
          "Informes y documentos corporativos",
          "Señalética y soportes para eventos",
        ],
        metaTitle: "Creación de soportes impresos y papelería en Luxemburgo | vortx",
        metaDescription:
          "Creación de soportes impresos en Luxemburgo: tarjetas de visita, folletos, dossieres, informes y señalética. Una marca coherente del digital al papel, lista para imprimir.",
        intro: [
          "El print no ha muerto — tranquiliza. En Luxemburgo, el tejido corporativo y financiero sigue siendo un gran consumidor de soportes impresos cuidados: una tarjeta de visita, un dossier o un informe anual dicen mucho de su seriedad.",
          "Diseñamos sus soportes impresos en continuidad con su identidad, listos para imprimir (sangrados, perfiles de color, formatos normalizados). Del detalle de la tarjeta de visita a la señalética, su marca se mantiene coherente en todos los soportes.",
        ],
        included: [
          { icon: "print", title: "Tarjetas y papelería", desc: "Tarjetas de visita, membretes, firmas: su identidad hasta en los detalles." },
          { icon: "branding", title: "Folletos y dossieres", desc: "Soportes comerciales que ponen en valor sus ofertas con claridad y elegancia." },
          { icon: "guidelines", title: "Informes corporativos", desc: "Informes anuales y documentos institucionales maquetados con rigor." },
          { icon: "responsive", title: "Listos para imprimir", desc: "Archivos conformes (sangrados, CMYK) para una impresión sin sorpresas desagradables." },
        ],
        deliverables: [
          "Diseño de los soportes impresos solicitados",
          "Archivos listos para imprimir (PDF, CMYK, sangrados)",
          "Declinaciones y plantillas reutilizables",
          "Acompañamiento con su imprenta si hace falta",
        ],
        faq: [
          { q: "¿Gestionan también la impresión?", a: "Entregamos archivos listos para imprimir y podemos coordinar con su imprenta, o recomendarle socios fiables en Luxemburgo." },
          { q: "¿Pueden partir de mi manual existente?", a: "Sí. Aplicamos su identidad actual sobre los soportes impresos, o la adaptamos si aún no tiene una versión impresa." },
        ],
      },
      {
        slug: "strategie-de-marque-naming",
        illustration: "strategie-de-marque-naming",
        title: "Estrategia de marca y naming",
        tagline: "El sentido y las palabras antes que los píxeles.",
        short:
          "Antes que lo visual, el fondo: posicionamiento, plataforma de marca, nombre y tono de voz. La estrategia que da una dirección clara a toda su comunicación.",
        bullets: [
          "Posicionamiento y plataforma de marca",
          "Naming y búsqueda de nombre",
          "Tono de voz y mensajes clave",
          "Identidad verbal multilingüe",
        ],
        metaTitle: "Estrategia de marca y naming en Luxemburgo | vortx",
        metaDescription:
          "Estrategia de marca y naming en Luxemburgo: posicionamiento, plataforma de marca, creación de nombre y tono de voz multilingüe. El sentido que guía toda su comunicación.",
        intro: [
          "Una bonita marca sin estrategia es una fachada sin cimientos. Antes de dibujar nada, hay que saber qué representa, a quién habla y qué le distingue. Ese es el papel de la estrategia de marca.",
          "Definimos su posicionamiento, su plataforma de marca (misión, valores, promesa) y su territorio de expresión. Si hace falta, creamos su nombre (naming) y fijamos un tono de voz coherente — incluso en varios idiomas, como exige el mercado luxemburgués.",
        ],
        included: [
          { icon: "strategy", title: "Posicionamiento", desc: "Lo que le distingue, formulado con claridad: la base de toda su comunicación." },
          { icon: "branding", title: "Plataforma de marca", desc: "Misión, valores, promesa y personalidad: el ADN que guía cada decisión." },
          { icon: "gen-content", title: "Naming", desc: "Creación y verificación de un nombre de marca o de producto, disponible y con sentido." },
          { icon: "multilingual", title: "Tono de voz multilingüe", desc: "Una identidad verbal coherente en FR, DE y EN, adaptada a cada público." },
        ],
        deliverables: [
          "Plataforma de marca y posicionamiento",
          "Naming y recomendaciones (si aplica)",
          "Guía de tono de voz y mensajes clave",
          "Síntesis estratégica accionable",
        ],
        faq: [
          { q: "La estrategia de marca, ¿es útil para una estructura pequeña?", a: "Sí, quizá aún más: con menos medios, cada mensaje debe dar en el blanco. Una estrategia clara evita dispersarse y hace toda su comunicación más eficaz." },
          { q: "¿Hay que hacer la estrategia antes que el logo?", a: "Idealmente sí: lo visual se deriva del posicionamiento. No obstante, podemos llevar ambos en paralelo si el proyecto lo exige. La estrategia sigue siendo la brújula." },
        ],
      },
    ],
    "automatisation-ia": [
      {
        slug: "automatisation-workflows",
        illustration: "automatisation-workflows",
        title: "Automatización de los flujos de trabajo",
        tagline: "Sus tareas repetitivas, ejecutadas solas — 24/7, sin errores.",
        short:
          "Conectamos sus herramientas y automatizamos las tareas manuales: recordatorios, sincronizaciones, notificaciones, informes. Sus equipos se concentran en lo que de verdad importa.",
        bullets: [
          "Mapeo de sus procesos",
          "Conexión de sus herramientas (Make, n8n, Zapier)",
          "Disparadores y escenarios a medida",
          "Seguimiento y alertas en caso de incidente",
        ],
        metaTitle: "Automatización de los flujos de trabajo en Luxemburgo | vortx",
        metaDescription:
          "Automatización de los flujos de trabajo para las empresas luxemburguesas: Make, n8n, Zapier. Conecte sus herramientas, elimine las tareas manuales y gane horas cada semana.",
        intro: [
          "¿Cuántas horas dedican sus equipos a copiar datos de una herramienta a otra, a hacer seguimientos, a notificar, a actualizar tablas? Esas tareas repetitivas cuestan caras y generan errores. La automatización las hace desaparecer.",
          "Mapeamos sus procesos, identificamos lo que se puede automatizar, y luego conectamos sus herramientas (Make, n8n, Zapier) con escenarios a medida. Todo supervisado, con alertas en caso de incidente — para que funcione sin sorpresas.",
        ],
        included: [
          { icon: "automation", title: "Mapeo de los procesos", desc: "Analizamos sus flujos para detectar dónde la automatización hace ganar más tiempo." },
          { icon: "integration", title: "Conexión de las herramientas", desc: "Make, n8n, Zapier: conectamos sus aplicaciones para que por fin se hablen." },
          { icon: "ai-build", title: "Escenarios a medida", desc: "Automatizaciones diseñadas para su caso concreto, no recetas genéricas." },
          { icon: "analytics", title: "Supervisión y alertas", desc: "Seguimiento de las ejecuciones y alertas en caso de incidente: funciona sin puntos ciegos." },
        ],
        deliverables: [
          "Mapeo de los procesos a automatizar",
          "Escenarios de automatización configurados",
          "Conexiones entre sus herramientas",
          "Documentación y supervisión de los workflows",
        ],
        faq: [
          { q: "¿Hay que cambiar mis herramientas actuales?", a: "Rara vez. La automatización conecta sus herramientas existentes entre sí. Partimos de su stack y añadimos la capa que las hace comunicarse." },
          { q: "¿Qué pasa si una automatización se rompe?", a: "Implementamos una supervisión con alertas: en caso de incidente, usted (y nosotros) recibe aviso de inmediato. También podemos asegurar el mantenimiento." },
        ],
      },
      {
        slug: "agents-assistants-ia",
        illustration: "agents-assistants-ia",
        title: "Agentes y asistentes de IA a medida",
        tagline: "Colaboradores de IA que razonan, deciden y actúan.",
        short:
          "Más allá del simple chatbot: agentes de IA conectados a sus datos y sus herramientas, capaces de ejecutar tareas complejas — con las salvaguardas necesarias.",
        bullets: [
          "Agentes conectados a sus datos",
          "Asistentes internos (RR. HH., soporte, finanzas)",
          "Base de conocimiento (RAG)",
          "Salvaguardas y validación humana",
        ],
        metaTitle: "Agentes y asistentes de IA a medida en Luxemburgo | vortx",
        metaDescription:
          "Creación de agentes y asistentes de IA a medida en Luxemburgo: conectados a sus datos (RAG), capaces de actuar, con salvaguardas. La IA que de verdad trabaja para su empresa.",
        intro: [
          "Un agente de IA no se limita a responder: comprende una solicitud, busca la información en sus datos, razona y ejecuta acciones. Esa es la diferencia entre un gadget y un verdadero colaborador digital.",
          "Diseñamos agentes y asistentes entrenados sobre su contexto (sus documentos, sus procesos), conectados a sus herramientas, con una base de conocimiento (RAG) y salvaguardas: validación humana en las acciones sensibles, respeto del RGPD, trazabilidad.",
        ],
        included: [
          { icon: "ai-agent", title: "Agentes autónomos", desc: "Agentes que comprenden, razonan y ejecutan tareas conectadas a sus herramientas." },
          { icon: "ai-build", title: "Asistentes internos", desc: "Para el soporte, RR. HH., finanzas: un asistente que conoce sus procesos." },
          { icon: "geo-citation", title: "Base de conocimiento (RAG)", desc: "Conectado a sus documentos para respuestas fiables y con fuentes, no inventadas." },
          { icon: "rgpd", title: "Salvaguardas y RGPD", desc: "Validación humana en las acciones sensibles, confidencialidad y trazabilidad." },
        ],
        deliverables: [
          "Encuadre de los casos de uso y de los datos",
          "Agente/asistente de IA desarrollado y conectado",
          "Base de conocimiento y salvaguardas",
          "Pruebas, documentación y acompañamiento",
        ],
        faq: [
          { q: "¿La IA corre el riesgo de inventar respuestas?", a: "Ese es el riesgo que neutralizamos con una base de conocimiento (RAG): el agente responde a partir de sus documentos y cita sus fuentes. En las acciones sensibles, se requiere validación humana." },
          { q: "¿Mis datos siguen siendo confidenciales?", a: "Sí. Diseñamos cada agente respetando el RGPD, con una fuerte atención a la confidencialidad y a la elección de los modelos y del alojamiento." },
        ],
      },
      {
        slug: "chatbots-ia",
        illustration: "chatbots-ia",
        title: "Chatbots y voicebots de IA",
        tagline: "Responda, cualifique y reserve automáticamente, 24/7.",
        short:
          "Chatbots y voicebots inteligentes que responden a sus visitantes, cualifican las solicitudes y conciertan citas — tanto en su sitio como en WhatsApp.",
        bullets: [
          "Chatbot de sitio web multilingüe",
          "WhatsApp y Messenger",
          "Voicebot para llamadas entrantes",
          "Transferencia inteligente a un humano",
        ],
        metaTitle: "Creación de chatbots y voicebots de IA en Luxemburgo | vortx",
        metaDescription:
          "Chatbots y voicebots de IA para las empresas luxemburguesas: sitio web, WhatsApp, llamadas entrantes, multilingüe. Responda, cualifique y reserve automáticamente, 24/7.",
        intro: [
          "Un visitante que no encuentra respuesta se va. Una llamada perdida es un cliente perdido. Un chatbot de IA bien diseñado responde al instante, a cualquier hora, en el idioma del visitante — y nunca duerme.",
          "Desplegamos chatbots y voicebots conectados a su contexto: responden a las preguntas frecuentes, cualifican las solicitudes, conciertan citas y transfieren a un humano cuando es pertinente. En su sitio, en WhatsApp o por teléfono.",
        ],
        included: [
          { icon: "chatbot", title: "Chatbot multilingüe", desc: "En su sitio, responde en FR/DE/EN y cualifica a los visitantes de forma continua." },
          { icon: "integration", title: "WhatsApp y Messenger", desc: "Donde están sus clientes: desplegamos el bot en sus canales preferidos." },
          { icon: "ai-agent", title: "Voicebot telefónico", desc: "Un agente de voz que descuelga, informa y orienta las llamadas entrantes." },
          { icon: "leads", title: "Transferencia inteligente", desc: "Cuando es útil, el bot cede el paso a un humano con todo el contexto." },
        ],
        deliverables: [
          "Diseño de los escenarios y del tono",
          "Chatbot/voicebot conectado a sus contenidos",
          "Despliegue en sus canales (web, WhatsApp…)",
          "Seguimiento de las conversaciones y optimización",
        ],
        faq: [
          { q: "¿El chatbot puede realmente reemplazar a un humano?", a: "Para las preguntas frecuentes y la cualificación, sí — 24/7 y al instante. Para los casos complejos, transfiere a un humano con el contexto. El objetivo es aliviar a sus equipos, no deshumanizar." },
          { q: "¿Es multilingüe?", a: "Sí, es incluso una gran ventaja en Luxemburgo: el bot detecta el idioma del visitante y responde en FR, DE o EN." },
        ],
      },
      {
        slug: "integrations-crm-api",
        illustration: "integrations-crm-api",
        title: "Integraciones CRM y API",
        tagline: "Todas sus herramientas por fin conectadas, sus datos sincronizados.",
        short:
          "Se acabaron las dobles entradas y los silos: conectamos su sitio, su CRM y sus programas de negocio para un flujo de datos fluido y fiable, en tiempo real.",
        bullets: [
          "Conexión CRM (HubSpot, Salesforce…)",
          "Sincronización entre programas",
          "API a medida y webhooks",
          "Fin de las dobles entradas",
        ],
        metaTitle: "Integraciones CRM y API en Luxemburgo | vortx",
        metaDescription:
          "Integraciones CRM y API para las empresas luxemburguesas: HubSpot, Salesforce, Pipedrive. Sincronice sus herramientas, elimine los silos y las dobles entradas.",
        intro: [
          "Sus datos están dispersos: un lead en el formulario del sitio, otro en la hoja de cálculo, un tercero en el CRM. Esa dispersión hace perder tiempo, crea errores y deja escapar oportunidades.",
          "Conectamos sus herramientas para que hablen el mismo idioma: su sitio alimenta su CRM, su CRM se sincroniza con sus programas de negocio, y todo se actualiza en tiempo real. Mediante conectores existentes o API a medida cuando es necesario.",
        ],
        included: [
          { icon: "integration", title: "Conexión CRM", desc: "HubSpot, Salesforce, Pipedrive… conectamos su CRM con su sitio y sus herramientas." },
          { icon: "automation", title: "Sincronización en tiempo real", desc: "Sus datos actualizados en todas partes, sin intervención manual ni demora." },
          { icon: "ai-build", title: "API y webhooks a medida", desc: "Cuando no existe ningún conector estándar, desarrollamos la integración a medida." },
          { icon: "analytics", title: "Fiabilidad de los datos", desc: "Fin de las dobles entradas y de los silos: una única fuente de verdad, decisiones acertadas." },
        ],
        deliverables: [
          "Auditoría de sus herramientas y flujos de datos",
          "Integraciones y conectores configurados",
          "API/webhooks a medida si es necesario",
          "Pruebas, documentación y supervisión",
        ],
        faq: [
          { q: "¿Y si mi programa no tiene un conector ya hecho?", a: "Desarrollamos una integración a medida mediante su API o webhooks. La mayoría de las herramientas profesionales exponen una API: nos conectamos a ella de forma limpia." },
          { q: "¿Mis datos están seguros durante la sincronización?", a: "Sí. Las integraciones se diseñan respetando el RGPD, con conexiones seguras y una gestión fina de los accesos." },
        ],
      },
      {
        slug: "ia-contenu-generatif",
        illustration: "ia-contenu-generatif",
        title: "IA generativa para el contenido",
        tagline: "Produzca artículos, emails y visuales de marca, a escala.",
        short:
          "Ponga la IA generativa al servicio de su contenido — artículos, newsletters, respuestas, visuales — sin perder su tono de marca y con una validación editorial humana.",
        bullets: [
          "Generación de artículos y newsletters",
          "Respuestas y emails personalizados",
          "Visuales y declinaciones para redes sociales",
          "Validación editorial y tono de marca",
        ],
        metaTitle: "IA generativa para el contenido en Luxemburgo | vortx",
        metaDescription:
          "IA generativa para el contenido en Luxemburgo: artículos, newsletters, emails y visuales con su tono de marca, en varios idiomas. Produzca más, sin sacrificar la calidad.",
        intro: [
          "Producir contenido de calidad, con regularidad y en varios idiomas, es un reto de tiempo y de medios. La IA generativa cambia las reglas: acelera la producción manteniendo su voz — siempre que esté bien encuadrada.",
          "Implementamos workflows de generación a medida (artículos, emails, visuales para redes sociales) entrenados sobre su tono de marca, con una etapa de validación editorial humana. Producir más, más rápido, sin caer en el contenido genérico.",
        ],
        included: [
          { icon: "gen-content", title: "Artículos y newsletters", desc: "Contenido editorial producido a su ritmo, en su tono, listo para revisar." },
          { icon: "email-automation", title: "Emails personalizados", desc: "Respuestas y emails a medida, generados a escala sin perder el toque humano." },
          { icon: "branding", title: "Visuales para redes sociales", desc: "Declinaciones gráficas coherentes con su identidad, para sus redes." },
          { icon: "multilingual", title: "Multilingüe y validado", desc: "Producción en FR/DE/EN con validación editorial: calidad y tono garantizados." },
        ],
        deliverables: [
          "Workflows de generación a medida",
          "Modelos entrenados sobre su tono de marca",
          "Proceso de validación editorial",
          "Formación y acompañamiento de sus equipos",
        ],
        faq: [
          { q: "¿El contenido de IA no lo penaliza Google?", a: "Lo que Google penaliza es el contenido sin valor — no la herramienta utilizada. Nuestro enfoque combina generación y validación humana para un contenido útil, original y optimizado. Es la calidad lo que cuenta." },
          { q: "¿El contenido mantendrá de verdad mi tono?", a: "Sí, ese es todo el reto. Entrenamos los modelos sobre sus contenidos y su estilo, y una revisión humana garantiza la coherencia antes de la publicación." },
        ],
      },
    ],
  },

  // ---- FAQ page (comprehensive, grouped) ----
  faqPage: {
    eyebrow: "Preguntas frecuentes",
    title: "Todas sus preguntas, nuestras respuestas claras.",
    lead: "Sitio web, SEO, leads, publicidad, IA, tarifas, plazos, RGPD… Todo lo que nos preguntan antes de empezar. ¿Queda alguna pregunta sin responder? Escríbanos.",
    searchPlaceholder: "Buscar una pregunta…",
    countSuffix: "preguntas",
    emptyLabel: "Ninguna pregunta coincide con su búsqueda.",
    ctaTitle: "¿Una pregunta sin respuesta?",
    groups: [
      {
        title: "La agencia y empezar",
        items: [
          { q: "¿Quién es vortx y qué hacen exactamente?", a: "vortx es una agencia de marketing y web con sede en Luxemburgo. Diseñamos sitios que convierten y estrategias de captación medibles: SEO y GEO, generación de leads, publicidad online, branding y automatización con IA. Nuestra obsesión: transformar la atención en clientes." },
          { q: "¿Trabajan con empresas de mi tamaño?", a: "Sí. Acompañamos tanto a autónomos y profesionales como a pymes y startups. El enfoque se adapta a su madurez digital y a su presupuesto." },
          { q: "¿Cómo es un primer contacto?", a: "Reserva una llamada de descubrimiento gratuita. Analizamos su situación, sus objetivos y su mercado, y luego le decimos, sin rodeos, qué se puede mejorar — incluso antes de hablar de presupuesto." },
          { q: "¿Son una agencia luxemburguesa?", a: "Sí, conocemos el mercado local, su multilingüismo (FR/DE/EN) y sus exigencias de RGPD. Pensamos sus campañas para el terreno luxemburgués." },
        ],
      },
      {
        title: "Sitios web",
        items: [
          { q: "¿A medida o WordPress, cómo elegir?", a: "El desarrollo a medida (Next.js) ofrece el mejor rendimiento, seguridad y flexibilidad; WordPress es ideal si quiere editar el contenido usted mismo en el día a día. Le aconsejamos según su uso real, sin dogmas." },
          { q: "¿Es cierto que sus sitios están «hechos con IA»?", a: "Sí. Usamos la IA para acelerar el diseño, el código y el contenido. Resultado: un sitio de mayor calidad, entregado más rápido y con una mejor relación valor/precio — siempre revisado y finalizado por humanos." },
          { q: "¿Mi sitio será rápido y adaptado al móvil?", a: "Por supuesto. El rendimiento y el mobile-first son la base: un sitio casi instantáneo, 100 % responsive y accesible en todas las pantallas." },
          { q: "¿Podré modificar mi sitio yo mismo?", a: "En WordPress, sí, fácilmente. En el desarrollo a medida, ponemos lo necesario para que pueda gestionar sus contenidos clave — o nos encargamos nosotros." },
          { q: "¿Mi sitio estará optimizado para Google y las IA?", a: "Sí. Integramos desde el principio las buenas prácticas de SEO y GEO: estructura, rendimiento, datos estructurados y contenido citable por los motores de respuesta de IA." },
          { q: "¿Gestionan el alojamiento y el mantenimiento?", a: "Sí. Podemos encargarnos del alojamiento, las actualizaciones, la seguridad y las evoluciones, para que usted no tenga que preocuparse." },
        ],
      },
      {
        title: "SEO y GEO",
        items: [
          { q: "¿Qué diferencia hay entre SEO y GEO?", a: "El SEO le coloca en la lista de resultados de Google; el GEO (Generative Engine Optimization) le coloca en la respuesta generada por una IA como ChatGPT o Perplexity. Optimizamos para ambos, porque el 80 % de las buenas prácticas son comunes." },
          { q: "¿El GEO es algo concreto o una moda pasajera?", a: "Es muy concreto: cada vez más decisores plantean sus preguntas a una IA en lugar de a Google. Si no aparece en la respuesta, no existe en la decisión. Estructuramos su contenido para ser citado como fuente." },
          { q: "¿En cuánto tiempo se ven resultados en SEO?", a: "El SEO/GEO es un trabajo de fondo: las primeras señales aparecen a menudo en unas semanas, las ganancias sólidas en unos meses. Le mostramos el avance en cada etapa, sin promesas mágicas." },
          { q: "¿Trabajan el posicionamiento en varios idiomas?", a: "Sí, FR/DE/EN de forma nativa. Es esencial en Luxemburgo, donde sus clientes comparan en los tres idiomas." },
        ],
      },
      {
        title: "Leads y publicidad",
        items: [
          { q: "¿Garantizan un número de leads?", a: "No vendemos promesas mágicas: construimos un sistema de captación medible y lo optimizamos hasta que rinda. Los objetivos se fijan juntos, según su mercado." },
          { q: "¿Hace falta forzosamente un presupuesto publicitario?", a: "No siempre. Una parte de los leads puede venir del SEO/GEO y del contenido. La publicidad acelera, pero empezamos por maximizar lo que su sitio ya puede captar." },
          { q: "¿Qué presupuesto publicitario mínimo hay que prever?", a: "Depende de su sector y de su objetivo. Definimos juntos un presupuesto de prueba, medimos, y luego aumentamos únicamente lo que es rentable." },
          { q: "¿En qué canales hacen publicidad?", a: "Google Ads y Performance Max, Meta (Facebook e Instagram) y LinkedIn Ads para el B2B. Elegimos los canales según su público objetivo." },
          { q: "¿Cómo miden el retorno de la inversión?", a: "Configuramos un seguimiento de las conversiones fiable y un reporting claro: coste por lead, ROAS, ROI. Cada euro gastado se vincula a un resultado." },
        ],
      },
      {
        title: "Branding, diseño e IA",
        items: [
          { q: "¿Crean una marca de cero o hacen evolucionar la existente?", a: "Ambas cosas. Podemos crear una identidad visual completa (logo, manual de marca, design system) o renovar la suya conservando lo que funciona y por lo que ya se le reconoce." },
          { q: "¿El diseño tiene en cuenta la conversión?", a: "Siempre. No hacemos belleza por la belleza: cada decisión visual sirve a la claridad, la confianza y la acción." },
          { q: "La automatización y la IA, ¿para qué sirven concretamente?", a: "Para eliminar las tareas repetitivas (recordatorios, sincronización de herramientas, notificaciones), conectar su sitio y su CRM, y desplegar asistentes o chatbots de IA que responden y cualifican a sus visitantes 24/7." },
          { q: "¿La IA va a reemplazar a mis equipos?", a: "No — los alivia. Automatizamos las tareas sin valor añadido para que sus equipos se concentren en lo esencial: sus clientes." },
        ],
      },
      {
        title: "Tarifas, plazos y proceso",
        items: [
          { q: "¿Cuánto cuesta un sitio o una campaña?", a: "Cada proyecto es a medida. En lugar de una tarifa genérica, le proponemos un presupuesto preciso tras una llamada de descubrimiento gratuita y una auditoría de su situación." },
          { q: "¿Por qué no muestran sus precios?", a: "Porque un buen presupuesto depende de sus objetivos reales. Un precio genérico sería o demasiado alto, o decepcionante. Preferimos proponerle el alcance justo, sin sobrefacturar." },
          { q: "¿Cuáles son los plazos de realización?", a: "Depende de la magnitud del proyecto, pero nuestra producción acelerada por IA nos permite entregar rápido. Le damos un calendario claro ya en el presupuesto." },
          { q: "¿Cómo se desarrolla un proyecto, paso a paso?", a: "Cuatro tiempos: diagnóstico, diseño y desarrollo, revisión y ajustes, y luego lanzamiento y seguimiento. Usted valida en cada etapa, sin sorpresas desagradables." },
          { q: "¿Ofrecen seguimiento tras la puesta en línea?", a: "Sí. Mantenimiento, evoluciones, optimización de la conversión y acompañamiento de marketing continuo forman parte de nuestra oferta." },
          { q: "¿El presupuesto es realmente sin compromiso?", a: "Sí. La llamada de descubrimiento, la auditoría y el presupuesto son gratuitos y sin compromiso. Usted decide después, con total libertad." },
        ],
      },
      {
        title: "Técnica, idiomas y RGPD",
        items: [
          { q: "¿Mis datos y los de mis clientes están protegidos?", a: "Sí. Diseñamos cada sitio y cada automatización respetando el RGPD: consentimiento, gestión de las cookies y una fuerte atención a la confidencialidad." },
          { q: "¿Mi sitio será multilingüe?", a: "Sí, de forma nativa si hace falta (FR, DE, EN, y Lëtzebuergesch bajo petición), con una estructura pensada para el posicionamiento de cada idioma." },
          { q: "¿Qué pasa si quiero cambiar de agencia más adelante?", a: "Usted sigue siendo propietario de su sitio, de sus contenidos y de sus accesos. Sin ataduras: todo le pertenece." },
          { q: "¿Mi sitio será accesible para las personas con discapacidad?", a: "Seguimos las buenas prácticas de accesibilidad (contrastes, navegación por teclado, semántica) para un sitio utilizable por el mayor número de personas." },
        ],
      },
    ],
  },

  // ---- Accessibility widget ----
  a11y: {
    button: "Accesibilidad",
    title: "Accesibilidad",
    profilesTitle: "Perfiles rápidos",
    profileVisual: "Confort visual",
    profileDyslexia: "Dislexia",
    profileReading: "Lectura fácil",
    profileCalm: "Modo sobrio",
    textGroup: "Texto",
    viewGroup: "Colores y vista",
    comfortGroup: "Navegación y confort",
    fontSize: "Tamaño del texto",
    decrease: "Reducir el texto",
    increase: "Aumentar el texto",
    readable: "Fuente legible",
    spacing: "Espaciado entre letras",
    lineHeight: "Mayor interlineado",
    links: "Subrayar los enlaces",
    contrast: "Alto contraste",
    grayscale: "Escala de grises",
    saturate: "Saturación alta",
    hideImages: "Ocultar imágenes",
    bigCursor: "Cursor grande",
    focusHighlight: "Resaltar el foco",
    readingGuide: "Guía de lectura",
    readingMask: "Máscara de lectura",
    pauseMotion: "Detener animaciones",
    reset: "Restablecer",
    close: "Cerrar",
    active: "activos",
  },

  // ---- Per-route metadata ----
  meta: {
    home: {
      title: "vortx | Agencia de marketing y web en Luxemburgo",
      description:
        "vortx, agencia de marketing en Luxemburgo: sitios web que convierten, SEO y GEO, generación de leads y publicidad online. Auditoría gratuita, respuesta rápida.",
    },
    services: {
      title: "Servicios de marketing y web | vortx Luxemburgo",
      description:
        "Sitios web, SEO y GEO, generación de leads, publicidad, branding y automatización con IA. Una cadena completa de captación para las empresas luxemburguesas.",
    },
    about: {
      title: "La agencia vortx | Marketing y web en Luxemburgo",
      description:
        "Quién es vortx: una agencia de marketing y web luxemburguesa obsesionada con la conversión y el rendimiento medible. Descubra nuestro enfoque.",
    },
    approach: {
      title: "Nuestro método | vortx Luxemburgo",
      description:
        "Diagnóstico, diseño, revisión, lanzamiento: el método vortx para entregar sitios y campañas que dan resultados.",
    },
    work: {
      title: "Proyectos | vortx Luxemburgo",
      description:
        "Descubra los proyectos y resultados de vortx, agencia de marketing y web en Luxemburgo.",
    },
    contact: {
      title: "Contacto y auditoría gratuita | vortx Luxemburgo",
      description:
        "Reserve una llamada de descubrimiento gratuita con vortx. Auditoría personalizada sin demora, presupuesto sin compromiso. Agencia de marketing y web en Luxemburgo.",
    },
    legalMentions: {
      title: "Aviso legal | vortx Luxemburgo",
      description: "Aviso legal del sitio vortx, agencia de marketing y web en Luxemburgo.",
    },
    legalPrivacy: {
      title: "Política de privacidad | vortx Luxemburgo",
      description:
        "Cómo vortx recoge, utiliza y protege sus datos personales (RGPD).",
    },
    legalCookies: {
      title: "Política de cookies | vortx Luxemburgo",
      description: "Uso de las cookies y rastreadores en el sitio vortx.",
    },
    news: {
      title: "Novedades | Marketing, SEO y GEO — vortx Luxemburgo",
      description:
        "Análisis y consejos de vortx sobre el SEO, el GEO, la conversión y el web en Luxemburgo. Algo concreto para hacer crecer su empresa.",
    },
    glossary: {
      title: "Glosario de marketing y web | vortx Luxemburgo",
      description:
        "Todos los términos del marketing digital y del web explicados de forma sencilla: SEO, GEO, ROAS, embudo de conversión, CMS… con el contexto luxemburgués.",
    },
    faq: {
      title: "Preguntas frecuentes — Sitios web, SEO, leads y tarifas | vortx Luxemburgo",
      description:
        "Todas las respuestas sobre nuestros sitios web, el SEO y GEO, la generación de leads, la publicidad, la IA, las tarifas, los plazos y el RGPD. Agencia de marketing y web en Luxemburgo.",
    },
  },

  // ---- Standalone pages ----
  pages: {
    thanks: {
      title: "Gracias, su solicitud se ha enviado correctamente.",
      lead: "La estudiamos y le responderemos rápidamente con un primer análisis — sin compromiso.",
      cta: "Volver al inicio",
      metaTitle: "Gracias | vortx Luxemburgo",
    },
    notFound: {
      title: "Página no encontrada",
      lead: "La página que busca no existe o ha sido movida.",
      cta: "Volver al inicio",
    },
    legalUpdated: "Última actualización: por completar",
    legalTodo:
      "⚠️ Contenido pendiente de validación jurídica y de completar con la información legal real de la sociedad.",
  },

  // ---- Cookie consent (RGPD / ePrivacy) ----
  consent: {
    title: "Cookies y privacidad",
    message:
      "Utilizamos cookies necesarias para el funcionamiento del sitio y, con su consentimiento, cookies de medición de audiencia y de publicidad.",
    acceptAll: "Aceptar todo",
    rejectAll: "Rechazar todo",
    customize: "Personalizar",
    save: "Guardar mis elecciones",
    learnMore: "Saber más",
    manage: "Gestionar mis cookies",
    categories: {
      necessary: {
        title: "Necesarias",
        desc: "Imprescindibles para el funcionamiento del sitio (seguridad, preferencias, memorización de su consentimiento). Siempre activas.",
        always: "Siempre activas",
      },
      analytics: {
        title: "Medición de audiencia",
        desc: "Nos ayudan a comprender el uso del sitio para mejorarlo (estadísticas anonimizadas).",
      },
      marketing: {
        title: "Marketing",
        desc: "Permiten medir y personalizar nuestras campañas publicitarias.",
      },
    },
  },
} as const;
