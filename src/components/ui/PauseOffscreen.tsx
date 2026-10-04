"use client";

import { useEffect } from "react";

/**
 * Pauses looping CSS animations in sections that are not on screen.
 *
 * The home runs several infinite animations at once (hero brand sweep, two
 * 40-dot particle fields, marquees, logo rings, glow halos). Browsers keep
 * painting them even when they are scrolled far out of view, which measured as
 * the single biggest runtime cost on phones. This observer tags every top-level
 * section (and the footer marquee) with `.is-offscreen` while it is more than
 * one quarter of a viewport away; globals.css then sets
 * `animation-play-state: paused` on everything inside. Entrance animations are
 * unaffected in practice: they simply start when the section scrolls in.
 *
 * Renders nothing. Mount once per page.
 */
const SELECTOR = "main > section, footer .marquee-container";

export function PauseOffscreen() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.classList.toggle("is-offscreen", !e.isIntersecting);
      },
      { rootMargin: "25% 0px 25% 0px", threshold: 0 }
    );
    const observed = new Set<Element>();
    const scan = () => {
      for (const el of document.querySelectorAll(SELECTOR)) {
        if (!observed.has(el)) {
          observed.add(el);
          io.observe(el);
        }
      }
    };
    scan();
    // Lazy-mounted content (3D scenes, dynamic sections) can add sections later.
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: false });
    const main = document.querySelector("main");
    if (main) mo.observe(main, { childList: true });
    return () => {
      mo.disconnect();
      io.disconnect();
      for (const el of observed) el.classList.remove("is-offscreen");
    };
  }, []);
  return null;
}
