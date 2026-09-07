"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import type { Dictionary } from "@/i18n/getDictionary";

export type A11yLabels = Dictionary["a11y"];

export type Settings = {
  fontScale: number;
  readable: boolean;
  spacing: boolean;
  lineHeight: boolean;
  links: boolean;
  contrast: boolean;
  grayscale: boolean;
  saturate: boolean;
  hideImages: boolean;
  bigCursor: boolean;
  focusHighlight: boolean;
  readingGuide: boolean;
  readingMask: boolean;
  pauseMotion: boolean;
};

const DEFAULTS: Settings = {
  fontScale: 1,
  readable: false,
  spacing: false,
  lineHeight: false,
  links: false,
  contrast: false,
  grayscale: false,
  saturate: false,
  hideImages: false,
  bigCursor: false,
  focusHighlight: false,
  readingGuide: false,
  readingMask: false,
  pauseMotion: false,
};

const KEY = "vortx-a11y";
const MIN = 0.9;
const MAX = 1.6;

const CLASS_MAP: Partial<Record<keyof Settings, string>> = {
  readable: "a11y-readable",
  spacing: "a11y-spacing",
  lineHeight: "a11y-line",
  links: "a11y-links",
  contrast: "a11y-contrast",
  hideImages: "a11y-hide-img",
  bigCursor: "a11y-cursor",
  focusHighlight: "a11y-focus",
  pauseMotion: "a11y-no-motion",
};

const PROFILES: Record<string, Partial<Settings>> = {
  visual: { fontScale: 1.2, contrast: true, links: true },
  dyslexia: { readable: true, spacing: true, lineHeight: true },
  reading: { readable: true, lineHeight: true, readingGuide: true },
  calm: { pauseMotion: true, contrast: true },
};

function apply(s: Settings) {
  const e = document.documentElement;
  for (const [key, cls] of Object.entries(CLASS_MAP)) {
    if (cls) e.classList.toggle(cls, Boolean(s[key as keyof Settings]));
  }
  e.style.fontSize = s.fontScale === 1 ? "" : `${s.fontScale * 100}%`;
  const filter = [s.grayscale ? "grayscale(1)" : "", s.saturate ? "saturate(1.6)" : ""]
    .filter(Boolean)
    .join(" ");
  e.style.filter = filter;
}

function countActive(s: Settings): number {
  let n = s.fontScale !== 1 ? 1 : 0;
  for (const k of Object.keys(s) as (keyof Settings)[]) {
    if (k !== "fontScale" && s[k]) n++;
  }
  return n;
}

function sameSettings(a: Settings, b: Settings): boolean {
  return (Object.keys(DEFAULTS) as (keyof Settings)[]).every((k) => a[k] === b[k]);
}

/* ------------------------------------------------------------------------
 * Shared settings store. The launcher is rendered twice (header on desktop,
 * bottom of the burger menu on mobile) and a floating badge/button mirrors it,
 * so every instance must read and write the SAME settings — a per-instance
 * useState would let them drift apart (stale badge, floating button not
 * disappearing after a reset done from the other launcher).
 * ---------------------------------------------------------------------- */
const listeners = new Set<() => void>();
let store: Settings = DEFAULTS;
let hydrated = false;

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
const getSnapshot = () => store;
const getServerSnapshot = () => DEFAULTS;
function emit() {
  for (const l of listeners) l();
}
function setStore(next: Settings | ((prev: Settings) => Settings)) {
  store = typeof next === "function" ? next(store) : next;
  apply(store);
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    /* ignore */
  }
  emit();
}
function hydrateStore() {
  if (hydrated) return;
  hydrated = true;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
    store = { ...DEFAULTS, ...saved };
  } catch {
    /* ignore */
  }
  apply(store);
  emit();
}

/**
 * Accessibility widget v2 (UserWay / Eye-Able style). The launcher lives in the
 * header; the panel + overlays render through a portal on document.body so the
 * header's backdrop-filter can't trap their `position: fixed` (which otherwise
 * pinned the mobile modal to the top once the header turned solid on scroll).
 */
// The dialog is fetched on first open (see AccessibilityPanel): the launcher
// stays inline and server-rendered, the panel leaves the initial bundle.
const AccessibilityPanel = dynamic(() => import("./AccessibilityPanel"), { ssr: false });

