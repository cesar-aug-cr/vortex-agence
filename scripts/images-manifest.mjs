/**
 * One entry per candidate spot on /fr/images-test-pour-voir. `id` is the file
 * name under public/images-test/. Sizes follow gpt-image-2's supported set
 * (1024x1024, 1536x1024, 1024x1536); the page crops with object-cover.
 * Optional per entry: `model` (default gpt-image-2) and `style` (replaces the
 * shared STYLE suffix in gen-images.mjs).
 */
/** Branding sub-service heroes (square, realistic studio photography). */
const STYLE_SUBHERO =
  "Hyper-realistic studio photograph, indistinguishable from a real photo: shot on a full-frame camera with a 50 mm macro-capable lens, low-key lighting with soft key light and deep natural shadows, very dark charcoal-black background, subtle lime green (#c8f02e) and teal rim-light accents only as reflections, true-to-life material textures (paper grain and fibres, ink, graphite, wood, stone, foil), crisp focus on the subject with shallow depth of field, square 1:1 composition with the subject centred and generous dark margins. No text, no readable letters or numbers, no real brand logos, no watermarks, no identifiable faces (only hands if people appear), no CGI or 3D-render look.";

// Shared by the "Notre méthode" banners of the service pages (one photo per page).
const STYLE_METHODE =
  "Hyper-realistic editorial photograph, shot on a full-frame camera with a 35 mm lens, soft natural daylight, true-to-life neutral colours with no colour grading or neon tints, realistic textures, shallow depth of field, wide 3:2 composition, calm and uncluttered so a headline can sit over it. No text, no letters, no numbers, no logos, no watermarks, screens must be blurred or show only abstract blocks, no identifiable faces (people seen from behind, from the side or only hands).";

