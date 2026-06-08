"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

// useLayoutEffect on the client (re-apply before paint → no flash), useEffect
// on the server (avoids the SSR warning).
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const A11Y_CLASSES: Record<string, string> = {
  contrast: "a11y-contrast",
  links: "a11y-links",
  readable: "a11y-readable",
  spacing: "a11y-spacing",
  pauseMotion: "a11y-no-motion",
};

/**
 * Re-applies the saved theme + accessibility settings on every navigation.
 *
 * The `<html>` element lives in the per-locale root layout, so switching
 * language re-renders it and drops the imperatively-set `dark` / a11y classes
 * (the pre-paint scripts only run on a full load). This restores them before
 * paint so the theme never flashes to light when changing language.
 */
export function ThemeSync() {
  const pathname = usePathname();

  useIsoLayoutEffect(() => {
    const e = document.documentElement;

    // theme (brand default = dark)
    try {
      const t = localStorage.getItem("vortx-theme");
      const dark = t ? t === "dark" : true;
      e.classList.toggle("dark", dark);
      e.style.colorScheme = dark ? "dark" : "light";
    } catch {
      e.classList.add("dark");
    }

    // accessibility settings
    try {
      const s = JSON.parse(localStorage.getItem("vortx-a11y") || "{}");
      for (const key of Object.keys(A11Y_CLASSES)) {
        e.classList.toggle(A11Y_CLASSES[key], Boolean(s[key]));
      }
      e.style.fontSize = s.fontScale && s.fontScale !== 1 ? `${s.fontScale * 100}%` : "";
    } catch {
      /* ignore */
    }
  }, [pathname]);

  return null;
}
