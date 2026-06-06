import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import { Wordmark } from "@/components/brand/Wordmark";
import { ArrowRight } from "@/components/ui/icons";
import { site } from "@/lib/site";

export function Footer({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const year = 2026;
  const cols = [dict.footer.columns.services, dict.footer.columns.company, dict.footer.columns.legal];
  const allTools = dict.tools.categories.flatMap((c) => c.items);
  const marquee = [...allTools, ...allTools];

  return (
    <footer className="bg-stage text-stage-text">
      {/* tools recap marquee */}
      <div
        className="marquee-container border-b border-white/10 py-5"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="marquee-track">
          {marquee.map((item, i) => (
            <span key={`${item}-${i}`} className="mx-5 font-mono text-xs uppercase tracking-widest text-stage-text-dim">
              {item}
              <span className="mx-5 text-accent">•</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container-vortx py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* brand + CTA */}
          <div>
            <Wordmark className="h-7 w-auto text-stage-text" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-stage-text-dim">
              {dict.footer.blurb}
            </p>
            <Link
              href={localized(lang, "/contact")}
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent"
            >
              {dict.common.cta}
              <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* link columns */}
          <div className="grid gap-8 sm:grid-cols-3">
            {cols.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-xs uppercase tracking-wide text-stage-text-dim">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={localized(lang, l.href)}
                        className="text-sm text-stage-text/85 transition-colors hover:text-accent"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* contact strip */}
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-8 text-sm text-stage-text-dim sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-2">
          <span className="font-mono text-xs uppercase tracking-wide text-stage-text">
            {dict.footer.contactTitle}
          </span>
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-accent"
          >
            {site.email}
          </a>
          {site.phone && (
            <a
              href={`tel:${site.phone.replace(/\s+/g, "")}`}
              className="transition-colors hover:text-accent"
            >
              {site.phone}
            </a>
          )}
          <span>{dict.footer.location}</span>
          {site.sameAs.length > 0 && (
            <span className="flex gap-4">
              {site.sameAs.map((href) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {new URL(href).hostname.replace("www.", "")}
                </a>
              ))}
            </span>
          )}
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-vortx flex flex-col items-center justify-between gap-3 py-6 text-xs text-stage-text-dim sm:flex-row">
          <p>
            © {year} {dict.brand.name}. {dict.footer.rights}
          </p>
          <p className="font-mono">{dict.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  );
}
