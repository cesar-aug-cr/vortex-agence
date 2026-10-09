"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SMIL = "animate, animateTransform, animateMotion, set";

/**
 * Owns the play state of SMIL SVG animations (the feature icons, pack icons
 * and illustrations use `<animate>` loops, which CSS `prefers-reduced-motion`,
 * the a11y "pause animations" toggle and `animation-play-state` CANNOT stop).
 *
 * Every root <svg> holding SMIL runs only while it is near the viewport and
 * motion is allowed. A service page carries ~250 of these loops in ~30 SVGs;
 * each one makes the main thread restyle + repaint its SVG on every frame, so
 * letting the off-screen ones run kept a phone's main thread saturated.
 * Reduced motion — the OS setting OR the accessibility widget's
 * `a11y-no-motion` class — pauses them all.
 */
export function MotionGuard() {
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduce = () => mq.matches || document.documentElement.classList.contains("a11y-no-motion");
    const visible = new WeakSet<Element>();
    const observed = new Set<SVGSVGElement>();

    const sync = (svg: SVGSVGElement) => {
      if (typeof svg.pauseAnimations !== "function") return;
      if (reduce() || !visible.has(svg)) svg.pauseAnimations();
      else svg.unpauseAnimations();
    };
    const syncAll = () => observed.forEach(sync);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
          sync(e.target as SVGSVGElement);
        }
      },
      // start a little before an icon scrolls in, so its loop is already running
      { rootMargin: "200px 0px" }
    );

    // Only outermost <svg> elements own a SMIL timeline.
    const scan = () => {
      document.querySelectorAll("svg").forEach((svg) => {
        if (observed.has(svg) || svg.ownerSVGElement || !svg.querySelector(SMIL)) return;
        observed.add(svg);
        sync(svg); // paused until the observer reports it visible
        io.observe(svg);
      });
    };
    scan();

    // SVGs that mount after navigation (lazy sections, client islands)
    let raf = 0;
    const mo = new MutationObserver(() => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          scan();
        });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    mq.addEventListener("change", syncAll);
    // re-apply when the a11y "pause animations" class toggles on <html>
    const classObs = new MutationObserver(syncAll);
    classObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      mq.removeEventListener("change", syncAll);
      classObs.disconnect();
      mo.disconnect();
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
