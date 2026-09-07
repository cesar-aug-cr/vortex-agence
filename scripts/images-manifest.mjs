/**
 * One entry per candidate spot on /fr/images-test-pour-voir. `id` is the file
 * name under public/images-test/. Sizes follow gpt-image-2's supported set
 * (1024x1024, 1536x1024, 1024x1536); the page crops with object-cover.
 */
export const MANIFEST = [
  // --- Priorité 1 -------------------------------------------------------
  {
    id: "hero-accueil",
    size: "1536x1024",
    quality: "high",
    prompt:
      "Wide cinematic view of Luxembourg City's Kirchberg business district skyline at blue hour, glass towers reflecting a faint lime and cyan glow, long-exposure light trails on the boulevard, dramatic clouds. The left half is dark and empty (space for a headline), the focal point sits on the right.",
  },
  {
    id: "services-sites-web",
    size: "1536x1024",
    quality: "high",
    prompt:
      "Close-up of a designer's desk with a large monitor showing a sleek dark-mode website layout made of abstract blocks and cards, lime green accent highlights on the interface, soft cyan rim light, keyboard slightly out of focus.",
  },
  {
    id: "services-seo-geo",
    size: "1536x1024",
    quality: "high",
    prompt:
      "Abstract 3D visualization of a search-results ranking graph and an AI neural network converging into one glowing node, luminous edges in lime and cyan over near-black, a small glass magnifying lens catching the light.",
  },
  {
    id: "services-lead-generation",
    size: "1536x1024",
    quality: "high",
    prompt:
      "A glowing funnel made of light particles: many faint streams enter from the top and narrow into one bright lime beam landing on a smartphone lying on a dark surface, cyan reflections, dark studio.",
  },
  {
    id: "services-publicite",
    size: "1536x1024",
    quality: "high",
    prompt:
      "A dark control room with floating translucent advertising dashboards showing abstract bar charts and target reticles, lime and cyan glow, a hand reaching to adjust a physical dial in the foreground.",
  },
  {
    id: "services-branding-design",
    size: "1536x1024",
    quality: "high",
    prompt:
      "A designer's workspace on black paper: colour swatches in lime and cyan, blank business cards and a blank letterhead mockup, a brass pen and a small ruler, soft directional studio lighting, top-down angle.",
  },
  {
    id: "services-automatisation-ia",
    size: "1536x1024",
    quality: "high",
    prompt:
      "Abstract 3D scene of interlocking glass gears and flowing luminous data ribbons in lime and cyan, a small precise robotic arm placing a glowing cube into a row of cubes, dark background.",
  },
  // --- News covers ------------------------------------------------------
  {
    id: "news-cout-site-web",
    size: "1536x1024",
    quality: "medium",
    prompt:
      "Editorial photo: a laptop showing a blank website wireframe beside a calculator, a few euro coins and an architect's ruler on a dark desk, warm side light with a lime accent lamp, everything else out of focus.",
  },
  {
    id: "news-geo-seo-ia",
    size: "1536x1024",
    quality: "medium",
    prompt:
      "Editorial illustration: a stylized AI chat interface made of abstract glowing speech bubbles (no readable text) pointing to a luminous map pin over a dark 3D relief map of Luxembourg, lime and cyan glow.",
  },
  {
    id: "news-rgpd-cookies",
    size: "1536x1024",
    quality: "medium",
    prompt:
      "Editorial photo: a stack of golden cookies next to a brushed-metal padlock and a laptop showing a blank consent banner mockup, dark wood desk, lime accent light, a ring of small stars softly out of focus in the background.",
  },
  // --- Piliers « Pourquoi vortx » ----------------------------------------
  {
    id: "pilier-strategie",
    size: "1024x1024",
    quality: "medium",
    prompt:
      "Macro photo of a single black chess knight on a dark glass board, a glowing lime strategy line drawn across the squares, cyan rim light, deep black background.",
  },
  {
    id: "pilier-conversion",
    size: "1024x1024",
    quality: "medium",
    prompt:
      "Macro of a dark glass analytics panel with one rising lime line chart and a few cyan dots, no text, reflections and shallow depth of field, black background.",
  },
  {
    id: "pilier-local",
    size: "1024x1024",
    quality: "medium",
    prompt:
      "Miniature 3D relief model of Luxembourg City's old town and its bridges with a glowing lime location pin standing on it, cyan back light, dark background, tilt-shift look.",
  },
  {
    id: "pilier-ia",
    size: "1024x1024",
    quality: "medium",
    prompt:
      "A small luminous crystal brain made of lime and cyan light filaments floating above a dark reflective surface, macro, soft bokeh, black background.",
  },
  // --- Pages ----------------------------------------------------------------
  {
    id: "agence-equipe",
    size: "1024x1536",
    quality: "high",
    prompt:
      "Candid over-the-shoulder photo of a small creative team working together around a laptop in a bright modern office loft in Luxembourg, large windows, natural light, faces not visible or turned away, one lime green accent object on the desk, documentary style, warm and confident mood.",
  },
  {
    id: "contact-bureau",
    size: "1024x1024",
    quality: "medium",
    prompt:
      "Warm photo of a dark wooden desk with a smartphone, an open notebook, a cup of coffee and a lime green pen, morning light through a window, Luxembourg old-town rooftops softly out of focus behind the glass.",
  },
  {
    id: "cta-final",
    size: "1536x1024",
    quality: "medium",
    prompt:
      "Very dark abstract background: two soft light beams, one lime and one cyan, crossing over a black stage with fine floating particles, cinematic haze, plenty of empty space in the centre for a white headline.",
  },
  {
    id: "merci-confirmation",
    size: "1536x1024",
    quality: "medium",
    prompt:
      "Cinematic dark scene: a paper plane made of lime light gliding toward a bright cyan horizon line, a trail of particles behind it, near-black background, feeling of relief and forward motion.",
  },
  // --- Volet 2 : les 22 autres emplacements (42 rendus) ----------------
  { id: "service-hero-sites-web", size: "1024x1024", quality: "high", prompt: "Square composition: a sleek dark-mode website shown on a floating glass monitor, lime accent interface blocks, cyan rim light, dark studio, slight low angle." },
  { id: "sub-google-ads", size: "1024x1024", quality: "medium", prompt: "Square: a glowing search-bar shape with one lime-highlighted result block above a dark cityscape at night, cyan glow, abstract." },
  { id: "sub-refonte-de-site", size: "1024x1024", quality: "medium", prompt: "Square: an old cracked stone tablet on the left morphing into a sleek glowing glass screen on the right, a lime light seam between them, dark background." },
  { id: "sub-chatbots-ia", size: "1024x1024", quality: "medium", prompt: "Square: a friendly minimalist robot head made of frosted glass with a lime glowing visor, a few chat bubbles floating around it, dark background." },
  { id: "sub-card-site-vitrine", size: "1536x1024", quality: "medium", prompt: "A glowing shop window at night displaying one elegant screen, lime signage glow, cyan reflections on wet pavement, cinematic." },
  { id: "logos-clients", size: "1536x1024", quality: "medium", prompt: "A dark presentation wall with nine simple abstract monochrome emblem shapes arranged in a 3 by 3 grid, light grey on near-black, minimal generic placeholder marks, no letters." },
  { id: "adn-fond", size: "1536x1024", quality: "medium", prompt: "A large luminous DNA double helix made of lime and cyan light strands floating diagonally across a near-black background, fine particles, cinematic depth." },
  { id: "leadgen-tunnel", size: "1024x1536", quality: "medium", prompt: "Vertical composition: a luminous funnel of light narrowing from a wide cloud of many faint particles at the top to a single bright lime droplet landing on a dark surface at the bottom, cyan haze." },
  { id: "outils-logos", size: "1536x1024", quality: "medium", prompt: "A dark tech desk flat-lay with generic app-icon tiles, plain rounded squares in lime, cyan, white and grey, no symbols, no letters, scattered in a loose grid, soft top light." },
  { id: "avatar-1", size: "1024x1024", quality: "low", prompt: "Minimalist stylized avatar illustration: geometric silhouette of a person with no facial features, lime on near-black, flat vector style." },
  { id: "avatar-2", size: "1024x1024", quality: "low", prompt: "Minimalist stylized avatar illustration: geometric silhouette of a person with no facial features, cyan on near-black, flat vector style." },
  { id: "avatar-3", size: "1024x1024", quality: "low", prompt: "Minimalist stylized avatar illustration: geometric silhouette of a person with no facial features, light grey on near-black, flat vector style." },
  { id: "feature-responsive", size: "1024x1024", quality: "medium", prompt: "Square: a laptop, a tablet and a phone standing in a row on a dark surface, each showing the same abstract lime layout blocks, cyan rim light." },
  { id: "feature-smart-forms", size: "1024x1024", quality: "medium", prompt: "Square: a floating glass form card with three empty input fields and a glowing lime submit button, a small checkmark light, dark background." },
  { id: "feature-rgpd", size: "1024x1024", quality: "medium", prompt: "Square: a brushed-metal shield with a glowing lime checkmark, a small padlock and a cookie beside it, dark background." },
  { id: "methode-1", size: "1024x1024", quality: "medium", prompt: "Square: a magnifying glass hovering over a dark glass dashboard of abstract glowing charts, lime highlight, diagnostic mood." },
  { id: "methode-2", size: "1024x1024", quality: "medium", prompt: "Square: a hand sketching wireframe blocks on a dark glass tablet with a lime-light stylus, cyan reflections." },
  { id: "methode-3", size: "1024x1024", quality: "medium", prompt: "Square: two overlapping translucent glass panels, one with a lime highlight, A/B comparison concept, dark background, no letters." },
  { id: "methode-4", size: "1024x1024", quality: "medium", prompt: "Square: a small chrome rocket made of light lifting off from a dark launchpad with lime exhaust and a cyan trail." },
  { id: "engagement-audit", size: "1024x1024", quality: "medium", prompt: "Square: a dark gift box with a lime ribbon opening to reveal glowing report sheets, no text, dark background." },
  { id: "engagement-code", size: "1024x1024", quality: "medium", prompt: "Square: a glass key on a dark surface lit in lime, unreadable lines of light like source code in the background, ownership concept." },
  { id: "engagement-multilingue", size: "1024x1024", quality: "medium", prompt: "Square: three glowing speech bubbles in lime, cyan and white floating over a dark relief map of western Europe, no text." },
  { id: "engagement-reporting", size: "1024x1024", quality: "medium", prompt: "Square: a dark tablet on a wooden desk showing a rising lime line chart and a few cyan bars, no text, warm side light." },
  { id: "pack-domaine", size: "1024x1024", quality: "medium", prompt: "Square: a globe made of lime wireframe lines with a small glowing location pin, dark background, cyan glow." },
  { id: "pack-ssl", size: "1024x1024", quality: "medium", prompt: "Square: a glass padlock with a lime glowing shackle on a dark surface, cyan reflection." },
  { id: "pack-support", size: "1024x1024", quality: "medium", prompt: "Square: a modern headset with a lime glowing ear cushion resting on a dark desk, soft cyan light." },
  { id: "page-404", size: "1536x1024", quality: "medium", prompt: "A dark cosmic scene: a glowing white event-horizon ring on the right swallowing a stream of luminous paper sheets, lime and cyan accretion glow, the left side dark and empty." },
  { id: "quiz-intro", size: "1024x1024", quality: "medium", prompt: "Square: a glowing brain made of lime circuit lines on a dark surface, playful, cyan highlights." },
  { id: "quiz-tier-1", size: "1024x1024", quality: "medium", prompt: "Square: a tiny glowing lime seedling sprouting from dark soil, macro, cyan back light." },
  { id: "quiz-tier-2", size: "1024x1024", quality: "medium", prompt: "Square: a brass compass with a lime glowing needle resting on a dark map, macro." },
  { id: "quiz-tier-3", size: "1024x1024", quality: "medium", prompt: "Square: a small chrome rocket lifting off with lime exhaust, dark background, cyan trail." },
  { id: "quiz-tier-4", size: "1024x1024", quality: "medium", prompt: "Square: a black glass trophy cup with a lime glowing rim on a dark podium." },
  { id: "quiz-tier-5", size: "1024x1024", quality: "medium", prompt: "Square: a minimalist crown made of lime and cyan light resting on a dark velvet cushion." },
  { id: "approche-1", size: "1536x1024", quality: "medium", prompt: "Over-the-shoulder view of hands reviewing a dark analytics dashboard on a laptop with lime highlights, notebook and coffee, modern office, faces not visible." },
  { id: "approche-2", size: "1536x1024", quality: "medium", prompt: "A dark desk with a tablet showing wireframe blocks, a lime stylus, blank sticky notes, natural window light." },
  { id: "approche-3", size: "1536x1024", quality: "medium", prompt: "Two people seen from behind pointing at a large screen showing two layout variants side by side, dark office, lime glow, faces not visible." },
  { id: "approche-4", size: "1536x1024", quality: "medium", prompt: "A laptop on a dark desk with a completed lime glowing progress bar, a small rocket toy beside it, celebratory soft light." },
  { id: "article-schema", size: "1536x1024", quality: "medium", prompt: "Editorial illustration: a clean isometric flowchart of glowing glass nodes connected by lime and cyan lines on a dark background, no text." },
  { id: "faq-bandeau", size: "1536x1024", quality: "medium", prompt: "Wide banner: several floating glass question-mark shapes glowing lime and cyan over a dark background, soft, minimal." },
  { id: "glossaire-bandeau", size: "1536x1024", quality: "medium", prompt: "Wide banner: an open book made of light with glowing lime and cyan abstract particles rising from its pages, dark background, no readable letters." },
  { id: "realisations-mur", size: "1536x1024", quality: "medium", prompt: "A dark gallery wall with nine framed glowing screens showing abstract website layouts without readable text, lime spotlights, slight perspective." },
  { id: "texture-ambiante", size: "1536x1024", quality: "low", prompt: "Abstract very dark background texture with soft out-of-focus lime and cyan light blobs and fine film grain, no subject." },
];
