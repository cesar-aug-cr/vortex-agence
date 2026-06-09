"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/**
 * Portfolio coverflow showcase — ported from the cd-main /portafolio hero and
 * rebranded to vortx (lime/cyan, French copy, CTA → #contact). Self-detects the
 * active theme via the `.dark` class on <html>.
 */

const showcaseSites = [
  { id: 1, name: "Momento Relojero", image: "/portfolio/momento-relojero.jpg" },
  { id: 2, name: "Isomontage", image: "/portfolio/isomontage.jpg" },
  { id: 3, name: "Garage Biver", image: "/portfolio/garage-biver.jpg" },
  { id: 4, name: "Vitrophy", image: "/portfolio/vitrophy.jpg" },
  { id: 5, name: "CIM by CACR", image: "/portfolio/cim-by-cacr.jpg" },
  { id: 6, name: "Blumenthal", image: "/portfolio/blumenthal.jpg" },
  { id: 7, name: "Lux Habitat", image: "/portfolio/lux-habitat.png" },
  { id: 8, name: "Autodis", image: "/portfolio/autodis.jpg" },
  { id: 9, name: "Pauly Losch", image: "/portfolio/pauly-losch.jpg" },
];

const typewriterTexts = [
  "Créez votre présence digitale",
  "Concevez des expériences uniques",
  "Boostez votre activité en ligne",
  "Démarquez-vous de la concurrence",
  "Connectez-vous à vos clients",
];

export function PortfolioCoverflow() {
  const [isDark, setIsDark] = useState(true);
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

  // Track the vortx theme (class "dark" on <html>).
  useEffect(() => {
    const el = document.documentElement;
    const update = () => setIsDark(el.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
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
            className={`absolute rounded-full ${isDark ? "bg-white/20" : "bg-accent-2/25"}`}
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
          className={`absolute top-1/4 -left-20 h-[2px] w-[600px] ${
            isDark
              ? "bg-gradient-to-r from-transparent via-accent-2/40 to-transparent"
              : "bg-gradient-to-r from-transparent via-accent-2/25 to-transparent"
          }`}
          style={{ transform: `translateX(${scrollY * 0.2}px) rotate(45deg)` }}
        />
        <div
          className={`absolute bottom-1/3 -right-20 h-[2px] w-[500px] ${
            isDark
              ? "bg-gradient-to-r from-transparent via-accent/40 to-transparent"
              : "bg-gradient-to-r from-transparent via-accent/30 to-transparent"
          }`}
          style={{ transform: `translateX(${-scrollY * 0.15}px) rotate(-45deg)` }}
        />
      </div>

      {/* Carousel */}
      <div className="relative flex h-[400px] items-center justify-center md:h-[520px] lg:h-[600px]">
        <div
          className={`absolute left-0 top-0 bottom-0 z-20 w-16 md:w-32 pointer-events-none ${
            isDark
              ? "bg-gradient-to-r from-[#09090c] to-transparent"
              : "bg-gradient-to-r from-[#f7f8f4] to-transparent"
          }`}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 z-20 w-16 md:w-32 pointer-events-none ${
            isDark
              ? "bg-gradient-to-l from-[#09090c] to-transparent"
              : "bg-gradient-to-l from-[#f7f8f4] to-transparent"
          }`}
        />

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
                    alt={`Projet ${site.name} réalisé par vortx`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 480px"
                    quality={85}
                    priority={Math.abs(position) <= 1}
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
          className={`mx-auto max-w-md rounded-2xl p-6 text-center shadow-2xl md:p-8 ${
            isDark ? "border border-white/10 bg-white/5" : "border border-black/5 bg-white/70"
          }`}
          style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
        >
          <h3
            className={`mb-6 h-[1.5em] whitespace-nowrap text-center text-xl font-bold leading-tight md:text-2xl ${
              isDark ? "text-white" : "text-[#0a0a0b]"
            }`}
          >
            {currentText}
            <span
              className={`ml-1 inline-block h-[0.8em] w-[2px] animate-pulse align-middle ${
                isDark ? "bg-white" : "bg-[#0a0a0b]"
              }`}
            />
          </h3>
          <a
            href="#contact"
            className="block w-full rounded-xl bg-gradient-to-r from-accent to-accent-2 py-4 text-center text-lg font-semibold text-accent-ink shadow-lg shadow-accent/25 transition-all hover:opacity-90"
          >
            Travaillons ensemble
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
          className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors ${
            isDark
              ? "border-white/20 text-white hover:border-accent hover:bg-accent/10 hover:text-accent"
              : "border-black/20 text-text-dim hover:border-accent hover:bg-accent/10 hover:text-text"
          }`}
          aria-label="Projet précédent"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-colors ${
            isDark
              ? "border-white text-white hover:bg-white hover:text-black"
              : "border-text text-text hover:bg-text hover:text-bg"
          }`}
          aria-label={isPaused ? "Reprendre le défilement" : "Mettre en pause"}
        >
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
          className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors ${
            isDark
              ? "border-white/20 text-white hover:border-accent hover:bg-accent/10 hover:text-accent"
              : "border-black/20 text-text-dim hover:border-accent hover:bg-accent/10 hover:text-text"
          }`}
          aria-label="Projet suivant"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
