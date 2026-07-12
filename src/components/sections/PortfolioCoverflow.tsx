"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/**
 * Portfolio coverflow showcase — ported from the cd-main /portafolio hero and
 * rebranded to vortx (lime/cyan, French copy, CTA → #contact). Self-detects the
 * active theme via the `.dark` class on <html>.
 */

const showcaseSites = [
  { id: 1, slug: "momento-relojero", name: "Momento Relojero", image: "/portfolio/momento-relojero.jpg" },
  { id: 2, slug: "isomontage", name: "Isomontage", image: "/portfolio/isomontage.jpg" },
  { id: 3, slug: "garage-biver", name: "Garage Biver", image: "/portfolio/garage-biver.jpg" },
  { id: 4, slug: "vitrophy", name: "Vitrophy", image: "/portfolio/vitrophy.jpg" },
  { id: 5, slug: "cim-by-cacr", name: "CIM by CACR", image: "/portfolio/cim-by-cacr.jpg" },
  { id: 6, slug: "blumenthal", name: "Blumenthal", image: "/portfolio/blumenthal.jpg" },
  { id: 7, slug: "lux-habitat", name: "Lux Habitat", image: "/portfolio/lux-habitat.png" },
  { id: 8, slug: "autodis", name: "Autodis", image: "/portfolio/autodis.jpg" },
  { id: 9, slug: "pauly-losch", name: "Pauly Losch", image: "/portfolio/pauly-losch.jpg" },
];

type Copy = {
  typewriter: readonly string[];
  cta: string;
  prev: string;
  next: string;
  pause: string;
  play: string;
};

export function PortfolioCoverflow({
  copy,
  alts,
}: {
  copy: Copy;
  /** Localized descriptive alt text per project slug (from dict.workPage). */
  alts?: Record<string, string>;
}) {
  const typewriterTexts = copy.typewriter;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; delay: number }>
  >([]);
  const [reduced, setReduced] = useState(false);

  // Respect reduced motion (OS setting OR the a11y "pause animations" toggle).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const el = document.documentElement;
    const update = () => setReduced(mq.matches || el.classList.contains("a11y-no-motion"));
    update();
    mq.addEventListener("change", update);
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => {
      mq.removeEventListener("change", update);
      obs.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: (i * 53) % 100,
      y: (i * 29) % 100,
      size: ((i * 7) % 4) + 1,
      delay: (i % 5) * 1,
    }));
    setParticles(newParticles);
  }, []);

  // Typewriter
  useEffect(() => {
    if (reduced) {
      setCurrentText(typewriterTexts[0]);
      return;
    }
    const full = typewriterTexts[textIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < full.length) {
            setCurrentText(full.substring(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else if (charIndex > 0) {
          setCurrentText(full.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % typewriterTexts.length);
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, reduced]);

  // Auto-advance (disabled under reduced motion)
  useEffect(() => {
    if (isPaused || reduced) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseSites.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, reduced]);

  const getPosition = (index: number) => {
    const total = showcaseSites.length;
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const getCardStyles = (index: number) => {
    const position = getPosition(index);
    const absPosition = Math.abs(position);
    if (absPosition > 2) {
      return {
        opacity: 0,
        transform: `translateX(${position * 100}%) scale(0.5)`,
        zIndex: 0,
        pointerEvents: "none" as const,
      };
    }
    const scale = position === 0 ? 1.4 : absPosition === 1 ? 0.95 : 0.75;
    const opacity = position === 0 ? 1 : absPosition === 1 ? 0.8 : 0.5;
    const zIndex = 10 - absPosition;
    return {
      opacity,
      transform: `translateX(${position * 20}vw) scale(${scale})`,
      zIndex,
      pointerEvents: "auto" as const,
    };
  };

  return (
    <div className="relative overflow-hidden py-8 lg:py-12">
      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-accent-2/25 dark:bg-white/20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animation: `coverflow-float ${6 + p.delay}s ease-in-out infinite`,
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          />
        ))}
      </div>

      {/* Glow lines (lime / cyan) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 -left-20 h-[2px] w-[600px] bg-gradient-to-r from-transparent via-accent-2/25 to-transparent dark:via-accent-2/40"
          style={{ transform: `translateX(${scrollY * 0.2}px) rotate(45deg)` }}
        />
        <div
          className="absolute bottom-1/3 -right-20 h-[2px] w-[500px] bg-gradient-to-r from-transparent via-accent/30 to-transparent dark:via-accent/40"
          style={{ transform: `translateX(${-scrollY * 0.15}px) rotate(-45deg)` }}
        />
      </div>

      {/* Carousel */}
      <div className="relative flex h-[400px] items-center justify-center md:h-[520px] lg:h-[600px]">
        {/* Edge fades — from-bg tracks the section background in both themes,
            so no JS theme detection (no pre-hydration dark flash). */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-16 bg-gradient-to-r from-bg to-transparent md:w-32" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-16 bg-gradient-to-l from-bg to-transparent md:w-32" />

        <div className="relative flex h-full w-full items-center justify-center">
          {showcaseSites.map((site, index) => {
            const styles = getCardStyles(index);
            const position = getPosition(index);
            return (
              <div
                key={site.id}
                className="absolute cursor-pointer transition-all duration-500 ease-out"
                style={{ ...styles, width: "clamp(200px, 18vw, 340px)" }}
                onClick={() => setActiveIndex(index)}
              >
                <div
                  className={`relative aspect-[3/4] overflow-hidden rounded-xl transition-shadow duration-300 ${
                    position === 0
                      ? "shadow-2xl ring-2 ring-accent-2/40"
                      : "shadow-lg"
                  }`}
                  style={
                    position === 0
                      ? { boxShadow: "0 0 30px rgba(20,224,200,0.18), 0 25px 50px -12px rgba(0,0,0,0.5)" }
                      : undefined
                  }
                >
                  <Image
                    src={site.image}
                    alt={alts?.[site.slug] ?? `Projet ${site.name} réalisé par vortx`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 480px"
                    quality={85}
                    // Only the centre slide is preloaded — the section sits
                    // below the fold, side slides can lazy-load.
                    priority={position === 0}
                  />
                  <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/60 to-transparent p-3">
                    <span className="text-xs font-medium text-white drop-shadow-lg">
                      {site.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating typewriter card */}
      <div className="relative z-30 -mt-20 px-4 md:-mt-32 lg:-mt-40">
        <div
          className="spotlight-card mx-auto max-w-md rounded-2xl border border-transparent bg-white/70 p-6 text-center shadow-2xl dark:bg-black/40 md:p-8"
          style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
        >
          <span className="glass-ring" aria-hidden />
          {/* Decorative rotating slogan — a <p>, not a heading (it starts
              empty at SSR and its content cycles). Two lines reserved so the
              ~32-char sentences wrap instead of clipping on small screens. */}
          <p className="mb-6 min-h-[2.5em] text-center text-xl font-bold leading-tight text-text md:text-2xl">
            {currentText}
            <span className="ml-1 inline-block h-[0.8em] w-[2px] animate-pulse bg-text align-middle" />
          </p>
          <a
            href="#contact"
            className="block w-full rounded-xl bg-gradient-to-r from-accent to-accent-2 py-4 text-center text-lg font-semibold text-accent-ink shadow-lg shadow-accent/25 transition-all hover:opacity-90"
          >
            {copy.cta}
          </a>
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-40 mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() =>
            setActiveIndex((prev) => (prev - 1 + showcaseSites.length) % showcaseSites.length)
          }
          className="relative flex h-12 w-12 items-center justify-center rounded-full border border-transparent bg-text/5 text-text-dim backdrop-blur-md transition-colors hover:border-accent hover:text-text dark:bg-white/10 dark:text-white dark:hover:text-accent"
          aria-label={copy.prev}
        >
          <span className="glass-ring" aria-hidden />
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full border border-transparent bg-text/5 text-text backdrop-blur-md transition-colors hover:border-accent dark:bg-white/10 dark:text-white dark:hover:text-accent"
          aria-label={isPaused ? copy.play : copy.pause}
        >
          <span className="glass-ring" aria-hidden />
          {isPaused ? (
            <svg className="ml-0.5 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveIndex((prev) => (prev + 1) % showcaseSites.length)}
          className="relative flex h-12 w-12 items-center justify-center rounded-full border border-transparent bg-text/5 text-text-dim backdrop-blur-md transition-colors hover:border-accent hover:text-text dark:bg-white/10 dark:text-white dark:hover:text-accent"
          aria-label={copy.next}
        >
          <span className="glass-ring" aria-hidden />
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
