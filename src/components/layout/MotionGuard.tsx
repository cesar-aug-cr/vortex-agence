"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Pauses SMIL SVG animations (the feature icons + illustrations use
 * `<animate>` loops, which CSS `prefers-reduced-motion` / the a11y "pause
 * animations" toggle CANNOT stop). Calls `pauseAnimations()` on every root
 * <svg> when reduced motion is requested — via the OS setting OR the
 * accessibility widget's `a11y-no-motion` class — and resumes otherwise.
 */
export function MotionGuard() {
  const pathname = usePathname();

  useEffect(() => {
    const apply = () => {
      const reduce =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.documentElement.classList.contains("a11y-no-motion");
      document.querySelectorAll("svg").forEach((svg) => {
        const s = svg as SVGSVGElement & {
          pauseAnimations?: () => void;
          unpauseAnimations?: () => void;
        };
        if (typeof s.pauseAnimations !== "function") return;
        if (reduce) s.pauseAnimations();
        else s.unpauseAnimations?.();
      });
    };

    apply();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", apply);
    // re-apply when the a11y "pause animations" class toggles on <html>
    const obs = new MutationObserver(apply);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    // catch SVGs that mount slightly after navigation
    const t = setTimeout(apply, 400);

    return () => {
      mq.removeEventListener("change", apply);
      obs.disconnect();
      clearTimeout(t);
    };
  }, [pathname]);

  return null;
}
