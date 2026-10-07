import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import { Section, SectionHeading } from "@/components/ui/Section";
import { withEmphasis } from "@/lib/emphasis";
import { Check, ArrowRight } from "@/components/ui/icons";

export function ContactCta({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <Section id="contact" tone="stage" className="overflow-hidden">
      {/* Background: lime/cyan light beams on black (images-test proposal 17:
          public/cta/fond.webp, 1536×1024, ≤ 32 Ko served via the static
          variants). Decorative only; a 55 % stage scrim keeps the copy legible
          and the CSS glows on top tie it to the rest of the dark surfaces. */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src="/cta/fond.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-stage/55" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 70% at 50% 0%, rgba(200,240,46,0.12), transparent 65%), radial-gradient(50% 50% at 85% 90%, rgba(20,224,200,0.10), transparent 70%)",
          }}
        />
      </div>
      <div className="relative z-10">
        <SectionHeading
          eyebrow={dict.contact.eyebrow}
          title={withEmphasis(dict.contact.title)}
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
