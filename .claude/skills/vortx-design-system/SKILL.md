---
name: vortx-design-system
description: The single source of truth for VorTX visual identity — color tokens, typography, spacing, component conventions, light/dark rules. Load this before building or editing any UI so every section stays coherent.
---

# VorTX Design System

The coherence anchor. Any agent touching UI MUST follow this.

## Brand
- **Name:** VorTX (vortex — attraction, rotation, pull). Always cased `VorTX`.
- **Baseline:** Agence marketing & web · Luxembourg
- **Personality:** premium, confident, technical, conversion-obsessed. Never cheap, never generic-startup.

## Palette — "Vortex Lime" (tokens in `src/app/globals.css`)
Never hardcode hex in components. Use the semantic Tailwind utilities backed by CSS variables.

| Token | Light | Dark | Utility examples |
|---|---|---|---|
| `--bg` | `#f7f8f4` | `#0a0a0b` | `bg-bg` |
| `--bg-card` | `#ffffff` | `#17171c` | `bg-bg-card` |
| `--surface` | `#eef0e8` | `#1d1d22` | `bg-surface` |
| `--text` | `#0a0a0b` | `#f2f3ee` | `text-text` |
| `--text-dim` | `#45483f` | `#b9bcb2` | `text-text-dim` |
| `--text-muted` | — | — | `text-text-muted` |
| `--accent` (lime) | `#c8f02e` | same | `bg-accent`, `text-accent` |
| `--accent-2` (cyan) | `#14e0c8` | same | `text-accent-2` |
| `--accent-ink` | `#0a0a0b` | same | text on accent fills |
| `--stage` | `#07070a` (always dark) | same | `bg-stage` |

### Hard rules
1. **The "stage" is always dark**, in both themes. 3D scenes (black hole, DNA) only render on `bg-stage`. Inside a stage, use `text-stage-text` / `text-stage-text-dim` / `border-white/…` — NEVER theme tokens like `text-text` (they invert and break on dark).
2. **Lime is a fill/accent, not body text on white.** Lime button = `bg-accent text-accent-ink`. For accent emphasis on light backgrounds use underlines, chips, icons — not lime text on white (fails contrast).
3. Gradients use lime→cyan (`.text-gradient`). Reserve for short emphasis spans, not paragraphs.
4. Respect `prefers-reduced-motion` (already handled globally).

## Typography
- Display & body: **Inter Tight** (`font-sans`, var `--font-inter-tight`).
- Mono / eyebrows / stats / labels: **JetBrains Mono** (`font-mono`).
- Eyebrows: `.eyebrow` class (mono, uppercase, tracking 0.22em).
- Headings: tight leading, `-0.02em` tracking, `text-wrap: balance` (global).

## Components / classes (already defined)
- `.container-vortx` — page container (max 80rem, responsive padding).
- `.btn .btn-primary` — lime CTA. `.btn-ghost` — outline (theme-aware; on stage use a `border-white/25` variant instead).
- `.card .card-hover` — elevated card with hover lift.
- `.chip` — mono badge.
- Animations: `.animate-fade-in-up`, `.animate-fade-in`, `.animate-float`, `.delay-100…500`, `.marquee-track`.

## Layout & a11y
- Mobile-first. **No horizontal scroll** — never let a child exceed viewport; the body uses `overflow-x: clip`. Avoid `w-screen`/`100vw` (scrollbar overflow). Test at 360px.
- Sections: generous vertical rhythm (`py-24` desktop). Use the eyebrow → title → lead pattern.
- Focus-visible rings are global (lime). Keep semantic HTML (`section`, `nav`, `dl`, headings in order).

## Don'ts
- No `!important` theme overrides (the anti-pattern we deliberately avoided).
- No new font families. No off-palette colors. No emoji as iconography.
