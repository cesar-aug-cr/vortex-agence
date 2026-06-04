---
name: vortx-seo-checklist
description: SEO/GEO deliverables and on-page rules for the VorTX site — meta, structured data, the txt/xml files, and Luxembourg-market specifics. Use when creating pages or SEO infrastructure files.
---

# VorTX SEO / GEO Checklist

Priority order for a NEW domain (vortx.lu): positioning & on-page first, technical files second. The files below help, but content + local proof move rankings.

## Per-page on-page (every route)
- Unique `<title>` ≤ ~60 chars, includes intent + "Luxembourg" + "VorTX" where natural. Source from `dict.meta.*` / `service.metaTitle`.
- Meta description 140–160 chars, benefit-led, with a soft CTA.
- One `<h1>` per page; logical h2/h3 outline.
- `alternates.canonical` set; `hreflang` alternates for every shipped locale.
- OpenGraph + Twitter card; dynamic OG image per page.
- Breadcrumbs (visible + `BreadcrumbList` JSON-LD).

## Structured data (JSON-LD)
- `Organization` + `LocalBusiness` (name VorTX, areaServed Luxembourg, languages fr/de/en, sameAs socials) — site-wide.
- `Service` per service page.
- `FAQPage` where FAQs exist.
- `BreadcrumbList` per inner page.
- `WebSite` with `inLanguage`.

## Files (App Router conventions)
- `src/app/robots.ts` → `/robots.txt` (allow all, point to sitemap).
- `src/app/sitemap.ts` → `/sitemap.xml` (all locales × routes, lastmod).
- `public/llms.txt` — concise, structured map of the site for LLMs (sections, key URLs, what VorTX does).
- `public/llms-full.txt` — full text content for LLM ingestion.
- `public/humans.txt` AND a `/humans` page (credits/team/colophon).
- `site.webmanifest` + icons (favicon, apple-icon, icon.tsx).

## GEO / GSO (answer-engine optimization)
- Write content that directly answers questions (the FAQ pattern). Lead with the answer.
- Structured, citable facts (stats, definitions). Keep `llms.txt` accurate and current.
- Clear entity definitions ("VorTX est une agence marketing à Luxembourg qui…").

## Luxembourg specifics
- Multilingual is a ranking & trust factor (FR/DE/EN). Set `lang` + hreflang correctly.
- Mention local signals: Luxembourg, multilingue, RGPD/GDPR.
- Avoid foreign-currency pricing or fake testimonials (credibility killers locally).

## Verify
- `npm run build` clean. No broken internal links. Lighthouse SEO ≥ 95.
