"use client";

import { useEffect, useState } from "react";

export function ThemeToggle({
  label = "Changer de thème",
  onDark = false,
}: {
  label?: string;
  /** True when sitting over the always-dark hero (transparent header) — forces
   *  light icon/border so it stays visible even in light theme. */
  onDark?: boolean;
}) {
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    const e = document.documentElement;
    e.classList.toggle("dark", next);
    e.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem("vortx-theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`hdr-icon-btn inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-colors hover:border-accent ${
        onDark ? "border-transparent bg-white/10 text-white" : "border-transparent bg-text/5 text-text"
      }`}
    >
      {mounted && dark ? (
        // Sun
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        // Moon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
