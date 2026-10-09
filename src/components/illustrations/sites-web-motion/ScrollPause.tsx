"use client";

import { useEffect, useRef } from "react";

/** How long the scene stays frozen after the last scroll / touch event. */
const RESUME_MS = 250;

/**
 * Freezes the laser scene while the visitor scrolls (swipe, wheel, momentum).
 *
 * Chrome restyles every RUNNING CSS animation on each main-thread frame, and
 * scrolling produces one per frame (the header's scroll listener…). Paused
 * animations are not restyled, so tagging the scene root with `.swb-paused`
 * (→ `animation-play-state: paused` on every animated element) removes its
 * cost during the gesture (measured at 4× CPU on a phone: the scene's extra
 * main-thread work while swiping drops by ~80 %). It resumes RESUME_MS after
 * the last event, all animations together, so the timeline stays in sync.
 *
 * A plain tap does NOT pause (no touchstart): pausing and resuming 67
 * animations costs more than the few frames of a tap (tap → paint went from
 * 80 ms to 168 ms median when touchstart paused too).
 *
 * Renders a hidden marker inside the scene root and touches only its class:
 * no React state, no re-render.
 */
export function ScrollPause() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current?.closest(".swb-root");
    if (!root) return;
    let timer = 0;
    const resume = () => root.classList.remove("swb-paused");
    const pause = () => {
      root.classList.add("swb-paused");
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
