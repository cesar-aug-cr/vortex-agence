"use client";

import { useEffect, useState } from "react";
import { GlowStar } from "@/components/sections/GlowStar";

/**
 * Floating-particle ambience ported from the "Confiance" section
 * (PortfolioCoverflow): 40 drifting dots animated with `coverflow-float`
 * plus two diagonal lime/cyan glow lines, both with a light scroll parallax.
 *
 * Tuned for the dark hero stage (always-dark), so colours are fixed here
 * instead of theme-detecting like the source.
 */
export function HeroParticles() {
  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; delay: number }>
  >([]);

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

  return (
    <>
      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white/20"
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

      {/* Glow stars (lime / cyan sparkles) — main one bottom-right, a smaller
          one top-right. A third sits next to "Luxembourg" in the headline. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* bottom-right star — slightly smaller on phones, full size on desktop */}
        <GlowStar className="left-[80%] top-[74%] opacity-50 md:hidden" scale={0.5} delay={0} />
        <GlowStar className="left-[80%] top-[74%] hidden md:block" scale={1} delay={0} />
        <GlowStar className="left-[90%] top-[15%] hidden md:block" scale={0.55} delay={1.6} />
      </div>
    </>
  );
}
