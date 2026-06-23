import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import { Section } from "@/components/ui/Section";
import { Plus, ArrowRight } from "@/components/ui/icons";

export function Faq({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <Section id="faq" tone="muted" containerClassName="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
      <div>
        <span className="section-eyebrow eyebrow-badge font-mono text-xs uppercase tracking-[0.22em]">
          {dict.faq.eyebrow}
        </span>
        <h2 className="mt-4 text-3xl font-bold text-text md:text-4xl">{dict.faq.title}</h2>
        <Link
          href={localized(lang, "/faq")}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-text"
        >
          {dict.faq.allCta}
          <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="divide-y divide-border border-y border-border">
        {dict.faq.items.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-text marker:hidden">
              {item.q}
              <Plus
                width={20}
                height={20}
                className="shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
              />
            </summary>
            <p className="mt-3 max-w-2xl text-text-dim">{item.a}</p>
          </details>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </Section>
  );
}
