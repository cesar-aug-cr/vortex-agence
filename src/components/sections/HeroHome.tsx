"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import TestBHLazy from "@/components/three/TestBHLazy";
import { HeroTestBH } from "@/components/sections/HeroTestBH";

/**
 * Home hero. Desktop (≥ 768 px) renders HeroTestBH (the black-hole hero);
 * phones get a scroll-stepped version of the same content.
 *
 * On phones the hero is four screens tall with a sticky stage. One scroll
 * gesture (swipe or wheel tick) = one step: while the stage is pinned the
 * gesture is intercepted and the page is scrolled to the next step. Past the
 * last step the page scrolls normally. Each step reveals one more block:
 *   0  eyebrow + title
 *   1  + lead paragraph
 *   2  + the two CTAs
 *   3  + trust line; the city skyline fades in at the bottom and the black
 *      hole slides down behind it, like on desktop.
 */

const STEPS = 4;
const T = "var(--hero-tint, 7,7,10)";
const SCRIM = `linear-gradient(100deg, rgba(${T},0.9) 0%, rgba(${T},0.7) 45%, rgba(${T},0.3) 100%), linear-gradient(to bottom, rgba(${T},0.5) 0%, transparent 30%, transparent 70%, rgba(${T},0.8) 100%)`;
/* last step: the bottom stays clear so the skyline reads over the black hole */
const SCRIM_LAST = `linear-gradient(100deg, rgba(${T},0.9) 0%, rgba(${T},0.7) 45%, rgba(${T},0.3) 100%), linear-gradient(to bottom, rgba(${T},0.5) 0%, transparent 30%, transparent 80%, rgba(${T},0.15) 100%)`;
const GRID = `linear-gradient(to right, rgba(var(--hero-grid, 255,255,255),0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(var(--hero-grid, 255,255,255),0.6) 1px, transparent 1px)`;

