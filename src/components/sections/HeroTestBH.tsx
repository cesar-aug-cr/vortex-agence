import { Fragment } from "react";
import Link from "next/link";
import { getImageProps } from "next/image";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import TestBHLazy from "@/components/three/TestBHLazy";
import { HeroParticles } from "@/components/sections/HeroParticles";
import { GlowStar } from "@/components/sections/GlowStar";

/**
 * Homepage hero with the image-disk black hole (TestBHScene). Formerly the
 * /home-test sandbox; promoted to the real home. The image scene handles the
 * light-theme white event horizon itself, so no `sandbox` prop is needed.
 */

const T = "var(--hero-tint, 7,7,10)";
const SCRIM = `linear-gradient(100deg, rgba(${T},0.94) 0%, rgba(${T},0.86) 32%, rgba(${T},0.6) 54%, rgba(${T},0.2) 74%, rgba(${T},0) 100%)`;
const HALO = `radial-gradient(70% 60% at 42% 48%, rgba(${T},0.55), transparent 70%)`;
const VIGNETTE = `linear-gradient(to top, var(--stage) 6%, rgba(${T},0.6) 40%, transparent 100%)`;
// Frost opacity is theme-dependent: at the dark default it can sit at 0.5
// (dark smoke on a dark stage), but on the light hero the tint flips to
// near-white and the same alpha reads as a milky halo over the black hole —
// the light theme overrides these two vars down in globals.css.
const FROST = `radial-gradient(44% 54% at 80% 50%, rgba(${T},var(--hero-frost-core,0.5)), rgba(${T},var(--hero-frost-mid,0.16)) 55%, transparent 78%)`;
const GRID = `linear-gradient(to right, rgba(var(--hero-grid, 255,255,255),0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(var(--hero-grid, 255,255,255),0.6) 1px, transparent 1px)`;

// Luxembourg skyline cut-out (desktop only): Pont Adolphe, the old town and
// Kirchberg on a transparent sky, so the black hole shows through behind it.
// It is the hero's Largest Contentful Paint on desktop, so it loads eagerly at
// high priority — but NOT via `priority`, whose <link rel=preload> would ship
// it to phones that never display it. The 2560×1058 source is shown at
// 76 % (1946 px), the same rule as the previous skyline (−20 %, then −5 %);
// narrower viewports cap it at the section width.
const CITY_SRC = "/hero/vortx-luxembourg.webp";
const CITY_NATURAL = { width: 2560, height: 1058 };
const CITY_W = 1946;
const CITY_SIZES = `(max-width: ${CITY_W}px) 100vw, ${CITY_W}px`;
// 1×1 transparent GIF: the <source> phones match, so they fetch nothing.
const BLANK_GIF = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

/** `decors={false}` drops the CSS ambience (floating particles, glow stars) —
 *  used by the /page-test-ok sandbox, which swaps the site decors for an image. */
