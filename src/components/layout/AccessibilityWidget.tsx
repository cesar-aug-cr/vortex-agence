"use client";

import { useEffect, useRef, useState } from "react";

type A11yLabels = {
  button: string;
  title: string;
  fontSize: string;
  decrease: string;
  increase: string;
  contrast: string;
  links: string;
  readable: string;
  spacing: string;
  pauseMotion: string;
  readingGuide: string;
  reset: string;
  close: string;
};

type Settings = {
  fontScale: number;
  contrast: boolean;
  links: boolean;
  readable: boolean;
  spacing: boolean;
  pauseMotion: boolean;
  readingGuide: boolean;
};

const DEFAULTS: Settings = {
  fontScale: 1,
  contrast: false,
  links: false,
  readable: false,
  spacing: false,
  pauseMotion: false,
  readingGuide: false,
};

const KEY = "vortx-a11y";
const MIN = 0.9;
const MAX = 1.6;

const CLASS_MAP: Record<keyof Settings, string | null> = {
  fontScale: null,
  contrast: "a11y-contrast",
  links: "a11y-links",
  readable: "a11y-readable",
  spacing: "a11y-spacing",
  pauseMotion: "a11y-no-motion",
  readingGuide: null,
};

function apply(s: Settings) {
  const e = document.documentElement;
  for (const key of Object.keys(CLASS_MAP) as (keyof Settings)[]) {
    const cls = CLASS_MAP[key];
    if (cls) e.classList.toggle(cls, Boolean(s[key]));
  }
  e.style.fontSize = s.fontScale === 1 ? "" : `${s.fontScale * 100}%`;
}

/**
 * Floating accessibility widget (UserWay / Eye-Able style): a fixed button that
 * opens a panel of reading-comfort controls. Settings persist in localStorage
 * and are applied pre-paint by A11yScript.
 */
export function AccessibilityWidget({
  labels,
  onDark = false,
}: {
  labels: A11yLabels;
  onDark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [s, setS] = useState<Settings>(DEFAULTS);
  const loaded = useRef(false);
  const guideRef = useRef<HTMLDivElement>(null);

  // load saved settings once
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
      setS({ ...DEFAULTS, ...saved });
    } catch {
      /* ignore */
    }
    loaded.current = true;
  }, []);

  // apply + persist on change (after the initial load)
  useEffect(() => {
    if (!loaded.current) return;
    apply(s);
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {
      /* ignore */
    }
  }, [s]);

  // reading guide — horizontal ruler following the pointer
  useEffect(() => {
    if (!s.readingGuide) return;
    const onMove = (ev: PointerEvent) => {
      if (guideRef.current) guideRef.current.style.top = `${ev.clientY}px`;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [s.readingGuide]);

  // Esc closes the panel
  useEffect(() => {
    if (!open) return;
    const onKey = (ev: KeyboardEvent) => ev.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = (key: keyof Settings) => setS((p) => ({ ...p, [key]: !p[key] }));
  const setFont = (dir: -1 | 1) =>
    setS((p) => ({
      ...p,
      fontScale: Math.min(MAX, Math.max(MIN, Math.round((p.fontScale + dir * 0.1) * 10) / 10)),
    }));

  const toggles: { key: keyof Settings; label: string }[] = [
    { key: "contrast", label: labels.contrast },
    { key: "links", label: labels.links },
    { key: "readable", label: labels.readable },
    { key: "spacing", label: labels.spacing },
    { key: "pauseMotion", label: labels.pauseMotion },
    { key: "readingGuide", label: labels.readingGuide },
  ];

  return (
    <>
      {s.readingGuide && (
        <div
          ref={guideRef}
          aria-hidden
          className="pointer-events-none fixed inset-x-0 z-[60] h-9 -translate-y-1/2 border-y-2 border-accent/70 bg-accent/10"
          style={{ top: "50%" }}
        />
      )}

      {/* launcher — lives in the header cluster */}
      <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={labels.button}
        title={labels.button}
        className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:border-accent ${
          onDark ? "border-white/30 text-white" : "border-border-strong text-text"
        }`}
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="3.8" r="1.6" fill="currentColor" stroke="none" />
          <path d="M4.5 7.5c2.5 1 5 1.5 7.5 1.5s5-.5 7.5-1.5" />
          <path d="M12 9v5m0 0-3 6m3-6 3 6" />
        </svg>
      </button>

      {/* panel — dropdown anchored to the button */}
      {open && (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div
            role="dialog"
            aria-label={labels.title}
            className="absolute right-0 top-full z-50 mt-2 max-h-[75vh] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-border bg-bg-card p-5 shadow-[var(--shadow-lg)]"
          >
            <div className="flex items-center justify-between">
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

            {/* font size */}
            <div className="mt-5">
              <p className="text-sm font-medium text-text">{labels.fontSize}</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFont(-1)}
                  disabled={s.fontScale <= MIN}
                  aria-label={labels.decrease}
                  className="flex h-10 flex-1 items-center justify-center rounded-lg border border-border text-lg font-bold text-text transition-colors hover:border-accent hover:text-accent disabled:opacity-40"
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
                  className="flex h-10 flex-1 items-center justify-center rounded-lg border border-border text-xl font-bold text-text transition-colors hover:border-accent hover:text-accent disabled:opacity-40"
                >
                  A+
                </button>
              </div>
            </div>

            {/* toggles */}
            <ul className="mt-4 grid gap-2">
              {toggles.map((t) => {
                const on = Boolean(s[t.key]);
                return (
                  <li key={t.key}>
                    <button
                      type="button"
                      onClick={() => toggle(t.key)}
                      aria-pressed={on}
                      className={`flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                        on
                          ? "border-accent bg-accent-soft text-text"
                          : "border-border text-text-dim hover:border-border-strong hover:text-text"
                      }`}
                    >
                      {t.label}
                      <span
                        aria-hidden
                        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? "bg-accent" : "bg-border-strong"}`}
                      >
                        <span
                          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${on ? "left-[1.125rem]" : "left-0.5"}`}
                        />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={() => setS(DEFAULTS)}
              className="mt-4 w-full rounded-lg border border-border py-2.5 text-sm font-medium text-text-dim transition-colors hover:border-accent hover:text-accent"
            >
              {labels.reset}
            </button>
          </div>
        </>
      )}
      </div>
    </>
  );
}
