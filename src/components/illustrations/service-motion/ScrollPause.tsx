"use client";

import { useEffect, useRef } from "react";

/** How long a scene stays frozen after the last scroll event. */
const RESUME_MS = 250;

/**
 * Freezes a service motion graphic while the visitor scrolls (swipe, wheel,
 * momentum): sets `data-paused` on the closest `[data-motion-root]`, whose
 * CSS turns it into `animation-play-state: paused` on every animated element.
 *
 * Chrome restyles every RUNNING CSS animation on each main-thread frame and
 * scrolling produces one per frame; paused animations are not restyled. A
 * plain tap does not pause (pausing + resuming costs more than a tap's
 * frames). Same mechanism as sites-web-motion/ScrollPause, for the other
 * services' scenes.
 */
export function ScrollPause() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current?.closest("[data-motion-root]");
    if (!root) return;
    let timer = 0;
    const resume = () => root.removeAttribute("data-paused");
    const pause = () => {
      root.setAttribute("data-paused", "");
      window.clearTimeout(timer);
      timer = window.setTimeout(resume, RESUME_MS);
    };
    const events = ["scroll", "wheel", "touchmove"] as const;
    for (const e of events) window.addEventListener(e, pause, { passive: true });
    return () => {
      for (const e of events) window.removeEventListener(e, pause);
      window.clearTimeout(timer);
      resume();
    };
  }, []);

  return <span ref={ref} hidden />;
}