export function HeroTestBH({ dict, lang, decors = true }: { dict: Dictionary; lang: Locale; decors?: boolean }) {
  const { props: city } = getImageProps({
    src: CITY_SRC,
    alt: "",
    width: CITY_NATURAL.width,
    height: CITY_NATURAL.height,
    sizes: CITY_SIZES,
    loading: "eager",
    fetchPriority: "high",
  });

  return (
    <section className="hero-section relative isolate overflow-hidden bg-stage text-stage-text">
      {/* 3D black hole (image-disk version), behind the Luxembourg skyline.
          Slightly smaller on desktop (1.5) than before; phones keep 1.7. */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <TestBHLazy
          bhPositionOverride={[2.4, 0.4, 0]}
          bhPositionMobileOverride={[1.2, 2.6, 1]}
          bhScaleOverride={1.5}
          bhScaleMobileOverride={1.7}
        />
      </div>

      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05]"
        aria-hidden
        style={{
          backgroundImage: GRID,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(120% 100% at 50% 0%, black, transparent 78%)",
        }}
      />

      {/* brand colour glows */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(50% 40% at 85% 12%, rgba(20,224,200,0.10), transparent 60%), radial-gradient(45% 35% at 12% 92%, rgba(200,240,46,0.08), transparent 60%)",
        }}
      />

      {/* === READABILITY FILTERS (between 3D and text) ===
          The bottom vignette and the frost sit UNDER the city skyline so its
          light trails stay vivid and crisp (the frost's backdrop blur must not
          touch it); the left scrim and halo sit OVER it so the headline keeps
          its veiled backdrop. All four veils share --hero-tint, so their order
          relative to each other is invisible — only the skyline's slot matters. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-2/3"
        aria-hidden
        style={{ background: VIGNETTE }}
      />
      {/* frosted filter over the black hole only (softens it, keeps text crisp). */}
      <div
        className="hero-frost pointer-events-none absolute inset-0 z-[2]"
        aria-hidden
        style={{
          background: FROST,
          maskImage: "radial-gradient(56% 66% at 80% 50%, #000, transparent 80%)",
          WebkitMaskImage: "radial-gradient(56% 66% at 80% 50%, #000, transparent 80%)",
        }}
      />

      {/* City skyline — desktop only, pinned bottom-right at 76 % of its
          source width and scaling down with the section below that. The
          <picture> is art direction in reverse: under lg the blank <source>
          wins and no image bytes are fetched; from lg the <img> srcset is used. */}
      <picture
        className="pointer-events-none absolute bottom-0 right-0 z-[2] hidden max-w-full lg:block"
        style={{ width: CITY_W }}
      >
        <source media="(max-width: 1023px)" srcSet={BLANK_GIF} />
        <img {...city} alt="" className="h-auto w-full" />
      </picture>

      <div className="hero-scrim pointer-events-none absolute inset-0 z-[2]" aria-hidden style={{ background: SCRIM }} />
      <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden style={{ background: HALO }} />

      {/* Floating particles + glow lines — above the scrim/frost, below the copy */}
      {decors && (
        <div className="pointer-events-none absolute inset-0 z-[4]" aria-hidden>
          <HeroParticles />
        </div>
      )}

      {/* Bottom fade: the skyline dissolves into a band that the next section
          picks up (see the divider in page.tsx), so there is no hard cut between
          the hero and "Why VorTX". Black in dark theme, white in light theme
          (--hero-fade, globals.css). */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-56 md:h-72"
        aria-hidden
        style={{ background: "linear-gradient(to bottom, transparent, var(--hero-fade))" }}
      />

      <div className="container-vortx relative z-10 flex min-h-[100svh] flex-col justify-center pb-16 pt-36 md:min-h-[92svh] md:pt-40">
        <div className="relative self-start">
          <span className="section-eyebrow eyebrow-badge relative font-mono text-xs font-bold uppercase tracking-[0.24em] animate-fade-in">
            {/* single child: the pill is inline-flex, which would drop the space before "Luxembourg" */}
            <span>
            {dict.hero.eyebrow.split("Luxembourg").map((part, i) => (
              <Fragment key={i}>
                {i > 0 && (
                  <span className="relative inline-block">
                    Luxembourg
                    {/* sparkle acting as the full stop, under the final "g" */}
                    {decors && <GlowStar className="left-full top-full" scale={0.28} delay={0.8} />}
                  </span>
                )}
                {part}
              </Fragment>
            ))}
            </span>
          </span>
        </div>

        <h1 className="hero-title mt-8 max-w-3xl text-3xl font-bold leading-[1.06] drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)] md:text-5xl lg:text-6xl animate-fade-in-up delay-100">
          {dict.hero.titleLead}{" "}
          <span className="text-gradient">{dict.hero.titleAccent}</span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-stage-text sm:text-lg animate-fade-in-up delay-200">
          {dict.hero.subtitle}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4 animate-fade-in-up delay-300">
          <Link href={localized(lang, "/contact")} className="btn btn-primary">
            {dict.hero.primaryCta}
          </Link>
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--hero-cta-border,rgba(255,255,255,0.25))] px-6 py-3.5 font-semibold text-stage-text transition-colors hover:border-accent hover:text-accent-strong sm:backdrop-blur-sm"
          >
            {dict.hero.secondaryCta}
          </a>
        </div>

        {/* Proof card (replaces the former trust line): four guarantees in a
            glass card + "no commitment" note — bottom-right over the skyline
            from lg, in flow below. */}
        <div className="mt-8 max-w-xs animate-fade-in-up delay-300 lg:absolute lg:bottom-24 lg:right-8 lg:mt-0 lg:w-72">
          <dl className="grid gap-2 p-4 rounded-2xl border border-white/15 bg-black/70 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl backdrop-saturate-150">
            {dict.hero.proof.rows.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-2 last:border-0 last:pb-0">
                <dt className="min-w-0 text-xs text-white/70">{s.label}</dt>
                <dd className="shrink-0 whitespace-nowrap font-mono text-xs font-bold text-[#c8f02e]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
