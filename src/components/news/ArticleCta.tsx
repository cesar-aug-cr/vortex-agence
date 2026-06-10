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
    <aside className="relative mt-12 overflow-hidden rounded-2xl border-2 border-accent bg-accent-soft p-7 md:p-8">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(75% 80% at 100% 0%, rgba(200,240,46,0.22), transparent 60%), radial-gradient(60% 70% at 0% 100%, rgba(20,224,200,0.14), transparent 60%)",
        }}
      />
      <h2 className="text-xl font-bold text-text md:text-2xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-text-dim">{text}</p>
      <Link href={localized(lang, "/contact")} className="btn btn-primary mt-6">
        {button}
        <ArrowRight width={18} height={18} />
      </Link>
    </aside>
  );
}
