import Image from "next/image";
import type { Dictionary } from "@/i18n/getDictionary";
import { Section } from "@/components/ui/Section";
import { IconStrategy, IconConversion, IconLocal, IconAI } from "@/components/sections/WhyIcons";

const icons = [IconStrategy, IconConversion, IconLocal, IconAI];

/**
 * "Pourquoi vortx" — bento layout. A featured heading cell (title + lead)
 * anchors the left column while the four pillars fill an asymmetric 2×2 bento
 * grid, each with an icon, an index and the Services-style hover effects.
 */
export function WhyVortx({ dict, className = "" }: { dict: Dictionary; className?: string }) {
  return (
    <Section tone="base" className={className}>
      <div className="grid gap-5 lg:auto-rows-fr lg:grid-cols-3">
        {/* featured heading cell */}
        {/* featured cell on a realistic photo of Luxembourg at golden hour
            (public/hero/pourquoi-vortx.webp) under a dark scrim — the cell is
            a dark stage in both themes so the copy stays white. */}
        <div className="relative isolate flex flex-col justify-between overflow-hidden rounded-2xl border border-stage-border bg-stage p-8 text-stage-text shadow-[var(--shadow-md)] lg:row-span-2">
          <Image
            src="/hero/pourquoi-vortx.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="-z-10 object-cover object-[60%_center]"
          />
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            aria-hidden
            style={{
              background:
                "linear-gradient(to bottom, rgba(7,7,10,0.78) 0%, rgba(7,7,10,0.55) 45%, rgba(7,7,10,0.85) 100%)",
            }}
          />
          <div>
            <span className="section-eyebrow font-mono text-xs font-bold uppercase tracking-[0.22em] text-accent">
              {dict.trust.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-[1.08] text-stage-text md:text-4xl">
              {dict.trust.title}
            </h2>
          </div>
          <p className="mt-6 text-base leading-relaxed text-stage-text-dim">
            {dict.trust.lead}
          </p>
        </div>

        {/* pillars */}
        {dict.trust.pillars.map((p, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div
              key={p.title}
              className="card card-hover spotlight-card group p-7"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-accent-soft text-accent sm:h-16 sm:w-16">
                  <Icon className="h-12 w-12 sm:h-10 sm:w-10" />
                </span>
                <span className="font-mono text-sm text-text-muted">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-text">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-dim">
                {p.desc}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
