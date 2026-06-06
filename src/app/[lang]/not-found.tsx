import Link from "next/link";
import { i18n } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { localized } from "@/lib/locale";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";

/**
 * Not-found boundary for the [lang] segment. Rendered without route params,
 * so it falls back to the default locale for its copy and links.
 */
export default async function NotFound() {
  const lang = i18n.defaultLocale;
  const dict = await getDictionary(lang);

  return (
    <PageShell dict={dict} lang={lang}>
      <Section tone="base" className="pt-28 md:pt-32">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-mono text-6xl font-bold text-accent md:text-7xl">404</p>
          <h1 className="mt-6 text-3xl font-bold text-text md:text-4xl">
            {dict.pages.notFound.title}
          </h1>
          <p className="mt-4 text-lg text-text-dim">{dict.pages.notFound.lead}</p>
          <div className="mt-8 flex justify-center">
            <Link href={localized(lang, "/")} className="btn btn-primary">
              {dict.pages.notFound.cta}
            </Link>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