export function AccessibilityWidget({
  labels,
  onDark = false,
  floating = false,
}: {
  labels: A11yLabels;
  onDark?: boolean;
  /** Also render a fixed launcher at the top-right of the viewport (under the
   *  header, next to the burger on mobile) whenever at least one setting is
   *  active. It disappears as soon as everything is reset. Enable on ONE
   *  instance only (the header one, always mounted). */
  floating?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{ mobile: boolean; top: number; right: number }>({
    mobile: false,
    top: 80,
    right: 16,
  });
  const s = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setS = setStore;
  const launcherRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLButtonElement>(null);
  // Which launcher opened the panel: anchors the panel position + focus return.
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);
  const maskTopRef = useRef<HTMLDivElement>(null);
  const maskBotRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    hydrateStore();
  }, []);

  // position the panel under the launcher (desktop) / centre it (mobile)
  useEffect(() => {
    if (!open) return;
    const compute = () => {
      const anchor = anchorRef.current ?? launcherRef.current;
      const r = anchor?.getBoundingClientRect();
      const mobile = window.innerWidth < 640;
      // No anchor, or a display:none launcher (zero rect): fall back to the
      // top-right corner instead of computing an off-screen position.
      if (!r || r.width === 0) return setPos({ mobile, top: 80, right: 16 });
      setPos({ mobile, top: r.bottom + 8, right: Math.max(8, window.innerWidth - r.right) });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [open]);

  // reading guide / mask follow the pointer
  useEffect(() => {
    if (!s.readingGuide && !s.readingMask) return;
    const band = 70;
    const onMove = (ev: PointerEvent) => {
      const y = ev.clientY;
      if (guideRef.current) guideRef.current.style.top = `${y}px`;
      if (maskTopRef.current) maskTopRef.current.style.height = `${Math.max(0, y - band)}px`;
      if (maskBotRef.current) maskBotRef.current.style.top = `${y + band}px`;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [s.readingGuide, s.readingMask]);

  const toggle = (key: keyof Settings) => setS((p) => ({ ...p, [key]: !p[key] }));
  const setFont = (dir: -1 | 1) =>
    setS((p) => ({
      ...p,
      fontScale: Math.min(MAX, Math.max(MIN, Math.round((p.fontScale + dir * 0.1) * 10) / 10)),
    }));

  const activeProfile = Object.keys(PROFILES).find((name) =>
    sameSettings(s, { ...DEFAULTS, ...PROFILES[name] })
  );
  const applyProfile = (name: string) =>
    setS(activeProfile === name ? DEFAULTS : { ...DEFAULTS, ...PROFILES[name] });

  const active = countActive(s);

  const profiles = [
    { key: "visual", label: labels.profileVisual },
    { key: "dyslexia", label: labels.profileDyslexia },
    { key: "reading", label: labels.profileReading },
    { key: "calm", label: labels.profileCalm },
  ];
  const textToggles: { key: keyof Settings; label: string }[] = [
    { key: "readable", label: labels.readable },
    { key: "spacing", label: labels.spacing },
    { key: "lineHeight", label: labels.lineHeight },
    { key: "links", label: labels.links },
  ];
  const viewToggles: { key: keyof Settings; label: string }[] = [
    { key: "contrast", label: labels.contrast },
    { key: "grayscale", label: labels.grayscale },
    { key: "saturate", label: labels.saturate },
    { key: "hideImages", label: labels.hideImages },
  ];
  const comfortToggles: { key: keyof Settings; label: string }[] = [
    { key: "bigCursor", label: labels.bigCursor },
    { key: "focusHighlight", label: labels.focusHighlight },
    { key: "readingGuide", label: labels.readingGuide },
    { key: "readingMask", label: labels.readingMask },
    { key: "pauseMotion", label: labels.pauseMotion },
  ];

  const portal = (
    <>
      {/* overlays */}
      {s.readingGuide && (
        <div
          ref={guideRef}
          aria-hidden
          className="pointer-events-none fixed inset-x-0 z-[60] h-9 -translate-y-1/2 border-y-2 border-accent/70 bg-accent/10"
          style={{ top: "50%" }}
        />
      )}
      {s.readingMask && (
        <>
          <div ref={maskTopRef} aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[59] bg-black/55" style={{ height: "45%" }} />
          <div ref={maskBotRef} aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 z-[59] bg-black/55" style={{ top: "55%" }} />
        </>
      )}

      {/* Floating launcher: only while something is active. Sits under the
          header bar (80px), flush with the header's right padding so it lines
          up with the burger on mobile. z-44 keeps it under the open mobile
          menu (z-45) and the header (z-50). Mobile/tablet only: on desktop the
          header launcher already carries the badge. */}
      {floating && active > 0 && (
        <button
          ref={floatingRef}
          type="button"
          onClick={() => {
            anchorRef.current = floatingRef.current;
            setOpen((v) => !v);
          }}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={labels.button}
          title={labels.button}
          className="fixed right-5 top-[5.5rem] z-[44] inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-card text-text shadow-[var(--shadow-lg)] transition-colors hover:border-accent md:right-8 lg:hidden"
        >
          <A11yIcon />
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-mono text-[0.6rem] font-bold text-accent-ink">
            {active}
          </span>
        </button>
      )}

      {open && (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[64] cursor-default bg-black/40 sm:bg-transparent"
          />
          <AccessibilityPanel
            labels={labels}
            s={s}
            pos={pos}
            panelRef={panelRef}
            onClose={() => setOpen(false)}
            onUnmount={() => (anchorRef.current ?? launcherRef.current)?.focus()}
            profiles={profiles}
            activeProfile={activeProfile}
            applyProfile={applyProfile}
            setFont={setFont}
            canDecrease={s.fontScale > MIN}
            canIncrease={s.fontScale < MAX}
            toggle={toggle}
            textToggles={textToggles}
            viewToggles={viewToggles}
            comfortToggles={comfortToggles}
            reset={() => setS(DEFAULTS)}
          />
        </>
      )}
    </>
  );

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => {
          anchorRef.current = launcherRef.current;
          setOpen((v) => !v);
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={labels.button}
        title={labels.button}
        className={`hdr-icon-btn relative inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-colors hover:border-accent ${
          onDark ? "border-transparent bg-white/10 text-white" : "border-transparent bg-text/5 text-text"
        }`}
      >
        <A11yIcon />
        {active > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-mono text-[0.6rem] font-bold text-accent-ink">
            {active}
          </span>
        )}
      </button>

      {mounted && createPortal(portal, document.body)}
    </>
  );
}

function A11yIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="3.9" r="1.8" fill="currentColor" stroke="none" />
      <path d="M4.5 8c2.4 1 5 1.4 7.5 1.4S17.1 9 19.5 8" />
      <path d="M12 9.4V14m0 0-3 6.2M12 14l3 6.2" />
    </svg>
  );
}
