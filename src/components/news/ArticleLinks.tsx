import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import { Link2, ArrowUpRight } from "@/components/ui/icons";

type ArticleLink = { label: string; href: string; desc: string };

/**
 * Curated internal links ("go further") rendered at the foot of an article —
 * cross-links to related articles, services and the glossary for SEO + UX.
 */
export function ArticleLinks({
  links,
  title,
  lang,
}: {
  links: ArticleLink[];
  title: string;
  lang: Locale;
}) {
  if (!links || links.length === 0) return null;

  return (
    <section className="mt-12 rounded-2xl border border-border bg-bg-card p-6 md:p-7">
      <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-accent">
        <Link2 width={16} height={16} />
        {title}
      </p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {links.map((l) => {
          const internal = l.href.startsWith("/");
          const href = internal ? localized(lang, l.href) : l.href;
          return (
            <li key={l.href}>
              <Link
                href={href}
                className="group flex h-full items-start gap-3 rounded-xl border border-border p-4 transition-colors hover:border-accent/50 hover:bg-accent-soft"
              >
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 font-semibold text-text transition-colors group-hover:text-accent">
                    {l.label}
                    <ArrowUpRight
                      width={14}
                      height={14}
                      className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-text-dim">{l.desc}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
