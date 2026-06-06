"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { localized } from "@/lib/locale";
import type { Locale } from "@/i18n/config";
import { ArrowRight } from "@/components/ui/icons";

/**
 * Mobile-only sticky CTA bar. The header's primary CTA is hidden on small
 * screens, so a visitor mid-page would otherwise have no one-tap conversion
 * path. Appears after the hero is scrolled past; hidden on lg+.
 */
export function StickyCta({ lang, label }: { lang: Locale; label: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-bg/90 p-3 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <Link
        href={localized(lang, "/contact")}
        className="btn btn-primary w-full text-base"
      >
        {label}
        <ArrowRight width={18} height={18} />
      </Link>
    </div>
  );
}
