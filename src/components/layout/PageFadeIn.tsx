"use client";

import { useEffect, useState } from "react";

/**
 * One-shot "emerge from black" overlay. Renders opaque black on first paint
 * (so a page arrived-at via the hyperspace warp continues from black instead of
 * flashing white), then fades out to reveal the page. Honours reduced motion by
 * removing itself immediately.
 */
export function PageFadeIn() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("a11y-no-motion");
    if (reduced) {
      setHidden(true);
      return;
    }
    const id = requestAnimationFrame(() => setHidden(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[90] bg-black transition-opacity duration-700 ease-out ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    />
  );
}
