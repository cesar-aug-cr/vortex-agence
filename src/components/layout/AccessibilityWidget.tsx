"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Dictionary } from "@/i18n/getDictionary";

type A11yLabels = Dictionary["a11y"];

type Settings = {
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

/**
 * Accessibility widget v2 (UserWay / Eye-Able style). The launcher lives in the
 * header; the panel + overlays render through a portal on document.body so the
 * header's backdrop-filter can't trap their `position: fixed` (which otherwise
 * pinned the mobile modal to the top once the header turned solid on scroll).
 */
export function AccessibilityWidget({
  labels,
  onDark = false,
}: {
  labels: A11yLabels;
  onDark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{ mobile: boolean; top: number; right: number }>({
    mobile: false,
    top: 80,
    right: 16,
  });
  const [s, setS] = useState<Settings>(DEFAULTS);
  const loaded = useRef(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);
  const maskTopRef = useRef<HTMLDivElement>(null);
  const maskBotRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
      setS({ ...DEFAULTS, ...saved });
    } catch {
      /* ignore */
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    apply(s);
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {
      /* ignore */
    }
  }, [s]);

  // position the panel under the launcher (desktop) / centre it (mobile)
  useEffect(() => {
    if (!open) return;
    const compute = () => {
      const r = launcherRef.current?.getBoundingClientRect();
      const mobile = window.innerWidth < 640;
      if (!r) return setPos({ mobile, top: 80, right: 16 });
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

  // focus management + Esc + focus trap
  useEffect(() => {
    if (!open) return;
    const node = panelRef.current;
    node?.querySelector<HTMLElement>("button, a, input")?.focus();
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") return setOpen(false);
      if (ev.key === "Tab" && node) {
        const f = Array.from(
          node.querySelectorAll<HTMLElement>("button, a[href], input, [tabindex]:not([tabindex='-1'])")
        ).filter((el) => !el.hasAttribute("disabled"));
        if (f.length === 0) return;
        const firstEl = f[0];
        const lastEl = f[f.length - 1];
        if (ev.shiftKey && document.activeElement === firstEl) {
          ev.preventDefault();
          lastEl.focus();
        } else if (!ev.shiftKey && document.activeElement === lastEl) {
          ev.preventDefault();
          firstEl.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      launcherRef.current?.focus();
    };
  }, [open]);

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

  const Switch = ({ on }: { on: boolean }) => (
    <span
      aria-hidden
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? "bg-accent" : "bg-border-strong"}`}
    >
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${on ? "left-[1.125rem]" : "left-0.5"}`} />
    </span>
  );

  const ToggleRow = ({ k, label }: { k: keyof Settings; label: string }) => (
    <button
      type="button"
      onClick={() => toggle(k)}
      aria-pressed={Boolean(s[k])}
      className={`flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
        s[k] ? "border-accent bg-accent-soft text-text" : "border-border text-text-dim hover:border-border-strong hover:text-text"
      }`}
    >
      {label}
      <Switch on={Boolean(s[k])} />
    </button>
  );

  const GroupTitle = ({ children }: { children: string }) => (
    <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-text-muted">{children}</p>
  );

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

      {open && (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[64] cursor-default bg-black/40 sm:bg-transparent"
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={labels.title}
            style={pos.mobile ? undefined : { top: pos.top, right: pos.right }}
            className={`fixed z-[65] flex max-h-[85vh] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-bg-card shadow-[var(--shadow-lg)] ${
              pos.mobile ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" : ""
            }`}
          >
            {/* pinned header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-mono text-sm font-semibold uppercase tracking-wide text-accent">
                {labels.title}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={labels.close}
                className="text-text-muted transition-colors hover:text-text"
              >
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            {/* scrollable body */}
            <div className="grow overflow-y-auto px-5 pb-5">
              <GroupTitle>{labels.profilesTitle}</GroupTitle>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {profiles.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => applyProfile(p.key)}
                    aria-pressed={activeProfile === p.key}
                    className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                      activeProfile === p.key
                        ? "border-accent bg-accent text-accent-ink"
                        : "border-border text-text-dim hover:border-accent hover:text-text"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <GroupTitle>{labels.textGroup}</GroupTitle>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFont(-1)}
                  disabled={s.fontScale <= MIN}
                  aria-label={labels.decrease}
                  className="flex h-10 flex-1 items-center justify-center rounded-lg border border-border text-lg font-bold text-text transition-colors hover:border-accent hover:text-accent-strong disabled:opacity-40"
                >
                  A−
                </button>
                <span className="w-12 text-center font-mono text-sm text-text-dim">
                  {Math.round(s.fontScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setFont(1)}
                  disabled={s.fontScale >= MAX}
                  aria-label={labels.increase}
                  className="flex h-10 flex-1 items-center justify-center rounded-lg border border-border text-xl font-bold text-text transition-colors hover:border-accent hover:text-accent-strong disabled:opacity-40"
                >
                  A+
                </button>
              </div>
              <div className="mt-2 grid gap-2">
                {textToggles.map((t) => (
                  <ToggleRow key={t.key} k={t.key} label={t.label} />
                ))}
              </div>

              <GroupTitle>{labels.viewGroup}</GroupTitle>
              <div className="mt-2 grid gap-2">
                {viewToggles.map((t) => (
                  <ToggleRow key={t.key} k={t.key} label={t.label} />
                ))}
              </div>

              <GroupTitle>{labels.comfortGroup}</GroupTitle>
              <div className="mt-2 grid gap-2">
                {comfortToggles.map((t) => (
                  <ToggleRow key={t.key} k={t.key} label={t.label} />
                ))}
              </div>
            </div>

            {/* pinned footer */}
            <div className="shrink-0 border-t border-border p-4">
              <button
                type="button"
                onClick={() => setS(DEFAULTS)}
                className="w-full rounded-lg border border-border py-2.5 text-sm font-medium text-text-dim transition-colors hover:border-accent hover:text-accent-strong"
              >
                {labels.reset}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={labels.button}
        title={labels.button}
        className={`hdr-icon-btn relative inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-colors hover:border-accent ${
          onDark ? "border-transparent bg-white/10 text-white" : "border-transparent bg-text/5 text-text"
        }`}
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="3.9" r="1.8" fill="currentColor" stroke="none" />
          <path d="M4.5 8c2.4 1 5 1.4 7.5 1.4S17.1 9 19.5 8" />
          <path d="M12 9.4V14m0 0-3 6.2M12 14l3 6.2" />
        </svg>
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
