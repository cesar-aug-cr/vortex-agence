"use client";

import { useEffect } from "react";

/**
 * Feeds the cursor position into every `.spotlight-card` as --mx / --my
 * (px, relative to the card) so its background spotlight and border glow can
 * follow the mouse. One delegated listener on the document handles all cards.
 *
 * Perf: the handler is rAF-throttled (at most one layout read + style write
 * per frame, never per pointer event) and only attaches on devices with a
 * fine pointer (mouse/trackpad). Touch devices have no hover, so the listener
 * — and its getBoundingClientRect layout reads — never run there.
 */
export function SpotlightCards() {
  useEffect(() => {
    // No hover on touch / coarse pointers → the spotlight is invisible anyway.
    if (
      typeof window === "undefined" ||
      !window.matchMedia?.("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    let frame = 0;
    let lastX = 0;
    let lastY = 0;
    let pending = false;

    const apply = () => {
      frame = 0;
      pending = false;
      const el = document.elementFromPoint(lastX, lastY) as HTMLElement | null;
      const target = el?.closest?.(".spotlight-card") as HTMLElement | null;
      if (!target) return;
      const r = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${lastX - r.left}px`);
      target.style.setProperty("--my", `${lastY - r.top}px`);
    };

    const onMove = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (pending) return;
      pending = true;
      frame = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
