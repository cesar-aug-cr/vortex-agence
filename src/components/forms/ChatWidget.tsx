"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { ContactForm } from "@/components/forms/ContactForm";

/**
 * Floating chat widget. A launcher bubble (bottom-right) opens a panel that
 * runs the EXACT same multi-step process as the contact page form — it reuses
 * <ContactForm/>, so services → details → message + consent and the /api/contact
 * submission stay identical. Dressed as a chat (header + greeting bubble).
 */
export function ChatWidget({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [open, setOpen] = useState(false);
  const c = dict.chat;

  // On mobile the launcher lives inside the StickyCta pill (icon-only button),
  // which toggles the panel through this event instead of its own bubble.
  useEffect(() => {
    const toggle = () => setOpen((v) => !v);
    window.addEventListener("vortx:chat-toggle", toggle);
    return () => window.removeEventListener("vortx:chat-toggle", toggle);
  }, []);
  const services = dict.services.map((s) => ({ slug: s.slug, title: s.title }));

  return (
    <>
      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label={c.title}
          className="fixed bottom-24 right-4 z-50 flex max-h-[min(80vh,640px)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-bg-card shadow-[var(--shadow-lg)] animate-fade-in-up lg:right-6"
        >
          {/* header */}
          <div className="flex items-center justify-between gap-3 border-b border-border bg-stage px-5 py-4 text-stage-text">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight">{c.title}</p>
                <p className="text-xs text-stage-text-dim">{c.subtitle}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={c.close}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-stage-text transition-colors hover:border-accent hover:text-[color:var(--accent)]"
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          {/* body */}
          <div className="flex-1 overflow-y-auto p-5">
            <p className="mb-5 max-w-[85%] rounded-2xl rounded-tl-sm bg-bg-elevated p-3 text-sm leading-relaxed text-text-dim">
              {c.greeting}
            </p>
            <ContactForm lang={lang} form={dict.contact.form} services={services} />
          </div>
        </div>
      )}

      {/* Launcher — desktop only; on mobile the StickyCta pill hosts the
          icon-only chat button (see vortx:chat-toggle above). */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? c.close : c.open}
        className="fixed bottom-6 right-4 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-ink shadow-[var(--shadow-lg)] transition-transform hover:-translate-y-0.5 lg:right-6 lg:flex"
      >
        {open ? (
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </>
  );
}
