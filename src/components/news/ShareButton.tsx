"use client";

import { useEffect, useRef, useState } from "react";
import {
  Share,
  Copy,
  Check,
  LinkedIn,
  XTwitter,
  WhatsApp,
  Mail,
} from "@/components/ui/icons";

type Labels = { share: string; copy: string; copied: string };

/**
 * Share control: copy the canonical URL to the clipboard or share it to apps
 * (LinkedIn, X, WhatsApp, e-mail) — plus the native share sheet when available.
 * `variant="panel"` for the ToC sidebar, `"inline"` next to the back link.
 */
export function ShareButton({
  url,
  title,
  labels,
  variant = "inline",
}: {
  url: string;
  title: string;
  labels: Labels;
  variant?: "inline" | "panel";
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  const enc = encodeURIComponent;
  const apps = [
    { name: "LinkedIn", Icon: LinkedIn, href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { name: "X", Icon: XTwitter, href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}` },
    { name: "WhatsApp", Icon: WhatsApp, href: `https://wa.me/?text=${enc(`${title} ${url}`)}` },
    { name: "E-mail", Icon: Mail, href: `mailto:?subject=${enc(title)}&body=${enc(url)}` },
  ];

  const hasNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  const nativeShare = async () => {
    try {
      await navigator.share({ title, url });
      setOpen(false);
    } catch {
      /* user cancelled — no-op */
    }
  };

  const triggerClass =
    variant === "panel"
      ? "flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-bg-card px-4 py-2.5 text-sm font-semibold text-text transition-colors hover:border-accent/50 hover:text-accent-strong"
      : "inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-text transition-colors hover:border-accent/50 hover:text-accent-strong";

  const menuItem =
    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-text transition-colors hover:bg-accent-soft hover:text-accent-strong";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className={triggerClass}
      >
        <Share width={16} height={16} />
        {labels.share}
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute z-30 w-56 rounded-xl border border-border bg-bg-card p-2 shadow-[var(--shadow-lg)] ${
            variant === "inline" ? "bottom-full right-0 mb-2" : "top-full left-0 mt-2"
          }`}
        >
          <button type="button" onClick={copy} className={menuItem} role="menuitem">
            {copied ? (
              <Check width={16} height={16} className="text-accent" />
            ) : (
              <Copy width={16} height={16} />
            )}
            {copied ? labels.copied : labels.copy}
          </button>

          <div className="my-1 h-px bg-border" />

          {apps.map(({ name, Icon, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={menuItem}
              role="menuitem"
            >
              <Icon width={16} height={16} />
              {name}
            </a>
          ))}

          {hasNativeShare && (
            <>
              <div className="my-1 h-px bg-border" />
              <button type="button" onClick={nativeShare} className={menuItem} role="menuitem">
                <Share width={16} height={16} />
                {labels.share}…
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