// Shared by the per-page "Nos engagements" card photos (cards on the dark stage band, 4:3 crop).
const STYLE_ENGAGEMENT =
  "Hyper-realistic editorial photograph, indistinguishable from a real photo: full-frame camera, 35 mm lens, low-key natural lighting (soft window light from one side, deep natural shadows, darker surroundings), true-to-life colours with no neon tints, one small lime-green (#c8f02e) accent somewhere in the scene, realistic textures, shallow depth of field, 3:2 frame with the subject centred so it still reads when cropped to 4:3. No text, no letters, no numbers, no logos, no watermarks, screens blurred or showing only abstract shapes, no identifiable faces (people seen from behind, from the side or only hands).";

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
    // 01b — same spot, but in the palette of the city skyline now layered on
    // the real hero (now public/hero/vortx-luxembourg.webp): deep teal storm sky, glass
    // towers, lime/cyan light trails. Generated with the 2.5 model.
    id: "hero-accueil-ville",
    size: "1536x1024",
    quality: "high",
    model: "gpt-image-2.5-flare",
    prompt:
      "Wide cinematic view of Luxembourg City at blue hour seen from the Kirchberg plateau: the glass towers of Kirchberg on the right with warm yellow-lime lit windows, the old town fortifications and the Grund valley further back, under a dramatic deep teal-navy storm sky torn by clouds. Long-exposure traffic light trails in bright lime (#c8f02e) and cyan (#14e0c8) sweep along a curving boulevard lined with trees from the bottom-left toward the towers. A faint iridescent chromatic mist curls up from the left edge like a breaking wave and dissolves into darkness. Colour palette strictly deep teal, near-black navy, lime and cyan — no warm orange or red. The left third is dark and empty (space for a headline), the focal point sits on the right.",
    style:
      "Premium, cinematic, high-end marketing agency aesthetic. Photorealistic rendering, shallow depth of field, rich contrast. Absolutely no text, no letters, no numbers, no logos, no watermarks.",
  },
  {
    // 01c — second take, same palette, different vantage point: from the
    // Pétrusse valley looking up at the Pont Adolphe and the ramparts.
    // The shipped file is a 2.35:1 panorama: the first 1536x1024 render was
    // extended with /v1/images/edits (gpt-image-2.5-sunburst) so the scene the
    // client approved stayed intact. A `--force` rerun regenerates from scratch
    // at this size instead. Lossless PNG master: Downloads/vortx-luxembourg-pont-wide.png.
    id: "hero-accueil-ville-2",
    size: "2560x1088",
    quality: "high",
    model: "gpt-image-2.5-flare",
    prompt:
      "Wide cinematic low-angle view of Luxembourg City at blue hour from the bottom of the Pétrusse valley: the great stone arch of the Pont Adolphe spans the frame on the right, the old-town ramparts and the cathedral spires rise above it, and the glass towers of Kirchberg glow on the far horizon with warm yellow-lime lit windows. A dramatic deep teal-navy storm sky torn by clouds. A lamp-lit path and the small river below carry long-exposure light trails and reflections in bright lime (#c8f02e) and cyan (#14e0c8). A faint iridescent chromatic mist drifts in from the left edge and dissolves into darkness. Colour palette strictly deep teal, near-black navy, lime and cyan — no warm orange or red. The left third is dark and empty (space for a headline), the focal point sits on the right.",
    style:
      "Premium, cinematic, high-end marketing agency aesthetic. Photorealistic rendering, shallow depth of field, rich contrast. Absolutely no text, no letters, no numbers, no logos, no watermarks.",
  },
  {
    // 01d — the 01c panorama with a cloudless sky (easier to key out so the
    // black hole shows through). Shipped file = /v1/images/edits on the 01c
    // master with gpt-image-2.5-sunburst ("remove the clouds, change nothing
    // else"). Lossless master: Downloads/vortx-luxembourg-pont-wide-sans-nuages.png.
    id: "hero-accueil-ville-3",
    size: "2560x1088",
    quality: "high",
    model: "gpt-image-2.5-flare",
    prompt:
      "Wide cinematic 2.35:1 low-angle view of Luxembourg City at blue hour from the bottom of the Pétrusse valley: the great stone arch of the Pont Adolphe spans the frame on the right, the old-town ramparts and the cathedral spires rise above it, and the glass towers of Kirchberg glow on the far horizon with warm yellow-lime lit windows. The sky is completely clear and cloudless: a smooth deep teal-navy gradient, no stars, no haze. A lamp-lit path and the small river below carry long-exposure light trails and reflections in bright lime (#c8f02e) and cyan (#14e0c8). A faint iridescent chromatic mist drifts in from the left edge and dissolves into darkness. Colour palette strictly deep teal, near-black navy, lime and cyan — no warm orange or red. The left third is dark and empty (space for a headline), the focal point sits on the right.",
    style:
      "Premium, cinematic, high-end marketing agency aesthetic. Photorealistic rendering, shallow depth of field, rich contrast. Absolutely no text, no letters, no numbers, no logos, no watermarks.",
  },
  {
    // 01e — the 01d panorama with a flat pure-black (#000000) sky, for keying
    // or blend-mode compositing over the black hole. Shipped file =
    // /v1/images/edits on the 01d master with gpt-image-2.5-sunburst, then
    // every pixel <= 6/255 snapped to 0 so the sky is exactly #000000.
    // Lossless master: Downloads/vortx-luxembourg-pont-wide-ciel-noir.png.
    id: "hero-accueil-ville-4",
    size: "2560x1088",
    quality: "high",
    model: "gpt-image-2.5-flare",
    prompt:
      "Wide cinematic 2.35:1 low-angle view of Luxembourg City at night from the bottom of the Pétrusse valley: the great stone arch of the Pont Adolphe spans the frame on the right, the old-town ramparts and the cathedral spires rise above it, and the glass towers of Kirchberg glow on the far horizon with warm yellow-lime lit windows. The entire sky is a perfectly flat, solid, pure black (#000000) fill: no gradient, no stars, no haze, no glow. A lamp-lit path and the small river below carry long-exposure light trails and reflections in bright lime (#c8f02e) and cyan (#14e0c8). A faint iridescent chromatic mist drifts in from the left edge and dissolves into darkness. Colour palette strictly deep teal, near-black navy, lime and cyan — no warm orange or red. The left third is dark and empty (space for a headline), the focal point sits on the right.",
    style:
      "Premium, cinematic, high-end marketing agency aesthetic. Photorealistic rendering, shallow depth of field, rich contrast. Absolutely no text, no letters, no numbers, no logos, no watermarks.",
  },
  {
    // 01f — the 01e black-sky panorama with (a) the buildings at the far right
    // replaced by trees and (b) a lime (#c8f02e) rim traced along the whole
    // sky/skyline boundary (rooftops, trees, mist). Shipped file is
    // post-processed, not generated: the far-right strip (x 2195-2525,
    // y 300-460) was inpainted with /v1/images/edits + mask (sunburst) and
    // pasted back with a 20 px feather so the rest stays pixel-identical; the
    // rim is drawn programmatically (sky = exact-black region connected to the
    // top row, 3 px solid lime + 10 px glow). A `--force` rerun only yields a
    // plain generation of this prompt. Master:
    // Downloads/vortx-luxembourg-pont-wide-ciel-noir-liseret-lime.png.
    id: "hero-accueil-ville-5",
    size: "2560x1088",
    quality: "high",
    model: "gpt-image-2.5-flare",
    prompt:
      "Wide cinematic 2.35:1 low-angle view of Luxembourg City at night from the bottom of the Pétrusse valley: the great stone arch of the Pont Adolphe spans the frame on the right, the old-town ramparts and the cathedral spires rise above it, and a few glass towers of Kirchberg glow on the horizon with warm yellow-lime lit windows; the far right of the ridge is only dark wooded treetops. The entire sky is a perfectly flat, solid, pure black (#000000) fill, and a thin, crisp, glowing lime (#c8f02e) rim light outlines the whole skyline where the black sky meets rooftops, spires, treetops and mist. A lamp-lit path and the small river below carry long-exposure light trails and reflections in bright lime and cyan (#14e0c8). A faint iridescent chromatic mist drifts in from the left edge and dissolves into darkness. Colour palette strictly deep teal, near-black navy, lime and cyan — no warm orange or red. The left third is dark and empty (space for a headline), the focal point sits on the right.",
    style:
      "Premium, cinematic, high-end marketing agency aesthetic. Photorealistic rendering, shallow depth of field, rich contrast. Absolutely no text, no letters, no numbers, no logos, no watermarks.",
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
  // --- Service cards, second generation (gpt-image-2.5-flare) ---------------
  {
    id: "services-v2-sites-web",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Premium product-photography style 3D render, one big instantly recognisable hero object centred, clean composition, photoreal materials (glass, brushed metal, matte black), near-black studio background, lime green (#c8f02e) key light and cyan (#14e0c8) rim light, soft reflections on a dark glossy surface, shallow depth of field, 16:9. Absolutely no text, no letters, no numbers, no logos, no watermarks, no human faces.",
    prompt:
      "A modern laptop open on a dark desk showing a clean website: a hero banner, three cards and one glowing lime call-to-action button, all as abstract shapes; a smartphone leans against it showing the same site adapted to mobile; a small lime cursor arrow hovers over the button.",
  },
  {
    id: "services-v2-seo-geo",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Premium product-photography style 3D render, one big instantly recognisable hero object centred, clean composition, photoreal materials (glass, brushed metal, matte black), near-black studio background, lime green (#c8f02e) key light and cyan (#14e0c8) rim light, soft reflections on a dark glossy surface, shallow depth of field, 16:9. Absolutely no text, no letters, no numbers, no logos, no watermarks, no human faces.",
    prompt:
      "A large glass magnifying glass hovers over a laptop screen that shows a search results list of abstract bars; the first result glows lime and stands out; next to the screen floats a translucent AI chat bubble with a lime quotation mark inside, linked to the first result by a thin cyan light line.",
  },
  {
    id: "services-v2-lead-generation",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Premium product-photography style 3D render, one big instantly recognisable hero object centred, clean composition, photoreal materials (glass, brushed metal, matte black), near-black studio background, lime green (#c8f02e) key light and cyan (#14e0c8) rim light, soft reflections on a dark glossy surface, shallow depth of field, 16:9. Absolutely no text, no letters, no numbers, no logos, no watermarks, no human faces.",
    prompt:
      "A smartphone standing upright on a dark desk, its screen lit up, with a stream of glowing lime notification cards shaped like envelopes and phone handsets flying in from the side and stacking neatly in an inbox tray; a small glass calendar with lime-lit slots sits beside it.",
  },
  {
    id: "services-v2-publicite",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Premium product-photography style 3D render, one big instantly recognisable hero object centred, clean composition, photoreal materials (glass, brushed metal, matte black), near-black studio background, lime green (#c8f02e) key light and cyan (#14e0c8) rim light, soft reflections on a dark glossy surface, shallow depth of field, 16:9. Absolutely no text, no letters, no numbers, no logos, no watermarks, no human faces.",
    prompt:
      "A sleek matte-black megaphone made of glass and metal, projecting a wide lime light beam that hits a classic archery target standing upright on the right; a cyan arrow sits in the exact bullseye; dark stage, beam visible in soft haze.",
  },
  {
    id: "services-v2-branding-design",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Premium product-photography style 3D render, one big instantly recognisable hero object centred, clean composition, photoreal materials (glass, brushed metal, matte black), near-black studio background, lime green (#c8f02e) key light and cyan (#14e0c8) rim light, soft reflections on a dark glossy surface, shallow depth of field, 16:9. Absolutely no text, no letters, no numbers, no logos, no watermarks, no human faces.",
    prompt:
      "A heavy brass-and-black hand stamp lifting off a cream business card, leaving a crisp embossed abstract emblem glowing lime; around it a fan of colour swatches in lime, cyan and charcoal and a fine black pen; top-down luxury still life on dark textured paper.",
  },
  {
    id: "services-v2-automatisation-ia",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Premium product-photography style 3D render, one big instantly recognisable hero object centred, clean composition, photoreal materials (glass, brushed metal, matte black), near-black studio background, lime green (#c8f02e) key light and cyan (#14e0c8) rim light, soft reflections on a dark glossy surface, shallow depth of field, 16:9. Absolutely no text, no letters, no numbers, no logos, no watermarks, no human faces.",
    prompt:
      "A friendly compact white-and-black desk robot with a cyan light-ring face, one arm sorting glowing lime document cards from a messy pile into three neat trays; small glass gears float above it turning in sync; clean dark desk, soft studio light.",
  },
  // --- Approche: step 4 remake + the four working principles (gpt-image-2.5-flare) ---
  {
    id: "approche-4-v2",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Premium product-photography style 3D render, one big instantly recognisable hero object centred, clean composition, photoreal materials (glass, brushed metal, matte black), near-black studio background, lime green (#c8f02e) key light and cyan (#14e0c8) rim light, soft reflections on a dark glossy surface, shallow depth of field, 16:9. Absolutely no text, no letters, no numbers, no logos, no watermarks, no human faces.",
    prompt:
      "A sleek laptop on a dark desk showing a clean analytics dashboard made of abstract shapes with one lime line chart rising steeply; a small glass-and-metal rocket lifts off from beside the laptop leaving a soft lime exhaust trail; a tiny glass bell-shaped notification with a lime dot floats near the screen.",
  },
  {
    id: "approche-principe-1",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Premium product-photography style 3D render, one big instantly recognisable hero object centred, clean composition, photoreal materials (glass, brushed metal, matte black), near-black studio background, lime green (#c8f02e) key light and cyan (#14e0c8) rim light, soft reflections on a dark glossy surface, shallow depth of field, 16:9. Absolutely no text, no letters, no numbers, no logos, no watermarks, no human faces.",
    prompt:
      "A transparent glass cube on a dark desk with everything visible inside: small glowing gears, a tiny bar chart and a lime checklist card, all clearly seen through the glass walls; a lime light inside the cube; a cyan rim light on the edges.",
  },
  {
    id: "approche-principe-2",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Premium product-photography style 3D render, one big instantly recognisable hero object centred, clean composition, photoreal materials (glass, brushed metal, matte black), near-black studio background, lime green (#c8f02e) key light and cyan (#14e0c8) rim light, soft reflections on a dark glossy surface, shallow depth of field, 16:9. Absolutely no text, no letters, no numbers, no logos, no watermarks, no human faces.",
    prompt:
      "A glass bar chart with four rising bars on a dark desk, the tallest bar glowing lime and topped with a small lime flag; a cyan arrow curves upward along the bars; clean and simple.",
  },
  {
    id: "approche-principe-3",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Premium product-photography style 3D render, one big instantly recognisable hero object centred, clean composition, photoreal materials (glass, brushed metal, matte black), near-black studio background, lime green (#c8f02e) key light and cyan (#14e0c8) rim light, soft reflections on a dark glossy surface, shallow depth of field, 16:9. Absolutely no text, no letters, no numbers, no logos, no watermarks, no human faces.",
    prompt:
      "One premium matte-black headset with a lime glowing ring lying on a dark desk; dozens of thin cyan light threads from all directions converge into a single lime line that plugs into the headset; one clear point of contact.",
  },
  {
    id: "approche-principe-4",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Premium product-photography style 3D render, one big instantly recognisable hero object centred, clean composition, photoreal materials (glass, brushed metal, matte black), near-black studio background, lime green (#c8f02e) key light and cyan (#14e0c8) rim light, soft reflections on a dark glossy surface, shallow depth of field, 16:9. Absolutely no text, no letters, no numbers, no logos, no watermarks, no human faces.",
    prompt:
      "Three thick glass arrows forming a continuous circular loop, glowing lime and cyan, hovering above a dark desk; at the centre of the loop a small sleek smartphone prototype; the loop suggests build, measure, adjust; motion blur on the arrows.",
  },
  // --- Article cover photos (realistic, natural colours; gpt-image-2.5-flare) ---
  {
    id: "news-ux-ui-design-site-qui-convertit-bonnes-pratiques",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Hyper-realistic editorial photograph, shot on a full-frame camera with a 35 mm lens, soft natural daylight, true-to-life neutral colours with no colour grading or neon tints, realistic skin, fabric, wood and glass textures, shallow depth of field, modern Luxembourg office or workshop setting, 3:2 composition with clean space on the left for text. No text, no letters, no numbers, no logos, no watermarks, screens must be blurred or show only abstract blocks, no identifiable faces (people seen from behind, from the side or only hands).",
    prompt:
      "A web designer's desk by a large window: a laptop showing a blurred website layout, printed wireframe sheets with pencil annotations, a few sticky notes, a ceramic coffee cup; hands of the designer pointing at the wireframe.",
  },
  {
    id: "news-geo-seo-luxembourg-etre-cite-par-les-ia",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Hyper-realistic editorial photograph, shot on a full-frame camera with a 35 mm lens, soft natural daylight, true-to-life neutral colours with no colour grading or neon tints, realistic skin, fabric, wood and glass textures, shallow depth of field, modern Luxembourg office or workshop setting, 3:2 composition with clean space on the left for text. No text, no letters, no numbers, no logos, no watermarks, screens must be blurred or show only abstract blocks, no identifiable faces (people seen from behind, from the side or only hands).",
    prompt:
      "Close-up over the shoulder of a person typing a question into a laptop at a café table; next to the laptop a smartphone showing a blurred chat conversation; morning light, croissant and espresso on the table, old-town street of Luxembourg softly blurred through the window.",
  },
  {
    id: "news-google-ads-ou-seo-ou-investir-budget-marketing",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Hyper-realistic editorial photograph, shot on a full-frame camera with a 35 mm lens, soft natural daylight, true-to-life neutral colours with no colour grading or neon tints, realistic skin, fabric, wood and glass textures, shallow depth of field, modern Luxembourg office or workshop setting, 3:2 composition with clean space on the left for text. No text, no letters, no numbers, no logos, no watermarks, screens must be blurred or show only abstract blocks, no identifiable faces (people seen from behind, from the side or only hands).",
    prompt:
      "Top-down view of a wooden meeting table: a tablet with a blurred bar chart, printed sheets with a budget table, a calculator, a pen, two coffee cups and two people's hands comparing two documents; bright office daylight.",
  },
  {
    id: "news-tunnel-de-conversion-transformer-visiteurs-en-clients",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Hyper-realistic editorial photograph, shot on a full-frame camera with a 35 mm lens, soft natural daylight, true-to-life neutral colours with no colour grading or neon tints, realistic skin, fabric, wood and glass textures, shallow depth of field, modern Luxembourg office or workshop setting, 3:2 composition with clean space on the left for text. No text, no letters, no numbers, no logos, no watermarks, screens must be blurred or show only abstract blocks, no identifiable faces (people seen from behind, from the side or only hands).",
    prompt:
      "A craftsman in a bright workshop seen from the side, reading a new customer request on a tablet while leaning on his workbench, tools and wood shavings in the background, warm natural light from a skylight.",
  },
  {
    id: "news-combien-coute-un-site-web-luxembourg-2026",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Hyper-realistic editorial photograph, shot on a full-frame camera with a 35 mm lens, soft natural daylight, true-to-life neutral colours with no colour grading or neon tints, realistic skin, fabric, wood and glass textures, shallow depth of field, modern Luxembourg office or workshop setting, 3:2 composition with clean space on the left for text. No text, no letters, no numbers, no logos, no watermarks, screens must be blurred or show only abstract blocks, no identifiable faces (people seen from behind, from the side or only hands).",
    prompt:
      "Two people seen from behind at a glass meeting table reviewing a printed quote and a laptop with a blurred website mock-up, a calculator and a notebook beside them, modern office with large windows and daylight.",
  },
  {
    id: "news-quest-ce-quun-bon-logo-identite-qui-dure",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Hyper-realistic editorial photograph, shot on a full-frame camera with a 35 mm lens, soft natural daylight, true-to-life neutral colours with no colour grading or neon tints, realistic skin, fabric, wood and glass textures, shallow depth of field, modern Luxembourg office or workshop setting, 3:2 composition with clean space on the left for text. No text, no letters, no numbers, no logos, no watermarks, screens must be blurred or show only abstract blocks, no identifiable faces (people seen from behind, from the side or only hands).",
    prompt:
      "A brand designer's desk from above: paper sheets with hand-drawn abstract logo sketches in black marker, a fan of colour swatches, markers, a ruler and a cup of tea, a designer's hand holding a pencil; soft daylight from the side.",
  },
  {
    id: "news-rgpd-cookies-site-web-luxembourg",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Hyper-realistic editorial photograph, shot on a full-frame camera with a 35 mm lens, soft natural daylight, true-to-life neutral colours with no colour grading or neon tints, realistic skin, fabric, wood and glass textures, shallow depth of field, modern Luxembourg office or workshop setting, 3:2 composition with clean space on the left for text. No text, no letters, no numbers, no logos, no watermarks, screens must be blurred or show only abstract blocks, no identifiable faces (people seen from behind, from the side or only hands).",
    prompt:
      "A tidy office desk: an open laptop with a blurred consent pop-up on the screen, a small brass padlock resting beside the keyboard, a printed document and reading glasses, a plant in the background, cool daylight.",
  },
  {
    id: "news-5-taches-pme-confier-a-l-ia",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Hyper-realistic editorial photograph, shot on a full-frame camera with a 35 mm lens, soft natural daylight, true-to-life neutral colours with no colour grading or neon tints, realistic skin, fabric, wood and glass textures, shallow depth of field, modern Luxembourg office or workshop setting, 3:2 composition with clean space on the left for text. No text, no letters, no numbers, no logos, no watermarks, screens must be blurred or show only abstract blocks, no identifiable faces (people seen from behind, from the side or only hands).",
    prompt:
      "A small-business office desk mid-morning: a person's hands feeding a stack of paper invoices into a desktop scanner next to a laptop, an inbox tray overflowing with documents, a phone ringing; honest, natural light.",
  },
  {
    id: "news-ia-pme-luxembourg-par-ou-commencer",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Hyper-realistic editorial photograph, shot on a full-frame camera with a 35 mm lens, soft natural daylight, true-to-life neutral colours with no colour grading or neon tints, realistic skin, fabric, wood and glass textures, shallow depth of field, modern Luxembourg office or workshop setting, 3:2 composition with clean space on the left for text. No text, no letters, no numbers, no logos, no watermarks, screens must be blurred or show only abstract blocks, no identifiable faces (people seen from behind, from the side or only hands).",
    prompt:
      "A small team of three people seen from behind, standing around a laptop in a modern Luxembourg office, a whiteboard with blurred boxes and arrows behind them, large windows with daylight and the city softly visible outside.",
  },
  // --- CTA banner photo, light-theme variant (quiz section on the white site) ---
  {
    id: "cta-final-clair",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style:
      "Premium, airy, high-end marketing agency aesthetic on a bright white studio background. Photorealistic light rendering, soft gradients, luminous and clean, no dark areas, no black. Absolutely no text, no letters, no numbers, no logos, no watermarks.",
    prompt:
      "Very bright off-white abstract background: two soft light beams, one lime green (#c8f02e) and one cyan (#14e0c8), crossing diagonally over a white stage with fine floating particles and gentle haze, plenty of empty space in the centre for a dark headline.",
  },
  // --- Agence page: six small story photos (realistic, natural colours) ---
  {
    id: "agence-histoire-1",
    model: "gpt-image-2.5-flare",
    size: "1024x1024",
    quality: "high",
    style: "Hyper-realistic editorial photograph, shot on a full-frame camera with a 35 mm lens, soft natural daylight, true-to-life neutral colours with no colour grading or neon tints, realistic textures, shallow depth of field, modern Luxembourg office or street setting, square composition with one clear subject. No text, no letters, no numbers, no logos, no watermarks, screens must be blurred or show only abstract blocks, no identifiable faces (people seen from behind, from the side or only hands).",
    prompt:
      "A glossy printed brochure lying closed on a wooden desk next to an open laptop whose screen shows a blurred dashboard with a rising chart; the contrast between paper and screen is the subject; morning light from a window.",
  },
  {
    id: "agence-histoire-2",
    model: "gpt-image-2.5-flare",
    size: "1024x1024",
    quality: "high",
    style: "Hyper-realistic editorial photograph, shot on a full-frame camera with a 35 mm lens, soft natural daylight, true-to-life neutral colours with no colour grading or neon tints, realistic textures, shallow depth of field, modern Luxembourg office or street setting, square composition with one clear subject. No text, no letters, no numbers, no logos, no watermarks, screens must be blurred or show only abstract blocks, no identifiable faces (people seen from behind, from the side or only hands).",
    prompt:
      "Two colleagues seen from behind at a shared desk: one sketches a sales funnel on a small whiteboard, the other writes code on a laptop with blurred lines; a decade of notebooks stacked at the side; warm office daylight.",
  },
  {
    id: "agence-histoire-3",
    model: "gpt-image-2.5-flare",
    size: "1024x1024",
    quality: "high",
    style: "Hyper-realistic editorial photograph, shot on a full-frame camera with a 35 mm lens, soft natural daylight, true-to-life neutral colours with no colour grading or neon tints, realistic textures, shallow depth of field, modern Luxembourg office or street setting, square composition with one clear subject. No text, no letters, no numbers, no logos, no watermarks, screens must be blurred or show only abstract blocks, no identifiable faces (people seen from behind, from the side or only hands).",
    prompt:
      "A craftsman in a bright workshop, seen from the side, reading a new customer request on a smartphone, work gloves and tools on the bench, a van blurred in the background; honest natural light.",
  },
  {
    id: "agence-histoire-4",
    model: "gpt-image-2.5-flare",
    size: "1024x1024",
    quality: "high",
    style: "Hyper-realistic editorial photograph, shot on a full-frame camera with a 35 mm lens, soft natural daylight, true-to-life neutral colours with no colour grading or neon tints, realistic textures, shallow depth of field, modern Luxembourg office or street setting, square composition with one clear subject. No text, no letters, no numbers, no logos, no watermarks, screens must be blurred or show only abstract blocks, no identifiable faces (people seen from behind, from the side or only hands).",
    prompt:
      "Close-up of a handover on a wooden table: a set of keys on a small ring placed next to a laptop and a signed folder, a client's hands receiving them; clean, bright, trustworthy.",
  },
  {
    id: "agence-histoire-5",
    model: "gpt-image-2.5-flare",
    size: "1024x1024",
    quality: "high",
    style: "Hyper-realistic editorial photograph, shot on a full-frame camera with a 35 mm lens, soft natural daylight, true-to-life neutral colours with no colour grading or neon tints, realistic textures, shallow depth of field, modern Luxembourg office or street setting, square composition with one clear subject. No text, no letters, no numbers, no logos, no watermarks, screens must be blurred or show only abstract blocks, no identifiable faces (people seen from behind, from the side or only hands).",
    prompt:
      "A sunny street in Luxembourg old town with pastel facades and a few passers-by seen from behind, a tram or bus blurred at the far end, flags on a balcony with no readable text; wide daylight.",
  },
  {
    id: "agence-histoire-6",
    model: "gpt-image-2.5-flare",
    size: "1024x1024",
    quality: "high",
    style: "Hyper-realistic editorial photograph, shot on a full-frame camera with a 35 mm lens, soft natural daylight, true-to-life neutral colours with no colour grading or neon tints, realistic textures, shallow depth of field, modern Luxembourg office or street setting, square composition with one clear subject. No text, no letters, no numbers, no logos, no watermarks, screens must be blurred or show only abstract blocks, no identifiable faces (people seen from behind, from the side or only hands).",
    prompt:
      "A person seen from behind typing a question into a laptop showing a blurred AI chat interface, a second monitor with blurred search results beside it, a notebook and coffee; bright modern desk.",
  },
  // --- /services index hero (realistic, natural colours) ---
  {
    id: "services-hero",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Hyper-realistic editorial photograph, shot on a full-frame camera with a 35 mm lens, soft natural daylight, true-to-life neutral colours with no colour grading or neon tints, realistic textures, shallow depth of field, wide 3:2 composition with clean space on the left third for a headline. No text, no letters, no numbers, no logos, no watermarks, screens must be blurred or show only abstract blocks, no identifiable faces (people seen from behind, from the side or only hands).",
    prompt:
      "A bright modern agency workspace in Luxembourg seen from a slight height: a long wooden table with three people seen from behind and from the side working together — one on a laptop with a blurred website layout, one annotating printed wireframes, one pointing at a wall-mounted screen showing a blurred dashboard with a rising chart; plants, notebooks, coffee cups, large windows with the city softly visible outside; natural morning light.",
  },
  // --- Home "Pourquoi vortx" section background (realistic, natural colours) ---
  {
    id: "why-fond",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Hyper-realistic editorial photograph, shot on a full-frame camera with a 35 mm lens, soft natural daylight, true-to-life neutral colours with no colour grading or neon tints, realistic textures, shallow depth of field, wide 3:2 composition, calm and uncluttered so text can sit on top. No text, no letters, no numbers, no logos, no watermarks, screens must be blurred, no identifiable faces (people seen from behind, from the side or only hands).",
    prompt:
      "Luxembourg city at golden hour seen from the Kirchberg plateau: the old town on its rocky promontory, the Pont Adolphe and the Pétrusse valley with autumn trees, warm low sunlight, a few people walking on a terrace in the foreground seen from behind; wide, serene, slightly hazy.",
  },
  // --- Portfolio coverflow: nine ultra-realistic mockups (generic projects) ---
  {
    id: "mockup-site-vitrine-garage",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Ultra-realistic product photograph of a design deliverable, shot on a full-frame camera with a 50 mm lens, soft natural studio daylight, true-to-life neutral colours, realistic materials and reflections, shallow depth of field, 3:2 composition. Screens show a clean, modern interface made of abstract blocks, blurred lines and real-looking photos, with one accent colour. Absolutely no readable text, no letters, no numbers, no real brand logos, no watermarks, no faces.",
    prompt:
      "A laptop and a smartphone on a dark wooden workshop bench showing the same automotive garage website: a hero photo of a car lift, service cards, a bright call-to-action button; a wrench and keys beside the devices.",
  },
  {
    id: "mockup-boutique-mode",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Ultra-realistic product photograph of a design deliverable, shot on a full-frame camera with a 50 mm lens, soft natural studio daylight, true-to-life neutral colours, realistic materials and reflections, shallow depth of field, 3:2 composition. Screens show a clean, modern interface made of abstract blocks, blurred lines and real-looking photos, with one accent colour. Absolutely no readable text, no letters, no numbers, no real brand logos, no watermarks, no faces.",
    prompt:
      "A tablet propped on a marble counter showing a fashion e-commerce site: large product photos of clothing, a product grid, a cart button; folded garments and a linen bag next to it.",
  },
  {
    id: "mockup-logo-menuiserie",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Ultra-realistic product photograph of a design deliverable, shot on a full-frame camera with a 50 mm lens, soft natural studio daylight, true-to-life neutral colours, realistic materials and reflections, shallow depth of field, 3:2 composition. Screens show a clean, modern interface made of abstract blocks, blurred lines and real-looking photos, with one accent colour. Absolutely no readable text, no letters, no numbers, no real brand logos, no watermarks, no faces.",
    prompt:
      "Business cards and a branded wooden sign on a carpenter's workbench, both carrying the same abstract emblem made of two interlocking planks, embossed and laser-engraved; sawdust and a chisel nearby.",
  },
  {
    id: "mockup-landing-immobilier",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Ultra-realistic product photograph of a design deliverable, shot on a full-frame camera with a 50 mm lens, soft natural studio daylight, true-to-life neutral colours, realistic materials and reflections, shallow depth of field, 3:2 composition. Screens show a clean, modern interface made of abstract blocks, blurred lines and real-looking photos, with one accent colour. Absolutely no readable text, no letters, no numbers, no real brand logos, no watermarks, no faces.",
    prompt:
      "A smartphone held in a hand in front of a modern apartment building, the screen showing a real-estate landing page: a hero photo of a flat, a short contact form, a primary button.",
  },
  {
    id: "mockup-identite-cafe",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Ultra-realistic product photograph of a design deliverable, shot on a full-frame camera with a 50 mm lens, soft natural studio daylight, true-to-life neutral colours, realistic materials and reflections, shallow depth of field, 3:2 composition. Screens show a clean, modern interface made of abstract blocks, blurred lines and real-looking photos, with one accent colour. Absolutely no readable text, no letters, no numbers, no real brand logos, no watermarks, no faces.",
    prompt:
      "A café brand identity flat lay on a light table: paper coffee cups, a kraft bag, a folded menu and coasters all carrying the same abstract leaf-and-cup emblem in a warm green; coffee beans scattered.",
  },
  {
    id: "mockup-application-saas",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Ultra-realistic product photograph of a design deliverable, shot on a full-frame camera with a 50 mm lens, soft natural studio daylight, true-to-life neutral colours, realistic materials and reflections, shallow depth of field, 3:2 composition. Screens show a clean, modern interface made of abstract blocks, blurred lines and real-looking photos, with one accent colour. Absolutely no readable text, no letters, no numbers, no real brand logos, no watermarks, no faces.",
    prompt:
      "A large desktop monitor in a bright office showing a SaaS dashboard: sidebar, cards with charts and a rising line graph, a table; a keyboard, a plant and a mug in the foreground.",
  },
  {
    id: "mockup-site-cabinet",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Ultra-realistic product photograph of a design deliverable, shot on a full-frame camera with a 50 mm lens, soft natural studio daylight, true-to-life neutral colours, realistic materials and reflections, shallow depth of field, 3:2 composition. Screens show a clean, modern interface made of abstract blocks, blurred lines and real-looking photos, with one accent colour. Absolutely no readable text, no letters, no numbers, no real brand logos, no watermarks, no faces.",
    prompt:
      "A laptop on a glass meeting table showing a law-firm website in a sober navy and white design: a portrait-style hero photo, three practice-area cards, a language switcher area; a fountain pen and a leather folder beside it.",
  },
  {
    id: "mockup-charte-graphique",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Ultra-realistic product photograph of a design deliverable, shot on a full-frame camera with a 50 mm lens, soft natural studio daylight, true-to-life neutral colours, realistic materials and reflections, shallow depth of field, 3:2 composition. Screens show a clean, modern interface made of abstract blocks, blurred lines and real-looking photos, with one accent colour. Absolutely no readable text, no letters, no numbers, no real brand logos, no watermarks, no faces.",
    prompt:
      "An open brand guidelines book on a designer's desk showing colour swatches, a typography scale and a logo construction grid, next to printed stationery using the same abstract emblem; soft window light.",
  },
  {
    id: "mockup-campagne-horlogerie",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Ultra-realistic product photograph of a design deliverable, shot on a full-frame camera with a 50 mm lens, soft natural studio daylight, true-to-life neutral colours, realistic materials and reflections, shallow depth of field, 3:2 composition. Screens show a clean, modern interface made of abstract blocks, blurred lines and real-looking photos, with one accent colour. Absolutely no readable text, no letters, no numbers, no real brand logos, no watermarks, no faces.",
    prompt:
      "Three smartphones standing in a row on a black velvet surface, each showing a social media ad for a luxury watch: close-up watch photos, a small price tag block, a button; dramatic but natural lighting.",
  },
  // --- Portfolio coverflow v2: seven mockups with real readable copy ---
  {
    id: "mockup2-site-vitrine-garage",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Ultra-realistic product photograph, shot on a full-frame camera with a 50 mm lens, soft natural daylight, true-to-life neutral colours, physically accurate materials, reflections and screen glare, shallow depth of field, 3:2 composition. The interface or print piece is a finished, professional design with REAL readable French text: short headlines, menu labels, button labels and prices rendered crisply and correctly spelled. No lorem ipsum, no gibberish, no placeholder lines, no real brand logos, no watermarks, no faces.",
    prompt:
      "A laptop and a smartphone on a dark wooden workshop bench showing the same car garage website: hero photo of a car on a lift with the headline \"Votre garage de confiance\", menu \"Services · Devis · Contact\", three service cards \"Entretien\", \"Pneus\", \"Carrosserie\", a green button \"Prendre rendez-vous\"; a wrench and car keys beside the devices.",
  },
  {
    id: "mockup2-logo-menuiserie",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Ultra-realistic product photograph, shot on a full-frame camera with a 50 mm lens, soft natural daylight, true-to-life neutral colours, physically accurate materials, reflections and screen glare, shallow depth of field, 3:2 composition. The interface or print piece is a finished, professional design with REAL readable French text: short headlines, menu labels, button labels and prices rendered crisply and correctly spelled. No lorem ipsum, no gibberish, no placeholder lines, no real brand logos, no watermarks, no faces.",
    prompt:
      "Business cards and a wooden sign on a carpenter's workbench carrying the same logo: an abstract emblem of two interlocking planks above the name \"Atelier Bois\" with the line \"Menuiserie sur mesure\" in a clean serif, laser-engraved in the wood and embossed on the cards; sawdust and a chisel nearby.",
  },
  {
    id: "mockup2-landing-immobilier",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Ultra-realistic product photograph, shot on a full-frame camera with a 50 mm lens, soft natural daylight, true-to-life neutral colours, physically accurate materials, reflections and screen glare, shallow depth of field, 3:2 composition. The interface or print piece is a finished, professional design with REAL readable French text: short headlines, menu labels, button labels and prices rendered crisply and correctly spelled. No lorem ipsum, no gibberish, no placeholder lines, no real brand logos, no watermarks, no faces.",
    prompt:
      "A smartphone held in a hand in front of a modern apartment building, the screen showing a real-estate landing page: photo of a bright flat, headline \"Votre appartement à Luxembourg\", a short form with fields \"Nom\", \"E-mail\", \"Téléphone\" and a blue button \"Recevoir les biens\".",
  },
  {
    id: "mockup2-identite-cafe",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Ultra-realistic product photograph, shot on a full-frame camera with a 50 mm lens, soft natural daylight, true-to-life neutral colours, physically accurate materials, reflections and screen glare, shallow depth of field, 3:2 composition. The interface or print piece is a finished, professional design with REAL readable French text: short headlines, menu labels, button labels and prices rendered crisply and correctly spelled. No lorem ipsum, no gibberish, no placeholder lines, no real brand logos, no watermarks, no faces.",
    prompt:
      "A café brand identity flat lay on a light table: paper coffee cups, a kraft bag and a folded menu all carrying a green leaf-and-cup emblem with the name \"Café Verdi\"; the menu lists \"Espresso 2,50 €\", \"Cappuccino 3,80 €\", \"Croissant 2,20 €\" in neat typography; coffee beans scattered.",
  },
  {
    id: "mockup2-site-cabinet",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Ultra-realistic product photograph, shot on a full-frame camera with a 50 mm lens, soft natural daylight, true-to-life neutral colours, physically accurate materials, reflections and screen glare, shallow depth of field, 3:2 composition. The interface or print piece is a finished, professional design with REAL readable French text: short headlines, menu labels, button labels and prices rendered crisply and correctly spelled. No lorem ipsum, no gibberish, no placeholder lines, no real brand logos, no watermarks, no faces.",
    prompt:
      "A laptop on a glass meeting table showing a law-firm website in navy and white: headline \"Conseil juridique à Luxembourg\", menu \"Cabinet · Expertises · Contact\", three cards \"Droit des sociétés\", \"Droit du travail\", \"Immobilier\", a small language switcher \"FR · DE · EN\"; a fountain pen and a leather folder beside it.",
  },
  {
    id: "mockup2-charte-graphique",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Ultra-realistic product photograph, shot on a full-frame camera with a 50 mm lens, soft natural daylight, true-to-life neutral colours, physically accurate materials, reflections and screen glare, shallow depth of field, 3:2 composition. The interface or print piece is a finished, professional design with REAL readable French text: short headlines, menu labels, button labels and prices rendered crisply and correctly spelled. No lorem ipsum, no gibberish, no placeholder lines, no real brand logos, no watermarks, no faces.",
    prompt:
      "An open brand guidelines book on a designer's desk: the left page shows a logo construction grid and the title \"Charte graphique\", the right page shows colour swatches labelled \"Bleu nuit\", \"Sable\", \"Blanc\" with hex codes and a typography sample reading \"Aa Bb Cc\"; printed stationery with the same emblem beside it; soft window light.",
  },
  {
    id: "mockup2-campagne-solaire",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: "Ultra-realistic product photograph, shot on a full-frame camera with a 50 mm lens, soft natural daylight, true-to-life neutral colours, physically accurate materials, reflections and screen glare, shallow depth of field, 3:2 composition. The interface or print piece is a finished, professional design with REAL readable French text: short headlines, menu labels, button labels and prices rendered crisply and correctly spelled. No lorem ipsum, no gibberish, no placeholder lines, no real brand logos, no watermarks, no faces.",
    prompt:
      "Three smartphones standing in a row on a light concrete surface, each showing a social media ad for a solar panel installer: photos of panels on a house roof, headlines \"Réduisez votre facture\", \"Panneaux solaires à Luxembourg\", \"Devis gratuit\", a green button \"Demander un devis\"; natural lighting.",
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
  // --- Service pages "Notre méthode" banner background (realistic, natural colours) ---
  {
    id: "methode-fond",
    model: "gpt-image-2.5-flare",
    size: "1536x1024",
    quality: "high",
    style: STYLE_METHODE,
    prompt:
      "A project kick-off workshop in a bright modern Luxembourg agency meeting room seen from the side: a person seen from behind placing coloured sticky notes in four neat columns on a glass wall, two colleagues seen from the side at a long wooden table reviewing printed page layouts next to a laptop with a blurred website wireframe, notebooks and coffee cups, large windows with the city softly visible outside; natural morning light.",
  },
  // --- /agence "Ce qui nous distingue" photo cell (realistic, natural colours) ---
  {
    id: "agence-distingue",
    model: "gpt-image-2.5-flare",
    size: "1024x1024",
    quality: "high",
    style: "Hyper-realistic editorial photograph, shot on a full-frame camera with a 35 mm lens, true-to-life natural colours with no neon tints, realistic textures, square composition with the lower half calmer and darker so white text can sit over it. No text, no letters, no numbers, no logos, no watermarks, no identifiable faces (people seen from behind or from the side).",
    prompt:
      "Luxembourg City old town at blue hour seen from the Chemin de la Corniche: the Grund houses and the Alzette river below, the Neumünster abbey, the casemates cliffs, warm lights in the windows, two people seen from behind leaning on the stone parapet looking at the view; serene, slightly hazy, deep blue sky with the last glow of sunset.",
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
  // 4-6: the review slider shows six cards (proposal 28 only had three).
  { id: "avatar-4", size: "1024x1024", quality: "low", model: "gpt-image-2.5-flare", prompt: "Minimalist stylized avatar illustration: geometric silhouette of a person with no facial features, white on near-black, flat vector style." },
  { id: "avatar-5", size: "1024x1024", quality: "low", model: "gpt-image-2.5-flare", prompt: "Minimalist stylized avatar illustration: geometric silhouette of a person with no facial features, deep teal on near-black, flat vector style." },
  { id: "avatar-6", size: "1024x1024", quality: "low", model: "gpt-image-2.5-flare", prompt: "Minimalist stylized avatar illustration: geometric silhouette of a person with no facial features, lime outline with cyan accent on near-black, flat vector style." },
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
  { id: "sub-hero-creation-de-logo", model: "gpt-image-2.5-flare", size: "1536x1536", quality: "high", style: STYLE_SUBHERO, prompt: "A designer's hands refining a logo on a dark walnut desk: an open sketchbook covered with pencil and ink studies of one abstract geometric symbol (circles and a diagonal cut, no letters), the final version inked bold in the centre, a steel ruler, a drafting compass, a fine-liner pen and eraser crumbs; a single lime accent on the inked symbol." },
  { id: "sub-hero-identite-visuelle", model: "gpt-image-2.5-flare", size: "1536x1536", quality: "high", style: STYLE_SUBHERO, prompt: "Flat-lay brand identity kit on a dark slate surface: an open brand-guidelines booklet showing colour swatch pages, a fan of colour chips in lime green, teal, deep blue and off-white, business cards and a letterhead all carrying the same abstract geometric symbol (no letters), a type specimen card rendered only as abstract grey bars, a small stack of stickers; precise art-direction styling." },
  { id: "sub-hero-supports-print", model: "gpt-image-2.5-flare", size: "1536x1536", quality: "high", style: STYLE_SUBHERO, prompt: "Premium printed collateral arranged on a dark stone table: a stack of thick soft-touch business cards with lime edge painting, a folded tri-fold brochure, an annual report with a blind-embossed cover, matching envelopes and letterhead, a rolled poster tied with a band; all pieces share one abstract geometric symbol and only abstract text blocks, no readable words. No printing machines." },
// --- "Notre méthode" banner, one per service / sub-service page ---
  { id: "methode-sites-web", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "A website project review in a bright Luxembourg agency studio: two people seen from the side at a standing desk comparing a large monitor that shows a blurred website layout with the same layout on a smartphone and a tablet lying on the desk, printed wireframe sheets pinned on a cork board behind them; natural morning light from large windows." },
  { id: "methode-sites-web-site-vitrine", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "A designer's desk by a large window: a laptop showing a blurred elegant showcase website with a large photo header, a smartphone beside it displaying the same blurred page, a printed mood board of shop and product photos, a coffee cup; a person's hands seen from the side adjusting the layout with a stylus on a drawing tablet; soft daylight." },
  { id: "methode-sites-web-site-e-commerce", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "A small online shop packing table in a bright Luxembourg workshop: a laptop showing a blurred product grid of photo tiles, neatly packed kraft boxes with tissue paper, a card payment terminal, a smartphone showing a blurred order confirmation screen, hands of a person seen from the side sealing a parcel with tape; natural daylight." },
  { id: "methode-sites-web-landing-pages", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "A marketer's desk in a bright co-working space: a smartphone held in one hand in the foreground showing a blurred single-column landing page with one prominent button shape, a laptop behind showing a blurred campaign dashboard, an open notebook with a pencil sketch of a simple one-page layout; shallow depth of field on the phone." },
  { id: "methode-sites-web-refonte-de-site", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "A website redesign comparison: two monitors side by side on a wooden desk in a bright office, the left one showing a blurred dated and cluttered website, the right one a blurred clean modern layout with generous white space, a person seen from behind comparing them, a printed site map with hand-drawn arrows on the desk; natural daylight." },
  { id: "methode-sites-web-site-multilingue", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "A multilingual website proofreading session in a bright Luxembourg office: three people seen from behind and from the side around a wooden table, each with a laptop showing the same blurred web page layout, printed page proofs with pen annotations, three small paper desk flags of Luxembourg, France and Germany; natural daylight." },
  { id: "methode-seo-geo", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "A search and AI visibility review: a person seen from behind at a desk with two monitors, one showing a blurred search results page, the other a blurred AI assistant chat with abstract answer blocks, an open notebook with a hand-drawn rising curve, Luxembourg rooftops visible through the window; soft daylight." },
  { id: "methode-seo-geo-seo", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "Technical SEO audit over the shoulder of a person whose face is not visible: a laptop showing a blurred site crawl diagram of connected nodes, a second screen with a blurred line chart rising, printed audit pages with highlighter marks spread on a light wooden desk; natural daylight." },
  { id: "methode-seo-geo-geo-gso", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "A person seen from the side typing a question into a blurred AI assistant chat on a laptop, abstract answer blocks with small citation markers on screen, a printed page with a diagram of boxes connected by lines next to the laptop, calm modern office with plants; soft daylight." },
  { id: "methode-seo-geo-seo-local", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "Local search in Luxembourg: a hand holding a smartphone in front of a small shopfront in Luxembourg City old town, the phone showing a blurred map with a single highlighted location pin and star-rating shapes, cobbled street and shop window softly out of focus; natural daylight." },
  { id: "methode-lead-generation", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "Website and landing page lead capture: a laptop on a bright desk showing a blurred website with a short contact form, a smartphone beside it showing a blurred landing page with one large button shape, a printed monthly report with a simple bar chart and no readable numbers, a person's hand holding a pen; natural daylight." },
  { id: "methode-lead-generation-tunnels-de-conversion", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "A conversion funnel workshop: a person seen from behind arranging blank sticky notes in three narrowing rows on a glass wall to form a funnel shape, a laptop on the meeting table showing a blurred step-by-step flow diagram, notebooks and coffee cups; bright meeting room, natural daylight." },
  { id: "methode-lead-generation-landing-pages-campagne", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "Campaign landing page check: a person seen from the side holding a smartphone that shows a blurred social ad, next to a laptop showing a blurred matching landing page with the same colours and one button shape, a printed campaign brief and a pen on the desk; bright office, natural daylight." },
  { id: "methode-lead-generation-email-marketing-automation", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "Email sequence planning: a laptop showing a blurred automation flow of connected boxes and envelope shapes, four printed email drafts pinned in a row above the desk, a smartphone showing a blurred inbox, a person's hands typing; calm office, natural light." },
  { id: "methode-publicite", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "An advertising performance review: two people seen from behind in a modern Luxembourg office in front of a large wall screen showing blurred dashboards with bar charts and line graphs, one person pointing at a rising curve, a laptop and coffee cups on the table; daylight." },
  { id: "methode-publicite-google-ads", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "A person whose face is not visible at a laptop reviewing a blurred search advertising account with keyword lists and a bidding chart, a smartphone beside it showing a blurred search results page with a highlighted sponsored block, a notebook with crossed-out lines; bright office, natural daylight." },
  { id: "methode-publicite-meta-ads", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "A small creative production set for social media ads: a smartphone on a mini tripod filming a product on a pastel table under soft lights, a second smartphone showing a blurred vertical story format, a laptop with a blurred grid of ad variants; bright studio, natural colours." },
  { id: "methode-publicite-linkedin-ads", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "B2B decision makers: two professionals in business attire seen from the side in a glass-walled meeting room of a Kirchberg office tower in Luxembourg, one holding a tablet with a blurred professional feed and a short form, laptop open on the table, city skyline through the windows; natural daylight." },
  { id: "methode-branding-design", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "A brand design studio table seen from above at a slight angle: logo sketches on tracing paper, a fan of colour swatches, printed business cards and a closed brand booklet with an abstract mark, a designer's hands arranging them; natural daylight on a light oak table." },
  { id: "methode-branding-design-creation-de-logo", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "A designer seen from the side refining a logo: tracing paper with pencil iterations of one abstract geometric symbol, a drawing tablet and stylus, a monitor showing the same symbol in vector form both large and at a tiny icon size; natural daylight, bright studio." },
  { id: "methode-branding-design-identite-visuelle", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "A visual identity system laid out on a long table in a bright studio: the same abstract symbol applied to stationery, a tote bag, a smartphone screen and a printed guideline page with a clear-space diagram, colour swatches alongside, two people seen from behind reviewing it; natural daylight." },
  { id: "methode-branding-design-supports-print", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "Prepress check in a bright design studio: a designer's hands holding a printed proof of a brochure spread with crop marks in front of a monitor showing the same layout with bleed guides, paper stock samples and a loupe on the desk; natural daylight, no printing machines." },
  { id: "methode-automatisation-ia", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "Process mapping for automation: a person seen from behind drawing a simple workflow of boxes and arrows on a whiteboard in a bright office, a laptop on the table showing a blurred automation flow of connected nodes, colleagues' hands with notebooks in the foreground; natural daylight." },
  { id: "methode-automatisation-ia-chatbots-ia", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "A business owner seen from the side testing a website chat assistant on a laptop in a bright small office: the screen shows a blurred website with an open chat window of abstract message bubbles, a smartphone beside it shows a blurred messaging conversation, a coffee cup; natural daylight." },
  { id: "methode-automatisation-ia-integrations-crm-api", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "high", style: STYLE_METHODE, prompt: "Data integration work: a developer seen from behind at two monitors, one with a blurred contact list table, the other with a blurred diagram of connected application blocks and arrows, a printed sheet with lines linking two columns of blank boxes on the desk; calm office, daylight." },
// --- "Nos engagements" card photos, per service / sub-service page (public/engagements/<page>-<n>.webp) ---
  { id: "engagement-sites-web-2", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A row of server racks in a clean modern data centre aisle, small green status lights glowing, cables neatly routed." },
  { id: "engagement-sites-web-3", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A support technician wearing a headset, seen from behind, helping a client on a video call in front of two blurred monitors at a tidy desk." },
  { id: "engagement-sites-web-4", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A designer seen from the side at a large desk covered with printed website mock-ups, a tablet with a stylus and pencil interface sketches." },
  { id: "engagement-sites-web-landing-pages-1", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A hand holding a smartphone that shows a clean minimal page with one single glowing button, neutral blurred background." },
  { id: "engagement-sites-web-site-e-commerce-1", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "Contactless payment: a smartphone held over a card payment terminal on a boutique counter, background blurred." },
  { id: "engagement-sites-web-site-e-commerce-2", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A shop owner seen from the side working on a laptop, surrounded by parcels ready to ship in a small stockroom with shelves." },
  { id: "engagement-sites-web-site-e-commerce-3", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A hand adding an item to the cart on a smartphone with a blurred screen, a paper shopping bag beside it on a table." },
  { id: "engagement-sites-web-site-multilingue-2", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A laptop showing blurred search results on a desk, with four small desk flags of Luxembourg, France, Germany and the United Kingdom beside it." },
  { id: "engagement-sites-web-site-multilingue-3", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "Two people seen from the side proofreading printed page proofs together, pens in hand, the text unreadable, on a wooden desk." },
  { id: "engagement-sites-web-site-multilingue-4", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "The same website shown on a laptop, a tablet and a smartphone lined up on a desk, identical layouts made of abstract blocks." },
  { id: "engagement-seo-geo-2", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A laptop showing a blurred search results page next to a smartphone showing a blurred chat answer made of abstract blocks, on a desk." },
  { id: "engagement-seo-geo-3", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A young seedling growing in a small pot on an office windowsill, soft morning light, the office blurred behind." },
  { id: "engagement-seo-geo-seo-1", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A consultant and a client seen from the side across a meeting table, reviewing a rising growth chart on a tablet with a blurred screen." },
  { id: "engagement-lead-generation-tunnels-de-conversion-1", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "Hands arranging blank sticky notes into a funnel-shaped flow on a glass wall, no writing visible." },
  { id: "engagement-lead-generation-tunnels-de-conversion-2", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "Three printed page layouts laid out in sequence on a wooden desk, abstract blocks only." },
  { id: "engagement-lead-generation-tunnels-de-conversion-4", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A B2B decision-maker seen from behind on a video call in a glass meeting room, laptop open." },
  { id: "engagement-publicite-google-ads-1", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "Close-up of hands typing a search on a smartphone, screen blurred." },
  { id: "engagement-publicite-google-ads-2", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A laptop on a desk showing a clean blurred web page with a short form." },
  { id: "engagement-publicite-google-ads-4", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "Close-up of a hand fine-tuning a slider on a mixing console." },
  { id: "engagement-publicite-meta-ads-1", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A smartphone on a small tripod filming a product on a table in a mini home studio with soft lights." },
  { id: "engagement-publicite-meta-ads-2", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "Two smartphones side by side on a table, each showing a different colourful abstract visual." },
  { id: "engagement-publicite-meta-ads-3", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "Commuters on a modern Luxembourg tram looking at their phones, seen from behind, screens blurred." },
  { id: "engagement-publicite-linkedin-ads-1", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "Two executives in business attire seen from the side meeting in a glass-walled room of a modern office building, laptop open." },
  { id: "engagement-publicite-linkedin-ads-2", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A professional in a suit, seen from the side, checking a smartphone in a modern office lobby, screen blurred." },
  { id: "engagement-branding-design-2", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A designer seen from behind at a large monitor refining an abstract geometric symbol with a stylus and drawing tablet." },
  { id: "engagement-branding-design-3", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "Close-up of hands: a designer handing a USB key and a closed brand booklet to a client across a desk." },
  { id: "engagement-branding-design-4", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "Close-up of a business owner's hand handing a business card with an abstract mark to a client across a desk." },
  { id: "engagement-branding-design-creation-de-logo-1", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "Close-up of hand-drawn sketches of one abstract logo symbol on tracing paper spread across a desk, with a pencil and an eraser." },
  { id: "engagement-branding-design-creation-de-logo-2", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A designer and a client seen from behind standing at a wall of pinned variations of one abstract logo symbol, the client pointing at one." },
  { id: "engagement-branding-design-creation-de-logo-3", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "The same abstract symbol shown as a tiny app icon on a smartphone held in hand, and large on a shop sign in the background." },
  { id: "engagement-branding-design-creation-de-logo-4", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A laptop screen showing a grid of one abstract logo in colour, black and white, monochrome and tiny icon sizes." },
  { id: "engagement-branding-design-identite-visuelle-1", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "Top-down view of an abstract logo mark at the centre of a table surrounded by colour swatches, pattern samples and stationery mock-ups." },
  { id: "engagement-branding-design-identite-visuelle-2", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A fan of colour swatch cards spread on a desk next to a laptop showing the same palette as colour blocks." },
  { id: "engagement-branding-design-identite-visuelle-3", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A tablet on a desk displaying a brand guidelines page with a logo clear-space diagram and colour blocks." },
  { id: "engagement-branding-design-identite-visuelle-4", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A team member seen from behind at a shared screen dragging brand icons and patterns into a presentation." },
  { id: "engagement-branding-design-supports-print-1", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A designer seen from behind checking a monitor that shows a business card layout with crop marks and bleed guides." },
  { id: "engagement-branding-design-supports-print-2", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "Close-up of a hand sliding a one-page specification sheet and paper stock samples across a desk, text unreadable." },
  { id: "engagement-branding-design-supports-print-3", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "Flat-lay of business cards, letterhead, an envelope and a folded brochure sharing the same abstract mark and colour palette." },
  { id: "engagement-branding-design-supports-print-4", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A laptop showing a multi-page brochure layout grid with placeholder image blocks, a designer's hand on the trackpad." },
  { id: "engagement-automatisation-ia-2", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "Two colleagues seen from behind at a whiteboard arranging blank sticky notes into a simple process flow." },
  { id: "engagement-automatisation-ia-3", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "Close-up of hands typing on a laptop fitted with a privacy screen filter, the office softly blurred behind." },
  { id: "engagement-automatisation-ia-integrations-crm-api-1", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A tidy office desk with a laptop, a tablet and an external monitor all linked to a single docking station by neat cables." },
  { id: "engagement-automatisation-ia-integrations-crm-api-2", model: "gpt-image-2.5-flare", size: "1536x1024", quality: "medium", style: STYLE_ENGAGEMENT, prompt: "A developer seen from behind at a desk in front of two monitors showing blurred, unreadable code, evening office light." },
];
