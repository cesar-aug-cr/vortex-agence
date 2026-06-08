import { Fragment } from "react";
import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import { Wordmark } from "@/components/brand/Wordmark";
import ThreeSphereV2BlackHole from "@/components/three/BlackHoleLazy";
import { HeroParticles } from "@/components/sections/HeroParticles";
import { GlowStar } from "@/components/sections/GlowStar";

export function Hero({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <section className="relative isolate overflow-hidden bg-stage text-stage-text">
      {/* 3D black hole — pushed left/down, sits behind the scrim */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <ThreeSphereV2BlackHole
          showSphere={false}
          bhPositionOverride={[2.4, 0.4, 0]}
          bhPositionMobileOverride={[1.2, 2.6, 1]}
          bhScaleOverride={1.7}
        />
      </div>

      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(120% 100% at 50% 0%, black, transparent 78%)",
        }}
      />

      {/* === READABILITY FILTERS (between 3D and text) === */}
      {/* left→right scrim so copy always sits on enough contrast */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden
        style={{
          background:
            "linear-gradient(100deg, rgba(7,7,10,0.92) 0%, rgba(7,7,10,0.78) 30%, rgba(7,7,10,0.5) 52%, rgba(7,7,10,0.15) 74%, rgba(7,7,10,0) 100%)",
        }}
      />
      {/* soft halo focusing the headline block */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden
        style={{
          background:
            "radial-gradient(70% 60% at 42% 48%, rgba(7,7,10,0.55), transparent 70%)",
        }}
      />
      {/* bottom vignette for the stats row */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-2/3"
        aria-hidden
        style={{
          background:
            "linear-gradient(to top, var(--stage) 6%, rgba(7,7,10,0.6) 40%, transparent 100%)",
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

      {/* frosted filter over the black hole only (softens it, keeps text crisp).
          The blur is applied via .hero-frost (desktop + @supports only); the
          gradient scrim below carries the look on mobile without the cost. */}
      <div
        className="hero-frost pointer-events-none absolute inset-0 z-[3]"
        aria-hidden
        style={{
          background:
            "radial-gradient(44% 54% at 80% 50%, rgba(7,7,10,0.5), rgba(7,7,10,0.16) 55%, transparent 78%)",
          maskImage:
            "radial-gradient(56% 66% at 80% 50%, #000, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(56% 66% at 80% 50%, #000, transparent 80%)",
        }}
      />

      {/* Floating particles + glow lines (ported from the "Confiance" section) —
          above the scrim/frost so they stay visible, below the copy (z-10) */}
      <div className="pointer-events-none absolute inset-0 z-[4]" aria-hidden>
        <HeroParticles />
      </div>

      <div className="container-vortx relative z-10 flex min-h-[100svh] flex-col justify-center pb-16 pt-36 md:pt-40">
        <div className="relative self-start">
          {/* VORTX wordmark as a faint watermark sitting behind the eyebrow */}
          <Wordmark
            aria-hidden
            className="pointer-events-none absolute left-0 top-1/2 h-14 w-auto -translate-y-1/2 text-stage-text/[0.08] animate-fade-in sm:h-16 md:h-20"
          />
          <span className="relative font-mono text-xs uppercase tracking-[0.24em] text-accent animate-fade-in">
            {dict.hero.eyebrow.split("Luxembourg").map((part, i) => (
              <Fragment key={i}>
                {i > 0 && (
                  <span className="relative inline-block">
                    Luxembourg
                    {/* sparkle acting as the full stop, under the final "g" */}
                    <GlowStar
                      className="left-full top-full"
                      scale={0.28}
                      delay={0.8}
                    />
                  </span>
                )}
                {part}
              </Fragment>
            ))}
          </span>
        </div>

        <h1 className="mt-10 max-w-3xl text-4xl font-bold leading-[1.04] drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)] sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up delay-100">
          {dict.hero.titleLead}{" "}
          <span className="text-gradient">{dict.hero.titleAccent}</span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-stage-text-dim sm:text-lg animate-fade-in-up delay-200">
          {dict.hero.subtitle}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4 animate-fade-in-up delay-300">
          <Link href={localized(lang, "/contact")} className="btn btn-primary">
            {dict.hero.primaryCta}
          </Link>
          <Link
            href={localized(lang, "/approche")}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-stage-text transition-colors hover:border-accent hover:text-accent sm:backdrop-blur-sm"
          >
            {dict.hero.secondaryCta}
          </Link>
        </div>

        <p className="brand-sweep mt-6 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em]">
          {dict.hero.note}
        </p>
      </div>
    </section>
  );
}
