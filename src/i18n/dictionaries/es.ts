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
