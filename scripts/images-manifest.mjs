/**
 * One entry per candidate spot on /fr/images-test-pour-voir. `id` is the file
 * name under public/images-test/. Sizes follow gpt-image-2's supported set
 * (1024x1024, 1536x1024, 1024x1536); the page crops with object-cover.
 * Optional per entry: `model` (default gpt-image-2) and `style` (replaces the
 * shared STYLE suffix in gen-images.mjs).
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
];
