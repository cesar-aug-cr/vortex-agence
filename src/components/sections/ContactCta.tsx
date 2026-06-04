import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Check, ArrowRight } from "@/components/ui/icons";

export function ContactCta({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <Section id="contact" tone="stage">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(60% 70% at 50% 0%, rgba(200,240,46,0.12), transparent 65%), radial-gradient(50% 50% at 85% 90%, rgba(20,224,200,0.10), transparent 70%)",
        }}
      />
      <div className="relative z-10">
        <SectionHeading
          eyebrow={dict.contact.eyebrow}
          title={dict.contact.title}
          lead={dict.contact.lead}
          tone="stage"
          align="center"
        />

        <div className="mt-10 flex justify-center">
          <Link href={localized(lang, "/contact")} className="btn btn-primary text-base">
            {dict.common.cta}
            <ArrowRight width={18} height={18} />
          </Link>
        </div>

        <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-3">
          {dict.contact.benefits.map((b) => (
            <li key={b} className="flex items-center gap-2 text-sm text-stage-text-dim">
              <Check width={16} height={16} className="text-accent" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
