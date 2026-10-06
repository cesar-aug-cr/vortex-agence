import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import { ArrowRight } from "@/components/ui/icons";

/**
 * In-article conversion block shown at the foot of every article (before the
 * "go further" links): a short pitch + a button to request a quote / contact.
 */
export function ArticleCta({
  title,
  text,
  button,
  lang,
}: {
  title: string;
  text: string;
  button: string;
  lang: Locale;
}) {
  return (
    // Always the dark rendering (both themes): stage surface, lime border,
    // soft lime/cyan glows, light text. The border colour is inline so the
    // curated light theme cannot rewrite the lime on this dark surface.
    <aside
      id="article-cta"
      className="relative mt-12 overflow-hidden rounded-2xl border-2 bg-stage p-7 text-stage-text md:p-8"
      style={{ borderColor: "var(--accent)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(75% 80% at 100% 0%, rgba(200,240,46,0.22), transparent 60%), radial-gradient(60% 70% at 0% 100%, rgba(20,224,200,0.14), transparent 60%)",
        }}
      />
      <h2 className="relative text-xl font-bold text-stage-text md:text-2xl">{title}</h2>
      <p className="relative mt-2 max-w-2xl text-stage-text-dim">{text}</p>
      <Link href={localized(lang, "/contact")} className="btn btn-primary relative mt-6">
        {button}
        <ArrowRight width={18} height={18} />
      </Link>
    </aside>
  );
}
