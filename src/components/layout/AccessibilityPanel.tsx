"use client";

import { useEffect, type RefObject } from "react";
import type { A11yLabels, Settings } from "./AccessibilityWidget";

/**
 * The accessibility dialog itself. Split out of AccessibilityWidget and loaded
 * with next/dynamic on the first click: the launcher button (in the header of
 * every page) stays inline, the ~400 lines of panel UI leave the initial
 * bundle. All state lives in the widget; this component is presentational plus
 * the focus management that needs the dialog node.
 */
export type ToggleItem = { key: keyof Settings; label: string };

export type AccessibilityPanelProps = {
  labels: A11yLabels;
  s: Settings;
  pos: { mobile: boolean; top: number; right: number };
  panelRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
  /** Called when the dialog unmounts, so the widget can restore focus. */
  onUnmount: () => void;
  profiles: { key: string; label: string }[];
  activeProfile?: string;
  applyProfile: (key: string) => void;
  setFont: (dir: -1 | 1) => void;
  canDecrease: boolean;
  canIncrease: boolean;
  toggle: (key: keyof Settings) => void;
  textToggles: ToggleItem[];
  viewToggles: ToggleItem[];
  comfortToggles: ToggleItem[];
  reset: () => void;
};

function Switch({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? "bg-accent" : "bg-border-strong"}`}
    >
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${on ? "left-[1.125rem]" : "left-0.5"}`} />
    </span>
  );
}

function ToggleRow({ label, on, onToggle }: { label: string; on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      className={`flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
        on ? "border-accent bg-accent-soft text-text" : "border-border text-text-dim hover:border-border-strong hover:text-text"
      }`}
    >
      {label}
      <Switch on={on} />
    </button>
  );
}

function GroupTitle({ children }: { children: string }) {
  return (
    <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-text-muted">{children}</p>
  );
}

export default function AccessibilityPanel({
  labels,
  s,
  pos,
  panelRef,
  onClose,
  onUnmount,
  profiles,
  activeProfile,
  applyProfile,
  setFont,
  canDecrease,
  canIncrease,
  toggle,
  textToggles,
  viewToggles,
  comfortToggles,
  reset,
}: AccessibilityPanelProps) {
  // focus management + Esc + focus trap
  useEffect(() => {
    const node = panelRef.current;
    node?.querySelector<HTMLElement>("button, a, input")?.focus();
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") return onClose();
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
      onUnmount();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
          onClick={onClose}
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
            disabled={!canDecrease}
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
            disabled={!canIncrease}
            aria-label={labels.increase}
            className="flex h-10 flex-1 items-center justify-center rounded-lg border border-border text-xl font-bold text-text transition-colors hover:border-accent hover:text-accent-strong disabled:opacity-40"
          >
            A+
          </button>
        </div>
        <div className="mt-2 grid gap-2">
          {textToggles.map((t) => (
            <ToggleRow key={t.key} label={t.label} on={Boolean(s[t.key])} onToggle={() => toggle(t.key)} />
          ))}
        </div>

        <GroupTitle>{labels.viewGroup}</GroupTitle>
        <div className="mt-2 grid gap-2">
          {viewToggles.map((t) => (
            <ToggleRow key={t.key} label={t.label} on={Boolean(s[t.key])} onToggle={() => toggle(t.key)} />
          ))}
        </div>

        <GroupTitle>{labels.comfortGroup}</GroupTitle>
        <div className="mt-2 grid gap-2">
          {comfortToggles.map((t) => (
            <ToggleRow key={t.key} label={t.label} on={Boolean(s[t.key])} onToggle={() => toggle(t.key)} />
          ))}
        </div>
      </div>

      {/* pinned footer */}
      <div className="shrink-0 border-t border-border p-4">
        <button
          type="button"
          onClick={reset}
          className="w-full rounded-lg border border-border py-2.5 text-sm font-medium text-text-dim transition-colors hover:border-accent hover:text-accent-strong"
        >
          {labels.reset}
        </button>
      </div>
    </div>
  );
}