export function HeroHome({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [mobile, setMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Until the media query has run, keep the hero's footprint so the page
  // doesn't jump; nothing heavy mounts yet.
  if (mobile === null) return <section className="hero-section min-h-[100svh] bg-stage" aria-hidden />;
  if (!mobile) return <HeroTestBH dict={dict} lang={lang} />;
  return <MobileScrollHero dict={dict} lang={lang} />;
}

/** Height-animated reveal (grid-rows 0fr → 1fr) so the centred stack re-centres smoothly. */
function Reveal({ show, delay = 0, children }: { show: boolean; delay?: number; children: ReactNode }) {
  return (
    <div
      aria-hidden={!show}
      style={{
        display: "grid",
        gridTemplateRows: show ? "1fr" : "0fr",
        opacity: show ? 1 : 0,
        transition: `grid-template-rows 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, opacity 600ms ease ${delay + 120}ms`,
      }}
    >
      <div
        className="min-h-0 overflow-hidden"
        style={{ transform: show ? "translateY(0)" : "translateY(18px)", transition: `transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
}

function MobileScrollHero({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // One gesture = one step. While the sticky stage is pinned and a step
  // remains in the gesture's direction, touch moves and wheel ticks are
  // consumed and the page is scrolled to the neighbouring step; a short lock
  // swallows the rest of the same gesture. Downwards past the last step (or
  // upwards at the first) nothing is intercepted, so the page scrolls on.
  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;
    let busy = false;
    let startY: number | null = null;
    let consumed = false;
    const stepPx = () => node.offsetHeight / STEPS;
    const pinned = () => {
      const r = node.getBoundingClientRect();
      return r.top <= 1 && r.bottom > window.innerHeight * 0.5;
    };
    const currentStep = () => Math.round(-node.getBoundingClientRect().top / stepPx());
    const shouldHandle = (dir: 1 | -1) => {
      if (!pinned()) return false;
      const k = currentStep();
      return dir === 1 ? k < STEPS - 1 : k > 0;
    };
    const go = (dir: 1 | -1) => {
      const from = currentStep();
      const to = Math.min(STEPS - 1, Math.max(0, from + dir));
      if (to === from) return;
      busy = true;
      const top = window.scrollY + node.getBoundingClientRect().top + to * stepPx();
      window.scrollTo({ top, behavior: "smooth" });
      window.setTimeout(() => {
        busy = false;
      }, 850);
    };
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0]?.clientY ?? null;
      consumed = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (startY === null) return;
      const dy = startY - (e.touches[0]?.clientY ?? startY); // > 0: finger up = scroll down
      const dir: 1 | -1 = dy > 0 ? 1 : -1;
      if (!shouldHandle(dir)) return;
      e.preventDefault();
      if (busy || consumed || Math.abs(dy) < 24) return;
      consumed = true;
      go(dir);
    };
    const onTouchEnd = () => {
      startY = null;
      consumed = false;
    };
    const onWheel = (e: WheelEvent) => {
      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      if (!shouldHandle(dir)) return;
      e.preventDefault();
      if (busy) return;
      go(dir);
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("wheel", onWheel);
    };
  }, [reduced]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = node.getBoundingClientRect();
      const max = Math.max(1, node.offsetHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / max));
      setStep(Math.round(p * (STEPS - 1)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Reduced motion: everything visible at once, no sliding black hole.
  const s = reduced ? STEPS - 1 : step;
  const last = s >= STEPS - 1;

  return (
    <section ref={ref} className="hero-section relative bg-stage text-stage-text" style={{ height: `${STEPS * 100}svh` }}>
      <div className="sticky top-0 isolate h-[100svh] overflow-hidden">
        {/* 3D black hole — on the last step it glides down behind the skyline
            and shrinks, driven inside the scene (eased position/scale), so the
            canvas is never transformed or clipped */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <TestBHLazy
            bhPositionOverride={[2.4, 0.4, 0]}
            bhPositionMobileOverride={last ? [0.75, -2.5, 1] : [1.2, 2.6, 1]}
            bhScaleOverride={1.5}
            bhScaleMobileOverride={last ? 0.95 : 1.7}
          />
        </div>

        {/* subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05]"
          aria-hidden
          style={{ backgroundImage: GRID, backgroundSize: "64px 64px", maskImage: "radial-gradient(120% 100% at 50% 0%, black, transparent 78%)" }}
        />

        {/* city skyline — appears at the bottom on the last step, over the black hole */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2]"
          aria-hidden
          style={{
            opacity: last ? 1 : 0,
            transform: last ? "translateY(0)" : "translateY(32px)",
            transition: reduced ? "none" : "opacity 1000ms ease 300ms, transform 1200ms cubic-bezier(.2,.7,.2,1) 300ms",
          }}
        >
          <Image src="/hero/vortx-luxembourg.webp" alt="" width={2560} height={1058} sizes="100vw" className="h-auto w-full" />
        </div>

        {/* readability scrim for centred copy (same tint variable as the home hero) */}
        <div className="pointer-events-none absolute inset-0 z-[3]" aria-hidden style={{ background: last ? SCRIM_LAST : SCRIM, transition: "background 900ms ease" }} />

        {/* bottom fade into the next section */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-20"
          aria-hidden
          style={{ background: "linear-gradient(to bottom, transparent, var(--hero-fade))" }}
        />

        {/* copy — centred stack, one block more per step */}
        <div className="container-vortx relative z-10 flex h-full flex-col items-start justify-center pb-24 pt-28 text-left">
          <span className="section-eyebrow eyebrow-badge font-mono text-xs font-bold uppercase tracking-[0.24em]">{dict.hero.eyebrow}</span>
          <h1 className="hero-title mt-5 text-3xl font-bold leading-[1.08] drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]">
            {dict.hero.titleLead} <span className="text-gradient">{dict.hero.titleAccent}</span>
          </h1>

          <Reveal show={s >= 1}>
            <p className="max-w-md pt-6 text-base text-stage-text-dim">{dict.hero.subtitle}</p>
          </Reveal>

          <Reveal show={s >= 2}>
            <div className="flex flex-col items-start gap-3 pt-8">
              <Link href={localized(lang, "/contact")} className="btn btn-primary">
                {dict.hero.primaryCta}
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--hero-cta-border,rgba(255,255,255,0.25))] px-6 py-3.5 font-semibold text-stage-text transition-colors hover:border-accent hover:text-accent-strong"
              >
                {dict.hero.secondaryCta}
              </a>
            </div>
          </Reveal>

          <Reveal show={s >= 3}>
            <p className="brand-sweep pt-6 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em]">{dict.hero.note}</p>
          </Reveal>
        </div>

        {/* scroll hint until the last step */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center text-stage-text-dim"
          aria-hidden
          style={{ opacity: last ? 0 : 1, transition: "opacity 400ms ease" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
