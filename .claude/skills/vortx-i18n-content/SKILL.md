---
name: vortx-i18n-content
description: How content and translations work on the VorTX site — the typed dictionary, adding/editing copy, and adding a new locale. Use when writing UI copy or adding a language.
---

# VorTX i18n & Content

## Architecture
- Routing: every page lives under `/[lang]/…`. `src/proxy.ts` redirects locale-less requests to the default locale (`fr`).
- Config: `src/i18n/config.ts` — `locales` (shipped) vs `plannedLocales` (roadmap: de, en, lu).
- Content: `src/i18n/dictionaries/fr.ts` is the SOURCE OF TRUTH. `Dictionary` type is inferred from it.
- Access: server components call `getDictionary(lang)`; pass `dict` + `lang` down as props. Build internal links with `localized(lang, "/path")` from `src/lib/locale.ts`.

## Editing copy
- ALL user-facing strings live in the dictionary — never hardcode French in components.
- Keep keys semantic and grouped by section (`hero`, `services`, `footer`, `meta`, …).
- Tone: see `vortx-design-system`. French, vouvoiement, sharp and benefit-led. No fluff, no fake claims.

## Adding a new locale (e.g. `de`)
1. Create `src/i18n/dictionaries/de.ts` exporting `de` with the SAME shape as `fr` (the `Dictionary` type enforces it).
2. In `getDictionary.ts`, add `de: () => import("./dictionaries/de").then(m => m.de)`.
3. In `config.ts`, move `"de"` from `plannedLocales` to `locales`.
4. Add the `hreflang` alternate in the layout metadata and the language switcher.
No routing or component changes needed — that's the whole point of the setup.

## Content principles (Luxembourg B2B)
- Lead with the customer's problem, then the outcome. Numbers > adjectives.
- Prices are NOT shown — every pricing question routes to "Réserver un appel" / free audit.
- Proof uses honest placeholders until real client data exists. Never invent testimonials.
