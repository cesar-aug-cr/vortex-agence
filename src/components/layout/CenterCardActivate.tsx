"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Mobile affordance: on touch devices (no hover), the link-card whose body sits
 * in the centre band of the viewport gets an `is-active` class, which triggers
 * the same lift/glow as :hover — so users scrolling the page can tell the cards
 * are tappable. Desktop and reduced-motion are left untouched.
 *
 * "Link-card" = a `.card-hover` that is, contains, or sits inside an <a>; purely
 * decorative cards (e.g. the agence stats) have no link and are skipped.
 */
export function CenterCardActivate() {
  const pathname = usePathname();

  useEffect(() => {
    const coarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("a11y-no-motion");
    if (!coarse || reduced) return;

    // Wait a tick so the freshly-navigated page has committed its cards.
    let io: IntersectionObserver | null = null;
    const raf = requestAnimationFrame(() => {
      const cards = Array.from(
        document.querySelectorAll<HTMLElement>(".card-hover")
      ).filter(
        (el) => el.tagName === "A" || el.closest("a") !== null || el.querySelector("a") !== null
      );
      if (!cards.length) return;

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) =>
            e.target.classList.toggle("is-active", e.isIntersecting)
          );
        },
        // Only the central ~20% band of the viewport counts as "centred".
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      cards.forEach((c) => io!.observe(c));
    });

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      document
        .querySelectorAll(".card-hover.is-active")
        .forEach((el) => el.classList.remove("is-active"));
    };
  }, [pathname]);

  return null;
}
